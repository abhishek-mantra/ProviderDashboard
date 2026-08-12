export type HealthBand = "green" | "yellow" | "red" | "critical";

export type MetricStatus = "good" | "warning" | "critical";

export type MetricGroup = "quality" | "engagement" | "business";

/** Raw provider metrics — the inputs to the health score calculation. */
export interface ProviderHealthMetrics {
  averageRating: number;
  reviewCount: number;
  retentionRate: number;
  sessionCompletionRate: number;
  outcomeImprovement: number | null;
  trainingCompletion: number;
  taskCompletion: number;
  profileCompletion: number;
  platformActivityScore: number;
  rewardPoints: number;
  sessionsCompleted: number;
  activeClients: number;
  renewalRate: number;
  crossSellReferrals: number;
  revenue: number;
  lastActiveScore: number;
  activeDaysLast7: number;
}

/** A single normalized metric with its threshold, status and guidance. */
export interface MetricDef {
  key: string;
  label: string;
  group: MetricGroup;
  score: number;
  status: MetricStatus;
  threshold: string;
  displayValue: string;
  why: string;
  actionLabel: string;
  actionTarget: string;
  weight: number;
  impact: number;
}

export interface SubScore {
  key: MetricGroup;
  label: string;
  weight: number;
  weightLabel: string;
  score: number;
  metrics: MetricDef[];
}

export interface RankInfo {
  rank: string;
  top: string;
}

export interface ProviderHealthResult {
  health: number;
  quality: number;
  engagement: number;
  business: number;
  band: HealthBand;
  bandLabel: string;
  bandDescription: string;
  trend: number;
  lastCalculated: string;
  subScores: SubScore[];
  flagged: MetricDef[];
  allMetrics: MetricDef[];
  rank: RankInfo;
  premiumQualified: boolean;
}
