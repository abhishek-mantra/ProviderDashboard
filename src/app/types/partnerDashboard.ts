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

export const BASE_ROLES = [
  "Admin",
  "Clinician",
  "Supervisor",
  "Accountant",
  "Reception/Billing",
] as const;
export type BaseRole = (typeof BASE_ROLES)[number];

export interface PermissionSet {
  viewOwnClients: boolean;
  viewAllPracticeClients: boolean;
  viewClinicalNotes: boolean;
  manageTeam: boolean;
  manageBilling: boolean;
  viewFinancialReports: boolean;
  manageClientRecords: boolean;
  manageAvailabilitySchedule: boolean;
  manageEstablishmentSettings: boolean;
}

export const ROLE_PERMISSION_DEFAULTS: Record<BaseRole, PermissionSet> = {
  Admin: {
    viewOwnClients: true, viewAllPracticeClients: true, viewClinicalNotes: false,
    manageTeam: true, manageBilling: true, viewFinancialReports: true,
    manageClientRecords: true, manageAvailabilitySchedule: true,
    manageEstablishmentSettings: false,
  },
  Clinician: {
    viewOwnClients: true, viewAllPracticeClients: false, viewClinicalNotes: true,
    manageTeam: false, manageBilling: false, viewFinancialReports: false,
    manageClientRecords: false, manageAvailabilitySchedule: true,
    manageEstablishmentSettings: false,
  },
  Supervisor: {
    viewOwnClients: true, viewAllPracticeClients: false, viewClinicalNotes: true,
    manageTeam: false, manageBilling: false, viewFinancialReports: false,
    manageClientRecords: false, manageAvailabilitySchedule: true,
    manageEstablishmentSettings: false,
  },
  Accountant: {
    viewOwnClients: false, viewAllPracticeClients: false, viewClinicalNotes: false,
    manageTeam: false, manageBilling: true, viewFinancialReports: true,
    manageClientRecords: false, manageAvailabilitySchedule: false,
    manageEstablishmentSettings: false,
  },
  "Reception/Billing": {
    viewOwnClients: false, viewAllPracticeClients: true, viewClinicalNotes: false,
    manageTeam: false, manageBilling: true, viewFinancialReports: false,
    manageClientRecords: true, manageAvailabilitySchedule: true,
    manageEstablishmentSettings: false,
  },
};

export interface CustomRole {
  id: string;
  establishmentId: string;
  name: string;
  basedOnRole?: BaseRole;
  permissions: PermissionSet;
}

export interface Practice {
  id: string;
  establishmentId: string;
  name: string;
  type: EstablishmentType;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  visitingHours: { [key: string]: { isOpen: boolean; from: string; to: string } };
  specialties: string[];
  specialtyServices: { [key: string]: string[] };
  fees: { sessionType: string; price: number }[];
  slidingScaleAvailable: boolean;
  paymentMethodsAccepted: string[];
  clientFocus: { ageGroups: string[]; participants: string[] };
  communitiesServed: string[];
  therapyModalities: string[];
  sessionFormat: "in-person" | "online" | "both";
  freeConsultation: { offered: boolean; durationMinutes?: number };
  insurance: string[];
  coverPhoto: string;
  photos: string[];
  status: "draft" | "under-review" | "live";
}

export interface PracticeMember {
  providerId: string;
  practiceId: string;
  establishmentId: string;
  role: BaseRole | { customRoleId: string };
  isSupervisorRole: boolean;
  supervises: string[];
  memberStatus: "invited" | "verification-pending" | "active" | "offboarded";
  invitedAt: string;
  joinedAt: string | null;
}

export interface EstablishmentSuperAdmin {
  providerId: string;
  establishmentId: string;
  grantedAt: string;
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
  practiceId: string;
  treatingProviderId: string;
  insuranceCompany?: string;
  /** Secondary/alternative insurance plans. Primary plan is `insuranceCompany`; these are selectable in Create Bill. */
  insurances?: string[];
  diagnosisCode: string | null;
  referredFromClientId?: string;
  /** Contact / coverage details shown in the billing panel. Optional for the prototype. */
  phone?: string;
  address?: string;
  memberId?: string;
  copayAmount?: number;
  coinsuranceRate?: number;
  /** Unapplied credit/payment on account — not yet matched to a specific bill. Shown as "Unallocated". */
  unappliedPayment?: number;
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
  about: string;
  accreditation: string;
  bedCapacity: string;
  yearsInOperation: string;
  lastConfirmedAt: string;
  planTier: PlanTier;
  practiceIds: string[];
  superAdmins: EstablishmentSuperAdmin[];
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

// ── RCM Data Models ─────────────────────────────────────────────────────────

export interface DiagnosisTreatmentPlan {
  id: string;
  clientId: string;
  diagnosisCodes: string[];
  treatmentPlanNotes?: string;
  assignedProviderId: string;
  effectiveDate: string;
  isLocked: boolean;
  createdAt: string;
  lockedAt?: string;
}

export function getActiveDiagnosisForDate(
  clientId: string,
  appointmentDate: string,
  plans: DiagnosisTreatmentPlan[]
): string[] {
  if (!Array.isArray(plans)) return [];
  // resolves the most recent locked plan with effectiveDate <= appointmentDate
  const validPlans = plans
    .filter((p) => p.clientId === clientId && p.isLocked && p.effectiveDate <= appointmentDate)
    .sort((a, b) => (a.effectiveDate > b.effectiveDate ? -1 : a.effectiveDate < b.effectiveDate ? 1 : 0));
  return validPlans.length > 0 ? validPlans[0].diagnosisCodes : [];
}

export type WriteOffReason =
  | "bad_debt"
  | "financial_hardship"
  | "goodwill_adjustment"
  | "timely_filing_expired"
  | "client_deceased"
  | "other";

export const WRITE_OFF_REASON_LABELS: Record<WriteOffReason, string> = {
  bad_debt: "Bad debt / uncollectible",
  financial_hardship: "Financial hardship waiver",
  goodwill_adjustment: "Provider goodwill adjustment",
  timely_filing_expired: "Timely filing expired",
  client_deceased: "Client deceased",
  other: "Other",
};

export interface BillServiceLine {
  sessionId: string;
  cptCode: string;
  dateOfService: string;
  description: string;
  amount: number;
}

export type BillType = "insurance" | "self_pay";

export type BillCurrency = "USD" | "CAD" | "GBP" | "EUR";

export interface Bill {
  id: string;
  billNumber: string;              // e.g. "BILL-2026-0142"
  clientId: string;
  clientName: string;
  providerId: string;
  /** The type of bill this is — explicit payer split vs self-pay. */
  billType: BillType;
  /** Insurer name (populated for insurance bills). Mirrors payerName. */
  insurerName?: string | null;
  /** Due date (ISO). Derived at creation (billing term) for display. */
  dueDate: string;
  /** Dual-payer split (copay model). Client owes AND insurance owes simultaneously. */
  clientOwed: number;
  clientPaid: number;
  insuranceOwed: number;
  insurancePaid: number;
  /** Written-off portion on each side (money we won't collect). */
  clientWriteOff?: number;
  insuranceWriteOff?: number;
  sessionId: string;               // primary (first) session id
  dateOfService: string;
  cptCode: string;                 // primary (first) line cpt
  diagnosisCodes: string[];
  /** Total amount — equals clientOwed + insuranceOwed. */
  amount: number;
  /** ISO currency code for the bill (defaults to "USD"). */
  currency?: BillCurrency;
  paidAmount?: number;
  writeOffAmount?: number;
  payerId: string | null;
  payerName: string | null;
  resolutionMethod: "cash" | "online" | "insurance" | "write_off" | null;
  status: "unresolved" | "paid_direct" | "claim_pending" | "paid_via_claim" | "written_off";
  claimId: string | null;
  writeOffReason?: WriteOffReason | null;
  writeOffNote?: string;
  writeOffBy?: string;
  createdAt: string;
  resolvedAt: string | null;
  /** All session ids billed on this bill (primary first). Present on grouped bills. */
  sessionIds?: string[];
  /** Per-line breakdown. Undefined for single-session bills. */
  serviceLines?: BillServiceLine[];
}

/** Client's remaining balance on a bill. */
export function getClientDue(bill: Bill): number {
  return (bill.clientOwed || 0) - (bill.clientPaid || 0) - (bill.clientWriteOff || 0);
}

/** Insurance's remaining balance on a bill. */
export function getInsuranceDue(bill: Bill): number {
  return (bill.insuranceOwed || 0) - (bill.insurancePaid || 0) - (bill.insuranceWriteOff || 0);
}

/** Total due across both sides. */
export function getTotalDue(bill: Bill): number {
  return getClientDue(bill) + getInsuranceDue(bill);
}

/** True when every dollar owed has been collected (or written off). */
export function isBillSettled(bill: Bill): boolean {
  if (bill.status === "written_off") return true;
  return getTotalDue(bill) <= 0.001;
}

export interface PriorAuthorization {
  id: string;
  clientId: string;
  payerId: string;
  serviceType: string;
  status: "not_required" | "pending" | "approved" | "denied" | "expired";
  authorizationNumber: string | null;
  requestedAt: string;
  decidedAt: string | null;
  validUntil: string | null;
  linkedBillIds: string[];
}

export interface RemittanceRecord {
  id: string;
  claimId: string;
  billedAmount: number;
  allowedAmount: number;
  paidAmount: number;
  patientResponsibility: number;
  adjustmentReason: string | null;
  postedAt: string;
  discrepancyFlag: boolean;
}
