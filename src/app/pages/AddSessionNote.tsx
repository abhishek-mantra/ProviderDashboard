import { useNavigate, useParams, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { useTranscriberPrefill, demoNoteData, demoTranscript } from "../hooks/useTranscriberPrefill";
import { ArrowLeft, FileText, ChevronDown, Sparkles, Loader2, Save, Zap, Check, User, ChevronLeft, ChevronRight } from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface SessionDate {
  id: string;
  date: string;
  displayDate: string;
}

const templates: TemplateOption[] = [
  { id: "basic", name: "Basic Template", description: "Simple session summary", icon: "📝" },
  { id: "soap", name: "SOAP Template", description: "Subjective, Objective, Assessment, Plan", icon: "🏥" },
  { id: "diagnosis", name: "Diagnosis and Treatment Objective", description: "Clinical diagnosis focus", icon: "🔬" },
  { id: "brief", name: "Brief Progress Note", description: "Quick progress update", icon: "📊" },
];

// Mock session dates
const sessionDates: SessionDate[] = [
  { id: "1", date: "2026-03-14", displayDate: "Mar 14th, 2026 - 08:21 PM" },
  { id: "2", date: "2026-02-10", displayDate: "Feb 10, 2026 - 10:00 AM" },
  { id: "3", date: "2026-01-15", displayDate: "Jan 15, 2026 - 02:30 PM" },
];

// Mock AI-generated content for different templates
const aiGeneratedContent: Record<string, Record<string, string>> = {
  "SOAP Template": {
    "Subjective": "Client reported feeling anxious about upcoming work presentation. Mentioned difficulty sleeping for the past 3 nights. Expressed concerns about maintaining work-life balance and feelings of being overwhelmed with current workload.",
    "Objective": "Client appeared restless, fidgeting with hands throughout session. Speech was rapid at times. Maintained good eye contact. Affect was anxious but appropriate to content discussed. No signs of acute distress.",
    "Assessment": "Client is experiencing increased anxiety related to work stressors. Sleep disturbance is impacting daily functioning. Client demonstrates good insight into triggers and is motivated for treatment. Symptoms consistent with adjustment disorder with anxiety.",
    "Plan": "Continue weekly therapy sessions. Taught progressive muscle relaxation technique. Assigned homework: practice relaxation 10 min daily before bed. Monitor sleep patterns using sleep diary. Follow up on coping strategies next session. Consider referral to psychiatry if symptoms worsen."
  },
  "Basic Template": {
    "Session Summary": "Today's session focused on cognitive behavioral therapy techniques for managing work-related anxiety. We reviewed the client's progress with mindfulness exercises and discussed strategies for handling stressful situations at work. The client demonstrated good engagement and receptiveness to interventions.",
    "Key Topics Discussed": "Work-related stress and anxiety, sleep hygiene and insomnia management, mindfulness practice techniques, breathing exercises for acute anxiety, setting healthy boundaries with colleagues, upcoming family event preparation and associated stressors.",
    "Next Session Goals": "Practice breathing exercises daily for at least 5 minutes. Implement boundary-setting conversation with manager regarding workload. Continue mindfulness practice 5-10 minutes per day. Track anxiety levels in journal using 1-10 scale. Review sleep diary and identify patterns."
  },
  "Diagnosis and Treatment Objective": {
    "Diagnosis": "Adjustment Disorder with Anxiety (F43.22). Client presents with excessive worry and anxiety related to recent work stressors. Symptoms include difficulty sleeping, restlessness, and difficulty concentrating. No history of previous mental health treatment.",
    "Treatment Objectives": "Short-term objectives: (1) Reduce anxiety symptoms by 50% within 4 weeks using standardized anxiety scales. (2) Improve sleep quality to 6-7 hours per night within 2 weeks. Long-term objectives: (1) Develop sustainable stress management strategies within 8 weeks. (2) Establish healthy work-life boundaries within 12 weeks.",
    "Interventions": "Cognitive Behavioral Therapy (CBT) for anxiety management. Progressive muscle relaxation training. Sleep hygiene education and implementation. Cognitive restructuring for anxious thoughts. Assertiveness training for workplace boundaries. Mindfulness-based stress reduction techniques."
  },
  "Brief Progress Note": {
    "Progress Update": "Client has shown moderate improvement since last session. Reports practicing relaxation techniques 4 out of 7 days this week. Sleep has improved slightly, averaging 5-6 hours per night (up from 3-4 hours). Client successfully implemented one boundary-setting conversation with colleague.",
    "Observations": "Client appeared less restless compared to previous session. Demonstrated improved ability to identify anxious thoughts. Showed enthusiasm when discussing successful boundary-setting experience. Acknowledged continued challenges with work-life balance but expressed optimism about progress.",
    "Recommendations": "Continue weekly therapy sessions for next 4-6 weeks. Increase relaxation practice to daily if possible. Consider incorporating brief mindfulness exercises during work breaks. Schedule follow-up boundary-setting conversation with manager next week. Monitor sleep patterns and anxiety levels."
  }
};

// Mock transcript data
const mockTranscript = `Dr. Smith: Good afternoon, Rachit. How have you been feeling since our last session?

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

Dr. Smith: You're welcome, Rachit. Remember, these are skills that take time to develop. Be patient with yourself.`;

// Mock AI noteworthy content
const mockAINotes = `**Session Overview**
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
Client demonstrates strong engagement and willingness to implement new coping strategies. High insight and motivation are positive indicators for treatment success.`;

export function AddSessionNote() {
  const navigate = useNavigate();
  const { id, sessionId } = useParams();
  const { canViewClientClinicalContent } = usePartnerDashboard();
  if (id && !canViewClientClinicalContent(id)) {
    return <div className="p-8 text-center text-gray-600 dark:text-gray-300">You do not have access to this client’s clinical notes.</div>;
  }
  const [searchParams] = useSearchParams();
  const { isFromTranscriber: isFromTranscriberHook } = useTranscriberPrefill();

  const isFromTranscriber = searchParams.get("source") === "transcriber" || isFromTranscriberHook;
  const hasTranscriptContext = !!sessionId || isFromTranscriber;

  const [selectedTemplate, setSelectedTemplate] = useState("SOAP Template");
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [isFillingWithAI, setIsFillingWithAI] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"transcript" | "noteworthy">("transcript");
  const [selectedSessionId, setSelectedSessionId] = useState("1");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  // Reset field values when template changes
  useEffect(() => {
    setFieldValues({});
  }, [selectedTemplate]);

  const handleFillWithAI = () => {
    if (!selectedTemplate) return;

    setIsFillingWithAI(true);

    setTimeout(() => {
      if (isFromTranscriber) {
        setFieldValues(demoNoteData);
      } else {
        const aiContent = aiGeneratedContent[selectedTemplate] || {};
        setFieldValues(aiContent);
      }
      setIsFillingWithAI(false);
    }, 1500);
  };

  // Check if fields are already filled
  const isFieldsFilled = () => {
    return Object.keys(fieldValues).length > 0;
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:fixed md:inset-0 md:left-[64px] md:flex">
      {/* Main Content Area */}
      <div 
        className={`flex-1 md:overflow-auto md:transition-all md:duration-300 ${
          isRightSidebarOpen ? 'md:mr-[400px]' : 'md:mr-0'
        }`}
      >
        <div className="p-3 md:p-6 max-w-[900px] mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl transition-colors mb-4 md:mb-6"
          >
            <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="size-10 md:size-14 bg-gradient-to-br from-[#00c0ff] to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <FileText className="size-5 md:size-7 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                    Session Note
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Document your session using AI assistance
                  </p>
                </div>
              </div>

              {/* Template Selector */}
              <div className="relative w-full md:w-72">
                <button
                  onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl text-left flex items-center justify-between hover:border-[#00c0ff] dark:hover:border-[#00c0ff] transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-xl">{templates.find(t => t.name === selectedTemplate)?.icon}</span>
                    <span className="text-gray-900 dark:text-white text-xs md:text-sm font-semibold truncate">
                      {selectedTemplate}
                    </span>
                  </div>
                  <ChevronDown className={`size-3.5 md:size-4 text-gray-400 transition-transform flex-shrink-0 ${showTemplateDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showTemplateDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setShowTemplateDropdown(false)}
                    />
                    <div className="absolute z-20 top-full right-0 left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => {
                            setSelectedTemplate(template.name);
                            setShowTemplateDropdown(false);
                          }}
                          className={`w-full px-3 md:px-4 py-3 md:py-3.5 text-left hover:bg-[#f3faff] dark:hover:bg-blue-900/20 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                            selectedTemplate === template.name ? "bg-[#f3faff] dark:bg-blue-900/20" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-xl md:text-2xl flex-shrink-0">{template.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs md:text-sm font-bold text-gray-900 dark:text-white truncate">
                                {template.name}
                              </div>
                              <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 truncate">
                                {template.description}
                              </div>
                            </div>
                            {selectedTemplate === template.name && (
                              <Check className="size-3.5 md:size-4 text-[#00c0ff] flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="space-y-4 md:space-y-6">
              {selectedTemplate === "SOAP Template" && (
                <>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Subjective
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Client's description of their symptoms, feelings, and concerns..."
                      value={fieldValues["Subjective"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Subjective": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Objective
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Observable data, measurements, and clinical observations..."
                      value={fieldValues["Objective"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Objective": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Assessment
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Clinical interpretation and diagnosis..."
                      value={fieldValues["Assessment"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Assessment": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Plan
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Treatment plan and next steps..."
                      value={fieldValues["Plan"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Plan": e.target.value })}
                    />
                  </div>
                </>
              )}

              {selectedTemplate === "Basic Template" && (
                <>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Session Summary
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Provide a brief summary of the session..."
                      value={fieldValues["Session Summary"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Session Summary": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Key Topics Discussed
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="List the main topics covered during the session..."
                      value={fieldValues["Key Topics Discussed"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Key Topics Discussed": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Next Session Goals
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Goals and action items for the next session..."
                      value={fieldValues["Next Session Goals"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Next Session Goals": e.target.value })}
                    />
                  </div>
                </>
              )}

              {selectedTemplate === "Diagnosis and Treatment Objective" && (
                <>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Diagnosis
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Clinical diagnosis and assessment..."
                      value={fieldValues["Diagnosis"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Diagnosis": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Treatment Objectives
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Short-term and long-term treatment objectives..."
                      value={fieldValues["Treatment Objectives"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Treatment Objectives": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Interventions
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Therapeutic interventions and techniques used..."
                      value={fieldValues["Interventions"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Interventions": e.target.value })}
                    />
                  </div>
                </>
              )}

              {selectedTemplate === "Brief Progress Note" && (
                <>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Progress Update
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Client's progress since last session..."
                      value={fieldValues["Progress Update"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Progress Update": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Observations
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Clinical observations and notable behaviors..."
                      value={fieldValues["Observations"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Observations": e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      <div className="size-1.5 md:size-2 bg-[#00c0ff] rounded-full"></div>
                      Recommendations
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3.5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-750 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent text-sm md:text-base text-gray-900 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Recommendations for continued treatment..."
                      value={fieldValues["Recommendations"] || ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, "Recommendations": e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 md:gap-3 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl text-sm md:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-bold order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate(`/clients/${id}/notes`)}
                  className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#043570] hover:bg-[#032554] text-white rounded-lg md:rounded-xl transition-all font-bold shadow-sm hover:shadow-md text-sm md:text-base order-1 sm:order-2"
                >
                  <Save className="size-4" />
                  Save Note
                </button>
              </div>
            </div>
          </div>

          {/* Mobile-Only AI Button */}
          <div className="md:hidden fixed bottom-4 right-4 z-50">
            <button
              onClick={handleFillWithAI}
              disabled={isFillingWithAI}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-full transition-all font-bold shadow-lg hover:shadow-xl"
            >
              {isFillingWithAI ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span className="text-sm">Generating...</span>
                </>
              ) : isFieldsFilled() ? (
                <>
                  <Sparkles className="size-5" />
                  <span className="text-sm">Regenerate with AI</span>
                </>
              ) : (
                <>
                  <Zap className="size-5" />
                  <span className="text-sm">Fill with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Desktop Only */}
      <div
        className={`hidden md:block fixed top-0 right-0 bottom-0 w-[400px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 ${
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

        {/* Sidebar Content - Always show transcript panel */}
        <div className="h-full flex flex-col">
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
        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {/* If no session context, show empty state instead of transcript/noteworthy content */}
          {!hasTranscriptContext ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">No transcript available</p>
              <button
                onClick={() => navigate(`/clients/${id}/notes`)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Add Transcript
              </button>
            </div>
          ) : (
            <>
              {activeTab === "transcript" && (
                <div className="space-y-3">
                  {(isFromTranscriber ? demoTranscript.content : mockTranscript).split(isFromTranscriber ? '\n' : '\n\n').map((paragraph, index) => {
                    const isDrSmith = paragraph.startsWith('Dr. Smith:') || paragraph.startsWith('Therapist:');
                    const isRachit = paragraph.startsWith('Rachit:') || paragraph.startsWith('Client:');

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
                  })}
                </div>
              )}

              {activeTab === "noteworthy" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Sparkles className="size-5 text-[#00c0ff]" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      AI-Generated Summary
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {mockAINotes.split('\n').map((line, index) => {
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
                </div>
              )}
            </>
          )}
        </div>

        {/* Fixed AI Fill / Regenerate Button at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleFillWithAI}
            disabled={isFillingWithAI || (!hasTranscriptContext && !isFromTranscriber)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00c0ff] hover:bg-[#00a8e6] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isFillingWithAI ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : isFieldsFilled() ? (
              <>
                <Sparkles className="size-5" />
                <span>Regenerate with AI</span>
              </>
            ) : (
              <>
                <Sparkles className="size-5" />
                <span>Fill with AI</span>
              </>
            )}
          </button>
        </div>
        </div>
      </div>

    </div>
  );
}
