import { useState, useMemo } from "react";
import { Layers, Plus, X, Check, GripVertical, ChevronDown, ChevronUp, Star, FileText, Eye, ArrowRight } from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import type { IntakeFlow, IntakeForm } from "../types/partnerDashboard";

export function IntakeFlows() {
  const { intakeFlows, setIntakeFlows, intakeForms, currentEstablishmentId } = usePartnerDashboard();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewForFlow, setShowPreviewForFlow] = useState<string | null>(null);
  const [expandedFlow, setExpandedFlow] = useState<string | null>(null);

  const establishmentForms = useMemo(
    () => intakeForms.filter((f) => f.establishmentId === currentEstablishmentId),
    [intakeForms, currentEstablishmentId]
  );

  const establishmentFlows = useMemo(
    () => intakeFlows.filter((f) => f.establishmentId === currentEstablishmentId),
    [intakeFlows, currentEstablishmentId]
  );

  const defaultFlow = establishmentFlows.find((f) => f.isDefault);

  function getFormName(formId: string) {
    return establishmentForms.find((f) => f.id === formId)?.name ?? "Unknown Form";
  }

  function getFormCategory(formId: string) {
    return establishmentForms.find((f) => f.id === formId)?.category;
  }

  function toggleExpanded(flowId: string) {
    setExpandedFlow(expandedFlow === flowId ? null : flowId);
  }

  function handleSetDefault(flowId: string) {
    setIntakeFlows((prev) =>
      prev.map((f) => ({
        ...f,
        isDefault: f.id === flowId,
      }))
    );
  }

  function handleDeleteFlow(flowId: string) {
    if (!window.confirm("Are you sure you want to permanently delete this intake flow? This action cannot be undone.")) return;
    setIntakeFlows((prev) => prev.filter((f) => f.id !== flowId));
    if (expandedFlow === flowId) setExpandedFlow(null);
  }

  function moveFormId(flowId: string, index: number, direction: -1 | 1) {
    setIntakeFlows((prev) =>
      prev.map((f) => {
        if (f.id !== flowId) return f;
        const ids = [...f.formIds];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= ids.length) return f;
        [ids[index], ids[targetIndex]] = [ids[targetIndex], ids[index]];
        return { ...f, formIds: ids };
      })
    );
  }

  function removeFormId(flowId: string, formId: string) {
    setIntakeFlows((prev) =>
      prev.map((f) =>
        f.id === flowId
          ? { ...f, formIds: f.formIds.filter((id) => id !== formId) }
          : f
      )
    );
  }

  function addFormId(flowId: string, formId: string) {
    setIntakeFlows((prev) =>
      prev.map((f) => {
        if (f.id !== flowId) return f;
        if (f.formIds.includes(formId)) return f;
        return { ...f, formIds: [...f.formIds, formId] };
      })
    );
  }

  function handleCreateFlow(data: { name: string; formIds: string[] }) {
    const newFlow: IntakeFlow = {
      id: `flow-${Date.now()}`,
      establishmentId: currentEstablishmentId ?? "est-1",
      name: data.name,
      isDefault: establishmentFlows.length === 0,
      formIds: data.formIds,
    };
    setIntakeFlows((prev) => [...prev, newFlow]);
    setShowCreateModal(false);
  }

  return (
    <div className="max-w-[1000px] space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Intake Flows</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Build and manage ordered sequences of intake forms for clients
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus className="size-4" />
          <span className="hidden md:inline">Create New Flow</span>
          <span className="md:hidden">New Flow</span>
        </button>
      </div>

      {/* Default flow indicator */}
      {defaultFlow && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <Star className="size-3.5 fill-blue-500 text-blue-500" />
          <span>
            <strong>{defaultFlow.name}</strong> is the default flow — new active clients will be auto-assigned this flow.
          </span>
        </div>
      )}

      {/* Flows List */}
      {establishmentFlows.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <Layers className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No flows yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3 md:gap-4">
          {establishmentFlows.map((flow) => {
            const isExpanded = expandedFlow === flow.id;
            return (
              <div
                key={flow.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="size-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Layers className="size-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[200px] md:max-w-[300px]">
                            {flow.name}
                          </h3>
                          {flow.isDefault && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                              <Star className="size-2.5 fill-blue-500" />
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {flow.formIds.length} form{flow.formIds.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => setShowPreviewForFlow(flow.id)}
                        className="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                        title="Preview flow"
                      >
                        <Eye className="size-4" />
                      </button>
                      {!flow.isDefault && (
                        <button
                          onClick={() => handleSetDefault(flow.id)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                          title="Set as default"
                        >
                          <Star className="size-4" />
                        </button>
                      )}
                      <button
                        onClick={() => toggleExpanded(flow.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="View forms"
                      >
                        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteFlow(flow.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                        title="Delete flow"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                      {/* Forms list */}
                      <div className="space-y-1.5 mb-3">
                        {flow.formIds.map((formId, idx) => (
                          <div
                            key={formId}
                            className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                          >
                            <GripVertical className="size-3.5 text-gray-400 flex-shrink-0" />
                            <div className="size-6 rounded-md bg-white dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-300 flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                                  {getFormName(formId)}
                                </span>
                                {getFormCategory(formId) && (
                                  <span className={`text-[9px] font-medium px-1 py-0.5 rounded ${
                                    getFormCategory(formId) === "clinical"
                                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                                      : "bg-amber-50 dark:bg-amber-900/20 text-amber-500"
                                  }`}>
                                    {getFormCategory(formId) === "clinical" ? "CLIN" : "ADM"}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <button
                                onClick={() => moveFormId(flow.id, idx, -1)}
                                disabled={idx === 0}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <ChevronUp className="size-3" />
                              </button>
                              <button
                                onClick={() => moveFormId(flow.id, idx, 1)}
                                disabled={idx === flow.formIds.length - 1}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <ChevronDown className="size-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFormId(flow.id, formId)}
                              className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-600 transition-colors"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add form dropdown */}
                      <div className="relative">
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              addFormId(flow.id, e.target.value);
                              e.target.value = "";
                            }
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-transparent text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff] appearance-none cursor-pointer"
                        >
                          <option value="">+ Add a form to this flow...</option>
                          {establishmentForms
                            .filter((f) => !flow.formIds.includes(f.id))
                            .map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name} ({f.category})
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Flow Modal */}
      {showCreateModal && (
        <CreateFlowModal
          establishmentForms={establishmentForms}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateFlow}
        />
      )}

      {/* Flow Preview Modal */}
      {showPreviewForFlow && (
        <FlowPreviewModal
          flow={intakeFlows.find(f => f.id === showPreviewForFlow)!}
          intakeForms={establishmentForms}
          onClose={() => setShowPreviewForFlow(null)}
        />
      )}
    </div>
  );
}

function FlowPreviewModal({
  flow,
  intakeForms,
  onClose,
}: {
  flow: IntakeFlow;
  intakeForms: IntakeForm[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="size-4 text-indigo-500" />
              {flow.name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {flow.formIds.length} form{flow.formIds.length !== 1 ? "s" : ""}
              {flow.isDefault ? " · Default flow" : ""}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 md:p-5 overflow-y-auto space-y-0">
          {flow.formIds.map((formId, idx) => {
            const form = intakeForms.find((f) => f.id === formId);
            if (!form) return null;
            const sortedFields = [...form.fields].sort((a, b) => a.order - b.order);
            return (
              <div key={formId} className="relative">
                {/* Connector line */}
                {idx < flow.formIds.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600" />
                )}
                <div className="flex gap-4 pb-6">
                  <div className="size-[38px] rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0 z-10">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{form.name}</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        form.category === "clinical"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                          : "bg-amber-50 dark:bg-amber-900/20 text-amber-500"
                      }`}>
                        {form.category === "clinical" ? "Clinical" : "Admin"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sortedFields.map((f) => (
                        <span key={f.id} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                          {f.label.length > 30 ? f.label.slice(0, 28) + "…" : f.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CreateFlowModal({
  establishmentForms,
  onClose,
  onCreate,
}: {
  establishmentForms: IntakeForm[];
  onClose: () => void;
  onCreate: (data: { name: string; formIds: string[] }) => void;
}) {
  const [name, setName] = useState("");
  const [selectedFormIds, setSelectedFormIds] = useState<string[]>([]);

  function toggleForm(formId: string) {
    setSelectedFormIds((prev) =>
      prev.includes(formId) ? prev.filter((id) => id !== formId) : [...prev, formId]
    );
  }

  function moveForm(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= selectedFormIds.length) return;
    const updated = [...selectedFormIds];
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setSelectedFormIds(updated);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Create New Flow</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Flow Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Standard Intake Flow"
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Select Forms ({selectedFormIds.length} selected)
            </label>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {establishmentForms.map((form) => {
                const isSelected = selectedFormIds.includes(form.id);
                return (
                  <button
                    key={form.id}
                    onClick={() => toggleForm(form.id)}
                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? "border-[#00c0ff] bg-[#00c0ff]/5 dark:bg-[#00c0ff]/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className={`size-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-[#00c0ff] bg-[#00c0ff]"
                        : "border-gray-300 dark:border-gray-500"
                    }`}>
                      {isSelected && <Check className="size-3 text-white" />}
                    </div>
                    <FileText className={`size-4 flex-shrink-0 ${
                      form.category === "clinical" ? "text-blue-500" : "text-amber-500"
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{form.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {form.fields.length} fields · {form.category}
                        {form.isTemplate ? " · Template" : " · Custom"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedFormIds.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Order</label>
              <div className="space-y-1">
                {selectedFormIds.map((formId, idx) => {
                  const form = establishmentForms.find((f) => f.id === formId);
                  return (
                    <div key={formId} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <GripVertical className="size-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] font-mono text-gray-400 w-4">{idx + 1}.</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1 truncate">
                        {form?.name ?? "Unknown"}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => moveForm(idx, -1)}
                          disabled={idx === 0}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 disabled:opacity-30"
                        >
                          <ChevronUp className="size-3" />
                        </button>
                        <button
                          onClick={() => moveForm(idx, 1)}
                          disabled={idx === selectedFormIds.length - 1}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 disabled:opacity-30"
                        >
                          <ChevronDown className="size-3" />
                        </button>
                      </div>
                      <button onClick={() => toggleForm(formId)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">
                        <X className="size-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                if (!name.trim()) return;
                onCreate({ name: name.trim(), formIds: selectedFormIds });
              }}
              disabled={!name.trim() || selectedFormIds.length === 0}
              className="flex-1 px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors"
            >
              Create Flow
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
