import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Type,
  AlignLeft,
  Mail,
  Hash,
  ChevronDown,
  CheckSquare,
  CircleDot,
  Calendar,
  FileText,
  ShieldCheck,
  Upload,
  Check,
  X,
  Settings2,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import type { IntakeForm, FormField, FieldType } from "../types/partnerDashboard";
import { toast } from "sonner";

interface AvailableFieldType {
  type: FieldType;
  label: string;
  icon: any;
  category: "basic" | "clinical";
  defaultOptions?: string[];
  instrumentType?: "PHQ-9" | "GAD-7";
}

const AVAILABLE_FIELD_TYPES: AvailableFieldType[] = [
  { type: "short_answer", label: "Single Line Text", icon: Type, category: "basic" },
  { type: "long_answer", label: "Paragraph Text", icon: AlignLeft, category: "basic" },
  { type: "short_answer", label: "Email", icon: Mail, category: "basic" },
  { type: "short_answer", label: "Number", icon: Hash, category: "basic" },
  { type: "dropdown", label: "Drop Down", icon: ChevronDown, category: "basic", defaultOptions: ["Option 1", "Option 2", "Option 3"] },
  { type: "checkbox_multiselect", label: "Checkboxes", icon: CheckSquare, category: "basic", defaultOptions: ["Choice 1", "Choice 2"] },
  { type: "multiple_choice", label: "Radio Buttons", icon: CircleDot, category: "basic", defaultOptions: ["Option A", "Option B"] },
  { type: "yes_no", label: "Yes / No", icon: Check, category: "basic" },
  { type: "date", label: "Date", icon: Calendar, category: "basic" },
  { type: "agreement_text", label: "Agreement Text", icon: FileText, category: "basic" },
  { type: "e_signature", label: "E-Signature", icon: FileText, category: "clinical" },
  { type: "file_upload", label: "File Upload", icon: Upload, category: "clinical" },
  { type: "screening_instrument", label: "PHQ-9 Screening", icon: ShieldCheck, category: "clinical", instrumentType: "PHQ-9" },
  { type: "screening_instrument", label: "GAD-7 Screening", icon: ShieldCheck, category: "clinical", instrumentType: "GAD-7" },
];

export function FormBuilder() {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { intakeForms, setIntakeForms, currentEstablishmentId, isCurrentUserAdmin } = usePartnerDashboard();

  const existingForm = useMemo(
    () => intakeForms.find((f) => f.id === formId),
    [intakeForms, formId]
  );

  useEffect(() => {
    if (existingForm?.isTemplate) {
      toast.error("Premade templates cannot be edited. Duplicate the template to create a custom version.");
      navigate("/intake-forms");
    }
  }, [existingForm]);

  const [title, setTitle] = useState(existingForm?.name || "New Custom Form");
  const [description, setDescription] = useState(existingForm?.description || "");
  const [category, setCategory] = useState<"administrative" | "clinical">(
    existingForm?.category || "clinical"
  );
  const [fields, setFields] = useState<FormField[]>(
    existingForm?.fields ? [...existingForm.fields] : []
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(
    existingForm?.fields?.[0]?.id || null
  );
  const [sidebarTab, setSidebarTab] = useState<"add" | "settings">("add");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [formModified, setFormModified] = useState(false);

  useUnsavedChanges(formModified);

  const builderInitialRender = useRef(true);
  useEffect(() => {
    if (builderInitialRender.current) {
      builderInitialRender.current = false;
      return;
    }
    setFormModified(true);
  }, [title, description, category, fields]);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleAddField = (ft: AvailableFieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type: ft.type,
      label: ft.label,
      required: true,
      order: fields.length + 1,
      options: ft.defaultOptions ? [...ft.defaultOptions] : undefined,
      instrumentType: ft.instrumentType,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
    setSidebarTab("settings");
    toast.success(`Added ${ft.label}`);
  };

  const handleRemoveField = (fieldId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFields((prev) => prev.filter((f) => f.id !== fieldId));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
      setSidebarTab("add");
    }
  };

  const handleUpdateSelectedField = (updates: Partial<FormField>) => {
    if (!selectedFieldId) return;
    setFields((prev) =>
      prev.map((f) => (f.id === selectedFieldId ? { ...f, ...updates } : f))
    );
  };

  const handleAddOption = () => {
    if (!selectedField) return;
    const currentOpts = selectedField.options ?? [];
    const newOpt = `Option ${currentOpts.length + 1}`;
    handleUpdateSelectedField({ options: [...currentOpts, newOpt] });
  };

  const handleUpdateOption = (index: number, val: string) => {
    if (!selectedField) return;
    const currentOpts = [...(selectedField.options ?? [])];
    currentOpts[index] = val;
    handleUpdateSelectedField({ options: currentOpts });
  };

  const handleRemoveOption = (index: number) => {
    if (!selectedField) return;
    const currentOpts = (selectedField.options ?? []).filter((_, i) => i !== index);
    handleUpdateSelectedField({ options: currentOpts });
  };

  const handleSaveForm = () => {
    if (!title.trim()) {
      toast.error("Form title is required");
      return;
    }
    if (fields.length === 0) {
      toast.error("Please add at least one field to the form");
      return;
    }

    const savedForm: IntakeForm = {
      id: existingForm?.id || `form-custom-${Date.now()}`,
      establishmentId: currentEstablishmentId ?? "est-1",
      name: title.trim(),
      description: description.trim() || undefined,
      category,
      isTemplate: isCurrentUserAdmin,
      applicableServices: existingForm?.applicableServices || ["Therapy"],
      createdBy: existingForm?.createdBy || (null as unknown as undefined),
      fields: fields.map((f, i) => ({ ...f, order: i + 1 })),
    };

    setIntakeForms((prev) => {
      const idx = prev.findIndex((f) => f.id === savedForm.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = savedForm;
        return next;
      }
      return [...prev, savedForm];
    });

    setFormModified(false);
    toast.success(existingForm ? "Form updated successfully!" : "Form created successfully!");
    navigate("/intake-forms");
  };

  // Canvas Drag and Drop reordering
  const handleDragStart = (idx: number) => {
    setDraggedIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIdx) return;
    const updated = [...fields];
    const item = updated.splice(draggedIndex, 1)[0];
    updated.splice(targetIdx, 0, item);
    setFields(updated);
    setDraggedIndex(targetIdx);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col font-sans">
      {/* ── Top Header ── */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/intake-forms")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Custom Form"
              className="text-base md:text-lg font-bold bg-transparent text-gray-900 dark:text-white focus:outline-none border-b border-transparent hover:border-gray-300 focus:border-blue-500 px-1 py-0.5 rounded transition-all"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Form Description (optional)"
              className="text-xs text-gray-400 dark:text-gray-400 bg-transparent focus:outline-none border-b border-transparent hover:border-gray-200 focus:border-blue-400 px-1 block w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "administrative" | "clinical")}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="clinical">Clinical</option>
            <option value="administrative">Administrative</option>
          </select>

          <button
            onClick={handleSaveForm}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow transition-colors flex items-center gap-1.5"
          >
            <Check className="size-4" />
            Save Form
          </button>
        </div>
      </header>

      {/* ── Main Body Split View ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* ── Canvas Drop Area (Left / Center) ── */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col items-center">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8 min-h-[500px]">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Form Builder</h2>
              <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                Drag or click fields from the right panel to build your custom form.
              </p>
            </div>

            {fields.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-12 text-center text-gray-400 dark:text-gray-500 my-8 flex flex-col items-center justify-center min-h-[220px]">
                <Plus className="size-10 text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Drop fields here</p>
                <p className="text-xs text-gray-400 mt-1">Select any field type from the right inspector to start building.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {fields.map((field, idx) => {
                  const isSelected = selectedFieldId === field.id;
                  return (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onClick={() => {
                        setSelectedFieldId(field.id);
                        setSidebarTab("settings");
                      }}
                      className={`group relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/20 dark:bg-blue-900/10 shadow-sm"
                          : "border-gray-150 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-800 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GripVertical className="size-4 text-gray-300 group-hover:text-gray-500 cursor-grab" />
                          <span className="text-xs font-bold text-gray-400">#{idx + 1}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{field.label}</span>
                          {field.required && (
                            <span className="text-xs text-red-500 font-bold">*</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase">
                            {field.type.replace("_", " ")}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveField(field.id, e)}
                            className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Field Mock Preview */}
                      <div className="pl-6 pt-1 opacity-70 pointer-events-none">
                        {field.type === "short_answer" && (
                          <div className="h-8 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-3 flex items-center text-xs text-gray-400">
                            Single line answer input...
                          </div>
                        )}
                        {field.type === "long_answer" && (
                          <div className="h-16 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-2 text-xs text-gray-400">
                            Paragraph answer input...
                          </div>
                        )}
                        {(field.type === "dropdown" || field.type === "multiple_choice" || field.type === "checkbox_multiselect") && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {(field.options ?? ["Option 1", "Option 2"]).map((opt, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                {opt}
                              </span>
                            ))}
                          </div>
                        )}
                        {field.type === "yes_no" && (
                          <div className="flex gap-2">
                            <span className="text-xs px-3 py-1 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600">Yes</span>
                            <span className="text-xs px-3 py-1 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600">No</span>
                          </div>
                        )}
                        {field.type === "date" && (
                          <div className="h-8 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-3 flex items-center text-xs text-gray-400">
                            <Calendar className="size-3.5 mr-1.5" />
                            Select a date...
                          </div>
                        )}
                        {field.type === "agreement_text" && (
                          <div className="h-12 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-center text-xs text-gray-400">
                            Agreement / Terms text area
                          </div>
                        )}
                        {field.type === "screening_instrument" && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <ShieldCheck className="size-4" />
                            <span>{field.instrumentType || "Screening"} Assessment — score range 0–{field.instrumentType === "GAD-7" ? "21" : "27"}</span>
                          </div>
                        )}
                        {field.type === "e_signature" && (
                          <div className="h-12 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-center text-xs text-gray-400">
                            Signature Canvas Box
                          </div>
                        )}
                        {field.type === "file_upload" && (
                          <div className="h-12 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-center text-xs text-gray-400">
                            File Upload Zone
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        {/* ── Right Inspector Panel Sidebar ── */}
        <aside className="w-full md:w-80 bg-white dark:bg-gray-800 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0 shadow-sm">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSidebarTab("add")}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                sidebarTab === "add"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
                  : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Plus className="size-3.5" />
              Add Fields
            </button>
            <button
              onClick={() => setSidebarTab("settings")}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                sidebarTab === "settings"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
                  : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Settings2 className="size-3.5" />
              Field Settings
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            {/* ── Add Fields Tab Content ── */}
            {sidebarTab === "add" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">Add Fields</h3>
                  <p className="text-xs text-gray-400 mb-3">Click or drag a field type to start building your form.</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_FIELD_TYPES.map((ft, idx) => {
                    const Icon = ft.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAddField(ft)}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-750 hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 text-center transition-all shadow-2xs group"
                      >
                        <Icon className="size-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1.5" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
                          {ft.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Field Settings Tab Content ── */}
            {sidebarTab === "settings" && (
              <div>
                {selectedField ? (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">Field Properties</h3>
                      <p className="text-xs text-gray-400">Customize the selected field component.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Field Label *</label>
                      <input
                        type="text"
                        value={selectedField.label}
                        onChange={(e) => handleUpdateSelectedField({ label: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Required Field</span>
                      <input
                        type="checkbox"
                        checked={selectedField.required}
                        onChange={(e) => handleUpdateSelectedField({ required: e.target.checked })}
                        className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>

                    {/* Options Editor for Dropdown/Radio/Checkboxes */}
                    {(selectedField.type === "dropdown" ||
                      selectedField.type === "multiple_choice" ||
                      selectedField.type === "checkbox_multiselect") && (
                      <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Choices / Options</label>
                          <button
                            type="button"
                            onClick={handleAddOption}
                            className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-0.5"
                          >
                            <Plus className="size-3" /> Add Choice
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          {(selectedField.options ?? []).map((opt, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleUpdateOption(i, e.target.value)}
                                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveOption(i)}
                                className="p-1 rounded text-gray-400 hover:text-red-500"
                              >
                                <X className="size-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => handleRemoveField(selectedField.id)}
                        className="w-full py-2 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="size-3.5" />
                        Delete Field
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Settings2 className="size-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                    <p className="text-xs font-medium">Select a field on the canvas to edit its properties.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
