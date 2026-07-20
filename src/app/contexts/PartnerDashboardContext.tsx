import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Provider, EstablishmentMember, CareTeamMembership, MockClient, Establishment, IntakeForm, IntakeFlow, FormEntry, FormResponse } from "../types/partnerDashboard";
import { mockEstablishments, mockProviders, mockCareTeamMemberships, mockClients, mockIntakeForms, mockIntakeFlows, mockFormEntries, mockFormResponses } from "../data/mockPartnerData";

interface PartnerDashboardContextType {
  establishments: Establishment[];
  setEstablishments: React.Dispatch<React.SetStateAction<Establishment[]>>;
  members: EstablishmentMember[];
  providers: Provider[];
  setMembers: React.Dispatch<React.SetStateAction<EstablishmentMember[]>>;
  careTeamMemberships: CareTeamMembership[];
  setCareTeamMemberships: React.Dispatch<React.SetStateAction<CareTeamMembership[]>>;
  currentProviderId: string;
  setCurrentProviderId: (id: string) => void;
  currentEstablishmentId: string | null;
  setCurrentEstablishmentId: (id: string | null) => void;
  currentUserMemberships: EstablishmentMember[];
  isCurrentUserAdmin: boolean;
  isCurrentUserClinician: boolean;
  isCurrentUserSupervisor: boolean;
  getCurrentEstablishment: () => Establishment | undefined;
  addMember: (member: EstablishmentMember) => void;
  addProvider: (provider: Provider) => void;
  updateMember: (providerId: string, updates: Partial<EstablishmentMember>) => void;
  offboardMember: (providerId: string) => void;
  addCareTeamMembership: (membership: CareTeamMembership) => void;
  removeCareTeamMembership: (clientId: string, providerId: string) => void;
  clientTreatingProviders: Record<string, string>;
  reassignClient: (clientId: string, providerId: string) => void;
  canViewClientClinicalContent: (clientId: string) => boolean;
  canViewIntakeResponse: (form: IntakeForm, clientId: string, viewerId?: string) => boolean;
  clients: MockClient[];
  intakeForms: IntakeForm[];
  intakeFlows: IntakeFlow[];
  formEntries: FormEntry[];
  formResponses: FormResponse[];
  setIntakeForms: React.Dispatch<React.SetStateAction<IntakeForm[]>>;
  setIntakeFlows: React.Dispatch<React.SetStateAction<IntakeFlow[]>>;
  setFormEntries: React.Dispatch<React.SetStateAction<FormEntry[]>>;
  setFormResponses: React.Dispatch<React.SetStateAction<FormResponse[]>>;
}

const PartnerDashboardContext = createContext<PartnerDashboardContextType | undefined>(undefined);

export function PartnerDashboardProvider({ children }: { children: ReactNode }) {
  const [establishments, setEstablishments] = useState<Establishment[]>(mockEstablishments);
  const [members, setMembers] = useState<EstablishmentMember[]>(
    mockEstablishments.flatMap((e) => e.members)
  );
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [careTeamMemberships, setCareTeamMemberships] = useState<CareTeamMembership[]>(
    mockCareTeamMemberships
  );
  const [clientTreatingProviders, setClientTreatingProviders] = useState<Record<string, string>>(
    Object.fromEntries(mockClients.map((client) => [client.id, client.treatingProviderId]))
  );
  const [currentProviderId, setCurrentProviderId] = useState<string>("prov-admin");
  const [currentEstablishmentId, setCurrentEstablishmentId] = useState<string | null>("est-1");

  const [intakeForms, setIntakeForms] = useState<IntakeForm[]>(mockIntakeForms);
  const [intakeFlows, setIntakeFlows] = useState<IntakeFlow[]>(mockIntakeFlows);
  const [formEntries, setFormEntries] = useState<FormEntry[]>(mockFormEntries);
  const [formResponses, setFormResponses] = useState<FormResponse[]>(mockFormResponses);

  const currentUserMemberships = members.filter(
    (m) =>
      m.providerId === currentProviderId &&
      m.establishmentId === currentEstablishmentId &&
      m.memberStatus !== "offboarded"
  );

  const isCurrentUserAdmin = currentUserMemberships.some((m) => m.roles.isAdmin);
  const isCurrentUserClinician = currentUserMemberships.some(
    (m) => m.roles.clinical === "Clinician"
  );
  const isCurrentUserSupervisor = currentUserMemberships.some(
    (m) => m.roles.clinical === "Supervisor"
  );

  const getCurrentEstablishment = useCallback(
    () => establishments.find((e) => e.id === currentEstablishmentId),
    [establishments, currentEstablishmentId]
  );

  const addMember = useCallback((member: EstablishmentMember) => {
    setMembers((prev) => [...prev, member]);
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === member.establishmentId
          ? { ...e, members: [...e.members, member] }
          : e
      )
    );
  }, []);

  const addProvider = useCallback((provider: Provider) => {
    setProviders((prev) => (prev.some((p) => p.id === provider.id) ? prev : [...prev, provider]));
  }, []);

  const updateMember = useCallback(
    (providerId: string, updates: Partial<EstablishmentMember>) => {
      const existing = members.find(
        (m) => m.providerId === providerId && m.establishmentId === currentEstablishmentId
      );
      // An active member must retain a clinical role. Removing clinical access
      // is the offboarding flow, which also handles client reassignment.
      if (existing?.memberStatus === "active" && updates.roles?.clinical === null) return;
      setMembers((prev) =>
        prev.map((m) =>
          m.providerId === providerId && m.establishmentId === currentEstablishmentId
            ? { ...m, ...updates }
            : m
        )
      );
      setEstablishments((prev) =>
        prev.map((e) =>
          e.id === currentEstablishmentId
            ? {
                ...e,
                members: e.members.map((m) =>
                  m.providerId === providerId ? { ...m, ...updates } : m
                ),
              }
            : e
        )
      );
    },
    [currentEstablishmentId, members]
  );

  const offboardMember = useCallback(
    (providerId: string) => {
      updateMember(providerId, { memberStatus: "offboarded" });
    },
    [updateMember]
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
    const activeMemberships = currentUserMemberships.filter((m) => m.memberStatus === "active");
    if (activeMemberships.length === 0) return false;
    const client = mockClients.find((c) => c.id === clientId);
    if (!client) return false;

    // Check if the user is treating provider
    if (clientTreatingProviders[clientId] === currentProviderId) return true;

    // Check if the user is on the Care Team
    const isCareTeam = careTeamMemberships.some(
      (m) => m.clientId === clientId && m.providerId === currentProviderId
    );
    if (isCareTeam) return true;

    // Check if the user supervises the treating provider
    const supervisorMembership = activeMemberships.find((m) => m.roles.clinical === "Supervisor" || (m.supervises && m.supervises.length > 0));
    const treatingProviderId = clientTreatingProviders[clientId];
    if (supervisorMembership && supervisorMembership.supervises && supervisorMembership.supervises.includes(treatingProviderId)) return true;

    // Admin membership alone never grants clinical access
    return false;
  }, [currentProviderId, currentUserMemberships, careTeamMemberships, clientTreatingProviders]);

  const canViewIntakeResponse = useCallback((form: IntakeForm, clientId: string, viewerId?: string) => {
    const pid = viewerId ?? currentProviderId;
    const activeMemberships = members.filter(
      (m) => m.providerId === pid && m.establishmentId === currentEstablishmentId && m.memberStatus === "active"
    );
    const client = mockClients.find((c) => c.id === clientId);
    if (!client) return false;

    const isAdmin = activeMemberships.some((m) => m.roles.isAdmin);
    const isClinician = activeMemberships.some((m) => m.roles.clinical === "Clinician");
    const isSupervisor = activeMemberships.some((m) => m.roles.clinical === "Supervisor");

    if (form.category === "administrative") {
      return isAdmin || clientTreatingProviders[clientId] === pid;
    }

    if (form.category === "clinical") {
      if (clientTreatingProviders[clientId] === pid) return true;
      if (isAdmin && isClinician && clientTreatingProviders[clientId] === pid) return true;
      
      // Also allow if they are on the Care Team
      const isCareTeam = careTeamMemberships.some(
        (m) => m.clientId === clientId && m.providerId === pid
      );
      if (isCareTeam) return true;

      // Check supervises lists for both supervisor and supervisors lists
      const supervisorMembership = activeMemberships.find((m) => m.roles.clinical === "Supervisor" || (m.supervises && m.supervises.length > 0));
      const treatingProviderId = clientTreatingProviders[clientId];
      if (supervisorMembership && supervisorMembership.supervises && supervisorMembership.supervises.includes(treatingProviderId)) return true;
      
      return false;
    }

    return false;
  }, [currentProviderId, currentEstablishmentId, members, clientTreatingProviders, careTeamMemberships]);

  const reassignClient = useCallback((clientId: string, providerId: string) => {
    setClientTreatingProviders((prev) => ({ ...prev, [clientId]: providerId }));
  }, []);

  return (
    <PartnerDashboardContext.Provider
      value={{
        establishments,
        setEstablishments,
        members,
        providers,
        setMembers,
        careTeamMemberships,
        setCareTeamMemberships,
        currentProviderId,
        setCurrentProviderId,
        currentEstablishmentId,
        setCurrentEstablishmentId,
        currentUserMemberships,
        isCurrentUserAdmin,
        isCurrentUserClinician,
        isCurrentUserSupervisor,
        getCurrentEstablishment,
        addMember,
        addProvider,
        updateMember,
        offboardMember,
        addCareTeamMembership,
        removeCareTeamMembership,
        canViewClientClinicalContent,
        canViewIntakeResponse,
        clientTreatingProviders,
        reassignClient,
        clients: mockClients,
        intakeForms,
        intakeFlows,
        formEntries,
        formResponses,
        setIntakeForms,
        setIntakeFlows,
        setFormEntries,
        setFormResponses,
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
