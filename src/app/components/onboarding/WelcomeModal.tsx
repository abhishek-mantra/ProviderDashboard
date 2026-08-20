import { Shield, Sparkles, CheckCircle2, ArrowRight, Play, User, X, Stethoscope, FileText, CreditCard, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFirstTimeUser } from "../../contexts/FirstTimeUserContext";

export function WelcomeModal() {
  const { showWelcomeModal, setShowWelcomeModal, startTour, openDemoModal } = useFirstTimeUser();

  if (!showWelcomeModal) return null;

  const handleStartTour = () => {
    setShowWelcomeModal(false);
    startTour();
  };

  const handleExploreDemo = () => {
    setShowWelcomeModal(false);
    openDemoModal("chart");
  };

  const handleDismiss = () => {
    setShowWelcomeModal(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden ring-1 ring-black/10"
        >
          {/* Header Banner */}
          <div className="relative px-7 pt-7 pb-6 bg-gradient-to-br from-[#043570] via-[#05438c] to-[#0a5ca8] text-white">
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 size-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-200 border border-cyan-300/30 flex items-center gap-1">
                <Shield className="size-3 text-cyan-300" />
                HIPAA Compliant · Enterprise Grade
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Welcome to MantraCare EHR
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
              Your unified clinical practice operating system with real-time ambient AI documentation and automated revenue cycle tools.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="px-7 py-5 space-y-3">
            {[
              {
                icon: Stethoscope,
                title: "Ambient AI Scribe",
                desc: "Auto-generate structured SOAP, DAP, and BIRP session notes directly from patient dialog.",
                badge: "Active Trial"
              },
              {
                icon: FileText,
                title: "Complete Clinical Charting",
                desc: "Customizable intake flows, standardized PHQ-9 screeners, and digital treatment plans.",
                badge: "Full EHR"
              },
              {
                icon: CreditCard,
                title: "Superbills & CMS-1500 Claims",
                desc: "1-click itemized patient superbills, CPT code management, and automated insurance claims.",
                badge: "Billing Hub"
              },
              {
                icon: Lock,
                title: "Pre-Loaded Demo Client",
                desc: "Explore safely with our pre-populated clinical case (Carl Rogers, MRN-88214).",
                badge: "Sandbox"
              }
            ].map(({ icon: Icon, title, desc, badge }, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-850/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="size-9 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-900/40">
                      {badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="px-7 pb-6 space-y-2.5">
            <button
              onClick={handleStartTour}
              className="w-full h-11 bg-[#043570] hover:bg-[#032857] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <Play className="size-3.5 fill-white" />
              <span>Start 2-Minute Guided Tour</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleExploreDemo}
                className="flex-1 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <User className="size-3.5 text-slate-500" />
                <span>Explore Demo Case</span>
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 h-10 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Go to Workspace
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
