import type { MockClient, Bill, DiagnosisTreatmentPlan } from "../types/partnerDashboard";
import type { Claim } from "../types/claims";

export interface DemoSession {
  id: string;
  clientId?: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "done" | "pending";
  avatar: string;
  needsAccept?: boolean;
  serviceType?: string;
  platform?: string;
  aiNotetakerEnabled?: boolean;
  hasTranscript?: boolean;
  cptCode?: string;
  fee?: number;
  credits?: number;
  isDemo?: boolean;
}

export const DEMO_CARL_ROGERS_CLIENT: MockClient = {
  id: "demo-carl-rogers",
  name: "Carl Rogers",
  email: "carl.rogers@demo.mantra.care",
  practiceId: "practice-1",
  treatingProviderId: "prov-admin",
  insuranceCompany: "BlueCross BlueShield",
  insurances: ["BlueCross BlueShield PPO (ID: BCBS-884920)"],
  diagnosisCode: "F41.1",
  insuranceDetails: {
    subscriberId: "BCBS-884920",
    groupNumber: "GRP-99201",
    relationship: "self",
    copay: 30,
    coinsurancePercent: 20,
    deductibleTotal: 1000,
    deductibleRemaining: 500,
  },
  billingAddress: {
    line1: "123 Oak Street, Suite 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  },
  phone: "(555) 234-5678",
  notes: "Pre-loaded Demo Patient for testing ambient AI transcription, SOAP charting, and CPT 90834 billing.",
};

export const DEMO_CARL_ROGERS_SESSION: DemoSession = {
  id: "demo-sess-carl-rogers",
  clientId: "demo-carl-rogers",
  clientName: "Carl Rogers",
  service: "Individual Psychotherapy",
  date: "Today at 2:00 PM",
  time: "2:00 PM",
  duration: "45 min",
  status: "upcoming",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwaGVhZHNob3R8ZW58MHx8fHwxNzc0MjM1Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  serviceType: "Personal",
  platform: "Telehealth Video",
  aiNotetakerEnabled: true,
  cptCode: "90834",
  fee: 150,
  isDemo: true,
};

export const DEMO_CARL_ROGERS_BILL: Bill = {
  id: "demo-bill-carl-rogers",
  billNumber: "BILL-2026-DEMO",
  clientId: "demo-carl-rogers",
  clientName: "Carl Rogers",
  practiceId: "practice-1",
  sessionId: "demo-sess-carl-rogers",
  amount: 150,
  clientOwed: 30,
  insuranceOwed: 120,
  clientPaid: 0,
  insurancePaid: 0,
  paidAmount: 0,
  status: "unresolved",
  billType: "insurance",
  dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
  cptCode: "90834",
  diagnosisCodes: ["F41.1"],
  currency: "USD",
  createdAt: new Date().toISOString(),
};

export const DEMO_CARL_ROGERS_CLAIM: Claim = {
  id: "demo-claim-carl-rogers",
  claimNumber: "CLM-2026-DEMO",
  flowType: "mantra",
  status: "ready_to_submit",
  clientId: "demo-carl-rogers",
  clientName: "Carl Rogers",
  practiceId: "practice-1",
  providerId: "prov-admin",
  payerId: "bcbs-1",
  payerName: "BlueCross BlueShield",
  region: "US",
  sessionIds: ["demo-sess-carl-rogers"],
  diagnosisCodes: ["F41.1"],
  serviceLines: [
    { id: "sl-demo-1", sessionId: "demo-sess-carl-rogers", dateOfService: "Today", serviceCode: "90834", units: 1, chargeAmount: 150 },
  ],
  eligibilityCheck: {
    requestedAt: new Date().toISOString(),
    status: "confirmed",
    responseAt: new Date().toISOString(),
    coverageActive: true,
    copayAmount: 30,
    deductibleRemaining: 500,
    authorizationRequired: false,
    rawNote: "[DEMO SANDBOX] Coverage active. Copay: $30. Deductible remaining: $500.",
  },
  totalAmount: 150,
  currency: "USD",
  patientControlNumber: "PCN-DEMO-ROGERS",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const DEMO_CARL_ROGERS_PLAN: DiagnosisTreatmentPlan = {
  id: "demo-plan-carl-rogers",
  clientId: "demo-carl-rogers",
  diagnosisCodes: ["F41.1"],
  treatmentPlanNotes: "Weekly Cognitive Behavioral Therapy (CBT) & Mindfulness-Based Stress Reduction for Generalized Anxiety Disorder.",
  assignedProviderId: "prov-admin",
  effectiveDate: "2026-01-15",
  isLocked: true,
  createdAt: new Date().toISOString(),
  lockedAt: new Date().toISOString(),
};
