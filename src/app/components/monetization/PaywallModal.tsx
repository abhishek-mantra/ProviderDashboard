import { X, Sparkles, Mic } from "lucide-react";
import { motion } from "motion/react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionDuration: string;
  wordCount: string;
  onAddCredits: () => void;
  onMaybeLater: () => void;
}

export function PaywallModal({
  isOpen,
  onClose,
  sessionDuration,
  wordCount,
  onAddCredits,
  onMaybeLater,
}: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white dark:bg-gray-800 rounded-[14px] border border-[#E5E7EB] p-6 w-full max-w-[360px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-3.5">
          <div className="size-10 bg-[#FEE9C7] rounded-[10px] flex items-center justify-center flex-shrink-0">
            <Mic className="size-5 text-[#F59E0B]" />
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-medium text-[#111827] dark:text-white">
              Session transcribed
            </div>
            <div className="text-[12px] text-[#6B7280] dark:text-gray-400 mt-0.5">
              {sessionDuration} · {wordCount} words generated
            </div>
          </div>
        </div>

        {/* Nudge banner */}
        <div className="bg-[#FAEEDA] border border-[#FAC775] rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Sparkles className="size-3.5 text-[#633806] flex-shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#633806] leading-relaxed">
              Your free session is used. Add credits to keep transcribing — or upgrade your plan to get 200 credits/month included.
            </div>
          </div>
        </div>

        {/* Plan options */}
        <div className="flex gap-2 mb-4">
          {/* Pay as you go */}
          <div className="flex-1 border border-[#E5E7EB] rounded-[10px] p-3 text-center">
            <div className="text-[12px] font-medium text-[#111827] dark:text-white mb-1">
              Pay as you go
            </div>
            <div className="text-[16px] font-medium text-[#111827] dark:text-white mb-1">
              ₹99
            </div>
            <div className="text-[10px] text-[#6B7280] dark:text-gray-400">
              100 credits (~10 sessions)
            </div>
          </div>

          {/* Monthly */}
          <div className="flex-1 border-2 border-[#1EAAE7] rounded-[10px] p-3 text-center relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
              <span className="bg-[#E6F1FB] text-[#185FA5] text-[9px] font-medium px-2 py-0.5 rounded-[10px]">
                Best value
              </span>
            </div>
            <div className="text-[12px] font-medium text-[#111827] dark:text-white mb-1 mt-1">
              Monthly
            </div>
            <div className="text-[16px] font-medium text-[#111827] dark:text-white mb-1">
              ₹299/mo
            </div>
            <div className="text-[10px] text-[#6B7280] dark:text-gray-400">
              300 credits + priority
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <button
            onClick={onAddCredits}
            className="w-full py-3 bg-[#1EAAE7] hover:bg-[#1899d6] text-white text-[13px] font-medium rounded-lg transition-colors"
          >
            Add credits
          </button>
          <button
            onClick={onMaybeLater}
            className="w-full py-3 bg-transparent border border-[#D1D5DB] text-[#6B7280] text-[11px] font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Maybe later — see my transcript first
          </button>
        </div>
      </motion.div>
    </div>
  );
}
