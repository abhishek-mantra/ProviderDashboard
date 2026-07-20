import { useParams, useNavigate } from "react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { Check, FileText, AlertCircle, Circle } from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { PHQ9_ITEMS, GAD7_ITEMS } from "../data/mockPartnerData";
import type { FormField, FormResponse, FormResponseAnswer, ScreeningAnswer } from "../types/partnerDashboard";
import { getScreeningScoreLabel, getScreeningScoreColor } from "../types/partnerDashboard";

const SCREENING_OPTIONS = [
  { value: 0, label: "Not at all", short: "0" },
  { value: 1, label: "Several days", short: "1" },
  { value: 2, label: "More than half the days", short: "2" },
  { value: 3, label: "Nearly every day", short: "3" },
];

export function IntakePreview() {
  const { formEntryId } = useParams();
  const navigate = useNavigate();
  const {
    intakeForms,
    formEntries,
    setFormEntries,
    formResponses,
    setFormResponses,
  } = usePartnerDashboard();

  const entry = formEntries.find((fe) => fe.id === formEntryId);
  const form = entry ? intakeForms.find((f) => f.id === entry.formId) : null;

  const [answers, setAnswers] = useState<Record<string, string | string[] | ScreeningAnswer[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(entry?.status === "submitted");
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const isInitialMount = useRef(true);

  const sortedFields = useMemo(() => {
    if (!form) return [];
    return [...form.fields].sort((a, b) => a.order - b.order);
  }, [form]);

  // Pre-fill from existing response when viewing a submitted/draft entry
  const existingResponse = formResponses.find(
    (r) => r.formEntryId === entry?.id
  );

  if (existingResponse && Object.keys(answers).length === 0) {
    const prefill: Record<string, string | string[] | ScreeningAnswer[]> = {};
    for (const answer of existingResponse.answers) {
      if (answer.screeningAnswers) {
        prefill[answer.fieldId] = answer.screeningAnswers;
      } else {
        prefill[answer.fieldId] = answer.value;
      }
    }
    if (Object.keys(prefill).length > 0) {
      setAnswers(prefill);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!entry || !form || isSubmitted || Object.keys(answers).length === 0) return;

    setSaveStatus("saving");
    const timeout = setTimeout(() => {
      const fieldAnswers: FormResponseAnswer[] = sortedFields.map((field) => {
        const raw = answers[field.id];
        if (field.type === "screening_instrument") {
          const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
          const sArr = (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === "object" && "value" in raw[0])
            ? (raw as ScreeningAnswer[])
            : items.map((t, i) => ({ itemIndex: i, itemText: t, value: 0 }));
          const score = sArr.reduce((sum, a) => sum + a.value, 0);
          return { fieldId: field.id, value: "", computedScore: score, screeningAnswers: sArr };
        }
        if (field.type === "agreement_text") {
          return { fieldId: field.id, value: "acknowledged" };
        }
        return {
          fieldId: field.id,
          value: typeof raw === "string" ? raw : Array.isArray(raw) ? raw : "",
        };
      });

      setFormResponses((prev) => {
        const existing = prev.find((r) => r.formEntryId === entry.id);
        if (existing) {
          return prev.map((r) =>
            r.formEntryId === entry.id
              ? { ...r, answers: fieldAnswers, submittedAt: new Date().toISOString() }
              : r
          );
        } else {
          const newResponse: FormResponse = {
            id: `fr-preview-${Date.now()}`,
            formEntryId: entry.id,
            clientId: entry.clientId,
            formId: form.id,
            answers: fieldAnswers,
            submittedAt: new Date().toISOString(),
          };
          return [...prev, newResponse];
        }
      });

      setFormEntries((prev) =>
        prev.map((fe) =>
          fe.id === entry.id ? { ...fe, status: "draft" as const } : fe
        )
      );

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1500); // 1.5 seconds debounce

    return () => clearTimeout(timeout);
  }, [answers, entry, form, isSubmitted, sortedFields, setFormEntries, setFormResponses]);

  function setFieldValue(fieldId: string, value: string | string[] | ScreeningAnswer[]) {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  }

  function getFieldValue(fieldId: string): string | string[] | ScreeningAnswer[] | undefined {
    return answers[fieldId];
  }

  function isFormValid(): boolean {
    if (!form || isSubmitted) return true;
    for (const field of sortedFields) {
      if (!field.required) continue;
      if (field.type === "agreement_text") continue;
      const val = answers[field.id];
      if (field.type === "screening_instrument") {
        if (!Array.isArray(val) || val.length === 0) return false;
        const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
        const sArr = val as ScreeningAnswer[];
        if (sArr.length !== items.length) return false;
        if (sArr.some((a) => a.value === undefined || a.value === null || a.value < 0)) return false;
      } else if (val === undefined || val === "" || (Array.isArray(val) && val.length === 0)) {
        return false;
      }
    }
    return true;
  }

  function handleSaveDraft() {
    if (!entry || !form) return;

    const fieldAnswers: FormResponseAnswer[] = sortedFields.map((field) => {
      const raw = answers[field.id];
      if (field.type === "screening_instrument") {
        const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
        const sArr = (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === "object" && "value" in raw[0])
          ? (raw as ScreeningAnswer[])
          : items.map((t, i) => ({ itemIndex: i, itemText: t, value: 0 }));
        const score = sArr.reduce((sum, a) => sum + a.value, 0);
        return { fieldId: field.id, value: "", computedScore: score, screeningAnswers: sArr };
      }
      if (field.type === "agreement_text") {
        return { fieldId: field.id, value: "acknowledged" };
      }
      return {
        fieldId: field.id,
        value: typeof raw === "string" ? raw : Array.isArray(raw) ? raw : "",
      };
    });

    // Update or create response
    setFormResponses((prev) => {
      const existing = prev.find((r) => r.formEntryId === entry.id);
      if (existing) {
        return prev.map((r) =>
          r.formEntryId === entry.id
            ? { ...r, answers: fieldAnswers, submittedAt: new Date().toISOString() }
            : r
        );
      } else {
        const newResponse: FormResponse = {
          id: `fr-preview-${Date.now()}`,
          formEntryId: entry.id,
          clientId: entry.clientId,
          formId: form.id,
          answers: fieldAnswers,
          submittedAt: new Date().toISOString(),
        };
        return [...prev, newResponse];
      }
    });

    setFormEntries((prev) =>
      prev.map((fe) =>
        fe.id === entry.id ? { ...fe, status: "draft" as const } : fe
      )
    );
    navigate(`/my-forms/${entry.clientId}`);
  }

  function handleSubmit() {
    if (!entry || !form) return;
    setIsSubmitting(true);

    const fieldAnswers: FormResponseAnswer[] = sortedFields.map((field) => {
      const raw = answers[field.id];
      if (field.type === "screening_instrument") {
        const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
        const sArr = (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === "object" && "value" in raw[0])
          ? (raw as ScreeningAnswer[])
          : items.map((t, i) => ({ itemIndex: i, itemText: t, value: 0 }));
        const score = sArr.reduce((sum, a) => sum + a.value, 0);
        return { fieldId: field.id, value: "", computedScore: score, screeningAnswers: sArr };
      }
      if (field.type === "agreement_text") {
        return { fieldId: field.id, value: "acknowledged" };
      }
      return {
        fieldId: field.id,
        value: typeof raw === "string" ? raw : Array.isArray(raw) ? raw : "",
      };
    });

    // Update or create response
    setFormResponses((prev) => {
      const existing = prev.find((r) => r.formEntryId === entry.id);
      if (existing) {
        return prev.map((r) =>
          r.formEntryId === entry.id
            ? { ...r, answers: fieldAnswers, submittedAt: new Date().toISOString() }
            : r
        );
      } else {
        const newResponse: FormResponse = {
          id: `fr-preview-${Date.now()}`,
          formEntryId: entry.id,
          clientId: entry.clientId,
          formId: form.id,
          answers: fieldAnswers,
          submittedAt: new Date().toISOString(),
        };
        return [...prev, newResponse];
      }
    });

    setFormEntries((prev) =>
      prev.map((fe) =>
        fe.id === entry.id
          ? { ...fe, status: "submitted" as const, submittedAt: new Date().toISOString() }
          : fe
      )
    );
    setTouchedFields(new Set());
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  function handleFieldFocus(fieldId: string) {
    setTouchedFields((prev) => new Set(prev).add(fieldId));
    if (!entry || isSubmitted || entry.status !== "requested") return;
    setFormEntries((prev) =>
      prev.map((fe) =>
        fe.id === entry.id ? { ...fe, status: "draft" as const } : fe
      )
    );
  }

  function isFieldInvalid(field: FormField): boolean {
    if (!touchedFields.has(field.id) || isSubmitted) return false;
    if (!field.required || field.type === "agreement_text") return false;
    const val = answers[field.id];
    if (field.type === "screening_instrument") {
      if (!Array.isArray(val)) return true;
      const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
      const sArr = val as ScreeningAnswer[];
      return sArr.length !== items.length || sArr.some((a) => a.value === undefined || a.value < 0);
    }
    return val === undefined || val === "" || (Array.isArray(val) && val.length === 0);
  }

  // ── Error states ─────────────────────────────────────────────────────────
  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-sm w-full text-center">
          <div className="size-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="size-7 text-gray-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Link Expired</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">This intake link is invalid or no longer available. Please contact your provider.</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-sm w-full text-center">
          <div className="size-14 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="size-7 text-amber-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Configuration Error</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Something went wrong loading this intake. Please try again later.</p>
        </div>
      </div>
    );
  }

  // ── Completion screen ────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-10 max-w-md w-full text-center">
          <div className="size-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="size-8 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Form Submitted!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Thank you for completing this form. Your response has been submitted to your provider.
          </p>
          <button
            onClick={() => navigate(`/my-forms/${entry.clientId}`)}
            className="px-8 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white rounded-2xl font-semibold text-sm transition-all shadow-sm"
          >
            Back to Forms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex flex-col">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700/50">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-white text-sm">MantraCare</span>
            <span className="text-gray-300 dark:text-gray-600 text-sm">|</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">Patient Intake</span>
            
            {/* Real-time Draft Saving Status Indicator */}
            {saveStatus === "saving" && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 animate-pulse">
                <span className="size-1.5 rounded-full bg-blue-500" />
                Saving...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Draft Saved
              </span>
            )}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Exit
          </button>
        </div>
      </div>

      {/* ── Form card ────────────────────────────────────────────────────── */}
      <div className="flex-1 px-4 md:px-6 py-6 md:py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
            {/* Form header */}
            <div className="px-5 md:px-8 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-gray-50 dark:border-gray-700/30">
              <div className="flex items-center gap-3 mb-2">
                <div className={`size-10 rounded-xl flex items-center justify-center ${
                  form.category === "clinical"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                }`}>
                  <FileText className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{form.name}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {form.category === "clinical" ? "Clinical Information" : "Administrative Information"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form fields */}
            <div className="px-5 md:px-8 py-5 md:py-6 space-y-6">
              {sortedFields.map((field) => (
                <FormFieldRenderer
                  key={field.id}
                  field={field}
                  value={getFieldValue(field.id)}
                  onChange={(val) => setFieldValue(field.id, val)}
                  disabled={isSubmitted}
                  invalid={isFieldInvalid(field)}
                  onFocus={() => handleFieldFocus(field.id)}
                />
              ))}
            </div>

            {/* Submit footer */}
            <div className="px-5 md:px-8 py-4 md:py-5 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-50 dark:border-gray-700/30">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2.5 md:px-5 md:py-3 text-sm font-semibold rounded-2xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-all"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold rounded-2xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  {isSubmitting ? "Submitting…" : "Submit"}
                  <Check className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Signature Field Component ────────────────────────────────────────────────
function SignatureField({
  field,
  value,
  onChange,
  disabled,
  invalid,
  onFocus,
  inputClass,
}: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  onFocus?: () => void;
  inputClass: (extra?: string) => string;
}) {
  const [sigMode, setSigMode] = useState<"type" | "draw">("type");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const isDrawnSig = value.startsWith("data:image/");

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    onFocus?.();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#0F172A";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onChange(canvas.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  return (
    <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm max-w-lg w-full mx-auto">
        <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 p-1">
          <button
            type="button"
            onClick={() => setSigMode("type")}
            disabled={disabled}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              sigMode === "type"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Type Signature
          </button>
          <button
            type="button"
            onClick={() => setSigMode("draw")}
            disabled={disabled}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              sigMode === "draw"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Draw Signature
          </button>
        </div>

        <div className="p-4 flex flex-col items-center justify-center min-h-[140px]">
          {sigMode === "type" ? (
            <div className="relative w-full max-w-sm py-4">
              <div className="absolute inset-x-0 border-b-2 border-dotted border-gray-300 dark:border-gray-500 pointer-events-none" style={{ top: "65%" }} />
              <input
                type="text"
                value={isDrawnSig ? "" : value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                disabled={disabled}
                placeholder="Type your full name to sign"
                className={inputClass("bg-transparent border-0 focus:ring-0 px-1 pb-1 pt-3 font-['Bradley_Hand','Brush_Script_MT',cursive] text-lg md:text-xl text-center w-full focus:outline-none")}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="relative border border-gray-200 dark:border-gray-600 rounded-xl bg-slate-50 dark:bg-slate-900 overflow-hidden cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={120}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="max-w-full block"
                />
                {disabled && <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-950/50" />}
              </div>
              {!disabled && (
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear Signature
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {invalid && <p className="text-xs text-red-500 mt-1">Please provide your signature</p>}
    </FieldWrapper>
  );
}

// ── Field Renderer ────────────────────────────────────────────────────────────

function FormFieldRenderer({
  field,
  value,
  onChange,
  disabled,
  invalid,
  onFocus,
}: {
  field: FormField;
  value: string | string[] | ScreeningAnswer[] | undefined;
  onChange: (val: string | string[] | ScreeningAnswer[]) => void;
  disabled?: boolean;
  invalid?: boolean;
  onFocus?: () => void;
}) {
  const strVal = typeof value === "string" ? value : "";
  const arrVal = Array.isArray(value) ? value : [];

  function inputClass(extra = ""): string {
    const base = "w-full px-4 py-3 text-sm rounded-2xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
    const borderColor = invalid
      ? "border-red-300 dark:border-red-500 focus:border-red-400"
      : "border-gray-200 dark:border-gray-600 focus:border-indigo-400";
    return `${base} ${borderColor} ${extra}`.trim();
  }

  if (field.type === "short_answer") {
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <input
          type="text"
          value={strVal}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          disabled={disabled}
          placeholder="Type your answer…"
          className={inputClass()}
        />
        {invalid && <p className="text-xs text-red-500 mt-1">This field is required</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "long_answer") {
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <textarea
          value={strVal}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          disabled={disabled}
          placeholder="Type your answer…"
          rows={4}
          className={inputClass("resize-none")}
        />
        {invalid && <p className="text-xs text-red-500 mt-1">This field is required</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "dropdown") {
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <select
          value={strVal}
          onChange={(e) => { onChange(e.target.value); onFocus?.(); }}
          disabled={disabled}
          className={inputClass("appearance-none")}
        >
          <option value="">Select an option…</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {invalid && <p className="text-xs text-red-500 mt-1">Please make a selection</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "multiple_choice") {
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <div className="space-y-2">
          {(field.options ?? []).map((opt) => {
            const selected = strVal === opt;
            return (
              <label
                key={opt}
                onClick={onFocus}
                className={`flex items-center gap-3 p-3 md:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm"
                    : "border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className={`size-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected ? "border-indigo-500" : "border-gray-300 dark:border-gray-500"
                }`}>
                  {selected && <div className="size-2.5 rounded-full bg-indigo-500" />}
                </div>
                <span className="text-sm text-gray-900 dark:text-white">{opt}</span>
              </label>
            );
          })}
        </div>
        {invalid && <p className="text-xs text-red-500 mt-1">Please make a selection</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "checkbox_multiselect") {
    const selected = Array.isArray(arrVal) ? arrVal.filter((v): v is string => typeof v === "string") : [];
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <div className="space-y-2">
          {(field.options ?? []).map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                onClick={onFocus}
                className={`flex items-center gap-3 p-3 md:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  checked
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm"
                    : "border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className={`size-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  checked ? "border-indigo-500 bg-indigo-500" : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600"
                }`}>
                  {checked && <Check className="size-3 text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm text-gray-900 dark:text-white">{opt}</span>
              </label>
            );
          })}
        </div>
        {invalid && <p className="text-xs text-red-500 mt-1">Please make a selection</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "yes_no") {
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <div className="flex gap-3" onClick={onFocus}>
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              disabled={disabled}
              className={`flex-1 py-3 md:py-3.5 text-sm font-semibold rounded-2xl border-2 transition-all ${
                strVal === opt
                  ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-sm"
                  : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>
        {invalid && <p className="text-xs text-red-500 mt-1">Please select an option</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "date") {
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <input
          type="date"
          value={strVal}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          disabled={disabled}
          className={inputClass()}
        />
        {invalid && <p className="text-xs text-red-500 mt-1">This field is required</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "agreement_text") {
    const agreementTexts: Record<string, string> = {
      "Confidentiality & limits of confidentiality":
        "All information shared during therapy sessions is confidential and protected by law. However, there are limits to confidentiality, including: risk of harm to self or others, suspected abuse of a minor or vulnerable adult, and court-ordered disclosures. Your therapist will review these exceptions with you during your first session.",
      "Telehealth consent":
        "Telehealth services use secure video conferencing to deliver therapy remotely. While reasonable measures are taken to protect your privacy, you acknowledge that remote communication carries inherent privacy risks. You consent to the use of telehealth for your care and understand that emergency services are not available through this platform.",
      "Cancellation / no-show policy":
        "We require at least 24 hours' notice for cancellations. Late cancellations and no-shows may be charged the full session fee. Please contact us as soon as possible if you need to reschedule. Repeated no-shows may result in discharge from the practice.",
    };
    const text = agreementTexts[field.label] || "Please review the terms above.";
    return (
      <FieldWrapper label={field.label} required={field.required}>
        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4 md:p-5 leading-relaxed border border-gray-100 dark:border-gray-600">
          {text}
        </div>
      </FieldWrapper>
    );
  }

  if (field.type === "e_signature") {
    return (
      <SignatureField
        field={field}
        value={strVal}
        onChange={onChange}
        disabled={disabled}
        invalid={invalid}
        onFocus={onFocus}
        inputClass={inputClass}
      />
    );
  }

  if (field.type === "file_upload") {
    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid}>
        <label className={`flex flex-col items-center gap-3 p-6 md:p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
          strVal ? "border-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
          <input
            type="file"
            disabled={disabled}
            onFocus={onFocus}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file?.name ?? "");
            }}
            className="sr-only"
          />
          {strVal ? (
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{strVal}</span>
          ) : (
            <>
              <div className="size-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <svg className="size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Upload a file</span>
            </>
          )}
        </label>
        {invalid && <p className="text-xs text-red-500 mt-1">This field is required</p>}
      </FieldWrapper>
    );
  }

  if (field.type === "screening_instrument") {
    const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
    const instrumentLabel = field.instrumentType === "PHQ-9" ? "PHQ-9" : "GAD-7";
    const screeningArr = Array.isArray(arrVal) && arrVal.length > 0 && typeof arrVal[0] === "object" && "value" in arrVal[0]
      ? (arrVal as ScreeningAnswer[])
      : [];

    const score = screeningArr.reduce((sum, a) => a.value !== undefined ? sum + a.value : sum, 0);
    const severityLabel = getScreeningScoreLabel(field.instrumentType, score);
    const allAnswered = items.every((_, idx) => screeningArr.some((a) => a.itemIndex === idx && a.value >= 0));

    function setItemScore(index: number, itemScore: number) {
      const updated = items.map((itemText, i) => ({
        itemIndex: i,
        itemText,
        value: screeningArr.find((a) => a.itemIndex === i)?.value ?? -1,
      }));
      updated[index] = { ...updated[index], value: itemScore };
      onChange(updated);
    }

    return (
      <FieldWrapper label={field.label} required={field.required} invalid={invalid && !allAnswered}>
        <div className="space-y-4">
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4">
            <strong>{instrumentLabel}</strong> — Over the last <strong>2 weeks</strong>, how often have you been bothered by the following problems?
          </p>

          {items.map((itemText, idx) => {
            const currentScore = screeningArr.find((a) => a.itemIndex === idx)?.value ?? -1;
            const isAnswered = currentScore >= 0;
            return (
              <div key={idx} className={`rounded-2xl border-2 p-3 md:p-4 transition-all ${
                isAnswered
                  ? "border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700"
                  : "border-dashed border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/30"
              }`}>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3 leading-snug">
                  {idx + 1}. {itemText}
                </p>
                <div className="grid grid-cols-4 gap-1.5 md:gap-2" onClick={onFocus}>
                  {SCREENING_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { if (!disabled) { setItemScore(idx, opt.value); } }}
                      disabled={disabled}
                      className={`py-2 md:py-2.5 px-1 text-[10px] md:text-xs font-semibold rounded-xl border-2 transition-all leading-tight text-center ${
                        currentScore === opt.value
                          ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-sm"
                          : "bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-300 border-gray-100 dark:border-gray-500 hover:border-gray-200 dark:hover:border-gray-400"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span className="block text-xs md:text-sm font-bold">{opt.short}</span>
                      <span className="block text-[8px] md:text-[10px] opacity-80 mt-0.5 leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {screeningArr.some((a) => a.value >= 0) && (
            <div className={`text-sm font-bold px-4 py-3 rounded-2xl flex items-center gap-2 ${
              score >= 15
                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                : score >= 10
                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
                : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
            }`}>
              <Circle className={`size-3 fill-current ${score >= 15 ? "text-red-500" : score >= 10 ? "text-amber-500" : "text-emerald-500"}`} />
              {instrumentLabel} Score: {score} — {severityLabel}
            </div>
          )}
        </div>
        {invalid && !allAnswered && <p className="text-xs text-red-500 mt-1">Please answer all questions</p>}
      </FieldWrapper>
    );
  }

  return null;
}

function FieldWrapper({
  label,
  required,
  invalid,
  children,
}: {
  label: string;
  required: boolean;
  invalid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</span>
        {required && <span className="text-red-400 text-xs font-bold">*</span>}
        {invalid && (
          <span className="text-xs text-red-500 ml-auto font-medium">Required</span>
        )}
      </div>
      {children}
    </div>
  );
}
