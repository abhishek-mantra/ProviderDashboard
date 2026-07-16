import { useSearchParams, useLocation } from "react-router";

export const demoTranscript = {
  id: "demo-transcript-1",
  date: "Mar 14, 2026",
  duration: "45:32",
  fileSize: "32 MB",
  status: "completed",
  overview: "Anxiety management, breathing exercises, CBT techniques",
  content: `Therapist: How have you been feeling this week?\nClient: A bit better, the breathing exercises have helped with the panic attacks.\nTherapist: That's great progress. Let's continue working on the CBT reframing techniques we discussed last session.`,
};

export const demoNoteData: Record<string, string> = {
  // SOAP
  "Subjective": "Client reports improvement in panic attack frequency. States breathing exercises from last session have been helpful. Mentions ongoing work stress as a trigger.",
  "Objective": "Client appeared calm and engaged. Maintained good eye contact. Speech was clear and organized. No signs of acute distress.",
  "Assessment": "Generalized Anxiety Disorder (GAD) with improvement noted. Client is responding well to CBT interventions. Panic attack frequency reduced from daily to 2-3 times per week.",
  "Plan": "Continue CBT reframing techniques. Practice diaphragmatic breathing 10 mins daily. Follow up in 1 week. Consider journaling as adjunct tool.",
  // Basic
  "Session Summary": "Session focused on GAD management using CBT techniques. Client demonstrated improvement with breathing exercises reducing panic attack frequency. Ongoing work stress identified as primary trigger.",
  "Key Topics Discussed": "Anxiety management, panic attack frequency reduction, breathing exercises, CBT reframing techniques, work stress as trigger.",
  "Next Session Goals": "Daily breathing exercises, thought journaling, follow up in 1 week on CBT technique adherence.",
  // Diagnosis and Treatment
  "Diagnosis": "Generalized Anxiety Disorder (GAD) with improvement noted. Panic attack frequency reduced from daily to 2-3 times per week.",
  "Treatment Objectives": "Short-term: Reduce panic attack frequency to once per week within 4 weeks. Long-term: Develop sustainable anxiety management skills within 8 weeks.",
  "Interventions": "Cognitive Behavioral Therapy (CBT), Psychoeducation, Diaphragmatic Breathing Techniques, Cognitive Reframing.",
  // Brief Progress
  "Progress Update": "Client has shown measurable improvement since last session. Breathing exercises have helped reduce panic attack frequency from daily to 2-3 times per week.",
  "Observations": "Client appeared calm and engaged throughout the session. Good eye contact. No signs of acute distress.",
  "Recommendations": "Continue CBT techniques and daily breathing practice. Consider journaling as an adjunct tool. Follow up in 1 week.",
};

export interface DemoPrescriptionMedicine {
  name: string;
  genericName: string;
  dosage: string;
  duration: string;
}

export const demoPrescriptionData = {
  patientName: "Sarah Johnson",
  date: "Mar 14, 2026",
  chiefComplaints: ["Anxiety", "Panic Attacks", "Sleep Disturbance"],
  medicalHistory: ["No chronic conditions"],
  provisionalDiagnosis: "Generalized Anxiety Disorder (GAD)",
  diagnosticTests: ["PHQ-9 / GAD-7 Assessment"],
  medicines: [
    {
      name: "Escitalopram",
      genericName: "SSRI Antidepressant",
      dosage: "10mg - Morning (After food)",
      duration: "Duration: 30 Days",
    },
    {
      name: "Clonazepam",
      genericName: "Benzodiazepine",
      dosage: "0.5mg - Night (Before sleep)",
      duration: "Duration: 14 Days",
    },
  ] as DemoPrescriptionMedicine[],
  notes: "Patient showing positive response to therapy. Medication to support CBT treatment plan.",
  followUp: "Mar 21, 2026",
};

export function useTranscriberPrefill() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const locationState = location.state as { prefilled?: boolean; source?: string } | null;

  const isFromTranscriber =
    searchParams.get("source") === "transcriber" ||
    locationState?.prefilled === true ||
    locationState?.source === "transcriber";

  return { isFromTranscriber, demoTranscript, demoNoteData, demoPrescriptionData };
}
