import {
  LayoutDashboard, Coins, CreditCard, Calendar, Wrench,
  TrendingUp, ArrowRight, Check, Plus, Minus, ChevronDown,
  ChevronUp, Info, Edit2, X, Zap, Clock, Bell, FileText,
  Pill, Building2, Users, AlertTriangle, ShoppingCart,
  Stethoscope, Shield, Headphones, Tag, ArrowUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { PLAN_TIER_PRICING, PLAN_TIER_EXTRA_COST, PlanTier } from "../types/partnerDashboard";

export function SettingsBilling() {
  const location = useLocation();
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "payments" | "manage-credit-usage">("overview");

  useEffect(() => {
    if ((location.state as any)?.openManageCredits) {
      setActiveSubTab("manage-credit-usage");
    }
  }, []);

  const [activePlanName] = useState<PlanTier>("GROWTH");
  const [activePlanMode] = useState<"EHR" | "AI Scribe">("EHR");
  const activePlan = ehrPlans.find(p => p.name === activePlanName);

  const billingSubTabs = [
    { id: "overview", label: "Overview" },
    { id: "payments", label: "Payments" },
    { id: "manage-credit-usage", label: "Manage Credit Usage" },
  ];

  return (
    <div>
      {/* Sub-tab bar — full-width flat style */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-3 md:px-0 mb-4 md:mb-6">
        <div className="flex items-center border-b border-[#E5E7EB] dark:border-gray-700 min-w-max w-full">
          {billingSubTabs.map((tab) => {
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  active
                    ? "border-[#043570] text-[#111827] dark:text-white"
                    : "border-transparent text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeSubTab === "overview" && <OverviewContent autoOpenPlans={!!(location.state as any)?.openAvailablePlans} activePlan={activePlan} activePlanName={activePlanName} activePlanMode={activePlanMode} />}
        {activeSubTab === "payments" && <PaymentsContent />}
        {activeSubTab === "manage-credit-usage" && <ManageCreditUsageContent activePlan={activePlan} />}
      </div>
    </div>
  );
}

// ─── Plan data — defined outside component so OverviewContent stays lean ───

type BadgeType = "free" | "discount" | "popular";
type CtaStyle = "current" | "outlined" | "solid" | "locked";

interface FeatureGroup {
  label: string;
  features: string[];
  sublabel?: string;
  collapsible: boolean;
  defaultExpanded: boolean;
}

interface EHRPlan {
  name: string;
  audienceTag: string;
  badge: string;
  badgeType: BadgeType;
  monthlyPrice: number;
  originalMonthlyPrice: number | null;
  annualPrice: number | null;
  annualSavings: number | null;
  annualOriginal: number | null;
  creditsPerMonth: number;
  creditsLabel: string;
  creditBarPct: number;
  annualCreditsPerMonth?: number;
  teamLabel: string;
  teamSublabel?: string;
  featureGroups: FeatureGroup[];
  notIncluded: { text: string; nudge?: string }[];
  mantraNote?: string;
  cta: string;
  ctaStyle: CtaStyle;
  isRecommended?: boolean;
}

interface AIScribePlan {
  name: string;
  audienceTag: string;
  badge: string;
  badgeType: BadgeType;
  monthlyPrice: number;
  originalMonthlyPrice: number;
  annualPrice: number | null;
  annualSavings: number | null;
  annualOriginal: number | null;
  creditsPerMonth: number;
  approxSessions: number;
  costPerSession: number;
  valueLine: string | null;
  cta: string;
  ctaStyle: CtaStyle;
  isPopular?: boolean;
  creditBarPct: number;
  teamLabel: string;
}

const ehrPlans: EHRPlan[] = [
  {
    name: "BASIC",
    audienceTag: "For independent solo practitioners",
    badge: "BASIC",
    badgeType: "free",
    monthlyPrice: PLAN_TIER_PRICING.BASIC,
    originalMonthlyPrice: null,
    annualPrice: PLAN_TIER_PRICING.BASIC * 12 - 118,
    annualSavings: 118,
    annualOriginal: PLAN_TIER_PRICING.BASIC * 12,
    creditsPerMonth: 1000,
    annualCreditsPerMonth: 1000,
    creditsLabel: "Resets monthly",
    creditBarPct: 25,
    teamLabel: "Up to 1 provider",
    featureGroups: [
      {
        label: "OUR CORE FEATURES, AND",
        features: [],
        collapsible: false,
        defaultExpanded: true,
      },
      {
        label: "",
        features: [
          "AI Transcriber",
          "AI Session Notes",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
      {
        label: "",
        features: [
          "Credentialing & Enrollment Access",
          "5 free insurance claims/mo",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
    ],
    notIncluded: [],
    cta: "Get Started",
    ctaStyle: "solid",
  },
  {
    name: "GROWTH",
    audienceTag: "For growing practices & small teams",
    badge: "GROWTH",
    badgeType: "free",
    monthlyPrice: PLAN_TIER_PRICING.GROWTH,
    originalMonthlyPrice: null,
    annualPrice: PLAN_TIER_PRICING.GROWTH * 12 - 238,
    annualSavings: 238,
    annualOriginal: PLAN_TIER_PRICING.GROWTH * 12,
    creditsPerMonth: 3000,
    annualCreditsPerMonth: 3000,
    creditsLabel: "Resets monthly",
    creditBarPct: 65,
    teamLabel: "Up to 5 providers",
    teamSublabel: `Add providers from $${PLAN_TIER_EXTRA_COST.GROWTH}/clinician`,
    featureGroups: [
      {
        label: "EVERYTHING IN BASIC, AND",
        features: [
          "Automated appointment reminders",
          "Calendar sync (Google & Outlook)",
          "Automatic insurance status checks",
          "10 free insurance claims/mo",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
    ],
    notIncluded: [],
    cta: "Get Started",
    ctaStyle: "solid",
    isRecommended: true,
  },
  {
    name: "SCALER",
    audienceTag: "For large clinics & multi-location practices",
    badge: "SCALER",
    badgeType: "free",
    monthlyPrice: PLAN_TIER_PRICING.SCALER,
    originalMonthlyPrice: null,
    annualPrice: PLAN_TIER_PRICING.SCALER * 12 - 358,
    annualSavings: 358,
    annualOriginal: PLAN_TIER_PRICING.SCALER * 12,
    creditsPerMonth: 5000,
    annualCreditsPerMonth: 5000,
    creditsLabel: "Resets monthly",
    creditBarPct: 100,
    teamLabel: "Unlimited providers",
    teamSublabel: "No per-provider fees",
    featureGroups: [
      {
        label: "EVERYTHING IN GROWTH, AND",
        features: [
          "Premium support phone line",
          "Insurance claim management & submissions",
          "Group appointments & telehealth",
          "35 free insurance claims/mo",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
    ],
    notIncluded: [],
    cta: "Get Started",
    ctaStyle: "outlined",
  },
];

const aiScribePlans: AIScribePlan[] = [
  {
    name: "BASIC",
    audienceTag: "For solo practitioners doing up to 20 sessions/month",
    badge: "STARTER",
    badgeType: "free",
    monthlyPrice: 29,
    originalMonthlyPrice: null,
    annualPrice: 278,
    annualSavings: 70,
    annualOriginal: 348,
    creditsPerMonth: 300,
    approxSessions: 20,
    costPerSession: 1.45,
    valueLine: null,
    cta: "Get Started",
    ctaStyle: "outlined",
    creditBarPct: 8,
    teamLabel: "1 provider",
  },
  {
    name: "PROFESSIONAL",
    audienceTag: "For full-time practitioners doing up to 40 sessions/month",
    badge: "MOST POPULAR",
    badgeType: "popular",
    monthlyPrice: 49,
    originalMonthlyPrice: null,
    annualPrice: 470,
    annualSavings: 118,
    annualOriginal: 588,
    creditsPerMonth: 500,
    approxSessions: 38,
    costPerSession: 1.29,
    valueLine: null,
    cta: "Get Started",
    ctaStyle: "solid",
    isPopular: true,
    creditBarPct: 33,
    teamLabel: "Up to 3 providers",
  },
  {
    name: "CLINIC",
    audienceTag: "For small clinics sharing up to 75 sessions/month",
    badge: "FOR TEAMS",
    badgeType: "free",
    monthlyPrice: 99,
    originalMonthlyPrice: null,
    annualPrice: 950,
    annualSavings: 238,
    annualOriginal: 1188,
    creditsPerMonth: 1000,
    approxSessions: 75,
    costPerSession: 1.32,
    valueLine: null,
    cta: "Get Started",
    ctaStyle: "outlined",
    creditBarPct: 100,
    teamLabel: "Up to 8 providers",
  },
];

const badgeClasses = (type: BadgeType) => {
  if (type === "free") return "bg-[#ECFDF5] text-[#065F46]";
  if (type === "popular") return "bg-[#FEF3C7] text-[#92400E]";
  return "bg-[#CCFBF1] text-[#0F766E]";
};

// ─── Overview Content ───────────────────────────────────────────────────────

function OverviewContent({ autoOpenPlans = false, activePlan, activePlanName, activePlanMode }: { autoOpenPlans?: boolean; activePlan: EHRPlan | undefined; activePlanName: PlanTier; activePlanMode: "EHR" | "AI Scribe" }) {
  const [isPlansExpanded, setIsPlansExpanded] = useState(autoOpenPlans);
  const [isAlertsExpanded, setIsAlertsExpanded] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [alert70, setAlert70] = useState(true);
  const [alert90, setAlert90] = useState(true);
  const [alertExhausted, setAlertExhausted] = useState(true);

  const planDisplayName: Record<string, string> = {
    BASIC: "EHR Essential",
    GROWTH: "Growth",
    SCALER: "Scaler",
  };

  const signupModeMap: Record<string, "EHR" | "AI Scribe"> = {
    "full-ehr": "EHR",
    "ai-scribe": "AI Scribe",
  };
  const storedMode = localStorage.getItem("signup_mode");
  const defaultPlanMode: "EHR" | "AI Scribe" = storedMode ? (signupModeMap[storedMode] ?? "EHR") : "EHR";
  const [planMode, setPlanMode] = useState<"EHR" | "AI Scribe">(defaultPlanMode);

  useEffect(() => {
    if (autoOpenPlans) {
      setTimeout(() => {
        document.getElementById('available-plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [autoOpenPlans]);

  const handleManagePlan = () => {
    setIsPlansExpanded(true);
    setTimeout(() => {
      document.getElementById('available-plans')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // ── EHR card template ────────────────────────────────────────────────────
  const renderEHRCard = (plan: EHRPlan) => {
    const isActive = activePlanMode === "EHR" && activePlanName === plan.name;

    let badgeText = plan.badge;
    let badgeType = plan.badgeType;
    if (billingPeriod === "annual" && plan.annualSavings) {
      badgeText = `SAVE $${plan.annualSavings}/YEAR`;
      badgeType = "discount";
    }

    let mainPrice: string;
    let strikePrice: string | null = null;
    let priceUnit: string;

    if (billingPeriod === "annual" && plan.annualPrice) {
      mainPrice = `$${plan.annualPrice}`;
      strikePrice = plan.annualOriginal ? `$${plan.annualOriginal}/yr` : null;
      priceUnit = "/ year";
    } else {
      mainPrice = plan.monthlyPrice === 0 ? "$0" : `$${plan.monthlyPrice}`;
      strikePrice = plan.originalMonthlyPrice ? `$${plan.originalMonthlyPrice}` : null;
      priceUnit = plan.monthlyPrice === 0 ? "" : "/ month";
    }

    const displayCredits =
      billingPeriod === "annual" && plan.annualCreditsPerMonth
        ? plan.annualCreditsPerMonth
        : plan.creditsPerMonth;

    let ctaText = isActive ? "Current Plan" : plan.cta;
    let ctaStyle: CtaStyle = isActive ? "current" : plan.ctaStyle;

    return (
      <div
        key={plan.name}
        className={`border rounded-xl p-5 flex flex-col relative ${
          plan.isRecommended
            ? "border-[#14B8A6] border-2 shadow-[0_4px_20px_rgba(20,184,166,0.15)] bg-[#F0FDFA]"
            : "border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-800"
        }`}
      >
        {plan.isRecommended && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#043570] text-white text-[10px] font-bold rounded-full whitespace-nowrap">
            ★ Recommended
          </div>
        )}

        {/* Badge row */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded ${badgeClasses(badgeType)}`}>
            {badgeText}
          </span>
        </div>

        {/* Plan name + audience */}
        <div className="mb-4">
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }} className="text-[#111827] dark:text-white mb-1">
            {plan.name}
          </h3>
          <p style={{ fontSize: "11px" }} className="text-[#9CA3AF]">{plan.audienceTag}</p>
        </div>

        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Price block */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            {strikePrice && (
              <span style={{ fontSize: "13px" }} className="text-[#9CA3AF] line-through">{strikePrice}</span>
            )}
            <span style={{ fontSize: "36px", fontWeight: "800", lineHeight: 1 }} className="text-[#111827] dark:text-white">
              {mainPrice}
            </span>
            {priceUnit && (
              <span style={{ fontSize: "13px" }} className="text-[#9CA3AF]">{priceUnit}</span>
            )}
          </div>
          {plan.monthlyPrice === 0 && (
            <p style={{ fontSize: "12px" }} className="text-[#9CA3AF] mt-1">No card required</p>
          )}
          {billingPeriod === "annual" && plan.annualSavings && (
            <p style={{ fontSize: "12px" }} className="text-[#14B8A6] mt-1">
              Save ${plan.annualSavings}/year vs monthly
            </p>
          )}
        </div>

        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Credits block */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="size-3.5 text-[#14B8A6] flex-shrink-0" />
            <span style={{ fontSize: "15px", fontWeight: "bold" }} className="text-[#14B8A6]">
              {displayCredits.toLocaleString()} credits / month
            </span>
          </div>
          <p style={{ fontSize: "11px" }} className="text-[#9CA3AF] mb-1">
            {billingPeriod === "annual"
              ? `${(displayCredits * 12).toLocaleString()} credits for the year · resets monthly`
              : plan.creditsLabel}
          </p>
        </div>
        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Team block */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-0.5">
            <Users className="size-3.5 text-[#6B7280] flex-shrink-0" />
            <span style={{ fontSize: "13px", fontWeight: "600" }} className="text-[#374151] dark:text-gray-300">
              {plan.teamLabel}
            </span>
          </div>
          {plan.teamSublabel && (
            <p style={{ fontSize: "11px" }} className="text-[#9CA3AF] italic pl-5">
              {plan.teamSublabel}
            </p>
          )}
        </div>
        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Feature groups */}
        <div className="flex-1 space-y-1 mb-6">
          {plan.featureGroups.map((group, gIdx) => (
            <div key={gIdx} className="mt-1">
              <div className="flex items-center justify-between mb-0">
                <span style={{ fontSize: "10px" }} className="uppercase tracking-widest font-bold text-[#9CA3AF]">
                  {group.label}
                </span>
              </div>
              <ul className="space-y-1.5">
                {group.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className="size-3.5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                    <span style={{ fontSize: "13px" }} className="text-[#374151] dark:text-gray-300">{feat}</span>
                  </li>
                ))}
                {group.sublabel && (
                  <li style={{ fontSize: "11px" }} className="text-[#9CA3AF] italic pl-5">{group.sublabel}</li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          disabled={ctaStyle === "current"}
          className={`w-full py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
            ctaStyle === "current"
              ? "bg-[#14B8A6] text-white cursor-default"
              : ctaStyle === "solid"
              ? "bg-[#14B8A6] hover:bg-[#0d9488] text-white"
              : "border-2 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white"
          }`}
        >
          {ctaText}
        </button>
      </div>
    );
  };

  // ── AI Scribe card template ───────────────────────────────────────────────
  const sharedScribeFeatures = [
    "AI Transcriber — joins your online sessions via link",
    "AI Session Notes — SOAP, DAP, BIRP formats",
    "AI Prescription generator",
  ];

  const renderAIScribeCard = (plan: AIScribePlan) => {
    const isActive = activePlanMode === "AI Scribe" && activePlanName === plan.name;

    let badgeText = plan.badge;
    let badgeType = plan.badgeType;
    if (billingPeriod === "annual" && plan.annualSavings) {
      badgeText = `SAVE $${plan.annualSavings}/YEAR`;
      badgeType = "discount";
    }

    const mainPrice = (billingPeriod === "annual" && plan.annualPrice)
      ? `$${plan.annualPrice}`
      : `$${plan.monthlyPrice}`;

    const strikePrice = (billingPeriod === "annual" && plan.annualOriginal)
      ? `$${plan.annualOriginal}/yr`
      : null;

    const priceUnit = (billingPeriod === "annual" && plan.annualPrice) ? "/ year" : "/ month";

    return (
      <div
        key={plan.name}
        className={`border rounded-xl p-5 flex flex-col ${
          plan.isPopular
            ? "border-[#14B8A6] border-2 shadow-[0_4px_20px_rgba(20,184,166,0.15)] bg-[#F0FDFA]"
            : "border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-800"
        }`}
      >
        {/* Badge */}
        <div className="mb-3">
          <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded ${badgeClasses(badgeType)}`}>
            {badgeText}
          </span>
        </div>

        {/* Plan name + audience */}
        <div className="mb-4">
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }} className="text-[#111827] dark:text-white mb-1">
            {plan.name}
          </h3>
          <p style={{ fontSize: "11px" }} className="text-[#9CA3AF]">{plan.audienceTag}</p>
        </div>

        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Price block */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            {strikePrice && (
              <span style={{ fontSize: "13px" }} className="text-[#9CA3AF] line-through">{strikePrice}</span>
            )}
            <span style={{ fontSize: "36px", fontWeight: "800", lineHeight: 1 }} className="text-[#111827] dark:text-white">
              {mainPrice}
            </span>
            <span style={{ fontSize: "13px" }} className="text-[#9CA3AF]">{priceUnit}</span>
          </div>
          {billingPeriod === "annual" && plan.annualSavings && (
            <p style={{ fontSize: "12px" }} className="text-[#14B8A6] mt-1">
              Save ${plan.annualSavings}/year vs monthly
            </p>
          )}
        </div>

        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Credits block */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="size-3.5 text-[#14B8A6] flex-shrink-0" />
            <span style={{ fontSize: "15px", fontWeight: "bold" }} className="text-[#14B8A6]">
              {plan.creditsPerMonth.toLocaleString()} credits / month
            </span>
          </div>
        </div>

        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Team block */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Users className="size-3.5 text-[#6B7280] flex-shrink-0" />
            <span style={{ fontSize: "13px", fontWeight: "600" }} className="text-[#374151] dark:text-gray-300">
              {plan.teamLabel}
            </span>
          </div>
        </div>
        <hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />

        {/* Features — identical across all AI Scribe plans */}
        <div className="flex-1 mb-6">
          <span style={{ fontSize: "10px" }} className="uppercase tracking-widest font-bold text-[#9CA3AF] block mb-2">
            What's included
          </span>
          <ul className="space-y-1.5">
            {sharedScribeFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="size-3.5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                <span style={{ fontSize: "13px" }} className="text-[#374151] dark:text-gray-300">{feat}</span>
              </li>
            ))}
            {plan.name === "CLINIC" && (
              <li style={{ fontSize: "11px" }} className="text-[#9CA3AF] italic pl-5">Shared across all providers</li>
            )}
          </ul>
        </div>

        {/* CTA */}
        <button
          disabled={isActive}
          className={`w-full py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
            isActive
              ? "bg-[#14B8A6] text-white cursor-default"
              : plan.ctaStyle === "solid"
              ? "bg-[#14B8A6] hover:bg-[#0d9488] text-white"
              : "border-2 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white"
          }`}
        >
          {isActive ? "Current Plan" : plan.cta}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6 px-3 md:px-0">
      {/* Current Plan Card */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <div className="bg-[#F9FAFB] dark:bg-gray-750 rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] dark:border-gray-700">
            <span className="text-[13px] text-[#6B7280] dark:text-gray-400">Plan</span>
            <span className="text-[13px] font-semibold text-[#111827] dark:text-white">{planDisplayName[activePlanName]} · ${activePlan?.monthlyPrice}/month</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] dark:border-gray-700">
            <span className="text-[13px] text-[#6B7280] dark:text-gray-400">Credits included</span>
            <span className="text-[13px] font-semibold text-[#111827] dark:text-white">{activePlan?.creditsPerMonth?.toLocaleString()} credits / month</span>
          </div>
          <div className="flex items-start justify-between px-4 py-3 border-b border-[#E5E7EB] dark:border-gray-700">
            <span className="text-[13px] text-[#6B7280] dark:text-gray-400 flex-shrink-0 mr-4">EHR tools</span>
            <span className="text-[13px] text-[#111827] dark:text-white text-right">AI Transcriber · Session Notes · Prescription · Appointments · Records</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] dark:border-gray-700">
            <span className="text-[13px] text-[#6B7280] dark:text-gray-400">Provider seats</span>
            <span className="text-[13px] text-[#111827] dark:text-white">6 active · 5 included · 1 extra at $19/mo</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] dark:border-gray-700">
            <span className="text-[13px] text-[#6B7280] dark:text-gray-400">Billing</span>
            <span className="text-[13px] text-[#111827] dark:text-white">Monthly · renews June 1, 2026 · cancel anytime</span>
          </div>
          <div className="flex justify-end px-4 py-3">
            <button
              onClick={handleManagePlan}
              className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white text-[13px] font-medium rounded-lg transition-colors"
            >
              Manage Plan
            </button>
          </div>
        </div>
      </div>

      {/* Credits explainer + Buy More Credits */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Coins className="size-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-[14px] font-semibold text-[#111827] dark:text-white mb-1">
              What are credits?
            </h3>
            <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mb-3">
              Credits power AI transcription & scribe features. You use them per session, drawn from your plan's monthly allowance or purchased add-ons.
            </p>
            <Link
              to="/settings/billing/manage-credit-usage"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1E3A8A] hover:text-[#1e40af] transition-colors"
            >
              <ShoppingCart className="size-4" />
              Buy More Credits
            </Link>
          </div>
        </div>
      </div>

      {/* Credit Pricing Reference */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Coins className="size-4 text-[#14B8A6]" />
          <h3 className="text-[14px] font-semibold text-[#111827] dark:text-white">Credit Pricing</h3>
        </div>
        <div className="space-y-3">
          {[
            { icon: Zap, color: "#14B8A6", bg: "#CCFBF1", name: "AI Transcriber", cost: "1 credit / minute", desc: "Transcribe session audio into text automatically." },
            { icon: FileText, color: "#1E40AF", bg: "#DBEAFE", name: "AI-Assisted Session Notes", cost: "1 credit", desc: "Auto-generate structured session notes from transcripts." },
            { icon: Pill, color: "#15803D", bg: "#DCFCE7", name: "AI Prescription", cost: "1 credit", desc: "Generate AI-powered prescription drafts from session context." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name}>
                <div className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="size-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-[13px] font-medium text-[#111827] dark:text-white flex-1">{item.name}</span>
                  <span className="text-[11px] font-semibold text-[#14B8A6] bg-[#F0FDFA] dark:bg-[#14B8A6]/10 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {item.cost}
                  </span>
                </div>
                <p className="text-[12px] text-[#6B7280] dark:text-gray-400 mt-0.5 ml-11">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Plans */}
      <div id="available-plans" className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <button
          onClick={() => setIsPlansExpanded(!isPlansExpanded)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h2 className="text-base md:text-lg font-semibold text-[#111827] dark:text-white">
            Available Plans
          </h2>
          {isPlansExpanded ? (
            <ChevronUp className="size-5 text-[#6B7280]" />
          ) : (
            <ChevronDown className="size-5 text-[#6B7280]" />
          )}
        </button>

        {isPlansExpanded && (
          <div>
            {/* Mode + Period toggles */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <div className="inline-flex bg-[#F3F4F6] dark:bg-gray-700 rounded-lg p-1">
                {([["EHR + AI Scribe", "EHR"], ["AI Scribe Only", "AI Scribe"]] as [string, "EHR" | "AI Scribe"][]).map(([label, val]) => (
                  <button
                    key={val}
                    onClick={() => setPlanMode(val)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      planMode === val
                        ? "bg-white dark:bg-gray-600 text-[#111827] dark:text-white shadow-sm"
                        : "text-[#6B7280] dark:text-gray-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="inline-flex bg-[#F3F4F6] dark:bg-gray-700 rounded-lg p-1">
                {(["Monthly", "Annual"] as const).map((label) => {
                  const val = label.toLowerCase() as "monthly" | "annual";
                  return (
                    <button
                      key={val}
                      onClick={() => setBillingPeriod(val)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        billingPeriod === val
                          ? "bg-white dark:bg-gray-600 text-[#111827] dark:text-white shadow-sm"
                          : "text-[#6B7280] dark:text-gray-400"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode explainer */}
            <p className="text-[12px] text-[#6B7280] dark:text-gray-400 mb-6">
              {planMode === "EHR"
                ? "EHR + AI Scribe — Full clinic management with AI tools included."
                : "AI Scribe Only — Just AI transcription, notes & prescriptions. No EHR."}
            </p>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {planMode === "EHR"
                ? ehrPlans.map(plan => renderEHRCard(plan))
                : aiScribePlans.map(plan => renderAIScribeCard(plan))}
            </div>
          </div>
        )}
      </div>

      {/* Credit Alerts */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <button
          onClick={() => setIsAlertsExpanded(!isAlertsExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-[#6B7280]" />
            <h2 className="text-base md:text-lg font-semibold text-[#111827] dark:text-white">
              Credit Alerts
            </h2>
          </div>
          {isAlertsExpanded ? (
            <ChevronUp className="size-5 text-[#6B7280]" />
          ) : (
            <ChevronDown className="size-5 text-[#6B7280]" />
          )}
        </button>

        {isAlertsExpanded && (
          <div className="mt-4">
            <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mb-4">
              Get notified when your credit usage reaches certain thresholds
            </p>

            <div className="space-y-3">
              {/* 70% Alert */}
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#111827] dark:text-white font-medium">
                  70% Usage Alert
                </span>
                <button
                  onClick={() => setAlert70(!alert70)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alert70 ? 'bg-[#043570]' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alert70 ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* 90% Alert */}
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#111827] dark:text-white font-medium">
                  90% Usage Alert
                </span>
                <button
                  onClick={() => setAlert90(!alert90)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alert90 ? 'bg-[#043570]' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alert90 ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Balance Exhausted Alert */}
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#111827] dark:text-white font-medium">
                  Balance Exhausted Alert
                </span>
                <button
                  onClick={() => setAlertExhausted(!alertExhausted)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertExhausted ? 'bg-[#043570]' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alertExhausted ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function detectCardProvider(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, "");
  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "Mastercard";
  if (/^3[47]/.test(cleaned)) return "Amex";
  if (/^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9])|[2-8]\d|9[01]))/.test(cleaned)) return "Discover";
  return "";
}

// Payments Content
function PaymentsContent() {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [addressData, setAddressData] = useState({
    street: "123 Healthcare Ave, Suite 100",
    city: "San Francisco",
    state: "CA",
    postalCode: "94102",
    country: "United States",
  });
  const [newCard, setNewCard] = useState({
    provider: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    setDefault: false,
  });

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
    setAddressData({
      street: "123 Healthcare Ave, Suite 100",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "United States",
    });
  };

  return (
    <div className="space-y-6 px-3 md:px-0">
      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold text-[#111827] dark:text-white">
            Payment Methods
          </h2>
          <button
            onClick={() => setShowAddCardModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-[#1E3A8A] hover:bg-[#1E3A8A]/5 text-[13px] font-medium rounded-lg transition-colors"
          >
            <Plus className="size-4" />
            Add Payment Method
          </button>
        </div>

        {/* Existing Card */}
        <div className="flex items-start justify-between p-4 border border-[#E5E7EB] dark:border-gray-700 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="size-10 bg-[#1434CB] rounded flex items-center justify-center text-white font-bold text-sm">
              VISA
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#111827] dark:text-white">
                Visa ending in 4567
              </p>
              <p className="text-[12px] text-[#6B7280] dark:text-gray-400">
                Expires 12/27
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] bg-[#F3F4F6] dark:bg-gray-700 text-[#6B7280] dark:text-gray-400 px-2 py-1 rounded">
              Default
            </span>
            <button className="text-[12px] text-[#1E3A8A] hover:text-[#1e40af] font-medium">
              Make Default
            </button>
            <button className="text-[12px] text-[#DC2626] hover:text-[#b91c1c] font-medium">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold text-[#111827] dark:text-white">
            Billing Address
          </h2>
          {!isEditingAddress ? (
            <button
              onClick={() => setIsEditingAddress(true)}
              className="flex items-center gap-1.5 text-[#1E3A8A] hover:text-[#1e40af] text-[13px] font-medium"
            >
              <Edit2 className="size-3.5" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 text-[#6B7280] hover:text-[#111827] text-[13px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-3 py-1.5 bg-[#1E3A8A] hover:bg-[#1e40af] text-white text-[13px] font-medium rounded-lg"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Street Address */}
          <div>
            <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
              Street Address
            </label>
            {isEditingAddress ? (
              <input
                type="text"
                value={addressData.street}
                onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            ) : (
              <p className="text-[13px] text-[#111827] dark:text-white">{addressData.street}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
              City
            </label>
            {isEditingAddress ? (
              <input
                type="text"
                value={addressData.city}
                onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            ) : (
              <p className="text-[13px] text-[#111827] dark:text-white">{addressData.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
              State / Province
            </label>
            {isEditingAddress ? (
              <input
                type="text"
                value={addressData.state}
                onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            ) : (
              <p className="text-[13px] text-[#111827] dark:text-white">{addressData.state}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
              Postal Code
            </label>
            {isEditingAddress ? (
              <input
                type="text"
                value={addressData.postalCode}
                onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            ) : (
              <p className="text-[13px] text-[#111827] dark:text-white">{addressData.postalCode}</p>
            )}
          </div>

          {/* Country */}
          <div className="md:col-span-2">
            <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
              Country
            </label>
            {isEditingAddress ? (
              <input
                type="text"
                value={addressData.country}
                onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            ) : (
              <p className="text-[13px] text-[#111827] dark:text-white">{addressData.country}</p>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <h2 className="text-base md:text-lg font-semibold text-[#111827] dark:text-white mb-4">
          Transaction History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-gray-700">
                <th className="text-left py-3 px-2 text-[12px] font-semibold text-[#6B7280] dark:text-gray-400">
                  Date
                </th>
                <th className="text-left py-3 px-2 text-[12px] font-semibold text-[#6B7280] dark:text-gray-400">
                  Description
                </th>
                <th className="text-left py-3 px-2 text-[12px] font-semibold text-[#6B7280] dark:text-gray-400">
                  Amount
                </th>
                <th className="text-left py-3 px-2 text-[12px] font-semibold text-[#6B7280] dark:text-gray-400">
                  Status
                </th>
                <th className="text-left py-3 px-2 text-[12px] font-semibold text-[#6B7280] dark:text-gray-400">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E5E7EB] dark:border-gray-700">
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  May 1, 2026
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  Growth Plan (Annual)
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  $758
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 bg-[#D1FAE5] text-[#065F46] text-[11px] font-medium rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="text-[12px] text-[#1E3A8A] hover:text-[#1e40af] font-medium">
                    Download
                  </button>
                </td>
              </tr>
              <tr className="border-b border-[#E5E7EB] dark:border-gray-700">
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  Apr 1, 2026
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  Growth Plan (Monthly)
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  $79
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 bg-[#D1FAE5] text-[#065F46] text-[11px] font-medium rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="text-[12px] text-[#1E3A8A] hover:text-[#1e40af] font-medium">
                    Download
                  </button>
                </td>
              </tr>
              <tr className="border-b border-[#E5E7EB] dark:border-gray-700">
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  Mar 1, 2026
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  Growth Plan (Monthly)
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  $79
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 bg-[#D1FAE5] text-[#065F46] text-[11px] font-medium rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="text-[12px] text-[#1E3A8A] hover:text-[#1e40af] font-medium">
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  Feb 10, 2026
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  Credits purchased (100 credits)
                </td>
                <td className="py-3 px-2 text-[13px] text-[#111827] dark:text-white">
                  $19
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 bg-[#D1FAE5] text-[#065F46] text-[11px] font-medium rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="text-[12px] text-[#1E3A8A] hover:text-[#1e40af] font-medium">
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-[480px] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-white">
                Add Payment Method
              </h3>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-[#6B7280]" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Cardholder Name */}
              <div>
                <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Full name on card"
                  value={newCard.cardholderName}
                  onChange={(e) => setNewCard({ ...newCard, cardholderName: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={newCard.cardNumber}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 19);
                      const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                      setNewCard({
                        ...newCard,
                        cardNumber: formatted,
                        provider: detectCardProvider(raw),
                      });
                    }}
                    className="w-full px-3 py-2 pr-12 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
                  />
                  {newCard.provider && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide">
                      {newCard.provider}
                    </span>
                  )}
                </div>
              </div>

              {/* Expiry Date & CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="•••"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Set as Default */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="setDefault"
                  checked={newCard.setDefault}
                  onChange={(e) => setNewCard({ ...newCard, setDefault: e.target.checked })}
                  className="size-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                />
                <label htmlFor="setDefault" className="text-[13px] text-[#374151] dark:text-gray-300">
                  Set as default payment method
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowAddCardModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#D1D5DB] dark:border-gray-600 text-[#374151] dark:text-gray-300 text-[13px] font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle add card logic
                  setShowAddCardModal(false);
                }}
                className="flex-1 px-4 py-2.5 bg-[#1E3A8A] hover:bg-[#1e40af] text-white text-[13px] font-medium rounded-lg transition-colors"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Manage Credit Usage Content
function ManageCreditUsageContent({ activePlan }: { activePlan: EHRPlan | undefined }) {
  const location = useLocation();
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);
  const [isBuyCreditsExpanded, setIsBuyCreditsExpanded] = useState(!!(location.state as any)?.openManageCredits);
  const [historyFilter, setHistoryFilter] = useState("All Tools");
  const [monthFilter, setMonthFilter] = useState("This Month");
  const [creditQty, setCreditQty] = useState(10000);
  const CREDIT_PRICE_PER_1000 = 20.00;
  const monthlyPrice = ((creditQty / 1000) * CREDIT_PRICE_PER_1000).toFixed(2);

  const presets = [
    { label: "500",  value: 500 },
    { label: "1K",   value: 1000 },
    { label: "2.5K", value: 2500 },
    { label: "5K",   value: 5000 },
    { label: "10K",  value: 10000 },
    { label: "25K",  value: 25000 },
  ];

  const historyRows = [
    { tool: "AI Transcriber", platform: "EHR", icon: <Zap className="size-3.5 text-[#14B8A6]" />, iconBg: "#CCFBF1", activity: "Session transcription completed", credits: -42, date: "Jun 1, 2026 · 9:14 AM" },
    { tool: "Session Notes", platform: "EHR", icon: <FileText className="size-3.5 text-[#1E40AF]" />, iconBg: "#DBEAFE", activity: "AI-assisted note generated", credits: -1, date: "May 31, 2026 · 4:45 PM" },
    { tool: "AI Transcriber", platform: "EHR", icon: <Zap className="size-3.5 text-[#14B8A6]" />, iconBg: "#CCFBF1", activity: "Session transcription completed", credits: -38, date: "May 31, 2026 · 2:30 PM" },
    { tool: "Prescription", platform: "EHR", icon: <Pill className="size-3.5 text-[#15803D]" />, iconBg: "#DCFCE7", activity: "AI prescription generated", credits: -1, date: "May 30, 2026 · 11:00 AM" },
    { tool: "AI Transcriber", platform: "EHR", icon: <Zap className="size-3.5 text-[#14B8A6]" />, iconBg: "#CCFBF1", activity: "Session transcription completed", credits: -50, date: "May 29, 2026 · 3:00 PM" },
    { tool: "Session Notes", platform: "EHR", icon: <FileText className="size-3.5 text-[#1E40AF]" />, iconBg: "#DBEAFE", activity: "Manual note created", credits: -1, date: "May 28, 2026 · 10:20 AM" },
    { tool: "AI Transcriber", platform: "EHR", icon: <Zap className="size-3.5 text-[#14B8A6]" />, iconBg: "#CCFBF1", activity: "Session transcription completed", credits: -45, date: "May 27, 2026 · 2:15 PM" },
    { tool: "Prescription", platform: "EHR", icon: <Pill className="size-3.5 text-[#15803D]" />, iconBg: "#DCFCE7", activity: "Manual prescription created", credits: -1, date: "May 26, 2026 · 9:30 AM" },
  ];

  const filteredRows = historyRows
    .filter(r => historyFilter === "All Tools" || r.tool === historyFilter);

  const planCredits = activePlan?.creditsPerMonth ?? 3000;

  const totalOrgCredits = planCredits;
  const totalCreditsUsed = Math.round(planCredits * 0.667);
  const ehrCreditsUsed = Math.round(totalCreditsUsed * 0.65);
  const otherPlatformCreditsUsed = totalCreditsUsed - ehrCreditsUsed;
  const orgCreditsRemaining = totalOrgCredits - totalCreditsUsed;

  const percentTotalUsed = ((totalCreditsUsed / totalOrgCredits) * 100).toFixed(1);
  const percentEHRofUsed = ((ehrCreditsUsed / totalCreditsUsed) * 100).toFixed(1);

  const transcriberUsed = Math.round(ehrCreditsUsed * 0.60);
  const sessionNotesUsed = Math.round(ehrCreditsUsed * 0.27);
  const prescriptionUsed = Math.round(ehrCreditsUsed * 0.13);

  const freeCreditsTotal = planCredits;
  const freeCreditsUsed = historyRows.filter(r => r.platform === "EHR").reduce((sum, r) => sum + Math.abs(r.credits), 0);
  const freeCreditsRemaining = freeCreditsTotal - freeCreditsUsed;
  const freePercent = ((freeCreditsUsed / freeCreditsTotal) * 100).toFixed(0);

  const purchasedCredits = 500;
  const purchasedUsed = historyRows.filter(r => r.platform === "CRM").reduce((sum, r) => sum + Math.abs(r.credits), 0);
  const purchasedRemaining = purchasedCredits - purchasedUsed;

  return (
    <div className="space-y-6 px-3 md:px-0">
      {/* 2-Card KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 — Plan Credits */}
        <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-3">
          <div className="text-[11px] text-[#6B7280] uppercase tracking-wide">PLAN CREDITS</div>
          <div>
            <div className="text-[32px] font-bold text-[#111827] dark:text-white leading-none">{freeCreditsRemaining.toLocaleString()}</div>
            <div className="text-[12px] text-[#9CA3AF] mt-0.5">remaining</div>
          </div>
          <div className="w-full rounded-full" style={{ background: "#E5E7EB", height: "8px" }}>
            <div className="rounded-full h-full" style={{ background: "#14B8A6", width: `${freePercent}%` }}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#9CA3AF]">{freeCreditsUsed.toLocaleString()} of {freeCreditsTotal.toLocaleString()} used</span>
            <span className="text-[11px] text-[#9CA3AF]">Resets Jul 1, 2026</span>
          </div>
        </div>

        {/* Card 2 — Purchased Credits */}
        <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-3">
          <div className="text-[11px] text-[#6B7280] uppercase tracking-wide">PURCHASED CREDITS</div>
          <div>
            <div className="text-[32px] font-bold text-[#111827] dark:text-white leading-none">{purchasedRemaining.toLocaleString()}</div>
            <div className="text-[12px] text-[#9CA3AF] mt-0.5">remaining</div>
          </div>
          <div className="w-full rounded-full" style={{ background: "#E5E7EB", height: "8px" }}>
            <div className="rounded-full h-full" style={{ background: "#6366F1", width: `${((purchasedUsed / purchasedCredits) * 100).toFixed(0)}%` }}></div>
          </div>
          <div className="text-[11px] text-[#9CA3AF]">{purchasedUsed.toLocaleString()} of {purchasedCredits.toLocaleString()} used</div>
        </div>

      </div>

      {/* Credit Usage Breakdown */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <button
          onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="text-left">
            <h2 className="text-base font-semibold text-[#111827] dark:text-white">Credit usage breakdown</h2>
            <p className="text-[12px] text-[#6B7280] mt-0.5">Each tool draws from the org wallet. Set a % cap to prevent any one tool from consuming the full balance.</p>
          </div>
          {isBreakdownExpanded ? (
            <ChevronUp className="size-5 text-[#6B7280] flex-shrink-0 ml-4" />
          ) : (
            <ChevronDown className="size-5 text-[#6B7280] flex-shrink-0 ml-4" />
          )}
        </button>

        {isBreakdownExpanded && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AI Transcriber */}
            <div className="border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "#CCFBF1" }}>
                    <Zap className="size-4 text-[#14B8A6]" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#111827] dark:text-white">AI Transcriber</span>
                </div>
                <div className="group relative">
                  <button className="size-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200">
                    <Info className="size-3 text-[#6B7280]" />
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-60 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                    AI Transcriber uses 1 credit per 100 words transcribed.
                  </div>
                </div>
              </div>
              {/* Primary metric */}
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold text-[#111827] dark:text-white">{transcriberUsed.toLocaleString()}</span>
                <span className="text-[13px] text-[#6B7280]">credits</span>
              </div>

              {/* Contribution bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#6B7280]">of EHR usage</span>
                  <span className="text-[12px] font-bold text-[#14B8A6]">{Math.round((transcriberUsed / ehrCreditsUsed) * 100)}%</span>
                </div>
                <div className="w-full rounded-full" style={{ background: "#E5E7EB", height: "6px" }}>
                  <div className="rounded-full h-full" style={{ background: "#14B8A6", width: `${(transcriberUsed / ehrCreditsUsed) * 100}%` }}></div>
                </div>
              </div>

            </div>

            {/* Session Notes */}
            <div className="border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "#DBEAFE" }}>
                    <FileText className="size-4 text-[#1E40AF]" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#111827] dark:text-white">Session Notes</span>
                </div>
                <div className="group relative">
                  <button className="size-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200">
                    <Info className="size-3 text-[#6B7280]" />
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-60 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                    Session Notes credit usage varies based on AI assistance level.
                  </div>
                </div>
              </div>
              {/* Primary metric */}
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold text-[#111827] dark:text-white">{sessionNotesUsed.toLocaleString()}</span>
                <span className="text-[13px] text-[#6B7280]">credits</span>
              </div>

              {/* Contribution bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#6B7280]">of EHR usage</span>
                  <span className="text-[12px] font-bold text-[#1E40AF]">{Math.round((sessionNotesUsed / ehrCreditsUsed) * 100)}%</span>
                </div>
                <div className="w-full rounded-full" style={{ background: "#E5E7EB", height: "6px" }}>
                  <div className="rounded-full h-full" style={{ background: "#1E40AF", width: `${(sessionNotesUsed / ehrCreditsUsed) * 100}%` }}></div>
                </div>
              </div>

            </div>

            {/* Prescription */}
            <div className="border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "#DCFCE7" }}>
                    <Pill className="size-4 text-[#15803D]" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#111827] dark:text-white">Prescription</span>
                </div>
                <div className="group relative">
                  <button className="size-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200">
                    <Info className="size-3 text-[#6B7280]" />
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-60 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                    Prescription credit usage varies based on AI assistance level.
                  </div>
                </div>
              </div>
              {/* Primary metric */}
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold text-[#111827] dark:text-white">{prescriptionUsed.toLocaleString()}</span>
                <span className="text-[13px] text-[#6B7280]">credits</span>
              </div>

              {/* Contribution bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#6B7280]">of EHR usage</span>
                  <span className="text-[12px] font-bold text-[#15803D]">{Math.round((prescriptionUsed / ehrCreditsUsed) * 100)}%</span>
                </div>
                <div className="w-full rounded-full" style={{ background: "#E5E7EB", height: "6px" }}>
                  <div className="rounded-full h-full" style={{ background: "#15803D", width: `${(prescriptionUsed / ehrCreditsUsed) * 100}%` }}></div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Credit History Table */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#111827] dark:text-white">Credit Usage History</h2>
          <div className="flex items-center gap-2">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-3 py-1.5 border border-[#D1D5DB] rounded-lg text-[13px] text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            >
              {["This Month", "Last Month", "Last 3 Months", "Last 6 Months", "This Year"].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
              className="px-3 py-1.5 border border-[#D1D5DB] rounded-lg text-[13px] text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            >
              {["All Tools", "AI Transcriber", "AI Reminder", "Session Notes", "Prescription"].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable table container */}
        <div className="overflow-x-auto overflow-y-auto border border-[#E5E7EB] dark:border-gray-700 rounded-t-xl" style={{ maxHeight: "320px" }}>
          <table className="w-full" style={{ minWidth: "700px" }}>
            <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10">
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left text-[12px] font-semibold text-[#6B7280] pb-2 pr-4 pl-4 pt-2">Tool</th>
                <th className="text-left text-[12px] font-semibold text-[#6B7280] pb-2 pr-4 pt-2">Activity</th>
                <th className="text-right text-[12px] font-semibold text-[#6B7280] pb-2 pr-4 pt-2">Credits</th>
                <th className="text-right text-[12px] font-semibold text-[#6B7280] pb-2 pr-4 pt-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] last:border-0" style={{ background: i % 2 === 1 ? "#F9FAFB" : "white", height: "44px" }}>
                  <td className="pr-4 pl-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: row.iconBg }}>
                        {row.icon}
                      </div>
                      <span className="text-[13px] text-[#111827] whitespace-nowrap">{row.tool}</span>
                    </div>
                  </td>
                  <td className="pr-4 text-[13px] text-[#111827]">{row.activity}</td>
                  <td className="pr-4 text-right text-[13px] font-medium" style={{ color: "#DC2626" }}>−{Math.abs(row.credits)}</td>
                  <td className="pr-4 text-right text-[13px] text-[#6B7280] whitespace-nowrap">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border border-t-0 border-[#E5E7EB] dark:border-gray-700 rounded-b-xl bg-[#F9FAFB] dark:bg-gray-750">
          <span className="text-[13px] font-semibold text-[#111827] dark:text-white">Total Credits Used</span>
          <span className="text-[13px] font-bold" style={{ color: "#DC2626" }}>
            −{filteredRows.reduce((sum, r) => sum + Math.abs(r.credits), 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Buy More Credits */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl p-5">
        <button
          onClick={() => setIsBuyCreditsExpanded(!isBuyCreditsExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-4" style={{ color: "#14B8A6" }} />
            <h2 className="text-base font-semibold text-[#111827] dark:text-white">Buy More Credits</h2>
          </div>
          {isBuyCreditsExpanded ? (
            <ChevronUp className="size-5 text-[#6B7280]" />
          ) : (
            <ChevronDown className="size-5 text-[#6B7280]" />
          )}
        </button>

        {isBuyCreditsExpanded && (
          <div className="mt-5 space-y-5">
            {/* Preset pill buttons */}
            <div>
              <p className="text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-3">
                Select credits to add per month
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setCreditQty(p.value)}
                    className={`w-full py-2 rounded-lg text-[13px] font-semibold border-2 transition-all ${
                      creditQty === p.value
                        ? "border-[#14B8A6] bg-[#CCFBF1] text-[#0F766E]"
                        : "border-[#E5E7EB] text-[#6B7280] hover:border-[#14B8A6] hover:text-[#0F766E]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom input */}
            <div className="flex items-center gap-3">
              <label className="text-[13px] text-[#6B7280] whitespace-nowrap">Custom amount:</label>
              <div className="flex items-center border border-[#D1D5DB] rounded-lg overflow-hidden">
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={creditQty}
                  onChange={(e) => setCreditQty(Math.max(1000, Number(e.target.value)))}
                  className="w-32 px-3 py-2 text-[13px] text-[#111827] dark:text-white bg-white dark:bg-gray-700 focus:outline-none"
                />
                <span className="px-3 py-2 bg-[#F9FAFB] text-[#6B7280] text-[13px] border-l border-[#D1D5DB]">
                  credits
                </span>
              </div>
            </div>

            {/* Price summary card */}
            <div className="bg-[#F9FAFB] dark:bg-gray-750 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[12px] text-[#6B7280] mb-1">Monthly add-on</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] font-bold text-[#111827] dark:text-white">${monthlyPrice}</span>
                  <span className="text-[13px] text-[#6B7280]">/ month</span>
                </div>
                <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                  {creditQty.toLocaleString()} credits · billed monthly · cancel anytime
                </div>
              </div>
              <button
                onClick={() => {}}
                className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0d9488] text-white text-[14px] font-bold rounded-xl transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Buy Now
              </button>
            </div>

            {/* Fine print */}
            <p className="text-[11px] text-[#9CA3AF]">
              Credits are added to your org wallet immediately after purchase and never expire. Charged to your default payment method on file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


