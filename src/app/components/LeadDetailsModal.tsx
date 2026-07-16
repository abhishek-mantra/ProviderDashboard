import { X, CheckCircle2, XCircle, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    language: string;
    date: string;
    experience: string;
    price: {
      trial?: string;
      regular?: string;
      amount?: string;
    };
    specializations: string;
    badges: {
      trial?: boolean;
      b2b?: boolean;
      b2c?: boolean;
      verified?: boolean;
    };
  };
  onAccept?: () => void;
  onReject?: () => void;
}

export function LeadDetailsModal({
  isOpen,
  onClose,
  lead,
  onAccept,
  onReject,
}: LeadDetailsModalProps) {
  if (!isOpen) return null;

  // Get initials from name
  const initials = lead.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
          className="relative bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 md:px-5 py-3 md:py-4 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="size-12 md:size-14 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-2 ring-gray-100 dark:ring-gray-700"
                >
                  <img
                    src={lead.avatar}
                    alt={lead.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Name and Badges */}
                <div className="flex-1 min-w-0">
                  <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-base md:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 md:mb-2 truncate"
                  >
                    {lead.name}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-1.5 md:gap-2 flex-wrap"
                  >
                    {lead.badges.trial && (
                      <span className="inline-flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2.5 py-0.5 md:py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg border border-red-200 dark:border-red-800">
                        <span className="size-1 md:size-1.5 rounded-full bg-red-500 animate-pulse" />
                        Trial
                      </span>
                    )}
                    {lead.badges.b2c && (
                      <div className="inline-flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2.5 py-0.5 md:py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <svg
                          className="size-2.5 md:size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span>B2C</span>
                      </div>
                    )}
                    {lead.badges.b2b && (
                      <div className="inline-flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2.5 py-0.5 md:py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <svg
                          className="size-2.5 md:size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span>B2B</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-md md:rounded-lg border border-gray-200 dark:border-gray-700">
                      <Clock className="size-2.5 md:size-3.5" />
                      <span>{lead.date}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="flex-shrink-0 p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg md:rounded-xl transition-all hover:scale-110 active:scale-95 group ml-2 md:ml-3"
              >
                <X className="size-4 md:size-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </motion.button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-3 md:px-5 py-3 md:py-4 space-y-3 md:space-y-4 bg-gray-50 dark:bg-gray-800">
            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <div className="size-1 md:size-1.5 rounded-full bg-[#043570] dark:bg-[#00c0ff]" />
                <h3 className="text-[10px] md:text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                  Pricing Details
                </h3>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-amber-200 dark:border-amber-800 shadow-sm">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 size-8 md:size-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                    <svg
                      className="size-3.5 md:size-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  {lead.price.trial ? (
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                        {lead.price.trial} <span className="text-gray-600 dark:text-gray-400 font-normal">for trial session</span>
                      </p>
                      <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white leading-relaxed mt-0.5">
                        {lead.price.regular} <span className="text-gray-600 dark:text-gray-400 font-normal">for regular sessions</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white leading-relaxed flex-1">
                      {lead.price.amount} <span className="text-gray-600 dark:text-gray-400 font-normal">per session</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Client Information */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <div className="size-1 md:size-1.5 rounded-full bg-[#043570] dark:bg-[#00c0ff]" />
                <h3 className="text-[10px] md:text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                  Client Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-2.5">
                {/* Language */}
                <div className="group bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-gray-200 dark:border-gray-700 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] hover:shadow-lg transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <div className="size-6 md:size-7 rounded-lg bg-[#043570] dark:bg-[#00c0ff]/10 flex items-center justify-center shadow-sm">
                      <svg
                        className="size-3 md:size-3.5 text-white dark:text-[#00c0ff]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                      Language
                    </p>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium text-xs md:text-sm">
                    {lead.language}
                  </p>
                </div>

                {/* Location */}
                <div className="group bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-gray-200 dark:border-gray-700 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] hover:shadow-lg transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <div className="size-6 md:size-7 rounded-lg bg-[#043570] dark:bg-[#00c0ff]/10 flex items-center justify-center shadow-sm">
                      <MapPin className="size-3 md:size-3.5 text-white dark:text-[#00c0ff]" />
                    </div>
                    <p className="text-[9px] md:text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                      Location
                    </p>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium text-xs md:text-sm">
                    {lead.location}
                  </p>
                </div>

                {/* Experience Preference */}
                <div className="col-span-2 group bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-gray-200 dark:border-gray-700 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] hover:shadow-lg transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <div className="size-6 md:size-7 rounded-lg bg-[#043570] dark:bg-[#00c0ff]/10 flex items-center justify-center shadow-sm">
                      <svg
                        className="size-3 md:size-3.5 text-white dark:text-[#00c0ff]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="22" x2="16" y1="11" y2="11" />
                        <line x1="19" x2="19" y1="8" y2="14" />
                      </svg>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                      Experience Preference
                    </p>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium text-xs md:text-sm">
                    {lead.experience}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Service Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <div className="size-1 md:size-1.5 rounded-full bg-[#043570] dark:bg-[#00c0ff]" />
                <h3 className="text-[10px] md:text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                  Service Requirements
                </h3>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-blue-200 dark:border-blue-800 shadow-sm">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 size-8 md:size-9 rounded-lg bg-gradient-to-br from-[#043570] to-[#00c0ff] flex items-center justify-center shadow-md">
                    <svg
                      className="size-3.5 md:size-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium flex-1">
                    {lead.specializations}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Preferred Time Slots */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <div className="size-1 md:size-1.5 rounded-full bg-[#043570] dark:bg-[#00c0ff]" />
                <h3 className="text-[10px] md:text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                  Preferred Time Slots
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-2.5">
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-800/30 border-2 border-blue-200 dark:border-blue-700 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:border-[#043570] dark:hover:border-[#00c0ff] hover:shadow-xl transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                    <div className="size-7 md:size-8 rounded-lg bg-gradient-to-br from-[#043570] to-[#065a9e] flex items-center justify-center shadow-md">
                      <svg
                        className="size-3.5 md:size-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <p className="text-[#043570] dark:text-[#00c0ff] font-semibold text-xs md:text-sm">Morning</p>
                  </div>
                  <p className="text-gray-700 dark:text-blue-300 font-medium text-[10px] md:text-xs ml-0.5">8 AM - 11 AM</p>
                </div>
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-800/30 border-2 border-blue-200 dark:border-blue-700 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:border-[#043570] dark:hover:border-[#00c0ff] hover:shadow-xl transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                    <div className="size-7 md:size-8 rounded-lg bg-gradient-to-br from-[#043570] to-[#065a9e] flex items-center justify-center shadow-md">
                      <svg
                        className="size-3.5 md:size-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <p className="text-[#043570] dark:text-[#00c0ff] font-semibold text-xs md:text-sm">Afternoon</p>
                  </div>
                  <p className="text-gray-700 dark:text-blue-300 font-medium text-[10px] md:text-xs ml-0.5">2 PM - 5 PM</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Actions */}
          {(onAccept || onReject) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-3 md:px-5 py-3 md:py-4"
            >
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button
                  onClick={() => {
                    onAccept?.();
                    onClose();
                  }}
                  className="group relative flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-gradient-to-r from-[#043570] to-[#065a9e] hover:from-[#065a9e] hover:to-[#043570] text-white rounded-lg md:rounded-xl transition-all duration-300 font-semibold text-xs md:text-sm shadow-lg shadow-[#043570]/20 hover:shadow-xl hover:shadow-[#043570]/30 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <CheckCircle2 className="size-3.5 md:size-4.5 relative z-10" />
                  <span className="relative z-10">Accept Request</span>
                </button>
                <button
                  onClick={() => {
                    onReject?.();
                    onClose();
                  }}
                  className="group flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-white hover:bg-gray-50 text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-750 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg md:rounded-xl transition-all duration-300 font-semibold text-xs md:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <XCircle className="size-3.5 md:size-4.5 group-hover:text-red-500 transition-colors" />
                  <span>Reject Request</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}