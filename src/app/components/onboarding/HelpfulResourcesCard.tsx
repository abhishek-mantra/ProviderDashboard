import React, { useState } from "react";
import {
  Play,
  FileText,
  Video,
  X,
  Clock,
  Sparkles,
  CheckCircle2,
  Volume2,
  Maximize2,
  RotateCcw,
  RotateCw,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VideoResource {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  speaker: string;
  tag: string;
  description: string;
  takeaways: string[];
}

interface ArticleResource {
  id: string;
  title: string;
  readTime: string;
  category: string;
  summary: string;
}

const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: "tour",
    title: "2-minute tour of Mantra",
    duration: "2:34",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXBpc3QlMjB3b21hbiUyMGxhcHRvcHxlbnwwfHx8fDE3NzQ2MDg4OTF8MA&ixlib=rb-4.1.0&q=80&w=400",
    speaker: "Dr. Sarah Jenkins",
    tag: "Platform Overview",
    description: "Get a quick orientation of your client directory, AI ambient documentation rail, calendar, and billing tools.",
    takeaways: [
      "Navigate between Client Directory and AI Scribe in 1 click",
      "Launch HIPAA-compliant telehealth rooms directly from calendar",
      "One-click superbill generation with auto-filled CPT codes",
    ],
  },
  {
    id: "get-started",
    title: "Get started in 15 minutes",
    duration: "8:15",
    thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80",
    speaker: "Elena Rostova",
    tag: "Full Setup",
    description: "Comprehensive step-by-step setup: adding your first client, creating customized intake forms, and connecting your Stripe account.",
    takeaways: [
      "Customizing clinical intake questionnaires & consent forms",
      "Setting up standard session availability & booking links",
      "Configuring direct bank deposits with automatic payout schedule",
    ],
  },
  {
    id: "support-help",
    title: "How to get help from our team",
    duration: "3:53",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
    speaker: "Mantra Support Team",
    tag: "Support & Docs",
    description: "Learn how to access 24/7 in-app clinician support, schedule 1-on-1 onboarding, and search the knowledge base.",
    takeaways: [
      "Reach live support via the bottom-right help widget",
      "Schedule complimentary 1-on-1 clinician practice migration",
      "Access pre-built ICD-10 diagnostic templates & guides",
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling an appointment",
    duration: "1:49",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80",
    speaker: "Dr. Alex Vance",
    tag: "Calendar & Telehealth",
    description: "Set up recurring availability, sync Google/Outlook calendars, and launch one-click HIPAA-compliant video telehealth sessions.",
    takeaways: [
      "Two-way calendar synchronization with Google & Microsoft 365",
      "Automated SMS & email appointment reminders for clients",
      "Custom cancellation policies and automatic late-fee rules",
    ],
  },
];

const ARTICLE_RESOURCES: ArticleResource[] = [
  {
    id: "intake-guide",
    title: "How to customize your clinical intake forms",
    readTime: "3 min read",
    category: "Intake & Consent",
    summary: "Create paperless intake packets with digital e-signatures and custom health history questionnaires.",
  },
  {
    id: "billing-setup",
    title: "Connecting billing and submitting insurance claims",
    readTime: "4 min read",
    category: "Billing & Superbills",
    summary: "Set up automated card charging, produce itemized CPT superbills, and submit electronic 837P claims.",
  },
  {
    id: "ambient-notes",
    title: "Best practices for Ambient AI SOAP notes",
    readTime: "2 min read",
    category: "AI Scribe",
    summary: "Tips for crystal-clear microphone capture during telehealth and in-person consultations.",
  },
];

export function HelpfulResourcesCard() {
  const [activeTab, setActiveTab] = useState<"videos" | "articles">("videos");
  const [selectedVideo, setSelectedVideo] = useState<VideoResource | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#F0F7FF] via-[#F8FBFF] to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-[#043570] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="size-3.5 text-[#00c0ff]" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Helpful resources
            </h3>
          </div>

          {/* Segmented Pill Tabs */}
          <div className="flex items-center bg-gray-100/90 dark:bg-gray-700/80 p-0.5 rounded-xl border border-gray-200/80 dark:border-gray-600 shadow-2xs">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "videos"
                  ? "bg-white dark:bg-gray-800 text-[#043570] dark:text-[#00c0ff] shadow-xs font-bold"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Video className="size-3.5" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "articles"
                  ? "bg-white dark:bg-gray-800 text-[#043570] dark:text-[#00c0ff] shadow-xs font-bold"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <FileText className="size-3.5" />
              <span>Articles</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-4 flex-1 divide-y divide-gray-100 dark:divide-gray-700/60 overflow-y-auto max-h-[380px]">
          {activeTab === "videos" ? (
            VIDEO_RESOURCES.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  setSelectedVideo(video);
                  setIsPlaying(false);
                }}
                className="py-3 first:pt-1 last:pb-1 flex items-center gap-3.5 hover:bg-blue-50/50 dark:hover:bg-gray-750/60 p-2.5 rounded-xl transition-all cursor-pointer group"
              >
                {/* Modern Video Thumbnail with Glass Play Badge */}
                <div className="relative w-28 h-18 rounded-xl overflow-hidden shrink-0 bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xs">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Clean Glassmorphic Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-7 rounded-full bg-white/95 text-[#043570] dark:bg-gray-900/90 dark:text-[#00c0ff] shadow-md ring-1 ring-black/10 dark:ring-white/20 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00c0ff] group-hover:text-white dark:group-hover:bg-[#00c0ff] dark:group-hover:text-white transition-all duration-200">
                      <Play className="size-3.5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Timestamp Badge */}
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white font-mono text-[9px] font-semibold leading-none flex items-center gap-0.5">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.2 rounded-md bg-blue-50 dark:bg-blue-950/50 text-[#043570] dark:text-cyan-300 text-[10px] font-bold border border-blue-200/60 dark:border-blue-900/40">
                      {video.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {video.speaker}
                  </p>
                </div>
              </div>
            ))
          ) : (
            ARTICLE_RESOURCES.map((article) => (
              <div
                key={article.id}
                className="py-3 first:pt-1 last:pb-1 p-2.5 rounded-xl hover:bg-blue-50/40 dark:hover:bg-gray-750/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#00c0ff] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                    <Clock className="size-3" />
                    {article.readTime}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                  {article.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Premium Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-850 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              {/* Video Player Box */}
              <div className="relative aspect-video bg-gray-950 flex items-center justify-center overflow-hidden group">
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isPlaying ? "opacity-30" : "opacity-70"
                  }`}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40" />

                {/* Center Action Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="size-16 rounded-full bg-gradient-to-tr from-[#043570] to-[#00c0ff] text-white flex items-center justify-center shadow-xl shadow-[#00c0ff]/30 ring-4 ring-white/25 hover:scale-110 hover:shadow-[#00c0ff]/50 transition-all cursor-pointer group/btn"
                  >
                    <Play className="size-7 fill-white ml-1 text-white group-hover/btn:scale-105 transition-transform" />
                  </button>
                  <span className="text-white text-xs font-semibold bg-black/60 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                    {isPlaying ? "Playing Video Preview" : `Watch Full Walkthrough (${selectedVideo.duration})`}
                  </span>
                </div>

                {/* Top Controls Bar */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <Video className="size-3.5 text-[#00c0ff]" />
                    {selectedVideo.tag}
                  </span>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="size-8 bg-black/60 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors border border-white/10 cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Bottom Video Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-2">
                  {/* Progress Line */}
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-[#00c0ff] w-1/3 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-white text-[11px]">
                    <div className="flex items-center gap-3 font-mono">
                      <span>0:45 / {selectedVideo.duration}</span>
                      <span className="px-1.5 py-0.2 rounded bg-white/15 text-[10px] font-sans">1080p HD</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Volume2 className="size-3.5 hover:text-white cursor-pointer" />
                      <Maximize2 className="size-3.5 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Details & Key Takeaways */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {selectedVideo.title}
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#043570] dark:text-[#00c0ff] bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200/60 dark:border-blue-900/40">
                      {selectedVideo.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mt-1.5">
                    {selectedVideo.description}
                  </p>
                </div>

                {/* Key Takeaways Checklist */}
                <div className="p-3.5 bg-gray-50 dark:bg-gray-800/70 rounded-xl border border-gray-100 dark:border-gray-700/60 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Sparkles className="size-3 text-[#00c0ff]" />
                    Key Milestones Covered:
                  </p>
                  <div className="space-y-1.5">
                    {selectedVideo.takeaways.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-400">Speaker: {selectedVideo.speaker}</span>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="px-4 py-1.5 bg-[#043570] hover:bg-[#032a5a] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm active:scale-95"
                  >
                    Done Watching
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
