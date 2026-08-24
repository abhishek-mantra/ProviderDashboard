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
  Eye,
  Clock,
} from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { predictPayer } from "../types/claims";
import { useGoBack } from "../utils/useGoBack";

interface UnbilledSessionsProps {
  /** Restrict the list to sessions predicted to be paid by a given side. */
  scope?: "all" | "insurance" | "self_pay";
  hideHeader?: boolean;
}

export function UnbilledSessions({ scope: scopeProp = "all", hideHeader }: UnbilledSessionsProps) {
  const navigate = useNavigate();
  const handleBack = useGoBack("/billing");
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

  const unbilledAvailable = useMemo(
    () =>
      unbilledSessions
        .filter((s) => !billedSessionIds.has(s.id)),
    [unbilledSessions, billedSessionIds]
  );

  const scopedSessions = useMemo(
    () =>
      scope === "all"
        ? unbilledAvailable
        : unbilledAvailable.filter(
          (s) => predictPayer(s, clients, claims, bills) === scope
        ),
    [unbilledAvailable, scope, clients, claims, bills]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState<string>(clientFilterParam || "all");
  const [payerFilter, setPayerFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const uniqueClients = useMemo(() => {
    const map = new Map<string, string>();
    scopedSessions.forEach((s) => map.set(s.clientId, s.clientName));
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [scopedSessions]);

  const uniquePayers = useMemo(() => {
    const map = new Map<string, string>();
    scopedSessions.forEach((s) => {
      if (s.payerId && s.payerName) {
        map.set(s.payerId, s.payerName);
      }
    });
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
        const matchesClient = clientFilter === "all" || s.clientId === clientFilter;
        return matchesSearch && matchesPayer && matchesClient;
      }),
    [scopedSessions, searchQuery, payerFilter, clientFilter]
  );

  const selectedSessions = scopedSessions.filter((s) => selectedIds.has(s.id));
  const selectedClientIds = Array.from(new Set(selectedSessions.map((s) => s.clientId)));
  const hasMixedClients = selectedClientIds.length > 1;

  const openCreateBill = (clientId: string, sessionIds: string[]) =>
    navigate(
      `/billing/bills/create?clientId=${clientId}&sessions=${sessionIds.join(",")}${scope === "insurance" ? "&mode=insurance" : ""}`
    );

  const handleBulkCreateBill = () => {
    if (!selectedSessions.length) return;
    if (hasMixedClients) {
      alert("A bill can only group appointments for a single client. Select one client's sessions.");
      return;
    }
    openCreateBill(selectedSessions[0].clientId, selectedSessions.map((s) => s.id));
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
      {!hideHeader && (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={handleBack}
              title="Back to Billing"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="size-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {clientFilter !== "all" ? "Client Unbilled Sessions" : "Unbilled Sessions"}
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
      )}

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
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 cursor-pointer"
              >
                <option value="all">All Clients</option>
                {uniqueClients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={payerFilter}
                onChange={(e) => setPayerFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 cursor-pointer"
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
                {hasMixedClients && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400 text-xs">
                    (group only one client's appointments per bill)
                  </span>
                )}
              </span>
              <button
                onClick={handleBulkCreateBill}
                disabled={hasMixedClients}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                <Receipt className="size-3.5" />
                {scope === "insurance" ? "Create Claim" : "Create Bill"} ({selectedSessions.length})
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
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Age</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Bill</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12">
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
                    const isNoteLocked = session.notesStatus === "locked";
                    const isBilled = billedSessionIds.has(session.id);
                    const clientRecord = clients.find((c) => c.id === session.clientId);
                    const isPayerPending =
                      !session.payerName ||
                      session.payerName.toLowerCase() === "pending" ||
                      session.payerId === "pending" ||
                      session.payerId === "unassigned" ||
                      session.payerName === "Unassigned" ||
                      (scope === "insurance" && !session.payerName && !clientRecord?.insuranceCompany);

                    return (
                      <tr
                        key={session.id}
                        className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors hover:bg-gray-50 dark:hover:bg-gray-750"
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
                            className="text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] hover:underline font-semibold text-xs transition-colors cursor-pointer"
                          >
                            {session.clientName}
                          </button>
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          {isPayerPending ? (
                            <span
                              title="Insurance details pending — client requested to fill details"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60"
                            >
                              <Clock className="size-3.5 text-amber-500 shrink-0" />
                              <span>Pending</span>
                            </span>
                          ) : payer === "insurance" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                              <ShieldCheck className="size-3.5 text-blue-500 shrink-0" />
                              <span className="truncate max-w-[140px]">{session.payerName}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                              <Wallet className="size-3.5 text-emerald-500 shrink-0" />
                              <span>Self-pay</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                          {session.serviceType}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-900 dark:text-white font-medium">
                          ${session.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-500 dark:text-gray-400 text-xs">
                          {session.daysSinceService}d
                        </td>
                        {/* Bill Column */}
                        <td className="py-3 px-2 text-center whitespace-nowrap">
                          {isBilled ? (
                            <button
                              onClick={() => {
                                const matchedBill = bills.find(
                                  (b) =>
                                    b.sessionId === session.id ||
                                    b.serviceLines?.some((l) => l.sessionId === session.id)
                                );
                                if (matchedBill) {
                                  navigate(`/billing/bills/${matchedBill.id}/invoice`);
                                } else {
                                  openCreateBill(session.clientId, [session.id]);
                                }
                              }}
                              title="Invoice generated — click to view"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
                            >
                              <Eye className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span>View</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => openCreateBill(session.clientId, [session.id])}
                              title="Invoice pending — click to create bill"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
                            >
                              <Clock className="size-3 text-amber-500 shrink-0" />
                              <span>Pending</span>
                            </button>
                          )}
                        </td>
                        {/* Notes Column */}
                        <td className="py-3 px-2 text-center whitespace-nowrap">
                          {isNoteLocked ? (
                            <button
                              onClick={() => navigate(`/clients/${session.clientId}/notes`)}
                              title="Session note signed & locked — click to view"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
                            >
                              <Eye className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span>View</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => navigate(`/clients/${session.clientId}/notes`)}
                              title="Note missing or draft — click to complete & sign note"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
                            >
                              <Clock className="size-3 text-amber-500 shrink-0" />
                              <span>Pending</span>
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
              You can create bills and complete session notes in any order. Both completed notes and a generated bill are required prior to submitting an insurance claim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
