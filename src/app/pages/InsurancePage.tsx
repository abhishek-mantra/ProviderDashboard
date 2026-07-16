import { useState } from "react";
import { Shield, FileText, Plus, PlayCircle } from "lucide-react";
import { CredentialStatus } from "./CredentialStatus";
import { Claims } from "./Claims";

export function InsurancePage() {
  const [activeTab, setActiveTab] = useState<"credential" | "claims">("credential");
  const [showClientSelectModal, setShowClientSelectModal] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Insurance</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your Credential Status and Claims
          </p>
        </div>
      </div>

      {/* Pill-Style Tabs */}
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-1 rounded-lg mb-6 inline-flex">
        <button
          onClick={() => setActiveTab("credential")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === "credential"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Shield className="size-4" />
          <span>Credential Status</span>
        </button>
        <button
          onClick={() => setActiveTab("claims")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
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
        {activeTab === "credential" && (
          <div className="space-y-6">


            {/* CredentialStatus component renders below — contains Our Capabilities and everything else */}
            <CredentialStatus hideHeader />

          </div>
        )}
        {activeTab === "claims" && (
          <div>
            {/* New Claim Button - Top Right */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowClientSelectModal(true)}
                className="px-4 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
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
      </div>
    </div>
  );
}
