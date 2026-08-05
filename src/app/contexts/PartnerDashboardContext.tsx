import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import type { Provider, Practice, PracticeMember, EstablishmentSuperAdmin, CustomRole, CareTeamMembership, MockClient, Establishment, IntakeForm, IntakeFlow, FormEntry, FormResponse, PermissionSet, DiagnosisTreatmentPlan, Bill, PriorAuthorization, RemittanceRecord, WriteOffReason } from "../types/partnerDashboard";
import { ROLE_PERMISSION_DEFAULTS, BASE_ROLES, getClientDue, getInsuranceDue, isBillSettled } from "../types/partnerDashboard";
import { mockEstablishments, mockProviders, mockCareTeamMemberships, mockClients, mockIntakeForms, mockIntakeFlows, mockFormEntries, mockFormResponses, mockPractices, mockPracticeMembers, mockSuperAdmins, mockCustomRoles, mockDiagnosisTreatmentPlans, mockBills, mockPriorAuthorizations, mockRemittanceRecords } from "../data/mockPartnerData";
import { generateId } from "../utils/id";


interface PartnerDashboardContextType {
  establishments: Establishment[];
  setEstablishments: React.Dispatch<React.SetStateAction<Establishment[]>>;
  practices: Practice[];
  setPractices: React.Dispatch<React.SetStateAction<Practice[]>>;
  currentPracticeId: string;
  setCurrentPracticeId: (id: string) => void;
  practiceMembers: PracticeMember[];
  setPracticeMembers: React.Dispatch<React.SetStateAction<PracticeMember[]>>;
  superAdmins: EstablishmentSuperAdmin[];
  customRoles: CustomRole[];
  addCustomRole: (role: CustomRole) => void;
  providers: Provider[];
  setProviders: React.Dispatch<React.SetStateAction<Provider[]>>;
  careTeamMemberships: CareTeamMembership[];
  setCareTeamMemberships: React.Dispatch<React.SetStateAction<CareTeamMembership[]>>;
  currentProviderId: string;
  setCurrentProviderId: (id: string) => void;
  currentEstablishmentId: string | null;
  setCurrentEstablishmentId: (id: string | null) => void;
  currentPracticeMemberships: PracticeMember[];
  isCurrentUserSuperAdmin: boolean;
  isCurrentUserAdmin: boolean;
  isCurrentUserClinician: boolean;
  isCurrentUserSupervisor: boolean;
  getCurrentEstablishment: () => Establishment | undefined;
  getCurrentPractice: () => Practice | undefined;
  getPermissionsForCurrentUser: () => PermissionSet;
  providerPracticeMemberships: (providerId: string) => PracticeMember[];
  addPracticeMember: (member: PracticeMember) => void;
  addProvider: (provider: Provider) => void;
  updatePracticeMember: (providerId: string, practiceId: string, updates: Partial<PracticeMember>) => void;
  offboardPracticeMember: (providerId: string, practiceId: string) => void;
  createPractice: (practice: Practice) => void;
  updatePractice: (practiceId: string, updates: Partial<Practice>) => void;
  addCareTeamMembership: (membership: CareTeamMembership) => void;
  removeCareTeamMembership: (clientId: string, providerId: string) => void;
  clientTreatingProviders: Record<string, string>;
  reassignClient: (clientId: string, providerId: string) => void;
  canViewClientClinicalContent: (clientId: string) => boolean;
  canViewIntakeResponse: (form: IntakeForm, clientId: string, viewerId?: string) => boolean;
  addClient: (client: Omit<MockClient, "id">) => MockClient;
  setClients: React.Dispatch<React.SetStateAction<MockClient[]>>;
  referClient: (clientId: string, toPracticeId: string, targetProviderId?: string) => string;
  getLinkedClientRecords: (clientId: string) => MockClient[];
  clients: MockClient[];
  intakeForms: IntakeForm[];
  intakeFlows: IntakeFlow[];
  formEntries: FormEntry[];
  formResponses: FormResponse[];
  setIntakeForms: React.Dispatch<React.SetStateAction<IntakeForm[]>>;
  setIntakeFlows: React.Dispatch<React.SetStateAction<IntakeFlow[]>>;
  setFormEntries: React.Dispatch<React.SetStateAction<FormEntry[]>>;
  setFormResponses: React.Dispatch<React.SetStateAction<FormResponse[]>>;
  topUpCredits: number;
  addTopUpCredits: (minutes: number) => void;
  diagnosisPlans: DiagnosisTreatmentPlan[];
  setDiagnosisPlans: React.Dispatch<React.SetStateAction<DiagnosisTreatmentPlan[]>>;
  addDiagnosisPlan: (plan: Omit<DiagnosisTreatmentPlan, "id" | "createdAt">) => DiagnosisTreatmentPlan;
  lockDiagnosisPlan: (planId: string) => void;
  unlockDiagnosisPlan: (planId: string) => void;
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
  addBill: (bill: Omit<Bill, "id" | "createdAt">) => Bill;
  updateBill: (id: string, updates: Partial<Bill>) => void;
  recordBillPayment: (id: string, type: "client" | "insurance", amount: number) => void;
  writeOffBill: (id: string, reason: WriteOffReason, note?: string, amount?: number, target?: "client" | "insurance") => void;
  clientCredits: Record<string, number>;
  getClientCredit: (clientId: string) => number;
  addClientCredit: (clientId: string, amount: number) => void;
  useClientCredit: (clientId: string, amount: number) => void;
  priorAuthorizations: PriorAuthorization[];
  setPriorAuthorizations: React.Dispatch<React.SetStateAction<PriorAuthorization[]>>;
  addPriorAuthorization: (auth: Omit<PriorAuthorization, "id" | "requestedAt">) => PriorAuthorization;
  remittanceRecords: RemittanceRecord[];
  setRemittanceRecords: React.Dispatch<React.SetStateAction<RemittanceRecord[]>>;
  addRemittanceRecord: (remit: Omit<RemittanceRecord, "id" | "postedAt">) => RemittanceRecord;
}

const PartnerDashboardContext = createContext<PartnerDashboardContextType | undefined>(undefined);

export function PartnerDashboardProvider({ children }: { children: ReactNode }) {
  const [topUpCredits, setTopUpCredits] = useState<number>(0);
  const addTopUpCredits = useCallback((minutes: number) => {
    setTopUpCredits((prev) => prev + minutes);
  }, []);

  const [establishments, setEstablishments] = useState<Establishment[]>(mockEstablishments);
  const [practices, setPractices] = useState<Practice[]>(mockPractices);
  const [practiceMembers, setPracticeMembers] = useState<PracticeMember[]>(mockPracticeMembers);
  const [superAdmins] = useState<EstablishmentSuperAdmin[]>(mockSuperAdmins);
  const [customRoles, setCustomRoles] = useState<CustomRole[]>(mockCustomRoles);

  const addCustomRole = useCallback((role: CustomRole) => {
    setCustomRoles((prev) => [...prev, role]);
  }, []);
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [careTeamMemberships, setCareTeamMemberships] = useState<CareTeamMembership[]>(mockCareTeamMemberships);
  const [clients, setClients] = useState<MockClient[]>(mockClients);
  const [clientTreatingProviders, setClientTreatingProviders] = useState<Record<string, string>>(
    Object.fromEntries(mockClients.map((client) => [client.id, client.treatingProviderId]))
  );
  const [currentProviderId, setCurrentProviderId] = useState<string>("prov-admin");
  const [currentEstablishmentId, setCurrentEstablishmentId] = useState<string | null>("est-1");

  const [intakeForms, setIntakeForms] = useState<IntakeForm[]>(mockIntakeForms);
  const [intakeFlows, setIntakeFlows] = useState<IntakeFlow[]>(mockIntakeFlows);
  const [formEntries, setFormEntries] = useState<FormEntry[]>(mockFormEntries);
  const [formResponses, setFormResponses] = useState<FormResponse[]>(mockFormResponses);

  const [diagnosisPlans, setDiagnosisPlans] = useState<DiagnosisTreatmentPlan[]>(mockDiagnosisTreatmentPlans);
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [priorAuthorizations, setPriorAuthorizations] = useState<PriorAuthorization[]>(mockPriorAuthorizations);
  const [remittanceRecords, setRemittanceRecords] = useState<RemittanceRecord[]>(mockRemittanceRecords);

  const addDiagnosisPlan = useCallback((plan: Omit<DiagnosisTreatmentPlan, "id" | "createdAt">) => {
    const newPlan: DiagnosisTreatmentPlan = {
      ...plan,
      id: `dtp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    setDiagnosisPlans((prev) => [newPlan, ...prev]);
    return newPlan;
  }, []);

  const lockDiagnosisPlan = useCallback((planId: string) => {
    setDiagnosisPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, isLocked: true, lockedAt: new Date().toISOString() } : p))
    );
  }, []);

  const unlockDiagnosisPlan = useCallback((planId: string) => {
    setDiagnosisPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, isLocked: false } : p))
    );
  }, []);

  const addBill = useCallback((bill: Omit<Bill, "id" | "createdAt" | "billNumber"> & { billNumber?: string }) => {
    const newBill: Bill = {
      ...bill,
      id: generateId("bill"),
      paidAmount: bill.paidAmount ?? 0,
      writeOffAmount: bill.writeOffAmount ?? 0,
      dueDate: bill.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      billNumber: bill.billNumber || `BILL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      currency: bill.currency ?? "USD",
      createdAt: new Date().toISOString(),
    };
    setBills((prev) => [newBill, ...prev]);
    return newBill;
  }, []);

  const updateBill = useCallback((billId: string, updates: Partial<Bill>) => {
    setBills((prev) =>
      prev.map((b) => (b.id === billId ? { ...b, ...updates } : b))
    );
  }, []);

  // Applies a payment to ONE side of a bill (client or insurance). The amount
  // lands on the chosen side's "paid" bucket; when the whole bill is settled it
  // is marked Paid.
  const recordBillPayment = useCallback(
    (billId: string, side: "client" | "insurance", amount: number) => {
      const existing = bills.find((b) => b.id === billId);
      if (!existing) return undefined;
      const updated: Bill = { ...existing };
      if (side === "client") updated.clientPaid = (existing.clientPaid || 0) + amount;
      else updated.insurancePaid = (existing.insurancePaid || 0) + amount;
      updated.paidAmount = (existing.paidAmount || 0) + amount;
      if (isBillSettled(updated)) {
        updated.status = "paid_direct";
        updated.resolutionMethod = side === "client" ? updated.resolutionMethod || "cash" : "insurance";
        updated.resolvedAt = new Date().toISOString();
      } else {
        updated.status = "unresolved";
        updated.resolvedAt = null;
      }
      setBills((prev) => prev.map((b) => (b.id === billId ? updated : b)));
      return updated;
    },
    [bills]
  );

  const writeOffBill = useCallback(
    (billId: string, reason: WriteOffReason, note?: string, amount?: number, side: "client" | "insurance" = "client") => {
      setBills((prev) =>
        prev.map((b) => {
          if (b.id !== billId) return b;
          const owed = side === "client" ? getClientDue(b) : getInsuranceDue(b);
          const writeOffAmt = Math.min(amount ?? owed, Math.max(owed, 0));
          const next: Bill = {
            ...b,
            writeOffReason: reason,
            writeOffNote: note || b.writeOffNote || "",
            writeOffBy: currentProviderId,
          };
          if (side === "client") next.clientWriteOff = (b.clientWriteOff || 0) + writeOffAmt;
          else next.insuranceWriteOff = (b.insuranceWriteOff || 0) + writeOffAmt;
          next.writeOffAmount = (b.writeOffAmount || 0) + writeOffAmt;
          if (isBillSettled(next)) {
            next.status = "written_off";
            next.resolutionMethod = "write_off";
            next.resolvedAt = new Date().toISOString();
          }
          return next;
        })
      );
    },
    [currentProviderId]
  );

  const addPriorAuthorization = useCallback((auth: Omit<PriorAuthorization, "id" | "requestedAt">) => {
    const newAuth: PriorAuthorization = {
      ...auth,
      id: generateId("pauth"),
      requestedAt: new Date().toISOString(),
    };
    setPriorAuthorizations((prev) => [newAuth, ...prev]);
    return newAuth;
  }, []);

  const addRemittanceRecord = useCallback((remit: Omit<RemittanceRecord, "id" | "postedAt">) => {
    const newRemit: RemittanceRecord = {
      ...remit,
      id: generateId("remit"),
      postedAt: new Date().toISOString(),
    };
    setRemittanceRecords((prev) => [newRemit, ...prev]);
    return newRemit;
  }, []);

  // Default currentPracticeId to the first practice this provider has active membership in
  const [currentPracticeId, setCurrentPracticeId] = useState<string>(() => {
    const firstMembership = mockPracticeMembers.find(
      (m) => m.providerId === "prov-admin" && m.memberStatus === "active"
    );
    return firstMembership?.practiceId || "practice-1";
  });

  const establishmentId = currentEstablishmentId;

  const isCurrentUserSuperAdmin = useMemo(
    () => superAdmins.some(
      (sa) => sa.providerId === currentProviderId && sa.establishmentId === establishmentId
    ),
    [superAdmins, currentProviderId, establishmentId]
  );

  const currentPracticeMemberships = useMemo(() => {
    const explicit = practiceMembers.filter(
      (m) =>
        m.providerId === currentProviderId &&
        m.practiceId === currentPracticeId &&
        m.establishmentId === establishmentId &&
        m.memberStatus !== "offboarded"
    );
    if (explicit.length > 0) return explicit;
    if (isCurrentUserSuperAdmin && establishmentId) {
      return [
        {
          providerId: currentProviderId,
          practiceId: currentPracticeId,
          establishmentId,
          role: "Admin" as const,
          isSupervisorRole: false,
          memberStatus: "active" as const,
          supervises: [],
          invitedAt: new Date().toISOString(),
          joinedAt: new Date().toISOString(),
        },
      ];
    }
    return [];
  }, [practiceMembers, currentProviderId, currentPracticeId, establishmentId, isCurrentUserSuperAdmin]);

  const isCurrentUserAdmin = isCurrentUserSuperAdmin || currentPracticeMemberships.some(
    (m) => (typeof m.role === "string" && m.role === "Admin")
  );
  const isCurrentUserClinician = currentPracticeMemberships.some(
    (m) => (typeof m.role === "string" && (m.role === "Clinician" || (m.role === "Supervisor" && m.isSupervisorRole)))
  );
  const isCurrentUserSupervisor = currentPracticeMemberships.some(
    (m) => typeof m.role === "string" && m.role === "Supervisor"
  );

  const getCurrentEstablishment = useCallback(
    () => establishments.find((e) => e.id === currentEstablishmentId),
    [establishments, currentEstablishmentId]
  );

  const getCurrentPractice = useCallback(
    () => practices.find((p) => p.id === currentPracticeId),
    [practices, currentPracticeId]
  );

  const getPermissionsForCurrentUser = useCallback((): PermissionSet => {
    if (isCurrentUserSuperAdmin) {
      return {
        viewOwnClients: true,
        viewAllPracticeClients: true,
        viewClinicalNotes: true,
        manageTeam: true,
        manageBilling: true,
        viewFinancialReports: true,
        manageClientRecords: true,
        manageAvailabilitySchedule: true,
        manageEstablishmentSettings: true,
      };
    }

    const activeMemberships = currentPracticeMemberships.filter((m) => m.memberStatus === "active");
    if (activeMemberships.length === 0) {
      return {
        viewOwnClients: false, viewAllPracticeClients: false, viewClinicalNotes: false,
        manageTeam: false, manageBilling: false, viewFinancialReports: false,
        manageClientRecords: false, manageAvailabilitySchedule: false,
        manageEstablishmentSettings: false,
      };
    }

    const merged: PermissionSet = {
      viewOwnClients: false, viewAllPracticeClients: false, viewClinicalNotes: false,
      manageTeam: false, manageBilling: false, viewFinancialReports: false,
      manageClientRecords: false, manageAvailabilitySchedule: false,
      manageEstablishmentSettings: false,
    };

    for (const m of activeMemberships) {
      let perms: PermissionSet;
      if (typeof m.role === "string") {
        perms = { ...ROLE_PERMISSION_DEFAULTS[m.role] };
        if (m.isSupervisorRole && m.role === "Supervisor") {
          const clinicianPerms = ROLE_PERMISSION_DEFAULTS.Clinician;
          for (const k of Object.keys(perms) as (keyof PermissionSet)[]) {
            if (clinicianPerms[k]) perms[k] = true;
          }
        }
      } else {
        const custom = customRoles.find((cr) => cr.id === m.role.customRoleId);
        perms = custom ? { ...custom.permissions } : { ...merged };
      }
      for (const k of Object.keys(merged) as (keyof PermissionSet)[]) {
        if (perms[k]) merged[k] = true;
      }
    }

    return merged;
  }, [currentPracticeMemberships, customRoles, isCurrentUserSuperAdmin]);

  const providerPracticeMemberships = useCallback(
    (providerId: string): PracticeMember[] =>
      practiceMembers.filter(
        (m) => m.providerId === providerId && m.establishmentId === establishmentId
      ),
    [practiceMembers, establishmentId]
  );

  const addPracticeMember = useCallback((member: PracticeMember) => {
    setPracticeMembers((prev) => [...prev, member]);
  }, []);

  const addProvider = useCallback((provider: Provider) => {
    setProviders((prev) => (prev.some((p) => p.id === provider.id) ? prev : [...prev, provider]));
  }, []);

  const updatePracticeMember = useCallback(
    (providerId: string, practiceId: string, updates: Partial<PracticeMember>) => {
      const existing = practiceMembers.find(
        (m) => m.providerId === providerId && m.practiceId === practiceId
      );
      if (existing?.memberStatus === "active" && updates.role && typeof updates.role === "object" && !("customRoleId" in updates.role)) return;
      setPracticeMembers((prev) =>
        prev.map((m) =>
          m.providerId === providerId && m.practiceId === practiceId
            ? { ...m, ...updates }
            : m
        )
      );
    },
    [practiceMembers]
  );

  const offboardPracticeMember = useCallback(
    (providerId: string, practiceId: string) => {
      updatePracticeMember(providerId, practiceId, { memberStatus: "offboarded" });
    },
    [updatePracticeMember]
  );

  const createPractice = useCallback((practice: Practice) => {
    setPractices((prev) => [...prev, practice]);
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === practice.establishmentId
          ? { ...e, practiceIds: [...e.practiceIds, practice.id] }
          : e
      )
    );
  }, []);

  const updatePractice = useCallback(
    (practiceId: string, updates: Partial<Practice>) => {
      setPractices((prev) =>
        prev.map((p) => (p.id === practiceId ? { ...p, ...updates } : p))
      );
    },
    []
  );

  const addCareTeamMembership = useCallback((membership: CareTeamMembership) => {
    setCareTeamMemberships((prev) => [...prev, membership]);
  }, []);

  const removeCareTeamMembership = useCallback((clientId: string, providerId: string) => {
    setCareTeamMemberships((prev) =>
      prev.filter((m) => !(m.clientId === clientId && m.providerId === providerId))
    );
  }, []);

  const canViewClientClinicalContent = useCallback((clientId: string) => {
    const activeMemberships = practiceMembers.filter(
      (m) => m.providerId === currentProviderId && m.memberStatus === "active"
    );
    if (activeMemberships.length === 0) return false;
    const client = clients.find((c) => c.id === clientId);
    if (!client) return false;

    // Check practice scope — viewer must have membership in the client's practice
    const hasPracticeScope = activeMemberships.some(
      (m) => m.practiceId === client.practiceId
    );
    if (!hasPracticeScope && !isCurrentUserSuperAdmin) return false;

    // SuperAdmin or Practice Admin has access to practice clients
    if (isCurrentUserSuperAdmin || isCurrentUserAdmin) return true;

    // Check if the user is treating provider
    if (clientTreatingProviders[clientId] === currentProviderId) return true;

    // Check if the user is on the Care Team
    const isCareTeam = careTeamMemberships.some(
      (m) => m.clientId === clientId && m.providerId === currentProviderId
    );
    if (isCareTeam) return true;

    // Check if the user supervises the treating provider
    const supervisorMemberships = activeMemberships.filter(
      (m) => m.role === "Supervisor" || (m.supervises && m.supervises.length > 0)
    );
    const treatingProviderId = clientTreatingProviders[clientId];
    if (supervisorMemberships.some((sm) => sm.supervises.includes(treatingProviderId))) return true;

    return false;
  }, [currentProviderId, practiceMembers, careTeamMemberships, clientTreatingProviders, clients, isCurrentUserSuperAdmin, isCurrentUserAdmin]);

  const canViewIntakeResponse = useCallback((form: IntakeForm, clientId: string, viewerId?: string) => {
    const pid = viewerId ?? currentProviderId;
    const activeMemberships = practiceMembers.filter(
      (m) => m.providerId === pid && m.memberStatus === "active"
    );
    const client = clients.find((c) => c.id === clientId);
    if (!client) return false;

    const hasPracticeScope = activeMemberships.some(
      (m) => m.practiceId === client.practiceId
    );
    if (!hasPracticeScope && !isCurrentUserSuperAdmin) return false;

    const isAdmin = activeMemberships.some((m) => m.role === "Admin");
    const isClinician = activeMemberships.some(
      (m) => typeof m.role === "string" && (m.role === "Clinician" || m.role === "Supervisor")
    );
    const isSupervisor = activeMemberships.some((m) => m.role === "Supervisor");

    if (form.category === "administrative") {
      return isAdmin || clientTreatingProviders[clientId] === pid;
    }

    if (form.category === "clinical") {
      if (clientTreatingProviders[clientId] === pid) return true;
      if (isAdmin && isClinician && clientTreatingProviders[clientId] === pid) return true;

      const isCareTeam = careTeamMemberships.some(
        (m) => m.clientId === clientId && m.providerId === pid
      );
      if (isCareTeam) return true;

      const supervisorMemberships = activeMemberships.filter(
        (m) => m.role === "Supervisor" || (m.supervises && m.supervises.length > 0)
      );
      const treatingProviderId = clientTreatingProviders[clientId];
      if (supervisorMemberships.some((sm) => sm.supervises.includes(treatingProviderId))) return true;

      return false;
    }

    return false;
  }, [currentProviderId, currentEstablishmentId, practiceMembers, clientTreatingProviders, careTeamMemberships, clients, isCurrentUserSuperAdmin]);

  const reassignClient = useCallback((clientId: string, providerId: string) => {
    setClientTreatingProviders((prev) => ({ ...prev, [clientId]: providerId }));
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, treatingProviderId: providerId } : c))
    );
  }, []);

  const addClient = useCallback((client: Omit<MockClient, "id">): MockClient => {
    const newId = `client-${Date.now()}`;
    const newClient: MockClient = { id: newId, ...client };
    setClients((prev) => [...prev, newClient]);
    return newClient;
  }, []);

  const referClient = useCallback((clientId: string, toPracticeId: string, targetProviderId?: string): string => {
    const sourceClient = clients.find((c) => c.id === clientId);
    if (!sourceClient) throw new Error(`Client ${clientId} not found`);
    const targetPractice = practices.find((p) => p.id === toPracticeId);
    if (!targetPractice) throw new Error(`Practice ${toPracticeId} not found`);

    const newId = `client-ref-${Date.now()}`;
    const newClient: MockClient = {
      id: newId,
      name: sourceClient.name,
      email: sourceClient.email,
      practiceId: toPracticeId,
      treatingProviderId: targetProviderId || "",
      referredFromClientId: clientId,
    };
    setClients((prev) => [...prev, newClient]);
    return newId;
  }, [clients, practices]);

  const [clientCredits, setClientCredits] = useState<Record<string, number>>({
    "1": 70, // Seed $70 credit for Sarah Johnson as shown in reference screenshot!
  });

  const getClientCredit = useCallback(
    (clientId: string) => clientCredits[clientId] || 0,
    [clientCredits]
  );

  const addClientCredit = useCallback((clientId: string, amount: number) => {
    setClientCredits((prev) => ({
      ...prev,
      [clientId]: (prev[clientId] || 0) + amount,
    }));
  }, []);

  const useClientCredit = useCallback((clientId: string, amount: number) => {
    setClientCredits((prev) => ({
      ...prev,
      [clientId]: Math.max(0, (prev[clientId] || 0) - amount),
    }));
  }, []);

  const getLinkedClientRecords = useCallback(
    (clientId: string): MockClient[] => {
      const result: MockClient[] = [];
      const client = clients.find((c) => c.id === clientId);
      if (!client) return result;
      if (client.referredFromClientId) {
        const source = clients.find((c) => c.id === client.referredFromClientId);
        if (source) result.push(source);
      }
      const referrals = clients.filter((c) => c.referredFromClientId === clientId);
      result.push(...referrals);
      return result;
    },
    [clients]
  );

  return (
    <PartnerDashboardContext.Provider
      value={{
        establishments,
        setEstablishments,
        practices,
        setPractices,
        currentPracticeId,
        setCurrentPracticeId,
        practiceMembers,
        setPracticeMembers,
        superAdmins,
        customRoles,
        addCustomRole,
        providers,
        setProviders,
        careTeamMemberships,
        setCareTeamMemberships,
        currentProviderId,
        setCurrentProviderId,
        currentEstablishmentId,
        setCurrentEstablishmentId,
        currentPracticeMemberships,
        isCurrentUserSuperAdmin,
        isCurrentUserAdmin,
        isCurrentUserClinician,
        isCurrentUserSupervisor,
        getCurrentEstablishment,
        getCurrentPractice,
        getPermissionsForCurrentUser,
        providerPracticeMemberships,
        addPracticeMember,
        addProvider,
        updatePracticeMember,
        offboardPracticeMember,
        createPractice,
        updatePractice,
        addCareTeamMembership,
        removeCareTeamMembership,
        canViewClientClinicalContent,
        canViewIntakeResponse,
        clientTreatingProviders,
        reassignClient,
        addClient,
        setClients,
        referClient,
        getLinkedClientRecords,
        clients,
        intakeForms,
        intakeFlows,
        formEntries,
        formResponses,
        setIntakeForms,
        setIntakeFlows,
        setFormEntries,
        setFormResponses,
        topUpCredits,
        addTopUpCredits,
        diagnosisPlans,
        setDiagnosisPlans,
        addDiagnosisPlan,
        lockDiagnosisPlan,
        unlockDiagnosisPlan,
        bills,
        setBills,
        addBill,
        updateBill,
        recordBillPayment,
        writeOffBill,
        clientCredits,
        getClientCredit,
        addClientCredit,
        useClientCredit,
        priorAuthorizations,
        setPriorAuthorizations,
        addPriorAuthorization,
        remittanceRecords,
        setRemittanceRecords,
        addRemittanceRecord,
      }}
    >
      {children}
    </PartnerDashboardContext.Provider>
  );
}

export function usePartnerDashboard() {
  const context = useContext(PartnerDashboardContext);
  if (!context) {
    throw new Error("usePartnerDashboard must be used within PartnerDashboardProvider");
  }
  return context;
}
