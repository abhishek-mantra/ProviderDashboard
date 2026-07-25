import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ArrowLeft, Download, CheckCircle, FileText } from "lucide-react";
import type { ServiceLine, ClaimSession, ClaimRegion } from "../types/claims";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function ManualGenerate() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const location = useLocation();
  const { createNewClaim } = useClaims();
  const { clients, currentProviderId } = usePartnerDashboard();

  const client = clients.find((c) => c.id === clientId);
  const clientName = client?.name || "Client";
  const region = client?.insuranceRegion || "US";

  const selectedSessions = (location.state as any)?.selectedSessions as ClaimSession[] | undefined;
  const diagnosisCodes = (location.state as any)?.diagnosisCodes as string[] | undefined;
  const serviceLines = (location.state as any)?.serviceLines as ServiceLine[] | undefined;

  const [generated, setGenerated] = useState(false);
  const [claimNumber, setClaimNumber] = useState("");
  const [createdClaimId, setCreatedClaimId] = useState("");

  const handleGenerate = () => {
    const claim = createNewClaim({
      flowType: "manual",
      region,
      clientId: clientId || "1",
      clientName,
      providerId: currentProviderId,
      payerId: null,
      payerName: null,
      sessionIds: (selectedSessions || []).map((s) => s.id),
      serviceLines: serviceLines || [],
      diagnosisCodes: diagnosisCodes || [],
    });
    setClaimNumber(claim.claimNumber);
    setCreatedClaimId(claim.id);
    setGenerated(true);
  };

  if (generated) {
    const documentRoute = region === "US" ? `/claims/${createdClaimId}/cms1500` : `/claims/${createdClaimId}/summary`;
    const documentLabel = region === "US" ? "View / Print CMS-1500" : "View / Print Summary";

    return (
      <div className="space-y-4 md:space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center size-16 md:size-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 md:mb-6">
            <CheckCircle className="size-8 md:size-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Document Generated
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Claim {claimNumber} — Manual claim document ready for download.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            Status: Manual Claim Generated — awaiting your submission to the payer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate(documentRoute)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-all shadow-md"
            >
              <FileText className="size-4" />
              {documentLabel}
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
          onClick={() => navigate(`/claims/new/${clientId}/manual/details`)}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            Manual Self-Filing — {clientName}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Generate your claim document
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-8 space-y-6 text-center">
          <div className="inline-flex items-center justify-center size-16 md:size-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <FileText className="size-8 md:size-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Generate Claim Document
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {region === "US"
              ? "A CMS-1500 form will be generated with your claim data. Download the PDF and submit it to the payer directly."
              : "An itemized claim summary will be generated for you to submit to your insurer."}
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => navigate(`/claims/new/${clientId}/manual/details`)}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-8 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-all shadow-lg"
            >
              <Download className="size-4" />
              Generate Claim Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
