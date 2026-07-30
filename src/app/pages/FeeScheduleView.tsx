import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";

export function FeeScheduleView() {
  const { feeSchedule, updateFeeSchedule } = useClaims();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCptCode, setNewCptCode] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newRate, setNewRate] = useState("");

  const handleAddCode = () => {
    if (!newCptCode.trim() || !newRate) return;
    updateFeeSchedule({
      cptCode: newCptCode.trim().toUpperCase(),
      description: newDescription.trim() || "New CPT Code",
      providerRate: Number(newRate),
    });
    setNewCptCode("");
    setNewDescription("");
    setNewRate("");
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fee Schedule</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Your own asking rates per CPT code — not reimbursement rates.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#00c0ff] hover:bg-[#0090c0] text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="size-4" />
          Add CPT Code
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Add New CPT Code</h3>
            <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
              <X className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">CPT Code *</label>
              <input
                type="text"
                value={newCptCode}
                onChange={(e) => setNewCptCode(e.target.value)}
                placeholder="e.g. 90834"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="e.g. Individual Therapy, 50 min"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Your Rate ($) *</label>
              <input
                type="number"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="e.g. 150"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={handleAddCode}
            disabled={!newCptCode.trim() || !newRate}
            className="px-4 py-2 bg-[#043570] hover:bg-[#032a57] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
          >
            Add to Fee Schedule
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">CPT Code</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Your Rate</th>
            </tr>
          </thead>
          <tbody>
            {feeSchedule.map((entry, idx) => (
              <tr key={entry.cptCode} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="py-3 px-4 text-gray-900 dark:text-white font-mono font-medium">{entry.cptCode}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{entry.description}</td>
                <td className="py-3 px-4 text-right">
                  <input
                    type="number"
                    value={entry.providerRate}
                    onChange={(e) =>
                      updateFeeSchedule({ ...entry, providerRate: Number(e.target.value) })
                    }
                    className="w-24 text-right px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
