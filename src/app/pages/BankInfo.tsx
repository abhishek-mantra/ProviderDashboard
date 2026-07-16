import { useState } from "react";
import { Building2, Plus, ArrowLeft, Check, Edit2 } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  maskedNumber: string;
  accountCode: string;
  isMain: boolean;
  accountHolderName?: string;
  ifscCode?: string;
}

export function BankInfo() {
  const [view, setView] = useState<"list" | "detail" | "add">("list");
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [devHasEntries, setDevHasEntries] = useState(true);
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "ICICI",
      accountNumber: "ICIC0000087",
      maskedNumber: "••••••••••6352",
      accountCode: "ICIC0000087",
      isMain: false,
      accountHolderName: "John Doe",
      ifscCode: "ICIC0000087"
    },
    {
      id: "2",
      bankName: "HDFC",
      accountNumber: "1234567896856",
      maskedNumber: "••••••••••6856",
      accountCode: "HDFC01234",
      isMain: true,
      accountHolderName: "Rachit Dubey",
      ifscCode: "HDFC01234"
    }
  ]);

  const [formData, setFormData] = useState({
    country: "",
    name: "",
    recipientType: "person",
    phoneCountryCode: "+1",
    phoneNumber: "",
    bankName: "",
    address: "",
    streetAddress: "",
    state: "",
    city: "",
    zipCode: "",
    confirmed: false
  });

  const handleSetMainAccount = (accountId: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isMain: acc.id === accountId
    })));
  };

  const handleViewDetail = (account: BankAccount) => {
    setSelectedAccount(account);
    setView("detail");
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setView("list");
    // Reset form
    setFormData({
      country: "",
      name: "",
      recipientType: "person",
      phoneCountryCode: "+1",
      phoneNumber: "",
      bankName: "",
      address: "",
      streetAddress: "",
      state: "",
      city: "",
      zipCode: "",
      confirmed: false
    });
  };

  if (view === "detail" && selectedAccount) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="p-6 md:p-8">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 text-[#00c0ff] hover:text-[#043570] font-medium mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="size-4" />
            Back to Bank Details
          </button>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedAccount.bankName}
            </h2>
            {selectedAccount.isMain && (
              <span className="px-3 py-1 bg-[#00c0ff] text-white text-sm font-medium rounded-full">
                Main
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Number
              </label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                {selectedAccount.accountNumber}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Holder Name
              </label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                {selectedAccount.accountHolderName || "N/A"}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                IFSC Code
              </label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium">
                {selectedAccount.ifscCode || "N/A"}
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
            {/* Country */}
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

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
              />
            </div>

            {/* Recipient Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select recipient type
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recipientType"
                    value="person"
                    checked={formData.recipientType === "person"}
                    onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                    className="w-4 h-4 text-[#00c0ff] focus:ring-[#00c0ff]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Person</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recipientType"
                    value="business"
                    checked={formData.recipientType === "business"}
                    onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                    className="w-4 h-4 text-[#00c0ff] focus:ring-[#00c0ff]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Business</span>
                </label>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number (with country code)
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.phoneCountryCode}
                  onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                  className="w-24 px-3 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                >
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Enter your phone number"
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                />
              </div>
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                placeholder="Enter your bank name"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
              />
            </div>

            {/* Legal Address Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal Address</h3>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                />
              </div>

              {/* Street Address */}
              <div className="mb-4">
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

              {/* State and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              </div>

              {/* ZIP Code */}
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

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="confirmed"
                checked={formData.confirmed}
                onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                className="mt-1 w-4 h-4 text-[#00c0ff] rounded focus:ring-[#00c0ff]"
              />
              <label htmlFor="confirmed" className="text-sm text-gray-700 dark:text-gray-300">
                I have confirmed these details as the recipient
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
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
              Your Bank Details
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your bank accounts for payment processing
            </p>
          </div>
          {devHasEntries && (
            <button
              onClick={() => setView("add")}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-xl font-medium transition-colors text-sm"
            >
              <Plus className="size-4" />
              Add Bank Details
            </button>
          )}
        </div>

        {/* Empty State */}
        {!devHasEntries && (
          <div className="bg-[#f3faff] dark:bg-gray-700/30 rounded-xl p-8 md:p-12 text-center">
            <div className="size-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Building2 className="size-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No bank details added yet.
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              To proceed with payments, please add your bank details.
            </p>
            <button
              onClick={() => setView("add")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-xl font-medium transition-colors text-sm"
            >
              <Plus className="size-4" />
              Add Bank Details
            </button>
          </div>
        )}

        {/* Bank Accounts List */}
        {devHasEntries && (
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => handleViewDetail(account)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  account.isMain
                    ? "border-[#00c0ff] bg-[#f3faff] dark:bg-[#00c0ff]/10"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700/50"
                }`}
              >
                {/* Bank Icon */}
                <div className="size-10 rounded-lg bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="size-5 text-[#00c0ff]" />
                </div>

                {/* Bank Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {account.bankName}
                    </h3>
                    {account.isMain && (
                      <span className="px-2 py-0.5 bg-[#00c0ff] text-white text-xs font-medium rounded-full">
                        Main
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {account.maskedNumber} · {account.accountCode}
                  </p>
                </div>

                {/* Radio Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetMainAccount(account.id);
                  }}
                  className={`size-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    account.isMain
                      ? "border-[#00c0ff] bg-[#00c0ff]"
                      : "border-gray-300 dark:border-gray-600 hover:border-[#00c0ff]"
                  }`}
                >
                  {account.isMain && <Check className="size-4 text-white" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
