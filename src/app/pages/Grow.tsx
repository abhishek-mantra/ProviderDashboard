import { ChevronDown, ExternalLink, Share2, Award, Users, Globe, Link2, Megaphone } from "lucide-react";
import { useState } from "react";

export function Grow() {
  const [profileType, setProfileType] = useState("Therapist/ Psychologist");

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6">
      <div className="max-w-[1000px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-8 gap-3 px-3 md:px-0 pt-3 md:pt-0">
        <div className="flex items-start gap-2 md:gap-4">
          <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <Megaphone className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
              Marketing
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Share your profile on your blog, website and social media to boost your listing rank and attract more clients
            </p>
          </div>
        </div>
        
        {/* Profile Type Dropdown */}
        <div className="relative ml-auto">
          <select
            value={profileType}
            onChange={(e) => setProfileType(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 md:px-4 md:py-2.5 pr-8 md:pr-10 text-sm text-gray-700 dark:text-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c0ff] cursor-pointer shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <option>Therapist/ Psychologist</option>
            <option>Nutrition</option>
            <option>Physiotherapy</option>
          </select>
          <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
      
      {/* Cards Container */}
      <div className="space-y-3 md:space-y-5 px-3 md:px-0 pb-3 md:pb-0">
        {/* Share profile on Social Media */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="size-8 md:size-9 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Share2 className="size-4 md:size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  Share profile on Social Media
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Increase your visibility</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 md:gap-3">
            <button className="size-10 md:size-11 rounded-lg bg-[#1877F2] hover:bg-[#1565D8] flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:scale-105">
              <svg className="size-4 md:size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="size-10 md:size-11 rounded-lg bg-[#0A66C2] hover:bg-[#004182] flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:scale-105">
              <svg className="size-4 md:size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            <button className="size-10 md:size-11 rounded-lg bg-[#000000] hover:bg-[#1a1a1a] flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:scale-105">
              <svg className="size-4 md:size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add certification from Mantra on your LinkedIn profile */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="size-8 md:size-9 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="size-4 md:size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  Add certification from Mantra on your LinkedIn profile
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                  Build credibility with professional certifications
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="size-10 md:size-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#00c0ff] to-[#0099cc] flex items-center justify-center shadow-md flex-shrink-0">
                <svg className="size-5 md:size-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.54-7-10V8.3l7-3.11 7 3.11V10c0 4.46-3.13 9.04-7 10z" />
                  <path d="M9.5 14l-2.5-2.5L5.5 13l4 4 8-8L16 7.5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                  Therapist/ Psychologist
                </div>
                <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-semibold">MantraCare</div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg text-xs md:text-sm font-semibold transition-all shadow-sm w-full sm:w-auto justify-center">
              Use this
              <ExternalLink className="size-3 md:size-3.5" />
            </button>
          </div>
        </div>

        {/* Share your expertise */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="size-8 md:size-9 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="size-4 md:size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  Share your expertise
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                  Answer questions on Reddit and Quora
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 md:gap-3">
            <button className="size-10 md:size-11 rounded-lg bg-[#B92B27] hover:bg-[#9a2422] flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:scale-105">
              <svg className="size-4 md:size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.449 18.024c-2.328 0-4.203-1.875-4.203-4.203s1.875-4.203 4.203-4.203 4.203 1.875 4.203 4.203-1.875 4.203-4.203 4.203zm7.91-4.203c0 1.446-.33 2.805-.916 4.034l1.218 4.042-4.042-1.218c-1.229.586-2.588.916-4.034.916-4.624 0-8.367-3.743-8.367-8.367s3.743-8.367 8.367-8.367 8.367 3.743 8.367 8.367zm3.641 0c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 2.208.598 4.277 1.641 6.055L0 24l4.181-1.641C5.959 23.402 8.028 24 10.236 24c6.627 0 12-5.373 12-12z" />
              </svg>
            </button>
            <button className="size-10 md:size-11 rounded-lg bg-[#FF4500] hover:bg-[#dd3c00] flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:scale-105">
              <svg className="size-4 md:size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Social icon for your website / blog / portfolio */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="size-8 md:size-9 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="size-4 md:size-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  Social icon for your website / blog / portfolio
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                  Make it easy for visitors to find you
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="size-12 md:size-14 rounded-full bg-gradient-to-br from-[#00c0ff] to-[#0099cc] flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="size-6 md:size-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg text-xs md:text-sm font-semibold transition-all shadow-sm w-full sm:w-auto justify-center">
              Use this
              <ExternalLink className="size-3 md:size-3.5" />
            </button>
          </div>
        </div>

        {/* Embeddable banner that links to your profile */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="size-8 md:size-9 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Link2 className="size-4 md:size-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  Embeddable banner that links to your profile
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                  Boost bookings with a professional banner
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="px-4 py-2.5 md:px-6 md:py-3.5 bg-gradient-to-r from-[#00c0ff] to-[#0099cc] rounded-lg flex items-center gap-2 md:gap-3 shadow-md">
              <svg className="size-6 md:size-8 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <div>
                <div className="text-white font-bold text-xs md:text-sm">Book Me</div>
                <div className="text-white/90 text-[10px] md:text-xs font-semibold">MantraCare</div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg text-xs md:text-sm font-semibold transition-all shadow-sm w-full sm:w-auto justify-center">
              Use this
              <ExternalLink className="size-3 md:size-3.5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}