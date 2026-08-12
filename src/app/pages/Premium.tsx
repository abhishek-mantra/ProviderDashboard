import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  ChevronDown,
  HelpCircle,
  Info,
  Crown,
  DollarSign,
  Building2,
  FileText,
  Award,
  CheckCircle,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { computeProviderHealth, getBandColor } from "../utils/providerHealth";
import { mockProviderHealthMetrics } from "../data/providerHealth";
import { HealthScoreHero } from "../components/premium/HealthScoreHero";
import { SubScoreCards } from "../components/premium/SubScoreCards";
import { WhyScoreIsLow } from "../components/premium/WhyScoreIsLow";
import { MetricsBreakdown } from "../components/premium/MetricsBreakdown";
import { PreferencesPanel } from "../components/premium/PreferencesPanel";

const PREMIUM_THRESHOLD = 80;

export function Premium() {
  const [premiumStatus, setPremiumStatus] = useState<"Premium" | "Non Premium">("Non Premium");
  const [view, setView] = useState<PremiumViewVariant>("tabs");
  const [category, setCategory] = useState("Therapy");

  // Provider health score — computed from mock metrics (see utils/providerHealth.ts)
  const healthResult = computeProviderHealth(mockProviderHealthMetrics);
  const canApplyPremium = healthResult.premiumQualified;
  const progressToPremium = Math.min((healthResult.health / PREMIUM_THRESHOLD) * 100, 100);
  const topBlockers = healthResult.flagged.slice(0, 3);

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6">
      {/* Dev Mode Toggle - Fixed position */}
      <div className="fixed top-16 md:top-4 right-2 md:right-4 z-50 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 md:p-3">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Dev:</span>
          <div className="flex items-center gap-1 md:gap-1.5 bg-gray-100 dark:bg-gray-700 rounded-md md:rounded-lg p-0.5 md:p-1">
            <button
              onClick={() => setPremiumStatus("Premium")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all ${premiumStatus === "Premium"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              Premium
            </button>
            <button
              onClick={() => setPremiumStatus("Non Premium")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all ${premiumStatus === "Non Premium"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              Non Premium
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px]">
        {/* Header */}
        <div className="mb-4 md:mb-8 px-3 md:px-0 pt-3 md:pt-0">
          <div className="flex items-center justify-between flex-wrap gap-3 md:gap-0">
            <div className="flex items-start gap-2 md:gap-4">
              <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
                <Crown className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
              </div>
              <div>
                <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                  Premium Provider
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {premiumStatus === "Premium"
                    ? "Your provider health, performance and premium profile settings"
                    : "Unlock premium benefits and access to exclusive features"
                  }
                </p>
              </div>
            </div>
            {/* Category Selector - Only show for Premium users */}
            {premiumStatus === "Premium" && (
              <div className="relative w-full md:w-auto">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 pr-8 md:pr-10 text-sm text-gray-700 dark:text-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c0ff] cursor-pointer shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <option>Therapy</option>
                  <option>Nutrition</option>
                  <option>Physiotherapy</option>
                </select>
                <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* Non Premium View */}
        {premiumStatus === "Non Premium" && (
          <div className="space-y-4 md:space-y-6 px-3 md:px-0 pb-3 md:pb-0">
            {/* Premium Benefits Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-8">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Sparkles className="size-3.5 md:size-4 text-[#2563EB]" />
                </div>
                <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
                  Premium Benefits
                </h2>
              </div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 md:mb-8">
                Only premium providers receive session requests from Mantra's network of <span className="font-semibold text-gray-900 dark:text-white">1M+ individuals</span> and <span className="font-semibold text-gray-900 dark:text-white">20K+ corporate clients</span>.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 gap-3 md:gap-5">
                {/* Access 2000+ Organizations */}
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-md">
                    <Building2 className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5">
                      Access 2000+ Organizations
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Partner with MantraCare and reach employees across leading organizations.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" />
                </div>

                {/* Work on Your Terms */}
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#10B981] flex items-center justify-center flex-shrink-0 shadow-md">
                    <DollarSign className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5">
                      Work on Your Terms
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Offer services at listed rates — accept requests and get paid monthly.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" />
                </div>

                {/* Premium Listing */}
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 shadow-md">
                    <FileText className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5">
                      Premium Listing
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Get featured as a verified premium provider above basic members.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" />
                </div>
              </div>
            </div>

            {/* Health Score to Premium Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-8">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">
                    Complete Your Journey to Premium
                  </h3>
                  <p className="text-xs md:text-sm text-gray-900 dark:text-white leading-relaxed">
                    Reach a <span className="font-bold text-[#2563EB]">Health Score of {PREMIUM_THRESHOLD}+</span> (Top Performer band) to qualify and be invited as a credible, premium provider.
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Health Score</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {healthResult.health} / {PREMIUM_THRESHOLD}
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 md:h-4 overflow-hidden shadow-inner">
                    <motion.div
                      className="bg-[#2563EB] h-3 md:h-4 rounded-full transition-all duration-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToPremium}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-2 md:mt-3">
                  <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold ${getBandColor(healthResult.band)}`}>
                    Current band: {healthResult.bandLabel}
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 text-center mt-2 md:mt-3">
                  {canApplyPremium
                    ? "🎉 Congratulations! You've qualified for premium status"
                    : `${PREMIUM_THRESHOLD - healthResult.health} more score points needed to reach 80+ and unlock premium status`
                  }
                </p>
              </div>

              {/* What's holding you back */}
              {!canApplyPremium && topBlockers.length > 0 && (
                <div className="mt-4 md:mt-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg md:rounded-xl p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <TrendingDown className="size-4 md:size-5 text-red-500" />
                    <p className="text-xs md:text-sm font-bold text-red-700 dark:text-red-300">What's holding your score down</p>
                  </div>
                  <div className="space-y-2 md:space-y-2.5">
                    {topBlockers.map((metric) => (
                      <div key={metric.key} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[11px] md:text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{metric.label}</span>
                          <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">({metric.displayValue})</span>
                        </div>
                        <Link
                          to={metric.actionTarget}
                          className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold text-[#2563EB] hover:text-[#1d4ed8] flex-shrink-0"
                        >
                          Fix <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Improve Provider Score Button */}
            <Link to="/tasks" className="block">
              <button className="w-full py-3 md:py-4 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                Improve your Provider Score
              </button>
            </Link>

            {/* Action Button */}
            <button
              className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg ${canApplyPremium
                  ? "bg-[#3665E0] hover:bg-[#2952C0] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60"
                }`}
              disabled={!canApplyPremium}
            >
              Apply as Premium Provider
            </button>

            {/* Help Text */}
            {!canApplyPremium && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg md:rounded-xl p-3 md:p-4">
                <div className="flex gap-2 md:gap-3">
                  <Info className="size-4 md:size-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs md:text-sm text-blue-900 dark:text-blue-200 font-medium mb-0.5 md:mb-1">
                      How to raise your score?
                    </p>
                    <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                      Your health score blends quality (retention, reviews, completion), engagement (trainings, tasks, profile, activity) and business (sessions, renewals, revenue). Complete tasks, finish trainings and maintain high session quality to reach 80+.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="flex justify-end mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                To qualify for premium provider selection round T&C* Apply (Mantra Discretions)
              </p>
            </div>
          </div>
        )}

        {/* Premium View */}
        {premiumStatus === "Premium" && (
          <div className="space-y-4 md:space-y-6 px-3 md:px-0 pb-3 md:pb-0">
            {/* Health Score Hero */}
            <HealthScoreHero result={healthResult} />

            {/* Sub-scores */}
            <SubScoreCards result={healthResult} />

            {/* Why is my score low */}
            <WhyScoreIsLow flagged={healthResult.flagged} />

            {/* Full metric breakdown */}
            <MetricsBreakdown result={healthResult} />

            {/* Preferences Card */}
            <PreferencesPanel />

            {/* Contact Support */}
            <button className="w-full py-3 md:py-4 bg-[#3665E0] hover:bg-[#2952C0] text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 md:gap-2.5 shadow-md hover:shadow-lg">
              <HelpCircle className="size-4 md:size-5" />
              <span>Facing Issues? Contact Support</span>
            </button>

            {/* Info Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 md:border-2 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm">
              <div className="flex gap-2 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Info className="size-4 md:size-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-lg font-bold text-blue-900 dark:text-blue-200 mb-1 md:mb-2">Premium Benefits</h3>
                  <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                    Premium providers receive priority placement in client matching and access to exclusive features.
                    Keep your health score in the Top Performer band to maximize visibility and earnings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}