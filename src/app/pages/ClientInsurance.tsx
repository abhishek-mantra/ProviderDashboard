import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, ShieldCheck, Upload, Eye, Plus, Filter, Calendar, Edit2, Search, X } from "lucide-react";

interface Claim {
  id: string;
  claimId: string;
  dateOfService: string;
  payer: string;
  amountBilled: string;
  clientResponsibility: string;
  status: "paid" | "submitted" | "accepted" | "denied";
  lastUpdated: string;
}

export function ClientInsurance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"insurance" | "claims">("insurance");
  
  // Insurance form state
  const [insuranceType, setInsuranceType] = useState("primary");
  const [policyHolder, setPolicyHolder] = useState("client");
  const [memberName, setMemberName] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [memberId, setMemberId] = useState("");
  const [planId, setPlanId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [copay, setCopay] = useState("0");
  const [deductible, setDeductible] = useState("$0");
  const [effectiveStartDate, setEffectiveStartDate] = useState("");
  const [effectiveEndDate, setEffectiveEndDate] = useState("");
  const [payorPhone, setPayorPhone] = useState("");
  const [insuranceCardFront, setInsuranceCardFront] = useState<File | null>(null);
  const [insuranceCardBack, setInsuranceCardBack] = useState<File | null>(null);

  // Claims filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "submitted" | "accepted" | "denied">("all");
  const [payerFilter, setPayerFilter] = useState<string>("all");

  const claims: Claim[] = [
    {
      id: "001",
      claimId: "CLM-2024-001",
      dateOfService: "Feb 1, 2024",
      payer: "Blue Cross Blue Shield",
      amountBilled: "$150.00",
      clientResponsibility: "$30.00",
      status: "paid",
      lastUpdated: "Feb 15, 2024",
    },
    {
      id: "002",
      claimId: "CLM-2024-002",
      dateOfService: "Feb 8, 2024",
      payer: "Blue Cross Blue Shield",
      amountBilled: "$150.00",
      clientResponsibility: "$30.00",
      status: "submitted",
      lastUpdated: "Feb 9, 2024",
    },
    {
      id: "003",
      claimId: "CLM-2024-003",
      dateOfService: "Feb 15, 2024",
      payer: "Blue Cross Blue Shield",
      amountBilled: "$150.00",
      clientResponsibility: "$30.00",
      status: "accepted",
      lastUpdated: "Feb 16, 2024",
    },
  ];

  const getStatusStyles = (status: Claim["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "submitted":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "accepted":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      case "denied":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  // Get unique payers for filter
  const uniquePayers = Array.from(new Set(claims.map(claim => claim.payer))).sort();

  // Filter claims based on search and filters
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.payer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesPayer = payerFilter === "all" || claim.payer === payerFilter;
    return matchesSearch && matchesStatus && matchesPayer;
  });

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-2 md:p-6">
      <div className="space-y-3 md:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 pb-2 md:pb-4">
        <button
          onClick={() => navigate(`/clients/${id}`)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-5 md:size-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">
          Insurance & Claims - Rachit
        </h1>
      </div>

      {/* Card Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Card Header */}
        <div className="p-3 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 md:size-5 text-[#4169E1]" />
            <h2 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">Insurance & Claims</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex px-2 md:px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("insurance")}
              className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "insurance"
                  ? "border-[#4169E1] text-[#4169E1]"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Insurance Info
            </button>
            <button
              onClick={() => setActiveTab("claims")}
              className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "claims"
                  ? "border-[#4169E1] text-[#4169E1]"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Claims
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-2 md:p-6">
          {activeTab === "insurance" ? (
            // Insurance Info Form
            <div className="space-y-4 md:space-y-8">
              {/* Form Fields in Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Member Name */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Member Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Enter member name"
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white placeholder-gray-400 text-xs md:text-sm"
                  />
                </div>

                {/* Insurance Type */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Insurance Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={insuranceType}
                    onChange={(e) => setInsuranceType(e.target.value)}
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-xs md:text-sm appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.875rem center",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="">Select an option</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Primary Policy Holder */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Primary Policy Holder <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={policyHolder}
                    onChange={(e) => setPolicyHolder(e.target.value)}
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-xs md:text-sm appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.875rem center",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="">Select an option</option>
                    <option value="client">Client</option>
                    <option value="spouse">Client's Spouse</option>
                    <option value="parent">Client's Parent</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Insurance/Companies */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Insurance/Companies <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={insuranceCompany}
                    onChange={(e) => setInsuranceCompany(e.target.value)}
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-xs md:text-sm appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.875rem center",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="">Select an option</option>
                    <option value="blue-cross">Blue Cross Blue Shield</option>
                    <option value="aetna">Aetna</option>
                    <option value="cigna">Cigna</option>
                    <option value="united">United Healthcare</option>
                    <option value="humana">Humana</option>
                  </select>
                </div>

                {/* Member ID */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Member ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="Enter member ID"
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white placeholder-gray-400 text-xs md:text-sm"
                  />
                </div>

                {/* Plan ID */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Plan ID
                  </label>
                  <input
                    type="text"
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    placeholder="Enter plan ID"
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white placeholder-gray-400 text-xs md:text-sm"
                  />
                </div>

                {/* Group ID */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Group ID
                  </label>
                  <input
                    type="text"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    placeholder="Enter group ID"
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white placeholder-gray-400 text-xs md:text-sm"
                  />
                </div>

                {/* Copay/Coinsurance */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Copay/Coinsurance
                  </label>
                  <input
                    type="text"
                    value={copay}
                    onChange={(e) => setCopay(e.target.value)}
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-xs md:text-sm"
                  />
                </div>

                {/* Deductible */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Deductible
                  </label>
                  <input
                    type="text"
                    value={deductible}
                    onChange={(e) => setDeductible(e.target.value)}
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-xs md:text-sm"
                  />
                </div>

                {/* Effective Start Date */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Effective Start Date
                  </label>
                  <input
                    type="date"
                    value={effectiveStartDate}
                    onChange={(e) => setEffectiveStartDate(e.target.value)}
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-xs md:text-sm"
                  />
                </div>

                {/* Effective End Date */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Effective End Date
                  </label>
                  <input
                    type="date"
                    value={effectiveEndDate}
                    onChange={(e) => setEffectiveEndDate(e.target.value)}
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-xs md:text-sm"
                  />
                </div>

                {/* Insurance Payor Phone Number */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                    Insurance Payor Phone Number
                  </label>
                  <input
                    type="tel"
                    value={payorPhone}
                    onChange={(e) => setPayorPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-2.5 md:px-3.5 py-2 md:py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white placeholder-gray-400 text-xs md:text-sm"
                  />
                </div>
              </div>

              {/* Insurance Card (Front) */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                  Insurance Card (Front) <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 md:p-8 text-center hover:border-[#4169E1] transition-colors">
                  <input
                    type="file"
                    id="insurance-front"
                    accept=".pdf,.csv,.xlsx,.docx,.png,.jpg,.jpeg,.txt,.yaml"
                    onChange={(e) => setInsuranceCardFront(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="insurance-front" className="cursor-pointer">
                    <Upload className="size-6 md:size-8 mx-auto mb-2 md:mb-3 text-gray-400" />
                    <p className="text-[#4169E1] font-medium text-xs md:text-sm mb-0.5 md:mb-1">Select File</p>
                    <p className="text-gray-500 text-[10px] md:text-xs">OR Drag & Drop</p>
                    <p className="text-gray-400 text-[9px] md:text-xs mt-1 md:mt-2">Allowed file types: PDF, Excel, CSV, Word, PNG, JPG, Plain-text, YAML</p>
                  </label>
                  {insuranceCardFront && (
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mt-2 md:mt-3">
                      Selected: {insuranceCardFront.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Insurance Card (Back) */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                  Insurance Card (Back) <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 md:p-8 text-center hover:border-[#4169E1] transition-colors">
                  <input
                    type="file"
                    id="insurance-back"
                    accept=".pdf,.csv,.xlsx,.docx,.png,.jpg,.jpeg,.txt,.yaml"
                    onChange={(e) => setInsuranceCardBack(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="insurance-back" className="cursor-pointer">
                    <Upload className="size-6 md:size-8 mx-auto mb-2 md:mb-3 text-gray-400" />
                    <p className="text-[#4169E1] font-medium text-xs md:text-sm mb-0.5 md:mb-1">Select File</p>
                    <p className="text-gray-500 text-[10px] md:text-xs">OR Drag & Drop</p>
                    <p className="text-gray-400 text-[9px] md:text-xs mt-1 md:mt-2">Allowed file types: PDF, Excel, CSV, Word, PNG, JPG, Plain-text, YAML</p>
                  </label>
                  {insuranceCardBack && (
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mt-2 md:mt-3">
                      Selected: {insuranceCardBack.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button className="w-full md:w-auto px-6 md:px-8 py-2 md:py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors text-sm md:text-base">
                  Submit
                </button>
              </div>

              {/* Insurance Records Table */}
              <div className="pt-4 md:pt-8 border-t border-gray-200 dark:border-gray-700">
                {/* Mobile Card View */}
                <div className="md:hidden space-y-2">
                  <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">ID: 1</span>
                      <button className="text-[#4169E1] hover:text-[#3557c7]">
                        <Edit2 className="size-3.5" />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Client:</span>
                        <span className="text-gray-900 dark:text-white font-medium">Sarah Johnson</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Template:</span>
                        <span className="text-gray-600 dark:text-gray-400">Insurance</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                        <span className="text-gray-600 dark:text-gray-400">+19685745632</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Submitted:</span>
                        <span className="text-gray-600 dark:text-gray-400">2/12/2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-[#4169E1] text-white">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Client Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Template Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Client Phone
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Submitted At
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-gray-900 dark:text-white">1</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-gray-900 dark:text-white">Sarah Johnson</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Insurance</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-gray-600 dark:text-gray-400">+19685745632</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-gray-600 dark:text-gray-400">2/12/2026</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <button className="text-[#4169E1] hover:text-[#3557c7]">
                            <Edit2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            // Claims Tab
            <div className="space-y-4 md:space-y-6">
              {/* Search Bar with Filter Icon (Mobile & Desktop) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 focus:border-[#4169E1] text-xs md:text-sm"
                      placeholder="Search claims..."
                    />
                  </div>
                  
                  {/* Filter Icon (Mobile Only) */}
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="md:hidden p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    {showMobileFilters ? (
                      <X className="size-4 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Filter className="size-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>

                  {/* Desktop Filters */}
                  <div className="hidden md:flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors whitespace-nowrap">
                      <Calendar className="size-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Last 30 days</span>
                    </button>
                  </div>

                  {/* New Claim Button */}
                  <button
                    onClick={() => navigate(`/clients/${id}/insurance/claims/create`)}
                    className="flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <Plus className="size-3.5 md:size-4" />
                    <span className="hidden sm:inline">New Claim</span>
                    <span className="sm:hidden">New</span>
                  </button>
                </div>

                {/* Mobile Filter Dropdown */}
                {showMobileFilters && (
                  <div className="md:hidden bg-gray-50 dark:bg-gray-750 rounded-lg p-3 border border-gray-200 dark:border-gray-700 space-y-3">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-xs text-gray-900 dark:text-white"
                      >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="submitted">Submitted</option>
                        <option value="accepted">Accepted</option>
                        <option value="denied">Denied</option>
                      </select>
                    </div>

                    {/* Payer Filter */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Payer
                      </label>
                      <select
                        value={payerFilter}
                        onChange={(e) => setPayerFilter(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-xs text-gray-900 dark:text-white"
                      >
                        <option value="all">All Payers</option>
                        {uniquePayers.map((payer) => (
                          <option key={payer} value={payer}>
                            {payer}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                      onClick={() => {
                        setStatusFilter("all");
                        setPayerFilter("all");
                        setSearchQuery("");
                      }}
                      className="w-full px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-[#4169E1] dark:hover:text-[#00c0ff] border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Claims Card View */}
              <div className="md:hidden space-y-2">
                {filteredClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="bg-white dark:bg-gray-750 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                          {claim.claimId}
                        </div>
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-medium capitalize ${getStatusStyles(
                            claim.status
                          )}`}
                        >
                          {claim.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {claim.amountBilled}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Date:</span>
                        <span className="text-gray-600 dark:text-gray-400">{claim.dateOfService}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Payer:</span>
                        <span className="text-gray-600 dark:text-gray-400">{claim.payer}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/clients/${id}/insurance/claims/${claim.id}`)}
                      className="w-full flex items-center justify-center gap-1 text-[#4169E1] hover:text-[#3557c7] text-xs font-medium py-1.5 border-t border-gray-200 dark:border-gray-700"
                    >
                      <Eye className="size-3.5" />
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              {/* Desktop Claims Table */}
              <div className="hidden md:block overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Claim ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Date of Service
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Payer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Amount Billed
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {filteredClaims.map((claim) => (
                      <tr
                        key={claim.id}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {claim.claimId}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {claim.dateOfService}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {claim.payer}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {claim.amountBilled}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyles(
                              claim.status
                            )}`}
                          >
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => navigate(`/clients/${id}/insurance/claims/${claim.id}`)}
                            className="flex items-center gap-1.5 text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
                          >
                            <Eye className="size-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}