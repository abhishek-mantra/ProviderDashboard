export type ClaimFlowType = "mantra" | "manual" | "superbill";

import { mockClients } from "../data/mockPartnerData";

// Real clearinghouse-aligned status machine (Part 4a). The pivot point is the
// presence of a PCCN (Payer Claim Control Number) — assigned only once a claim
// reaches adjudication. Prior to that the claim never reached the payer
// (Stedi edit validation / pre-adjudication rejection) or is awaiting the
// payer's acknowledgment.
export type ClaimStatus =
  | "draft"
  | "eligibility_pending"
  | "eligibility_confirmed"
  | "eligibility_failed"
  | "submitted"
  | "awaiting_ack"
  | "no_response_investigate"
  | "stedi_validating"
  | "stedi_rejected"
  | "sent_to_payer"
  | "payer_rejected"
  | "in_adjudication"
  | "paid"
  | "denied"
  | "adjusted"
  | "manual_generated"
  | "superbill_generated"
  // Legacy statuses retained for seed/history compatibility.
  | "scrubbing"
  | "rejected"
  | "pending_with_payer"
  | "approved"
  | "pended";

export type NotesStatus = "locked" | "draft" | "unsigned";

export interface ServiceLine {
  id: string;
  sessionId: string;
  dateOfService: string;
  serviceCode: string;
  units: number;
  chargeAmount: number;
  modifiers?: string[];
}

// Mock 835-equivalent result of a real adjudication (Part 4d). allowedAmount is
// usually LESS than billedAmount (a real adjustment), patientResponsibility is
// the genuine remainder that feeds A/R follow-up.
export interface ClaimPayment {
  billedAmount: number;
  allowedAmount: number;
  paidAmount: number;
  patientResponsibility: number;
  adjustmentReason: string;
  remittanceDate: string;
  remarkCode?: string;
}

// Two-stage pre-visit estimate (Part 4d) — modeled on a real benefits-information
// response (copay, coinsurance, deductible remaining), NOT the fee schedule.
export interface BenefitEstimate {
  copayAmount: number | null;
  coinsuranceRate: number | null;
  deductibleRemaining: number | null;
  behavioralHealthCarveoutNote?: string;
}

export interface EligibilityCheck {
  requestedAt: string;
  status: "pending" | "confirmed" | "failed";
  responseAt: string | null;
  coverageActive: boolean | null;
  copayAmount: number | null;
  deductibleRemaining: number | null;
  authorizationRequired: boolean;
  rawNote: string;
  // Part 4i — distinct failure modes instead of one generic "failed"
  failureMode?: "transient_outage" | "data_mismatch" | "no_coverage" | null;
  benefitEstimate?: BenefitEstimate | null;
}

export interface ClaimStatusEvent {
  status: ClaimStatus;
  timestamp: string;
  note?: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  flowType: ClaimFlowType;
  status: ClaimStatus;
  clientId: string;
  clientName: string;
  practiceId: string;
  providerId: string;
  payerId: string | null;
  payerName: string | null;
  region: string;
  sessionIds: string[];
  diagnosisCodes: string[];
  serviceLines: ServiceLine[];
  eligibilityCheck: EligibilityCheck | null;
  authorizationCode: string | null;
  submittedDate: string | null;
  statusHistory: ClaimStatusEvent[];
  totalAmount: number;
  currency: "USD";
  createdAt: string;
  updatedAt: string;
  // Part 4a — PCCN presence distinguishes pre-adjudication from adjudication.
  pccn: string | null;
  // Part 4b — claim frequency code + patient control number.
  claimFrequencyCode: string | null;
  patientControlNumber: string | null;
  isMedicare: boolean;
  // Part 4d — post-adjudication 835-equivalent result.
  payment: ClaimPayment | null;
}

export interface FeeScheduleEntry {
  cptCode: string;
  description: string;
  providerRate: number;
}

export const MOCK_FEE_SCHEDULE: FeeScheduleEntry[] = [
  { cptCode: "90834", description: "Individual Therapy, 50 min", providerRate: 150 },
  { cptCode: "90791", description: "Psychiatric Diagnostic Evaluation", providerRate: 200 },
  { cptCode: "90847", description: "Family Therapy, 50 min", providerRate: 175 },
  { cptCode: "90837", description: "Individual Therapy, 60 min", providerRate: 185 },
  { cptCode: "99213", description: "Established Patient Visit, 30 min", providerRate: 100 },
];

export function getFeeForService(cptCode: string): number {
  const entry = MOCK_FEE_SCHEDULE.find((e) => e.cptCode === cptCode);
  return entry?.providerRate ?? 150;
}

/** Canonical service description for a CPT code (used by bill detail + invoice). */
export function getServiceDescription(cptCode: string): string {
  return (
    MOCK_FEE_SCHEDULE.find((e) => e.cptCode === cptCode)?.description || "Therapy Session"
  );
}

/**
 * Normalize a date-of-service value into a consistent "Mar 15, 2026" label.
 * Handles both ISO date-only strings ("2026-02-24") and already-formatted
 * strings ("Mar 15, 2026") so every surface renders identically.
 */
export function formatDateOfService(value: string): string {
  if (!value) return "—";
  const trimmed = value.trim();
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(trimmed);
  const date = new Date(iso ? `${trimmed}T00:00:00Z` : trimmed);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(iso ? { timeZone: "UTC" } : {}),
  });
}

/** Format a full ISO timestamp ("2026-02-24T09:00:00Z") as "Feb 24, 2026". */
export function formatDate(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export interface UnbilledSession {
  id: string;
  clientId: string;
  clientName: string;
  dateOfService: string;
  payerId: string;
  payerName: string;
  serviceType: string;
  duration: string;
  notesStatus: NotesStatus;
  notesId: string | null;
  cptCode: string;
  diagnosisCode: string;
  amount: number;
  daysSinceService: number;
  selected: boolean;
}

export interface Payer {
  id: string;
  name: string;
  intermediaryType: "clearinghouse" | "insurer_direct";
  intermediaryName: string;
}

export interface ClaimSession {
  id: string;
  clientId: string;
  clientName: string;
  serviceType: string;
  date: string;
  time: string;
  duration: string;
  hasNotes: boolean;
  selected: boolean;
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
};

export function getCurrencySymbol(key?: string): string {
  if (!key) return "$";
  return CURRENCY_SYMBOLS[key] || "$";
}

export const CLAIM_STATUS_LABELS: Record<ClaimStatus, string> = {
  draft: "Draft",
  eligibility_pending: "Eligibility Check Pending",
  eligibility_confirmed: "Eligibility Confirmed",
  eligibility_failed: "Eligibility Failed",
  submitted: "Submitted",
  awaiting_ack: "Awaiting Payer Acknowledgment",
  no_response_investigate: "No Response — Investigate",
  stedi_validating: "Stedi Validating",
  stedi_rejected: "Rejected at Clearinghouse",
  sent_to_payer: "Sent to Payer",
  payer_rejected: "Rejected by Payer",
  in_adjudication: "In Adjudication",
  paid: "Paid",
  denied: "Denied",
  adjusted: "Adjusted",
  manual_generated: "Manual Claim Generated",
  superbill_generated: "Superbill Generated",
  scrubbing: "Scrubbing",
  rejected: "Rejected",
  pending_with_payer: "Pending with Payer",
  approved: "Approved",
  pended: "Pended",
};

export const MOCK_PAYERS: Payer[] = [
  { id: "us-1", name: "UnitedHealthcare", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-2", name: "Cigna", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-3", name: "Aetna", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-4", name: "Blue Cross Blue Shield", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-5", name: "Oscar Health", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
];

// Part 4e — Transaction enrollment status, per provider × payer. This is the
// ONLY thing a clearinghouse can actually see: whether a provider is registered
// to exchange electronic transactions (claims / eligibility / ERA) with this
// specific payer. True credentialing (provider qualifications, 90–180 days) and
// payer enrollment (60–120 days) are separate, manually-tracked processes and
// are deliberately NOT conflated with this status.
export type TransactionEnrollmentStatus =
  | "not_enrolled"
  | "enrollment_pending"
  | "provider_action_required"
  | "live"
  | "rejected";

export const TRANSACTION_ENROLLMENT_LABELS: Record<TransactionEnrollmentStatus, string> = {
  not_enrolled: "Not Enrolled for Electronic Filing",
  enrollment_pending: "Enrollment Pending",
  provider_action_required: "Provider Action Required",
  live: "Enrolled for Electronic Filing",
  rejected: "Enrollment Rejected",
};

export const MOCK_TRANSACTION_ENROLLMENT: Record<string, TransactionEnrollmentStatus> = {
  "us-1": "live",
  "us-2": "live",
  "us-3": "provider_action_required",
  "us-4": "live",
  "us-5": "not_enrolled",
};

// True credentialing — manually tracked, separate from transaction enrollment.
export const MOCK_CREDENTIAL_STATUS: Record<string, "credentialed" | "not_credentialed" | "pending"> = {
  "us-1": "credentialed",
  "us-2": "credentialed",
  "us-3": "pending",
  "us-4": "credentialed",
  "us-5": "not_credentialed",
};

export function generateClaimNumber(): string {
  const num = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0");
  return `CLM-2026-${num}`;
}

// Part 4b — Patient Control Number: random 17-char-max ID, generated once at
// first submission.
export function generatePatientControlNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 17; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

// Part 4b — Claim Frequency Code:
//  - pccn null (pre-adjudication): "1" (original), reuse the same PCN
//  - pccn set, not Medicare: "7" (replacement), new PCN, include PCCN
//  - pccn set, Medicare: "1", reuse same PCN, omit PCCN
export function computeClaimFrequencyCode(
  pccn: string | null,
  isMedicare: boolean
): "1" | "7" {
  if (pccn && !isMedicare) return "7";
  return "1";
}

// Part 4a — mock PCCN assignment once a claim reaches adjudication.
export function generatePccn(): string {
  return `PCCN-${Math.floor(1000000 + Math.random() * 9000000)}`;
}

// Short fixed list of plausible denial/rejection reasons (Bug 9 / Part 4c).
export const MOCK_DENIAL_REASONS = [
  "Missing prior authorization",
  "Diagnosis/procedure mismatch",
  "Coverage terminated",
  "Service not covered under current plan benefits",
  "Invalid or missing payer ID",
  "Claim exceeds timely filing limit",
] as const;

export function findPayerForClient(client: { insuranceCompany?: string }): Payer | undefined {
  if (!client.insuranceCompany) return undefined;
  return MOCK_PAYERS.find(
    (p) => p.name.toLowerCase() === client.insuranceCompany!.toLowerCase()
  );
}

export function getMockSessions(clientId: string, clientName: string): ClaimSession[] {
  const baseDate = new Date("2026-07-01");
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - (i * 7 + 1));
    return {
      id: `sess-${clientId}-${i + 1}`,
      clientId,
      clientName,
      serviceType: "Therapy",
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: `${9 + (i % 8)}:00 ${i % 2 === 0 ? "AM" : "PM"}`,
      duration: `${30 + (i % 3) * 15} min`,
      hasNotes: i % 2 === 0,
      selected: false,
    };
  });
}

export function getMockUnbilledSessions(): UnbilledSession[] {
  const now = new Date();
  const baseClients = [
    { clientId: "1", clientName: "Sarah Johnson", payerId: "us-1", payerName: "UnitedHealthcare" },
    { clientId: "5", clientName: "Olivia Brown", payerId: "us-2", payerName: "Cigna" },
    { clientId: "8", clientName: "Aisha Patel", payerId: "us-4", payerName: "Blue Cross Blue Shield" },
  ];
  const diagnosisForClient = (clientId: string): string =>
    mockClients.find((c) => c.id === clientId)?.diagnosisCode ?? "Z03.89";
  const serviceTypes = [
    { serviceType: "Individual Therapy, 50 min", duration: "50 min", cptCode: "90834" },
    { serviceType: "Individual Therapy, 45 min", duration: "45 min", cptCode: "90834" },
    { serviceType: "Psychiatric Diagnostic Evaluation", duration: "60 min", cptCode: "90791" },
    { serviceType: "Family Therapy, 50 min", duration: "50 min", cptCode: "90847" },
  ];
  const sessions: UnbilledSession[] = [];
  let idCounter = 0;
  baseClients.forEach((client) => {
    for (let i = 0; i < 3; i++) {
      idCounter++;
      const d = new Date(now);
      d.setDate(d.getDate() - (idCounter * 5 + i * 2));
      const st = serviceTypes[(idCounter + i) % serviceTypes.length];
      const hasNotes = i !== 1;
      sessions.push({
        id: `unbilled-${idCounter}`,
        clientId: client.clientId,
        clientName: client.clientName,
        dateOfService: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        payerId: client.payerId,
        payerName: client.payerName,
        serviceType: st.serviceType,
        duration: st.duration,
        notesStatus: hasNotes ? "locked" : "draft",
        notesId: hasNotes ? `note-${idCounter}` : null,
        cptCode: st.cptCode,
        diagnosisCode: diagnosisForClient(client.clientId),
        amount: getFeeForService(st.cptCode),
        daysSinceService: Math.floor((now.getTime() - d.getTime()) / 86400000),
        selected: false,
      });
    }
  });
  return sessions;
}
