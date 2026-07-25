import { CheckCircle2, CalendarIcon, Clock, FileText, Star } from "lucide-react";
import type { ClaimSession } from "../../types/claims";

interface SessionSelectorProps {
  sessions: ClaimSession[];
  onToggleSession: (sessionId: string) => void;
  attemptedSelection: string | null;
  readOnly?: boolean;
}

export function SessionSelector({ sessions, onToggleSession, attemptedSelection, readOnly }: SessionSelectorProps) {
  const selectedCount = sessions.filter((s) => s.selected).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 md:p-8">
        <div className="mb-4 md:mb-8">
          <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
            Select Sessions
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Select the sessions you want to include in this claim
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 mb-4 md:mb-8">
          {sessions.map((session) => {
            const showError = attemptedSelection === session.id && !session.hasNotes;
            return (
              <div
                key={session.id}
                onClick={() => !readOnly && onToggleSession(session.id)}
                className={`relative border-2 rounded-xl md:rounded-2xl p-3 md:p-5 transition-all ${
                  session.selected
                    ? "border-[#00c0ff] bg-[#f3faff] dark:bg-cyan-900/10 shadow-lg shadow-cyan-500/10"
                    : !session.hasNotes
                    ? "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 opacity-70"
                    : "border-gray-200 dark:border-gray-700 hover:border-[#00c0ff]/50 hover:shadow-md cursor-pointer bg-white dark:bg-gray-800"
                } ${showError ? "ring-2 ring-red-500 ring-offset-2" : ""}
                  ${readOnly ? "cursor-default" : ""}`}
              >
                {session.selected && (
                  <div className="absolute -top-2 -right-2 size-6 md:size-8 bg-[#00c0ff] rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="size-3.5 md:size-5 text-white" />
                  </div>
                )}

                <div className="flex items-start gap-2.5 md:gap-4 mb-3 md:mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base truncate">
                          {session.clientName}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">{session.serviceType}</p>
                      </div>
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

                <div className="space-y-2">
                  {!session.hasNotes && !readOnly && (
                    <div className="w-full py-2 md:py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 text-gray-400">
                      <FileText className="size-3.5 md:size-4" />
                      <span className="text-xs md:text-sm font-semibold">No session notes</span>
                    </div>
                  )}
                  {showError && (
                    <div className="text-[10px] md:text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1.5 md:gap-2 bg-red-50 dark:bg-red-900/20 px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="font-semibold flex-shrink-0">!</span>
                      <span className="font-medium">Add session note to select session</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
              {selectedCount} session{selectedCount > 1 ? "s" : ""} selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
