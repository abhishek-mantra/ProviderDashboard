import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ArrowLeft, Download } from "lucide-react";
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
    const dueVal = targetBill?.insuranceOwed || (totalAmountVal - clientPaidVal > 0 ? totalAmountVal - clientPaidVal : 90);

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
      patientAddress: "742 Evergreen Terrace",
      patientCity: "San Francisco",
      patientState: "CA",
      patientZip: "94105",
      patientPhone: "+1 (555) 234-5678",
      patientRelationship: "Self",
      insuredAddress: "742 Evergreen Terrace",
      insuredCity: "San Francisco",
      insuredState: "CA",
      insuredZip: "94105",
      insuredPhone: "+1 (555) 234-5678",
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
    if (rawClaim) {
      updateClaim(rawClaim.id, { serviceLines: rawClaim.serviceLines.map((sl, i) => ({
        ...sl,
        serviceCode: data.serviceLines[i]?.cpt || sl.serviceCode,
        chargeAmount: parseFloat(data.serviceLines[i]?.charges?.replace("$", "") || String(sl.chargeAmount)),
      }))});
    }
    window.print();
  };

  // Persist edits back to the claim so corrections made on the CMS-1500 are not lost.
  const handleSaveEdits = () => {
    if (!rawClaim) return;
    updateClaim(rawClaim.id, {
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
  };

  const handleBack = useGoBack(rawClaim ? `/claims/${rawClaim.id}` : "/billing");

  const inputClass = "w-full px-1.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4169E1]";
  const cellClass = "text-[9px] font-semibold text-[#0a0a0a] dark:text-gray-200 mb-0.5";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3">
          <button onClick={handleBack} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">CMS-1500 Health Insurance Claim Form</h1>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">CMS-1500 Health Insurance Claim Form</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{rawClaim?.claimNumber || "Claim #"}</span>
                {rawClaim?.payerName && (
                  <span className="px-3 py-1 bg-[#364153] text-white text-xs font-medium rounded">{rawClaim.payerName}</span>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Row 1: Box 1 + Insurance Checkboxes + Box 1a */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border border-[#d1d5dc] p-2">
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
                <div className="flex gap-2">
                  <div className="flex-1 border border-[#d1d5dc] p-2">
                    <p className={cellClass}>1. MEDICARE MEDICAID TRICARE CHAMPVA GROUP HEALTH PLAN FECA BLK LUNG OTHER</p>
                    <div className="flex gap-3 mt-2">
                      {["Medicare", "Medicaid", "TRICARE"].map((t) => (
                        <label key={t} className="flex items-center gap-1">
                          <input type="checkbox" checked={data.insuranceType.includes(t)} onChange={(e) => {
                            const next = e.target.checked
                              ? [...data.insuranceType, t]
                              : data.insuranceType.filter((x) => x !== t);
                            updateField("insuranceType", next);
                          }} className="size-3" />
                          <span className="text-xs">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 border border-[#d1d5dc] p-2">
                    <p className={cellClass}>1a. INSURED'S I.D. NUMBER</p>
                    <input value={data.insuredIdNumber} onChange={(e) => updateField("insuredIdNumber", e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Row 2: Boxes 2-4 */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>2. PATIENT'S NAME</p>
                  <input value={data.patientLastName} onChange={(e) => updateField("patientLastName", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="Last name" />
                  <input value={data.patientFirstName} onChange={(e) => updateField("patientFirstName", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="First name" />
                  <input value={data.patientMiddleName} onChange={(e) => updateField("patientMiddleName", e.target.value)} className={inputClass} placeholder="Middle name" />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>3. PATIENT'S BIRTH DATE</p>
                  <div className="flex gap-1 mb-1">
                    <input value={data.patientBirthMM} onChange={(e) => updateField("patientBirthMM", e.target.value)} className={inputClass} placeholder="MM" />
                    <input value={data.patientBirthDD} onChange={(e) => updateField("patientBirthDD", e.target.value)} className={inputClass} placeholder="DD" />
                    <input value={data.patientBirthYY} onChange={(e) => updateField("patientBirthYY", e.target.value)} className={inputClass} placeholder="YY" />
                  </div>
                  <p className={cellClass}>SEX</p>
                  <div className="flex gap-2">
                    {["M", "F"].map((s) => (
                      <label key={s} className="flex items-center gap-1">
                        <input type="radio" name="patientSex" checked={data.patientSex === s} onChange={() => updateField("patientSex", s)} className="size-3" />
                        <span className="text-xs">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>4. INSURED'S NAME</p>
                  <input value={data.insuredLastName} onChange={(e) => updateField("insuredLastName", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="Last name" />
                  <input value={data.insuredFirstName} onChange={(e) => updateField("insuredFirstName", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="First name" />
                  <input value={data.insuredMiddleName} onChange={(e) => updateField("insuredMiddleName", e.target.value)} className={inputClass} placeholder="Middle" />
                </div>
              </div>

              {/* Row 3: Boxes 5-8 */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>5. PATIENT'S ADDRESS</p>
                  <input value={data.patientAddress} onChange={(e) => updateField("patientAddress", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="Street" />
                  <input value={data.patientCity} onChange={(e) => updateField("patientCity", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="City" />
                  <div className="flex gap-1 mb-1">
                    <input value={data.patientState} onChange={(e) => updateField("patientState", e.target.value)} className={inputClass} placeholder="State" />
                    <input value={data.patientZip} onChange={(e) => updateField("patientZip", e.target.value)} className={inputClass} placeholder="ZIP" />
                  </div>
                  <p className={cellClass}>TELEPHONE</p>
                  <input value={data.patientPhone} onChange={(e) => updateField("patientPhone", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>6. PATIENT RELATIONSHIP TO INSURED</p>
                  {["Self", "Spouse", "Child", "Other"].map((r) => (
                    <label key={r} className="flex items-center gap-1">
                      <input type="radio" name="relationship" checked={data.patientRelationship === r} onChange={() => updateField("patientRelationship", r)} className="size-3" />
                      <span className="text-xs">{r}</span>
                    </label>
                  ))}
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>7. INSURED'S ADDRESS</p>
                  <input value={data.insuredAddress} onChange={(e) => updateField("insuredAddress", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="Street" />
                  <input value={data.insuredCity} onChange={(e) => updateField("insuredCity", e.target.value)} className={`${inputClass} mb-0.5`} placeholder="City" />
                  <div className="flex gap-1 mb-1">
                    <input value={data.insuredState} onChange={(e) => updateField("insuredState", e.target.value)} className={inputClass} placeholder="State" />
                    <input value={data.insuredZip} onChange={(e) => updateField("insuredZip", e.target.value)} className={inputClass} placeholder="ZIP" />
                  </div>
                  <p className={cellClass}>TELEPHONE</p>
                  <input value={data.insuredPhone} onChange={(e) => updateField("insuredPhone", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>8. RESERVED FOR NUCC USE</p>
                </div>
              </div>

              {/* Row 4: Boxes 9-13 */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-[#d1d5dc] p-2">
                    <p className={cellClass}>9. OTHER INSURED'S NAME</p>
                    <input value={data.otherInsuredName} onChange={(e) => updateField("otherInsuredName", e.target.value)} className={`${inputClass} mb-0.5`} />
                    <p className={cellClass}>a. OTHER INSURED'S POLICY OR GROUP NUMBER</p>
                    <input value={data.otherInsuredPolicy} onChange={(e) => updateField("otherInsuredPolicy", e.target.value)} className={`${inputClass} mb-0.5`} />
                    <p className={cellClass}>b. RESERVED FOR NUCC USE</p>
                    <p className={cellClass}>c. RESERVED FOR NUCC USE</p>
                    <p className={cellClass}>d. INSURANCE PLAN NAME OR PROGRAM NAME</p>
                    <input value={data.otherInsuredPlanName} onChange={(e) => updateField("otherInsuredPlanName", e.target.value)} className={inputClass} />
                  </div>
                  <div className="border border-[#d1d5dc] p-2">
                    <p className={cellClass}>10. IS PATIENT'S CONDITION RELATED TO:</p>
                    <div className="mt-1">
                      <p className={cellClass}>a. EMPLOYMENT? (Current or Previous)</p>
                      <div className="flex gap-2">
                        {["YES", "NO"].map((v) => (
                          <label key={v} className="flex items-center gap-1">
                            <input type="radio" name="employment" checked={data.conditionEmployment === v} onChange={() => updateField("conditionEmployment", v)} className="size-3" />
                            <span className="text-xs">{v}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className={cellClass}>b. AUTO ACCIDENT?</p>
                      <div className="flex gap-2 items-center">
                        {["YES", "NO"].map((v) => (
                          <label key={v} className="flex items-center gap-1">
                            <input type="radio" name="auto" checked={data.conditionAuto === v} onChange={() => updateField("conditionAuto", v)} className="size-3" />
                            <span className="text-xs">{v}</span>
                          </label>
                        ))}
                        <span className="text-[9px] ml-1">PLACE (State)</span>
                        <input value={data.conditionAutoState} onChange={(e) => updateField("conditionAutoState", e.target.value)} className="w-12 border border-[#d1d5dc] h-5 text-[9px] px-0.5" />
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className={cellClass}>c. OTHER ACCIDENT?</p>
                      <div className="flex gap-2">
                        {["YES", "NO"].map((v) => (
                          <label key={v} className="flex items-center gap-1">
                            <input type="radio" name="other" checked={data.conditionOther === v} onChange={() => updateField("conditionOther", v)} className="size-3" />
                            <span className="text-xs">{v}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <p className={cellClass}>d. CLAIM CODES (Designated by NUCC)</p>
                    <input value={data.claimCodes} onChange={(e) => updateField("claimCodes", e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-[#d1d5dc] p-2">
                    <p className={cellClass}>11. INSURED'S POLICY GROUP OR FECA NUMBER</p>
                    <input value={data.insuredPolicyGroup} onChange={(e) => updateField("insuredPolicyGroup", e.target.value)} className={inputClass} />
                    <p className={cellClass}>a. INSURED'S DATE OF BIRTH</p>
                    <div className="flex gap-1 mb-1">
                      <input value={data.insuredDobMM} onChange={(e) => updateField("insuredDobMM", e.target.value)} className={inputClass} placeholder="MM" />
                      <input value={data.insuredDobDD} onChange={(e) => updateField("insuredDobDD", e.target.value)} className={inputClass} placeholder="DD" />
                      <input value={data.insuredDobYY} onChange={(e) => updateField("insuredDobYY", e.target.value)} className={inputClass} placeholder="YY" />
                    </div>
                    <div className="flex gap-2">
                      {["M", "F"].map((s) => (
                        <label key={s} className="flex items-center gap-1">
                          <input type="radio" name="insuredSex" checked={data.insuredSex === s} onChange={() => updateField("insuredSex", s)} className="size-3" />
                          <span className="text-xs">{s}</span>
                        </label>
                      ))}
                    </div>
                    <p className={cellClass}>b. OTHER CLAIM ID (Designated by NUCC)</p>
                    <input value={data.otherClaimId} onChange={(e) => updateField("otherClaimId", e.target.value)} className={inputClass} />
                    <p className={cellClass}>c. INSURANCE PLAN NAME OR PROGRAM NAME</p>
                    <input value={data.insurancePlanName} onChange={(e) => updateField("insurancePlanName", e.target.value)} className={inputClass} />
                    <p className={cellClass}>d. IS THERE ANOTHER HEALTH BENEFIT PLAN?</p>
                    <div className="flex gap-2">
                      {["YES", "NO"].map((v) => (
                        <label key={v} className="flex items-center gap-1">
                          <input type="radio" name="benefit" checked={data.anotherHealthPlan === v} onChange={() => updateField("anotherHealthPlan", v)} className="size-3" />
                          <span className="text-xs">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    <div className="border border-[#d1d5dc] p-2">
                      <p className={cellClass}>12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE</p>
                      <p className="text-[8px] text-gray-600 leading-tight mb-1">I authorize the release of any medical or other information necessary to process this claim.</p>
                      <input value={data.patientSignature} onChange={(e) => updateField("patientSignature", e.target.value)} className={inputClass} placeholder="Signature" />
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[8px]">Date</span>
                        <input value={data.patientSignatureDate} onChange={(e) => updateField("patientSignatureDate", e.target.value)} className="flex-1 border-b border-[#d1d5dc] h-5 text-[9px] px-0.5" />
                      </div>
                    </div>
                    <div className="border border-[#d1d5dc] p-2">
                      <p className={cellClass}>13. INSURED'S OR AUTHORIZED PERSON'S SIGNATURE</p>
                      <p className="text-[8px] text-gray-600 leading-tight mb-1">I authorize payment of medical benefits to the undersigned physician or supplier for services described below.</p>
                      <input value={data.insuredSignature} onChange={(e) => updateField("insuredSignature", e.target.value)} className={inputClass} placeholder="Signature" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Boxes 14-18 */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>14. DATE OF CURRENT ILLNESS, INJURY, or PREGNANCY (LMP)</p>
                  <div className="flex gap-1 items-center mb-1">
                    <input value={data.dateCurrentIllnessMM} onChange={(e) => updateField("dateCurrentIllnessMM", e.target.value)} className={inputClass} placeholder="MM" />
                    <input value={data.dateCurrentIllnessDD} onChange={(e) => updateField("dateCurrentIllnessDD", e.target.value)} className={inputClass} placeholder="DD" />
                    <input value={data.dateCurrentIllnessYY} onChange={(e) => updateField("dateCurrentIllnessYY", e.target.value)} className={inputClass} placeholder="YY" />
                  </div>
                  <p className="text-[8px] text-gray-600">QUAL.</p>
                  <input value={data.dateCurrentIllnessQual} onChange={(e) => updateField("dateCurrentIllnessQual", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>15. OTHER DATE</p>
                  <div className="flex gap-1 items-center mb-1">
                    <input value={data.otherDateMM} onChange={(e) => updateField("otherDateMM", e.target.value)} className={inputClass} placeholder="MM" />
                    <input value={data.otherDateDD} onChange={(e) => updateField("otherDateDD", e.target.value)} className={inputClass} placeholder="DD" />
                    <input value={data.otherDateYY} onChange={(e) => updateField("otherDateYY", e.target.value)} className={inputClass} placeholder="YY" />
                  </div>
                  <p className="text-[8px] text-gray-600">QUAL.</p>
                  <input value={data.otherDateQual} onChange={(e) => updateField("otherDateQual", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION</p>
                  <div className="space-y-1">
                    <div className="flex gap-1 items-center">
                      <span className="text-[8px]">FROM</span>
                      <input value={data.unableToWorkFromMM} onChange={(e) => updateField("unableToWorkFromMM", e.target.value)} className={inputClass} placeholder="MM" />
                      <input value={data.unableToWorkFromDD} onChange={(e) => updateField("unableToWorkFromDD", e.target.value)} className={inputClass} placeholder="DD" />
                      <input value={data.unableToWorkFromYY} onChange={(e) => updateField("unableToWorkFromYY", e.target.value)} className={inputClass} placeholder="YY" />
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-[8px]">TO</span>
                      <input value={data.unableToWorkToMM} onChange={(e) => updateField("unableToWorkToMM", e.target.value)} className={inputClass} placeholder="MM" />
                      <input value={data.unableToWorkToDD} onChange={(e) => updateField("unableToWorkToDD", e.target.value)} className={inputClass} placeholder="DD" />
                      <input value={data.unableToWorkToYY} onChange={(e) => updateField("unableToWorkToYY", e.target.value)} className={inputClass} placeholder="YY" />
                    </div>
                  </div>
                </div>
                <div className="col-span-2 border border-[#d1d5dc] p-2">
                  <p className={cellClass}>17. NAME OF REFERRING PROVIDER OR OTHER SOURCE</p>
                  <input value={data.referringProvider} onChange={(e) => updateField("referringProvider", e.target.value)} className={inputClass} />
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">17a. ID NUMBER OF REFERRING PHYSICIAN</p>
                      <input value={data.referringProviderNpi} onChange={(e) => updateField("referringProviderNpi", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">17b.</p>
                      <input value={data.referringProviderOther} onChange={(e) => updateField("referringProviderOther", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>18. HOSPITALIZATION DATES RELATED TO CURRENT SERVICES</p>
                  <div className="space-y-1">
                    <div className="flex gap-1 items-center">
                      <span className="text-[8px]">FROM</span>
                      <input value={data.hospitalizationFromMM} onChange={(e) => updateField("hospitalizationFromMM", e.target.value)} className={inputClass} placeholder="MM" />
                      <input value={data.hospitalizationFromDD} onChange={(e) => updateField("hospitalizationFromDD", e.target.value)} className={inputClass} placeholder="DD" />
                      <input value={data.hospitalizationFromYY} onChange={(e) => updateField("hospitalizationFromYY", e.target.value)} className={inputClass} placeholder="YY" />
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-[8px]">TO</span>
                      <input value={data.hospitalizationToMM} onChange={(e) => updateField("hospitalizationToMM", e.target.value)} className={inputClass} placeholder="MM" />
                      <input value={data.hospitalizationToDD} onChange={(e) => updateField("hospitalizationToDD", e.target.value)} className={inputClass} placeholder="DD" />
                      <input value={data.hospitalizationToYY} onChange={(e) => updateField("hospitalizationToYY", e.target.value)} className={inputClass} placeholder="YY" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 6: Boxes 19-23 */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)</p>
                  <textarea value={data.additionalClaimInfo} onChange={(e) => updateField("additionalClaimInfo", e.target.value)} className={`${inputClass} h-10 resize-none`} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>20. OUTSIDE LAB?</p>
                  <div className="flex gap-2 items-center">
                    {["YES", "NO"].map((v) => (
                      <label key={v} className="flex items-center gap-1">
                        <input type="radio" name="outsideLab" checked={data.outsideLab === v} onChange={() => updateField("outsideLab", v)} className="size-3" />
                        <span className="text-xs">{v}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-[8px] text-gray-600 mt-1 mb-0.5">$ CHARGES</p>
                  <input value={data.outsideLabCharges} onChange={(e) => updateField("outsideLabCharges", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY</p>
                  <div className="grid grid-cols-4 gap-1">
                    {(["A", "B", "C", "D", "E", "F", "G", "H"] as const).map((letter, i) => {
                      const key = `diagnosis${letter}` as keyof CMS1500Data;
                      return (
                        <div key={letter} className="flex items-center gap-0.5">
                          <span className="text-[8px]">{letter}.</span>
                          <input value={data[key] as string} onChange={(e) => updateField(key, e.target.value as any)} className="w-full border border-[#d1d5dc] h-4 text-[8px] px-0.5" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-2">
                  <div className="border border-[#d1d5dc] p-2">
                    <p className={cellClass}>22. RESUBMISSION CODE</p>
                    <input value={data.resubmissionCode} onChange={(e) => updateField("resubmissionCode", e.target.value)} className={inputClass} />
                    <p className="text-[8px] text-gray-600 mt-0.5">ORIGINAL REF. NO.</p>
                    <input value={data.originalRefNo} onChange={(e) => updateField("originalRefNo", e.target.value)} className={inputClass} />
                  </div>
                  <div className="border border-[#d1d5dc] p-2">
                    <p className={cellClass}>23. PRIOR AUTHORIZATION NUMBER</p>
                    <input value={data.priorAuthNumber} onChange={(e) => updateField("priorAuthNumber", e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Row 7: Service Lines (Box 24) */}
              <div className="border border-[#d1d5dc] mb-2">
                <div className="grid grid-cols-12 gap-px bg-[#d1d5dc]">
                  <div className="col-span-2 bg-white p-1"><p className="text-[8px] font-semibold text-center">A. DATE(S) OF SERVICE<br/><span className="text-[7px]">From | To</span></p></div>
                  <div className="bg-white p-1"><p className="text-[8px] font-semibold text-center">B. POS</p></div>
                  <div className="bg-white p-1"><p className="text-[8px] font-semibold text-center">C. EMG</p></div>
                  <div className="col-span-2 bg-white p-1"><p className="text-[8px] font-semibold text-center">D. CPT/HCPCS | MOD</p></div>
                  <div className="bg-white p-1"><p className="text-[8px] font-semibold text-center">E. DIAG</p></div>
                  <div className="bg-white p-1"><p className="text-[8px] font-semibold text-center">F. $</p></div>
                  <div className="bg-white p-1"><p className="text-[8px] font-semibold text-center">G. UNITS</p></div>
                  <div className="bg-white p-1"><p className="text-[8px] font-semibold text-center">H. EPSDT</p></div>
                  <div className="bg-white p-1"><p className="text-[8px] font-semibold text-center">I. QUAL</p></div>
                  <div className="col-span-2 bg-white p-1"><p className="text-[8px] font-semibold text-center">J. RENDERING NPI</p></div>
                </div>
                {Array.from({ length: 6 }).map((_, line) => (
                  <div key={line} className="grid grid-cols-12 gap-px bg-[#d1d5dc] border-t border-[#d1d5dc]">
                    <div className="col-span-2 bg-white p-0.5 flex gap-px">
                      <input value={data.serviceLines[line].dateFrom} onChange={(e) => updateServiceLine(line, "dateFrom", e.target.value)} className="w-1/2 border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" placeholder="From" />
                      <input value={data.serviceLines[line].dateTo} onChange={(e) => updateServiceLine(line, "dateTo", e.target.value)} className="w-1/2 border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" placeholder="To" />
                    </div>
                    <div className="bg-white p-0.5"><input value={data.serviceLines[line].placeOfService} onChange={(e) => updateServiceLine(line, "placeOfService", e.target.value)} className="w-full border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" /></div>
                    <div className="bg-white p-0.5"><input value={data.serviceLines[line].emg} onChange={(e) => updateServiceLine(line, "emg", e.target.value)} className="w-full border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" /></div>
                    <div className="col-span-2 bg-white p-0.5 flex gap-px">
                      <input value={data.serviceLines[line].cpt} onChange={(e) => updateServiceLine(line, "cpt", e.target.value)} className="flex-1 border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" placeholder="CPT" />
                      <input value={data.serviceLines[line].modifier} onChange={(e) => updateServiceLine(line, "modifier", e.target.value)} className="w-6 border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" placeholder="Mod" />
                    </div>
                    <div className="bg-white p-0.5"><input value={data.serviceLines[line].diagnosisPointer} onChange={(e) => updateServiceLine(line, "diagnosisPointer", e.target.value)} className="w-full border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" /></div>
                    <div className="bg-white p-0.5"><input value={data.serviceLines[line].charges} onChange={(e) => updateServiceLine(line, "charges", e.target.value)} className="w-full border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" /></div>
                    <div className="bg-white p-0.5"><input value={data.serviceLines[line].daysUnits} onChange={(e) => updateServiceLine(line, "daysUnits", e.target.value)} className="w-full border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" /></div>
                    <div className="bg-white p-0.5"><input value={data.serviceLines[line].epsdt} onChange={(e) => updateServiceLine(line, "epsdt", e.target.value)} className="w-full border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" /></div>
                    <div className="bg-white p-0.5"><input value={data.serviceLines[line].idQual} onChange={(e) => updateServiceLine(line, "idQual", e.target.value)} className="w-full border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" /></div>
                    <div className="col-span-2 bg-white p-0.5 flex gap-px">
                      <input value={data.serviceLines[line].renderingNpi} onChange={(e) => updateServiceLine(line, "renderingNpi", e.target.value)} className="flex-1 border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" placeholder="NPI" />
                      <input value={data.serviceLines[line].renderingOther} onChange={(e) => updateServiceLine(line, "renderingOther", e.target.value)} className="flex-1 border-b border-[#d1d5dc] h-5 text-[8px] px-0.5" placeholder="Other ID" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 8: Boxes 25-30 */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>25. FEDERAL TAX I.D. NUMBER</p>
                  <div className="flex items-center gap-2 mb-1">
                    <input value={data.federalTaxId} onChange={(e) => updateField("federalTaxId", e.target.value)} className="flex-1 border border-[#d1d5dc] h-5 text-[9px] px-1" />
                  </div>
                  <div className="flex gap-2">
                    {["SSN", "EIN"].map((t) => (
                      <label key={t} className="flex items-center gap-0.5">
                        <input type="radio" name="taxType" checked={data.taxType === t} onChange={() => updateField("taxType", t)} className="size-2.5" />
                        <span className="text-[8px]">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>26. PATIENT'S ACCOUNT NO.</p>
                  <input value={data.patientAccountNo} onChange={(e) => updateField("patientAccountNo", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>27. ACCEPT ASSIGNMENT?</p>
                  <div className="flex gap-2">
                    {["YES", "NO"].map((v) => (
                      <label key={v} className="flex items-center gap-1">
                        <input type="radio" name="assignment" checked={data.acceptAssignment === v} onChange={() => updateField("acceptAssignment", v)} className="size-3" />
                        <span className="text-xs">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>28. TOTAL CHARGE</p>
                  <input value={data.totalCharge} onChange={(e) => updateField("totalCharge", e.target.value)} className={inputClass} />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>29. AMOUNT PAID</p>
                  <input value={data.amountPaid} onChange={(e) => updateField("amountPaid", e.target.value)} className={inputClass} placeholder="$" />
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>30. RSVD FOR NUCC USE</p>
                </div>
              </div>

              {/* Row 9: Boxes 31-33 */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>31. SIGNATURE OF PHYSICIAN OR SUPPLIER</p>
                  <p className="text-[8px] text-gray-600 mb-0.5">I certify that the statements on the reverse apply to this bill.</p>
                  <input value={data.signaturePhysician} onChange={(e) => updateField("signaturePhysician", e.target.value)} className={inputClass} placeholder="Signature" />
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[8px]">DATE</span>
                    <input value={data.signatureDate} onChange={(e) => updateField("signatureDate", e.target.value)} className="flex-1 border-b border-[#d1d5dc] h-5 text-[9px] px-0.5" />
                  </div>
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>32. SERVICE FACILITY LOCATION INFORMATION</p>
                  <input value={data.serviceFacilityName} onChange={(e) => updateField("serviceFacilityName", e.target.value)} className={`${inputClass} mb-0.5`} />
                  <input value={data.serviceFacilityAddress} onChange={(e) => updateField("serviceFacilityAddress", e.target.value)} className={`${inputClass} mb-0.5`} />
                  <input value={data.serviceFacilityCityState} onChange={(e) => updateField("serviceFacilityCityState", e.target.value)} className={`${inputClass} mb-1`} />
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">a. NPI</p>
                      <input value={data.serviceFacilityNpi} onChange={(e) => updateField("serviceFacilityNpi", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">b. Other ID</p>
                      <input value={data.serviceFacilityOtherId} onChange={(e) => updateField("serviceFacilityOtherId", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
                <div className="border border-[#d1d5dc] p-2">
                  <p className={cellClass}>33. BILLING PROVIDER INFO & PH #</p>
                  <input value={data.billingProviderName} onChange={(e) => updateField("billingProviderName", e.target.value)} className={`${inputClass} mb-0.5 font-bold`} />
                  <input value={data.billingProviderAddress} onChange={(e) => updateField("billingProviderAddress", e.target.value)} className={`${inputClass} mb-0.5`} />
                  <input value={data.billingProviderCityState} onChange={(e) => updateField("billingProviderCityState", e.target.value)} className={`${inputClass} mb-0.5`} />
                  <input value={data.billingProviderPhone} onChange={(e) => updateField("billingProviderPhone", e.target.value)} className={`${inputClass} mb-1`} />
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">a. NPI</p>
                      <input value={data.billingProviderNpi} onChange={(e) => updateField("billingProviderNpi", e.target.value)} className={`${inputClass} font-mono`} />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">b. Other ID</p>
                      <input value={data.billingProviderOtherId} onChange={(e) => updateField("billingProviderOtherId", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <p className="text-[9px] text-gray-500 dark:text-gray-400">NUCC Instruction Manual available at: www.nucc.org<br />OMB APPROVAL PENDING</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <button onClick={handleBack} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Back to Claim Details
              </button>
              <div className="flex items-center gap-3">
                <button onClick={handleSaveEdits} className="flex items-center gap-2 px-6 py-2.5 bg-[#043570] hover:bg-[#032554] text-white rounded-xl font-medium transition-colors">
                  Save Changes
                </button>
                <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors">
                  <Download className="size-4" />
                  Print / Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
