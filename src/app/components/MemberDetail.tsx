import { useState, useMemo } from "react";
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
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockProviders, mockClients } from "../data/mockPartnerData";
import type { EstablishmentMember } from "../types/partnerDashboard";

interface MemberDetailProps {
  member: EstablishmentMember;
  onClose: () => void;
}

export function MemberDetail({ member, onClose }: MemberDetailProps) {
  const {
    establishments,
    currentEstablishmentId,
    members,
    providers,
    careTeamMemberships,
    updateMember,
    offboardMember,
    removeCareTeamMembership,
    addCareTeamMembership,
    isCurrentUserAdmin,
  } = usePartnerDashboard();

  const [showOffboardConfirm, setShowOffboardConfirm] = useState(false);
  const [showReassignConfirm, setShowReassignConfirm] = useState(false);
  const [reassignSelections, setReassignSelections] = useState<Record<string, string>>({});
  const [showSupervisorAssign, setShowSupervisorAssign] = useState(false);

  const provider = providers.find((p) => p.id === member.providerId);
  const establishment = establishments.find((e) => e.id === currentEstablishmentId);

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
    members.filter(
      (m) =>
        m.establishmentId === currentEstablishmentId &&
        m.providerId !== member.providerId &&
        m.memberStatus === "active"
    ) || [];

  if (!provider || !establishment) return null;

  const statusConfig: Record<
    EstablishmentMember["memberStatus"],
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

  const handleApproveVerification = () => {
    updateMember(member.providerId, { memberStatus: "active" });
  };

  const handleOffboardClick = () => {
    if (careTeamClientIds.length > 0) {
      setShowOffboardConfirm(false);
      setShowReassignConfirm(true);
    } else {
      offboardMember(member.providerId);
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
    offboardMember(member.providerId);
    setShowReassignConfirm(false);
    onClose();
  };

  const handleOffboard = () => {
    offboardMember(member.providerId);
    setShowOffboardConfirm(false);
    onClose();
  };

  const handleToggleSupervisee = (clinicianId: string) => {
    const currentSupervises = member.roles.clinical === "Supervisor" ? member.supervises : [];
    const newSupervises = currentSupervises.includes(clinicianId)
      ? currentSupervises.filter((id) => id !== clinicianId)
      : [...currentSupervises, clinicianId];
    updateMember(member.providerId, { supervises: newSupervises });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Team</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-lg flex-shrink-0">
            {provider.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                {provider.name}
              </h1>
              {member.roles.isAdmin && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <Shield className="size-3" />
                  Admin
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400">
                {member.roles.clinical || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <UserCircle2 className="size-5 text-[#00c0ff]" />
            Contact Details
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
              <p className="text-base text-gray-900 dark:text-white font-medium flex items-center gap-2">
                <Mail className="size-4 text-gray-400" />
                {provider.email}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Profession</span>
              <p className="text-base text-gray-900 dark:text-white font-medium flex items-center gap-2">
                <Briefcase className="size-4 text-gray-400" />
                {provider.profession}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Invited</span>
              <p className="text-base text-gray-900 dark:text-white font-medium">
                {new Date(member.invitedAt).toLocaleDateString()}
              </p>
            </div>
            {member.joinedAt && (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Joined</span>
                <p className="text-base text-gray-900 dark:text-white font-medium">
                  {new Date(member.joinedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users className="size-5 text-[#00c0ff]" />
            Role Details
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Clinical Role</span>
              <p className="text-base text-gray-900 dark:text-white font-medium">
                {member.roles.clinical || "None"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Admin Status</span>
              <p className="text-base text-gray-900 dark:text-white font-medium">
                {member.roles.isAdmin ? "Admin" : "Non-admin"}
              </p>
            </div>
            {member.roles.clinical === "Supervisor" && (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                  Supervises ({member.supervises.length})
                </span>
                {member.supervises.length > 0 ? (
                  <div className="space-y-1">
                    {member.supervises.map((supId) => {
                      const supProvider = providers.find((p) => p.id === supId);
                      return (
                        <div
                          key={supId}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-750 rounded-lg"
                        >
                          <CheckCircle2 className="size-3.5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {supProvider?.name || supId}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No supervisees assigned</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {member.roles.clinical === "Supervisor" && (
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Assign Supervisees
            </h3>
            <button
              onClick={() => setShowSupervisorAssign(!showSupervisorAssign)}
              className="text-sm text-[#00c0ff] hover:text-[#0099cc] font-medium"
            >
              {showSupervisorAssign ? "Done" : "Edit"}
            </button>
          </div>
          {showSupervisorAssign ? (
            <div className="space-y-2">
              {otherActiveClinicians.length === 0 ? (
                <p className="text-sm text-gray-400 italic">
                  No other active clinicians in this establishment
                </p>
              ) : (
                otherActiveClinicians.map((m) => {
                      const clinician = providers.find((p) => p.id === m.providerId);
                  const isSupervised = member.supervises.includes(m.providerId);
                  return (
                    <label
                      key={m.providerId}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isSupervised}
                        onChange={() => handleToggleSupervisee(m.providerId)}
                        className="size-4 text-[#00c0ff] rounded focus:ring-[#00c0ff]"
                      />
                      <span className="text-sm text-gray-900 dark:text-white font-medium">
                        {clinician?.name || m.providerId}
                      </span>
                      <span className="text-xs text-gray-500">{clinician?.profession}</span>
                    </label>
                  );
                })
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {member.supervises.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No supervisees assigned</p>
              ) : (
                member.supervises.map((supId) => {
                      const supProvider = providers.find((p) => p.id === supId);
                  return (
                    <span
                      key={supId}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-sm font-medium"
                    >
                      <CheckCircle2 className="size-3" />
                      {supProvider?.name || supId}
                    </span>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="size-5 text-[#00c0ff]" />
          Care Team ({careTeamClients.length})
        </h3>
        {careTeamClients.length > 0 ? (
          <div className="space-y-2">
            {careTeamClients.map((client) => (
              <div
                key={client!.id}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-750 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {client!.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white block">{client!.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{client!.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">Not assigned to any clients</p>
        )}
      </div>

      {member.memberStatus === "verification-pending" && isCurrentUserAdmin && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Verification Pending
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Approve to make this member active
              </p>
            </div>
          </div>
          <button
            onClick={handleApproveVerification}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Approve
          </button>
        </div>
      )}

      {isCurrentUserAdmin && member.memberStatus !== "offboarded" && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowOffboardConfirm(true)}
            className="px-4 py-2.5 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors"
          >
            Offboard Member
          </button>
        </div>
      )}

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
                This will remove <strong>{provider.name}</strong> from the team.
                {careTeamClientIds.length > 0 && (
                  <> Their <strong>{careTeamClientIds.length}</strong> client assignment(s) will need to be reassigned.</>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowOffboardConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOffboardClick}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                {careTeamClientIds.length > 0 ? "Reassign & Offboard" : "Offboard"}
              </button>
            </div>
          </div>
        </div>
      )}

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
                  Choose a provider for each before offboarding.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {careTeamClients.map((client) => (
                <div
                  key={client!.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">
                      {client!.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
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
                    className="w-full text-sm px-3 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent"
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
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReassignAndOffboard}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
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
