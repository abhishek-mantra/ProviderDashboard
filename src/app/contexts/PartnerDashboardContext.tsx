import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Provider, EstablishmentMember, CareTeamMembership, MockClient, Establishment } from "../types/partnerDashboard";
import { mockEstablishments, mockProviders, mockCareTeamMemberships, mockClients } from "../data/mockPartnerData";

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
  clients: MockClient[];
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
    const current = activeMemberships.find((m) => m.roles.isAdmin) || activeMemberships[0];
    const client = mockClients.find((c) => c.id === clientId);
    if (!current || !client) return false;
    if (current.roles.isAdmin || activeMemberships.some((m) => m.roles.isAdmin)) {
      return activeMemberships.some((m) => m.roles.clinical === "Clinician") &&
        clientTreatingProviders[clientId] === currentProviderId;
    }
    if (current.roles.clinical === "Clinician") {
      return clientTreatingProviders[clientId] === currentProviderId ||
        careTeamMemberships.some((m) => m.clientId === clientId && m.providerId === currentProviderId);
    }
    if (current.roles.clinical === "Supervisor") {
      return clientTreatingProviders[clientId] === currentProviderId || current.supervises.includes(clientTreatingProviders[clientId]);
    }
    return false;
  }, [currentProviderId, currentUserMemberships, careTeamMemberships, clientTreatingProviders]);

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
        clientTreatingProviders,
        reassignClient,
        clients: mockClients,
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
