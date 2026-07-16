import { useState } from "react";
import { Gift, Copy, MessageCircle, Mail, Linkedin, Share2, Users, ArrowRight, Building2, X } from "lucide-react";

type Tab = "client" | "provider" | "corporate";

export function ReferEarn() {
  const [activeTab, setActiveTab] = useState<Tab>("provider");
  const [referralLink] = useState("https://mantracare.com/ref/usr");
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormSubmitted(true);
  };

  const closeLeadModal = () => {
    setShowLeadModal(false);
    setTimeout(() => {
      setLeadFormSubmitted(false);
      setLeadFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        message: "",
      });
    }, 300);
  };

  const getSteps = () => {
    if (activeTab === "client") {
      return [
        "Invite a friend to try Mantra.",
        "Once they complete their first session, you both earn rewards.",
        "Rewards are auto-credited to your Mantra wallet.",
        "Use wallet balance to buy any Mantra program.",
      ];
    } else if (activeTab === "provider") {
      return [
        "Share your referral code with qualified professionals.",
        "When they onboard and complete their first session, you both earn rewards—automatically credited to your MantraCare wallet.",
        "Cash out instantly or use credits on MantraCare.",
      ];
    } else {
      return [
        "Share a lead and connect us with HR or key stakeholders seeking EAP, emotional wellbeing, coaching, or wellness solutions.",
        "Our team supports you in pitching and closing the opportunity.",
        "Get rewarded with 15–20% of the total contract value.",
      ];
    }
  };

  const getSubtitle = () => {
    if (activeTab === "client") {
      return "Refer a Friend for Therapy";
    } else if (activeTab === "provider") {
      return "Refer a Therapist";
    } else {
      return "Refer a Corporate";
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6">
      <div className="max-w-[1000px]">
        {/* Header */}
        <div className="mb-4 md:mb-8 px-3 md:px-0 pt-3 md:pt-0">
          <div className="flex items-start gap-2 md:gap-4">
            <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
              <Gift className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
            </div>
            <div>
              <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                Invite a Friend
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Refer providers & clients to MantraCare
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 md:rounded-2xl md:shadow-sm md:border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex px-3 md:px-6 min-w-max md:min-w-0">
              <button
                onClick={() => setActiveTab("provider")}
                className={`relative px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5 md:gap-2 whitespace-nowrap ${
                  activeTab === "provider"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Users className="size-3.5 md:size-4" />
                <span>Refer a Provider</span>
                {activeTab === "provider" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("client")}
                className={`relative px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5 md:gap-2 whitespace-nowrap ${
                  activeTab === "client"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Users className="size-3.5 md:size-4" />
                <span>Refer a Client</span>
                {activeTab === "client" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("corporate")}
                className={`relative px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5 md:gap-2 whitespace-nowrap ${
                  activeTab === "corporate"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Building2 className="size-3.5 md:size-4" />
                <span>Refer a Corporate</span>
                {activeTab === "corporate" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8 space-y-4 md:space-y-6">
            {/* Give $15, Get $15 Card */}
            <div className="bg-[#E0F2FE] dark:bg-blue-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center gap-3 md:gap-4">
              <div className="size-10 md:size-12 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="size-5 md:size-6 text-white" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                  Give $15, Get $15
                </h2>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {getSubtitle()}
                </p>
              </div>
            </div>

            {/* How it Works */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">How it Works?</h3>
              <div className="space-y-2.5 md:space-y-3">
                {getSteps().map((step, index) => (
                  <div key={index} className="flex items-start gap-2.5 md:gap-3">
                    <div className="size-5 md:size-6 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] md:text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditional Content Based on Tab */}
            {activeTab === "corporate" ? (
              <>
                {/* Share a Lead Button */}
                <div className="space-y-2.5 md:space-y-3">
                  <button
                    onClick={() => setShowLeadModal(true)}
                    className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-2.5 md:py-3 px-4 rounded-xl transition-colors text-sm md:text-base"
                  >
                    Share a Lead
                  </button>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center">
                    You can also email us at{" "}
                    <a href="mailto:provider@mantra.care" className="text-[#2563EB] hover:underline">
                      provider@mantra.care
                    </a>{" "}
                    to take this forward
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Your Referral Link */}
                <div>
                  <div className="flex items-center justify-between mb-2.5 md:mb-3">
                    <h3 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Your Referral Link</h3>
                    <button className="text-xs md:text-sm text-[#2563EB] hover:text-[#1d4ed8] font-medium flex items-center gap-1">
                      <span className="hidden sm:inline">Select Service</span>
                      <span className="sm:hidden">Service</span>
                      <svg className="size-3.5 md:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 overflow-hidden">
                      <code className="text-xs md:text-sm text-gray-500 dark:text-gray-400 break-all">{referralLink}</code>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="size-10 md:size-12 bg-[#2563EB] hover:bg-[#1d4ed8] rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <Copy className="size-4 md:size-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Share Via */}
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-2.5 md:mb-3">Share Via</h3>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    <button className="size-10 md:size-12 bg-[#2563EB] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-colors">
                      <MessageCircle className="size-4 md:size-5 text-white" />
                    </button>
                    <button className="size-10 md:size-12 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center transition-colors">
                      <svg className="size-4 md:size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </button>
                    <button className="size-10 md:size-12 bg-[#0A66C2] hover:bg-[#004182] rounded-full flex items-center justify-center transition-colors">
                      <Linkedin className="size-4 md:size-5 text-white" />
                    </button>
                    <button className="size-10 md:size-12 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                      <Share2 className="size-4 md:size-5 text-white" />
                    </button>
                    <button className="size-10 md:size-12 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                      <Mail className="size-4 md:size-5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Your Referral Reward */}
        <div
          className="mt-3 md:mt-6 md:rounded-2xl overflow-hidden p-4 md:p-6 relative"
          style={{
            background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute size-24 md:size-32 bg-white/10 rounded-full -right-6 md:-right-8 -top-6 md:-top-8" />
          <div className="absolute size-20 md:size-24 bg-white/10 rounded-full -left-4 md:-left-6 -bottom-4 md:-bottom-6" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <div className="size-5 md:size-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <Gift className="size-3 md:size-3.5 text-white" />
                  </div>
                  <span className="text-xs md:text-sm text-white/80">Your Referral Reward</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                  <h3 className="text-2xl md:text-4xl font-bold text-white">₹12,847</h3>
                  <div className="flex items-center gap-1 bg-white/20 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                    <svg className="size-2.5 md:size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-[10px] md:text-xs text-white font-medium">+5.2%</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-white/70">
                  Referral rewards can be used to purchase any Mantra program.
                </p>
              </div>
              <button className="flex items-center gap-1.5 md:gap-2 bg-white/20 hover:bg-white/30 text-white px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-colors whitespace-nowrap w-full sm:w-auto justify-center">
                View Details
                <ArrowRight className="size-3.5 md:size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lead Modal */}
        {showLeadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 max-w-md w-full">
              {!leadFormSubmitted ? (
                <>
                  <div className="flex items-center justify-between mb-5 md:mb-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Share a Lead</h2>
                    <button
                      onClick={closeLeadModal}
                      className="size-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="size-4 text-gray-500 dark:text-gray-300" />
                    </button>
                  </div>
                  <form onSubmit={handleLeadFormSubmit}>
                    <div className="space-y-3.5 md:space-y-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={leadFormData.name}
                          onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm md:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={leadFormData.email}
                          onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm md:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={leadFormData.phone}
                          onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm md:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={leadFormData.companyName}
                          onChange={(e) => setLeadFormData({ ...leadFormData, companyName: e.target.value })}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm md:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                          placeholder="Enter company name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={leadFormData.message}
                          onChange={(e) => setLeadFormData({ ...leadFormData, message: e.target.value })}
                          rows={3}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm md:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                          placeholder="Tell us about the lead..."
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-5 md:mt-6">
                      <button
                        type="submit"
                        className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-2.5 md:py-3 px-4 rounded-xl transition-colors text-sm md:text-base"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 md:py-8">
                  <div className="size-14 md:size-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="size-7 md:size-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">Thank you!</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-5 md:mb-6">
                    Our team will get in touch with you shortly.
                  </p>
                  <button
                    onClick={closeLeadModal}
                    className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-2.5 md:py-3 px-4 rounded-xl transition-colors text-sm md:text-base"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}