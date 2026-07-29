import { useState, useEffect } from "react";
import { DollarSign, FileText, Plus, User, ChevronDown, Building2, Shield } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router";
import { Earnings } from "./Earnings";
import { Invoices } from "./Invoices";
import { BankInfo } from "./BankInfo";
import { TaxInfo } from "./TaxInfo";
import { InsurancePage } from "./InsurancePage";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function Billing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { providers, clients, practices } = usePartnerDashboard();
  const [activeTab, setActiveTab] = useState<"earnings" | "invoices" | "insurance" | "banktax">(
    (location.state as any)?.tab || "earnings"
  );
  const [earningsSubTab, setEarningsSubTab] = useState<"earnings" | "no-earnings">("earnings");
  const [bankTaxSubTab, setBankTaxSubTab] = useState<"bank" | "tax">("bank");
  const [showClientSelectModal, setShowClientSelectModal] = useState(false);
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>("all");
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedPracticeFilter, setSelectedPracticeFilter] = useState<string>("all");
  const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<string>("all");
  const [showProviderDropdown, setShowProviderDropdown] = useState(false);

  const clientNames = clients.map((c) => c.name);

  useEffect(() => {
    if ((location.state as any)?.tab) {
      setActiveTab((location.state as any).tab);
    }
    if ((location.state as any)?.clientFilter) {
      setSelectedClientFilter((location.state as any).clientFilter);
    }
  }, [location.state]);

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen px-0 py-0 md:p-6">
      {/* Header */}
      <div className="mb-1 md:mb-8 px-1 md:px-0">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <DollarSign className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
              Billing
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Manage your plans, payments and order history
            </p>
          </div>
        </div>
      </div>

      {/* Main Pill-Style Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-6 gap-3 md:gap-0 mt-[10px] md:mt-0">
        <div className="flex items-center gap-1 md:gap-2 bg-white dark:bg-gray-800 p-1 md:p-1.5 rounded-xl w-full md:w-fit border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab("earnings")}
            className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap flex-1 md:flex-initial ${
              activeTab === "earnings"
                ? "bg-[#043570] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <DollarSign className="size-3.5 md:size-4" />
            <span>Earnings</span>
          </button>

          <button
            onClick={() => setActiveTab("invoices")}
            className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap flex-1 md:flex-initial ${
              activeTab === "invoices"
                ? "bg-[#043570] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <FileText className="size-3.5 md:size-4" />
            <span>Invoices</span>
          </button>

          <button
            onClick={() => setActiveTab("insurance")}
            className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap flex-1 md:flex-initial ${
              activeTab === "insurance"
                ? "bg-[#043570] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Shield className="size-3.5 md:size-4" />
            <span>Insurance</span>
          </button>

          <button
            onClick={() => setActiveTab("banktax")}
            className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap flex-1 md:flex-initial ${
              activeTab === "banktax"
                ? "bg-[#043570] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Building2 className="size-3.5 md:size-4" />
            <span>Bank & Tax</span>
          </button>
        </div>

        {/* Client Dropdown Filter - Show for earnings and invoices tabs only */}
        {(activeTab === "earnings" || activeTab === "invoices") && (
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowClientDropdown(!showClientDropdown)}
                className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-all font-medium text-gray-700 dark:text-gray-300 text-xs md:text-sm whitespace-nowrap w-full md:w-auto"
              >
                <User className="size-3.5 md:size-4 flex-shrink-0" />
                <span>{selectedClientFilter === "all" ? "All Clients" : selectedClientFilter}</span>
                <ChevronDown className="size-3.5 md:size-4 flex-shrink-0" />
              </button>

              {showClientDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowClientDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 md:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2 max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedClientFilter("all");
                        setShowClientDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                        selectedClientFilter === "all"
                          ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      All Clients
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                    {clientNames.map((clientName) => (
                      <button
                        key={clientName}
                        onClick={() => {
                          setSelectedClientFilter(clientName);
                          setShowClientDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                          selectedClientFilter === clientName
                            ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {clientName}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Add Invoice Button - Show only for invoices tab */}
            {activeTab === "invoices" && (
              <button
                onClick={() => setShowClientSelectModal(true)}
                className="px-3 md:px-4 py-2 md:py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors flex items-center gap-2 text-xs md:text-sm whitespace-nowrap"
              >
                <Plus className="size-4 md:size-5" />
                <span className="hidden md:inline">Create Invoice</span>
                <span className="md:hidden">Invoice</span>
              </button>
            )}
          </div>
        )}

        {/* Client Filter and Create Invoice Button - For invoices tab only (old position) */}
        {activeTab === "invoices" && false && (
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
            <select
              className="px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#043570]/20 focus:border-[#043570] text-xs md:text-sm"
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
            >
              <option value="all">All Clients</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Rachit Sharma">Rachit Sharma</option>
              <option value="Aishwarya">Aishwarya</option>
              <option value="Manisha">Manisha</option>
              <option value="Mohini">Mohini</option>
              <option value="Vineeta Tiwari">Vineeta Tiwari</option>
              <option value="Samiksha">Samiksha</option>
              <option value="Michael Chen">Michael Chen</option>
              <option value="Bhakti Joshi">Bhakti Joshi</option>
            </select>
            <button
              onClick={() => setShowClientSelectModal(true)}
              className="px-3 md:px-4 py-2 md:py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-xs md:text-sm"
            >
              <Plus className="size-4 md:size-5" />
              Create Invoice
            </button>
          </div>
        )}
      </div>

      {/* Earnings Sub-Tabs */}
      {activeTab === "earnings" && (
        <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-transparent overflow-x-auto">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              onClick={() => setEarningsSubTab("earnings")}
              className={`px-3 md:px-4 py-2 md:py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap ${
                earningsSubTab === "earnings"
                  ? "text-[#00c0ff]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Earnings
              {earningsSubTab === "earnings" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setEarningsSubTab("no-earnings")}
              className={`px-3 md:px-4 py-2 md:py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap ${
                earningsSubTab === "no-earnings"
                  ? "text-[#00c0ff]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              No Earnings
              {earningsSubTab === "no-earnings" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bank & Tax Sub-Tabs */}
      {activeTab === "banktax" && (
        <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-transparent overflow-x-auto">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              onClick={() => setBankTaxSubTab("bank")}
              className={`px-3 md:px-4 py-2 md:py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap ${
                bankTaxSubTab === "bank"
                  ? "text-[#00c0ff]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Bank Info
              {bankTaxSubTab === "bank" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setBankTaxSubTab("tax")}
              className={`px-3 md:px-4 py-2 md:py-3 font-medium transition-all relative text-xs md:text-sm whitespace-nowrap ${
                bankTaxSubTab === "tax"
                  ? "text-[#00c0ff]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Tax Info
              {bankTaxSubTab === "tax" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00c0ff] rounded-t-full" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="px-0 md:px-0">
{activeTab === "earnings" && (
          <>
            {earningsSubTab === "earnings" && (
              <>
                {/* Filters: Practice + Provider */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {/* Practice Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowPracticeDropdown(!showPracticeDropdown)}
                      className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-all font-medium text-gray-700 dark:text-gray-300 text-xs md:text-sm whitespace-nowrap"
                    >
                      <Building2 className="size-3.5 md:size-4 flex-shrink-0" />
                      <span>{selectedPracticeFilter === "all" ? "All Practices" : selectedPracticeFilter}</span>
                      <ChevronDown className="size-3.5 md:size-4 flex-shrink-0" />
                    </button>
                    {showPracticeDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowPracticeDropdown(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2 max-h-64 overflow-y-auto">
                          <button
                            onClick={() => { setSelectedPracticeFilter("all"); setShowPracticeDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                              selectedPracticeFilter === "all"
                                ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            All Practices
                          </button>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                          {practices.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => { setSelectedPracticeFilter(p.name); setShowPracticeDropdown(false); }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                                selectedPracticeFilter === p.name
                                  ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Provider Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowProviderDropdown(!showProviderDropdown)}
                      className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-all font-medium text-gray-700 dark:text-gray-300 text-xs md:text-sm whitespace-nowrap"
                    >
                      <User className="size-3.5 md:size-4 flex-shrink-0" />
                      <span>{selectedProviderFilter === "all" ? "All Providers" : selectedProviderFilter}</span>
                      <ChevronDown className="size-3.5 md:size-4 flex-shrink-0" />
                    </button>
                    {showProviderDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowProviderDropdown(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2 max-h-64 overflow-y-auto">
                          <button
                            onClick={() => { setSelectedProviderFilter("all"); setShowProviderDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                              selectedProviderFilter === "all"
                                ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            All Providers
                          </button>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                          {providers.map((pr) => (
                            <button
                              key={pr.id}
                              onClick={() => { setSelectedProviderFilter(pr.name); setShowProviderDropdown(false); }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm ${
                                selectedProviderFilter === pr.name
                                  ? "text-[#043570] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-blue-900/20"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {pr.name}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Earnings hideHeader clientFilter={selectedClientFilter} practiceFilter={selectedPracticeFilter} providerFilter={selectedProviderFilter} />
              </>
            )}
            {earningsSubTab === "no-earnings" && (
              <div className="space-y-6">
                {/* Main Empty State Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  <div className="p-4 md:p-8 lg:p-10">
                    <div className="max-w-5xl mx-auto">
                      {/* Header Section with Icon */}
                      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className="relative">
                          <div className="size-12 md:size-16 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <DollarSign className="size-6 md:size-8 text-white" />
                          </div>
                          {/* Decorative circles */}
                          <div className="absolute -top-1 -right-1 size-2 md:size-3 bg-[#00c0ff]/30 rounded-full"></div>
                          <div className="absolute -bottom-1 -left-1 size-1.5 md:size-2 bg-[#043570]/30 rounded-full"></div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                            Start Your Earning Journey
                          </h3>
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                            You're all set to begin! Complete sessions with your clients and watch your earnings grow.
                          </p>
                        </div>
                      </div>

                      {/* Two Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        {/* Card 1: Invite your Clients */}
                        <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-[#043570]/10 dark:to-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#00c0ff]/20 dark:border-[#00c0ff]/10">
                          <div className="flex flex-col h-full">
                            {/* Icon */}
                            <div className="size-12 md:size-14 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg">
                              <svg className="size-6 md:size-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                              </svg>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">
                              Invite your Clients
                            </h3>
                            
                            {/* Description */}
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6 leading-relaxed flex-1">
                              Add your existing clients to manage appointments and track sessions on our platform.
                            </p>
                            
                            {/* Button */}
                            <button
                              onClick={() => navigate("/clients")}
                              className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#043570] to-[#00c0ff] text-white rounded-lg md:rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-xs md:text-sm"
                            >
                              Add Client
                            </button>
                          </div>
                        </div>

                        {/* Card 2: Get Clients from Mantra */}
                        <div className="bg-gradient-to-br from-[#f3faff] to-white dark:from-[#043570]/10 dark:to-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#00c0ff]/20 dark:border-[#00c0ff]/10">
                          <div className="flex flex-col h-full">
                            {/* Icon */}
                            <div className="size-12 md:size-14 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg">
                              <svg className="size-6 md:size-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">
                              Get Clients from Mantra
                            </h3>
                            
                            {/* Description */}
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6 leading-relaxed flex-1">
                              Join our premium provider network to receive client referrals from MantraCare.
                            </p>
                            
                            {/* Button */}
                            <button
                              onClick={() => navigate("/premium")}
                              className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#043570] to-[#00c0ff] text-white rounded-lg md:rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-xs md:text-sm"
                            >
                              Become a Premium Provider
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="bg-gradient-to-r from-[#043570] to-[#00c0ff] rounded-lg md:rounded-xl p-4 md:p-6 text-white">
                        <h4 className="text-base md:text-lg font-semibold mb-1.5 md:mb-2">
                          Ready to Start Earning?
                        </h4>
                        <p className="text-white/90 mb-3 md:mb-4 text-xs">
                          Complete your profile setup and start accepting client appointments today
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-2.5">
                          <button className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-2.5 bg-white text-[#043570] rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-xs md:text-sm">
                            Schedule First Session
                          </button>
                          <button className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold border border-white/30 transition-colors text-xs md:text-sm">
                            View Client List
                          </button>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          💡 <span className="font-medium">Pro Tip:</span> Set up your bank and tax information now to ensure smooth payouts when you start earning
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        {activeTab === "invoices" && (
          <div>
            <Invoices
              hideHeader
              showClientSelectModal={showClientSelectModal}
              setShowClientSelectModal={setShowClientSelectModal}
              clientFilter={selectedClientFilter}
            />
          </div>
        )}

        {activeTab === "insurance" && (
          <InsurancePage />
        )}

        {activeTab === "banktax" && (
          <div>
            {bankTaxSubTab === "bank" && <BankInfo />}
            {bankTaxSubTab === "tax" && <TaxInfo />}
          </div>
        )}
      </div>
    </div>
  );
}