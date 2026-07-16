import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { FileText, Brain, CheckSquare, Wrench, Mic, Pill, Lock } from "lucide-react";
import { FreeTrialBadge, PlanIncludedBadge, FreeBadge } from "../components/monetization/FreeTrialBadge";
// PlanIncludedBadge used by Resources and Tasks cards
import { useState } from "react";
import { FreeTrialPricingPopup } from "../components/monetization/FreeTrialPricingPopup";
import { useTrial } from "../contexts/TrialContext";
import { usePlanMode } from "../contexts/PlanModeContext";
import { toast } from "../components/ui/sonner";

export function Tools() {
  const navigate = useNavigate();
  const { activateTrial } = useTrial();
  const { planMode } = usePlanMode();
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const [selectedTool, setSelectedTool] = useState<{name: string; icon: string} | null>(null);

  const isTranscriberOnly = planMode === "transcriber-only";
  const isResourcesLocked = false;
  const isAICRMLocked = false;
  const isTasksLocked = isTranscriberOnly;

  const handleLockedCardClick = () => {
    toast("This feature requires the Full EHR Plan.", {
      action: {
        label: "Upgrade",
        onClick: () => {
          navigate("/settings");
        },
      },
    });
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-2 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800">
            <Wrench className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              Tools
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Access your productivity and management tools
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Banner — only show when Tasks is locked (transcriber-only) to hint Tasks requires EHR */}
      {isTasksLocked && (
        <div className="mb-6 md:mb-8 bg-[#EFF6FF] dark:bg-blue-900/20 border border-[#BFDBFE] dark:border-blue-800 rounded-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="size-4 text-[#2563EB] flex-shrink-0" />
            <p className="text-sm font-medium text-[#1D4ED8] dark:text-blue-400">
              Tasks is available in the Full EHR Plan
            </p>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#1D4ED8] transition-colors flex-shrink-0"
          >
            Upgrade →
          </button>
        </div>
      )}

      {/* Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {/* Resources */}
          <div onClick={() => navigate("/other-tools")}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white dark:bg-gray-750 rounded-xl p-5 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-all cursor-pointer overflow-hidden hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-700"
            >
              <div className="absolute top-4 right-4 z-10">
                <PlanIncludedBadge />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16"></div>
              <div className="relative">
                <div className="size-12 md:size-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                  <Wrench className="size-6 md:size-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Resources
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Access assessments, exercises, and resources for your clients
                </p>
              </div>
            </motion.div>
          </div>

          {/* Session Notes - Hidden in AI Transcriber Plan */}
          {!isTranscriberOnly && (
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/session-notes")}
              className="group relative bg-white dark:bg-gray-750 rounded-xl p-5 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <FreeBadge />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16"></div>
              <div className="relative">
                <div className="size-12 md:size-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  <FileText className="size-6 md:size-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Session Notes
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View and manage all session notes across clients
                </p>
              </div>
            </motion.div>
          )}

          {/* Tasks */}
          <div onClick={(e) => {
            if (isTasksLocked) {
              e.preventDefault();
              handleLockedCardClick();
            } else {
              navigate("/tasks");
            }
          }}>
            <motion.div
              whileHover={!isTasksLocked ? { scale: 1.02, y: -4 } : {}}
              whileTap={!isTasksLocked ? { scale: 0.98 } : {}}
              className={`group relative bg-white dark:bg-gray-750 rounded-xl p-5 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-all cursor-pointer overflow-hidden ${
                isTasksLocked
                  ? 'opacity-70'
                  : 'hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-700'
              }`}
            >
              <div className="absolute top-4 right-4 z-10">
                {isTasksLocked ? (
                  <div className="size-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Lock className="size-3.5 text-gray-500" />
                  </div>
                ) : (
                  <PlanIncludedBadge />
                )}
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16"></div>
              <div className="relative">
                <div className={`size-12 md:size-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20 ${
                  isTasksLocked ? 'grayscale-[30%]' : ''
                }`}>
                  <CheckSquare className="size-6 md:size-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Tasks
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track your daily wellness tasks & earn points
                </p>
              </div>
            </motion.div>
          </div>

          {/* AI CRM */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedTool({ name: "AI CRM", icon: "#EDE9FD" });
              setShowPricingPopup(true);
            }}
            className="group relative bg-white dark:bg-gray-750 rounded-xl p-5 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-all cursor-pointer overflow-hidden hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700"
          >
            <div className="absolute top-4 right-4 z-10">
              <FreeTrialBadge />
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16"></div>
            <div className="relative">
              <div className="size-12 md:size-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                <Brain className="size-6 md:size-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AI CRM
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Streamline patient communication & admin workflows
              </p>
            </div>
          </motion.div>

          {/* AI Transcriber - Hidden in AI Transcriber Plan */}
          {!isTranscriberOnly && (
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/ai-transcriber")}
              className="group relative bg-white dark:bg-gray-750 rounded-xl p-5 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-700 transition-all cursor-pointer overflow-hidden"
            >
              {/* Badge positioned INSIDE card boundary */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E0F7FF] dark:bg-[#00c0ff]/10 text-[#0369A1] dark:text-[#00c0ff] text-[10px] font-semibold rounded-full border border-[#BAE6FD] dark:border-[#00c0ff]/20">
                  1 free session
                </span>
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16"></div>
              <div className="relative">
                <div className="size-12 md:size-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/20">
                  <Mic className="size-6 md:size-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  AI Transcriber
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Record and transcribe your sessions with AI
                </p>
              </div>
            </motion.div>
          )}

          {/* Prescriptions - Hidden in AI Transcriber Plan */}
          {!isTranscriberOnly && (
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/prescriptions")}
              className="group relative bg-white dark:bg-gray-750 rounded-xl p-5 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-pink-200 dark:hover:border-pink-700 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <FreeBadge />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16"></div>
              <div className="relative">
                <div className="size-12 md:size-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/20">
                  <Pill className="size-6 md:size-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Prescriptions
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View and manage all prescriptions across clients
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Free Trial Pricing Popup */}
      {showPricingPopup && selectedTool && (
        <FreeTrialPricingPopup
          isOpen={showPricingPopup}
          onClose={() => setShowPricingPopup(false)}
          toolName={selectedTool.name}
          toolIcon={selectedTool.icon}
          onBeginTrial={() => {
            activateTrial();
            setShowPricingPopup(false);
            const name = selectedTool.name.toLowerCase();
            if (name.includes("transcriber")) {
              navigate("/ai-transcriber");
            } else if (name.includes("session notes")) {
              navigate("/session-notes");
            } else if (name.includes("prescription")) {
              navigate("/prescriptions");
            }
          }}
        />
      )}
    </div>
  );
}