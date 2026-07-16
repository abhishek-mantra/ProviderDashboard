import { useState } from "react";
import { X, Plus, Trash2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { US, GB, IN, AU, JP, CN, DE, FR, IT, ES, BR, MX, ZA, SG, AE, AF, AX, AL, DZ, AD, AO, AI } from 'country-flag-icons/react/3x2';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: {
    firstName: string;
    lastName: string;
    email: string;
    service: string;
    inviteToMantra?: boolean;
  }) => void;
}

interface MultipleClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function AddClientModal({ isOpen, onClose, onAddClient }: AddClientModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [detailedView, setDetailedView] = useState(false);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [isMultipleMode, setIsMultipleMode] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  
  // Multiple clients state
  const [multipleClients, setMultipleClients] = useState<MultipleClient[]>([
    { id: "1", firstName: "", lastName: "", email: "" }
  ]);

  // Country codes with flags
  const countryCodes = [
    { code: "+1", country: "US", flag: <US className="size-4.5" /> },
    { code: "+44", country: "UK", flag: <GB className="size-4.5" /> },
    { code: "+91", country: "IN", flag: <IN className="size-4.5" /> },
    { code: "+61", country: "AU", flag: <AU className="size-4.5" /> },
    { code: "+81", country: "JP", flag: <JP className="size-4.5" /> },
    { code: "+86", country: "CN", flag: <CN className="size-4.5" /> },
    { code: "+49", country: "DE", flag: <DE className="size-4.5" /> },
    { code: "+33", country: "FR", flag: <FR className="size-4.5" /> },
    { code: "+39", country: "IT", flag: <IT className="size-4.5" /> },
    { code: "+34", country: "ES", flag: <ES className="size-4.5" /> },
    { code: "+55", country: "BR", flag: <BR className="size-4.5" /> },
    { code: "+52", country: "MX", flag: <MX className="size-4.5" /> },
    { code: "+27", country: "ZA", flag: <ZA className="size-4.5" /> },
    { code: "+65", country: "SG", flag: <SG className="size-4.5" /> },
    { code: "+971", country: "AE", flag: <AE className="size-4.5" /> },
    { code: "+93", country: "AF", flag: <AF className="size-4.5" /> },
    { code: "+358", country: "AX", flag: <AX className="size-4.5" /> },
    { code: "+355", country: "AL", flag: <AL className="size-4.5" /> },
    { code: "+213", country: "DZ", flag: <DZ className="size-4.5" /> },
    { code: "+376", country: "AD", flag: <AD className="size-4.5" /> },
    { code: "+244", country: "AO", flag: <AO className="size-4.5" /> },
    { code: "+1264", country: "AI", flag: <AI className="size-4.5" /> },
  ];

  const handleAddAnotherClient = () => {
    setMultipleClients([
      ...multipleClients,
      { id: Date.now().toString(), firstName: "", lastName: "", email: "" }
    ]);
  };

  const handleRemoveClient = (id: string) => {
    if (multipleClients.length > 1) {
      setMultipleClients(multipleClients.filter(client => client.id !== id));
    }
  };

  const handleMultipleClientChange = (id: string, field: keyof MultipleClient, value: string) => {
    setMultipleClients(multipleClients.map(client =>
      client.id === id ? { ...client, [field]: value } : client
    ));
  };

  const handleSubmit = () => {
    if (isMultipleMode) {
      // Submit multiple clients
      const validClients = multipleClients.filter(c => c.firstName && c.lastName && c.email);
      if (validClients.length > 0) {
        validClients.forEach(client => {
          onAddClient({
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            service: "Therapy"
          });
        });
        resetForm();
        onClose();
      }
    } else {
      // Submit single client
      if (firstName && lastName && email) {
        onAddClient({
          firstName,
          lastName,
          email,
          service: "Therapy"
        });
        resetForm();
        onClose();
      }
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setDetailedView(false);
    setCountry("");
    setAddress("");
    setIsMultipleMode(false);
    setMultipleClients([{ id: "1", firstName: "", lastName: "", email: "" }]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const switchToMultiple = () => {
    setIsMultipleMode(true);
  };

  const switchToSingle = () => {
    setIsMultipleMode(false);
    setMultipleClients([{ id: "1", firstName: "", lastName: "", email: "" }]);
  };

  const isValid = isMultipleMode 
    ? multipleClients.some(c => c.firstName && c.lastName && c.email)
    : firstName && lastName && email;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700"
              style={{ maxWidth: '580px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Client
                </h2>
                <button
                  onClick={handleClose}
                  className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto">
                {!isMultipleMode ? (
                  <>
                    {/* Single Client Mode */}
                    {/* First Name and Last Name - Side by Side */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter first name"
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter last name"
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                      </label>
                      <div className="flex gap-2">
                        {/* Custom Country Code Dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                            className="w-[100px] px-2.5 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white text-sm transition-all cursor-pointer flex items-center justify-between gap-1.5"
                          >
                            <span className="flex items-center gap-1.5">
                              {countryCodes.find(c => c.code === countryCode)?.flag}
                              <span className="font-medium text-gray-900 dark:text-white">{countryCode}</span>
                            </span>
                            <ChevronDown className="size-3.5 text-gray-500 flex-shrink-0" />
                          </button>

                          {/* Dropdown Menu */}
                          {countryDropdownOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setCountryDropdownOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 top-full mt-1 w-56 max-h-64 overflow-y-auto bg-white dark:bg-gray-750 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-20"
                              >
                                {countryCodes.map((item) => (
                                  <button
                                    key={item.code}
                                    type="button"
                                    onClick={() => {
                                      setCountryCode(item.code);
                                      setCountryDropdownOpen(false);
                                    }}
                                    className={`w-full px-3 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5 text-sm ${
                                      countryCode === item.code ? "bg-blue-50 dark:bg-blue-900/20" : ""
                                    }`}
                                  >
                                    {item.flag}
                                    <span className="font-medium text-gray-900 dark:text-white">{item.country}</span>
                                    <span className="text-gray-600 dark:text-gray-400 font-medium ml-auto">{item.code}</span>
                                  </button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </div>

                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter phone number"
                          className="flex-1 px-3.5 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Detailed View Toggle */}
                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-600">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Detailed view
                      </label>
                      <button
                        type="button"
                        onClick={() => setDetailedView(!detailedView)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          detailedView ? "bg-[#2563EB]" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                            detailedView ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Detailed View Fields */}
                    <AnimatePresence>
                      {detailedView && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 overflow-hidden"
                        >
                          {/* Country */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Country <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                              <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white text-sm transition-all appearance-none cursor-pointer"
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "right 0.875rem center",
                                  backgroundSize: "16px",
                                }}
                                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                              >
                                <option value="">Select country</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                                <option value="IN">India</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="ES">Spain</option>
                                <option value="IT">Italy</option>
                                <option value="JP">Japan</option>
                                <option value="CN">China</option>
                                <option value="BR">Brazil</option>
                                <option value="MX">Mexico</option>
                                <option value="ZA">South Africa</option>
                                <option value="SG">Singapore</option>
                              </select>
                              {countryDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-b-lg shadow-lg z-10">
                                  <div className="p-2">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="cursor-pointer" onClick={() => { setCountry("US"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-us mr-2"></span>
                                          <span>United States</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("UK"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-gb mr-2"></span>
                                          <span>United Kingdom</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("CA"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-ca mr-2"></span>
                                          <span>Canada</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("AU"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-au mr-2"></span>
                                          <span>Australia</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("IN"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-in mr-2"></span>
                                          <span>India</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("DE"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-de mr-2"></span>
                                          <span>Germany</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("FR"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-fr mr-2"></span>
                                          <span>France</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("ES"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-es mr-2"></span>
                                          <span>Spain</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("IT"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-it mr-2"></span>
                                          <span>Italy</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("JP"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-jp mr-2"></span>
                                          <span>Japan</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("CN"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-cn mr-2"></span>
                                          <span>China</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("BR"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-br mr-2"></span>
                                          <span>Brazil</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("MX"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-mx mr-2"></span>
                                          <span>Mexico</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("ZA"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-za mr-2"></span>
                                          <span>South Africa</span>
                                        </div>
                                      </div>
                                      <div className="cursor-pointer" onClick={() => { setCountry("SG"); setCountryDropdownOpen(false); }}>
                                        <div className="flex items-center">
                                          <span className="flag-icon flag-icon-sg mr-2"></span>
                                          <span>Singapore</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Address */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Address <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Enter address"
                              className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Add Client Button */}
                    <div className="pt-2">
                      <button
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
                          isValid
                            ? "bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-sm hover:shadow-md"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Add Client
                      </button>
                    </div>

                    {/* Do you want to add Multiple? */}
                    <div className="text-center pt-1">
                      <button
                        onClick={switchToMultiple}
                        className="text-[#2563EB] hover:text-[#1d4ed8] font-medium text-sm transition-colors hover:underline"
                      >
                        Do you want to add Multiple?
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Multiple Clients Mode */}
                    <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-1">
                      {multipleClients.map((client, index) => (
                        <motion.div
                          key={client.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="relative p-4 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-600"
                        >
                          {/* Client Header */}
                          <div className="flex items-center justify-between mb-3.5">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Client {index + 1}
                            </h4>
                            {multipleClients.length > 1 && (
                              <button
                                onClick={() => handleRemoveClient(client.id)}
                                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all group"
                                title="Remove client"
                              >
                                <Trash2 className="size-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                              </button>
                            )}
                          </div>

                          {/* First Name and Last Name */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                First Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={client.firstName}
                                onChange={(e) =>
                                  handleMultipleClientChange(client.id, "firstName", e.target.value)
                                }
                                placeholder="First name"
                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Last Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={client.lastName}
                                onChange={(e) =>
                                  handleMultipleClientChange(client.id, "lastName", e.target.value)
                                }
                                placeholder="Last name"
                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={client.email}
                              onChange={(e) =>
                                handleMultipleClientChange(client.id, "email", e.target.value)
                              }
                              placeholder="Email address"
                              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white placeholder-gray-400 text-sm transition-all"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Add Another Client Button */}
                    <button
                      onClick={handleAddAnotherClient}
                      className="w-full py-3.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-[#2563EB] hover:border-[#2563EB] hover:bg-blue-50 dark:hover:bg-[#2563EB]/10 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                    >
                      <Plus className="size-4.5" />
                      Add Another Client
                    </button>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={switchToSingle}
                        className="py-3 rounded-lg font-medium text-sm transition-all bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                      >
                        Back to Single
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`py-3 rounded-lg font-medium text-sm transition-all ${
                          isValid
                            ? "bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-sm hover:shadow-md"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Send Invitation
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}