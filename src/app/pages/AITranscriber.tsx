import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Plus,
  Eye,
  Calendar,
  Clock,
  Mic,
  FileText,
  ChevronDown,
  User,
  Download,
  Trash2,
  X,
  ChevronRight,
  Upload,
  Square,
  CheckCircle,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FreeTrialBanner } from "../components/monetization/FreeTrialBanner";
import { usePlanMode } from "../contexts/PlanModeContext";

interface Transcription {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  sessionDate: string;
  duration: string;
  status: "completed" | "processing" | "failed";
  transcript?: string;
  recordedDate: string;
  fileSize: string;
}

const WAVE_BAR_COUNT = 32;

function TranscriptWaveform({ active }: { active: boolean }) {
  const [bars, setBars] = useState<number[]>(
    Array(WAVE_BAR_COUNT).fill(20),
  );
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setBars(Array(WAVE_BAR_COUNT).fill(20));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= 80) {
        lastUpdateRef.current = timestamp;
        setBars(
          Array.from(
            { length: WAVE_BAR_COUNT },
            () => Math.random() * 80 + 10,
          ),
        );
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  return (
    <div className="flex items-center justify-center gap-[3px] h-10 w-full max-w-xs">
      {bars.map((h, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-75"
          style={{
            width: "5px",
            height: `${h * 0.4}%`,
            backgroundColor: "#00c0ff",
          }}
        />
      ))}
    </div>
  );
}

export function AITranscriber() {
  const navigate = useNavigate();
  const { planMode, setPlanMode } = usePlanMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [showClientDropdown, setShowClientDropdown] =
    useState(false);
  const [selectedClientFilter, setSelectedClientFilter] =
    useState<string>("all");
  const [showAddTranscriptModal, setShowAddTranscriptModal] =
    useState(false);
  const [showClientPickerModal, setShowClientPickerModal] =
    useState(false);
  const [clientPickerSearch, setClientPickerSearch] =
    useState("");
  const [
    selectedClientForTranscript,
    setSelectedClientForTranscript,
  ] = useState<{ id: string; name: string } | null>(null);
  const [clientName, setClientName] = useState("");
  const [transcriptTab, setTranscriptTab] = useState<
    "record" | "upload"
  >("record");
  const [selectedSession, setSelectedSession] = useState<
    string | null
  >(null);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingSaved, setRecordingSaved] = useState(false);
  const [savedRecordingDuration, setSavedRecordingDuration] =
    useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(
    null,
  );
  const [briefOverview, setBriefOverview] = useState("");
  const [manualSessionDate, setManualSessionDate] = useState<string>(() => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // YYYY-MM-DD format, today's date
  });
  const [manualSessionTime, setManualSessionTime] = useState<string>(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:MM format, current time
  });

  const isTranscriberOnly = planMode === "transcriber-only";

  // Recording timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (
      !isRecording &&
      recordingTime > 0 &&
      !recordingSaved
    ) {
      // Don't reset if we just stopped recording
    } else if (!isRecording && !recordingSaved) {
      setRecordingTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, recordingTime, recordingSaved]);

  // Format recording time as MM:SS
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Handle file upload
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Accept audio files
      const validTypes = [
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/m4a",
        "audio/ogg",
        "audio/webm",
      ];
      if (
        validTypes.includes(file.type) ||
        file.name.match(/\.(mp3|wav|m4a|ogg|webm)$/i)
      ) {
        setUploadedFile(file);
      } else {
        alert(
          "Please upload a valid audio file (MP3, WAV, M4A, OGG, or WEBM)",
        );
      }
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validTypes = [
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/m4a",
        "audio/ogg",
        "audio/webm",
      ];
      if (
        validTypes.includes(file.type) ||
        file.name.match(/\.(mp3|wav|m4a|ogg|webm)$/i)
      ) {
        setUploadedFile(file);
      } else {
        alert(
          "Please upload a valid audio file (MP3, WAV, M4A, OGG, or WEBM)",
        );
      }
    }
  };

  // Mock transcriptions data
  const transcriptions: Transcription[] = [
    {
      id: "trans-1",
      clientId: "1",
      clientName: "Sarah Johnson",
      clientAvatar:
        "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDYwODg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionDate: "Mar 14, 2026",
      duration: "45:32",
      status: "completed",
      recordedDate: "Mar 14, 2026",
      fileSize: "32 MB",
    },
    {
      id: "trans-2",
      clientId: "2",
      clientName: "Michael Chen",
      clientAvatar:
        "https://images.unsplash.com/photo-1766066014773-0074bf4911de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDU2MDg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionDate: "Mar 12, 2026",
      duration: "50:15",
      status: "completed",
      recordedDate: "Mar 12, 2026",
      fileSize: "38 MB",
    },
    {
      id: "trans-3",
      clientId: "1",
      clientName: "Sarah Johnson",
      clientAvatar:
        "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDYwODg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionDate: "Mar 7, 2026",
      duration: "42:10",
      status: "completed",
      recordedDate: "Mar 7, 2026",
      fileSize: "30 MB",
    },
    {
      id: "trans-4",
      clientId: "3",
      clientName: "David Martinez",
      clientAvatar:
        "https://images.unsplash.com/photo-1553690300-93871c6a6654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoaXNwYW5pYyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDU4NzUwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionDate: "Mar 8, 2026",
      duration: "48:20",
      status: "processing",
      recordedDate: "Mar 8, 2026",
      fileSize: "35 MB",
    },
    {
      id: "trans-5",
      clientId: "4",
      clientName: "Emily Watson",
      clientAvatar:
        "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0NTc4OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      sessionDate: "Mar 6, 2026",
      duration: "38:45",
      status: "completed",
      recordedDate: "Mar 6, 2026",
      fileSize: "28 MB",
    },
  ];

  // Mock clients
  const clients = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Chen" },
    { id: "3", name: "David Martinez" },
    { id: "4", name: "Emily Watson" },
    { id: "5", name: "Priya Sharma" },
  ];

  const filteredTranscriptions = transcriptions.filter(
    (trans) => {
      const matchesSearch =
        searchQuery === "" ||
        trans.clientName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesClientFilter =
        selectedClientFilter === "all" ||
        trans.clientId === selectedClientFilter;

      return matchesSearch && matchesClientFilter;
    },
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-lg">
            <span className="size-1.5 bg-green-500 rounded-full"></span>
            Completed
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-lg">
            <span className="size-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            Processing
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium rounded-lg">
            <span className="size-1.5 bg-red-500 rounded-full"></span>
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const mockSessions = [
    { id: "s1", label: "Mar 14, 2026 — 9:00 AM (Session #12)" },
    { id: "s2", label: "Mar 7, 2026 — 10:30 AM (Session #11)" },
    { id: "s3", label: "Feb 28, 2026 — 9:00 AM (Session #10)" },
  ];

  // Check if content should be enabled
  const hasContent =
    transcriptTab === "record"
      ? recordingSaved
      : uploadedFile !== null;

  const isFormValid =
    selectedClientForTranscript !== null &&
    hasContent &&
    selectedSession !== null;

  // Always show full page - no locked state
  return (
    <div className="max-w-[1400px]">
      {/* Header Section */}
      <div className="mb-4 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 md:mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              AI Transcriber
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Record and transcribe sessions with AI-powered
              notes
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Client Dropdown */}
            <div className="relative w-1/2 sm:w-auto">
              <button
                onClick={() =>
                  setShowClientDropdown(!showClientDropdown)
                }
                className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all shadow-sm font-semibold text-gray-700 dark:text-gray-300 text-sm w-full justify-center"
              >
                <User className="size-4 md:size-5 flex-shrink-0" />
                <span className="truncate max-w-[60px] md:max-w-none">
                  {selectedClientFilter === "all"
                    ? "All Clients"
                    : clients.find(
                        (c) => c.id === selectedClientFilter,
                      )?.name}
                </span>
                <ChevronDown className="size-4 flex-shrink-0" />
              </button>

              {showClientDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowClientDropdown(false)}
                  />
                  <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2">
                    <button
                      onClick={() => {
                        setSelectedClientFilter("all");
                        setShowClientDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                        selectedClientFilter === "all"
                          ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      All Clients
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                    {clients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => {
                          setSelectedClientFilter(client.id);
                          setShowClientDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                          selectedClientFilter === client.id
                            ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {client.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => {
                setShowClientPickerModal(true);
                setClientPickerSearch("");
              }}
              className="flex items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-xl transition-all font-semibold shadow-sm hover:shadow-md text-sm w-1/2 sm:w-auto"
            >
              <Plus className="size-4 md:size-5" />
              <span className="hidden sm:inline">
                Add Transcript
              </span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Free Trial Banner */}
        <FreeTrialBanner toolName="AI Transcriber" />

        {/* Search Bar */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by client name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent dark:text-white placeholder-gray-400 shadow-sm text-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-8">
        {/* Total Transcripts */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mic className="size-3.5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">5</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">transcripts</span>
          </div>
        </div>

        {/* Words Transcribed */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="size-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">48,320</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">words transcribed</span>
          </div>
        </div>

        {/* Credits Used */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="size-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">48</span>
            <span className="text-xs text-gray-400">credits used</span>
            <span className="text-[11px] text-gray-300">·</span>
            <span className="text-[11px] text-amber-500 font-medium">10 left</span>
            <span className="text-[11px] text-gray-300">·</span>
            <button
              onClick={() => navigate('/settings/billing', { state: { openManageCredits: true } })}
              className="inline-flex items-center gap-0.5 text-[11px] text-[#00c0ff] font-semibold hover:underline"
            >
              <span className="text-[13px] leading-none">+</span>
              <span>Add more</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transcriptions Grid */}
      {filteredTranscriptions.length > 0 ? (
        <div className="grid gap-4">
          {filteredTranscriptions.map((trans, index) => {
            const clientInitials = trans.clientName
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <motion.div
                key={trans.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.03,
                }}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-5 hover:border-[#14B8A6] dark:hover:border-[#14B8A6] hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                  {/* Left Side - Avatar and Content */}
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                    {/* Client Avatar */}
                    {trans.clientAvatar ? (
                      <ImageWithFallback
                        src={trans.clientAvatar}
                        alt={trans.clientName}
                        className="size-12 md:size-[75px] rounded-xl object-cover flex-shrink-0"
                        fallback={
                          <div className="size-12 md:size-[75px] bg-gradient-to-br from-[#14B8A6] to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                            {clientInitials}
                          </div>
                        }
                      />
                    ) : (
                      <div className="size-12 md:size-[75px] bg-gradient-to-br from-[#14B8A6] to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                        {clientInitials}
                      </div>
                    )}

                    {/* Recording Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-base md:text-[18px] font-bold text-[#020817] dark:text-white">
                          {trans.clientName}
                        </div>
                        {getStatusBadge(trans.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Calendar className="size-3 md:size-3.5" />
                          <span>{trans.sessionDate}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Clock className="size-3 md:size-3.5" />
                          <span>
                            Duration: {trans.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <FileText className="size-3 md:size-3.5" />
                          <span>{trans.fileSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    {trans.status === "completed" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(
                              `/view-transcription/${trans.id}`,
                            )
                          }
                          className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-[#f0fdfa] dark:bg-teal-900/20 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-[#14B8A6] dark:text-teal-400 rounded-lg transition-all font-semibold text-sm border border-transparent hover:border-[#14B8A6]/20 flex-1 sm:flex-initial"
                        >
                          <Eye className="size-4" />
                          <span>View</span>
                        </button>
                        <button
                          className="size-9 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center transition-all shadow-sm hover:shadow"
                          title="Download"
                        >
                          <Download className="size-4 text-gray-700 dark:text-gray-300" />
                        </button>
                      </>
                    )}
                    {trans.status === "processing" && (
                      <div className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm text-gray-500 dark:text-gray-400 flex-1 sm:flex-initial justify-center sm:justify-start">
                        <div className="size-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    )}
                    <button
                      className="size-9 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-600 hover:border-red-200 rounded-lg flex items-center justify-center transition-all shadow-sm hover:shadow"
                      title="Delete"
                    >
                      <Trash2 className="size-4 text-gray-700 dark:text-gray-300 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-16">
          <div className="text-center">
            <div className="size-16 md:size-20 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-sm">
              <Mic className="size-8 md:size-10 text-[#14B8A6]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery
                ? "No recordings found"
                : "No recordings yet"}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchQuery
                ? "Try adjusting your search criteria or clear the search to see all recordings"
                : "Start recording your sessions to automatically generate transcripts and AI-powered notes"}
            </p>
            <button
              onClick={() => {
                setShowClientPickerModal(true);
                setClientPickerSearch("");
              }}
              className="flex items-center gap-2 bg-[#14B8A6] hover:bg-[#0F9488] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-semibold mx-auto text-sm"
            >
              <Mic className="size-5" />
              Add First Transcript
            </button>
          </div>
        </div>
      )}

      {/* Client Picker Modal */}
      {showClientPickerModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowClientPickerModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="relative px-6 pt-6 pb-5 rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)",
              }}
            >
              <button
                onClick={() => setShowClientPickerModal(false)}
                className="absolute top-4 right-4 size-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="size-4 text-white" />
              </button>
              <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
                <Users
                  className="size-7 text-white"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                Select a Client
              </h2>
              <p className="text-sm text-blue-100">
                Choose the client for this transcript session
              </p>
            </div>

            {/* Search */}
            <div className="px-6 pt-5 pb-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={clientPickerSearch}
                  onChange={(e) =>
                    setClientPickerSearch(e.target.value)
                  }
                  autoFocus
                  className="w-full h-11 pl-10 pr-4 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/15 dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
            </div>

            {/* Client list */}
            <div className="px-6 pb-6 space-y-2 max-h-72 overflow-y-auto">
              {clients
                .filter((c) =>
                  c.name
                    .toLowerCase()
                    .includes(clientPickerSearch.toLowerCase()),
                )
                .map((client) => (
                  <button
                    key={client.id}
                    onClick={() => {
                      setSelectedClientForTranscript({
                        id: client.id,
                        name: client.name,
                      });
                      setShowClientPickerModal(false);
                      setShowAddTranscriptModal(true);
                      setTranscriptTab("record");
                      setSelectedSession(null);
                      setRecordingSaved(false);
                      setRecordingTime(0);
                      setUploadedFile(null);
                      setBriefOverview("");
                      setManualSessionDate(new Date().toISOString().split("T")[0]);
                      setManualSessionTime(new Date().toTimeString().slice(0, 5));
                    }}
                    className="w-full flex items-center gap-3.5 p-3.5 bg-white dark:bg-gray-750 border-[1.5px] border-[#F1F5F9] dark:border-gray-700 rounded-2xl hover:border-[#00c0ff] hover:bg-[#F8FFFE] dark:hover:bg-gray-700 hover:shadow-[0_4px_16px_rgba(0,192,255,0.08)] transition-all group"
                  >
                    <div className="size-10 rounded-full bg-gradient-to-br from-[#00c0ff] to-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">
                        {client.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {client.name}
                      </p>
                    </div>
                    <ChevronRight className="size-4 text-[#CBD5E1] group-hover:text-[#00c0ff] transition-colors flex-shrink-0" />
                  </button>
                ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Transcript Modal */}
      {showAddTranscriptModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowAddTranscriptModal(false);
            setShowSessionDropdown(false);
            setTranscriptTab("record");
            setSelectedSession(null);
            setIsRecording(false);
            setRecordingTime(0);
            setRecordingSaved(false);
            setSavedRecordingDuration("");
            setUploadedFile(null);
            setBriefOverview("");
            setManualSessionDate(new Date().toISOString().split("T")[0]);
            setManualSessionTime(new Date().toTimeString().slice(0, 5));
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium Gradient Header */}
            <div
              className="relative px-6 pt-6 pb-5 rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)",
              }}
            >
              <button
                onClick={() => {
                  setShowAddTranscriptModal(false);
                  setShowSessionDropdown(false);
                  setTranscriptTab("record");
                  setIsRecording(false);
                  setRecordingTime(0);
                  setRecordingSaved(false);
                  setSavedRecordingDuration("");
                  setUploadedFile(null);
                  setBriefOverview("");
                  setManualSessionDate(new Date().toISOString().split("T")[0]);
                  setManualSessionTime(new Date().toTimeString().slice(0, 5));
                }}
                className="absolute top-4 right-4 size-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="size-4 text-white" />
              </button>
              <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
                <Mic
                  className="size-7 text-white"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                Add New Transcript
              </h2>
              <p className="text-sm text-blue-100">
                {selectedClientForTranscript
                  ? `Recording for ${selectedClientForTranscript.name}`
                  : "Record, upload, or type your session transcript"}
              </p>
            </div>

            {/* Tab Selector */}
            <div className="px-6 pt-5 pb-0">
              <div className="bg-[#F1F5F9] p-1 rounded-[14px] flex gap-0">
                {[
                  {
                    key: "record",
                    label: "Record",
                    icon: <Mic className="size-4" />,
                  },
                  {
                    key: "upload",
                    label: "Upload",
                    icon: <Upload className="size-4" />,
                  },
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() =>
                      setTranscriptTab(
                        key as "record" | "upload",
                      )
                    }
                    className={`flex-1 h-11 rounded-[12px] flex items-center justify-center gap-2 text-[13px] font-semibold transition-all duration-200 ${
                      transcriptTab === key
                        ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.10)] text-[#043570]"
                        : "text-[#94A3B8]"
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── MODAL FORM ── */}
            <div className="px-6 py-5 space-y-4">
              {/* ── RECORD TAB ── */}
              {transcriptTab === "record" && (
                <div className="bg-[#F8FAFC] dark:bg-gray-750 rounded-2xl p-6 flex flex-col items-center">
                  {!isRecording && !recordingSaved ? (
                    <>
                      <div className="size-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 border border-red-100 dark:border-red-800/30">
                        <Mic
                          className="size-8 text-red-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <button
                        onClick={() => setIsRecording(true)}
                        className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm mb-2 transition-all shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30"
                      >
                        Start Recording
                      </button>
                      <p className="text-xs text-[#94A3B8]">
                        Click to begin — your session will be
                        transcribed automatically
                      </p>
                    </>
                  ) : isRecording ? (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="size-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-red-400/30"
                      >
                        <Mic
                          className="size-10 text-white"
                          strokeWidth={1.5}
                        />
                      </motion.div>
                      <TranscriptWaveform active={true} />
                      <div className="text-[28px] font-bold text-gray-900 dark:text-white tabular-nums my-3">
                        {formatRecordingTime(recordingTime)}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-full border border-red-100 dark:border-red-800/30 mb-4">
                        <div className="size-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                          Recording in progress
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsRecording(false);
                          setSavedRecordingDuration(
                            formatRecordingTime(recordingTime),
                          );
                          setRecordingSaved(true);
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/25"
                      >
                        <Square className="size-4 fill-white" />
                        Stop Recording
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="size-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 border border-green-100 dark:border-green-800/30">
                        <CheckCircle
                          className="size-8 text-green-600 dark:text-green-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="text-base font-bold text-green-600 dark:text-green-500 mb-1">
                        Recording saved!
                      </p>
                      <p className="text-sm text-[#64748B] mb-4">
                        {savedRecordingDuration} recorded
                      </p>
                      <button
                        onClick={() => {
                          setRecordingSaved(false);
                          setRecordingTime(0);
                          setSavedRecordingDuration("");
                        }}
                        className="text-[#00c0ff] hover:text-[#00a8e6] font-semibold text-sm transition-colors"
                      >
                        Record again
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* ── UPLOAD TAB ── */}
              {transcriptTab === "upload" &&
                (!uploadedFile ? (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        const validTypes = [
                          "audio/mpeg",
                          "audio/mp3",
                          "audio/wav",
                          "audio/m4a",
                          "audio/ogg",
                          "audio/webm",
                        ];
                        if (
                          validTypes.includes(file.type) ||
                          file.name.match(
                            /\.(mp3|wav|m4a|ogg|webm)$/i,
                          )
                        )
                          setUploadedFile(file);
                      }
                    }}
                    onClick={() =>
                      document
                        .getElementById("ai-transcriber-upload")
                        ?.click()
                    }
                    className="border-2 border-dashed border-[#E2E8F0] dark:border-gray-600 rounded-2xl p-8 flex flex-col items-center hover:border-[#00c0ff] transition-colors cursor-pointer bg-[#F8FAFC] dark:bg-gray-750"
                  >
                    <div className="size-14 bg-[#EFF6FF] dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-3 border border-blue-100 dark:border-blue-800/30">
                      <Upload
                        className="size-7 text-[#2563EB]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      Drop your audio file here
                    </p>
                    <p className="text-xs text-[#64748B] mb-2">
                      or click to browse
                    </p>
                    <span className="text-[11px] px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-[#64748B] rounded-lg font-medium">
                      MP3 · WAV · M4A · OGG · WEBM
                    </span>
                    <input
                      id="ai-transcriber-upload"
                      type="file"
                      accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setUploadedFile(file);
                      }}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="bg-[#F8FAFC] dark:bg-gray-750 rounded-2xl p-4 border border-[#E2E8F0] dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-[#EFF6FF] dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-800/30">
                        <FileText
                          className="size-5 text-[#2563EB]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-[#64748B]">
                          {(
                            uploadedFile.size /
                            (1024 * 1024)
                          ).toFixed(1)}{" "}
                          MB · Ready to process
                        </p>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="size-7 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <X className="size-3.5 text-gray-500" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg w-fit border border-green-100 dark:border-green-800/30">
                      <CheckCircle className="size-3.5 text-green-600" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                        File ready
                      </span>
                    </div>
                  </div>
                ))}

              {/* ── SESSION META ── */}
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Select Session
                </label>
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
                        {/* Session options */}
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

                        {/* Divider */}
                        <div className="border-t border-[#F1F5F9] dark:border-gray-700 mx-2" />

                        {/* Create without a session */}
                        <div className="p-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Snap current date/time at click moment
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

              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Brief Overview{" "}
                  <span className="font-normal normal-case text-[#94A3B8]">
                    (optional)
                  </span>
                </label>
                <textarea
                  value={briefOverview}
                  onChange={(e) =>
                    setBriefOverview(e.target.value)
                  }
                  placeholder="e.g., Anxiety management techniques, breathing exercises..."
                  className="w-full h-16 px-4 py-2.5 bg-white dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl text-sm resize-none focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/15 dark:text-white placeholder-gray-400 transition-all"
                />
              </div>

              {/* ── SAVE BUTTON ── */}
              <div className="pt-1 border-t border-[#F1F5F9] dark:border-gray-700">
                <button
                  disabled={!isFormValid}
                  onClick={() => {
                    const newId = `trans-${Date.now()}`;
                    setShowAddTranscriptModal(false);
                    setTranscriptTab("record");
                    setSelectedSession(null);
                    setIsRecording(false);
                    setRecordingTime(0);
                    setRecordingSaved(false);
                    setSavedRecordingDuration("");
                    setUploadedFile(null);
                    setBriefOverview("");
                    setManualSessionDate(new Date().toISOString().split("T")[0]);
                    setManualSessionTime(new Date().toTimeString().slice(0, 5));
                    navigate(`/view-transcription/${newId}`);
                  }}
                  className={`w-full h-12 rounded-xl font-bold text-[15px] transition-all ${
                    isFormValid
                      ? "bg-gradient-to-br from-[#043570] to-[#0a5ca8] text-white shadow-lg shadow-blue-900/20 hover:shadow-xl"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save Transcript
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}