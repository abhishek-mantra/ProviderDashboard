import { useNavigate, useParams, Link } from "react-router";
import { useState, useMemo } from "react";
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
  Clock,
  AlertCircle,
  XCircle,
  Lock,
  Eye,
  FileSpreadsheet,
  ChevronLeft,
  ClipboardCheck,
  Layers,
  Edit3,
  Download,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import MantraCareLogo from "../../imports/MantraCare_(1)-1.svg";
import { toast } from "sonner";
import { MobileAppModal } from "../components/MobileAppModal";
import { usePlanMode } from "../contexts/PlanModeContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { CareTeamManager } from "./CareTeamManager";
import { mockClients, PHQ9_ITEMS, GAD7_ITEMS } from "../data/mockPartnerData";
import type { IntakeForm, FormResponse, FormEntry, FormField } from "../types/partnerDashboard";
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
  const [activeTab, setActiveTab] = useState<"summary" | "intake">("summary");
  const [viewingResponse, setViewingResponse] = useState<{ form: IntakeForm; response: FormResponse } | null>(null);
  const { planMode } = usePlanMode();
  const { canViewClientClinicalContent, canViewIntakeResponse, providers, intakeForms, intakeFlows, formEntries, formResponses } = usePartnerDashboard();

  // Mock client data - in real app this would come from API based on id
  const clientRecord = mockClients.find((item) => item.id === id) || mockClients[0];
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
      onClick: () => navigate("/billing", { state: { tab: "invoices" } })
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
      onClick: () => navigate("/billing", { state: { tab: "earnings", clientFilter: client.name } })
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
              
              {/* Additional info for InactiveOnboarded clients */}
              {client.type === "InactiveOnboarded" && (
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
          onClick={() => { setActiveTab("summary"); setViewingResponse(null); }}
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
          onClick={() => setActiveTab("intake")}
          className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
            activeTab === "intake"
              ? "border-[#043570] text-[#043570] dark:text-[#00c0ff] dark:border-[#00c0ff]"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <ClipboardList className="size-4" />
            Intake Forms
          </div>
        </button>
      </div>

      {/* Intake Tab Content */}
      {activeTab === "intake" && (
        <ClientIntakeTab
          clientId={id || "1"}
          intakeForms={intakeForms}
          intakeFlows={intakeFlows}
          formEntries={formEntries}
          formResponses={formResponses}
          canViewIntakeResponse={canViewIntakeResponse}
          viewingResponse={viewingResponse}
          setViewingResponse={setViewingResponse}
        />
      )}

      {/* Summary Tab Content */}
      {activeTab === "summary" && (
        <>
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
                    'text-green-600', 'text-blue-500', 'text-emerald-600',
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
    </div>
  );
}

// ── Intake Tab Component ──────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { icon: any; label: string; color: string }> = {
  "requested": { icon: Clock, label: "Requested (Assigned)", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" },
  "draft": { icon: Edit3, label: "Draft", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
  "submitted": { icon: CheckCircle2, label: "Completed", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" },
};

const FIELD_TYPE_LABELS: Record<string, string> = {
  short_answer: "Short Answer", long_answer: "Long Answer",
  multiple_choice: "Multiple Choice", dropdown: "Dropdown",
  checkbox_multiselect: "Checkbox (Multi)", yes_no: "Yes / No",
  date: "Date", agreement_text: "Agreement Text",
  e_signature: "E-Signature", file_upload: "File Upload",
  screening_instrument: "Screening",
};

function ClientIntakeTab({
  clientId,
  intakeForms,
  intakeFlows,
  formEntries,
  formResponses,
  canViewIntakeResponse,
  viewingResponse,
  setViewingResponse,
}: {
  clientId: string;
  intakeForms: IntakeForm[];
  intakeFlows: IntakeFlow[];
  formEntries: FormEntry[];
  formResponses: FormResponse[];
  canViewIntakeResponse: (form: IntakeForm, clientId: string) => boolean;
  viewingResponse: { form: IntakeForm; response: FormResponse } | null;
  setViewingResponse: (v: { form: IntakeForm; response: FormResponse } | null) => void;
}) {
  const clientEntries = formEntries.filter((fe) => fe.clientId === clientId);

  // If viewing a specific response
  if (viewingResponse) {
    return (
      <FormResponseViewer
        form={viewingResponse.form}
        response={viewingResponse.response}
        onBack={() => setViewingResponse(null)}
      />
    );
  }

  if (clientEntries.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <ClipboardList className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No intake forms assigned to this client.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <ClipboardList className="size-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Intake Forms ({clientEntries.length})</h3>
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-2">
        {clientEntries.map((entry) => {
          const form = intakeForms.find((f) => f.id === entry.formId);
          if (!form) return null;

          const status = entry.status;
          const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.requested;
          const StatusIcon = statusCfg.icon;
          const canView = canViewIntakeResponse(form, clientId);
          const response = formResponses.find(
            (r) => r.formEntryId === entry.id
          );

          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                response && canView
                  ? "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => {
                if (response && canView) {
                  setViewingResponse({ form, response });
                }
              }}
            >
              <div className={`size-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                form.category === "clinical"
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                  : "bg-amber-50 dark:bg-amber-900/20 text-amber-500"
              }`}>
                {canView ? (
                  <FileText className="size-4" />
                ) : (
                  <Lock className="size-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {form.name}
                  </span>
                  {!canView && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-600 text-gray-400">
                      Restricted
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {form.fields.length} fields · {form.category === "clinical" ? "Clinical" : "Administrative"}
                  {entry.sentViaFlowId && ` · Via flow`}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {(status === "requested" || status === "draft") && canView && (
                  <Link
                    to={`/intake-preview/${entry.id}`}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-semibold transition-colors"
                  >
                    Fill Out
                  </Link>
                )}
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${statusCfg.color}`}>
                  <StatusIcon className="size-3.5" />
                  <span>{statusCfg.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Form Response Viewer (Read-Only) ─────────────────────────────────────────

function FormResponseViewer({
  form,
  response,
  onBack,
}: {
  form: IntakeForm;
  response: FormResponse;
  onBack: () => void;
}) {
  const { currentProviderId, currentUserMemberships, providers, clientTreatingProviders, setFormResponses } = usePartnerDashboard();
  const sortedFields = [...form.fields].sort((a, b) => a.order - b.order);

  // Find active memberships
  const activeMemberships = currentUserMemberships.filter((m) => m.memberStatus === "active");
  const supervisorMembership = activeMemberships.find(
    (m) => m.roles.clinical === "Supervisor" || m.roles.isAdmin || (m.supervises && m.supervises.length > 0)
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
