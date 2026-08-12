import { motion } from "motion/react";
import { CalendarClock, TrendingDown, TrendingUp, Crown } from "lucide-react";
import type { ProviderHealthResult } from "../../types/providerHealth";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BAND_GLOW: Record<ProviderHealthResult["band"], string> = {
  green: "#34d399",
  yellow: "#fbbf24",
  red: "#f87171",
  critical: "#fb7185",
};

export function HealthScoreHero({ result }: { result: ProviderHealthResult }) {
  const { health, band, bandLabel, bandDescription, trend, lastCalculated, rank } = result;
  const glow = BAND_GLOW[band];
  const offset = CIRCUMFERENCE * (1 - health / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#043570] via-[#0a3d8a] to-[#0891b2] shadow-lg"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -mr-24 -mt-24"></div>
      <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-[#00c0ff]/10 -mb-24 -ml-24"></div>

      <div className="relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-4 md:p-6">
        {/* Score ring */}
        <div className="relative size-[140px] md:size-[156px] mx-auto lg:mx-0 flex-shrink-0">
          <svg className="size-full -rotate-90" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={RADIUS} fill="none" strokeWidth="10" className="stroke-white/15" />
            <motion.circle
              cx="70"
              cy="70"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              stroke={glow}
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ filter: `drop-shadow(0 0 6px ${glow}66)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-bold text-white leading-none">{health}</span>
            <span className="text-[9px] md:text-[10px] font-semibold text-white/70 mt-1 uppercase tracking-wide">Health Score</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 mb-2 flex-wrap">
            <div className="size-7 md:size-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
              <Crown className="size-3.5 md:size-4 text-white" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white">Provider Health Score</h2>
            <span className="px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold bg-white/15 text-white border border-white/25 flex-shrink-0">
              {bandLabel}
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/75 leading-relaxed mb-3 max-w-xl mx-auto lg:mx-0">{bandDescription}</p>

          <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs md:text-sm font-semibold bg-white/10 border border-white/15 text-white">
              {trend >= 0 ? <TrendingUp className="size-3.5 text-emerald-300" /> : <TrendingDown className="size-3.5 text-red-300" />}
              <span className={trend >= 0 ? "text-emerald-200" : "text-red-200"}>
                {trend >= 0 ? "+" : ""}{trend}
              </span>
              <span className="text-white/60 font-normal">vs last month</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs md:text-sm font-semibold bg-white/10 border border-white/15 text-white">
              Rank {rank.rank} · {rank.top}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] md:text-xs text-white/70 bg-white/5 border border-white/10">
              <CalendarClock className="size-3.5" />
              {lastCalculated}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}