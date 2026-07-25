import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { PayerSelector } from "../components/claims/PayerSelector";
import { CredentialingGate } from "../components/claims/CredentialingGate";
import { MOCK_CREDENTIAL_STATUS } from "../types/claims";
import type { Payer, ClaimRegion } from "../types/claims";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

const ELIGIBILITY_LABELS: Record<ClaimRegion, { title: string; button: string }> = {
  US: { title: "Check Eligibility", button: "Run Eligibility Check" },
  UK: { title: "Get Pre-Authorisation", button: "Request Pre-Authorisation" },
  CA: { title: "Submit Predetermination", button: "Submit Predetermination" },
  AE: { title: "Verify with eClaimLink", button: "Verify with eClaimLink" },
};

export function MantraEligibility() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const { clients } = usePartnerDashboard();

  const client = clients.find((c) => c.id === clientId);
  const clientName = client?.name || "Client";
  const region = client?.insuranceRegion || "US";
  const labels = ELIGIBILITY_LABELS[region];
  const isCA = region === "CA";

  const [selectedPayer, setSelectedPayer] = useState<Payer | null>(null);
  const [runningCheck, setRunningCheck] = useState(false);
  const [checkResult, setCheckResult] = useState<"confirmed" | "failed" | null>(null);
  const [credentialOverrides, setCredentialOverrides] = useState<Record<string, "credentialed" | "not_credentialed" | "pending">>({});

  const mergedCredentialStatus = { ...MOCK_CREDENTIAL_STATUS, ...credentialOverrides };

  const effectiveCredentialStatus = selectedPayer
    ? mergedCredentialStatus[selectedPayer.id] ?? "not_credentialed"
    : "not_credentialed";

  const handleRunCheck = () => {
    setRunningCheck(true);
    setCheckResult(null);
    setTimeout(() => {
      setRunningCheck(false);
      setCheckResult(Math.random() > 0.3 ? "confirmed" : "failed");
    }, 2500);
  };

  if (isCA) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 md:gap-4 pb-3 md:pb-4">
          <button onClick={() => navigate("/claims")} className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
            <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
              Submit via Mantra — {clientName}
            </h1>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Canada: TELUS Health eClaims handles eligibility via Predetermination on the claim entry screen.
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 md:p-8 space-y-6">
            <div>
              <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4">
                Select Payer
              </h2>
              <PayerSelector
                region={region}
                selectedPayerId={selectedPayer?.id || null}
                onSelectPayer={(payer) => {
                  setSelectedPayer(payer);
                  setCheckResult(null);
                }}
                credentialStatus={mergedCredentialStatus}
              />
            </div>

            {selectedPayer && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  For Canada (TELUS eClaims), the Predetermination check is done on the same screen as claim submission.
                  Select a credentialed payer to proceed.
                </p>
                <CredentialingGate
                  payer={selectedPayer}
                  credentialStatus={effectiveCredentialStatus}
                  onContinue={() =>
                    navigate(`/claims/new/${clientId}/mantra/sessions`, {
                      state: { payer: selectedPayer, eligibilityConfirmed: true },
                    })
                  }
                  onGetCredentialed={() =>
                    setCredentialOverrides((prev) => ({
                      ...prev,
                      [selectedPayer.id]: "pending",
                    }))
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-4 pb-3 md:pb-4">
        <button
          onClick={() => navigate("/claims")}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
            Submit via Mantra — {clientName}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{labels.title}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-8 space-y-6">
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4">
              Select Payer
            </h2>
            <PayerSelector
              region={region}
              selectedPayerId={selectedPayer?.id || null}
              onSelectPayer={(payer) => {
                setSelectedPayer(payer);
                setCheckResult(null);
              }}
              credentialStatus={mergedCredentialStatus}
            />
          </div>

          {selectedPayer && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                {labels.title}
              </h3>

              <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Client's Policy/Member ID
                </label>
                <input
                  type="text"
                  placeholder="Enter member ID"
                  defaultValue="ABC123456789"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                />
              </div>

              <button
                onClick={handleRunCheck}
                disabled={runningCheck}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00c0ff] hover:bg-[#0090c0] text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {runningCheck ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Shield className="size-4" />
                    {labels.button}
                  </>
                )}
              </button>

              {checkResult === "confirmed" && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-400">Eligibility Confirmed</p>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                        [MOCK] Coverage is active.
                        {region === "US" && " Copay: $30. Deductible remaining: $500."}
                        {region === "UK" && " Pre-authorisation code issued: AUTH-2026-XXXX."}
                        {region === "AE" && " eClaimLink pre-approval confirmed."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {checkResult === "confirmed" && selectedPayer && (
                <div className="mt-4">
                  <CredentialingGate
                    payer={selectedPayer}
                    credentialStatus={effectiveCredentialStatus}
                    onContinue={() =>
                      navigate(`/claims/new/${clientId}/mantra/sessions`, {
                        state: { payer: selectedPayer, eligibilityConfirmed: true },
                      })
                    }
                    onGetCredentialed={() =>
                      setCredentialOverrides((prev) => ({
                        ...prev,
                        [selectedPayer.id]: "pending",
                      }))
                    }
                  />
                </div>
              )}

              {checkResult === "failed" && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <XCircle className="size-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-700 dark:text-red-400">Failed</p>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                        [MOCK] {region === "US" && "Coverage not active for this policy."}
                        {region === "UK" && "Pre-authorisation denied — please contact payer."}
                        {region === "AE" && "eClaimLink verification failed."}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={handleRunCheck}
                          className="px-4 py-2 bg-[#00c0ff] hover:bg-[#0090c0] text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Try Again
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/claims/new/${clientId}/manual/sessions`)
                          }
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Switch to Manual Instead
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
