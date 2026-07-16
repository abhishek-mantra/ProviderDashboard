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

export type PlanTier = "BASIC" | "GROWTH" | "SCALER";

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
  BASIC: 1,
  GROWTH: 5,
  SCALER: null,
};

export const PLAN_TIER_PRICING: Record<PlanTier, number> = {
  BASIC: 49,
  GROWTH: 79,
  SCALER: 99,
};

export const PLAN_TIER_EXTRA_COST: Record<PlanTier, number> = {
  BASIC: 0,
  GROWTH: 19,
  SCALER: 0,
};
