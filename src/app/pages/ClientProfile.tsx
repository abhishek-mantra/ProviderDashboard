import { useNavigate, useParams } from "react-router";
import { useState } from "react";
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
  Mic
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import MantraCareLogo from "../../imports/MantraCare_(1)-1.svg";
import { toast } from "sonner";
import { MobileAppModal } from "../components/MobileAppModal";
import { usePlanMode } from "../contexts/PlanModeContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { CareTeamManager } from "./CareTeamManager";
import { mockClients } from "../data/mockPartnerData";

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
  const { planMode } = usePlanMode();
  const { canViewClientClinicalContent, providers } = usePartnerDashboard();

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
        {/* Header */}
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

        {/* Full EHR Plan - Original 11 Actions */}
        {planMode === "full-ehr" && (
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
                'text-blue-600',      // Appointments
                'text-amber-600',     // Notes
                'text-pink-600',      // Prescriptions
                'text-green-600',     // Resources
                'text-orange-600',    // Invoicing
                'text-cyan-600',      // Insurance
                'text-purple-600',    // Pathway
                'text-blue-600',      // Insights
                'text-green-600',     // Orders
                'text-blue-500',      // Request Feedback
                'text-emerald-600',   // Earnings
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
                  <action.icon
                    className={`size-5 md:size-7 ${iconColors[originalIndex]} transition-transform duration-200 group-hover:scale-110`}
                    strokeWidth={2}
                  />
                  <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* AI Transcriber Plan - 3 Actions (or 2 for Inactive) */}
        {planMode === "transcriber-only" && (
          <div className={`grid ${client.type === "InactiveOnboarded" ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"} gap-2 md:gap-4`}>
            {/* Transcripts - Only for active clients */}
            {client.type !== "InactiveOnboarded" && (
              <button
                onClick={() => navigate(`/clients/${id}/transcripts`)}
                className="group relative flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl border border-[#00c0ff]/30 dark:border-[#00c0ff]/30 bg-white dark:bg-gray-800 hover:border-[#00c0ff]/60 dark:hover:border-[#00c0ff]/60 hover:bg-[#00c0ff]/5 dark:hover:bg-[#00c0ff]/5 hover:shadow-lg transition-all duration-200"
              >
                {/* NEW Badge */}
                <span className="absolute top-2 right-2 bg-[#00c0ff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  NEW
                </span>

                <Mic
                  className="size-5 md:size-7 text-[#00c0ff] transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={2}
                />
                <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">
                  Transcripts
                </span>
              </button>
            )}

            {/* Session Notes */}
            <button
              onClick={() => navigate(`/clients/${id}/notes`)}
              className="group flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:shadow-lg transition-all duration-200"
            >
              <StickyNote
                className="size-5 md:size-7 text-amber-600 transition-transform duration-200 group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">
                Session Notes
              </span>
            </button>

            {/* Prescriptions */}
            <button
              onClick={() => navigate(`/clients/${id}/prescriptions`)}
              className="group flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:shadow-lg transition-all duration-200"
            >
              <Pill
                className="size-5 md:size-7 text-pink-600 transition-transform duration-200 group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="text-xs md:text-sm text-center text-gray-900 dark:text-white font-medium leading-tight">
                Prescriptions
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <CareTeamManager clientId={id || "1"} />
      </div>

      {/* Mobile App Modal */}
      <MobileAppModal
        isOpen={isMobileAppModalOpen}
        onClose={() => setIsMobileAppModalOpen(false)}
      />
    </div>
  );
}
