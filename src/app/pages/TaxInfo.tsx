import { useState } from "react";
import { FileText, Plus, ArrowLeft, Check, Edit2, Calendar } from "lucide-react";

interface TaxRecord {
  id: string;
  name: string;
  certificationSignature: string;
  affidavitSignature: string;
  date: string;
  isMain: boolean;
}

export function TaxInfo() {
  const [view, setView] = useState<"list" | "detail" | "add">("list");
  const [selectedRecord, setSelectedRecord] = useState<TaxRecord | null>(null);
  const [devHasEntries, setDevHasEntries] = useState(true);
  const [records, setRecords] = useState<TaxRecord[]>([
    {
      id: "1",
      name: "123",
      certificationSignature: "123123",
      affidavitSignature: "123123",
      date: "2025-09-03",
      isMain: true
    },
    {
      id: "2",
      name: "Rachit Dubey",
      certificationSignature: "Rachit Dubey",
      affidavitSignature: "Rachit Dubey",
      date: "2025-12-01",
      isMain: false
    }
  ]);

  const [formData, setFormData] = useState({
    taxResidenceAddress: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    formType: "W-9",
    taxIdNumber: "",
    certificationSignature: "",
    certificationDate: "",
    affidavitSignature: "",
    affidavitDate: "",
    confirmed: false
  });

  const handleSetMainRecord = (recordId: string) => {
    setRecords(records.map(rec => ({
      ...rec,
      isMain: rec.id === recordId
    })));
  };

  const handleViewDetail = (record: TaxRecord) => {
    setSelectedRecord(record);
    setView("detail");
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setView("list");
    setFormData({
      taxResidenceAddress: "",
      streetAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      formType: "W-9",
      taxIdNumber: "",
      certificationSignature: "",
      certificationDate: "",
      affidavitSignature: "",
      affidavitDate: "",
      confirmed: false
    });
  };

  if (view === "detail" && selectedRecord) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="p-6 md:p-8">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 text-[#00c0ff] hover:text-[#043570] font-medium mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="size-4" />
            Back to Tax Details
          </button>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedRecord.name}
            </h2>
            {selectedRecord.isMain && (
              <span className="px-3 py-1 bg-[#00c0ff] text-white text-sm font-medium rounded-full">
                Main
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Certification Signature
              </label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                {selectedRecord.certificationSignature}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Affidavit Signature
              </label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                {selectedRecord.affidavitSignature}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium flex items-center gap-2">
                <Calendar className="size-4 text-gray-400" />
                {selectedRecord.date}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "add") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="p-6 md:p-8">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 text-[#00c0ff] hover:text-[#043570] font-medium mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>

          <form onSubmit={handleSubmitForm} className="space-y-6">
            {/* Tax Residence Section */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Residence</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.taxResidenceAddress}
                    onChange={(e) => setFormData({ ...formData, taxResidenceAddress: e.target.value })}
                    placeholder="Enter your address"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    placeholder="Enter your street address"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                    >
                      <option value="">Select</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State / Province / Region
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                    >
                      <option value="">Select</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                    >
                      <option value="">Select</option>
                      <option value="LA">Los Angeles</option>
                      <option value="NYC">New York City</option>
                      <option value="HOU">Houston</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="Enter your ZIP / Postal Code"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Form Type
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="formType"
                    value="W-9"
                    checked={formData.formType === "W-9"}
                    onChange={(e) => setFormData({ ...formData, formType: e.target.value })}
                    className="w-4 h-4 text-[#00c0ff] focus:ring-[#00c0ff]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">W-9</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="formType"
                    value="W-8BEN-E"
                    checked={formData.formType === "W-8BEN-E"}
                    onChange={(e) => setFormData({ ...formData, formType: e.target.value })}
                    className="w-4 h-4 text-[#00c0ff] focus:ring-[#00c0ff]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">W-8BEN-E</span>
                </label>
              </div>
            </div>

            {/* Tax Identification Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tax Identification Number
              </label>
              <input
                type="text"
                value={formData.taxIdNumber}
                onChange={(e) => setFormData({ ...formData, taxIdNumber: e.target.value })}
                placeholder="Enter your Tax Identification Number (TIN)"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Please provide your National tax number (NIN). If you don't have a TIN, please consult a local tax professional or your tax advisor.
              </p>
            </div>

            {/* Tax Certification */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tax Certification and Confirmation of Unchanged Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Signature
                  </label>
                  <input
                    type="text"
                    value={formData.certificationSignature}
                    onChange={(e) => setFormData({ ...formData, certificationSignature: e.target.value })}
                    placeholder="MM-DD-YYYY"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.certificationDate}
                    onChange={(e) => setFormData({ ...formData, certificationDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                  />
                </div>
              </div>
            </div>

            {/* Affidavit of Unchanged Status */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Affidavit of Unchanged Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Signature
                  </label>
                  <input
                    type="text"
                    value={formData.affidavitSignature}
                    onChange={(e) => setFormData({ ...formData, affidavitSignature: e.target.value })}
                    placeholder="MM-DD-YYYY"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.affidavitDate}
                    onChange={(e) => setFormData({ ...formData, affidavitDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                  />
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="taxConfirmed"
                checked={formData.confirmed}
                onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                className="mt-1 w-4 h-4 text-[#00c0ff] rounded focus:ring-[#00c0ff]"
              />
              <label htmlFor="taxConfirmed" className="text-sm text-gray-700 dark:text-gray-300">
                I certify that I have the capacity to sign for the above entity (identification can be in the IRS form W-8BEN-E) documents or statement by providing my signature below.
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setView("list")}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
              >
                Previous
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="p-6 md:p-8">
        {/* Dev Toggle */}
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit2 className="size-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                Dev Mode
              </span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {devHasEntries ? "Has Entries" : "No Entries"}
              </span>
              <div
                onClick={() => setDevHasEntries(!devHasEntries)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  devHasEntries ? "bg-[#00c0ff]" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full transition-transform ${
                    devHasEntries ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Your Tax Details
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your tax accounts for payment processing
            </p>
          </div>
          {devHasEntries && (
            <button
              onClick={() => setView("add")}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-xl font-medium transition-colors text-sm"
            >
              <Plus className="size-4" />
              Add Tax Details
            </button>
          )}
        </div>

        {/* Empty State */}
        {!devHasEntries && (
          <div className="bg-[#f3faff] dark:bg-gray-700/30 rounded-xl p-8 md:p-12 text-center">
            <div className="size-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <FileText className="size-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No tax details added yet.
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              To proceed with payments, please add your tax details.
            </p>
            <button
              onClick={() => setView("add")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-xl font-medium transition-colors text-sm"
            >
              <Plus className="size-4" />
              Add Tax Details
            </button>
          </div>
        )}

        {/* Tax Records List */}
        {devHasEntries && (
          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record.id}
                onClick={() => handleViewDetail(record)}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  record.isMain
                    ? "border-[#00c0ff] bg-[#f3faff] dark:bg-[#00c0ff]/10"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700/50"
                }`}
              >
                {/* Tax Icon */}
                <div className="size-10 rounded-lg bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="size-5 text-[#00c0ff]" />
                </div>

                {/* Tax Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {record.name}
                    </h3>
                    {record.isMain && (
                      <span className="px-2 py-0.5 bg-[#00c0ff] text-white text-xs font-medium rounded-full">
                        Main
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Certification Signature: {record.certificationSignature}</p>
                    <p>Affidavit Signature: {record.affidavitSignature}</p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {record.date}
                    </p>
                  </div>
                </div>

                {/* Radio Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetMainRecord(record.id);
                  }}
                  className={`size-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    record.isMain
                      ? "border-[#00c0ff] bg-[#00c0ff]"
                      : "border-gray-300 dark:border-gray-600 hover:border-[#00c0ff]"
                  }`}
                >
                  {record.isMain && <Check className="size-4 text-white" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
