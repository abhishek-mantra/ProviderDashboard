import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { GetStarted } from "./pages/GetStarted";
import { OTPVerify } from "./pages/OTPVerify";
import { Onboarding } from "./pages/Onboarding";
import { OnboardingEHRAIScribe } from "./pages/OnboardingEHRAIScribe";
import { Dashboard } from "./pages/Dashboard";
import { Requests } from "./pages/Requests";
import { Sessions } from "./pages/Sessions";
import { Clients } from "./pages/Clients";
import { Earnings } from "./pages/Earnings";
import { Billing } from "./pages/Billing";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { Verification } from "./pages/Verification";
import { Chat } from "./pages/Chat";
import { Availability } from "./pages/Availability";
import { Grow } from "./pages/Grow";
import { ReferEarn } from "./pages/ReferEarn";
import { Premium } from "./pages/Premium";
import { Tasks } from "./pages/Tasks";
import { ClientProfile } from "./pages/ClientProfile";
import { EditClient } from "./pages/EditClient";
import { Prescriptions } from "./pages/Prescriptions";
import { PrescriptionDetail } from "./pages/PrescriptionDetail";
import { CreatePrescription } from "./pages/CreatePrescription";
import { Invoices } from "./pages/Invoices";
import { InvoiceDetail } from "./pages/InvoiceDetail";
import { CreateInvoice } from "./pages/CreateInvoice";
import { AddPayment } from "./pages/AddPayment";
import { CreateClaim } from "./pages/CreateClaim";
import { ClaimDetail } from "./pages/ClaimDetail";
import { CMS1500Form } from "./pages/CMS1500Form";
import { SessionNotes } from "./pages/SessionNotes";
import { SessionNotesList } from "./pages/SessionNotesList";
import { AddSessionNote } from "./pages/AddSessionNote";
import { ViewSessionNote } from "./pages/ViewSessionNote";
import { CredentialStatus } from "./pages/CredentialStatus";
import { Claims } from "./pages/Claims";
import { NewClaim } from "./pages/NewClaim";
import { OtherTools } from "./pages/OtherTools";
import { AICRM } from "./pages/AICRM";
import { Tools } from "./pages/Tools";
import { Settings } from "./pages/Settings";
import { SettingsOrganization } from "./pages/SettingsOrganization";
import { SettingsBillingPlans } from "./pages/SettingsBillingPlans";
import { SettingsBillingPayments } from "./pages/SettingsBillingPayments";
import { SettingsBillingCreditUsage } from "./pages/SettingsBillingCreditUsage";
import { SettingsAIVoices } from "./pages/SettingsAIVoices";
import { SettingsNumbers } from "./pages/SettingsNumbers";
import { SettingsCustomFields } from "./pages/SettingsCustomFields";
import { SettingsIntegrations } from "./pages/SettingsIntegrations";
import { SettingsAuditLogs } from "./pages/SettingsAuditLogs";
import { SettingsSecurity } from "./pages/SettingsSecurity";
import { PracticeDetails } from "./pages/PracticeDetails";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFound } from "./pages/NotFound";
import { MonetizationShowcase } from "./pages/MonetizationShowcase";
import { ModalShowcase } from "./pages/ModalShowcase";
import { ClientInsurance } from "./pages/ClientInsurance";
import { ClientPathway } from "./pages/ClientPathway";
import { ClientInsights } from "./pages/ClientInsights";
import { ClientOrders } from "./pages/ClientOrders";
import { SupervisorDashboard } from "./pages/SupervisorDashboard";
import { CareTeamManager } from "./pages/CareTeamManager";
import { Notifications } from "./pages/Notifications";
import { MantraProviderPage } from "./pages/MantraProviderPage";
import { TranscriptView } from "./pages/TranscriptView";
import { InsurancePage } from "./pages/InsurancePage";
import { ClientLeads } from "./pages/ClientLeads";
import { AITranscriber } from "./pages/AITranscriber";
import { RecordingScreen } from "./pages/RecordingScreen";
import { AITranscriberDemo } from "./pages/AITranscriberDemo";
import { ViewTranscription } from "./pages/ViewTranscription";
import { ViewTranscriptionNote } from "./pages/ViewTranscriptionNote";

export const router = createBrowserRouter([
  { path: "/get-started", element: <GetStarted /> },
  { path: "/verify", element: <OTPVerify /> },
  { path: "/onboarding", element: <Onboarding /> },
  { path: "/onboarding-ehr-ai-scribe", element: <OnboardingEHRAIScribe /> },
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("mantra_logged_in");
      if (!isLoggedIn) {
        throw new Response("", { status: 302, headers: { Location: "/get-started" } });
      }
      return null;
    },
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "monetization-showcase", element: <MonetizationShowcase /> },
      { path: "modal-showcase", element: <ModalShowcase /> },
      { path: "requests", element: <Requests /> },
      { path: "sessions", element: <Sessions /> },
      { path: "sessions/:sessionId/notes", element: <SessionNotes /> },
      { path: "sessions/:sessionId/notes/add", element: <AddSessionNote /> },
      { path: "sessions/:sessionId/notes/view/:noteId", element: <ViewSessionNote /> },
      { path: "sessions/:sessionId/transcripts/:transcriptId", element: <TranscriptView /> },
      { path: "clients", element: <Clients /> },
      { path: "clients/:id", element: <ClientProfile /> },
      { path: "clients/:id/edit", element: <EditClient /> },
      { path: "clients/:id/notes", element: <SessionNotes /> },
      { path: "clients/:id/notes/add", element: <AddSessionNote /> },
      { path: "clients/:id/notes/view/:noteId", element: <ViewSessionNote /> },
      { path: "clients/:id/transcripts/:transcriptId", element: <TranscriptView /> },
      { path: "clients/:id/prescriptions", element: <Prescriptions /> },
      { path: "clients/:id/prescriptions/create", element: <CreatePrescription /> },
      { path: "clients/:id/prescriptions/:prescriptionId", element: <PrescriptionDetail /> },
      { path: "clients/:id/invoices", element: <Invoices /> },
      { path: "clients/:id/invoices/create", element: <CreateInvoice /> },
      { path: "clients/:id/invoices/:invoiceId", element: <InvoiceDetail /> },
      { path: "clients/:id/invoices/:invoiceId/add-payment", element: <AddPayment /> },
      { path: "clients/:id/insurance", element: <ClientInsurance /> },
      { path: "clients/:id/insurance/claims/create", element: <CreateClaim /> },
      { path: "clients/:id/insurance/claims/create/cms1500", element: <CMS1500Form /> },
      { path: "clients/:id/insurance/claims/:claimId", element: <ClaimDetail /> },
      { path: "clients/:id/pathway", element: <ClientPathway /> },
      { path: "clients/:id/insights", element: <ClientInsights /> },
      { path: "clients/:id/orders", element: <ClientOrders /> },
      { path: "earnings", element: <Earnings /> },
      { path: "billing", element: <Billing /> },
      { path: "profile", element: <Profile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "verification", element: <Verification /> },
      { path: "chat", element: <Chat /> },
      { path: "chat/:id", element: <Chat /> },
      { path: "grow", element: <Grow /> },
      { path: "refer-earn", element: <ReferEarn /> },
      { path: "premium", element: <Premium /> },
      { path: "tasks", element: <Tasks /> },
      { path: "insurance", element: <InsurancePage /> },
      { path: "credential-status", element: <CredentialStatus /> },
      { path: "claims", element: <Claims /> },
      { path: "claims/new/:clientId", element: <NewClaim /> },
      { path: "claims/new/:clientId/cms1500", element: <CMS1500Form /> },
      { path: "claims/:claimId", element: <ClaimDetail /> },
      { path: "client-leads", element: <ClientLeads /> },
      { path: "other-tools", element: <OtherTools /> },
      { path: "ai-crm", element: <AICRM /> },
      { path: "invoices", element: <Invoices /> },
      { path: "invoices/create", element: <CreateInvoice /> },
      { path: "invoices/:invoiceId", element: <InvoiceDetail /> },
      { path: "invoices/:invoiceId/add-payment", element: <AddPayment /> },
      { path: "session-notes", element: <SessionNotesList /> },
      { path: "ai-transcriber", element: <AITranscriber /> },
      { path: "record-session", element: <RecordingScreen /> },
      { path: "ai-transcriber-demo", element: <AITranscriberDemo /> },
      { path: "view-transcription/:transcriptionId", element: <ViewTranscription /> },
      { path: "view-transcription/:transcriptionId/note/:noteId", element: <ViewTranscriptionNote /> },

      { path: "prescriptions", element: <Prescriptions /> },
      { path: "prescription/:id", element: <PrescriptionDetail /> },
      { path: "add-prescription", element: <CreatePrescription /> },
      { path: "tools", element: <Tools /> },
      { path: "admin-dashboard", element: <AdminDashboard />, errorElement: <ErrorPage /> },
      { path: "supervisor-dashboard", element: <SupervisorDashboard />, errorElement: <ErrorPage /> },
      { path: "care-team", element: <CareTeamManager />, errorElement: <ErrorPage /> },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader: () => {
              throw new Response("", {
                status: 302,
                headers: {
                  Location: "/settings/organization"
                }
              });
            }
          },
          { path: "organization", element: <SettingsOrganization /> },
          { path: "billing/plans", element: <SettingsBillingPlans /> },
          { path: "billing/payments", element: <SettingsBillingPayments /> },
          { path: "billing/credit-usage", element: <SettingsBillingCreditUsage /> },
          { path: "billing/manage-credit-usage", element: <SettingsBillingCreditUsage /> },
          { path: "ai-voices", element: <SettingsAIVoices /> },
          { path: "numbers", element: <SettingsNumbers /> },
          { path: "custom-fields", element: <SettingsCustomFields /> },
          { path: "integrations", element: <SettingsIntegrations /> },
{ path: "audit-logs", element: <SettingsAuditLogs /> },
          { path: "security", element: <SettingsSecurity /> },
          { path: "availability", element: <Availability /> },
          { path: "practice-details", element: <PracticeDetails /> },
          { path: "notifications", element: <Notifications /> },
        ]
      },
      { path: "mantra-provider", element: <MantraProviderPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
