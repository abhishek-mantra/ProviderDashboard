import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Claim, ClaimStatus, ClaimStatusEvent, ClaimFlowType, ServiceLine, UnbilledSession, FeeScheduleEntry } from "../types/claims";
import { generateClaimNumber, generatePatientControlNumber, generatePccn, computeClaimFrequencyCode, getMockUnbilledSessions, MOCK_FEE_SCHEDULE, getFeeForService } from "../types/claims";
import { generateId } from "../utils/id";

interface ClaimContextType {
  claims: Claim[];
  unbilledSessions: UnbilledSession[];
  addClaim: (claim: Claim) => void;
  updateClaimStatus: (claimId: string, status: ClaimStatus, note?: string) => void;
  updateClaim: (claimId: string, updates: Partial<Claim>) => void;
  getClaim: (claimId: string) => Claim | undefined;
  markSessionsBilled: (sessionIds: string[]) => void;
  unmarkSessionsBilled: (sessions: UnbilledSession[]) => void;
  addUnbilledSession: (session: UnbilledSession) => void;
  signAndLockSession: (sessionId: string, diagnosisCode: string, cptCode: string) => void;
  createNewClaim: (params: {
    flowType: ClaimFlowType;
    clientId: string;
    clientName: string;
    providerId: string;
    payerId?: string | null;
    payerName?: string | null;
    sessionIds?: string[];
    serviceLines?: ServiceLine[];
    diagnosisCodes?: string[];
  }) => Claim;
  // Part 4a — real clearinghouse submission & adjudication simulation.
  simulateClearinghouseSubmission: (claimId: string) => void;
  simulatePayerAdjudication: (claimId: string) => void;
  reopenForResubmission: (claimId: string) => void;
  // Part 4i — mock eligibility response with distinct failure modes.
  runEligibilityCheck: (claimId: string, outcome: "confirmed" | "transient_outage" | "data_mismatch" | "no_coverage") => void;
  feeSchedule: FeeScheduleEntry[];
  updateFeeSchedule: (entry: FeeScheduleEntry) => void;
  getFeeForService: (cptCode: string) => number;
}

const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

function createInitialClaims(): Claim[] {
  return [
    {
      id: "seed-1",
      claimNumber: "CLM-2026-001",
      flowType: "mantra",
      status: "approved",
      clientId: "1",
      clientName: "Sarah Johnson",
      practiceId: "practice-1",
      providerId: "prov-1",
      payerId: "us-1",
      payerName: "UnitedHealthcare",
      region: "US",
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
        benefitEstimate: {
          copayAmount: 30,
          coinsuranceRate: null,
          deductibleRemaining: 500,
          behavioralHealthCarveoutNote:
            "This plan may carve out behavioral health to a separate administrator (e.g., BCBS → Magellan). Pre-visit estimate is best-available signal, not a guarantee.",
        },
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
      pccn: "PCCN-1000001",
      claimFrequencyCode: "7",
      patientControlNumber: "PCN-SEED1A2B3C4D5E6F7",
      isMedicare: false,
      payment: null,
      createdAt: "2026-02-10T09:00:00Z",
      updatedAt: "2026-03-01T14:00:00Z",
    },
    {
      id: "seed-2",
      claimNumber: "CLM-2026-002",
      flowType: "mantra",
      status: "pending_with_payer",
      clientId: "2",
      clientName: "Michael Chen",
      practiceId: "practice-1",
      providerId: "prov-1",
      payerId: "us-2",
      payerName: "Cigna",
      region: "US",
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
        benefitEstimate: {
          copayAmount: 25,
          coinsuranceRate: 20,
          deductibleRemaining: 200,
        },
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
      pccn: null,
      claimFrequencyCode: "1",
      patientControlNumber: "PCN-SEED2F3G4H5I6J7K8L",
      isMedicare: false,
      payment: null,
      createdAt: "2026-03-08T09:00:00Z",
      updatedAt: "2026-03-12T10:05:00Z",
    },
    {
      id: "seed-3",
      claimNumber: "CLM-2026-003",
      flowType: "mantra",
      status: "denied",
      clientId: "5",
      clientName: "Olivia Brown",
      practiceId: "practice-1",
      providerId: "prov-1",
      payerId: "us-4",
      payerName: "Blue Cross Blue Shield",
      region: "US",
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
        benefitEstimate: {
          copayAmount: 20,
          coinsuranceRate: 10,
          deductibleRemaining: 100,
        },
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
      pccn: "PCCN-1000003",
      claimFrequencyCode: "7",
      patientControlNumber: "PCN-SEED3L4M5N6O7P8Q9R",
      isMedicare: false,
      payment: null,
      createdAt: "2026-03-01T09:00:00Z",
      updatedAt: "2026-03-10T14:00:00Z",
    },
    {
      id: "seed-4",
      claimNumber: "CLM-2026-047",
      flowType: "manual",
      status: "manual_generated",
      clientId: "4",
      clientName: "David Martinez",
      practiceId: "practice-1",
      providerId: "prov-admin",
      payerId: null,
      payerName: null,
      region: "US",
      sessionIds: ["sess-4-1"],
      diagnosisCodes: ["F43.22"],
      serviceLines: [
        { id: "sl-5", sessionId: "sess-4-1", dateOfService: "Feb 26, 2026", serviceCode: "90834", units: 1, chargeAmount: 110 },
      ],
      eligibilityCheck: {
        requestedAt: "2026-02-27T10:00:00Z",
        status: "failed",
        responseAt: "2026-02-27T10:03:00Z",
        coverageActive: null,
        copayAmount: null,
        deductibleRemaining: null,
        authorizationRequired: false,
        failureMode: "data_mismatch",
        rawNote: "[MOCK] Subscriber name/DOB do not match payer record (Sarah J vs Sarah Jane). Correct the flagged field and retry.",
      },
      authorizationCode: null,
      submittedDate: "2026-02-28T10:00:00Z",
      statusHistory: [
        { status: "draft", timestamp: "2026-02-26T09:00:00Z" },
        { status: "manual_generated", timestamp: "2026-02-28T10:00:00Z" },
      ],
      totalAmount: 110,
      currency: "USD",
      pccn: null,
      claimFrequencyCode: "1",
      patientControlNumber: "PCN-SEED4R5S6T7U8V9W0X",
      isMedicare: false,
      payment: null,
      createdAt: "2026-02-26T09:00:00Z",
      updatedAt: "2026-02-28T10:00:00Z",
    },
    {
      id: "seed-5",
      claimNumber: "CLM-2026-099",
      flowType: "mantra",
      status: "approved",
      clientId: "8",
      clientName: "Aisha Patel",
      practiceId: "practice-2",
      providerId: "prov-5",
      payerId: "us-1",
      payerName: "UnitedHealthcare",
      region: "US",
      sessionIds: ["sess-8-1"],
      diagnosisCodes: ["F41.1"],
      serviceLines: [
        { id: "sl-6", sessionId: "sess-8-1", dateOfService: "Mar 15, 2026", serviceCode: "90834", units: 1, chargeAmount: 180 },
      ],
      eligibilityCheck: {
        requestedAt: "2026-03-14T10:00:00Z",
        status: "confirmed",
        responseAt: "2026-03-14T10:03:00Z",
        coverageActive: true,
        copayAmount: 20,
        deductibleRemaining: 300,
        authorizationRequired: false,
        rawNote: "[MOCK] Coverage active.",
      },
      authorizationCode: null,
      submittedDate: "2026-03-16T10:00:00Z",
      statusHistory: [
        { status: "draft", timestamp: "2026-03-14T09:00:00Z" },
        { status: "submitted", timestamp: "2026-03-16T10:00:00Z" },
        { status: "approved", timestamp: "2026-03-20T14:00:00Z" },
      ],
      totalAmount: 180,
      currency: "USD",
      pccn: "PCCN-1000005",
      claimFrequencyCode: "7",
      patientControlNumber: "PCN-SEED5X6Y7Z8A9B0C1D",
      isMedicare: false,
      payment: null,
      createdAt: "2026-03-14T09:00:00Z",
      updatedAt: "2026-03-20T14:00:00Z",
    },
    {
      id: "seed-ready-1",
      claimNumber: "CLM-2026-088",
      flowType: "mantra",
      status: "ready_to_submit",
      clientId: "2",
      clientName: "Michael Chen",
      practiceId: "practice-1",
      providerId: "prov-1",
      payerId: "bupa",
      payerName: "Bupa",
      region: "US",
      sessionIds: ["sess-2-done"],
      diagnosisCodes: ["F41.1"],
      serviceLines: [
        { id: "sl-ready-1", sessionId: "sess-2-done", dateOfService: "Mar 12, 2026", serviceCode: "90834", units: 1, chargeAmount: 210 },
      ],
      eligibilityCheck: {
        requestedAt: "2026-03-12T10:00:00Z",
        status: "confirmed",
        responseAt: "2026-03-12T10:03:00Z",
        coverageActive: true,
        copayAmount: 20,
        deductibleRemaining: 150,
        authorizationRequired: false,
        rawNote: "[MOCK] Coverage active. Ready for submission.",
      },
      authorizationCode: null,
      submittedDate: null,
      statusHistory: [
        { status: "draft", timestamp: "2026-03-12T09:00:00Z" },
        { status: "ready_to_submit", timestamp: "2026-03-12T10:05:00Z", note: "Session notes signed & billed. Ready for clearinghouse submission." },
      ],
      totalAmount: 210,
      currency: "USD",
      pccn: null,
      claimFrequencyCode: "1",
      patientControlNumber: "PCN-READY1A2B3C4D5E",
      isMedicare: false,
      payment: null,
      createdAt: "2026-03-12T09:00:00Z",
      updatedAt: "2026-03-12T10:05:00Z",
    },
    {
      id: "seed-ready-2",
      claimNumber: "CLM-2026-089",
      flowType: "mantra",
      status: "ready_to_submit",
      clientId: "1",
      clientName: "Sarah Johnson",
      practiceId: "practice-1",
      providerId: "prov-1",
      payerId: "us-1",
      payerName: "UnitedHealthcare",
      region: "US",
      sessionIds: ["unbilled-1"],
      diagnosisCodes: ["F41.1"],
      serviceLines: [
        { id: "sl-ready-2", sessionId: "unbilled-1", dateOfService: "Jul 31, 2026", serviceCode: "90834", units: 1, chargeAmount: 150 },
      ],
      eligibilityCheck: {
        requestedAt: "2026-07-31T10:00:00Z",
        status: "confirmed",
        responseAt: "2026-07-31T10:03:00Z",
        coverageActive: true,
        copayAmount: 30,
        deductibleRemaining: 400,
        authorizationRequired: false,
        rawNote: "[MOCK] Coverage active. Ready for submission.",
      },
      authorizationCode: null,
      submittedDate: null,
      statusHistory: [
        { status: "draft", timestamp: "2026-07-31T09:00:00Z" },
        { status: "ready_to_submit", timestamp: "2026-07-31T10:05:00Z", note: "Session notes signed & billed. Ready for submission." },
      ],
      totalAmount: 150,
      currency: "USD",
      pccn: null,
      claimFrequencyCode: "1",
      patientControlNumber: "PCN-READY2F3G4H5I6J",
      isMedicare: false,
      payment: null,
      createdAt: "2026-07-31T09:00:00Z",
      updatedAt: "2026-07-31T10:05:00Z",
    },
  ];
}

export function ClaimProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>(createInitialClaims);
  const [unbilledSessions, setUnbilledSessions] = useState<UnbilledSession[]>(getMockUnbilledSessions);
  const [feeSchedule, setFeeSchedule] = useState<FeeScheduleEntry[]>(MOCK_FEE_SCHEDULE);

  const addClaim = useCallback((claim: Claim) => {
    setClaims((prev) => [...prev, claim]);
  }, []);

  const updateClaimStatus = useCallback((claimId: string, status: ClaimStatus, note?: string) => {
    setClaims((prev) => {
      const exists = prev.some((c) => c.id === claimId || c.claimNumber === claimId);
      const source = exists ? prev : [...prev, ...createInitialClaims().filter(ic => !prev.some(p => p.id === ic.id))];
      
      return source.map((c) => {
        if (c.id !== claimId && c.claimNumber !== claimId) return c;
        const event: ClaimStatusEvent = {
          status,
          timestamp: new Date().toISOString(),
          ...(note ? { note } : {}),
        };
        return {
          ...c,
          status,
          statusHistory: [...(c.statusHistory || []), event],
          updatedAt: new Date().toISOString(),
        };
      });
    });
  }, []);

  const updateClaim = useCallback((claimId: string, updates: Partial<Claim>) => {
    setClaims((prev) => {
      const exists = prev.some((c) => c.id === claimId || c.claimNumber === claimId);
      const source = exists ? prev : [...prev, ...createInitialClaims().filter(ic => !prev.some(p => p.id === ic.id))];
      return source.map((c) =>
        c.id === claimId || c.claimNumber === claimId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      );
    });
  }, []);

  const getClaim = useCallback(
    (claimId: string) => {
      const found = claims.find((c) => c.id === claimId || c.claimNumber === claimId);
      if (found) return found;
      const initial = createInitialClaims();
      return initial.find((c) => c.id === claimId || c.claimNumber === claimId);
    },
    [claims]
  );

  const markSessionsBilled = useCallback((sessionIds: string[]) => {
    setUnbilledSessions((prev) =>
      prev.filter((s) => !sessionIds.includes(s.id))
    );
  }, []);

  const unmarkSessionsBilled = useCallback((sessions: UnbilledSession[]) => {
    setUnbilledSessions((prev) => {
      const existingIds = new Set(prev.map((s) => s.id));
      const toAdd = sessions.filter((s) => !existingIds.has(s.id));
      if (toAdd.length === 0) return prev;
      return [...prev, ...toAdd];
    });
  }, []);

  const addUnbilledSession = useCallback((session: UnbilledSession) => {
    setUnbilledSessions((prev) =>
      prev.some((s) => s.id === session.id) ? prev : [...prev, session]
    );
  }, []);

  const signAndLockSession = useCallback((sessionId: string, diagnosisCode: string, cptCode: string) => {
    setUnbilledSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, notesStatus: "locked" as const, diagnosisCode, cptCode }
          : s
      )
    );
  }, []);

  const createNewClaim = useCallback(
    (params: {
      flowType: ClaimFlowType;
      clientId: string;
      clientName: string;
      practiceId?: string;
      providerId: string;
      payerId?: string | null;
      payerName?: string | null;
      sessionIds?: string[];
      serviceLines?: ServiceLine[];
      diagnosisCodes?: string[];
    }) => {
      const now = new Date().toISOString();
      const finalServiceLines: ServiceLine[] =
        params.serviceLines && params.serviceLines.length > 0
          ? params.serviceLines
          : [
              {
                id: generateId("sl"),
                sessionId: params.sessionIds?.[0] || generateId("sess"),
                dateOfService: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                serviceCode: "90834",
                units: 1,
                chargeAmount: 150,
              },
            ];

      const totalAmount = finalServiceLines.reduce((acc, sl) => acc + (sl.chargeAmount || 0), 0);

      const newClaim: Claim = {
        id: generateId("claim"),
        claimNumber: generateClaimNumber(),
        flowType: params.flowType,
        status: "ready_to_submit",
        clientId: params.clientId,
        clientName: params.clientName,
        practiceId: params.practiceId || "practice-1",
        providerId: params.providerId,
        payerId: params.payerId ?? null,
        payerName: params.payerName ?? null,
        region: "US",
        sessionIds: params.sessionIds || [],
        diagnosisCodes: params.diagnosisCodes || ["Z03.89"],
        serviceLines: finalServiceLines,
        eligibilityCheck: null,
        authorizationCode: null,
        submittedDate: null,
        statusHistory: [{ status: "draft", timestamp: now }],
        totalAmount,
        currency: "USD",
        pccn: null,
        claimFrequencyCode: "1",
        patientControlNumber: generatePatientControlNumber(),
        isMedicare: false,
        payment: null,
        createdAt: now,
        updatedAt: now,
      };
      addClaim(newClaim);
      return newClaim;
    },
    [addClaim]
  );

  // Part 4a — real clearinghouse flow. submission → awaiting_ack → Stedi edit
  // validation → (stedi_rejected | sent_to_payer → payer_rejected |
  // in_adjudication with PCCN). Timed to feel like real async processing.
  const simulateClearinghouseSubmission = useCallback((claimId: string) => {
    const stage = (c: Claim, status: ClaimStatus, note?: string, extra: Partial<Claim> = {}) => {
      setClaims((prev) => {
        const exists = prev.some((x) => x.id === c.id || x.claimNumber === c.claimNumber);
        const source = exists ? prev : [...prev, ...createInitialClaims().filter(ic => !prev.some(p => p.id === ic.id))];
        return source.map((x) => {
          if (x.id !== c.id && x.claimNumber !== c.claimNumber) return x;
          const event: ClaimStatusEvent = {
            status,
            timestamp: new Date().toISOString(),
            ...(note ? { note } : {}),
          };
          return { ...x, ...extra, status, statusHistory: [...(x.statusHistory || []), event], updatedAt: new Date().toISOString() };
        });
      });
    };

    // Pull the latest claim state at each step so staging is accurate.
    const current = () => {
      const all = createInitialClaims();
      return claims.find((c) => c.id === claimId || c.claimNumber === claimId) || all.find((c) => c.id === claimId || c.claimNumber === claimId);
    };

    updateClaimStatus(claimId, "submitted", "[MOCK] Claim accepted by clearinghouse.");
    setTimeout(() => {
      updateClaimStatus(claimId, "awaiting_ack", "[MOCK] 0-3 days: awaiting payer acknowledgment. Status checks disabled.");
    }, 900);
    setTimeout(() => {
      updateClaimStatus(claimId, "stedi_validating", "[MOCK] Running Stedi edit validation (SNIP Level 3-5)...");
    }, 2400);
    setTimeout(() => {
      const c = current();
      if (!c) return;
      // ~15% of submissions fail edit validation and never reach the payer.
      if (Math.random() < 0.15) {
        stage(c, "stedi_rejected", "[MOCK] Edit failure: unbalanced totals / invalid code — never reached the payer.");
        return;
      }
      stage(c, "sent_to_payer", "[MOCK] Claim passed edits; transmitted to payer.");
    }, 4200);
    setTimeout(() => {
      const c = current();
      if (!c || c.status !== "sent_to_payer") return;
      if (Math.random() < 0.15) {
        stage(c, "payer_rejected", "[MOCK] Pre-adjudication rejection: payer could not accept claim.");
        return;
      }
      // The real pivot point — PCCN assigned once the payer opens adjudication.
      stage(c, "in_adjudication", "[MOCK] Payer assigned PCCN; claim in adjudication.", {
        pccn: generatePccn(),
        claimFrequencyCode: computeClaimFrequencyCode(null, c.isMedicare),
      });
    }, 6000);
  }, [claims, updateClaimStatus]);

  // Part 4a/4d — post-adjudication result via a mocked 835 equivalent.
  const simulatePayerAdjudication = useCallback((claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== claimId) return c;
        const roll = Math.random();
        const billed = c.totalAmount;
        let nextStatus: ClaimStatus;
        let note: string | undefined;
        let payment: Claim["payment"] = c.payment;
        if (roll < 0.6) {
          // Paid — allowed is usually LESS than billed (real adjustment).
          nextStatus = "paid";
          const allowed = Math.round(billed * (0.7 + Math.random() * 0.25) * 100) / 100;
          const paid = Math.round(allowed * (0.6 + Math.random() * 0.35) * 100) / 100;
          const patientResponsibility = Math.round((allowed - paid) * 100) / 100;
          payment = {
            billedAmount: billed,
            allowedAmount: allowed,
            paidAmount: paid,
            patientResponsibility,
            adjustmentReason: "Contractual adjustment",
            remittanceDate: new Date().toISOString(),
            remarkCode: "CO45",
          };
          note = "[MOCK] 835 posted. Contractual adjustment applied.";
        } else if (roll < 0.85) {
          nextStatus = "denied";
          note = "[MOCK] Denial reason: Service not covered under current plan benefits.";
        } else {
          nextStatus = "adjusted";
          const allowed = Math.round(billed * (0.5 + Math.random() * 0.2) * 100) / 100;
          payment = {
            billedAmount: billed,
            allowedAmount: allowed,
            paidAmount: 0,
            patientResponsibility: Math.round(allowed * 100) / 100,
            adjustmentReason: "Payer-adjustment (multiple procedure)",
            remittanceDate: new Date().toISOString(),
            remarkCode: "CO59",
          };
          note = "[MOCK] Claim adjusted; partial payment issued.";
        }
        const event: ClaimStatusEvent = {
          status: nextStatus,
          timestamp: new Date().toISOString(),
          ...(note ? { note } : {}),
        };
        return {
          ...c,
          status: nextStatus,
          payment,
          statusHistory: [...c.statusHistory, event],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  // Part 4b — Correct & Resubmit with real CFC/PCCN/PCN rules.
  const reopenForResubmission = useCallback((claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== claimId) return c;
        const replacementPcn = computeClaimFrequencyCode(c.pccn, c.isMedicare) === "7"
          ? generatePatientControlNumber()
          : c.patientControlNumber;
        const event: ClaimStatusEvent = {
          status: "draft",
          timestamp: new Date().toISOString(),
          note: `[MOCK] Returned to draft for resubmission. CFC ${computeClaimFrequencyCode(c.pccn, c.isMedicare)}, new PCN ${c.pccn && !c.isMedicare ? "generated" : "reused"}.`,
        };
        return {
          ...c,
          status: "draft",
          claimFrequencyCode: computeClaimFrequencyCode(c.pccn, c.isMedicare),
          patientControlNumber: replacementPcn,
          payment: null,
          statusHistory: [...c.statusHistory, event],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  // Part 4i — mock eligibility response generator with distinct failure modes.
  const runEligibilityCheck = useCallback(
    (claimId: string, outcome: "confirmed" | "transient_outage" | "data_mismatch" | "no_coverage") => {
      const now = new Date().toISOString();
      setClaims((prev) =>
        prev.map((c) => {
          if (c.id !== claimId) return c;
          if (outcome === "confirmed") {
            const event: ClaimStatusEvent = {
              status: "eligibility_confirmed",
              timestamp: now,
              note: "[MOCK] Coverage active.",
            };
            return {
              ...c,
              status: "eligibility_confirmed",
              eligibilityCheck: {
                requestedAt: now,
                status: "confirmed",
                responseAt: now,
                coverageActive: true,
                copayAmount: 20,
                deductibleRemaining: 300,
                authorizationRequired: false,
                failureMode: null,
                rawNote: "[MOCK] Coverage active. Copay: $20. Deductible remaining: $300.",
                benefitEstimate: {
                  copayAmount: 20,
                  coinsuranceRate: 20,
                  deductibleRemaining: 300,
                },
              },
              statusHistory: [...c.statusHistory, event],
              updatedAt: now,
            };
          }
          if (outcome === "transient_outage") {
            const event: ClaimStatusEvent = {
              status: "eligibility_pending",
              timestamp: now,
              note: "[MOCK] Transient payer outage — auto-retrying.",
            };
            setTimeout(() => {
              setClaims((p) =>
                p.map((pc) =>
                  pc.id !== claimId
                    ? pc
                    : {
                        ...pc,
                        status: "eligibility_confirmed",
                        eligibilityCheck: {
                          ...pc.eligibilityCheck!,
                          status: "confirmed",
                          coverageActive: true,
                          failureMode: null,
                          responseAt: new Date().toISOString(),
                          rawNote: "[MOCK] Retry succeeded — coverage active after transient outage.",
                        },
                        statusHistory: [
                          ...pc.statusHistory,
                          { status: "eligibility_confirmed", timestamp: new Date().toISOString(), note: "[MOCK] Auto-retry succeeded." },
                        ],
                        updatedAt: new Date().toISOString(),
                      }
                )
              );
            }, 2500);
            return {
              ...c,
              status: "eligibility_pending",
              eligibilityCheck: {
                requestedAt: now,
                status: "pending",
                responseAt: null,
                coverageActive: null,
                copayAmount: null,
                deductibleRemaining: null,
                authorizationRequired: false,
                failureMode: "transient_outage",
                rawNote: "[MOCK] Transient payer outage. Retrying automatically — no action needed.",
              },
              statusHistory: [...c.statusHistory, event],
              updatedAt: now,
            };
          }
          if (outcome === "data_mismatch") {
            const event: ClaimStatusEvent = {
              status: "eligibility_failed",
              timestamp: now,
              note: "[MOCK] Subscriber data mismatch.",
            };
            return {
              ...c,
              status: "eligibility_failed",
              eligibilityCheck: {
                requestedAt: now,
                status: "failed",
                responseAt: now,
                coverageActive: null,
                copayAmount: null,
                deductibleRemaining: null,
                authorizationRequired: false,
                failureMode: "data_mismatch",
                rawNote: "[MOCK] Subscriber name/DOB do not match payer record. Correct the flagged field and retry.",
              },
              statusHistory: [...c.statusHistory, event],
              updatedAt: now,
            };
          }
          // no_coverage
          const event: ClaimStatusEvent = {
            status: "eligibility_failed",
            timestamp: now,
            note: "[MOCK] No coverage on file for this member.",
          };
          return {
            ...c,
            status: "eligibility_failed",
            eligibilityCheck: {
              requestedAt: now,
              status: "failed",
              responseAt: now,
              coverageActive: false,
              copayAmount: null,
              deductibleRemaining: null,
              authorizationRequired: false,
              failureMode: "no_coverage",
              rawNote: "[MOCK] No active coverage found for this member ID.",
            },
            statusHistory: [...c.statusHistory, event],
            updatedAt: now,
          };
        })
      );
    },
    []
  );

  const updateFeeScheduleEntry = useCallback((entry: FeeScheduleEntry) => {
    setFeeSchedule((prev) => {
      const idx = prev.findIndex((e) => e.cptCode === entry.cptCode);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = entry;
        return next;
      }
      return [...prev, entry];
    });
  }, []);

  return (
    <ClaimContext.Provider
      value={{ claims, unbilledSessions, addClaim, updateClaimStatus, updateClaim, getClaim, markSessionsBilled, unmarkSessionsBilled, addUnbilledSession, signAndLockSession, createNewClaim, simulateClearinghouseSubmission, simulatePayerAdjudication, reopenForResubmission, runEligibilityCheck, feeSchedule, updateFeeSchedule: updateFeeScheduleEntry, getFeeForService }}
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
