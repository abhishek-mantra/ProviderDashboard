import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  category: "overview" | "clinical" | "billing" | "intake" | "scheduling";
  thumbnail: string;
  description: string;
  speaker: string;
  speakerRole: string;
  chapters: { title: string; time: string; seconds: number }[];
  takeaways: string[];
  actionLabel: string;
  actionRoute: string;
}

export const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: "tour-overview",
    title: "MantraCare EHR Platform Orientation",
    duration: "2m 34s",
    durationSeconds: 154,
    category: "overview",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    description: "A fast-paced clinical overview of the unified workspace: caseload management, schedule coordination, and AI documentation.",
    speaker: "Dr. Sarah Jenkins, MD",
    speakerRole: "Chief Medical Officer",
    chapters: [
      { title: "Dashboard & Action Center Overview", time: "00:00", seconds: 0 },
      { title: "Patient Caseload & Roster Access", time: "00:45", seconds: 45 },
      { title: "One-Click Telehealth & Scheduling", time: "01:20", seconds: 80 },
      { title: "Compliance & Secure Communications", time: "02:00", seconds: 120 },
    ],
    takeaways: [
      "Navigate between clinician, supervisor, and front-desk workflows instantly.",
      "Access pending client requests and direct messaging from a single hub.",
      "Sync Google Meet, Zoom, or built-in HIPAA video rooms effortlessly."
    ],
    actionLabel: "Explore Clinical Workspace",
    actionRoute: "/clients"
  },
  {
    id: "ai-transcriber",
    title: "Real-Time AI Scribe & SOAP Note Generation",
    duration: "3m 15s",
    durationSeconds: 195,
    category: "clinical",
    thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    description: "Learn how the ambient AI Scribe captures online and in-person sessions, generating structured SOAP, DAP, or BIRP notes in seconds.",
    speaker: "Dr. Alex Vance, PhD",
    speakerRole: "Clinical Informatics Director",
    chapters: [
      { title: "Launching an Ambient Recording Session", time: "00:00", seconds: 0 },
      { title: "Real-time Medical Transcription & Filtering", time: "00:50", seconds: 50 },
      { title: "Structuring SOAP, DAP & BIRP Sections", time: "01:40", seconds: 100 },
      { title: "Review, E-Signature & EHR Lock", time: "02:30", seconds: 150 },
    ],
    takeaways: [
      "Ambient listening filters background noise and preserves clinical terminology.",
      "Notes are automatically structured into Subjective, Objective, Assessment, and Plan.",
      "Save an estimated 2 to 3 hours of administrative charting per day."
    ],
    actionLabel: "Try AI Transcriber Demo",
    actionRoute: "/ai-transcriber"
  },
  {
    id: "intake-consents",
    title: "Custom Intake Questionnaires & Clinical Consents",
    duration: "2m 45s",
    durationSeconds: 165,
    category: "intake",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    description: "Configure automated intake packages, standardized PHQ-9 / GAD-7 screeners, and electronic signature workflows.",
    speaker: "Elena Rostova",
    speakerRole: "Practice Operations Lead",
    chapters: [
      { title: "Building Intake Form Templates", time: "00:00", seconds: 0 },
      { title: "Standardized Mental Health Screeners", time: "00:55", seconds: 55 },
      { title: "Automated Patient Portal Invitations", time: "01:35", seconds: 95 },
      { title: "Reviewing Submitted Responses", time: "02:15", seconds: 135 },
    ],
    takeaways: [
      "Send secure, mobile-friendly forms to patients prior to the first visit.",
      "Responses automatically populate client chart demographics and baseline scores.",
      "Built-in HIPAA consent templates ensure compliance across all jurisdictions."
    ],
    actionLabel: "Manage Intake Forms",
    actionRoute: "/intake-forms"
  },
  {
    id: "billing-superbills",
    title: "Superbills, CMS-1500 & Revenue Cycle Management",
    duration: "4m 10s",
    durationSeconds: 250,
    category: "billing",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    description: "Master patient invoicing, automated superbill generation with CPT codes, and electronic CMS-1500 claim dispatch.",
    speaker: "Marcus Sterling",
    speakerRole: "Head of Revenue Cycle",
    chapters: [
      { title: "Setting Up Fee Schedules & CPT Defaults", time: "00:00", seconds: 0 },
      { title: "Generating 1-Click Patient Superbills", time: "01:10", seconds: 70 },
      { title: "CMS-1500 Clean Claim Scrubbing", time: "02:20", seconds: 140 },
      { title: "Tracking Remittances & Co-pays", time: "03:15", seconds: 195 },
    ],
    takeaways: [
      "Automatic conversion of completed session notes into itemized invoices.",
      "Integrated claim scrubbing minimizes insurance rejections and delays.",
      "Direct card processing and automated patient receipts reduce AR days."
    ],
    actionLabel: "View Billing & Claims",
    actionRoute: "/billing"
  },
  {
    id: "scheduling-telehealth",
    title: "Telehealth Rooms & Calendar Synchronization",
    duration: "1m 49s",
    durationSeconds: 109,
    category: "scheduling",
    thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    description: "Coordinate recurring visits, configure time buffers, and connect Google Calendar or Outlook.",
    speaker: "Dr. Sarah Jenkins, MD",
    speakerRole: "Chief Medical Officer",
    chapters: [
      { title: "Configuring Clinical Availability", time: "00:00", seconds: 0 },
      { title: "Calendar Two-Way Synchronization", time: "00:40", seconds: 40 },
      { title: "Launching In-Browser Telehealth", time: "01:15", seconds: 75 },
    ],
    takeaways: [
      "High-definition, end-to-end encrypted video without third-party downloads.",
      "Automated SMS and email reminders reduce patient no-show rates by 38%.",
      "Two-way calendar sync prevents accidental double-booking."
    ],
    actionLabel: "Configure Availability",
    actionRoute: "/availability"
  }
];

export interface DemoClientData {
  id: string;
  name: string;
  mrn: string;
  dob: string;
  age: number;
  gender: string;
  diagnosis: string;
  diagnosisCode: string;
  insurance: string;
  memberId: string;
  copay: string;
  phone: string;
  email: string;
  lastSession: string;
  nextSession: string;
  recentSoapNote: {
    date: string;
    cptCode: string;
    duration: string;
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
    signedBy: string;
  };
  sampleSuperbill: {
    billNumber: string;
    serviceDate: string;
    cptCode: string;
    description: string;
    fee: number;
    patientPaid: number;
    balanceDue: number;
    status: string;
  };
}

export const DEMO_CLIENT: DemoClientData = {
  id: "demo-client-1",
  name: "Carl Rogers",
  mrn: "MRN-88214",
  dob: "1981-04-12",
  age: 45,
  gender: "Male",
  diagnosis: "Generalized Anxiety Disorder (GAD)",
  diagnosisCode: "F41.1",
  insurance: "UnitedHealthcare Choice Plus",
  memberId: "UHC-8842-9910",
  copay: "$25.00",
  phone: "+1 (555) 234-8901",
  email: "carl.rogers.demo@mantra.care",
  lastSession: "Yesterday, 3:00 PM (45 min)",
  nextSession: "Thursday, 2:00 PM (45 min)",
  recentSoapNote: {
    date: "Aug 18, 2026",
    cptCode: "90834 (Psychotherapy, 45 min)",
    duration: "45 minutes",
    subjective: "Client reports moderate work-related fatigue and somatic tension over the past 7 days. Endorses difficulty falling asleep due to anticipatory anxiety regarding quarterly reporting deadlines. Reports adherence to progressive muscle relaxation (PMR) exercises 3x this week with transient relief.",
    objective: "Client appeared alert and well-groomed. Speech was clear and normal rate/tone. Affect was congruent with anxious mood but easily engaged. No evidence of cognitive distortion, perceptual disturbance, or suicidal/homicidal ideation. Thought processes logical and goal-directed.",
    assessment: "Client continues to make measurable progress in identifying cognitive distortions associated with Generalized Anxiety Disorder (F41.1). Demonstrates improving self-efficacy in somatic regulation. Stressors remain situational and manageable.",
    plan: "1. Continue bi-weekly CBT sessions focused on cognitive restructuring.\n2. Client will maintain thought-record logs for catastrophizing triggers.\n3. Reinforce sleep hygiene protocol.\n4. Follow-up scheduled for Aug 22, 2026 at 2:00 PM.",
    signedBy: "Dr. Sarah Johnson, PsyD · Verified E-Signature #MC-99412"
  },
  sampleSuperbill: {
    billNumber: "SB-2026-0819",
    serviceDate: "2026-08-18",
    cptCode: "90834",
    description: "Individual Psychotherapy, 45 minutes",
    fee: 150.00,
    patientPaid: 25.00,
    balanceDue: 125.00,
    status: "Pending Insurance Remittance"
  }
};

interface FirstTimeUserContextType {
  dashboardViewMode: "first-time" | "regular";
  setDashboardViewMode: (mode: "first-time" | "regular") => void;
  completedTasks: string[];
  toggleTask: (taskId: string) => void;
  isTaskComplete: (taskId: string) => boolean;
  completionPercentage: number;
  totalCoreTasks: number;
  completedCoreCount: number;
  resetFTUXState: () => void;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  isTourActive: boolean;
  currentTourStep: number;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;
  activeVideoModal: VideoResource | null;
  openVideo: (video: VideoResource) => void;
  closeVideo: () => void;
  activeDemoModal: "soap" | "scribe" | "superbill" | "chart" | null;
  openDemoModal: (type: "soap" | "scribe" | "superbill" | "chart") => void;
  closeDemoModal: () => void;
  demoClient: DemoClientData;
}

const FirstTimeUserContext = createContext<FirstTimeUserContextType | undefined>(undefined);

export function FirstTimeUserProvider({ children }: { children: ReactNode }) {
  const [dashboardViewMode, setDashboardViewModeState] = useState<"first-time" | "regular">(() => {
    const saved = localStorage.getItem("mantra_dashboard_view_mode");
    return (saved === "regular" || saved === "first-time") ? saved : "first-time";
  });

  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mantra_ftux_completed_tasks");
      return saved ? JSON.parse(saved) : ["task-watch-tour"];
    } catch {
      return ["task-watch-tour"];
    }
  });

  const [showWelcomeModal, setShowWelcomeModalState] = useState<boolean>(() => {
    const seen = localStorage.getItem("mantra_ftux_welcome_seen");
    return seen !== "true";
  });

  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [currentTourStep, setCurrentTourStep] = useState<number>(1);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoResource | null>(null);
  const [activeDemoModal, setActiveDemoModal] = useState<"soap" | "scribe" | "superbill" | "chart" | null>(null);

  const setDashboardViewMode = (mode: "first-time" | "regular") => {
    setDashboardViewModeState(mode);
    localStorage.setItem("mantra_dashboard_view_mode", mode);
  };

  const setShowWelcomeModal = (show: boolean) => {
    setShowWelcomeModalState(show);
    if (!show) {
      localStorage.setItem("mantra_ftux_welcome_seen", "true");
    }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];
      localStorage.setItem("mantra_ftux_completed_tasks", JSON.stringify(next));
      return next;
    });
  };

  const isTaskComplete = (taskId: string) => completedTasks.includes(taskId);

  const coreTaskIds = [
    "task-watch-tour",
    "task-explore-demo",
    "task-try-ai-scribe",
    "task-configure-availability",
    "task-billing-setup"
  ];

  const totalCoreTasks = coreTaskIds.length;
  const completedCoreCount = coreTaskIds.filter((id) => completedTasks.includes(id)).length;
  const completionPercentage = Math.round((completedCoreCount / totalCoreTasks) * 100);

  const resetFTUXState = () => {
    localStorage.removeItem("mantra_ftux_completed_tasks");
    localStorage.removeItem("mantra_ftux_welcome_seen");
    setCompletedTasks([]);
    setShowWelcomeModalState(true);
    setDashboardViewModeState("first-time");
    localStorage.setItem("mantra_dashboard_view_mode", "first-time");
  };

  const startTour = () => {
    setIsTourActive(true);
    setCurrentTourStep(1);
  };

  const nextTourStep = () => {
    setCurrentTourStep((prev) => Math.min(prev + 1, 5));
  };

  const prevTourStep = () => {
    setCurrentTourStep((prev) => Math.max(prev - 1, 1));
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentTourStep(1);
  };

  const openVideo = (video: VideoResource) => {
    setActiveVideoModal(video);
  };

  const closeVideo = () => {
    setActiveVideoModal(null);
  };

  const openDemoModal = (type: "soap" | "scribe" | "superbill" | "chart") => {
    setActiveDemoModal(type);
  };

  const closeDemoModal = () => {
    setActiveDemoModal(null);
  };

  return (
    <FirstTimeUserContext.Provider
      value={{
        dashboardViewMode,
        setDashboardViewMode,
        completedTasks,
        toggleTask,
        isTaskComplete,
        completionPercentage,
        totalCoreTasks,
        completedCoreCount,
        resetFTUXState,
        showWelcomeModal,
        setShowWelcomeModal,
        isTourActive,
        currentTourStep,
        startTour,
        nextTourStep,
        prevTourStep,
        endTour,
        activeVideoModal,
        openVideo,
        closeVideo,
        activeDemoModal,
        openDemoModal,
        closeDemoModal,
        demoClient: DEMO_CLIENT
      }}
    >
      {children}
    </FirstTimeUserContext.Provider>
  );
}

export function useFirstTimeUser() {
  const context = useContext(FirstTimeUserContext);
  if (!context) {
    throw new Error("useFirstTimeUser must be used within FirstTimeUserProvider");
  }
  return context;
}
