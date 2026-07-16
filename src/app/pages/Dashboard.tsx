import { Link, useNavigate, useLocation } from "react-router";
import { Users, UserPlus, UserCheck, Calendar, DollarSign, Video, FileText, ChevronRight, CheckCircle2, Clock, MessageSquare, ArrowRight, User, CreditCard, TrendingUp, TrendingDown, Sparkles, Gift, HelpCircle, CalendarCheck, ChevronDown, ChevronUp, AlertCircle, Shield, X, MessageCircle, MapPin, Megaphone, Target, Pencil, Check, Mic, Pill, Lock, Plus, ClipboardList, StickyNote, Crown, CheckSquare, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { usePlanMode } from "../contexts/PlanModeContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { AddClientModal } from "../components/AddClientModal";
import { AddSessionNoteModal } from "../components/AddSessionNoteModal";
import { AddPrescriptionModal } from "../components/AddPrescriptionModal";

type SessionMode = "online" | "in-person";

const CLIENTS = [
  "Rachit Dubey",
  "Sarah Jenkins",
  "Michael Chen",
  "Emma Thompson",
  "David Martinez",
];

function QuickRecordCard() {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState("");
  const [sessionMode, setSessionMode] = useState<SessionMode>("online");
  const [meetLink, setMeetLink] = useState("");
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const clientRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (clientRef.current && !clientRef.current.contains(e.target as Node)) setShowClientDropdown(false);
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) setShowModeDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAddClient = (client: { firstName: string; lastName: string; email: string; service: string }) => {
    const fullName = `${client.firstName} ${client.lastName}`;
    setSelectedClient(fullName);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-[640px] mx-auto mt-4"
      >
        <div className="bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-[20px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-5">
            <Mic className="size-12 text-[#00c0ff] mb-3" />
            <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-2">
              Start a new session
            </h2>
            <p className="text-[13px] text-[#94A3B8] text-center">
              Select your client and session mode to begin
            </p>
          </div>

        {/* Inputs Row */}
        <div className="flex gap-2 mb-4">
          {/* Client Selector */}
          <div ref={clientRef} className="relative flex-1">
            <button
              onClick={() => { setShowClientDropdown(!showClientDropdown); }}
              className="w-full h-11 bg-[#F8FAFC] dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl pl-3.5 pr-9 text-sm text-left flex items-center justify-between hover:border-[#00c0ff] transition-colors focus:outline-none focus:border-[#00c0ff] focus:shadow-[0_0_0_3px_rgba(0,192,255,0.12)]"
            >
              <span className={selectedClient ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                {selectedClient || "Search or select client"}
              </span>
              <ChevronDown className="size-4 text-gray-400 flex-shrink-0" />
            </button>
            {showClientDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-xl shadow-lg z-20 overflow-hidden">
                <input
                  autoFocus
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search clients..."
                  className="w-full h-9 px-3 text-[12px] border-b border-[#F1F5F9] dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                />
                <div className="max-h-[200px] overflow-y-auto">
                  {CLIENTS.filter(c => c.toLowerCase().includes(clientSearch.toLowerCase())).map((c) => (
                    <button
                      key={c}
                      onClick={() => { setSelectedClient(c); setShowClientDropdown(false); setClientSearch(""); }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#f3faff] dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="border-t border-[#E2E8F0] dark:border-gray-700"></div>
                <button
                  onClick={() => { setShowAddClientModal(true); setShowClientDropdown(false); setClientSearch(""); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#f0fbff] dark:hover:bg-gray-700 transition-colors text-[#00c0ff] font-bold flex items-center gap-2"
                >
                  <Plus className="size-4" />
                  Add new client
                </button>
              </div>
            )}
          </div>

          {/* Session Mode */}
          <div ref={modeRef} className="relative w-[130px]">
            <button
              onClick={() => { setShowModeDropdown(!showModeDropdown); setShowClientDropdown(false); }}
              className="w-full h-11 bg-[#F8FAFC] dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl px-3 text-sm flex items-center justify-between hover:border-[#00c0ff] transition-colors text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#00c0ff] focus:shadow-[0_0_0_3px_rgba(0,192,255,0.12)]"
            >
              <div className="flex items-center gap-1.5">
                {sessionMode === "online"
                  ? <Video className="size-3.5 text-[#00c0ff] flex-shrink-0" />
                  : <Users className="size-3.5 text-[#64748B] flex-shrink-0" />
                }
                <span className="text-[13px]">
                  {sessionMode === "online" ? "Online" : "In-Person"}
                </span>
              </div>
              <ChevronDown className="size-4 text-gray-400 flex-shrink-0" />
            </button>
            {showModeDropdown && (
              <div className="absolute top-full right-0 mt-1 w-[140px] bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                {([
                  { value: "online" as const,    label: "Online",    icon: <Video className="size-4 text-[#00c0ff]" /> },
                  { value: "in-person" as const, label: "In-Person", icon: <Users className="size-4 text-[#64748B]" /> },
                ]).map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => { setSessionMode(value); setShowModeDropdown(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${
                      sessionMode === value
                        ? "text-[#043570] bg-[#f3faff] dark:bg-gray-700 dark:text-[#00c0ff]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Meet Link — shown only for online sessions */}
        {sessionMode === "online" && (
          <div className="mb-4">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                <Video className="size-4 text-[#00c0ff]" />
              </div>
              <input
                type="url"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                placeholder="Paste meeting link (Google Meet, Zoom, Teams...)"
                className="w-full h-11 bg-[#F8FAFC] dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl pl-9 pr-4 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 hover:border-[#00c0ff] focus:outline-none focus:border-[#00c0ff] focus:shadow-[0_0_0_3px_rgba(0,192,255,0.12)] transition-colors"
              />
              {meetLink && (
                <button
                  onClick={() => setMeetLink("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center hover:text-gray-600 text-gray-400 transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            {meetLink && !meetLink.startsWith("http") && (
              <p className="text-[11px] text-amber-500 mt-1.5 px-1">Please paste a valid link starting with https://</p>
            )}
          </div>
        )}

        {/* Start Recording Button */}
        <button
          onClick={() => navigate("/record-session", {
            state: {
              clientName: selectedClient,
              sessionMode,
              meetLink: sessionMode === "online" ? meetLink : undefined,
            }
          })}
          className="w-full h-[52px] bg-[#043570] hover:bg-[#032a5a] hover:scale-[1.005] text-white font-bold rounded-[14px] transition-all flex items-center justify-center gap-2 text-[15px]"
        >
          {sessionMode === "online" ? "🎤 Start Recording" : "📝 Start Session"}
        </button>
      </div>
    </motion.div>

    <AddClientModal
      isOpen={showAddClientModal}
      onClose={() => setShowAddClientModal(false)}
      onAddClient={handleAddClient}
    />
    </>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { planMode } = usePlanMode();
  const { isCurrentUserAdmin, providers, currentProviderId } = usePartnerDashboard();
  const currentProvider = providers.find((p) => p.id === currentProviderId);
  const isTranscriberOnly = planMode === "transcriber-only";
  const pendingRequests = isCurrentUserAdmin ? 30 : 6;
  const pendingMessages = isCurrentUserAdmin ? 25 : 10;
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isSessionNoteModalOpen, setIsSessionNoteModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const adminStats = {
    activeClients: "118",
    sessionsThisMonth: "342",
    revenueMtd: "$48,750",
    avgDuration: "45 min",
    revenueTrend: [
      { month: "Jan", revenue: 24000 },
      { month: "Feb", revenue: 31000 },
      { month: "Mar", revenue: 28000 },
      { month: "Apr", revenue: 36000 },
      { month: "May", revenue: 42000 },
      { month: "Jun", revenue: 48750 },
    ],
    sessionsByType: [
      { name: "Video", value: 180 },
      { name: "In-Person", value: 112 },
      { name: "Chat", value: 50 },
    ],
    totalSessions: 342,
    sessionDistribution: [
      { label: "Video", count: 180, pct: "53%", color: "#00c0ff" },
      { label: "In-Person", count: 112, pct: "33%", color: "#6366f1" },
      { label: "Chat", count: 50, pct: "14%", color: "#10b981" },
    ],
    recentActivities: [
      { text: "Roster status updated: Dr. Priya Sharma verified", time: "10 min ago", icon: UserCheck, iconBg: "bg-blue-100 dark:bg-blue-900/20", iconColor: "text-blue-600 dark:text-blue-400" },
      { text: "New invite sent to Dr. David Kim", time: "2 hrs ago", icon: Clock, iconBg: "bg-amber-100 dark:bg-amber-900/20", iconColor: "text-amber-600 dark:text-amber-400" },
      { text: "Establishment details modified by Dr. Admin Owner", time: "5 hrs ago", icon: Shield, iconBg: "bg-purple-100 dark:bg-purple-900/20", iconColor: "text-purple-600 dark:text-purple-400" },
    ]
  };

  const personalStats = {
    activeClients: "24",
    sessionsThisMonth: "38",
    revenueMtd: "$4,820",
    avgDuration: "47 min",
    revenueTrend: [
      { month: "Jan", revenue: 2400 },
      { month: "Feb", revenue: 3100 },
      { month: "Mar", revenue: 2800 },
      { month: "Apr", revenue: 3600 },
      { month: "May", revenue: 4200 },
      { month: "Jun", revenue: 4820 },
    ],
    sessionsByType: [
      { name: "Video", value: 18 },
      { name: "In-Person", value: 12 },
      { name: "Chat", value: 8 },
    ],
    totalSessions: 38,
    sessionDistribution: [
      { label: "Video", count: 18, pct: "47%", color: "#00c0ff" },
      { label: "In-Person", count: 12, pct: "32%", color: "#6366f1" },
      { label: "Chat", count: 8, pct: "21%", color: "#10b981" },
    ],
    recentActivities: [
      { text: "Session completed with Rachit Dubey", time: "2 min ago", icon: CheckCircle2, iconBg: "bg-emerald-100 dark:bg-emerald-900/30", iconColor: "text-emerald-600 dark:text-emerald-400" },
      { text: "New client request from Jessica Adams", time: "1 hr ago", icon: UserPlus, iconBg: "bg-blue-100 dark:bg-blue-900/20", iconColor: "text-blue-600 dark:text-blue-400" },
      { text: "Invoice #16065 paid · $85.00", time: "3 hrs ago", icon: CreditCard, iconBg: "bg-amber-100 dark:bg-amber-900/20", iconColor: "text-amber-600 dark:text-amber-400" },
    ]
  };

  const stats = isCurrentUserAdmin ? adminStats : personalStats;

  const upcomingAppointments = [
    {
      id: "1",
      clientName: "Rachit Dubey",
      date: "Mar 12",
      time: "10:00 AM",
      duration: "30 min",
      type: "Therapy Session",
      sessionMode: "video",
      avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIyMzg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "2",
      clientName: "Sarah Jenkins",
      date: "Mar 12",
      time: "02:00 PM",
      duration: "45 min",
      type: "Anxiety Management",
      sessionMode: "chat",
      avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MTgyMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "3",
      clientName: "Michael Chen",
      date: "Mar 13",
      time: "03:00 PM",
      duration: "45 min",
      type: "Depression Support",
      sessionMode: "video",
      avatar: "https://images.unsplash.com/photo-1750741268857-7e44510f867d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGFzaWFuJTIwbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MjM1Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const pendingClientRequests = [
    {
      id: "1",
      clientName: "Jessica Adams",
      requestType: "Therapy for Depression, Stress, & OCD",
      time: "2 hours ago",
      language: "English",
      location: "United States",
      experience: "1 year",
      amount: "$60/session",
      sessionMode: "video",
      avatar: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJsb25kZSUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzNTY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "2",
      clientName: "Robert Miller",
      requestType: "Couple Therapy for Relationship Recovery",
      time: "4 hours ago",
      language: "English",
      location: "Canada",
      experience: "2 years",
      amount: "$75/session",
      sessionMode: "chat",
      avatar: "https://images.unsplash.com/photo-1548600983-a171dced97f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIwNjYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "3",
      clientName: "Amanda White",
      requestType: "Therapy for Teen ADHD",
      time: "6 hours ago",
      language: "Spanish",
      location: "United States",
      experience: "6 months",
      amount: "$50/session",
      sessionMode: "video",
      avatar: "https://images.unsplash.com/photo-1773335954335-47d1486f2e71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJyb3duJTIwaGFpciUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzNTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const pendingSessionRequests = [
    {
      id: "1",
      clientName: "Emma Thompson",
      sessionType: "Reschedule Request",
      date: "Mar 13",
      time: "02:00 PM",
      duration: "45 min",
      sessionMode: "chat",
      avatar: "https://images.unsplash.com/photo-1740746963134-0fddb2027589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRoZXJhcGlzdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIxNzQzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "2",
      clientName: "David Martinez",
      sessionType: "New Session Request",
      date: "Mar 13",
      time: "03:30 PM",
      duration: "60 min",
      sessionMode: "video",
      avatar: "https://images.unsplash.com/photo-1741484179101-be16307578db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoaXNwYW5pYyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzNTY3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "3",
      clientName: "Sophie Anderson",
      sessionType: "Follow-up Request",
      date: "Mar 14",
      time: "10:00 AM",
      duration: "45 min",
      sessionMode: "video",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJydW5ldHRlJTIwaGVhZHNob3R8ZW58MXx8fHwxNzQyNzg1NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen px-1 py-2 md:p-6">
{/* Welcome */}
      <div className="mb-6 md:mb-8">
        {isTranscriberOnly ? (
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              Good morning, Alex
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Ready for your next session?
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-3 md:gap-4">
            <div className="size-9 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800">
              <Users className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                Dashboard
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Welcome back! Here's what's happening with your practice today
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Your Rating Card */}
      {!isTranscriberOnly && currentProvider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 flex items-center gap-4">
            <div className="size-11 rounded-2xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/20">
              <Star className="size-5 text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">Your rating</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {currentProvider.rating.toFixed(1)}
                <span className="text-xs font-normal text-gray-400 ml-1">/ 5.0</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* AI Transcriber: Quick Record Card + Quick Action Banner */}
      {isTranscriberOnly && (
        <>
          <QuickRecordCard />

          {/* Quick Action Banner */}
          {(() => {
            const rxPref = localStorage.getItem("ai_scribe_prescription_pref");
            const showPrescriptionButton = rxPref === "yes" || rxPref === null;
            return (
              <div className="max-w-[640px] mx-auto mt-4 flex gap-3">
                <button
                  onClick={() => navigate("/session-notes", { state: { openAddNotes: true } })}
                  className={`${showPrescriptionButton ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 h-11 bg-white dark:bg-gray-800 border-[1.5px] border-[#C7D2FE] dark:border-blue-700 rounded-[12px] text-[13px] font-semibold text-[#2563EB] dark:text-blue-400 hover:bg-[#EEF2FF] dark:hover:bg-blue-900/20 hover:border-[#818CF8] transition-all active:scale-95`}
                >
                  <ClipboardList className="size-4" />
                  Create Session Note
                </button>
                {showPrescriptionButton && (
                  <button
                    onClick={() => navigate("/prescriptions", { state: { openAddPrescription: true } })}
                    className="flex-1 flex items-center justify-center gap-2 h-11 bg-white dark:bg-gray-800 border-[1.5px] border-[#FBCFE8] dark:border-pink-700 rounded-[12px] text-[13px] font-semibold text-[#DB2777] dark:text-pink-400 hover:bg-[#FDF2F8] dark:hover:bg-pink-900/20 hover:border-[#F9A8D4] transition-all active:scale-95"
                  >
                    <Pill className="size-4" />
                    Create Prescription
                  </button>
                )}
              </div>
            );
          })()}
        </>
      )}

      {/* Full EHR: Action Center */}
      {!isTranscriberOnly && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-5 md:py-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="size-11 md:size-12 bg-gradient-to-br from-[#00c0ff] to-[#0099cc] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00c0ff]/20">
                <AlertCircle className="size-5 md:size-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[16px] md:text-[18px] font-bold text-[#020817] dark:text-white">Action Center</h2>
                  <span className="px-2 py-0.5 bg-[#00c0ff] text-white text-[11px] font-bold rounded-full">
                    {pendingMessages + upcomingAppointments.length + pendingSessionRequests.length + pendingClientRequests.length} pending
                  </span>
                </div>
                <p className="text-[12px] text-[#64748B] hidden sm:block">Tap a category to review</p>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-100 dark:border-gray-700/60 mx-4 md:mx-6" />

          {/* Tab Pills */}
          <div className="px-5 md:px-7 pt-4 pb-4 flex flex-wrap gap-2.5">
            {[
              { id: "messages", label: "Messages", count: pendingMessages, icon: MessageSquare, activeBg: "bg-[#10b981]", borderColor: "border-[#10b981]/40", activeText: "text-white", inactiveText: "text-[#10b981]" },
              { id: "appointments", label: "Appointments", count: upcomingAppointments.length, icon: Calendar, activeBg: "bg-[#00c0ff]", borderColor: "border-[#00c0ff]/40", activeText: "text-white", inactiveText: "text-[#00c0ff]" },
              { id: "session-requests", label: "Session Requests", count: pendingSessionRequests.length, icon: Video, activeBg: "bg-[#06B6D4]", borderColor: "border-[#06B6D4]/40", activeText: "text-white", inactiveText: "text-[#06B6D4]" },
              { id: "client-requests", label: "Client Requests", count: pendingClientRequests.length, icon: Users, activeBg: "bg-[#EC4899]", borderColor: "border-[#EC4899]/40", activeText: "text-white", inactiveText: "text-[#EC4899]" },
            ].map(({ id, label, count, icon: Icon, activeBg, borderColor, activeText, inactiveText }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(isActive ? null : id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] tracking-[0.01em] font-semibold transition-all ${
                    isActive
                      ? `${activeBg} border-transparent ${activeText} shadow-sm`
                      : `bg-white dark:bg-gray-800 ${borderColor} ${inactiveText} hover:bg-gray-50 dark:hover:bg-gray-700`
                  }`}
                >
                  <Icon className="size-3.5" />
                  {label}
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${isActive ? "bg-white/25" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Drawers */}
          {/* Messages Drawer */}
          <div
            style={{ maxHeight: activeTab === "messages" ? "360px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease", borderTop: activeTab === "messages" ? "1px solid #f1f5f9" : "none" }}
          >
            <div className="px-5 md:px-7 pb-5 overflow-y-auto" style={{ maxHeight: "360px" }}>
              <Link to="/chat">
                <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl px-2 -mx-2 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="size-11 bg-[#10b981] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="size-4 text-white" />
                    </div>
                    <div>
                      <span className="text-[14px] font-semibold text-[#059669]">Unread Messages</span>
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="px-2 py-0.5 bg-[#10b981] text-white text-[11px] font-bold rounded-full">{pendingMessages}</span>
                        <span className="text-[12px] text-[#64748B]">new messages waiting</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-[#059669]">
                    View <ChevronRight className="size-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Appointments Drawer */}
          <div
            style={{ maxHeight: activeTab === "appointments" ? "360px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease", borderTop: activeTab === "appointments" ? "1px solid #f1f5f9" : "none" }}
          >
            <div className="px-5 md:px-7 pb-5 overflow-y-auto" style={{ maxHeight: "360px" }}>
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      <img src={appointment.avatar} alt={appointment.clientName} className="size-11 rounded-xl object-cover" />
                      <div className="absolute -bottom-1 -right-1 size-4 bg-[#00c0ff] rounded-full flex items-center justify-center ring-1 ring-white dark:ring-gray-800">
                        {appointment.sessionMode === "video" ? <Video className="size-2.5 text-white" /> : <MessageSquare className="size-2.5 text-white" />}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-semibold text-[#020817] dark:text-white">{appointment.clientName}</span>
                        <span className="text-[11px] text-[#2563EB] bg-[#EEF2FF] dark:bg-blue-900/20 px-2 py-0.5 rounded-md font-medium">{appointment.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[11px] text-[#0EA5E9] bg-[#F0F9FF] dark:bg-cyan-900/20 px-1.5 py-0.5 rounded font-semibold">{appointment.date}</span>
                        <span className="text-[11px] text-[#F97316] bg-[#FFF7ED] dark:bg-orange-900/20 px-1.5 py-0.5 rounded font-semibold">{appointment.time}</span>
                        <span className="text-[11px] text-[#64748B] bg-gray-50 dark:bg-gray-700/50 px-1.5 py-0.5 rounded font-medium">{appointment.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0 ml-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white rounded-lg text-[12px] font-semibold transition-all shadow-sm">
                      <Video className="size-3" />
                      Join Now
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-[#2563EB] text-gray-600 hover:text-[#2563EB] rounded-lg text-[12px] font-semibold transition-all">
                      <Calendar className="size-3" />
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Requests Drawer */}
          <div
            style={{ maxHeight: activeTab === "session-requests" ? "360px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease", borderTop: activeTab === "session-requests" ? "1px solid #f1f5f9" : "none" }}
          >
            <div className="px-5 md:px-7 pb-5 overflow-y-auto" style={{ maxHeight: "360px" }}>
              {pendingSessionRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      <img src={request.avatar} alt={request.clientName} className="size-11 rounded-xl object-cover" />
                      <div className="absolute -bottom-1 -right-1 size-4 bg-[#06B6D4] rounded-full flex items-center justify-center ring-1 ring-white dark:ring-gray-800">
                        {request.sessionMode === "video" ? <Video className="size-2.5 text-white" /> : <MessageSquare className="size-2.5 text-white" />}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-semibold text-[#020817] dark:text-white">{request.clientName}</span>
                        <span className="text-[11px] text-[#2563EB] bg-[#EEF2FF] dark:bg-blue-900/20 px-2 py-0.5 rounded-md font-medium">{request.sessionType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[11px] text-[#0EA5E9] bg-[#F0F9FF] dark:bg-cyan-900/20 px-1.5 py-0.5 rounded font-semibold">{request.date}</span>
                        <span className="text-[11px] text-[#F97316] bg-[#FFF7ED] dark:bg-orange-900/20 px-1.5 py-0.5 rounded font-semibold">{request.time}</span>
                        <span className="text-[11px] text-[#64748B] bg-gray-50 dark:bg-gray-700/50 px-1.5 py-0.5 rounded font-medium">{request.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0 ml-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#15a65e] hover:bg-[#128a4e] text-white rounded-lg text-[12px] font-semibold transition-all shadow-sm">
                      <CheckCircle2 className="size-3" />
                      Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-[#EF4444] hover:bg-[#EF4444]/5 text-[#EF4444] rounded-lg text-[12px] font-semibold transition-all">
                      <X className="size-3" />
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Requests Drawer */}
          <div
            style={{ maxHeight: activeTab === "client-requests" ? "360px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease", borderTop: activeTab === "client-requests" ? "1px solid #f1f5f9" : "none" }}
          >
            <div className="px-5 md:px-7 pb-5 overflow-y-auto" style={{ maxHeight: "360px" }}>
              {pendingClientRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      <img src={request.avatar} alt={request.clientName} className="size-11 rounded-xl object-cover" />
                      <div className="absolute -bottom-1 -right-1 size-4 bg-[#EC4899] rounded-full flex items-center justify-center ring-1 ring-white dark:ring-gray-800">
                        {request.sessionMode === "video" ? <Video className="size-2.5 text-white" /> : <MessageSquare className="size-2.5 text-white" />}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-semibold text-[#020817] dark:text-white">{request.clientName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-[11px] text-[#64748B] truncate max-w-[180px]">{request.requestType}</span>
                        <span className="text-[#CBD5E1]">·</span>
                        <span className="text-[11px] text-[#64748B]">{request.location}</span>
                        <span className="text-[#CBD5E1]">·</span>
                        <span className="text-[11px] font-semibold text-[#EC4899]">{request.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0 ml-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#15a65e] hover:bg-[#128a4e] text-white rounded-lg text-[12px] font-semibold transition-all shadow-sm">
                      <CheckCircle2 className="size-3" />
                      Accept
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-600 rounded-lg text-[12px] font-semibold transition-all">
                      <FileText className="size-3" />
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Full EHR: Boost Your Profile Banner - Routes to Tasks */}
      {!isTranscriberOnly && (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mb-8"
      >
        <Link to="/tasks">
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl px-4 py-4 md:px-8 md:py-6 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all cursor-pointer overflow-hidden group"
          >
            {/* Decorative elements - Hidden on mobile */}
            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-[#10b981]/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-[#10b981]/3 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
              {/* Left Section - Icon and Text */}
              <div className="flex items-start md:items-center gap-3 md:gap-5">
                <div className="size-12 md:size-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[#10b981]/20">
                  <Target className="size-6 md:size-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start md:items-center gap-2 md:gap-3 mb-1 md:mb-1.5">
                    <h3 className="text-[15px] md:text-[18px] font-bold text-[#020817] dark:text-white leading-tight">
                      Boost Your Profile. Get More Clients.
                    </h3>
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] md:text-xs font-bold rounded-full border border-[#10b981]/20 flex-shrink-0">
                      NEW
                    </span>
                  </div>
                  <p className="text-[12px] md:text-[14px] text-gray-600 dark:text-gray-400 font-medium leading-snug">
                    Steps to increase visibility & unlock premium access
                  </p>
                </div>
              </div>
              
              {/* Button - Full width on mobile */}
              <div className="w-full md:w-auto">
                <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white rounded-xl font-bold md:font-semibold transition-all shadow-md shadow-[#10b981]/25 hover:shadow-lg hover:shadow-[#10b981]/30 active:scale-95">
                  <span className="text-[13px] md:text-sm">Learn More</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
      )}

      {/* Full EHR: KPI Analytics Section */}
      {!isTranscriberOnly && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6"
        >
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-[16px] md:text-xl font-semibold text-gray-900 dark:text-white">Practice Overview</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your key metrics at a glance</p>
          </div>

          {/* KPI Row 1 — Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: Users, color: "bg-cyan-100 dark:bg-cyan-900/30", iconColor: "text-cyan-600 dark:text-cyan-400", value: stats.activeClients, label: "Active Clients", trend: "+12%", positive: true },
              { icon: Calendar, color: "bg-indigo-100 dark:bg-indigo-900/30", iconColor: "text-indigo-600 dark:text-indigo-400", value: stats.sessionsThisMonth, label: "Sessions This Month", trend: "+8%", positive: true },
              { icon: DollarSign, color: "bg-emerald-100 dark:bg-emerald-900/30", iconColor: "text-emerald-600 dark:text-emerald-400", value: stats.revenueMtd, label: "Revenue (MTD)", trend: "+15%", positive: true },
              { icon: Clock, color: "bg-amber-100 dark:bg-amber-900/30", iconColor: "text-amber-600 dark:text-amber-400", value: stats.avgDuration, label: "Avg Session Duration", trend: "-3%", positive: false },
            ].map(({ icon: Icon, color, iconColor, value, label, trend, positive }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                <div className={`size-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`size-5 ${iconColor}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-0.5">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{label}</div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                  {positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                  {trend} vs last month
                </div>
              </div>
            ))}
          </div>

          {/* KPI Row 2 — Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Chart A — Revenue Trend */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last 6 months</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">+15% this month</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stats.revenueTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Line type="monotone" dataKey="revenue" stroke="#00c0ff" strokeWidth={2.5} dot={{ r: 4, fill: "#00c0ff", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Chart B — Session Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sessions by Type</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie data={stats.sessionsByType} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0}>
                        <Cell fill="#00c0ff" />
                        <Cell fill="#6366f1" />
                        <Cell fill="#10b981" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.totalSessions}</div>
                      <div className="text-[10px] text-gray-400">total</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 flex-1">
                  {stats.sessionDistribution.map(({ label, count, pct, color }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="size-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-xs text-gray-600 dark:text-gray-300 flex-1">{label}</span>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">{count}</span>
                      <span className="text-xs text-gray-400 w-8 text-right">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* KPI Row 4 — Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h3>
            <div>
              {stats.recentActivities.map(({ icon: Icon, iconBg, iconColor, text, time }) => (
                <div key={text} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl px-3 -mx-3 transition-colors cursor-pointer">
                  <div className={`size-8 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`size-4 ${iconColor}`} />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{text}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
