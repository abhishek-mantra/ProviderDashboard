import { useState, useEffect } from "react";
import {
  X,
  Building2,
  User,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import type { MockClient, ClientInsuranceRecord } from "../types/partnerDashboard";

// Standard National Healthcare Payers with Electronic IDs (Stedi Payer Network)
export const POPULAR_PAYERS = [
  { name: "UnitedHealthcare", payerId: "87726" },
  { name: "Aetna", payerId: "60054" },
  { name: "Blue Cross Blue Shield", payerId: "BCBS" },
  { name: "Cigna", payerId: "62308" },
  { name: "Medicare (CMS)", payerId: "CMS" },
  { name: "Humana", payerId: "61101" },
  { name: "Kaiser Permanente", payerId: "94123" },
  { name: "Tricare", payerId: "TRICARE" },
  { name: "State Medicaid", payerId: "MCD" },
];

interface AddInsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: MockClient;
  editingPolicy?: ClientInsuranceRecord | null;
  onSaveSuccess?: (savedPolicy: ClientInsuranceRecord) => void;
}

export function AddInsuranceModal({
  isOpen,
  onClose,
  client,
  editingPolicy,
  onSaveSuccess,
}: AddInsuranceModalProps) {
  const { setClients } = usePartnerDashboard();

  // Form State
  const [insuranceType, setInsuranceType] = useState<"primary" | "secondary" | "other">("primary");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [payerId, setPayerId] = useState("87726");
  const [memberId, setMemberId] = useState("");
  const [groupId, setGroupId] = useState("");

  // Subscriber Demographics
  const [relationship, setRelationship] = useState<"self" | "spouse" | "child" | "other">("self");
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberDob, setSubscriberDob] = useState("");
  const [subscriberGender, setSubscriberGender] = useState<"male" | "female" | "other" | "">("female");
  const [subscriberStreet, setSubscriberStreet] = useState("");
  const [subscriberCity, setSubscriberCity] = useState("");
  const [subscriberState, setSubscriberState] = useState("");
  const [subscriberZip, setSubscriberZip] = useState("");

  // Card Uploads
  const [insuranceCardFront, setInsuranceCardFront] = useState<File | null>(null);
  const [insuranceCardBack, setInsuranceCardBack] = useState<File | null>(null);

  // Initialize or reset form on open / edit
  useEffect(() => {
    if (!isOpen) return;

    if (editingPolicy) {
      setInsuranceType(editingPolicy.type);
      setInsuranceCompany(editingPolicy.payerName);
      setPayerId(editingPolicy.payerId || "");
      setMemberId(editingPolicy.memberId);
      setGroupId(editingPolicy.groupId || "");
      setRelationship(editingPolicy.relationship || "self");
      setSubscriberName(editingPolicy.policyHolderName || client?.name || "");
      setSubscriberDob(editingPolicy.subscriberDob || "1992-04-15");
      setSubscriberGender(editingPolicy.subscriberGender || "female");
      setSubscriberStreet(editingPolicy.subscriberStreet || client?.address || "");
      setSubscriberCity(editingPolicy.subscriberCity || "");
      setSubscriberState(editingPolicy.subscriberState || "");
      setSubscriberZip(editingPolicy.subscriberZip || "");
    } else {
      const isFirst = !client?.insuranceCompany && (!client?.insuranceRecords || client.insuranceRecords.length === 0);
      setInsuranceType(isFirst ? "primary" : "secondary");
      setInsuranceCompany("");
      setPayerId("");
      setMemberId("");
      setGroupId("");
      setRelationship("self");
      setSubscriberName(client?.name || "");
      setSubscriberDob("1992-04-15");
      setSubscriberGender("female");
      setSubscriberStreet(client?.address || "");
      setSubscriberCity("New York");
      setSubscriberState("NY");
      setSubscriberZip("10001");
    }
    setInsuranceCardFront(null);
    setInsuranceCardBack(null);
  }, [isOpen, editingPolicy, client]);

  if (!isOpen) return null;

  const handleSelectCarrier = (carrierName: string, carrierPayerId: string) => {
    setInsuranceCompany(carrierName);
    setPayerId(carrierPayerId);
  };

  const handleRelationshipChange = (rel: "self" | "spouse" | "child" | "other") => {
    setRelationship(rel);
    if (rel === "self" && client) {
      setSubscriberName(client.name);
      setSubscriberStreet(client.address || "");
    } else if (rel !== "self" && subscriberName === client?.name) {
      setSubscriberName("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!insuranceCompany.trim() || !memberId.trim()) {
      alert("Please provide both the Insurance Carrier and Member ID.");
      return;
    }

    const updatedRecord: ClientInsuranceRecord = {
      id: editingPolicy ? editingPolicy.id : `pol-${Date.now()}`,
      type: insuranceType,
      payerName: insuranceCompany.trim(),
      payerId: payerId.trim() || "87726",
      memberId: memberId.trim(),
      groupId: groupId.trim() || undefined,
      policyHolder: relationship === "self" ? "client" : (relationship as any),
      policyHolderName: subscriberName.trim() || client?.name || "Client",
      relationship,
      subscriberDob: subscriberDob || undefined,
      subscriberGender: subscriberGender || undefined,
      subscriberStreet: subscriberStreet.trim() || undefined,
      subscriberCity: subscriberCity.trim() || undefined,
      subscriberState: subscriberState.trim() || undefined,
      subscriberZip: subscriberZip.trim() || undefined,
      copayAmount: editingPolicy?.copayAmount ?? 0,
      coinsuranceRate: editingPolicy?.coinsuranceRate ?? 0,
      deductible: editingPolicy?.deductible ?? "$0",
      status: "pending_verification",
      eligibilityDetails: editingPolicy?.eligibilityDetails,
    };

    if (client) {
      setClients((prev) =>
        prev.map((c) => {
          if (c.id !== client.id) return c;
          const currentRecords = c.insuranceRecords || [];
          let nextRecords: ClientInsuranceRecord[] = [];
          if (editingPolicy) {
            nextRecords = currentRecords.map((r) => (r.id === editingPolicy.id ? updatedRecord : r));
          } else {
            if (insuranceType === "primary") {
              nextRecords = [
                updatedRecord,
                ...currentRecords.map((r) => (r.type === "primary" ? { ...r, type: "secondary" as const } : r)),
              ];
            } else {
              nextRecords = [...currentRecords, updatedRecord];
            }
          }

          const primaryPolicy = nextRecords.find((p) => p.type === "primary") || nextRecords[0];
          const secondaryNames = nextRecords.filter((p) => p.id !== primaryPolicy?.id).map((p) => p.payerName);

          return {
            ...c,
            insuranceCompany: primaryPolicy?.payerName || "",
            insurances: secondaryNames,
            memberId: primaryPolicy?.memberId || c.memberId,
            copayAmount: primaryPolicy?.copayAmount ?? c.copayAmount,
            coinsuranceRate: primaryPolicy?.coinsuranceRate ?? c.coinsuranceRate,
            insuranceRecords: nextRecords,
          };
        })
      );
    }

    if (onSaveSuccess) {
      onSaveSuccess(updatedRecord);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-6 my-8 animate-scale-up">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {editingPolicy ? "Edit Insurance Policy" : "Add Insurance Policy"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {client?.name ? `${client.name} · ` : ""}Enter carrier & subscriber information
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: Carrier & Payer Identification */}
          <div className="bg-gray-50/70 dark:bg-gray-750/40 border border-gray-200/70 dark:border-gray-700/70 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-[#043570] dark:text-[#00c0ff]" />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  1. Carrier & Identification
                </h4>
              </div>
              <span className="text-[10px] text-gray-400">Electronic Routing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Carrier Name */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Insurance Carrier / Payer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={insuranceCompany}
                  onChange={(e) => setInsuranceCompany(e.target.value)}
                  placeholder="e.g. UnitedHealthcare, Aetna, Cigna, Medicare"
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                />

                {/* Quick Selection Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] text-gray-400 font-medium">Quick select:</span>
                  {POPULAR_PAYERS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => handleSelectCarrier(p.name, p.payerId)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all cursor-pointer ${
                        insuranceCompany === p.name
                          ? "bg-blue-100 text-[#043570] border-blue-300 dark:bg-blue-900/40 dark:text-[#00c0ff] dark:border-blue-700"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Electronic Payer ID */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Electronic Payer ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={payerId}
                  onChange={(e) => setPayerId(e.target.value)}
                  placeholder="e.g. 87726, 60054"
                  required
                  className="w-full px-3 py-2 font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                />
              </div>

              {/* Member ID */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Member / Subscriber ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  placeholder="e.g. UHC-482-7731"
                  required
                  className="w-full px-3 py-2 font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                />
              </div>

              {/* Group Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Group Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  placeholder="e.g. GRP-90214"
                  className="w-full px-3 py-2 font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                />
              </div>

              {/* Policy Priority */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Policy Priority <span className="text-red-500">*</span>
                </label>
                <select
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570] cursor-pointer"
                >
                  <option value="primary">Primary Insurance</option>
                  <option value="secondary">Secondary Insurance</option>
                  <option value="other">Tertiary / Specialty</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Policyholder Demographics */}
          <div className="bg-gray-50/70 dark:bg-gray-750/40 border border-gray-200/70 dark:border-gray-700/70 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="size-4 text-[#043570] dark:text-[#00c0ff]" />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  2. Policyholder / Subscriber Demographics
                </h4>
              </div>
              <span className="text-[10px] text-gray-400">Required for 270 Eligibility</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Relationship */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <select
                  value={relationship}
                  onChange={(e) => handleRelationshipChange(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570] cursor-pointer"
                >
                  <option value="self">Self (Client)</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child / Dependent</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Subscriber Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Subscriber Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subscriberName}
                  onChange={(e) => setSubscriberName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                />
              </div>

              {/* Subscriber DOB */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Subscriber DOB <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={subscriberDob}
                  onChange={(e) => setSubscriberDob(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                />
              </div>

              {/* Subscriber Gender */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Subscriber Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={subscriberGender}
                  onChange={(e) => setSubscriberGender(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570] cursor-pointer"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other / Unspecified</option>
                </select>
              </div>

              {/* Address Fields (Conditional for non-self) */}
              {relationship !== "self" && (
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Subscriber Address
                    </label>
                    <input
                      type="text"
                      value={subscriberStreet}
                      onChange={(e) => setSubscriberStreet(e.target.value)}
                      placeholder="e.g. 123 Main St"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      City, State, ZIP
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={subscriberCity}
                        onChange={(e) => setSubscriberCity(e.target.value)}
                        placeholder="City"
                        className="w-1/2 px-2 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={subscriberState}
                        onChange={(e) => setSubscriberState(e.target.value)}
                        placeholder="ST"
                        maxLength={2}
                        className="w-1/4 px-2 py-2 text-center uppercase bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={subscriberZip}
                        onChange={(e) => setSubscriberZip(e.target.value)}
                        placeholder="ZIP"
                        maxLength={5}
                        className="w-1/4 px-2 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Digital Insurance Cards */}
          <div className="bg-gray-50/70 dark:bg-gray-750/40 border border-gray-200/70 dark:border-gray-700/70 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center gap-2">
              <Upload className="size-4 text-[#043570] dark:text-[#00c0ff]" />
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                3. Digital Insurance Cards (Front & Back)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Front Card */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Insurance Card (Front)
                </label>
                <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white dark:bg-gray-800">
                  <Upload className="size-5 text-gray-400 mb-1" />
                  <span className="text-xs font-bold text-[#043570] dark:text-[#00c0ff]">
                    {insuranceCardFront ? insuranceCardFront.name : "Upload front photo / PDF"}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, PDF up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setInsuranceCardFront(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Back Card */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Insurance Card (Back)
                </label>
                <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white dark:bg-gray-800">
                  <Upload className="size-5 text-gray-400 mb-1" />
                  <span className="text-xs font-bold text-[#043570] dark:text-[#00c0ff]">
                    {insuranceCardBack ? insuranceCardBack.name : "Upload back photo / PDF"}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, PDF up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setInsuranceCardBack(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              {editingPolicy ? "Save Changes" : "Save Insurance Policy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
