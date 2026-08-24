import { useNavigate, useParams, useLocation } from "react-router";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Shield,
  Zap,
  Receipt,
  Printer,
  Ban,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useGoBack } from "../utils/useGoBack";
import { WRITE_OFF_REASON_LABELS } from "../types/partnerDashboard";
import { CLAIM_STATUS_LABELS, getCurrencySymbol } from "../types/claims";
import type { ClaimStatus, ClaimFlowType, UnbilledSession } from "../types/claims";

const FLOW_ICONS: Record<ClaimFlowType, typeof Shield> = {
  mantra: Zap,
  manual: FileText,
  superbill: Receipt,
};

export function ClaimDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { claimId } = useParams();
  const {
    getClaim,
    updateClaimStatus,
    updateClaim,
    claims,
    unmarkSessionsBilled,
    simulatePayerAdjudication,
    simulateClearinghouseSubmission,
    reopenForResubmission,
  } = useClaims();
  const {
    currentPracticeId,
    isCurrentUserSuperAdmin,
    remittanceRecords,
    bills,
  } = usePartnerDashboard();
  const [simulating, setSimulating] = useState(false);

  const claim = claimId ? getClaim(claimId) : undefined;

  const handleBack = useGoBack("/billing");

  if (!claim) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Claim Not Found</h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            This claim does not exist or has been removed.
          </p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-[#043570] text-white rounded-lg"
          >
            Back to Claims
          </button>
        </div>
      </div>
    );
  }

  const FlowIcon = FLOW_ICONS[claim.flowType];

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case "paid":
      case "approved":
      case "adjusted":
      case "eligibility_confirmed":
        return "green";
      case "denied":
      case "rejected":
      case "stedi_rejected":
      case "payer_rejected":
      case "eligibility_failed":
        return "red";
      case "in_adjudication":
        return "blue";
      case "submitted":
      case "scrubbing":
      case "pending_with_payer":
      case "pended":
      case "eligibility_pending":
      case "awaiting_ack":
      case "no_response_investigate":
      case "stedi_validating":
      case "sent_to_payer":
        return "yellow";
      case "manual_generated":
      case "superbill_generated":
        return "purple";
      default:
        return "gray";
    }
  };

  const statusColor = getStatusColor(claim.status);

  const handleSimulatePayerResponse = () => {
    setSimulating(true);
    setTimeout(() => {
      simulatePayerAdjudication(claim.id);
      setSimulating(false);
    }, 2000);
  };

  const handleCorrectAndResubmit = () => {
    const restoredSessions: UnbilledSession[] = claim.serviceLines.map((sl) => ({
      id: sl.sessionId,
      clientId: claim.clientId,
      clientName: claim.clientName,
      dateOfService: sl.dateOfService,
      payerId: claim.payerId || "",
      payerName: claim.payerName || "",
      serviceType: "Therapy",
      duration: "50 min",
      notesStatus: "locked",
      notesId: null,
      cptCode: sl.serviceCode,
      diagnosisCode: claim.diagnosisCodes[0] || "",
      amount: sl.chargeAmount,
      daysSinceService: 0,
      selected: false,
    }));
    unmarkSessionsBilled(restoredSessions);
    // Part 4b — recompute CFC/PCN from the real PCCN/Medicare rules.
    reopenForResubmission(claim.id);
    updateClaim(claim.id, { status: "draft" });
    navigate(`/billing/bills?clientId=${claim.clientId}&resubmitClaimId=${claim.id}`);
  };

  const claimRemittance = remittanceRecords.find(
    (r) => r.claimId === claim?.id || r.claimId === claim?.claimNumber
  );
  const claimBill = bills.find((b) => b.claimId === claim?.id || b.claimId === claim?.claimNumber);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Claim {claim.claimNumber}
          </h1>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${
            statusColor === "green"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : statusColor === "red"
              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
              : statusColor === "yellow"
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
              : statusColor === "blue"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
              : statusColor === "purple"
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {CLAIM_STATUS_LABELS[claim.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              {/* Visual Claim Lifecycle Stepper (real clearinghouse model) */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-2xl">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Claim Progress — Clearinghouse Model {claim.pccn ? "· PCCN " + claim.pccn : ""}
                </p>
                <div className="flex items-center justify-between text-xs font-semibold relative">
                  {/* Stepper Steps */}
                  {[
                    { key: "draft", label: "Draft" },
                    { key: "submitted", label: "Submitted" },
                    { key: "stedi_validating", label: "Clearinghouse Validate" },
                    { key: "sent_to_payer", label: "Sent to Payer" },
                    { key: "in_adjudication", label: "Adjudication" },
                    { key: "terminal", label: "Paid / Denied" },
                  ].map((step, idx) => {
                    const STATUS_TO_STEP: Record<string, number> = {
                      draft: 0,
                      submitted: 1, awaiting_ack: 1, no_response_investigate: 1,
                      stedi_validating: 2, scrubbing: 2,
                      sent_to_payer: 3, pending_with_payer: 3,
                      in_adjudication: 4, pended: 4,
                      paid: 5, denied: 5, adjusted: 5, approved: 5, rejected: 5, stedi_rejected: 5, payer_rejected: 5,
                    };
                    const currentIdx = STATUS_TO_STEP[claim.status] ?? 0;
                    const isDone = currentIdx > idx;
                    const isCurrent = currentIdx === idx;
                    const isTerminalFailure =
                      ["denied", "rejected", "stedi_rejected", "payer_rejected"].includes(claim.status) &&
                      idx === 5;

                    return (
                      <div key={step.key} className="flex-1 flex flex-col items-center relative text-center">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center font-bold text-xs transition-all z-10 ${
                            isTerminalFailure
                              ? "bg-red-600 text-white shadow-md ring-4 ring-red-100 dark:ring-red-900/50"
                              : isDone
                              ? "bg-emerald-600 text-white"
                              : isCurrent
                              ? "bg-[#043570] text-white ring-4 ring-blue-100 dark:ring-blue-900/50"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                          }`}
                        >
                          {isTerminalFailure ? "✕" : isDone ? "✓" : idx + 1}
                        </div>
                        <span className={`mt-1 text-[11px] ${isTerminalFailure ? "text-red-600 font-bold" : isDone || isCurrent ? "text-gray-900 dark:text-white font-bold" : "text-gray-400"}`}>
                          {isTerminalFailure ? "Denied/Rejected" : step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actionable Denial Fix Assistant */}
              {["denied", "rejected", "stedi_rejected", "payer_rejected"].includes(claim.status) && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-5 mb-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-red-700 dark:text-red-300 font-bold text-base">
                    <XCircle className="size-5 text-red-600 shrink-0" />
                    <span>Action Required: Claim Denied / Rejected</span>
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>Denial Reason:</strong> {claim.statusHistory[claim.statusHistory.length - 1]?.note || "Service not covered under current plan benefits or code modification required."}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-red-200 dark:border-red-800/50">
                    <p className="text-xs text-red-700 dark:text-red-300 font-medium">
                      💡 <strong>Suggested Fix:</strong> Click <strong>Fix & Resubmit Claim</strong> to update diagnosis/CPT codes or re-verify client insurance details.
                    </p>
                    <button
                      onClick={handleCorrectAndResubmit}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <RefreshCw className="size-3.5" />
                      Fix & Resubmit Claim
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Client</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {claim.clientName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payer</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {claim.payerName || "N/A (Manual/Superbill)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Submitted</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {claim.submittedDate ? formatDate(claim.submittedDate) : "Not yet submitted"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sessions</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {claim.sessionIds.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {claim.currency === "USD"
                      ? `$${claim.totalAmount.toFixed(2)}`
                      : claim.currency === "GBP"
                      ? `£${claim.totalAmount.toFixed(2)}`
                      : claim.currency === "CAD"
                      ? `C$${claim.totalAmount.toFixed(2)}`
                      : `AED ${claim.totalAmount.toFixed(2)}`}
                  </p>
                </div>
              </div>

              {claim.diagnosisCodes.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Diagnosis Codes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {claim.diagnosisCodes.map((code, i) => (
                      <span
                        key={i}
                        className="inline-flex px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium"
                      >
                        {String.fromCharCode(65 + i)}. {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {claim.serviceLines.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Service Lines
                  </p>
                  <div className="space-y-2">
                    {claim.serviceLines.map((sl) => (
                      <div
                        key={sl.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {sl.serviceCode || "No code"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {sl.dateOfService} · {sl.units} unit{sl.units > 1 ? "s" : ""}
                            {sl.modifiers?.length ? ` · Mod: ${sl.modifiers.join(", ")}` : ""}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {getCurrencySymbol(claim.currency)}{sl.chargeAmount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {claim.eligibilityCheck && (
                <div
                  className={`p-4 rounded-xl border ${
                    claim.eligibilityCheck.status === "confirmed"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : claim.eligibilityCheck.status === "failed"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">
                    Eligibility:{""}
                    {claim.eligibilityCheck.status === "confirmed"
                      ? " Confirmed"
                      : claim.eligibilityCheck.status === "failed"
                      ? " Failed"
                      : " Pending"}
                  </p>
                  {claim.eligibilityCheck.rawNote && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {claim.eligibilityCheck.rawNote}
                    </p>
                  )}
                  {claim.eligibilityCheck.status === "failed" &&
                    claim.eligibilityCheck.failureMode && (
                      <p className="text-xs font-semibold mt-2">
                        {claim.eligibilityCheck.failureMode === "transient_outage"
                          ? "Transient payer outage — response will auto-retry."
                          : claim.eligibilityCheck.failureMode === "data_mismatch"
                          ? "Data mismatch (name/DOB variation) — correct the flagged field and retry."
                          : "No coverage on file — contact payer or try a different identifier."}
                      </p>
                    )}
                  {claim.eligibilityCheck.benefitEstimate && (
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-white/70 dark:bg-gray-900/40 border border-green-200 dark:border-green-800 p-2">
                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Copay
                        </p>
                        <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {claim.eligibilityCheck.benefitEstimate.copayAmount != null
                            ? `$${claim.eligibilityCheck.benefitEstimate.copayAmount.toFixed(2)}`
                            : "—"}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/70 dark:bg-gray-900/40 border border-green-200 dark:border-green-800 p-2">
                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Coinsurance
                        </p>
                        <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {claim.eligibilityCheck.benefitEstimate.coinsuranceRate != null
                            ? `${claim.eligibilityCheck.benefitEstimate.coinsuranceRate}%`
                            : "—"}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/70 dark:bg-gray-900/40 border border-green-200 dark:border-green-800 p-2">
                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Deductible left
                        </p>
                        <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {claim.eligibilityCheck.benefitEstimate.deductibleRemaining != null
                            ? `$${claim.eligibilityCheck.benefitEstimate.deductibleRemaining.toFixed(2)}`
                            : "—"}
                        </p>
                      </div>
                    </div>
                  )}
                  {claim.eligibilityCheck.benefitEstimate?.behavioralHealthCarveoutNote && (
                    <p className="text-[11px] italic text-gray-500 dark:text-gray-400 mt-3">
                      {claim.eligibilityCheck.benefitEstimate.behavioralHealthCarveoutNote}
                    </p>
                  )}
                </div>
              )}

              {claim.authorizationCode && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                    Authorisation Code: {claim.authorizationCode}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Clearinghouse Reference
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">PCCN</span>
                  <span className={`font-mono font-semibold ${claim.pccn ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                    {claim.pccn || "Not assigned (pre-adjudication)"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Claim Frequency Code</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    {claim.claimFrequencyCode || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Patient Control #</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white break-all text-right ml-4">
                    {claim.patientControlNumber || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Plan Type</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {claim.isMedicare ? "Medicare" : "Commercial"}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-3">
                {claim.pccn
                  ? "PCCN assigned — payer has accepted the claim into adjudication."
                  : "No PCCN yet — the claim has not reached adjudication."}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Status Timeline
              </h2>
              <div className="space-y-0">
                {claim.statusHistory.map((event, index) => (
                  <div key={index} className="flex gap-3 pb-4 relative">
                    {index < claim.statusHistory.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div
                      className={`size-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        event.status === "paid" || event.status === "approved" || event.status === "adjusted"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : event.status === "denied" || event.status === "rejected" || event.status === "stedi_rejected" || event.status === "payer_rejected"
                          ? "bg-red-100 dark:bg-red-900/30"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {event.status === "paid" || event.status === "approved" || event.status === "adjusted" ? (
                        <CheckCircle className="size-3.5 text-green-600 dark:text-green-400" />
                      ) : event.status === "denied" || event.status === "rejected" || event.status === "stedi_rejected" || event.status === "payer_rejected" ? (
                        <XCircle className="size-3.5 text-red-600 dark:text-red-400" />
                      ) : (
                        <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {CLAIM_STATUS_LABELS[event.status]}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(event.timestamp)}
                      </p>
                      {event.note && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {claimRemittance && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Receipt className="size-4 text-emerald-500" />
                Remittance / ERA
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Billed</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    ${claimRemittance.billedAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Allowed</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    ${claimRemittance.allowedAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Paid</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                    ${claimRemittance.paidAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Patient Responsibility</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    ${claimRemittance.patientResponsibility.toFixed(2)}
                  </span>
                </div>
                {claimRemittance.adjustmentReason && (
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Adjustment Reason
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {claimRemittance.adjustmentReason}
                    </p>
                  </div>
                )}
                {claimRemittance.discrepancyFlag && (
                  <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs font-bold text-red-700 dark:text-red-300">
                    Payment discrepancy / underpayment flagged
                  </div>
                )}
                <p className="text-[11px] text-gray-400 dark:text-gray-500 pt-1">
                  Posted {formatDate(claimRemittance.postedAt)}
                </p>
              </div>
            </div>
          )}

          {claimBill && claimBill.status === "written_off" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Ban className="size-4 text-red-500" />
                Write-Off
              </h3>
              <div className="space-y-1.5 text-sm">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reason
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {WRITE_OFF_REASON_LABELS[claimBill.writeOffReason || "bad_debt"]}
                </p>
                {claimBill.writeOffNote && (
                  <>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pt-1">
                      Note
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 italic">{claimBill.writeOffNote}</p>
                  </>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 pt-1">
                  Written off {claimBill.resolvedAt ? formatDate(claimBill.resolvedAt) : ""}
                </p>
              </div>
            </div>
          )}

          {claim.flowType === "manual" && claim.region === "US" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                CMS-1500 Form
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                View the CMS-1500 claim form for this claim.
              </p>
              <button
                onClick={() => navigate(`/claims/${claim.id}/cms1500`, { state: { from: location.state?.from || "/billing" } })}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#043570] hover:bg-[#032a57] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Printer className="size-4" />
                View CMS-1500
              </button>
            </div>
          )}

          {claim.flowType === "manual" && claim.region !== "US" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Claim Summary
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                View the itemized claim summary for submission to your insurer.
              </p>
              <button
                onClick={() => navigate(`/claims/${claim.id}/summary`, { state: { from: location.state?.from || "/billing" } })}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <FileText className="size-4" />
                View Summary
              </button>
            </div>
          )}

          {claim.status === "draft" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Submit Claim Options
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Choose electronic submission via clearinghouse or manual filing with paper/payer portal.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => simulateClearinghouseSubmission(claim.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Send className="size-3.5" />
                  Submit via Mantra Clearinghouse
                </button>
                <button
                  onClick={() => {
                    navigate(`/claims/${claim.id}/cms1500`, { state: { from: `/claims/${claim.id}` } });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <FileText className="size-3.5 text-blue-600 dark:text-blue-400" />
                  Submit Manually (CMS-1500 Form)
                </button>
              </div>
            </div>
          )}

          {claim.flowType === "mantra" &&
            (claim.status === "in_adjudication" || claim.status === "pending_with_payer") && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Demo Controls
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Simulate a payer response for demo purposes.
              </p>
              <button
                onClick={handleSimulatePayerResponse}
                disabled={simulating}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#043570] hover:bg-[#032a57] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {simulating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4" />
                    Simulate Payer Response
                  </>
                )}
              </button>
            </div>
          )}

          {claim.flowType === "mantra" && claim.payment && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Receipt className="size-4 text-emerald-500" />
                Adjudication Result (835)
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Billed</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    ${claim.payment.billedAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Allowed</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    ${claim.payment.allowedAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Paid</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                    ${claim.payment.paidAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Patient Responsibility</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    ${claim.payment.patientResponsibility.toFixed(2)}
                  </span>
                </div>
                {claim.payment.adjustmentReason && (
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Adjustment Reason
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {claim.payment.adjustmentReason}
                    </p>
                  </div>
                )}
                {claim.payment.remarkCode && (
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Remark code {claim.payment.remarkCode}
                  </p>
                )}
              </div>
            </div>
          )}

          {claim.flowType === "mantra" && claim.status === "approved" && !claimRemittance && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Close Claim — Record Remittance
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Payer approved this claim. Record the payment to post the ERA and close the claim.
              </p>
              <button
                onClick={() => simulatePayerAdjudication(claim.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <CheckCircle className="size-4" />
                Record Payment & Remittance
              </button>
            </div>
          )}

          {claim.flowType === "mantra" &&
            ["denied", "rejected", "pended", "stedi_rejected", "payer_rejected"].includes(claim.status) && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Claim {claim.status === "denied" ? "Denied" : claim.status === "rejected" ? "Rejected" : "Pended"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Correct the issues and resubmit this claim. Your existing data will be preloaded.
              </p>
              <button
                onClick={handleCorrectAndResubmit}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00c0ff] hover:bg-[#0090c0] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <RefreshCw className="size-4" />
                Correct & Resubmit
              </button>
            </div>
          )}

          {claim.flowType === "manual" && claim.status === "manual_generated" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Manual Claim — Update Status
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Since we can't track this claim automatically, you can manually update its status.
              </p>
              <button
                onClick={() => updateClaimStatus(claim.id, "paid")}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Mark as Paid
              </button>
            </div>
          )}

          {claim.flowType === "superbill" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Superbill Document
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                View the superbill receipt for your client to submit to their insurer for reimbursement.
              </p>
              <button
                onClick={() => navigate(`/claims/${claim.id}/superbill`)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Receipt className="size-4" />
                View Superbill
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
