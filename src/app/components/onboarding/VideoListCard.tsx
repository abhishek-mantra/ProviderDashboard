import React from "react";
import { Play, Clock, Video, Sparkles, ChevronRight } from "lucide-react";
import { useUserMode, ONBOARDING_VIDEOS, VideoItem } from "../../contexts/UserModeContext";

export function VideoListCard() {
  const { openVideo } = useUserMode();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700/60">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-[#043570] dark:text-cyan-300 flex items-center justify-center">
            <Video className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Practice Walkthrough Videos
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Quick video guides to master each clinical workflow
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          5 Guides
        </span>
      </div>

      {/* Videos List */}
      <div className="space-y-2.5">
        {ONBOARDING_VIDEOS.map((video, index) => (
          <div
            key={video.id}
            onClick={() => openVideo(video)}
            className="group p-3 rounded-xl border border-gray-200 dark:border-gray-700/80 hover:border-[#00c0ff] dark:hover:border-[#00c0ff] bg-white dark:bg-gray-800 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
          >
            {/* Thumbnail with Play Overlay */}
            <div className="relative size-14 sm:w-20 sm:h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700 border border-gray-200/60 dark:border-gray-700">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                <div className="size-6 rounded-full bg-white/90 group-hover:bg-white text-[#043570] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="size-3 fill-[#043570] translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Video Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 font-mono">
                  0{index + 1}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-[#043570] dark:group-hover:text-cyan-300 transition-colors">
                  {video.title}
                </p>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {video.description}
              </p>
            </div>

            {/* Duration pill + Arrow */}
            <div className="shrink-0 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                <Clock className="size-3 text-gray-400" />
                {video.duration}
              </span>
              <ChevronRight className="size-4 text-gray-400 group-hover:text-[#043570] dark:group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all hidden sm:block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
