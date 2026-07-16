import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTrial } from "../../contexts/TrialContext";

interface FreeTrialBannerProps {
  toolName: string;
}

export function FreeTrialBanner({ toolName }: FreeTrialBannerProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { isTrialActive } = useTrial();

  // Only show banner in State B (Post-Trial)
  if (!isTrialActive) {
    return null;
  }

  // Mock trial dates - in real app these would come from API/context
  const trialStartDate = new Date("2026-05-06");
  const trialEndDate = new Date("2026-05-20");
  const currentDate = new Date();

  // Calculate progress percentage
  const totalDuration = trialEndDate.getTime() - trialStartDate.getTime();
  const elapsed = currentDate.getTime() - trialStartDate.getTime();
  const progressPercentage = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  // Format dates
  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="mb-4">
      <div className="bg-[#e0f7ff] dark:bg-blue-900/20 border border-[#00c0ff]/30 dark:border-[#00c0ff]/20 rounded-xl shadow-sm">
        {/* Collapsed Label Row - Always Visible */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Left: Label Text */}
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Your free trial is active — make the most of it while it lasts
          </p>

          {/* Right: Upgrade Button + Chevron */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/settings/billing");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#00c0ff] hover:text-[#00a8e6] border border-[#00c0ff]/40 hover:border-[#00c0ff]/60 rounded-lg transition-all hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              Upgrade Plan
              <ArrowRight className="size-3.5" />
            </button>

            {/* Chevron Icon */}
            {isExpanded ? (
              <ChevronUp className="size-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="size-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Expanded Progress Bar Row - Conditionally Visible */}
        {isExpanded && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              <span>{formatDate(trialStartDate)}</span>
              <span>{formatDate(trialEndDate)}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00c0ff] rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
