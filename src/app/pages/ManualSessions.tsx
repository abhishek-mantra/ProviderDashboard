import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { SessionSelector } from "../components/claims/SessionSelector";
import type { ClaimSession } from "../types/claims";
import { getMockSessions } from "../types/claims";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function ManualSessions() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const { clients } = usePartnerDashboard();

  const client = clients.find((c) => c.id === clientId);
  const clientName = client?.name || "Client";

  const [sessions, setSessions] = useState<ClaimSession[]>(() =>
    getMockSessions(clientId || "1", clientName)
  );
  const [attemptedSelection, setAttemptedSelection] = useState<string | null>(null);

  const handleToggleSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;
    if (!session.hasNotes && !session.selected) {
      setAttemptedSelection(sessionId);
      setTimeout(() => setAttemptedSelection(null), 3000);
      return;
    }
    setSessions(sessions.map((s) => (s.id === sessionId ? { ...s, selected: !s.selected } : s)));
    setAttemptedSelection(null);
  };

  const selectedCount = sessions.filter((s) => s.selected).length;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-4 pb-3 md:pb-4">
        <button
          onClick={() => navigate("/claims")}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            Manual Self-Filing — {clientName}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Select sessions to include in this claim
          </p>
        </div>
      </div>

      <SessionSelector
        sessions={sessions}
        onToggleSession={handleToggleSession}
        attemptedSelection={attemptedSelection}
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/claims")}
          className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          disabled={selectedCount === 0}
          onClick={() =>
            navigate(`/claims/new/${clientId}/manual/details`, {
              state: {
                selectedSessions: sessions.filter((s) => s.selected),
              },
            })
          }
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
            selectedCount > 0
              ? "bg-[#4169E1] hover:bg-[#3557c7] text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
