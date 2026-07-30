export type ClaimFlowType = "mantra" | "manual" | "superbill";

import { mockClients } from "../data/mockPartnerData";

export type ClaimStatus =
  | "draft"
  | "eligibility_pending"
  | "eligibility_confirmed"
  | "eligibility_failed"
  | "submitted"
  | "scrubbing"
  | "rejected"
  | "pending_with_payer"
  | "approved"
  | "denied"
  | "pended"
  | "paid"
  | "manual_generated"
  | "superbill_generated";

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

export interface EligibilityCheck {
  requestedAt: string;
  status: "pending" | "confirmed" | "failed";
  responseAt: string | null;
  coverageActive: boolean | null;
  copayAmount: number | null;
  deductibleRemaining: number | null;
  authorizationRequired: boolean;
  rawNote: string;
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
  scrubbing: "Scrubbing",
  rejected: "Rejected",
  pending_with_payer: "Pending with Payer",
  approved: "Approved",
  denied: "Denied",
  pended: "Pended",
  paid: "Paid",
  manual_generated: "Manual Claim Generated",
  superbill_generated: "Superbill Generated",
};

export const MOCK_PAYERS: Payer[] = [
  { id: "us-1", name: "UnitedHealthcare", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-2", name: "Cigna", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-3", name: "Aetna", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-4", name: "Blue Cross Blue Shield", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-5", name: "Oscar Health", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
];

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
