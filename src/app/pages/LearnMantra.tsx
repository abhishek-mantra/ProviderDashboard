import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Play,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Headphones,
  Calendar,
  Mail,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CreditCard,
  FileText,
  Mic,
  LayoutDashboard,
  Volume2,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUserMode } from "../contexts/UserModeContext";

interface StepGuide {
  id: string;
  stepNumber: number;
  title: string;
  shortLabel: string;
  category: string;
  icon: React.ElementType;
  heading: string;
  description: string;
  videoDuration: string;
  thumbnail: string;
  speaker: string;
  speakerRole: string;
  videoUrl?: string; // Optional real video URL
  keyTakeaways: string[];
}

const LEARN_STEPS: StepGuide[] = [
  {
    id: "welcome",
    stepNumber: 1,
    title: "Welcome to Mantra",
    shortLabel: "Welcome",
    category: "Practice Orientation",
    icon: LayoutDashboard,
    heading: "Get Started with Your Unified Clinical Workspace",
    description:
      "A quick walkthrough of your clinical dashboard, client chart directory, secure calendar, and left navigation rail. Learn how everything connects in your day-to-day practice.",
    videoDuration: "2:15",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    speaker: "Dr. Sarah Jenkins, MD",
    speakerRole: "Chief Medical Officer",
    keyTakeaways: [
      "Accessing client charts, notes, and billing in one unified rail",
      "Switching between clinician, supervisor, and front-desk views",
      "Configuring calendar availability and telehealth rooms",
    ],
  },
  {
    id: "ai-transcriber",
    stepNumber: 2,
    title: "Meet the AI Transcriber",
    shortLabel: "AI Transcriber",
    category: "Ambient Documentation",
    icon: Mic,
    heading: "Effortless Ambient Scribing for Telehealth & In-Person Sessions",
    description:
      "Discover how Mantra ambient intelligence captures your clinical consultations in real time, filtering out conversational filler and structuring medical insights into SOAP, DAP, or BIRP notes.",
    videoDuration: "3:10",
    thumbnail:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    speaker: "Dr. Alex Vance, PhD",
    speakerRole: "Head of Clinical Informatics",
    keyTakeaways: [
      "Launching one-click recording for Zoom, Google Meet, or office visits",
      "Real-time medical terminology extraction and timeline markers",
      "Exporting formatted SOAP drafts directly into client charts",
    ],
  },
  {
    id: "sign-lock",
    stepNumber: 3,
    title: "Session Notes & Sign & Lock",
    shortLabel: "Sign & Lock",
    category: "Clinical Documentation & Compliance",
    icon: FileText,
    heading: "Diagnostic Compliance, CPT Codes & Verified E-Signatures",
    description:
      "Learn how Mantra ensures clinical compliance before locking notes: active ICD-10 diagnosis verification, procedure code selection (e.g. 90834), and automatic billable charge dispatch upon signing.",
    videoDuration: "2:40",
    thumbnail:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    speaker: "Elena Rostova",
    speakerRole: "Clinical Quality Lead",
    keyTakeaways: [
      "Enforcing active ICD-10 diagnosis plans prior to locking",
      "Selecting CPT codes, duration modifiers, and place of service",
      "Sealing records with compliant cryptographic e-signatures",
    ],
  },
  {
    id: "bills-hub",
    stepNumber: 4,
    title: "Managing Bills",
    shortLabel: "Bills Hub",
    category: "Revenue & Billing",
    icon: CreditCard,
    heading: "Mastering Invoices, Patient Copays & Superbills",
    description:
      "Navigate the unified Bills Hub to create itemized patient bills, track self-pay balances, record card and check payments, and issue compliant superbills for out-of-network reimbursement.",
    videoDuration: "3:25",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    speaker: "Marcus Sterling",
    speakerRole: "Head of Revenue Cycle",
    keyTakeaways: [
      "Filtering invoices by Unpaid, Sent, and Draft statuses",
      "Recording patient payments, credits, and authorized write-offs",
      "Generating PDF superbills with ICD-10 and CPT codes for patients",
    ],
  },
  {
    id: "insurance-claims",
    stepNumber: 5,
    title: "Filing an Insurance Claim",
    shortLabel: "Insurance Claims",
    category: "Claims & Remittance",
    icon: ShieldCheck,
    heading: "CMS-1500 Electronic Claims Scrubbing & Direct Payer Dispatch",
    description:
      "Learn how to review itemized claims, auto-populate CMS-1500 boxes from locked session notes, validate modifier rules, and track electronic remittances from commercial and Medicaid payers.",
    videoDuration: "4:05",
    thumbnail:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    speaker: "Marcus Sterling",
    speakerRole: "Head of Revenue Cycle",
    keyTakeaways: [
      "Automated claim scrubbing and validation error detection",
      "One-click electronic CMS-1500 submission to clearinghouses",
      "Tracking claim statuses: Submitted, Accepted, and Paid",
    ],
  },
];

export function LearnMantra() {
  const navigate = useNavigate();
  const { userMode } = useUserMode();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeStep = LEARN_STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;
  const isFirstStep = activeStepIndex === 0;
  const isLastStep = activeStepIndex === LEARN_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      navigate("/");
    } else {
      setActiveStepIndex((prev) => prev + 1);
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStepIndex((prev) => prev - 1);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#043570]/10 text-[#043570] dark:bg-cyan-900/30 dark:text-cyan-400 uppercase tracking-wider">
                Practice Onboarding Guide
              </span>
              <span className="text-xs text-slate-400">· 5 Quick Modules</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learn Mantra
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Master the core workflows of your clinical EHR and ambient AI scribe at your own pace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-xs"
            >
              Skip to Dashboard →
            </button>
          </div>
        </div>

        {/* Horizontal 5-Step Stepper */}
        <div className="bg-white dark:bg-slate-900 p-2 sm:p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {LEARN_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`flex flex-col items-center justify-center text-center p-2.5 sm:py-3 sm:px-2 rounded-xl transition-all cursor-pointer relative ${
                    isActive
                      ? "bg-[#043570] text-white shadow-md shadow-[#043570]/20"
                      : isPast
                      ? "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      : "bg-transparent text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {isPast ? (
                      <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-500" />
                    ) : (
                      <Icon className={`size-3.5 sm:size-4 ${isActive ? "text-cyan-300" : ""}`} />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline opacity-80">
                      Step {step.stepNumber}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1 ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    {step.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Content: One Step Focus */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-sm space-y-6"
          >
            {/* Step Heading & Category */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#043570] dark:bg-cyan-950 dark:text-cyan-300 border border-blue-100 dark:border-cyan-900">
                  {activeStep.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Module {activeStep.stepNumber} of {LEARN_STEPS.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {activeStep.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {activeStep.description}
              </p>
            </div>

            {/* Single Video Embed Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md aspect-video max-w-3xl mx-auto flex items-center justify-center group">
              {activeStep.videoUrl && isPlaying ? (
                <iframe
                  src={activeStep.videoUrl}
                  title={activeStep.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Poster Image */}
                  <img
                    src={activeStep.thumbnail}
                    alt={activeStep.title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity duration-300"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* Center Play Trigger */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 m-auto size-16 sm:size-20 rounded-full bg-white/95 text-[#043570] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group-hover:bg-white"
                    title="Play Walkthrough Video"
                  >
                    <Play className="size-7 sm:size-8 fill-[#043570] ml-1" />
                  </button>

                  {/* Speaker & Duration Tags */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 text-xs font-bold">
                        {activeStep.speaker
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">
                          {activeStep.speaker}
                        </p>
                        <p className="text-[10px] text-slate-300 font-medium">
                          {activeStep.speakerRole}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-semibold">
                        {activeStep.videoDuration}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Key Takeaways */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-[#043570] dark:text-cyan-400" />
                Key Takeaways in this Guide
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeStep.keyTakeaways.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handlePrev}
                disabled={isFirstStep}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isFirstStep
                    ? "opacity-30 cursor-not-allowed text-slate-400"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
                }`}
              >
                <ArrowLeft className="size-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-[#043570] hover:bg-[#032a57] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 active:scale-98"
                >
                  <span>
                    {isLastStep ? "Complete & Go to Dashboard" : "Next Module"}
                  </span>
                  {isLastStep ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <ArrowRight className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Static Help & Support Card (Same across all steps) */}
        <div className="bg-gradient-to-r from-blue-50/70 via-cyan-50/50 to-indigo-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 rounded-2xl border border-blue-200/50 dark:border-slate-800 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="size-10 rounded-xl bg-[#043570] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Headphones className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Need 1-on-1 Practice Setup Assistance?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Our clinical onboarding specialists can help you import client lists, configure fee schedules, and connect billing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="mailto:support@mantracare.com"
              className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Mail className="size-3.5" />
              <span>Email Support</span>
            </a>
            <button
              onClick={() => navigate("/chat")}
              className="px-3.5 py-2 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
