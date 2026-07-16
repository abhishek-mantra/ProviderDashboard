import { useState } from "react";
import { Link } from "react-router";
import { 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  TrendingUp, 
  Users, 
  RefreshCw, 
  CheckCircle2,
  AlertCircle,
  Info,
  Crown,
  DollarSign,
  BarChart3,
  Building2,
  FileText,
  Award,
  CheckCircle
} from "lucide-react";

export function Premium() {
  const [premiumStatus, setPremiumStatus] = useState<"Premium" | "Non Premium">("Non Premium");
  const [category, setCategory] = useState("Therapy");
  const [getClientsFromMantra, setGetClientsFromMantra] = useState(true);
  const [fixedRate] = useState("0.01");
  const [minimumRate, setMinimumRate] = useState("0");

  // Account health metrics
  const renewalRate = 0;
  const switchRate = 64.29;
  const requestsAnswered = 12;
  const requestsRenewedInPremium = 26;

  // Points achievement for Non Premium
  const currentPoints = 120;
  const requiredPoints = 250;
  const pointsProgress = (currentPoints / requiredPoints) * 100;
  const canApplyPremium = currentPoints >= requiredPoints;

  // Determine account health status
  const getAccountHealthStatus = () => {
    if (renewalRate < 30 || switchRate > 50) {
      return { 
        label: "Poor", 
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        borderColor: "border-red-200 dark:border-red-800",
        icon: AlertCircle
      };
    } else if (renewalRate < 60 || switchRate > 30) {
      return { 
        label: "Fair", 
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        icon: AlertCircle
      };
    } else {
      return { 
        label: "Good", 
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        icon: CheckCircle2
      };
    }
  };

  const accountHealth = getAccountHealthStatus();
  const HealthIcon = accountHealth.icon;

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6">
      {/* Dev Mode Toggle - Fixed position */}
      <div className="fixed top-16 md:top-4 right-2 md:right-4 z-50 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 md:p-3">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Dev:</span>
          <div className="flex items-center gap-1 md:gap-1.5 bg-gray-100 dark:bg-gray-700 rounded-md md:rounded-lg p-0.5 md:p-1">
            <button
              onClick={() => setPremiumStatus("Premium")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all ${
                premiumStatus === "Premium"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Premium
            </button>
            <button
              onClick={() => setPremiumStatus("Non Premium")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all ${
                premiumStatus === "Non Premium"
                  ? "bg-[#043570] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Non Premium
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px]">
        {/* Header */}
        <div className="mb-4 md:mb-8 px-3 md:px-0 pt-3 md:pt-0">
          <div className="flex items-center justify-between flex-wrap gap-3 md:gap-0">
            <div className="flex items-start gap-2 md:gap-4">
              <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
                <Crown className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
              </div>
              <div>
                <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                  Premium Provider
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {premiumStatus === "Premium" 
                    ? "Manage your premium profile settings and preferences"
                    : "Unlock premium benefits and access to exclusive features"
                  }
                </p>
              </div>
            </div>
            {/* Category Selector - Only show for Premium users */}
            {premiumStatus === "Premium" && (
              <div className="relative w-full md:w-auto">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 pr-8 md:pr-10 text-sm text-gray-700 dark:text-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c0ff] cursor-pointer shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <option>Therapy</option>
                  <option>Nutrition</option>
                  <option>Physiotherapy</option>
                </select>
                <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* Non Premium View */}
        {premiumStatus === "Non Premium" && (
          <div className="space-y-4 md:space-y-6 px-3 md:px-0 pb-3 md:pb-0">
            {/* Premium Benefits Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-8">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Sparkles className="size-3.5 md:size-4 text-[#2563EB]" />
                </div>
                <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
                  Premium Benefits
                </h2>
              </div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 md:mb-8">
                Only premium providers receive session requests from Mantra's network of <span className="font-semibold text-gray-900 dark:text-white">1M+ individuals</span> and <span className="font-semibold text-gray-900 dark:text-white">20K+ corporate clients</span>.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 gap-3 md:gap-5">
                {/* Access 2000+ Organizations */}
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-md">
                    <Building2 className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5">
                      Access 2000+ Organizations
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Partner with MantraCare and reach employees across leading organizations.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" />
                </div>

                {/* Work on Your Terms */}
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#10B981] flex items-center justify-center flex-shrink-0 shadow-md">
                    <DollarSign className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5">
                      Work on Your Terms
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Offer services at listed rates — accept requests and get paid monthly.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" />
                </div>

                {/* Premium Listing */}
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 shadow-md">
                    <FileText className="size-5 md:size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 md:mb-1.5">
                      Premium Listing
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Get featured as a verified premium provider above basic members.
                    </p>
                  </div>
                  <CheckCircle className="size-4 md:size-5 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" />
                </div>
              </div>
            </div>

            {/* Points Achievement Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-8">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">
                    Complete Your Journey to Premium
                  </h3>
                  <p className="text-xs md:text-sm text-gray-900 dark:text-white leading-relaxed">
                    Achieve <span className="font-bold text-[#2563EB]">250 points</span> to qualify and be invited as a credible, premium provider.
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {currentPoints} / {requiredPoints} points
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 md:h-4 overflow-hidden shadow-inner">
                    <div 
                      className="bg-[#2563EB] h-3 md:h-4 rounded-full transition-all duration-500"
                      style={{ width: `${pointsProgress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 text-center mt-2 md:mt-3">
                  {canApplyPremium 
                    ? "🎉 Congratulations! You've qualified for premium status" 
                    : `${requiredPoints - currentPoints} more points needed to unlock premium status`
                  }
                </p>
              </div>
            </div>

            {/* Improve Provider Score Button */}
            <Link to="/tasks" className="block">
              <button className="w-full py-3 md:py-4 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                Improve your Provider Score
              </button>
            </Link>

            {/* Action Button */}
            <button 
              className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg ${
                canApplyPremium
                  ? "bg-[#3665E0] hover:bg-[#2952C0] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60"
              }`}
              disabled={!canApplyPremium}
            >
              {canApplyPremium ? "Apply as Premium Provider" : "Apply as Premium Provider"}
            </button>

            {/* Help Text */}
            {!canApplyPremium && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg md:rounded-xl p-3 md:p-4">
                <div className="flex gap-2 md:gap-3">
                  <Info className="size-4 md:size-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs md:text-sm text-blue-900 dark:text-blue-200 font-medium mb-0.5 md:mb-1">
                      How to earn points?
                    </p>
                    <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                      Complete your profile, verify credentials, attend training sessions, and maintain high session quality to earn points towards premium status.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="flex justify-end mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                To qualify for premium provider selection round T&C* Apply (Mantra Discretions)
              </p>
            </div>
          </div>
        )}

        {/* Premium View - Original Content */}
        {premiumStatus === "Premium" && (
          <div className="px-3 md:px-0 pb-3 md:pb-0">
            {/* Account Health Status Banner */}
            <div className={`${accountHealth.bgColor} border ${accountHealth.borderColor} md:border-2 rounded-xl md:rounded-2xl p-3 md:p-6 mb-4 md:mb-6 shadow-sm`}>
              <div className="flex items-start md:items-center gap-3 md:gap-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl ${accountHealth.bgColor} border ${accountHealth.borderColor} md:border-2 flex items-center justify-center flex-shrink-0`}>
                  <HealthIcon className={`size-6 md:size-7 ${accountHealth.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white">Account Health Status</h3>
                    <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold ${accountHealth.bgColor} ${accountHealth.color} border ${accountHealth.borderColor}`}>
                      {accountHealth.label}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {accountHealth.label === "Poor" && "Your account needs attention. Improve renewal rate and reduce switch rate."}
                    {accountHealth.label === "Fair" && "Your account is performing adequately. Focus on improving key metrics."}
                    {accountHealth.label === "Good" && "Great job! Your account is in excellent standing."}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              {/* Preferences Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-7">
                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-7">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#00c0ff] flex items-center justify-center shadow-md">
                    <Sparkles className="size-4 md:size-5 text-white" />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Preferences</h2>
                </div>
                
                {/* Get Clients from Mantra */}
                <div className="mb-5 md:mb-7 p-3 md:p-4 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <label className="flex items-center gap-2 md:gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={getClientsFromMantra}
                        onChange={(e) => setGetClientsFromMantra(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 md:w-12 md:h-7 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-[#00c0ff] transition-all shadow-inner"></div>
                      <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform peer-checked:translate-x-5 shadow-md"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm md:text-base font-bold text-gray-900 dark:text-white block">
                        Get Clients from Mantra
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 italic font-normal">
                        Allow new client requests to be received
                      </span>
                    </div>
                  </label>
                </div>

                {/* Fixed Rate */}
                <div className="mb-5 md:mb-7 bg-gray-50 dark:bg-gray-900 rounded-lg md:rounded-xl p-3 md:p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                        <DollarSign className="size-4 md:size-5 text-[#00c0ff]" />
                      </div>
                      <label className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Fixed Rate</label>
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-[#00c0ff] bg-white dark:bg-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-gray-200 dark:border-gray-700">${fixedRate}</span>
                  </div>
                </div>

                {/* Minimum Rate */}
                <div>
                  <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="size-4 md:size-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="text-sm md:text-base font-bold text-gray-900 dark:text-white block">Minimum Rate</label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        You will only be shown requests above this rate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 md:border-2 rounded-lg md:rounded-xl px-2 py-2 md:px-4 md:py-3 bg-white dark:bg-gray-900 flex-1 focus-within:border-[#00c0ff] focus-within:ring-2 focus-within:ring-[#00c0ff]/20 transition-all">
                      <span className="text-sm md:text-base text-gray-600 dark:text-gray-400 mr-1 md:mr-2 font-bold">$</span>
                      <input
                        type="number"
                        value={minimumRate}
                        onChange={(e) => setMinimumRate(e.target.value)}
                        className="flex-1 bg-transparent text-sm md:text-base text-gray-900 dark:text-white outline-none font-bold min-w-0"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <button className="px-2.5 py-2 md:px-6 md:py-3 bg-[#00c0ff] hover:bg-[#0099cc] text-white rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex-shrink-0">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Performance Metrics Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-7">
                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-7">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#8B5CF6] flex items-center justify-center shadow-md">
                    <BarChart3 className="size-4 md:size-5 text-white" />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Performance Metrics</h2>
                </div>
                
                {/* Metrics Grid */}
                <div className="space-y-4 md:space-y-6">
                  {/* Renewal Rate */}
                  <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-green-500 flex items-center justify-center shadow-sm flex-shrink-0">
                          <RefreshCw className="size-4 md:size-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">Renewal Rate</p>
                          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 italic font-normal">Users who renewed your plans</p>
                        </div>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white ml-2">{renewalRate}%</p>
                    </div>
                    <div className="w-full bg-green-200 dark:bg-green-900/40 rounded-full h-2.5 md:h-3 overflow-hidden shadow-inner">
                      <div 
                        className="bg-green-500 h-2.5 md:h-3 rounded-full transition-all"
                        style={{ width: `${renewalRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Switch Rate */}
                  <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-red-500 flex items-center justify-center shadow-sm flex-shrink-0">
                          <TrendingUp className="size-4 md:size-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">Switch Rate</p>
                          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 italic font-normal">Users who moved to another expert</p>
                        </div>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white ml-2">{switchRate}%</p>
                    </div>
                    <div className="w-full bg-red-200 dark:bg-red-900/40 rounded-full h-2.5 md:h-3 overflow-hidden shadow-inner">
                      <div 
                        className="bg-red-500 h-2.5 md:h-3 rounded-full transition-all"
                        style={{ width: `${switchRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Requests Answered */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg md:rounded-xl p-3 md:p-4 border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm flex-shrink-0">
                          <CheckCircle2 className="size-4 md:size-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">Requests Answered</p>
                          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 italic font-normal">Client requests you accepted</p>
                        </div>
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white ml-2">{requestsAnswered}</p>
                    </div>
                  </div>

                  {/* Requests Renewed in Premium */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg md:rounded-xl p-3 md:p-4 border border-purple-100 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-purple-500 flex items-center justify-center shadow-sm flex-shrink-0">
                          <Users className="size-4 md:size-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">Renewed in Premium</p>
                          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 italic font-normal">Renewals after becoming premium</p>
                        </div>
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white ml-2">{requestsRenewedInPremium}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <button className="w-full py-3 md:py-4 bg-[#3665E0] hover:bg-[#2952C0] text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 md:gap-2.5 shadow-md hover:shadow-lg mb-4 md:mb-6">
              <HelpCircle className="size-4 md:size-5" />
              <span>Facing Issues? Contact Support</span>
            </button>

            {/* Info Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 md:border-2 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm">
              <div className="flex gap-2 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Info className="size-4 md:size-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-lg font-bold text-blue-900 dark:text-blue-200 mb-1 md:mb-2">Premium Benefits</h3>
                  <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                    Premium providers receive priority placement in client matching and access to exclusive features. 
                    Maintain good account health metrics to maximize your visibility and earnings potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}