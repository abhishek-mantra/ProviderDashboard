import { useNavigate } from "react-router";
import { FileText, Plus, Search, Eye, Filter, X } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { CLAIM_STATUS_LABELS } from "../types/claims";
import type { ClaimFlowType, ClaimStatus } from "../types/claims";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  initials: string;
  avatarColor: string;
}

const FLOW_TYPE_BADGES: Record<ClaimFlowType, { label: string; color: string }> = {
  mantra: { label: "Mantra", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
  manual: { label: "Manual", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  superbill: { label: "Superbill", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
};

export function Claims({
  hideHeader = false,
  showClientSelectModal: externalShowModal,
  setShowClientSelectModal: externalSetShowModal,
}: {
  hideHeader?: boolean;
  showClientSelectModal?: boolean;
  setShowClientSelectModal?: (show: boolean) => void;
}) {
  const navigate = useNavigate();
  const { claims, simulateClearinghouseSubmission } = useClaims();
  const { clients: contextClients, currentPracticeId, bills = [] } = usePartnerDashboard();
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [claimSearchQuery, setClaimSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [flowFilter, setFlowFilter] = useState<string>("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const showClientSelectModal =
    externalShowModal !== undefined ? externalShowModal : internalShowModal;
  const setShowClientSelectModal = externalSetShowModal || setInternalShowModal;

  // Practice-scoped clients
  const practiceClients = contextClients.filter((c) => c.practiceId === currentPracticeId);
  const practiceClientIds = new Set(practiceClients.map((c) => c.id));

  const clients: Client[] = practiceClients.map((c, i) => ({
    id: c.id,
    name: c.name,
    email: c.email || `${c.name.toLowerCase().replace(/\s+/g, ".")}@email.com`,
    phone: c.phone || "+1 234 567 8900",
    serviceType: c.primaryCondition || "Therapy",
    initials: c.initials || c.name.split(" ").map((n) => n[0]).join(""),
    avatarColor: ["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-pink-500", "bg-indigo-500"][i % 5],
  }));

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: ClaimStatus) => {
    const label = CLAIM_STATUS_LABELS[status] || status;
    switch (status) {
      case "paid":
      case "approved":
      case "adjusted":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {label}
          </span>
        );
      case "denied":
      case "rejected":
      case "stedi_rejected":
      case "payer_rejected":
      case "eligibility_failed":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {label}
          </span>
        );
      case "ready_to_submit":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            {label}
          </span>
        );
      case "in_adjudication":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {label}
          </span>
        );
      case "submitted":
      case "scrubbing":
      case "pending_with_payer":
      case "pended":
      case "eligibility_pending":
      case "awaiting_ack":
      case "no_response_investigate":
      case "stedi_validating":
      case "sent_to_payer":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            {label}
          </span>
        );
      case "manual_generated":
      case "superbill_generated":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            {label}
          </span>
        );
      default:
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {label}
          </span>
        );
    }
  };

  const handleClientSelect = (client: Client) => {
    setShowClientSelectModal(false);
    setSearchQuery("");
    navigate(`/billing/bills/create?clientId=${client.id}&mode=insurance`);
  };



  // Guaranteed claims list (includes all claims + insurance bills awaiting submission)
  const allClaims = useMemo(() => {
    const list = [...claims];

    // Include any insurance bills from bills context that haven't been submitted
    bills.forEach((b) => {
      if (b.billType === "insurance") {
        const claimId = b.claimId || `claim-${b.id}`;
        const exists = list.some((c) => c.id === claimId || c.claimNumber === b.billNumber || c.id === b.id);
        if (!exists) {
          list.push({
            id: claimId,
            claimNumber: b.billNumber.replace("BILL-", "CLM-"),
            flowType: "mantra",
            status: "ready_to_submit",
            clientId: b.clientId,
            clientName: b.clientName,
            practiceId: "practice-1",
            providerId: b.providerId || "prov-1",
            payerId: b.insurerName?.toLowerCase().replace(/\s+/g, "-") || "insurance",
            payerName: b.insurerName || "Insurance",
            region: "US",
            sessionIds: b.sessionId ? [b.sessionId] : [],
            diagnosisCodes: ["F41.1"],
            serviceLines: [
              {
                id: `sl-${b.id}`,
                sessionId: b.sessionId || "sess-1",
                dateOfService: b.dateOfService || "Feb 24, 2026",
                serviceCode: b.cptCode || "90834",
                units: 1,
                chargeAmount: b.amount,
              },
            ],
            eligibilityCheck: null,
            authorizationCode: null,
            submittedDate: null,
            statusHistory: [{ status: "ready_to_submit", timestamp: b.createdAt || new Date().toISOString() }],
            totalAmount: b.amount,
            currency: b.currency || "USD",
            pccn: null,
            claimFrequencyCode: "1",
            patientControlNumber: `PCN-${b.id}`,
            isMedicare: false,
            payment: null,
            createdAt: b.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }
    });

    const hasReady = list.some((c) => ["draft", "ready_to_submit", "claim_pending", "unsubmitted"].includes(c.status));
    if (!hasReady) {
      list.push(
        {
          id: "seed-ready-1",
          claimNumber: "CLM-2026-088",
          flowType: "mantra",
          status: "ready_to_submit",
          clientId: "2",
          clientName: "Michael Chen",
          practiceId: "practice-1",
          providerId: "prov-1",
          payerId: "bupa",
          payerName: "Bupa",
          region: "US",
          sessionIds: ["sess-2-done"],
          diagnosisCodes: ["F41.1"],
          serviceLines: [
            { id: "sl-ready-1", sessionId: "sess-2-done", dateOfService: "Mar 12, 2026", serviceCode: "90834", units: 1, chargeAmount: 210 },
          ],
          eligibilityCheck: null,
          authorizationCode: null,
          submittedDate: null,
          statusHistory: [
            { status: "ready_to_submit", timestamp: "2026-03-12T10:05:00Z", note: "Session notes signed & billed. Ready for submission." },
          ],
          totalAmount: 210,
          currency: "USD",
          pccn: null,
          claimFrequencyCode: "1",
          patientControlNumber: "PCN-READY1",
          isMedicare: false,
          payment: null,
          createdAt: "2026-03-12T09:00:00Z",
          updatedAt: "2026-03-12T10:05:00Z",
        },
        {
          id: "seed-ready-2",
          claimNumber: "CLM-2026-089",
          flowType: "mantra",
          status: "ready_to_submit",
          clientId: "1",
          clientName: "Sarah Johnson",
          practiceId: "practice-1",
          providerId: "prov-1",
          payerId: "us-1",
          payerName: "UnitedHealthcare",
          region: "US",
          sessionIds: ["unbilled-1"],
          diagnosisCodes: ["F41.1"],
          serviceLines: [
            { id: "sl-ready-2", sessionId: "unbilled-1", dateOfService: "Jul 31, 2026", serviceCode: "90834", units: 1, chargeAmount: 150 },
          ],
          eligibilityCheck: null,
          authorizationCode: null,
          submittedDate: null,
          statusHistory: [
            { status: "ready_to_submit", timestamp: "2026-07-31T10:05:00Z", note: "Session notes signed & billed. Ready for submission." },
          ],
          totalAmount: 150,
          currency: "USD",
          pccn: null,
          claimFrequencyCode: "1",
          patientControlNumber: "PCN-READY2",
          isMedicare: false,
          payment: null,
          createdAt: "2026-07-31T09:00:00Z",
          updatedAt: "2026-07-31T10:05:00Z",
        }
      );
    }
    return list;
  }, [claims, bills]);

  // Filter claims
  const filteredClaims = useMemo(() => {
    return allClaims.filter((claim) => {
      // 1. Search query
      if (claimSearchQuery.trim()) {
        const q = claimSearchQuery.toLowerCase();
        const matches =
          claim.clientName.toLowerCase().includes(q) ||
          claim.claimNumber.toLowerCase().includes(q) ||
          (claim.payerName || "").toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Status filter
      if (statusFilter === "ready_to_submit") {
        if (!["draft", "ready_to_submit", "claim_pending", "unsubmitted"].includes(claim.status)) return false;
      } else if (statusFilter === "in_progress") {
        if (!["submitted", "scrubbing", "pending_with_payer", "pended", "awaiting_ack", "no_response_investigate", "stedi_validating", "sent_to_payer", "in_adjudication"].includes(claim.status)) return false;
      } else if (statusFilter === "action_needed") {
        if (!["denied", "rejected", "stedi_rejected", "payer_rejected", "eligibility_failed"].includes(claim.status)) return false;
      } else if (statusFilter === "settled") {
        if (!["paid", "approved", "adjusted", "manual_generated", "superbill_generated"].includes(claim.status)) return false;
      } else if (statusFilter !== "all") {
        if (claim.status !== statusFilter) return false;
      }

      return true;
    });
  }, [allClaims, claimSearchQuery, statusFilter]);

  const financialStats = useMemo(() => {
    let readyAmount = 0;
    let pendingAmount = 0;
    let attentionAmount = 0;
    let paidAmount = 0;

    allClaims.forEach((claim) => {
      const claimTotal = claim.totalAmount || claim.serviceLines?.reduce((acc, sl) => acc + (sl.chargeAmount || 0), 0) || 0;
      if (["draft", "ready_to_submit", "claim_pending", "unsubmitted"].includes(claim.status)) {
        readyAmount += claimTotal;
      } else if (["submitted", "scrubbing", "pending_with_payer", "pended", "awaiting_ack", "no_response_investigate", "stedi_validating", "sent_to_payer", "in_adjudication"].includes(claim.status)) {
        pendingAmount += claimTotal;
      } else if (["denied", "rejected", "stedi_rejected", "payer_rejected", "eligibility_failed"].includes(claim.status)) {
        attentionAmount += claimTotal;
      } else if (["paid", "approved", "adjusted"].includes(claim.status)) {
        paidAmount += claimTotal;
      }
    });

    return {
      readyAmount: readyAmount || 360,
      pendingAmount,
      attentionAmount,
      paidAmount,
    };
  }, [allClaims]);

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0 pb-4">
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              Insurance Claims
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
              Manage and track all your insurance claims
            </p>
          </div>
          <button
            onClick={() => setShowClientSelectModal(true)}
            className="flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-colors shadow-sm hover:shadow-md flex-shrink-0 w-full md:w-auto cursor-pointer"
          >
            <Plus className="size-4 md:size-5" />
            <span>New Claim</span>
          </button>
        </div>
      )}

      {/* Financial Pipeline Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div
          onClick={() => setStatusFilter(statusFilter === "ready_to_submit" ? "all" : "ready_to_submit")}
          className={`bg-white dark:bg-gray-800 border rounded-2xl p-4 shadow-sm cursor-pointer transition-all ${
            statusFilter === "ready_to_submit"
              ? "border-[#043570] ring-2 ring-[#043570]/20 dark:border-[#00c0ff]"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">🚀 Ready to Submit</p>
          <p className="text-lg md:text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">${financialStats.readyAmount.toFixed(2)}</p>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">Notes & bill done · Awaiting submission</p>
        </div>
        <div
          onClick={() => setStatusFilter(statusFilter === "in_progress" ? "all" : "in_progress")}
          className={`bg-white dark:bg-gray-800 border rounded-2xl p-4 shadow-sm cursor-pointer transition-all ${
            statusFilter === "in_progress"
              ? "border-amber-500 ring-2 ring-amber-500/20"
              : "border-gray-200 dark:border-gray-700 hover:border-amber-300"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">⏳ Pending Payers</p>
          <p className="text-lg md:text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">${financialStats.pendingAmount.toFixed(2)}</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold mt-1">Awaiting adjudication</p>
        </div>
        <div
          onClick={() => setStatusFilter(statusFilter === "action_needed" ? "all" : "action_needed")}
          className={`bg-white dark:bg-gray-800 border rounded-2xl p-4 shadow-sm cursor-pointer transition-all ${
            statusFilter === "action_needed"
              ? "border-red-500 ring-2 ring-red-500/20"
              : "border-gray-200 dark:border-gray-700 hover:border-red-300"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">⚠️ Action Needed</p>
          <p className="text-lg md:text-2xl font-extrabold text-red-600 dark:text-red-400 mt-1">${financialStats.attentionAmount.toFixed(2)}</p>
          <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold mt-1">Denied / Rejected claims</p>
        </div>
        <div
          onClick={() => setStatusFilter(statusFilter === "settled" ? "all" : "settled")}
          className={`bg-white dark:bg-gray-800 border rounded-2xl p-4 shadow-sm cursor-pointer transition-all ${
            statusFilter === "settled"
              ? "border-emerald-500 ring-2 ring-emerald-500/20"
              : "border-gray-200 dark:border-gray-700 hover:border-emerald-300"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">✅ Settled / Paid</p>
          <p className="text-lg md:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">${financialStats.paidAmount.toFixed(2)}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Approved reimbursement</p>
        </div>
      </div>

      {/* Main Table Container (matching BillsHub & UnbilledSessions) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-3 md:p-6">
          {/* Controls Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={claimSearchQuery}
                onChange={(e) => setClaimSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 focus:border-[#043570] text-sm"
                placeholder="Search by claim #, client, or payer..."
              />
            </div>

            {/* Single clean Status Pill Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto bg-gray-50 dark:bg-gray-700 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "all"
                    ? "bg-[#043570] text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All Claims ({allClaims.length})
              </button>
              <button
                onClick={() => setStatusFilter("ready_to_submit")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "ready_to_submit"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                }`}
              >
                🚀 Ready to Submit
              </button>
              <button
                onClick={() => setStatusFilter("in_progress")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "in_progress"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                }`}
              >
                ⏳ In Progress
              </button>
              <button
                onClick={() => setStatusFilter("action_needed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "action_needed"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                }`}
              >
                ⚠️ Action Needed
              </button>
              <button
                onClick={() => setStatusFilter("settled")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "settled"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                }`}
              >
                ✅ Settled / Paid
              </button>
            </div>
          </div>

          {/* Full Table Layout matching BillsHub & UnbilledSessions */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Claim #</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Client</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Payer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <FileText className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No claims found in this view.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredClaims.map((claim) => {
                    const isReady = ["draft", "ready_to_submit", "claim_pending", "unsubmitted"].includes(claim.status);
                    return (
                      <tr
                        key={claim.id}
                        className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <td className="py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          <button
                            onClick={() => navigate(`/claims/${claim.id}`)}
                            className="hover:text-[#043570] dark:hover:text-[#00c0ff] hover:underline cursor-pointer"
                          >
                            {claim.claimNumber}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400 whitespace-nowrap text-xs">
                          {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Mar 12, 2026"}
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => navigate(`/clients/${claim.clientId}`)}
                            className="text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] hover:underline font-semibold text-xs transition-colors cursor-pointer"
                          >
                            {claim.clientName}
                          </button>
                        </td>
                        <td className="py-3 px-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                            <span className="truncate">{claim.payerName || "Insurance"}</span>
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          {getStatusBadge(claim.status)}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-900 dark:text-white font-medium">
                          ${claim.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {isReady && (
                              <button
                                onClick={() => simulateClearinghouseSubmission(claim.id)}
                                title="Submit claim to clearinghouse now"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-[#043570] hover:bg-[#032554] text-white transition-all shadow-2xs cursor-pointer"
                              >
                                Submit
                              </button>
                            )}
                            <button
                              onClick={() => navigate(`/claims/${claim.id}`)}
                              title="View claim details"
                              className="size-8 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer shadow-2xs"
                            >
                              <Eye className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showClientSelectModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowClientSelectModal(false);
                setSearchQuery("");
              }}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Select Client
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose a client to create a new claim
                </p>
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    autoFocus
                  />
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredClients.length > 0 ? (
                  <div className="p-2">
                    {filteredClients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => handleClientSelect(client)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl transition-colors"
                      >
                        <div
                          className={`size-10 ${client.avatarColor} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
                        >
                          {client.initials}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {client.serviceType}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No clients found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
