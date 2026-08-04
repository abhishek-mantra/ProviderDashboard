import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Search,
  FileText,
  Receipt,
  CheckSquare,
  Square,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Wallet,
  Lock,
} from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { predictPayer } from "../types/claims";

interface UnbilledSessionsProps {
  /** Restrict the list to sessions predicted to be paid by a given side. */
  scope?: "all" | "insurance" | "self_pay";
}

export function UnbilledSessions({ scope: scopeProp = "all" }: UnbilledSessionsProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientFilterParam = searchParams.get("clientId");
  const scopeParam = searchParams.get("scope");
  const scope = scopeParam === "insurance" || scopeParam === "self_pay" ? scopeParam : scopeProp;

  const { unbilledSessions, claims } = useClaims();
  const { bills, clients } = usePartnerDashboard();

  // Sessions that already generated a invoice are excluded (including sessions
  // grouped under a multi-line bill) so the same appointment can't appear twice.
  const billedSessionIds = useMemo(() => {
    const ids = new Set<string>();
    bills.forEach((b) => {
      ids.add(b.sessionId);
      b.serviceLines?.forEach((l) => ids.add(l.sessionId));
    });
    return ids;
  }, [bills]);

  const unbilledForClient = useMemo(
    () =>
      unbilledSessions
        .filter((s) => !clientFilterParam || s.clientId === clientFilterParam)
        .filter((s) => !billedSessionIds.has(s.id)),
    [unbilledSessions, clientFilterParam, billedSessionIds]
  );

  const scopedSessions = useMemo(
    () =>
      scope === "all"
        ? unbilledForClient
        : unbilledForClient.filter(
            (s) => predictPayer(s, clients, claims, bills) === scope
          ),
    [unbilledForClient, scope, clients, claims, bills]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [payerFilter, setPayerFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const uniquePayers = useMemo(() => {
    const map = new Map<string, string>();
    scopedSessions.forEach((s) => map.set(s.payerId, s.payerName));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [scopedSessions]);

  const filteredSessions = useMemo(
    () =>
      scopedSessions.filter((s) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          s.clientName.toLowerCase().includes(q) ||
          s.payerName.toLowerCase().includes(q) ||
          s.cptCode.toLowerCase().includes(q);
        const matchesPayer = payerFilter === "all" || s.payerId === payerFilter;
        return matchesSearch && matchesPayer;
      }),
    [scopedSessions, searchQuery, payerFilter]
  );

  const selectedSessions = scopedSessions.filter((s) => selectedIds.has(s.id));
  const selectedClientIds = Array.from(new Set(selectedSessions.map((s) => s.clientId)));
  const hasMixedClients = selectedClientIds.length > 1;

  const openCreateBill = (clientId: string, sessionIds: string[]) =>
    navigate(
      `/billing/bills/create?clientId=${clientId}&sessions=${sessionIds.join(",")}`
    );

  const handleBulkCreateBill = () => {
    if (!selectedSessions.length) return;
    const locked = selectedSessions.filter((s) => s.notesStatus === "locked");
    if (locked.length === 0) {
      alert("None of the selected appointments are ready to bill yet. Sign & lock each session note first.");
      return;
    }
    if (hasMixedClients) {
      alert("A bill can only group appointments for a single client. Select one client's sessions.");
      return;
    }
    openCreateBill(locked[0].clientId, locked.map((s) => s.id));
  };

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSelectAll = () =>
    setSelectedIds((prev) =>
      prev.size === filteredSessions.length
        ? new Set()
        : new Set(filteredSessions.map((s) => s.id))
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 pb-4">
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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {clientFilterParam ? "Client Unbilled Sessions" : "Unbilled Sessions"}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {scope === "insurance"
                ? "Appointments predicted to be paid by insurance that haven't generated a claim yet."
                : scope === "self_pay"
                  ? "Appointments predicted to be paid out-of-pocket that haven't generated an invoice yet."
                  : "Appointments that haven't generated an invoice yet. Create a bill to charge them — you can group several visits onto one invoice."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-3 md:p-6">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 focus:border-[#043570] text-xs md:text-sm"
                placeholder="Search by client, payer, or CPT code..."
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={payerFilter}
                onChange={(e) => setPayerFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#043570]/20"
              >
                <option value="all">All Payers</option>
                {uniquePayers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk action bar */}
          {selectedIds.size > 0 && (
            <div className="mb-4 p-3 bg-[#f3faff] dark:bg-cyan-900/10 border border-[#00c0ff]/30 rounded-lg flex items-center justify-between gap-3 flex-wrap">
              <span className="text-sm font-medium text-[#043570] dark:text-cyan-300">
                {selectedSessions.length} appointment{selectedSessions.length > 1 ? "s" : ""} selected
                {selectedSessions.some((s) => s.notesStatus !== "locked") && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400 text-xs">
                    (draft sessions excluded — sign notes first)
                  </span>
                )}
                {hasMixedClients && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400 text-xs">
                    (group only one client's appointments per bill)
                  </span>
                )}
              </span>
              <button
                onClick={handleBulkCreateBill}
                disabled={hasMixedClients || !selectedSessions.some((s) => s.notesStatus === "locked")}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Receipt className="size-3.5" />
                Create Bill ({selectedSessions.filter((s) => s.notesStatus === "locked").length})
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 w-10">
                    <button onClick={toggleSelectAll} className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      {selectedIds.size === filteredSessions.length && filteredSessions.length > 0 ? (
                        <CheckSquare className="size-4 text-[#043570] dark:text-[#00c0ff]" />
                      ) : (
                        <Square className="size-4 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Date of Service</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Client</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Payer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Service</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">CPT</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">ICD-10</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Age</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12">
                      <FileText className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No unbilled appointments found.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) => {
                    const checked = selectedIds.has(session.id);
                    const payer = predictPayer(session, clients, claims, bills);
                    const isDraft = session.notesStatus !== "locked";
                    return (
                      <tr
                        key={session.id}
                        className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors hover:bg-gray-50 dark:hover:bg-gray-750 ${
                          isDraft ? "opacity-80" : ""
                        }`}
                      >
                        <td className="py-3 px-2">
                          <button
                            onClick={() => toggleSelect(session.id)}
                            className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {checked ? (
                              <CheckSquare className="size-4 text-[#043570] dark:text-[#00c0ff]" />
                            ) : (
                              <Square className="size-4 text-gray-400" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-gray-900 dark:text-white whitespace-nowrap">
                          {session.dateOfService}
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => navigate(`/clients/${session.clientId}`)}
                            className="text-[#4169E1] hover:underline font-medium text-xs"
                          >
                            {session.clientName}
                          </button>
                          {isDraft && (
                            <span className="ml-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                              <Lock className="size-2.5" /> draft
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                          <span className="inline-flex items-center gap-1">
                            {session.payerName}
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                payer === "insurance"
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                  : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                              }`}
                            >
                              {payer === "insurance" ? (
                                <>
                                  <ShieldCheck className="size-2.5" /> Insurance
                                </>
                              ) : (
                                <>
                                  <Wallet className="size-2.5" /> Self-pay
                                </>
                              )}
                            </span>
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                          {session.serviceType}
                        </td>
                        <td className="py-3 px-2 text-gray-900 dark:text-white font-mono text-xs">
                          {session.cptCode}
                        </td>
                        <td className="py-3 px-2 text-gray-900 dark:text-white font-mono text-xs">
                          {session.diagnosisCode}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-900 dark:text-white font-medium">
                          ${session.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-500 dark:text-gray-400 text-xs">
                          {session.daysSinceService}d
                        </td>
                        <td className="py-3 px-2 text-right">
                          {isDraft ? (
                            <button
                              onClick={() => navigate(`/clients/${session.clientId}`)}
                              title="Add and lock session notes first before billing"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors shadow-2xs cursor-pointer"
                            >
                              <FileText className="size-3" />
                              Add Notes
                            </button>
                          ) : (
                            <button
                              onClick={() => openCreateBill(session.clientId, [session.id])}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap bg-[#043570] hover:bg-[#032554] text-white transition-colors shadow-2xs cursor-pointer"
                            >
                              <Sparkles className="size-3" />
                              Unbilled
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Guide */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2 flex-wrap">
            <Sparkles className="size-3.5 text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              "Unbilled" opens the invoice editor for that client — tick several appointments to
              combine them into one multi-line bill. Draft sessions show an "Add Notes" button to
              complete &amp; sign session notes prior to billing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
