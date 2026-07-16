import { useState } from "react";
import { Gift, Clock, Mic, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { LowCreditWarning } from "../components/monetization/LowCreditWarning";
import { PaywallModal } from "../components/monetization/PaywallModal";

export function AITranscriberDemo() {
  const [view, setView] = useState<"pre-session" | "in-progress" | "completed">("pre-session");
  const [showPaywall, setShowPaywall] = useState(false);
  const [recordingTime, setRecordingTime] = useState(1934); // 32:14 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          to="/ai-transcriber"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to AI Transcriber
        </Link>
      </div>

      {/* Demo State Switcher */}
      <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Demo State (for testing):
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setView("pre-session");
              setShowPaywall(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "pre-session"
                ? "bg-[#1EAAE7] text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Pre-Session
          </button>
          <button
            onClick={() => {
              setView("in-progress");
              setShowPaywall(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "in-progress"
                ? "bg-[#1EAAE7] text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => {
              setView("completed");
              setShowPaywall(true);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "completed"
                ? "bg-[#1EAAE7] text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Show Paywall
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <ChevronLeft className="size-4" />
          <span>AI Transcriber</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Record and transcribe sessions with AI-powered notes
        </h1>
      </div>

      {/* Pre-Session State */}
      {view === "pre-session" && (
        <>
          {/* Free Trial Banner */}
          <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Gift className="size-4 text-[#0F6E56] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#085041] mb-1">
                  You have 1 free session
                </div>
                <div className="text-[11px] text-[#0F6E56]">
                  Record this session at no cost. After your free session, each recording uses 10 credits (~₹12).{" "}
                  <Link to="/billing" state={{ tab: "credits" }} className="underline hover:text-[#085041]">
                    See pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Session Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[10px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#111827] dark:text-white mb-1">
                  Ready to record
                </div>
                <div className="text-xs text-[#6B7280] dark:text-gray-400">
                  Session with Priya Mehta · Today 2:00 PM
                </div>
              </div>
              <button
                onClick={() => setView("in-progress")}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1EAAE7] hover:bg-[#1899d6] text-white rounded-lg font-medium transition-colors text-sm"
              >
                <Mic className="size-4" />
                Start recording
              </button>
            </div>
          </div>
        </>
      )}

      {/* In Progress State */}
      {view === "in-progress" && (
        <>
          {/* Session Status Bar */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">Free session active</span>
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-[#0F6E56]" />
                <span className="text-[13px] font-medium text-[#0F6E56]">
                  {formatTime(recordingTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Live Transcript */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 mb-4 min-h-[160px]">
            <div className="text-[13px] text-[#374151] leading-relaxed">
              ...and I think the anxiety really peaks around Sunday evenings, before the work week...
              <span className="inline-block w-0.5 h-4 bg-[#1EAAE7] ml-1 animate-pulse" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#D1D5DB] text-[#6B7280] rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <span className="size-3 bg-[#6B7280]" />
              Pause
            </button>
            <button
              onClick={() => {
                setView("completed");
                setShowPaywall(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#F5C4B3] text-[#993C1D] rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
            >
              <span className="size-3 bg-[#993C1D]" />
              End session
            </button>
          </div>
        </>
      )}

      {/* Completed State - Shows transcript */}
      {view === "completed" && !showPaywall && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Session Transcript
          </h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              The session covered discussions about anxiety management techniques and coping strategies for work-related stress...
            </p>
            <p>
              Patient reported increased anxiety levels on Sunday evenings, particularly related to anticipation of the upcoming work week...
            </p>
          </div>
        </div>
      )}

      {/* Low Credit Warning Example */}
      <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Low Credit Warning (Component Demo)
        </h3>
        <LowCreditWarning creditsRemaining={8} sessionsRemaining={1} />
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        sessionDuration="47 min"
        wordCount="3,200"
        onAddCredits={() => {
          setShowPaywall(false);
          alert("Redirect to credits page");
        }}
        onMaybeLater={() => setShowPaywall(false)}
      />
    </div>
  );
}
