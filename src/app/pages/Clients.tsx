import { useState } from "react";
import { Search, MessageSquare, Eye, Edit, ChevronLeft, ChevronRight, Info, RotateCw, ChevronDown, UserPlus, X, Filter, Download, MoreVertical, Trash2, Mail as MailIcon, Archive, UserX, CheckSquare, Square, RefreshCw, TrendingUp, TrendingDown, Users, UserCheck, ArrowUpDown, ArrowUp, ArrowDown, Sparkles, Clock, CheckCircle2, XCircle, AlertCircle, Send, Ban } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { AddClientModal } from "../components/AddClientModal";
import mantraCareLogo from "../../imports/MantraCare_(1).svg";
import { AvatarWithFallback } from "../components/AvatarWithFallback";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { ClientProfile } from "./ClientProfile";

interface Client {
  id: string;
  name: string;
  email: string;
  onboardingStatus: "Joined" | "Expired" | "Invite Sent" | "Not Sent";
  status: "Active" | "Inactive" | "Archived" | "Switched" | "Prospective" | null;
  favorite: boolean;
  avatar: string | undefined;
}

export function Clients() {
  const { isCurrentUserAdmin, currentProviderId, careTeamMemberships, providers, clientTreatingProviders, reassignClient } = usePartnerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [onboardingFilter, setOnboardingFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showOnboardingTooltip, setShowOnboardingTooltip] = useState(false);
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<string | null>(null);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [onboardingDropdownOpen, setOnboardingDropdownOpen] = useState(false);
  const [statusDropdownFilterOpen, setStatusDropdownFilterOpen] = useState(false);
  const [onboardingSearchQuery, setOnboardingSearchQuery] = useState("");
  const [statusSearchQuery, setStatusSearchQuery] = useState("");
  const rowsPerPage = 10;

  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson478@gmail.com",
      onboardingStatus: "Invite Sent",
      status: "Prospective",
      favorite: false,
      avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzczOTg2NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@outlook.com",
      onboardingStatus: "Joined",
      status: "Active",
      favorite: true,
      avatar: "https://images.unsplash.com/photo-1738566061505-556830f8b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczOTg2NzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.davis@yahoo.com",
      onboardingStatus: "Joined",
      status: "Inactive",
      favorite: true,
      avatar: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3QlMjBibG9uZGV8ZW58MXx8fHwxNzc0MDY1OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "4",
      name: "David Martinez",
      email: "d.martinez@gmail.com",
      onboardingStatus: "Joined",
      status: "Active",
      favorite: true,
      avatar: "https://images.unsplash.com/photo-1643269552626-5e2874c5309b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoaXNwYW5pYyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDA2NTk3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "5",
      name: "Jessica Thompson",
      email: "jthompson65@gmail.com",
      onboardingStatus: "Joined",
      status: "Active",
      favorite: false,
      avatar: "https://images.unsplash.com/flagged/photo-1573582677725-863b570e3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3QlMjBicnVuZXR0ZXxlbnwxfHx8fDE3NzQwNjU5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "6",
      name: "Robert Wilson",
      email: "rwilson56@mantra.care",
      onboardingStatus: "Joined",
      status: "Switched",
      favorite: true,
      avatar: "https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBibGFjayUyMG1hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczOTkwMzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "7",
      name: "Amanda Brown",
      email: "12312.12312@gmail.com",
      onboardingStatus: "Expired",
      status: "Archived",
      favorite: false,
      avatar: "https://images.unsplash.com/photo-1758798261207-7039105e8195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwcmVkaGVhZHxlbnwxfHx8fDE3NzQwNjU5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "8",
      name: "James Anderson",
      email: "j.anderson38@outlook.com",
      onboardingStatus: "Joined",
      status: "Active",
      favorite: false,
      avatar: "https://images.unsplash.com/photo-1762753674498-73ec49feafc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMG1hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MDY1OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "9",
      name: "Lisa Taylor",
      email: "ltaylor@mantra.care",
      onboardingStatus: "Joined",
      status: "Inactive",
      favorite: false,
      avatar: "https://images.unsplash.com/photo-1758599543111-36ce5c34fceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwZ2xhc3Nlc3xlbnwxfHx8fDE3NzQwNjU5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "10",
      name: "Christopher Lee",
      email: "c.lee@outlook.com",
      onboardingStatus: "Expired",
      status: "Prospective",
      favorite: false,
      avatar: "https://images.unsplash.com/photo-1584940120505-117038d90b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYXR1cmUlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDA2NTk3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "11",
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      onboardingStatus: "Joined",
      status: "Active",
      favorite: false,
      avatar: undefined,
    },
  ]);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnboardingStatus = onboardingFilter === "All" || client.onboardingStatus === onboardingFilter;
    const matchesStatus = statusFilter === "All" || client.status === statusFilter;
    const matchesCareTeam = isCurrentUserAdmin || careTeamMemberships.some(
      (m) => m.clientId === client.id && m.providerId === currentProviderId
    );
    return matchesSearch && matchesOnboardingStatus && matchesStatus && matchesCareTeam;
  });

  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + rowsPerPage);
  const getAssignedProvider = (clientId: string) => providers.find((p) => p.id === clientTreatingProviders[clientId]);

  const getOnboardingStatusBadge = (status: string) => {
    switch (status) {
      case "Joined":
        return "bg-[#f3faff] text-emerald-700 dark:text-emerald-400";
      case "Expired":
        return "bg-[#f3faff] text-yellow-700 dark:text-yellow-600";
      case "Invite Sent":
        return "bg-[#f3faff] text-orange-600 dark:text-orange-500";
      case "Not Sent":
        return "bg-[#f3faff] text-gray-700 dark:text-gray-300";
      default:
        return "bg-[#f3faff] text-gray-700 dark:text-gray-300";
    }
  };

  const getOnboardingStatusColor = (status: string) => {
    switch (status) {
      case "Joined":
        return "text-emerald-700 dark:text-emerald-400";
      case "Expired":
        return "text-yellow-700 dark:text-yellow-600";
      case "Invite Sent":
        return "text-orange-600 dark:text-orange-500";
      case "Not Sent":
        return "text-gray-700 dark:text-gray-300";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  const getOnboardingIcon = (status: string) => {
    switch (status) {
      case "Joined":
        return <CheckCircle2 className="size-3.5" />;
      case "Expired":
        return <XCircle className="size-3.5" />;
      case "Invite Sent":
        return <Send className="size-3.5" />;
      case "Not Sent":
        return <Clock className="size-3.5" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;
    switch (status) {
      case "Active":
        return "bg-[#f3faff] text-green-700 dark:text-green-400";
      case "Inactive":
        return "bg-[#f3faff] text-yellow-700 dark:text-yellow-600";
      case "Archived":
        return "bg-[#f3faff] text-gray-700 dark:text-gray-400";
      case "Switched":
        return "bg-[#f3faff] text-orange-600 dark:text-orange-500";
      case "Prospective":
        return "bg-[#f3faff] text-blue-700 dark:text-blue-400";
      default:
        return "bg-[#f3faff] text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusBadgeColor = (status: string | null) => {
    if (!status) return null;
    switch (status) {
      case "Active":
        return "text-green-700 dark:text-green-400";
      case "Inactive":
        return "text-yellow-700 dark:text-yellow-600";
      case "Archived":
        return "text-gray-700 dark:text-gray-400";
      case "Switched":
        return "text-orange-600 dark:text-orange-500";
      case "Prospective":
        return "text-blue-700 dark:text-blue-400";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string | null) => {
    if (!status) return null;
    switch (status) {
      case "Active":
        return <CheckCircle2 className="size-3.5" />;
      case "Inactive":
        return <AlertCircle className="size-3.5" />;
      case "Archived":
        return <Archive className="size-3 " />;
      case "Switched":
        return <Ban className="size-3.5" />;
      case "Prospective":
        return <Clock className="size-3.5" />;
      default:
        return null;
    }
  };

  const handleAddClient = (client: {
    firstName: string;
    lastName: string;
    email: string;
    service: string;
    inviteToMantra?: boolean;
  }) => {
    console.log("Adding client:", client);
    const newClient: Client = {
      id: (clients.length + 1).toString(),
      name: `${client.firstName} ${client.lastName}`,
      email: client.email,
      onboardingStatus: client.inviteToMantra ? "Invite Sent" : "Not Sent",
      status: "Prospective",
      favorite: false,
      avatar: "https://via.placeholder.com/150",
    };
    setClients([newClient, ...clients]);
    reassignClient(newClient.id, currentProviderId);
    // In a real app, this would make an API call to save the client
  };

  const handleResendEmail = (clientId: string) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? { ...client, onboardingStatus: "Invite Sent" as const }
          : client
      )
    );
  };

  const handleChangeStatus = (clientId: string, newStatus: Client["status"]) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, status: newStatus } : client
      )
    );
    setStatusDropdownOpen(null);
  };

  const statusOptions: Array<Client["status"]> = ["Active", "Inactive", "Archived", "Switched", "Prospective"];

  const getStatusOptionsForClient = (client: Client): Array<Client["status"]> => {
    const isMantraClient = client.email.endsWith("@mantra.care");
    
    if (isMantraClient) {
      // Mantra clients get all options
      return statusOptions;
    } else {
      // Non-Mantra clients: remove "Inactive" and "Switched"
      return statusOptions.filter(status => status !== "Inactive" && status !== "Switched");
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setOnboardingFilter("All");
    setStatusFilter("All");
  };

  const hasActiveFilters = searchQuery !== "" || onboardingFilter !== "All" || statusFilter !== "All";

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-1 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-start justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-start gap-3 md:gap-4 w-full md:w-auto">
          <div className="size-9 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <Users className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div className="flex-1 md:flex-initial">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
              Clients
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Manage and track all your client relationships
            </p>
          </div>
        </div>
        <button
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-5 md:px-6 py-2.5 rounded-xl transition-all font-medium shadow-sm hover:shadow-md text-sm md:text-base"
          onClick={() => setIsAddClientModalOpen(true)}
        >
          <UserPlus className="size-4 md:size-5" />
          Add Client(s)
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-6">
        {/* Desktop Filters - Single Row */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent bg-white dark:bg-gray-750 dark:text-white placeholder:text-gray-400 transition-all"
            />
          </div>

          {/* Onboarding Status Filter */}
          <div className="relative min-w-[200px]">
            <button
              onClick={() => {
                setOnboardingDropdownOpen(!onboardingDropdownOpen);
                setStatusDropdownFilterOpen(false);
              }}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent bg-white dark:bg-gray-750 dark:text-white cursor-pointer transition-all font-medium text-left"
            >
              {onboardingFilter === "All" ? "All Onboarding" : onboardingFilter}
            </button>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />

            {onboardingDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => {
                    setOnboardingDropdownOpen(false);
                    setOnboardingSearchQuery("");
                  }}
                />
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2 max-h-[300px] overflow-hidden flex flex-col">
                  {/* Search Bar */}
                  <div className="px-3 pb-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={onboardingSearchQuery}
                        onChange={(e) => setOnboardingSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent dark:text-white placeholder:text-gray-400 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="overflow-y-auto">
                    {["All Onboarding", "Joined", "Expired", "Invite Sent", "Not Sent"]
                      .filter(option =>
                        option.toLowerCase().includes(onboardingSearchQuery.toLowerCase())
                      )
                      .map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setOnboardingFilter(option === "All Onboarding" ? "All" : option);
                            setOnboardingDropdownOpen(false);
                            setOnboardingSearchQuery("");
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium ${
                            (onboardingFilter === "All" && option === "All Onboarding") || onboardingFilter === option
                              ? "text-[#4169E1] dark:text-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[180px]">
            <button
              onClick={() => {
                setStatusDropdownFilterOpen(!statusDropdownFilterOpen);
                setOnboardingDropdownOpen(false);
              }}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent bg-white dark:bg-gray-750 dark:text-white cursor-pointer transition-all font-medium text-left"
            >
              {statusFilter === "All" ? "All Status" : statusFilter}
            </button>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />

            {statusDropdownFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => {
                    setStatusDropdownFilterOpen(false);
                    setStatusSearchQuery("");
                  }}
                />
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2 max-h-[300px] overflow-hidden flex flex-col">
                  {/* Search Bar */}
                  <div className="px-3 pb-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={statusSearchQuery}
                        onChange={(e) => setStatusSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent dark:text-white placeholder:text-gray-400 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="overflow-y-auto">
                    {["All Status", "Active", "Inactive", "Archived", "Switched", "Prospective"]
                      .filter(option =>
                        option.toLowerCase().includes(statusSearchQuery.toLowerCase())
                      )
                      .map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setStatusFilter(option === "All Status" ? "All" : option);
                            setStatusDropdownFilterOpen(false);
                            setStatusSearchQuery("");
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium ${
                            (statusFilter === "All" && option === "All Status") || statusFilter === option
                              ? "text-[#4169E1] dark:text-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-500 transition-all text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap"
            >
              <X className="size-4" />
              Clear
            </motion.button>
          )}
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent bg-white dark:bg-gray-750 dark:text-white placeholder:text-gray-400 transition-all"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-all relative"
            >
              <Filter className="size-5 text-gray-600 dark:text-gray-400" />
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 size-3 bg-[#4169E1] rounded-full border-2 border-white dark:border-gray-800"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Filter Menu */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 mt-4">
                {/* Onboarding Status Filter */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Onboarding Status
                  </label>
                  <select
                    value={onboardingFilter}
                    onChange={(e) => setOnboardingFilter(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent bg-white dark:bg-gray-750 dark:text-white appearance-none cursor-pointer transition-all font-medium"
                  >
                    <option value="All">All Onboarding</option>
                    <option value="Joined">Joined</option>
                    <option value="Expired">Expired</option>
                    <option value="Invite Sent">Invite Sent</option>
                    <option value="Not Sent">Not Sent</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-[34px] -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent bg-white dark:bg-gray-750 dark:text-white appearance-none cursor-pointer transition-all font-medium"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Archived">Archived</option>
                    <option value="Switched">Switched</option>
                    <option value="Prospective">Prospective</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-[34px] -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Clear Filters Button - Mobile */}
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-500 transition-all text-gray-700 dark:text-gray-300 font-medium"
                  >
                    <X className="size-4" />
                    Clear Filters
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto md:overflow-x-visible">
          <table className="w-full min-w-[800px] md:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-[#043570] dark:bg-[#043570]">
                <th className="px-3 md:px-4 py-2 md:py-3 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Client Name</span>
                  </div>
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left">
                  <div className="flex items-center gap-2 relative">
                    <span className="text-sm font-semibold text-white">Onboarding</span>
                    <div
                      className="relative"
                      onMouseEnter={() => setShowOnboardingTooltip(true)}
                      onMouseLeave={() => setShowOnboardingTooltip(false)}
                    >
                      <div className="size-4 flex items-center justify-center hover:opacity-80 transition-opacity cursor-help">
                        <Info className="size-4 text-white" />
                      </div>
                      {showOnboardingTooltip && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[320px] bg-gray-900 text-white rounded-lg p-4 shadow-xl z-50 text-left border border-gray-700">
                          <div className="font-semibold text-sm mb-2">Onboarding Status:</div>
                          <p className="text-xs text-gray-300 mb-3">Track whether the client has registered on the Mantra web/app.</p>
                          <ul className="space-y-2 text-xs">
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-orange-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-orange-300">Invite Sent</span> – Awaiting response</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-emerald-300">Joined</span> – Successfully registered</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-yellow-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-yellow-300">Expired</span> – Invitation expired</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-gray-300">Not Sent</span> – Not yet sent</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left">
                  <span className="text-sm font-semibold text-white">Assigned To</span>
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left">
                  <div className="flex items-center gap-2 relative">
                    <span className="text-sm font-semibold text-white">Status</span>
                    <div
                      className="relative matcher"
                      onMouseEnter={() => setShowStatusTooltip(true)}
                      onMouseLeave={() => setShowStatusTooltip(false)}
                    >
                      <div className="size-4 flex items-center justify-center hover:opacity-80 transition-opacity cursor-help">
                        <Info className="size-4 text-white" />
                      </div>
                      {showStatusTooltip && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[340px] bg-gray-900 text-white rounded-lg p-4 shadow-xl z-50 text-left border border-gray-700">
                          <div className="font-semibold text-sm mb-2">Status Types:</div>
                          <ul className="space-y-2 text-xs">
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-green-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-green-300">Active</span> – Order active</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-yellow-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-yellow-300">Inactive</span> – No active order</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-gray-300">Archived</span> – Client no longer active</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-orange-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-orange-300">Switched</span> – Moved to another expert</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-blue-400 mt-1 flex-shrink-0" />
                              <span><span className="font-semibold text-blue-300">Prospective</span> – Potential client</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left">
                  <span className="text-sm font-semibold text-white">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              <AnimatePresence mode="popLayout">
                {paginatedClients.length > 0 ? (
                  paginatedClients.map((client, index) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="group relative hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4 relative">
                        <div className="flex items-center gap-4">
                          <AvatarWithFallback
                            src={client.avatar}
                            alt={client.name}
                            className="size-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 mb-1">
                              <span className="text-gray-900 dark:text-white font-semibold text-sm truncate">
                                {client.name}
                              </span>
                              {client.favorite && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="relative group/badge"
                                >
                                  <div className="flex items-center justify-center">
                                    <img src={mantraCareLogo} alt="MantraCare" className="w-[18px] h-[18px]" />
                                  </div>
                                  <span className="absolute left-1/2 -translate-x-1/2 -top-10 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl border border-gray-700">
                                    <Sparkles className="size-3 inline-block mr-1 -mt-0.5" />
                                    Mantra Client
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3">
                        <div className="flex items-center gap-2.5">
                          <motion.span
                            whileHover={{ scale: 1 }}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${getOnboardingStatusColor(
                              client.onboardingStatus
                            )}`}
                          >
                            {getOnboardingIcon(client.onboardingStatus)}
                            {client.onboardingStatus}
                          </motion.span>
                          {(client.onboardingStatus === "Invite Sent" || client.onboardingStatus === "Expired" || client.onboardingStatus === "Not Sent") && (
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 180 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleResendEmail(client.id)}
                              className="p-2 bg-[#4169E1]/5 hover:bg-[#4169E1]/15 dark:hover:bg-[#4169E1]/25 rounded-xl transition-all group relative border border-[#4169E1]/20 hover:border-[#4169E1]/40"
                              title="Resend email"
                            >
                              <RotateCw className="size-4 text-[#4169E1]" />
                              <span className="absolute left-1/2 -translate-x-1/2 -top-10 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-gray-700 z-10">
                                Resend email
                              </span>
                            </motion.button>
                          )}
                        </div>
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {getAssignedProvider(client.id)?.name || "Unassigned"}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3">
                        {client.status ? (
                          !client.favorite ? (
                            // Non-Mantra client - show dropdown
                            <div className="relative">
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStatusDropdownOpen(statusDropdownOpen === client.id ? null : client.id)}
                                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold ${getStatusBadge(
                                  client.status
                                )} hover:opacity-90 transition-all shadow-sm`}
                              >
                                {getStatusIcon(client.status)}
                                {client.status}
                                <ChevronDown className="size-3.5 ml-0.5" />
                              </motion.button>

                              {statusDropdownOpen === client.id && (
                                <>
                                  {/* Backdrop to close dropdown */}
                                  <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setStatusDropdownOpen(null)}
                                  />
                                  
                                  {/* Dropdown menu */}
                                  <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-gray-750 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden backdrop-blur-sm"
                                  >
                                    {getStatusOptionsForClient(client).map((status) => (
                                      <button
                                        key={status}
                                        onClick={() => handleChangeStatus(client.id, status)}
                                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${
                                          client.status === status
                                            ? "bg-[#4169E1]/5 dark:bg-[#4169E1]/10"
                                            : ""
                                        }`}
                                      >
                                        <span className={getStatusBadge(status) + " inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"}>
                                          {getStatusIcon(status)}
                                          {status}
                                        </span>
                                      </button>
                                    ))}
                                  </motion.div>
                                </>
                              )}
                            </div>
                          ) : (
                            // Mantra client - no dropdown
                            <motion.span
                              whileHover={{ scale: 1 }}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold ${getStatusBadgeColor(
                                client.status
                              )}`}
                            >
                              {getStatusIcon(client.status)}
                              {client.status}
                            </motion.span>
                          )
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3">
                        <div className="flex items-center gap-2.5">
                          <Link
                            to={`/clients/${client.id}`}
                            className="p-2 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 dark:bg-[#4169E1]/20 dark:hover:bg-[#4169E1]/30 rounded-lg transition-all border border-[#4169E1]/30 inline-block"
                            title="View"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="size-4 text-[#4169E1]" />
                            </motion.div>
                          </Link>
                          <Link
                            to="/chat/1"
                            className="p-2 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 dark:bg-[#4169E1]/20 dark:hover:bg-[#4169E1]/30 rounded-lg transition-all border border-[#4169E1]/30 inline-block"
                            title="Chat"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <MessageSquare className="size-4 text-[#4169E1]" />
                            </motion.div>
                          </Link>
                          {!client.favorite && (
                            <Link
                              to={`/clients/${client.id}/edit`}
                              className="p-2 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 dark:bg-[#4169E1]/20 dark:hover:bg-[#4169E1]/30 rounded-lg transition-all border border-[#4169E1]/30 inline-block"
                              title="Edit"
                            >
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Edit className="size-4 text-[#4169E1]" />
                              </motion.div>
                            </Link>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="size-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-4">
                          <Search className="size-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No clients found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
                          {hasActiveFilters 
                            ? "Try adjusting your filters or search query to find what you're looking for."
                            : "Get started by adding your first client."}
                        </p>
                        {hasActiveFilters ? (
                          <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl transition-all font-medium shadow-sm"
                          >
                            <X className="size-4" />
                            Clear Filters
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsAddClientModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl transition-all font-medium shadow-sm"
                          >
                            <UserPlus className="size-4" />
                            Add Your First Client
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden md:flex px-6 py-4 bg-gray-50/50 dark:bg-gray-750/30 border-t border-gray-200 dark:border-gray-700 items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Rows per page:</span>
            <select className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-750 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#4169E1] transition-all cursor-pointer">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-200 dark:border-gray-600 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-200 dark:border-gray-600 disabled:hover:bg-transparent"
              >
                <ChevronRight className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="popLayout">
          {paginatedClients.length > 0 ? (
            paginatedClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4"
              >
                {/* Client Info */}
                <div className="flex items-start gap-3 mb-4">
                  <AvatarWithFallback
                    src={client.avatar}
                    alt={client.name}
                    className="size-14 rounded-lg object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900 dark:text-white font-semibold text-base truncate">
                        {client.name}
                      </span>
                      {client.favorite && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative group/badge"
                        >
                          <div className="flex items-center justify-center">
                            <img src={mantraCareLogo} alt="MantraCare" className="w-[18px] h-[18px]" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {client.email}
                    </p>
                  </div>
                </div>

                {/* Onboarding Status */}
                <div className="mb-3">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">
                    Onboarding
                  </label>
                  <div className="flex items-center gap-2">
                    <motion.span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${getOnboardingStatusColor(
                        client.onboardingStatus
                      )}`}
                    >
                      {getOnboardingIcon(client.onboardingStatus)}
                      {client.onboardingStatus}
                    </motion.span>
                    {(client.onboardingStatus === "Invite Sent" || client.onboardingStatus === "Expired" || client.onboardingStatus === "Not Sent") && (
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResendEmail(client.id)}
                        className="p-2 bg-[#4169E1]/5 hover:bg-[#4169E1]/15 dark:hover:bg-[#4169E1]/25 rounded-xl transition-all border border-[#4169E1]/20 hover:border-[#4169E1]/40"
                        title="Resend email"
                      >
                        <RotateCw className="size-4 text-[#4169E1]" />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Status */}
                {client.status && (
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">
                      Status
                    </label>
                    {!client.favorite ? (
                      // Non-Mantra client - show dropdown
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStatusDropdownOpen(statusDropdownOpen === client.id ? null : client.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${getStatusBadge(
                            client.status
                          )} hover:opacity-90 transition-all shadow-sm`}
                        >
                          {getStatusIcon(client.status)}
                          {client.status}
                          <ChevronDown className="size-3.5 ml-0.5" />
                        </motion.button>

                        {statusDropdownOpen === client.id && (
                          <>
                            {/* Backdrop to close dropdown */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setStatusDropdownOpen(null)}
                            />

                            {/* Dropdown menu */}
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-gray-750 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden backdrop-blur-sm"
                            >
                              {getStatusOptionsForClient(client).map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleChangeStatus(client.id, status)}
                                  className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${
                                    client.status === status
                                      ? "bg-[#4169E1]/5 dark:bg-[#4169E1]/10"
                                      : ""
                                  }`}
                                >
                                  <span className={getStatusBadge(status) + " inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"}>
                                    {getStatusIcon(status)}
                                    {status}
                                  </span>
                                </button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </div>
                    ) : (
                      // Mantra client - no dropdown
                      <motion.span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${getStatusBadgeColor(
                          client.status
                        )}`}
                      >
                        {getStatusIcon(client.status)}
                        {client.status}
                      </motion.span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <Link
                      to={`/clients/${client.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 dark:bg-[#4169E1]/20 dark:hover:bg-[#4169E1]/30 rounded-lg transition-all border border-[#4169E1]/30 text-[#4169E1] font-medium text-sm text-center"
                    >
                      <Eye className="size-4" />
                      View
                    </Link>
                  <Link
                    to="/chat/1"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 dark:bg-[#4169E1]/20 dark:hover:bg-[#4169E1]/30 rounded-lg transition-all border border-[#4169E1]/30 text-[#4169E1] font-medium text-sm"
                  >
                    <MessageSquare className="size-4" />
                    Chat
                  </Link>
                  {!client.favorite && (
                    <Link
                      to={`/clients/${client.id}/edit`}
                      className="p-2.5 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 dark:bg-[#4169E1]/20 dark:hover:bg-[#4169E1]/30 rounded-lg transition-all border border-[#4169E1]/30"
                      title="Edit"
                    >
                      <Edit className="size-4 text-[#4169E1]" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="size-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-4">
                  <Search className="size-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No clients found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
                  {hasActiveFilters
                    ? "Try adjusting your filters or search query."
                    : "Get started by adding your first client."}
                </p>
                {hasActiveFilters ? (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl transition-all font-medium shadow-sm"
                  >
                    <X className="size-4" />
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl transition-all font-medium shadow-sm"
                  >
                    <UserPlus className="size-4" />
                    Add Your First Client
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Pagination */}
        {paginatedClients.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">Rows:</span>
                  <select className="border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-750 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-sm">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-750 dark:hover:bg-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-750 dark:hover:bg-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium"
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onAddClient={handleAddClient}
      />
      {selectedClientId && (
        <div className="fixed inset-0 z-[200] flex justify-end bg-black/40" onClick={() => setSelectedClientId(null)}>
          <div className="h-full w-full max-w-3xl overflow-y-auto bg-[#F8FAFC] dark:bg-gray-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 z-10 flex justify-end bg-white/90 dark:bg-gray-800/90 p-3 backdrop-blur">
              <button onClick={() => setSelectedClientId(null)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close client details"><X className="size-5" /></button>
            </div>
            {(() => { const selected = clients.find((client) => client.id === selectedClientId); return <ClientProfile clientId={selectedClientId} clientName={selected?.name} clientEmail={selected?.email} overlay onClose={() => setSelectedClientId(null)} />; })()}
          </div>
        </div>
      )}
    </div>
  );
}
