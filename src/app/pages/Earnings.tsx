import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, X, DollarSign, Calendar, ChevronRight, CheckCircle, Info } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface EarningSession {
  id: string;
  sessionNumber: string;
  clientName: string;
  serviceType: string;
  sessionDate: string;
  sessionTime: string;
  earningAmount: number;
  status: "Billed" | "Unbilled";
  rated: boolean;
  avatar?: string;
}

interface PayoutHistory {
  id: string;
  payoutId: string;
  totalAmount: number;
  payoutDate: string;
  remarks: string;
  sessions: number;
}

export function Earnings({ hideHeader = false, clientFilter = "all", earningsSource = "personal" }: { hideHeader?: boolean; clientFilter?: string; earningsSource?: "personal" | "mantra" }) {
  const [activeTab, setActiveTab] = useState<"billed" | "unbilled" | "payout">("billed");
  const [selectedSession, setSelectedSession] = useState<EarningSession | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<PayoutHistory | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("2026");

  // Sample data for earnings
  const earningsSessions: EarningSession[] = [
    {
      id: "1",
      sessionNumber: "16065",
      clientName: "Aishwarya",
      serviceType: "Therapy",
      sessionDate: "Mar 03",
      sessionTime: "15:34",
      earningAmount: 85.00,
      status: "Billed",
      rated: false,
      avatar: "https://images.unsplash.com/photo-1583590019912-19cdc55ec80e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDA2Nzc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      sessionNumber: "16066",
      clientName: "Manisha",
      serviceType: "Nutrition",
      sessionDate: "Mar 05",
      sessionTime: "12:31",
      earningAmount: 75.00,
      status: "Billed",
      rated: true,
      avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczOTg5MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      sessionNumber: "16067",
      clientName: "Mohini",
      serviceType: "Therapy",
      sessionDate: "Mar 05",
      sessionTime: "16:28",
      earningAmount: 90.00,
      status: "Billed",
      rated: true,
      avatar: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0MDIwMzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "4",
      sessionNumber: "16068",
      clientName: "Vineeta Tiwari",
      serviceType: "Yoga",
      sessionDate: "Mar 06",
      sessionTime: "15:35",
      earningAmount: 65.00,
      status: "Billed",
      rated: false,
      avatar: "https://images.unsplash.com/photo-1761243892035-c3e13829115a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MDI4NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "5",
      sessionNumber: "16069",
      clientName: "Samiksha",
      serviceType: "Therapy",
      sessionDate: "Mar 07",
      sessionTime: "12:03",
      earningAmount: 85.00,
      status: "Billed",
      rated: true,
      avatar: "https://images.unsplash.com/photo-1758598306913-5cd682b9e53b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MDY3NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "6",
      sessionNumber: "16070",
      clientName: "Bhakti Joshi",
      serviceType: "Therapy",
      sessionDate: "Mar 08",
      sessionTime: "11:22",
      earningAmount: 85.00,
      status: "Billed",
      rated: false,
      avatar: "https://images.unsplash.com/photo-1590563152569-bd0b2dae4418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwd29tYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQwNjc3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "7",
      sessionNumber: "16071",
      clientName: "Rachit",
      serviceType: "Therapy",
      sessionDate: "Feb 03",
      sessionTime: "10:43",
      earningAmount: 95.00,
      status: "Unbilled",
      rated: false,
      avatar: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NDA2Nzc0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "8",
      sessionNumber: "16072",
      clientName: "Sarah Johnson",
      serviceType: "Nutrition",
      sessionDate: "Mar 10",
      sessionTime: "14:20",
      earningAmount: 80.00,
      status: "Unbilled",
      rated: false,
      avatar: "https://images.unsplash.com/photo-1605298046196-e205d0d699d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc3NDA2Nzc0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "9",
      sessionNumber: "16073",
      clientName: "Michael Chen",
      serviceType: "Therapy",
      sessionDate: "Mar 11",
      sessionTime: "09:15",
      earningAmount: 100.00,
      status: "Unbilled",
      rated: false,
      avatar: "https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5MTYzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const payoutHistory: PayoutHistory[] = [
    {
      id: "1",
      payoutId: "#1003",
      totalAmount: 1250.50,
      payoutDate: "Apr 01, 2026",
      remarks: "Paid in HDFC Bank xxxx4174",
      sessions: 5,
    },
    {
      id: "2",
      payoutId: "#1002",
      totalAmount: 1100.30,
      payoutDate: "Mar 01, 2026",
      remarks: "Paid in HDFC Bank xxxx4174",
      sessions: 4,
    },
    {
      id: "3",
      payoutId: "#1001",
      totalAmount: 980.75,
      payoutDate: "Feb 01, 2026",
      remarks: "Paid in HDFC Bank xxxx4174",
      sessions: 3,
    },
  ];

  // Filter sessions by status
  const billedSessions = earningsSessions.filter(s => s.status === "Billed");
  const unbilledSessions = earningsSessions.filter(s => s.status === "Unbilled");

  // Apply client filter from parent component
  const filteredBilledSessions = clientFilter === "all"
    ? billedSessions
    : billedSessions.filter(s => s.clientName === clientFilter);

  const filteredUnbilledSessions = clientFilter === "all"
    ? unbilledSessions
    : unbilledSessions.filter(s => s.clientName === clientFilter);

  // Calculate totals
  const earnedTotal = billedSessions.reduce((sum, s) => sum + s.earningAmount, 0);
  const receivedTotal = payoutHistory.reduce((sum, p) => sum + p.totalAmount, 0);
  const dueTotal = earnedTotal;

  const totalSessions = activeTab === "billed" ? filteredBilledSessions.length :
                        activeTab === "unbilled" ? filteredUnbilledSessions.length :
                        0;

  const totalAmount = activeTab === "billed" ? filteredBilledSessions.reduce((sum, s) => sum + s.earningAmount, 0) :
                      activeTab === "unbilled" ? filteredUnbilledSessions.reduce((sum, s) => sum + s.earningAmount, 0) :
                      receivedTotal;

  const currentSessions = activeTab === "billed" ? filteredBilledSessions :
                          activeTab === "unbilled" ? filteredUnbilledSessions : [];

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-2 md:p-6">
      {/* Header */}
      {!hideHeader && (
        <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6 lg:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl text-gray-900 dark:text-white mb-1 md:mb-2">Mantra Earnings</h1>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
                Track your session earnings and monthly payouts.
              </p>
            </div>
            
            {/* Month and Year Filters */}
            <div className="flex items-center gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
              >
                <option value="all">All Months</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
                <option value="may">May</option>
                <option value="jun">June</option>
                <option value="jul">July</option>
                <option value="aug">August</option>
                <option value="sep">September</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December</option>
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
        {/* Earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-2 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-4">
            {/* Icon - Shows first on mobile, last on desktop */}
            <div className="size-8 md:size-12 bg-[#f3faff] rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 mb-2 md:mb-0 md:order-2">
              <DollarSign className="size-4 md:size-6 text-[#00c0ff]" />
            </div>
            
            {/* Text content - Shows after icon on mobile, first on desktop */}
            <div className="md:order-1">
              <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 mb-0.5 md:mb-1">Earned</p>
              <p className="text-base md:text-3xl font-bold text-gray-900 dark:text-white">${earnedTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-xs">
            <span className="text-green-600 dark:text-green-400 font-medium">+12.5%</span>
            <span className="text-gray-500 dark:text-gray-400 hidden md:inline">from last month</span>
          </div>
        </motion.div>

        {/* Received */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-2 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-4">
            {/* Icon - Shows first on mobile, last on desktop */}
            <div className="size-8 md:size-12 bg-green-50 dark:bg-green-900/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 mb-2 md:mb-0 md:order-2">
              <FileText className="size-4 md:size-6 text-green-600 dark:text-green-400" />
            </div>
            
            {/* Text content - Shows after icon on mobile, first on desktop */}
            <div className="md:order-1">
              <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 mb-0.5 md:mb-1">Received</p>
              <p className="text-base md:text-3xl font-bold text-gray-900 dark:text-white">${receivedTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-xs">
            <span className="text-green-600 dark:text-green-400 font-medium">+8.2%</span>
            <span className="text-gray-500 dark:text-gray-400 hidden md:inline">from last month</span>
          </div>
        </motion.div>

        {/* Due */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-2 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-4">
            {/* Icon - Shows first on mobile, last on desktop */}
            <div className="size-8 md:size-12 bg-orange-50 dark:bg-orange-900/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 mb-2 md:mb-0 md:order-2">
              <FileText className="size-4 md:size-6 text-orange-600 dark:text-orange-400" />
            </div>
            
            {/* Text content - Shows after icon on mobile, first on desktop */}
            <div className="md:order-1">
              <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 mb-0.5 md:mb-1">Due</p>
              <p className="text-base md:text-3xl font-bold text-gray-900 dark:text-white">${dueTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-xs">
            <span className="text-gray-500 dark:text-gray-400 hidden md:inline">Pending payout</span>
            <span className="text-gray-500 dark:text-gray-400 md:hidden">Pending</span>
          </div>
        </motion.div>
      </div>

      {/* Bank and Tax Information Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl md:rounded-2xl p-3 md:p-5 mb-4 md:mb-6 lg:mb-8 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 shadow-sm"
      >
        <div className="size-8 md:size-10 bg-amber-500 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
          <Info className="size-4 md:size-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-0.5 md:mb-1 text-sm md:text-base">
            Complete Your Payout Setup
          </h4>
          <p className="text-xs md:text-sm text-amber-800 dark:text-amber-200">
            Your bank and tax information is missing. Add it to receive payouts on time.
          </p>
        </div>
        <button className="w-full md:w-auto px-3 md:px-4 py-1.5 md:py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm font-medium rounded-lg transition-colors flex-shrink-0">
          Complete Setup
        </button>
      </motion.div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Tabs - Segmented Control Style */}
        <div className="p-3 md:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2 bg-gray-100 dark:bg-gray-700 p-1 md:p-1.5 rounded-xl w-full md:w-fit overflow-x-auto">
            <button
              onClick={() => setActiveTab("billed")}
              className={`flex-1 md:flex-initial px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap ${
                activeTab === "billed"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Billed
            </button>

            <button
              onClick={() => setActiveTab("unbilled")}
              className={`flex-1 md:flex-initial px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap ${
                activeTab === "unbilled"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Unbilled
            </button>

            <button
              onClick={() => setActiveTab("payout")}
              className={`flex-1 md:flex-initial px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap ${
                activeTab === "payout"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Payouts
            </button>
          </div>

          {/* Filters and Bank & Tax Button */}
          <div className="flex flex-row items-center gap-2">
            {/* Month and Year Filters - Only show when hideHeader is true */}
            {hideHeader && (
              <>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
                >
                  <option value="all">All Months</option>
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="mar">March</option>
                  <option value="apr">April</option>
                  <option value="may">May</option>
                  <option value="jun">June</option>
                  <option value="jul">July</option>
                  <option value="aug">August</option>
                  <option value="sep">September</option>
                  <option value="oct">October</option>
                  <option value="nov">November</option>
                  <option value="dec">December</option>
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </>
            )}

            {/* Bank & Tax Button */}
            <button className="px-3 md:px-4 py-2 md:py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors text-xs md:text-sm flex items-center justify-center gap-2">
              <DollarSign className="size-3.5 md:size-4" />
              Bank & Tax
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {/* Sessions List */}
          {(activeTab === "billed" || activeTab === "unbilled") && (
            <>
              {earningsSource === "mantra" ? (
                <div className="text-center py-16">
                  <div className="size-16 bg-[#f3faff] dark:bg-[#043570]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="size-8 text-[#00c0ff]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Mantra earnings yet</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    Earnings from MantraCare's network will appear here once you receive client referrals.
                  </p>
                </div>
              ) : currentSessions.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-xl text-gray-900 dark:text-white mb-2">
                    No {activeTab} sessions yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your {activeTab} sessions will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {currentSessions.map((session, index) => (
                    <motion.button
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      onClick={() => setSelectedSession(session)}
                      className="group w-full flex items-center justify-between p-3 md:p-5 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-750 hover:from-[#f3faff] hover:to-white dark:hover:from-gray-750 dark:hover:to-gray-700 rounded-xl md:rounded-2xl transition-all text-left border border-gray-200 dark:border-gray-700 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          {session.avatar ? (
                            <ImageWithFallback
                              src={session.avatar}
                              alt={session.clientName}
                              className="size-11 md:size-14 rounded-xl md:rounded-2xl object-cover shadow-sm"
                            />
                          ) : (
                            <div className="size-11 md:size-14 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-semibold text-sm md:text-base shadow-sm">
                              {session.clientName.split(" ").map((n) => n[0]).join("")}
                            </div>
                          )}
                          {session.rated && (
                            <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 size-5 md:size-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                              <CheckCircle className="size-3 md:size-3.5 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Client Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base mb-0.5 md:mb-1 truncate group-hover:text-[#043570] dark:group-hover:text-[#00c0ff] transition-colors">
                            {session.clientName}
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                            <span className="text-xs md:text-sm font-medium text-[#00c0ff] dark:text-[#00c0ff] bg-[#f3faff] dark:bg-[#043570]/30 px-1.5 md:px-2 py-0.5 rounded-md">
                              {session.serviceType}
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                              #{session.sessionNumber}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-0.5 md:gap-1">
                              <svg className="size-3 md:size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {session.sessionDate}
                            </span>
                            <span className="flex items-center gap-0.5 md:gap-1">
                              <svg className="size-3 md:size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {session.sessionTime}
                            </span>
                            <span className="hidden md:inline text-xs text-gray-400">•</span>
                            <span className="hidden md:inline">30 min</span>
                          </div>
                        </div>
                      </div>

                      {/* Amount - Right Side */}
                      <div className="flex-shrink-0 ml-2 md:ml-4 text-right">
                        <div className="text-lg md:text-2xl font-bold text-green-600 dark:text-green-400 mb-0.5 md:mb-1">
                          ${session.earningAmount.toFixed(2)}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                          Earning
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Summary Footer */}
              {earningsSource === "personal" && currentSessions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base md:text-lg text-[#4169E1] dark:text-[#6B8FFF] font-medium">Total Amount</span>
                    <span className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                      = {totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg text-[#4169E1] dark:text-[#6B8FFF] font-medium">Total Sessions</span>
                    <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      = {totalSessions}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Payouts List */}
          {activeTab === "payout" && (
            <>
              {payoutHistory.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl text-gray-900 dark:text-white mb-2">No payout history</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your monthly payouts will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {payoutHistory.map((payout, index) => (
                    <motion.button
                      key={payout.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => setSelectedPayout(payout)}
                      className="group w-full p-3 md:p-5 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-750 hover:from-[#f3faff] hover:to-white dark:hover:from-gray-750 dark:hover:to-gray-700 rounded-xl md:rounded-2xl transition-all text-left border border-gray-200 dark:border-gray-700 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] shadow-sm hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                        {/* Top Section Mobile: Icon + Payout ID + Amount */}
                        <div className="flex items-center gap-3 md:hidden">
                          {/* Icon */}
                          <div className="size-10 bg-[#f3faff] dark:bg-[#043570]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="size-5 text-[#00c0ff] dark:text-[#00c0ff]" />
                          </div>
                          
                          {/* Payout ID */}
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 dark:text-white text-base group-hover:text-[#043570] dark:group-hover:text-[#00c0ff] transition-colors">
                              {payout.payoutId}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {payout.sessions} sessions
                            </div>
                          </div>

                          {/* Amount - Right aligned */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              ${payout.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex md:items-center md:gap-4 w-full">
                          {/* Icon */}
                          <div className="size-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="size-5 text-gray-600 dark:text-gray-400" />
                          </div>

                          {/* Left: Payout Info */}
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">
                              {payout.payoutId}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {payout.payoutDate} | {payout.remarks}
                            </div>
                          </div>

                          {/* Right: Amount */}
                          <div className="text-xl font-semibold text-gray-900 dark:text-white">
                            ${payout.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>

                        {/* Bottom Section Mobile: Date + Remarks */}
                        <div className="md:hidden space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                            <Calendar className="size-3.5 text-[#00c0ff]" />
                            <span className="font-medium">{payout.payoutDate}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <CheckCircle className="size-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{payout.remarks}</span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Summary Footer */}
              {payoutHistory.length > 0 && (
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm md:text-base lg:text-lg text-[#4169E1] dark:text-[#6B8FFF] font-medium">Total Amount</span>
                    <span className="text-lg md:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm md:text-base lg:text-lg text-[#4169E1] dark:text-[#6B8FFF] font-medium">Total Payouts</span>
                    <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                      {payoutHistory.length}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Session Detail Modal */}
      <AnimatePresence>
        {selectedSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedSession(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">#{selectedSession.sessionNumber}</h2>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="size-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Client Name */}
                <div>
                  <h3 className="text-base text-gray-900 dark:text-white mb-1">
                    With <span className="font-semibold text-[#4169E1] dark:text-[#6B8FFF]">{selectedSession.clientName}</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedSession.sessionDate} at {selectedSession.sessionTime}
                  </p>
                </div>

                {/* Rating Info */}
                {!selectedSession.rated && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                          {selectedSession.clientName} hasn't rated this session yet.
                        </p>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          Send feedback form?
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedSession.rated && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-900 dark:text-green-100">
                        {selectedSession.clientName} has rated this session.
                      </p>
                    </div>
                  </div>
                )}

                {/* Mark as Invalid */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Mark as invalid?
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payout Detail Modal */}
      <AnimatePresence>
        {selectedPayout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedPayout(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPayout.payoutId}</h2>
                <button
                  onClick={() => setSelectedPayout(null)}
                  className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="size-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payout Date</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedPayout.payoutDate}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Amount</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">${selectedPayout.totalAmount.toFixed(2)}</div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Remarks</div>
                  <div className="text-base text-gray-900 dark:text-white">{selectedPayout.remarks}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}