import { useState } from "react";
import { Code, ChevronDown, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockEstablishments } from "../data/mockPartnerData";

export function DevRoleSwitcher() {
  const {
    currentProviderId,
    providers,
    setCurrentProviderId,
    currentEstablishmentId,
    members,
    setCurrentEstablishmentId,
  } = usePartnerDashboard();

  const [isOpen, setIsOpen] = useState(false);

  const currentProvider = providers.find((p) => p.id === currentProviderId);
  const currentEstablishment = mockEstablishments.find((e) => e.id === currentEstablishmentId);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-xl shadow-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-xs font-mono"
        title="Dev Role Switcher"
      >
        <Code className="size-3.5" />
        <span className="hidden sm:inline">Dev Mode</span>
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 max-h-[70vh] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="size-4 text-[#00c0ff]" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Dev Role Switcher
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="size-4" />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Switch between providers and establishments for testing
              </p>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(70vh-80px)]">
              {(() => {
                const supervisor = members.find((member) => member.roles.clinical === "Supervisor" && member.memberStatus === "active");
                const supervisorProvider = providers.find((provider) => provider.id === supervisor?.providerId);
                return supervisorProvider ? (
                  <button onClick={() => setCurrentProviderId(supervisorProvider.id)} className="w-full rounded-xl border border-purple-200 bg-purple-50 p-3 text-left dark:border-purple-900/40 dark:bg-purple-900/20">
                    <p className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">Supervisor test account</p>
                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{supervisorProvider.name}</p>
                  </button>
                ) : null;
              })()}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                  Current Provider
                </label>
                <div className="space-y-1">
                  {providers.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => setCurrentProviderId(provider.id)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
                        currentProviderId === provider.id
                          ? "bg-[#00c0ff]/10 border-2 border-[#00c0ff]"
                          : "border-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-750"
                      }`}
                    >
                      <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {provider.name}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {provider.profession}
                        </p>
                      </div>
                      {currentProviderId === provider.id && (
                        <RefreshCw className="size-3.5 text-[#00c0ff] animate-spin" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                  Current Establishment
                </label>
                <div className="space-y-1">
                  {mockEstablishments.map((est) => (
                    <button
                      key={est.id}
                      onClick={() => setCurrentEstablishmentId(est.id)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
                        currentEstablishmentId === est.id
                          ? "bg-[#00c0ff]/10 border-2 border-[#00c0ff]"
                          : "border-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-750"
                      }`}
                    >
                      <div className="size-8 bg-[#043570] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        {est.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {est.name}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {est.planTier} · {est.city}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3">
                  <p className="text-[11px] text-amber-700 dark:text-amber-400">
                    <strong>Active as:</strong> {currentProvider?.name} ({currentProvider?.profession}) at{" "}
                    {currentEstablishment?.name} ({currentEstablishment?.planTier})
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
