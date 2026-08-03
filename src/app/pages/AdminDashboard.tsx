import { useNavigate, Link } from "react-router";
import { useState } from "react";
import {
  Building2,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Crown,
  UserCheck,
  Calendar,
  Star,
  FileText,
  MessageSquare,
  ClipboardCheck,
  Receipt,
  Filter,
  Ban,
  TrendingUp,
  Wallet,
  HandCoins,
  Percent,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { PageContainer } from "../components/PageContainer";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { mockProviders, mockClients } from "../data/mockPartnerData";
import {
  PLAN_TIER_LIMITS,
  PLAN_TIER_EXTRA_COST,
  PLAN_TIER_PRICING,
  WRITE_OFF_REASON_LABELS,
} from "../types/partnerDashboard";
import type { PracticeMember, MockClient } from "../types/partnerDashboard";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function computeAggregateBilling(
  establishmentMembers: PracticeMember[],
  providers: typeof mockProviders,
  clients: MockClient[],
  clientTreatingProviders: Record<string, string>,
) {
  const activeMembers = establishmentMembers.filter((m) => m.memberStatus === "active");
  const perMember = activeMembers.map((member) => {
    const provider = providers.find((p) => p.id === member.providerId);
    const baseEarned = provider ? Math.floor(Math.random() * 10000) + 8000 : 0;
    const mantraClients = provider
      ? clients.filter((c) => clientTreatingProviders[c.id] === provider.id)
      : [];
    const mantraCount = mantraClients.length;
    const mantraEarned = provider?.planMode === "provider" ? Math.floor(mantraCount * 320 * 0.7) : 0;
    return {
      providerId: member.providerId,
      earned: baseEarned,
      received: Math.floor(baseEarned * (0.7 + Math.random() * 0.2)),
      due: Math.floor(baseEarned * (0.1 + Math.random() * 0.2)),
      mantraEarned,
    };
  });
  const totalEarned = perMember.reduce((sum, m) => sum + m.earned, 0);
  const totalReceived = perMember.reduce((sum, m) => sum + m.received, 0);
  const totalDue = perMember.reduce((sum, m) => sum + m.due, 0);
  const totalMantra = perMember.reduce((sum, m) => sum + m.mantraEarned, 0);
  return { totalEarned, totalReceived, totalDue, totalMantra, perMember };
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const {
    establishments,
    practiceMembers,
    providers,
    setEstablishments,
    careTeamMemberships,
    currentPracticeId,
    currentEstablishmentId,
    isCurrentUserAdmin,
    getCurrentEstablishment,
    getCurrentPractice,
    practices,
    clients,
    clientTreatingProviders,
    bills,
  } = usePartnerDashboard();
  const { claims } = useClaims();

  const [rcmProviderFilter, setRcmProviderFilter] = useState("all");
  const establishment = getCurrentEstablishment();
  // A provider can hold membership records across multiple practices of the same
  // establishment (see mockPartnerData: prov-5 is a member of practice-1 AND
  // practice-2). Dedupe by providerId so each person renders as exactly one
  // member row / one aggregate-billing row, instead of duplicated provider rows.
  const establishmentMembers = practiceMembers
    .filter(
      (m) => m.establishmentId === currentEstablishmentId && m.memberStatus !== "offboarded"
    )
    .filter((m, i, arr) => arr.findIndex((x) => x.providerId === m.providerId) === i);

  if (!establishment) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <Building2 className="size-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Establishment Selected
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Select an establishment from the settings to view the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!isCurrentUserAdmin) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <Shield className="size-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Admin Access Required
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You need admin privileges to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  const planLimit = PLAN_TIER_LIMITS[establishment.planTier];
  const planUsagePercent = planLimit !== null
    ? Math.round((establishmentMembers.length / planLimit) * 100)
    : 0;
  const activeCount = establishmentMembers.filter((m) => m.memberStatus === "active").length;
  const invitedCount = establishmentMembers.filter((m) => m.memberStatus === "invited").length;
  const verificationPendingCount = establishmentMembers.filter(
    (m) => m.memberStatus === "verification-pending"
  ).length;
  const adminCount = establishmentMembers.filter((m) => m.role === "Admin" || m.role === "Admin").length;
  const supervisorCount = establishmentMembers.filter(
    (m) => m.role === "Supervisor"
  ).length;
  const clinicianCount = establishmentMembers.filter(
    (m) => m.role === "Clinician"
  ).length;

  const verificationPendingMembers = establishmentMembers
    .filter((m) => m.memberStatus === "verification-pending")
    .map((m) => ({
      ...m,
      provider: providers.find((p) => p.id === m.providerId),
    }));

  const currentPractice = getCurrentPractice() || practices.find((p) => p.id === currentPracticeId) || practices[0];

  // Action Center mock data
  const mockPendingAppointments = activeCount * 3;
  const mockPendingClientRequests = activeCount * 2;
  const mockPendingSessionRequests = activeCount * 1;
  const totalActionItems = mockPendingAppointments + mockPendingClientRequests + mockPendingSessionRequests;

  // Listing Health computation
  const listingChecks = [
    { label: "Establishment name", passed: !!establishment.name },
    { label: "About description", passed: !!establishment.about },
    { label: "Specialties listed", passed: (currentPractice?.specialties?.length ?? 0) > 0 },
    { label: "Insurance panels", passed: (currentPractice?.insurance?.length ?? 0) > 0 },
    { label: "Photos uploaded", passed: (currentPractice?.photos?.length ?? 0) > 0 || !!currentPractice?.coverPhoto },
    { label: "Visiting hours set", passed: currentPractice?.visitingHours ? Object.values(currentPractice.visitingHours).some((h) => h.isOpen) : false },
    { label: "Address complete", passed: !!(currentPractice?.streetAddress && currentPractice?.city && currentPractice?.state) },
  ];
  const listingHealthScore = Math.round(
    (listingChecks.filter((c) => c.passed).length / listingChecks.length) * 100
  );
  const listingIsStale = Date.now() - new Date(establishment.lastConfirmedAt).getTime() > 70 * 86400000;
  const reconfirmListing = () => {
    const now = new Date().toISOString();
    setEstablishments((prev) => prev.map((e) => e.id === establishment.id ? { ...e, lastConfirmedAt: now } : e));
    toast.success("Listing reconfirmed");
  };

  // Combined Availability — use practice visiting hours as the merged view
  const combinedAvailability = daysOfWeek.map((day) => ({
    day,
    ...(currentPractice?.visitingHours?.[day] || { isOpen: false, from: "09:00", to: "17:00" }),
  }));

  // Computed aggregate billing from live member/provider data
  const aggregateBilling = computeAggregateBilling(establishmentMembers, providers, clients, clientTreatingProviders);

  // ── STAGE 9: RCM REVENUE & WRITE-OFF ANALYTICS ────────────────────────────────
  const filteredRcmBills = rcmProviderFilter === "all"
    ? bills
    : bills.filter((b) => b.providerId === rcmProviderFilter);

  // Bug 4 — real RCM KPIs computed from claims/bills, filtered by provider.
  const filteredRcmClaims = rcmProviderFilter === "all"
    ? claims
    : claims.filter((c) => c.providerId === rcmProviderFilter);

  const rcmTotalBilled = filteredRcmBills.reduce((acc, b) => acc + b.amount, 0);
  const rcmTotalCollected = filteredRcmBills
    .filter((b) => b.status === "paid_direct" || b.status === "paid_via_claim")
    .reduce((acc, b) => acc + b.amount, 0);
  const rcmTotalWrittenOff = filteredRcmBills
    .filter((b) => b.status === "written_off")
    .reduce((acc, b) => acc + b.amount, 0);
  const rcmTotalOutstanding = filteredRcmBills
    .filter((b) => b.status === "unresolved" || b.status === "claim_pending")
    .reduce((acc, b) => acc + b.amount, 0);

  // Net Collection Rate — the stakeholder's "how healthy is our RCM" headline.
  // Denominator = gross billed minus contractual adjustments (billed vs allowed
  // shortfall recorded by simulatePayerAdjudication on each claim's payment).
  const rcmContractualAdjustments = filteredRcmClaims.reduce((acc, c) => {
    if (c.payment && c.payment.billedAmount > 0) {
      return acc + Math.max(0, c.payment.billedAmount - c.payment.allowedAmount);
    }
    return acc;
  }, 0);
  const rcmNetCollectionRate = (() => {
    const denominator = rcmTotalBilled - rcmContractualAdjustments;
    if (denominator <= 0) return 0;
    return Math.round((rcmTotalCollected / denominator) * 1000) / 10;
  })();

  // Bug 4 — real RCM KPIs computed from claims/bills, filtered by provider.
  const submittedClaims = filteredRcmClaims.filter((c) => c.submittedDate != null);

  const rcmCleanClaimRate = (() => {
    if (submittedClaims.length === 0) return 0;
    const clean = submittedClaims.filter(
      (c) =>
        ["paid", "in_adjudication", "approved"].includes(c.status) &&
        !c.statusHistory.some((e) => ["stedi_rejected", "payer_rejected", "rejected"].includes(e.status))
    );
    return Math.round((clean.length / submittedClaims.length) * 1000) / 10;
  })();

  const rcmFirstPassRate = (() => {
    if (submittedClaims.length === 0) return 0;
    const accepted = submittedClaims.filter(
      (c) =>
        ["paid", "in_adjudication", "approved", "denied", "adjusted"].includes(c.status) &&
        !c.statusHistory.some((e) => e.status === "draft" && /resubmission/i.test(e.note || ""))
    );
    return Math.round((accepted.length / submittedClaims.length) * 1000) / 10;
  })();

  const rcmAvgDaysInAr = (() => {
    const resolved = filteredRcmBills.filter((b) => b.resolvedAt && b.dateOfService);
    if (resolved.length === 0) return 0;
    const totalDays = resolved.reduce((sum, b) => {
      const res = new Date(b.resolvedAt!).getTime();
      const dos = new Date(b.dateOfService).getTime();
      return sum + Math.max(0, Math.round((res - dos) / 86400000));
    }, 0);
    return Math.round((totalDays / resolved.length) * 10) / 10;
  })();

  const rcmDenialRate = (() => {
    if (submittedClaims.length === 0) return 0;
    const denied = submittedClaims.filter((c) =>
      c.statusHistory.some((e) => e.status === "denied" || e.status === "payer_rejected" || e.status === "stedi_rejected")
    );
    return Math.round((denied.length / submittedClaims.length) * 1000) / 10;
  })();

  const rcmWriteOffsByReason = Object.keys(WRITE_OFF_REASON_LABELS).map((reasonCode) => {
    const matchingBills = filteredRcmBills.filter(
      (b) => b.status === "written_off" && (b.writeOffReason || "bad_debt") === reasonCode
    );
    const amount = matchingBills.reduce((acc, b) => acc + b.amount, 0);
    const count = matchingBills.length;
    return {
      reasonCode,
      label: WRITE_OFF_REASON_LABELS[reasonCode as keyof typeof WRITE_OFF_REASON_LABELS],
      amount,
      count,
    };
  });

  // Payer performance cut — denial rate / days to payment / volume by payer, computed from the same claims data.
  const payerPerformance = (() => {
    const byPayer = new Map<string, { total: number; denied: number; paid: number; daysToPay: number[] }>();
    for (const claim of filteredRcmClaims) {
      const name = claim.payerName || "Self-Pay";
      const entry = byPayer.get(name) || { total: 0, denied: 0, paid: 0, daysToPay: [] };
      entry.total++;
      if (["denied", "rejected", "stedi_rejected", "payer_rejected"].includes(claim.status)) {
        entry.denied++;
      }
      if (claim.payment && claim.payment.paidAmount > 0) {
        entry.paid++;
        if (claim.submittedDate && claim.payment.remittanceDate) {
          const days = Math.max(
            1,
            Math.round(
              (new Date(claim.payment.remittanceDate).getTime() - new Date(claim.submittedDate).getTime()) / 86400000
            )
          );
          entry.daysToPay.push(days);
        }
      }
      byPayer.set(name, entry);
    }
    return Array.from(byPayer.entries())
      .map(([name, e]) => ({
        name,
        volume: e.total,
        denialRate: e.total ? Math.round((e.denied / e.total) * 100) : 0,
        avgDaysToPay: e.daysToPay.length
          ? Math.round(e.daysToPay.reduce((a, b) => a + b, 0) / e.daysToPay.length)
          : 0,
      }))
      .sort((a, b) => b.volume - a.volume);
  })();


  const statCards = [
    {
      label: "Total Members",
      value: establishmentMembers.length,
      reference: planLimit !== null ? planLimit : undefined,
      sub: planLimit !== null ? `of ${planLimit} limit` : "Unlimited plan",
      icon: Users,
      color: "from-[#043570] to-[#0a5ca8]",
      shadow: "shadow-blue-900/20",
      barColor: "bg-[#00c0ff]",
    },
    {
      label: "Active",
      value: activeCount,
      reference: establishmentMembers.length || undefined,
      sub: "verified members",
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
      shadow: "shadow-green-500/20",
      barColor: "bg-green-500",
    },
    {
      label: "Pending Verification",
      value: verificationPendingCount,
      reference: establishmentMembers.length || undefined,
      sub: "awaiting approval",
      icon: AlertTriangle,
      color: "from-amber-500 to-amber-600",
      shadow: "shadow-amber-500/20",
      barColor: "bg-amber-500",
    },
    {
      label: "Pending Invite",
      value: invitedCount,
      reference: establishmentMembers.length || undefined,
      sub: "not yet joined",
      icon: Clock,
      color: "from-gray-500 to-gray-600",
      shadow: "shadow-gray-500/20",
      barColor: "bg-gray-500",
    },
  ];

  return (
    <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-start gap-4 mb-2">
            <div className="size-12 bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Building2 className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {establishment.name}
              </h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Crown className="size-4 text-[#00c0ff]" />
                {establishment.planTier} Plan
                <span className="text-gray-400">·</span>
                {establishment.city}, {establishment.state}
              </p>
            </div>
            <Link
              to="/settings/team-management"
              className="bg-[#4169E1] hover:bg-[#3557c7] text-white px-4 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 text-sm"
            >
              <Users className="size-4" />
              Manage Team
            </Link>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm mb-6 md:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">
            {statCards.map((card, i) => {
              const maxValue = Math.max(
                card.value,
                card.reference ?? 1
              );
              const barPercent = maxValue > 0 ? Math.round((card.value / maxValue) * 100) : 0;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-3 py-2.5"
                >
                  <div
                    className={`size-8 shrink-0 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center shadow ${card.shadow}`}
                  >
                    <card.icon className="size-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                        {card.label}
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {card.value}
                        {card.reference !== undefined && (
                          <span className="text-[11px] font-normal text-gray-400 dark:text-gray-500">
                            {" "}/ {card.reference}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="mt-1.5 w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${card.barColor}`}
                        style={{ width: `${Math.min(barPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm"
          >
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Team Overview
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {establishment.planTier} plan — {establishmentMembers.length}
                <span className="text-gray-400 dark:text-gray-500">
                  {planLimit !== null ? ` / ${planLimit}` : ""} members
                </span>
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {planUsagePercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all ${
                  planUsagePercent >= 90
                    ? "bg-red-500"
                    : planUsagePercent >= 70
                      ? "bg-amber-500"
                      : "bg-[#00c0ff]"
                }`}
                style={{ width: `${Math.min(planUsagePercent, 100)}%` }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <Shield className="size-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Admin</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{adminCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="size-3 text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Supervisor</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{supervisorCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="size-3 text-green-600 dark:text-green-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Clinician</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{clinicianCount}</span>
              </div>
            </div>
            {planLimit !== null && planLimit - establishmentMembers.length <= 2 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                <AlertTriangle className="size-3" />
                {planLimit - establishmentMembers.length > 0
                  ? `${planLimit - establishmentMembers.length} spots left`
                  : "Plan full — upgrade to add more"}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <HandCoins className="size-4 text-teal-600 dark:text-teal-400" />
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Earnings Snapshot
              </h3>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Total Earned</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  ${aggregateBilling.totalEarned.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Received</span>
                <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                  ${aggregateBilling.totalReceived.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Outstanding</span>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  ${aggregateBilling.totalDue.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Collection Rate</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {aggregateBilling.totalEarned > 0
                      ? Math.round((aggregateBilling.totalReceived / aggregateBilling.totalEarned) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full rounded-full bg-teal-500"
                    style={{ width: `${aggregateBilling.totalEarned > 0 ? Math.min(Math.round((aggregateBilling.totalReceived / aggregateBilling.totalEarned) * 100), 100) : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm"
          >
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Client Activity
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Total Clients</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {mockClients.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Active Sessions (MTD)</span>
                <span className="text-sm font-semibold text-[#00c0ff]">
                  {Math.floor(mockClients.length * 3.2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Providers per Client (avg)</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {mockClients.length > 0
                    ? (careTeamMemberships.length / mockClients.length).toFixed(1)
                    : "—"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Center Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm mb-6 md:mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="size-5 text-[#00c0ff]" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Action Center
              </h3>
              <span className="px-2 py-0.5 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-xs font-medium">
                {totalActionItems} pending
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="size-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Pending Appointments</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{mockPendingAppointments}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Across all providers</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="size-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Client Requests</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">{mockPendingClientRequests}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Awaiting response</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="size-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-800 dark:text-amber-300">Session Requests</span>
              </div>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-200">{mockPendingSessionRequests}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Need scheduling</p>
            </div>
          </div>
        </motion.div>

        {/* Aggregate Billing + Listing Health Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Aggregate Billing Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="size-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Provider Compensation
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4" style={aggregateBilling.totalMantra > 0 ? { gridTemplateColumns: "1fr 1fr 1fr 1fr" } : {}}>
              <div className="text-center p-3 bg-teal-50 dark:bg-teal-900/10 rounded-xl">
                <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mb-1">Earned</p>
                <p className="text-lg font-bold text-teal-800 dark:text-teal-300">${aggregateBilling.totalEarned.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Received</p>
                <p className="text-lg font-bold text-blue-800 dark:text-blue-300">${aggregateBilling.totalReceived.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">Due</p>
                <p className="text-lg font-bold text-amber-800 dark:text-amber-300">${aggregateBilling.totalDue.toLocaleString()}</p>
              </div>
              {aggregateBilling.totalMantra > 0 && (
                <div className="text-center p-3 bg-[#043570]/10 dark:bg-[#043570]/20 rounded-xl">
                  <p className="text-xs text-[#043570] dark:text-[#00c0ff] font-medium mb-1">Mantra</p>
                  <p className="text-lg font-bold text-[#043570] dark:text-[#00c0ff]">${aggregateBilling.totalMantra.toLocaleString()}</p>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {(() => {
                  const hasMantra = aggregateBilling.perMember.some(r => r.mantraEarned > 0);
                  return (
                    <>
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Provider</th>
                          <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Earned</th>
                          <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hidden sm:table-cell">Received</th>
                          <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Due</th>
                          {hasMantra && <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Mantra</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
                        {aggregateBilling.perMember.map((row) => {
                          const p = providers.find((pp) => pp.id === row.providerId);
                          return (
                            <tr key={row.providerId}>
                              <td className="py-2 text-gray-900 dark:text-white font-medium">{p?.name || row.providerId}</td>
                              <td className="py-2 text-right text-teal-600 dark:text-teal-400">${row.earned.toLocaleString()}</td>
                              <td className="py-2 text-right text-blue-600 dark:text-blue-400 hidden sm:table-cell">${row.received.toLocaleString()}</td>
                              <td className="py-2 text-right text-amber-600 dark:text-amber-400">${row.due.toLocaleString()}</td>
                              {hasMantra && <td className="py-2 text-right text-[#043570] dark:text-[#00c0ff]">${row.mantraEarned.toLocaleString()}</td>}
                            </tr>
                          );
                        })}
                      </tbody>
                    </>
                  );
                })()}
              </table>
            </div>
          </motion.div>

          {/* Listing Health Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.37 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="size-5 text-[#00c0ff]" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Listing Health
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                listingHealthScore >= 80
                  ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  : listingHealthScore >= 50
                    ? "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                    : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
              }`}>
                {listingHealthScore}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all ${
                  listingHealthScore >= 80 ? "bg-green-500" : listingHealthScore >= 50 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${listingHealthScore}%` }}
              />
            </div>
            <div className="space-y-2">
              {listingChecks.map((check) => (
                <div key={check.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{check.label}</span>
                  {check.passed ? (
                    <CheckCircle2 className="size-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="size-4 text-amber-500" />
                  )}
                </div>
              ))}
            </div>
            {listingHealthScore < 100 && (
              <button
                onClick={() => navigate("/settings/practice-details")}
                className="mt-4 w-full text-center text-sm text-[#00c0ff] hover:text-[#0099cc] font-medium"
              >
                Complete your listing →
              </button>
            )}
            <div className={`mt-4 rounded-lg p-3 text-sm ${listingIsStale ? "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" : "bg-gray-50 text-gray-600 dark:bg-gray-750 dark:text-gray-400"}`}>
              <div className="flex items-center justify-between gap-3">
                <span>{listingIsStale ? "Reconfirm your listing" : `Last confirmed ${new Date(establishment.lastConfirmedAt).toLocaleDateString()}`}</span>
                <button onClick={reconfirmListing} className="font-semibold text-[#00a8e6] hover:underline">Reconfirm</button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Combined Availability Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="size-5 text-[#00c0ff]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Combined Availability
            </h3>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">(Read-only · merged team schedule)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {combinedAvailability.map((slot) => (
              <div
                key={slot.day}
                className={`p-3 rounded-xl border text-center ${
                  slot.isOpen
                    ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-700"
                }`}
              >
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {slot.day.slice(0, 3)}
                </p>
                {slot.isOpen ? (
                  <>
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      {slot.from}
                    </p>
                    <p className="text-[10px] text-green-600 dark:text-green-500">to {slot.to}</p>
                  </>
                ) : (
                  <p className="text-xs text-gray-400 dark:text-gray-500">Closed</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {verificationPendingMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm mb-6 md:mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Verification Queue
                </h3>
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
                  {verificationPendingMembers.length}
                </span>
              </div>
              <Link
                to="/settings/team-management"
                className="text-sm text-[#00c0ff] hover:text-[#0099cc] font-medium flex items-center gap-1"
              >
                View All <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {verificationPendingMembers.map((member) => (
                <div
                  key={member.providerId}
                  className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {member.provider?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2) || "?"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {member.provider?.name || member.providerId}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member.provider?.email} · {typeof member.role === "string" ? member.role : "Custom"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-600 dark:text-amber-400 hidden sm:inline">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── RCM REVENUE & PERFORMANCE ANALYTICS (Stage 9, merged) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="size-10 bg-[#043570] dark:bg-[#0a5ca8] rounded-xl flex items-center justify-center text-white">
                <Receipt className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  RCM Revenue &amp; Performance Analytics
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Collections, claim acceptance, denial rates, aging AR, and write-off reason codes YTD.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600">
                <Filter className="size-3.5 text-gray-500" />
                <select
                  value={rcmProviderFilter}
                  onChange={(e) => setRcmProviderFilter(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-gray-700 dark:text-gray-200 focus:outline-none"
                >
                  <option value="all">All Clinicians</option>
                  {providers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to="/billing/bills"
                className="px-4 py-1.5 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl transition-colors shadow-xs"
              >
                Open Bills Hub
              </Link>
            </div>
          </div>

          {/* Net Collection Rate — headline hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.3 }}
            className="bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-2xl p-6 md:p-7 text-white relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 size-48 bg-[#00c0ff]/20 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#00c0ff] mb-2">
                  Net Collection Rate
                </p>
                <p className="text-4xl md:text-5xl font-black leading-none tracking-tight">
                  {rcmNetCollectionRate}%
                </p>
                <p className="text-xs text-blue-100/80 mt-2 max-w-md">
                  Collected after contractual adjustments, of adjusted gross billed — the first answer
                  a stakeholder wants from the RCM.
                </p>
              </div>
              <div className="text-right text-xs text-blue-100/90 space-y-1">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-blue-200/70">Collected</span>
                  <span className="font-bold text-white">${rcmTotalCollected.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-blue-200/70">Contractual adj.</span>
                  <span className="font-bold text-white">${rcmContractualAdjustments.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-blue-200/70">Adjusted gross billed</span>
                  <span className="font-bold text-white">${(rcmTotalBilled - rcmContractualAdjustments).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dollar cards — Gross Billed / Net Collected / Written Off / Active A/R */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                Gross Billed (YTD)
              </p>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                ${rcmTotalBilled.toFixed(2)}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">Total claims &amp; self-pay</p>
            </div>

            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
              <p className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                Net Collected
              </p>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
                ${rcmTotalCollected.toFixed(2)}
              </p>
              <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                Direct + Claim remit payouts
              </p>
            </div>

            <div className="p-4 bg-red-50/70 dark:bg-red-950/20 rounded-2xl border border-red-200/80 dark:border-red-900/50 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 uppercase">
                Tax Event
              </div>
              <p className="text-xs font-bold uppercase text-red-700 dark:text-red-400 flex items-center gap-1">
                <Ban className="size-3.5" />
                <span>Total Written Off</span>
              </p>
              <p className="text-2xl font-black text-red-700 dark:text-red-300 mt-1">
                ${rcmTotalWrittenOff.toFixed(2)}
              </p>
              <p className="text-[10px] text-red-600/80 dark:text-red-400/80 mt-0.5">
                Distinct business reporting
              </p>
            </div>

            <div className="p-4 bg-amber-50/70 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/40">
              <p className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                Active A/R Outstanding
              </p>
              <p className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">
                ${rcmTotalOutstanding.toFixed(2)}
              </p>
              <p className="text-[10px] text-amber-600/80 dark:text-amber-400/80 mt-0.5">
                Unresolved &amp; pending claims
              </p>
            </div>
          </motion.div>

          {/* Percentage cards — Clean-Claim / First-Pass / AR-Days / Denial */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="p-4 bg-gray-50/70 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Clean-Claim Rate
              </p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {rcmCleanClaimRate}%
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                {submittedClaims.length} submitted claims
              </p>
            </div>

            <div className="p-4 bg-gray-50/70 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                First-Pass Acceptance
              </p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {rcmFirstPassRate}%
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                Accepted on first submission
              </p>
            </div>

            <div className="p-4 bg-gray-50/70 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Avg Days in A/R
              </p>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {rcmAvgDaysInAr} d
              </p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                {rcmAvgDaysInAr > 0 && rcmAvgDaysInAr < 30 ? "Healthy (<30 days)" : rcmAvgDaysInAr >= 30 ? "Attention (≥30 days)" : "No resolved bills"}
              </p>
            </div>

            <div className="p-4 bg-gray-50/70 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Denial Rate
              </p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {rcmDenialRate}%
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                Denied in status history
              </p>
            </div>
          </motion.div>

          {/* Payer Performance */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.3 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Payer Performance</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Denial rate, days to payment, and volume by payer</p>
              </div>
            </div>
            {payerPerformance.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center bg-white dark:bg-gray-800">
                No claims submitted yet — payer performance will appear here.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 font-bold uppercase text-gray-500 dark:text-gray-400">
                      <th className="py-2.5 px-4">Payer</th>
                      <th className="py-2.5 px-4 text-right">Claims</th>
                      <th className="py-2.5 px-4 text-right">Denial Rate</th>
                      <th className="py-2.5 px-4 text-right">Avg Days to Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                    {payerPerformance.map((p) => (
                      <tr key={p.name} className="hover:bg-gray-50/50 dark:hover:bg-gray-750/30">
                        <td className="py-2.5 px-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          {p.name}
                        </td>
                        <td className="py-2.5 px-4 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">
                          {p.volume}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold whitespace-nowrap">
                          <span className={`${p.denialRate >= 25 ? "text-red-600 dark:text-red-400" : p.denialRate > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                            {p.denialRate}%
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                          {p.avgDaysToPay ? `${p.avgDaysToPay}d` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Write-off Reason Code Breakdown (single table) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.3 }}
            className="space-y-3 pt-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>Write-Offs &amp; Adjustments Breakdown YTD</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-full">
                  By Reason Code
                </span>
              </h4>
              <span className="text-xs text-gray-500">
                Total Written Off: ${rcmTotalWrittenOff.toFixed(2)}
              </span>
            </div>

            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 font-bold uppercase text-gray-500 dark:text-gray-400">
                    <th className="py-2.5 px-4">Reason Code</th>
                    <th className="py-2.5 px-4">Bills Count</th>
                    <th className="py-2.5 px-4">Amount YTD</th>
                    <th className="py-2.5 px-4 text-right">% of Write-Offs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                  {rcmWriteOffsByReason.map((row) => {
                    const percent = rcmTotalWrittenOff > 0
                      ? ((row.amount / rcmTotalWrittenOff) * 100).toFixed(1)
                      : "0.0";
                    return (
                      <tr key={row.reasonCode} className="hover:bg-gray-50/50 dark:hover:bg-gray-750/30">
                        <td className="py-2.5 px-4 font-semibold text-gray-900 dark:text-white">
                          {row.label}
                        </td>
                        <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">
                          {row.count} bill(s)
                        </td>
                        <td className="py-2.5 px-4 font-mono font-bold text-gray-900 dark:text-white">
                          ${row.amount.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-gray-600 dark:text-gray-300">
                          {percent}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

    </PageContainer>
  );
}
