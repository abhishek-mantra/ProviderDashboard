import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Video,
  Calendar,
  Clock,
  Timer,
  Briefcase,
  Monitor,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
  Edit2,
  FileText,
  User,
  Plus,
  Sparkles,
  X,
  Upload,
  Mic,
  Type,
  Square
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import MantraCareLogo from "../../imports/MantraCare_(1)-1.svg";
import { useTrial } from "../contexts/TrialContext";
import { FreeTrialPricingPopup } from "../components/monetization/FreeTrialPricingPopup";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

interface SessionNote {
  id: string;
  date: string;
  templateName: string;
  lastModified?: string;
  createdBy?: string;
}

interface Transcript {
  id: string;
  date: string;
  overview: string;
  lastModified?: string;
  createdBy?: string;
  content?: string;
}

export function SessionNotes() {
  const navigate = useNavigate();
  const { id, sessionId } = useParams();
  const { isTrialActive, activateTrial } = useTrial();
  const { canViewClientClinicalContent } = usePartnerDashboard();
  const requestedClientId = id || "1";
  const canViewNotes = canViewClientClinicalContent(requestedClientId);
  const [showTranscriptTrialPopup, setShowTranscriptTrialPopup] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<"notes" | "transcripts">("notes");
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);
  const [isAddTranscriptModalOpen, setIsAddTranscriptModalOpen] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [transcriptTab, setTranscriptTab] = useState<"record" | "upload" | "type">("record");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingSaved, setRecordingSaved] = useState(false);
  const [savedRecordingDuration, setSavedRecordingDuration] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [briefOverview, setBriefOverview] = useState("");
  const [typedTranscript, setTypedTranscript] = useState("");
  const [notes, setNotes] = useState<SessionNote[]>([
    {
      id: "1",
      date: "Mar 14th, 2026",
      templateName: "SOAP Client Session Notes",
      lastModified: "Mar 14, 2026 at 3:45 PM",
      createdBy: "Dr. Smith"
    },
    {
      id: "2",
      date: "Feb 10, 2026",
      templateName: "Basic Template",
      lastModified: "Feb 10, 2026 at 10:30 AM",
      createdBy: "Dr. Smith"
    }
  ]);

  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  // Recording timer effect — must be before early return
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (!isRecording && recordingTime > 0 && !recordingSaved) {
      // Don't reset if we just stopped recording
    } else if (!isRecording && !recordingSaved) {
      setRecordingTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, recordingTime, recordingSaved]);

  if (!canViewNotes) {
    return <div className="p-8 text-center text-gray-600 dark:text-gray-300">You do not have access to this client’s clinical notes.</div>;
  }

  // Format recording time as MM:SS
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/m4a", "audio/ogg", "audio/webm"];
      if (validTypes.includes(file.type) || file.name.match(/\.(mp3|wav|m4a|ogg|webm)$/i)) {
        setUploadedFile(file);
      } else {
        alert("Please upload a valid audio file (MP3, WAV, M4A, OGG, or WEBM)");
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
      const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/m4a", "audio/ogg", "audio/webm"];
      if (validTypes.includes(file.type) || file.name.match(/\.(mp3|wav|m4a|ogg|webm)$/i)) {
        setUploadedFile(file);
      } else {
        alert("Please upload a valid audio file (MP3, WAV, M4A, OGG, or WEBM)");
      }
    }
  };

  // Mock session data
  const session = {
    clientName: "Rachit Dubey",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwwfHx8fDE3NzQyNDAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "Mar 12",
    time: "10:00 AM",
    duration: "30 min",
    service: "Therapy Session",
    type: "Video Call"
  };

  const mockSessions = [
    { id: "s1", label: "Mar 14, 2026 — 9:00 AM (Session #12)" },
    { id: "s2", label: "Mar 7, 2026 — 10:30 AM (Session #11)" },
    { id: "s3", label: "Feb 28, 2026 — 9:00 AM (Session #10)" },
  ];

  const handleAddNotes = () => {
    // Check which tab is active
    if (activeTab === "transcripts") {
      // Open add transcript modal
      setIsAddTranscriptModalOpen(true);
    } else {
      // Navigate to add notes page based on current route
      if (sessionId) {
        navigate(`/sessions/${sessionId}/notes/add`);
      } else if (id) {
        navigate(`/clients/${id}/notes/add`);
      }
    }
  };

  const handleViewNote = (noteId: string) => {
    // Navigate to view note page
    if (sessionId) {
      navigate(`/sessions/${sessionId}/notes/view/${noteId}`);
    } else if (id) {
      navigate(`/clients/${id}/notes/view/${noteId}`);
    }
  };

  const handleEditNote = (noteId: string) => {
    // Navigate to edit note page - would use same form as add with pre-filled data
    if (sessionId) {
      navigate(`/sessions/${sessionId}/notes/add?edit=${noteId}`);
    } else if (id) {
      navigate(`/clients/${id}/notes/add?edit=${noteId}`);
    }
  };

  const handleViewTranscript = (transcript: Transcript) => {
    // Navigate to transcript detail page
    if (sessionId) {
      navigate(`/sessions/${sessionId}/transcripts/${transcript.id}`);
    } else if (id) {
      navigate(`/clients/${id}/transcripts/${transcript.id}`);
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-2 md:p-6">
      <div className="max-w-[1000px] mx-auto space-y-3 md:space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-3 md:mb-8">
          <div className="flex items-start gap-2 md:gap-4 flex-1 min-w-0 mr-2">
            <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
              <FileText className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 truncate">
                Session with {session.clientName}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                Review and manage documentation for this session
              </p>
            </div>
          </div>
          {(activeTab === "notes" || isTrialActive) && (
            <button
              onClick={handleAddNotes}
              className="bg-[#4169E1] hover:bg-[#3557c7] text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 md:gap-2 flex-shrink-0"
            >
              <Plus className="size-4 md:size-5" />
              <span className="hidden md:inline">{activeTab === "notes" ? "Add Notes" : "Add Transcripts"}</span>
            </button>
          )}
        </div>

        {/* Session Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Avatar with Video Badge */}
            <div className="relative flex-shrink-0">
              <ImageWithFallback
                src={session.avatar}
                alt={session.clientName}
                className="size-12 md:size-16 rounded-full object-cover"
                fallback={
                  <div className="size-12 md:size-16 bg-[#043570] rounded-full flex items-center justify-center">
                    <User className="size-6 md:size-8 text-white" />
                  </div>
                }
              />
              {/* Video Badge */}
              <div className="absolute -bottom-0.5 md:-bottom-1 -right-0.5 md:-right-1 size-5 md:size-6 bg-[#00c0ff] rounded-full flex items-center justify-center shadow-sm">
                <Video className="size-2.5 md:size-3.5 text-white" />
              </div>
            </div>

            {/* Session Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {session.clientName}
                </h2>
                {/* Mantra Badge */}
                <div className="size-4 md:size-5 flex items-center justify-center flex-shrink-0">
                  <img src={MantraCareLogo} alt="Mantra" className="size-full" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-[#6366f1] dark:text-[#818cf8] mb-1.5 md:mb-2">
                {session.service}
              </p>
              
              {/* Metadata Row */}
              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1 md:gap-1.5">
                  <Calendar className="size-3 md:size-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <Clock className="size-3 md:size-4" />
                  <span>{session.time}</span>
                </div>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">{session.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Session Notes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-100 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab("notes")}
                className={`relative px-4 md:px-6 py-3 md:py-4 font-semibold text-sm md:text-base transition-colors ${
                  activeTab === "notes"
                    ? "text-[#00c0ff]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span className="hidden md:inline">Session Notes</span>
                <span className="md:hidden">Notes</span>
                {notes.length > 0 && (
                  <span className="ml-1.5 md:ml-2 text-xs md:text-sm">({notes.length})</span>
                )}
                {activeTab === "notes" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("transcripts")}
                className={`relative px-4 md:px-6 py-3 md:py-4 font-semibold text-sm md:text-base transition-colors ${
                  activeTab === "transcripts"
                    ? "text-[#00c0ff]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Transcripts
                {activeTab === "transcripts" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Session Notes Tab Content */}
          {activeTab === "notes" && (
            <>
              {/* Empty State */}
              {notes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                  <div className="size-20 bg-gradient-to-br from-[#f3faff] to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                    <FileText className="size-10 text-[#00c0ff]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    No Notes Yet
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
                    Start documenting this session by adding your first note. Use AI assistance to generate comprehensive session documentation.
                  </p>
                  <button
                    onClick={handleAddNotes}
                    className="flex items-center gap-2 bg-[#043570] hover:bg-[#032554] text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-semibold"
                  >
                    <Plus className="size-4" />
                    Create First Note
                  </button>
                </div>
              )}

              {/* Notes Grid */}
              {notes.length > 0 && (
                <div className="p-3 md:p-6">
                  <div className="grid gap-3 md:gap-4">
                    {notes.map((note) => (
                      <div 
                        key={note.id} 
                        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl p-3 md:p-5 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div className="flex items-start gap-3 md:gap-4 flex-1">
                            {/* Icon */}
                            <div className="size-10 md:size-12 bg-gradient-to-br from-[#f3faff] to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-800/30">
                              <FileText className="size-5 md:size-6 text-[#00c0ff]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5">
                                {note.templateName}
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1 md:gap-1.5">
                                  <Calendar className="size-3 md:size-3.5" />
                                  <span>{note.date}</span>
                                </div>
                                {note.lastModified && (
                                  <div className="flex items-center gap-1 md:gap-1.5">
                                    <Clock className="size-3 md:size-3.5" />
                                    <span className="hidden md:inline">Modified: {note.lastModified}</span>
                                    <span className="md:hidden">{note.lastModified}</span>
                                  </div>
                                )}
                                {note.createdBy && (
                                  <div className="flex items-center gap-1 md:gap-1.5">
                                    <User className="size-3 md:size-3.5" />
                                    <span>{note.createdBy}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-0 md:ml-4">
                            <button 
                              onClick={() => handleViewNote(note.id)}
                              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-[#f3faff] dark:bg-blue-900/20 hover:bg-[#00c0ff]/10 dark:hover:bg-blue-900/30 text-[#043570] dark:text-[#00c0ff] rounded-lg transition-all font-semibold text-xs md:text-sm border border-transparent hover:border-[#00c0ff]/20"
                              title="View Note"
                            >
                              <Eye className="size-3.5 md:size-4" />
                              <span>View</span>
                            </button>
                            <button 
                              onClick={() => handleEditNote(note.id)}
                              className="size-8 md:size-9 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center transition-all shadow-sm hover:shadow flex-shrink-0"
                              title="Edit Note"
                            >
                              <Edit2 className="size-3.5 md:size-4 text-gray-700 dark:text-gray-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Button */}
                  <button
                    onClick={handleAddNotes}
                    className="mt-3 md:mt-4 w-full py-3 md:py-3.5 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] rounded-lg md:rounded-xl text-gray-600 dark:text-gray-400 hover:text-[#043570] dark:hover:text-[#00c0ff] transition-all font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#f3faff]/30 dark:hover:bg-blue-900/10"
                  >
                    <Plus className="size-4 md:size-5" />
                    Add Another Note
                  </button>
                </div>
              )}
            </>
          )}

          {/* Transcripts Tab Content */}
          {activeTab === "transcripts" && (
            <>
              {/* Empty State */}
              {transcripts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                  <div className="size-20 bg-gradient-to-br from-[#f3faff] to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                    <FileText className="size-10 text-[#00c0ff]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    No Transcripts Available
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                    Transcripts from recorded sessions will appear here.
                  </p>
                </div>
              )}

              {/* Transcripts Grid */}
              {transcripts.length > 0 && (
                <div className="p-3 md:p-6">
                  <div className="grid gap-3 md:gap-4">
                    {transcripts.map((transcript) => (
                      <div
                        key={transcript.id}
                        className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl p-3 md:p-5 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div className="flex items-start gap-3 md:gap-4 flex-1">
                            {/* Icon */}
                            <div className="size-10 md:size-12 bg-gradient-to-br from-[#f3faff] to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-800/30">
                              <FileText className="size-5 md:size-6 text-[#00c0ff]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5 line-clamp-2">
                                {transcript.overview}
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1 md:gap-1.5">
                                  <Calendar className="size-3 md:size-3.5" />
                                  <span>{transcript.date}</span>
                                </div>
                                {transcript.lastModified && (
                                  <div className="flex items-center gap-1 md:gap-1.5">
                                    <Clock className="size-3 md:size-3.5" />
                                    <span>{transcript.lastModified}</span>
                                  </div>
                                )}
                                {transcript.createdBy && (
                                  <div className="flex items-center gap-1 md:gap-1.5">
                                    <User className="size-3 md:size-3.5" />
                                    <span>{transcript.createdBy}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-0 md:ml-4">
                            <button
                              onClick={() => handleViewTranscript(transcript)}
                              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-[#f3faff] dark:bg-blue-900/20 hover:bg-[#00c0ff]/10 dark:hover:bg-blue-900/30 text-[#043570] dark:text-[#00c0ff] rounded-lg transition-all font-semibold text-xs md:text-sm border border-transparent hover:border-[#00c0ff]/20"
                              title="View Transcript"
                            >
                              <Eye className="size-3.5 md:size-4" />
                              <span>View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Transcripts Button */}
                  <button
                    onClick={handleAddNotes}
                    className="mt-3 md:mt-4 w-full py-3 md:py-3.5 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] rounded-lg md:rounded-xl text-gray-600 dark:text-gray-400 hover:text-[#043570] dark:hover:text-[#00c0ff] transition-all font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#f3faff]/30 dark:hover:bg-blue-900/10"
                  >
                    <Plus className="size-4 md:size-5" />
                    Add Another Transcript
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Transcript Modal */}
        {isTranscriptModalOpen && selectedTranscript && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedTranscript.overview}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      <span>{selectedTranscript.date}</span>
                    </div>
                    {selectedTranscript.lastModified && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        <span>{selectedTranscript.lastModified}</span>
                      </div>
                    )}
                    {selectedTranscript.createdBy && (
                      <div className="flex items-center gap-1.5">
                        <User className="size-3.5" />
                        <span>{selectedTranscript.createdBy}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsTranscriptModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="size-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {selectedTranscript.content ? (
                    <div className="space-y-4">
                      {selectedTranscript.content.split('\n\n').map((paragraph, index) => {
                        // Check if this paragraph is dialogue
                        const isDrSmith = paragraph.startsWith('Dr. Smith:');
                        const isRachit = paragraph.startsWith('Rachit:');
                        
                        if (isDrSmith || isRachit) {
                          const [speaker, ...textParts] = paragraph.split(':');
                          const text = textParts.join(':').trim();
                          
                          return (
                            <p key={index} className="mb-3 text-sm leading-relaxed">
                              <span className={isDrSmith ? 'font-bold text-[#2563EB]' : 'font-bold text-[#043570]'}>
                                {speaker}:
                              </span>
                              <span className="text-gray-700 dark:text-gray-300"> {text}</span>
                            </p>
                          );
                        }
                        
                        return (
                          <p key={index} className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                      <FileText className="size-12 mb-3 opacity-30" />
                      <p>No transcript content available.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
                <button
                  onClick={() => setIsTranscriptModalOpen(false)}
                  className="px-6 py-2.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Transcript Modal */}
        {isAddTranscriptModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setIsAddTranscriptModalOpen(false);
              setTranscriptTab("record");
              setIsRecording(false);
              setRecordingTime(0);
              setRecordingSaved(false);
              setUploadedFile(null);
            }}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Add New Transcript
                </h2>
                <button
                  onClick={() => {
                    setIsAddTranscriptModalOpen(false);
                    setTranscriptTab("record");
                    setIsRecording(false);
                    setRecordingTime(0);
                    setRecordingSaved(false);
                    setUploadedFile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="size-5 md:size-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6 space-y-4 md:space-y-5">
                {/* Tabs Section */}
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    How do you want to add the transcript?
                  </p>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {/* Record Tab */}
                    <button
                      onClick={() => setTranscriptTab("record")}
                      className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                        transcriptTab === "record"
                          ? "border-[#00c0ff] bg-[#f0fbff] dark:bg-[#00c0ff]/10"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div
                        className={`size-10 md:size-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          transcriptTab === "record"
                            ? "bg-[#00c0ff]"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        <Mic
                          className={`size-5 md:size-6 ${
                            transcriptTab === "record"
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        />
                      </div>
                      <p
                        className={`text-xs md:text-sm font-semibold ${
                          transcriptTab === "record"
                            ? "text-[#00c0ff]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Record
                      </p>
                    </button>

                    {/* Upload Tab */}
                    <button
                      onClick={() => setTranscriptTab("upload")}
                      className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                        transcriptTab === "upload"
                          ? "border-[#00c0ff] bg-[#f0fbff] dark:bg-[#00c0ff]/10"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div
                        className={`size-10 md:size-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          transcriptTab === "upload"
                            ? "bg-[#00c0ff]"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        <Upload
                          className={`size-5 md:size-6 ${
                            transcriptTab === "upload"
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        />
                      </div>
                      <p
                        className={`text-xs md:text-sm font-semibold ${
                          transcriptTab === "upload"
                            ? "text-[#00c0ff]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Upload
                      </p>
                    </button>

                    {/* Type Tab */}
                    <button
                      onClick={() => setTranscriptTab("type")}
                      className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                        transcriptTab === "type"
                          ? "border-[#00c0ff] bg-[#f0fbff] dark:bg-[#00c0ff]/10"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div
                        className={`size-10 md:size-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          transcriptTab === "type"
                            ? "bg-[#00c0ff]"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        <Type
                          className={`size-5 md:size-6 ${
                            transcriptTab === "type"
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        />
                      </div>
                      <p
                        className={`text-xs md:text-sm font-semibold ${
                          transcriptTab === "type"
                            ? "text-[#00c0ff]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Type
                      </p>
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-3 md:space-y-4">
                  {/* Record Tab Content */}
                  {transcriptTab === "record" && (
                    <div className="space-y-3 md:space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 md:p-6 flex flex-col items-center justify-center">
                        {!isRecording && !recordingSaved ? (
                          <>
                            <div className="size-14 md:size-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-3">
                              <Mic className="size-7 md:size-8 text-red-500" />
                            </div>
                            <button
                              onClick={() => setIsRecording(true)}
                              className="px-5 md:px-6 py-2 md:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl text-sm mb-1.5"
                            >
                              Start Recording
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Click to start recording your voice
                            </p>
                          </>
                        ) : isRecording ? (
                          <>
                            <div className="flex flex-col items-center justify-center py-2">
                              <div className="size-20 md:size-[100px] bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <Mic className="size-10 md:size-12 text-white" />
                              </div>
                              <div className="text-2xl md:text-[32px] font-bold text-gray-900 dark:text-white mb-4 md:mb-5">
                                {formatRecordingTime(recordingTime)}
                              </div>
                              <button
                                onClick={() => {
                                  setIsRecording(false);
                                  setSavedRecordingDuration(formatRecordingTime(recordingTime));
                                  setRecordingSaved(true);
                                }}
                                className="flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#2c3e50] hover:bg-[#1e2d3d] text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl text-sm"
                              >
                                <Square className="size-4 fill-white" />
                                Stop Recording
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col items-center justify-center py-2">
                              <div className="size-16 md:size-[80px] bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                                <FileText className="size-8 md:size-10 text-green-600 dark:text-green-500" />
                              </div>
                              <div className="text-base md:text-lg font-bold text-green-600 dark:text-green-500 mb-4">
                                Recording saved! ({savedRecordingDuration})
                              </div>
                              <button
                                onClick={() => {
                                  setRecordingSaved(false);
                                  setRecordingTime(0);
                                  setSavedRecordingDuration("");
                                }}
                                className="text-[#00c0ff] hover:text-[#00a8e6] font-semibold text-sm transition-colors"
                              >
                                Record Again
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Upload Tab Content */}
                  {transcriptTab === "upload" && (
                    <div className="space-y-3 md:space-y-4">
                      {!uploadedFile ? (
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onClick={() => document.getElementById("audio-upload")?.click()}
                          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center hover:border-[#00c0ff] transition-colors cursor-pointer"
                        >
                          <div className="size-14 md:size-16 bg-[#e0f7ff] dark:bg-[#00c0ff]/10 rounded-full flex items-center justify-center mb-3">
                            <Upload className="size-7 md:size-8 text-[#00c0ff]" />
                          </div>
                          <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            Click to upload audio file
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            or drag and drop your audio file here
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            Supports MP3, WAV, M4A, OGG, WEBM
                          </p>
                          <input
                            id="audio-upload"
                            type="file"
                            accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-5">
                          <div className="flex items-start gap-3 md:gap-4">
                            <div className="size-10 md:size-12 bg-[#00c0ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="size-5 md:size-6 text-[#00c0ff]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-1">
                                <p className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm truncate">
                                  {uploadedFile.name}
                                </p>
                                <button
                                  onClick={() => setUploadedFile(null)}
                                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0"
                                  title="Remove file"
                                >
                                  <X className="size-4 md:size-5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <span>{formatFileSize(uploadedFile.size)}</span>
                                <span>•</span>
                                <span className="capitalize">
                                  {uploadedFile.type.split("/")[1] || uploadedFile.name.split(".").pop()}
                                </span>
                              </div>
                              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-lg">
                                <span className="size-1.5 bg-green-500 rounded-full"></span>
                                Ready to upload
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => document.getElementById("audio-upload-change")?.click()}
                            className="mt-3 md:mt-4 w-full text-center text-sm text-[#00c0ff] hover:text-[#00a8e6] font-semibold transition-colors"
                          >
                            Choose a different file
                          </button>
                          <input
                            id="audio-upload-change"
                            type="file"
                            accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Type Tab Content */}
                  {transcriptTab === "type" && (
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Type your transcript
                        </label>
                        <textarea
                          value={typedTranscript}
                          onChange={(e) => setTypedTranscript(e.target.value)}
                          placeholder="Start typing the transcript here..."
                          className="w-full h-24 md:h-28 px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent dark:text-white placeholder-gray-400 resize-none text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Session Details (common for all tabs) */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Session
                    </label>
                    <select
                      value={selectedSession ?? ""}
                      onChange={(e) => setSelectedSession(e.target.value || null)}
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent dark:text-white text-sm"
                    >
                      <option value="" disabled>
                        — Choose a session —
                      </option>
                      {mockSessions.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brief Overview */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brief overview (optional)
                    </label>
                    <textarea
                      value={briefOverview}
                      onChange={(e) => setBriefOverview(e.target.value)}
                      placeholder="e.g., Discussion about anxiety management techniques"
                      className="w-full h-16 md:h-20 px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent dark:text-white placeholder-gray-400 resize-none text-sm"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-2 md:gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setIsAddTranscriptModalOpen(false);
                      setTranscriptTab("record");
                      setIsRecording(false);
                      setRecordingTime(0);
                      setRecordingSaved(false);
                      setUploadedFile(null);
                    }}
                    className="w-full sm:w-auto px-5 md:px-6 py-2 md:py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Create new transcript from the modal data
                      const newTranscript: Transcript = {
                        id: `transcript-${Date.now()}`,
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        overview: briefOverview || "New transcript",
                        lastModified: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                        createdBy: "Dr. Smith",
                        content: typedTranscript || undefined
                      };

                      // Add the new transcript to the list
                      setTranscripts([newTranscript, ...transcripts]);

                      // Reset modal state
                      setIsAddTranscriptModalOpen(false);
                      setTranscriptTab("record");
                      setIsRecording(false);
                      setRecordingTime(0);
                      setRecordingSaved(false);
                      setUploadedFile(null);
                      setSelectedSession(null);
                      setBriefOverview("");
                      setTypedTranscript("");
                    }}
                    className="w-full sm:w-auto px-5 md:px-6 py-2 md:py-2.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-xl transition-all font-semibold shadow-sm hover:shadow-md text-sm"
                  >
                    Save Transcript
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Transcriber Free Trial Popup (for locked Transcripts tab) */}
      <FreeTrialPricingPopup
        isOpen={showTranscriptTrialPopup}
        onClose={() => setShowTranscriptTrialPopup(false)}
        toolName="AI Transcriber"
        toolIcon="#00c0ff"
        onBeginTrial={() => {
          activateTrial();
          setShowTranscriptTrialPopup(false);
        }}
      />
    </div>
  );
}
