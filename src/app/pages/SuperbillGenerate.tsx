import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ArrowLeft, Download, CheckCircle, Receipt } from "lucide-react";
import type { ClaimSession, ClaimRegion } from "../types/claims";
import { getCurrencySymbol } from "../types/claims";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function SuperbillGenerate() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const location = useLocation();
  const { createNewClaim } = useClaims();
  const { clients, currentProviderId } = usePartnerDashboard();

  const client = clients.find((c) => c.id === clientId);
  const clientName = client?.name || "Client";
  const region = client?.insuranceRegion || "US";
  const symbol = getCurrencySymbol(region);

  const selectedSessions = (location.state as any)?.selectedSessions as ClaimSession[] | undefined;

  const [generated, setGenerated] = useState(false);
  const [claimNumber, setClaimNumber] = useState("");
  const [createdClaimId, setCreatedClaimId] = useState("");

  const totalAmount = (selectedSessions || []).length * 100;

  const handleGenerate = () => {
    const claim = createNewClaim({
      flowType: "superbill",
      region,
      clientId: clientId || "1",
      clientName,
      providerId: currentProviderId,
      sessionIds: (selectedSessions || []).map((s) => s.id),
    });
    setClaimNumber(claim.claimNumber);
    setCreatedClaimId(claim.id);
    setGenerated(true);
  };

  if (generated) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center size-16 md:size-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 md:mb-6">
            <CheckCircle className="size-8 md:size-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Superbill Generated
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Claim {claimNumber} — Superbill ready for your client.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            Status: Superbill Generated — your client will submit this directly to their insurer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate(`/claims/${createdClaimId}/superbill`)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-all shadow-md"
            >
              <Receipt className="size-4" />
              View / Print Superbill
            </button>
            <button
              onClick={() => navigate(`/claims/${createdClaimId}`)}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
          onClick={() => navigate(`/claims/new/${clientId}/superbill/sessions`)}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            Superbill — {clientName}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Generate a superbill for your client
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-8 space-y-6 text-center">
          <div className="inline-flex items-center justify-center size-16 md:size-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
            <Receipt className="size-8 md:size-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Generate Superbill
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            A superbill is a receipt-like document your client submits directly to their insurer
            for reimbursement. No payer selection needed.
          </p>

          <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4 md:p-6 text-left max-w-md mx-auto">
            <p className="font-semibold text-gray-900 dark:text-white mb-3">Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Sessions</span>
                <span className="text-gray-900 dark:text-white">{(selectedSessions || []).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total</span>
                <span className="text-gray-900 dark:text-white font-bold">{symbol}{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">
              Client should submit this directly to their insurer for reimbursement.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => navigate(`/claims/new/${clientId}/superbill/sessions`)}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-8 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg font-medium transition-all shadow-lg"
            >
              <Download className="size-4" />
              Generate Superbill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
