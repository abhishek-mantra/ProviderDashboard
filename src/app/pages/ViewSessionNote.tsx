import { useNavigate, useParams } from "react-router";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { ArrowLeft, FileText, Calendar, Clock, Edit2, ChevronDown, User, Sparkles } from "lucide-react";
import { useState } from "react";

interface NoteField {
  label: string;
  value: string;
}

interface SessionDate {
  id: string;
  date: string;
  displayDate: string;
}

// Mock session dates
const sessionDates: SessionDate[] = [
  { id: "1", date: "2026-03-14", displayDate: "Mar 14th, 2026 - 08:21 PM" },
  { id: "2", date: "2026-02-10", displayDate: "Feb 10, 2026 - 10:00 AM" },
  { id: "3", date: "2026-01-15", displayDate: "Jan 15, 2026 - 02:30 PM" },
];

// Mock data - in a real app this would come from an API
const mockNotes: Record<string, {
  id: string;
  clientName: string;
  sessionDate: string;
  sessionTime: string;
  duration: string;
  service: string;
  templateName: string;
  fields: NoteField[];
  transcript?: string;
  aiNotes?: string;
}> = {
  "1": {
    id: "1",
    clientName: "Rachit",
    sessionDate: "Mar 14th, 2026",
    sessionTime: "08:21 PM",
    duration: "45 min",
    service: "Therapy",
    templateName: "SOAP Client Session Notes",
    fields: [
      {
        label: "Subjective",
        value: "Client reported feeling anxious about upcoming work presentation. Mentioned difficulty sleeping for the past 3 nights. Expressed concerns about maintaining work-life balance."
      },
      {
        label: "Objective",
        value: "Client appeared restless, fidgeting with hands throughout session. Speech was rapid at times. Maintained good eye contact. Affect was anxious but appropriate."
      },
      {
        label: "Assessment",
        value: "Client is experiencing increased anxiety related to work stressors. Sleep disturbance is impacting daily functioning. Client demonstrates good insight into triggers and is motivated for treatment."
      },
      {
        label: "Plan",
        value: "Continue weekly therapy sessions. Taught progressive muscle relaxation technique. Assigned homework: practice relaxation 10 min daily before bed. Monitor sleep patterns. Follow up on coping strategies next session."
      }
    ],
    transcript: `Dr. Smith: Good afternoon, Rachit. How have you been feeling since our last session?

Rachit: Hi Dr. Smith. I've been okay, but work has been really overwhelming lately. The stress just keeps building up.

Dr. Smith: I understand. Can you tell me more about what's been causing the most stress at work?

Rachit: Well, I have multiple deadlines coming up, and I feel like I'm constantly falling behind. Even when I complete something, there's always something new waiting. It's exhausting.

Dr. Smith: That does sound challenging. Have you noticed any physical symptoms alongside these feelings?

Rachit: Yes, actually. I've been having trouble sleeping, and I get these tension headaches pretty often now. Sometimes my chest feels tight when I think about all the work I need to do.

Dr. Smith: Those are common physical manifestations of stress and anxiety. Let's talk about some coping strategies that might help you manage these feelings. Have you tried any relaxation techniques before?

Rachit: I've tried deep breathing a few times, but I find it hard to stick with it consistently.

Dr. Smith: That's very common. Consistency is key with these techniques. Let's discuss a structured approach. First, I'd recommend practicing progressive muscle relaxation for just 5-10 minutes each day. Would mornings or evenings work better for you?

Rachit: Probably evenings, after I finish work.

Dr. Smith: Perfect. In addition to that, I'd like you to try the "5-4-3-2-1" grounding technique when you notice anxiety symptoms starting. Can I walk you through that?

Rachit: Yes, please.

Dr. Smith: When you feel anxious, pause and identify: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps bring your focus back to the present moment.

Rachit: That makes sense. I think I can try that.

Dr. Smith: Excellent. Another important strategy is setting boundaries with work. Have you considered establishing a specific "end time" for your workday?

Rachit: Not really. I usually just work until things are done, which sometimes means working late into the evening.

Dr. Smith: I understand the pressure, but having clear boundaries can actually improve your productivity. What if you set a goal to stop working by 7 PM on weekdays?

Rachit: That might be difficult, but I could try.

Dr. Smith: Start small. Even three days a week would be progress. Also, I'd like you to schedule brief breaks during your workday. Even 5 minutes every hour can help reset your stress levels.

Rachit: I think I could do that. Maybe set reminders on my phone?

Dr. Smith: That's a great idea. Now, let's talk about reframing some of your thoughts about work. When you think "I'm always falling behind," how does that make you feel?

Rachit: It makes me feel like a failure, honestly. Like I'm not good enough.

Dr. Smith: I appreciate you sharing that. What if we tried reframing that thought? Instead of "I'm always falling behind," could you say "I'm working through my tasks at my own pace"?

Rachit: I suppose that's more accurate. I am getting things done, just maybe not as fast as I'd like.

Dr. Smith: Exactly. Being kinder to yourself can reduce anxiety significantly. Remember, perfection isn't the goal – progress is.

Rachit: That's helpful to hear. I tend to be really hard on myself.

Dr. Smith: Many people with anxiety do. This week, I'd like you to practice these coping strategies: evening relaxation, the grounding technique when needed, work boundaries, regular breaks, and thought reframing. We'll check in next week on how they're working for you.

Rachit: Okay, I'll give them all a try. Thank you, Dr. Smith.

Dr. Smith: You're welcome, Rachit. Remember, these are skills that take time to develop. Be patient with yourself.`,
    aiNotes: `**Session Overview**
This session focused on addressing work-related stress and anxiety with evidence-based coping strategies.

**Key Discussion Points**
• Client experiencing overwhelming stress from multiple work deadlines
• Physical symptoms: sleep difficulties, tension headaches, chest tightness
• Difficulty maintaining work-life boundaries
• Previous attempts at deep breathing not sustained

**Interventions Introduced**
1. **Progressive Muscle Relaxation**
   - Recommended 5-10 minutes daily practice
   - Client chose evening timing post-work

2. **5-4-3-2-1 Grounding Technique**
   - Taught for acute anxiety management
   - Involves identifying: 5 things seen, 4 touched, 3 heard, 2 smelled, 1 tasted

3. **Work Boundary Setting**
   - Discussed establishing 7 PM work cutoff on weekdays
   - Start with 3 days/week for gradual implementation

4. **Regular Break Scheduling**
   - Recommended 5-minute breaks every hour
   - Client to use phone reminders

5. **Cognitive Reframing**
   - Addressed "always falling behind" thoughts
   - Reframed as "working through tasks at my own pace"
   - Emphasized progress over perfection

**Clinical Observations**
• Client showed restlessness and fidgeting
• Speech pattern: rapid at times
• Eye contact: maintained appropriately
• Affect: anxious but appropriate
• Insight level: good
• Motivation: high

**Client Self-Perception Issues**
• Feelings of failure when not meeting self-imposed standards
• Tendency toward self-criticism
• Perfectionist thinking patterns

**Treatment Plan**
• Continue weekly therapy sessions
• Client homework: practice all 5 introduced strategies throughout week
• Monitor sleep patterns
• Follow-up assessment next session on strategy effectiveness

**Prognosis Notes**
Client demonstrates strong engagement and willingness to implement new coping strategies. High insight and motivation are positive indicators for treatment success.`
  },
  "2": {
    id: "2",
    clientName: "Rachit",
    sessionDate: "Feb 10, 2026",
    sessionTime: "10:00 AM",
    duration: "30 min",
    service: "Therapy",
    templateName: "Basic Template",
    fields: [
      {
        label: "Session Summary",
        value: "Today's session focused on cognitive behavioral therapy techniques for managing anxiety. We reviewed the client's progress with mindfulness exercises and discussed strategies for handling stressful situations at work."
      },
      {
        label: "Key Topics Discussed",
        value: "Work-related stress, mindfulness practice, breathing exercises, setting boundaries with colleagues, upcoming family event preparation."
      },
      {
        label: "Next Session Goals",
        value: "Practice breathing exercises daily. Implement boundary-setting conversation with manager. Continue mindfulness practice 5-10 minutes per day. Track anxiety levels in journal."
      }
    ],
    transcript: `Dr. Smith: Good morning, Rachit. Thank you for coming in today. How are you feeling?

Rachit: Honestly, I've been feeling really overwhelmed lately. Everything just seems like too much.

Dr. Smith: I'm sorry to hear that. Can you help me understand what "too much" looks like for you right now?

Rachit: It's like... I wake up and immediately feel this heavy weight on my chest. I don't even want to check my emails or messages because I know there will be more things I need to handle.

Dr. Smith: That sounds very difficult. When did you first start noticing these feelings of overwhelm?

Rachit: Probably about a month ago. It started gradually but has gotten worse over the past few weeks.

Dr. Smith: Have there been any significant changes or events in your life recently?

Rachit: Not really anything major. Just the usual work stress, I guess. But it feels different this time – more intense.

Dr. Smith: I'd like to explore something with you, if that's okay. Sometimes our present feelings can be connected to experiences from our past. Have you ever felt this way before in your life?

Rachit: [pauses] Actually, yes. This reminds me of when I was in college. I had a period where everything felt overwhelming and I struggled to keep up with my responsibilities.

Dr. Smith: Thank you for sharing that. What was happening during that time in college?

Rachit: My father had health issues, and I was trying to balance taking care of my family while also keeping up with my studies. I felt like I was failing at everything.

Dr. Smith: That must have been incredibly stressful. How did you cope with those feelings back then?

Rachit: I mostly just pushed through it. I didn't really talk to anyone about how I was feeling. I just tried to stay busy and keep moving forward.

Dr. Smith: It sounds like you developed a pattern of managing stress by pushing yourself harder rather than addressing the underlying feelings. Does that resonate with you?

Rachit: Yes, that makes sense. I've always been someone who just keeps going, no matter what.

Dr. Smith: That shows tremendous resilience, Rachit. But sometimes our coping mechanisms from the past don't serve us well in the present. Pushing through without processing your emotions can lead to burnout and overwhelm.

Rachit: I never thought about it that way.

Dr. Smith: When you were in college dealing with your father's health issues, did you feel you had permission to struggle? Or did you feel you had to be strong for everyone?

Rachit: [emotional] I had to be strong. My mother was already so worried, and my siblings were younger. I felt like I couldn't add to their stress by showing my own.

Dr. Smith: That's a heavy burden for anyone to carry, especially at a young age. It's understandable that you learned to suppress your feelings.

Rachit: I never really thought about how that might still affect me now.

Dr. Smith: Our early experiences with stress and trauma can create patterns that persist into adulthood. The good news is that we can learn new, healthier ways of coping. You don't have to carry everything alone anymore.

Rachit: That would be nice. I'm tired of feeling like this.

Dr. Smith: I want you to know that what you're experiencing is a valid response to prolonged stress. It's not a weakness to feel overwhelmed. In fact, acknowledging these feelings is the first step toward healing.

Rachit: Thank you for saying that.

Dr. Smith: For our work together, I'd like to focus on two things: First, helping you develop new coping strategies that don't involve pushing through. And second, exploring and processing some of these past experiences that may be influencing your current responses to stress.

Rachit: Okay, I'm willing to try.

Dr. Smith: Excellent. Between now and our next session, I'd like you to keep a simple journal. When you notice feelings of overwhelm, just jot down what's happening and any thoughts or memories that come up. No need to analyze it – just observe and record.

Rachit: I can do that.

Dr. Smith: We're going to work through this together, Rachit. You've already taken an important step by being here today and being open about your feelings.`,
    aiNotes: `**Session Overview**
Exploratory session addressing feelings of overwhelm and identifying historical patterns contributing to current stress responses.

**Presenting Concerns**
• Intense feelings of overwhelm - morning chest heaviness
• Avoidance of emails/messages due to anticipated demands
• Gradual onset approximately 1 month ago, worsening recently
• No major life changes identified initially

**Historical Context Revealed**
• Similar overwhelming feelings during college period
• Father's health crisis during college years
• Dual responsibilities: family caregiving + academic demands
• Pattern of self-reliance without seeking support

**Identified Coping Pattern**
**Maladaptive Strategy:** "Pushing Through"
- Suppression of emotional needs
- Avoiding vulnerability/help-seeking
- Continuous forward momentum without processing
- Learned response from family role expectations

**Family Dynamics Impact**
• Felt obligated to be "strong one" for family
• Mother's worry + younger siblings = pressure to suppress own struggles
• No perceived permission to show vulnerability
• Carried emotional burden alone at young age

**Clinical Insight Developed**
• Recognition that college-era coping mechanisms persist
• Understanding that pushing through leads to burnout
• Acknowledgment that past doesn't serve present
• Validation that overwhelm is normal stress response, not weakness

**Therapeutic Approach**
**Two-Pronged Focus:**
1. Develop healthier coping strategies (alternatives to "pushing through")
2. Process past experiences influencing current stress patterns

**Homework Assignment**
• Keep simple journal
• Record overwhelming moments
• Note associated thoughts/memories
• Observation only - no analysis required

**Client Engagement**
• Demonstrated vulnerability sharing family history
• Showed emotional response (positive sign of accessing feelings)
• Expressed willingness to try new approaches
• Recognized value in professional support

**Therapeutic Alliance**
Strong rapport building evident. Client shows:
- Openness to exploration
- Emotional accessibility
- Motivation for change
- Trust in therapeutic process

**Next Steps**
• Review journal entries
• Continue exploring historical patterns
• Begin introducing alternative coping strategies
• Process emotions related to family dynamics`
  }
};

export function ViewSessionNote() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { canViewClientClinicalContent } = usePartnerDashboard();
  const [activeTab, setActiveTab] = useState<"transcript" | "noteworthy">("transcript");
  const [selectedSessionId, setSelectedSessionId] = useState("1");
  
  const note = noteId ? mockNotes[noteId] : null;
  const noteClientId = noteId === "1" || noteId === "3" ? "1" : noteId === "2" ? "2" : "3";
  const selectedSession = sessionDates.find(s => s.id === selectedSessionId);

  if (!note || !canViewClientClinicalContent(noteClientId)) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-900 dark:text-white font-medium mb-1">
          Note not found
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#4169E1] hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleEdit = () => {
    // Navigate to edit page - would need to be implemented
    navigate(-1);
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:fixed md:inset-0 md:left-[64px] md:flex">
      {/* Main Content Area */}
      <div className="flex-1 md:overflow-auto">
        <div className="p-3 md:p-6 max-w-[900px] mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-4 md:mb-6">
            <div className="flex items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <button
                  onClick={() => navigate(-1)}
                  className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                >
                  <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
                </button>
                <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                  <div className="size-7 md:size-8 bg-[#4169E1] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="size-4 md:size-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white truncate">
                      Session Note
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
                      {note.templateName}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                <Edit2 className="size-3.5 md:size-4" />
                <span className="font-medium text-xs md:text-sm hidden sm:inline">Edit Note</span>
                <span className="font-medium text-xs md:text-sm sm:hidden">Edit</span>
              </button>
            </div>

            {/* Session Info */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <div className="bg-gray-50 dark:bg-gray-750 rounded-full px-3 md:px-5 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                <div className="size-6 md:size-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="size-3 md:size-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">DATE & TIME</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                    {note.sessionDate} • {note.sessionTime}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-750 rounded-full px-3 md:px-5 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                <div className="size-6 md:size-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="size-3 md:size-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">DURATION</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">{note.duration}</div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-750 rounded-full px-3 md:px-5 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                <div className="size-6 md:size-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="size-3 md:size-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">SERVICE</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">{note.service}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Note Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="size-8 md:size-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="size-4 md:size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                  Session Notes
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Detailed notes from the session
                </p>
              </div>
            </div>

            {/* Note Fields */}
            <div className="space-y-4 md:space-y-6">
              {note.fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    {field.label}
                  </label>
                  <div className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm md:text-base text-gray-900 dark:text-white leading-relaxed">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Transcript/AI Notes Section */}
          <div className="mt-4 md:hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Session Selector */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                SELECT SESSION
              </label>
              <div className="relative">
                <select
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white appearance-none cursor-pointer pr-8 font-medium"
                >
                  {sessionDates.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.displayDate}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`relative flex-1 px-3 py-2.5 font-semibold text-sm transition-colors ${
                    activeTab === "transcript"
                      ? "text-[#00c0ff]"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Transcript
                  {activeTab === "transcript" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("noteworthy")}
                  className={`relative flex-1 px-3 py-2.5 font-semibold text-sm transition-colors ${
                    activeTab === "noteworthy"
                      ? "text-[#00c0ff]"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Noteworthy
                  {activeTab === "noteworthy" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-3 max-h-[500px] overflow-y-auto">
              {activeTab === "transcript" && (
                <div className="space-y-3">
                  {note.transcript ? (
                    note.transcript.split('\n\n').map((paragraph, index) => {
                      const isDrSmith = paragraph.startsWith('Dr. Smith:');
                      const isRachit = paragraph.startsWith('Rachit:');
                      
                      if (isDrSmith || isRachit) {
                        const [speaker, ...textParts] = paragraph.split(':');
                        const text = textParts.join(':').trim();
                        
                        return (
                          <div key={index} className="mb-3">
                            <div className="flex items-start gap-1.5 mb-1">
                              <div className={`size-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isDrSmith ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'
                              }`}>
                                <User className={`size-2.5 ${isDrSmith ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`} />
                              </div>
                              <span className={`text-xs font-bold ${isDrSmith ? 'text-[#2563EB]' : 'text-[#043570]'}`}>
                                {speaker}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pl-6">
                              {text}
                            </p>
                          </div>
                        );
                      }
                      
                      return (
                        <p key={index} className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                          {paragraph}
                        </p>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                      <FileText className="size-10 mb-2 opacity-30" />
                      <p className="text-xs">No transcript available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "noteworthy" && (
                <div className="space-y-3">
                  {note.aiNotes ? (
                    <>
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                        <Sparkles className="size-4 text-[#00c0ff]" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          AI-Generated Summary
                        </span>
                      </div>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {note.aiNotes.split('\n').map((line, index) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return (
                              <h3 key={index} className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-1.5">
                                {line.replace(/\*\*/g, '')}
                              </h3>
                            );
                          } else if (line.startsWith('•')) {
                            return (
                              <p key={index} className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed ml-3 mb-1">
                                {line}
                              </p>
                            );
                          } else if (line.trim() === '') {
                            return <div key={index} className="h-1"></div>;
                          } else {
                            return (
                              <p key={index} className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-1.5">
                                {line}
                              </p>
                            );
                          }
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                      <Sparkles className="size-10 mb-2 opacity-30" />
                      <p className="text-xs">No AI notes available</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Desktop Only */}
      <div className="hidden md:block w-[400px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-col h-screen overflow-hidden">
        {/* Session Selector Dropdown */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            SELECT SESSION
          </label>
          <div className="relative">
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white appearance-none cursor-pointer pr-10 font-medium"
            >
              {sessionDates.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.displayDate}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab("transcript")}
              className={`relative flex-1 px-4 py-3 font-semibold transition-colors ${
                activeTab === "transcript"
                  ? "text-[#00c0ff]"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Transcript
              {activeTab === "transcript" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("noteworthy")}
              className={`relative flex-1 px-4 py-3 font-semibold transition-colors ${
                activeTab === "noteworthy"
                  ? "text-[#00c0ff]"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Noteworthy
              {activeTab === "noteworthy" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "transcript" && (
            <div className="space-y-3">
              {note.transcript ? (
                note.transcript.split('\n\n').map((paragraph, index) => {
                  const isDrSmith = paragraph.startsWith('Dr. Smith:');
                  const isRachit = paragraph.startsWith('Rachit:');
                  
                  if (isDrSmith || isRachit) {
                    const [speaker, ...textParts] = paragraph.split(':');
                    const text = textParts.join(':').trim();
                    
                    return (
                      <div key={index} className="mb-4">
                        <div className="flex items-start gap-2 mb-1">
                          <div className={`size-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDrSmith ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'
                          }`}>
                            <User className={`size-3 ${isDrSmith ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`} />
                          </div>
                          <span className={`text-sm font-bold ${isDrSmith ? 'text-[#2563EB]' : 'text-[#043570]'}`}>
                            {speaker}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-8">
                          {text}
                        </p>
                      </div>
                    );
                  }
                  
                  return (
                    <p key={index} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                  <FileText className="size-12 mb-3 opacity-30" />
                  <p className="text-sm">No transcript available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "noteworthy" && (
            <div className="space-y-4">
              {note.aiNotes ? (
                <>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Sparkles className="size-5 text-[#00c0ff]" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      AI-Generated Summary
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {note.aiNotes.split('\n').map((line, index) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <h3 key={index} className="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">
                            {line.replace(/\*\*/g, '')}
                          </h3>
                        );
                      } else if (line.startsWith('•')) {
                        return (
                          <p key={index} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed ml-4 mb-1">
                            {line}
                          </p>
                        );
                      } else if (line.trim() === '') {
                        return <div key={index} className="h-2"></div>;
                      } else {
                        return (
                          <p key={index} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                            {line}
                          </p>
                        );
                      }
                    })}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                  <Sparkles className="size-12 mb-3 opacity-30" />
                  <p className="text-sm">No AI notes available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
