import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Plus, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  History
} from "lucide-react";
import { toast } from "sonner";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { PLAN_TIER_PRICING } from "../types/partnerDashboard";

export function SettingsBillingCreditUsage() {
  const { getCurrentEstablishment, topUpCredits, addTopUpCredits } = usePartnerDashboard();
  const establishment = getCurrentEstablishment();

  const planTier = establishment?.planTier || "GROWTH";
  
  // Base pool minutes per tier
  const basePoolMinutes = planTier === "BASIC" ? 1000 : planTier === "GROWTH" ? 3000 : 5000;
  
  // Mock used minutes this cycle
  const usedMinutes = 1240;

  // Total available pool
  const totalCapacity = basePoolMinutes + topUpCredits;
  const remainingMinutes = Math.max(0, totalCapacity - usedMinutes);
  const usagePercentage = Math.min(100, Math.round((usedMinutes / totalCapacity) * 100));

  // Top-up packages state
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1); // 1 = 500 mins ($10)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock transaction history
  const [transactions, setTransactions] = useState<Array<{
    id: string;
    date: string;
    description: string;
    minutes: number;
    amount: number;
    status: "Completed";
  }>>([
    {
      id: "tx-101",
      date: "Jul 1, 2026",
      description: `${planTier.charAt(0) + planTier.slice(1).toLowerCase()} Plan Monthly Refill`,
      minutes: basePoolMinutes,
      amount: 0,
      status: "Completed",
    },
  ]);

  const handlePurchaseTopUp = (quantity: number) => {
    setIsProcessing(true);
    const addedMinutes = quantity * 500;
    const cost = quantity * 10;

    setTimeout(() => {
      addTopUpCredits(addedMinutes);
      const newTx = {
        id: `tx-${Date.now().toString().slice(-4)}`,
        date: "Today",
        description: `Credit Top-Up (${addedMinutes.toLocaleString()} mins)`,
        minutes: addedMinutes,
        amount: cost,
        status: "Completed" as const,
      };
      setTransactions([newTx, ...transactions]);
      setIsProcessing(false);
      setIsPurchaseModalOpen(false);
      toast.success(`Successfully added ${addedMinutes.toLocaleString()} top-up credit minutes!`);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="size-6 text-[#00c0ff]" />
            Session Credit Usage & Top-Up
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Monitor establishment credit consumption and buy extra minutes at flat $10 / 500 mins.
          </p>
        </div>
        <button
          onClick={() => setIsPurchaseModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-[#00c0ff] to-[#0099ff] hover:from-[#00b0eff] hover:to-[#0088ee] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus className="size-4" />
          Buy Credit Top-Up ($10/500m)
        </button>
      </div>

      {/* Credit Pool Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Remaining Credits */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Remaining Balance
            </span>
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {remainingMinutes.toLocaleString()} <span className="text-sm font-normal text-gray-500">mins</span>
            </h3>
            <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 font-medium flex items-center gap-1">
              <CheckCircle className="size-3" />
              Active & Available
            </p>
          </div>
        </div>

        {/* Base Monthly Pool */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Base Plan Pool
            </span>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <Sparkles className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {basePoolMinutes.toLocaleString()} <span className="text-sm font-normal text-gray-500">mins</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Included in {planTier} Plan (${PLAN_TIER_PRICING[planTier]}/mo)
            </p>
          </div>
        </div>

        {/* Top-Up Credits */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Purchased Top-Ups
            </span>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <Zap className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              +{topUpCredits.toLocaleString()} <span className="text-sm font-normal text-gray-500">mins</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {topUpCredits > 0 ? "Extra rollover credits added" : "No top-ups purchased yet"}
            </p>
          </div>
        </div>

        {/* Used Minutes */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Used This Cycle
            </span>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {usedMinutes.toLocaleString()} <span className="text-sm font-normal text-gray-500">mins</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {usagePercentage}% of total capacity used
            </p>
          </div>
        </div>
      </div>

      {/* Credit Consumption Bar Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Billing Cycle Pool Status
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Monthly reset on Aug 1, 2026. Top-up credits do not expire at end of month.
            </p>
          </div>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            {remainingMinutes.toLocaleString()} / {totalCapacity.toLocaleString()} Mins Left
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-3.5 rounded-full overflow-hidden p-0.5 flex">
            <div
              style={{ width: `${usagePercentage}%` }}
              className="h-full bg-gradient-to-r from-blue-500 via-[#00c0ff] to-teal-400 rounded-full transition-all duration-500"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>0 mins</span>
            <span>{usedMinutes.toLocaleString()} mins used ({usagePercentage}%)</span>
            <span>{totalCapacity.toLocaleString()} mins capacity</span>
          </div>
        </div>
      </div>

      {/* Top-Up Purchase Options */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-blue-900/40">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200 mb-2">
                <Sparkles className="size-3.5 text-[#00c0ff]" />
                Flat Overage Pricing
              </div>
              <h3 className="text-2xl font-bold text-white">
                Buy More Credits — $10 per 500 Minutes
              </h3>
              <p className="text-sm text-blue-200/80 mt-1 max-w-xl">
                Need additional AI Notetaker & video call capacity? Purchase instant top-ups for any plan tier.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-center flex-shrink-0">
              <span className="text-xs text-blue-200 uppercase font-semibold block">Flat Rate</span>
              <span className="text-2xl font-extrabold text-white">$10 <span className="text-xs font-normal text-blue-200">/ 500 mins</span></span>
            </div>
          </div>

          {/* Quick Select Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Package 1 */}
            <div
              onClick={() => setSelectedQuantity(1)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedQuantity === 1
                  ? "bg-white/15 border-[#00c0ff] shadow-lg scale-[1.02]"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-200 uppercase">Starter Top-Up</span>
                {selectedQuantity === 1 && <CheckCircle className="size-4 text-[#00c0ff]" />}
              </div>
              <h4 className="text-xl font-bold text-white">500 Minutes</h4>
              <p className="text-sm text-blue-200/90 mt-1">$10 ($0.02 / min)</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchaseTopUp(1);
                }}
                className="w-full mt-4 py-2.5 bg-[#00c0ff] hover:bg-[#00b0eff] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Add 500 Mins ($10)
              </button>
            </div>

            {/* Package 2 */}
            <div
              onClick={() => setSelectedQuantity(2)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                selectedQuantity === 2
                  ? "bg-white/15 border-[#00c0ff] shadow-lg scale-[1.02]"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-extrabold uppercase rounded-full shadow-sm">
                Most Popular
              </span>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-200 uppercase">Standard Top-Up</span>
                {selectedQuantity === 2 && <CheckCircle className="size-4 text-[#00c0ff]" />}
              </div>
              <h4 className="text-xl font-bold text-white">1,000 Minutes</h4>
              <p className="text-sm text-blue-200/90 mt-1">$20 ($0.02 / min)</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchaseTopUp(2);
                }}
                className="w-full mt-4 py-2.5 bg-[#00c0ff] hover:bg-[#00b0eff] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Add 1,000 Mins ($20)
              </button>
            </div>

            {/* Package 3 */}
            <div
              onClick={() => setSelectedQuantity(5)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedQuantity === 5
                  ? "bg-white/15 border-[#00c0ff] shadow-lg scale-[1.02]"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-200 uppercase">Pro Top-Up</span>
                {selectedQuantity === 5 && <CheckCircle className="size-4 text-[#00c0ff]" />}
              </div>
              <h4 className="text-xl font-bold text-white">2,500 Minutes</h4>
              <p className="text-sm text-blue-200/90 mt-1">$50 ($0.02 / min)</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchaseTopUp(5);
                }}
                className="w-full mt-4 py-2.5 bg-[#00c0ff] hover:bg-[#00b0eff] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Add 2,500 Mins ($50)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <History className="size-4 text-gray-500" />
            Credit Transaction History
          </h3>
          <span className="text-xs text-gray-500">{transactions.length} Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400 font-semibold uppercase">
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Description</th>
                <th className="pb-3 px-2">Credit Minutes</th>
                <th className="pb-3 px-2">Cost</th>
                <th className="pb-3 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-750/50 transition-colors">
                  <td className="py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">{tx.date}</td>
                  <td className="py-3 px-2 font-semibold text-gray-900 dark:text-white">{tx.description}</td>
                  <td className="py-3 px-2 text-teal-600 dark:text-teal-400 font-bold">+{tx.minutes.toLocaleString()} mins</td>
                  <td className="py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">
                    {tx.amount === 0 ? "Included" : `$${tx.amount}`}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      <CheckCircle className="size-3" />
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top-Up Purchase Modal */}
      <AnimatePresence>
        {isPurchaseModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-gradient-to-r from-blue-600 to-[#00c0ff] p-6 text-white text-center relative">
                <button
                  onClick={() => setIsPurchaseModalOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
                >
                  ✕
                </button>
                <div className="size-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="size-7 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white">Purchase Credit Top-Up</h3>
                <p className="text-blue-100 text-xs mt-1">Instant addition of credit minutes ($10 / 500 mins)</p>
              </div>

              <div className="p-6 space-y-5">
                {/* Quantity selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Select Top-Up Quantity:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 5].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setSelectedQuantity(q)}
                        className={`py-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                          selectedQuantity === q
                            ? "bg-[#00c0ff] text-white border-[#00c0ff] shadow-sm"
                            : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {q * 500} mins (${q * 10})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary box */}
                <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-2xl border border-gray-200 dark:border-gray-650 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Credit Minutes:</span>
                    <span className="font-bold text-gray-900 dark:text-white">+{(selectedQuantity * 500).toLocaleString()} mins</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Unit Rate:</span>
                    <span className="font-bold text-gray-900 dark:text-white">$10 per 500 mins</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between text-sm font-extrabold text-gray-900 dark:text-white">
                    <span>Total Amount:</span>
                    <span className="text-[#00c0ff]">${selectedQuantity * 10}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    disabled={isProcessing}
                    onClick={() => handlePurchaseTopUp(selectedQuantity)}
                    className="w-full py-3 bg-gradient-to-r from-[#00c0ff] to-[#0099ff] hover:from-[#00b0eff] hover:to-[#0088ee] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Processing Top-Up...</span>
                    ) : (
                      <>
                        <CreditCard className="size-4" />
                        <span>Confirm Purchase (${selectedQuantity * 10})</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsPurchaseModalOpen(false)}
                    className="w-full py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
