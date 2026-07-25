import { useNavigate, useParams } from "react-router";
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
} from "lucide-react";
import { useState } from "react";
import { useClaims } from "../contexts/ClaimContext";
import { CLAIM_STATUS_LABELS, getCurrencySymbol } from "../types/claims";
import type { ClaimStatus, ClaimFlowType } from "../types/claims";

const FLOW_ICONS: Record<ClaimFlowType, typeof Shield> = {
  mantra: Zap,
  manual: FileText,
  superbill: Receipt,
};

export function ClaimDetail() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { getClaim, updateClaimStatus, updateClaim, claims } = useClaims();
  const [simulating, setSimulating] = useState(false);

  const claim = claimId
    ? claims.find((c) => c.id === claimId || c.claimNumber === claimId)
    : undefined;

  if (!claim) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4">
          <button
            onClick={() => navigate("/claims")}
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
            onClick={() => navigate("/claims")}
            className="mt-4 px-4 py-2 bg-[#4169E1] text-white rounded-lg"
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
      case "eligibility_confirmed":
        return "green";
      case "denied":
      case "rejected_by_intermediary":
      case "eligibility_failed":
        return "red";
      case "submitted":
      case "scrubbing":
      case "pending_with_payer":
      case "eligibility_pending":
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
      const nextStatus: ClaimStatus = Math.random() > 0.4 ? "approved" : "denied";
      const note =
        nextStatus === "denied"
          ? "[MOCK] Denial reason: Service not covered under current plan benefits."
          : undefined;
      updateClaimStatus(claim.id, nextStatus, note);
      setSimulating(false);
    }, 2000);
  };

  const handleCorrectAndResubmit = () => {
    updateClaimStatus(claim.id, "draft");
    navigate(`/claims/new/${claim.clientId}/mantra/details`);
  };

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
            onClick={() => navigate("/claims")}
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
              <div className="flex items-center gap-2 mb-6">
                <FlowIcon className="size-5 text-[#4169E1]" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Claim Details
                </h2>
                <span
                  className={`ml-2 inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    claim.flowType === "mantra"
                      ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                      : claim.flowType === "manual"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  }`}
                >
                  {claim.flowType.charAt(0).toUpperCase() + claim.flowType.slice(1)}
                </span>
                <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {claim.region}
                </span>
              </div>

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
                        event.status === "paid" || event.status === "approved"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : event.status === "denied" || event.status === "rejected_by_intermediary"
                          ? "bg-red-100 dark:bg-red-900/30"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {event.status === "paid" || event.status === "approved" ? (
                        <CheckCircle className="size-3.5 text-green-600 dark:text-green-400" />
                      ) : event.status === "denied" || event.status === "rejected_by_intermediary" ? (
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

          {claim.flowType === "manual" && claim.region === "US" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                CMS-1500 Form
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                View the CMS-1500 claim form for this claim.
              </p>
              <button
                onClick={() => navigate(`/claims/${claim.id}/cms1500`)}
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
                onClick={() => navigate(`/claims/${claim.id}/summary`)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <FileText className="size-4" />
                View Summary
              </button>
            </div>
          )}

          {claim.flowType === "mantra" && claim.status === "pending_with_payer" && (
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

          {claim.flowType === "mantra" && claim.status === "denied" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Claim Denied
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Correct the issues and resubmit this claim.
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
