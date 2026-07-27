import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import type { MockClient } from "../types/partnerDashboard";
import type { Claim } from "../types/claims";

export function usePracticeScopedClients(): MockClient[] {
  const { clients, currentPracticeId } = usePartnerDashboard();
  return clients.filter((c) => c.practiceId === currentPracticeId);
}

export function usePracticeScopedClaims(): Claim[] {
  const { claims } = useClaims();
  const { currentPracticeId } = usePartnerDashboard();
  return claims.filter((c) => c.practiceId === currentPracticeId);
}
