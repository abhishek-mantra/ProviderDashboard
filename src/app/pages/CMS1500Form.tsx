import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Download,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Check,
  Sparkles,
  Send,
  FileCheck,
  Save,
  X,
  Building2,
  Calendar,
  FileText,
} from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useGoBack } from "../utils/useGoBack";

interface CMS1500Data {
  payerId: string;
  carrierName: string;
  carrierAddress1: string;
  carrierAddress2: string;
  insuranceType: string[];
  insuredIdNumber: string;
  patientLastName: string;
  patientFirstName: string;
  patientMiddleName: string;
  patientBirthMM: string;
  patientBirthDD: string;
  patientBirthYY: string;
  patientSex: string;
  insuredLastName: string;
  insuredFirstName: string;
  insuredMiddleName: string;
  patientAddress: string;
  patientCity: string;
  patientState: string;
  patientZip: string;
  patientPhone: string;
  patientRelationship: string;
  insuredAddress: string;
  insuredCity: string;
  insuredState: string;
  insuredZip: string;
  insuredPhone: string;
  otherInsuredName: string;
  otherInsuredPolicy: string;
  otherInsuredDobMM: string;
  otherInsuredDobDD: string;
  otherInsuredDobYY: string;
  otherInsuredSex: string;
  otherInsuredPlanName: string;
  conditionEmployment: string;
  conditionAuto: string;
  conditionAutoState: string;
  conditionOther: string;
  claimCodes: string;
  insuredPolicyGroup: string;
  insuredDobMM: string;
  insuredDobDD: string;
  insuredDobYY: string;
  insuredSex: string;
  otherClaimId: string;
  insurancePlanName: string;
  anotherHealthPlan: string;
  patientSignature: string;
  patientSignatureDate: string;
  insuredSignature: string;
  dateCurrentIllnessMM: string;
  dateCurrentIllnessDD: string;
  dateCurrentIllnessYY: string;
  dateCurrentIllnessQual: string;
  otherDateMM: string;
  otherDateDD: string;
  otherDateYY: string;
  otherDateQual: string;
  unableToWorkFromMM: string;
  unableToWorkFromDD: string;
  unableToWorkFromYY: string;
  unableToWorkToMM: string;
  unableToWorkToDD: string;
  unableToWorkToYY: string;
  referringProvider: string;
  referringProviderNpi: string;
  referringProviderOther: string;
  hospitalizationFromMM: string;
  hospitalizationFromDD: string;
  hospitalizationFromYY: string;
  hospitalizationToMM: string;
  hospitalizationToDD: string;
  hospitalizationToYY: string;
  additionalClaimInfo: string;
  outsideLab: string;
  outsideLabCharges: string;
  diagnosisA: string;
  diagnosisB: string;
  diagnosisC: string;
  diagnosisD: string;
  diagnosisE: string;
  diagnosisF: string;
  diagnosisG: string;
  diagnosisH: string;
  resubmissionCode: string;
  originalRefNo: string;
  priorAuthNumber: string;
  serviceLines: Array<{
    dateFrom: string;
    dateTo: string;
    placeOfService: string;
    emg: string;
    cpt: string;
    modifier: string;
    diagnosisPointer: string;
    charges: string;
    daysUnits: string;
    epsdt: string;
    idQual: string;
    renderingNpi: string;
    renderingOther: string;
  }>;
  federalTaxId: string;
  taxType: string;
  patientAccountNo: string;
  acceptAssignment: string;
  totalCharge: string;
  amountPaid: string;
  signaturePhysician: string;
  signatureDate: string;
  serviceFacilityName: string;
  serviceFacilityAddress: string;
  serviceFacilityCityState: string;
  serviceFacilityNpi: string;
  serviceFacilityOtherId: string;
  billingProviderName: string;
  billingProviderAddress: string;
  billingProviderCityState: string;
  billingProviderPhone: string;
  billingProviderNpi: string;
  billingProviderOtherId: string;
}

const emptyServiceLine = {
  dateFrom: "", dateTo: "", placeOfService: "", emg: "",
  cpt: "", modifier: "", diagnosisPointer: "", charges: "",
  daysUnits: "", epsdt: "", idQual: "", renderingNpi: "", renderingOther: "",
};

function createEmptyData(): CMS1500Data {
  return {
    payerId: "", carrierName: "", carrierAddress1: "", carrierAddress2: "",
    insuranceType: [], insuredIdNumber: "",
    patientLastName: "", patientFirstName: "", patientMiddleName: "",
    patientBirthMM: "", patientBirthDD: "", patientBirthYY: "", patientSex: "",
    insuredLastName: "", insuredFirstName: "", insuredMiddleName: "",
    patientAddress: "", patientCity: "", patientState: "", patientZip: "", patientPhone: "",
    patientRelationship: "",
    insuredAddress: "", insuredCity: "", insuredState: "", insuredZip: "", insuredPhone: "",
    otherInsuredName: "", otherInsuredPolicy: "", otherInsuredDobMM: "", otherInsuredDobDD: "", otherInsuredDobYY: "",
    otherInsuredSex: "", otherInsuredPlanName: "",
    conditionEmployment: "", conditionAuto: "", conditionAutoState: "", conditionOther: "", claimCodes: "",
    insuredPolicyGroup: "", insuredDobMM: "", insuredDobDD: "", insuredDobYY: "", insuredSex: "",
    otherClaimId: "", insurancePlanName: "", anotherHealthPlan: "",
    patientSignature: "", patientSignatureDate: "",
    insuredSignature: "",
    dateCurrentIllnessMM: "", dateCurrentIllnessDD: "", dateCurrentIllnessYY: "", dateCurrentIllnessQual: "",
    otherDateMM: "", otherDateDD: "", otherDateYY: "", otherDateQual: "",
    unableToWorkFromMM: "", unableToWorkFromDD: "", unableToWorkFromYY: "",
    unableToWorkToMM: "", unableToWorkToDD: "", unableToWorkToYY: "",
    referringProvider: "", referringProviderNpi: "", referringProviderOther: "",
    hospitalizationFromMM: "", hospitalizationFromDD: "", hospitalizationFromYY: "",
    hospitalizationToMM: "", hospitalizationToDD: "", hospitalizationToYY: "",
    additionalClaimInfo: "", outsideLab: "", outsideLabCharges: "",
    diagnosisA: "", diagnosisB: "", diagnosisC: "", diagnosisD: "",
    diagnosisE: "", diagnosisF: "", diagnosisG: "", diagnosisH: "",
    resubmissionCode: "", originalRefNo: "", priorAuthNumber: "",
    serviceLines: Array.from({ length: 6 }, () => ({ ...emptyServiceLine })),
    federalTaxId: "", taxType: "", patientAccountNo: "", acceptAssignment: "",
    totalCharge: "", amountPaid: "",
    signaturePhysician: "", signatureDate: "",
    serviceFacilityName: "", serviceFacilityAddress: "", serviceFacilityCityState: "",
    serviceFacilityNpi: "", serviceFacilityOtherId: "",
    billingProviderName: "", billingProviderAddress: "", billingProviderCityState: "",
    billingProviderPhone: "", billingProviderNpi: "", billingProviderOtherId: "",
  };
}

export function CMS1500Form() {
  const navigate = useNavigate();
  const { claimId, billId } = useParams();
  const { providers, clients, currentProviderId, bills } = usePartnerDashboard();
  const { claims, updateClaim } = useClaims();

  const idParam = claimId || billId;
  const targetBill = idParam
    ? bills.find((b) => b.id === idParam || b.billNumber === idParam || b.claimId === idParam)
    : undefined;
  const rawClaim = idParam
    ? claims.find((c) => c.id === idParam || c.claimNumber === idParam || (targetBill && c.id === targetBill.claimId))
    : claims[0];

  const client = (rawClaim ? clients.find((c) => c.id === rawClaim.clientId) : undefined) ||
                 (targetBill ? clients.find((c) => c.id === targetBill.clientId) : undefined) ||
                 clients.find((c) => c.name.toLowerCase().includes("michael")) || clients[0];

  const currentProvider = providers.find((p) => p.id === (rawClaim?.providerId || targetBill?.providerId || currentProviderId)) || providers[0];

  const [data, setData] = useState<CMS1500Data>(createEmptyData);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Manual Submission Confirmation Modal
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submissionChannel, setSubmissionChannel] = useState<"payer_portal" | "mail" | "fax" | "email">("payer_portal");
  const [submissionRef, setSubmissionRef] = useState("");
  const [submissionDate, setSubmissionDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [submissionNote, setSubmissionNote] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const today = new Date();
    const todayStr = `${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;

    const nameParts = (rawClaim?.clientName || client?.name || "Michael Chen").trim().split(" ");
    const firstName = nameParts[0] || "Michael";
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "Chen";
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";

    const carrier = client?.insuranceCompany || rawClaim?.payerName || targetBill?.insurerName || "Cigna";
    const memberId = client?.memberId || "UHC-482-7731";
    const diagCodes = rawClaim?.diagnosisCodes || targetBill?.diagnosisCodes || ["F41.1", "F33.1"];
    const totalAmountVal = rawClaim?.totalAmount || targetBill?.amount || 190;
    const clientPaidVal = targetBill?.clientPaid || 100;

    const mainServiceCode = targetBill?.cptCode || rawClaim?.serviceLines[0]?.serviceCode || "90834";
    const mainDos = targetBill?.dateOfService || rawClaim?.serviceLines[0]?.dateOfService || "Mar 12, 2026";
    
    // Format DOS
    const dosDate = new Date(mainDos);
    const dosMM = isNaN(dosDate.getTime()) ? "03" : String(dosDate.getMonth() + 1).padStart(2, "0");
    const dosDD = isNaN(dosDate.getTime()) ? "12" : String(dosDate.getDate()).padStart(2, "0");
    const dosYY = isNaN(dosDate.getTime()) ? "26" : String(dosDate.getFullYear()).slice(-2);
    const formattedDos = `${dosMM}/${dosDD}/20${dosYY}`;

    setData((prev) => ({
      ...prev,
      payerId: rawClaim?.payerId || "62308",
      carrierName: carrier,
      carrierAddress1: "P.O. Box 188007",
      carrierAddress2: "Chattanooga, TN 37422",
      insuranceType: ["Group Health Plan"],
      insuredIdNumber: memberId,
      patientLastName: lastName,
      patientFirstName: firstName,
      patientMiddleName: middleName,
      patientBirthMM: "05",
      patientBirthDD: "14",
      patientBirthYY: "88",
      patientSex: "M",
      insuredLastName: lastName,
      insuredFirstName: firstName,
      insuredMiddleName: middleName,
      patientAddress: client?.address || "742 Evergreen Terrace",
      patientCity: "San Francisco",
      patientState: "CA",
      patientZip: "94105",
      patientPhone: client?.phone || "+1 (555) 234-5678",
      patientRelationship: "Self",
      insuredAddress: client?.address || "742 Evergreen Terrace",
      insuredCity: "San Francisco",
      insuredState: "CA",
      insuredZip: "94105",
      insuredPhone: client?.phone || "+1 (555) 234-5678",
      conditionEmployment: "NO",
      conditionAuto: "NO",
      conditionOther: "NO",
      insuredPolicyGroup: "GRP-90834",
      insuredDobMM: "05",
      insuredDobDD: "14",
      insuredDobYY: "88",
      insuredSex: "M",
      insurancePlanName: carrier,
      anotherHealthPlan: "NO",
      patientSignature: "SIGNATURE ON FILE",
      patientSignatureDate: todayStr,
      insuredSignature: "SIGNATURE ON FILE",
      dateCurrentIllnessMM: dosMM,
      dateCurrentIllnessDD: dosDD,
      dateCurrentIllnessYY: dosYY,
      dateCurrentIllnessQual: "431",
      referringProvider: "Dr. Sarah Jenkins, MD",
      referringProviderNpi: "1829304918",
      diagnosisA: diagCodes[0] || "F41.1",
      diagnosisB: diagCodes[1] || "F33.1",
      diagnosisC: diagCodes[2] || "",
      diagnosisD: diagCodes[3] || "",
      priorAuthNumber: rawClaim?.authorizationCode || "AUTH-98241",
      serviceLines: Array.from({ length: 6 }, (_, i) => {
        const service = rawClaim?.serviceLines[i];
        if (i === 0) {
          return {
            dateFrom: formattedDos,
            dateTo: formattedDos,
            placeOfService: "11",
            emg: "",
            cpt: mainServiceCode,
            modifier: service?.modifiers?.join(",") || "95",
            diagnosisPointer: "A",
            charges: `$${totalAmountVal.toFixed(2)}`,
            daysUnits: "1",
            epsdt: "",
            idQual: "",
            renderingNpi: "1982736405",
            renderingOther: "",
          };
        }
        if (service) {
          return {
            dateFrom: service.dateOfService || formattedDos,
            dateTo: service.dateOfService || formattedDos,
            placeOfService: "11",
            emg: "",
            cpt: service.serviceCode || "",
            modifier: service.modifiers?.join(",") || "",
            diagnosisPointer: "A",
            charges: `$${service.chargeAmount.toFixed(2)}`,
            daysUnits: String(service.units || "1"),
            epsdt: "",
            idQual: "",
            renderingNpi: "1982736405",
            renderingOther: "",
          };
        }
        return { ...emptyServiceLine };
      }),
      federalTaxId: "94-3829104",
      taxType: "EIN",
      patientAccountNo: rawClaim?.claimNumber || targetBill?.billNumber || "CLM-2026-642",
      acceptAssignment: "YES",
      totalCharge: `$${totalAmountVal.toFixed(2)}`,
      amountPaid: `$${clientPaidVal.toFixed(2)}`,
      signaturePhysician: currentProvider?.name || "Dr. Admin Owner",
      signatureDate: todayStr,
      serviceFacilityName: "Mantra Behavioral Health Suite 400",
      serviceFacilityAddress: "100 Healthcare Plaza",
      serviceFacilityCityState: "San Francisco, CA 94103",
      serviceFacilityNpi: "1982736405",
      serviceFacilityOtherId: "FAC-94103",
      billingProviderName: currentProvider?.name || "Dr. Admin Owner",
      billingProviderAddress: "100 Healthcare Plaza, Suite 400",
      billingProviderCityState: "San Francisco, CA 94103",
      billingProviderPhone: "+1 (800) 555-0199",
      billingProviderNpi: "1982736405",
      billingProviderOtherId: "LIC-PSY9402",
    }));
  }, [rawClaim, targetBill, currentProvider, client]);

  const updateField = <K extends keyof CMS1500Data>(key: K, value: CMS1500Data[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateServiceLine = (index: number, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      serviceLines: prev.serviceLines.map((sl, i) =>
        i === index ? { ...sl, [field]: value } : sl
      ),
    }));
  };

  const handlePrint = () => {
    handleSaveEdits();
    window.print();
  };

  // Persist edits back to the claim so corrections made on the CMS-1500 are not lost.
  const handleSaveEdits = () => {
    if (!rawClaim) return;
    updateClaim(rawClaim.id, {
      flowType: "manual",
      status: "draft",
      diagnosisCodes: [
        data.diagnosisA, data.diagnosisB, data.diagnosisC, data.diagnosisD,
        data.diagnosisE, data.diagnosisF, data.diagnosisG, data.diagnosisH,
      ].filter(Boolean),
      authorizationCode: data.priorAuthNumber || undefined,
      serviceLines: rawClaim.serviceLines.map((sl, i) => ({
        ...sl,
        dateOfService: data.serviceLines[i]?.dateFrom || sl.dateOfService,
        serviceCode: data.serviceLines[i]?.cpt || sl.serviceCode,
        modifiers: data.serviceLines[i]?.modifier ? (data.serviceLines[i].modifier?.split(",").filter(Boolean) as typeof sl.modifiers) : sl.modifiers,
        units: Number(data.serviceLines[i]?.daysUnits) || sl.units,
        chargeAmount: parseFloat(data.serviceLines[i]?.charges?.replace("$", "") || String(sl.chargeAmount)),
      })),
    });
    showToast("Changes to CMS-1500 draft saved successfully!");
  };

  // Confirm manual submission
  const handleConfirmManualSubmission = () => {
    if (rawClaim) {
      const channelLabel =
        submissionChannel === "payer_portal" ? "Payer Web Portal"
        : submissionChannel === "mail" ? "USPS Mail (Paper Claim)"
        : submissionChannel === "fax" ? "Fax Submission"
        : "Direct Email";

      const note = `[MANUAL SUBMISSION] Filed via ${channelLabel} on ${submissionDate}.${submissionRef ? ` Reference / Confirmation #: ${submissionRef}.` : ""}${submissionNote ? ` Note: ${submissionNote}` : ""}`;

      updateClaim(rawClaim.id, {
        flowType: "manual",
        status: "manual_generated",
        submittedDate: submissionDate,
        statusHistory: [
          ...(rawClaim.statusHistory || []),
          {
            status: "manual_generated",
            timestamp: new Date().toISOString(),
            note,
          },
        ],
      });

      setSubmitModalOpen(false);
      showToast("Claim successfully marked as submitted manually!");
      setTimeout(() => {
        navigate(`/claims/${rawClaim.id}`);
      }, 1000);
    }
  };

  const handleBack = useGoBack(rawClaim ? `/claims/${rawClaim.id}` : "/billing");

  const inputClass = "w-full px-1.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#043570]";
  const cellClass = "text-[9px] font-semibold text-[#0a0a0a] dark:text-gray-200 mb-0.5";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold rounded-xl shadow-xl animate-fade-in">
          <CheckCircle2 className="size-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Controls Bar (Hidden during Print) */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-3.5 print:hidden sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shrink-0"
              title="Back"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">
                  CMS-1500 Claim Form
                </h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                  NUCC 02/12
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {client?.name} · {data.carrierName} · Claim #{rawClaim?.claimNumber || "Draft"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSaveEdits}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <Save className="size-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-[#043570] dark:text-[#00c0ff] rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <Printer className="size-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => setSubmitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <FileCheck className="size-4" />
              <span>Mark as Submitted</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main CMS-1500 Document Wrapper */}
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header info in card */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-[#043570] dark:text-[#00c0ff]" />
                <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                  Health Insurance Claim Form (CMS-1500)
                </h2>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Edit boxes below before exporting or marking as submitted.
              </span>
            </div>

            <div className="p-4 md:p-6">
              {/* Row 1: Box 1 + Insurance Checkboxes + Box 1a */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <div className="mb-2">
                    <p className={cellClass}>PAYER ID</p>
                    <input value={data.payerId} onChange={(e) => updateField("payerId", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <p className={cellClass}>Carrier</p>
                    <input value={data.carrierName} onChange={(e) => updateField("carrierName", e.target.value)} className={`${inputClass} mb-1`} placeholder="Name" />
                    <input value={data.carrierAddress1} onChange={(e) => updateField("carrierAddress1", e.target.value)} className={`${inputClass} mb-1`} placeholder="Address line 1" />
                    <input value={data.carrierAddress2} onChange={(e) => updateField("carrierAddress2", e.target.value)} className={inputClass} placeholder="Address line 2" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 border border-[#d1d5dc] dark:border-gray-600 p-2">
                    <p className={cellClass}>1. MEDICARE MEDICAID TRICARE CHAMPVA GROUP HEALTH PLAN FECA BLK LUNG OTHER</p>
                    <div className="flex gap-3 mt-2 flex-wrap">
                      {["Medicare", "Medicaid", "TRICARE", "Group Health Plan"].map((t) => (
                        <label key={t} className="flex items-center gap-1 cursor-pointer">
                          <input type="checkbox" checked={data.insuranceType.includes(t)} onChange={(e) => {
                            const next = e.target.checked
                              ? [...data.insuranceType, t]
                              : data.insuranceType.filter((x) => x !== t);
                            updateField("insuranceType", next);
                          }} className="size-3" />
                          <span className="text-xs text-gray-800 dark:text-gray-200">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="w-full sm:w-48 border border-[#d1d5dc] dark:border-gray-600 p-2">
                    <p className={cellClass}>1a. INSURED'S I.D. NUMBER</p>
                    <input value={data.insuredIdNumber} onChange={(e) => updateField("insuredIdNumber", e.target.value)} className={`${inputClass} font-mono font-bold`} />
                  </div>
                </div>
              </div>

              {/* Row 2: Patient and Insured Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>2. PATIENT'S NAME (Last Name, First Name, Middle Initial)</p>
                  <div className="grid grid-cols-3 gap-1">
                    <input value={data.patientLastName} onChange={(e) => updateField("patientLastName", e.target.value)} className={inputClass} placeholder="Last" />
                    <input value={data.patientFirstName} onChange={(e) => updateField("patientFirstName", e.target.value)} className={inputClass} placeholder="First" />
                    <input value={data.patientMiddleName} onChange={(e) => updateField("patientMiddleName", e.target.value)} className={inputClass} placeholder="MI" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                    <p className={cellClass}>3. PATIENT'S BIRTH DATE &amp; SEX</p>
                    <div className="flex items-center gap-1">
                      <input value={data.patientBirthMM} onChange={(e) => updateField("patientBirthMM", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="MM" />
                      <span>/</span>
                      <input value={data.patientBirthDD} onChange={(e) => updateField("patientBirthDD", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="DD" />
                      <span>/</span>
                      <input value={data.patientBirthYY} onChange={(e) => updateField("patientBirthYY", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="YY" />
                      <select value={data.patientSex} onChange={(e) => updateField("patientSex", e.target.value)} className={`${inputClass} ml-1`}>
                        <option value="M">M</option>
                        <option value="F">F</option>
                      </select>
                    </div>
                  </div>
                  <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                    <p className={cellClass}>4. INSURED'S NAME</p>
                    <div className="grid grid-cols-3 gap-1">
                      <input value={data.insuredLastName} onChange={(e) => updateField("insuredLastName", e.target.value)} className={inputClass} placeholder="Last" />
                      <input value={data.insuredFirstName} onChange={(e) => updateField("insuredFirstName", e.target.value)} className={inputClass} placeholder="First" />
                      <input value={data.insuredMiddleName} onChange={(e) => updateField("insuredMiddleName", e.target.value)} className={inputClass} placeholder="MI" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Addresses and Relationship */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>5. PATIENT'S ADDRESS</p>
                  <input value={data.patientAddress} onChange={(e) => updateField("patientAddress", e.target.value)} className={`${inputClass} mb-1`} placeholder="Street Address" />
                  <div className="grid grid-cols-3 gap-1 mb-1">
                    <input value={data.patientCity} onChange={(e) => updateField("patientCity", e.target.value)} className={inputClass} placeholder="City" />
                    <input value={data.patientState} onChange={(e) => updateField("patientState", e.target.value)} className={inputClass} placeholder="State" />
                    <input value={data.patientZip} onChange={(e) => updateField("patientZip", e.target.value)} className={inputClass} placeholder="ZIP" />
                  </div>
                  <input value={data.patientPhone} onChange={(e) => updateField("patientPhone", e.target.value)} className={inputClass} placeholder="Telephone" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                    <p className={cellClass}>6. PATIENT RELATIONSHIP TO INSURED</p>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      {["Self", "Spouse", "Child", "Other"].map((r) => (
                        <label key={r} className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="rel" checked={data.patientRelationship.toLowerCase() === r.toLowerCase()} onChange={() => updateField("patientRelationship", r)} className="size-3" />
                          <span className="text-xs text-gray-800 dark:text-gray-200">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                    <p className={cellClass}>7. INSURED'S ADDRESS</p>
                    <input value={data.insuredAddress} onChange={(e) => updateField("insuredAddress", e.target.value)} className={`${inputClass} mb-1`} placeholder="Street Address" />
                    <div className="grid grid-cols-3 gap-1 mb-1">
                      <input value={data.insuredCity} onChange={(e) => updateField("insuredCity", e.target.value)} className={inputClass} placeholder="City" />
                      <input value={data.insuredState} onChange={(e) => updateField("insuredState", e.target.value)} className={inputClass} placeholder="State" />
                      <input value={data.insuredZip} onChange={(e) => updateField("insuredZip", e.target.value)} className={inputClass} placeholder="ZIP" />
                    </div>
                    <input value={data.insuredPhone} onChange={(e) => updateField("insuredPhone", e.target.value)} className={inputClass} placeholder="Telephone" />
                  </div>
                </div>
              </div>

              {/* Row 4: Box 9, 10, 11 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>9. OTHER INSURED'S NAME</p>
                  <input value={data.otherInsuredName} onChange={(e) => updateField("otherInsuredName", e.target.value)} className={`${inputClass} mb-1`} placeholder="Name" />
                  <p className={cellClass}>a. OTHER INSURED'S POLICY OR GROUP NUMBER</p>
                  <input value={data.otherInsuredPolicy} onChange={(e) => updateField("otherInsuredPolicy", e.target.value)} className={`${inputClass} mb-1`} />
                  <p className={cellClass}>d. INSURANCE PLAN NAME OR PROGRAM NAME</p>
                  <input value={data.otherInsuredPlanName} onChange={(e) => updateField("otherInsuredPlanName", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>10. IS PATIENT'S CONDITION RELATED TO:</p>
                  <div className="space-y-1 mt-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span>a. EMPLOYMENT?</span>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-0.5"><input type="radio" name="emp" checked={data.conditionEmployment === "YES"} onChange={() => updateField("conditionEmployment", "YES")} /> YES</label>
                        <label className="flex items-center gap-0.5"><input type="radio" name="emp" checked={data.conditionEmployment === "NO"} onChange={() => updateField("conditionEmployment", "NO")} /> NO</label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>b. AUTO ACCIDENT?</span>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-0.5"><input type="radio" name="auto" checked={data.conditionAuto === "YES"} onChange={() => updateField("conditionAuto", "YES")} /> YES</label>
                        <label className="flex items-center gap-0.5"><input type="radio" name="auto" checked={data.conditionAuto === "NO"} onChange={() => updateField("conditionAuto", "NO")} /> NO</label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>c. OTHER ACCIDENT?</span>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-0.5"><input type="radio" name="oth" checked={data.conditionOther === "YES"} onChange={() => updateField("conditionOther", "YES")} /> YES</label>
                        <label className="flex items-center gap-0.5"><input type="radio" name="oth" checked={data.conditionOther === "NO"} onChange={() => updateField("conditionOther", "NO")} /> NO</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>11. INSURED'S POLICY GROUP OR FECA NUMBER</p>
                  <input value={data.insuredPolicyGroup} onChange={(e) => updateField("insuredPolicyGroup", e.target.value)} className={`${inputClass} mb-1`} />
                  <p className={cellClass}>a. INSURED'S DATE OF BIRTH &amp; SEX</p>
                  <div className="flex items-center gap-1 mb-1">
                    <input value={data.insuredDobMM} onChange={(e) => updateField("insuredDobMM", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="MM" />
                    <span>/</span>
                    <input value={data.insuredDobDD} onChange={(e) => updateField("insuredDobDD", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="DD" />
                    <span>/</span>
                    <input value={data.insuredDobYY} onChange={(e) => updateField("insuredDobYY", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="YY" />
                    <select value={data.insuredSex} onChange={(e) => updateField("insuredSex", e.target.value)} className={`${inputClass} ml-1`}>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                  <p className={cellClass}>c. INSURANCE PLAN NAME OR PROGRAM NAME</p>
                  <input value={data.insurancePlanName} onChange={(e) => updateField("insurancePlanName", e.target.value)} className={inputClass} />
                </div>
              </div>

              {/* Row 5: Signatures (12, 13) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE</p>
                  <p className="text-[8px] text-gray-500 mb-1">I authorize release of any medical information necessary to process this claim.</p>
                  <div className="flex gap-2">
                    <input value={data.patientSignature} onChange={(e) => updateField("patientSignature", e.target.value)} className={`${inputClass} flex-1 font-mono`} />
                    <input value={data.patientSignatureDate} onChange={(e) => updateField("patientSignatureDate", e.target.value)} className={`${inputClass} w-28`} placeholder="Date" />
                  </div>
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>13. INSURED'S OR AUTHORIZED PERSON'S SIGNATURE</p>
                  <p className="text-[8px] text-gray-500 mb-1">I authorize payment of medical benefits to the undersigned physician.</p>
                  <input value={data.insuredSignature} onChange={(e) => updateField("insuredSignature", e.target.value)} className={`${inputClass} font-mono`} />
                </div>
              </div>

              {/* Row 6: Box 14-23 Clinical & Prior Auth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>14. DATE OF CURRENT ILLNESS / INJURY</p>
                  <div className="flex items-center gap-1">
                    <input value={data.dateCurrentIllnessMM} onChange={(e) => updateField("dateCurrentIllnessMM", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="MM" />
                    <span>/</span>
                    <input value={data.dateCurrentIllnessDD} onChange={(e) => updateField("dateCurrentIllnessDD", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="DD" />
                    <span>/</span>
                    <input value={data.dateCurrentIllnessYY} onChange={(e) => updateField("dateCurrentIllnessYY", e.target.value)} className={`${inputClass} w-10 text-center`} placeholder="YY" />
                  </div>
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>17. NAME OF REFERRING PROVIDER</p>
                  <input value={data.referringProvider} onChange={(e) => updateField("referringProvider", e.target.value)} className={`${inputClass} mb-1`} />
                  <p className={cellClass}>17b. NPI</p>
                  <input value={data.referringProviderNpi} onChange={(e) => updateField("referringProviderNpi", e.target.value)} className={`${inputClass} font-mono`} />
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>21. DIAGNOSIS (ICD-10-CM)</p>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold text-gray-500">A.</span>
                      <input value={data.diagnosisA} onChange={(e) => updateField("diagnosisA", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold text-gray-500">B.</span>
                      <input value={data.diagnosisB} onChange={(e) => updateField("diagnosisB", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold text-gray-500">C.</span>
                      <input value={data.diagnosisC} onChange={(e) => updateField("diagnosisC", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold text-gray-500">D.</span>
                      <input value={data.diagnosisD} onChange={(e) => updateField("diagnosisD", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                  </div>
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>23. PRIOR AUTHORIZATION NUMBER</p>
                  <input value={data.priorAuthNumber} onChange={(e) => updateField("priorAuthNumber", e.target.value)} className={`${inputClass} font-mono`} placeholder="e.g. AUTH-98241" />
                </div>
              </div>

              {/* Row 7: Box 24 Service Lines Table */}
              <div className="border border-[#d1d5dc] dark:border-gray-600 mb-2 overflow-x-auto">
                <p className={`${cellClass} p-1 bg-gray-100 dark:bg-gray-750 border-b border-[#d1d5dc] dark:border-gray-600`}>
                  24. A. DATES OF SERVICE | B. POS | C. EMG | D. CPT/HCPCS &amp; MODIFIER | E. DIAG POINTER | F. $ CHARGES | G. UNITS | J. RENDERING PROVIDER NPI
                </p>
                <table className="w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#d1d5dc] dark:border-gray-600 text-[8px] font-semibold text-gray-600 dark:text-gray-300">
                      <th className="p-1 text-left">From (MM/DD/YY)</th>
                      <th className="p-1 text-left">To</th>
                      <th className="p-1 text-center w-10">POS</th>
                      <th className="p-1 text-left">CPT/HCPCS</th>
                      <th className="p-1 text-left w-12">Mod</th>
                      <th className="p-1 text-center w-12">Diag</th>
                      <th className="p-1 text-right w-20">Charges</th>
                      <th className="p-1 text-center w-12">Units</th>
                      <th className="p-1 text-left w-28">Rendering NPI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.serviceLines.map((line, idx) => (
                      <tr key={idx} className="border-b border-[#e5e7eb] dark:border-gray-700">
                        <td className="p-0.5"><input value={line.dateFrom} onChange={(e) => updateServiceLine(idx, "dateFrom", e.target.value)} className={inputClass} placeholder="MM/DD/YY" /></td>
                        <td className="p-0.5"><input value={line.dateTo} onChange={(e) => updateServiceLine(idx, "dateTo", e.target.value)} className={inputClass} placeholder="MM/DD/YY" /></td>
                        <td className="p-0.5"><input value={line.placeOfService} onChange={(e) => updateServiceLine(idx, "placeOfService", e.target.value)} className={`${inputClass} text-center font-mono`} placeholder="11" /></td>
                        <td className="p-0.5"><input value={line.cpt} onChange={(e) => updateServiceLine(idx, "cpt", e.target.value)} className={`${inputClass} font-mono font-bold`} placeholder="90834" /></td>
                        <td className="p-0.5"><input value={line.modifier} onChange={(e) => updateServiceLine(idx, "modifier", e.target.value)} className={`${inputClass} text-center`} placeholder="95" /></td>
                        <td className="p-0.5"><input value={line.diagnosisPointer} onChange={(e) => updateServiceLine(idx, "diagnosisPointer", e.target.value)} className={`${inputClass} text-center font-bold`} placeholder="A" /></td>
                        <td className="p-0.5"><input value={line.charges} onChange={(e) => updateServiceLine(idx, "charges", e.target.value)} className={`${inputClass} text-right font-mono`} placeholder="$150.00" /></td>
                        <td className="p-0.5"><input value={line.daysUnits} onChange={(e) => updateServiceLine(idx, "daysUnits", e.target.value)} className={`${inputClass} text-center`} placeholder="1" /></td>
                        <td className="p-0.5"><input value={line.renderingNpi} onChange={(e) => updateServiceLine(idx, "renderingNpi", e.target.value)} className={`${inputClass} font-mono`} placeholder="1982736405" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Row 8: Box 25-33 Provider & Totals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>25. FEDERAL TAX I.D. NUMBER</p>
                  <div className="flex gap-2 mb-1">
                    <input value={data.federalTaxId} onChange={(e) => updateField("federalTaxId", e.target.value)} className={`${inputClass} font-mono`} />
                    <select value={data.taxType} onChange={(e) => updateField("taxType", e.target.value)} className={`${inputClass} w-16`}>
                      <option value="EIN">EIN</option>
                      <option value="SSN">SSN</option>
                    </select>
                  </div>
                  <p className={cellClass}>26. PATIENT'S ACCOUNT NO.</p>
                  <input value={data.patientAccountNo} onChange={(e) => updateField("patientAccountNo", e.target.value)} className={`${inputClass} font-mono`} />
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    <div>
                      <p className={cellClass}>28. TOTAL CHARGE</p>
                      <input value={data.totalCharge} onChange={(e) => updateField("totalCharge", e.target.value)} className={`${inputClass} font-mono font-bold text-sm`} />
                    </div>
                    <div>
                      <p className={cellClass}>29. AMOUNT PAID</p>
                      <input value={data.amountPaid} onChange={(e) => updateField("amountPaid", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                  </div>
                  <p className={cellClass}>31. SIGNATURE OF PHYSICIAN OR SUPPLIER</p>
                  <div className="flex gap-2">
                    <input value={data.signaturePhysician} onChange={(e) => updateField("signaturePhysician", e.target.value)} className={`${inputClass} flex-1`} />
                    <input value={data.signatureDate} onChange={(e) => updateField("signatureDate", e.target.value)} className={`${inputClass} w-24`} />
                  </div>
                </div>
                <div className="border border-[#d1d5dc] dark:border-gray-600 p-2">
                  <p className={cellClass}>33. BILLING PROVIDER INFO &amp; PH #</p>
                  <input value={data.billingProviderName} onChange={(e) => updateField("billingProviderName", e.target.value)} className={`${inputClass} mb-0.5 font-bold`} />
                  <input value={data.billingProviderAddress} onChange={(e) => updateField("billingProviderAddress", e.target.value)} className={`${inputClass} mb-0.5`} />
                  <input value={data.billingProviderCityState} onChange={(e) => updateField("billingProviderCityState", e.target.value)} className={`${inputClass} mb-0.5`} />
                  <input value={data.billingProviderPhone} onChange={(e) => updateField("billingProviderPhone", e.target.value)} className={`${inputClass} mb-1`} />
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <p className="text-[8px] text-gray-600 dark:text-gray-400 mb-0.5">a. NPI</p>
                      <input value={data.billingProviderNpi} onChange={(e) => updateField("billingProviderNpi", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-600 dark:text-gray-400 mb-0.5">b. Other ID</p>
                      <input value={data.billingProviderOtherId} onChange={(e) => updateField("billingProviderOtherId", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 text-[9px] text-gray-400 flex items-center justify-between">
                <span>National Uniform Claim Committee (NUCC) 02/12 Form Standards</span>
                <span>Pre-filled from Clinical EHR Data</span>
              </div>
            </div>

            {/* Bottom Back Button (Hidden during print) */}
            <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 print:hidden flex items-center justify-between">
              <button
                onClick={handleBack}
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                ← Back to Claim Details
              </button>
              <span className="text-xs text-gray-400">All actions are available in the top toolbar.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MARK AS SUBMITTED MANUALLY CONFIRMATION DIALOG                            */}
      {/* ========================================================================= */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 md:p-7 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-5 animate-scale-up">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
                  <FileCheck className="size-5.5" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                    Record Manual Submission
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Claim #{rawClaim?.claimNumber || "Draft"} · <span className="font-semibold text-gray-700 dark:text-gray-300">{data.carrierName}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Submission Channel / Method <span className="text-red-500">*</span>
                </label>
                <select
                  value={submissionChannel}
                  onChange={(e) => setSubmissionChannel(e.target.value as any)}
                  className="w-full h-10 px-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570] cursor-pointer transition-all"
                >
                  <option value="payer_portal">Payer Web Portal (Availity / UHC / Cigna Portal)</option>
                  <option value="mail">USPS Mail (Printed Paper CMS-1500)</option>
                  <option value="fax">Fax Submission directly to Payer</option>
                  <option value="email">Direct Email / Secure Upload</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Date Submitted <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    value={submissionDate}
                    onChange={(e) => setSubmissionDate(e.target.value)}
                    required
                    className="w-full h-10 px-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570] transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Reference / Ack #
                    </label>
                    <span className="text-[11px] text-gray-400 font-normal">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={submissionRef}
                    onChange={(e) => setSubmissionRef(e.target.value)}
                    placeholder="e.g. ACK-99214"
                    className="w-full h-10 px-3 font-mono bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Submission Notes
                  </label>
                  <span className="text-[11px] text-gray-400 font-normal">Optional</span>
                </div>
                <textarea
                  rows={2}
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                  placeholder="e.g. Uploaded to UHC portal, estimated adjudication within 14 business days."
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmManualSubmission}
                className="px-5 py-2.5 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Confirm &amp; Record Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
