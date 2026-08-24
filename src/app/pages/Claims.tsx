import { useNavigate } from "react-router";
import { FileText, Plus, Search, Eye, Filter, X, Send, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { useUserMode } from "../contexts/UserModeContext";
import { CLAIM_STATUS_LABELS } from "../types/claims";
import type { ClaimFlowType, ClaimStatus, Claim } from "../types/claims";
import { ClaimSubmissionModal } from "../components/billing/ClaimSubmissionModal";

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
  const { userMode } = useUserMode();
  const isNew = userMode === "new";
  const { claims, simulateClearinghouseSubmission } = useClaims();
  const { clients: contextClients, currentPracticeId, bills = [] } = usePartnerDashboard();
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [claimSearchQuery, setClaimSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [payerFilter, setPayerFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [flowFilter, setFlowFilter] = useState<string>("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [submittingClaim, setSubmittingClaim] = useState<Claim | null>(null);

  const showClientSelectModal =
    externalShowModal !== undefined ? externalShowModal : internalShowModal;
  const setShowClientSelectModal = externalSetShowModal || setInternalShowModal;

  // Practice-scoped clients
  const practiceClients = isNew
    ? contextClients
    : contextClients.filter((c) => !currentPracticeId || c.practiceId === currentPracticeId);
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
      case "draft":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-750 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
            Draft
          </span>
        );
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
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {label}
          </span>
        );
      case "submitted":
      case "scrubbing":
      case "pending_with_payer":
      case "pended":
      case "awaiting_ack":
      case "no_response_investigate":
      case "stedi_validating":
      case "sent_to_payer":
      case "in_adjudication":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            {label}
          </span>
        );
      case "ready_to_submit":
      case "unsubmitted":
      case "claim_pending":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            Ready to Submit
          </span>
        );
      case "manual_generated":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            Manual Filed
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

    if (!isNew) {
      const hasReady = list.some((c) => ["draft", "ready_to_submit", "claim_pending", "unsubmitted"].includes(c.status));
      if (!hasReady) {
        list.unshift(
          {
            id: "seed-ready-1",
            claimNumber: "CLM-2026-088",
            flowType: "mantra",
            status: "ready_to_submit",
            clientId: "c2",
            clientName: "Michael Chen",
            practiceId: "practice-1",
            providerId: "prov-1",
            payerId: "bupa",
            payerName: "Bupa",
            region: "US",
            sessionIds: ["sess-bupa-1"],
            diagnosisCodes: ["F41.1", "F33.1"],
            serviceLines: [
              { id: "sl-ready-1", sessionId: "sess-bupa-1", dateOfService: "Mar 12, 2026", serviceCode: "90834", units: 1, chargeAmount: 210 },
            ],
            eligibilityCheck: {
              status: "active",
              coverageStart: "2026-01-01",
              coverageEnd: "2026-12-31",
              copayAmount: 25,
              coinsurancePercent: 20,
              deductibleRemaining: 350,
              requiresPreAuth: false,
              checkedAt: "2026-03-12T08:30:00Z",
            },
            authorizationCode: "AUTH-88231",
            submittedDate: null,
            statusHistory: [
              { status: "ready_to_submit", timestamp: "2026-03-12T09:00:00Z", note: "Session notes signed & billed. Ready for electronic submission." },
            ],
            totalAmount: 210,
            currency: "USD",
            pccn: null,
            claimFrequencyCode: "1",
            patientControlNumber: "PCN-READY1",
            isMedicare: false,
            payment: null,
            createdAt: "2026-03-12T08:00:00Z",
            updatedAt: "2026-03-12T09:00:00Z",
          },
          {
            id: "seed-ready-2",
            claimNumber: "CLM-2026-089",
            flowType: "mantra",
            status: "ready_to_submit",
            clientId: "c1",
            clientName: "Sarah Johnson",
            practiceId: "practice-1",
            providerId: "prov-1",
            payerId: "uhc",
            payerName: "UnitedHealthcare",
            region: "US",
            sessionIds: ["unbilled-1"],
            diagnosisCodes: ["F43.22"],
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
    }
    return list;
  }, [claims, bills, isNew]);

  // Unique clients and payers derived from all claims
  const uniqueClients = useMemo(() => {
    const map = new Map<string, string>();
    allClaims.forEach((c) => {
      if (c.clientId && c.clientName) map.set(c.clientId, c.clientName);
    });
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allClaims]);

  const uniquePayers = useMemo(() => {
    const set = new Set<string>();
    allClaims.forEach((c) => {
      if (c.payerName) set.add(c.payerName);
    });
    return Array.from(set).sort();
  }, [allClaims]);

  // Filter claims
  const filteredClaims = useMemo(() => {
    return allClaims.filter((claim) => {
      // 1. Search query
      if (claimSearchQuery.trim()) {
        const q = claimSearchQuery.toLowerCase();
        const matches =
          claim.clientName.toLowerCase().includes(q) ||
          claim.claimNumber.toLowerCase().includes(q) ||
          (claim.payerName || "").toLowerCase().includes(q) ||
          claim.serviceLines.some((sl) => (sl.serviceCode || "").toLowerCase().includes(q));
        if (!matches) return false;
      }

      // 2. Client filter
      if (clientFilter !== "all" && claim.clientId !== clientFilter) {
        return false;
      }

      // 3. Payer filter
      if (payerFilter !== "all" && claim.payerName !== payerFilter) {
        return false;
      }

      // 4. Status filter
      if (statusFilter === "draft") {
        if (claim.status !== "draft") return false;
      } else if (statusFilter === "ready_to_submit") {
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
  }, [allClaims, claimSearchQuery, clientFilter, payerFilter, statusFilter]);

  const financialStats = useMemo(() => {
    let readyAmount = 0;
    let readyCount = 0;
    let pendingAmount = 0;
    let pendingCount = 0;
    let attentionAmount = 0;
    let attentionCount = 0;
    let paidAmount = 0;
    let paidCount = 0;

    allClaims.forEach((claim) => {
      const claimTotal = claim.totalAmount || claim.serviceLines?.reduce((acc, sl) => acc + (sl.chargeAmount || 0), 0) || 0;
      if (["draft", "ready_to_submit", "claim_pending", "unsubmitted"].includes(claim.status)) {
        readyAmount += claimTotal;
        readyCount++;
      } else if (["submitted", "scrubbing", "pending_with_payer", "pended", "awaiting_ack", "no_response_investigate", "stedi_validating", "sent_to_payer", "in_adjudication"].includes(claim.status)) {
        pendingAmount += claimTotal;
        pendingCount++;
      } else if (["denied", "rejected", "stedi_rejected", "payer_rejected", "eligibility_failed"].includes(claim.status)) {
        attentionAmount += claimTotal;
        attentionCount++;
      } else if (["paid", "approved", "adjusted"].includes(claim.status)) {
        paidAmount += claimTotal;
        paidCount++;
      }
    });

    return {
      readyAmount: readyAmount || 360,
      readyCount: readyCount || 2,
      pendingAmount,
      pendingCount,
      attentionAmount,
      attentionCount,
      paidAmount,
      paidCount,
    };
  }, [allClaims]);

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="pb-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Insurance Claims
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
            Manage, track, and submit all your insurance claims
          </p>
        </div>
      )}

      {/* Financial Pipeline Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Card 1: Ready to Submit */}
        <div
          onClick={() => setStatusFilter(statusFilter === "ready_to_submit" ? "all" : "ready_to_submit")}
          className={`group bg-white dark:bg-gray-800 border rounded-2xl p-4.5 cursor-pointer transition-all duration-200 ${
            statusFilter === "ready_to_submit"
              ? "border-[#043570] dark:border-[#00c0ff] ring-2 ring-[#043570]/20 shadow-md"
              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#043570] dark:text-[#00c0ff] flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60">
              <Send className="size-4.5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-[#043570] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {financialStats.readyCount} {financialStats.readyCount === 1 ? "claim" : "claims"}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Ready to Submit
          </p>
          <p className="text-xl md:text-2xl font-black text-gray-900 dark:text-white font-mono tracking-tight mt-1">
            ${financialStats.readyAmount.toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
            Awaiting provider submission
          </p>
        </div>

        {/* Card 2: Pending Payers */}
        <div
          onClick={() => setStatusFilter(statusFilter === "in_progress" ? "all" : "in_progress")}
          className={`group bg-white dark:bg-gray-800 border rounded-2xl p-4.5 cursor-pointer transition-all duration-200 ${
            statusFilter === "in_progress"
              ? "border-amber-500 ring-2 ring-amber-500/20 shadow-md"
              : "border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="size-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/60 dark:border-amber-800/60">
              <Clock className="size-4.5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {financialStats.pendingCount} {financialStats.pendingCount === 1 ? "claim" : "claims"}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Pending with Payers
          </p>
          <p className="text-xl md:text-2xl font-black text-gray-900 dark:text-white font-mono tracking-tight mt-1">
            ${financialStats.pendingAmount.toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
            Under active adjudication
          </p>
        </div>

        {/* Card 3: Action Needed */}
        <div
          onClick={() => setStatusFilter(statusFilter === "action_needed" ? "all" : "action_needed")}
          className={`group bg-white dark:bg-gray-800 border rounded-2xl p-4.5 cursor-pointer transition-all duration-200 ${
            statusFilter === "action_needed"
              ? "border-rose-500 ring-2 ring-rose-500/20 shadow-md"
              : "border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-600 hover:shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="size-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200/60 dark:border-rose-800/60">
              <AlertCircle className="size-4.5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              {financialStats.attentionCount} {financialStats.attentionCount === 1 ? "claim" : "claims"}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Action Needed
          </p>
          <p className="text-xl md:text-2xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight mt-1">
            ${financialStats.attentionAmount.toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
            Denied or rejected by payer
          </p>
        </div>

        {/* Card 4: Settled / Paid */}
        <div
          onClick={() => setStatusFilter(statusFilter === "settled" ? "all" : "settled")}
          className={`group bg-white dark:bg-gray-800 border rounded-2xl p-4.5 cursor-pointer transition-all duration-200 ${
            statusFilter === "settled"
              ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
              : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="size-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/60">
              <CheckCircle2 className="size-4.5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {financialStats.paidCount} {financialStats.paidCount === 1 ? "claim" : "claims"}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Settled / Paid
          </p>
          <p className="text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight mt-1">
            ${financialStats.paidAmount.toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
            Reconciled &amp; reimbursed
          </p>
        </div>
      </div>

      {/* Main Table Container (matching BillsHub & UnbilledSessions) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-3 md:p-6">
          {/* Filters Toolbar (Search by client, payer, or CPT + Client dropdown + Payer dropdown + Status dropdown with Draft) */}
          <div className="flex flex-col lg:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={claimSearchQuery}
                onChange={(e) => setClaimSearchQuery(e.target.value)}
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
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft (Saved CMS-1500)</option>
                <option value="ready_to_submit">Ready to Submit</option>
                <option value="in_progress">In Progress / Submitted</option>
                <option value="settled">Settled / Paid</option>
                <option value="action_needed">Action Needed / Denied</option>
              </select>
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
                                onClick={() => setSubmittingClaim(claim)}
                                title="Submit claim (Choose Manual CMS-1500 or Mantra Clearinghouse)"
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

      {/* Claim Submission Choice Modal */}
      {submittingClaim && (
        <ClaimSubmissionModal
          isOpen={Boolean(submittingClaim)}
          onClose={() => setSubmittingClaim(null)}
          claimId={submittingClaim.id}
          clientName={submittingClaim.clientName}
          payerName={submittingClaim.payerName || "Insurance"}
          totalAmount={submittingClaim.totalAmount}
          onSelectManual={() => {
            const id = submittingClaim.id;
            setSubmittingClaim(null);
            navigate(`/claims/${id}/cms1500`);
          }}
          onSelectClearinghouse={() => {
            const id = submittingClaim.id;
            simulateClearinghouseSubmission(id);
            setSubmittingClaim(null);
            navigate(`/claims/${id}`);
          }}
        />
      )}

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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 pointer-events-auto border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Select Client for New Claim
                  </h3>
                  <button
                    onClick={() => {
                      setShowClientSelectModal(false);
                      setSearchQuery("");
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="size-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clients..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#043570] dark:bg-gray-750 dark:text-white"
                  />
                </div>

                {filteredClients.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredClients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => {
                          setShowClientSelectModal(false);
                          setSearchQuery("");
                          navigate(`/billing/bills/create?clientId=${client.id}&mode=insurance`);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-left cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                      >
                        <div
                          className={`size-10 rounded-full ${client.avatarColor} flex items-center justify-center text-white font-medium text-sm`}
                        >
                          {client.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                            {client.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {client.email} · {client.serviceType}
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
