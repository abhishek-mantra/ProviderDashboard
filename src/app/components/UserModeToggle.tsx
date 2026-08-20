import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, CheckCircle2, RotateCcw, Compass, X, ChevronDown, CheckSquare, Play, UserCheck, Shield, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUserMode } from "../contexts/UserModeContext";

export function UserModeToggle() {
  const navigate = useNavigate();
  const {
    userMode,
    setUserMode,
    completedChecklist,
    toggleChecklistItem,
    checklistProgress,
    seenTours,
    startTour,
    resetNewUserState,
    isTourPromptDismissed,
  } = useUserMode();

  const [isOpen, setIsOpen] = useState(false);

  const isNew = userMode === "new";

  return (
    <>
      {/* Floating Dev Mode Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-32 z-50 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#043570] to-[#0099cc] text-white rounded-xl shadow-lg hover:brightness-110 transition-all text-xs font-mono border border-white/20"
        title="User Experience Mode Toggle (Dev/QA)"
      >
        <Sparkles className="size-3.5 text-cyan-300" />
        <span className="font-semibold">{isNew ? "Mode: New User" : "Mode: Returning"}</span>
        <span className={`size-2 rounded-full ${isNew ? "bg-cyan-400 animate-pulse" : "bg-emerald-400"}`} />
        <ChevronDown className={`size-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dev Control Flyout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-32 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-84 max-h-[75vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#00c0ff]" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    User Experience State (QA)
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Switch states & test onboarding flows
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 overflow-y-auto">
              {/* Mode Switcher */}
              <div>
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                  Active User Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setUserMode("new");
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      isNew
                        ? "bg-[#043570] text-white border-[#043570] shadow-sm"
                        : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Sparkles className="size-4 text-cyan-300" />
                    <span>New User Mode</span>
                    <span className="text-[10px] font-normal opacity-80">Checklist & Videos</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserMode("returning");
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      !isNew
                        ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                        : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <UserCheck className="size-4 text-emerald-300" />
                    <span>Returning User</span>
                    <span className="text-[10px] font-normal opacity-80">Action Center & KPIs</span>
                  </button>
                </div>
              </div>

              {/* Checklist Progress Quick-Toggle */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Checklist Tasks ({checklistProgress.completed}/{checklistProgress.total})
                  </label>
                  <span className="text-xs font-mono font-bold text-[#043570] dark:text-cyan-400">
                    {checklistProgress.percentage}%
                  </span>
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: "complete-profile", label: "1. Complete Profile" },
                    { id: "add-client", label: "2. Add First Client" },
                    { id: "set-availability", label: "3. Set Availability" },
                    { id: "connect-billing", label: "4. Connect Billing" },
                  ].map((task) => {
                    const done = completedChecklist.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        onClick={() => toggleChecklistItem(task.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-all ${
                          done
                            ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/30"
                            : "bg-gray-50 dark:bg-gray-750 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <span>{task.label}</span>
                        {done ? <CheckCircle2 className="size-3.5 text-emerald-600" /> : <div className="size-3.5 rounded-full border border-gray-300 dark:border-gray-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Onboarding Links */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                  Quick Onboarding Links
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => {
                      navigate("/ai-transcriber");
                      setIsOpen(false);
                    }}
                    className="p-2 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 text-[#043570] dark:text-cyan-300 border border-blue-200 dark:border-blue-900/40 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-colors"
                  >
                    <BookOpen className="size-3 text-blue-600" />
                    <span className="truncate">AI Scribe</span>
                    <span className="text-[9px] opacity-75">Demo</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/billing");
                      setIsOpen(false);
                    }}
                    className="p-2 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 text-[#043570] dark:text-cyan-300 border border-blue-200 dark:border-blue-900/40 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-colors"
                  >
                    <Play className="size-3 text-blue-600" />
                    <span className="truncate">Bills Hub</span>
                    <span className="text-[9px] opacity-75">Spotlight</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/sessions/1/notes/add");
                      setIsOpen(false);
                    }}
                    className="p-2 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 text-[#043570] dark:text-cyan-300 border border-blue-200 dark:border-blue-900/40 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-colors"
                  >
                    <Play className="size-3 text-blue-600" />
                    <span className="truncate">Sign & Lock</span>
                    <span className="text-[9px] opacity-75">Spotlight</span>
                  </button>
                </div>
              </div>

              {/* Reset Everything Helper */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <button
                  onClick={() => {
                    resetNewUserState();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-650 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="size-3.5" />
                  Reset to Fresh New User Mode
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
