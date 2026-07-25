import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Claim, ClaimStatus, ClaimStatusEvent, ClaimRegion, ClaimFlowType, ServiceLine, EligibilityCheck } from "../types/claims";
import { generateClaimNumber } from "../types/claims";

interface ClaimContextType {
  claims: Claim[];
  addClaim: (claim: Claim) => void;
  updateClaimStatus: (claimId: string, status: ClaimStatus, note?: string) => void;
  updateClaim: (claimId: string, updates: Partial<Claim>) => void;
  getClaim: (claimId: string) => Claim | undefined;
  createNewClaim: (params: {
    flowType: ClaimFlowType;
    region: ClaimRegion;
    clientId: string;
    clientName: string;
    providerId: string;
    payerId?: string | null;
    payerName?: string | null;
    sessionIds?: string[];
    serviceLines?: ServiceLine[];
    diagnosisCodes?: string[];
  }) => Claim;
}

const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

function createInitialClaims(): Claim[] {
  return [
    {
      id: "seed-1",
      claimNumber: "CLM-2026-001",
      flowType: "mantra",
      region: "US",
      status: "approved",
      clientId: "1",
      clientName: "Sarah Johnson",
      providerId: "prov-1",
      payerId: "us-1",
      payerName: "UnitedHealthcare",
      sessionIds: ["sess-1-1", "sess-1-2"],
      diagnosisCodes: ["F41.1"],
      serviceLines: [
        { id: "sl-1", sessionId: "sess-1-1", dateOfService: "Feb 24, 2026", serviceCode: "90834", units: 1, chargeAmount: 150 },
        { id: "sl-2", sessionId: "sess-1-2", dateOfService: "Feb 13, 2026", serviceCode: "90834", units: 1, chargeAmount: 150 },
      ],
      eligibilityCheck: {
        requestedAt: "2026-02-10T10:00:00Z",
        status: "confirmed",
        responseAt: "2026-02-10T10:03:00Z",
        coverageActive: true,
        copayAmount: 30,
        deductibleRemaining: 500,
        authorizationRequired: false,
        rawNote: "[MOCK] Coverage active. Copay: $30. Deductible remaining: $500.",
      },
      authorizationCode: null,
      submittedDate: "2026-02-25T10:00:00Z",
      statusHistory: [
        { status: "draft", timestamp: "2026-02-10T09:00:00Z" },
        { status: "eligibility_confirmed", timestamp: "2026-02-10T10:03:00Z" },
        { status: "submitted", timestamp: "2026-02-25T10:00:00Z" },
        { status: "scrubbing", timestamp: "2026-02-25T10:02:00Z" },
        { status: "pending_with_payer", timestamp: "2026-02-25T10:05:00Z" },
        { status: "approved", timestamp: "2026-03-01T14:00:00Z" },
      ],
      totalAmount: 300,
      currency: "USD",
      createdAt: "2026-02-10T09:00:00Z",
      updatedAt: "2026-03-01T14:00:00Z",
    },
    {
      id: "seed-2",
      claimNumber: "CLM-2026-002",
      flowType: "mantra",
      region: "US",
      status: "pending_with_payer",
      clientId: "2",
      clientName: "Rachit Sharma",
      providerId: "prov-1",
      payerId: "us-2",
      payerName: "Cigna",
      sessionIds: ["sess-2-1"],
      diagnosisCodes: ["F32.9"],
      serviceLines: [
        { id: "sl-3", sessionId: "sess-2-1", dateOfService: "Mar 10, 2026", serviceCode: "90834", units: 1, chargeAmount: 120 },
      ],
      eligibilityCheck: {
        requestedAt: "2026-03-08T10:00:00Z",
        status: "confirmed",
        responseAt: "2026-03-08T10:03:00Z",
        coverageActive: true,
        copayAmount: 25,
        deductibleRemaining: 200,
        authorizationRequired: false,
        rawNote: "[MOCK] Coverage active. Copay: $25.",
      },
      authorizationCode: null,
      submittedDate: "2026-03-12T10:00:00Z",
      statusHistory: [
        { status: "draft", timestamp: "2026-03-08T09:00:00Z" },
        { status: "eligibility_confirmed", timestamp: "2026-03-08T10:03:00Z" },
        { status: "submitted", timestamp: "2026-03-12T10:00:00Z" },
        { status: "scrubbing", timestamp: "2026-03-12T10:02:00Z" },
        { status: "pending_with_payer", timestamp: "2026-03-12T10:05:00Z" },
      ],
      totalAmount: 120,
      currency: "USD",
      createdAt: "2026-03-08T09:00:00Z",
      updatedAt: "2026-03-12T10:05:00Z",
    },
    {
      id: "seed-3",
      claimNumber: "CLM-2026-003",
      flowType: "mantra",
      region: "US",
      status: "denied",
      clientId: "5",
      clientName: "Mohini",
      providerId: "prov-1",
      payerId: "us-4",
      payerName: "Blue Cross Blue Shield",
      sessionIds: ["sess-5-1"],
      diagnosisCodes: ["F41.9"],
      serviceLines: [
        { id: "sl-4", sessionId: "sess-5-1", dateOfService: "Mar 3, 2026", serviceCode: "90837", units: 1, chargeAmount: 85 },
      ],
      eligibilityCheck: {
        requestedAt: "2026-03-01T10:00:00Z",
        status: "confirmed",
        responseAt: "2026-03-01T10:03:00Z",
        coverageActive: true,
        copayAmount: 20,
        deductibleRemaining: 100,
        authorizationRequired: false,
        rawNote: "[MOCK] Coverage active. Copay: $20.",
      },
      authorizationCode: null,
      submittedDate: "2026-03-05T10:00:00Z",
      statusHistory: [
        { status: "draft", timestamp: "2026-03-01T09:00:00Z" },
        { status: "eligibility_confirmed", timestamp: "2026-03-01T10:03:00Z" },
        { status: "submitted", timestamp: "2026-03-05T10:00:00Z" },
        { status: "pending_with_payer", timestamp: "2026-03-05T10:05:00Z" },
        { status: "denied", timestamp: "2026-03-10T14:00:00Z", note: "[MOCK] Denial reason: Service not covered under current plan benefits." },
      ],
      totalAmount: 85,
      currency: "USD",
      createdAt: "2026-03-01T09:00:00Z",
      updatedAt: "2026-03-10T14:00:00Z",
    },
    {
      id: "seed-4",
      claimNumber: "CLM-2026-047",
      flowType: "manual",
      region: "US",
      status: "manual_generated",
      clientId: "4",
      clientName: "Manisha",
      providerId: "prov-1",
      payerId: null,
      payerName: null,
      sessionIds: ["sess-4-1"],
      diagnosisCodes: ["F43.22"],
      serviceLines: [
        { id: "sl-5", sessionId: "sess-4-1", dateOfService: "Feb 26, 2026", serviceCode: "90834", units: 1, chargeAmount: 110 },
      ],
      eligibilityCheck: null,
      authorizationCode: null,
      submittedDate: "2026-02-28T10:00:00Z",
      statusHistory: [
        { status: "draft", timestamp: "2026-02-26T09:00:00Z" },
        { status: "manual_generated", timestamp: "2026-02-28T10:00:00Z" },
      ],
      totalAmount: 110,
      currency: "USD",
      createdAt: "2026-02-26T09:00:00Z",
      updatedAt: "2026-02-28T10:00:00Z",
    },
  ];
}

export function ClaimProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>(createInitialClaims);

  const addClaim = useCallback((claim: Claim) => {
    setClaims((prev) => [...prev, claim]);
  }, []);

  const updateClaimStatus = useCallback((claimId: string, status: ClaimStatus, note?: string) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== claimId) return c;
        const event: ClaimStatusEvent = {
          status,
          timestamp: new Date().toISOString(),
          ...(note ? { note } : {}),
        };
        return {
          ...c,
          status,
          statusHistory: [...c.statusHistory, event],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const updateClaim = useCallback((claimId: string, updates: Partial<Claim>) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      )
    );
  }, []);

  const getClaim = useCallback(
    (claimId: string) => claims.find((c) => c.id === claimId),
    [claims]
  );

  const createNewClaim = useCallback(
    (params: {
      flowType: ClaimFlowType;
      region: ClaimRegion;
      clientId: string;
      clientName: string;
      providerId: string;
      payerId?: string | null;
      payerName?: string | null;
      sessionIds?: string[];
      serviceLines?: ServiceLine[];
      diagnosisCodes?: string[];
    }) => {
      const now = new Date().toISOString();
      const currencyMap: Record<ClaimRegion, "USD" | "GBP" | "CAD" | "AED"> = {
        US: "USD",
        UK: "GBP",
        CA: "CAD",
        AE: "AED",
      };
      const defaultServiceCodes: Record<ClaimRegion, string> = {
        US: "90834",
        UK: "MH001",
        CA: "1.xx.12",
        AE: "90834",
      };

      const finalServiceLines: ServiceLine[] =
        params.serviceLines && params.serviceLines.length > 0
          ? params.serviceLines
          : (params.sessionIds || []).map((sessionId, idx) => ({
              id: `sl-${Date.now()}-${idx}`,
              sessionId,
              dateOfService: new Date().toISOString().split("T")[0],
              serviceCode: defaultServiceCodes[params.region] || "90834",
              units: 1,
              chargeAmount: 100,
            }));

      const totalAmount = finalServiceLines.reduce((sum, sl) => sum + sl.chargeAmount, 0);

      const newClaim: Claim = {
        id: `claim-${Date.now()}`,
        claimNumber: generateClaimNumber(),
        flowType: params.flowType,
        region: params.region,
        status: "draft",
        clientId: params.clientId,
        clientName: params.clientName,
        providerId: params.providerId,
        payerId: params.payerId || null,
        payerName: params.payerName || null,
        sessionIds: params.sessionIds || [],
        diagnosisCodes: params.diagnosisCodes || [],
        serviceLines: finalServiceLines,
        eligibilityCheck: null,
        authorizationCode: null,
        submittedDate: null,
        statusHistory: [{ status: "draft", timestamp: now }],
        totalAmount,
        currency: currencyMap[params.region],
        createdAt: now,
        updatedAt: now,
      };
      addClaim(newClaim);
      return newClaim;
    },
    [addClaim]
  );

  return (
    <ClaimContext.Provider
      value={{ claims, addClaim, updateClaimStatus, updateClaim, getClaim, createNewClaim }}
    >
      {children}
    </ClaimContext.Provider>
  );
}

export function useClaims() {
  const context = useContext(ClaimContext);
  if (!context) {
    throw new Error("useClaims must be used within ClaimProvider");
  }
  return context;
}
