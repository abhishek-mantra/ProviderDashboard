import { useState, useEffect, useMemo } from "react";
import { DollarSign, FileText, Plus, User, ChevronDown, Building2, Shield } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Earnings } from "./Earnings";
import { Invoices } from "./Invoices";
import { BankInfo } from "./BankInfo";
import { TaxInfo } from "./TaxInfo";
import { InsurancePage } from "./InsurancePage";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { usePlanMode } from "../contexts/PlanModeContext";
import { PLAN_TIER_PRICING, PLAN_TIER_EXTRA_COST, PLAN_TIER_LIMITS } from "../types/partnerDashboard";

export function Billing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCurrentEstablishment, isCurrentUserAdmin, providers, members, clients, currentProviderId, clientTreatingProviders } = usePartnerDashboard();
  const { planMode } = usePlanMode();
  const [activeTab, setActiveTab] = useState<"earnings" | "invoices" | "insurance" | "banktax">(
    (location.state as any)?.tab || "earnings"
  );
  const [earningsSubTab, setEarningsSubTab] = useState<"earnings" | "no-earnings">("earnings");
  const [bankTaxSubTab, setBankTaxSubTab] = useState<"bank" | "tax">("bank");
  const [showClientSelectModal, setShowClientSelectModal] = useState(false);
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>("all");
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  const establishment = getCurrentEstablishment();

  const establishmentMembers = establishment
    ? members.filter((m) => m.establishmentId === establishment.id && m.memberStatus === "active")
    : [];
  const establishmentProviders = establishmentMembers.map((m) => providers.find((p) => p.id === m.providerId)).filter(Boolean) as typeof providers;

  // Current provider's personal earnings (from their own clients)
  const currentProvider = providers.find((p) => p.id === currentProviderId);
  const personalEarnings = {
    earned: 4820,
    received: 4200,
    due: 620,
  };

  // Mantra clients assigned to the current provider (only if their planMode is "provider")
  const myMantraClients = currentProvider?.planMode === "provider"
    ? clients.filter((c) => clientTreatingProviders[c.id] === currentProviderId)
    : [];
  const mantraClientCount = myMantraClients.length;
  const mantraRevenue = {
    totalBilled: mantraClientCount * 320,
    yourShare: Math.floor(mantraClientCount * 320 * 0.7),
    paid: Math.floor(mantraClientCount * 320 * 0.7 * 0.85),
    pending: Math.floor(mantraClientCount * 320 * 0.7 * 0.15),
  };

  // Aggregate mantra revenue across all providers in the establishment (for admin view)
  const aggregateMantraRevenue = useMemo(() => {
    const active = establishmentMembers.filter((m) => m.memberStatus === "active");
    let totalBilled = 0, totalShare = 0, totalPaid = 0, totalPending = 0;
    let providerCount = 0;
    for (const member of active) {
      const p = providers.find((pr) => pr.id === member.providerId);
      if (p?.planMode !== "provider") continue;
      const cnt = clients.filter((c) => clientTreatingProviders[c.id] === p.id).length;
      if (cnt === 0) continue;
      totalBilled += cnt * 320;
      totalShare += Math.floor(cnt * 320 * 0.7);
      totalPaid += Math.floor(cnt * 320 * 0.7 * 0.85);
      totalPending += Math.floor(cnt * 320 * 0.7 * 0.15);
      providerCount++;
    }
    return { totalBilled, yourShare: totalShare, paid: totalPaid, pending: totalPending, providerCount };
  }, [establishmentMembers, providers, clients, clientTreatingProviders]);

  // MantraCare Platform Billing - establishment level, from PLAN_TIER_PRICING
  const planTier = establishment?.planTier as keyof typeof PLAN_TIER_PRICING || "GROWTH";
  const monthlyPlatformFee = PLAN_TIER_PRICING[planTier] || 79;
  const platformBilling = {
    monthlyFee: monthlyPlatformFee,
    // Mock paid/due based on months active
    paid: monthlyPlatformFee * 6, // 6 months paid
    due: monthlyPlatformFee * 2, // 2 months due
    planTier,
  };

  // Per-provider revenue for Admin view only
  const perProviderRevenue = useMemo(() =>
    establishmentProviders.map((p) => ({
      name: p.name,
      revenue: Math.floor(Math.random() * 15000) + 5000,
      received: Math.floor(Math.random() * 12000) + 4000,
      due: Math.floor(Math.random() * 3000) + 500,
    })),
    [establishmentProviders]
  );

  // Earnings trend for the current provider (personal)
  const earningsTrend = useMemo(() => [
    { month: "Jan", earned: 3200, received: 2800 },
    { month: "Feb", earned: 3800, received: 3400 },
    { month: "Mar", earned: 3500, received: 3100 },
    { month: "Apr", earned: 4200, received: 3800 },
    { month: "May", earned: 4600, received: 4100 },
    { month: "Jun", earned: 4820, received: 4200 },
  ], []);

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
                {/* Billing Overview — Admin gets Platform + Personal + Mantra; Provider gets Personal + Mantra */}
                {isCurrentUserAdmin && establishment ? (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                      <div className="lg:col-span-2 bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-2xl p-5 md:p-6 shadow-sm text-white">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="size-5 text-[#00c0ff]" />
                          <h3 className="text-base md:text-lg font-semibold">MantraCare Platform Billing</h3>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold">
                          ${(PLAN_TIER_PRICING[establishment.planTier as keyof typeof PLAN_TIER_PRICING] || 0).toLocaleString()}<span className="text-xl font-normal text-white/70">/mo</span>
                        </p>
                        <p className="text-white/80 text-xs md:text-sm mt-1">
                          {establishment.planTier} plan · {PLAN_TIER_LIMITS[establishment.planTier as keyof typeof PLAN_TIER_LIMITS] === null ? "Unlimited" : PLAN_TIER_LIMITS[establishment.planTier as keyof typeof PLAN_TIER_LIMITS]} provider seats
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-xs text-white/70">Monthly Cost</p>
                            <p className="text-base md:text-lg font-semibold">${(PLAN_TIER_PRICING[establishment.planTier as keyof typeof PLAN_TIER_PRICING] || 0).toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-xs text-white/70">Seats Used</p>
                            <p className="text-base md:text-lg font-semibold">{establishmentMembers.filter(m => m.memberStatus === 'active').length} / {PLAN_TIER_LIMITS[establishment.planTier as keyof typeof PLAN_TIER_LIMITS] === null ? '∞' : PLAN_TIER_LIMITS[establishment.planTier as keyof typeof PLAN_TIER_LIMITS]}</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-xs text-white/70">Extra Seat Cost</p>
                            <p className="text-base md:text-lg font-semibold">
                              {PLAN_TIER_EXTRA_COST[establishment.planTier as keyof typeof PLAN_TIER_EXTRA_COST] ? `$${PLAN_TIER_EXTRA_COST[establishment.planTier as keyof typeof PLAN_TIER_EXTRA_COST]}/mo` : 'Included'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="size-5 text-green-500" />
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Personal Earnings</h3>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">${personalEarnings.earned.toLocaleString()}</p>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Your earnings from your clients this month</p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-3">
                            <p className="text-xs text-green-600 dark:text-green-400">Received</p>
                            <p className="text-base md:text-lg font-semibold text-green-800 dark:text-green-300">${personalEarnings.received.toLocaleString()}</p>
                          </div>
                          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-3">
                            <p className="text-xs text-amber-600 dark:text-amber-400">Due</p>
                            <p className="text-base md:text-lg font-semibold text-amber-800 dark:text-amber-300">${personalEarnings.due.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {aggregateMantraRevenue.yourShare > 0 && (
                      <div className="bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-2xl p-5 md:p-6 shadow-sm text-white mb-6 md:mb-8">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="size-5 text-[#00c0ff]" />
                          <h3 className="text-base md:text-lg font-semibold">Mantra Clients Revenue</h3>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold">${aggregateMantraRevenue.yourShare.toLocaleString()}</p>
                        <p className="text-white/80 text-xs md:text-sm mt-1">Total share across {aggregateMantraRevenue.providerCount} Mantra provider{aggregateMantraRevenue.providerCount !== 1 ? "s" : ""} this month</p>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="bg-white/10 rounded-xl p-2.5">
                            <p className="text-xs text-white/70">Total Billed</p>
                            <p className="text-sm md:text-base font-semibold">${aggregateMantraRevenue.totalBilled.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-2.5">
                            <p className="text-xs text-white/70">Paid</p>
                            <p className="text-sm md:text-base font-semibold">${aggregateMantraRevenue.paid.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-2.5">
                            <p className="text-xs text-white/70">Pending</p>
                            <p className="text-sm md:text-base font-semibold">${aggregateMantraRevenue.pending.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`grid grid-cols-1 ${planMode === "provider" ? "md:grid-cols-2" : ""} gap-4 md:gap-6 mb-6 md:mb-8`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="size-5 text-green-500" />
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Personal Earnings</h3>
                      </div>
                      <p className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">${personalEarnings.earned.toLocaleString()}</p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">From your private clients</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-3">
                          <p className="text-xs text-green-600 dark:text-green-400">Received</p>
                          <p className="text-base md:text-lg font-semibold text-green-800 dark:text-green-300">${personalEarnings.received.toLocaleString()}</p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-3">
                          <p className="text-xs text-amber-600 dark:text-amber-400">Due</p>
                          <p className="text-base md:text-lg font-semibold text-amber-800 dark:text-amber-300">${personalEarnings.due.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    {planMode === "provider" && (
                      <div className="bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-2xl p-5 md:p-6 shadow-sm text-white">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="size-5 text-[#00c0ff]" />
                          <h3 className="text-base md:text-lg font-semibold">Mantra Clients Revenue</h3>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold">${mantraRevenue.yourShare.toLocaleString()}</p>
                        <p className="text-white/80 text-xs md:text-sm mt-1">Your share from {mantraClientCount} Mantra client{mantraClientCount !== 1 ? "s" : ""} this month</p>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="bg-white/10 rounded-xl p-2.5">
                            <p className="text-xs text-white/70">Total Billed</p>
                            <p className="text-sm md:text-base font-semibold">${mantraRevenue.totalBilled.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-2.5">
                            <p className="text-xs text-white/70">Paid</p>
                            <p className="text-sm md:text-base font-semibold">${mantraRevenue.paid.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-2.5">
                            <p className="text-xs text-white/70">Pending</p>
                            <p className="text-sm md:text-base font-semibold">${mantraRevenue.pending.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Per-provider revenue chart — Admin only */}
                {isCurrentUserAdmin && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm mb-6 md:mb-8">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Revenue by Provider
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={perProviderRevenue}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} className="text-gray-500 dark:text-gray-400" />
                          <YAxis tick={{ fontSize: 11 }} className="text-gray-500 dark:text-gray-400" />
                          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                          <Bar dataKey="revenue" fill="#043570" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                <Earnings hideHeader clientFilter={selectedClientFilter} />
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