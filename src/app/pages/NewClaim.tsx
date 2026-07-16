import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Star, FileText, CheckCircle2, ChevronDown } from "lucide-react";

interface Session {
  id: string;
  clientName: string;
  avatar: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  notes: string;
  hasNotes: boolean;
  selected: boolean;
  rating?: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  initials: string;
  avatarColor: string;
}

export function NewClaim() {
  // Updated: Checkbox on left, "Select this session" link on right, single initial in avatar
  const navigate = useNavigate();
  const { clientId } = useParams();
  const location = useLocation();
  const clientData = location.state?.client as Client | undefined;

  const clientName = clientData?.name || "Sarah Johnson";

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      clientName: clientName,
      avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDA1MzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: clientData?.serviceType || "Therapy",
      date: "Feb 24, 2026",
      time: "9:00 AM",
      duration: "30 min",
      notes: "",
      hasNotes: true, // Has notes - can be selected
      selected: false,
      rating: 4,
    },
    {
      id: "2",
      clientName: clientName,
      avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDA1MzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: clientData?.serviceType || "Therapy",
      date: "Feb 13, 2026",
      time: "11:00 AM",
      duration: "45 min",
      notes: "",
      hasNotes: false, // No notes - cannot be selected
      selected: false,
    },
    {
      id: "3",
      clientName: clientName,
      avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDA1MzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: clientData?.serviceType || "Therapy",
      date: "Feb 14, 2026",
      time: "10:00 AM",
      duration: "60 min",
      notes: "",
      hasNotes: true, // Has notes - can be selected
      selected: false,
      rating: 4,
    },
    {
      id: "4",
      clientName: clientName,
      avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDA1MzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      type: clientData?.serviceType || "Therapy",
      date: "Feb 20, 2026",
      time: "2:00 PM",
      duration: "30 min",
      notes: "",
      hasNotes: false, // No notes - cannot be selected
      selected: false,
    },
  ]);

  const [attemptedSelection, setAttemptedSelection] = useState<string | null>(null);
  const [selectedClientFilter, setSelectedClientFilter] = useState("all");

  // Client names for the dropdown
  const clientNames = ["All Clients", "Sarah Johnson", "Michael Chen", "Emma Wilson", "James Rodriguez"];

  const handleToggleSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    // Check if session has notes
    if (!session.hasNotes && !session.selected) {
      // Show error for sessions without notes
      setAttemptedSelection(sessionId);
      setTimeout(() => setAttemptedSelection(null), 3000);
      return;
    }

    setSessions(
      sessions.map((s) =>
        s.id === sessionId
          ? { ...s, selected: !s.selected }
          : s
      )
    );
    setAttemptedSelection(null);
  };

  const selectedCount = sessions.filter((s) => s.selected).length;
  const canSubmit = selectedCount > 0;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-4 pb-3 md:pb-4">
        <button
          onClick={() => navigate(`/claims`)}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                New Claim - {clientName}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-0.5 md:mt-1">
                Select sessions to include in this insurance claim
              </p>
            </div>
            {/* Client Name Filter Dropdown - Hidden on Mobile */}
            <div className="hidden md:block relative w-64 flex-shrink-0">
              <select
                value={selectedClientFilter}
                onChange={(e) => setSelectedClientFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent transition-all cursor-pointer"
              >
                {clientNames.map((name, index) => (
                  <option key={index} value={index === 0 ? "all" : name.toLowerCase().replace(" ", "-")}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Select Sessions Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-8">
          {/* Title */}
          <div className="mb-4 md:mb-8">
            <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              Select Sessions
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Select the sessions you want to include in this claim (max 6)
            </p>
          </div>

          {/* Session Cards Grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 mb-4 md:mb-8">
            {sessions.map((session) => {
              const showError = attemptedSelection === session.id && !session.hasNotes;
              
              return (
                <div
                  key={session.id}
                  className={`relative border-2 rounded-xl md:rounded-2xl p-3 md:p-5 transition-all group ${
                    session.selected
                      ? "border-[#00c0ff] bg-[#f3faff] dark:bg-cyan-900/10 shadow-lg shadow-cyan-500/10"
                      : !session.hasNotes
                      ? "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 opacity-70"
                      : "border-gray-200 dark:border-gray-700 hover:border-[#00c0ff]/50 hover:shadow-md cursor-pointer bg-white dark:bg-gray-800"
                  } ${showError ? "ring-2 ring-red-500 ring-offset-2" : ""}`}
                  onClick={() => handleToggleSession(session.id)}
                >
                  {/* Selected Indicator */}
                  {session.selected && (
                    <div className="absolute -top-2 -right-2 size-6 md:size-8 bg-[#00c0ff] rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="size-3.5 md:size-5 text-white" />
                    </div>
                  )}

                  {/* Client Info */}
                  <div className="flex items-start gap-2.5 md:gap-4 mb-3 md:mb-4">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={session.avatar} 
                        alt={session.clientName}
                        className="size-10 md:size-14 rounded-xl md:rounded-2xl object-cover shadow-md"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 size-3 md:size-4 bg-emerald-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base truncate">
                            {session.clientName}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">{session.type}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSession(session.id);
                          }}
                          disabled={!session.hasNotes}
                          className={`hidden md:block text-sm font-semibold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                            session.hasNotes 
                              ? 'text-[#00c0ff] hover:bg-[#00c0ff] hover:text-white' 
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Select session
                        </button>
                      </div>
                      <div className="space-y-1 md:space-y-1.5 mt-2">
                        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                          <CalendarIcon className="size-3 md:size-4 text-[#00c0ff] flex-shrink-0" />
                          <span className="font-medium truncate">{session.date} at {session.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="size-3 md:size-4 text-[#00c0ff] flex-shrink-0" />
                          <span className="font-medium">{session.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  {session.rating && (
                    <div className="flex items-center gap-2 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-0.5 md:gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 md:size-4 ${
                              i < session.rating!
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                        Session rated by Client
                      </span>
                    </div>
                  )}

                  {/* Session Notes Section */}
                  <div className="space-y-2">
                    {!session.hasNotes && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/sessions/${session.id}/notes/add`);
                        }}
                        className="w-full py-2 md:py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#00c0ff] transition-all flex items-center justify-center gap-1.5 md:gap-2 text-gray-700 dark:text-gray-300 group"
                      >
                        <FileText className="size-3.5 md:size-4 group-hover:text-[#00c0ff] transition-colors" />
                        <span className="text-xs md:text-sm font-semibold group-hover:text-[#00c0ff] transition-colors">Add Session Notes</span>
                      </button>
                    )}

                    {session.hasNotes && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/sessions/${session.id}/notes`);
                        }}
                        className="w-full py-2 md:py-3 bg-gradient-to-r from-[#f3faff] to-white dark:from-cyan-900/20 dark:to-gray-800 border-2 border-[#00c0ff]/30 dark:border-cyan-800/50 rounded-lg md:rounded-xl hover:border-[#00c0ff] dark:hover:border-cyan-700 transition-all flex items-center justify-center gap-1.5 md:gap-2 group shadow-sm"
                      >
                        <FileText className="size-3.5 md:size-4 text-[#00c0ff]" />
                        <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-200">View Session Notes</span>
                      </button>
                    )}

                    {/* Error Message */}
                    {showError && (
                      <div className="text-[10px] md:text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1.5 md:gap-2 bg-red-50 dark:bg-red-900/20 px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-red-200 dark:border-red-800">
                        <span className="font-semibold flex-shrink-0">⚠️</span>
                        <span className="font-medium">Add session note to select session</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Message */}
          {selectedCount === 0 && (
            <div className="text-center py-4 md:py-6 px-3 md:px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg md:rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                No sessions selected. Please select at least one session to continue.
              </p>
            </div>
          )}

          {selectedCount > 0 && (
            <div className="text-center py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-[#f3faff] to-cyan-50 dark:from-cyan-900/20 dark:to-cyan-800/10 rounded-lg md:rounded-xl border border-[#00c0ff]/30 dark:border-cyan-800">
              <p className="text-xs md:text-sm font-semibold text-[#043570] dark:text-cyan-300">
                {selectedCount} session{selectedCount > 1 ? 's' : ''} selected
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-end gap-2 md:gap-4 pt-4 md:pt-6 border-t-2 border-gray-200 dark:border-gray-700 mt-4 md:mt-6">
            <button
              disabled={true}
              className="w-full md:w-auto px-4 md:px-8 py-2.5 md:py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-colors text-gray-400 dark:text-gray-500 cursor-not-allowed"
            >
              Submit Via Mantra
            </button>
            <button
              disabled={!canSubmit}
              onClick={() => {
                if (canSubmit) {
                  navigate(`/claims/new/${clientId}/cms1500`, { state: { client: clientData, selectedSessions: sessions.filter(s => s.selected) } });
                }
              }}
              className={`w-full md:w-auto px-4 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all shadow-lg ${
                canSubmit
                  ? "bg-gradient-to-r from-[#00c0ff] to-[#00a8e0] hover:from-[#00a8e0] hover:to-[#0090c0] text-white shadow-cyan-500/30"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
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