import { useState } from "react";
import { Check, X, Search, Filter, Clock, Building2, User, ChevronRight, MapPin, Languages, Zap, UserCheck, Crown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

interface Request {
  id: string;
  clientName: string;
  service: string;
  date: string;
  details: string;
  gender?: string;
  language: string;
  location: string;
  experience: string;
  rate: string;
  regularRate?: string;
  avatar?: string;
  requestedBy: boolean;
  clientType: "B2B" | "B2C";
  isTrial: boolean;
  status: "pending" | "accepted" | "declined" | "missed";
  timeSlots?: string[];
}

export function Requests() {
  const navigate = useNavigate();
  const [devMode, setDevMode] = useState<"with-clients" | "no-clients">("with-clients");
  const [activeTab, setActiveTab] = useState<"pending" | "accepted" | "declined">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredDetails, setHoveredDetails] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [hoveredAssignmentType, setHoveredAssignmentType] = useState<string | null>(null);

  const allRequests: Request[] = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      service: "Therapy for Hypertension",
      date: "Feb 26",
      details: "Therapy for Hypertension, ADHD, Abuse, Addiction, Anger, Anxiety, Bipolar, Child Or Teen, Depression, Family, Insomnia, LGBTQ+, OCD, Panic Attacks, Relationship/Couple, Sex Therapy, Spiritual, Stress Management, Trauma And PTSD, Workplace Issues, Employee Mental Health / EAP, Marriage, Divorce, Online Therapy",
      language: "English",
      location: "United States",
      experience: "1 year",
      rate: "$5",
      regularRate: "$10",
      requestedBy: false,
      clientType: "B2C",
      isTrial: true,
      status: "pending",
      timeSlots: ["Morning", "Afternoon", "Early Evening"],
    },
    {
      id: "2",
      clientName: "Michael Chen",
      service: "Therapy for ADHD, Anxiety",
      date: "Feb 25",
      details: "Therapy for ADHD, Anxiety, Bipolar, Child Or Teen, Depression, Family, Insomnia, LGBTQ+, OCD",
      language: "English",
      location: "United Kingdom",
      experience: "1 year",
      rate: "$8",
      requestedBy: true,
      clientType: "B2B",
      isTrial: true,
      status: "pending",
      timeSlots: ["Early Morning", "Late Morning"],
    },
    {
      id: "3",
      clientName: "Priya Sharma",
      service: "Dietitian for Weight Loss",
      date: "Feb 24",
      details: "Nutrition counseling for weight management, PCOS, diabetes prevention",
      gender: "Female",
      language: "English, Hindi",
      location: "India",
      experience: "2 years",
      rate: "$12",
      requestedBy: false,
      clientType: "B2C",
      isTrial: false,
      status: "pending",
      timeSlots: ["Evening", "Late Night"],
    },
    {
      id: "4",
      clientName: "David Martinez",
      service: "Physiotherapy for Back Pain",
      date: "Feb 23",
      details: "Physical therapy for chronic lower back pain, posture correction, mobility exercises",
      language: "English, Spanish",
      location: "United States",
      experience: "3 years",
      rate: "$15",
      requestedBy: true,
      clientType: "B2B",
      isTrial: false,
      status: "pending",
      timeSlots: [],
    },
    {
      id: "5",
      clientName: "Emily Watson",
      service: "Therapy for Stress Management",
      date: "Feb 22",
      details: "Therapy for Stress Management, Workplace Issues, Relationship/Couple, Sex Therapy",
      language: "English",
      location: "Canada",
      experience: "1 year",
      rate: "$6",
      regularRate: "$12",
      requestedBy: false,
      clientType: "B2C",
      isTrial: true,
      status: "accepted",
    },
    {
      id: "6",
      clientName: "Rajesh Kumar",
      service: "Dietitian for Diabetes",
      date: "Feb 21",
      details: "Diabetes management, meal planning, nutritional counseling for Type 2 diabetes",
      language: "English, Hindi",
      location: "India",
      experience: "1 year",
      rate: "$10",
      requestedBy: true,
      clientType: "B2B",
      isTrial: false,
      status: "accepted",
    },
    {
      id: "7",
      clientName: "Anna Foster",
      service: "Therapy for Anxiety",
      date: "Feb 20",
      details: "Therapy for Anxiety, Panic Attacks, PTSD",
      language: "English",
      location: "United States",
      experience: "2 years",
      rate: "$7",
      regularRate: "$14",
      requestedBy: false,
      clientType: "B2C",
      isTrial: true,
      status: "declined",
    },
    {
      id: "8",
      clientName: "James Wilson",
      service: "Personal Coach",
      date: "Feb 19",
      details: "Life coaching, career guidance, goal setting",
      language: "English",
      location: "United Kingdom",
      experience: "1 year",
      rate: "$20",
      requestedBy: true,
      clientType: "B2C",
      isTrial: false,
      status: "missed",
    },
  ];

  const filteredRequests = allRequests.filter((request) => {
    const matchesTab =
      activeTab === "pending"
        ? request.status === "pending"
        : activeTab === "accepted"
        ? request.status === "accepted"
        : request.status === "declined" || request.status === "missed";

    const matchesSearch =
      searchQuery === "" ||
      request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.service.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const pendingCount = allRequests.filter((r) => r.status === "pending").length;
  const acceptedCount = allRequests.filter((r) => r.status === "accepted").length;
  const declinedCount = allRequests.filter(
    (r) => r.status === "declined" || r.status === "missed"
  ).length;

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined / Missed";
      default:
        return tab;
    }
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case "pending":
        return pendingCount;
      case "accepted":
        return acceptedCount;
      case "declined":
        return declinedCount;
      default:
        return null;
    }
  };

  const getTimeSlotDetails = (slotName: string) => {
    const slots: Record<string, string> = {
      "Early Morning": "5 AM - 8 AM",
      "Morning": "8 AM - 11 AM",
      "Late Morning": "11 AM - 2 PM",
      "Afternoon": "2 PM - 5 PM",
      "Early Evening": "5 PM - 8 PM",
      "Evening": "8 PM - 11 PM",
      "Late Night": "11 PM - 2 AM",
      "Overnight": "2 AM - 5 AM",
    };
    return slots[slotName] || slotName;
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Client Leads</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Accept new client session requests
          </p>
        </div>
        
        {/* Dev Mode Toggle */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-1">
          <button
            onClick={() => setDevMode("with-clients")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              devMode === "with-clients"
                ? "bg-[#4169E1] text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            With Clients
          </button>
          <button
            onClick={() => setDevMode("no-clients")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              devMode === "no-clients"
                ? "bg-[#4169E1] text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            No Clients
          </button>
        </div>
      </div>

      {devMode === "no-clients" ? (
        /* No Clients Empty State */
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col items-center justify-center py-24 px-6">
            {/* Icon with animated background */}
            <div className="relative mb-8">
              {/* Main icon container */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-[#4169E1] to-[#00c0ff] rounded-3xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <Crown className="size-16 text-white" strokeWidth={1.5} />
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00c0ff] rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#4169E1] rounded-full"></div>
            </div>

            {/* Text content */}
            <div className="text-center max-w-lg mb-10">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Grow Your Practice?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                Join the <span className="font-semibold text-[#4169E1]">Mantra Premium Provider Program</span> to start receiving session requests and leads from Mantra clients.
              </p>
              <p className="text-base text-gray-500 dark:text-gray-500">
                Get matched with clients who are actively seeking your expertise.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/premium")}
              className="group bg-gradient-to-r from-[#4169E1] to-[#00c0ff] hover:from-[#3557c7] hover:to-[#00a8e0] text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all hover:scale-105 transform"
            >
              Become a Premium Provider
              <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Features list */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="size-6 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Leads</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get matched with verified clients actively seeking care</p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="size-6 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Grow Revenue</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Increase your bookings and expand your practice</p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="size-6 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Save Time</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automated matching and request management</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Search and Filter */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400"
              />
            </div>
            <button className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Filter className="size-5" />
              Filter
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700 px-6">
              {(["pending", "accepted", "declined"] as const).map((tab) => {
                const count = getTabCount(tab);
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 pt-4 px-2 relative font-medium transition-colors ${
                      activeTab === tab
                        ? "text-[#4169E1]"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {getTabLabel(tab)}
                    {count !== null && <span className="ml-2 text-sm">{count}</span>}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4169E1]"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Subheader */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeTab === "pending" && "Requests awaiting your response"}
                  {activeTab === "accepted" && "Requests you've accepted"}
                  {activeTab === "declined" && "Requests you've declined or missed"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total {filteredRequests.length}
                </p>
              </div>

              {/* Requests Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-750 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="size-12 bg-gradient-to-br from-[#00c0ff] to-blue-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                        {request.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-gray-900 dark:text-white font-semibold">
                            {request.clientName}
                          </h3>
                          <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                            {request.date}
                          </span>
                        </div>
                        
                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Trial Badge */}
                          {request.isTrial && request.clientType === "B2C" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded font-medium">
                              Trial
                            </span>
                          )}
                          
                          {/* Client Type Badge */}
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded font-medium ${
                            request.clientType === "B2B"
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400"
                          }`}>
                            <User className="size-3" />
                            {request.clientType}
                          </span>

                          {/* Assignment Type Icon */}
                          <div className="relative">
                            <button
                              onMouseEnter={() => setHoveredAssignmentType(request.id)}
                              onMouseLeave={() => setHoveredAssignmentType(null)}
                              className={`inline-flex items-center justify-center size-7 rounded-full transition-colors ${
                                request.requestedBy
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                                  : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                              }`}
                            >
                              {request.requestedBy ? (
                                <UserCheck className="size-4" />
                              ) : (
                                <Zap className="size-4" />
                              )}
                            </button>

                            {/* Tooltip */}
                            {hoveredAssignmentType === request.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg"
                              >
                                {request.requestedBy ? "Client-Requested" : "Auto-Assigned"}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price - Above meta info */}
                    <div className="mb-2 flex items-center gap-2 text-sm">
                      <span className="text-base">💰</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {request.clientType === "B2C" && request.isTrial && request.regularRate
                          ? `₹500 for trial, ₹1000 for regular sessions`
                          : `₹${parseInt(request.rate.replace("$", "")) * 80}`}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Languages className="size-3.5" /> {request.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" /> {request.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" /> {request.experience}
                      </span>
                    </div>

                    {/* Service Details - Truncated */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                      {request.details}
                    </p>

                    {/* View details link */}
                    <button 
                      onClick={() => setSelectedRequest(request)}
                      className="text-[#4169E1] hover:text-[#3557c7] text-sm font-medium mb-4 flex items-center gap-1 transition-colors"
                    >
                      View details <ChevronRight className="size-3.5" />
                    </button>

                    {/* Actions or Status */}
                    {activeTab === "pending" && (
                      <div className="flex gap-3">
                        <button className="flex-1 bg-[#4169E1] hover:bg-[#3557c7] text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                          <Check className="size-4" />
                          Accept
                        </button>
                        <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                          <X className="size-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {activeTab === "accepted" && (
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <Check className="size-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          Request Accepted
                        </span>
                      </div>
                    )}

                    {activeTab === "declined" && (
                      <div
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${
                          request.status === "declined"
                            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                            : "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
                        }`}
                      >
                        <X
                          className={`size-4 ${
                            request.status === "declined"
                              ? "text-red-600 dark:text-red-400"
                              : "text-orange-600 dark:text-orange-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            request.status === "declined"
                              ? "text-red-700 dark:text-red-400"
                              : "text-orange-700 dark:text-orange-400"
                          }`}
                        >
                          {request.status === "declined" ? "Request Declined" : "Request Missed"}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredRequests.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl text-gray-900 dark:text-white mb-2">No requests found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery
                      ? "Try adjusting your search"
                      : `You don't have any ${activeTab} requests at the moment`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-start justify-between z-10">
              <div className="flex items-start gap-4 flex-1">
                <div className="size-16 bg-gradient-to-br from-[#00c0ff] to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xl flex-shrink-0">
                  {selectedRequest.clientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedRequest.clientName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedRequest.isTrial && selectedRequest.clientType === "B2C" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded font-medium">
                        Trial
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded font-medium ${
                      selectedRequest.clientType === "B2B"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400"
                    }`}>
                      <User className="size-3" />
                      {selectedRequest.clientType}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Requested on {selectedRequest.date}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-4"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Pricing Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Pricing</h3>
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {selectedRequest.clientType === "B2C" && selectedRequest.isTrial && selectedRequest.regularRate
                      ? `₹500 for trial session, ₹1000 for regular sessions`
                      : `₹${parseInt(selectedRequest.rate.replace("$", "")) * 80}`}
                  </span>
                </div>
              </div>

              {/* Client Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Client Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedRequest.gender && (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gender</div>
                      <div className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-2">
                        <span>👤</span> {selectedRequest.gender}
                      </div>
                    </div>
                  )}
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Language</div>
                    <div className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-2">
                      <Languages className="size-4" /> {selectedRequest.language}
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</div>
                    <div className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-2">
                      <MapPin className="size-4" /> {selectedRequest.location}
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Experience Preference</div>
                    <div className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-2">
                      <Clock className="size-4" /> {selectedRequest.experience}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Requirements */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Service Requirements</h3>
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedRequest.details}
                  </p>
                </div>
              </div>

              {/* Preferred Time Slots */}
              {selectedRequest.timeSlots && selectedRequest.timeSlots.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Preferred Time Slots</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedRequest.timeSlots.map((slot, index) => (
                      <div key={index} className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="text-sm font-medium text-blue-900 dark:text-blue-300">{slot}</div>
                        <div className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">{getTimeSlotDetails(slot)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Preferred Time Slots</h3>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">All time slots work for the client</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions - Only show for pending requests */}
            {selectedRequest.status === "pending" && (
              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#4169E1] hover:bg-[#3557c7] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                    <Check className="size-5" />
                    Accept Request
                  </button>
                  <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                    <X className="size-5" />
                    Reject Request
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}