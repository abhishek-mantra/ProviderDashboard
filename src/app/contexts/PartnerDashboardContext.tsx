import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import type { Provider, Practice, PracticeMember, EstablishmentSuperAdmin, CustomRole, CareTeamMembership, MockClient, Establishment, IntakeForm, IntakeFlow, FormEntry, FormResponse, PermissionSet } from "../types/partnerDashboard";
import { ROLE_PERMISSION_DEFAULTS, BASE_ROLES } from "../types/partnerDashboard";
import { mockEstablishments, mockProviders, mockCareTeamMemberships, mockClients, mockIntakeForms, mockIntakeFlows, mockFormEntries, mockFormResponses, mockPractices, mockPracticeMembers, mockSuperAdmins, mockCustomRoles } from "../data/mockPartnerData";
import type { ClaimRegion } from "../types/claims";

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
  updateClientInsuranceRegion: (clientId: string, region: ClaimRegion) => void;
  canViewClientClinicalContent: (clientId: string) => boolean;
  canViewIntakeResponse: (form: IntakeForm, clientId: string, viewerId?: string) => boolean;
  addClient: (client: Omit<MockClient, "id">) => MockClient;
  setClients: React.Dispatch<React.SetStateAction<MockClient[]>>;
  referClient: (clientId: string, toPracticeId: string) => string;
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
  const [customRoles] = useState<CustomRole[]>(mockCustomRoles);
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
  }, [currentProviderId, practiceMembers, careTeamMemberships, clientTreatingProviders, clients, isCurrentUserSuperAdmin]);

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

  const updateClientInsuranceRegion = useCallback(
    (clientId: string, region: ClaimRegion) => {
      setClients((prev) =>
        prev.map((c) => (c.id === clientId ? { ...c, insuranceRegion: region } : c))
      );
    },
    []
  );

  const referClient = useCallback((clientId: string, toPracticeId: string): string => {
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
      treatingProviderId: sourceClient.treatingProviderId,
      insuranceRegion: sourceClient.insuranceRegion,
      referredFromClientId: clientId,
    };
    setClients((prev) => [...prev, newClient]);
    return newId;
  }, [clients, practices]);

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
        updateClientInsuranceRegion,
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
