import { useNavigate } from "react-router";
import { FileText, Plus, Send, X, Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  issuedDate: string;
  dueDate: string;
  amount: string;
  status: "sent" | "draft" | "paid" | "overdue";
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  initials: string;
  avatarColor: string;
  avatar?: string;
}

export function Invoices({ 
  hideHeader = false,
  showClientSelectModal: externalShowModal,
  setShowClientSelectModal: externalSetShowModal,
  clientFilter = "all"
}: { 
  hideHeader?: boolean;
  showClientSelectModal?: boolean;
  setShowClientSelectModal?: (show: boolean) => void;
  clientFilter?: string;
}) {
  const navigate = useNavigate();
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "sent" | "draft" | "paid" | "overdue">("all");
  const [clientNameFilter, setClientNameFilter] = useState<string>("all");
  const [clientFilterDropdownOpen, setClientFilterDropdownOpen] = useState(false);
  const [clientFilterSearchQuery, setClientFilterSearchQuery] = useState("");

  // Read clientName from URL search params and set filter
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const clientNameParam = searchParams.get('clientName');
    if (clientNameParam) {
      setClientNameFilter(clientNameParam);
    }
  }, []);

  // Use external state if provided, otherwise use internal state
  const showClientSelectModal = externalShowModal !== undefined ? externalShowModal : internalShowModal;
  const setShowClientSelectModal = externalSetShowModal || setInternalShowModal;

  // List of clients with service types
  const clients: Client[] = [
    { id: "1", name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "+1 234 567 8900", serviceType: "Therapy", initials: "SJ", avatarColor: "bg-purple-500", avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0MjI4OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "2", name: "Rachit Sharma", email: "rachit.sharma@email.com", phone: "+91 98765 43210", serviceType: "Therapy", initials: "RS", avatarColor: "bg-blue-500", avatar: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDMyNzc0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "3", name: "Aishwarya", email: "aishwarya@email.com", phone: "+91 98765 43211", serviceType: "Nutrition", initials: "A", avatarColor: "bg-green-500", avatar: "https://images.unsplash.com/photo-1583590019912-19cdc55ec80e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDIyNjE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "4", name: "Manisha", email: "manisha@email.com", phone: "+91 98765 43212", serviceType: "Emotional Wellbeing", initials: "M", avatarColor: "bg-pink-500", avatar: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0MjQ5OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "5", name: "Mohini", email: "mohini@email.com", phone: "+91 98765 43213", serviceType: "Meditation", initials: "M", avatarColor: "bg-indigo-500", avatar: "https://images.unsplash.com/photo-1590563152569-bd0b2dae4418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwd29tYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQyNzQ0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "6", name: "Vineeta Tiwari", email: "vineeta.tiwari@email.com", phone: "+91 98765 43214", serviceType: "Therapy", initials: "VT", avatarColor: "bg-teal-500", avatar: "https://images.unsplash.com/photo-1761243892035-c3e13829115a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0Mjc0NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "7", name: "Samiksha", email: "samiksha@email.com", phone: "+91 98765 43215", serviceType: "Nutrition", initials: "S", avatarColor: "bg-yellow-500", avatar: "https://images.unsplash.com/photo-1758598306913-5cd682b9e53b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MjYxODY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "8", name: "Michael Chen", email: "michael.chen@email.com", phone: "+1 234 567 8901", serviceType: "Emotional Wellbeing", initials: "MC", avatarColor: "bg-red-500", avatar: "https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzMzQxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "9", name: "Bhakti Joshi", email: "bhakti.joshi@email.com", phone: "+91 98765 43216", serviceType: "Meditation", initials: "BJ", avatarColor: "bg-orange-500", avatar: "https://images.unsplash.com/photo-1605298046196-e205d0d699d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc3NDIxOTQ2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ];

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const invoices: Invoice[] = [
    {
      id: "001",
      invoiceNumber: "#001",
      client: "Rachit Sharma",
      issuedDate: "Jan 15, 2026",
      dueDate: "Jan 29, 2026",
      amount: "$105.00",
      status: "sent",
    },
    {
      id: "002",
      invoiceNumber: "#002",
      client: "Rachit Sharma",
      issuedDate: "Jan 22, 2026",
      dueDate: "Feb 5, 2026",
      amount: "$78.75",
      status: "draft",
    },
    {
      id: "003",
      invoiceNumber: "#003",
      client: "Aishwarya",
      issuedDate: "Feb 10, 2026",
      dueDate: "Feb 24, 2026",
      amount: "$150.00",
      status: "sent",
    },
    {
      id: "004",
      invoiceNumber: "#004",
      client: "Manisha",
      issuedDate: "Feb 18, 2026",
      dueDate: "Mar 4, 2026",
      amount: "$95.50",
      status: "paid",
    },
    {
      id: "005",
      invoiceNumber: "#005",
      client: "Mohini",
      issuedDate: "Mar 1, 2026",
      dueDate: "Mar 15, 2026",
      amount: "$120.00",
      status: "sent",
    },
    {
      id: "006",
      invoiceNumber: "#006",
      client: "Vineeta Tiwari",
      issuedDate: "Mar 5, 2026",
      dueDate: "Mar 19, 2026",
      amount: "$85.00",
      status: "draft",
    },
    {
      id: "007",
      invoiceNumber: "#007",
      client: "Samiksha",
      issuedDate: "Mar 8, 2026",
      dueDate: "Mar 22, 2026",
      amount: "$200.00",
      status: "sent",
    },
    {
      id: "008",
      invoiceNumber: "#008",
      client: "Sarah Johnson",
      issuedDate: "Jan 10, 2026",
      dueDate: "Jan 20, 2026",
      amount: "$110.00",
      status: "overdue",
    },
    {
      id: "009",
      invoiceNumber: "#009",
      client: "Michael Chen",
      issuedDate: "Feb 14, 2026",
      dueDate: "Feb 28, 2026",
      amount: "$175.00",
      status: "paid",
    },
    {
      id: "010",
      invoiceNumber: "#010",
      client: "Bhakti Joshi",
      issuedDate: "Mar 12, 2026",
      dueDate: "Mar 26, 2026",
      amount: "$130.00",
      status: "draft",
    },
  ];

  const getStatusStyles = (status: Invoice["status"]) => {
    switch (status) {
      case "sent":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "draft":
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
      case "paid":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "overdue":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(invoiceSearchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    const matchesClient = clientFilter === "all" || invoice.client === clientFilter;
    const matchesClientNameFilter = clientNameFilter === "all" || invoice.client === clientNameFilter;
    return matchesSearch && matchesStatus && matchesClient && matchesClientNameFilter;
  });

  // Get client info
  const getClientInfo = (clientName: string) => {
    return clients.find(c => c.name === clientName);
  };

  // Get unique client names from invoices
  const uniqueClientNames = Array.from(new Set(invoices.map(inv => inv.client))).sort();

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-2 md:p-6">
      <div className="space-y-3 md:space-y-6">
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-start justify-between pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">Invoices</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Manage and track all your client invoices in one place.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Client Name Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setClientFilterDropdownOpen(!clientFilterDropdownOpen);
                  if (!clientFilterDropdownOpen) {
                    setClientFilterSearchQuery("");
                  }
                }}
                className="pl-4 pr-10 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium border border-gray-200 dark:border-gray-700 hover:border-[#4169E1] dark:hover:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 transition-colors cursor-pointer"
              >
                {clientNameFilter === "all" ? "All Clients" : clientNameFilter}
              </button>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none transition-transform ${clientFilterDropdownOpen ? 'rotate-180' : ''}`} />

              {clientFilterDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => {
                      setClientFilterDropdownOpen(false);
                      setClientFilterSearchQuery("");
                    }}
                  />
                  <div className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 max-h-80 overflow-hidden flex flex-col">
                    <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search clients..."
                          value={clientFilterSearchQuery}
                          onChange={(e) => setClientFilterSearchQuery(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043570] focus:border-transparent dark:text-white placeholder:text-gray-400 text-sm"
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto">
                      <button
                        onClick={() => {
                          setClientNameFilter("all");
                          setClientFilterDropdownOpen(false);
                          setClientFilterSearchQuery("");
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          clientNameFilter === "all" ? "bg-blue-50 dark:bg-blue-900/20 text-[#4169E1] dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        All Clients
                      </button>
                      {uniqueClientNames
                        .filter((clientName) =>
                          clientName.toLowerCase().includes(clientFilterSearchQuery.toLowerCase())
                        )
                        .map((clientName) => (
                          <button
                            key={clientName}
                            onClick={() => {
                              setClientNameFilter(clientName);
                              setClientFilterDropdownOpen(false);
                              setClientFilterSearchQuery("");
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                              clientNameFilter === clientName ? "bg-blue-50 dark:bg-blue-900/20 text-[#4169E1] dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {clientName}
                          </button>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Create Invoice Button */}
            <button
              onClick={() => setShowClientSelectModal(true)}
              className="px-4 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="size-5" />
              Create Invoice
            </button>
          </div>
        </div>
      )}

      {/* Invoices Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-2 md:p-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-3 md:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-gray-400" />
              <input
                type="text"
                value={invoiceSearchQuery}
                onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#043570]/20 focus:border-[#043570] text-xs md:text-sm"
                placeholder="Search invoices..."
              />
            </div>
            <div className="flex items-center gap-1 md:gap-2 bg-gray-50 dark:bg-gray-700 p-0.5 md:p-1 rounded-lg overflow-x-auto">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-[10px] md:text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "all"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("sent")}
                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-[10px] md:text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "sent"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Sent
              </button>
              <button
                onClick={() => setStatusFilter("draft")}
                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-[10px] md:text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "draft"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => setStatusFilter("paid")}
                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-[10px] md:text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "paid"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => setStatusFilter("overdue")}
                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-[10px] md:text-sm font-medium transition-colors whitespace-nowrap ${
                  statusFilter === "overdue"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Overdue
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <FileText className="size-4 md:size-5 text-[#043570]" />
            <h2 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">All Invoices</h2>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">({filteredInvoices.length})</span>
          </div>

          {/* Invoices List */}
          <div className="space-y-2 md:space-y-3">{filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice, index) => {
              const clientInfo = getClientInfo(invoice.client);
              return (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => navigate(`/invoices/${invoice.id}`)}
                  className="group p-2 md:p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg md:rounded-xl transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    {/* Top Row: Avatar + Client Info + Amount */}
                    <div className="flex items-start gap-2 mb-2">
                      {/* Client Avatar */}
                      {clientInfo ? (
                        clientInfo.avatar ? (
                          <ImageWithFallback
                            src={clientInfo.avatar}
                            alt={clientInfo.name}
                            className="size-10 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className={`size-10 ${clientInfo.avatarColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white font-semibold text-xs">{clientInfo.initials}</span>
                          </div>
                        )
                      ) : (
                        <div className="size-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="size-4 text-gray-600 dark:text-gray-400" />
                        </div>
                      )}

                      {/* Invoice Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <button
                            onClick={() => navigate(`/invoices/${invoice.id}`)}
                            className="font-semibold text-sm text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] transition-colors"
                          >
                            {invoice.invoiceNumber}
                          </button>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-medium capitalize ${getStatusStyles(
                              invoice.status
                            )}`}
                          >
                            {invoice.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">{invoice.client}</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">
                          Issued: {invoice.issuedDate}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">
                          Due: {invoice.dueDate}
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-base font-bold text-gray-900 dark:text-white">
                          {invoice.amount}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => navigate(`/invoices/${invoice.id}`)}
                        className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-[#043570] dark:hover:text-[#00c0ff] bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <Send className="size-3" />
                        Send
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center gap-4">
                    {/* Client Avatar */}
                    {clientInfo ? (
                      clientInfo.avatar ? (
                        <ImageWithFallback
                          src={clientInfo.avatar}
                          alt={clientInfo.name}
                          className="size-12 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className={`size-12 ${clientInfo.avatarColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-semibold text-sm">{clientInfo.initials}</span>
                        </div>
                      )
                    ) : (
                      <div className="size-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="size-5 text-gray-600 dark:text-gray-400" />
                      </div>
                    )}

                    {/* Invoice Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => navigate(`/invoices/${invoice.id}`)}
                          className="font-semibold text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] transition-colors"
                        >
                          {invoice.invoiceNumber}
                        </button>
                        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{invoice.client}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${getStatusStyles(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Issued: {invoice.issuedDate} · Due: {invoice.dueDate}
                      </div>
                    </div>

                    {/* Amount and Actions */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {invoice.amount}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/invoices/${invoice.id}`)}
                          className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#043570] dark:hover:text-[#00c0ff] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          View
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-lg text-sm font-medium transition-colors">
                          <Send className="size-3.5" />
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <FileText className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No invoices found</p>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Client Select Modal */}
      <AnimatePresence>
        {showClientSelectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50"
            onClick={() => setShowClientSelectModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-xl border-2 border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20"
                    placeholder="Search clients..."
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto max-h-80 space-y-1">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => {
                        navigate(`/invoices/create`, { state: { client } });
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors text-left"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 ${client.avatarColor} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-medium text-sm">{client.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {client.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {client.serviceType}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No clients found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}