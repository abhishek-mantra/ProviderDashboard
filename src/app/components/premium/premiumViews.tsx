import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ProviderHealthResult } from "../../types/providerHealth";
import { HealthScoreHero } from "./HealthScoreHero";
import { SubScoreCards } from "./SubScoreCards";
import { WhyScoreIsLow } from "./WhyScoreIsLow";
import { MetricsBreakdown } from "./MetricsBreakdown";
import { PreferencesPanel } from "./PreferencesPanel";

// ── Variant A: Tabs ───────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "metrics", label: "All Metrics" },
  { id: "preferences", label: "Preferences" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PremiumTabsView({ result }: { result: ProviderHealthResult }) {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="space-y-4 md:space-y-5">
      <HealthScoreHero result={result} />

      {/* Tab bar */}
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg md:rounded-xl p-1 gap-1 w-fit max-w-full overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 md:px-5 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
              tab === t.id ? "bg-[#043570] text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-4 md:space-y-5"
        >
          {tab === "overview" && (
            <>
              <SubScoreCards result={result} />
              <WhyScoreIsLow flagged={result.flagged} />
            </>
          )}
          {tab === "metrics" && <MetricsBreakdown result={result} />}
          {tab === "preferences" && <PreferencesPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Variant B: Sticky quick-nav, single scroll ────────────────────────────────

const NAV = [
  { id: "scores", label: "Sub-scores" },
  { id: "blockers", label: "Blockers" },
  { id: "metrics", label: "Metrics" },
  { id: "preferences", label: "Preferences" },
] as const;

const NAV_IDS = NAV.map((n) => n.id);

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-90px 0px -60% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PremiumQuickNavView({ result }: { result: ProviderHealthResult }) {
  const active = useScrollSpy(NAV_IDS);

  return (
    <div className="space-y-4 md:space-y-5">
      <HealthScoreHero result={result} />

      {/* Sticky quick-nav */}
      <div className="sticky top-[60px] md:top-4 z-30">
        <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl p-1 gap-1 shadow-md w-fit max-w-full overflow-x-auto">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollToId(n.id)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                active === n.id ? "bg-[#00c0ff] text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <section id="scores" className="scroll-mt-24 md:scroll-mt-16">
        <SubScoreCards result={result} />
      </section>
      <section id="blockers" className="scroll-mt-16">
        <WhyScoreIsLow flagged={result.flagged} />
      </section>
      <section id="metrics" className="scroll-mt-16">
        <MetricsBreakdown result={result} />
      </section>
      <section id="preferences" className="scroll-mt-16">
        <PreferencesPanel />
      </section>
    </div>
  );
}

// ── Variant C: Compressed single scroll, two-column ───────────────────────────

export function PremiumScrollView({ result }: { result: ProviderHealthResult }) {
  return (
    <div className="space-y-4 md:space-y-5">
      <HealthScoreHero result={result} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
        <div className="lg:col-span-7">
          <SubScoreCards result={result} />
        </div>
        <div className="lg:col-span-5">
          <WhyScoreIsLow flagged={result.flagged} />
        </div>
      </div>

      <MetricsBreakdown result={result} />
      <PreferencesPanel />
    </div>
  );
}