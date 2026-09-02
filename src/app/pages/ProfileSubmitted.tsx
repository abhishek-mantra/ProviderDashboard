import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, User, Shield, Zap, Eye, Play, BookOpen, ExternalLink, ArrowRight, X } from "lucide-react";
import mantraLogo from "../../imports/MantraCare_(1).svg";

interface ProfileSubmittedProps {
  onEditProfile?: () => void;
  onStartVerification?: () => void;
}

export function ProfileSubmitted({ onEditProfile, onStartVerification }: ProfileSubmittedProps) {
  const navigate = useNavigate();
  const [platformVideoOpen, setPlatformVideoOpen] = useState(false);

  const handleStartVerification = () => {
    if (onStartVerification) {
      onStartVerification();
    } else {
      navigate("/verification");
    }
  };

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile();
    } else {
      navigate("/edit-profile");
    }
  };

  return (
    <div className="bg-[#f0f7ff] dark:bg-gray-950 min-h-screen text-slate-900 dark:text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Header Logo */}
      <header className="flex justify-center items-center py-2 mb-1">
        <div
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/")}
        >
          <img src={mantraLogo} alt="Mantra" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold tracking-tight text-[#043570] dark:text-sky-400">
            Mantra
          </span>
        </div>
      </header>

      {/* Main Unified Experience Container */}
      <main className="max-w-3xl mx-auto w-full flex-1 flex flex-col items-center gap-6 py-2">
        {/* Main Hero Card: Profile Submitted + Credentialing Drive */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 sm:p-10 w-full text-center relative overflow-hidden transition-all">
          {/* Success Check Icon with Sparkle Dots */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              {/* Decorative accent dots */}
              <div className="absolute -top-2 left-3 size-2.5 bg-[#00c0ff] rounded-full animate-ping opacity-75" />
              <div className="absolute -top-3 right-4 size-2 bg-[#00c0ff] rounded-full animate-pulse" />
              <div className="absolute top-2 -right-3 size-2.5 bg-sky-400 rounded-full animate-pulse delay-150" />
              <div className="absolute -bottom-2 left-1 size-2 bg-[#043570] rounded-full opacity-60" />
              <div className="absolute -bottom-1 -right-2 size-2 bg-[#00c0ff] rounded-full" />

              {/* Main check circle */}
              <div className="size-20 sm:size-22 bg-[#043570] rounded-full flex items-center justify-center shadow-lg ring-4 ring-sky-100 dark:ring-sky-950/50">
                <Check className="size-10 sm:size-11 text-white" strokeWidth={3.5} />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            Profile Submitted Successfully!
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
            Thank you for completing your profile. You're one step closer to connecting with clients.
          </p>

          {/* 2-Step Progress Indicator */}
          <div className="flex items-center justify-center max-w-xs mx-auto mb-8 px-2">
            {/* Step 1: Completed */}
            <div className="flex flex-col items-center">
              <div className="size-9 sm:size-10 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-sm mb-1.5 ring-2 ring-emerald-100 dark:ring-emerald-950">
                <Check className="size-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-xs font-semibold text-gray-900 dark:text-white">Step 1</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">Profile Submitted</span>
            </div>

            {/* Connecting Bar */}
            <div className="h-0.5 w-16 sm:w-24 bg-[#00c0ff] self-center -mt-6 mx-2" />

            {/* Step 2: Next Action */}
            <div className="flex flex-col items-center">
              <div className="size-9 sm:size-10 rounded-full bg-[#043570] dark:bg-sky-600 flex items-center justify-center text-white shadow-sm mb-1.5 ring-4 ring-sky-100 dark:ring-sky-950">
                <User className="size-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-900 dark:text-white">Step 2</span>
              <span className="text-[11px] font-medium text-[#043570] dark:text-sky-400 whitespace-nowrap">Identity Verification</span>
            </div>
          </div>

          {/* Featured Highlight Box: Insurance Credentialing + 2x Faster Approval */}
          <div className="bg-[#f0f7ff] dark:bg-sky-950/40 border border-[#bae6fd] dark:border-sky-900/60 rounded-2xl p-5 sm:p-7 text-center sm:text-left mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 mb-4">
              <div className="size-11 sm:size-12 bg-[#043570] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Shield className="size-6 text-white" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-[#043570] dark:text-sky-300 leading-tight">
                    Final Step: Get Approved 2x Faster & Accept Insurance
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300">
                    5x Clients
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  Speed up your approval and start seeing insured clients by completing your credentialing application now.
                </p>
              </div>
            </div>

            {/* Embedded Insurance Walkthrough Video */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md border border-sky-200 dark:border-sky-800 bg-black my-4">
              <iframe
                src="https://www.youtube.com/embed/1h_PLtIbcJc?start=2"
                title="Choose the Right Insurance Model with Mantra"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 my-5 text-center">
              <div className="flex flex-col items-center p-2 rounded-xl bg-white/70 dark:bg-gray-900/60 border border-sky-100 dark:border-sky-900/30">
                <div className="size-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-1 text-[#00c0ff]">
                  <Zap className="size-4 sm:size-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Fast Processing</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Paperwork handled</p>
              </div>

              <div className="flex flex-col items-center p-2 rounded-xl bg-white/70 dark:bg-gray-900/60 border border-sky-100 dark:border-sky-900/30">
                <div className="size-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mb-1 text-emerald-600 dark:text-emerald-400">
                  <Shield className="size-4 sm:size-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">50+ Networks</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Top insurance payers</p>
              </div>

              <div className="flex flex-col items-center p-2 rounded-xl bg-white/70 dark:bg-gray-900/60 border border-sky-100 dark:border-sky-900/30">
                <div className="size-9 rounded-lg bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center mb-1 text-purple-600 dark:text-purple-400">
                  <Eye className="size-4 sm:size-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Live Tracking</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Real-time updates</p>
              </div>
            </div>

            {/* Action Buttons: High-Conversion Dual CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {/* Main Credentialing CTA */}
              <div className="w-full sm:w-1/2 flex flex-col items-center">
                <a
                  href="https://app.mantracomply.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#043570] hover:bg-[#032652] active:scale-[0.98] text-white font-bold rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 text-center"
                >
                  <Shield className="size-4" />
                  <span>Start Credentialing</span>
                  <ExternalLink className="size-3.5 opacity-80" />
                </a>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">
                  Takes 5–10 min · 95% approval rate
                </span>
              </div>

              {/* Identity Verification CTA */}
              <div className="w-full sm:w-1/2 flex flex-col items-center">
                <button
                  onClick={handleStartVerification}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-[#043570] dark:text-sky-300 border-2 border-[#043570] dark:border-sky-500 font-bold rounded-xl text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <User className="size-4" />
                  <span>Identity Verification</span>
                  <ArrowRight className="size-4" />
                </button>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">
                  Fast track your approval
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Link */}
          <button
            onClick={handleEditProfile}
            className="text-xs sm:text-sm font-medium text-[#00c0ff] hover:text-[#0099cc] dark:text-sky-400 dark:hover:text-sky-300 underline underline-offset-4 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* While You Wait Resources Section (2 Cards) */}
        <section className="w-full text-center my-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
            While you wait - Get to know MantraCare
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-5">
            Explore resources to help you succeed on our platform
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {/* Resource Card 1: Platform Video Walkthrough */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="size-11 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-3 text-red-500 group-hover:scale-105 transition-transform">
                  <Play className="size-5 fill-current" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                  Learn about Platform
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  Discover how MantraCare connects providers worldwide.
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setPlatformVideoOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#00c0ff] hover:text-[#0099cc] dark:text-sky-400 transition-colors py-1 group/btn"
                >
                  <Play className="size-3.5 fill-current" />
                  <span>Watch Video</span>
                  <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Resource Card 2: Provider Resources */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-3 text-[#00c0ff] group-hover:scale-105 transition-transform">
                  <BookOpen className="size-5" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                  Provider Resources
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  Access the onboarding guide for a smooth journey.
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => navigate("/learn-mantra")}
                  className="flex items-center gap-1 text-xs font-semibold text-[#00c0ff] hover:text-[#0099cc] dark:text-sky-400 transition-colors py-1 group/btn"
                >
                  <span>View Resources</span>
                  <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Support Info & Social Badges */}
      <footer className="max-w-3xl mx-auto w-full pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400 border-t border-sky-100 dark:border-gray-800">
        <div>
          Questions? Contact our support team at{" "}
          <a
            href="mailto:provider@mantra.care"
            className="text-[#00c0ff] hover:text-[#0099cc] dark:text-sky-400 font-medium underline underline-offset-2 transition-colors"
          >
            provider@mantra.care
          </a>
        </div>

        {/* Social Badges in Footer */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 mr-1">Follow us:</span>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/mantracarehealth/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-7 rounded-lg bg-[#1877F2] hover:bg-[#1565D8] flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm"
            title="Facebook"
          >
            f
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/mantra_care/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-7 rounded-lg bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-sm"
            title="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/mantra-care"
            target="_blank"
            rel="noopener noreferrer"
            className="size-7 rounded-lg bg-[#0A66C2] hover:bg-[#004182] flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm"
            title="LinkedIn"
          >
            in
          </a>
          {/* X (Twitter) */}
          <a
            href="https://x.com/Mantra__Care"
            target="_blank"
            rel="noopener noreferrer"
            className="size-7 rounded-lg bg-black hover:bg-gray-800 flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm"
            title="X (Twitter)"
          >
            𝕏
          </a>
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@mantra-care"
            target="_blank"
            rel="noopener noreferrer"
            className="size-7 rounded-lg bg-[#FF0000] hover:bg-[#CC0000] flex items-center justify-center text-white transition-transform hover:scale-105 shadow-sm"
            title="YouTube"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </footer>

      {/* Platform Walkthrough Video Player Modal */}
      {platformVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl relative">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950">
              <span className="text-sm font-semibold text-white">Learn About Mantra Platform</span>
              <button
                onClick={() => setPlatformVideoOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/nLJFbVYpksU?autoplay=1"
                title="Learn About Mantra Platform"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
