import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, FileText, Plus, X, ChevronDown, Building2 } from "lucide-react";

interface LineItem {
  description: string;
  quantity: string;
  amount: string;
  discount: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType?: string;
  initials?: string;
  avatarColor?: string;
}

// Get saved descriptions from localStorage
const getSavedDescriptions = (): string[] => {
  try {
    const saved = localStorage.getItem("invoiceDescriptions");
    return saved ? JSON.parse(saved) : ["50 Mins Therapy", "30 Mins Therapy", "60 Mins Therapy", "Consultation", "Assessment"];
  } catch {
    return ["50 Mins Therapy", "30 Mins Therapy", "60 Mins Therapy", "Consultation", "Assessment"];
  }
};

// Save descriptions to localStorage
const saveDescription = (description: string) => {
  if (!description.trim()) return;
  
  try {
    const current = getSavedDescriptions();
    if (!current.includes(description)) {
      const updated = [...current, description];
      localStorage.setItem("invoiceDescriptions", JSON.stringify(updated));
    }
  } catch {
    // Fail silently if localStorage is not available
  }
};

export function CreateInvoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const clientData = location.state?.client as Client | undefined;
  
  // Practice options
  const practices = [
    { name: "Main Practice", address: "123 Medical Center Dr, New York, NY 10001" },
    { name: "Downtown Clinic", address: "456 Health Ave, Brooklyn, NY 11201" },
    { name: "Wellness Center", address: "789 Care Street, Manhattan, NY 10012" },
    { name: "Northside Office", address: "321 Therapy Blvd, Queens, NY 11354" }
  ];

  // Default client if none selected
  const [client] = useState<Client>(clientData || {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 234 567 8900"
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      description: "50 Mins Therapy",
      quantity: "1",
      amount: "150.00",
      discount: "0.00",
    }
  ]);
  const [invoiceNumber, setInvoiceNumber] = useState("003");
  const [issuedDate, setIssuedDate] = useState("2026-04-01");
  const [dueDate, setDueDate] = useState("2026-04-30");
  const [taxPercentage, setTaxPercentage] = useState("0");
  const [savedDescriptions] = useState<string[]>(getSavedDescriptions());
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);
  const [descriptionSearch, setDescriptionSearch] = useState<string>("");
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(practices[0]);

  // Provider information
  const provider = {
    name: "John Wilson",
    email: "Johnwilson@mantra.care",
    phone: "+1 555 123 4567"
  };

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        description: "",
        quantity: "1",
        amount: "0.00",
        discount: "0.00",
      },
    ]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleLineItemChange = (
    index: number,
    field: keyof LineItem,
    value: string
  ) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
    setLineItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity || "0");
      const amount = parseFloat(item.amount || "0");
      const discount = parseFloat(item.discount || "0");
      return sum + (amount * quantity - discount);
    }, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * parseFloat(taxPercentage || "0")) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleDescriptionSearch = (index: number, value: string) => {
    setDescriptionSearch(value);
    setActiveDropdownIndex(index);
  };

  const handleDescriptionSelect = (index: number, description: string) => {
    handleLineItemChange(index, "description", description);
    saveDescription(description);
    setActiveDropdownIndex(null);
    setDescriptionSearch("");
  };

  const handleSaveInvoice = () => {
    // Validate form
    if (lineItems.length === 0) {
      alert("Please add at least one line item");
      return;
    }

    if (!issuedDate || !dueDate) {
      alert("Please fill in both issued date and due date");
      return;
    }

    // Here you would typically save to a database or backend
    // For now, we'll just navigate back to the invoices page
    navigate("/invoices");
  };

  const handleSaveAndAddPayment = () => {
    // Validate form
    if (lineItems.length === 0) {
      alert("Please add at least one line item");
      return;
    }

    if (!issuedDate || !dueDate) {
      alert("Please fill in both issued date and due date");
      return;
    }

    // Here you would typically save to a database or backend
    // For now, we'll navigate to the add payment page with the invoice number
    navigate(`/invoices/${invoiceNumber}/add-payment`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <button
          onClick={() => navigate(`/invoices`)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Create Invoice
        </h1>
      </div>

      {/* Invoice Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          {/* From */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">From</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{provider.name}</p>
          </div>

          {/* Invoice Title */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Invoice</h2>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Bill To */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Bill To</p>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
              </div>

              {/* Practice Details */}
              <div className="mt-4 bg-gray-50 dark:bg-gray-750 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  Practice Details
                </p>
                <div className="relative">
                  <button
                    onClick={() => setPracticeDropdownOpen(!practiceDropdownOpen)}
                    className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#f3faff] dark:bg-[#f3faff] flex items-center justify-center">
                      <Building2 className="size-5 text-[#00c0ff]" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedPractice.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{selectedPractice.address}</p>
                    </div>
                    <ChevronDown className={`size-4 text-gray-400 transition-transform flex-shrink-0 ${practiceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {practiceDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {practices.map((practice, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedPractice(practice);
                            setPracticeDropdownOpen(false);
                          }}
                          className={`w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-3 ${
                            selectedPractice.name === practice.name
                              ? 'bg-blue-50 dark:bg-blue-900/20'
                              : ''
                          }`}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#f3faff] dark:bg-[#f3faff] flex items-center justify-center">
                            <Building2 className="size-5 text-[#00c0ff]" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              selectedPractice.name === practice.name
                                ? 'text-[#4169E1] dark:text-blue-400'
                                : 'text-gray-900 dark:text-white'
                            }`}>{practice.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{practice.address}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Invoice Details</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Invoice #
                  </label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Issued
                    </label>
                    <input
                      type="date"
                      value={issuedDate}
                      onChange={(e) => setIssuedDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Client Information */}
            <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Client Information
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={client.name}
                    readOnly
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={client.phone}
                    readOnly
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={client.email}
                    readOnly
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Provider Information */}
            <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Provider Information
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={provider.name}
                    readOnly
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={provider.phone}
                    readOnly
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={provider.email}
                    readOnly
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="size-4 text-[#4169E1]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Line Items</h3>
            </div>

            {lineItems.length > 0 ? (
              <div className="overflow-visible mb-4">
                <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-750">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 w-24">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 w-28">
                        Discount (%)
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 w-28">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 w-16">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-4 py-3 relative">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => {
                              handleLineItemChange(index, "description", e.target.value);
                              handleDescriptionSearch(index, e.target.value);
                            }}
                            placeholder="Service description..."
                            className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                            onFocus={() => setActiveDropdownIndex(index)}
                            onBlur={(e) => {
                              // Delay to allow click on dropdown items
                              setTimeout(() => setActiveDropdownIndex(null), 200);
                            }}
                          />
                          {activeDropdownIndex === index && (() => {
                            const searchTerm = item.description.toLowerCase();
                            const filteredDescriptions = savedDescriptions.filter(desc =>
                              desc.toLowerCase().includes(searchTerm)
                            );
                            const hasExactMatch = filteredDescriptions.some(desc => 
                              desc.toLowerCase() === searchTerm
                            );
                            const showAddOption = item.description.trim() !== "" && !hasExactMatch;
                            
                            return (
                              <div className="absolute left-4 right-4 top-full mt-1 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                                {filteredDescriptions.length > 0 ? (
                                  filteredDescriptions.map((desc, i) => (
                                    <button
                                      key={i}
                                      type="button"
                                      className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleDescriptionSelect(index, desc);
                                      }}
                                    >
                                      {desc}
                                    </button>
                                  ))
                                ) : item.description.trim() === "" ? (
                                  <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                    Start typing to see suggestions...
                                  </div>
                                ) : null}
                                {showAddOption && (
                                  <button
                                    type="button"
                                    className="w-full px-4 py-2 text-left text-sm text-[#4169E1] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-t border-gray-200 dark:border-gray-600 flex items-center gap-2"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      handleDescriptionSelect(index, item.description);
                                    }}
                                  >
                                    <Plus className="size-3" />
                                    Add "{item.description}"
                                  </button>
                                )}
                                {filteredDescriptions.length === 0 && item.description.trim() === "" && (
                                  <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                    No suggestions available
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </td>
                        <td className="px-4 py-3 w-24">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleLineItemChange(index, "quantity", e.target.value)
                            }
                            className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                          />
                        </td>
                        <td className="px-4 py-3 w-28">
                          <input
                            type="number"
                            value={item.discount}
                            onChange={(e) =>
                              handleLineItemChange(index, "discount", e.target.value)
                            }
                            className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                          />
                        </td>
                        <td className="px-4 py-3 w-28">
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) =>
                              handleLineItemChange(index, "amount", e.target.value)
                            }
                            className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                          />
                        </td>
                        <td className="px-4 py-3 text-center w-16">
                          <button
                            onClick={() => handleRemoveLineItem(index)}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                          >
                            <X className="size-4 text-red-600 dark:text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No line items added yet
                </p>
              </div>
            )}

            <button
              onClick={handleAddLineItem}
              className="flex items-center gap-2 text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
            >
              <Plus className="size-4" />
              Add Line Item
            </button>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tax</span>
                    <input
                      type="number"
                      value={taxPercentage}
                      onChange={(e) => setTaxPercentage(e.target.value)}
                      className="w-16 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${calculateTax().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveInvoice}
              className="flex-1 py-3 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors"
            >
              Save Invoice
            </button>
            <button
              onClick={handleSaveAndAddPayment}
              className="flex-1 py-3 bg-white dark:bg-gray-750 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#4169E1] dark:text-[#5b8cff] border-2 border-[#4169E1] dark:border-[#5b8cff] rounded-xl font-medium transition-colors"
            >
              Save Invoice and Add Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}