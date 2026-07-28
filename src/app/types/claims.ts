export type ClaimRegion = "US" | "UK" | "CA" | "AE";
export type ClaimFlowType = "mantra" | "manual" | "superbill";

export type ClaimStatus =
  | "draft"
  | "eligibility_pending"
  | "eligibility_confirmed"
  | "eligibility_failed"
  | "submitted"
  | "scrubbing"
  | "rejected_by_intermediary"
  | "pending_with_payer"
  | "approved"
  | "denied"
  | "paid"
  | "manual_generated"
  | "superbill_generated";

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
  region: ClaimRegion;
  status: ClaimStatus;
  clientId: string;
  clientName: string;
  practiceId: string;
  providerId: string;
  payerId: string | null;
  payerName: string | null;
  sessionIds: string[];
  diagnosisCodes: string[];
  serviceLines: ServiceLine[];
  eligibilityCheck: EligibilityCheck | null;
  authorizationCode: string | null;
  submittedDate: string | null;
  statusHistory: ClaimStatusEvent[];
  totalAmount: number;
  currency: "USD" | "GBP" | "CAD" | "AED";
  createdAt: string;
  updatedAt: string;
}

export interface Payer {
  id: string;
  name: string;
  region: ClaimRegion;
  intermediaryType: "clearinghouse" | "insurer_direct" | "eclaims" | "eclaimlink";
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

export const REGION_LABELS: Record<ClaimRegion, string> = {
  US: "United States",
  UK: "United Kingdom",
  CA: "Canada",
  AE: "United Arab Emirates",
};

export const REGION_CURRENCIES: Record<ClaimRegion, "USD" | "GBP" | "CAD" | "AED"> = {
  US: "USD",
  UK: "GBP",
  CA: "CAD",
  AE: "AED",
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  GBP: "£",
  CAD: "C$",
  AED: "AED ",
  US: "$",
  UK: "£",
  CA: "C$",
  AE: "AED ",
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
  rejected_by_intermediary: "Rejected by Intermediary",
  pending_with_payer: "Pending with Payer",
  approved: "Approved",
  denied: "Denied",
  paid: "Paid",
  manual_generated: "Manual Claim Generated",
  superbill_generated: "Superbill Generated",
};

export const INTERMEDIARY_NAMES: Record<ClaimRegion, string[]> = {
  US: ["Claim.MD"],
  UK: ["Healthcode"],
  CA: ["TELUS Health eClaims"],
  AE: ["eClaimLink (DHA)"],
};

export const MOCK_PAYERS: Payer[] = [
  { id: "us-1", name: "UnitedHealthcare", region: "US", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-2", name: "Cigna", region: "US", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-3", name: "Aetna", region: "US", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-4", name: "Blue Cross Blue Shield", region: "US", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "us-5", name: "Oscar Health", region: "US", intermediaryType: "clearinghouse", intermediaryName: "Claim.MD" },
  { id: "uk-1", name: "Bupa", region: "UK", intermediaryType: "clearinghouse", intermediaryName: "Healthcode" },
  { id: "uk-2", name: "AXA Health", region: "UK", intermediaryType: "clearinghouse", intermediaryName: "Healthcode" },
  { id: "uk-3", name: "Vitality", region: "UK", intermediaryType: "clearinghouse", intermediaryName: "Healthcode" },
  { id: "uk-4", name: "Aviva", region: "UK", intermediaryType: "clearinghouse", intermediaryName: "Healthcode" },
  { id: "ca-1", name: "Sun Life", region: "CA", intermediaryType: "eclaims", intermediaryName: "TELUS Health eClaims" },
  { id: "ca-2", name: "Manulife", region: "CA", intermediaryType: "eclaims", intermediaryName: "TELUS Health eClaims" },
  { id: "ca-3", name: "Canada Life", region: "CA", intermediaryType: "eclaims", intermediaryName: "TELUS Health eClaims" },
  { id: "ae-1", name: "NextCare", region: "AE", intermediaryType: "eclaimlink", intermediaryName: "eClaimLink (DHA)" },
  { id: "ae-2", name: "NAS", region: "AE", intermediaryType: "eclaimlink", intermediaryName: "eClaimLink (DHA)" },
  { id: "ae-3", name: "MedNet", region: "AE", intermediaryType: "eclaimlink", intermediaryName: "eClaimLink (DHA)" },
];

export const MOCK_CREDENTIAL_STATUS: Record<string, "credentialed" | "not_credentialed" | "pending"> = {
  "us-1": "credentialed",
  "us-2": "credentialed",
  "us-3": "pending",
  "us-4": "credentialed",
  "us-5": "not_credentialed",
  "uk-1": "credentialed",
  "uk-2": "credentialed",
  "uk-3": "not_credentialed",
  "uk-4": "pending",
  "ca-1": "credentialed",
  "ca-2": "not_credentialed",
  "ca-3": "pending",
  "ae-1": "credentialed",
  "ae-2": "not_credentialed",
  "ae-3": "pending",
};

export function generateClaimNumber(): string {
  const num = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0");
  return `CLM-2026-${num}`;
}

export function findPayerForClient(client: { insuranceRegion?: ClaimRegion; insuranceCompany?: string }): Payer | undefined {
  if (!client.insuranceRegion || !client.insuranceCompany) {
    if (client.insuranceRegion) {
      return MOCK_PAYERS.find((p) => p.region === client.insuranceRegion);
    }
    return undefined;
  }
  const match = MOCK_PAYERS.find(
    (p) => p.region === client.insuranceRegion && p.name.toLowerCase() === client.insuranceCompany!.toLowerCase()
  );
  return match || MOCK_PAYERS.find((p) => p.region === client.insuranceRegion);
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
