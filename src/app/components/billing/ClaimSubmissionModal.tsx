import { X, FileText, Send, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

interface ClaimSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimId?: string;
  billId?: string;
  clientName?: string;
  payerName?: string;
  totalAmount?: number;
  onSelectManual: () => void;
  onSelectClearinghouse: () => void;
}

export function ClaimSubmissionModal({
  isOpen,
  onClose,
  claimId,
  billId,
  clientName = "Client",
  payerName = "Insurance Payer",
  totalAmount = 0,
  onSelectManual,
  onSelectClearinghouse,
}: ClaimSubmissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 md:p-7 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-5 my-8 animate-scale-up">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-700">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#043570] dark:text-[#00c0ff] border border-blue-200 dark:border-blue-800 mb-1.5">
              <ShieldCheck className="size-3.5" />
              <span>Claim Submission Method</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              Choose How to File This Claim
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {clientName} · {payerName} · Total Billed: <span className="font-mono font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Two Submission Method Cards */}
        <div className="grid grid-cols-1 gap-3.5">
          {/* OPTION 1: Submit via Mantra Clearinghouse (On Top) */}
          <div
            onClick={() => {
              onClose();
              onSelectClearinghouse();
            }}
            className="group relative p-4 md:p-5 bg-gradient-to-br from-blue-50/60 to-white dark:from-blue-950/30 dark:to-gray-800 border-2 border-blue-200/90 dark:border-blue-800/90 hover:border-[#043570] dark:hover:border-[#00c0ff] rounded-2xl cursor-pointer transition-all shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="size-11 rounded-xl bg-[#043570] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  <Send className="size-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white truncate">
                      Submit via Mantra Clearinghouse
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 flex items-center gap-1 shrink-0">
                      <Sparkles className="size-2.5" /> Electronic 837P
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Direct automated clearinghouse transmission to payer
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-blue-100/60 dark:bg-blue-900/30 text-[#043570] dark:text-[#00c0ff] group-hover:bg-[#043570] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>

          {/* OPTION 2: Manual CMS-1500 Form Submission (Second) */}
          <div
            onClick={() => {
              onClose();
              onSelectManual();
            }}
            className="group relative p-4 md:p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#043570] dark:hover:border-[#00c0ff] rounded-2xl cursor-pointer transition-all shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="size-11 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-blue-100 group-hover:text-[#043570] transition-all shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white truncate">
                      Submit Manually (CMS-1500 Form)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0">
                      Standard
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Prefill, edit, print, export, or submit via payer portal &amp; mail
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-[#043570] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400">
          <span>You can switch between submission methods at any time.</span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-gray-600 dark:text-gray-300 hover:underline cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
