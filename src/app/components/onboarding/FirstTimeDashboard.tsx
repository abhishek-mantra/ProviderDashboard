import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Compass, Play, CheckCircle2, Circle, ChevronDown, ChevronUp, ArrowRight,
  Shield, Sparkles, Mic, FileText, User, Calendar, CreditCard, Stethoscope,
  Clock, Lock, CheckSquare, ExternalLink, HelpCircle, Video, BookOpen,
  ArrowUpRight, Headphones, Settings, ChevronRight, AlertCircle, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFirstTimeUser, VIDEO_RESOURCES, VideoResource } from "../../contexts/FirstTimeUserContext";
import { usePartnerDashboard } from "../../contexts/PartnerDashboardContext";
import { VideoPlayerModal } from "./VideoPlayerModal";
import { DemoClientModal } from "./DemoClientModal";
import { WelcomeModal } from "./WelcomeModal";
import { SpotlightTour } from "./SpotlightTour";

export function FirstTimeDashboard() {
  const navigate = useNavigate();
  const {
    completedTasks,
    toggleTask,
    isTaskComplete,
    completionPercentage,
    completedCoreCount,
    totalCoreTasks,
    startTour,
    openVideo,
    openDemoModal,
    demoClient,
    setDashboardViewMode,
    setShowWelcomeModal
  } = useFirstTimeUser();

  const { providers, currentProviderId } = usePartnerDashboard();
  const currentProvider = providers.find((p) => p.id === currentProviderId);
  const providerName = currentProvider?.name || "Dr. Sarah Johnson";

  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const [resourceTab, setResourceTab] = useState<"videos" | "guides">("videos");

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhase((prev) => (prev === phaseNumber ? 0 : phaseNumber));
  };

  const handleTaskClick = (taskId: string, actionType: string, actionPayload?: any) => {
    if (actionType === "video") {
      const video = VIDEO_RESOURCES.find((v) => v.id === actionPayload) || VIDEO_RESOURCES[0];
      openVideo(video);
    } else if (actionType === "demo-chart") {
      openDemoModal("chart");
    } else if (actionType === "demo-scribe") {
      openDemoModal("scribe");
    } else if (actionType === "demo-soap") {
      openDemoModal("soap");
    } else if (actionType === "demo-superbill") {
      openDemoModal("superbill");
    } else if (actionType === "navigate") {
      toggleTask(taskId);
      navigate(actionPayload);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 py-4 sm:px-6 sm:py-6 space-y-6 max-w-7xl mx-auto">
      {/* Global Modals & Overlays */}
      <VideoPlayerModal />
      <DemoClientModal />

      {/* TOP HEADER TILE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-[#043570] via-[#054591] to-[#085aae] text-white p-6 sm:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden"
      >
        {/* Subtle geometric background art */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-cyan-400/20 text-cyan-200 border border-cyan-300/30 flex items-center gap-1.5">
                <Sparkles className="size-3 text-cyan-300" />
                Practice Onboarding Sandbox
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-blue-100 border border-white/20">
                14 Days Full Access
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome to MantraCare, {providerName}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Complete these core clinical setup milestones to configure your intake forms, practice schedule, ambient AI Scribe, and insurance billing.
            </p>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={startTour}
              className="px-4 py-2.5 bg-white text-[#043570] hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 active:scale-98"
            >
              <Play className="size-3.5 fill-[#043570]" />
              <span>Launch Guided Tour</span>
            </button>

            <button
              onClick={() => openDemoModal("chart")}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <User className="size-3.5" />
              <span>Explore Demo Case</span>
            </button>

            <button
              onClick={() => setDashboardViewMode("regular")}
              className="px-4 py-2.5 bg-black/25 hover:bg-black/40 text-blue-100 border border-white/15 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Switch to active analytics dashboard"
            >
              <span>Standard Dashboard</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Header Progress Tracker */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-100 flex items-center gap-1.5">
                <CheckSquare className="size-3.5 text-cyan-300" />
                Setup Progress: {completedCoreCount} of {totalCoreTasks} Core Tasks Finished
              </span>
              <span className="font-mono font-bold text-cyan-300">{completionPercentage}%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-300 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="md:col-span-4 flex md:justify-end items-center gap-2 text-xs text-blue-100">
            <Link
              to="/learn-mantra"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-semibold text-white border border-white/20 transition-colors"
            >
              <BookOpen className="size-3 text-cyan-300" />
              <span>5-Step Learning Center</span>
              <ChevronRight className="size-3 text-blue-300" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* TWO-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Checklists & Demo Client Tile (Col 7/12) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* DEMO PATIENT CASE TILE (CARL ROGERS) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  CR
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {demoClient.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {demoClient.mrn} · DEMO CASE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {demoClient.diagnosis} · {demoClient.insurance}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                Sandbox Mode
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              Use this pre-loaded patient record to test real-time AI transcription, view auto-structured SOAP clinical documentation, and preview itemized superbills before adding live clients.
            </p>

            {/* Demo Actions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <button
                onClick={() => openDemoModal("scribe")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all text-left group"
              >
                <Mic className="size-4 text-blue-600 dark:text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">AI Scribe</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Simulate Audio</p>
              </button>

              <button
                onClick={() => openDemoModal("soap")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all text-left group"
              >
                <FileText className="size-4 text-indigo-600 dark:text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">SOAP Note</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Review Charting</p>
              </button>

              <button
                onClick={() => openDemoModal("superbill")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all text-left group"
              >
                <CreditCard className="size-4 text-emerald-600 dark:text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Superbill</p>
                <p className="text-[10px] text-slate-400 mt-0.5">CPT 90834 Itemized</p>
              </button>

              <button
                onClick={() => openDemoModal("chart")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all text-left group"
              >
                <User className="size-4 text-cyan-600 dark:text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Full Chart</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Demographics & Care</p>
              </button>
            </div>
          </motion.div>

          {/* 4-PHASE MILESTONE CHECKLIST TILES */}
          <div className="space-y-3">
            
            {/* PHASE 1: Core System Essentials (Active) */}
            <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden ring-1 ring-blue-500/10">
              <button
                onClick={() => togglePhase(1)}
                className="w-full px-5 py-4 flex items-center justify-between bg-blue-50/60 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Phase 1: Core System Essentials
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Check off foundational platform essentials ({completedCoreCount} of {totalCoreTasks} finished)
                    </p>
                  </div>
                </div>
                {expandedPhase === 1 ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
              </button>

              {expandedPhase === 1 && (
                <div className="p-4 divide-y divide-slate-100 dark:divide-slate-800 space-y-1">
                  {[
                    {
                      id: "task-watch-tour",
                      title: "Platform Orientation & Clinical Overview",
                      duration: "2m 34s",
                      desc: "Watch the fast clinical workflow walkthrough.",
                      actionType: "video",
                      actionPayload: "tour-overview",
                      btnText: "Watch Tour",
                      icon: Video
                    },
                    {
                      id: "task-explore-demo",
                      title: "Explore Demo Patient Record (Carl Rogers)",
                      duration: "1m",
                      desc: "Inspect diagnostic impressions (ICD-10 F41.1) and care pathway.",
                      actionType: "demo-chart",
                      btnText: "Open Chart",
                      icon: User
                    },
                    {
                      id: "task-try-ai-scribe",
                      title: "Simulate Real-Time Ambient AI Scribe",
                      duration: "2m",
                      desc: "Test ambient speech listening and automated SOAP note generation.",
                      actionType: "demo-scribe",
                      btnText: "Test Scribe",
                      icon: Mic
                    },
                    {
                      id: "task-configure-availability",
                      title: "Set Practice Schedule & Booking Links",
                      duration: "2m",
                      desc: "Configure weekly hours, time buffers, and in-person/virtual locations.",
                      actionType: "navigate",
                      actionPayload: "/availability",
                      btnText: "Set Hours",
                      icon: Calendar
                    },
                    {
                      id: "task-billing-setup",
                      title: "Connect Payout Details & Fee Schedule",
                      duration: "3m",
                      desc: "Set standard consultation rates and payout banking profile.",
                      actionType: "navigate",
                      actionPayload: "/billing",
                      btnText: "Setup Billing",
                      icon: CreditCard
                    }
                  ].map((task) => {
                    const isDone = isTaskComplete(task.id);
                    const TaskIcon = task.icon;
                    return (
                      <div
                        key={task.id}
                        className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-1 last:pb-1"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-0.5 text-slate-300 hover:text-blue-600 transition-colors shrink-0"
                          >
                            {isDone ? (
                              <CheckCircle2 className="size-5 text-emerald-500 fill-emerald-50" />
                            ) : (
                              <Circle className="size-5 text-slate-300 dark:text-slate-600" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className={`text-xs font-bold leading-tight ${isDone ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"}`}>
                                {task.title}
                              </p>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({task.duration})
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                              {task.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => handleTaskClick(task.id, task.actionType, task.actionPayload)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                              isDone
                                ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                : "bg-[#043570] hover:bg-[#032857] text-white shadow-sm"
                            }`}
                          >
                            <TaskIcon className="size-3" />
                            <span>{task.btnText}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PHASE 2: Intake & Clinical Documentation (Expandable) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <button
                onClick={() => togglePhase(2)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Phase 2: Intake Flows & Clinical Documentation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Standardize PHQ-9 screeners, digital consents, and SOAP templates
                    </p>
                  </div>
                </div>
                {expandedPhase === 2 ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
              </button>

              {expandedPhase === 2 && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
                  <div className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Customize Intake & Consent Forms</p>
                      <p className="text-[11px] text-slate-500">Configure HIPAA consent, practice policies, and clinical intake forms.</p>
                    </div>
                    <button
                      onClick={() => navigate("/intake-forms")}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300"
                    >
                      Configure
                    </button>
                  </div>

                  <div className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Review SOAP, DAP & BIRP Note Formats</p>
                      <p className="text-[11px] text-slate-500">Set default note structures and auto-lock e-signature preferences.</p>
                    </div>
                    <button
                      onClick={() => navigate("/session-notes")}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300"
                    >
                      View Notes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* PHASE 3: Billing & Superbills (Expandable) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <button
                onClick={() => togglePhase(3)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Phase 3: Superbills & CMS-1500 Insurance Claims
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Automated invoicing, CPT code tagging, and electronic clean claims
                    </p>
                  </div>
                </div>
                {expandedPhase === 3 ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
              </button>

              {expandedPhase === 3 && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
                  <div className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Electronic CMS-1500 Claim Scrubbing</p>
                      <p className="text-[11px] text-slate-500">Auto-populate Box 21 (ICD-10) and Box 24 (CPT 90834/90837).</p>
                    </div>
                    <button
                      onClick={() => navigate("/claims")}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300"
                    >
                      Claims Hub
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* PHASE 4: Network & Growth (Expandable) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <button
                onClick={() => togglePhase(4)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Phase 4: Provider Credentialing & Directory Listing
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Expand practice visibility across 1M+ insured patients and employers
                    </p>
                  </div>
                </div>
                {expandedPhase === 4 ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
              </button>

              {expandedPhase === 4 && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
                  <div className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Mantra Provider Credential Status</p>
                      <p className="text-[11px] text-slate-500">Upload state license and NPI registration for insurance roster verification.</p>
                    </div>
                    <button
                      onClick={() => navigate("/verification")}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300"
                    >
                      Get Verified
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Video Resource Center & Clinical Tutorials (Col 5/12) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* VIDEO GALLERY TILE */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Play className="size-4 text-blue-600 fill-blue-600" />
                  Clinical Resource Library
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Short video walkthroughs & clinical practice guides
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setResourceTab("videos")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    resourceTab === "videos"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  Videos ({VIDEO_RESOURCES.length})
                </button>
                <button
                  onClick={() => setResourceTab("guides")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    resourceTab === "guides"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  Articles
                </button>
              </div>
            </div>

            {/* Video List */}
            {resourceTab === "videos" && (
              <div className="space-y-3">
                {VIDEO_RESOURCES.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => openVideo(video)}
                    className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 bg-slate-50/70 dark:bg-slate-850 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all cursor-pointer flex gap-3 group"
                  >
                    {/* Thumbnail Frame */}
                    <div className="w-28 h-20 rounded-lg overflow-hidden relative shrink-0 bg-slate-900">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                        <div className="size-7 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                          <Play className="size-3 fill-slate-950 ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-slate-950/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                          {video.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                        <span>{video.speaker}</span>
                        <span>·</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5">
                          Play <ChevronRight className="size-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Guides List */}
            {resourceTab === "guides" && (
              <div className="space-y-2.5">
                {[
                  {
                    title: "HIPAA-Compliant Ambient AI Documentation Best Practices",
                    readTime: "4 min read",
                    category: "Compliance & Security",
                    desc: "Guidelines for patient verbal consent, ambient microphone positioning, and clinician note verification."
                  },
                  {
                    title: "Clean CMS-1500 Insurance Claim Submission Checklist",
                    readTime: "6 min read",
                    category: "Revenue Cycle",
                    desc: "Avoiding common clearinghouse rejection codes for CPT 90834 and 90837."
                  },
                  {
                    title: "Standardized Intake Scoring: PHQ-9 & GAD-7 Integration",
                    readTime: "3 min read",
                    category: "Clinical Protocols",
                    desc: "Automating baseline score tracking and symptom severity graphing in patient charts."
                  }
                ].map((guide, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 hover:bg-slate-100 transition-colors text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {guide.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{guide.readTime}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                      {guide.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {guide.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 1-ON-1 ONBOARDING CONCIERGE TILE */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Implementation Specialist"
                className="size-11 rounded-xl object-cover border border-white/20"
              />
              <div>
                <h4 className="text-xs font-bold text-white">Need 1-on-1 Practice Setup Help?</h4>
                <p className="text-[11px] text-slate-300">Elena Rostova · Clinical Onboarding Lead</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Our clinical implementation team can assist you with bulk patient EHR migration, custom intake questionnaire formatting, or fee schedule setup.
            </p>

            <button
              onClick={() => navigate("/chat")}
              className="w-full h-10 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
            >
              <Headphones className="size-3.5 text-blue-600" />
              <span>Schedule Onboarding Session</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
