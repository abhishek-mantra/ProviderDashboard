import React from "react";
import { useNavigate } from "react-router";
import {
  User,
  UserPlus,
  Calendar,
  CreditCard,
  ArrowRight,
  Check,
} from "lucide-react";
import { useUserMode, CHECKLIST_ITEMS } from "../../contexts/UserModeContext";

const iconMap: Record<string, React.ReactNode> = {
  User: <User className="size-4" />,
  UserPlus: <UserPlus className="size-4" />,
  Calendar: <Calendar className="size-4" />,
  CreditCard: <CreditCard className="size-4" />,
};

interface OnboardingChecklistCardProps {
  onOpenAddClient?: () => void;
}

export function OnboardingChecklistCard({ onOpenAddClient }: OnboardingChecklistCardProps) {
  const navigate = useNavigate();
  const {
    completedChecklist,
    toggleChecklistItem,
    checklistProgress,
  } = useUserMode();

  const handleAction = (itemId: string, route: string) => {
    if (itemId === "add-client" && onOpenAddClient) {
      onOpenAddClient();
    } else {
      navigate(route);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm flex flex-col space-y-4">
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-700/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Getting Started Checklist
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-900/30 text-[#043570] dark:text-cyan-300 border border-blue-200/60 dark:border-blue-800/40">
              {checklistProgress.completed} of {checklistProgress.total} completed
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Complete these 4 foundational milestones to activate your practice
          </p>
        </div>

        {/* Progress Bar */}
        <div className="sm:w-44 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Progress</span>
            <span className="font-mono font-bold text-[#043570] dark:text-cyan-400">
              {checklistProgress.percentage}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00c0ff] to-[#043570] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${checklistProgress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Checklist Items List */}
      <div className="space-y-2.5">
        {CHECKLIST_ITEMS.map((item) => {
          const isComplete = completedChecklist.includes(item.id);
          const itemIcon = iconMap[item.iconName] || <User className="size-4" />;

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isComplete
                  ? "bg-gray-50/70 dark:bg-gray-750/30 border-gray-200 dark:border-gray-700/60 opacity-90"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm"
              }`}
            >
              {/* Left: Checkbox + Icon + Title + Description */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {/* Completion Toggle Button */}
                <button
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isComplete
                      ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/20"
                      : "border-2 border-gray-300 dark:border-gray-500 hover:border-[#00c0ff] text-transparent hover:text-gray-400"
                  }`}
                  title={isComplete ? "Mark incomplete" : "Mark completed"}
                >
                  <Check className="size-3.5 stroke-[3]" />
                </button>

                {/* Icon */}
                <div
                  className={`size-8 rounded-xl flex items-center justify-center shrink-0 hidden sm:flex ${
                    isComplete
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-50 dark:bg-blue-950/30 text-[#043570] dark:text-cyan-300"
                  }`}
                >
                  {itemIcon}
                </div>

                {/* Text Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isComplete
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.title}
                    </p>
                    {isComplete && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                        Done
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right: Action Button */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => handleAction(item.id, item.actionRoute)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isComplete
                      ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                      : "bg-[#043570] hover:bg-[#032a5a] text-white shadow-sm hover:shadow active:scale-95"
                  }`}
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
