import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ClaimDetailsForm } from "../components/claims/ClaimDetailsForm";
import type { ServiceLine, ClaimSession, ClaimRegion } from "../types/claims";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function MantraDetails() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const location = useLocation();
  const { clients, currentProviderId, providers } = usePartnerDashboard();

  const client = clients.find((c) => c.id === clientId);
  const clientName = client?.name || "Client";
  const region = client?.insuranceRegion || "US";
  const currentProvider = providers.find((p) => p.id === currentProviderId);
  const practitionerName = currentProvider?.name || "";

  const selectedSessions = (location.state as any)?.selectedSessions as ClaimSession[] | undefined;
  const sessionIds = (location.state as any)?.sessionIds as string[] | undefined;
  const payer = (location.state as any)?.payer;
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([""]);
  const [serviceLines, setServiceLines] = useState<ServiceLine[]>([]);
  const [insurerMemberRef, setInsurerMemberRef] = useState("");
  const [gpReferralRef, setGpReferralRef] = useState("");
  const [excessAmount, setExcessAmount] = useState(0);

  const isCA = region === "CA";

  const validationErrors: string[] = [];
  if (!isCA) {
    const hasDiagnosis = diagnosisCodes.some((c) => c.trim().length > 0);
    if (!hasDiagnosis) {
      validationErrors.push("Add at least one diagnosis code");
    }
  }
  const allServiceLinesValid =
    serviceLines.length > 0 &&
    serviceLines.every((sl) => sl.serviceCode.trim().length > 0 && sl.chargeAmount > 0);

  if (!allServiceLinesValid) {
    validationErrors.push("Fill in a procedure code and charge amount for each service line");
  }

  const canContinue = allServiceLinesValid && (isCA || diagnosisCodes.some((c) => c.trim().length > 0));

  const handleContinue = () => {
    const validDiagnosis = diagnosisCodes.filter((c) => c.trim().length > 0);
    const targetId = clientId || "1";
    navigate(`/claims/new/${targetId}/mantra/review`, {
      state: {
        selectedSessions: selectedSessions || [],
        sessionIds: sessionIds || (selectedSessions || []).map((s) => s.id),
        diagnosisCodes: validDiagnosis,
        serviceLines: serviceLines.filter((sl) => sl.serviceCode.trim().length > 0),
        payer: payer || null,
        insurerMemberRef,
        gpReferralRef,
        excessAmount,
        practitionerName,
      },
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-4 pb-3 md:pb-4">
        <button
          type="button"
          onClick={() => navigate(`/claims/new/${clientId || "1"}/mantra/sessions`)}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            Submit via Mantra — {clientName}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Enter claim details
          </p>
        </div>
      </div>

      <ClaimDetailsForm
        region={region}
        selectedSessions={selectedSessions || []}
        diagnosisCodes={diagnosisCodes}
        serviceLines={serviceLines}
        onDiagnosisChange={setDiagnosisCodes}
        onServiceLinesChange={setServiceLines}
        practitionerName={practitionerName}
        insurerMemberRef={insurerMemberRef}
        onInsurerMemberRefChange={setInsurerMemberRef}
        gpReferralRef={gpReferralRef}
        onGpReferralRefChange={setGpReferralRef}
        excessAmount={excessAmount}
        onExcessAmountChange={setExcessAmount}
      />

      <div className="flex flex-col items-end gap-2">
        {validationErrors.length > 0 && (
          <p className="text-xs text-red-600 dark:text-red-400 text-right max-w-xs">
            {validationErrors.join(". ")}.
          </p>
        )}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/claims/new/${clientId || "1"}/mantra/sessions`)}
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!canContinue}
            onClick={handleContinue}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              canContinue
                ? "bg-[#00c0ff] hover:bg-[#0090c0] text-white shadow-lg cursor-pointer"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue to Review
          </button>
        </div>
      </div>
    </div>
  );
}
