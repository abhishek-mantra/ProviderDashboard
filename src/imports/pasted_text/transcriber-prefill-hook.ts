Looking at the image and the code flow, here's the complete prompt:

---

**Complete Prompt:**

Update the entire Add Session Notes and Create Prescription flow so that when a user arrives via the AI Transcriber (URL contains `?source=transcriber` or `?sessionId=`), all fields are pre-populated with demo data derived from the transcript. Here's exactly what to do:

---

### 1. Transcript Tab — Show Demo Transcript (not empty state)
On mount, detect `source=transcriber` in the URL. Instead of showing "No transcript added", show the transcript as already attached:
```js
const demoTranscript = {
  id: "demo-transcript-1",
  date: "Mar 14, 2026",
  duration: "45:32",
  fileSize: "32 MB",
  status: "completed",
  overview: "Anxiety management, breathing exercises, CBT techniques",
  content: `Therapist: How have you been feeling this week?\nClient: A bit better, the breathing exercises have helped with the panic attacks.\nTherapist: That's great progress. Let's continue working on the CBT reframing techniques we discussed last session.`
}
```
Render this in a "transcript attached" card (same UI as when a recording is saved or file is uploaded) — show the overview text, duration, date, and a remove button. The empty state buttons ("Upload Transcript", "Record Session") should NOT appear.

---

### 2. Noteworthy Tab — Pre-fill All Fields with AI-generated Demo Data
When the user switches to the "Noteworthy" tab (or whatever the session notes form tab is called), all form fields should already be filled in as if "Fill with AI" was already clicked. Pre-populate with:

```js
const demoNoteData = {
  // SOAP or whatever template fields exist:
  subjective: "Client reports improvement in panic attack frequency. States breathing exercises from last session have been helpful. Mentions ongoing work stress as a trigger.",
  objective: "Client appeared calm and engaged. Maintained good eye contact. Speech was clear and organized. No signs of acute distress.",
  assessment: "Generalized Anxiety Disorder (GAD) with improvement noted. Client is responding well to CBT interventions. Panic attack frequency reduced from daily to 2-3 times per week.",
  plan: "Continue CBT reframing techniques. Practice diaphragmatic breathing 10 mins daily. Follow up in 1 week. Consider journaling as adjunct tool.",

  // If the form has other fields:
  sessionDate: "Mar 14, 2026",
  sessionTime: "08:21 PM",
  duration: "45 mins",
  sessionType: "Individual Therapy",
  mood: "Moderate",
  riskAssessment: "No risk identified",
  nextSession: "Mar 21, 2026",
  homework: "Daily breathing exercises, thought journaling",
  interventionsUsed: ["CBT", "Psychoeducation", "Breathing Techniques"],
}
```

All fields should render as filled/pre-populated — NOT empty. The "Fill with AI" button should either be hidden, replaced with "Regenerate with AI", or shown in a completed/success state.

---

### 3. Create Prescription Page — Pre-fill All Fields
When the user arrives on the Prescription creation page via `?source=transcriber`, pre-populate every field:

```js
const demoPrescriptionData = {
  patientName: "Sarah Johnson", // or whatever client was selected in transcriber
  date: "Mar 14, 2026",
  chiefComplaints: ["Anxiety", "Panic Attacks", "Sleep Disturbance"],
  medicalHistory: "No chronic conditions. Previous anxiety episodes managed with therapy.",
  provisionalDiagnosis: {
    title: "Generalized Anxiety Disorder (GAD)",
    description: "Moderate severity, responding to CBT interventions"
  },
  diagnosticTests: {
    title: "PHQ-9 / GAD-7 Assessment",
    description: "To track symptom severity over treatment course"
  },
  medicines: [
    {
      name: "Escitalopram",
      genericName: "SSRI Antidepressant",
      dosage: "10mg - Morning (After food)",
      duration: "30 Days",
      instruction: "Do not stop abruptly. Take at the same time each day."
    },
    {
      name: "Clonazepam",
      genericName: "Benzodiazepine",
      dosage: "0.5mg - Night (Before sleep)",
      duration: "14 Days",
      instruction: "Only as needed for acute anxiety. Avoid alcohol."
    }
  ],
  notes: "Patient showing positive response to therapy. Medication to support CBT treatment plan.",
  followUp: "Mar 21, 2026",
  signature: "Digitally signed"
}
```

All input fields, dropdowns, medicine rows, and diagnosis cards should render pre-filled. No field should appear empty. The save/submit button should be active immediately.

---

### 4. General Rule
Wrap this demo-data injection in a single utility hook:
```js
function useTranscriberPrefill() {
  const [searchParams] = useSearchParams();
  const isFromTranscriber = searchParams.get("source") === "transcriber";
  return { isFromTranscriber, demoTranscript, demoNoteData, demoPrescriptionData };
}
```
Import and use this hook in `AddNotes`, `CreatePrescription`, and any other downstream pages in this flow. This keeps the logic consistent and easy to remove when real API data replaces the mock.