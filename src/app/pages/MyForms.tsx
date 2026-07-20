import { useParams, useNavigate } from "react-router";
import { useState, useMemo } from "react";
import { FileText, AlertCircle, CheckCircle2, Clock, Edit3, ExternalLink, Eye, X, ChevronLeft, FileSpreadsheet } from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { mockClients, PHQ9_ITEMS, GAD7_ITEMS } from "../data/mockPartnerData";
import type { FormField, FormEntry, FormResponse } from "../types/partnerDashboard";
import { getScreeningScoreLabel, getScreeningScoreColor } from "../types/partnerDashboard";

const STATUS_DISPLAY: Record<string, { label: string; color: string; icon: any }> = {
  requested: { label: "Requested", color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800", icon: Clock },
  draft: { label: "Draft", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800", icon: Edit3 },
  submitted: { label: "Completed", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800", icon: CheckCircle2 },
};

export function MyForms() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { intakeForms, formEntries, formResponses } = usePartnerDashboard();

  const [viewingResponse, setViewingResponse] = useState<{ formId: string; response: FormResponse } | null>(null);

  const client = mockClients.find((c) => c.id === clientId);
  const clientFormEntries = formEntries
    .filter((fe) => fe.clientId === clientId)
    .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());

  function getFormName(formId: string) {
    return intakeForms.find((f) => f.id === formId)?.name ?? "Unknown Form";
  }

  function getForm(formId: string) {
    return intakeForms.find((f) => f.id === formId) ?? null;
  }

  // ── Response viewer modal for submitted forms ──
  if (viewingResponse) {
    const form = getForm(viewingResponse.formId);
    if (!form) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-sm w-full text-center">
            <p className="text-sm text-gray-500">Form not found.</p>
          </div>
        </div>
      );
    }
    const sortedFields = [...form.fields].sort((a, b) => a.order - b.order);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <button
            onClick={() => setViewingResponse(null)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to all forms
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
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
                    Submitted {new Date(viewingResponse.response.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-5 md:px-8 py-5 md:py-6 space-y-4">
              {sortedFields.map((field) => {
                const answer = viewingResponse.response.answers.find((a) => a.fieldId === field.id);
                return (
                  <div key={field.id} className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{field.label}</p>
                    <FormFieldValue field={field} answer={answer} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error: no client ──
  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-sm w-full text-center">
          <AlertCircle className="size-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Client not found.</p>
        </div>
      </div>
    );
  }

  // ── Empty state ──
  if (clientFormEntries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex flex-col">
        <TopBar clientName={client.name} />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-sm w-full text-center">
            <FileText className="size-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Forms Yet</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">You don't have any intake forms to complete at this time.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main list ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex flex-col">
      <TopBar clientName={client.name} />

      <div className="flex-1 px-4 md:px-6 py-6 md:py-10">
        <div className="max-w-2xl mx-auto space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Your Forms</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Complete each form below. You can fill them in any order.
            </p>
          </div>

          <div className="space-y-3">
            {clientFormEntries.map((entry) => {
              const form = getForm(entry.formId);
              if (!form) return null;
              const statusCfg = STATUS_DISPLAY[entry.status] ?? STATUS_DISPLAY.requested;
              const StatusIcon = statusCfg.icon;
              const isPending = entry.status === "requested" || entry.status === "draft";
              const response = formResponses.find((r) => r.formEntryId === entry.id);

              return (
                <div
                  key={entry.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`size-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          form.category === "clinical"
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                            : "bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                        }`}>
                          <FileText className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white">{form.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Requested {new Date(entry.requestedAt).toLocaleDateString()}
                            {form.fields.length > 0 && ` · ${form.fields.length} fields`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isPending ? (
                          <button
                            onClick={() => navigate(`/intake-preview/${entry.id}`)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                          >
                            Fill Out
                            <ExternalLink className="size-3.5" />
                          </button>
                        ) : (
                          response && (
                            <button
                              onClick={() => setViewingResponse({ formId: entry.formId, response })}
                              className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-xs font-semibold transition-all"
                            >
                              <Eye className="size-3.5" />
                              View
                            </button>
                          )
                        )}
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${statusCfg.color}`}>
                          <StatusIcon className="size-3.5" />
                          <span>{statusCfg.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar({ clientName }: { clientName: string }) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700/50">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-gray-800 dark:text-white text-sm">MantraCare</span>
          <span className="text-gray-300 dark:text-gray-600 text-sm">|</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">Patient Portal</span>
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{clientName}</span>
      </div>
    </div>
  );
}

// ── Read-only field value renderer ──────────────────────────────────────────

const FIELD_TYPE_LABELS: Record<string, string> = {
  short_answer: "Short Answer", long_answer: "Long Answer",
  multiple_choice: "Multiple Choice", dropdown: "Dropdown",
  checkbox_multiselect: "Checkbox (Multi)", yes_no: "Yes / No",
  date: "Date", agreement_text: "Agreement Text",
  e_signature: "E-Signature", file_upload: "File Upload",
  screening_instrument: "Screening",
};

function FormFieldValue({ field, answer }: { field: FormField; answer?: { value: string | string[]; computedScore?: number; screeningAnswers?: { itemIndex: number; itemText: string; value: number }[] } }) {
  const value = answer?.value;

  if (field.type === "screening_instrument") {
    const instrumentLabel = field.instrumentType === "PHQ-9" ? "PHQ-9" : "GAD-7";
    const items = field.instrumentType === "PHQ-9" ? PHQ9_ITEMS : GAD7_ITEMS;
    const screeningAnswers = answer?.screeningAnswers ?? [];
    const score = answer?.computedScore ?? 0;
    const severityLabel = getScreeningScoreLabel(field.instrumentType, score);

    const accentBorder = score >= 15
      ? "border-l-4 border-l-red-500"
      : score >= 10
      ? "border-l-4 border-l-amber-500"
      : "border-l-4 border-l-emerald-500";

    return (
      <div className={`space-y-3 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white dark:from-gray-850 dark:to-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm ${accentBorder}`}>
        <div className="flex items-center justify-between gap-3 flex-wrap border-b border-gray-100/50 dark:border-gray-700/50 pb-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold ${getScreeningScoreColor(score)}`}>
            <FileSpreadsheet className="size-4" />
            <span>{instrumentLabel} Assessment Result</span>
          </div>
          <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
            <span>Score:</span>
            <span className={`text-base font-extrabold px-2.5 py-0.5 rounded-lg ${
              score >= 15 ? "text-red-600 bg-red-50 dark:bg-red-950/30" : score >= 10 ? "text-amber-600 bg-amber-50 dark:bg-amber-950/30" : "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
            }`}>
              {score}
            </span>
            <span className="text-xs font-medium text-gray-555 dark:text-gray-400">({severityLabel})</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
          {items.map((itemText, idx) => {
            const sa = screeningAnswers.find((a) => a.itemIndex === idx);
            const val = sa?.value ?? 0;
            return (
              <div key={idx} className="flex items-start gap-2.5 py-2 px-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-gray-50 dark:border-gray-800/40 hover:bg-white dark:hover:bg-slate-900/60 transition-colors">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-150 dark:bg-gray-800 size-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                <span className="text-xs text-gray-650 dark:text-gray-300 flex-1 leading-snug">{itemText}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${
                  val === 3
                    ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                    : val === 2
                    ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                    : val === 1
                    ? "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                }`}>
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "agreement_text") {
    return (
      <p className="text-xs text-gray-600 dark:text-gray-400 italic">
        {typeof value === "string" ? value : "Acknowledged"}
      </p>
    );
  }

  if (field.type === "e_signature") {
    const isImage = typeof value === "string" && value.startsWith("data:image/");
    return isImage ? (
      <img src={value as string} alt="Signature" className="max-h-12 bg-transparent dark:brightness-200" />
    ) : (
      <p className="text-sm font-semibold text-gray-900 dark:text-white font-['Bradley_Hand','Brush_Script_MT',cursive]">
        {typeof value === "string" ? value : "N/A"}
      </p>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {value.map((v, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300">{v}</span>
        ))}
      </div>
    );
  }

  return (
    <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
      {value || <span className="text-gray-400 italic">No answer</span>}
    </p>
  );
}