import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar as CalendarIcon, Clock, FileText, Star } from "lucide-react";

interface Session {
  id: string;
  clientName: string;
  initials: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  notes: string;
  selected: boolean;
  rating: number;
}

export function CreateClaim() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      clientName: "Rachit Sharma",
      initials: "RS",
      type: "Therapy",
      date: "Feb 24, 2026",
      time: "9:00 AM",
      duration: "30 min",
      notes: "Session Notes",
      selected: false,
      rating: 4,
    },
    {
      id: "2",
      clientName: "Rachit Sharma",
      initials: "RS",
      type: "Therapy",
      date: "Feb 13, 2026",
      time: "11:00 AM",
      duration: "45 min",
      notes: "",
      selected: false,
      rating: 0,
    },
    {
      id: "3",
      clientName: "Rachit Sharma",
      initials: "RS",
      type: "Therapy",
      date: "Feb 14, 2026",
      time: "10:00 AM",
      duration: "60 min",
      notes: "Session Notes",
      selected: false,
      rating: 4,
    },
    {
      id: "4",
      clientName: "Rachit Sharma",
      initials: "RS",
      type: "Therapy",
      date: "Feb 20, 2026",
      time: "2:00 PM",
      duration: "30 min",
      notes: "",
      selected: false,
      rating: 0,
    },
  ]);

  const handleToggleSession = (sessionId: string) => {
    setSessions(
      sessions.map((session) =>
        session.id === sessionId
          ? { ...session, selected: !session.selected }
          : session
      )
    );
  };

  const selectedCount = sessions.filter((s) => s.selected).length;
  const canSubmit = selectedCount > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <button
          onClick={() => navigate(`/clients/${id}/insurance`)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          New Claim - Rachit Sharma
        </h1>
      </div>

      {/* Select Sessions Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          {/* Title */}
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Sessions
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select the sessions you want to include in this claim (max 6)
            </p>
          </div>

          {/* Session Cards Grid */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`relative rounded-xl p-5 transition-all duration-200 border ${
                  session.selected
                    ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                {/* Checkbox on LEFT and Select link on RIGHT */}
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="checkbox"
                    id={`session-${session.id}`}
                    checked={session.selected}
                    onChange={() => handleToggleSession(session.id)}
                    className="size-4 accent-[#043570] rounded cursor-pointer"
                  />
                  <button
                    onClick={() => handleToggleSession(session.id)}
                    className="text-sm text-[#5B7FDB] hover:text-[#4169E1] cursor-pointer"
                  >
                    Select this session
                  </button>
                </div>

                {/* Client Info with Circular Avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-full bg-[#4169E1] flex items-center justify-center text-white font-semibold text-base flex-shrink-0">
                    {session.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                      {session.clientName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.type}
                    </p>
                  </div>
                </div>

                {/* Session Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="size-4" />
                    <span>{session.date} at {session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="size-4" />
                    <span>{session.duration}</span>
                  </div>
                </div>

                {/* Rating */}
                {session.rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            star <= session.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Session rated by Client
                    </span>
                  </div>
                )}

                {/* Session Notes */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Session Notes
                  </h4>
                  {session.notes ? (
                    <button
                      onClick={() => navigate(`/sessions/${session.id}/notes`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FileText className="size-4" />
                      Session Notes
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/sessions/${session.id}/notes`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FileText className="size-4" />
                      Add Session Notes
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Info Message */}
          {selectedCount === 0 && (
            <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
              No sessions selected. Please select at least one session to continue.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              disabled={!canSubmit}
              className={`px-6 py-2.5 border rounded-lg font-medium transition-colors ${
                canSubmit
                  ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
                  : "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit Via Mantra
            </button>
            <button
              disabled={!canSubmit}
              onClick={() => {
                if (canSubmit) {
                  navigate(`/clients/${id}/insurance/claims/create/cms1500`);
                }
              }}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                canSubmit
                  ? "bg-[#4169E1] hover:bg-[#3557c7] text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}