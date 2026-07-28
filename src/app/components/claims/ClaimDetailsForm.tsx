import { useState, useEffect } from "react";
import { getCurrencySymbol } from "../../types/claims";
import type { ClaimRegion, ServiceLine, ClaimSession } from "../../types/claims";

interface ClaimDetailsFormProps {
  region: ClaimRegion;
  selectedSessions: ClaimSession[];
  diagnosisCodes: string[];
  serviceLines: ServiceLine[];
  onDiagnosisChange: (codes: string[]) => void;
  onServiceLinesChange: (lines: ServiceLine[]) => void;
  authorizationCode?: string | null;
  payerName?: string | null;
  practitionerName?: string;
  insurerMemberRef?: string;
  onInsurerMemberRefChange?: (val: string) => void;
  gpReferralRef?: string;
  onGpReferralRefChange?: (val: string) => void;
  excessAmount?: number;
  onExcessAmountChange?: (val: number) => void;
}

const US_FIELDS = {
  diagnosisLabel: "Diagnosis Codes (ICD-10)",
  diagnosisPlaceholder: "e.g. F41.1",
  maxDiagnosis: 12,
  serviceCodeLabel: "CPT/Procedure Code",
  serviceCodePlaceholder: "e.g. 90834",
  showModifiers: true as const,
  showNPI: true as const,
  showPOS: true as const,
};

const UK_FIELDS = {
  diagnosisLabel: "Diagnosis Code",
  diagnosisPlaceholder: "e.g. F41.1",
  maxDiagnosis: 12,
  serviceCodeLabel: "CCSD Procedure Code",
  serviceCodePlaceholder: "e.g. MH001",
  showModifiers: false as const,
  showNPI: false as const,
  showPOS: false as const,
};

const CA_FIELDS: typeof US_FIELDS = {
  diagnosisLabel: "Diagnosis Code",
  diagnosisPlaceholder: "Not required for TELUS eClaims",
  maxDiagnosis: 1,
  serviceCodeLabel: "eClaims Service Code",
  serviceCodePlaceholder: "e.g. 1.xx.12",
  showModifiers: false as const,
  showNPI: false as const,
  showPOS: false as const,
};

const AE_FIELDS: typeof US_FIELDS = {
  diagnosisLabel: "Diagnosis Code (ICD-10-CM)",
  diagnosisPlaceholder: "e.g. F41.1",
  maxDiagnosis: 12,
  serviceCodeLabel: "CPT/Procedure Code",
  serviceCodePlaceholder: "e.g. 90834",
  showModifiers: false as const,
  showNPI: false as const,
  showPOS: false as const,
};

export const FIELD_CONFIGS: Record<ClaimRegion, typeof US_FIELDS> = {
  US: US_FIELDS,
  UK: UK_FIELDS,
  CA: CA_FIELDS,
  AE: AE_FIELDS,
};

export function ClaimDetailsForm({
  region,
  selectedSessions,
  diagnosisCodes,
  serviceLines,
  onDiagnosisChange,
  onServiceLinesChange,
  authorizationCode,
  payerName,
  practitionerName,
  insurerMemberRef = "",
  onInsurerMemberRefChange,
  gpReferralRef = "",
  onGpReferralRefChange,
  excessAmount = 0,
  onExcessAmountChange,
}: ClaimDetailsFormProps) {
  const config = FIELD_CONFIGS[region];

  useEffect(() => {
    if (serviceLines.length === 0) {
      if (selectedSessions.length > 0) {
        const initialLines: ServiceLine[] = selectedSessions.map((s, i) => ({
          id: `sl-new-${i}`,
          sessionId: s.id,
          dateOfService: s.date,
          serviceCode: "",
          units: 1,
          chargeAmount: 100,
          modifiers: [],
        }));
        onServiceLinesChange(initialLines);
      } else {
        const defaultLine: ServiceLine = {
          id: `sl-new-0`,
          sessionId: `session-0`,
          dateOfService: new Date().toISOString().split("T")[0],
          serviceCode: "",
          units: 1,
          chargeAmount: 100,
          modifiers: [],
        };
        onServiceLinesChange([defaultLine]);
      }
    }
  }, [selectedSessions]);

  const handleAddServiceLine = () => {
    const newLine: ServiceLine = {
      id: `sl-new-${serviceLines.length}`,
      sessionId: `session-${serviceLines.length}`,
      dateOfService: new Date().toISOString().split("T")[0],
      serviceCode: "",
      units: 1,
      chargeAmount: 100,
      modifiers: [],
    };
    onServiceLinesChange([...serviceLines, newLine]);
  };

  const handleAddCode = () => {
    if (diagnosisCodes.length < config.maxDiagnosis) {
      onDiagnosisChange([...diagnosisCodes, ""]);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    const updated = [...diagnosisCodes];
    updated[index] = value;
    onDiagnosisChange(updated);
  };

  const handleRemoveCode = (index: number) => {
    onDiagnosisChange(diagnosisCodes.filter((_, i) => i !== index));
  };

  const handleServiceLineChange = (index: number, field: keyof ServiceLine, value: any) => {
    const updated = serviceLines.map((sl, i) =>
      i === index ? { ...sl, [field]: value } : sl
    );
    onServiceLinesChange(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 md:p-8 space-y-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
          Claim Details
        </h2>

        {region === "UK" && authorizationCode && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
              Pre-authorisation Code: {authorizationCode}
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {config.diagnosisLabel}
          </label>
          {region === "CA" ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              TELUS eClaims does not require a diagnosis code field.
            </p>
          ) : (
            <div className="space-y-2">
              {diagnosisCodes.map((code, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 w-4">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    placeholder={config.diagnosisPlaceholder}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                  />
                  {diagnosisCodes.length > 1 && (
                    <button
                      onClick={() => handleRemoveCode(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {diagnosisCodes.length < config.maxDiagnosis && (
                <button
                  onClick={handleAddCode}
                  className="text-[#00c0ff] hover:text-[#0090c0] text-sm font-medium"
                >
                  + Add code ({diagnosisCodes.length}/{config.maxDiagnosis})
                </button>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Service Lines
          </label>
          <div className="space-y-3">
            {serviceLines.map((line, index) => (
              <div
                key={line.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {config.serviceCodeLabel}
                    </label>
                    <input
                      type="text"
                      value={line.serviceCode}
                      onChange={(e) => handleServiceLineChange(index, "serviceCode", e.target.value)}
                      placeholder={config.serviceCodePlaceholder}
                      className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Units</label>
                    <input
                      type="number"
                      value={line.units}
                      onChange={(e) => handleServiceLineChange(index, "units", parseInt(e.target.value) || 1)}
                      min={1}
                      className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Charge ({getCurrencySymbol(region).trim() || "$"})
                    </label>
                    <input
                      type="number"
                      value={line.chargeAmount}
                      onChange={(e) => handleServiceLineChange(index, "chargeAmount", parseFloat(e.target.value) || 0)}
                      min={0}
                      step={0.01}
                      className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Date</label>
                    <input
                      type="text"
                      value={line.dateOfService}
                      onChange={(e) => handleServiceLineChange(index, "dateOfService", e.target.value)}
                      className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                    />
                  </div>
                </div>
                {config.showModifiers && (
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Modifiers</label>
                    <input
                      type="text"
                      value={(line.modifiers || []).join(", ")}
                      onChange={(e) =>
                        handleServiceLineChange(
                          index,
                          "modifiers",
                          e.target.value.split(",").map((m) => m.trim()).filter(Boolean)
                        )
                      }
                      placeholder="e.g. 95, GT"
                      className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                    />
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddServiceLine}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00c0ff] hover:underline pt-1"
            >
              + Add Service Line
            </button>
          </div>
        </div>

        {region === "UK" && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              UK-Specific Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Practitioner Name
                </label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {practitionerName || "—"}
                </p>
              </div>

              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Insurer Member Reference Number
                </label>
                <input
                  type="text"
                  value={insurerMemberRef}
                  onChange={(e) => onInsurerMemberRefChange?.(e.target.value)}
                  placeholder="e.g. MEM-REF-12345"
                  className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  GP Referral Reference
                </label>
                <input
                  type="text"
                  value={gpReferralRef}
                  onChange={(e) => onGpReferralRefChange?.(e.target.value)}
                  placeholder="e.g. REF-98765"
                  className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Excess Amount
                </label>
                <input
                  type="number"
                  value={excessAmount}
                  onChange={(e) => onExcessAmountChange?.(parseFloat(e.target.value) || 0)}
                  min={0}
                  step={0.01}
                  className="w-full px-2.5 py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
