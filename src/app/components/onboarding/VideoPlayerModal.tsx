import React, { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Clock, CheckCircle2, Video, Sparkles, FileText, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUserMode } from "../../contexts/UserModeContext";

export function VideoPlayerModal() {
  const { activeVideoModal, closeVideo } = useUserMode();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(14);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!activeVideoModal) return;
    setIsPlaying(true);
    setCurrentTime(14);
  }, [activeVideoModal]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && activeVideoModal) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 150) {
            setIsPlaying(false);
            return 150;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeVideoModal, playbackSpeed]);

  if (!activeVideoModal) return null;

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden ring-1 ring-black/10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-blue-600/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center border border-blue-500/20">
                <Video className="size-3.5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                  {activeVideoModal.title}
                </h3>
                {activeVideoModal.speaker && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activeVideoModal.speaker} · {activeVideoModal.speakerRole}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={closeVideo}
              className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Video Screen / Placeholder Player */}
          <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden select-none">
            {/* Background Thumbnail preview */}
            <img
              src={activeVideoModal.thumbnail}
              alt={activeVideoModal.title}
              className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[2px]"
            />

            {/* Video Coming Soon / Interactive Preview Badge */}
            <div className="relative z-10 text-center p-6 max-w-md">
              <div className="inline-flex size-14 rounded-2xl bg-white/10 text-white backdrop-blur-md items-center justify-center border border-white/20 mb-3 shadow-xl">
                <Play className="size-6 fill-white translate-x-0.5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                {activeVideoModal.title}
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto mb-3">
                {activeVideoModal.description}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 text-xs font-semibold">
                <Sparkles className="size-3 text-cyan-300" />
                <span>Video Walkthrough (Coming Soon) · {activeVideoModal.duration}</span>
              </div>
            </div>

            {/* Player Control Overlay at bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col space-y-2 z-20">
              {/* Progress Slider */}
              <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-[#00c0ff] rounded-full transition-all"
                  style={{ width: `${Math.min((currentTime / 150) * 100, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="size-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="size-3.5 fill-white" /> : <Play className="size-3.5 fill-white translate-x-0.5" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="size-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300">
                    {formatSeconds(currentTime)} / {activeVideoModal.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                    className="px-2 py-0.5 bg-white/15 hover:bg-white/25 rounded text-[11px] font-mono transition-colors"
                  >
                    {playbackSpeed}x
                  </button>
                  <button
                    onClick={closeVideo}
                    className="px-3 py-1 bg-white text-[#043570] hover:bg-blue-50 rounded-lg text-xs font-bold transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters / Topics Breakdown */}
          {activeVideoModal.chapters && activeVideoModal.chapters.length > 0 && (
            <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800">
              <h5 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Chapters & Key Topics
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeVideoModal.chapters.map((chap, i) => (
                  <div
                    key={i}
                    className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between gap-2"
                  >
                    <span className="text-slate-800 dark:text-slate-200 truncate">{chap.title}</span>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0">{chap.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
