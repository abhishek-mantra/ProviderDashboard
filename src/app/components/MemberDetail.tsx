import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  UserCircle2,
  Mail,
  Briefcase,
  Shield,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
  ArrowRightLeft,
  Calendar,
  Clock,
  Building2,
  ExternalLink,
  Award,
  SlidersHorizontal,
  Check
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockProviders, mockClients } from "../data/mockPartnerData";
import type { PracticeMember, PermissionSet } from "../types/partnerDashboard";
import { ROLE_PERMISSION_DEFAULTS } from "../types/partnerDashboard";

interface MemberDetailProps {
  member: PracticeMember;
  practiceId: string;
  onClose: () => void;
}

const PERMISSION_LABELS: Record<keyof PermissionSet, string> = {
  viewOwnClients: "View own clients",
  viewAllPracticeClients: "View all practice clients",
  viewClinicalNotes: "View clinical notes",
  manageTeam: "Manage team",
  manageBilling: "Manage billing",
  viewFinancialReports: "View financial reports",
  manageClientRecords: "Manage client records",
  manageAvailabilitySchedule: "Manage availability / schedule",
  manageEstablishmentSettings: "Manage establishment settings",
};

export function MemberDetail({ member, practiceId, onClose }: MemberDetailProps) {
  const navigate = useNavigate();
  const {
    establishments,
    practices,
    currentEstablishmentId,
    practiceMembers,
    providers,
    careTeamMemberships,
    updatePracticeMember,
    offboardPracticeMember,
    removeCareTeamMembership,
    addCareTeamMembership,
    isCurrentUserAdmin,
    customRoles,
    superAdmins,
  } = usePartnerDashboard();

  const [activeTab, setActiveTab] = useState<"overview" | "calendar" | "clients" | "permissions">("overview");
  const [showOffboardConfirm, setShowOffboardConfirm] = useState(false);
  const [showReassignConfirm, setShowReassignConfirm] = useState(false);
  const [reassignSelections, setReassignSelections] = useState<Record<string, string>>({});
  const [showSupervisorAssign, setShowSupervisorAssign] = useState(false);

  const provider = providers.find((p) => p.id === member.providerId);
  const establishment = establishments.find((e) => e.id === currentEstablishmentId);

  // Get all practice memberships for this provider across the establishment
  const memberPractices = useMemo(
    () => practiceMembers.filter((m) => m.providerId === member.providerId && m.memberStatus !== "offboarded"),
    [practiceMembers, member.providerId]
  );

  const careTeamClientIds = useMemo(
    () =>
      careTeamMemberships
        .filter((ctm) => ctm.providerId === member.providerId)
        .map((ctm) => ctm.clientId),
    [careTeamMemberships, member.providerId]
  );

  const careTeamClients = useMemo(
    () => careTeamClientIds.map((cid) => mockClients.find((c) => c.id === cid)).filter(Boolean),
    [careTeamClientIds]
  );

  const otherActiveMembers =
    practiceMembers.filter(
      (m) =>
        m.practiceId === practiceId &&
        m.establishmentId === currentEstablishmentId &&
        m.providerId !== member.providerId &&
        m.memberStatus === "active"
    ) || [];

  const isSuperAdmin = superAdmins.some((sa) => sa.providerId === member.providerId);

  if (!provider || !establishment) return null;

  const currentPracticeObj = practices.find((p) => p.id === practiceId);

  const statusConfig: Record<
    PracticeMember["memberStatus"],
    { label: string; color: string; bg: string }
  > = {
    invited: { label: "Invited", color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-700" },
    "verification-pending": {
      label: "Verification Pending",
      color: "text-amber-700 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    active: {
      label: "Active",
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    offboarded: { label: "Offboarded", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
  };

  const status = statusConfig[member.memberStatus];
  const roleLabel = typeof member.role === "string" ? member.role : member.role.customRoleId;
  const isAdmin = typeof member.role === "string" && member.role === "Admin";
  const isSupervisor = typeof member.role === "string" && member.role === "Supervisor";

  // Compute permissions for this member
  const permissions: PermissionSet = (() => {
    if (typeof member.role === "string" && member.role in ROLE_PERMISSION_DEFAULTS) {
      return ROLE_PERMISSION_DEFAULTS[member.role as keyof typeof ROLE_PERMISSION_DEFAULTS];
    }
    if (typeof member.role === "object" && member.role.customRoleId) {
      const cr = customRoles.find((r) => r.id === (member.role as any).customRoleId);
      if (cr) return cr.permissions;
    }
    return ROLE_PERMISSION_DEFAULTS.Clinician;
  })();

  const handleApproveVerification = () => {
    updatePracticeMember(member.providerId, practiceId, { memberStatus: "active" });
  };

  const handleOffboardClick = () => {
    if (careTeamClientIds.length > 0) {
      setShowOffboardConfirm(false);
      setShowReassignConfirm(true);
    } else {
      offboardPracticeMember(member.providerId, practiceId);
      setShowOffboardConfirm(false);
      onClose();
    }
  };

  const handleReassignAndOffboard = () => {
    careTeamClientIds.forEach((clientId) => {
      const targetProviderId = reassignSelections[clientId];
      if (targetProviderId) {
        removeCareTeamMembership(clientId, member.providerId);
        addCareTeamMembership({
          clientId,
          providerId: targetProviderId,
          addedBy: member.providerId,
          addedAt: new Date().toISOString(),
        });
      } else {
        removeCareTeamMembership(clientId, member.providerId);
      }
    });
    offboardPracticeMember(member.providerId, practiceId);
    setShowReassignConfirm(false);
    onClose();
  };

  const handleToggleSupervisee = (clinicianId: string) => {
    const currentSupervises = member.role === "Supervisor" ? member.supervises : [];
    const newSupervises = currentSupervises.includes(clinicianId)
      ? currentSupervises.filter((id) => id !== clinicianId)
      : [...currentSupervises, clinicianId];
    updatePracticeMember(member.providerId, practiceId, { supervises: newSupervises });
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Team Management</span>
        </button>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="size-20 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-900/20 flex-shrink-0">
              {provider.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {provider.name}
                </h1>
                {isSuperAdmin && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    <Award className="size-3" />
                    Super-Admin
                  </span>
                )}
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <Shield className="size-3" />
                    Admin
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{provider.profession}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap text-xs">
                <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold ${status.bg} ${status.color}`}>
                  {status.label}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                  {roleLabel}
                </span>
                {member.isSupervisorRole && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                    Supervisor Stacked
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {member.memberStatus === "verification-pending" && isCurrentUserAdmin && (
              <button
                onClick={handleApproveVerification}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors shadow-md"
              >
                Approve Verification
              </button>
            )}
            {isCurrentUserAdmin && member.memberStatus !== "offboarded" && (
              <button
                onClick={() => setShowOffboardConfirm(true)}
                className="px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-medium transition-colors"
              >
                Offboard Member
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-[#043570] text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Overview & Practices
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "calendar"
                ? "bg-[#043570] text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Calendar & Schedule
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "clients"
                ? "bg-[#043570] text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Assigned Clients ({careTeamClients.length})
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "permissions"
                ? "bg-[#043570] text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Role & Permissions
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Practice Memberships */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <UserCircle2 className="size-5 text-[#00c0ff]" />
              Personal & Contact Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
                <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2 mt-0.5">
                  <Mail className="size-4 text-gray-400" />
                  {provider.email}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Profession / Specialty</span>
                <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2 mt-0.5">
                  <Briefcase className="size-4 text-gray-400" />
                  {provider.profession}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <span className="text-xs text-gray-500">Invited Date</span>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(member.invitedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Joined Date</span>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Memberships Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="size-5 text-[#00c0ff]" />
              Practice Memberships ({memberPractices.length})
            </h3>
            <p className="text-xs text-gray-500">
              Practices where this team member has active or invited memberships:
            </p>
            <div className="space-y-3">
              {memberPractices.map((mp) => {
                const practiceObj = practices.find((p) => p.id === mp.practiceId);
                const roleName = typeof mp.role === "string" ? mp.role : mp.role.customRoleId;
                return (
                  <div
                    key={mp.practiceId}
                    className="p-3.5 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">
                        {practiceObj?.name || mp.practiceId}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Role: <span className="font-semibold text-purple-600 dark:text-purple-400">{roleName}</span></p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      {mp.memberStatus}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Calendar & Schedule */}
      {activeTab === "calendar" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="size-5 text-[#00c0ff]" />
              Availability & Practice Schedule
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              Location: {currentPracticeObj?.name || practiceId}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Weekly Hours</p>
              <div className="space-y-2 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                {daysOfWeek.map((day) => {
                  const hours = currentPracticeObj?.visitingHours?.[day];
                  return (
                    <div key={day} className="flex items-center justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{day}</span>
                      {hours?.isOpen ? (
                        <span className="text-xs font-mono text-gray-900 dark:text-white">{hours.from} – {hours.to}</span>
                      ) : (
                        <span className="text-xs font-medium text-gray-400">Closed</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Clock className="size-4" />
                  SESSION FORMAT OFFERINGS
                </p>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  {currentPracticeObj?.sessionFormat === "both" ? "Online & In-Person Sessions" : currentPracticeObj?.sessionFormat || "Both"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Practice Address</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {currentPracticeObj?.streetAddress || "100 Healthcare Plaza, Suite 400"}
                </p>
                <p className="text-xs text-gray-500">
                  {currentPracticeObj?.city}, {currentPracticeObj?.state} {currentPracticeObj?.pinCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Assigned Clients */}
      {activeTab === "clients" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="size-5 text-[#00c0ff]" />
              Assigned Clients ({careTeamClients.length})
            </h3>
          </div>

          {careTeamClients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careTeamClients.map((client) => (
                <div
                  key={client!.id}
                  onClick={() => navigate(`/clients/${client!.id}`)}
                  className="p-4 bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {client!.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white hover:underline">{client!.name}</p>
                      <p className="text-xs text-gray-500">{client!.email}</p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Region: {client!.insuranceRegion || "US"}</p>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-gray-400 hover:text-gray-600" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500">No clients currently assigned to this team member.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Role & Permissions */}
      {activeTab === "permissions" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="size-5 text-[#00c0ff]" />
              Composable Role & Permissions Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(PERMISSION_LABELS) as (keyof PermissionSet)[]).map((key) => {
                const granted = permissions[key];
                return (
                  <div
                    key={key}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                      granted
                        ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300"
                        : "bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-700 text-gray-400"
                    }`}
                  >
                    <div className={`size-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      granted ? "bg-emerald-600 text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      {granted ? <Check className="size-3" /> : "✕"}
                    </div>
                    <span className="text-xs font-semibold">{PERMISSION_LABELS[key]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {isSupervisor && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Supervisees ({member.supervises.length})
                </h3>
                <button
                  onClick={() => setShowSupervisorAssign(!showSupervisorAssign)}
                  className="text-xs font-bold text-[#00c0ff] hover:underline"
                >
                  {showSupervisorAssign ? "Done" : "Edit Supervisees"}
                </button>
              </div>

              {showSupervisorAssign ? (
                <div className="space-y-2">
                  {otherActiveMembers.map((m) => {
                    const clinician = providers.find((p) => p.id === m.providerId);
                    const isSupervised = member.supervises.includes(m.providerId);
                    return (
                      <label
                        key={m.providerId}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer border border-gray-200 dark:border-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={isSupervised}
                          onChange={() => handleToggleSupervisee(m.providerId)}
                          className="size-4 text-[#00c0ff] rounded focus:ring-[#00c0ff]"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {clinician?.name || m.providerId}
                        </span>
                        <span className="text-xs text-gray-500">{clinician?.profession}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {member.supervises.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No supervisees assigned</p>
                  ) : (
                    member.supervises.map((supId) => {
                      const supProvider = providers.find((p) => p.id === supId);
                      return (
                        <span
                          key={supId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-xs font-bold"
                        >
                          <CheckCircle2 className="size-3.5" />
                          {supProvider?.name || supId}
                        </span>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Offboard modal */}
      {showOffboardConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowOffboardConfirm(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="size-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="size-7 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Offboard Member?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This will remove <strong>{provider.name}</strong> from the practice.
                {careTeamClientIds.length > 0 && (
                  <> Their <strong>{careTeamClientIds.length}</strong> client assignment(s) will need to be reassigned.</>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowOffboardConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOffboardClick}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              >
                {careTeamClientIds.length > 0 ? "Reassign & Offboard" : "Offboard"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reassign modal */}
      {showReassignConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowReassignConfirm(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <ArrowRightLeft className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Reassign Clients
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>{provider.name}</strong> has {careTeamClientIds.length} client assignment(s).
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {careTeamClients.map((client) => (
                <div
                  key={client!.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {client!.name}
                    </span>
                  </div>
                  <select
                    value={reassignSelections[client!.id] || ""}
                    onChange={(e) =>
                      setReassignSelections((prev) => ({
                        ...prev,
                        [client!.id]: e.target.value,
                      }))
                    }
                    className="w-full text-sm px-3 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
                  >
                    <option value="">Remove (no reassignment)</option>
                    {otherActiveMembers.map((m) => {
                      const mp = providers.find((p) => p.id === m.providerId);
                      return (
                        <option key={m.providerId} value={m.providerId}>
                          {mp?.name || m.providerId} — {mp?.profession}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReassignConfirm(false);
                  setReassignSelections({});
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReassignAndOffboard}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              >
                Confirm Offboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
