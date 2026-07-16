import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Users,
  Shield,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Star,
  ChevronRight,
  UserCheck,
  Eye,
  X,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageContainer } from "../components/PageContainer";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockClients } from "../data/mockPartnerData";

interface PendingReviewNote {
  id: string;
  clientId: string;
  clientName: string;
  superviseeId: string;
  superviseeName: string;
  sessionDate: string;
  noteType: string;
  content: string;
  submittedAt: string;
}

export function SupervisorDashboard() {
  const navigate = useNavigate();
  const {
    currentProviderId,
    members,
    providers,
    isCurrentUserSupervisor,
    currentEstablishmentId,
    clientTreatingProviders,
    clients,
  } = usePartnerDashboard();

  const [reviewedNoteIds, setReviewedNoteIds] = useState<Set<string>>(new Set());
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [justReviewedId, setJustReviewedId] = useState<string | null>(null);

  const currentMember = useMemo(
    () => members.find(
      (m) => m.providerId === currentProviderId && m.establishmentId === currentEstablishmentId
    ),
    [members, currentProviderId, currentEstablishmentId]
  );

  const supervisees = useMemo(
    () => members.filter(
      (m) => currentMember?.supervises.includes(m.providerId) && m.memberStatus === "active"
    ),
    [members, currentMember]
  );

  const superviseeIds = useMemo(() => new Set(supervisees.map((s) => s.providerId)), [supervisees]);

  const superviseesPendingVerification = useMemo(
    () => members.filter(
      (m) => currentMember?.supervises.includes(m.providerId) && m.memberStatus === "verification-pending"
    ),
    [members, currentMember]
  );

  const supervisedClients = useMemo(
    () => clients.filter((c) => superviseeIds.has(clientTreatingProviders[c.id])),
    [clients, superviseeIds, clientTreatingProviders]
  );

  const mockPendingNotes: PendingReviewNote[] = [
    {
      id: "review-1",
      clientId: "3",
      clientName: "Emma Thompson",
      superviseeId: "prov-3",
      superviseeName: "Dr. Emily Rodriguez",
      sessionDate: "Jul 14, 2026",
      noteType: "SOAP Note",
      content: "Client reported significant improvement in anxiety symptoms. PHQ-9 score decreased from 14 to 8. Continue current treatment plan with follow-up in 2 weeks. Discussed sleep hygiene and stress management techniques.",
      submittedAt: "Jul 14, 2026",
    },
    {
      id: "review-2",
      clientId: "3",
      clientName: "Emma Thompson",
      superviseeId: "prov-3",
      superviseeName: "Dr. Emily Rodriguez",
      sessionDate: "Jul 10, 2026",
      noteType: "Progress Note",
      content: "Follow-up session. Client is adhering to medication schedule. Reported mild side effects (dry mouth, fatigue). Recommend continuing current dosage and monitoring.",
      submittedAt: "Jul 10, 2026",
    },
    {
      id: "review-3",
      clientId: "1",
      clientName: "Sarah Johnson",
      superviseeId: "prov-1",
      superviseeName: "Dr. Sarah Johnson",
      sessionDate: "Jul 12, 2026",
      noteType: "Initial Assessment",
      content: "New client intake completed. Presenting concerns: generalized anxiety with occasional panic attacks. GAD-7 score: 15 (moderate-severe). Developed treatment plan incorporating CBT techniques and relaxation exercises.",
      submittedAt: "Jul 12, 2026",
    },
  ];

  const pendingNotes = useMemo(
    () => mockPendingNotes.filter((n) => !reviewedNoteIds.has(n.id)),
    [reviewedNoteIds]
  );

  const handleReviewNote = (noteId: string) => {
    setReviewedNoteIds((prev) => new Set(prev).add(noteId));
    setJustReviewedId(noteId);
    setTimeout(() => setJustReviewedId(null), 2000);
  };

  const statCards = [
    {
      label: "Supervisees",
      value: supervisees.length,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/20",
      barColor: "bg-purple-500",
    },
    {
      label: "Supervised Clients",
      value: supervisedClients.length,
      icon: UserCheck,
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/20",
      barColor: "bg-blue-500",
    },
    {
      label: "Pending Reviews",
      value: pendingNotes.length,
      icon: FileText,
      color: "from-amber-500 to-amber-600",
      shadow: "shadow-amber-500/20",
      barColor: "bg-amber-500",
    },
    {
      label: "Pending Verifications",
      value: superviseesPendingVerification.length,
      icon: Clock,
      color: "from-gray-500 to-gray-600",
      shadow: "shadow-gray-500/20",
      barColor: "bg-gray-500",
    },
  ];

  if (!isCurrentUserSupervisor) {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-300">
        Supervisor access required.
      </div>
    );
  }

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <div className="flex items-start gap-4 mb-2">
          <div className="size-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Shield className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Supervisor Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Oversee your supervisees, review notes, and manage client care.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm mb-6 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">
          {statCards.map((card, i) => {
            const barPercent = card.value > 0
              ? Math.min(Math.round((card.value / Math.max(statCards[0].value, 1)) * 100), 100)
              : 0;
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
                    </p>
                  </div>
                  <div className="mt-1.5 w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${card.barColor}`}
                      style={{ width: `${barPercent}%` }}
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
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm"
        >
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            Supervisees
          </h3>
          {supervisees.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
              No supervisees assigned yet.
            </p>
          ) : (
            <div className="space-y-3">
              {supervisees.map((member) => {
                const provider = providers.find((p) => p.id === member.providerId);
                if (!provider) return null;
                const clientCount = clients.filter(
                  (c) => clientTreatingProviders[c.id] === member.providerId
                ).length;
                return (
                  <div
                    key={member.providerId}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-750 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {provider.name}
                          </p>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                          {provider.profession}
                          <span className="text-gray-300 dark:text-gray-600">·</span>
                          <Star className="size-3 text-amber-500 inline" />
                          {provider.rating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {clientCount}
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Clients</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm"
        >
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Pending Verifications
          </h3>
          {superviseesPendingVerification.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
              No pending verifications.
            </p>
          ) : (
            <div className="space-y-2">
              {superviseesPendingVerification.map((member) => {
                const provider = providers.find((p) => p.id === member.providerId);
                if (!provider) return null;
                return (
                  <div
                    key={member.providerId}
                    className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800"
                  >
                    <div className="size-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                      {provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {provider.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {provider.profession}
                      </p>
                    </div>
                    <AlertTriangle className="size-4 text-amber-500 shrink-0" />
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm mb-6 md:mb-8"
      >
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
          Clients Under Supervision
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Client</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:table-cell">Treating Provider</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">Status</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
              {supervisedClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
                    No supervised clients yet.
                  </td>
                </tr>
              ) : (
                supervisedClients.map((client) => {
                  const treatingProviderId = clientTreatingProviders[client.id];
                  const treatingProvider = providers.find((p) => p.id === treatingProviderId);
                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-3 py-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {client.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                          {treatingProvider?.name}
                        </p>
                      </td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {treatingProvider?.name || "—"}
                        </span>
                      </td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                          Active
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          onClick={() => navigate(`/clients/${client.id}`)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                          title="View Client"
                        >
                          <Eye className="size-4 text-gray-400 group-hover:text-[#00c0ff]" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Pending Actions — Notes Awaiting Review
          </h3>
          {pendingNotes.length > 0 && (
            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
              {pendingNotes.length}
            </span>
          )}
        </div>

        {pendingNotes.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="size-10 text-green-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All caught up! No notes pending review.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedNoteId(expandedNoteId === note.id ? null : note.id)
                  }
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-8 shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <FileText className="size-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {note.clientName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {note.noteType} · {note.sessionDate} · by {note.superviseeName}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`size-4 text-gray-400 shrink-0 transition-transform ${
                      expandedNoteId === note.id ? "rotate-90" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedNoteId === note.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="pt-3 space-y-3">
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              Submitted {note.submittedAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="size-3" />
                              {note.noteType}
                            </span>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {note.content}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleReviewNote(note.id)}
                              className="bg-[#4169E1] hover:bg-[#3557c7] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="size-4" />
                              Mark as Reviewed
                            </button>
                            <button
                              onClick={() => navigate(`/clients/${note.clientId}`)}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                            >
                              <Eye className="size-4" />
                              View Client
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {justReviewedId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2"
            >
              <CheckCircle2 className="size-4" />
              Note reviewed and removed from pending queue.
              <button
                onClick={() => setJustReviewedId(null)}
                className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PageContainer>
  );
}
