import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function AIDiscoveryBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#E6F1FB] border border-[#B5D4F4] rounded-[10px] p-4 md:p-5 mb-6">
      <div className="flex items-start gap-3 md:gap-4">
        <Sparkles className="size-5 text-[#185FA5] flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-medium text-[14px] text-[#0C447C] mb-1">
            New: AI tools — try free, pay only if you love them
          </div>
          <div className="text-[12px] text-[#185FA5] mb-3">
            AI Transcriber, AI CRM, and more — one free session each, no card needed
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/tools"
              className="px-4 py-2 bg-[#1EAAE7] text-white text-[12px] font-medium rounded-lg hover:bg-[#1899d6] transition-colors"
            >
              Explore tools
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 bg-transparent border border-[#D1D5DB] text-[#6B7280] text-[12px] font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
