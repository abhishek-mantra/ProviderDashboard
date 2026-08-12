import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  ChevronDown,
  HelpCircle,
  Info,
  Crown,
  Building2,
  FileText,
  Award,
  CheckCircle,
  TrendingDown,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { computeProviderHealth, getBandColor } from "../utils/providerHealth";
import { mockProviderHealthMetrics } from "../data/providerHealth";
import { HealthScoreHero } from "../components/premium/HealthScoreHero";
import { WhatAffectsMyScore } from "../components/premium/WhatAffectsMyScore";
import { PreferencesPanel } from "../components/premium/PreferencesPanel";

const PREMIUM_THRESHOLD = 80;

export function Premium() {
  const [premiumStatus, setPremiumStatus] = useState<"Premium" | "Non Premium">("Non Premium");
  const [category, setCategory] = useState("Therapy");

  // Provider health score — computed from mock metrics (see utils/providerHealth.ts)
  const healthResult = computeProviderHealth(mockProviderHealthMetrics);
  const canApplyPremium = healthResult.premiumQualified;
  const progressToPremium = Math.min((healthResult.health / PREMIUM_THRESHOLD) * 100, 100);

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6 pb-20">
      {/* Dev Mode Toggle - Fixed position */}
      <div className="fixed top-16 md:top-4 right-2 md:right-4 z-50 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 md:p-3">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Dev Mode:
          </span>
          <div className="flex items-center gap-1 md:gap-1.5 bg-gray-100 dark:bg-gray-700 rounded-md md:rounded-lg p-0.5 md:p-1">
            <button
              onClick={() => setPremiumStatus("Premium")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all ${
                premiumStatus === "Premium"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Premium
            </button>
            <button
              onClick={() => setPremiumStatus("Non Premium")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all ${
                premiumStatus === "Non Premium"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Non Premium
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-6 px-3 md:px-0 pt-3 md:pt-0">
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
                    ? "Your provider health score, performance and premium settings"
                    : "Unlock premium benefits and access to exclusive corporate client requests"}
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

        {/* NON PREMIUM VIEW: Qualification Journey */}
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
                Only premium providers receive session requests from Mantra's network of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">1M+ individuals</span> and{" "}
                <span className="font-semibold text-gray-900 dark:text-white">20K+ corporate clients</span>.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 gap-3 md:gap-5">
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-md">
                    <Building2 className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1">
                      Access 2000+ Organizations
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Partner with MantraCare and reach employees across leading organizations.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-1" />
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#10B981] flex items-center justify-center flex-shrink-0 shadow-md">
                    <DollarSign className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1">
                      Work on Your Terms
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Offer services at listed rates — accept requests and get paid monthly.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-1" />
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 shadow-md">
                    <FileText className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1">
                      Premium Listing
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Get featured as a verified premium provider above basic members.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-1" />
                </div>
              </div>
            </div>

            {/* Health Score Progress Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-8">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1">
                    Complete Your Journey to Premium
                  </h3>
                  <p className="text-xs md:text-sm text-gray-900 dark:text-white leading-relaxed">
                    Reach a <span className="font-bold text-[#2563EB]">Health Score of {PREMIUM_THRESHOLD}+</span>{" "}
                    (Top Performer band) to qualify as a premium provider.
                  </p>
                </div>
              </div>

              {/* Simple Single Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Health Score</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {healthResult.health} / {PREMIUM_THRESHOLD}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3.5 overflow-hidden">
                  <motion.div
                    className="bg-[#2563EB] h-full rounded-full transition-all duration-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToPremium}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-center mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBandColor(healthResult.band)}`}>
                    Current Band: {healthResult.bandLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Single Consolidated Component: What Affects Your Score */}
            <WhatAffectsMyScore result={healthResult} />

            {/* Improve Score CTA */}
            <Link to="/tasks" className="block">
              <button className="w-full py-3.5 md:py-4 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl font-bold text-sm md:text-base transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]">
                Improve Your Provider Score
              </button>
            </Link>

            <button
              className={`w-full py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all shadow-md ${
                canApplyPremium
                  ? "bg-[#3665E0] hover:bg-[#2952C0] text-white shadow-lg hover:scale-[1.01]"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed opacity-60"
              }`}
              disabled={!canApplyPremium}
            >
              Apply as Premium Provider
            </button>

            {/* Support CTA */}
            <button className="w-full py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700">
              <HelpCircle className="size-4" />
              <span>Facing Issues? Contact Support</span>
            </button>
          </div>
        )}

        {/* PREMIUM ACTIVE VIEW: Clean Single Page View */}
        {premiumStatus === "Premium" && (
          <div className="space-y-4 md:space-y-6 px-3 md:px-0 pb-3 md:pb-0">
            {/* Main Health Score Hero (Only 1 Score Number!) */}
            <HealthScoreHero result={healthResult} />

            {/* Single Consolidated Component: What Affects Your Score */}
            <WhatAffectsMyScore result={healthResult} />

            {/* Preferences Panel */}
            <PreferencesPanel />

            {/* Support CTA */}
            <button className="w-full py-3.5 md:py-4 bg-[#3665E0] hover:bg-[#2952C0] text-white rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md">
              <HelpCircle className="size-4" />
              <span>Facing Issues? Contact Support</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}