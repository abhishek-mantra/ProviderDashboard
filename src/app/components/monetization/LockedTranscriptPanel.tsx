import { Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FreeTrialPricingPopup } from "./FreeTrialPricingPopup";
import { useTrial } from "../../contexts/TrialContext";

interface LockedTranscriptPanelProps {
  toolName: "Session Notes" | "Prescriptions";
}

export function LockedTranscriptPanel({ toolName }: LockedTranscriptPanelProps) {
  const [showTrialPopup, setShowTrialPopup] = useState(false);
  const { activateTrial } = useTrial();
  const navigate = useNavigate();

  const handleBeginTrial = () => {
    activateTrial();
    setShowTrialPopup(false);
  };

  const subtextMap = {
    "Session Notes": "Unlock AI Transcriber to view session transcripts alongside your notes and auto-fill them with one click.",
    "Prescriptions": "Unlock AI Transcriber to view session transcripts alongside prescriptions and auto-fill them instantly."
  };

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center bg-[#F5F5F5] dark:bg-gray-900 p-8">
        <div className="flex flex-col items-center text-center max-w-xs">
          {/* Lock Icon */}
          <div className="size-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Lock className="size-8 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Heading */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            AI Transcriber
          </h3>

          {/* Subtext */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {subtextMap[toolName]}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setShowTrialPopup(true)}
            className="w-full px-4 py-3 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md mb-3"
          >
            Start Free Trial
          </button>

          {/* Secondary link */}
          <button
            onClick={() => navigate("/settings/billing")}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00c0ff] dark:hover:text-[#00c0ff] transition-colors"
          >
            Already subscribed? View plans
          </button>
        </div>
      </div>

      {/* AI Transcriber Free Trial Popup */}
      <FreeTrialPricingPopup
        isOpen={showTrialPopup}
        onClose={() => setShowTrialPopup(false)}
        toolName="AI Transcriber"
        toolIcon="#00c0ff"
        onBeginTrial={handleBeginTrial}
      />
    </>
  );
}
