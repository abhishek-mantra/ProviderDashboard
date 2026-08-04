import { useState } from "react";
import { Receipt, ShieldCheck } from "lucide-react";
import { BillsHub } from "./BillsHub";
import { InsurancePage } from "./InsurancePage";

type BillingTab = "bills" | "insurance";

export function Billing() {
  const [tab, setTab] = useState<BillingTab>("bills");

  return (
    <div className="px-1 md:px-0">
      {/* Header */}
      <div className="mb-5 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
          Billing
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Manage client bills, copays, and outstanding balances
        </p>
      </div>

      {/* Two tabs: Bills | Insurance */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-5 md:mb-6 overflow-x-auto">
        <button
          onClick={() => setTab("bills")}
          className={`px-4 py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap flex items-center gap-2 ${
            tab === "bills"
              ? "text-[#00c0ff]"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <Receipt className="size-4" />
          Bills
          {tab === "bills" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setTab("insurance")}
          className={`px-4 md:px-4 py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap flex items-center gap-2 ${
            tab === "insurance"
              ? "text-[#00c0ff]"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <ShieldCheck className="size-4" />
          Insurance
          {tab === "insurance" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
          )}
        </button>
      </div>

      {/* Content */}
      {tab === "bills" ? (
        <BillsHub />
      ) : (
        <InsurancePage />
      )}
    </div>
  );
}