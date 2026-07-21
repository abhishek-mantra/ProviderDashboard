import type { Provider, EstablishmentMember, CareTeamMembership, MockClient, Establishment, IntakeForm, IntakeFlow, FormEntry, FormResponse, FormField } from "../types/partnerDashboard";

export const mockProviders: Provider[] = [
  {
    id: "prov-1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@mantracare.com",
    profession: "Therapy",
    credentialExpiresAt: "2026-08-05T00:00:00Z",
    rating: 4.8,
    verificationStatus: "verified",
    planMode: "provider",
  },
  {
    id: "prov-2",
    name: "Dr. Michael Chen",
    email: "michael.chen@mantracare.com",
    profession: "Psychiatrist",
    credentialExpiresAt: "2027-01-15T00:00:00Z",
    rating: 4.6,
    verificationStatus: "verified",
    planMode: "full-ehr",
  },
  {
    id: "prov-3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@mantracare.com",
    profession: "General Physician",
    credentialExpiresAt: "2026-06-15T00:00:00Z",
    rating: 4.7,
    verificationStatus: "verified",
    planMode: "provider",
  },
  {
    id: "prov-4",
    name: "Dr. David Kim",
    email: "david.kim@mantracare.com",
    profession: "Dermatologist",
    credentialExpiresAt: "2026-07-30T00:00:00Z",
    rating: 4.4,
    verificationStatus: "pending",
    planMode: "full-ehr",
  },
  {
    id: "prov-5",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@mantracare.com",
    profession: "Endocrinologist",
    credentialExpiresAt: "2026-12-01T00:00:00Z",
    rating: 4.9,
    verificationStatus: "verified",
    planMode: "full-ehr",
  },
  {
    id: "prov-6",
    name: "Dr. James Wilson",
    email: "james.wilson@mantracare.com",
    profession: "Cardiologist",
    credentialExpiresAt: "2026-09-20T00:00:00Z",
    rating: 4.5,
    verificationStatus: "verified",
    planMode: "ai-scribe",
  },
  {
    id: "prov-admin",
    name: "Dr. Admin Owner",
    email: "admin@mantracare.com",
    profession: "Therapy",
    credentialExpiresAt: "2026-10-10T00:00:00Z",
    rating: 4.8,
    verificationStatus: "verified",
    planMode: "full-ehr",
  },
];

export const mockEstablishments: Establishment[] = [
  {
    id: "est-1",
    type: "clinic",
    name: "MantraCare Wellness Clinic",
    specialties: ["Therapy", "Psychiatrist", "General Physician"],
    specialtyServices: {
      Therapy: ["Anxiety", "Depression", "OCD", "Stress / Burnout"],
      Psychiatrist: ["ADHD", "Bipolar", "Anxiety", "Depression"],
      "General Physician": ["Diabetes", "Hypertension"],
    },
    yearsInOperation: "15",
    about:
      "Leading wellness clinic offering comprehensive mental health and general medicine services with state-of-the-art facilities.",
    bedCapacity: "25",
    accreditation: "NABH",
    streetAddress: "123 Healthcare Avenue, Medical District",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400001",
    visitingHours: {
      Monday: { isOpen: true, from: "09:00", to: "19:00" },
      Tuesday: { isOpen: true, from: "09:00", to: "19:00" },
      Wednesday: { isOpen: true, from: "09:00", to: "19:00" },
      Thursday: { isOpen: true, from: "09:00", to: "19:00" },
      Friday: { isOpen: true, from: "09:00", to: "19:00" },
      Saturday: { isOpen: true, from: "09:00", to: "17:00" },
      Sunday: { isOpen: false, from: "09:00", to: "19:00" },
    },
    coverPhoto: "",
    photos: [],
    videoUrl: "",
    insurance: ["Star Health", "HDFC ERGO", "Max Bupa", "CGHS"],
    fees: [
      { sessionType: "Initial Consultation", price: 1500 },
      { sessionType: "Follow-up", price: 800 },
    ],
    slidingScaleAvailable: true,
    paymentMethodsAccepted: ["Cash", "UPI", "Credit/Debit Card"],
    clientFocus: {
      ageGroups: ["Adults", "Teens"],
      participants: ["Individuals", "Couples"],
    },
    communitiesServed: ["LGBTQ+ Friendly", "Neurodivergent", "Trauma Survivors"],
    therapyModalities: ["CBT", "DBT", "Mindfulness-Based"],
    sessionFormat: "both",
    freeConsultation: { offered: true, durationMinutes: 15 },
    status: "live",
    lastConfirmedAt: "2026-03-01T00:00:00Z",
    planTier: "GROWTH",
    members: [
      {
        providerId: "prov-admin",
        establishmentId: "est-1",
        roles: { isAdmin: true, clinical: "Clinician" },
        supervises: ["prov-3"],
        memberStatus: "active",
        invitedAt: "2024-01-01T00:00:00Z",
        joinedAt: "2024-01-05T00:00:00Z",
      },
      {
        providerId: "prov-1",
        establishmentId: "est-1",
        roles: { isAdmin: false, clinical: "Clinician" },
        supervises: [],
        memberStatus: "active",
        invitedAt: "2024-01-15T00:00:00Z",
        joinedAt: "2024-01-20T00:00:00Z",
      },
      {
        providerId: "prov-2",
        establishmentId: "est-1",
        roles: { isAdmin: false, clinical: "Supervisor" },
        supervises: ["prov-3"],
        memberStatus: "active",
        invitedAt: "2024-01-10T00:00:00Z",
        joinedAt: "2024-01-12T00:00:00Z",
      },
      {
        providerId: "prov-3",
        establishmentId: "est-1",
        roles: { isAdmin: false, clinical: "Clinician" },
        supervises: [],
        memberStatus: "active",
        invitedAt: "2024-02-01T00:00:00Z",
        joinedAt: "2024-02-05T00:00:00Z",
      },
      {
        providerId: "prov-4",
        establishmentId: "est-1",
        roles: { isAdmin: false, clinical: "Clinician" },
        supervises: [],
        memberStatus: "verification-pending",
        invitedAt: "2024-03-01T00:00:00Z",
        joinedAt: null,
      },
      {
        providerId: "prov-5",
        establishmentId: "est-1",
        roles: { isAdmin: false, clinical: "Clinician" },
        supervises: [],
        memberStatus: "active",
        invitedAt: "2024-03-05T00:00:00Z",
        joinedAt: "2024-03-10T00:00:00Z",
      },
    ],
  },
];

// ── Intake Form Templates ──────────────────────────────────────────────────────

const generalIntakeFields: FormField[] = [
  { id: "gi-1", type: "short_answer", label: "Full name", required: true, order: 1 },
  { id: "gi-2", type: "date", label: "Date of birth", required: true, order: 2 },
  { id: "gi-3", type: "dropdown", label: "Gender", required: true, options: ["Male", "Female", "Non-binary", "Transgender", "Prefer not to say", "Other"], order: 3 },
  { id: "gi-4", type: "short_answer", label: "Phone", required: true, order: 4 },
  { id: "gi-5", type: "short_answer", label: "Email", required: true, order: 5 },
  { id: "gi-6", type: "short_answer", label: "Emergency contact name & phone", required: true, order: 6 },
  { id: "gi-7", type: "dropdown", label: "How did you hear about us?", required: true, options: ["Google Search", "Friend/Family Referral", "Insurance Directory", "Social Media", "Other"], order: 7 },
  { id: "gi-8", type: "long_answer", label: "What brings you to therapy today?", required: true, order: 8 },
  { id: "gi-9", type: "long_answer", label: "If you could accomplish one thing in therapy, what would it be?", required: false, order: 9 },
  { id: "gi-10", type: "long_answer", label: "Short-term therapy goals", required: false, order: 10 },
  { id: "gi-11", type: "long_answer", label: "Long-term therapy goals", required: false, order: 11 },
  { id: "gi-12", type: "long_answer", label: "Prior mental health treatment / providers", required: false, order: 12 },
  { id: "gi-13", type: "long_answer", label: "Have you been previously hospitalized for a mental health condition? If yes, please describe.", required: false, order: 13 },
  { id: "gi-14", type: "yes_no", label: "History of suicide attempts or self-harm", required: true, order: 14, sensitive: true },
  { id: "gi-15", type: "long_answer", label: "Current medications", required: false, order: 15 },
  { id: "gi-16", type: "long_answer", label: "Family mental health history", required: false, order: 16 },
  { id: "gi-17", type: "screening_instrument", label: "PHQ-9 depression screening", required: true, instrumentType: "PHQ-9", order: 17 },
  { id: "gi-18", type: "screening_instrument", label: "GAD-7 anxiety screening", required: true, instrumentType: "GAD-7", order: 18 },
  { id: "gi-19", type: "long_answer", label: "Who do you live with / who is your main support system?", required: false, order: 19 },
  { id: "gi-20", type: "long_answer", label: "Relevant environmental or life factors", required: false, order: 20 },
];

const consentFormFields: FormField[] = [
  {
    id: "cf-1", type: "agreement_text", label: "Confidentiality & limits of confidentiality", required: false, order: 1,
  },
  {
    id: "cf-2", type: "agreement_text", label: "Telehealth consent", required: false, order: 2,
  },
  {
    id: "cf-3", type: "agreement_text", label: "Cancellation / no-show policy", required: false, order: 3,
  },
  { id: "cf-4", type: "e_signature", label: "Client signature", required: true, order: 4 },
  { id: "cf-5", type: "date", label: "Date signed", required: true, order: 5 },
];

const insuranceBillingFields: FormField[] = [
  { id: "ib-1", type: "short_answer", label: "Insurance provider name", required: false, order: 1 },
  { id: "ib-2", type: "short_answer", label: "Policy / Member ID", required: false, order: 2 },
  { id: "ib-3", type: "short_answer", label: "Group number", required: false, order: 3 },
  { id: "ib-4", type: "dropdown", label: "Payment method on file", required: true, options: ["Credit Card", "Debit Card", "Insurance Only", "Self-Pay"], order: 4 },
  { id: "ib-5", type: "yes_no", label: "Sliding scale acknowledgment", required: false, order: 5 },
  { id: "ib-6", type: "file_upload", label: "Upload insurance card / document", required: false, order: 6 },
];

const presentingConcernFields: FormField[] = [
  { id: "pc-1", type: "long_answer", label: "What brings you in today?", required: true, order: 1 },
  { id: "pc-2", type: "yes_no", label: "Do you feel you are in crisis or need urgent support?", required: true, order: 2 },
];

export const mockIntakeForms: IntakeForm[] = [
  {
    id: "form-template-1",
    establishmentId: "est-1",
    name: "General Intake / Health History",
    category: "clinical",
    isTemplate: true,
    applicableServices: ["Therapy", "Diet", "Physio", "Yoga"],
    fields: generalIntakeFields,
  },
  {
    id: "form-template-2",
    establishmentId: "est-1",
    name: "Consent Form",
    category: "administrative",
    isTemplate: true,
    applicableServices: ["Therapy", "Diet", "Physio", "Yoga"],
    fields: consentFormFields,
  },
  {
    id: "form-template-3",
    establishmentId: "est-1",
    name: "Insurance & Billing Info",
    category: "administrative",
    isTemplate: true,
    applicableServices: ["Therapy", "Diet", "Physio", "Yoga"],
    fields: insuranceBillingFields,
  },
  {
    id: "form-template-4",
    establishmentId: "est-1",
    name: "Presenting Concern (Quick Form)",
    category: "clinical",
    isTemplate: true,
    applicableServices: ["Therapy"],
    fields: presentingConcernFields,
  },
  {
    id: "form-archived-1",
    establishmentId: "est-1",
    name: "Old COVID Screening (Archived)",
    category: "clinical",
    isTemplate: true,
    applicableServices: ["Therapy"],
    fields: [
      { id: "oc-1", type: "yes_no", label: "Have you experienced any COVID-19 symptoms in the last 14 days?", required: true, order: 1 },
      { id: "oc-2", type: "yes_no", label: "Have you been in close contact with someone who tested positive for COVID-19?", required: true, order: 2 },
    ],
    isArchived: true,
    createdBy: "prov-admin",
  },
];

// Custom form for scenario 8 (forked from General Intake)
export const mockCustomForm: IntakeForm = {
  id: "form-custom-1",
  establishmentId: "est-1",
  name: "Custom Intake (Forked)",
  category: "clinical",
  isTemplate: false,
  templateSourceId: "form-template-1",
  applicableServices: [],
  createdBy: "prov-admin",
  fields: generalIntakeFields.slice(0, 10),
};

export const mockArchivedForm: IntakeForm = {
  id: "form-archived-1",
  establishmentId: "est-1",
  name: "Old COVID Screening (Archived)",
  category: "clinical",
  isTemplate: true,
  applicableServices: ["Therapy"],
  fields: [
    { id: "oc-1", type: "yes_no", label: "Have you experienced any COVID-19 symptoms in the last 14 days?", required: true, order: 1 },
    { id: "oc-2", type: "yes_no", label: "Have you been in close contact with someone who tested positive for COVID-19?", required: true, order: 2 },
  ],
  isArchived: true,
  createdBy: "prov-admin",
};

// ── Default Intake Flow ───────────────────────────────────────────────────────

export const mockIntakeFlows: IntakeFlow[] = [
  {
    id: "flow-default-1",
    establishmentId: "est-1",
    name: "Standard Intake Flow",
    isDefault: true,
    formIds: ["form-template-2", "form-template-1", "form-template-3", "form-template-4"],
  },
  {
    id: "flow-custom-1",
    establishmentId: "est-1",
    name: "Custom Flow with Custom Form",
    isDefault: false,
    formIds: ["form-template-2", "form-custom-1"],
  },
];

// ── Standard PHQ-9 / GAD-7 questions ─────────────────────────────────────────

export const PHQ9_ITEMS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

export const GAD7_ITEMS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

// ── Helper to create screening answers ────────────────────────────────────────

function makeScreeningAnswers(items: string[], scores: number[]) {
  return items.map((itemText, i) => ({
    itemIndex: i,
    itemText,
    value: scores[i] ?? 0,
  }));
}

// ── Seed Form Entries & Form Responses (8 Scenarios) ──────────────────────────

export const mockFormEntries: FormEntry[] = [
  // 1. Client 1 — all submitted, high-risk scores
  { id: "fe-1-consent", clientId: "1", formId: "form-template-2", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-01T10:00:00Z", submittedAt: "2026-06-01T10:15:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-1-intake", clientId: "1", formId: "form-template-1", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-01T10:00:00Z", submittedAt: "2026-06-01T10:45:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-1-insurance", clientId: "1", formId: "form-template-3", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-01T10:00:00Z", submittedAt: "2026-06-01T11:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-1-concern", clientId: "1", formId: "form-template-4", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-01T10:00:00Z", submittedAt: "2026-06-01T11:10:00Z", sentViaFlowId: "flow-default-1" },
  // 2. Client 2 — mixed: consent submitted, intake submitted, insurance draft, concern requested
  { id: "fe-2-consent", clientId: "2", formId: "form-template-2", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-10T09:00:00Z", submittedAt: "2026-06-10T09:15:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-2-intake", clientId: "2", formId: "form-template-1", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-10T09:00:00Z", submittedAt: "2026-06-10T09:50:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-2-insurance", clientId: "2", formId: "form-template-3", providerId: "prov-admin", status: "draft", requestedAt: "2026-06-10T09:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-2-concern", clientId: "2", formId: "form-template-4", providerId: "prov-admin", status: "requested", requestedAt: "2026-06-10T09:00:00Z", sentViaFlowId: "flow-default-1" },
  // 3. Client 3 — all requested
  { id: "fe-3-consent", clientId: "3", formId: "form-template-2", providerId: "prov-admin", status: "requested", requestedAt: "2026-07-01T08:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-3-intake", clientId: "3", formId: "form-template-1", providerId: "prov-admin", status: "requested", requestedAt: "2026-07-01T08:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-3-insurance", clientId: "3", formId: "form-template-3", providerId: "prov-admin", status: "requested", requestedAt: "2026-07-01T08:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-3-concern", clientId: "3", formId: "form-template-4", providerId: "prov-admin", status: "requested", requestedAt: "2026-07-01T08:00:00Z", sentViaFlowId: "flow-default-1" },
  // 4. Client 5 — mixed (previously had skipped, now requested)
  { id: "fe-4-consent", clientId: "5", formId: "form-template-2", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-15T10:00:00Z", submittedAt: "2026-06-15T10:20:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-4-intake", clientId: "5", formId: "form-template-1", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-15T10:00:00Z", submittedAt: "2026-06-15T11:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-4-insurance", clientId: "5", formId: "form-template-3", providerId: "prov-admin", status: "submitted", requestedAt: "2026-06-15T10:00:00Z", submittedAt: "2026-06-15T11:15:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-4-concern", clientId: "5", formId: "form-template-4", providerId: "prov-admin", status: "requested", requestedAt: "2026-06-15T10:00:00Z", sentViaFlowId: "flow-default-1" },
  // 5. Client 4 — overdue (old requestedAt), all requested
  { id: "fe-5-consent", clientId: "4", formId: "form-template-2", providerId: "prov-admin", status: "requested", requestedAt: "2025-12-01T10:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-5-intake", clientId: "4", formId: "form-template-1", providerId: "prov-admin", status: "requested", requestedAt: "2025-12-01T10:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-5-insurance", clientId: "4", formId: "form-template-3", providerId: "prov-admin", status: "requested", requestedAt: "2025-12-01T10:00:00Z", sentViaFlowId: "flow-default-1" },
  { id: "fe-5-concern", clientId: "4", formId: "form-template-4", providerId: "prov-admin", status: "requested", requestedAt: "2025-12-01T10:00:00Z", sentViaFlowId: "flow-default-1" },
  // 6. Client 6 — cross-role visibility test (treating prov-3, admin prov-admin should see admin but not clinical)
  { id: "fe-6-consent", clientId: "6", formId: "form-template-2", providerId: "prov-admin", status: "submitted", requestedAt: "2026-07-10T09:00:00Z", submittedAt: "2026-07-10T09:15:00Z" },
  { id: "fe-6-intake", clientId: "6", formId: "form-template-1", providerId: "prov-admin", status: "submitted", requestedAt: "2026-07-10T09:00:00Z", submittedAt: "2026-07-10T09:45:00Z" },
  // 7. Supervisee test — same client 6 entries work (prov-2 supervises prov-3, should see clinical)
  // 8. Client 7 — custom form test case
  { id: "fe-8-consent", clientId: "7", formId: "form-template-2", providerId: "prov-admin", status: "submitted", requestedAt: "2026-07-05T10:00:00Z", submittedAt: "2026-07-05T10:15:00Z", sentViaFlowId: "flow-custom-1" },
  { id: "fe-8-custom", clientId: "7", formId: "form-custom-1", providerId: "prov-admin", status: "submitted", requestedAt: "2026-07-05T10:00:00Z", submittedAt: "2026-07-05T10:40:00Z", sentViaFlowId: "flow-custom-1" },
];

export const mockFormResponses: FormResponse[] = [
  // ── Scenario 1 (fe-1-*): Completed, high-risk scores ────────────────────────
  {
    id: "fr-1-consent",
    formEntryId: "fe-1-consent",
    clientId: "1",
    formId: "form-template-2",
    answers: [
      { fieldId: "cf-1", value: "I have read and understood the confidentiality policy." },
      { fieldId: "cf-2", value: "I consent to telehealth services." },
      { fieldId: "cf-3", value: "I understand the cancellation policy." },
      { fieldId: "cf-4", value: "Sarah Johnson" },
      { fieldId: "cf-5", value: "2026-06-01" },
    ],
    submittedAt: "2026-06-01T10:15:00Z",
  },
  {
    id: "fr-1-intake",
    formEntryId: "fe-1-intake",
    clientId: "1",
    formId: "form-template-1",
    answers: [
      { fieldId: "gi-1", value: "Sarah Johnson" },
      { fieldId: "gi-2", value: "1995-03-15" },
      { fieldId: "gi-3", value: "Female" },
      { fieldId: "gi-4", value: "+44 7700 900123" },
      { fieldId: "gi-5", value: "sarah.j@example.com" },
      { fieldId: "gi-6", value: "Mike Johnson, +44 7700 900456" },
      { fieldId: "gi-7", value: "Friend/Family Referral" },
      { fieldId: "gi-8", value: "I have been feeling extremely anxious and depressed for the past several months. I have trouble sleeping and concentrating at work." },
      { fieldId: "gi-9", value: "I want to feel like myself again and be able to enjoy life." },
      { fieldId: "gi-10", value: "Develop coping strategies for anxiety." },
      { fieldId: "gi-11", value: "Build a sustainable mental health maintenance plan." },
      { fieldId: "gi-12", value: "I saw a therapist briefly in college but stopped." },
      { fieldId: "gi-13", value: "No" },
      { fieldId: "gi-14", value: "Yes" },
      { fieldId: "gi-15", value: "None" },
      { fieldId: "gi-16", value: "Mother has history of anxiety." },
      {
        fieldId: "gi-17", value: "",
        computedScore: 22,
        screeningAnswers: makeScreeningAnswers(PHQ9_ITEMS, [2, 3, 2, 3, 2, 3, 2, 3, 2]),
      },
      {
        fieldId: "gi-18", value: "",
        computedScore: 16,
        screeningAnswers: makeScreeningAnswers(GAD7_ITEMS, [3, 2, 3, 2, 2, 2, 2]),
      },
      { fieldId: "gi-19", value: "I live with my partner and our cat." },
      { fieldId: "gi-20", value: "Work stress has been overwhelming lately." },
    ],
    submittedAt: "2026-06-01T10:45:00Z",
  },
  {
    id: "fr-1-insurance",
    formEntryId: "fe-1-insurance",
    clientId: "1",
    formId: "form-template-3",
    answers: [
      { fieldId: "ib-1", value: "BUPA" },
      { fieldId: "ib-2", value: "BUP123456789" },
      { fieldId: "ib-3", value: "GRP001" },
      { fieldId: "ib-4", value: "Credit Card" },
      { fieldId: "ib-5", value: "Yes" },
    ],
    submittedAt: "2026-06-01T11:00:00Z",
  },
  {
    id: "fr-1-concern",
    formEntryId: "fe-1-concern",
    clientId: "1",
    formId: "form-template-4",
    answers: [
      { fieldId: "pc-1", value: "Ongoing anxiety and depression affecting daily life." },
      { fieldId: "pc-2", value: "No" },
    ],
    submittedAt: "2026-06-01T11:10:00Z",
  },
  // ── Scenario 2 (fe-2-*): Mixed statuses ─────────────────────────────────────
  {
    id: "fr-2-consent",
    formEntryId: "fe-2-consent",
    clientId: "2",
    formId: "form-template-2",
    answers: [
      { fieldId: "cf-1", value: "I have read and understood." },
      { fieldId: "cf-2", value: "I consent." },
      { fieldId: "cf-3", value: "Understood." },
      { fieldId: "cf-4", value: "Michael Chen" },
      { fieldId: "cf-5", value: "2026-06-10" },
    ],
    submittedAt: "2026-06-10T09:15:00Z",
  },
  {
    id: "fr-2-intake",
    formEntryId: "fe-2-intake",
    clientId: "2",
    formId: "form-template-1",
    answers: [
      { fieldId: "gi-1", value: "Michael Chen" },
      { fieldId: "gi-2", value: "1990-07-22" },
      { fieldId: "gi-3", value: "Male" },
      { fieldId: "gi-4", value: "+44 7700 900789" },
      { fieldId: "gi-5", value: "m.chen@example.com" },
      { fieldId: "gi-6", value: "Lisa Chen, +44 7700 900321" },
      { fieldId: "gi-7", value: "Google Search" },
      { fieldId: "gi-8", value: "I have been struggling with stress and burnout at work." },
      { fieldId: "gi-9", value: "Learn to manage stress better." },
      { fieldId: "gi-12", value: "No prior treatment." },
      { fieldId: "gi-14", value: "No" },
    ],
    submittedAt: "2026-06-10T09:50:00Z",
  },
  // ── Scenario 4 (fe-4-*): Mixed statuses ─────────────────────────────────────
  {
    id: "fr-4-consent",
    formEntryId: "fe-4-consent",
    clientId: "5",
    formId: "form-template-2",
    answers: [
      { fieldId: "cf-1", value: "I have read and understood." },
      { fieldId: "cf-2", value: "I consent to telehealth." },
      { fieldId: "cf-3", value: "I understand the policy." },
      { fieldId: "cf-4", value: "Olivia Brown" },
      { fieldId: "cf-5", value: "2026-06-15" },
    ],
    submittedAt: "2026-06-15T10:20:00Z",
  },
  {
    id: "fr-4-intake",
    formEntryId: "fe-4-intake",
    clientId: "5",
    formId: "form-template-1",
    answers: [
      { fieldId: "gi-1", value: "Olivia Brown" },
      { fieldId: "gi-2", value: "1988-11-03" },
      { fieldId: "gi-3", value: "Female" },
      { fieldId: "gi-4", value: "+44 7700 900555" },
      { fieldId: "gi-5", value: "olivia.b@example.com" },
      { fieldId: "gi-6", value: "Tom Brown, +44 7700 900666" },
      { fieldId: "gi-7", value: "Insurance Directory" },
      { fieldId: "gi-8", value: "Managing grief after losing a family member." },
      { fieldId: "gi-14", value: "No" },
    ],
    submittedAt: "2026-06-15T11:00:00Z",
  },
  {
    id: "fr-4-insurance",
    formEntryId: "fe-4-insurance",
    clientId: "5",
    formId: "form-template-3",
    answers: [
      { fieldId: "ib-4", value: "Insurance Only" },
    ],
    submittedAt: "2026-06-15T11:15:00Z",
  },
  // ── Scenario 6 (fe-6-*): Cross-role visibility test ─────────────────────────
  {
    id: "fr-6-consent",
    formEntryId: "fe-6-consent",
    clientId: "6",
    formId: "form-template-2",
    answers: [
      { fieldId: "cf-1", value: "I have read and understood." },
      { fieldId: "cf-2", value: "I consent to telehealth." },
      { fieldId: "cf-3", value: "Understood." },
      { fieldId: "cf-4", value: "Liam Garcia" },
      { fieldId: "cf-5", value: "2026-07-10" },
    ],
    submittedAt: "2026-07-10T09:15:00Z",
  },
  {
    id: "fr-6-intake",
    formEntryId: "fe-6-intake",
    clientId: "6",
    formId: "form-template-1",
    answers: [
      { fieldId: "gi-1", value: "Liam Garcia" },
      { fieldId: "gi-2", value: "1993-09-12" },
      { fieldId: "gi-3", value: "Male" },
      { fieldId: "gi-4", value: "+44 7700 900999" },
      { fieldId: "gi-5", value: "liam.g@example.com" },
      { fieldId: "gi-6", value: "Ana Garcia, +44 7700 900888" },
      { fieldId: "gi-7", value: "Friend/Family Referral" },
      { fieldId: "gi-8", value: "I've been feeling anxious about work and relationships." },
      { fieldId: "gi-14", value: "No" },
    ],
    submittedAt: "2026-07-10T09:45:00Z",
  },
  // ── Scenario 8 (fe-8-*): Custom form test case ──────────────────────────────
  {
    id: "fr-8-consent",
    formEntryId: "fe-8-consent",
    clientId: "7",
    formId: "form-template-2",
    answers: [
      { fieldId: "cf-1", value: "I have read and understood." },
      { fieldId: "cf-2", value: "I consent to telehealth." },
      { fieldId: "cf-3", value: "Understood." },
      { fieldId: "cf-4", value: "Sophia Miller" },
      { fieldId: "cf-5", value: "2026-07-05" },
    ],
    submittedAt: "2026-07-05T10:15:00Z",
  },
  {
    id: "fr-8-custom",
    formEntryId: "fe-8-custom",
    clientId: "7",
    formId: "form-custom-1",
    answers: [
      { fieldId: "gi-1", value: "Sophia Miller" },
      { fieldId: "gi-2", value: "1992-04-18" },
      { fieldId: "gi-3", value: "Non-binary" },
      { fieldId: "gi-4", value: "+44 7700 900777" },
      { fieldId: "gi-5", value: "sophia.m@example.com" },
      { fieldId: "gi-6", value: "Emma Miller, +44 7700 900888" },
      { fieldId: "gi-7", value: "Social Media" },
      { fieldId: "gi-8", value: "Seeking therapy for anxiety and self-discovery." },
      { fieldId: "gi-9", value: "Build confidence." },
      { fieldId: "gi-10", value: "Reduce anxiety symptoms." },
    ],
    submittedAt: "2026-07-05T10:40:00Z",
  },
];

// ── End Intake Forms Data ─────────────────────────────────────────────────────

export const mockCareTeamMemberships: CareTeamMembership[] = [
  { clientId: "1", providerId: "prov-1", addedBy: "prov-admin", addedAt: "2024-02-10T00:00:00Z" },
  { clientId: "1", providerId: "prov-2", addedBy: "prov-admin", addedAt: "2024-02-15T00:00:00Z" },
  { clientId: "2", providerId: "prov-1", addedBy: "prov-admin", addedAt: "2024-03-01T00:00:00Z" },
  { clientId: "3", providerId: "prov-3", addedBy: "prov-admin", addedAt: "2024-03-10T00:00:00Z" },
];

export const mockClients: MockClient[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com", treatingProviderId: "prov-1" },
  { id: "2", name: "Michael Chen", email: "m.chen@example.com", treatingProviderId: "prov-1" },
  { id: "3", name: "Emma Thompson", email: "emma.t@example.com", treatingProviderId: "prov-3" },
  { id: "4", name: "David Martinez", email: "d.martinez@example.com", treatingProviderId: "prov-admin" },
  { id: "5", name: "Olivia Brown", email: "olivia.b@example.com", treatingProviderId: "prov-1" },
  { id: "6", name: "Liam Garcia", email: "liam.g@example.com", treatingProviderId: "prov-3" },
  { id: "7", name: "Sophia Miller", email: "sophia.m@example.com", treatingProviderId: "prov-1" },
];
