import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Shield, FileText, Plus, PlayCircle, DollarSign, Clock } from "lucide-react";
import { CredentialStatus } from "./CredentialStatus";
import { Claims } from "./Claims";
import { FeeScheduleView } from "./FeeScheduleView";
import { UnbilledSessions } from "./UnbilledSessions";

interface InsurancePageProps {
  defaultTab?: "unbilled" | "claims" | "feeSchedule" | "credential";
}

export function InsurancePage({ defaultTab }: InsurancePageProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const subtabParam = searchParams.get("subtab") || searchParams.get("tab");
  const initialTab = (subtabParam as "unbilled" | "claims" | "feeSchedule" | "credential") || defaultTab || "unbilled";
  const [activeTab, setActiveTab] = useState<"unbilled" | "claims" | "feeSchedule" | "credential">(initialTab);
  const [showClientSelectModal, setShowClientSelectModal] = useState(false);

  useEffect(() => {
    const tabParam = (searchParams.get("subtab") || searchParams.get("tab")) as "unbilled" | "claims" | "feeSchedule" | "credential";
    if (tabParam && ["unbilled", "claims", "feeSchedule", "credential"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: "unbilled" | "claims" | "feeSchedule" | "credential") => {
    setActiveTab(tab);
    const currentTab = searchParams.get("tab");
    if (currentTab === "insurance" || window.location.pathname.includes("/billing")) {
      setSearchParams({ tab: "insurance", subtab: tab }, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Insurance & Claims</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your unbilled sessions, submitted claims, fee schedules, and credential status
          </p>
        </div>
      </div>

      {/* Pill-Style Tabs */}
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-1 rounded-lg mb-6 inline-flex overflow-x-auto max-w-full">
        <button
          onClick={() => handleTabChange("unbilled")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all text-sm whitespace-nowrap ${
            activeTab === "unbilled"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Clock className="size-4" />
          <span>Unbilled Sessions</span>
        </button>
        <button
          onClick={() => handleTabChange("claims")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all text-sm whitespace-nowrap ${
            activeTab === "claims"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <FileText className="size-4" />
          <span>Claims</span>
        </button>
        <button
          onClick={() => handleTabChange("feeSchedule")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all text-sm whitespace-nowrap ${
            activeTab === "feeSchedule"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <DollarSign className="size-4" />
          <span>Fee Schedule</span>
        </button>
        <button
          onClick={() => handleTabChange("credential")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all text-sm whitespace-nowrap ${
            activeTab === "credential"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Shield className="size-4" />
          <span>Credential Status</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "unbilled" && (
          <UnbilledSessions />
        )}
        {activeTab === "claims" && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowClientSelectModal(true)}
                className="px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm text-sm"
              >
                <Plus className="size-5" />
                New Claim
              </button>
            </div>
            <Claims
              hideHeader
              showClientSelectModal={showClientSelectModal}
              setShowClientSelectModal={setShowClientSelectModal}
            />
          </div>
        )}
        {activeTab === "feeSchedule" && (
          <FeeScheduleView />
        )}
        {activeTab === "credential" && (
          <div className="space-y-6">
            <CredentialStatus hideHeader />
          </div>
        )}
      </div>
    </div>
  );
}
