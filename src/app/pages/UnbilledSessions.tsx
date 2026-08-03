import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Search,
  FileText,
  Receipt,
  CheckSquare,
  Square,
  Lock,
  Clock,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import type { UnbilledSession } from "../types/claims";

export function UnbilledSessions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientFilterParam = searchParams.get("clientId");

  const { unbilledSessions } = useClaims();
  const { bills } = usePartnerDashboard();

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

  const lockedCount = unbilledForClient.filter((s) => s.notesStatus === "locked").length;
  const totalCount = unbilledForClient.length;
  const readinessPct = totalCount > 0 ? Math.round((lockedCount / totalCount) * 100) : 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [payerFilter, setPayerFilter] = useState("all");
  const [notesFilter, setNotesFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const uniquePayers = useMemo(() => {
    const map = new Map<string, string>();
    unbilledForClient.forEach((s) => map.set(s.payerId, s.payerName));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [unbilledForClient]);

  const filteredSessions = useMemo(
    () =>
      unbilledForClient.filter((s) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          s.clientName.toLowerCase().includes(q) ||
          s.payerName.toLowerCase().includes(q) ||
          s.cptCode.toLowerCase().includes(q);
        const matchesPayer = payerFilter === "all" || s.payerId === payerFilter;
        const matchesNotes =
          notesFilter === "all" ||
          (notesFilter === "locked" && s.notesStatus === "locked") ||
          (notesFilter === "draft" && s.notesStatus === "draft");
        return matchesSearch && matchesPayer && matchesNotes;
      }),
    [unbilledForClient, searchQuery, payerFilter, notesFilter]
  );

  const selectedSessions = unbilledForClient.filter((s) => selectedIds.has(s.id));
  const selectedClientIds = Array.from(new Set(selectedSessions.map((s) => s.clientId)));
  const hasMixedClients = selectedClientIds.length > 1;

  const isSelectable = (session: UnbilledSession) => session.notesStatus === "locked";

  const openCreateBill = (clientId: string, sessionIds: string[]) =>
    navigate(
      `/billing/bills?clientId=${clientId}&openBill=1&sessions=${sessionIds.join(",")}`
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
      prev.size === selectableFiltered.length
        ? new Set()
        : new Set(selectableFiltered.map((s) => s.id))
    );

  const selectableFiltered = filteredSessions.filter(isSelectable);

  const getNotesBadge = (session: UnbilledSession) => {
    if (session.notesStatus === "locked") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <Lock className="size-3" />
          Signed &amp; Ready
        </span>
      );
    }
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/sessions/${session.id}/notes/add?clientId=${session.clientId}`);
        }}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/60 transition-colors cursor-pointer"
        title="Complete and sign the session note to make this appointment billable"
      >
        <Clock className="size-3" />
        Not signed
      </button>
    );
  };

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
              Appointments that haven't generated an invoice yet. Create a bill to charge them —
              you can group several visits onto one invoice.
            </p>
          </div>
        </div>
      </div>

      {/* Readiness summary */}
      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border border-blue-200/80 dark:border-gray-700 rounded-2xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="size-12 rounded-2xl bg-[#043570] text-white flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0">
            {readinessPct}%
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Ready to Bill
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-emerald-600 dark:text-emerald-400">{lockedCount}</strong> of{" "}
              <strong>{totalCount}</strong> unbilled appointments have signed notes.
              {totalCount - lockedCount > 0 && (
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  {" "}
                  ({totalCount - lockedCount} still need a signed note)
                </span>
              )}
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
              <select
                value={notesFilter}
                onChange={(e) => setNotesFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#043570]/20"
              >
                <option value="all">All Notes Status</option>
                <option value="locked">Signed / Ready</option>
                <option value="draft">Not signed</option>
              </select>
            </div>
          </div>

          {/* Bulk action bar */}
          {selectedIds.size > 0 && (
            <div className="mb-4 p-3 bg-[#f3faff] dark:bg-cyan-900/10 border border-[#00c0ff]/30 rounded-lg flex items-center justify-between gap-3 flex-wrap">
              <span className="text-sm font-medium text-[#043570] dark:text-cyan-300">
                {selectedIds.size} appointment{selectedIds.size > 1 ? "s" : ""} selected
                {hasMixedClients && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400 text-xs">
                    (group only one client's appointments per bill)
                  </span>
                )}
              </span>
              <button
                onClick={handleBulkCreateBill}
                disabled={hasMixedClients}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Receipt className="size-3.5" />
                Create Bill ({selectedIds.size})
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
                      {selectedIds.size === selectableFiltered.length && selectableFiltered.length > 0 ? (
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
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Notes</th>
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
                    <td colSpan={11} className="text-center py-12">
                      <FileText className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No unbilled appointments found.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) => {
                    const selectable = isSelectable(session);
                    const checked = selectedIds.has(session.id);
                    return (
                      <tr
                        key={session.id}
                        className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
                          selectable ? "hover:bg-gray-50 dark:hover:bg-gray-750" : "opacity-60"
                        }`}
                      >
                        <td className="py-3 px-2">
                          {selectable ? (
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
                          ) : (
                            <span className="inline-block p-0.5 cursor-not-allowed" title="Sign the session note first">
                              <Square className="size-4 text-gray-300 dark:text-gray-600" />
                            </span>
                          )}
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
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                          {session.payerName}
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                          {session.serviceType}
                        </td>
                        <td className="py-3 px-2">{getNotesBadge(session)}</td>
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
                          {selectable ? (
                            <button
                              onClick={() => openCreateBill(session.clientId, [session.id])}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-[#043570] hover:bg-[#032554] text-white transition-colors whitespace-nowrap"
                            >
                              <Sparkles className="size-3" />
                              Create Bill
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-400 whitespace-nowrap">
                              Sign note first
                            </span>
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
            <Lock className="size-3.5 text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Only <strong>Signed &amp; ready</strong> appointments can be billed. "Create Bill"
              opens the invoice editor for that client — tick several appointments to combine them
              into one multi-line bill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}