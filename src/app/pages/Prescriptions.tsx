import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Search, Plus, ChevronDown, Calendar, User, Filter, Eye, X, ChevronRight, Download, Printer, Pill, Users, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FreeTrialBanner } from "../components/monetization/FreeTrialBanner";
import { usePlanMode } from "../contexts/PlanModeContext";
import { AddPrescriptionModal } from "../components/AddPrescriptionModal";

interface Prescription {
  id: string;
  prescriptionNumber: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  providerType: string;
  complaint: string;
  date: string;
  prescribedBy: string;
  transcript?: {
    id: string;
    date: string;
    preview?: string;
  };
}

export function Prescriptions() {
  const navigate = useNavigate();
  const { planMode } = usePlanMode();
  const isTranscriberOnly = planMode === "transcriber-only";
  const { id: clientIdFromUrl } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>("all");
  const [isAddPrescriptionModalOpen, setIsAddPrescriptionModalOpen] = useState(false);
  const [clientFilterSearchQuery, setClientFilterSearchQuery] = useState("");

  // Mock prescriptions data
  const prescriptions: Prescription[] = [
    {
      id: "1",
      prescriptionNumber: "#242",
      clientId: "1",
      clientName: "Sarah Johnson",
      clientAvatar: "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDYwODg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "General Physician",
      complaint: "Persistent cough and chest congestion",
      date: "Mar 14, 2024",
      prescribedBy: "Dr. Smith",
    },
    {
      id: "2",
      prescriptionNumber: "#242",
      clientId: "1",
      clientName: "Sarah Johnson",
      clientAvatar: "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDYwODg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "General Physician",
      complaint: "Follow-up: Respiratory infection",
      date: "Mar 10, 2024",
      prescribedBy: "Dr. Smith",
    },
    {
      id: "3",
      prescriptionNumber: "#248",
      clientId: "2",
      clientName: "Michael Chen",
      clientAvatar: "https://images.unsplash.com/photo-1766066014773-0074bf4911de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDU2MDg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "Psychiatrist",
      complaint: "Anxiety and sleep disturbances",
      date: "Mar 12, 2024",
      prescribedBy: "Dr. Smith",
    },
    {
      id: "4",
      prescriptionNumber: "#250",
      clientId: "3",
      clientName: "David Martinez",
      clientAvatar: "https://images.unsplash.com/photo-1553690300-93871c6a6654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoaXNwYW5pYyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDU4NzUwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "General Physician",
      complaint: "Headaches and fatigue",
      date: "Mar 8, 2024",
      prescribedBy: "Dr. Garcia",
    },
    {
      id: "5",
      prescriptionNumber: "#251",
      clientId: "4",
      clientName: "Emily Watson",
      clientAvatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0NTc4OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "Psychiatrist",
      complaint: "Depression and low energy",
      date: "Mar 6, 2024",
      prescribedBy: "Dr. Green",
    },
    {
      id: "6",
      prescriptionNumber: "#252",
      clientId: "5",
      clientName: "Priya Sharma",
      clientAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjB3b21hbiUyMGhlYWRzaG90fGVufDB8fHx8MTc3NDYwODkxOHww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "General Physician",
      complaint: "Seasonal allergies",
      date: "Mar 4, 2024",
      prescribedBy: "Dr. Smith",
    },
    {
      id: "7",
      prescriptionNumber: "#253",
      clientId: "2",
      clientName: "Michael Chen",
      clientAvatar: "https://images.unsplash.com/photo-1766066014773-0074bf4911de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDU2MDg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "Psychiatrist",
      complaint: "Follow-up: Anxiety management",
      date: "Feb 28, 2025",
      prescribedBy: "Dr. Smith",
    },
    {
      id: "8",
      prescriptionNumber: "#254",
      clientId: "168019",
      clientName: "Rachit",
      clientAvatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5OTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "Psychiatrist",
      complaint: "Stress management and coping strategies",
      date: "Apr 1, 2026",
      prescribedBy: "Dr. Smith",
    },
    {
      id: "9",
      prescriptionNumber: "#255",
      clientId: "168019",
      clientName: "Rachit",
      clientAvatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5OTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      providerType: "General Physician",
      complaint: "Annual health check-up",
      date: "Mar 28, 2026",
      prescribedBy: "Dr. Garcia",
    },
  ];

  // Mock clients
  const clients = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Chen" },
    { id: "3", name: "David Martinez" },
    { id: "4", name: "Emily Watson" },
    { id: "5", name: "Priya Sharma" },
    { id: "168019", name: "Rachit" },
  ];

  // Set the selected client filter based on URL parameter when component mounts
  useEffect(() => {
    if (clientIdFromUrl) {
      const client = prescriptions.find(p => p.clientId === clientIdFromUrl);
      if (client) {
        setSelectedClientFilter(clientIdFromUrl);
      }
    }
  }, [clientIdFromUrl]);

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      searchQuery === "" ||
      prescription.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.complaint.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClientFilter =
      selectedClientFilter === "all" ||
      prescription.clientId === selectedClientFilter;

    return matchesSearch && matchesClientFilter;
  });

  return (
    <div className="max-w-[1400px]">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              Prescriptions
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              View and manage all prescriptions across clients
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Client Dropdown - Only show in Full EHR mode */}
            {!isTranscriberOnly && (
              <div className="relative flex-1 md:flex-initial">
                <button
                  onClick={() => setShowClientDropdown(!showClientDropdown)}
                  className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all shadow-sm font-semibold text-gray-700 dark:text-gray-300 text-sm w-full md:w-auto justify-center"
                >
                  <User className="size-4 md:size-5 flex-shrink-0" />
                  <span className="truncate max-w-[60px] md:max-w-none">
                    {selectedClientFilter === "all"
                      ? "All Clients"
                      : clients.find((c) => c.id === selectedClientFilter)?.name}
                  </span>
                  <ChevronDown className="size-4 flex-shrink-0" />
                </button>

                {showClientDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => {
                        setShowClientDropdown(false);
                        setClientFilterSearchQuery("");
                      }}
                    />
                    <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-56 md:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2 max-h-[350px] overflow-hidden flex flex-col">
                      {/* Search Bar */}
                      <div className="px-3 pb-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search clients..."
                            value={clientFilterSearchQuery}
                            onChange={(e) => setClientFilterSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043570] focus:border-transparent dark:text-white placeholder:text-gray-400 text-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      {/* Options */}
                      <div className="overflow-y-auto">
                        <button
                          onClick={() => {
                            setSelectedClientFilter("all");
                            setShowClientDropdown(false);
                            setClientFilterSearchQuery("");
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
                        {clients
                          .filter((client) =>
                            client.name.toLowerCase().includes(clientFilterSearchQuery.toLowerCase())
                          )
                          .map((client) => (
                            <button
                              key={client.id}
                              onClick={() => {
                                setSelectedClientFilter(client.id);
                                setShowClientDropdown(false);
                                setClientFilterSearchQuery("");
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
                    </div>
                  </>
                )}
              </div>
            )}

            <button
              onClick={() => setIsAddPrescriptionModalOpen(true)}
              className="flex items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-xl transition-all font-semibold shadow-sm hover:shadow-md text-sm flex-shrink-0"
            >
              <Plus className="size-4 md:size-5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Free Trial Banner */}
        <FreeTrialBanner toolName="Prescriptions" />

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent dark:text-white placeholder-gray-400 shadow-sm text-sm"
            />
          </div>
          {/* Filter Button - Icon only on mobile, with text on desktop */}
          <button className="flex items-center justify-center md:gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 md:px-4 md:py-3.5 rounded-xl transition-all shadow-sm font-semibold text-gray-700 dark:text-gray-300 text-sm">
            <Filter className="size-4 md:size-5" />
            <span className="hidden md:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-8">
        {/* Total Prescriptions */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Pill className="size-3.5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">9</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">prescriptions</span>
          </div>
        </div>

        {/* Generated with AI */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="size-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">6</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">AI generated</span>
          </div>
        </div>

        {/* Credits Used */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full md:rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2.5">
          <div className="size-7 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="size-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">6</span>
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

      {/* Prescriptions List */}
      {filteredPrescriptions.length > 0 ? (
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription, index) => {
            const clientInitials = prescription.clientName
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-5 hover:border-[#14B8A6] dark:hover:border-[#14B8A6] hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left Side - Avatar and Content */}
                  <div className="flex items-start sm:items-center gap-3 md:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                    {/* Client Avatar */}
                    {prescription.clientAvatar ? (
                      <ImageWithFallback
                        src={prescription.clientAvatar}
                        alt={prescription.clientName}
                        className="size-12 md:size-[60px] rounded-xl object-cover flex-shrink-0"
                        fallback={
                          <div className="size-12 md:size-[60px] bg-gradient-to-br from-[#14B8A6] to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                            {clientInitials}
                          </div>
                        }
                      />
                    ) : (
                      <div className="size-12 md:size-[60px] bg-gradient-to-br from-[#14B8A6] to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                        {clientInitials}
                      </div>
                    )}

                    {/* Prescription Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                        <div className="text-base md:text-[18px] font-bold text-[#020817] dark:text-white">
                          {prescription.clientName}
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-semibold rounded-md whitespace-nowrap">
                          {prescription.prescriptionNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <User className="size-3 md:size-3.5 flex-shrink-0" />
                        <span className="truncate">{prescription.providerType}</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                        {prescription.complaint}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Calendar className="size-3 md:size-3.5 flex-shrink-0" />
                          <span className="whitespace-nowrap">{prescription.date}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <User className="size-3 md:size-3.5 flex-shrink-0" />
                          <span className="truncate">{prescription.prescribedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        // TODO: Implement download functionality
                        alert('Download prescription');
                      }}
                      className="group/download flex items-center justify-center gap-2 px-2 hover:px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-lg transition-all font-semibold text-sm"
                      title="Download"
                    >
                      <Download className="size-4" />
                      <span className="hidden group-hover/download:inline max-w-0 group-hover/download:max-w-[5rem] overflow-hidden transition-all duration-200">Download</span>
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Implement print functionality
                        window.print();
                      }}
                      className="group/print flex items-center justify-center gap-2 px-2 hover:px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-lg transition-all font-semibold text-sm"
                      title="Print"
                    >
                      <Printer className="size-4" />
                      <span className="hidden group-hover/print:inline max-w-0 group-hover/print:max-w-[3rem] overflow-hidden transition-all duration-200">Print</span>
                    </button>
                    <button
                      onClick={() => navigate(`/prescription/${prescription.id}`)}
                      className="group/view flex items-center justify-center gap-2 px-2 hover:px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-lg transition-all font-semibold text-sm"
                      title="View"
                    >
                      <Eye className="size-4" />
                      <span className="hidden group-hover/view:inline max-w-0 group-hover/view:max-w-[4rem] overflow-hidden transition-all duration-200">View</span>
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
            <div className="size-16 md:size-20 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-sm">
              <svg className="size-8 md:size-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "No prescriptions found" : "No prescriptions yet"}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6 max-w-md mx-auto px-4">
              {searchQuery
                ? "Try adjusting your search criteria or clear the search to see all prescriptions"
                : "Start adding prescriptions for your clients to see them listed here"}
            </p>
            <button
              onClick={() => setIsAddPrescriptionModalOpen(true)}
              className="flex items-center gap-2 bg-[#00c0ff] hover:bg-[#00a8e6] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-semibold mx-auto text-sm"
            >
              <Plus className="size-4 md:size-5" />
              Add First Prescription
            </button>
          </div>
        </div>
      )}

      <AddPrescriptionModal
        isOpen={isAddPrescriptionModalOpen}
        onClose={() => setIsAddPrescriptionModalOpen(false)}
      />
    </div>
  );
}