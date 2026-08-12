import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { AlertTriangle, ArrowRight, ChevronDown, Info } from "lucide-react";
import type { MetricDef } from "../../types/providerHealth";

const DOT_COLOR: Record<MetricDef["status"], string> = {
  warning: "bg-amber-500",
  critical: "bg-red-500",
  good: "bg-emerald-500",
};

export function WhyScoreIsLow({ flagged }: { flagged: MetricDef[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? flagged : flagged.slice(0, 3);
  const total = flagged.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-start gap-2.5 md:gap-3 px-3 md:px-5 py-3.5 md:py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="size-8 md:size-9 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <AlertTriangle className="size-4 md:size-4.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Why is my score low?</h3>
          <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Fix these first — they carry the biggest impact.
          </p>
        </div>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] md:text-xs font-bold flex-shrink-0">
          {total} flags
        </span>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-800">
        {visible.length === 0 && (
          <p className="px-3 md:px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No metrics below threshold — your score looks great!
          </p>
        )}
        {visible.map((metric, index) => (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="flex items-center gap-2.5 md:gap-3 px-3 md:px-5 py-2.5 md:py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
          >
            <span className={`size-2 md:size-2.5 rounded-full flex-shrink-0 ${DOT_COLOR[metric.status]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white truncate">{metric.label}</p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 truncate">
                Target {metric.threshold}
              </p>
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white flex-shrink-0">{metric.displayValue}</span>
            <Link
              to={metric.actionTarget}
              className="inline-flex items-center gap-0.5 md:gap-1 px-2 py-1 rounded-md bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-[10px] md:text-xs font-bold transition-all flex-shrink-0"
            >
              Fix <ArrowRight className="size-2.5 md:size-3" />
            </Link>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {total > 3 && (
          <div className="border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full px-3 md:px-5 py-2.5 md:py-3 flex items-center justify-center gap-1.5 text-[11px] md:text-xs font-semibold text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              {showAll ? "Show fewer" : `View all ${total} issues`}
              <ChevronDown className={`size-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </AnimatePresence>

      <div className="px-3 md:px-5 py-2.5 md:py-3 bg-blue-50/70 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-900/30">
        <div className="flex items-start gap-2">
          <Info className="size-3.5 md:size-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] md:text-xs text-blue-800 dark:text-blue-300 leading-snug">
            Recalculated daily. Scores below 40 trigger a Performance Improvement Plan before any listing decision is made.
          </p>
        </div>
      </div>
    </div>
  );
}