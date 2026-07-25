import { Shield, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import type { Payer } from "../../types/claims";

interface CredentialingGateProps {
  payer: Payer;
  credentialStatus: "credentialed" | "not_credentialed" | "pending";
  onContinue: () => void;
  onGetCredentialed: () => void;
}

export function CredentialingGate({
  payer,
  credentialStatus,
  onContinue,
  onGetCredentialed,
}: CredentialingGateProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="size-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="size-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
              Credentialing Check
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Before submitting to {payer.name}, we need to confirm your credentialing status.
            </p>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{payer.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{payer.intermediaryName}</p>
            </div>
            {credentialStatus === "credentialed" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle className="size-4" />
                Credentialed
              </span>
            )}
            {credentialStatus === "not_credentialed" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                <AlertTriangle className="size-4" />
                Not credentialed
              </span>
            )}
            {credentialStatus === "pending" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                <Clock className="size-4" />
                Pending
              </span>
            )}
          </div>

          {credentialStatus === "credentialed" && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You are credentialed with {payer.name}. You can proceed with claim submission.
            </p>
          )}
          {credentialStatus === "not_credentialed" && (
            <div>
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                You are not currently credentialed with {payer.name}. You need to complete credentialing before you can submit claims to this payer.
              </p>
              <button
                onClick={onGetCredentialed}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#043570] hover:bg-[#032a57] text-white rounded-lg font-medium transition-colors text-sm"
              >
                <Shield className="size-4" />
                Get Credentialed
              </button>
            </div>
          )}
          {credentialStatus === "pending" && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Your credentialing application with {payer.name} is still being processed. Please wait for approval before submitting claims.
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onContinue}
            disabled={credentialStatus !== "credentialed"}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              credentialStatus === "credentialed"
                ? "bg-[#00c0ff] hover:bg-[#0090c0] text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
