export interface Provider {
  id: string;
  name: string;
  email: string;
  profession: Specialty;
  credentialExpiresAt: string;
  rating: number;
  verificationStatus: "unverified" | "pending" | "verified";
  planMode: "provider" | "full-ehr" | "ai-scribe";
}

export const SPECIALTIES = [
  "Therapy", "Endocrinologist", "Yoga", "Diet", "Physiotherapy", "Women Wellness",
  "Psychiatrist", "General Physician", "Fitness", "Hypertension", "Addiction Treatment",
  "Coach", "Gynecologist", "LGBTQ", "OCD", "Cardiologist", "Orthopedician",
  "ENT Specialist", "Gastroenterologist", "Paediatrician", "Sexologist", "Dermatologist",
  "Financial Wellbeing", "Dentist", "Neurosurgeon", "Oncologist", "Ophthalmologist",
  "Urologist (Kidney & Urinary Tract)", "Nephrologist", "Pulmonologist (Lung)",
  "Rheumatologist", "Fertility/ IVF Specialist", "General Surgery", "Legal Counsellor",
] as const;
export type Specialty = (typeof SPECIALTIES)[number];

export function getCredentialExpiryStatus(expiresAt: string, now = new Date()) {
  const expires = new Date(expiresAt).getTime();
  const diffDays = Math.ceil((expires - now.getTime()) / 86400000);
  return diffDays < 0 ? "expired" : diffDays <= 30 ? "expiring" : "valid";
}

export function getScreeningScoreLabel(instrumentType: "PHQ-9" | "GAD-7" | undefined, score: number): string {
  if (instrumentType === "PHQ-9") {
    if (score <= 4) return "Minimal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately Severe";
    return "Severe";
  }
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  return "Severe";
}

export function getScreeningScoreColor(score: number): string {
  if (score >= 15) return "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800";
  if (score >= 10) return "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800";
  return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

export interface EstablishmentMember {
  providerId: string;
  establishmentId: string;
  roles: {
    isAdmin: boolean;
    clinical: "Clinician" | "Supervisor" | null;
  };
  supervises: string[];
  memberStatus: "invited" | "verification-pending" | "active" | "offboarded";
  invitedAt: string;
  joinedAt: string | null;
}

export interface CareTeamMembership {
  clientId: string;
  providerId: string;
  addedBy: string;
  addedAt: string;
}

export interface MockClient {
  id: string;
  name: string;
  email: string;
  treatingProviderId: string;
}

export type PlanTier = "FREE" | "BASIC" | "GROWTH" | "SCALER";

export const ESTABLISHMENT_TYPES = [
  "hospital",
  "clinic",
  "diagnostic",
  "nursing",
  "dental",
  "eyecare",
  "practice",
] as const;
export type EstablishmentType = (typeof ESTABLISHMENT_TYPES)[number];

export const PLAN_TIER_LIMITS: Record<PlanTier, number | null> = {
  FREE: 1,
  BASIC: 3,
  GROWTH: 10,
  SCALER: 100,
};

export const PLAN_TIER_PRICING: Record<PlanTier, number> = {
  FREE: 0,
  BASIC: 49,
  GROWTH: 99,
  SCALER: 149,
};

export const PLAN_TIER_EXTRA_COST: Record<PlanTier, number> = {
  FREE: 0,
  BASIC: 0,
  GROWTH: 19,
  SCALER: 0,
};

// ── Establishment type (canonical) ──────────────────────────────────────────

export interface Establishment {
  id: string;
  type: EstablishmentType;
  name: string;
  nameDescription?: string;
  specialties: string[];
  specialtyServices: { [key: string]: string[] };
  specialtiesDescription?: string;
  yearsInOperation: string;
  yearsInOperationDescription?: string;
  about: string;
  bedCapacity: string;
  accreditation: string;
  insuranceDescription?: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  visitingHours: {
    [key: string]: { isOpen: boolean; from: string; to: string };
  };
  coverPhoto: string;
  photos: string[];
  videoUrl: string;
  insurance: string[];
  fees: { sessionType: string; price: number }[];
  slidingScaleAvailable: boolean;
  paymentMethodsAccepted: string[];
  clientFocus: {
    ageGroups: string[];
    participants: string[];
  };
  clientFocusDescription?: string;
  communitiesServed: string[];
  therapyModalities: string[];
  therapyModalitiesDescription?: string;
  sessionFormat: "in-person" | "online" | "both";
  freeConsultation: {
    offered: boolean;
    durationMinutes?: number;
  };
  status: "draft" | "under-review" | "live";
  lastConfirmedAt: string;
  planTier: PlanTier;
  members: EstablishmentMember[];
}

// ── Controlled-list constants ───────────────────────────────────────────────

export const AGE_GROUPS = [
  "Children",
  "Teens",
  "Adults",
  "Seniors",
] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const PARTICIPANTS = [
  "Individuals",
  "Couples",
  "Families",
  "Groups",
] as const;
export type Participant = (typeof PARTICIPANTS)[number];

export const PAYMENT_METHODS = [
  "Cash",
  "Credit/Debit Card",
  "UPI",
  "Net Banking",
  "Cheque",
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const COMMUNITIES_SERVED = [
  "LGBTQ+ Friendly",
  "BIPOC",
  "Veterans",
  "Disabled",
  "Neurodivergent",
  "Religious/Spiritual",
  "Non-English Speaking",
  "Rural/Remote",
  "Low Income",
  "Seniors/Elderly",
  "Teens/Adolescents",
  "Immigrants/Refugees",
  "Substance Use Recovery",
  "Trauma Survivors",
] as const;
export type CommunityServed = (typeof COMMUNITIES_SERVED)[number];

export const THERAPY_MODALITIES = [
  "CBT",
  "DBT",
  "EMDR",
  "Psychodynamic",
  "Humanistic",
  "Mindfulness-Based",
  "Art Therapy",
  "Play Therapy",
  "Couples Therapy",
  "Family Systems",
  "Somatic Therapy",
  "ACT",
  "IPT",
  "Sensorimotor Psychotherapy",
  "Narrative Therapy",
  "Solution-Focused Brief Therapy",
  "Motivational Interviewing",
  "Trauma-Focused CBT",
] as const;
export type TherapyModality = (typeof THERAPY_MODALITIES)[number];

export const SESSION_FORMATS = ["in-person", "online", "both"] as const;
export type SessionFormat = (typeof SESSION_FORMATS)[number];

// ── Intake Forms & Flows ─────────────────────────────────────────────────────

export type FieldType =
  | "short_answer"
  | "long_answer"
  | "multiple_choice"
  | "dropdown"
  | "checkbox_multiselect"
  | "yes_no"
  | "date"
  | "agreement_text"
  | "e_signature"
  | "file_upload"
  | "screening_instrument";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
  instrumentType?: "PHQ-9" | "GAD-7";
  order: number;
  sensitive?: boolean;
}

export interface IntakeForm {
  id: string;
  establishmentId: string;
  name: string;
  description?: string;
  category: "administrative" | "clinical";
  isTemplate: boolean;
  templateSourceId?: string;
  applicableServices: string[];
  fields: FormField[];
  isArchived?: boolean;
  createdBy?: string;
}

export interface IntakeFlow {
  id: string;
  establishmentId: string;
  name: string;
  isDefault: boolean;
  formIds: string[];
}

export type FormFillStatus = "requested" | "draft" | "submitted";

export interface FormEntry {
  id: string;
  clientId: string;
  formId: string;
  providerId: string;
  status: FormFillStatus;
  requestedAt: string;
  submittedAt?: string;
  sentViaFlowId?: string;
}

export interface ScreeningAnswer {
  itemIndex: number;
  itemText: string;
  value: number;
}

export interface FormResponseAnswer {
  fieldId: string;
  value: string | string[];
  computedScore?: number;
  screeningAnswers?: ScreeningAnswer[];
}

export interface FormResponse {
  id: string;
  formEntryId: string;
  clientId: string;
  formId: string;
  answers: FormResponseAnswer[];
  submittedAt: string;
  coSignedBy?: string;
  coSignedAt?: string;
}

export const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  short_answer: "Short Answer",
  long_answer: "Long Answer",
  multiple_choice: "Multiple Choice",
  dropdown: "Dropdown",
  checkbox_multiselect: "Checkbox (Multi-Select)",
  yes_no: "Yes / No",
  date: "Date",
  agreement_text: "Agreement Text",
  e_signature: "E-Signature",
  file_upload: "File Upload",
  screening_instrument: "Screening Instrument",
};
