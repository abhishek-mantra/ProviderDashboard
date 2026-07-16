import { useNavigate } from "react-router";
import { FileText, Plus, Search, Eye, Filter, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Claim {
  id: string;
  claimNumber: string;
  clientName: string;
  submittedDate: string;
  serviceDate: string;
  amount: string;
  status: "pending" | "approved" | "denied" | "processing";
  payerName: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  initials: string;
  avatarColor: string;
}

export function Claims({
  hideHeader = false,
  showClientSelectModal: externalShowModal,
  setShowClientSelectModal: externalSetShowModal
}: {
  hideHeader?: boolean;
  showClientSelectModal?: boolean;
  setShowClientSelectModal?: (show: boolean) => void;
}) {
  const navigate = useNavigate();
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [claimSearchQuery, setClaimSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "denied" | "processing">("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Use external state if provided, otherwise use internal state
  const showClientSelectModal = externalShowModal !== undefined ? externalShowModal : internalShowModal;
  const setShowClientSelectModal = externalSetShowModal || setInternalShowModal;

  // List of clients with service types
  const clients: Client[] = [
    { id: "1", name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "+1 234 567 8900", serviceType: "Therapy", initials: "SJ", avatarColor: "bg-purple-500" },
    { id: "2", name: "Rachit Sharma", email: "rachit.sharma@email.com", phone: "+91 98765 43210", serviceType: "Therapy", initials: "RS", avatarColor: "bg-blue-500" },
    { id: "3", name: "Aishwarya", email: "aishwarya@email.com", phone: "+91 98765 43211", serviceType: "Nutrition", initials: "A", avatarColor: "bg-green-500" },
    { id: "4", name: "Manisha", email: "manisha@email.com", phone: "+91 98765 43212", serviceType: "Emotional Wellbeing", initials: "M", avatarColor: "bg-pink-500" },
    { id: "5", name: "Mohini", email: "mohini@email.com", phone: "+91 98765 43213", serviceType: "Meditation", initials: "M", avatarColor: "bg-indigo-500" },
    { id: "6", name: "Vineeta Tiwari", email: "vineeta.tiwari@email.com", phone: "+91 98765 43214", serviceType: "Therapy", initials: "VT", avatarColor: "bg-teal-500" },
    { id: "7", name: "Samiksha", email: "samiksha@email.com", phone: "+91 98765 43215", serviceType: "Nutrition", initials: "S", avatarColor: "bg-yellow-500" },
    { id: "8", name: "Michael Chen", email: "michael.chen@email.com", phone: "+1 234 567 8901", serviceType: "Emotional Wellbeing", initials: "MC", avatarColor: "bg-red-500" },
    { id: "9", name: "Bhakti Joshi", email: "bhakti.joshi@email.com", phone: "+91 98765 43216", serviceType: "Meditation", initials: "BJ", avatarColor: "bg-orange-500" },
  ];

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const claims: Claim[] = [
    {
      id: "1",
      claimNumber: "CLM-2026-001",
      clientName: "Sarah Johnson",
      submittedDate: "Mar 10, 2026",
      serviceDate: "Mar 8, 2026",
      amount: "$150.00",
      status: "approved",
      payerName: "UnitedHealthcare"
    },
    {
      id: "2",
      claimNumber: "CLM-2026-002",
      clientName: "Rachit Sharma",
      submittedDate: "Mar 12, 2026",
      serviceDate: "Mar 10, 2026",
      amount: "$120.00",
      status: "processing",
      payerName: "Cigna"
    },
    {
      id: "3",
      claimNumber: "CLM-2026-003",
      clientName: "Aishwarya",
      submittedDate: "Mar 14, 2026",
      serviceDate: "Mar 12, 2026",
      amount: "$95.00",
      status: "pending",
      payerName: "Oscar Health"
    },
    {
      id: "4",
      claimNumber: "CLM-2026-004",
      clientName: "Manisha",
      submittedDate: "Feb 28, 2026",
      serviceDate: "Feb 26, 2026",
      amount: "$110.00",
      status: "approved",
      payerName: "Aetna"
    },
    {
      id: "5",
      claimNumber: "CLM-2026-005",
      clientName: "Mohini",
      submittedDate: "Mar 5, 2026",
      serviceDate: "Mar 3, 2026",
      amount: "$85.00",
      status: "denied",
      payerName: "Blue Cross Blue Shield"
    },
    {
      id: "6",
      claimNumber: "CLM-2026-006",
      clientName: "Vineeta Tiwari",
      submittedDate: "Mar 15, 2026",
      serviceDate: "Mar 13, 2026",
      amount: "$130.00",
      status: "processing",
      payerName: "UnitedHealthcare"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Approved
          </span>
        );
      case "denied":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            Denied
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            Processing
          </span>
        );
      default:
        return null;
    }
  };

  const handleClientSelect = (client: Client) => {
    setShowClientSelectModal(false);
    setSearchQuery("");
    // Navigate to session selection page for the selected client
    navigate(`/claims/new/${client.id}`, { state: { client } });
  };

  // Filter claims
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.clientName.toLowerCase().includes(claimSearchQuery.toLowerCase()) ||
      claim.claimNumber.toLowerCase().includes(claimSearchQuery.toLowerCase()) ||
      claim.payerName.toLowerCase().includes(claimSearchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get client info
  const getClientInfo = (clientName: string) => {
    return clients.find(c => c.name === clientName);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {!hideHeader && (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0 pb-4">
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              Insurance Claims
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
              Manage and track all your insurance claims
            </p>
          </div>

          {/* New Claim Button */}
          <button
            onClick={() => setShowClientSelectModal(true)}
            className="flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-colors shadow-sm hover:shadow-md flex-shrink-0 w-full md:w-auto"
          >
            <Plus className="size-4 md:size-5" />
            <span>New Claim</span>
          </button>
        </div>
      )}

      {/* Claims Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-3 md:p-6">
          {/* Search and Filter */}
          <div className="flex flex-col gap-2 mb-4 md:mb-6">
            {/* Search Bar with Filter Icon */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-gray-400" />
                <input
                  type="text"
                  value={claimSearchQuery}
                  onChange={(e) => setClaimSearchQuery(e.target.value)}
                  className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 focus:border-[#043570] text-xs md:text-sm"
                  placeholder="Search claims..."
                />
              </div>
              
              {/* Filter Icon (Mobile Only) */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                {showMobileFilters ? (
                  <X className="size-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Filter className="size-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>

            {/* Desktop Status Filter Buttons (Always Visible) */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-1 rounded-lg overflow-x-auto">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "all"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "pending"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter("processing")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "processing"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setStatusFilter("approved")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "approved"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setStatusFilter("denied")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "denied"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Denied
              </button>
            </div>

            {/* Mobile Filter Dropdown (Collapsible) */}
            {showMobileFilters && (
              <div className="md:hidden bg-gray-50 dark:bg-gray-750 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`flex-1 min-w-[calc(50%-4px)] px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === "all"
                        ? "bg-[#043570] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter("pending")}
                    className={`flex-1 min-w-[calc(50%-4px)] px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === "pending"
                        ? "bg-[#043570] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setStatusFilter("processing")}
                    className={`flex-1 min-w-[calc(50%-4px)] px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === "processing"
                        ? "bg-[#043570] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => setStatusFilter("approved")}
                    className={`flex-1 min-w-[calc(50%-4px)] px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === "approved"
                        ? "bg-[#043570] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setStatusFilter("denied")}
                    className={`flex-1 min-w-[calc(50%-4px)] px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === "denied"
                        ? "bg-[#043570] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    Denied
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <FileText className="size-4 md:size-5 text-[#043570]" />
            <h2 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">All Claims</h2>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">({filteredClaims.length})</span>
          </div>

          {/* Claims List - Card Based */}
          <div className="space-y-2 md:space-y-3">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim, index) => {
                const clientInfo = getClientInfo(claim.clientName);
                return (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    className="group p-3 md:p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg md:rounded-xl transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center gap-4">
                      {/* Client Avatar */}
                      {clientInfo ? (
                        <div className={`size-12 ${clientInfo.avatarColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-semibold text-sm">{clientInfo.initials}</span>
                        </div>
                      ) : (
                        <div className="size-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="size-5 text-gray-600 dark:text-gray-400" />
                        </div>
                      )}

                      {/* Claim Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {claim.claimNumber}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{claim.clientName}</span>
                          {getStatusBadge(claim.status)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {claim.payerName} · Service: {claim.serviceDate} · Submitted: {claim.submittedDate}
                        </div>
                      </div>

                      {/* Amount and Actions */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                          {claim.amount}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/claims/${claim.id}`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#043570] dark:hover:text-[#00c0ff] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Eye className="size-3.5" />
                          View
                        </button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-2">
                      {/* Header Row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {/* Client Avatar */}
                          {clientInfo ? (
                            <div className={`size-8 ${clientInfo.avatarColor} rounded-md flex items-center justify-center flex-shrink-0`}>
                              <span className="text-white font-semibold text-[10px]">{clientInfo.initials}</span>
                            </div>
                          ) : (
                            <div className="size-8 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center flex-shrink-0">
                              <FileText className="size-3.5 text-gray-600 dark:text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {claim.claimNumber}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {claim.clientName}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 capitalize">
                            {claim.status === "processing" ? "Process..." : claim.status}
                          </span>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {claim.amount}
                          </div>
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="pl-10 space-y-0.5">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">{claim.payerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                          <span>Service: {claim.serviceDate}</span>
                          <span>•</span>
                          <span>Filed: {claim.submittedDate}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 md:py-12">
                <FileText className="size-10 md:size-12 text-gray-300 dark:text-gray-600 mx-auto mb-2 md:mb-3" />
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">No claims found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Client Selection Modal */}
      <AnimatePresence>
        {showClientSelectModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowClientSelectModal(false);
                setSearchQuery("");
              }}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Select Client
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose a client to create a new claim
                </p>

                {/* Search */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    autoFocus
                  />
                </div>
              </div>

              {/* Client List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredClients.length > 0 ? (
                  <div className="p-2">
                    {filteredClients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => handleClientSelect(client)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl transition-colors"
                      >
                        <div className={`size-10 ${client.avatarColor} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                          {client.initials}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {client.serviceType}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No clients found
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}