import type { ClaimRegion, Payer } from "../../types/claims";
import { MOCK_PAYERS } from "../../types/claims";

interface PayerSelectorProps {
  region: ClaimRegion;
  selectedPayerId: string | null;
  onSelectPayer: (payer: Payer) => void;
  credentialStatus?: Record<string, "credentialed" | "not_credentialed" | "pending">;
}

export function PayerSelector({ region, selectedPayerId, onSelectPayer, credentialStatus }: PayerSelectorProps) {
  const regionPayers = MOCK_PAYERS.filter((p) => p.region === region);

  return (
    <div className="space-y-3">
      {regionPayers.map((payer) => {
        const isSelected = selectedPayerId === payer.id;
        const credStatus = credentialStatus?.[payer.id];
        return (
          <button
            key={payer.id}
            onClick={() => onSelectPayer(payer)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? "border-[#00c0ff] bg-[#f3faff] dark:bg-cyan-900/10 shadow-md"
                : "border-gray-200 dark:border-gray-700 hover:border-[#00c0ff]/50 bg-white dark:bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{payer.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{payer.intermediaryName}</p>
              </div>
              {credStatus && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    credStatus === "credentialed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : credStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {credStatus === "credentialed" ? "Credentialed" : credStatus === "pending" ? "Pending" : "Not credentialed"}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
