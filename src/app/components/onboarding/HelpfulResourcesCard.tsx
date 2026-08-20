import React, { useState } from "react";
import { Play, FileText, Video, ExternalLink, X, Clock, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VideoResource {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  speaker: string;
  description: string;
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
    description: "Get a quick orientation of your client directory, AI ambient documentation rail, calendar, and billing tools.",
  },
  {
    id: "get-started",
    title: "Get started in 15 minutes",
    duration: "8:15",
    thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80",
    speaker: "Elena Rostova",
    description: "Comprehensive step-by-step setup: adding your first client, creating customized intake forms, and connecting your Stripe account.",
  },
  {
    id: "support-help",
    title: "How to get help from our team",
    duration: "3:53",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
    speaker: "Mantra Support Team",
    description: "Learn how to access 24/7 in-app clinician support, schedule 1-on-1 onboarding, and search the knowledge base.",
  },
  {
    id: "scheduling",
    title: "Scheduling an appointment",
    duration: "1:49",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80",
    speaker: "Dr. Alex Vance",
    description: "Set up recurring availability, sync Google/Outlook calendars, and launch one-click HIPAA-compliant video telehealth sessions.",
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

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
        {/* Header with light blue tint matching reference image */}
        <div className="px-5 py-4 bg-[#F0F7FF] dark:bg-gray-750/80 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Helpful resources
          </h3>

          {/* Segmented Pill Tabs */}
          <div className="flex items-center bg-white dark:bg-gray-700 p-0.5 rounded-lg border border-gray-200 dark:border-gray-600 shadow-2xs">
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "videos"
                  ? "bg-white dark:bg-gray-800 text-[#00c0ff] shadow-xs"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "articles"
                  ? "bg-white dark:bg-gray-800 text-[#00c0ff] shadow-xs"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Articles
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 divide-y divide-gray-100 dark:divide-gray-700/60 overflow-y-auto max-h-[380px]">
          {activeTab === "videos" ? (
            VIDEO_RESOURCES.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="py-3 first:pt-0 last:pb-0 flex items-center gap-3.5 hover:bg-gray-50 dark:hover:bg-gray-750/50 p-2 rounded-xl transition-all cursor-pointer group"
              >
                {/* Video Thumbnail with Play Badge */}
                <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-2xs">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Yellow Play Badge overlay matching reference screenshot */}
                  <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                    <div className="size-6 bg-[#fbbf24] hover:bg-[#f59e0b] rounded-full flex items-center justify-center shadow-md text-gray-900 group-hover:scale-110 transition-transform">
                      <Play className="size-3 fill-gray-900 ml-0.5 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                      {video.duration}
                    </span>
                    <span className="text-gray-300 dark:text-gray-600">·</span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                      {video.speaker}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            ARTICLE_RESOURCES.map((article) => (
              <div
                key={article.id}
                className="py-3 first:pt-0 last:pb-0 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#00c0ff] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="size-3" />
                    {article.readTime}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#00c0ff] transition-colors">
                  {article.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  {article.summary}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="size-16 bg-[#fbbf24] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                    <Play className="size-7 fill-gray-900 text-gray-900 ml-1" />
                  </div>
                  <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    Click to Play ({selectedVideo.duration})
                  </span>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-3 right-3 size-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {selectedVideo.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#00c0ff] bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full">
                    {selectedVideo.duration}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedVideo.description}
                </p>
                <div className="pt-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-400">Speaker: {selectedVideo.speaker}</span>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="px-4 py-1.5 bg-[#043570] hover:bg-[#032a5a] text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Close Preview
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
