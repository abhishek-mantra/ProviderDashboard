import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Download,
  Trash2,
  Play,
  Pause,
  FileText,
  Sparkles
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function TranscriptView() {
  const navigate = useNavigate();
  const { id, sessionId, transcriptId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3:00 minutes

  // Mock transcript data
  const transcript = {
    id: transcriptId,
    title: "Transcript - Session with Rachit Dubey",
    overview: "Coping strategies for work-related stress and anxiety",
    date: "Mar 14th, 2026",
    time: "10:00 AM",
    duration: "30 min",
    lastModified: "3:45 PM",
    createdBy: "Dr. Smith",
    clientName: "Rachit Dubey",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwwfHx8fDE3NzQyNDAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    messages: [
      {
        id: "1",
        speaker: "Dr. Smith",
        speakerType: "therapist",
        text: "Good afternoon, Rachit. How have you been feeling since our last session?",
        timestamp: "0:00"
      },
      {
        id: "2",
        speaker: "Rachit",
        speakerType: "client",
        text: "Hi Dr. Smith. I've been okay, but work has been really overwhelming lately. The stress just keeps building up.",
        timestamp: "0:05"
      },
      {
        id: "3",
        speaker: "Dr. Smith",
        speakerType: "therapist",
        text: "I understand. Can you tell me more about what's been causing the most stress at work?",
        timestamp: "0:15"
      },
      {
        id: "4",
        speaker: "Rachit",
        speakerType: "client",
        text: "Well, I have multiple deadlines coming up, and I feel like I'm constantly falling behind. Even when I complete something, there's always something new waiting. It's exhausting.",
        timestamp: "0:22"
      },
      {
        id: "5",
        speaker: "Dr. Smith",
        speakerType: "therapist",
        text: "That does sound challenging. Have you noticed any physical symptoms alongside these feelings?",
        timestamp: "0:38"
      }
    ]
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateNotes = () => {
    // Navigate to add notes page with transcript data
    if (sessionId) {
      navigate(`/sessions/${sessionId}/notes/add`, { state: { fromTranscript: transcriptId } });
    } else if (id) {
      navigate(`/clients/${id}/notes/add`, { state: { fromTranscript: transcriptId } });
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 md:px-6 py-3 md:py-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex items-start gap-3 md:gap-4">
            <div className="size-10 md:size-12 rounded-lg flex items-center justify-center bg-[#00c0ff]/10 dark:bg-blue-900/20 flex-shrink-0">
              <FileText className="size-5 md:size-6 text-[#00c0ff]" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                {transcript.title}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                {transcript.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto p-3 md:p-6">
        {/* Client Info & Audio Player */}
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-4 md:mb-6">
          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
            <ImageWithFallback
              src={transcript.clientAvatar}
              alt={transcript.clientName}
              className="size-12 md:size-14 rounded-full object-cover"
              fallback={
                <div className="size-12 md:size-14 bg-[#043570] rounded-full flex items-center justify-center">
                  <User className="size-6 md:size-7 text-white" />
                </div>
              }
            />
            <div className="flex-1">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {transcript.clientName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1 md:gap-1.5">
                  <Calendar className="size-3 md:size-3.5" />
                  <span>{transcript.date}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <Clock className="size-3 md:size-3.5" />
                  <span>{transcript.time}</span>
                </div>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">{transcript.duration}</span>
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-gradient-to-br from-[#f3faff] to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-4 md:p-5 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center gap-3 md:gap-4 mb-3">
              <button
                onClick={handlePlayPause}
                className="size-10 md:size-12 bg-[#00c0ff] hover:bg-[#00a8e0] rounded-full flex items-center justify-center transition-colors shadow-lg flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="size-5 md:size-6 text-white fill-white" />
                ) : (
                  <Play className="size-5 md:size-6 text-white fill-white ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="w-full bg-white dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-[#00c0ff] h-2 rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 flex-1 md:flex-initial justify-center">
                <Download className="size-3.5 md:size-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 flex-1 md:flex-initial justify-center">
                <Trash2 className="size-3.5 md:size-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Session Transcript
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <span>Last modified: {transcript.lastModified}</span>
                  <span className="hidden md:inline">•</span>
                  <div className="flex items-center gap-1">
                    <User className="size-3 md:size-3.5" />
                    <span>{transcript.createdBy}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleGenerateNotes}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg transition-colors text-xs md:text-sm font-semibold shadow-sm justify-center md:flex-shrink-0"
              >
                <Sparkles className="size-3.5 md:size-4" />
                <span className="hidden sm:inline">Generate Notes from Transcript</span>
                <span className="sm:hidden">Generate Notes</span>
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {transcript.messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 md:gap-4 p-3 md:p-4 rounded-lg border-l-4 ${
                  message.speakerType === "therapist"
                    ? "bg-blue-50 dark:bg-blue-900/10 border-[#2563EB]"
                    : "bg-cyan-50 dark:bg-cyan-900/10 border-[#00c0ff]"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`size-8 md:size-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${
                    message.speakerType === "therapist"
                      ? "bg-[#2563EB] text-white"
                      : "bg-[#00c0ff] text-white"
                  }`}>
                    {message.speaker.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1 gap-2">
                    <h4 className={`font-bold text-sm md:text-base ${
                      message.speakerType === "therapist"
                        ? "text-[#2563EB]"
                        : "text-[#043570] dark:text-[#00c0ff]"
                    }`}>
                      {message.speaker}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
