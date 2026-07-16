import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Search, Filter, Plus, Eye, Edit2, Calendar, User, FileText, Clock, ChevronDown, Users, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FreeTrialBanner } from "../components/monetization/FreeTrialBanner";
import { usePlanMode } from "../contexts/PlanModeContext";
import { AddSessionNoteModal } from "../components/AddSessionNoteModal";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

interface SessionNote {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  sessionId: string;
  sessionDate: string;
  templateName: string;
  addedDate: string;
  addedBy: string;
}

export function SessionNotesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { planMode } = usePlanMode();
  const { canViewClientClinicalContent } = usePartnerDashboard();
  const isTranscriberOnly = planMode === "transcriber-only";
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>("all");
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  // Mock session notes data
  const sessionNotes: SessionNote[] = [
    {
      id: "note-1",
      clientId: "1",
      clientName: "Sarah Johnson",
      clientAvatar: "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDYwODg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionId: "session-1",
      sessionDate: "Mar 14, 2026",
      templateName: "SOAP Client Session Notes",
      addedDate: "Mar 14, 2026",
      addedBy: "Dr. Smith",
    },
    {
      id: "note-2",
      clientId: "2",
      clientName: "Michael Chen",
      clientAvatar: "https://images.unsplash.com/photo-1766066014773-0074bf4911de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDU2MDg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionId: "session-2",
      sessionDate: "Mar 12, 2026",
      templateName: "Progress Note Template",
      addedDate: "Mar 12, 2026",
      addedBy: "Dr. Smith",
    },
    {
      id: "note-3",
      clientId: "1",
      clientName: "Sarah Johnson",
      clientAvatar: "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDYwODg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionId: "session-3",
      sessionDate: "Mar 10, 2026",
      templateName: "Initial Assessment",
      addedDate: "Mar 10, 2026",
      addedBy: "Dr. Smith",
    },
    {
      id: "note-4",
      clientId: "3",
      clientName: "David Martinez",
      clientAvatar: "https://images.unsplash.com/photo-1553690300-93871c6a6654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoaXNwYW5pYyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDU4NzUwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionId: "session-4",
      sessionDate: "Mar 8, 2026",
      templateName: "SOAP Client Session Notes",
      addedDate: "Mar 8, 2026",
      addedBy: "Dr. Smith",
    },
    {
      id: "note-5",
      clientId: "4",
      clientName: "Emily Watson",
      clientAvatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0NTc4OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      sessionId: "session-5",
      sessionDate: "Mar 6, 2026",
      templateName: "Therapy Session Note",
      addedDate: "Mar 6, 2026",
      addedBy: "Dr. Smith",
    },
    {
      id: "note-6",
      clientId: "5",
      clientName: "Priya Sharma",
      clientAvatar: "https://images.unsplash.com/photo-1735845929510-48e0ecdb53d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDUwNDE5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      sessionId: "",
      sessionDate: "-",
      templateName: "General Note",
      addedDate: "Mar 15, 2026",
      addedBy: "Dr. Smith",
    },
    {
      id: "note-7",
      clientId: "2",
      clientName: "Michael Chen",
      clientAvatar: "https://images.unsplash.com/photo-1766066014773-0074bf4911de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDU2MDg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      sessionId: "",
      sessionDate: "-",
      templateName: "Check-in Note",
      addedDate: "Mar 13, 2026",
      addedBy: "Dr. Smith",
    },
  ];
  const visibleSessionNotes = sessionNotes.filter((note) => canViewClientClinicalContent(note.clientId));

  // Mock clients
  const clients = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Chen" },
    { id: "3", name: "David Martinez" },
    { id: "4", name: "Emily Watson" },
    { id: "5", name: "Priya Sharma" },
  ];

  const filteredNotes = visibleSessionNotes.filter((note) => {
    const matchesSearch =
      searchQuery === "" ||
      note.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.templateName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClientFilter =
      selectedClientFilter === "all" ||
      note.clientId === selectedClientFilter;

    return matchesSearch && matchesClientFilter;
  });

  // Get unique clients count
  const uniqueClients = new Set(visibleSessionNotes.map(note => note.clientId)).size;
  
  // Get notes from this week
  const thisWeekNotes = visibleSessionNotes.filter(note => {
    const noteDate = new Date(note.addedDate);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return noteDate >= weekAgo;
  }).length;

  // Check if we should auto-open the add notes flow
  useEffect(() => {
    if (location.state?.openAddNotes) {
      setIsAddNoteModalOpen(true);
    }
  }, [location.state]);

  return (
    <div className="max-w-[1400px]">
      {/* Header Section */}
      <div className="mb-4 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 md:mb-6 gap-3 md:gap-0">
          <div className="flex-1">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              Session Notes
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              View and manage all session notes across clients
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Client Dropdown - Only show in Full EHR mode */}
            {!isTranscriberOnly && (
              <div className="relative flex-1 md:flex-initial">
                <button
                  onClick={() => setShowClientDropdown(!showClientDropdown)}
                  className="w-full md:w-auto flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all shadow-sm font-semibold text-sm md:text-base text-gray-700 dark:text-gray-300"
                >
                  <User className="size-4 md:size-5" />
                  <span className="truncate">
                    {selectedClientFilter === "all"
                      ? "All Clients"
                      : clients.find(c => c.id === selectedClientFilter)?.name}
                  </span>
                  <ChevronDown className="size-4 flex-shrink-0" />
                </button>

                {showClientDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowClientDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2">
                      <button
                        onClick={() => {
                          setSelectedClientFilter("all");
                          setShowClientDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium ${
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
                          className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium ${
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
            )}

            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="flex items-center gap-1.5 md:gap-2 bg-[#043570] hover:bg-[#032554] text-white px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-all shadow-sm hover:shadow-md font-semibold text-sm md:text-base"
            >
              <Plus className="size-4 md:size-5" />
              <span className="hidden sm:inline">Add Notes</span>
            </button>
          </div>
        </div>

        {/* Free Trial Banner */}
        <FreeTrialBanner toolName="Session Notes" />

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by client name or template..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 text-sm md:text-base bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent dark:text-white placeholder-gray-400 shadow-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 md:px-5 py-2.5 md:py-3.5 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5 md:gap-2 text-gray-700 dark:text-gray-300 font-semibold shadow-sm text-sm md:text-base"
          >
            <Filter className="size-4 md:size-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-8">
        {/* Total Session Notes */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="size-3.5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">7</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">notes</span>
          </div>
        </div>

        {/* Generated with AI */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="size-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">5</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">AI generated</span>
          </div>
        </div>

        {/* Credits Used */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="size-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">8</span>
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

      {/* Notes Grid - Card Based Layout */}
      {filteredNotes.length > 0 ? (
        <div className="grid gap-3 md:gap-4">
          {filteredNotes.map((note, index) => {
            const clientInitials = note.clientName.split(" ").map(n => n[0]).join("");
            
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-5 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  {/* Left Side - Avatar and Content */}
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    {/* Client Avatar */}
                    {note.clientAvatar ? (
                      <ImageWithFallback
                        src={note.clientAvatar}
                        alt={note.clientName}
                        className="size-12 md:size-[75px] rounded-lg md:rounded-xl object-cover flex-shrink-0"
                        fallback={
                          <div className="size-12 md:size-[75px] bg-gradient-to-br from-[#00c0ff] to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                            {clientInitials}
                          </div>
                        }
                      />
                    ) : (
                      <div className="size-12 md:size-[75px] bg-gradient-to-br from-[#00c0ff] to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                        {clientInitials}
                      </div>
                    )}

                    {/* Template and Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm md:text-[18px] font-bold text-[#020817] dark:text-white mb-0.5">
                        {note.clientName}
                      </div>
                      <h3 className="text-xs md:text-[14px] font-medium text-[#2563EB] dark:text-blue-400 mb-1 md:mb-1.5 truncate">
                        {note.templateName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Calendar className="size-3 md:size-3.5" />
                          <span>{note.sessionDate}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Clock className="size-3 md:size-3.5" />
                          <span className="hidden md:inline">Modified: {note.addedDate}</span>
                          <span className="md:hidden">{note.addedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex items-center gap-2 ml-0 md:ml-0">
                    <button
                      onClick={() => navigate(`/clients/${note.clientId}/notes`)}
                      className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-[#f3faff] dark:bg-blue-900/20 hover:bg-[#00c0ff]/10 dark:hover:bg-blue-900/30 text-[#043570] dark:text-[#00c0ff] rounded-lg transition-all font-semibold text-xs md:text-sm border border-transparent hover:border-[#00c0ff]/20"
                    >
                      <Eye className="size-3.5 md:size-4" />
                      <span>View</span>
                    </button>
                    <button
                      className="size-8 md:size-9 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center transition-all shadow-sm hover:shadow flex-shrink-0"
                      title="Edit"
                    >
                      <Edit2 className="size-3.5 md:size-4 text-gray-700 dark:text-gray-300" />
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
            <div className="size-16 md:size-20 bg-gradient-to-br from-[#f3faff] to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-sm">
              <FileText className="size-8 md:size-10 text-[#00c0ff]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "No notes found" : "No session notes yet"}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchQuery
                ? "Try adjusting your search criteria or clear the search to see all notes"
                : "Start documenting your sessions by adding your first note"}
            </p>
            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="flex items-center gap-2 bg-[#043570] hover:bg-[#032554] text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-semibold mx-auto"
            >
              <Plus className="size-5" />
              Add First Note
            </button>
          </div>
        </div>
      )}

      <AddSessionNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
      />
    </div>
  );
}
