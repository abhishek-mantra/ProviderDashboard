import { useState, useEffect } from "react";
import { Calendar, Clock, Search, Filter, ChevronRight, Plus, Star, CheckCircle, AlertCircle, FileText, Mic, X, Pause, Play, ChevronDown, User, Video } from "lucide-react";
import { AddAppointmentModal } from "../components/AddAppointmentModal";
import { RecordPastSessionModal } from "../components/RecordPastSessionModal";
import { MissedSessionModal } from "../components/MissedSessionModal";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router";
import { toast, Toaster } from "sonner";

interface Session {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "done" | "pending";
  avatar: string;
  needsAccept?: boolean;
  rating?: number;
  serviceType?: string;
  platform?: string;
  approvalStatus?: "pending" | "approved";
  hasTranscript?: boolean;
}

interface TranscriptEntry {
  timestamp: string;
  speaker: string;
  text: string;
}

export function Sessions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientParam = searchParams.get("client");
  
  const [activeTab, setActiveTab] = useState<"upcoming" | "done" | "pending" | "all">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState(clientParam || "all");
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
  const [isRecordPastSessionModalOpen, setIsRecordPastSessionModalOpen] = useState(false);
  const [isMissedSessionModalOpen, setIsMissedSessionModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isPastAppointmentsExpanded, setIsPastAppointmentsExpanded] = useState(false);
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);
  const [selectedSessionForTranscript, setSelectedSessionForTranscript] = useState<Session | null>(null);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [selectedSessionForRecording, setSelectedSessionForRecording] = useState<Session | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPendingSessionModalOpen, setIsPendingSessionModalOpen] = useState(false);
  const [selectedPendingSession, setSelectedPendingSession] = useState<Session | null>(null);
  const [recordWithAITranscriber, setRecordWithAITranscriber] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      clientName: "Sarah Jenkins",
      service: "Therapy",
      date: "Mar 12",
      time: "10:00 AM",
      duration: "30 min",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJsb25kZSUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzNTY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      needsAccept: true,
      serviceType: "Mantra",
    },
    {
      id: "2",
      clientName: "Michael Chen",
      service: "Emotional Wellbeing",
      date: "Mar 14",
      time: "03:00 PM",
      duration: "45 min",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MjM3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      serviceType: "Personal",
    },
    {
      id: "3",
      clientName: "Emily White",
      service: "Personal Coach",
      date: "Mar 18",
      time: "11:30 AM",
      duration: "60 min",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1773335954335-47d1486f2e71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJyb3duJTIwaGFpciUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzNTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      serviceType: "Mantra",
    },
    {
      id: "12",
      clientName: "Rachit",
      service: "Therapy",
      date: "Mar 20",
      time: "09:00 AM",
      duration: "45 min",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5OTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      serviceType: "Mantra",
    },
    {
      id: "13",
      clientName: "Rachit",
      service: "Emotional Wellbeing",
      date: "Mar 25",
      time: "02:30 PM",
      duration: "60 min",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5OTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      serviceType: "Mantra",
    },
    {
      id: "11",
      clientName: "David Miller",
      service: "Therapy Session",
      date: "Mar 19",
      time: "02:00 PM",
      duration: "50 min",
      status: "upcoming",
      avatar: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDE2NTI4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      serviceType: "Personal",
      platform: "In-Person",
    },
    {
      id: "4",
      clientName: "Rachel Green",
      service: "Meditation",
      serviceType: "Mantra",
      date: "Feb 10",
      time: "07:00 PM",
      duration: "45 min",
      status: "done",
      avatar: "https://images.unsplash.com/photo-1740746963134-0fddb2027589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRoZXJhcGlzdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIxNzQzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5,
      hasTranscript: true,
    },
    {
      id: "5",
      clientName: "Rachel Green",
      service: "Yoga",
      serviceType: "Mantra",
      date: "Feb 09",
      time: "07:00 AM",
      duration: "60 min",
      status: "done",
      avatar: "https://images.unsplash.com/photo-1740746963134-0fddb2027589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRoZXJhcGlzdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIxNzQzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4,
      hasTranscript: true,
    },
    {
      id: "6",
      clientName: "Rachel Green",
      service: "Therapy",
      serviceType: "Personal",
      date: "Feb 08",
      time: "04:00 PM",
      duration: "45 min",
      status: "done",
      avatar: "https://images.unsplash.com/photo-1740746963134-0fddb2027589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRoZXJhcGlzdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIxNzQzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5,
      platform: "Online",
      hasTranscript: true,
    },
    {
      id: "14",
      clientName: "Rachit",
      service: "Therapy",
      serviceType: "Mantra",
      date: "Mar 14",
      time: "08:21 PM",
      duration: "45 min",
      status: "done",
      avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5OTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      hasTranscript: true,
    },
    {
      id: "15",
      clientName: "Rachit",
      service: "Therapy",
      serviceType: "Mantra",
      date: "Feb 10",
      time: "10:00 AM",
      duration: "30 min",
      status: "done",
      avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5OTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      hasTranscript: true,
    },
    {
      id: "7",
      clientName: "Sarah Jenkins",
      service: "Therapy",
      serviceType: "Personal",
      date: "Aug 07",
      time: "07:30 PM",
      duration: "30 min",
      status: "done",
      avatar: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJsb25kZSUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzNTY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4,
    },
    {
      id: "8",
      clientName: "Alex Turner",
      service: "Personal Coach",
      serviceType: "Mantra",
      date: "Jul 20",
      time: "06:00 AM",
      duration: "45 min",
      status: "done",
      avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIyMzg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5,
      hasTranscript: true,
    },
    {
      id: "9",
      clientName: "Emily White",
      service: "Video Session",
      serviceType: "Mantra",
      date: "Mar 13",
      time: "02:00 PM",
      duration: "45 min",
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1773335954335-47d1486f2e71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJyb3duJTIwaGFpciUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzNTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      approvalStatus: "pending",
    },
    {
      id: "10",
      clientName: "Rachel Green",
      service: "Chat Session",
      serviceType: "Mantra",
      date: "Mar 12",
      time: "10:30 AM",
      duration: "30 min",
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1740746963134-0fddb2027589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRoZXJhcGlzdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIxNzQzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      approvalStatus: "pending",
    },
  ]);

  // Update selected client when URL parameter changes
  useEffect(() => {
    if (clientParam) {
      setSelectedClient(clientParam);
    }
  }, [clientParam]);

  const handleAddAppointment = (appointment: {
    clientId: string;
    clientName: string;
    service: string;
    date: string;
    time: string;
    sessionType: "video" | "chat";
    location: "online" | "offline";
  }) => {
    // Get avatar from client name
    const avatar = appointment.clientName
      .split(" ")
      .map((n) => n[0])
      .join("");

    // Create new session
    const newSession: Session = {
      id: `new-${Date.now()}`,
      clientName: appointment.clientName,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      duration: "45 min", // Default duration
      status: "upcoming",
      avatar: avatar,
      platform: appointment.location === "online" ? "Online" : "Offline",
    };

    // Add to sessions list
    setSessions([newSession, ...sessions]);
    
    // Switch to upcoming tab to show the new appointment
    setActiveTab("upcoming");
  };

  const handleRecordPastSession = (session: {
    clientId: string;
    clientName: string;
    service: string;
    date: string;
    startTime: string;
    endTime: string;
    sessionType: "video" | "chat";
    location: string;
  }) => {
    // Get avatar from client name
    const avatar = session.clientName
      .split(" ")
      .map((n) => n[0])
      .join("");

    // Calculate duration (simplified)
    const duration = "60 min"; // You could calculate this from start/end time

    // Create new session in done status
    const newSession: Session = {
      id: `past-${Date.now()}`,
      clientName: session.clientName,
      service: session.service,
      date: session.date,
      time: session.startTime,
      duration: duration,
      status: "done",
      avatar: avatar,
      platform: session.location,
    };

    // Add to sessions list
    setSessions([newSession, ...sessions]);
    
    // Switch to done tab to show the recorded session
    setActiveTab("done");
  };

  const handleMissedSession = (missedSession: {
    clientName: string;
    sessionType: string;
    duration: string;
    date: string;
    time: string;
  }) => {
    // Get avatar from client name
    const avatar = missedSession.clientName
      .split(" ")
      .map((n) => n[0])
      .join("");

    // Create new session in pending status
    const newSession: Session = {
      id: `missed-${Date.now()}`,
      clientName: missedSession.clientName,
      service: missedSession.sessionType,
      date: missedSession.date,
      time: missedSession.time,
      duration: `${missedSession.duration} min`,
      status: "pending",
      avatar: avatar,
      serviceType: "Mantra", // Missed sessions are only for Mantra clients
      approvalStatus: "pending",
    };

    // Add to sessions list
    setSessions([newSession, ...sessions]);
    
    // Switch to pending tab to show the new missed session
    setActiveTab("pending");
  };

  // Cleanup recording interval on unmount
  useEffect(() => {
    return () => {
      if ((window as any).recordingInterval) {
        clearInterval((window as any).recordingInterval);
      }
    };
  }, []);

  // Close client dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.client-filter-dropdown')) {
        setIsClientDropdownOpen(false);
      }
    };

    if (isClientDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClientDropdownOpen]);

  const handleConfirmSession = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: "done" as const }
        : session
    ));
    // Show toast notification
    toast.success("Appointment moved to Completed Sessions");
    // Switch to done tab to show the confirmed session
    setActiveTab("done");
  };

  const handleCancelSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  // Get unique client names for filter
  const uniqueClients = Array.from(new Set(sessions.map((s) => s.clientName))).sort();

  // Filter sessions by client and search
  const filteredSessions = sessions
    .filter((s) => {
      // Filter by tab status
      if (activeTab !== "all" && s.status !== activeTab) {
        return false;
      }
      // Filter by selected client
      if (selectedClient !== "all" && s.clientName !== selectedClient) {
        return false;
      }
      // Filter by search query
      if (searchQuery && !s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) && !s.service.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });

  // Filter clients by client search query
  const filteredClients = uniqueClients.filter((client) =>
    client.toLowerCase().includes(clientSearchQuery.toLowerCase())
  );

  const upcomingCount = sessions.filter((s) => s.status === "upcoming").length;
  const doneCount = sessions.filter((s) => s.status === "done").length;

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "upcoming":
        return `Upcoming Appointments`;
      case "done":
        return `Completed Sessions`;
      case "pending":
        return "Pending";
      case "all":
        return "All";
      default:
        return tab;
    }
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case "upcoming":
        return upcomingCount;
      case "done":
        return doneCount;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen px-3 pt-4 pb-3 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-6 gap-4 md:gap-0">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <Calendar className="size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              Appointments
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              View and manage all your scheduled sessions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 md:gap-3">
          {/* User Dropdown */}
          <div className="relative client-filter-dropdown flex-1 md:flex-initial">
            <button
              onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
              className="w-full md:w-auto px-3 md:px-4 py-2.5 md:py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c0ff] flex items-center gap-2 md:min-w-[200px] justify-between hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
            >
              <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                <User className="size-3.5 md:size-4 flex-shrink-0" />
                <span className="font-medium text-xs md:text-sm truncate">{selectedClient === "all" ? "All Clients" : selectedClient}</span>
              </div>
              <ChevronDown className={`size-3.5 md:size-4 transition-transform flex-shrink-0 ${isClientDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isClientDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-[280px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-50 overflow-hidden">
                {/* Search Box */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search clients..."
                      value={clientSearchQuery}
                      onChange={(e) => setClientSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                {/* Client List */}
                <div className="max-h-[300px] overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedClient("all");
                      setIsClientDropdownOpen(false);
                      setClientSearchQuery("");
                    }}
                    className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium ${
                      selectedClient === "all" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    All Clients
                  </button>
                  {filteredClients.map((client) => (
                    <button
                      key={client}
                      onClick={() => {
                        setSelectedClient(client);
                        setIsClientDropdownOpen(false);
                        setClientSearchQuery("");
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium ${
                        selectedClient === client ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {client}
                    </button>
                  ))}
                  {filteredClients.length === 0 && clientSearchQuery && (
                    <div className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                      No clients found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Add Appointment Button */}
          <button
            className="flex items-center gap-1.5 md:gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-4 md:px-6 py-2.5 md:py-2.5 rounded-lg md:rounded-xl transition-all font-medium shadow-md hover:shadow-lg flex-shrink-0"
            onClick={() => setIsActionModalOpen(true)}
          >
            <Plus className="size-4 md:size-5" />
            <span className="text-xs md:text-sm">Add</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by provider or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400 text-sm md:text-base"
          />
        </div>
        <button className="px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 md:gap-2 text-gray-700 dark:text-gray-300 flex-shrink-0">
          <Filter className="size-4 md:size-5" />
          <span className="hidden md:inline text-sm">Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex gap-4 md:gap-8 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 overflow-x-auto scrollbar-hide">
          {(["upcoming", "done", "pending", "all"] as const).map((tab) => {
            const count = getTabCount(tab);
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 md:pb-4 pt-3 md:pt-4 px-1 md:px-2 relative font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab
                    ? "text-[#4169E1]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span className="hidden md:inline">{getTabLabel(tab)}</span>
                <span className="md:hidden">
                  {tab === "upcoming" ? "Upcoming" : tab === "done" ? "Done" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                {count !== null && (
                  <span className="ml-1.5 md:ml-2 text-xs md:text-sm">{count}</span>
                )}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4169E1]"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Subheader */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {activeTab === "upcoming" && "Appointments with clients"}
              {activeTab === "done" && "Session successfully completed"}
              {activeTab === "pending" && "Pending appointments"}
              {activeTab === "all" && "All sessions"}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Total {filteredSessions.length}
            </p>
          </div>

          {/* Sessions List/Grid */}
          {activeTab === "upcoming" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                >
                  {/* Main Content Row */}
                  <div className="flex items-start gap-2.5 md:gap-3 mb-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={session.avatar} 
                        alt={session.clientName}
                        className="size-10 md:size-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 size-3 md:size-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-750"></div>
                    </div>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-xs md:text-sm truncate">
                          {session.clientName}
                        </h3>
                        {session.serviceType && (
                          <span className={`px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded font-semibold flex-shrink-0 ${
                            session.serviceType === "Mantra"
                              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          }`}>
                            {session.serviceType}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mb-1.5 md:mb-2 font-medium">{session.service}</p>
                      
                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3 md:size-3.5" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3 md:size-3.5" />
                          <span>{session.time}</span>
                        </div>
                        <span className="text-gray-400 hidden md:inline">•</span>
                        <span className="hidden md:inline">{session.duration}</span>
                      </div>
                      
                      {session.platform && (
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-1.5 flex items-center gap-1">
                          <span className="size-1 md:size-1.5 bg-gray-400 rounded-full"></span>
                          {session.platform}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {session.needsAccept ? (
                      <>
                        <button className="flex-1 bg-[#15A65E] hover:bg-[#138a50] text-white py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs">
                          Accept
                        </button>
                        <button 
                          onClick={() => handleCancelSession(session.id)}
                          className="flex-1 bg-[#EF4444] hover:bg-[#dc2626] text-white py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs"
                        >
                          Decline
                        </button>
                      </>
                    ) : session.platform === "In-Person" ? (
                      <>
                        <button
                          onClick={() => {
                            setSelectedSessionForRecording(session);
                            setIsRecordingModalOpen(true);
                            setRecordWithAITranscriber(true);
                          }}
                          className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs flex items-center justify-center gap-1 md:gap-1.5"
                        >
                          <Mic className="size-3 md:size-3.5" />
                          Record
                        </button>
                        <button 
                          onClick={() => handleCancelSession(session.id)}
                          className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : session.serviceType === "Personal" ? (
                      <>
                        <button 
                          onClick={() => handleConfirmSession(session.id)}
                          className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => handleCancelSession(session.id)}
                          className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs">
                          Reschedule
                        </button>
                        <button 
                          onClick={() => handleCancelSession(session.id)}
                          className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-2 rounded-lg transition-colors font-semibold text-[10px] md:text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "done" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                >
                  {/* Main Content Row */}
                  <div className="flex items-start gap-2.5 md:gap-3 mb-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={session.avatar} 
                        alt={session.clientName}
                        className="size-10 md:size-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 size-3 md:size-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-750"></div>
                    </div>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-xs md:text-sm truncate">
                          {session.clientName}
                        </h3>
                        {session.serviceType && (
                          <span className={`px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded font-semibold flex-shrink-0 ${
                            session.serviceType === "Mantra"
                              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          }`}>
                            {session.serviceType}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mb-1.5 md:mb-2 font-medium">{session.service}</p>
                      
                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3 md:size-3.5" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3 md:size-3.5" />
                          <span>{session.time}</span>
                        </div>
                        <span className="text-gray-400 hidden md:inline">•</span>
                        <span className="hidden md:inline">{session.duration}</span>
                      </div>
                      
                      {session.platform && (
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-1.5 flex items-center gap-1">
                          <span className="size-1 md:size-1.5 bg-gray-400 rounded-full"></span>
                          {session.platform}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  {session.rating && (
                    <div className="flex items-center gap-1 md:gap-1.5 mb-3 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 md:size-3.5 ${
                              i < session.rating!
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Rated by client
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/sessions/${session.id}/notes`)}
                      className="flex-1 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-300"
                    >
                      <FileText className="size-3.5" />
                      <span className="text-xs font-semibold">Notes/ Transcript</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "pending" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                >
                  {/* Main Content Row */}
                  <div className="flex items-start gap-2.5 md:gap-3 mb-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={session.avatar} 
                        alt={session.clientName}
                        className="size-10 md:size-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 size-3 md:size-4 bg-orange-500 rounded-full border-2 border-white dark:border-gray-750"></div>
                    </div>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-xs md:text-sm truncate">
                            {session.clientName}
                          </h3>
                          {session.serviceType && (
                            <span className={`px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded font-semibold flex-shrink-0 ${
                              session.serviceType === "Mantra"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            }`}>
                              {session.serviceType}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedPendingSession(session);
                            setIsPendingSessionModalOpen(true);
                          }}
                          className="flex items-center gap-0.5 md:gap-1 text-[#00c0ff] hover:text-[#0099cc] transition-colors flex-shrink-0"
                        >
                          <span className="text-[10px] md:text-xs font-semibold whitespace-nowrap">View</span>
                          <ChevronRight className="size-3 md:size-3.5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 mb-1.5 md:mb-2">
                        <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">{session.service}</p>
                        <span className="px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                          <AlertCircle className="size-2.5 md:size-3" />
                          <span className="hidden md:inline">Pending Approval</span>
                          <span className="md:hidden">Pending</span>
                        </span>
                      </div>
                      
                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3 md:size-3.5" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3 md:size-3.5" />
                          <span>{session.time}</span>
                        </div>
                        <span className="text-gray-400 hidden md:inline">•</span>
                        <span className="hidden md:inline">{session.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/sessions/${session.id}/notes`)}
                      className="flex-1 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-300"
                    >
                      <FileText className="size-3.5" />
                      <span className="text-xs font-semibold">Notes/ Transcript</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "all" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                >
                  {/* Main Content Row */}
                  <div className="flex items-start gap-2.5 md:gap-3 mb-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={session.avatar} 
                        alt={session.clientName}
                        className="size-10 md:size-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 size-3 md:size-4 rounded-full border-2 border-white dark:border-gray-750 ${
                        session.status === "done" ? "bg-green-500" : session.status === "pending" ? "bg-orange-500" : "bg-blue-500"
                      }`}></div>
                    </div>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-xs md:text-sm truncate">
                          {session.clientName}
                        </h3>
                        {session.serviceType && (
                          <span className={`px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded font-semibold flex-shrink-0 ${
                            session.serviceType === "Mantra"
                              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          }`}>
                            {session.serviceType}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mb-1.5 md:mb-2 font-medium">{session.service}</p>
                      
                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3 md:size-3.5" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3 md:size-3.5" />
                          <span>{session.time}</span>
                        </div>
                        <span className="text-gray-400 hidden md:inline">•</span>
                        <span className="hidden md:inline">{session.duration}</span>
                      </div>
                      
                      {session.platform && (
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-1.5 flex items-center gap-1">
                          <span className="size-1 md:size-1.5 bg-gray-400 rounded-full"></span>
                          {session.platform}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Only show Session Notes button for done sessions */}
                  {session.status === "done" && (
                    <button
                      onClick={() => navigate(`/sessions/${session.id}/notes`)}
                      className="w-full py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-300"
                    >
                      <FileText className="size-3.5" />
                      <span className="text-xs font-semibold">Session Notes</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {filteredSessions.length === 0 && (
            <div className="text-center py-16">
              <div className="size-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="size-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">No sessions found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                There are no {activeTab} sessions at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Past Appointments Section - Only shown on Upcoming tab */}
        {activeTab === "upcoming" && (
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsPastAppointmentsExpanded(!isPastAppointmentsExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Past Appointments
              </span>
              <ChevronRight
                className={`size-5 text-gray-400 transition-transform ${
                  isPastAppointmentsExpanded ? "rotate-90" : ""
                }`}
              />
            </button>

            {isPastAppointmentsExpanded && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessions
                    .filter((s) => s.status === "done")
                    .slice(0, 4)
                    .map((session) => (
                      <div
                        key={session.id}
                        className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="size-11 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-medium text-sm">
                                {session.avatar}
                              </div>
                              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-750"></div>
                            </div>
                          </div>
                          {session.serviceType === "Mantra" ? (
                            <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                              Mantra
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                              Personal
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {session.clientName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {session.service}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="size-4" />
                            <span>{session.date} at {session.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-4" />
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Appointment Modal */}
      <AddAppointmentModal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
        onAddAppointment={handleAddAppointment}
      />

      {/* Record Past Session Modal */}
      <RecordPastSessionModal
        isOpen={isRecordPastSessionModalOpen}
        onClose={() => setIsRecordPastSessionModalOpen(false)}
        onRecordPastSession={handleRecordPastSession}
      />

      {/* Missed Session Modal */}
      <MissedSessionModal
        isOpen={isMissedSessionModalOpen}
        onClose={() => setIsMissedSessionModalOpen(false)}
        onMissedSession={handleMissedSession}
      />

      {/* Action Selection Modal */}
      <AnimatePresence>
        {isActionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pt-20 md:pt-0 md:pl-[100px]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsActionModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-[750px] mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  What do you want to do?
                </h2>
              </div>

              {/* Options */}
              <div className="p-8 space-y-4">
                {/* Schedule Appointment */}
                <button
                  onClick={() => {
                    setIsActionModalOpen(false);
                    setIsAddAppointmentModalOpen(true);
                  }}
                  className="w-full p-6 bg-white dark:bg-gray-750 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#4169E1] dark:hover:border-[#4169E1] transition-all group text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-12 bg-[#4169E1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="size-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#4169E1] transition-colors">
                        Appointment
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Book a future session with a client.
                      </p>
                    </div>
                  </div>
                </button>

                {/* Record Past Session */}
                <button
                  onClick={() => {
                    setIsActionModalOpen(false);
                    setIsRecordPastSessionModalOpen(true);
                  }}
                  className="w-full p-6 bg-white dark:bg-gray-750 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#4169E1] dark:hover:border-[#4169E1] transition-all group text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-12 bg-[#4169E1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="size-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#4169E1] transition-colors">
                        Session
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Log a session that already happened.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toaster */}
      <Toaster />

      {/* Transcript Modal */}
      <AnimatePresence>
        {isTranscriptModalOpen && selectedSessionForTranscript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pt-20 md:pt-0 md:pl-[100px]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                setIsTranscriptModalOpen(false);
                setSelectedSessionForTranscript(null);
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl mx-4 overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    Session Transcript — {selectedSessionForTranscript.clientName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedSessionForTranscript.date} · {selectedSessionForTranscript.duration} duration
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsTranscriptModalOpen(false);
                    setSelectedSessionForTranscript(null);
                  }}
                  className="size-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="size-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="flex gap-6 p-6 overflow-y-auto flex-1">
                {/* Left Side - Transcript */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transcript</h3>
                  <div className="space-y-4">
                    {(() => {
                      const transcripts: Record<string, TranscriptEntry[]> = {
                        "4": [
                          { timestamp: "00:00", speaker: "Therapist", text: "Good evening, Rachel. How have you been feeling since our last session?" },
                          { timestamp: "00:12", speaker: "Client", text: "Hi! I've been okay, but I'm still having trouble sleeping. The work stress hasn't gotten any better." },
                          { timestamp: "00:28", speaker: "Therapist", text: "I understand. Let's talk about what's been causing the most stress at work. Can you identify specific triggers?" },
                          { timestamp: "00:42", speaker: "Client", text: "Mostly deadlines and my manager's expectations. I feel like I'm constantly behind and can't catch up." },
                          { timestamp: "01:05", speaker: "Therapist", text: "That sounds overwhelming. Have you tried any of the breathing exercises we discussed last time?" },
                          { timestamp: "01:18", speaker: "Client", text: "Yes, I have! They help in the moment, but the anxiety comes back quickly." },
                          { timestamp: "01:35", speaker: "Therapist", text: "That's a good start. Let's work on developing a more comprehensive coping strategy for managing these feelings throughout the day." },
                          { timestamp: "01:52", speaker: "Client", text: "I'd really appreciate that. I want to feel more in control." },
                          { timestamp: "02:10", speaker: "Therapist", text: "We'll focus on creating boundaries between work and personal time. Have you thought about setting specific 'no work' hours?" },
                          { timestamp: "02:28", speaker: "Client", text: "Not really. I usually check emails even after dinner." },
                          { timestamp: "02:40", speaker: "Therapist", text: "That's something we can work on. Creating clear boundaries can significantly reduce anxiety and improve sleep quality." },
                        ],
                        "5": [
                          { timestamp: "00:00", speaker: "Instructor", text: "Welcome to today's session! Let's begin with some gentle stretching to warm up." },
                          { timestamp: "00:15", speaker: "Client", text: "Thank you. I'm feeling a bit stiff today." },
                          { timestamp: "00:25", speaker: "Instructor", text: "That's perfectly fine. We'll take it slow and focus on your flexibility. How's your back been?" },
                          { timestamp: "00:38", speaker: "Client", text: "Much better since we started these sessions. The pain has reduced significantly." },
                          { timestamp: "00:52", speaker: "Instructor", text: "Excellent progress! Let's move into downward dog. Remember to breathe deeply." },
                          { timestamp: "01:10", speaker: "Client", text: "This feels great. I can feel the stretch in my shoulders." },
                          { timestamp: "01:25", speaker: "Instructor", text: "Perfect. Hold this position for five more breaths, then we'll transition to warrior pose." },
                          { timestamp: "01:45", speaker: "Client", text: "I love how energized I feel after these sessions." },
                          { timestamp: "02:00", speaker: "Instructor", text: "That's wonderful to hear. Consistent practice will continue to build your strength and flexibility." },
                        ],
                        "6": [
                          { timestamp: "00:00", speaker: "Therapist", text: "Hi Rachel, how are you feeling today?" },
                          { timestamp: "00:08", speaker: "Client", text: "I'm doing better. I've been practicing the mindfulness techniques you taught me." },
                          { timestamp: "00:20", speaker: "Therapist", text: "That's great to hear! Have they been helping with your anxiety?" },
                          { timestamp: "00:30", speaker: "Client", text: "Yes, especially during work meetings. I feel more grounded and less reactive." },
                          { timestamp: "00:45", speaker: "Therapist", text: "Excellent progress. Let's explore what specific situations still trigger your anxiety." },
                          { timestamp: "01:00", speaker: "Client", text: "Mostly presentations and speaking in large groups. I get very nervous." },
                          { timestamp: "01:15", speaker: "Therapist", text: "That's a common challenge. We can work on exposure therapy techniques to help you feel more comfortable." },
                          { timestamp: "01:35", speaker: "Client", text: "I'm willing to try. I really want to overcome this fear." },
                          { timestamp: "01:50", speaker: "Therapist", text: "Your willingness to work on this is a huge step. We'll start with small, manageable scenarios and gradually build up." },
                          { timestamp: "02:10", speaker: "Client", text: "Thank you. I feel hopeful about making progress." },
                        ],
                        "8": [
                          { timestamp: "00:00", speaker: "Coach", text: "Good morning, Alex! Ready for today's session?" },
                          { timestamp: "00:10", speaker: "Client", text: "Absolutely! I've been looking forward to it." },
                          { timestamp: "00:18", speaker: "Coach", text: "Great energy! Let's talk about your goals for this month. What do you want to achieve?" },
                          { timestamp: "00:30", speaker: "Client", text: "I want to improve my time management and be more productive at work." },
                          { timestamp: "00:45", speaker: "Coach", text: "Excellent goal. What specific areas are you struggling with?" },
                          { timestamp: "00:58", speaker: "Client", text: "I tend to procrastinate on difficult tasks and spend too much time on emails." },
                          { timestamp: "01:15", speaker: "Coach", text: "Let's create a structured plan. Have you heard of time blocking?" },
                          { timestamp: "01:28", speaker: "Client", text: "I've heard of it but never tried it properly." },
                          { timestamp: "01:38", speaker: "Coach", text: "Perfect. We'll set up a system where you dedicate specific time blocks for different types of work. This will help reduce decision fatigue." },
                          { timestamp: "02:00", speaker: "Client", text: "That sounds really helpful. I'm excited to try this approach." },
                        ],
                      };

                      const transcript = transcripts[selectedSessionForTranscript.id] || [];
                      
                      return transcript.map((entry, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{entry.timestamp}</span>
                            <span className={`text-xs font-semibold ${
                              entry.speaker === "Therapist" || entry.speaker === "Instructor" || entry.speaker === "Coach"
                                ? "text-[#4169E1]"
                                : "text-purple-600 dark:text-purple-400"
                            }`}>
                              {entry.speaker}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{entry.text}</p>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Right Side - Noteworthy */}
                <div className="w-80 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Noteworthy</h3>
                  <div className="space-y-3">
                    {(() => {
                      const noteworthy: Record<string, string[]> = {
                        "4": [
                          "Client experiencing ongoing sleep difficulties related to work stress",
                          "Successfully implemented breathing exercises but needs more comprehensive coping strategies",
                          "Identified specific triggers: deadlines and manager expectations",
                          "Plan to establish work-life boundaries, including 'no work' hours",
                          "Client motivated and receptive to developing new coping mechanisms",
                        ],
                        "5": [
                          "Significant improvement in back pain since starting yoga practice",
                          "Client feeling stiff today but willing to proceed with gentle approach",
                          "Successfully completed downward dog and warrior poses",
                          "Reports feeling energized after sessions",
                          "Showing good progress in flexibility and strength",
                        ],
                        "6": [
                          "Client practicing mindfulness techniques with positive results",
                          "Improved ability to stay grounded during work meetings",
                          "Primary anxiety triggers: presentations and large group settings",
                          "Client open to exposure therapy for public speaking fear",
                          "Demonstrating strong motivation and hopeful outlook",
                        ],
                        "8": [
                          "Client goals: improve time management and productivity",
                          "Identified procrastination patterns on difficult tasks",
                          "Excessive time spent on email management",
                          "Introduced time blocking technique as solution",
                          "Client enthusiastic and committed to implementing new system",
                        ],
                      };

                      const bullets = noteworthy[selectedSessionForTranscript.id] || [];
                      
                      return bullets.map((bullet, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="size-1.5 bg-[#4169E1] rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{bullet}</p>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recording Modal */}
      <AnimatePresence>
        {isRecordingModalOpen && selectedSessionForRecording && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pt-20 md:pt-0 md:pl-[100px]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                if (!isRecording && !isPaused) {
                  setIsRecordingModalOpen(false);
                  setSelectedSessionForRecording(null);
                  setRecordingTime(0);
                  setRecordWithAITranscriber(true);
                }
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    Record Session — {selectedSessionForRecording.clientName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedSessionForRecording.service} · {selectedSessionForRecording.date} at {selectedSessionForRecording.time}
                  </p>
                </div>
                {!isRecording && !isPaused && (
                  <button
                    onClick={() => {
                      setIsRecordingModalOpen(false);
                      setSelectedSessionForRecording(null);
                      setRecordingTime(0);
                      setRecordWithAITranscriber(true);
                    }}
                    className="size-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="size-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                {!isRecording ? (
                  <div className="text-center">
                    <div className="size-24 bg-gradient-to-br from-[#4169E1] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mic className="size-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Ready to Record
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      This will record your in-person therapy session for automatic transcription and AI-powered session note generation.
                    </p>

                    {/* AI Transcriber Checkbox */}
                    <div className="mb-8 flex justify-center">
                      <label className="inline-flex items-start gap-3 cursor-pointer group text-left max-w-md">
                        <input
                          type="checkbox"
                          checked={recordWithAITranscriber}
                          onChange={(e) => setRecordWithAITranscriber(e.target.checked)}
                          className="mt-0.5 size-5 rounded border-gray-300 dark:border-gray-600 text-[#14B8A6] focus:ring-[#14B8A6] cursor-pointer flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              Add AI notetaker in the meeting
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 bg-[#14B8A6] text-white text-[10px] font-bold rounded">
                              AI
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Automatically transcribe and generate session notes after the session ends
                          </p>
                        </div>
                      </label>
                    </div>

                    <button
                      onClick={() => {
                        setIsRecording(true);
                        setIsPaused(false);
                        // Start timer
                        const interval = setInterval(() => {
                          setRecordingTime(prev => prev + 1);
                        }, 1000);
                        // Store interval ID to clear later
                        (window as any).recordingInterval = interval;
                      }}
                      className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                      <div className="size-3 bg-white rounded-full animate-pulse"></div>
                      Start Recording
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className={`size-24 rounded-full flex items-center justify-center mx-auto mb-6 relative ${isPaused ? 'bg-orange-500' : 'bg-red-600'}`}>
                      <Mic className="size-12 text-white" />
                      {!isPaused && <div className="absolute inset-0 rounded-full border-4 border-red-600 animate-ping"></div>}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {isPaused ? 'Recording Paused' : 'Recording in Progress'}
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      {isPaused ? 'Recording paused. Click resume to continue.' : 'Recording your session...'}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          if (isPaused) {
                            // Resume recording
                            setIsPaused(false);
                            const interval = setInterval(() => {
                              setRecordingTime(prev => prev + 1);
                            }, 1000);
                            (window as any).recordingInterval = interval;
                          } else {
                            // Pause recording
                            setIsPaused(true);
                            clearInterval((window as any).recordingInterval);
                          }
                        }}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                          isPaused 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                      >
                        {isPaused ? (
                          <>
                            <Play className="size-5" />
                            Resume
                          </>
                        ) : (
                          <>
                            <Pause className="size-5" />
                            Pause
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsRecording(false);
                          setIsPaused(false);
                          clearInterval((window as any).recordingInterval);
                          
                          // Mark session as complete
                          if (selectedSessionForRecording) {
                            setSessions(sessions.map(session => 
                              session.id === selectedSessionForRecording.id 
                                ? { ...session, status: "done" as const, hasTranscript: true }
                                : session
                            ));
                          }
                          
                          // Show success message
                          toast.success("Recording saved! Session marked as complete. Generating transcript and notes...");
                          
                          setTimeout(() => {
                            setIsRecordingModalOpen(false);
                            setSelectedSessionForRecording(null);
                            setRecordingTime(0);
                            setRecordWithAITranscriber(true);
                            // Switch to done tab to show the completed session
                            setActiveTab("done");
                          }, 1500);
                        }}
                        className="px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="size-5" />
                        End & Mark Complete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Features Info */}
              {!isRecording && (
                <div className="px-8 pb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      What happens after recording:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Automatic AI transcription of your session</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>AI-generated session notes based on your template</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Key insights and noteworthy moments highlighted</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pending Session Detail Modal */}
      <AnimatePresence>
        {isPendingSessionModalOpen && selectedPendingSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center md:pl-[100px]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                setIsPendingSessionModalOpen(false);
                setSelectedPendingSession(null);
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-2xl w-full max-w-md mx-3 md:mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 md:p-6 relative border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setIsPendingSessionModalOpen(false);
                    setSelectedPendingSession(null);
                  }}
                  className="absolute top-3 right-3 md:top-4 md:right-4 size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="size-5 text-gray-500 dark:text-gray-400" />
                </button>
                <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Session Verification
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Session ID: S-{selectedPendingSession.id}
                </p>
              </div>

              {/* Client Profile Section */}
              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Avatar with Service Icon */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={selectedPendingSession.avatar} 
                      alt={selectedPendingSession.clientName}
                      className="size-14 md:size-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 size-6 md:size-7 bg-[#00c0ff] rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <svg className="size-3 md:size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                      {selectedPendingSession.clientName}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
                      {selectedPendingSession.service}
                    </p>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="p-4 md:p-6 space-y-2.5 md:space-y-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                {/* Date & Time */}
                <div className="flex items-center gap-2.5 md:gap-3">
                  <Calendar className="size-4 md:size-5 text-[#00c0ff] flex-shrink-0" />
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    {selectedPendingSession.date} at {selectedPendingSession.time}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2.5 md:gap-3">
                  <Clock className="size-4 md:size-5 text-[#00c0ff] flex-shrink-0" />
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    {selectedPendingSession.duration}
                  </p>
                </div>

                {/* Video/Chat Type */}
                <div className="flex items-center gap-2.5 md:gap-3">
                  <Video className="size-4 md:size-5 text-[#00c0ff] flex-shrink-0" />
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    Video
                  </p>
                </div>
              </div>

              {/* Verification Question */}
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">
                  Did this session happen?
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-6">
                  Please verify if this session was completed as scheduled
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Mark the pending session as valid (move to done)
                      setSessions(sessions.map(session => 
                        session.id === selectedPendingSession.id 
                          ? { ...session, status: "done" as const }
                          : session
                      ));
                      setIsPendingSessionModalOpen(false);
                      setSelectedPendingSession(null);
                      toast.success("Session marked as valid");
                      setActiveTab("done");
                    }}
                    className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white py-2.5 md:py-3 rounded-lg md:rounded-xl transition-colors font-semibold text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2"
                  >
                    <CheckCircle className="size-4 md:size-5" />
                    Mark as Valid
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Mark the pending session as invalid (remove)
                      setSessions(sessions.filter(session => session.id !== selectedPendingSession.id));
                      setIsPendingSessionModalOpen(false);
                      setSelectedPendingSession(null);
                      toast.success("Session marked as invalid");
                    }}
                    className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white py-2.5 md:py-3 rounded-lg md:rounded-xl transition-colors font-semibold text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2"
                  >
                    <X className="size-4 md:size-5" />
                    Mark as Invalid
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}