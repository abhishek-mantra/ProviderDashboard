import { useState, useMemo } from "react";
import { Search, MoreVertical, Paperclip, Send, ChevronRight, Calendar as CalendarIcon, BarChart3, Video, MessageSquare, AlertCircle, CreditCard, Info, X, Sparkles, Clock, CheckCircle, ShoppingCart, DollarSign, FileText, Menu, Users, Calendar, CheckSquare, User } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { AddAppointmentModal } from "../components/AddAppointmentModal";
import imgDrBrown from "figma:asset/7579eed6f4dcdb107827ab7fb4cdfcb323906d2d.png";
import imgDrWhite from "figma:asset/679e9836b4f1591ddd439c69415714ce34a3dac6.png";
import imgCoachAlex from "figma:asset/f73ec4325655e39e869b83c13a845fee29b5a017.png";
import imgDrGreen from "figma:asset/cd09f74929e7b366f62ea11ed260a429ff8ba485.png";
import imgLisa from "figma:asset/7d9d0c9536bdb83bedb045e9c26ab151d842cab1.png";

interface Conversation {
  id: string;
  clientId?: string;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unread: boolean;
  online?: boolean;
  isActive?: boolean;
  showAction?: boolean;
  actionText?: string;
  credits?: number;
}

interface Message {
  id: string;
  sender: "client" | "expert";
  text: string;
  timestamp: string;
}

export function Chat() {
  const navigate = useNavigate();
  const { canViewClientClinicalContent } = usePartnerDashboard();
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSessionTypeModalOpen, setIsSessionTypeModalOpen] = useState(false);
  const [isVideoSessionModalOpen, setIsVideoSessionModalOpen] = useState(false);
  const [isPaymentLinkModalOpen, setIsPaymentLinkModalOpen] = useState(false);
  const [isNoCreditsModalOpen, setIsNoCreditsModalOpen] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [addAINotetaker, setAddAINotetaker] = useState(true);
  const [takeNotesDuringMeeting, setTakeNotesDuringMeeting] = useState(false);
  const [sessionNotes, setSessionNotes] = useState("");
  const [notesAutoSaved, setNotesAutoSaved] = useState(false);
  const [isAutoResponsesModalOpen, setIsAutoResponsesModalOpen] = useState(false);
  const [conversationMessages, setConversationMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        sender: "client",
        text: "Hi Sarah, how did your breathing exercises go this week?",
        timestamp: "10:30 AM",
      },
      {
        id: "2",
        sender: "expert",
        text: "They've been really helpful! I've been practicing them every morning.",
        timestamp: "10:32 AM",
      },
      {
        id: "3",
        sender: "client",
        text: "That's wonderful to hear! Keep up the great work. How are you feeling overall?",
        timestamp: "10:35 AM",
      },
      {
        id: "4",
        sender: "expert",
        text: "Much better, actually. The anxiety has been more manageable.",
        timestamp: "10:38 AM",
      },
      {
        id: "5",
        sender: "client",
        text: "I'm so glad to hear that. Remember, consistency is key. Keep practicing daily.",
        timestamp: "10:40 AM",
      },
      {
        id: "6",
        sender: "expert",
        text: "Thank you so much for the session today!",
        timestamp: "12:30 PM",
      },
    ],
    "2": [
      {
        id: "1",
        sender: "client",
        text: "Hello Michael! How are you feeling today?",
        timestamp: "10:30 AM",
      },
      {
        id: "2",
        sender: "expert",
        text: "Hi! I've been following the program for a week now and I'm feeling great.",
        timestamp: "10:32 AM",
      },
      {
        id: "3",
        sender: "client",
        text: "That's wonderful! Tell me more about your experience this week.",
        timestamp: "10:35 AM",
      },
      {
        id: "4",
        sender: "expert",
        text: "The breathing exercises have really helped with my stress levels.",
        timestamp: "10:38 AM",
      },
      {
        id: "5",
        sender: "client",
        text: "That's great progress! Keep up with the breathing exercises.",
        timestamp: "10:45 AM",
      },
    ],
    "3": [
      {
        id: "1",
        sender: "client",
        text: "Hi Emily, I've reviewed your recent test results.",
        timestamp: "9:00 AM",
      },
      {
        id: "2",
        sender: "expert",
        text: "Great! What do they show?",
        timestamp: "9:15 AM",
      },
      {
        id: "3",
        sender: "client",
        text: "Your lab results look good. Let's discuss them in detail during our next session.",
        timestamp: "9:20 AM",
      },
      {
        id: "4",
        sender: "expert",
        text: "That's a relief! When should we schedule the follow-up?",
        timestamp: "9:25 AM",
      },
      {
        id: "5",
        sender: "client",
        text: "How about next Tuesday at 2 PM? Does that work for you?",
        timestamp: "9:30 AM",
      },
    ],
    "4": [
      {
        id: "1",
        sender: "client",
        text: "Hi Alex! I've created a customized wellness plan for you. Check it out!",
        timestamp: "Yesterday",
      },
      {
        id: "2",
        sender: "expert",
        text: "Thanks Alex! Can we also enable the AI Notetaker for our upcoming consultation?",
        timestamp: "Yesterday",
      },
      {
        id: "3",
        sender: "client",
        text: "Yes, absolutely! AI Notetaker is active for all our sessions. It will automatically record, transcribe, and generate clinical notes.",
        timestamp: "Yesterday",
      },
    ],
  });

  const conversations: Conversation[] = [
    {
      id: "1",
      clientId: "1",
      name: "Sarah Jenkins",
      role: "Anxiety Management",
      lastMessage: "Thank you so much for the session today!",
      timestamp: "2 hrs ago",
      avatar: "SJ",
      unread: false,
      online: true,
      isActive: true,
      credits: 3,
    },
    {
      id: "2",
      clientId: "2",
      name: "Dr. Michael Brown",
      role: "Therapist",
      lastMessage: "That's great progress! Keep up with the breathing exercises.",
      timestamp: "10:45 AM",
      avatar: imgDrBrown,
      unread: true,
      online: true,
      credits: 0,
    },
    {
      id: "3",
      clientId: "3",
      name: "Dr. Emily White",
      role: "Medical Doctor",
      lastMessage: "Your lab results look good. Let's discuss them.",
      timestamp: "4 days ago",
      avatar: imgDrWhite,
      unread: false,
      online: false,
      credits: 2,
    },
    {
      id: "4",
      clientId: "4",
      name: "Coach Alex Turner",
      role: "Wellness Coach",
      lastMessage: "You are out of credits for this client.",
      timestamp: "Yesterday",
      avatar: imgCoachAlex,
      unread: false,
      online: true,
      credits: 0,
    },
    {
      id: "5",
      clientId: "5",
      name: "Dr. Rachel Green",
      role: "Sexologist",
      lastMessage: "Get started",
      timestamp: "",
      avatar: imgDrGreen,
      unread: false,
      online: false,
      showAction: true,
      actionText: "Get started",
    },
    {
      id: "6",
      clientId: "6",
      name: "Lisa Anderson",
      role: "Nutritionist",
      lastMessage: "Remember to track your meals this week.",
      timestamp: "3 days ago",
      avatar: imgLisa,
      unread: false,
      online: true,
    },
  ];

  const filteredConversations = useMemo(
    () =>
      conversations.filter((conv) =>
        (conv.clientId ? canViewClientClinicalContent(conv.clientId) : true) &&
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [conversations, searchQuery, canViewClientClinicalContent]
  );

  const selectedConv = filteredConversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  const handleSendPaymentLink = () => {
    if (!selectedConversation) return;

    // Get current timestamp
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    // Create payment link message
    const paymentMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "client",
      text: "Buy Plans - https://therapists.therapymantra.co/list/therapist/130405/john-wilson?pay=yes",
      timestamp: timestamp,
    };

    // Add message to the conversation
    setConversationMessages(prev => ({
      ...prev,
      [selectedConversation]: [
        ...(prev[selectedConversation] || []),
        paymentMessage
      ]
    }));
  };

  const handleScheduleAppointment = (appointment: {
    clientId: string;
    clientName: string;
    service: string;
    date: string;
    time: string;
    sessionType: "video" | "chat" | "in-person";
    location: "online" | "offline";
  }) => {
    console.log("Appointment scheduled:", appointment);
    // Here you would typically save the appointment to your backend
  };

  return (
    <div className="-mx-6 -my-8 md:h-[calc(100vh-73px)] h-[calc(100vh-57px)] bg-[#F8FAFC] dark:bg-gray-900 flex">
      {/* Middle Panel - Conversations List */}
      <div className={`w-full md:w-[479px] bg-white dark:bg-gray-800 border-r border-[#e2ecf5] dark:border-gray-700 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="px-3 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4">
          {/* Title */}
          <div className="flex items-start gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
              <MessageSquare className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1 truncate">Messages</h1>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    Chat with your clients and care team
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3 md:mb-4">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[38px] md:h-[42px] pl-8 md:pl-10 pr-3 md:pr-4 bg-white dark:bg-gray-700 border border-[#e2e8f0] dark:border-gray-600 rounded-lg md:rounded-xl text-xs md:text-sm text-[#0f172b] dark:text-white placeholder-[#94a3b8] dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent"
            />
            <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 size-4 md:size-[18px] text-[#94a3b8] dark:text-gray-400" />
          </div>

          {/* Active/Inactive Tabs */}
          <div className="flex gap-6 md:gap-8 border-b border-[#e2e8f0] dark:border-gray-700">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-2 md:pb-3 text-xs md:text-sm font-semibold transition-colors relative ${
                activeTab === "active"
                  ? "text-[#00c0ff]"
                  : "text-[#94a3b8] dark:text-gray-400 hover:text-[#64748b] dark:hover:text-gray-300"
              }`}
            >
              Active
              {activeTab === "active" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`pb-2 md:pb-3 text-xs md:text-sm font-semibold transition-colors relative ${
                activeTab === "inactive"
                  ? "text-[#00c0ff]"
                  : "text-[#94a3b8] dark:text-gray-400 hover:text-[#64748b] dark:hover:text-gray-300"
              }`}
            >
              Inactive
              {activeTab === "inactive" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
              )}
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2 md:px-3 pt-2">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full rounded-lg md:rounded-xl p-2.5 md:p-3 flex items-center gap-2.5 md:gap-3 transition-all mb-1 ${
                selectedConversation === conv.id
                  ? "bg-[#e0f2fe] dark:bg-gray-700/50"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {typeof conv.avatar === "string" && conv.avatar.length === 2 ? (
                  <div className="size-9 md:size-11 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm">
                    {conv.avatar}
                  </div>
                ) : (
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="size-9 md:size-11 rounded-full object-cover"
                  />
                )}
                {conv.online !== undefined && (
                  <div
                    className={`absolute bottom-0 right-0 size-2.5 md:size-3 rounded-full border-2 border-white dark:border-gray-800 ${
                      conv.online ? "bg-[#10b981]" : "bg-[#64748b]"
                    }`}
                  ></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-start justify-between mb-0.5">
                  <h3 className="text-xs md:text-sm font-semibold text-[#0f172a] dark:text-white truncate">
                    {conv.name}
                  </h3>
                  {conv.timestamp && (
                    <span className="text-[10px] md:text-xs text-[#94a3b8] dark:text-gray-400 flex-shrink-0 ml-2">
                      {conv.timestamp}
                    </span>
                  )}
                </div>
                {conv.showAction ? (
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] md:text-xs font-medium text-[#64748b] dark:text-gray-400 truncate">
                      {conv.actionText}
                    </p>
                    <ChevronRight className="size-3 md:size-3.5 text-[#64748b] dark:text-gray-400 flex-shrink-0" />
                  </div>
                ) : (
                  <p className="text-[10px] md:text-xs text-[#64748b] dark:text-gray-400 truncate">
                    {conv.lastMessage}
                  </p>
                )}
              </div>

              {/* Unread Indicator */}
              {conv.unread && (
                <div className="absolute top-4 md:top-5 right-3 md:right-3.5 size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className={`flex-1 flex flex-col bg-[#F8FAFC] dark:bg-gray-800 ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
        {selectedConversation && selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="px-3 md:px-6 py-3 md:py-4 border-b border-[#e2ecf5] dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
              {/* Mobile Back Button + Profile */}
              <div className="flex items-center gap-2 md:gap-0 flex-1 min-w-0">
                <button
                  onClick={() => setSelectedConversation("")}
                  className="md:hidden p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg className="size-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => navigate(`/clients/${selectedConversation}`)}
                  className="flex items-center gap-2 md:gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-1 md:px-2 py-1 md:-ml-2 transition-all group cursor-pointer hover:scale-105 flex-1 min-w-0"
                >
                  {typeof selectedConv.avatar === "string" && selectedConv.avatar.length === 2 ? (
                    <div className="size-8 md:size-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm group-hover:scale-110 transition-transform flex-shrink-0">
                      {selectedConv.avatar}
                    </div>
                  ) : (
                    <img
                      src={selectedConv.avatar}
                      alt={selectedConv.name}
                      className="size-8 md:size-10 rounded-full object-cover group-hover:scale-110 transition-transform flex-shrink-0"
                    />
                  )}
                  <div className="text-left flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-[#0f172a] dark:text-white transition-transform truncate">
                      {selectedConv.name}
                    </h3>
                    <p className="text-xs md:text-sm text-[#64748b] dark:text-gray-400 transition-transform flex items-center gap-1">
                      <span className="hidden md:inline">View Profile</span>
                      <span className="md:hidden">{selectedConv.role}</span>
                      <ChevronRight className="size-3 md:size-3.5 group-hover:translate-x-1 transition-transform hidden md:inline" />
                    </p>
                  </div>
                </button>
              </div>
              
              <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsPaymentLinkModalOpen(true)}
                  className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors"
                >
                  <CreditCard className="size-4 md:size-5 text-[#64748b] dark:text-gray-400" />
                </button>
                <button
                  onClick={() => {
                    if (selectedConv?.credits === 0) {
                      setIsNoCreditsModalOpen(true);
                    } else {
                      setIsSessionTypeModalOpen(true);
                    }
                  }}
                  className="hidden sm:flex size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl items-center justify-center transition-colors cursor-pointer"
                >
                  <Video className="size-4 md:size-5 text-[#64748b] dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg className="size-4 md:size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.5 7.5h15M6.25 2.5v2.5M13.75 2.5v2.5M6.875 12.5h.006M10 12.5h.006M13.125 12.5h.006M6.875 15.625h.006M10 15.625h.006M13.125 15.625h.006M5 17.5h10c.69 0 1.25-.56 1.25-1.25V6.875c0-.69-.56-1.25-1.25-1.25H5c-.69 0-1.25.56-1.25 1.25V16.25c0 .69.56 1.25 1.25 1.25z"
                      className="text-[#64748b] dark:text-gray-400"
                    />
                  </svg>
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors"
                  >
                    <MoreVertical className="size-4 md:size-5 text-[#64748b] dark:text-gray-400" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsMenuOpen(false)}
                      ></div>
                      
                      {/* Menu */}
                      <div className="absolute right-0 top-12 w-[220px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            navigate('/sessions');
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                        >
                          <CalendarIcon className="size-5 text-gray-700 dark:text-gray-300" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">View Sessions</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            navigate("/clients/1/insights");
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                        >
                          <BarChart3 className="size-5 text-gray-700 dark:text-gray-300" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">View Insights</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            // Start video session
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                        >
                          <Video className="size-5 text-gray-700 dark:text-gray-300" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Start Session</span>
                        </button>
                        
                        <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                        
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            // Report user action
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                        >
                          <AlertCircle className="size-5 text-red-600 dark:text-red-500" />
                          <span className="text-sm font-medium text-red-600 dark:text-red-500">Report User</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-[#F8FAFC] dark:bg-gray-800">
              <div className="max-w-3xl mx-auto space-y-6 py-6">
                {/* Date Divider */}
                <div className="text-center">
                  <p className="text-xs text-[#64748b] dark:text-gray-400 bg-[#f8fafc] dark:bg-gray-700 inline-block px-3 py-1 rounded-full">
                    Today
                  </p>
                </div>

                {/* Messages */}
                <div className="space-y-4">
                  {conversationMessages[selectedConversation]?.map((msg) => {
                    // Check if message is a payment link
                    const isPaymentLink = msg.text.includes("Buy Plans - https://");
                    const paymentUrl = isPaymentLink ? msg.text.replace("Buy Plans - ", "") : "";
                    
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "expert" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${msg.sender === "expert" ? "flex-row-reverse" : ""}`}>
                          {msg.sender === "client" && (
                            typeof selectedConv.avatar === "string" && selectedConv.avatar.length === 2 ? (
                              <div className="size-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                {selectedConv.avatar}
                              </div>
                            ) : (
                              <img
                                src={selectedConv.avatar}
                                alt={selectedConv.name}
                                className="size-10 rounded-full object-cover flex-shrink-0"
                              />
                            )
                          )}
                          <div>
                            {isPaymentLink ? (
                              // Payment Link Button UI
                              <div className="bg-gradient-to-br from-[#4285f4] to-[#3367d6] rounded-2xl rounded-tl-sm p-4 shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="size-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                    <ShoppingCart className="size-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-white mb-0.5">
                                      Purchase Additional Sessions
                                    </h4>
                                    <p className="text-xs text-blue-100">
                                      View available plans and packages
                                    </p>
                                  </div>
                                </div>
                                <a
                                  href={paymentUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full py-2.5 bg-white hover:bg-gray-50 text-[#3367d6] rounded-lg font-semibold text-sm transition-all text-center shadow-md"
                                >
                                  Buy Plans
                                </a>
                              </div>
                            ) : (
                              // Regular message UI
                              <div
                                className={`px-4 py-3 rounded-2xl ${
                                  msg.sender === "expert"
                                    ? "bg-[#043570] text-white rounded-tr-sm"
                                    : "bg-[#f1f5f9] dark:bg-gray-700 text-[#0f172a] dark:text-white rounded-tl-sm"
                                }`}
                              >
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                              </div>
                            )}
                            <p className="text-xs text-[#64748b] dark:text-gray-400 mt-1.5 px-1">
                              {msg.timestamp}
                            </p>
                          </div>
                          {msg.sender === "expert" && (
                            <div className="size-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              {selectedConv.avatar.length === 2 ? selectedConv.avatar : "U"}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-[#e2ecf5] dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="max-w-3xl mx-auto flex items-center gap-3">
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsAutoResponsesModalOpen(true)}
                    className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors flex-shrink-0"
                  >
                    <FileText className="size-5 text-[#64748b] dark:text-gray-400" />
                  </button>
                  <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors flex-shrink-0">
                    <Paperclip className="size-5 text-[#64748b] dark:text-gray-400" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-4 py-3 bg-[#f8fafc] dark:bg-gray-700 border border-[#e2ecf5] dark:border-gray-600 rounded-xl text-sm text-[#0f172a] dark:text-white placeholder-[#94a3b8] dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-[#043570] hover:bg-[#032654] text-white rounded-xl transition-colors flex-shrink-0"
                >
                  <Send className="size-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="size-16 bg-[#00c0ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="size-8 text-[#00c0ff]" />
              </div>
              <h3 className="text-xl text-gray-900 dark:text-white mb-2">Welcome to Care Team</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                Select a conversation from the list to start chatting with your care team.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Appointment Modal */}
      <AddAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onAddAppointment={handleScheduleAppointment}
        preselectedClient={
          selectedConv
            ? {
                id: selectedConv.id,
                name: selectedConv.name,
                avatar: typeof selectedConv.avatar === "string" && selectedConv.avatar.length === 2 ? selectedConv.avatar : "U",
                service: selectedConv.role,
                credits: selectedConv.credits,
              }
            : null
        }
      />

      {/* Session Type Selection Modal */}
      {isSessionTypeModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[480px] max-w-full overflow-hidden">
            {/* Header */}
            <div className="relative bg-[#043570] p-6 text-center">
              <button
                onClick={() => setIsSessionTypeModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <X className="size-5" />
              </button>
              
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <Video className="size-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Start Session</h3>
              <p className="text-white/80 text-sm">
                Choose how you'd like to connect with {selectedConv?.name}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-3">
                {/* Video Session Button */}
                <button
                  onClick={() => {
                    setIsSessionTypeModalOpen(false);
                    setIsVideoSessionModalOpen(true);
                  }}
                  className="w-full flex flex-col gap-2 p-5 bg-[#f3faff] dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all border-2 border-[#00c0ff]/30 dark:border-blue-800 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-[#00c0ff] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Video className="size-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        Start Video Session
                      </div>
                      <div className="flex items-center gap-[5px] text-sm font-normal text-[#64748B] dark:text-gray-400">
                        <CalendarIcon className="size-3.5" />
                        <span>2/4 remaining</span>
                        <span>•</span>
                        <Clock className="size-3.5" />
                        <span>30 mins</span>
                        <span>•</span>
                        <DollarSign className="size-3.5" />
                        <span>₹ 500</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Chat Session Button - Disabled */}
                <div className="relative">
                  <button
                    disabled
                    className="w-full flex flex-col gap-3 p-5 bg-gray-100 dark:bg-gray-900/50 rounded-xl border-2 border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="size-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                          Start Chat Session
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                          <AlertCircle className="size-3.5" />
                          <span>Client does not have an active chat session</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Session Modal - Improved UI */}
      {isVideoSessionModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[500px] max-w-full overflow-hidden">
            {/* Header */}
            <div className="relative bg-[#043570] p-6">
              <button
                onClick={() => {
                  setIsVideoSessionModalOpen(false);
                  setTakeNotesDuringMeeting(false);
                  setAddAINotetaker(true);
                }}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <X className="size-5" />
              </button>
              
              <div className="flex items-center gap-4 text-white">
                <div className="size-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Video className="size-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Start Video Session</h3>
                  <p className="text-white/80 text-sm">
                    Preparing session with {selectedConv?.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Session Info Card */}
              <div className="bg-[#f3faff] dark:bg-cyan-900/20 border border-[#00c0ff]/30 dark:border-cyan-800 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#00c0ff] rounded-full flex items-center justify-center">
                    <CheckCircle className="size-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[#043570] dark:text-cyan-100">
                      Session Details
                    </h4>
                  </div>
                </div>
                <div className="space-y-2 ml-13">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-cyan-200">Duration:</span>
                    <span className="font-semibold text-gray-900 dark:text-cyan-100">Minimum 30 minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-cyan-200">Remaining Sessions:</span>
                    <span className="font-semibold text-gray-900 dark:text-cyan-100">2 of 4</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-cyan-200">Session Amount:</span>
                    <span className="font-semibold text-[#00c0ff] dark:text-cyan-300">₹ 500</span>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 mb-6">
                {/* Take notes during meeting */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-[#00c0ff] dark:hover:border-cyan-500 transition-colors">
                  <input
                    type="checkbox"
                    id="take-notes"
                    checked={takeNotesDuringMeeting}
                    onChange={(e) => setTakeNotesDuringMeeting(e.target.checked)}
                    className="mt-0.5 size-5 rounded border-gray-300 text-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]"
                  />
                  <div className="flex-1">
                    <label htmlFor="take-notes" className="cursor-pointer">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        Take notes during meeting
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Opens session notes in current tab, meeting launches in new tab
                      </div>
                    </label>
                  </div>
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-[#00c0ff] dark:hover:text-cyan-400 transition-colors">
                      <Info className="size-4" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute right-0 bottom-full mb-2 w-64 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                      Opens session notes page when the meeting starts. The meeting will launch in a new tab.
                      <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                    </div>
                  </div>
                </div>

                {/* Add a notetaker in the meeting */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-[#00c0ff] dark:hover:border-cyan-500 transition-colors">
                  <input
                    type="checkbox"
                    id="ai-notetaker"
                    checked={addAINotetaker}
                    onChange={(e) => setAddAINotetaker(e.target.checked)}
                    className="mt-0.5 size-5 rounded border-gray-300 text-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]"
                  />
                  <div className="flex-1">
                    <label htmlFor="ai-notetaker" className="cursor-pointer">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                        Add AI notetaker in the meeting
                        <span className="px-2 py-0.5 bg-[#00c0ff] text-white text-xs font-bold rounded">AI</span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Automatically transcribe and generate session notes
                      </div>
                    </label>
                  </div>
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-[#00c0ff] dark:hover:text-cyan-400 transition-colors">
                      <Info className="size-4" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute right-0 bottom-full mb-2 w-64 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                      AI will join the meeting to automatically transcribe and generate session notes.
                      <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Start Session Button */}
                <button
                  onClick={() => {
                    // If take notes is checked, open session notes in current window and meeting in new tab
                    if (takeNotesDuringMeeting) {
                      // Open meeting in new tab (simulated)
                      window.open('about:blank', '_blank');
                      // Navigate to session notes
                      navigate('/session-notes');
                      setIsVideoSessionModalOpen(false);
                    } else {
                      // Just start the meeting normally
                      window.open('about:blank', '_blank');
                      setIsVideoSessionModalOpen(false);
                    }
                    // Reset checkboxes
                    setTakeNotesDuringMeeting(false);
                    setAddAINotetaker(true);
                  }}
                  className="w-full py-3.5 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                >
                  <Video className="size-5" />
                  Start Video Session
                </button>

                {/* Help Text */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Facing issues with Video call?{' '}
                    <button className="text-[#00c0ff] dark:text-cyan-400 hover:underline font-medium">
                      Try this option
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Please avoid use of zoom or other 3rd party tools as we can't track those sessions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Link Modal - Improved UI */}
      {isPaymentLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[480px] max-w-full overflow-hidden">
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-br from-[#4285f4] to-[#3367d6] p-6 text-center">
              <button
                onClick={() => setIsPaymentLinkModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <X className="size-5" />
              </button>
              
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <ShoppingCart className="size-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Send Plan Link</h3>
              <p className="text-blue-100 text-sm">
                User needs more sessions? You can share the purchase link so they can continue with additional sessions without hassle.
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="size-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      What happens next?
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      A secure payment link will be sent to the client's chat. They can view and purchase your available plans directly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Plan Preview */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">LINK PREVIEW</div>
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <CreditCard className="size-4 text-[#4285f4]" />
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400 truncate">
                    therapists.therapymantra.co/plans/...
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsPaymentLinkModalOpen(false)}
                  className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsPaymentLinkModalOpen(false);
                    handleSendPaymentLink();
                  }}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#4285f4] to-[#3367d6] hover:from-[#3367d6] hover:to-[#2851b8] text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <Send className="size-4" />
                  Send Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auto-responses Modal */}
      {isAutoResponsesModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[420px] max-w-full overflow-hidden">
            {/* Header */}
            <div className="relative bg-[#043570] p-6">
              <button
                onClick={() => setIsAutoResponsesModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <X className="size-5" />
              </button>
              
              <div className="flex items-center gap-4 text-white">
                <div className="size-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText className="size-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Auto-responses</h3>
                  <p className="text-white/80 text-sm">
                    Quick response options
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-3">
                {/* Refer Other Services Button */}
                <button
                  onClick={() => {
                    setIsAutoResponsesModalOpen(false);
                    // Handle refer other services action
                  }}
                  className="w-full py-4 px-5 bg-[#f3faff] dark:bg-cyan-900/20 hover:bg-blue-100 dark:hover:bg-cyan-900/30 rounded-xl transition-all border-2 border-[#00c0ff]/30 dark:border-cyan-800 shadow-sm hover:shadow-md text-left"
                >
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    Refer Other Services
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Send referral for additional services
                  </p>
                </button>

                {/* Other Button */}
                <button
                  onClick={() => {
                    setIsAutoResponsesModalOpen(false);
                    // Handle other action
                  }}
                  className="w-full py-4 px-5 bg-[#f3faff] dark:bg-cyan-900/20 hover:bg-blue-100 dark:hover:bg-cyan-900/30 rounded-xl transition-all border-2 border-[#00c0ff]/30 dark:border-cyan-800 shadow-sm hover:shadow-md text-left"
                >
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    Other
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Additional response options
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}