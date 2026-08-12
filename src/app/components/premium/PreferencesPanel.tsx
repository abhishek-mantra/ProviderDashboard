import { useState } from "react";
import { Sparkles, DollarSign, BarChart3 } from "lucide-react";

export function PreferencesPanel() {
  const [getClientsFromMantra, setGetClientsFromMantra] = useState(true);
  const [fixedRate] = useState("0.01");
  const [minimumRate, setMinimumRate] = useState("0");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <div className="flex items-center gap-2.5 md:gap-3 mb-5 md:mb-6">
        <div className="size-8 md:size-9 rounded-lg bg-[#00c0ff] flex items-center justify-center shadow-sm">
          <Sparkles className="size-4 md:size-4.5 text-white" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">Preferences</h2>
          <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            How you receive requests and set your rates
          </p>
        </div>
      </div>

      {/* Get Clients from Mantra */}
      <div className="mb-4 md:mb-5 p-3 md:p-4 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
        <label className="flex items-center gap-2 md:gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0">
            <input
              type="checkbox"
              checked={getClientsFromMantra}
              onChange={(e) => setGetClientsFromMantra(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 md:w-12 md:h-7 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-[#00c0ff] transition-all shadow-inner"></div>
            <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform peer-checked:translate-x-5 shadow-md"></div>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm md:text-base font-bold text-gray-900 dark:text-white block">
              Get Clients from Mantra
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 italic font-normal">
              Allow new client requests to be received
            </span>
          </div>
        </label>
      </div>

      {/* Fixed Rate */}
      <div className="mb-4 md:mb-5 bg-gray-50 dark:bg-gray-900 rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="size-8 md:size-9 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
              <DollarSign className="size-4 md:size-4.5 text-[#00c0ff]" />
            </div>
            <label className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Fixed Rate</label>
          </div>
          <span className="text-xl md:text-2xl font-bold text-[#00c0ff] bg-white dark:bg-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-gray-200 dark:border-gray-700">
            ${fixedRate}
          </span>
        </div>
      </div>

      {/* Minimum Rate */}
      <div>
        <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="size-8 md:size-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="size-4 md:size-4.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-sm md:text-base font-bold text-gray-900 dark:text-white block">Minimum Rate</label>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              You will only be shown requests above this rate
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 md:gap-3">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl px-2 py-2 md:px-4 md:py-3 bg-white dark:bg-gray-900 flex-1 focus-within:border-[#00c0ff] focus-within:ring-2 focus-within:ring-[#00c0ff]/20 transition-all">
            <span className="text-sm md:text-base text-gray-600 dark:text-gray-400 mr-1 md:mr-2 font-bold">$</span>
            <input
              type="number"
              value={minimumRate}
              onChange={(e) => setMinimumRate(e.target.value)}
              className="flex-1 bg-transparent text-sm md:text-base text-gray-900 dark:text-white outline-none font-bold min-w-0"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          <button className="px-2.5 py-2 md:px-6 md:py-3 bg-[#00c0ff] hover:bg-[#0099cc] text-white rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex-shrink-0">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}