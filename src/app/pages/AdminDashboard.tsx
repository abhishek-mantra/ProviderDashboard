import { useNavigate } from "react-router";
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
  TrendingUp,
  UserCheck,
  UserX,
  Mail,
  Plus,
  Calendar,
  DollarSign,
  Image,
  Star,
  Stethoscope,
  FileText,
  MessageSquare,
  ClipboardCheck,
  X,
  UserCircle2,
  Briefcase,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { PageContainer } from "../components/PageContainer";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockProviders, mockClients } from "../data/mockPartnerData";
import {
  PLAN_TIER_LIMITS,
  PLAN_TIER_EXTRA_COST,
  PLAN_TIER_PRICING,
  getCredentialExpiryStatus,
} from "../types/partnerDashboard";
import type { EstablishmentMember, MockClient } from "../types/partnerDashboard";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function computeAggregateBilling(
  establishmentMembers: EstablishmentMember[],
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
    const mantraEarned = Math.floor(mantraCount * 320 * 0.7);
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
    members,
    providers,
    addMember,
    addProvider,
    setEstablishments,
    careTeamMemberships,
    currentEstablishmentId,
    isCurrentUserAdmin,
    getCurrentEstablishment,
    clients,
    clientTreatingProviders,
  } = usePartnerDashboard();

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [sendInvite, setSendInvite] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Clinician" as "Clinician" | "Supervisor",
    isAdmin: false,
  });

  const establishment = getCurrentEstablishment();
  const establishmentMembers = members.filter(
    (m) => m.establishmentId === currentEstablishmentId && m.memberStatus !== "offboarded"
  );

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
  const atPlanLimit = planLimit !== null && establishmentMembers.length >= planLimit;
  const planUsagePercent = planLimit !== null
    ? Math.round((establishmentMembers.length / planLimit) * 100)
    : 0;
  const activeCount = establishmentMembers.filter((m) => m.memberStatus === "active").length;
  const invitedCount = establishmentMembers.filter((m) => m.memberStatus === "invited").length;
  const verificationPendingCount = establishmentMembers.filter(
    (m) => m.memberStatus === "verification-pending"
  ).length;
  const adminCount = establishmentMembers.filter((m) => m.roles.isAdmin).length;
  const supervisorCount = establishmentMembers.filter(
    (m) => m.roles.clinical === "Supervisor"
  ).length;
  const clinicianCount = establishmentMembers.filter(
    (m) => m.roles.clinical === "Clinician"
  ).length;

  const verificationPendingMembers = establishmentMembers
    .filter((m) => m.memberStatus === "verification-pending")
    .map((m) => ({
      ...m,
      provider: providers.find((p) => p.id === m.providerId),
    }));

  // Action Center mock data
  const mockPendingAppointments = activeCount * 3;
  const mockPendingClientRequests = activeCount * 2;
  const mockPendingSessionRequests = activeCount * 1;
  const totalActionItems = mockPendingAppointments + mockPendingClientRequests + mockPendingSessionRequests;

  // Listing Health computation
  const listingChecks = [
    { label: "Establishment name", passed: !!establishment.name },
    { label: "About description", passed: !!establishment.about },
    { label: "Specialties listed", passed: establishment.specialties.length > 0 },
    { label: "Insurance panels", passed: establishment.insurance.length > 0 },
    { label: "Photos uploaded", passed: establishment.photos.length > 0 || !!establishment.coverPhoto },
    { label: "Visiting hours set", passed: Object.values(establishment.visitingHours).some((h) => h.isOpen) },
    { label: "Address complete", passed: !!(establishment.streetAddress && establishment.city && establishment.state) },
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

  // Combined Availability — use establishment visiting hours as the merged view
  const combinedAvailability = daysOfWeek.map((day) => ({
    day,
    ...establishment.visitingHours[day],
  }));

  // Computed aggregate billing from live member/provider data
  const aggregateBilling = computeAggregateBilling(establishmentMembers, providers, clients, clientTreatingProviders);

  const handleAddMember = () => {
    if (!currentEstablishmentId) return;
    const providerId = `prov-${Date.now()}`;
    addProvider({
      id: providerId,
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim() || "Invited provider",
      email: formData.email.trim(),
      profession: "Therapy",
      verificationStatus: "pending",
      planMode: "provider",
      credentialExpiresAt: new Date(Date.now() + 365 * 86400000).toISOString(),
    });
    const newMember: EstablishmentMember = {
      providerId,
      establishmentId: currentEstablishmentId,
      roles: {
        clinical: formData.role,
        isAdmin: formData.isAdmin,
      },
      memberStatus: sendInvite ? "invited" : "verification-pending",
      supervises: [],
      invitedAt: new Date().toISOString(),
      joinedAt: null,
    };
    addMember(newMember);
    setShowAddMemberModal(false);
    setSendInvite(true);
    setFormData({ firstName: "", lastName: "", email: "", role: "Clinician", isAdmin: false });
    toast.success(sendInvite ? "Team member invited" : "Team member added");
  };

  const openAddMember = () => {
    if (atPlanLimit) {
      setShowUpgradeModal(true);
      return;
    }
    setShowAddMemberModal(true);
  };

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
            <button
              onClick={openAddMember}
              className="bg-[#4169E1] hover:bg-[#3557c7] text-white px-4 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 text-sm"
            >
              <Plus className="size-4" />
              Add Team Member
            </button>
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
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Revenue Snapshot
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Total Earned</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  ${aggregateBilling.totalEarned.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Received</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
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
                    className="h-full rounded-full bg-green-500"
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
              <DollarSign className="size-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Aggregate Billing
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Earned</p>
                <p className="text-lg font-bold text-green-800 dark:text-green-300">${aggregateBilling.totalEarned.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Received</p>
                <p className="text-lg font-bold text-blue-800 dark:text-blue-300">${aggregateBilling.totalReceived.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">Due</p>
                <p className="text-lg font-bold text-amber-800 dark:text-amber-300">${aggregateBilling.totalDue.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-[#043570]/10 dark:bg-[#043570]/20 rounded-xl">
                <p className="text-xs text-[#043570] dark:text-[#00c0ff] font-medium mb-1">Mantra</p>
                <p className="text-lg font-bold text-[#043570] dark:text-[#00c0ff]">${aggregateBilling.totalMantra.toLocaleString()}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Provider</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Earned</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hidden sm:table-cell">Received</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Due</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Mantra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
                  {aggregateBilling.perMember.map((row) => {
                    const p = providers.find((pp) => pp.id === row.providerId);
                    return (
                      <tr key={row.providerId}>
                        <td className="py-2 text-gray-900 dark:text-white font-medium">{p?.name || row.providerId}</td>
                        <td className="py-2 text-right text-green-600 dark:text-green-400">${row.earned.toLocaleString()}</td>
                        <td className="py-2 text-right text-blue-600 dark:text-blue-400 hidden sm:table-cell">${row.received.toLocaleString()}</td>
                        <td className="py-2 text-right text-amber-600 dark:text-amber-400">${row.due.toLocaleString()}</td>
                        <td className="py-2 text-right text-[#043570] dark:text-[#00c0ff]">${row.mantraEarned.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
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
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="text-sm text-[#00c0ff] hover:text-[#0099cc] font-medium flex items-center gap-1"
              >
                View All <ChevronRight className="size-4" />
              </button>
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
                        {member.provider?.email} · {member.roles.clinical}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Team Members
            </h3>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="text-sm text-[#00c0ff] hover:text-[#0099cc] font-medium flex items-center gap-1"
            >
              Manage <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Member
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">
                    Specialty
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">
                    Rating
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">
                    Role
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
                {establishmentMembers.map((member) => {
                  const provider = providers.find((p) => p.id === member.providerId);
                  if (!provider) return null;
                  const statusColors: Record<string, string> = {
                    active: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
                    invited: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
                    "verification-pending":
                      "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
                  };
                  return (
                    <tr
                      key={member.providerId}
                      className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                            {provider.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {provider.name}
                              </p>
                              {member.roles.isAdmin && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                                  Admin
                                </span>
                              )}
                              {getCredentialExpiryStatus(provider.credentialExpiresAt) !== "valid" && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                                  Credentials {getCredentialExpiryStatus(provider.credentialExpiresAt)}
                                </span>
                              )}
                            </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                              {provider.email}
                            </p>
                            <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-0.5 sm:hidden">
                              <Star className="size-3" />
                              {provider.rating.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {provider.profession}
                        </span>
                      </td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Star className="size-3.5" />
                          {provider.rating.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {member.roles.clinical}
                        </span>
                      </td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            statusColors[member.memberStatus] || ""
                          }`}
                        >
                          {member.memberStatus.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-3 py-3 hidden lg:table-cell">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {member.joinedAt
                            ? new Date(member.joinedAt).toLocaleDateString()
                            : "Pending"}
                        </p>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() =>
                              setShowAddMemberModal(true)
                            }
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                            title="Manage Team"
                          >
                            <Users className="size-4 text-gray-400 group-hover:text-[#00c0ff]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </motion.div>

        <AnimatePresence>
          {showAddMemberModal && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddMemberModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                        Add Team Member
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send an invitation to a new team member
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddMemberModal(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <X className="size-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Enter first name"
                          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Enter last name"
                          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Clinical Role *
                      </label>
                      <div className="space-y-3">
                        <label
                          className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.role === "Clinician"
                              ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value="Clinician"
                            checked={formData.role === "Clinician"}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as "Clinician" })}
                            className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Briefcase className="size-4 text-blue-600 dark:text-blue-400" />
                              <p className="font-medium text-gray-900 dark:text-white">Clinician</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              For team members who treat clients
                            </p>
                          </div>
                        </label>
                        <label
                          className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.role === "Supervisor"
                              ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value="Supervisor"
                            checked={formData.role === "Supervisor"}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as "Supervisor" })}
                            className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <UserCircle2 className="size-4 text-purple-600 dark:text-purple-400" />
                              <p className="font-medium text-gray-900 dark:text-white">Supervisor</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              For team members who supervise clinicians
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isAdmin}
                          onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                          className="mt-0.5 size-4 text-[#4169E1] rounded focus:ring-[#4169E1]"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Grant Admin access (can manage team, billing, and settings)
                        </span>
                      </label>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sendInvite}
                          onChange={(e) => setSendInvite(e.target.checked)}
                          className="mt-0.5 size-4 text-[#4169E1] rounded focus:ring-[#4169E1]"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Send invitation email to this person
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 p-6 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowAddMemberModal(false)}
                    className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.role}
                    className="bg-[#4169E1] hover:bg-[#3557c7] text-white px-6 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="size-4" />
                    {sendInvite ? "Invite Member" : "Add Member"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showUpgradeModal && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowUpgradeModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  <div className="size-14 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="size-7 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Plan Limit Reached
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    You've reached the <strong>{establishment?.planTier}</strong> plan limit of{" "}
                    <strong>{planLimit}</strong> team members. Upgrade your plan to add more.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowUpgradeModal(false)}
                      className="flex-1 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowUpgradeModal(false);
                        navigate("/settings/billing");
                      }}
                      className="flex-1 bg-[#4169E1] hover:bg-[#3557c7] text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                    >
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </PageContainer>
  );
}
