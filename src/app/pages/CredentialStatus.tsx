import { useState } from "react";
import { Shield, ExternalLink, FileCheck, Search, Filter, X, Clock, CheckCircle, Globe, Lock, FileText, TrendingUp, Eye, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

interface CredentialingApplication {
  id: string;
  payerName: string;
  dateApplied: string;
  expectedDecision: string;
  status: "in-progress" | "in-review" | "approved";
  lastUpdated: string;
}

type Region = "USA" | "UK" | "UAE" | "Australia" | "Canada";

export function CredentialStatus({ hideHeader = false }: { hideHeader?: boolean }) {
  const [hasInsurance, setHasInsurance] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "in-progress" | "in-review" | "approved">("all");
  const [payerFilter, setPayerFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [userRegion] = useState<Region>("USA");

  const globalContent = {
    header: "Global Insurance Onboarding & Payer Enrollment",
    subheader: "Partner with major insurance payers around the world.",
    keywords: ["Identity Verification", "Compliance Sync", "Payer Networks"],
  };

  const applications: CredentialingApplication[] = [
    {
      id: "1",
      payerName: "Oscar Health",
      dateApplied: "Feb 1, 2026",
      expectedDecision: "Apr 15, 2026",
      status: "in-progress",
      lastUpdated: "Feb 20, 2026",
    },
    {
      id: "2",
      payerName: "Cigna",
      dateApplied: "Jan 15, 2026",
      expectedDecision: "Mar 18, 2026",
      status: "in-review",
      lastUpdated: "Feb 18, 2026",
    },
    {
      id: "3",
      payerName: "UnitedHealthcare",
      dateApplied: "Jan 10, 2026",
      expectedDecision: "Mar 15, 2026",
      status: "approved",
      lastUpdated: "Feb 22, 2026",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            In Progress
          </span>
        );
      case "in-review":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            In Review
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Approved
          </span>
        );
      default:
        return null;
    }
  };

  const filteredApplications = applications.filter((app) => {
    const statusMatch = statusFilter === "all" || app.status === statusFilter;
    const payerMatch = payerFilter === "all" || app.payerName === payerFilter;
    const searchMatch = app.payerName.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && payerMatch && searchMatch;
  });

  return (
    <div className="space-y-3 md:space-y-6">

      {/* Header */}
      {!hideHeader && (
        <div className="flex items-start justify-between pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
              Insurance Credentialing Status
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Track your credentialing applications and status with insurance payers
            </p>
          </div>
        </div>
      )}

      {/* No Insurance State - Comprehensive Landing Page */}
      {!hasInsurance && (
        <div className="space-y-4 md:space-y-6">

          {/* Hero Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="relative bg-gradient-to-br from-[#f0f7ff] via-[#e6f2ff] to-[#f3faff] dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 px-4 md:px-12 py-8 md:py-12">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-[#00c0ff]/10 to-[#043570]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-tr from-[#043570]/10 to-[#00c0ff]/10 rounded-full blur-3xl" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Hero Icon */}
                <div className="inline-flex items-center justify-center size-16 md:size-20 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-2xl md:rounded-3xl shadow-xl mb-4 md:mb-6">
                  <Shield className="size-8 md:size-10 text-white" />
                </div>

                {/* Hero Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  {globalContent.header}
                </h1>

                {/* Hero Description */}
                <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
                  {globalContent.subheader}
                </p>

                {/* Keywords/Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                  {globalContent.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle className="size-3 md:size-4 text-[#00c0ff]" />
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Primary CTA */}
                <div className="flex flex-col items-center gap-3">
                  <a
                    href="https://pin-net-47185039.figma.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-10 py-3 md:py-4 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                  >
                    <Shield className="size-5 md:size-6" />
                    Start Your Application
                    <ExternalLink className="size-4 md:size-5" />
                  </a>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Takes 5-10 minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center px-3 md:px-6 py-4 md:py-6 border-r border-gray-200 dark:border-gray-700">
                <div className="inline-flex items-center justify-center size-10 md:size-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg md:rounded-xl mb-2 md:mb-3">
                  <Clock className="size-5 md:size-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">70% Faster</div>
                <div className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">Turnaround Time</div>
              </div>
              <div className="text-center px-3 md:px-6 py-4 md:py-6 border-r border-gray-200 dark:border-gray-700">
                <div className="inline-flex items-center justify-center size-10 md:size-12 bg-green-100 dark:bg-green-900/30 rounded-lg md:rounded-xl mb-2 md:mb-3">
                  <CheckCircle className="size-5 md:size-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">95% Approval</div>
                <div className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="text-center px-3 md:px-6 py-4 md:py-6">
                <div className="inline-flex items-center justify-center size-10 md:size-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg md:rounded-xl mb-2 md:mb-3">
                  <Globe className="size-5 md:size-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">50+ Payers</div>
                <div className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">Network Reach</div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 text-center">
              How it works
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center mb-6 md:mb-8">
              Follow these steps to get credentialed and start accepting insurance
            </p>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">

              {/* Left — Steps tracker */}
              <div className="flex-1 relative">

                {/* Vertical connecting line — positioned behind the circles */}
                <div className="absolute left-[13px] top-[14px] bottom-[14px] w-[2px] bg-gray-200 dark:bg-gray-700 z-0" />

                <div className="relative z-10 flex flex-col gap-0">

                  {/* Step 1 */}
                  <div className="flex gap-4 pb-7">
                    <div className="size-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
                      1
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
                        You fill out the application
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        Provide your license info, NPI, malpractice insurance, and work history. Takes about 5–10 minutes.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 pb-7">
                    <div className="size-7 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
                      2
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
                        Mantra prepares and submits your credentials
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        We assemble your CAQH profile, verify your documents, and submit applications to your selected payers. No back-and-forth from you.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 pb-7">
                    <div className="size-7 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
                      3
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
                        Payers review and approve
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        Insurance companies typically take 60–120 days to process. You can track your status in real time from your dashboard.
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 font-medium">
                        <CheckCircle className="size-3" />
                        Live tracking available
                      </span>
                    </div>
                  </div>

                  {/* Step 4 — no pb so line doesn't extend below last circle */}
                  <div className="flex gap-4">
                    <div className="size-7 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
                      4
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
                        You're in-network — start seeing insured patients
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        Once approved, eligible patients can book with you using their insurance. Mantra also handles claims submission and follow-ups.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right — Video placeholder */}
              <div className="flex-1 flex flex-col justify-center min-h-[280px] md:min-h-0">
                <div className="flex flex-col items-center justify-center h-full rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gradient-to-br from-[#f0f7ff] to-white dark:from-gray-750 dark:to-gray-800 aspect-video cursor-pointer group hover:border-[#043570] dark:hover:border-blue-500 transition-all duration-200">
                  <div className="inline-flex items-center justify-center size-14 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-full shadow-lg mb-3 group-hover:scale-105 transition-transform duration-200">
                    <PlayCircle className="size-7 text-white" />
                  </div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1">
                    Watch: How credentialing works
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Placeholder for embedded video
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Feature Grid Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 text-center">
              Our Capabilities
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center mb-6 md:mb-8">
              Everything you need to get credentialed and start accepting insurance payments
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

              <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-gray-750 dark:to-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="size-10 md:size-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="size-5 md:size-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">Payer Portfolio</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Choose which insurance networks to join based on your practice needs and patient demographics.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-gray-750 dark:to-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="size-10 md:size-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Eye className="size-5 md:size-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">Automated Tracking</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Live status updates on every application with real-time notifications and progress tracking.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-gray-750 dark:to-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="size-10 md:size-12 bg-green-100 dark:bg-green-900/30 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Lock className="size-5 md:size-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">Document Vault</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Secure, encrypted storage for your medical credentials with automatic renewal reminders.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-gray-750 dark:to-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="size-10 md:size-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <FileCheck className="size-5 md:size-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">Compliance Audit</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Pre-submission review to ensure zero rejections with automated compliance verification.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-gray-750 dark:to-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="size-10 md:size-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <FileText className="size-5 md:size-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">Application Management</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Submit applications to multiple payers simultaneously with centralized dashboard control.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-gray-750 dark:to-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="size-10 md:size-12 bg-rose-100 dark:bg-rose-900/30 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Shield className="size-5 md:size-6 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">Expert Support</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Dedicated Enrollment Experts to guide you through every step of the process.
                </p>
              </div>

            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
              Ready to expand your practice?
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto">
              Begin your enrollment journey today and start accepting insurance payments within weeks
            </p>
            <a
              href="https://pin-net-47185039.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-10 py-3 md:py-4 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              <Shield className="size-5 md:size-6" />
              Start Your Application
              <ExternalLink className="size-4 md:size-5" />
            </a>
          </div>

        </div>
      )}

      {/* Insurance State */}
      {hasInsurance && (
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-3 md:p-6">

            {/* Search Bar and Filters */}
            <div className="flex flex-col gap-2 mb-4 md:mb-6">
              {/* Search Bar with Filter Icon */}
              <div className="flex items-center gap-2">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl text-xs md:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                    placeholder="Search payers..."
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

              {/* Desktop Filters (Always Visible) */}
              <div className="hidden md:flex items-center gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "in-progress" | "in-review" | "approved")}
                  className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                >
                  <option value="all">All Statuses</option>
                  <option value="in-progress">In Progress</option>
                  <option value="in-review">In Review</option>
                  <option value="approved">Approved</option>
                </select>
                <select
                  value={payerFilter}
                  onChange={(e) => setPayerFilter(e.target.value)}
                  className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                >
                  <option value="all">All Payers</option>
                  <option value="Oscar Health">Oscar Health</option>
                  <option value="Cigna">Cigna</option>
                  <option value="UnitedHealthcare">UnitedHealthcare</option>
                </select>
              </div>

              {/* Mobile Filter Dropdown (Collapsible) */}
              {showMobileFilters && (
                <div className="md:hidden bg-gray-50 dark:bg-gray-750 rounded-lg p-3 border border-gray-200 dark:border-gray-700 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as "all" | "in-progress" | "in-review" | "approved")}
                      className="w-full px-2.5 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-xs text-gray-900 dark:text-white"
                    >
                      <option value="all">All Statuses</option>
                      <option value="in-progress">In Progress</option>
                      <option value="in-review">In Review</option>
                      <option value="approved">Approved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Payer</label>
                    <select
                      value={payerFilter}
                      onChange={(e) => setPayerFilter(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-xs text-gray-900 dark:text-white"
                    >
                      <option value="all">All Payers</option>
                      <option value="Oscar Health">Oscar Health</option>
                      <option value="Cigna">Cigna</option>
                      <option value="UnitedHealthcare">UnitedHealthcare</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setPayerFilter("all");
                      setSearchQuery("");
                    }}
                    className="w-full px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-[#4169E1] dark:hover:text-[#00c0ff] border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable Table for Mobile and Desktop */}
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <div className="inline-block min-w-full align-middle px-3 md:px-0">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Payer Name</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Date Applied</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Expected Decision</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex-shrink-0 size-6 md:w-8 md:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-md md:rounded-lg flex items-center justify-center">
                              <FileCheck className="size-3 md:size-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-[11px] md:text-sm font-medium text-gray-900 dark:text-white">{app.payerName}</span>
                          </div>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                          <span className="text-[11px] md:text-sm text-gray-600 dark:text-gray-400">{app.dateApplied}</span>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                          <span className="text-[11px] md:text-sm text-gray-600 dark:text-gray-400">{app.expectedDecision}</span>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                          <span className="text-[11px] md:text-sm text-gray-600 dark:text-gray-400">{app.lastUpdated}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <FileCheck className="size-10 md:size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3 md:mb-4" />
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  No applications found matching your filters
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
