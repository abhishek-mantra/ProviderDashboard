import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronDown,
  Star,
  TrendingUp,
  UserPlus,
  Eye,
  BadgeCheck,
  Flame,
  Globe,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { LeadDetailsModal } from "../components/LeadDetailsModal";

type LeadStatus = "pending" | "accepted" | "declined";

interface Lead {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  language: string;
  service: string;
  status: LeadStatus;
  source: string;
  date: string;
  experience: string;
  price: {
    trial?: string;
    regular?: string;
    amount?: string;
  };
  specializations: string;
  badges: {
    trial?: boolean;
    b2b?: boolean;
    b2c?: boolean;
    verified?: boolean;
  };
}

type TabType = "pending" | "accepted" | "declined";

export function ClientLeads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data
  const leads: Lead[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDE1NzYyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      email: "emma.wilson@email.com",
      phone: "+1 (555) 123-4567",
      location: "United States",
      language: "English",
      service: "Therapy",
      status: "pending",
      source: "Website",
      date: "Feb 26",
      experience: "1 year",
      price: {
        trial: "₹500",
        regular: "₹1000",
      },
      specializations: "Therapy for Hypertension, ADHD, Abuse, Addiction, Anger...",
      badges: {
        trial: true,
        b2c: true,
        verified: true,
      },
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDE1ODE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      email: "james.r@email.com",
      phone: "+1 (555) 234-5678",
      location: "United Kingdom",
      language: "English",
      service: "Therapy",
      status: "pending",
      source: "Referral",
      date: "Feb 25",
      experience: "1 year",
      price: {
        amount: "₹640",
      },
      specializations: "Therapy for ADHD, Anxiety, Bipolar, Child Or Teen, Depression...",
      badges: {
        b2b: true,
        verified: true,
      },
    },
    {
      id: "3",
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1704927768421-bc9549b5097d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDI0MjUwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      email: "sophia.chen@email.com",
      phone: "+1 (555) 345-6789",
      location: "India",
      language: "English, Hindi",
      service: "Therapy",
      status: "pending",
      source: "Google Ads",
      date: "Feb 24",
      experience: "2 years",
      price: {
        amount: "₹960",
      },
      specializations: "Therapy for Depression, Anxiety, Stress Management...",
      badges: {
        b2c: true,
        verified: true,
      },
    },
    {
      id: "4",
      name: "David Martinez",
      avatar: "https://images.unsplash.com/photo-1617746652974-0be48cd984d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDIxMjU5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      email: "m.brown@email.com",
      phone: "+1 (555) 456-7890",
      location: "United States",
      language: "English, Spanish",
      service: "Therapy",
      status: "pending",
      source: "Instagram",
      date: "Feb 23",
      experience: "3 years",
      price: {
        amount: "₹1200",
      },
      specializations: "Therapy for Trauma, PTSD, Grief, Family Counseling...",
      badges: {
        b2b: true,
        verified: true,
      },
    },
    {
      id: "5",
      name: "Emily Watson",
      avatar: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NzQxNTU2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      email: "olivia.d@email.com",
      phone: "+1 (555) 567-8901",
      location: "Canada",
      language: "English, French",
      service: "Therapy",
      status: "accepted",
      source: "Facebook",
      date: "Feb 22",
      experience: "2 years",
      price: {
        amount: "₹850",
      },
      specializations: "Therapy for Anxiety, Depression, Relationship Issues...",
      badges: {
        b2c: true,
        verified: true,
      },
    },
    {
      id: "6",
      name: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDIzMzQxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      email: "liam.j@email.com",
      phone: "+1 (555) 678-9012",
      location: "India",
      language: "English, Tamil",
      service: "Therapy",
      status: "declined",
      source: "Website",
      date: "Feb 21",
      experience: "1 year",
      price: {
        amount: "₹720",
      },
      specializations: "Therapy for Career Counseling, Stress, Work-Life Balance...",
      badges: {
        b2c: true,
      },
    },
  ];

  const tabs = [
    { id: "pending" as TabType, label: "Pending", count: leads.filter((l) => l.status === "pending").length },
    { id: "accepted" as TabType, label: "Accepted", count: leads.filter((l) => l.status === "accepted").length },
    { id: "declined" as TabType, label: "Declined / Missed", count: leads.filter((l) => l.status === "declined").length },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = lead.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6">
      <div className="max-w-[1000px] mx-auto">
      {/* Header */}
      <div className="mb-4 md:mb-8 px-3 md:px-0 pt-3 md:pt-0">
        <div className="flex items-start gap-2 md:gap-4">
          <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <UserPlus className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
              Client Leads
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Review and manage incoming client leads
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 md:mb-6 flex gap-2 px-2 md:px-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by client name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-2 md:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>
        
        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center px-2 py-2 md:px-4 md:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 flex-shrink-0"
        >
          <Filter className="size-4" />
          <span className="hidden md:inline md:ml-2">Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-transparent mb-4 md:mb-6 overflow-x-auto px-2 md:px-0">
        <div className="flex items-center gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-4 py-2 md:py-3 font-semibold text-xs md:text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#00c0ff] text-[#00c0ff]"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {tab.label} <span className="ml-1">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <div className="flex items-center justify-between mb-3 md:mb-4 px-2 md:px-0">
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Requests awaiting your response
        </p>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Total <span className="font-semibold text-[#00c0ff]">{filteredLeads.length}</span>
        </p>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-2 md:px-0 pb-2 md:pb-0">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
          >
            {/* Header Row - Avatar, Name, and Date */}
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                {/* Avatar with Image */}
                <img
                  src={lead.avatar}
                  alt={lead.name}
                  className="size-10 md:size-12 rounded-lg object-cover flex-shrink-0"
                />

                {/* Name */}
                <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white truncate">
                  {lead.name}
                </h3>
              </div>

              {/* Badges and Date */}
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                {lead.badges.trial && (
                  <span className="px-1.5 md:px-2.5 py-0.5 md:py-1 bg-[#FEF2F2] dark:bg-red-900/20 text-[#DC2626] text-[10px] md:text-xs font-bold rounded">
                    Trial
                  </span>
                )}
                {lead.badges.b2c && (
                  <div className="hidden sm:flex items-center gap-1.5 text-[#059669] text-xs font-semibold">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>B2C</span>
                  </div>
                )}
                {lead.badges.b2b && (
                  <div className="hidden sm:flex items-center gap-1.5 text-[#059669] text-xs font-semibold">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>B2B</span>
                  </div>
                )}
                
                {/* Date */}
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {lead.date}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 text-xs md:text-sm text-gray-700 dark:text-gray-300">
              <svg className="size-3.5 md:size-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                <path d="M12 18V6"/>
              </svg>
              {lead.price.trial ? (
                <span className="truncate">
                  {lead.price.trial} for trial, {lead.price.regular} for regular sessions
                </span>
              ) : (
                <span>{lead.price.amount} per session</span>
              )}
            </div>

            {/* Meta Info Icons */}
            <div className="flex items-center flex-wrap gap-2 md:gap-4 mb-2 md:mb-3 text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1 md:gap-1.5">
                <svg className="size-3 md:size-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="truncate">{lead.language}</span>
              </div>
              <div className="flex items-center gap-1 md:gap-1.5">
                <MapPin className="size-3 md:size-4 flex-shrink-0" />
                <span className="truncate">{lead.location}</span>
              </div>
              <div className="flex items-center gap-1 md:gap-1.5">
                <Clock className="size-3 md:size-4 flex-shrink-0" />
                <span>{lead.experience}</span>
              </div>
            </div>

            {/* Specializations */}
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3 line-clamp-2">
              {lead.specializations}
            </p>

            {/* View Details Link and Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <button
                className="flex items-center gap-0.5 md:gap-1 text-xs md:text-sm text-[#00c0ff] hover:text-[#00a8e0] font-semibold transition-colors"
                onClick={() => {
                  setSelectedLead(lead);
                  setIsModalOpen(true);
                }}
              >
                <span>View details</span>
                <ChevronRight className="size-3.5 md:size-4" />
              </button>

              {/* Action Buttons */}
              {activeTab === "pending" && (
                <div className="flex items-center gap-1.5 md:gap-2">
                  <button className="flex items-center justify-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md transition-all font-semibold text-xs md:text-sm">
                    <CheckCircle2 className="size-3.5 md:size-4" />
                    <span className="hidden sm:inline">Accept</span>
                  </button>
                  <button className="flex items-center justify-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-700 rounded-md transition-all font-semibold text-xs md:text-sm">
                    <XCircle className="size-3.5 md:size-4" />
                    <span className="hidden sm:inline">Reject</span>
                  </button>
                </div>
              )}

              {activeTab === "accepted" && (
                <div className="px-2 md:px-3 py-1 md:py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md text-xs md:text-sm font-semibold">
                  Accepted
                </div>
              )}

              {activeTab === "declined" && (
                <div className="px-2 md:px-3 py-1 md:py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-xs md:text-sm font-semibold">
                  Declined
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {filteredLeads.length === 0 && (
          <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-12 md:p-20 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="size-16 md:size-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5">
              <Users className="size-8 md:size-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">No leads found</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
      </div>
      {isModalOpen && selectedLead && (
        <LeadDetailsModal
          isOpen={isModalOpen}
          lead={selectedLead}
          onClose={() => setIsModalOpen(false)}
          {...(selectedLead.status === "pending" && {
            onAccept: () => {
              console.log("Accept lead:", selectedLead.id);
              // Handle accept logic
            },
            onReject: () => {
              console.log("Reject lead:", selectedLead.id);
              // Handle reject logic
            }
          })}
        />
      )}
    </div>
  );
}