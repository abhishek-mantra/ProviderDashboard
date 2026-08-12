import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import type { ProviderHealthResult } from "../../types/providerHealth";

export function WhatAffectsMyScore({ result }: { result: ProviderHealthResult }) {
  const [filter, setFilter] = useState<"all" | "flagged">("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const allMetrics = result.allMetrics;
  const flaggedMetrics = result.flagged;

  const rawList = filter === "flagged" ? flaggedMetrics : allMetrics;
  const displayList = isExpanded ? rawList : rawList.slice(0, 4);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="size-4.5" />
            </div>
            <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
              What Affects Your Health Score
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            All factors driving your score. Metrics needing action are highlighted below.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs font-bold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            All Factors ({allMetrics.length})
          </button>
          <button
            onClick={() => setFilter("flagged")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === "flagged"
                ? "bg-rose-500 text-white shadow-xs font-bold"
                : "text-rose-600 dark:text-rose-400 hover:text-rose-700"
            }`}
          >
            <span>Needs Action</span>
            <span className="size-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">
              {flaggedMetrics.length}
            </span>
          </button>
        </div>
      </div>

      {/* Factors List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
        {displayList.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400">
            No factors found.
          </div>
        ) : (
          displayList.map((metric, index) => {
            const needsAction = metric.status !== "good";
            return (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={`p-4 md:p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  needsAction
                    ? "bg-rose-50/30 dark:bg-rose-950/10 hover:bg-rose-50/60 dark:hover:bg-rose-950/20"
                    : "hover:bg-gray-50/60 dark:hover:bg-gray-700/30"
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="mt-0.5 flex-shrink-0">
                    {needsAction ? (
                      <div className="size-6 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                        <AlertTriangle className="size-3.5" />
                      </div>
                    ) : (
                      <div className="size-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="size-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                        {metric.label}
                      </h3>
                      {needsAction ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                          Needs Action
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          On Track
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-1.5">
                      {metric.why}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        Current: <strong className="text-gray-900 dark:text-white font-semibold">{metric.displayValue}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Target: <strong className="text-gray-700 dark:text-gray-300 font-medium">{metric.threshold}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Button if Needs Action */}
                <div className="flex items-center justify-end flex-shrink-0 md:pl-4">
                  {needsAction ? (
                    <Link
                      to={metric.actionTarget}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <span>Fix Issue</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  ) : (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="size-3.5" /> Good Standing
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Expand / Collapse Button */}
      {rawList.length > 4 && (
        <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-5 py-3 flex items-center justify-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
          >
            <span>
              {isExpanded ? "Show Fewer Factors" : `View All ${rawList.length} Factors`}
            </span>
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
