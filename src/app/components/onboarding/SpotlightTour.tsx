import React, { useState } from "react";
import { Sparkles, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUserMode } from "../../contexts/UserModeContext";

export interface ContextualSpotlightProps {
  spotlightId: string;
  title: string;
  description: string;
  tag?: string;
  arrowPosition?: "top" | "bottom" | "left" | "right" | "none";
  className?: string;
  onDismiss?: () => void;
}

/**
 * ContextualSpotlight
 * A lightweight, scoped, single-moment onboarding nudge pointing at a real UI element.
 * Only triggers in New User Mode, displays once per account (persisted in localStorage),
 * and dismisses permanently with a single "Got it!" button. No step counter, no multi-step modal.
 */
export function ContextualSpotlight({
  spotlightId,
  title,
  description,
  tag = "Quick Tip",
  arrowPosition = "top",
  className = "",
  onDismiss,
}: ContextualSpotlightProps) {
  const { userMode, isTourSeen, markTourSeen } = useUserMode();
  const [isDismissed, setIsDismissed] = useState(false);

  // Only show in New User Mode if not previously seen or dismissed
  if (userMode !== "new" || isTourSeen(spotlightId) || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    markTourSeen(spotlightId);
    if (onDismiss) onDismiss();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: arrowPosition === "top" ? 6 : -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`relative z-30 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 p-4 max-w-xs sm:max-w-sm ring-1 ring-white/10 ${className}`}
      >
        {/* Directional Pointer Arrow */}
        {arrowPosition === "top" && (
          <div className="absolute -top-2 left-6 size-3.5 bg-slate-900 border-t border-l border-slate-800 rotate-45" />
        )}
        {arrowPosition === "bottom" && (
          <div className="absolute -bottom-2 left-6 size-3.5 bg-slate-900 border-b border-r border-slate-800 rotate-45" />
        )}
        {arrowPosition === "left" && (
          <div className="absolute -left-2 top-5 size-3.5 bg-slate-900 border-b border-l border-slate-800 rotate-45" />
        )}
        {arrowPosition === "right" && (
          <div className="absolute -right-2 top-5 size-3.5 bg-slate-900 border-t border-r border-slate-800 rotate-45" />
        )}

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex size-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                {tag}
              </span>
            </div>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800 transition-colors"
              title="Dismiss"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white leading-snug">
              {title}
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Single "Got it!" button */}
          <div className="pt-1 flex items-center justify-end">
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 bg-[#00c0ff] hover:bg-[#00a8e0] active:scale-95 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <Check className="size-3" />
              <span>Got it!</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Alias export for backward compatibility
export const SpotlightTour = ContextualSpotlight;
