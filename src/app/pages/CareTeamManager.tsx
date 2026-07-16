import { useState } from "react";
import {
  Users,
  UserPlus,
  X,
  ChevronLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Layout } from "../components/Layout";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockProviders, mockClients } from "../data/mockPartnerData";

interface CareTeamManagerProps {
  clientId?: string;
}

export function CareTeamManager({ clientId }: CareTeamManagerProps) {
  const {
    members,
    providers,
    careTeamMemberships,
    currentEstablishmentId,
    currentProviderId,
    isCurrentUserAdmin,
    isCurrentUserSupervisor,
    getCurrentEstablishment,
    addCareTeamMembership,
    removeCareTeamMembership,
    clientTreatingProviders,
    reassignClient,
  } = usePartnerDashboard();

  const establishment = getCurrentEstablishment();
  const [searchClient, setSearchClient] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const establishmentMembers = members.filter(
    (m) => m.establishmentId === currentEstablishmentId && m.memberStatus === "active"
  );

  const currentUserMember = members.find(
    (m) =>
      m.providerId === currentProviderId &&
      m.establishmentId === currentEstablishmentId
  );

  const visibleProviderIds = isCurrentUserAdmin
    ? establishmentMembers.map((m) => m.providerId)
    : isCurrentUserSupervisor && currentUserMember
      ? currentUserMember.supervises
      : [currentProviderId];

  const visibleMembers = establishmentMembers.filter((m) =>
    visibleProviderIds.includes(m.providerId)
  );

  const filteredClients = clientId
    ? mockClients.filter((c) => c.id === clientId)
    : mockClients.filter((c) =>
        c.name.toLowerCase().includes(searchClient.toLowerCase())
      );

  const getClientAssignments = (clientId: string) =>
    careTeamMemberships.filter((m) => m.clientId === clientId);

  const getProviderAssignments = (providerId: string) =>
    careTeamMemberships.filter((m) => m.providerId === providerId);

  const handleAssign = (clientId: string, providerId: string) => {
    addCareTeamMembership({
      clientId,
      providerId,
      addedBy: currentProviderId,
      addedAt: new Date().toISOString(),
    });
    setShowAssignModal(false);
    setSelectedClientId(null);
  };

  const handleUnassign = (clientId: string, providerId: string) => {
    removeCareTeamMembership(clientId, providerId);
  };

  const content = (
    <div className={clientId ? "" : "p-4 md:p-6 lg:p-8 max-w-7xl mx-auto"}>
      {!clientId && (
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Care Team Manager
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            Assign and manage client-provider relationships
            {!isCurrentUserAdmin && isCurrentUserSupervisor && (
              <span className="ml-2 text-amber-600 dark:text-amber-400">
                (Supervisor view — showing your supervisees only)
              </span>
            )}
          </p>
        </div>
      )}

      {clientId ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Treating Provider */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="size-4 text-[#00c0ff]" />
              Treating Provider
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              One primary practitioner responsible for this client.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {providers.find((p) => p.id === clientTreatingProviders[clientId])?.name || "Unassigned"}
              </span>
              <select
                value={clientTreatingProviders[clientId] || ""}
                onChange={(e) => reassignClient(clientId, e.target.value)}
                className="max-w-[200px] rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                aria-label="Switch treating provider"
              >
                {establishmentMembers.map((member) => {
                  const provider = providers.find((item) => item.id === member.providerId);
                  return <option key={member.providerId} value={member.providerId}>{provider?.name || member.providerId}</option>;
                })}
              </select>
            </div>
          </div>

          {/* Care Team Members */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Care Team ({getClientAssignments(clientId).length})
              </h4>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-750">
            {getClientAssignments(clientId).length === 0 ? (
              <p className="p-4 text-sm text-gray-400 italic">No additional providers assigned</p>
            ) : (
              getClientAssignments(clientId).map((a) => {
                const provider = providers.find((p) => p.id === a.providerId);
                const member = establishmentMembers.find((m) => m.providerId === a.providerId);
                return (
                  <div key={a.providerId} className="p-3 flex items-center gap-3">
                    <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-xs flex-shrink-0">
                      {provider?.name.split(" ").map((n) => n[0]).join("").slice(0, 2) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {provider?.name || a.providerId}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member?.roles.clinical || "Member"}
                      </p>
                    </div>
                    {(isCurrentUserAdmin || a.providerId === currentProviderId) && (
                      <button
                        onClick={() => handleUnassign(clientId, a.providerId)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Remove from care team"
                      >
                        <X className="size-3.5 text-gray-400 hover:text-red-500" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setSelectedClientId(clientId);
                setShowAssignModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-[#00c0ff] hover:bg-[#00c0ff]/10 rounded-lg transition-colors font-medium"
            >
              <UserPlus className="size-4" />
              Add Provider
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="size-5 text-[#00c0ff]" />
                  Providers
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {visibleMembers.length} active
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-750 max-h-[500px] overflow-y-auto">
              {visibleMembers.map((member) => {
                const provider = providers.find((p) => p.id === member.providerId);
                if (!provider) return null;
                const assignments = getProviderAssignments(member.providerId);
                return (
                  <div
                    key={member.providerId}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {provider.name}
                          </p>
                          {member.roles.isAdmin && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {member.roles.clinical} · {assignments.length} client
                          {assignments.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    {assignments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {assignments.map((a) => {
                          const client = mockClients.find((c) => c.id === a.clientId);
                          return (
                            <span
                              key={a.clientId}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-[#00c0ff]/10 text-[#00c0ff] rounded-lg text-xs font-medium"
                            >
                              {client?.name || a.clientId}
                              {(isCurrentUserAdmin || member.providerId === currentProviderId) && (
                                <button
                                  onClick={() => handleUnassign(a.clientId, member.providerId)}
                                  className="hover:text-red-500 transition-colors ml-0.5"
                                >
                                  <X className="size-3" />
                                </button>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="size-5 text-green-500" />
                  Clients
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchClient}
                  onChange={(e) => setSearchClient(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                />
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-750 max-h-[500px] overflow-y-auto">
              {filteredClients.map((client) => {
                const assignments = getClientAssignments(client.id);
                return (
                  <div
                    key={client.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {client.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {assignments.length} provider
                          {assignments.length !== 1 ? "s" : ""} assigned
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setShowAssignModal(true);
                        }}
                        className="p-2 hover:bg-[#00c0ff]/10 rounded-lg transition-colors group"
                        title="Assign Provider"
                      >
                        <UserPlus className="size-4 text-gray-400 group-hover:text-[#00c0ff]" />
                      </button>
                    </div>
                    {assignments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {assignments.map((a) => {
                          const provider = providers.find((p) => p.id === a.providerId);
                          return (
                            <span
                              key={a.providerId}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-xs font-medium"
                            >
                              {provider?.name || a.providerId}
                              {(isCurrentUserAdmin || a.providerId === currentProviderId) && (
                                <button
                                  onClick={() => handleUnassign(client.id, a.providerId)}
                                  className="hover:text-red-500 transition-colors ml-0.5"
                                >
                                  <X className="size-3" />
                                </button>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showAssignModal && selectedClientId && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAssignModal(false);
              setSelectedClientId(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Assign Provider
                  </h3>
                  <button
                    onClick={() => {
                      setShowAssignModal(false);
                      setSelectedClientId(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Client:{" "}
                  <strong>
                    {mockClients.find((c) => c.id === selectedClientId)?.name}
                  </strong>
                </p>
              </div>
              <div className="p-4 max-h-[300px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-750">
                {visibleMembers.map((member) => {
                  const provider = providers.find((p) => p.id === member.providerId);
                  if (!provider) return null;
                  const alreadyAssigned = careTeamMemberships.some(
                    (m) =>
                      m.clientId === selectedClientId &&
                      m.providerId === member.providerId
                  );
                  return (
                    <button
                      key={member.providerId}
                      onClick={() => {
                        if (!alreadyAssigned) {
                          handleAssign(selectedClientId, member.providerId);
                        }
                      }}
                      disabled={alreadyAssigned}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                        alreadyAssigned
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-50 dark:hover:bg-gray-750"
                      }`}
                    >
                      <div className="size-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {provider.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {member.roles.clinical}
                        </p>
                      </div>
                      {alreadyAssigned ? (
                        <CheckCircle2 className="size-4 text-green-500" />
                      ) : (
                        <UserPlus className="size-4 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return content;
}
