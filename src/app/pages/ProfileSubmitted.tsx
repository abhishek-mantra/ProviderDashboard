import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, User, Zap, Play, ExternalLink, ArrowRight, X, CheckCircle } from "lucide-react";
import mantraLogo from "../../imports/MantraCare_(1).svg";

interface ProfileSubmittedProps {
  onEditProfile?: () => void;
  onStartVerification?: () => void;
}

export function ProfileSubmitted({ onEditProfile, onStartVerification }: ProfileSubmittedProps) {
  const navigate = useNavigate();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

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
    <div className="bg-[#eef5fb] dark:bg-gray-950 min-h-screen text-slate-900 dark:text-slate-100 flex flex-col py-6 px-4 sm:px-6">

      {/* ── Header ── */}
      <header className="flex justify-center items-center py-2 mb-6">
        <div
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/")}
        >
          <img src={mantraLogo} alt="Mantra" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold tracking-tight text-[#043570] dark:text-sky-400">Mantra</span>
        </div>
      </header>

      {/* ── Main card container (widened) ── */}
      <main className="max-w-2xl sm:max-w-[680px] mx-auto w-full">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 sm:p-9 w-full">

          {/* Success icon with animated dots */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -top-2 left-3 size-2.5 bg-[#00c0ff] rounded-full animate-ping opacity-75" />
              <div className="absolute -top-3 right-4 size-2 bg-[#00c0ff] rounded-full animate-pulse" />
              <div className="absolute top-1 -right-3 size-2.5 bg-sky-300 rounded-full animate-pulse delay-150" />
              <div className="absolute -bottom-2 left-0 size-2 bg-[#043570] rounded-full opacity-50" />
              <div className="absolute -bottom-1 -right-2 size-2 bg-[#00c0ff] rounded-full" />
              <div className="size-20 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-100 dark:ring-green-950/50">
                <Check className="size-10 text-white" strokeWidth={3.5} />
              </div>
            </div>
          </div>

          {/* Title + subtitle */}
          <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 dark:text-white mb-2 tracking-tight text-center leading-tight">
            Profile Submitted Successfully!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-[15px] text-center mb-6 leading-relaxed">
            Thank you for completing your profile.<br />
            You&apos;re one step closer to connecting with clients.
          </p>

          {/* What's Next? divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <span className="relative bg-white dark:bg-gray-900 px-4 text-base font-bold text-gray-800 dark:text-white">
              What&apos;s Next?
            </span>
          </div>

          {/* ── Card 1: Join Mantra for Health Plans ── */}
          <div className="bg-[#f8fbfe] dark:bg-sky-950/20 border border-[#e2eefb] dark:border-sky-900/60 rounded-2xl p-5 sm:p-7 mb-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Header: Icon + Title & Description */}
            <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
              <div className="size-13 sm:size-14 rounded-2xl bg-[#e8f1fc] dark:bg-sky-900/40 flex items-center justify-center flex-shrink-0 shadow-sm border border-sky-100 dark:border-sky-800/40">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="5" width="17" height="22" rx="2.5" fill="#c3ddfd" stroke="#1d63ea" strokeWidth="1.6"/>
                  <path d="M12 11h7M12 15h7M12 19h4" stroke="#1d63ea" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="27" cy="28" r="8" fill="#eff6ff" stroke="#1d63ea" strokeWidth="1.6"/>
                  <path d="M27 22.5c-2.5 0-4.5 1-4.5 1v4c0 2.5 2 4 4.5 4.5 2.5-.5 4.5-2 4.5-4.5v-4s-2-1-4.5-1z" fill="#c3ddfd" stroke="#1d63ea" strokeWidth="1.3"/>
                  <path d="M24.5 28l1.8 1.8 3.2-3.2" stroke="#1d63ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    Join Mantra for Health Plans
                  </h2>
                  <span className="inline-block text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-[#e8f8f0] text-[#0ea569] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#bbf0d6] dark:border-emerald-800">
                    FREE CREDENTIALING &amp; ENROLLMENT
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Get enrolled with top health plans. We handle your credentialing, enrollment, and payer setup&mdash;absolutely free.
                </p>
              </div>
            </div>

            {/* ── Interactive Full-Width Video Thumbnail & Player ── */}
            <div className="mb-4">
              {!isPlayingVideo ? (
                <div
                  onClick={() => setIsPlayingVideo(true)}
                  className="group relative aspect-video w-full rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg border border-sky-200 dark:border-sky-800/60 bg-white dark:bg-gray-900 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {/* Video Thumbnail Image (maxres for 16:9 without letterbox bars) */}
                  <img
                    src="https://img.youtube.com/vi/1h_PLtIbcJc/maxresdefault.jpg"
                    onError={(e) => {
                      // Fallback if maxres is unavailable
                      (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/1h_PLtIbcJc/hqdefault.jpg";
                    }}
                    alt="Watch: How Providers 2-3x with Mantra"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20 group-hover:from-black/75 transition-colors" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-13 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 ring-4 ring-white/30">
                      <Play className="size-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Top Tag & Bottom Title */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/15">
                    <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                    Watch Video
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-xs font-semibold drop-shadow-sm truncate block">
                      See how providers 2&ndash;3&times; their client base
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-sky-200 dark:border-sky-800 bg-white dark:bg-gray-900">
                  <iframe
                    src="https://www.youtube.com/embed/1h_PLtIbcJc?start=2&amp;autoplay=1"
                    title="How Mantra Grows Your Practice with Insurance"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlayingVideo(false);
                    }}
                    className="absolute top-2 right-2 bg-black/75 hover:bg-black text-white px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 backdrop-blur-sm transition-colors z-10 shadow-sm cursor-pointer"
                    title="Close player"
                  >
                    <X className="size-3.5" />
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Primary CTA Button (Full Width) */}
            <a
              href="https://app.mantracomply.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#155dfc] hover:bg-[#0c4cd9] active:scale-[0.98] text-white font-semibold rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 mb-3.5"
            >
              Sign Up with Mantra
              <ArrowRight className="size-4" />
            </a>

            {/* 3 Trust Badges (Centered) */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 pt-1">
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle className="size-3.5 text-emerald-500 flex-shrink-0" />
                No Setup Fees
              </span>
              <span className="flex items-center gap-1 font-medium">
                <User className="size-3.5 text-[#155dfc] dark:text-sky-400 flex-shrink-0" />
                Expert Support
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Zap className="size-3.5 text-amber-500 flex-shrink-0" />
                Faster Approvals
              </span>
            </div>
          </div>

          {/* ── Card 2: Complete Your Verification ── */}
          <div className="bg-[#f8fbfe] dark:bg-sky-950/20 border border-[#e2eefb] dark:border-sky-900/60 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                <div className="size-13 sm:size-14 rounded-2xl bg-[#e8f1fc] dark:bg-sky-900/40 flex items-center justify-center flex-shrink-0 shadow-sm border border-sky-100 dark:border-sky-800/40">
                  <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="14" r="6.5" fill="#c3ddfd" stroke="#1d63ea" strokeWidth="1.6"/>
                    <path d="M7 34c0-6.075 4.925-11 11-11" stroke="#1d63ea" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="28" cy="29" r="7" fill="#eff6ff" stroke="#1d63ea" strokeWidth="1.6"/>
                    <path d="M25.5 29l2 2 4-4" stroke="#1d63ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                    Complete Your Verification
                  </h2>
                  <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Verify your identity and documents so we can activate your profile and get you approved faster.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartVerification}
                className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-white dark:bg-gray-800 hover:bg-blue-50/50 dark:hover:bg-gray-700 text-[#155dfc] dark:text-sky-300 border-2 border-[#155dfc] dark:border-sky-500 font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98] flex-shrink-0 self-stretch sm:self-auto whitespace-nowrap"
              >
                <User className="size-4" />
                <span>Complete Verification</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* ── Edit Profile button ── */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleEditProfile}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-sm cursor-pointer"
            >
              <User className="size-3.5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-5 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div>
            Questions? Contact our support team at{" "}
            <a
              href="mailto:provider@mantra.care"
              className="text-[#00c0ff] hover:text-[#0099cc] dark:text-sky-400 font-medium underline underline-offset-2 transition-colors"
            >
              provider@mantra.care
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 mr-1">Follow us:</span>
            <a href="https://www.facebook.com/mantracarehealth/" target="_blank" rel="noopener noreferrer" className="size-7 rounded-lg bg-[#1877F2] hover:bg-[#1565D8] flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm" title="Facebook">f</a>
            <a href="https://www.instagram.com/mantra_care/" target="_blank" rel="noopener noreferrer" className="size-7 rounded-lg bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-sm" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/mantra-care" target="_blank" rel="noopener noreferrer" className="size-7 rounded-lg bg-[#0A66C2] hover:bg-[#004182] flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm" title="LinkedIn">in</a>
            <a href="https://x.com/Mantra__Care" target="_blank" rel="noopener noreferrer" className="size-7 rounded-lg bg-black hover:bg-gray-800 flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm" title="X">𝕏</a>
            <a href="https://www.youtube.com/@mantra-care" target="_blank" rel="noopener noreferrer" className="size-7 rounded-lg bg-[#FF0000] hover:bg-[#CC0000] flex items-center justify-center text-white transition-transform hover:scale-105 shadow-sm" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </footer>
      </main>

    </div>
  );
}