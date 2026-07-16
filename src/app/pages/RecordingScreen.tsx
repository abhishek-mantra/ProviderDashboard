import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Mic, X, CheckCircle, Pause, Play, Square, ChevronDown, Calendar, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const BAR_COUNT = 40;

function useWaveform(active: boolean) {
  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(20));
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setBars(Array(BAR_COUNT).fill(20));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= 80) {
        lastUpdateRef.current = timestamp;
        setBars(Array.from({ length: BAR_COUNT }, () => Math.random() * 90 + 10));
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  return bars;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface ReviewModalProps {
  clientName: string;
  noteType: string;
  duration: string;
  overview: string;
  onOverviewChange: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
  selectedSession: string | null;
  showSessionDropdown: boolean;
  setShowSessionDropdown: (v: boolean) => void;
  setSelectedSession: (v: string) => void;
  manualSessionDate: string;
  manualSessionTime: string;
  setManualSessionDate: (v: string) => void;
  setManualSessionTime: (v: string) => void;
  mockSessions: { id: string; label: string }[];
}

function ReviewModal({
  clientName, noteType, duration, overview, onOverviewChange,
  onClose, onSave,
  selectedSession, showSessionDropdown, setShowSessionDropdown, setSelectedSession,
  manualSessionDate, manualSessionTime, setManualSessionDate, setManualSessionTime,
  mockSessions,
}: ReviewModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(15,23,42,0.35)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-[24px] w-full max-w-[520px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden"
      >
        {/* Top Section - Gradient Header */}
        <div className="relative bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-t-[24px] px-8 pt-7 pb-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-white/80 hover:text-white transition-colors"
            style={{ fontSize: 20 }}
          >
            ✕
          </button>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="size-6 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="size-4 text-[#10b981]" />
            </div>
            <h3 className="text-lg font-bold text-white">Recording complete</h3>
          </div>
          <p className="text-[13px] text-white/70">
            {clientName ? (
              <>{clientName} · {duration} · {noteType}</>
            ) : (
              <><span className="text-[#F59E0B]">No client selected</span> · {duration} · {noteType}</>
            )}
          </p>
        </div>

        {/* Middle Section - Form Fields */}
        <div className="bg-white dark:bg-gray-800 px-8 py-6 space-y-4">
          {/* Select Session dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Select Session</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSessionDropdown(!showSessionDropdown)}
                className={`w-full h-11 px-4 flex items-center justify-between bg-white dark:bg-gray-700 border-[1.5px] rounded-xl text-sm transition-all ${
                  showSessionDropdown
                    ? "border-[#00c0ff] ring-2 ring-[#00c0ff]/15"
                    : "border-[#E2E8F0] dark:border-gray-600 hover:border-[#00c0ff]"
                }`}
              >
                <span className={selectedSession ? "text-gray-900 dark:text-white font-medium" : "text-gray-400"}>
                  {selectedSession === "no-session"
                    ? (() => {
                        const date = new Date(`${manualSessionDate}T${manualSessionTime}`);
                        return date.toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }) + " — " + date.toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        });
                      })()
                    : selectedSession
                    ? mockSessions.find(s => s.id === selectedSession)?.label
                    : "— Choose a session —"}
                </span>
                <ChevronDown className={`size-4 text-gray-400 transition-transform duration-200 ${showSessionDropdown ? "rotate-180" : ""}`} />
              </button>

              {showSessionDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSessionDropdown(false)} />
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-2xl shadow-xl z-20 overflow-hidden">
                    <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
                      {mockSessions.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setSelectedSession(s.id);
                            setShowSessionDropdown(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                            selectedSession === s.id
                              ? "bg-[#EFF6FF] dark:bg-blue-900/20 text-[#043570] dark:text-[#00c0ff]"
                              : "text-gray-700 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`size-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedSession === s.id
                                ? "bg-[#043570]/10 dark:bg-[#00c0ff]/10"
                                : "bg-gray-100 dark:bg-gray-700"
                            }`}>
                              <Calendar className={`size-3.5 ${
                                selectedSession === s.id
                                  ? "text-[#043570] dark:text-[#00c0ff]"
                                  : "text-gray-500 dark:text-gray-400"
                              }`} />
                            </div>
                            <span>{s.label}</span>
                          </div>
                          {selectedSession === s.id && (
                            <CheckCircle className="size-4 text-[#043570] dark:text-[#00c0ff] flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-[#F1F5F9] dark:border-gray-700 mx-2" />

                    <div className="p-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const now = new Date();
                          setManualSessionDate(now.toISOString().split("T")[0]);
                          setManualSessionTime(now.toTimeString().slice(0, 5));
                          setSelectedSession("no-session");
                          setShowSessionDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                          selectedSession === "no-session"
                            ? "bg-[#EFF6FF] dark:bg-blue-900/20 text-[#043570] dark:text-[#00c0ff]"
                            : "text-gray-700 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`size-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selectedSession === "no-session"
                              ? "bg-[#043570]/10 dark:bg-[#00c0ff]/10"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <Plus className={`size-3.5 ${
                              selectedSession === "no-session"
                                ? "text-[#043570] dark:text-[#00c0ff]"
                                : "text-gray-500 dark:text-gray-400"
                            }`} />
                          </div>
                          <span>Create without a session</span>
                        </div>
                        {selectedSession === "no-session" && (
                          <CheckCircle className="size-4 text-[#043570] dark:text-[#00c0ff] flex-shrink-0" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Brief overview */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Brief overview</label>
            <textarea
              value={overview}
              onChange={(e) => onOverviewChange(e.target.value)}
              placeholder="e.g. Discussion about anxiety management techniques"
              rows={3}
              className="w-full h-20 px-3 py-2 bg-white dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-[10px] text-sm resize-none focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,192,255,0.15)] focus:border-[#00c0ff] dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Bottom Section - Save button */}
        <div className="bg-[#F8FAFC] dark:bg-gray-750 rounded-b-[24px] px-8 py-5 border-t border-[#F1F5F9] dark:border-gray-700">
          <button
            onClick={onSave}
            className="w-full h-14 flex items-center justify-center rounded-[14px] text-[15px] font-bold text-white transition-all hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
              boxShadow: '0 4px 16px rgba(37,99,235,0.30)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
            onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #2563EB, #1d4ed8)')}
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const mockSessions = [
  { id: "s1", label: "Mar 14, 2026 — 9:00 AM (Session #12)" },
  { id: "s2", label: "Mar 7, 2026 — 10:30 AM (Session #11)" },
  { id: "s3", label: "Feb 28, 2026 — 9:00 AM (Session #10)" },
];

export function RecordingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { clientName?: string; noteType?: string } | null;
  const clientName = state?.clientName || "";
  const noteType = state?.noteType || "SOAP";

  type RecordingState = "recording" | "paused" | "stopped";
  const [recordingState, setRecordingState] = useState<RecordingState>("recording");
  const [seconds, setSeconds] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [finalDuration, setFinalDuration] = useState("");
  const [liveTime, setLiveTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  const today = new Date();
  const [overview, setOverview] = useState("");

  // Session dropdown state
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [manualSessionDate, setManualSessionDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [manualSessionTime, setManualSessionTime] = useState<string>(() => new Date().toTimeString().slice(0, 5));

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isWaveformActive = recordingState === "recording";
  const bars = useWaveform(isWaveformActive);

  // Live clock for banner
  useEffect(() => {
    const id = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Recording timer
  useEffect(() => {
    if (recordingState !== "recording") return;
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recordingState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSave = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setFinalDuration(formatTime(seconds));
    setRecordingState("stopped");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/ai-transcriber");
  };

  const handleModalSave = () => {
    setShowModal(false);
    const newId = `trans-${Date.now()}`;
    navigate(`/view-transcript/${newId}`);
  };

  const isPaused = recordingState === "paused";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header Strip — intentionally empty spacer */}
      <div className="h-4" />

      {/* Client Info Banner */}
      {!showModal && (
        <div
          className="mx-6 mt-4 rounded-[10px] px-4 py-2.5 flex items-center justify-between border"
          style={clientName
            ? { background: '#EFF6FF', borderColor: '#BFDBFE' }
            : { background: '#FFFBEB', borderColor: '#FDE68A' }
          }
        >
          <div className="flex items-center gap-2">
            <Mic className="size-3.5" style={{ color: clientName ? '#3B82F6' : '#D97706' }} />
            <span
              className="text-[13px] font-semibold"
              style={{ color: clientName ? '#1E40AF' : '#D97706' }}
            >
              {clientName || "No client selected"}
            </span>
            {clientName && (
              <>
                <span className="text-[#94A3B8] text-[13px]">·</span>
                <span className="text-[13px] text-[#3B82F6]">{noteType}</span>
              </>
            )}
          </div>
          <span className="text-[12px] text-[#64748B]">
            {today.toLocaleDateString()} · {liveTime}
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-12">
        {/* Mic Icon with pulse */}
        <motion.div
          animate={recordingState === "recording" ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mic className="size-14 text-[#00c0ff]" />
        </motion.div>

        {/* Waveform */}
        <div className="w-full max-w-md flex items-center justify-center gap-[3px] h-16">
          {bars.map((h, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-75"
              style={{
                width: "6px",
                height: `${isWaveformActive ? h * 0.6 : 20}%`,
                backgroundColor: isWaveformActive ? "#00c0ff" : "#CBD5E1",
              }}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-[32px] font-bold text-gray-900 dark:text-white tabular-nums">
          {formatTime(seconds)}
        </div>

        {/* Control Buttons */}
        {recordingState !== "stopped" && (
          <div className="flex items-center gap-4">
            {/* Pause / Resume */}
            <button
              onClick={() => setRecordingState(isPaused ? "recording" : "paused")}
              className="flex items-center justify-center gap-2 rounded-[14px] text-[15px] font-semibold transition-all"
              style={{
                width: 160,
                height: 52,
                background: isPaused ? '#F0FDF4' : 'white',
                border: isPaused ? '2px solid #10b981' : '2px solid #043570',
                color: isPaused ? '#10b981' : '#043570',
              }}
            >
              {isPaused ? <Play className="size-[18px]" /> : <Pause className="size-[18px]" />}
              {isPaused ? "Resume" : "Pause"}
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-[14px] text-[15px] font-bold text-white transition-all hover:opacity-90"
              style={{
                width: 160,
                height: 52,
                background: '#043570',
                boxShadow: '0 4px 14px rgba(4,53,112,0.30)',
              }}
            >
              <Square className="size-[18px]" />
              Save
            </button>
          </div>
        )}
      </div>

      {/* Review & Save Modal */}
      <AnimatePresence>
        {showModal && (
          <ReviewModal
            clientName={clientName}
            noteType={noteType}
            duration={finalDuration}
            overview={overview}
            onOverviewChange={setOverview}
            onClose={handleCloseModal}
            onSave={handleModalSave}
            selectedSession={selectedSession}
            showSessionDropdown={showSessionDropdown}
            setShowSessionDropdown={setShowSessionDropdown}
            setSelectedSession={setSelectedSession}
            manualSessionDate={manualSessionDate}
            manualSessionTime={manualSessionTime}
            setManualSessionDate={setManualSessionDate}
            setManualSessionTime={setManualSessionTime}
            mockSessions={mockSessions}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
