import { mockPreviousMonthHealth } from "../data/providerHealth";
import type {
  HealthBand,
  MetricDef,
  MetricGroup,
  MetricStatus,
  ProviderHealthMetrics,
  ProviderHealthResult,
  RankInfo,
  SubScore,
} from "../types/providerHealth";

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

function round(value: number) {
  return Math.round(value);
}

function getStatus(score: number, goodAt: number, warnAt: number): MetricStatus {
  if (score >= goodAt) return "good";
  if (score >= warnAt) return "warning";
  return "critical";
}

const mono = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

interface MetricInput {
  key: string;
  label: string;
  group: MetricGroup;
  score: number;
  threshold: string;
  displayValue: string;
  why: string;
  actionLabel: string;
  actionTarget: string;
  goodAt?: number;
  warnAt?: number;
}

function buildMetricDef(
  input: MetricInput,
  groupWeight: number,
  metricCount: number,
): MetricDef {
  const score = round(clamp(input.score));
  const goodAt = input.goodAt ?? 75;
  const warnAt = input.warnAt ?? 50;
  const weight = groupWeight / metricCount;
  // Impact = how much this metric drags the score down, weighted by its contribution.
  const impact = round((1 - score / 100) * weight * 100);
  return {
    key: input.key,
    label: input.label,
    group: input.group,
    score,
    status: getStatus(score, goodAt, warnAt),
    threshold: input.threshold,
    displayValue: input.displayValue,
    why: input.why,
    actionLabel: input.actionLabel,
    actionTarget: input.actionTarget,
    weight,
    impact,
  };
}

const WEIGHTS: Record<MetricGroup, number> = {
  quality: 0.5,
  engagement: 0.2,
  business: 0.3,
};

export function resolveBand(health: number): {
  band: HealthBand;
  bandLabel: string;
  bandDescription: string;
} {
  if (health >= 80) {
    return {
      band: "green",
      bandLabel: "Top Performer",
      bandDescription: "Excellent standing. You qualify for premium visibility and premium pricing.",
    };
  }
  if (health >= 60) {
    return {
      band: "yellow",
      bandLabel: "Healthy",
      bandDescription: "Solid performance. Keep monitoring and improve the weaker metrics below.",
    };
  }
  if (health >= 40) {
    return {
      band: "red",
      bandLabel: "Needs Improvement",
      bandDescription: "Below expectation. Focus on the metrics flagged below to raise your score.",
    };
  }
  return {
    band: "critical",
    bandLabel: "Critical",
    bandDescription: "At risk. A performance improvement plan is recommended until your score recovers.",
  };
}

function getRankInfo(health: number): RankInfo {
  if (health >= 80) return { rank: "#8", top: "Top 2%" };
  if (health >= 70) return { rank: "#24", top: "Top 6%" };
  if (health >= 60) return { rank: "#56", top: "Top 15%" };
  if (health >= 40) return { rank: "#182", top: "Top 47%" };
  return { rank: "#420", top: "Bottom 12%" };
}

export function computeProviderHealth(metrics: ProviderHealthMetrics): ProviderHealthResult {
  const reviewScore = (metrics.averageRating / 5) * 100 * 0.6 + clamp(metrics.reviewCount / 15) * 100 * 0.4;

  // Quality metrics — outcome improvement is "future"; excluded until tracked.
  const qualityMetrics: MetricDef[] = [];
  qualityMetrics.push(
    buildMetricDef({
      key: "reviews",
      label: "Client Reviews",
      group: "quality",
      score: reviewScore,
      threshold: "≥ 4.0 / 5 · ≥ 15 reviews",
      displayValue: `${metrics.averageRating.toFixed(1)} / 5 (${metrics.reviewCount} reviews)`,
      why: "Most providers have zero reviews, which hurts trust. Ratings below 4/5 drag down your quality score.",
      actionLabel: "Request reviews",
      actionTarget: "/tasks",
      goodAt: 75,
      warnAt: 60,
    }, WEIGHTS.quality, 3),
    buildMetricDef({
      key: "retention",
      label: "Client Retention",
      group: "quality",
      score: metrics.retentionRate,
      threshold: "≥ 90%",
      displayValue: `${metrics.retentionRate}%`,
      why: "Retention below 90% means you are losing more than 1 in 10 clients — the strongest signal of a performance problem.",
      actionLabel: "See coaching tips",
      actionTarget: "/tasks",
      goodAt: 90,
      warnAt: 70,
    }, WEIGHTS.quality, 3),
    buildMetricDef({
      key: "sessionCompletion",
      label: "Session Completion",
      group: "quality",
      score: metrics.sessionCompletionRate,
      threshold: "≥ 90%",
      displayValue: `${metrics.sessionCompletionRate}%`,
      why: "Below 75% means high no-shows. Provider cancellations count against you; client cancellations do not.",
      actionLabel: "Review calendar",
      actionTarget: "/settings/availability",
      goodAt: 90,
      warnAt: 75,
    }, WEIGHTS.quality, 3),
  );

  if (metrics.outcomeImprovement !== null) {
    qualityMetrics.push(
      buildMetricDef({
        key: "outcome",
        label: "Outcome Improvement",
        group: "quality",
        score: metrics.outcomeImprovement,
        threshold: "Improvement after 6 sessions",
        displayValue: `${metrics.outcomeImprovement}/100`,
        why: "No measurable improvement after 6 sessions flags a possible clinical effectiveness issue.",
        actionLabel: "Review clients",
        actionTarget: "/clients",
        goodAt: 75,
        warnAt: 50,
      }, WEIGHTS.quality, 4),
    );
  }

  const engagementMetrics: MetricDef[] = [
    buildMetricDef({
      key: "training",
      label: "Training Completion",
      group: "engagement",
      score: metrics.trainingCompletion,
      threshold: "≥ 80%",
      displayValue: `${metrics.trainingCompletion}%`,
      why: "Incomplete mandatory trainings lower your engagement and your eligibility for referrals.",
      actionLabel: "Finish training",
      actionTarget: "/tasks",
      goodAt: 80,
      warnAt: 60,
    }, WEIGHTS.engagement, 5),
    buildMetricDef({
      key: "tasks",
      label: "Task Completion",
      group: "engagement",
      score: metrics.taskCompletion,
      threshold: "≥ 80%",
      displayValue: `${metrics.taskCompletion}%`,
      why: "Assignments and assessments left pending signal low platform engagement.",
      actionLabel: "Complete tasks",
      actionTarget: "/tasks",
      goodAt: 80,
      warnAt: 60,
    }, WEIGHTS.engagement, 5),
    buildMetricDef({
      key: "profile",
      label: "Profile Completion",
      group: "engagement",
      score: metrics.profileCompletion,
      threshold: "≥ 80%",
      displayValue: `${metrics.profileCompletion}%`,
      why: "An incomplete profile (photo, bio, qualifications, documents) reduces client confidence.",
      actionLabel: "Complete profile",
      actionTarget: "/edit-profile",
      goodAt: 80,
      warnAt: 60,
    }, WEIGHTS.engagement, 5),
    buildMetricDef({
      key: "platformActivity",
      label: "Platform Activity",
      group: "engagement",
      score: metrics.platformActivityScore,
      threshold: "≥ 50 / 100",
      displayValue: `${metrics.platformActivityScore}/100`,
      why: "Meaningful actions (sessions, replies, notes, availability updates) in the last 30 days. Logging in alone does not count.",
      actionLabel: "Be more active",
      actionTarget: "/",
      goodAt: 50,
      warnAt: 30,
    }, WEIGHTS.engagement, 5),
    buildMetricDef({
      key: "points",
      label: "Reward Points",
      group: "engagement",
      score: clamp(metrics.rewardPoints / 250) * 100,
      threshold: "≥ 250 points",
      displayValue: `${metrics.rewardPoints} pts`,
      why: "Reward points measure ongoing activity and loyalty — a low balance suggests long gaps between sessions.",
      actionLabel: "Earn points",
      actionTarget: "/tasks",
      goodAt: 80,
      warnAt: 40,
    }, WEIGHTS.engagement, 5),
  ];

  const businessMetrics: MetricDef[] = [
    buildMetricDef({
      key: "sessions",
      label: "Sessions Completed",
      group: "business",
      score: clamp(metrics.sessionsCompleted / 20) * 100,
      threshold: "≥ 20 / month",
      displayValue: `${metrics.sessionsCompleted} this month`,
      why: "Low session volume means low revenue contribution and less practice momentum.",
      actionLabel: "Update availability",
      actionTarget: "/settings/availability",
      goodAt: 80,
      warnAt: 40,
    }, WEIGHTS.business, 6),
    buildMetricDef({
      key: "lastActive",
      label: "Last Activity",
      group: "business",
      score: metrics.lastActiveScore,
      threshold: "Active within 7 days",
      displayValue: formatLastActive(metrics.activeDaysLast7, metrics.lastActiveScore),
      why: "Providers active consistently in the last 7 days score highest. Inactivity signals disengagement.",
      actionLabel: "Open dashboard",
      actionTarget: "/",
      goodAt: 60,
      warnAt: 30,
    }, WEIGHTS.business, 6),
    buildMetricDef({
      key: "activeClients",
      label: "Active Clients",
      group: "business",
      score: clamp(metrics.activeClients / 15) * 100,
      threshold: "≥ 15 active",
      displayValue: `${metrics.activeClients} clients`,
      why: "A small active caseload means a lightly utilized practice and fewer referrals.",
      actionLabel: "Improve visibility",
      actionTarget: "/grow",
      goodAt: 80,
      warnAt: 45,
    }, WEIGHTS.business, 6),
    buildMetricDef({
      key: "renewals",
      label: "Renewals",
      group: "business",
      score: metrics.renewalRate,
      threshold: "≥ 50% renewal",
      displayValue: `${metrics.renewalRate}% renewal`,
      why: "Clients who renew packages after expiry are the cheapest, highest-value growth.",
      actionLabel: "See retention tips",
      actionTarget: "/tasks",
      goodAt: 50,
      warnAt: 20,
    }, WEIGHTS.business, 6),
    buildMetricDef({
      key: "crossSell",
      label: "Cross-sell Referrals",
      group: "business",
      score: clamp(metrics.crossSellReferrals / 4) * 100,
      threshold: "≥ 4 conversions",
      displayValue: `${metrics.crossSellReferrals} conversions`,
      why: "Recommending other Mantra services (psychiatry, meditation, wellness) grows total account value.",
      actionLabel: "Explore services",
      actionTarget: "/grow",
      goodAt: 75,
      warnAt: 40,
    }, WEIGHTS.business, 6),
    buildMetricDef({
      key: "revenue",
      label: "Revenue Generated",
      group: "business",
      score: clamp(metrics.revenue / 4000) * 100,
      threshold: "≥ $4,000 / month",
      displayValue: mono(metrics.revenue),
      why: "Billed revenue is the ultimate measure of business impact. Refunds are excluded.",
      actionLabel: "View earnings",
      actionTarget: "/earnings",
      goodAt: 75,
      warnAt: 40,
    }, WEIGHTS.business, 6),
  ];

  const subScores: SubScore[] = [
    {
      key: "quality",
      label: "Quality",
      weight: WEIGHTS.quality,
      weightLabel: "50% weight",
      score: round(average(qualityMetrics.map((m) => m.score))),
      metrics: qualityMetrics,
    },
    {
      key: "engagement",
      label: "Engagement",
      weight: WEIGHTS.engagement,
      weightLabel: "20% weight",
      score: round(average(engagementMetrics.map((m) => m.score))),
      metrics: engagementMetrics,
    },
    {
      key: "business",
      label: "Business",
      weight: WEIGHTS.business,
      weightLabel: "30% weight",
      score: round(average(businessMetrics.map((m) => m.score))),
      metrics: businessMetrics,
    },
  ];

  const [quality, engagement, business] = subScores.map((s) => s.score);
  const health = round(quality * WEIGHTS.quality + engagement * WEIGHTS.engagement + business * WEIGHTS.business);
  const band = resolveBand(health);

  const allMetrics = [...qualityMetrics, ...engagementMetrics, ...businessMetrics];
  const flagged = allMetrics
    .filter((m) => m.status !== "good")
    .sort((a, b) => b.impact - a.impact);

  return {
    health,
    quality,
    engagement,
    business,
    band: band.band,
    bandLabel: band.bandLabel,
    bandDescription: band.bandDescription,
    trend: health - mockPreviousMonthHealth,
    lastCalculated: "Aug 12, 2026 · 2:00 AM",
    subScores,
    flagged,
    allMetrics,
    rank: getRankInfo(health),
    premiumQualified: health >= 80,
  };
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function formatLastActive(activeDaysLast7: number, lastActiveScore: number) {
  if (lastActiveScore >= 90) return "Active today";
  if (lastActiveScore >= 75) return `Active ${activeDaysLast7} / 7 days`;
  if (lastActiveScore >= 60) return `Active ${activeDaysLast7} / 7 days`;
  if (lastActiveScore >= 40) return "Last active 14 days ago";
  if (lastActiveScore >= 20) return "Last active 30 days ago";
  return "No activity for 30+ days";
}

/** Whether a health band unlocks premium qualification. */
export function isPremiumQualified(health: number) {
  return health >= 80;
}

export function getBandColor(band: HealthBand): string {
  switch (band) {
    case "green":
      return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
    case "yellow":
      return "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    case "red":
      return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800";
    case "critical":
      return "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800";
  }
}

export function getBandSolidColor(band: HealthBand): string {
  switch (band) {
    case "green":
      return "#10b981";
    case "yellow":
      return "#f59e0b";
    case "red":
      return "#ef4444";
    case "critical":
      return "#e11d48";
  }
}

export function getStatusChipClass(status: MetricStatus): string {
  switch (status) {
    case "good":
      return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
    case "warning":
      return "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    case "critical":
      return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800";
  }
}