import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ArrowLeft, Loader2, CheckCircle, Shield } from "lucide-react";
import type { ServiceLine, ClaimSession, Claim, ClaimRegion } from "../types/claims";
import { getCurrencySymbol } from "../types/claims";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function MantraReview() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const location = useLocation();
  const { createNewClaim, updateClaim } = useClaims();
  const { clients, currentProviderId } = usePartnerDashboard();

  const client = clients.find((c) => c.id === clientId);
  const clientName = client?.name || "Client";
  const region = client?.insuranceRegion || "US";
  const symbol = getCurrencySymbol(region);

  const selectedSessions = (location.state as any)?.selectedSessions as ClaimSession[] | undefined;
  const diagnosisCodes = (location.state as any)?.diagnosisCodes as string[] | undefined;
  const serviceLines = (location.state as any)?.serviceLines as ServiceLine[] | undefined;
  const payer = (location.state as any)?.payer as { id: string; name: string; intermediaryName: string } | undefined;

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdClaim, setCreatedClaim] = useState<Claim | null>(null);

  const payerName = payer?.intermediaryName || "the intermediary";
  const selectedPayerId = payer?.id || null;
  const selectedPayerName = payer?.name || null;

  const totalAmount = (serviceLines || []).reduce((sum, sl) => sum + sl.chargeAmount, 0);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const claim = createNewClaim({
        flowType: "mantra",
        region,
        clientId: clientId || "1",
        clientName,
        providerId: currentProviderId,
        payerId: selectedPayerId,
        payerName: selectedPayerName,
        sessionIds: (selectedSessions || []).map((s) => s.id),
        serviceLines: serviceLines || [],
        diagnosisCodes: diagnosisCodes || [],
      });

      const now = new Date();
      const t1 = new Date(now.getTime() - 2000).toISOString();
      const t2 = new Date(now.getTime() - 1000).toISOString();
      const t3 = now.toISOString();

      const updatedClaim: Claim = {
        ...claim,
        status: "pending_with_payer",
        submittedDate: t1,
        statusHistory: [
          ...claim.statusHistory,
          { status: "submitted", timestamp: t1, note: `Submitted to ${payerName}` },
          { status: "scrubbing", timestamp: t2, note: "Clearinghouse validation passed" },
          { status: "pending_with_payer", timestamp: t3, note: "Received by payer" },
        ],
      };
      updateClaim(claim.id, updatedClaim);

      setCreatedClaim(updatedClaim);
      setSubmitting(false);
      setSubmitted(true);

      // Auto-navigate directly to the claim details page
      navigate(`/claims/${claim.id}`);
    }, 1200);
  };

  if (submitted && createdClaim) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center size-16 md:size-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 md:mb-6">
            <CheckCircle className="size-8 md:size-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Claim Submitted Successfully
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Claim {createdClaim.claimNumber} has been submitted via {payerName}.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            Status: Submitted → Scrubbing → Pending with Payer
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(`/claims/${createdClaim.id}`)}
              className="px-6 py-2.5 bg-[#00c0ff] hover:bg-[#0090c0] text-white rounded-lg font-medium transition-all"
            >
              View Claim Details
            </button>
            <button
              onClick={() => navigate("/claims")}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Claims List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-4 pb-3 md:pb-4">
        <button
          onClick={() => navigate(`/claims/new/${clientId}/mantra/details`)}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            Submit via Mantra — {clientName}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Review and submit</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-8 space-y-6">
          <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
            Review & Submit
          </h2>

          <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4 md:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-[#00c0ff]" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Payer</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{payer?.name || "No payer selected"} via {payerName}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Sessions</p>
              <ul className="space-y-1">
                {(selectedSessions || []).map((s) => (
                  <li key={s.id} className="text-sm text-gray-600 dark:text-gray-400">
                    {s.date} at {s.time} — {s.duration}
                  </li>
                ))}
              </ul>
            </div>

            {diagnosisCodes && diagnosisCodes.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Diagnosis Codes</p>
                <div className="flex flex-wrap gap-2">
                  {diagnosisCodes.map((code, i) => (
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

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Service Lines</p>
              {(serviceLines || []).map((sl, i) => (
                <div key={sl.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-400 py-1">
                  <span>{sl.serviceCode || `Line ${i + 1}`} × {sl.units}</span>
                  <span>{symbol}{sl.chargeAmount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <span>Total</span>
                <span>{symbol}{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => navigate(`/claims/new/${clientId}/mantra/details`)}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-2.5 bg-[#00c0ff] hover:bg-[#0090c0] text-white rounded-lg font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting to {payerName}...
                </>
              ) : (
                <>
                  <Shield className="size-4" />
                  Submit via {payerName}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
