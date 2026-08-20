import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserMode = "new" | "returning";
export type TourId = "home" | "bills-hub" | "sign-and-lock";

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  description: string;
  speaker?: string;
  speakerRole?: string;
  videoUrl?: string;
  chapters?: { title: string; time: string }[];
}

export const ONBOARDING_VIDEOS: VideoItem[] = [
  {
    id: "mantra-tour",
    title: "2-Minute Tour of Mantra",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    description: "A fast clinical orientation covering caseload management, ambient AI documentation, and calendar coordination in your unified workspace.",
    speaker: "Dr. Sarah Jenkins, MD",
    speakerRole: "Chief Medical Officer",
    chapters: [
      { title: "Workspace & Navigation", time: "00:00" },
      { title: "Caseload & Direct Messaging", time: "00:45" },
      { title: "Telehealth & Calendar Sync", time: "01:20" },
    ],
  },
  {
    id: "ai-transcriber-walkthrough",
    title: "AI Transcriber Walkthrough",
    duration: "3:10",
    thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    description: "Learn how the ambient AI Scribe listens during telehealth and in-person sessions to generate SOAP, DAP, or BIRP notes in seconds.",
    speaker: "Dr. Alex Vance, PhD",
    speakerRole: "Clinical Informatics",
    chapters: [
      { title: "Starting an Ambient Session", time: "00:00" },
      { title: "Real-time Medical Filtering", time: "01:00" },
      { title: "SOAP & DAP Structuring", time: "02:10" },
    ],
  },
  {
    id: "sign-lock-walkthrough",
    title: "Session Notes: Sign & Lock Walkthrough",
    duration: "2:40",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    description: "Explore the redesigned diagnosis plan check, CPT code capture (90834), verified e-signature, and auto-dispatch to billing.",
    speaker: "Elena Rostova",
    speakerRole: "Clinical Quality Lead",
    chapters: [
      { title: "Drafting & Reviewing Notes", time: "00:00" },
      { title: "Diagnosis Plan Verification", time: "00:50" },
      { title: "Sign & Lock E-Signature", time: "01:45" },
    ],
  },
  {
    id: "bills-hub-walkthrough",
    title: "Bills Hub Walkthrough",
    duration: "3:25",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive walkthrough of the new Bills Hub: managing unpaid bills, self-pay vs insurance splits, superbills, and recording payments.",
    speaker: "Marcus Sterling",
    speakerRole: "Head of Revenue Cycle",
    chapters: [
      { title: "Bills Hub Navigation & Filters", time: "00:00" },
      { title: "Creating Bills & Itemized Fees", time: "01:15" },
      { title: "Recording Patient Payments", time: "02:20" },
    ],
  },
  {
    id: "insurance-claim-walkthrough",
    title: "Filing an Insurance Claim",
    duration: "4:05",
    thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    description: "Master CMS-1500 clean claim submission, insurance payer credentialing, and tracking electronic remittances directly in Mantra.",
    speaker: "Marcus Sterling",
    speakerRole: "Head of Revenue Cycle",
    chapters: [
      { title: "Claim Scrubbing & Validation", time: "00:00" },
      { title: "Electronic CMS-1500 Dispatch", time: "01:30" },
      { title: "Remittance & Payment Tracking", time: "02:50" },
    ],
  },
];

export interface ChecklistItemData {
  id: string;
  title: string;
  description: string;
  actionText: string;
  actionRoute: string;
  iconName: string;
}

export const CHECKLIST_ITEMS: ChecklistItemData[] = [
  {
    id: "complete-profile",
    title: "Complete Profile",
    description: "Add your bio, licensing details, and practice address",
    actionText: "Edit Profile",
    actionRoute: "/edit-profile",
    iconName: "User",
  },
  {
    id: "add-client",
    title: "Add Your First Client",
    description: "Create a client chart to schedule visits and record notes",
    actionText: "Add Client",
    actionRoute: "/clients",
    iconName: "UserPlus",
  },
  {
    id: "set-availability",
    title: "Set Your Availability",
    description: "Configure your weekly working hours and telehealth slots",
    actionText: "Set Hours",
    actionRoute: "/availability",
    iconName: "Calendar",
  },
  {
    id: "connect-billing",
    title: "Connect Billing",
    description: "Review fee schedules and explore the Bills Hub",
    actionText: "Open Bills Hub",
    actionRoute: "/bills",
    iconName: "CreditCard",
  },
];

interface UserModeContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  completedChecklist: string[];
  isChecklistItemComplete: (id: string) => boolean;
  toggleChecklistItem: (id: string) => void;
  checklistProgress: { completed: number; total: number; percentage: number };
  isTourPromptDismissed: boolean;
  dismissTourPrompt: () => void;
  seenTours: string[];
  isTourSeen: (tourId: string) => boolean;
  markTourSeen: (tourId: string) => void;
  activeTour: TourId | null;
  startTour: (tourId: TourId) => void;
  endTour: () => void;
  autoStartTourIfNew: (tourId: TourId) => void;
  activeVideoModal: VideoItem | null;
  openVideo: (video: VideoItem) => void;
  closeVideo: () => void;
  showGraduationToast: boolean;
  dismissGraduationToast: () => void;
  resetNewUserState: () => void;
}

const UserModeContext = createContext<UserModeContextType | undefined>(undefined);

export function UserModeProvider({ children }: { children: ReactNode }) {
  const [userMode, setUserModeState] = useState<UserMode>(() => {
    const saved = localStorage.getItem("mantra_user_mode");
    return saved === "new" ? "new" : "returning";
  });

  const [completedChecklist, setCompletedChecklist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mantra_onboarding_checklist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isTourPromptDismissed, setIsTourPromptDismissed] = useState<boolean>(() => {
    return localStorage.getItem("mantra_tour_prompt_dismissed") === "true";
  });

  const [seenTours, setSeenTours] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mantra_seen_tours");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTour, setActiveTour] = useState<TourId | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);
  const [showGraduationToast, setShowGraduationToast] = useState<boolean>(false);

  const setUserMode = (mode: UserMode) => {
    setUserModeState(mode);
    localStorage.setItem("mantra_user_mode", mode);
  };

  const isChecklistItemComplete = (id: string) => completedChecklist.includes(id);

  const toggleChecklistItem = (id: string) => {
    setCompletedChecklist((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("mantra_onboarding_checklist", JSON.stringify(next));

      // Stage 5: Check if all 4 checklist items are complete -> auto graduate to returning user!
      const allTaskIds = CHECKLIST_ITEMS.map((item) => item.id);
      const isAllComplete = allTaskIds.every((taskId) => next.includes(taskId));

      if (isAllComplete && userMode === "new") {
        setUserModeState("returning");
        localStorage.setItem("mantra_user_mode", "returning");
        setShowGraduationToast(true);
      }

      return next;
    });
  };

  const checklistProgress = {
    completed: completedChecklist.length,
    total: CHECKLIST_ITEMS.length,
    percentage: Math.round((completedChecklist.length / CHECKLIST_ITEMS.length) * 100),
  };

  const dismissTourPrompt = () => {
    setIsTourPromptDismissed(true);
    localStorage.setItem("mantra_tour_prompt_dismissed", "true");
  };

  const isTourSeen = (tourId: string) => seenTours.includes(tourId);

  const markTourSeen = (tourId: string) => {
    setSeenTours((prev) => {
      if (prev.includes(tourId)) return prev;
      const next = [...prev, tourId];
      localStorage.setItem("mantra_seen_tours", JSON.stringify(next));
      return next;
    });
  };

  const startTour = (tourId: TourId) => {
    setActiveTour(tourId);
  };

  const endTour = () => {
    if (activeTour) {
      markTourSeen(activeTour);
    }
    setActiveTour(null);
  };

  const autoStartTourIfNew = (tourId: TourId) => {
    if (userMode === "new" && !isTourSeen(tourId)) {
      startTour(tourId);
      markTourSeen(tourId);
    }
  };

  const openVideo = (video: VideoItem) => {
    setActiveVideoModal(video);
  };

  const closeVideo = () => {
    setActiveVideoModal(null);
  };

  const dismissGraduationToast = () => {
    setShowGraduationToast(false);
  };

  const resetNewUserState = () => {
    localStorage.setItem("mantra_user_mode", "new");
    localStorage.removeItem("mantra_onboarding_checklist");
    localStorage.removeItem("mantra_seen_tours");
    localStorage.removeItem("mantra_tour_prompt_dismissed");
    setUserModeState("new");
    setCompletedChecklist([]);
    setSeenTours([]);
    setIsTourPromptDismissed(false);
    setShowGraduationToast(false);
  };

  return (
    <UserModeContext.Provider
      value={{
        userMode,
        setUserMode,
        completedChecklist,
        isChecklistItemComplete,
        toggleChecklistItem,
        checklistProgress,
        isTourPromptDismissed,
        dismissTourPrompt,
        seenTours,
        isTourSeen,
        markTourSeen,
        activeTour,
        startTour,
        endTour,
        autoStartTourIfNew,
        activeVideoModal,
        openVideo,
        closeVideo,
        showGraduationToast,
        dismissGraduationToast,
        resetNewUserState,
      }}
    >
      {children}
    </UserModeContext.Provider>
  );
}

export function useUserMode() {
  const context = useContext(UserModeContext);
  if (!context) {
    throw new Error("useUserMode must be used within UserModeProvider");
  }
  return context;
}
