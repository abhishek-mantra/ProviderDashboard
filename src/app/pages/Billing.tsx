import { useState } from "react";
import { DollarSign, Building2 } from "lucide-react";
import { BankInfo } from "./BankInfo";
import { TaxInfo } from "./TaxInfo";

export function Billing() {
  const [bankTaxSubTab, setBankTaxSubTab] = useState<"bank" | "tax">("bank");

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen px-0 py-0 md:p-6">
      {/* Header */}
      <div className="mb-1 md:mb-8 px-1 md:px-0">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <Building2 className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
              Bank & Tax
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Manage your bank account and tax information for payouts
            </p>
          </div>
        </div>
      </div>

      {/* Bank & Tax Sub-Tabs */}
      <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-transparent overflow-x-auto">
        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={() => setBankTaxSubTab("bank")}
            className={`px-3 md:px-4 py-2 md:py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap ${
              bankTaxSubTab === "bank"
                ? "text-[#00c0ff]"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Bank Info
            {bankTaxSubTab === "bank" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setBankTaxSubTab("tax")}
            className={`px-3 md:px-4 py-2 md:py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap ${
              bankTaxSubTab === "tax"
                ? "text-[#00c0ff]"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Tax Info
            {bankTaxSubTab === "tax" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-0 md:px-0">
        <div>
          {bankTaxSubTab === "bank" && <BankInfo />}
          {bankTaxSubTab === "tax" && <TaxInfo />}
        </div>
      </div>
    </div>
  );
}
