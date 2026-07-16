import { Bot, ExternalLink, Calendar, Bell, MessageCircle, FileText, Users, BarChart3, Mail, Zap, Sparkles, TrendingUp, Clock } from "lucide-react";

export function AICRM() {
  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-1 md:p-6">
      <div className="max-w-[1000px] mx-auto space-y-3 md:space-y-6">
        {/* Header */}
        <div className="flex items-start gap-2 md:gap-4 mb-4 md:mb-8 px-3 md:px-0 pt-3 md:pt-0">
          <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <Bot className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
              AI CRM Integration with MantraAssist
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Free Trial for Mantra Users (Exclusive)
            </p>
          </div>
        </div>

        {/* YouTube Video */}
        <div className="relative bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mx-2 md:mx-0">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/-fyJLcigKkc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#043570] to-[#065a9e] dark:from-gray-800 dark:to-gray-900 rounded-xl md:rounded-2xl shadow-lg border border-[#043570]/20 dark:border-gray-700 p-4 md:p-6 overflow-hidden mx-2 md:mx-0">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00c0ff]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00c0ff]/10 rounded-full blur-3xl"></div>
          
          <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20">
              <Bot className="size-5 md:size-7 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-base md:text-lg font-semibold text-white">
                  Supercharge Your Practice with AI
                </h2>
                <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 bg-[#00c0ff]/20 backdrop-blur-sm border border-[#00c0ff]/30 text-[#00c0ff] text-[10px] md:text-xs font-medium rounded-full">
                  <Sparkles className="size-2.5 md:size-3" />
                  New
                </span>
              </div>
              <p className="text-xs md:text-sm text-white/90">
                Automate client management, streamline scheduling, and enhance engagement with intelligent features.
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="https://app.mantraassist.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-white hover:bg-gray-50 text-[#043570] rounded-lg font-medium transition-all hover:shadow-lg text-xs md:text-sm"
            >
              Get Started with AI CRM
              <ExternalLink className="size-3.5 md:size-4" />
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 px-2 md:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex-shrink-0">
                <TrendingUp className="size-4 md:size-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-[9px] md:text-xs text-gray-500 dark:text-gray-400">Time Saved</p>
                <p className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">15+ hrs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                <Users className="size-4 md:size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-[9px] md:text-xs text-gray-500 dark:text-gray-400">Retention</p>
                <p className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">+40%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex-shrink-0">
                <Clock className="size-4 md:size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-[9px] md:text-xs text-gray-500 dark:text-gray-400">Response</p>
                <p className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">&lt;5 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-8 mx-2 md:mx-0">
          <div className="mb-4 md:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">
                  AI-Powered Features
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Everything you need to manage your practice efficiently
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-[#00c0ff]/10 to-[#043570]/10 border border-[#00c0ff]/20 text-[#043570] dark:text-[#00c0ff] text-xs font-medium rounded-full">
                  8 Features Available
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Calendar className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      AI Appointment Scheduling
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Core
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Let AI handle scheduling, rescheduling, and calendar optimization for both Mantra and non-Mantra clients
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Bell className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      Smart Appointment Reminders
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Core
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Automated, personalized reminders via SMS, email, and voice calls to reduce no-shows
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <MessageCircle className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      AI-Powered Client Follow-Ups
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Smart
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Intelligent follow-up messages to check on client progress and maintain engagement
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <FileText className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      Automated Client Intake
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Core
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Streamline onboarding with AI-assisted forms and documentation collection
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Users className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      Smart Waitlist Management
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Smart
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Automatically fill cancellations from your waitlist with intelligent matching
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Zap className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      24/7 AI Chat Assistant
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Premium
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Handle client inquiries, FAQs, and basic support around the clock
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 7 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <BarChart3 className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      Predictive Analytics
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Premium
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Get insights on client trends, session patterns, and revenue forecasting
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 8 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-start gap-2.5 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 group-hover:border-[#00c0ff]/40 group-hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#00c0ff] to-[#0096cc] rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Mail className="size-5 md:size-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                      Multi-Channel Communication
                    </h4>
                    <span className="px-1.5 md:px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wide">
                      Core
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Manage all client communications from email, SMS, and chat in one place
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Legend */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Core Features (4)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Smart AI (2)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Premium (2)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="relative bg-gradient-to-r from-[#043570] via-[#054a8a] to-[#043570] dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-[#043570]/20 dark:border-gray-700 p-4 md:p-8 overflow-hidden mx-2 md:mx-0 mb-2 md:mb-0">
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20 flex-shrink-0">
                <Sparkles className="size-5 md:size-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">
                  Seamless Integration
                </h4>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                  MantraAssist AI CRM integrates directly into your dashboard, syncing all your client data 
                  and providing a unified experience for managing both Mantra and non-Mantra clients.
                </p>
              </div>
            </div>
            <a
              href="https://app.mantraassist.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white hover:bg-gray-50 text-[#043570] rounded-lg font-medium transition-all hover:shadow-xl text-xs md:text-base"
            >
              Learn More
              <ExternalLink className="size-3.5 md:size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}