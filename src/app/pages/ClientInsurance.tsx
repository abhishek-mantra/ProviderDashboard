import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ShieldCheck,
  Eye,
  Plus,
  Edit2,
  Search,
  X,
  Trash2,
  Check,
  Copy,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building2,
  CreditCard,
  ChevronRight,
  Info,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { usePracticeScopedClients } from "../hooks/usePracticeScopedData";
import { CLAIM_STATUS_LABELS } from "../types/claims";
import type { ClaimStatus } from "../types/claims";
import type { ClientInsuranceRecord } from "../types/partnerDashboard";
import { AddInsuranceModal } from "../components/AddInsuranceModal";

export function ClientInsurance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const clients = usePracticeScopedClients();
  const { setClients } = usePartnerDashboard();
  const { claims: allClaims, runEligibilityCheck } = useClaims();
  const contextClient = id ? clients.find((c) => c.id === id) : undefined;

  const [activeTab, setActiveTab] = useState<"insurance" | "claims">("insurance");
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Claims filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payerFilter, setPayerFilter] = useState<string>("all");

  // Eligibility check modal state
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const [targetEligibilityPolicy, setTargetEligibilityPolicy] = useState<ClientInsuranceRecord | null>(null);
  const [eligibilityOutcome, setEligibilityOutcome] = useState<"confirmed" | "transient_outage" | "data_mismatch" | "no_coverage">("confirmed");

  const clientClaims = id ? allClaims.filter((c) => c.clientId === id) : [];
  const uniquePayers = Array.from(new Set(clientClaims.map((c) => c.payerName).filter(Boolean))).sort();

  // Active policies derived from client data
  const policies = useMemo<ClientInsuranceRecord[]>(() => {
    if (contextClient?.insuranceRecords && contextClient.insuranceRecords.length > 0) {
      return contextClient.insuranceRecords;
    }
    const list: ClientInsuranceRecord[] = [];
    if (contextClient?.insuranceCompany) {
      list.push({
        id: "pol-primary",
        type: "primary",
        payerName: contextClient.insuranceCompany,
        payerId: "87726",
        memberId: contextClient.memberId || "UHC-482-7731",
        groupId: "GRP-90214",
        policyHolder: "client",
        policyHolderName: contextClient.name || "Client",
        relationship: "self",
        subscriberDob: "1992-04-15",
        subscriberGender: "female",
        copayAmount: contextClient.copayAmount ?? 30,
        coinsuranceRate: contextClient.coinsuranceRate ?? 20,
        deductible: "$500",
        status: "active",
        verifiedAt: "2026-01-15",
        eligibilityDetails: {
          planName: "Choice Plus PPO",
          inNetworkDeductibleRemaining: "$150.00",
          outOfPocketMax: "$3,000.00",
          priorAuthRequired: false,
          coverageStatus: "active",
        },
      });
    }
    if (contextClient?.insurances) {
      contextClient.insurances.forEach((sec, idx) => {
        list.push({
          id: `pol-sec-${idx}`,
          type: "secondary",
          payerName: sec,
          payerId: "60054",
          memberId: `SEC-${idx + 1}-88421`,
          groupId: "GRP-4410",
          policyHolder: "client",
          policyHolderName: contextClient.name || "Client",
          relationship: "self",
          subscriberDob: "1992-04-15",
          subscriberGender: "female",
          copayAmount: 20,
          coinsuranceRate: 15,
          deductible: "$250",
          status: "active",
          verifiedAt: "2026-01-20",
          eligibilityDetails: {
            planName: "Open Choice Plan",
            inNetworkDeductibleRemaining: "$250.00",
            outOfPocketMax: "$4,500.00",
            priorAuthRequired: false,
            coverageStatus: "active",
          },
        });
      });
    }
    return list;
  }, [contextClient]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Open Add Insurance Dialog
  const handleOpenAdd = () => {
    setEditingPolicyId(null);
    setIsInsuranceModalOpen(true);
  };

  // Open Edit Insurance Dialog
  const handleOpenEdit = (policy: ClientInsuranceRecord) => {
    setEditingPolicyId(policy.id);
    setIsInsuranceModalOpen(true);
  };

  // Delete Policy
  const handleDeletePolicy = (policyId: string) => {
    if (!confirm("Are you sure you want to remove this insurance policy?")) return;
    const nextPolicies = policies.filter((p) => p.id !== policyId);
    const primaryPolicy = nextPolicies.find((p) => p.type === "primary") || nextPolicies[0];
    const secondaryNames = nextPolicies.filter((p) => p.id !== primaryPolicy?.id).map((p) => p.payerName);

    if (contextClient) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === contextClient.id
            ? {
                ...c,
                insuranceCompany: primaryPolicy?.payerName || undefined,
                insurances: secondaryNames,
                memberId: primaryPolicy?.memberId || undefined,
                copayAmount: primaryPolicy?.copayAmount,
                coinsuranceRate: primaryPolicy?.coinsuranceRate,
                insuranceRecords: nextPolicies,
              }
            : c
        )
      );
    }
    showToast("Insurance policy removed.");
  };

  // Trigger Eligibility Check for a Policy
  const handleRunEligibilityForPolicy = (policy: ClientInsuranceRecord) => {
    setTargetEligibilityPolicy(policy);
    setEligibilityOpen(true);
  };

  // Apply Eligibility Outcome to Policy
  const handleApplyEligibility = () => {
    if (!targetEligibilityPolicy || !contextClient) {
      setEligibilityOpen(false);
      return;
    }

    const isConfirmed = eligibilityOutcome === "confirmed";
    const updatedPolicies = policies.map((p) => {
      if (p.id === targetEligibilityPolicy.id) {
        return {
          ...p,
          status: isConfirmed ? ("active" as const) : ("inactive" as const),
          verifiedAt: new Date().toISOString().slice(0, 10),
          copayAmount: isConfirmed ? (p.copayAmount || 30) : 0,
          coinsuranceRate: isConfirmed ? (p.coinsuranceRate || 20) : 0,
          deductible: isConfirmed ? (p.deductible && p.deductible !== "$0" ? p.deductible : "$500") : "$0",
          eligibilityDetails: isConfirmed
            ? {
                coverageStatus: "active",
                planName: `${p.payerName} Comprehensive Plan`,
                inNetworkDeductibleRemaining: "$150.00",
                outOfPocketMax: "$3,000.00",
                priorAuthRequired: false,
              }
            : {
                coverageStatus: "inactive",
                planName: `${p.payerName}`,
                inNetworkDeductibleRemaining: "$0.00",
                outOfPocketMax: "$0.00",
                priorAuthRequired: false,
              },
        };
      }
      return p;
    });

    const primaryPolicy = updatedPolicies.find((p) => p.type === "primary") || updatedPolicies[0];

    setClients((prev) =>
      prev.map((c) =>
        c.id === contextClient.id
          ? {
              ...c,
              copayAmount: primaryPolicy?.copayAmount,
              coinsuranceRate: primaryPolicy?.coinsuranceRate,
              insuranceRecords: updatedPolicies,
            }
          : c
      )
    );

    if (clientClaims.length > 0) {
      runEligibilityCheck(clientClaims[0].id, eligibilityOutcome);
    }

    setEligibilityOpen(false);
    showToast(
      isConfirmed
        ? `Eligibility verified with ${targetEligibilityPolicy.payerName}! Live benefits & copays populated.`
        : `Eligibility check completed: ${eligibilityOutcome.replace("_", " ")}.`
    );
  };

  const getStatusBadge = (status: ClaimStatus) => {
    const label = CLAIM_STATUS_LABELS[status] || status;
    switch (status) {
      case "paid":
      case "approved":
      case "adjusted":
        return (
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            {label}
          </span>
        );
      case "denied":
      case "rejected":
      case "stedi_rejected":
      case "payer_rejected":
      case "eligibility_failed":
        return (
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400">
            {label}
          </span>
        );
      case "in_adjudication":
        return (
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
            {label}
          </span>
        );
      default:
        return (
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
            {label}
          </span>
        );
    }
  };

  const filteredClaims = clientClaims.filter((claim) => {
    const matchesSearch =
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (claim.payerName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesPayer = payerFilter === "all" || claim.payerName === payerFilter;
    return matchesSearch && matchesStatus && matchesPayer;
  });

  const formatCurrency = (amount: number, currency: string) => {
    switch (currency) {
      case "USD": return `$${amount.toFixed(2)}`;
      case "GBP": return `£${amount.toFixed(2)}`;
      case "CAD": return `C$${amount.toFixed(2)}`;
      default: return `$${amount.toFixed(2)}`;
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-3 md:p-6 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold rounded-xl shadow-xl animate-fade-in">
          <CheckCircle2 className="size-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header & Back Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/clients")}
              className="p-2 hover:bg-gray-200/70 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
              title="Back to Clients"
            >
              <ArrowLeft className="size-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Insurance & Coverage
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-[#043570] dark:text-[#00c0ff] border border-blue-200 dark:border-blue-800">
                  {contextClient?.name || "Client"}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {contextClient?.email || "No email on file"} · {contextClient?.phone || "No phone on file"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/billing/bills/create?clientId=${id}&mode=insurance`)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl shadow-2xs cursor-pointer transition-all"
            >
              <FileText className="size-3.5 text-[#043570] dark:text-[#00c0ff]" />
              <span>Create Bill</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer transition-all"
            >
              <Plus className="size-4" />
              <span>Add Insurance</span>
            </button>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/80 dark:border-gray-700/80 overflow-hidden">
          {/* Top Tabs */}
          <div className="border-b border-gray-200/80 dark:border-gray-700/80 bg-gray-50/50 dark:bg-gray-800/50 px-4 md:px-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab("insurance")}
                className={`py-3.5 text-xs md:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "insurance"
                    ? "border-[#043570] text-[#043570] dark:text-[#00c0ff] dark:border-[#00c0ff]"
                    : "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <ShieldCheck className="size-4" />
                <span>Insurance Policies</span>
                <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-[10px] font-bold text-gray-700 dark:text-gray-300">
                  {policies.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("claims")}
                className={`py-3.5 text-xs md:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "claims"
                    ? "border-[#043570] text-[#043570] dark:text-[#00c0ff] dark:border-[#00c0ff]"
                    : "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <FileText className="size-4" />
                <span>Claims History</span>
                <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-[10px] font-bold text-gray-700 dark:text-gray-300">
                  {clientClaims.length}
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1: INSURANCE POLICIES LIST */}
          {activeTab === "insurance" && (
            <div className="p-4 md:p-6 space-y-6">
              <div className="pb-2 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Client Added Insurances
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Active insurance policies, electronic payer IDs, and live verified coverage for this client.
                </p>
              </div>

              {policies.length === 0 ? (
                /* Empty state */
                <div className="p-10 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-center space-y-3 bg-gray-50/50 dark:bg-gray-800/30">
                  <div className="size-12 rounded-2xl bg-blue-100/80 dark:bg-blue-900/30 text-[#043570] dark:text-[#00c0ff] flex items-center justify-center mx-auto">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    No insurance on file
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Add primary and secondary insurance policies to check live benefits, submit electronic claims, and generate superbills.
                  </p>
                  <button
                    onClick={handleOpenAdd}
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    <Plus className="size-4" />
                    <span>Add Insurance Policy</span>
                  </button>
                </div>
              ) : (
                /* Policy Cards Grid */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {policies.map((policy) => {
                    const hasVerifiedBenefits = policy.status === "active" && policy.eligibilityDetails;
                    return (
                      <div
                        key={policy.id}
                        className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 space-y-4 hover:border-blue-400/80 dark:hover:border-blue-500/80 transition-all shadow-2xs group"
                      >
                        {/* Top Badges & Actions */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                policy.type === "primary"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                              }`}
                            >
                              {policy.type} Policy
                            </span>
                            {hasVerifiedBenefits ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle2 className="size-3" /> Active & Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                <AlertCircle className="size-3" /> Pending Verification
                              </span>
                            )}
                            {policy.payerId && (
                              <span className="font-mono text-[10px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                                Payer ID: {policy.payerId}
                              </span>
                            )}
                          </div>

                          {/* Card Actions */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(policy)}
                              className="p-1.5 text-gray-500 hover:text-[#043570] dark:hover:text-[#00c0ff] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                              title="Edit Policy Details"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePolicy(policy.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                              title="Remove Policy"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Carrier & Policyholder Details */}
                        <div className="flex items-start gap-3">
                          <div className="size-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-[#043570] dark:text-[#00c0ff] shrink-0 mt-0.5">
                            <Building2 className="size-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                              {policy.payerName}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Subscriber: <span className="font-semibold text-gray-700 dark:text-gray-200">{policy.policyHolderName}</span>{" "}
                              <span className="text-[11px] text-gray-400">
                                ({policy.relationship ? (policy.relationship === "self" ? "Self" : policy.relationship.toUpperCase()) : "Self"})
                              </span>
                            </p>
                            {policy.subscriberDob && (
                              <p className="text-[11px] text-gray-400">
                                DOB: {policy.subscriberDob} {policy.subscriberGender ? `· ${policy.subscriberGender}` : ""}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Financial & ID Details */}
                        <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-gray-50/70 dark:bg-gray-750/50 rounded-xl border border-gray-100 dark:border-gray-700/60 text-xs">
                          <div>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                              Member ID
                            </span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="font-mono font-bold text-gray-900 dark:text-white">
                                {policy.memberId}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(policy.memberId, `mem-${policy.id}`)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                                title="Copy Member ID"
                              >
                                {copiedField === `mem-${policy.id}` ? (
                                  <Check className="size-3 text-emerald-600" />
                                ) : (
                                  <Copy className="size-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                              Group Number
                            </span>
                            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block">
                              {policy.groupId || "None"}
                            </span>
                          </div>

                          <div>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                              Copay / Coinsurance
                            </span>
                            <span className="font-mono font-semibold text-gray-900 dark:text-white mt-0.5 block">
                              {hasVerifiedBenefits
                                ? `$${policy.copayAmount?.toFixed(2) || "0.00"} ${policy.coinsuranceRate ? `/ ${policy.coinsuranceRate}%` : ""}`
                                : "Pending verification"}
                            </span>
                          </div>

                          <div>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                              Annual Deductible
                            </span>
                            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block">
                              {hasVerifiedBenefits ? (policy.deductible || "$0") : "Pending verification"}
                            </span>
                          </div>
                        </div>

                        {/* Live Benefits Snippet */}
                        {hasVerifiedBenefits ? (
                          <div className="flex items-center justify-between text-[11px] px-3 py-2 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 rounded-xl text-emerald-900 dark:text-emerald-300">
                            <span className="flex items-center gap-1 font-semibold">
                              <Sparkles className="size-3 text-emerald-600" /> Verified via Stedi 270/271
                            </span>
                            <span className="font-mono text-emerald-700 dark:text-emerald-400">
                              Deductible Remaining: {policy.eligibilityDetails?.inNetworkDeductibleRemaining || "$0.00"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[11px] px-3 py-2 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/40 dark:border-blue-800/30 rounded-xl text-[#043570] dark:text-[#00c0ff]">
                            <Info className="size-3.5 shrink-0" />
                            <span>Click 'Check Eligibility' to fetch active copay and deductible from payer.</span>
                          </div>
                        )}

                        {/* Action Footer */}
                        <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-700/50">
                          <button
                            onClick={() => handleRunEligibilityForPolicy(policy)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#043570] dark:text-[#00c0ff] hover:underline cursor-pointer"
                          >
                            <RefreshCw className="size-3.5" />
                            <span>{hasVerifiedBenefits ? "Re-verify Eligibility" : "Check Eligibility"}</span>
                          </button>
                          <button
                            onClick={() => handleOpenEdit(policy)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                          >
                            <span>Edit Policy</span>
                            <ChevronRight className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CLAIMS */}
          {activeTab === "claims" && (
            <div className="p-4 md:p-6 space-y-5">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search claims by number or payer..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    {["draft", "submitted", "in_adjudication", "paid", "denied", "manual_generated", "superbill_generated"].map((s) => (
                      <option key={s} value={s}>
                        {CLAIM_STATUS_LABELS[s as ClaimStatus] || s}
                      </option>
                    ))}
                  </select>

                  <select
                    value={payerFilter}
                    onChange={(e) => setPayerFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Payers</option>
                    {uniquePayers.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Eligibility Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/80 dark:border-blue-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-xl bg-[#043570] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                      Instant Eligibility & Benefits Verification
                    </h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                      Verify client active coverage, deductible balance, and copay before claim submission.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTargetEligibilityPolicy(policies[0] || null);
                    setEligibilityOpen(true);
                  }}
                  disabled={policies.length === 0}
                  className="px-3.5 py-2 bg-[#043570] hover:bg-[#032554] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all shrink-0"
                >
                  Run Eligibility Check
                </button>
              </div>

              {/* Claims Table */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                {filteredClaims.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400">
                    No insurance claims found for this client.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-750/50 text-gray-500 dark:text-gray-400 font-semibold">
                          <th className="py-3 px-4">Claim #</th>
                          <th className="py-3 px-4">Date of Service</th>
                          <th className="py-3 px-4">Payer</th>
                          <th className="py-3 px-4 text-right">Amount</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {filteredClaims.map((claim) => (
                          <tr
                            key={claim.id}
                            className="hover:bg-gray-50/50 dark:hover:bg-gray-750/30 transition-colors"
                          >
                            <td className="py-3 px-4 font-mono font-bold text-gray-900 dark:text-white">
                              {claim.claimNumber}
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                              {claim.serviceLines[0]?.dateOfService || "N/A"}
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                              {claim.payerName || "Self-Pay"}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-gray-900 dark:text-white">
                              {formatCurrency(claim.totalAmount, claim.currency)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {getStatusBadge(claim.status)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => navigate(`/claims/${claim.id}`)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#043570] dark:text-[#00c0ff] hover:underline cursor-pointer"
                              >
                                <Eye className="size-3.5" />
                                <span>View</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reusable Add / Edit Insurance Modal */}
      <AddInsuranceModal
        isOpen={isInsuranceModalOpen}
        onClose={() => {
          setIsInsuranceModalOpen(false);
          setEditingPolicyId(null);
        }}
        client={contextClient}
        editingPolicy={editingPolicyId ? policies.find((p) => p.id === editingPolicyId) : null}
        onSaveSuccess={() => {
          showToast(
            editingPolicyId
              ? "Insurance policy updated successfully!"
              : "New insurance policy saved! Click 'Check Eligibility' to verify benefits."
          );
        }}
      />

      {/* Real-Time Eligibility Check Modal */}
      {eligibilityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-5 animate-scale-up">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#043570] dark:text-[#00c0ff]">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Real-Time Eligibility Check
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {contextClient?.name} · {targetEligibilityPolicy?.payerName || "Primary Payer"} (ID: {targetEligibilityPolicy?.payerId || "87726"})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEligibilityOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Simulated Stedi 270/271 Payer Response
              </p>
              <div className="grid gap-2">
                {([
                  { value: "confirmed", label: "Confirmed — Active Coverage", desc: "Fetches live copay ($30), coinsurance (20%), and remaining deductible." },
                  { value: "transient_outage", label: "Transient Payer Outage", desc: "Auto-retries silently in background, then confirms." },
                  { value: "data_mismatch", label: "Data Mismatch / Member ID Warning", desc: "Flags subscriber name or DOB mismatch." },
                  { value: "no_coverage", label: "No Coverage / Inactive Policy", desc: "Returns inactive policy notice." },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setEligibilityOutcome(opt.value)}
                    className={`text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                      eligibilityOutcome === opt.value
                        ? "border-[#043570] bg-blue-50/70 dark:bg-blue-950/40"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{opt.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setEligibilityOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyEligibility}
                className="px-5 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-md transition-all cursor-pointer"
              >
                Run Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}