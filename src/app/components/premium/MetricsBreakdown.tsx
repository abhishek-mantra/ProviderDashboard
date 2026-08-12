import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BarChart3, ChevronDown } from "lucide-react";
import type { ProviderHealthResult, SubScore } from "../../types/providerHealth";
import { getStatusChipClass } from "../../utils/providerHealth";

const STATUS_LABEL: Record<SubScore["metrics"][number]["status"], string> = {
  good: "Good",
  warning: "Warning",
  critical: "Critical",
};

export function MetricsBreakdown({ result }: { result: ProviderHealthResult }) {
  const [openGroups, setOpenGroups] = useState<Record<SubScore["key"], boolean>>({
    quality: true,
    engagement: true,
    business: true,
  });

  const toggle = (key: SubScore["key"]) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center gap-2.5 md:gap-3 px-3 md:px-5 py-3.5 md:py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="size-8 md:size-9 rounded-lg bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 shadow-sm">
          <BarChart3 className="size-4 md:size-4.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Metric Breakdown</h3>
          <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Every metric feeding your health score, against its target.
          </p>
        </div>
      </div>

      {result.subScores.map((sub) => {
        const open = openGroups[sub.key];
        return (
          <div key={sub.key} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
            <button
              onClick={() => toggle(sub.key)}
              className="w-full flex items-center justify-between px-3 md:px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <ChevronDown className={`size-4 text-gray-400 transition-transform ${open ? "" : "-rotate-90"}`} />
                <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                  {sub.label} <span className="text-gray-400 dark:text-gray-500 font-normal normal-case">({sub.weightLabel})</span>
                </h4>
              </div>
              <span className="text-sm md:text-base font-bold text-gray-900 dark:text-white">{sub.score}</span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide bg-gray-50/60 dark:bg-gray-800/60">
                          <th className="px-5 py-2 font-semibold">Metric</th>
                          <th className="px-4 py-2 font-semibold">Current</th>
                          <th className="px-4 py-2 font-semibold">Target</th>
                          <th className="px-4 py-2 font-semibold">Status</th>
                          <th className="px-5 py-2 font-semibold text-right w-32">Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {sub.metrics.map((metric) => (
                          <tr key={metric.key} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="px-5 py-2.5 text-xs font-medium text-gray-900 dark:text-white">{metric.label}</td>
                            <td className="px-4 py-2.5 text-xs text-gray-600 dark:text-gray-300">{metric.displayValue}</td>
                            <td className="px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400">{metric.threshold}</td>
                            <td className="px-4 py-2.5">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusChipClass(metric.status)}`}>
                                {STATUS_LABEL[metric.status]}
                              </span>
                            </td>
                            <td className="px-5 py-2.5">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-[11px] text-gray-400 dark:text-gray-500 w-6 text-right">{metric.impact}</span>
                                <div className="w-14 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${metric.status === "good" ? "bg-emerald-500" : metric.status === "warning" ? "bg-amber-500" : "bg-red-500"}`}
                                    style={{ width: `${Math.min(metric.score, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden divide-y divide-gray-50 dark:divide-gray-800 px-3 pb-2">
                    {sub.metrics.map((metric) => (
                      <div key={metric.key} className="py-2.5">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-900 dark:text-white">{metric.label}</span>
                          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${getStatusChipClass(metric.status)}`}>
                            {STATUS_LABEL[metric.status]}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {metric.displayValue} · Target: {metric.threshold}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}