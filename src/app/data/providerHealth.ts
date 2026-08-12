import type { ProviderHealthMetrics } from "../types/providerHealth";

/**
 * Mock raw metrics for the current logged-in provider.
 *
 * Values are deliberately weak so the low-score drill-down is meaningful:
 * the composition below computes to a ~55 / "Needs Improvement" health score,
 * driven by poor retention, engagement and business activity.
 */
export const mockProviderHealthMetrics: ProviderHealthMetrics = {
  averageRating: 3.9,
  reviewCount: 8,
  retentionRate: 61,
  sessionCompletionRate: 78,
  outcomeImprovement: null,
  trainingCompletion: 45,
  taskCompletion: 38,
  profileCompletion: 90,
  platformActivityScore: 30,
  rewardPoints: 120,
  sessionsCompleted: 14,
  activeClients: 7,
  renewalRate: 0,
  crossSellReferrals: 1,
  revenue: 1850,
  lastActiveScore: 20,
  activeDaysLast7: 2,
};

/** Previous month health score used to derive the monthly trend. */
export const mockPreviousMonthHealth = 62;