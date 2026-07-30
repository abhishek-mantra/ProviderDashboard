import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search, Filter, X, FileText, Shield, Receipt, CheckSquare, Square, Zap, Lock, Clock, AlertTriangle, ChevronLeft } from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { MOCK_CREDENTIAL_STATUS } from "../types/claims";
import type { UnbilledSession, ServiceLine } from "../types/claims";

export function UnbilledSessions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientFilterParam = searchParams.get("clientId");
  const resubmitClaimId = searchParams.get("resubmitClaimId");

  const { claims, unbilledSessions, markSessionsBilled, createNewClaim, updateClaimStatus, updateClaim, getClaim } = useClaims();

  const resubmitClaim = useMemo(() => {
    if (resubmitClaimId) return getClaim(resubmitClaimId);
    if (clientFilterParam) return claims.find((c) => c.clientId === clientFilterParam && c.status === "draft");
    return undefined;
  }, [resubmitClaimId, getClaim, clientFilterParam, claims]);

  const [searchQuery, setSearchQuery] = useState("");
  const [payerFilter, setPayerFilter] = useState("all");
  const [notesFilter, setNotesFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showMantraConfirm, setShowMantraConfirm] = useState(false);
  const [showNotCredentialedFallback, setShowNotCredentialedFallback] = useState(false);
  const [nonCredentialedPayer, setNonCredentialedPayer] = useState<{ id: string; name: string } | null>(null);
  const [groupByPayer, setGroupByPayer] = useState(false);

  const filteredByClient = useMemo(() => {
    if (!clientFilterParam) return unbilledSessions;
    return unbilledSessions.filter((s) => s.clientId === clientFilterParam);
  }, [unbilledSessions, clientFilterParam]);

  const signedCount = useMemo(
    () => filteredByClient.filter((s) => s.notesStatus === "locked").length,
    [filteredByClient]
  );
  const totalCount = filteredByClient.length;
  const readinessPercentage = totalCount > 0 ? Math.round((signedCount / totalCount) * 100) : 0;

  const uniquePayers = useMemo(() => {
    const payers = new Map<string, string>();
    filteredByClient.forEach((s) => payers.set(s.payerId, s.payerName));
    return Array.from(payers.entries()).map(([id, name]) => ({ id, name }));
  }, [filteredByClient]);

  const filteredSessions = useMemo(() => {
    return filteredByClient.filter((s) => {
      const matchesSearch =
        s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.payerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.cptCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPayer = payerFilter === "all" || s.payerId === payerFilter;
      const matchesNotes =
        notesFilter === "all" ||
        (notesFilter === "locked" && s.notesStatus === "locked") ||
        (notesFilter === "draft" && s.notesStatus === "draft");
      return matchesSearch && matchesPayer && matchesNotes;
    });
  }, [filteredByClient, searchQuery, payerFilter, notesFilter]);

  const sessionsByPayer = useMemo(() => {
    const map = new Map<string, { payerName: string; payerId: string; sessions: UnbilledSession[] }>();
    filteredSessions.forEach((s) => {
      if (!map.has(s.payerId)) {
        map.set(s.payerId, { payerName: s.payerName, payerId: s.payerId, sessions: [] });
      }
      map.get(s.payerId)!.sessions.push(s);
    });
    return Array.from(map.values());
  }, [filteredSessions]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredSessions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredSessions.map((s) => s.id)));
    }
  };

  const selectedSessions = useMemo(
    () => unbilledSessions.filter((s) => selectedIds.has(s.id)),
    [unbilledSessions, selectedIds]
  );

  const selectedPayers = new Set(selectedSessions.map((s) => s.payerId));
  const hasMixedPayers = selectedPayers.size > 1;
  const selectedClientIds = new Set(selectedSessions.map((s) => s.clientId));
  const hasMixedClients = selectedClientIds.size > 1;

  const totalSelectedAmount = selectedSessions.reduce((sum, s) => sum + s.amount, 0);

  const handleSubmitViaMantraClick = () => {
    if (hasMixedPayers) {
      alert("Please select sessions from a single payer only.");
      return;
    }
    const session = selectedSessions[0];
    const credentialStatus = MOCK_CREDENTIAL_STATUS[session.payerId] ?? "not_credentialed";
    if (credentialStatus !== "credentialed") {
      setNonCredentialedPayer({ id: session.payerId, name: session.payerName });
      setShowNotCredentialedFallback(true);
      return;
    }
    setShowMantraConfirm(true);
  };

  const submitOrUpdateClaim = (params: {
    flowType: "mantra" | "manual" | "superbill";
    clientId: string;
    clientName: string;
    providerId: string;
    payerId?: string | null;
    payerName?: string | null;
    sessionIds: string[];
    diagnosisCodes: string[];
    serviceLines: ServiceLine[];
  }) => {
    const existingClaim = resubmitClaimId
      ? getClaim(resubmitClaimId)
      : claims.find((c) => c.clientId === params.clientId && c.status === "draft");

    if (existingClaim) {
      const totalAmount = params.serviceLines.reduce((sum, sl) => sum + sl.chargeAmount, 0);
      updateClaim(existingClaim.id, {
        flowType: params.flowType,
        payerId: params.payerId !== undefined ? params.payerId : existingClaim.payerId,
        payerName: params.payerName !== undefined ? params.payerName : existingClaim.payerName,
        sessionIds: params.sessionIds,
        diagnosisCodes: params.diagnosisCodes,
        serviceLines: params.serviceLines,
        totalAmount,
        updatedAt: new Date().toISOString(),
      });
      return existingClaim;
    } else {
      return createNewClaim(params);
    }
  };

  const confirmMantraSubmission = () => {
    if (!selectedSessions.length) return;
    setShowMantraConfirm(false);
    const session = selectedSessions[0];
    markSessionsBilled(Array.from(selectedIds));
    const claimToUse = submitOrUpdateClaim({
      flowType: "mantra",
      clientId: session.clientId,
      clientName: session.clientName,
      providerId: "",
      payerId: session.payerId,
      payerName: session.payerName,
      sessionIds: selectedSessions.map((s) => s.id),
      diagnosisCodes: Array.from(new Set(selectedSessions.map((s) => s.diagnosisCode).filter(Boolean))),
      serviceLines: selectedSessions.map((s, i) => ({
        id: `sl-${Date.now()}-${i}`,
        sessionId: s.id,
        dateOfService: s.dateOfService,
        serviceCode: s.cptCode,
        units: 1,
        chargeAmount: s.amount,
      })),
    });
    updateClaimStatus(claimToUse.id, "submitted", "[MOCK] Resubmitting claim to Claim.MD...");
    setTimeout(() => {
      updateClaimStatus(claimToUse.id, "scrubbing", "[MOCK] Scrubbing/validating claim...");
    }, 500);
    navigate(`/claims/${claimToUse.id}`);
  };

  const fallbackSubmitManually = () => {
    if (!selectedSessions.length) return;
    setShowNotCredentialedFallback(false);
    const session = selectedSessions[0];
    markSessionsBilled(Array.from(selectedIds));
    const claimToUse = submitOrUpdateClaim({
      flowType: "manual",
      clientId: session.clientId,
      clientName: session.clientName,
      providerId: "",
      payerId: null,
      payerName: null,
      sessionIds: selectedSessions.map((s) => s.id),
      diagnosisCodes: Array.from(new Set(selectedSessions.map((s) => s.diagnosisCode).filter(Boolean))),
      serviceLines: selectedSessions.map((s, i) => ({
        id: `sl-${Date.now()}-${i}`,
        sessionId: s.id,
        dateOfService: s.dateOfService,
        serviceCode: s.cptCode,
        units: 1,
        chargeAmount: s.amount,
      })),
    });
    updateClaimStatus(claimToUse.id, "manual_generated", "[MOCK] CMS-1500 form generated.");
    navigate(`/claims/${claimToUse.id}/cms1500`);
  };

  const fallbackSubmitSuperbill = () => {
    if (!selectedSessions.length) return;
    setShowNotCredentialedFallback(false);
    const session = selectedSessions[0];
    markSessionsBilled(Array.from(selectedIds));
    const claimToUse = submitOrUpdateClaim({
      flowType: "superbill",
      clientId: session.clientId,
      clientName: session.clientName,
      providerId: "",
      sessionIds: selectedSessions.map((s) => s.id),
      diagnosisCodes: Array.from(new Set(selectedSessions.map((s) => s.diagnosisCode).filter(Boolean))),
      serviceLines: selectedSessions.map((s, i) => ({
        id: `sl-${Date.now()}-${i}`,
        sessionId: s.id,
        dateOfService: s.dateOfService,
        serviceCode: s.cptCode,
        units: 1,
        chargeAmount: s.amount,
      })),
    });
    updateClaimStatus(claimToUse.id, "superbill_generated", "[MOCK] Superbill generated.");
    navigate(`/claims/${claimToUse.id}/superbill`);
  };

  const handleGenerateManualClaim = () => {
    if (hasMixedPayers) {
      alert("Please select sessions from a single payer only.");
      return;
    }
    const session = selectedSessions[0];
    markSessionsBilled(Array.from(selectedIds));
    const claimToUse = submitOrUpdateClaim({
      flowType: "manual",
      clientId: session.clientId,
      clientName: session.clientName,
      providerId: "",
      payerId: null,
      payerName: null,
      sessionIds: selectedSessions.map((s) => s.id),
      diagnosisCodes: Array.from(new Set(selectedSessions.map((s) => s.diagnosisCode).filter(Boolean))),
      serviceLines: selectedSessions.map((s, i) => ({
        id: `sl-${Date.now()}-${i}`,
        sessionId: s.id,
        dateOfService: s.dateOfService,
        serviceCode: s.cptCode,
        units: 1,
        chargeAmount: s.amount,
      })),
    });
    updateClaimStatus(claimToUse.id, "manual_generated", "[MOCK] CMS-1500 form generated.");
    navigate(`/claims/${claimToUse.id}/cms1500`);
  };

  const handleGenerateSuperbill = () => {
    if (hasMixedClients) {
      alert("Superbill requires sessions from a single client.");
      return;
    }
    const session = selectedSessions[0];
    markSessionsBilled(Array.from(selectedIds));
    const claimToUse = submitOrUpdateClaim({
      flowType: "superbill",
      clientId: session.clientId,
      clientName: session.clientName,
      providerId: "",
      sessionIds: selectedSessions.map((s) => s.id),
      diagnosisCodes: Array.from(new Set(selectedSessions.map((s) => s.diagnosisCode).filter(Boolean))),
      serviceLines: selectedSessions.map((s, i) => ({
        id: `sl-${Date.now()}-${i}`,
        sessionId: s.id,
        dateOfService: s.dateOfService,
        serviceCode: s.cptCode,
        units: 1,
        chargeAmount: s.amount,
      })),
    });
    updateClaimStatus(claimToUse.id, "superbill_generated", "[MOCK] Superbill generated.");
    navigate(`/claims/${claimToUse.id}/superbill`);
  };

  const getNotesBadge = (session: UnbilledSession) => {
    if (session.notesStatus === "locked") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <Lock className="size-3" />
          Locked/Signed
        </span>
      );
    }
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/sessions/${session.id}/notes/add?clientId=${session.clientId}`);
        }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/60 transition-all shadow-sm cursor-pointer group"
        title="Click to complete and sign note for this session"
      >
        <Clock className="size-3 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
        <span>Draft/Unsigned</span>
        <span className="underline text-[10px] opacity-80 group-hover:opacity-100 font-bold ml-0.5">Sign →</span>
      </button>
    );
  };

  const isSelectable = (session: UnbilledSession) => session.notesStatus === "locked";

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0 pb-4">
        <div className="flex items-center gap-3 flex-1">
          {clientFilterParam && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="size-5 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              {clientFilterParam ? "Client Sessions" : "Unbilled Sessions"}
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
              {clientFilterParam
                ? "Sessions for this client — notes must be signed before billing"
                : "Select sessions to bill — notes must be signed before billing"}
            </p>
          </div>
        </div>
      </div>

      {/* Billing Readiness Meter */}
      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border border-blue-200/80 dark:border-gray-700 rounded-2xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="size-12 rounded-2xl bg-[#043570] text-white flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0">
            {readinessPercentage}%
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Billing Readiness Summary</h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-emerald-600 dark:text-emerald-400">{signedCount}</strong> of <strong>{totalCount}</strong> sessions have signed notes ready to file. {totalCount - signedCount > 0 && <span className="text-amber-600 dark:text-amber-400 font-semibold">({totalCount - signedCount} need signed notes)</span>}
            </p>
          </div>
        </div>
      </div>

      {resubmitClaim && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl flex items-center justify-between gap-3 text-amber-800 dark:text-amber-300 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-sm font-bold">Resubmitting Claim {resubmitClaim.claimNumber}</p>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Select updated sessions for <strong>{resubmitClaim.clientName}</strong> and confirm submission to update and resubmit this claim. Original history & denial logs will be preserved.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/billing/unbilled${clientFilterParam ? `?clientId=${clientFilterParam}` : ''}`)}
            className="px-3 py-1.5 hover:bg-amber-100 dark:hover:bg-amber-800/40 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border border-amber-300/50 dark:border-amber-700/50"
            title="Clear resubmission mode"
          >
            Cancel Resubmission
          </button>
        </div>
      )}

      {/* Mantra Confirmation Modal */}
      {showMantraConfirm && selectedSessions.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
              <Zap className="size-6 text-[#00c0ff]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Confirm Mantra Submission</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedSessions[0].clientName}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Payer</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedSessions[0].payerName}</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sessions</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedSessions.length} session(s)</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                <p className="font-semibold text-lg text-gray-900 dark:text-white">${totalSelectedAmount.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowMantraConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmMantraSubmission}
                className="flex-1 px-4 py-2.5 bg-[#00c0ff] hover:bg-[#0090c0] text-white rounded-xl font-bold transition-all shadow-md"
              >
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Not Credentialed Fallback Modal */}
      {showNotCredentialedFallback && nonCredentialedPayer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
              <AlertTriangle className="size-6 text-amber-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Not Credentialed</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You are not yet credentialed with <strong>{nonCredentialedPayer.name}</strong>. Credentialing can take 60-120+ days. You have other options:
            </p>
            <div className="space-y-3 pt-2">
              <button
                onClick={fallbackSubmitManually}
                className="w-full flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left"
              >
                <FileText className="size-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Manual CMS-1500 Claim</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Generate a paper CMS-1500 form you can mail or fax</p>
                </div>
              </button>
              <button
                onClick={fallbackSubmitSuperbill}
                className="w-full flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors text-left"
              >
                <Receipt className="size-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Superbill</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Give the client a superbill to submit to their insurer directly</p>
                </div>
              </button>
              <a
                href="/credential-status"
                className="block w-full text-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                Get Credentialed
              </a>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowNotCredentialedFallback(false)}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-3 md:p-6">
          <div className="flex flex-col gap-2 mb-4 md:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 focus:border-[#043570] text-xs md:text-sm"
                placeholder="Search by client, payer, or CPT code..."
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={payerFilter}
                onChange={(e) => setPayerFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#043570]/20"
              >
                <option value="all">All Payers</option>
                {uniquePayers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <select
                value={notesFilter}
                onChange={(e) => setNotesFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#043570]/20"
              >
                <option value="all">All Notes Status</option>
                <option value="locked">Locked/Signed</option>
                <option value="draft">Draft/Unsigned</option>
              </select>

              <button
                onClick={() => setGroupByPayer(!groupByPayer)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  groupByPayer
                    ? "bg-[#043570] text-white border-[#043570] shadow-sm"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100"
                }`}
              >
                {groupByPayer ? "Grouped by Payer 📁" : "Group by Payer 📁"}
              </button>
            </div>
          </div>

          {/* Batch Actions Bar */}
          {selectedIds.size > 0 && (
            <div className="mb-4 p-3 bg-[#f3faff] dark:bg-cyan-900/10 border border-[#00c0ff]/30 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium text-[#043570] dark:text-cyan-300">
                {selectedIds.size} session{selectedIds.size > 1 ? "s" : ""} selected
                {hasMixedPayers && (
                  <span className="ml-2 text-yellow-600 dark:text-yellow-400 text-xs">
                    (mixed payers — Mantra/Manual require same payer)
                  </span>
                )}
                {hasMixedClients && (
                  <span className="ml-2 text-yellow-600 dark:text-yellow-400 text-xs">
                    (mixed clients — Superbill requires same client)
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSubmitViaMantraClick}
                  disabled={hasMixedPayers}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00c0ff] hover:bg-[#0090c0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Zap className="size-3.5" />
                  Submit via Mantra
                </button>
                <button
                  onClick={handleGenerateManualClaim}
                  disabled={hasMixedPayers}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4169E1] hover:bg-[#3557c7] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <FileText className="size-3.5" />
                  Generate Manual Claim
                </button>
                <button
                  onClick={handleGenerateSuperbill}
                  disabled={hasMixedClients}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Receipt className="size-3.5" />
                  Generate Superbill
                </button>
              </div>
            </div>
          )}

          {/* Table / Payer Grouping View */}
          {groupByPayer ? (
            <div className="space-y-6 pt-2">
              {sessionsByPayer.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">No unbilled sessions found</p>
                </div>
              ) : (
                sessionsByPayer.map((group) => {
                  const groupTotal = group.sessions.reduce((acc, s) => acc + s.amount, 0);
                  const selectableGroupSessions = group.sessions.filter((s) => isSelectable(s));
                  const allGroupSelected =
                    selectableGroupSessions.length > 0 &&
                    selectableGroupSessions.every((s) => selectedIds.has(s.id));

                  const toggleGroupSelectAll = () => {
                    const next = new Set(selectedIds);
                    if (allGroupSelected) {
                      selectableGroupSessions.forEach((s) => next.delete(s.id));
                    } else {
                      selectableGroupSessions.forEach((s) => next.add(s.id));
                    }
                    setSelectedIds(next);
                  };

                  return (
                    <div
                      key={group.payerId}
                      className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
                    >
                      {/* Payer Header Banner */}
                      <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                            🏦
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                                {group.payerName}
                              </h3>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                MOCK_CREDENTIAL_STATUS[group.payerId] === "credentialed"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              }`}>
                                {MOCK_CREDENTIAL_STATUS[group.payerId] === "credentialed" ? "🟢 Credentialed" : "🟡 Superbill / Manual"}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {group.sessions.length} sessions • Total: <strong>${groupTotal.toFixed(2)}</strong>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={toggleGroupSelectAll}
                          disabled={selectableGroupSessions.length === 0}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#043570] hover:bg-[#032554] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                        >
                          {allGroupSelected ? <CheckSquare className="size-3.5" /> : <Square className="size-3.5" />}
                          <span>{allGroupSelected ? "Deselect Payer Sessions" : `Select All ${group.payerName} (${selectableGroupSessions.length})`}</span>
                        </button>
                      </div>

                      {/* Sessions List */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <tbody>
                            {group.sessions.map((session) => {
                              const selectable = isSelectable(session);
                              return (
                                <tr
                                  key={session.id}
                                  className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
                                    selectable ? "hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer" : "opacity-60"
                                  }`}
                                  onClick={() => selectable && toggleSelect(session.id)}
                                >
                                  <td className="py-3 px-3 w-10">
                                    {selectable ? (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); toggleSelect(session.id); }}
                                        className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                      >
                                        {selectedIds.has(session.id) ? (
                                          <CheckSquare className="size-4 text-[#00c0ff]" />
                                        ) : (
                                          <Square className="size-4 text-gray-400" />
                                        )}
                                      </button>
                                    ) : (
                                      <Square className="size-4 text-gray-300 dark:text-gray-600" />
                                    )}
                                  </td>
                                  <td className="py-3 px-2 text-gray-900 dark:text-white font-medium whitespace-nowrap">{session.dateOfService}</td>
                                  <td className="py-3 px-2">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); navigate(`/clients/${session.clientId}`); }}
                                      className="text-[#4169E1] hover:underline font-medium text-xs"
                                    >
                                      {session.clientName}
                                    </button>
                                  </td>
                                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{session.serviceType}</td>
                                  <td className="py-3 px-2">{getNotesBadge(session)}</td>
                                  <td className="py-3 px-2 text-gray-900 dark:text-white font-mono text-xs">{session.cptCode}</td>
                                  <td className="py-3 px-2 text-gray-900 dark:text-white font-mono text-xs">{session.diagnosisCode}</td>
                                  <td className="py-3 px-2 text-right text-gray-900 dark:text-white font-medium">${session.amount.toFixed(2)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 w-10">
                    <button onClick={toggleSelectAll} className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      {selectedIds.size === filteredSessions.length && filteredSessions.length > 0 ? (
                        <CheckSquare className="size-4 text-[#00c0ff]" />
                      ) : (
                        <Square className="size-4 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Date of Service</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Client</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Payer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Session/Service Type</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Notes Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">CPT Code</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">ICD-10</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Days Ago</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12">
                      <FileText className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No unbilled sessions found</p>
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) => {
                    const selectable = isSelectable(session);
                    return (
                      <tr
                        key={session.id}
                        className={`border-b border-gray-100 dark:border-gray-700 transition-colors ${
                          selectable ? "hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer" : "opacity-60"
                        }`}
                        onClick={() => selectable && toggleSelect(session.id)}
                      >
                        <td className="py-3 px-2">
                          {selectable ? (
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleSelect(session.id); }}
                              className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              {selectedIds.has(session.id) ? (
                                <CheckSquare className="size-4 text-[#00c0ff]" />
                              ) : (
                                <Square className="size-4 text-gray-400" />
                              )}
                            </button>
                          ) : (
                            <span
                              className="inline-block p-0.5 cursor-not-allowed"
                              title="Session notes must be signed before billing"
                            >
                              <Square className="size-4 text-gray-300 dark:text-gray-600" />
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-gray-900 dark:text-white font-medium whitespace-nowrap">{session.dateOfService}</td>
                        <td className="py-3 px-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/clients/${session.clientId}`); }}
                            className="text-[#4169E1] hover:underline font-medium text-xs"
                          >
                            {session.clientName}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-white">{session.payerName}</span>
                            <span className={`inline-block text-[10px] font-semibold ${
                              MOCK_CREDENTIAL_STATUS[session.payerId] === "credentialed"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-amber-600 dark:text-amber-400"
                            }`}>
                              {MOCK_CREDENTIAL_STATUS[session.payerId] === "credentialed" ? "🟢 Credentialed" : "🟡 Superbill / Manual"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{session.serviceType}</td>
                        <td className="py-3 px-2">{getNotesBadge(session)}</td>
                        <td className="py-3 px-2 text-gray-900 dark:text-white font-mono text-xs">{session.cptCode}</td>
                        <td className="py-3 px-2 text-gray-900 dark:text-white font-mono text-xs">{session.diagnosisCode}</td>
                        <td className="py-3 px-2 text-right text-gray-900 dark:text-white font-medium">${session.amount.toFixed(2)}</td>
                        <td className="py-3 px-2 text-right text-gray-500 dark:text-gray-400 text-xs">{session.daysSinceService}d</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

          {/* Empty state when filtered */}
          {filteredSessions.length === 0 && filteredByClient.length > 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">No sessions match the current filters.</p>
            </div>
          )}

          {/* Checkbox tooltip for unsigned notes */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Lock className="size-3.5" />
              Sessions with <strong>Draft/Unsigned</strong> notes cannot be selected. Sign notes before billing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
