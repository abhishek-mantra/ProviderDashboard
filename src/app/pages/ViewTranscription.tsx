import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, Clock, FileText, Mic, Download, Trash2, Sparkles, Copy, Check, Plus, ChevronDown, ChevronUp, Eye, Play, Pause, SkipBack, SkipForward, Volume2, Pill } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Tab = "transcript" | "notes";

interface SessionNote {
  id: string;
  title: string;
  date: string;
  time: string;
  content: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export function ViewTranscription() {
  const navigate = useNavigate();
  const { transcriptionId } = useParams();
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const [showGenerateNotesModal, setShowGenerateNotesModal] = useState(false);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("soap");
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(182); // 3:02 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [notes, setNotes] = useState<SessionNote[]>([
    {
      id: "1",
      title: "Coping strategies for work-related stress and anxiety",
      date: "Mar 14th, 2026",
      time: "3:45 PM",
      content: `# Session Summary - Mar 14, 2026

## Client Information
**Name:** Sarah Johnson
**Session Date:** Mar 14, 2026
**Session Duration:** 45:32

## Key Topics Discussed
- Mindfulness and breathing exercises progress
- Workplace anxiety management
- Successful presentation experience
- Social anxiety challenges
- Networking event experience

## Client Progress
Sarah has shown significant improvement in managing workplace anxiety through daily mindfulness practice (10 minutes each morning). She successfully applied breathing techniques before a work presentation, resulting in reduced anxiety and positive feedback from her manager.

## Current Challenges
- Social anxiety in networking situations
- Feeling overwhelmed in group settings with unfamiliar people
- Left networking event early due to anxiety

## Interventions Applied
- Reinforced breathing exercises
- Discussed coping strategies for overwhelming situations
- Validated client's decision to leave stressful environment
- Introduced grounding techniques for social settings

## Treatment Plan
1. Continue daily mindfulness practice (10 minutes/morning)
2. Practice grounding techniques in low-stress social situations
3. Gradually increase exposure to social settings
4. Develop pre-event preparation routine for networking situations

## Homework Assignments
- Practice grounding technique daily
- Attend one small social gathering before next session
- Journal about social interactions and anxiety levels

## Next Session Goals
- Review grounding technique practice
- Discuss experiences with social situations
- Work on cognitive restructuring for social anxiety

## Clinical Observations
Client demonstrates strong motivation and ability to apply learned techniques. Shows insight into anxiety patterns and actively seeks strategies for improvement. Positive progress in workplace settings; social anxiety remains area of focus.

## Risk Assessment
No safety concerns identified. Client has good support system and effective coping strategies.`,
    },
    {
      id: "2",
      title: "Client expressed feelings of overwhelm and explored past trauma responses",
      date: "Feb 10, 2026",
      time: "10:30 AM",
      content: `# Session Summary - Feb 10, 2026

## Client Information
**Name:** Sarah Johnson
**Session Date:** Feb 10, 2026
**Session Duration:** 50:15

## Key Topics Discussed
- Overwhelming feelings at work
- Past trauma triggers
- Coping mechanisms
- Emotional regulation strategies

## Client Progress
Client is becoming more aware of emotional triggers and their connection to past experiences.

## Treatment Plan
1. Continue trauma-informed therapy approach
2. Develop emotional regulation skills
3. Practice self-compassion exercises`,
    },
  ]);
  const [editingNoteContent, setEditingNoteContent] = useState("");

  // Template options
  const templates: Template[] = [
    {
      id: "basic",
      name: "Basic Template",
      description: "Simple session summary",
      icon: "📄",
      color: "from-orange-50 to-orange-100",
    },
    {
      id: "soap",
      name: "SOAP Template",
      description: "Subjective, Objective, Assessment, Plan",
      icon: "📋",
      color: "from-purple-50 to-purple-100",
    },
    {
      id: "diagnosis",
      name: "Diagnosis and Treatment Objective",
      description: "Clinical diagnosis focus",
      icon: "🩺",
      color: "from-gray-50 to-gray-100",
    },
    {
      id: "brief",
      name: "Brief Progress Note",
      description: "Quick progress update",
      icon: "📊",
      color: "from-blue-50 to-blue-100",
    },
  ];

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  // Mock transcription data
  const transcription = {
    id: transcriptionId,
    clientId: "1",
    clientName: "Sarah Johnson",
    clientAvatar: "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDYwODg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    sessionDate: "Mar 14, 2026",
    sessionTime: "10:00 AM - 10:45 AM",
    duration: "45:32",
    status: "completed",
    recordedDate: "Mar 14, 2026",
    fileSize: "32 MB",
    transcript: `[00:00:12] Therapist: Good morning, Sarah. How have you been since our last session?

[00:00:18] Sarah: Hi! I've been doing pretty well, actually. I've been practicing those mindfulness techniques we talked about.

[00:00:26] Therapist: That's wonderful to hear! Can you tell me more about how that's been going for you?

[00:00:32] Sarah: Well, I've been doing the breathing exercises every morning for about 10 minutes. It's really helped me start my day with a clearer mind. I feel less anxious when I get to work.

[00:00:45] Therapist: That's excellent progress. Have you noticed any specific situations where the techniques have been particularly helpful?

[00:00:52] Sarah: Yes, definitely. Last week, I had a really stressful presentation at work. Normally, I would have been incredibly anxious, but I used the breathing technique beforehand and it really helped calm my nerves.

[00:01:08] Therapist: I'm so proud of you for applying what we've discussed. That shows real growth. How did the presentation go?

[00:01:15] Sarah: It went really well! My manager gave me positive feedback, and I felt much more confident than I usually do in those situations.

[00:01:25] Therapist: That's fantastic. Building on that success, have you been able to identify any triggers that still cause you difficulty?

[00:01:33] Sarah: I think social situations are still challenging. I went to a networking event last Friday and felt pretty overwhelmed. There were so many people and I didn't know anyone.

[00:01:45] Therapist: Social anxiety is very common, and it's good that you're recognizing these patterns. What did you do when you started feeling overwhelmed?

[00:01:53] Sarah: I stepped outside for a few minutes and did some breathing exercises. It helped a little, but I still ended up leaving earlier than I planned.

[00:02:05] Therapist: Taking that break was a very healthy coping strategy. Sometimes leaving a situation when you're overwhelmed is also a valid choice. Let's talk about some additional strategies we can work on for social situations...

[00:02:20] Sarah: That would be really helpful. I want to be able to handle these situations better because they're important for my career.

[00:02:28] Therapist: Absolutely, and we'll work on that together. One technique I'd like to introduce is called grounding. It can be particularly helpful in social settings...`,
    hasNotes: false,
  };

  const handleGenerateNotes = () => {
    setIsGeneratingNotes(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let generatedContent = "";
      let noteTitle = "";

      // Generate different content based on selected template
      switch (selectedTemplate) {
        case "basic":
          noteTitle = "Session summary for stress and anxiety management";
          generatedContent = `# Basic Session Summary

**Client:** ${transcription.clientName}
**Date:** ${transcription.sessionDate}
**Duration:** ${transcription.duration}

## Session Overview
Client continued work on managing workplace and social anxiety. Demonstrated good progress with mindfulness practices and workplace presentations, while identifying ongoing challenges with social networking situations.

## Key Discussion Points
- Daily mindfulness practice (10 minutes/morning)
- Successful application of breathing techniques before work presentation
- Challenges with social networking events
- Introduction of grounding techniques for social anxiety

## Progress
Sarah has made significant strides in managing workplace anxiety through consistent mindfulness practice. She successfully used learned techniques during a work presentation with positive results.

## Next Steps
- Continue daily mindfulness practice
- Practice grounding techniques in low-stress social settings
- Gradually increase exposure to social situations
- Journal about social interactions`;
          break;

        case "soap":
          noteTitle = "SOAP note for anxiety management session";
          generatedContent = `# SOAP Note

**Client:** ${transcription.clientName}
**Date:** ${transcription.sessionDate}
**Duration:** ${transcription.duration}

## Subjective
Client reports practicing daily mindfulness exercises (10 minutes/morning) with positive results. Successfully applied breathing techniques before a work presentation and received positive feedback from manager. However, client experienced significant anxiety at a networking event last Friday, feeling overwhelmed by the crowd and unfamiliar faces, resulting in early departure.

## Objective
Client appeared well-groomed and maintained good eye contact. Speech was clear and coherent. Affect was appropriate to content. Client demonstrated insight into anxiety patterns and showed motivation for continued treatment. No signs of acute distress observed during session.

## Assessment
Client continues to show improvement in managing workplace-related anxiety through consistent application of mindfulness and breathing techniques. Social anxiety in networking situations remains a significant challenge requiring additional intervention. Client demonstrates good treatment compliance and strong motivation for change.

**Diagnosis:** Generalized Anxiety Disorder with Social Anxiety features

## Plan
1. Continue daily mindfulness practice (10 minutes/morning)
2. Introduce and practice grounding techniques for social anxiety
3. Gradual exposure to social situations, starting with small gatherings
4. Develop pre-event preparation routine for networking situations
5. Homework: Practice grounding technique daily, attend one small social gathering before next session, journal about social interactions
6. Follow-up session in one week to review progress`;
          break;

        case "diagnosis":
          noteTitle = "Diagnosis and treatment objective for anxiety disorders";
          generatedContent = `# Diagnosis and Treatment Note

**Client:** ${transcription.clientName}
**Date:** ${transcription.sessionDate}
**Duration:** ${transcription.duration}

## Primary Diagnosis
Generalized Anxiety Disorder (GAD) - F41.1

## Secondary Diagnosis
Social Anxiety Disorder (Social Phobia) - F40.10

## Clinical Presentation
Client presents with persistent worry and anxiety, particularly in workplace and social situations. Reports successful management of workplace anxiety through mindfulness practices but continues to struggle with social networking events. Physical symptoms include nervousness, tension, and feeling overwhelmed in crowded social settings.

## Treatment Objectives
1. **Primary Objective:** Reduce anxiety symptoms to manageable levels in both workplace and social settings
2. **Secondary Objectives:**
   - Maintain consistent mindfulness practice
   - Develop effective coping strategies for social anxiety
   - Increase comfort and duration in social networking situations
   - Build confidence in professional social interactions

## Interventions
- Cognitive Behavioral Therapy (CBT) techniques
- Mindfulness-based stress reduction
- Breathing exercises and relaxation techniques
- Grounding techniques for acute anxiety
- Gradual exposure therapy for social situations

## Current Treatment Progress
Client shows good response to mindfulness and breathing interventions for workplace anxiety. Treatment focus shifting to address social anxiety through grounding techniques and gradual exposure. Client demonstrates high motivation and treatment compliance.

## Next Treatment Steps
- Continue CBT approach with focus on social anxiety
- Practice grounding techniques
- Begin graduated exposure to social situations
- Monitor progress and adjust interventions as needed
- Re-evaluate treatment plan in 2-3 sessions`;
          break;

        case "brief":
          noteTitle = "Brief progress note - anxiety management";
          generatedContent = `# Brief Progress Note

**Client:** ${transcription.clientName}
**Date:** ${transcription.sessionDate}
**Duration:** ${transcription.duration}

## Chief Concern
Managing workplace and social anxiety

## Progress Update
✓ Successfully practicing daily mindfulness (10 min/morning)
✓ Applied breathing techniques during work presentation with positive outcome
✗ Struggled with networking event - left early due to anxiety

## Today's Focus
- Reviewed successful use of anxiety management techniques at work
- Addressed challenges with social networking situations
- Introduced grounding techniques for social anxiety

## Intervention
Grounding techniques, continued mindfulness practice, gradual social exposure

## Homework
- Practice grounding technique daily
- Attend one small social gathering
- Journal about social interactions

## Next Session
Review grounding practice and social situation experiences

## Overall Status
**Improving** - Good progress with workplace anxiety; social anxiety remains treatment focus`;
          break;

        default:
          noteTitle = "Session notes";
          generatedContent = "Session notes content";
      }

      const newNote: SessionNote = {
        id: String(Date.now()),
        title: noteTitle,
        date: transcription.sessionDate,
        time: transcription.sessionTime,
        content: generatedContent,
      };

      setNotes((prevNotes) => {
        const updatedNotes = [newNote, ...prevNotes];
        // Save to localStorage
        localStorage.setItem(`transcription_${transcriptionId}_notes`, JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      setIsGeneratingNotes(false);
      setShowGenerateNotesModal(false);
    }, 2000);
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(transcription.transcript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveNotes = () => {
    // Save notes logic here
    // Show success message or toast
  };

  // Helper function to format transcript with colored speakers
  const formatTranscriptLine = (line: string) => {
    // Match pattern like [00:00:12] Speaker: text
    const match = line.match(/^(\[[\d:]+\])\s+([^:]+):\s*(.*)$/);
    
    if (match) {
      const timestamp = match[1];
      const speaker = match[2].trim();
      const text = match[3];
      
      // Color for therapist/expert - teal
      // Color for client - blue
      const isTherapist = speaker.toLowerCase().includes('therapist') || 
                         speaker.toLowerCase().includes('doctor') || 
                         speaker.toLowerCase().includes('dr.');
      
      return (
        <p key={line} className="text-gray-700 dark:text-gray-300">
          <span className="text-gray-500 dark:text-gray-500">{timestamp}</span>{" "}
          <span className={`font-semibold ${isTherapist ? 'text-[#14B8A6]' : 'text-[#2563EB]'}`}>
            {speaker}:
          </span>{" "}
          {text}
        </p>
      );
    }
    
    return <p key={line} className="text-gray-700 dark:text-gray-300">{line}</p>;
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <button
          onClick={() => navigate("/ai-transcriber")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#14B8A6] dark:hover:text-[#14B8A6] transition-colors mb-3 md:mb-4 font-medium text-sm"
        >
          <ArrowLeft className="size-4" />
          Back to AI Transcriber
        </button>

        {/* Client Info Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4 flex-1 w-full sm:w-auto">
              {/* Avatar */}
              <ImageWithFallback
                src={transcription.clientAvatar}
                alt={transcription.clientName}
                className="size-12 md:size-16 rounded-xl object-cover flex-shrink-0"
                fallback={
                  <div className="size-12 md:size-16 bg-gradient-to-br from-[#14B8A6] to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-lg flex-shrink-0">
                    {transcription.clientName.split(" ").map((n) => n[0]).join("")}
                  </div>
                }
              />

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                  {transcription.clientName}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Calendar className="size-3 md:size-4" />
                    <span>{transcription.sessionDate}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Clock className="size-3 md:size-4" />
                    <span className="hidden sm:inline">{transcription.sessionTime}</span>
                    <span className="sm:hidden">{transcription.sessionTime.split(" - ")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Mic className="size-3 md:size-4" />
                    <span>{transcription.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-all font-medium text-sm text-gray-700 dark:text-gray-300 flex-1 sm:flex-initial"
                title="Download"
              >
                <Download className="size-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-600 hover:border-red-200 rounded-lg transition-all font-medium text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 flex-1 sm:flex-initial"
                title="Delete"
              >
                <Trash2 className="size-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player Controls */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col gap-4">
          {/* Control Buttons and Time */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Control Buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                className="size-8 md:size-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                title="Skip backward"
              >
                <SkipBack className="size-4 md:size-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="size-10 md:size-12 bg-[#0066FF] hover:bg-[#0052CC] rounded-full flex items-center justify-center transition-colors shadow-lg"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="size-5 md:size-6 text-white fill-white" />
                ) : (
                  <Play className="size-5 md:size-6 text-white fill-white ml-0.5" />
                )}
              </button>
              <button
                className="size-8 md:size-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                title="Skip forward"
              >
                <SkipForward className="size-4 md:size-5" />
              </button>
            </div>

            {/* Time Display */}
            <div className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[70px] md:min-w-[80px]">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
            </div>

            {/* Volume and Speed Controls - Desktop */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <button
                className="size-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                title="Volume"
              >
                <Volume2 className="size-5" />
              </button>
              <button
                onClick={() => {
                  const speeds = [1, 1.25, 1.5, 1.75, 2];
                  const currentIndex = speeds.indexOf(playbackSpeed);
                  const nextIndex = (currentIndex + 1) % speeds.length;
                  setPlaybackSpeed(speeds[nextIndex]);
                }}
                className="min-w-[48px] h-10 px-3 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300"
                title="Playback speed"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="w-full">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:bg-[#0066FF] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:bg-[#0066FF] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0066FF 0%, #0066FF ${(currentTime / duration) * 100}%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`
              }}
            />
          </div>

          {/* Mobile Volume and Speed Controls */}
          <div className="flex md:hidden items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="size-1.5 md:size-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Session Recording</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                title="Volume"
              >
                <Volume2 className="size-4" />
              </button>
              <button
                onClick={() => {
                  const speeds = [1, 1.25, 1.5, 1.75, 2];
                  const currentIndex = speeds.indexOf(playbackSpeed);
                  const nextIndex = (currentIndex + 1) % speeds.length;
                  setPlaybackSpeed(speeds[nextIndex]);
                }}
                className="min-w-[40px] h-8 px-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-xs font-semibold text-gray-700 dark:text-gray-300"
                title="Playback speed"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>
        </div>

        {/* Session Recording Label - Desktop */}
        <div className="hidden md:flex items-center gap-2 mt-4">
          <div className="size-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Session Recording</span>
        </div>
      </div>

      {/* Transcript Content - No Tabs */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
        {/* Transcript Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 md:gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                Session Transcript
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Full transcript of the recorded session
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyTranscript}
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-all font-medium text-sm text-gray-700 dark:text-gray-300 flex-1 sm:flex-initial"
              >
                {isCopied ? (
                  <>
                    <Check className="size-4" />
                    <span className="hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
              <div className="relative flex-1 sm:flex-initial">
                <button
                  onClick={() => setShowGenerateMenu(!showGenerateMenu)}
                  className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-lg transition-all font-semibold text-sm shadow-sm hover:shadow-md"
                >
                  <Sparkles className="size-4" />
                  <span className="hidden sm:inline">Generate with AI</span>
                  <span className="sm:hidden">Generate</span>
                </button>

                {/* Generate Menu Popup */}
                {showGenerateMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 top-full mt-2 w-[250px] md:w-[280px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {/* Session Notes Option */}
                    <button
                      onClick={() => {
                        setShowGenerateMenu(false);
                        navigate(`/sessions/session-1/notes/add`);
                      }}
                      className="w-full flex items-start gap-3 p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all border-b border-gray-100 dark:border-gray-700"
                    >
                      <div className="size-8 md:size-10 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="size-4 md:size-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm mb-0.5">
                          Session Notes
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
                          Generate clinical notes from transcript
                        </div>
                      </div>
                    </button>

                    {/* Prescription Option */}
                    <button
                      onClick={() => {
                        setShowGenerateMenu(false);
                        navigate(`/clients/1/prescriptions/create`);
                      }}
                      className="w-full flex items-start gap-3 p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                    >
                      <div className="size-8 md:size-10 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Pill className="size-4 md:size-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm mb-0.5">
                          Prescription
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
                          Generate prescription from transcript
                        </div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Content */}
        <div className="p-4 md:p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm leading-relaxed">
              {transcription.transcript.split("\n\n").map((paragraph, index) => (
                <div key={index}>
                  {formatTranscriptLine(paragraph)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Notes Modal */}
      {showGenerateNotesModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => !isGeneratingNotes && setShowGenerateNotesModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-center mb-5 md:mb-6">
                <div className="size-14 md:size-16 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="size-7 md:size-8 text-[#14B8A6]" />
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                Generate AI Notes
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-5 md:mb-6 text-center">
                Select a template to structure your session notes
              </p>

              {isGeneratingNotes ? (
                <div className="text-center py-6 md:py-8">
                  <div className="size-10 md:size-12 border-4 border-[#14B8A6] border-t-transparent rounded-full animate-spin mx-auto mb-4">
                  </div>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                    Generating notes...
                  </p>
                </div>
              ) : (
                <>
                  {/* Template Selection */}
                  <div className="mb-5 md:mb-6">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Choose Template
                    </label>

                    {/* Selected Template Display */}
                    <button
                      onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                      className="w-full flex items-center justify-between gap-3 p-2.5 md:p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`size-8 md:size-10 bg-gradient-to-br ${selectedTemplateData?.color} rounded-lg flex items-center justify-center text-lg md:text-xl flex-shrink-0`}>
                          {selectedTemplateData?.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                            {selectedTemplateData?.name}
                          </div>
                        </div>
                      </div>
                      {isTemplateDropdownOpen ? (
                        <ChevronUp className="size-4 md:size-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="size-4 md:size-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {/* Template Options Dropdown */}
                    {isTemplateDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg overflow-hidden"
                      >
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => {
                              setSelectedTemplate(template.id);
                              setIsTemplateDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 md:gap-3 p-2.5 md:p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                              selectedTemplate === template.id ? 'bg-teal-50 dark:bg-teal-900/10' : ''
                            }`}
                          >
                            <div className={`size-8 md:size-10 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center text-lg md:text-xl flex-shrink-0`}>
                              {template.icon}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                {template.name}
                              </div>
                              <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                                {template.description}
                              </div>
                            </div>
                            {selectedTemplate === template.id && (
                              <Check className="size-4 md:size-5 text-[#14B8A6] flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={() => setShowGenerateNotesModal(false)}
                      className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all font-semibold text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleGenerateNotes}
                      className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-[#14B8A6] hover:bg-[#0F9488] text-white rounded-xl transition-all font-semibold shadow-sm hover:shadow-md text-sm"
                    >
                      Generate
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}