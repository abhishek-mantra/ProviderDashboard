import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { FileText, Plus, Clock } from "lucide-react";
import { Claims } from "./Claims";
import { UnbilledSessions } from "./UnbilledSessions";
import { CreateSuperbillModal } from "../components/billing/CreateSuperbillModal";

interface InsurancePageProps {
  defaultTab?: "unbilled" | "claims";
}

export function InsurancePage({ defaultTab }: InsurancePageProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const subtabParam = searchParams.get("subtab") || searchParams.get("tab");
  const initialTab = subtabParam === "claims" ? "claims" : defaultTab || "unbilled";
  const [activeTab, setActiveTab] = useState<"unbilled" | "claims">(initialTab);
  const [showClientSelectModal, setShowClientSelectModal] = useState(false);
  const [showSuperbillModal, setShowSuperbillModal] = useState(false);

  useEffect(() => {
    const tabParam = (searchParams.get("subtab") || searchParams.get("tab")) as "unbilled" | "claims";
    if (tabParam && ["unbilled", "claims"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: "unbilled" | "claims") => {
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Insurance & Claims</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your unbilled sessions and submitted claims
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSuperbillModal(true)}
            className="px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 rounded-xl font-semibold transition-colors shadow-2xs flex items-center gap-2 text-sm cursor-pointer shrink-0"
          >
            <FileText className="size-4 text-[#00c0ff]" />
            <span>Superbill</span>
          </button>
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
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "unbilled" && (
          <UnbilledSessions scope="insurance" hideHeader />
        )}
        {activeTab === "claims" && (
          <Claims
            hideHeader
            showClientSelectModal={showClientSelectModal}
            setShowClientSelectModal={setShowClientSelectModal}
          />
        )}
      </div>

      {/* Superbill Selection & Generation Modal Flow */}
      <CreateSuperbillModal
        isOpen={showSuperbillModal}
        onClose={() => setShowSuperbillModal(false)}
      />
    </div>
  );
}
