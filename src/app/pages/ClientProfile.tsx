import { useNavigate, useParams, Link } from "react-router";
import { useState, useMemo } from "react";
import { openBillingPanel } from "../components/billing/billingPanelStore";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Package,
  MessageSquare,
  DollarSign,
  UserMinus,
  Flag,
  Mail,
  Phone,
  MapPin,
  User,
  UserCircle,
  BookOpen,
  StickyNote,
  Mic,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Lock,
  Eye,
  FileSpreadsheet,
  ChevronLeft,
  ClipboardCheck,
  Download,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import MantraCareLogo from "../../imports/MantraCare_(1)-1.svg";
import { toast } from "sonner";
import { MobileAppModal } from "../components/MobileAppModal";
import { usePlanMode } from "../contexts/PlanModeContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { CareTeamManager } from "./CareTeamManager";
import { PHQ9_ITEMS, GAD7_ITEMS } from "../data/mockPartnerData";
import { FIELD_TYPE_LABELS } from "../types/partnerDashboard";
import type { IntakeForm, FormResponse, FormField } from "../types/partnerDashboard";
import { getScreeningScoreLabel, getScreeningScoreColor } from "../types/partnerDashboard";

interface ActionButton {
  icon: any;
  label: string;
  onClick: () => void;
}

export function ClientProfile({ clientId, clientName, clientEmail, onClose, overlay = false }: { clientId?: string; clientName?: string; clientEmail?: string; onClose?: () => void; overlay?: boolean }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const id = clientId ?? routeId;
  const [clientType, setClientType] = useState<"Mantra" | "Personal" | "InactiveOnboarded">("Mantra");
  const [isMobileAppModalOpen, setIsMobileAppModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "linked">("summary");
  const [showReferModal, setShowReferModal] = useState(false);
  const [targetPracticeId, setTargetPracticeId] = useState("");
  const [targetProviderId, setTargetProviderId] = useState("");
  const { canViewClientClinicalContent, providers, intakeForms, formResponses, clients, practices, practiceMembers, currentPracticeId, referClient, getLinkedClientRecords, diagnosisPlans, addDiagnosisPlan, lockDiagnosisPlan, unlockDiagnosisPlan } = usePartnerDashboard();
  const { planMode } = usePlanMode();

  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [newPlanCodes, setNewPlanCodes] = useState<string[]>(["F41.1"]);
  const [newPlanNotes, setNewPlanNotes] = useState("");
  const [newPlanDate, setNewPlanDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [newPlanLock, setNewPlanLock] = useState(true);

  const COMMON_ICD10_CODES = [
    { code: "F41.1", label: "Generalized anxiety disorder" },
    { code: "F32.9", label: "Major depressive disorder, single episode, unspecified" },
    { code: "F32.1", label: "Major depressive disorder, single episode, moderate" },
    { code: "F33.1", label: "Major depressive disorder, recurrent, moderate" },
    { code: "F43.22", label: "Adjustment disorder with anxiety" },
    { code: "F43.23", label: "Adjustment disorder with mixed anxiety and depressed mood" },
    { code: "F41.9", label: "Anxiety disorder, unspecified" },
    { code: "F40.10", label: "Social phobia, unspecified" },
    { code: "F90.0", label: "ADHD, predominantly inattentive type" },
    { code: "F42.2", label: "Obsessive-compulsive disorder" },
  ];

  const clientDiagnosisPlans = useMemo(
    () => (diagnosisPlans || []).filter((p) => p.clientId === id),
    [diagnosisPlans, id]
  );

  const handleCreatePlan = () => {
    if (newPlanCodes.length === 0) {
      toast.error("Please select at least one ICD-10 diagnosis code.");
      return;
    }
    addDiagnosisPlan({
      clientId: id || "1",
      diagnosisCodes: newPlanCodes,
      treatmentPlanNotes: newPlanNotes,
      assignedProviderId: clientRecord?.treatingProviderId || "prov-1",
      effectiveDate: newPlanDate,
      isLocked: newPlanLock,
    });
    toast.success("Diagnosis & Treatment Plan saved successfully.");
    setShowNewPlanModal(false);
    setNewPlanNotes("");
  };

  const handleUnlockPlan = (planId: string) => {
    if (
      window.confirm(
        "Unlocking will allow edits to a signed treatment plan and may affect audit trails. Do you wish to continue?"
      )
    ) {
      unlockDiagnosisPlan(planId);
      toast.info("Diagnosis Plan unlocked for editing.");
    }
  };

  const clientRecord = clients.find((item) => item.id === id) || clients[0];
  const linkedRecords = getLinkedClientRecords(id || "");
  const clientPractice = practices.find((p) => p.id === clientRecord?.practiceId);
  const otherPractices = practices.filter((p) => p.id !== currentPracticeId);
  const client = {
    id: id || "168019",
    name: clientName || clientRecord.name,
    clientId: "#168019",
    type: clientType,
    avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk5OTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    email: clientEmail || clientRecord.email,
    phone: "+44 20 1234 5678",
    country: "United Kingdom",
    age: 26,
    gender: "Male",
    summary: {
      therapies: [
        "Therapy for Hypertension", "ADHD", "Abuse", "Addiction", "Anger", "Anxiety", 
        "Bipolar", "Child Or Teen", "Depression", "Family", "Insomnia", "LGBTQ+", 
        "OCD", "Panic Attacks", "Relationship/ Couple", "Sex Therapy", "Spiritual", 
        "Stress Management", "Trauma And PTSD", "Workplace Issues", 
        "Employee Mental Health / EAP", "Marriage", "Divorce", "Online Therapy"
      ],
      pricePerSession: "$0.01",
      sessionType: "Video",
      language: "English",
      location: "United Kingdom"
    }
  };

  const actionButtons: ActionButton[] = [
    {
      icon: Calendar,
      label: "Appointments",
      onClick: () => navigate(`/sessions?client=${encodeURIComponent(client.name)}`)
    },
    {
      icon: StickyNote,
      label: "Notes",
      onClick: () => navigate(`/clients/${id}/notes`)
    },
    {
      icon: Pill,
      label: "Prescriptions",
      onClick: () => navigate(`/clients/${id}/prescriptions`)
    },
    {
      icon: BookOpen,
      label: "Resources",
      onClick: () => navigate(`/tools`)
    },
    {
      icon: CreditCard,
      label: "Invoicing",
      onClick: () => openBillingPanel({ kind: "client", id })
    },
    {
      icon: ShieldCheck,
      label: "Insurance",
      onClick: () => navigate(`/clients/${id}/insurance`)
    },
    {
      icon: TrendingUp,
      label: "Pathway",
      onClick: () => navigate(`/clients/${id}/pathway`)
    },
    {
      icon: BarChart3,
      label: "Insights",
      onClick: () => navigate(`/clients/${id}/insights`)
    },
    {
      icon: Package,
      label: "Orders",
      onClick: () => navigate(`/clients/${id}/orders`)
    },
    {
      icon: MessageSquare,
      label: "Request Feedback",
      onClick: () => {
        toast.success("Feedback requested successfully");
      }
    },
    {
      icon: DollarSign,
      label: "Earnings",
      onClick: () => navigate(`/billing/bills?clientId=${id}`)
    },
    {
      icon: ClipboardList,
      label: "Intake Forms",
      onClick: () => navigate(`/intake-forms?tab=entries&search=${encodeURIComponent(client?.name || "")}`)
    },
    {
      icon: ShieldCheck,
      label: "New Claim",
      onClick: () => navigate(`/billing/bills/create?clientId=${id}`)
    }
  ];

  const canViewClinicalContent = canViewClientClinicalContent(id || client.id);

  const visibleActionButtons = canViewClinicalContent
    ? actionButtons
    : actionButtons.filter((_, index) => ![1, 2, 7].includes(index));

  // Action groups - Group 1: Core (0-5), Group 2: Analytics (6-7), Group 3: Business (8-10)
  const actionGroups = [
    {
      actions: visibleActionButtons.slice(0, 6),
      color: "blue"
    },
    {
      actions: visibleActionButtons.slice(6, 8),
      color: "purple"
    },
    {
      actions: visibleActionButtons.slice(8, 11),
      color: "green"
    }
  ];

  // Filter groups based on client type (Personal clients only get first group)
  const filteredActionGroups = clientType === "Personal" || clientType === "InactiveOnboarded"
    ? [actionGroups[0]] 
    : actionGroups;

  return (
    <div className="max-w-[1000px] space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Dev Mode Toggle - Fixed position */}
      <div className="fixed top-2 right-2 md:top-4 md:right-4 z-50 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 md:p-3 max-w-[95vw]">
        <div className="space-y-2">
          {/* Client Type Toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide hidden md:inline">Client:</span>
            <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide md:hidden">Type:</span>
            <div className="flex items-center gap-1 md:gap-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5 md:p-1 overflow-x-auto">
              <button
                onClick={() => setClientType("Mantra")}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all whitespace-nowrap ${
                  clientType === "Mantra"
                    ? "bg-[#043570] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="hidden md:inline">Mantra Active</span>
                <span className="md:hidden">Mantra</span>
              </button>
              <button
                onClick={() => setClientType("Personal")}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all whitespace-nowrap ${
                  clientType === "Personal"
                    ? "bg-[#043570] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="hidden md:inline">Non-Mantra</span>
                <span className="md:hidden">Non-Mantra</span>
              </button>
              <button
                onClick={() => setClientType("InactiveOnboarded")}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-md md:rounded-lg transition-all whitespace-nowrap ${
                  clientType === "InactiveOnboarded"
                    ? "bg-[#043570] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="hidden md:inline">Inactive</span>
                <span className="md:hidden">Inactive</span>
              </button>
            </div>
          </div>


        </div>
      </div>

      {/* Back Button */}
      <div className="flex items-center gap-3 mt-2 md:mt-0">
        <button
          onClick={() => onClose ? onClose() : navigate("/clients")}
          className="p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl transition-colors"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Client Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
          <div className="flex items-start gap-3 md:gap-5 w-full md:w-auto">
            {/* Avatar */}
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-xl md:rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
              <ImageWithFallback
                src={client.avatar}
                alt={`${client.name}'s avatar`}
                className="w-full h-full object-cover"
                fallback={
                  <div className="w-full h-full bg-[#043570] flex items-center justify-center">
                    <User className="size-8 md:size-10 text-white" />
                  </div>
                }
              />
            </div>

            {/* Client Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {client.name}
                </h2>
                {client.type === "Mantra" && (
                  <span className="h-4 md:h-5 px-2 md:px-2.5 py-0.5 bg-[#f3faff] dark:bg-blue-900/20 rounded-full flex items-center group relative flex-shrink-0">
                    <img src={MantraCareLogo} alt="Mantra" className="h-full w-auto" />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Mantra Client
                    </span>
                  </span>
                )}
              </div>
              {client.type === "Mantra" && (
                <p className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 md:mb-3">
                  {client.clientId}
                </p>
              )}
              
              {/* Additional info for Mantra clients */}
              {client.type === "Mantra" && (
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <MapPin className="size-3 md:size-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.country}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <User className="size-3 md:size-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.age}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <svg className="size-3 md:size-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v8m4-4l-4-4-4 4"/>
                    </svg>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.gender}</span>
                  </div>
                  {clientPractice && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {clientPractice.name}
                    </span>
                  )}
                </div>
              )}
              
              {/* Additional info for Personal clients */}
              {client.type === "Personal" && (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <MapPin className="size-3 md:size-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <User className="size-3 md:size-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.age}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <svg className="size-3 md:size-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v8m4-4l-4-4-4 4"/>
                      </svg>
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.gender}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Practice badge & Refer to Practice button */}
              {clientPractice && (
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {clientPractice.name}
                  </span>
                  {linkedRecords.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300">
                      <GitBranch className="size-3" />
                      {linkedRecords.length} linked
                    </span>
                  )}
                  {otherPractices.length > 0 && (
                    <button
                      onClick={() => {
                        setShowReferModal(true);
                        setTargetPracticeId(otherPractices[0]?.id || "");
                        setTargetProviderId("");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00c0ff]/10 text-[#00c0ff] hover:bg-[#00c0ff]/20 transition-colors"
                    >
                      <GitBranch className="size-3.5" />
                      Refer to Practice
                    </button>
                  )}
                </div>
              )}

              {/* Real-Time Insurance Eligibility Badge */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                  <ShieldCheck className="size-3.5 text-emerald-600" />
                  <span>Active Coverage - BlueCross BlueShield</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  $25 Copay • $500 Deductible
                </span>
              </div>
              {/* Additional info for InactiveOnboarded clients */}
              {client.type === "InactiveOnboarded" && (
                <div className="space-y-2 mt-2">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <MapPin className="size-3 md:size-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <User className="size-3 md:size-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.age}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <svg className="size-3 md:size-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v8m4-4l-4-4-4 4"/>
                      </svg>
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{client.gender}</span>
                    </div>
                  </div>
                  {clientPractice && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {clientPractice.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Action Buttons for Mantra, Client ID for Personal */}
          {client.type === "Mantra" ? (
            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg md:rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors font-semibold text-xs md:text-sm shadow-sm">
                <UserMinus className="size-3.5 md:size-4" />
                Drop
              </button>
              <button className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg md:rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-semibold text-xs md:text-sm shadow-sm">
                <Flag className="size-3.5 md:size-4" />
                Report
              </button>
            </div>
          ) : (
            <p className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 md:mt-0">
              {client.clientId}
            </p>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => { setActiveTab("summary"); }}
          className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
            activeTab === "summary"
              ? "border-[#043570] text-[#043570] dark:text-[#00c0ff] dark:border-[#00c0ff]"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <User className="size-4" />
            Summary
          </div>
        </button>
        <button
          onClick={() => { setActiveTab("linked"); }}
          className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
            activeTab === "linked"
              ? "border-[#043570] text-[#043570] dark:text-[#00c0ff] dark:border-[#00c0ff]"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <GitBranch className="size-4" />
            Linked Records {linkedRecords.length > 0 && `(${linkedRecords.length})`}
          </div>
        </button>
      </div>

      {/* Summary Tab Content */}
      {activeTab === "linked" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="size-2 md:size-2.5 bg-purple-500 rounded-full"></div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Linked Records</h3>
          </div>
          {clientRecord && clientRecord.referredFromClientId && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <span className="font-semibold">Referred from:</span>{' '}
                {clients.find((c) => c.id === clientRecord.referredFromClientId)?.name || "Unknown source"}
              </p>
            </div>
          )}
          {linkedRecords.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No linked client records found.</p>
          ) : (
            <div className="space-y-3">
              {linkedRecords.map((linked) => {
                const linkedPractice = practices.find((p) => p.id === linked.practiceId);
                return (
                  <div key={linked.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="size-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{linked.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{linked.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {linkedPractice?.name || linked.practiceId}
                      </span>
                      <Link
                        to={`/clients/${linked.id}`}
                        className="p-1.5 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 rounded-lg transition-all"
                      >
                        <Eye className="size-3.5 text-[#4169E1]" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Referral action with Practitioner Selection */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setShowReferModal(true);
                setTargetPracticeId(otherPractices[0]?.id || "");
                setTargetProviderId("");
              }}
              disabled={otherPractices.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl transition-all border border-purple-200 dark:border-purple-800 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              <GitBranch className="size-4" />
              Refer to Another Practice Location
            </button>
          </div>
        </div>
      )}

      {/* Referral & Practitioner Assignment Modal */}
      {showReferModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowReferModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="size-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Refer Client to Practice</h3>
              </div>
              <button
                onClick={() => setShowReferModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle className="size-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Refer <strong>{client.name}</strong> to another practice location under your establishment.
            </p>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Target Practice Location *
                </label>
                <select
                  value={targetPracticeId}
                  onChange={(e) => {
                    setTargetPracticeId(e.target.value);
                    setTargetProviderId("");
                  }}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-[#00c0ff]"
                >
                  {otherPractices.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.city || "Virtual"})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Assign Practitioner (Optional)
                </label>
                <select
                  value={targetProviderId}
                  onChange={(e) => setTargetProviderId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-[#00c0ff]"
                >
                  <option value="">Unassigned (Target Practice Admin will assign)</option>
                  {practiceMembers
                    .filter((m) => m.practiceId === targetPracticeId && m.memberStatus === "active")
                    .map((m) => {
                      const p = providers.find((prov) => prov.id === m.providerId);
                      return (
                        <option key={m.providerId} value={m.providerId}>
                          {p?.name || m.providerId} ({p?.profession || "Practitioner"})
                        </option>
                      );
                    })}
                </select>
                <p className="text-[11px] text-gray-400 mt-1">
                  {targetProviderId
                    ? "Practitioner will be assigned as Treating Provider immediately upon referral."
                    : "If unassigned, the client will wait in the target practice roster for an admin to assign."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setShowReferModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (id && targetPracticeId) {
                    referClient(id, targetPracticeId, targetProviderId || undefined);
                    setShowReferModal(false);
                    const targetPract = practices.find((p) => p.id === targetPracticeId);
                    toast.success(
                      targetProviderId
                        ? `Client referred to ${targetPract?.name || "practice"} and practitioner assigned!`
                        : `Client referred to ${targetPract?.name || "practice"}! Target practice team notified.`
                    );
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-xl font-bold transition-all shadow-md"
              >
                Confirm Referral
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "summary" && (
        <>
          {canViewClinicalContent && clientDiagnosisPlans.length === 0 && (
            <div className="mb-4 p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/60 rounded-xl flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="size-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-xs md:text-sm font-medium">
                  <strong>No active Diagnosis & Treatment Plan</strong> - required before signing notes or submitting claims.
                </span>
              </div>
              <button
                onClick={() => setShowNewPlanModal(true)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                + Create Plan
              </button>
            </div>
          )}

          {/* Summary Section: clinical content is limited to the treating clinician,
              permitted supervisor, or care-team clinician. Admin membership alone
              never grants access. */}
          {canViewClinicalContent ? <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="size-2 md:size-2.5 bg-[#00c0ff] rounded-full"></div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Summary</h3>
            </div>

            <div className="space-y-4 md:space-y-5">
              {/* Therapies */}
              <div>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {client.summary.therapies.join(", ")}
                </p>
              </div>

              {/* Session Info - Only for Mantra and Personal clients */}
              {client.type !== "InactiveOnboarded" && (
                <div className="pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">Price Per Session:</span> {client.summary.sessionType} - <span className="font-semibold text-[#043570] dark:text-[#00c0ff]">{client.summary.pricePerSession}</span>
                  </p>
                </div>
              )}

              {/* Language and Location */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 pt-2">
                <div className="flex items-center gap-2 md:gap-2.5">
                  <div className="size-7 md:size-8 bg-[#f3faff] dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="size-3.5 md:size-4 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <span className="text-xs md:text-sm text-[#043570] dark:text-[#00c0ff] font-semibold">{client.summary.language}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-2.5">
                  <div className="size-7 md:size-8 bg-[#f3faff] dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="size-3.5 md:size-4 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-xs md:text-sm text-[#043570] dark:text-[#00c0ff] font-semibold">{client.summary.location}</span>
                </div>
              </div>

              {/* Diagnosis & Treatment Plans (ICD-10) */}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="size-4 text-[#00c0ff]" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      Diagnosis & Treatment Plans (ICD-10)
                    </span>
                    <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {clientDiagnosisPlans.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNewPlanModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#043570] hover:bg-[#032554] text-white rounded-lg transition-colors shadow-sm"
                  >
                    + New Plan
                  </button>
                </div>

                {clientDiagnosisPlans.length === 0 ? (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg text-center text-xs text-gray-500 dark:text-gray-400">
                    No diagnosis & treatment plans on file. Create a plan to enable session note signing and charge capture.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {clientDiagnosisPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-3 rounded-xl border transition-all ${
                          plan.isLocked
                            ? "bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800/60 shadow-xs"
                            : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            {(plan.diagnosisCodes || []).map((code) => (
                              <span
                                key={code}
                                className="px-2 py-0.5 text-xs font-mono font-bold bg-[#043570]/10 dark:bg-[#00c0ff]/20 text-[#043570] dark:text-[#00c0ff] rounded-md border border-[#043570]/20 dark:border-[#00c0ff]/30"
                              >
                                {code}
                              </span>
                            ))}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Effective: <strong>{plan.effectiveDate}</strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {plan.isLocked ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 rounded-full">
                                <Lock className="size-3" />
                                Locked
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 rounded-full">
                                Draft
                              </span>
                            )}

                            {plan.isLocked ? (
                              <button
                                onClick={() => handleUnlockPlan(plan.id)}
                                className="text-xs text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                title="Unlock plan for editing"
                              >
                                Unlock
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  lockDiagnosisPlan(plan.id);
                                  toast.success("Diagnosis Plan locked and activated.");
                                }}
                                className="px-2 py-0.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                              >
                                Lock Plan
                              </button>
                            )}
                          </div>
                        </div>

                        {plan.treatmentPlanNotes && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 pl-1 border-l-2 border-gray-200 dark:border-gray-600 italic">
                            {plan.treatmentPlanNotes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div> : (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
              Clinical notes and chart content are available only to the treating practitioner and authorized clinical team members.
            </div>
          )}

          {/* Actions Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                {planMode === "transcriber-only" && (
                  <div className="size-2 md:size-2.5 bg-[#00c0ff] rounded-full"></div>
                )}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Actions</h3>
              </div>
              {planMode === "transcriber-only" && (
                <p className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-1 md:mt-2">
                  Your AI Transcriber tools
                </p>
              )}
            </div>

            {(planMode === "full-ehr" || planMode === "provider") && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                {visibleActionButtons
                  .filter((_, index) => {
                    if (client.type === "InactiveOnboarded") {
                      return index < 5;
                    }
                    return true;
                  })
                  .map((action, index) => {
                  const originalIndex = visibleActionButtons.indexOf(action);
                  const iconColors = [
                    'text-blue-600', 'text-amber-600', 'text-pink-600', 'text-green-600',
                    'text-orange-600', 'text-cyan-600', 'text-purple-600', 'text-blue-600',
                    'text-green-600', 'text-blue-500', 'text-emerald-600', 'text-cyan-600',
                  ];
                  const hoverColors = [
                    'hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                    'hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20',
                    'hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20',
                    'hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20',
                    'hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20',
                    'hover:border-cyan-300 dark:hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
                    'hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20',
                    'hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                    'hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20',
                    'hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                    'hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
                    'hover:border-cyan-300 dark:hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
                  ];
                  return (
                    <button
                      key={originalIndex}
                      onClick={action.onClick}
                      className={`group flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-200 ${hoverColors[originalIndex]}`}
                    >
                      <action.icon className={`size-5 md:size-7 ${iconColors[originalIndex]} transition-transform duration-200 group-hover:scale-110`} strokeWidth={2} />
                      <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {planMode === "transcriber-only" && (
              <div className={`grid ${client.type === "InactiveOnboarded" ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"} gap-2 md:gap-4`}>
                {client.type !== "InactiveOnboarded" && (
                  <button onClick={() => navigate(`/clients/${id}/transcripts`)}
                    className="group relative flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl border border-[#00c0ff]/30 dark:border-[#00c0ff]/30 bg-white dark:bg-gray-800 hover:border-[#00c0ff]/60 dark:hover:border-[#00c0ff]/60 hover:bg-[#00c0ff]/5 dark:hover:bg-[#00c0ff]/5 hover:shadow-lg transition-all duration-200"
                  >
                    <span className="absolute top-2 right-2 bg-[#00c0ff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>
                    <Mic className="size-5 md:size-7 text-[#00c0ff] transition-transform duration-200 group-hover:scale-110" strokeWidth={2} />
                    <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">Transcripts</span>
                  </button>
                )}
                <button onClick={() => navigate(`/clients/${id}/notes`)}
                  className="group flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:shadow-lg transition-all duration-200"
                >
                  <StickyNote className="size-5 md:size-7 text-amber-600 transition-transform duration-200 group-hover:scale-110" strokeWidth={2} />
                  <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">Session Notes</span>
                </button>
                <button onClick={() => navigate(`/clients/${id}/prescriptions`)}
                  className="group flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:shadow-lg transition-all duration-200"
                >
                  <Pill className="size-5 md:size-7 text-pink-600 transition-transform duration-200 group-hover:scale-110" strokeWidth={2} />
                  <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">Prescriptions</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <CareTeamManager clientId={id || "1"} />
          </div>
        </>
      )}

      {/* Mobile App Modal */}
      <MobileAppModal
        isOpen={isMobileAppModalOpen}
        onClose={() => setIsMobileAppModalOpen(false)}
      />

      {/* New Diagnosis & Treatment Plan Modal */}
      {showNewPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ClipboardList className="size-5 text-[#00c0ff]" />
                New Diagnosis & Treatment Plan
              </h3>
              <button
                onClick={() => setShowNewPlanModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                âœ•
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-2">
                Select ICD-10 Diagnosis Code(s) *
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/30">
                {COMMON_ICD10_CODES.map((item) => {
                  const isChecked = newPlanCodes.includes(item.code);
                  return (
                    <label
                      key={item.code}
                      className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer text-xs transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setNewPlanCodes(newPlanCodes.filter((c) => c !== item.code));
                          } else {
                            setNewPlanCodes([...newPlanCodes, item.code]);
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-[#043570] focus:ring-[#00c0ff]"
                      />
                      <span className="font-mono font-bold text-[#043570] dark:text-[#00c0ff] shrink-0">
                        {item.code}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 truncate">
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Effective Date *
              </label>
              <input
                type="date"
                value={newPlanDate}
                onChange={(e) => setNewPlanDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 block">
                Can be backdated to cover prior appointments.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Treatment Plan Notes (Optional)
              </label>
              <textarea
                value={newPlanNotes}
                onChange={(e) => setNewPlanNotes(e.target.value)}
                rows={3}
                placeholder="Document clinical justification, objectives, or treatment modality..."
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="lock-plan-chk"
                checked={newPlanLock}
                onChange={(e) => setNewPlanLock(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-[#043570] focus:ring-[#00c0ff]"
              />
              <label htmlFor="lock-plan-chk" className="text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Lock plan immediately upon saving (recommended for charge capture)
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setShowNewPlanModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlan}
                className="px-5 py-2 text-sm font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -- Intake Tab Component ------------------------------------------------------

// -- Form Response Viewer (Read-Only) -----------------------------------------

export function FormResponseViewer({
  form,
  response,
  onBack,
}: {
  form: IntakeForm;
  response: FormResponse;
  onBack: () => void;
}) {
  const { currentProviderId, currentPracticeMemberships, providers, clientTreatingProviders, setFormResponses } = usePartnerDashboard();
  const sortedFields = [...form.fields].sort((a, b) => a.order - b.order);

  // Find active memberships
  const activeMemberships = currentPracticeMemberships.filter((m) => m.memberStatus === "active");
  const supervisorMembership = activeMemberships.find(
    (m) => m.role === "Supervisor" || m.role === "Admin" || (m.supervises && m.supervises.length > 0)
  );

  const treatingProviderId = clientTreatingProviders[response.clientId];
  const isSupervised = supervisorMembership && supervisorMembership.supervises && supervisorMembership.supervises.includes(treatingProviderId);
  const canCoSign = isSupervised && form.category === "clinical" && !response.coSignedBy;

  const handleCoSign = () => {
    const supervisorName = providers.find((p) => p.id === currentProviderId)?.name || "Dr. Admin Owner";
    setFormResponses((prev) =>
      prev.map((r) =>
        r.id === response.id
          ? { ...r, coSignedBy: supervisorName, coSignedAt: new Date().toISOString() }
          : r
      )
    );
    toast.success("Response co-signed and locked successfully");
  };

  function findAnswer(fieldId: string) {
    return response.answers.find((a) => a.fieldId === fieldId);
  }

  function renderFieldValue(field: FormField) {
    const answer = findAnswer(field.id);
    const value = answer?.value;

    if (field.type === "screening_instrument") {
      const instrumentLabel = field.instrumentType === "PHQ-9" ? "PHQ-9" : "GAD-7";
      const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
      const screeningAnswers = answer?.screeningAnswers ?? [];
      const score = answer?.computedScore ?? 0;
      const severityLabel = getScreeningScoreLabel(field.instrumentType, score);

      const accentBorder = score >= 15
        ? "border-l-4 border-l-red-500"
        : score >= 10
        ? "border-l-4 border-l-amber-500"
        : "border-l-4 border-l-emerald-500";

      return (
        <div className={`space-y-3 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white dark:from-gray-850 dark:to-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm ${accentBorder}`}>
          <div className="flex items-center justify-between gap-3 flex-wrap border-b border-gray-100/50 dark:border-gray-700/50 pb-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold ${getScreeningScoreColor(score)}`}>
              <FileSpreadsheet className="size-4" />
              <span>{instrumentLabel} Assessment Result</span>
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>Score:</span>
              <span className={`text-base font-extrabold px-2.5 py-0.5 rounded-lg ${
                score >= 15 ? "text-red-600 bg-red-50 dark:bg-red-950/30" : score >= 10 ? "text-amber-600 bg-amber-50 dark:bg-amber-950/30" : "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
              }`}>
                {score}
              </span>
              <span className="text-xs font-medium text-gray-555 dark:text-gray-400">({severityLabel})</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
            {items.map((itemText, idx) => {
              const sa = screeningAnswers.find((a) => a.itemIndex === idx);
              const val = sa?.value ?? 0;
              return (
                <div key={idx} className="flex items-start gap-2.5 py-2 px-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-gray-50 dark:border-gray-800/40 hover:bg-white dark:hover:bg-slate-900/60 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-150 dark:bg-gray-800 size-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                  <span className="text-xs text-gray-650 dark:text-gray-300 flex-1 leading-snug">{itemText}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${
                    val === 3
                      ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                      : val === 2
                      ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                      : val === 1
                      ? "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}>
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (field.type === "agreement_text") {
      return (
        <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 italic leading-relaxed">
          {typeof value === "string" ? value : "N/A"}
        </div>
      );
    }

    if (field.type === "yes_no") {
      const val = typeof value === "string" ? value : "";
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
          val === "Yes"
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            : "bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
        }`}>
          {val === "Yes" ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
          {val || "N/A"}
        </span>
      );
    }

    if (field.type === "e_signature") {
      const isImage = typeof value === "string" && value.startsWith("data:image/");
      return isImage ? (
        <img src={value as string} alt="Signature" className="max-h-12 bg-transparent dark:brightness-200" />
      ) : (
        <div className="text-sm font-semibold text-gray-900 dark:text-white font-['Bradley_Hand','Brush_Script_MT',cursive]">
          {typeof value === "string" ? value : "N/A"}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
              {v}
            </span>
          ))}
        </div>
      );
    }

    return (
      <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
        {value || <span className="text-gray-400 italic">No answer</span>}
      </p>
    );
  }

  return (
    <div id="printable-form-response" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-form-response, #printable-form-response * {
            visibility: visible !important;
          }
          #printable-form-response {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      <div className="p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors no-print"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">{form.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Submitted {new Date(response.submittedAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="ml-auto flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold shadow-sm transition-colors no-print"
          >
            <Download className="size-3.5" />
            Export PDF
          </button>

          {response.coSignedBy && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/45">
              <ClipboardCheck className="size-3.5" />
              <span>Co-signed by {response.coSignedBy}</span>
            </div>
          )}
          {canCoSign && (
            <button
              onClick={handleCoSign}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl text-xs font-bold shadow-sm transition-colors no-print"
            >
              <ClipboardCheck className="size-3.5" />
              Co-sign & Lock
            </button>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {sortedFields.map((field) => {
          const answer = findAnswer(field.id);
          return (
            <div key={field.id} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{field.label}</span>
                {field.required && <span className="text-[10px] text-red-400">*</span>}
                <span className="text-[9px] text-gray-400 dark:text-gray-500 ml-auto">{FIELD_TYPE_LABELS[field.type]}</span>
              </div>
              {renderFieldValue(field)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
