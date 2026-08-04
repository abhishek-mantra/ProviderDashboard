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
  const { claims } = useClaims();
  const { clients: contextClients, currentPracticeId } = usePartnerDashboard();
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
    navigate(`/billing/bills/create?clientId=${client.id}`);
  };

  const [phaseFilter, setPhaseFilter] = useState<"all" | "action_needed" | "in_progress" | "settled">("all");

  const financialStats = useMemo(() => {
    let pendingAmount = 0;
    let attentionAmount = 0;
    let paidAmount = 0;

    claims.forEach((claim) => {
      if (!practiceClientIds.has(claim.clientId)) return;
      const claimTotal = claim.serviceLines.reduce((acc, sl) => acc + (sl.chargeAmount || 0), 0);
      if (["submitted", "scrubbing", "pending_with_payer", "pended", "awaiting_ack", "no_response_investigate", "stedi_validating", "sent_to_payer", "in_adjudication"].includes(claim.status)) {
        pendingAmount += claimTotal;
      } else if (["denied", "rejected", "stedi_rejected", "payer_rejected", "eligibility_failed"].includes(claim.status)) {
        attentionAmount += claimTotal;
      } else if (["paid", "approved", "adjusted"].includes(claim.status)) {
        paidAmount += claimTotal;
      }
    });

    return {
      unbilledAmount: 1240,
      pendingAmount,
      attentionAmount,
      paidAmount,
    };
  }, [claims, practiceClientIds]);

  const filteredClaims = claims.filter((claim) => {
    const inPractice = practiceClientIds.has(claim.clientId);
    if (!inPractice) return false;
    const matchesSearch =
      claim.clientName.toLowerCase().includes(claimSearchQuery.toLowerCase()) ||
      claim.claimNumber.toLowerCase().includes(claimSearchQuery.toLowerCase()) ||
      (claim.payerName || "").toLowerCase().includes(claimSearchQuery.toLowerCase());
    
    let matchesPhase = true;
    if (phaseFilter === "action_needed") {
      matchesPhase = ["denied", "rejected", "stedi_rejected", "payer_rejected", "eligibility_failed", "draft"].includes(claim.status);
    } else if (phaseFilter === "in_progress") {
      matchesPhase = ["submitted", "scrubbing", "pending_with_payer", "pended", "awaiting_ack", "no_response_investigate", "stedi_validating", "sent_to_payer", "in_adjudication"].includes(claim.status);
    } else if (phaseFilter === "settled") {
      matchesPhase = ["paid", "approved", "adjusted", "manual_generated", "superbill_generated"].includes(claim.status);
    }

    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesFlow = flowFilter === "all" || claim.flowType === flowFilter;
    return matchesSearch && matchesPhase && matchesStatus && matchesFlow;
  });

  const getClientInfo = (clientName: string) => {
    return clients.find((c) => c.name === clientName);
  };

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
            className="flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-colors shadow-sm hover:shadow-md flex-shrink-0 w-full md:w-auto"
          >
            <Plus className="size-4 md:size-5" />
            <span>New Claim</span>
          </button>
        </div>
      )}

      {/* Financial Pipeline Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">💰 Unbilled Revenue</p>
          <p className="text-lg md:text-2xl font-extrabold text-gray-900 dark:text-white mt-1">${financialStats.unbilledAmount.toFixed(2)}</p>
          <p className="text-[11px] text-[#2563EB] font-semibold mt-1">Ready for submission</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">⏳ Pending Payers</p>
          <p className="text-lg md:text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">${financialStats.pendingAmount.toFixed(2)}</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold mt-1">Awaiting adjudication</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">⚠️ Action Needed</p>
          <p className="text-lg md:text-2xl font-extrabold text-red-600 dark:text-red-400 mt-1">${financialStats.attentionAmount.toFixed(2)}</p>
          <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold mt-1">Denied / Rejected claims</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">✅ Settled / Paid</p>
          <p className="text-lg md:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">${financialStats.paidAmount.toFixed(2)}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Approved reimbursement</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-3 md:p-6">
          {/* Lifecycle Phase Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 overflow-x-auto">
            <button
              onClick={() => setPhaseFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                phaseFilter === "all"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              All Claims
            </button>
            <button
              onClick={() => setPhaseFilter("action_needed")}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                phaseFilter === "action_needed"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100"
              }`}
            >
              ⚠️ Action Needed
            </button>
            <button
              onClick={() => setPhaseFilter("in_progress")}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                phaseFilter === "in_progress"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100"
              }`}
            >
              ⏳ In Progress
            </button>
            <button
              onClick={() => setPhaseFilter("settled")}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                phaseFilter === "settled"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
              }`}
            >
              ✅ Settled / Paid
            </button>
          </div>
          <div className="flex flex-col gap-2 mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-gray-400" />
                <input
                  type="text"
                  value={claimSearchQuery}
                  onChange={(e) => setClaimSearchQuery(e.target.value)}
                  className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 focus:border-[#043570] text-xs md:text-sm"
                  placeholder="Search claims..."
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                {showMobileFilters ? (
                  <X className="size-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Filter className="size-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-1 rounded-lg overflow-x-auto">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "all"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("submitted")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "submitted"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Submitted
              </button>
              <button
                onClick={() => setStatusFilter("in_adjudication")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "in_adjudication"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                In Adjudication
              </button>
              <button
                onClick={() => setStatusFilter("approved")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "approved"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setStatusFilter("denied")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "denied"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Denied
              </button>
              <button
                onClick={() => setStatusFilter("paid")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "paid"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Paid
              </button>
            </div>

            {showMobileFilters && (
              <div className="md:hidden bg-gray-50 dark:bg-gray-750 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {["all", "submitted", "awaiting_ack", "in_adjudication", "paid", "denied"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`flex-1 min-w-[calc(50%-4px)] px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          statusFilter === status
                            ? "bg-[#043570] text-white"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {status === "all" ? "All" : CLAIM_STATUS_LABELS[status as ClaimStatus] || status}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <FileText className="size-4 md:size-5 text-[#043570]" />
            <h2 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">
              All Claims
            </h2>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              ({filteredClaims.length})
            </span>
          </div>

          <div className="space-y-2 md:space-y-3">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim, index) => {
                const clientInfo = getClientInfo(claim.clientName);
                const flowBadge = FLOW_TYPE_BADGES[claim.flowType];
                return (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    className="group p-3 md:p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg md:rounded-xl transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
                  >
                    <div className="hidden md:flex items-center gap-4">
                      {clientInfo ? (
                        <div
                          className={`size-12 ${clientInfo.avatarColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-white font-semibold text-sm">
                            {clientInfo.initials}
                          </span>
                        </div>
                      ) : (
                        <div className="size-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="size-5 text-gray-600 dark:text-gray-400" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {claim.claimNumber}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {claim.clientName}
                          </span>
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium ${flowBadge.color}`}
                          >
                            {flowBadge.label}
                          </span>
                          {getStatusBadge(claim.status)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {claim.payerName || "No payer selected"}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                          ${claim.totalAmount.toFixed(2)}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/claims/${claim.id}`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#043570] dark:hover:text-[#00c0ff] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Eye className="size-3.5" />
                          View
                        </button>
                      </div>
                    </div>

                    <div className="md:hidden space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {clientInfo ? (
                            <div
                              className={`size-8 ${clientInfo.avatarColor} rounded-md flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="text-white font-semibold text-[10px]">
                                {clientInfo.initials}
                              </span>
                            </div>
                          ) : (
                            <div className="size-8 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center flex-shrink-0">
                              <FileText className="size-3.5 text-gray-600 dark:text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {claim.claimNumber}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {claim.clientName}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                          {getStatusBadge(claim.status)}
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            ${claim.totalAmount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="pl-10 space-y-0.5">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">{claim.payerName || "No payer"}</span>
                          <span
                            className={`ml-2 inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium ${flowBadge.color}`}
                          >
                            {flowBadge.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 md:py-12">
                <FileText className="size-10 md:size-12 text-gray-300 dark:text-gray-600 mx-auto mb-2 md:mb-3" />
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  No claims found
                </p>
              </div>
            )}
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
