import { useState } from "react";
import {
  Users,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  UserX,
  Star,
  Mail,
  Plus,
  X,
  UserCircle2,
  Briefcase,
  Send,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockProviders } from "../data/mockPartnerData";
import { PLAN_TIER_LIMITS, getCredentialExpiryStatus } from "../types/partnerDashboard";
import type { EstablishmentMember } from "../types/partnerDashboard";

function ManageSuperviseesForm({
  supervisorMember,
  activeClinicians,
  providers,
  onSave,
  onCancel,
}: {
  supervisorMember: EstablishmentMember | undefined;
  activeClinicians: EstablishmentMember[];
  providers: typeof mockProviders;
  onSave: (selectedIds: string[]) => void;
  onCancel: () => void;
}) {
  const [selected, setSelected] = useState<string[]>(() => supervisorMember?.supervises || []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
      {activeClinicians.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No active Clinicians in this establishment.
        </p>
      ) : (
        <div className="space-y-2">
          {activeClinicians.map((cm) => {
            const p = providers.find((pr) => pr.id === cm.providerId);
            if (!p) return null;
            const isChecked = selected.includes(cm.providerId);
            return (
              <label
                key={cm.providerId}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  isChecked
                    ? "border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/10"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(cm.providerId)}
                  className="size-4 accent-purple-600 rounded"
                />
                <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-xs shrink-0">
                  {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{p.profession}</p>
                </div>
              </label>
            );
          })}
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm text-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(selected)}
          className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Save ({selected.length} selected)
        </button>
      </div>
    </div>
  );
}

const statusColors: Record<string, string> = {
  active: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  invited: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
  "verification-pending": "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
};

export function TeamManagement() {
  const {
    members,
    providers,
    addMember,
    addProvider,
    currentEstablishmentId,
    isCurrentUserAdmin,
    getCurrentEstablishment,
    offboardMember,
    updateMember,
  } = usePartnerDashboard();

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [confirmOffboardId, setConfirmOffboardId] = useState<string | null>(null);
  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [manageSuperviseesFor, setManageSuperviseesFor] = useState<string | null>(null);
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
            Select an establishment from the settings to manage your team.
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
            You need admin privileges to manage the team.
          </p>
        </div>
      </div>
    );
  }

  const planLimit = PLAN_TIER_LIMITS[establishment.planTier];
  const atPlanLimit = planLimit !== null && establishmentMembers.length >= planLimit;
  const activeCount = establishmentMembers.filter((m) => m.memberStatus === "active").length;
  const invitedCount = establishmentMembers.filter((m) => m.memberStatus === "invited").length;
  const verificationPendingCount = establishmentMembers.filter(
    (m) => m.memberStatus === "verification-pending"
  ).length;

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
      rating: 5.0,
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

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="size-12 bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Users className="size-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Manage Team
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              {establishment.name} — {establishmentMembers.length} member{establishmentMembers.length !== 1 ? "s" : ""}
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

      {/* Stats bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm mb-6 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="size-8 shrink-0 bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-lg flex items-center justify-center shadow shadow-blue-900/20">
              <Users className="size-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Members</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {establishmentMembers.length}
                {planLimit !== null && <span className="text-[11px] font-normal text-gray-400"> / {planLimit}</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="size-8 shrink-0 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow shadow-green-500/20">
              <CheckCircle2 className="size-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Active</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{activeCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="size-8 shrink-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow shadow-amber-500/20">
              <AlertTriangle className="size-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Pending Verification</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{verificationPendingCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="size-8 shrink-0 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center shadow shadow-gray-500/20">
              <AlertTriangle className="size-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Pending Invite</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{invitedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Roster Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Team Members
          </h3>
          <button
            onClick={() => setShowTeamManageModal(true)}
            className="text-sm text-[#00c0ff] hover:text-[#0099cc] font-medium flex items-center gap-1"
          >
            Manage <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Member</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">Specialty</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">Rating</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">Role</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">Status</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden lg:table-cell">Joined</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
              {establishmentMembers.map((member) => {
                const provider = providers.find((p) => p.id === member.providerId);
                if (!provider) return null;
                return (
                  <tr key={member.providerId} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                          {provider.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{provider.name}</p>
                            {member.roles.isAdmin && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">Admin</span>
                            )}
                            {getCredentialExpiryStatus(provider.credentialExpiresAt) !== "valid" && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                                Credentials {getCredentialExpiryStatus(provider.credentialExpiresAt)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{provider.email}</p>
                          <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-0.5 sm:hidden">
                            <Star className="size-3" />
                            {(provider?.rating ?? 5.0).toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{provider.profession}</span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Star className="size-3.5" />
                        {(provider?.rating ?? 5.0).toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{member.roles.clinical}</span>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[member.memberStatus] || ""}`}>
                        {member.memberStatus.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : "Pending"}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setConfirmOffboardId(member.providerId)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                          title="Remove from team"
                        >
                          <UserX className="size-4 text-gray-400 group-hover:text-red-500" />
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

      {/* ── Modals ──────────────────────────────────────────────────────────── */}

      <AnimatePresence>
        {showAddMemberModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddMemberModal(false)}>
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
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Add Team Member</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Send an invitation to a new team member</p>
                  </div>
                  <button onClick={() => setShowAddMemberModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <X className="size-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
                    <div className="relative">
                      <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Enter first name"
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
                    <div className="relative">
                      <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Enter last name"
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Clinical Role *</label>
                    <div className="space-y-3">
                      <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.role === "Clinician" ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}`}>
                        <input type="radio" name="role" value="Clinician" checked={formData.role === "Clinician"}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value as "Clinician" })} className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="size-4 text-blue-600 dark:text-blue-400" />
                            <p className="font-medium text-gray-900 dark:text-white">Clinician</p>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For team members who treat clients</p>
                        </div>
                      </label>
                      <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.role === "Supervisor" ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}`}>
                        <input type="radio" name="role" value="Supervisor" checked={formData.role === "Supervisor"}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value as "Supervisor" })} className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <UserCircle2 className="size-4 text-purple-600 dark:text-purple-400" />
                            <p className="font-medium text-gray-900 dark:text-white">Supervisor</p>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For team members who supervise clinicians</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.isAdmin} onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                        className="mt-0.5 size-4 text-[#4169E1] rounded focus:ring-[#4169E1]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Grant Admin access (can manage team, billing, and settings)</span>
                    </label>
                  </div>
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={sendInvite} onChange={(e) => setSendInvite(e.target.checked)}
                        className="mt-0.5 size-4 text-[#4169E1] rounded focus:ring-[#4169E1]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Send invitation email to this person</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 p-6 flex items-center justify-end gap-3">
                <button onClick={() => setShowAddMemberModal(false)} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Cancel</button>
                <button onClick={handleAddMember} disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.role}
                  className="bg-[#4169E1] hover:bg-[#3557c7] text-white px-6 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowUpgradeModal(false)}>
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
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Plan Limit Reached</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You've reached the <strong>{establishment?.planTier}</strong> plan limit of{" "}
                  <strong>{planLimit}</strong> team members. Upgrade your plan to add more.
                </p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowUpgradeModal(false)} className="flex-1 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Cancel</button>
                  <button
                    onClick={() => { setShowUpgradeModal(false); window.location.href = "/settings/billing"; }}
                    className="flex-1 bg-[#4169E1] hover:bg-[#3557c7] text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmOffboardId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setConfirmOffboardId(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="size-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="size-7 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Remove team member?</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  This will offboard this provider from your establishment. Their clients will need to be reassigned.
                </p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setConfirmOffboardId(null)} className="flex-1 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Cancel</button>
                  <button onClick={() => { offboardMember(confirmOffboardId); setConfirmOffboardId(null); }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">Remove</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTeamManageModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowTeamManageModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#043570]/10 rounded-xl flex items-center justify-center">
                      <Users className="size-5 text-[#043570]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Team</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {establishmentMembers.length} team member{establishmentMembers.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowTeamManageModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <X className="size-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
                <div className="space-y-3">
                  {establishmentMembers.map((member) => {
                    const provider = providers.find((p) => p.id === member.providerId);
                    if (!provider) return null;
                    return (
                      <div key={member.providerId} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
                            {provider.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{provider.name}</p>
                              {member.roles.isAdmin && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shrink-0">Admin</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{provider.profession} · {member.roles.clinical || "No role"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {member.roles.clinical === "Supervisor" && member.memberStatus === "active" && (
                            <button onClick={() => setManageSuperviseesFor(member.providerId)}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors whitespace-nowrap"
                              title="Manage supervisees">
                              {member.supervises.length} supervisee{member.supervises.length !== 1 ? "s" : ""}
                            </button>
                          )}
                          <span className={`px-2 py-1 rounded-lg text-[11px] font-medium ${member.memberStatus === "active" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" : member.memberStatus === "verification-pending" ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                            {member.memberStatus.replace("-", " ")}
                          </span>
                          <button onClick={() => setConfirmOffboardId(member.providerId)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                            title="Remove from team">
                            <UserX className="size-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button onClick={() => { setShowTeamManageModal(false); setShowAddMemberModal(true); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl transition-colors font-medium text-sm">
                    <Plus className="size-4" />
                    Add Team Member
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {manageSuperviseesFor && (() => {
          const supervisorMember = members.find(
            (m) => m.providerId === manageSuperviseesFor && m.establishmentId === currentEstablishmentId
          );
          const supervisorProvider = providers.find((p) => p.id === manageSuperviseesFor);
          const activeClinicians = establishmentMembers.filter(
            (m) => m.roles.clinical === "Clinician" && m.memberStatus === "active"
          );
          return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
              onClick={() => setManageSuperviseesFor(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                        <Shield className="size-5 text-purple-700 dark:text-purple-300" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Assign Supervisees</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{supervisorProvider?.name || manageSuperviseesFor}</p>
                      </div>
                    </div>
                    <button onClick={() => setManageSuperviseesFor(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <X className="size-5" />
                    </button>
                  </div>
                </div>
                <ManageSuperviseesForm
                  supervisorMember={supervisorMember}
                  activeClinicians={activeClinicians}
                  providers={providers}
                  onSave={(selectedIds) => {
                    updateMember(manageSuperviseesFor, { supervises: selectedIds });
                    setManageSuperviseesFor(null);
                  }}
                  onCancel={() => setManageSuperviseesFor(null)}
                />
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
