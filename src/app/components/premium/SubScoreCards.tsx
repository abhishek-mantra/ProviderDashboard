import { motion } from "motion/react";
import { Star, Zap, Briefcase } from "lucide-react";
import type { ProviderHealthResult, SubScore } from "../../types/providerHealth";
import { getStatusChipClass } from "../../utils/providerHealth";

const GROUP_META: Record<SubScore["key"], { icon: typeof Star; iconBg: string; iconColor: string }> = {
  quality: { icon: Star, iconBg: "bg-violet-500", iconColor: "text-white" },
  engagement: { icon: Zap, iconBg: "bg-cyan-500", iconColor: "text-white" },
  business: { icon: Briefcase, iconBg: "bg-emerald-500", iconColor: "text-white" },
};

function barColor(score: number) {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export function SubScoreCards({ result }: { result: ProviderHealthResult }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {result.subScores.map((sub, index) => {
        const meta = GROUP_META[sub.key];
        const Icon = meta.icon;
        const weakMetrics = sub.metrics.filter((m) => m.status !== "good").slice(0, 2);

        return (
          <motion.div
            key={sub.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 md:p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
                <div className={`size-8 md:size-9 rounded-lg ${meta.iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <Icon className={`size-4 ${meta.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-tight truncate">{sub.label}</h3>
                  <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{sub.weightLabel}</p>
                </div>
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{sub.score}</span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2 overflow-hidden mb-3">
              <motion.div
                className={`${barColor(sub.score)} h-full rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${sub.score}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + index * 0.08 }}
              />
            </div>

            <div className="space-y-1.5 mt-auto min-h-[56px]">
              {weakMetrics.length === 0 ? (
                <p className="text-[11px] md:text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  All metrics in this category are healthy.
                </p>
              ) : (
                weakMetrics.map((m) => (
                  <div key={m.key} className="flex items-center justify-between gap-2 text-[11px] md:text-xs">
                    <span className="text-gray-600 dark:text-gray-400 truncate">{m.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-md font-semibold flex-shrink-0 ${getStatusChipClass(m.status)}`}>
                      {m.displayValue}
                    </span>
                  </div>
                ))
              )}
              {sub.metrics.filter((m) => m.status !== "good").length > 2 && (
                <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">
                  +{sub.metrics.filter((m) => m.status !== "good").length - 2} more below threshold
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}