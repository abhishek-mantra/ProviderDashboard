import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ArrowLeft, Calendar, Clock, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { RichTextEditor } from "../components/RichTextEditor";

export function ViewTranscriptionNote() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transcriptionId, noteId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  
  // Get note data from localStorage (in real app, fetch from API)
  const getNote = () => {
    try {
      const savedNotes = localStorage.getItem(`transcription_${transcriptionId}_notes`);
      if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        return notes.find((n: any) => n.id === noteId);
      }
    } catch (error) {
      console.error("Error loading note:", error);
    }
    
    // Fallback mock note data
    return {
      id: noteId,
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
    };
  };

  const note = getNote();
  const [noteContent, setNoteContent] = useState(note.content);

  // Mock transcript data
  const transcript = `[00:00:12] Therapist: Good morning, Sarah. How have you been since our last session?

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

[00:02:28] Therapist: Absolutely, and we'll work on that together. One technique I'd like to introduce is called grounding. It can be particularly helpful in social settings...`;

  const handleSaveNotes = () => {
    // Save notes logic here
    setIsEditing(false);
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
        <p key={line} className="text-gray-700 dark:text-gray-300 mb-3">
          <span className="text-gray-500 dark:text-gray-500">{timestamp}</span>{" "}
          <span className={`font-semibold ${isTherapist ? 'text-[#14B8A6]' : 'text-[#2563EB]'}`}>
            {speaker}:
          </span>{" "}
          {text}
        </p>
      );
    }
    
    return <p key={line} className="text-gray-700 dark:text-gray-300 mb-3">{line}</p>;
  };

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] dark:bg-gray-900 flex">
      {/* Main Content Area */}
      <div 
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isRightSidebarOpen ? 'mr-[400px]' : 'mr-0'
        }`}
      >
        <div className="max-w-[900px] mx-auto p-8">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate(location.pathname.includes('/view-transcript/') ? `/view-transcript/${transcriptionId}` : `/view-transcription/${transcriptionId}`)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#14B8A6] dark:hover:text-[#14B8A6] transition-colors mb-6 font-medium"
            >
              <ArrowLeft className="size-4" />
              Back to Transcription
            </button>

            {/* Note Header Card */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {note.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-4" />
                      <span>{note.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-4" />
                      <span>{note.time}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-all font-medium text-sm text-gray-700 dark:text-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNotes}
                        className="flex items-center gap-2 px-4 py-2 bg-[#14B8A6] hover:bg-[#0F9488] text-white rounded-lg transition-all font-semibold text-sm shadow-sm hover:shadow-md"
                      >
                        <Save className="size-4" />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-[#14B8A6] hover:bg-[#0F9488] text-white rounded-lg transition-all font-semibold text-sm shadow-sm hover:shadow-md"
                    >
                      Edit Notes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Note Content */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            {isEditing ? (
              <RichTextEditor
                value={noteContent}
                onChange={setNoteContent}
                placeholder="Start editing your notes..."
              />
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {noteContent}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Transcript */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[400px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 ${
          isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-md"
          title={isRightSidebarOpen ? "Hide Transcript" : "Show Transcript"}
        >
          {isRightSidebarOpen ? (
            <ChevronRight className="size-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="size-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Sidebar Content */}
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Session Transcript
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reference the full conversation
            </p>
          </div>

          {/* Transcript Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-1 font-mono text-xs leading-relaxed">
              {transcript.split("\n\n").map((paragraph, index) => (
                <div key={index}>
                  {formatTranscriptLine(paragraph)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}