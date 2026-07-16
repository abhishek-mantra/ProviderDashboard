import { useNavigate, useParams } from "react-router";
import { ArrowLeft, X, CreditCard, Banknote, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export function AddPayment() {
  const navigate = useNavigate();
  const { id, invoiceId } = useParams();
  const [paymentAmount, setPaymentAmount] = useState("50");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("cash");
  const [onlinePaymentType, setOnlinePaymentType] = useState<"credit_card" | "debit_card" | "others">("credit_card");
  const [paymentDate, setPaymentDate] = useState("04/07/2026");
  const [showSettleModal, setShowSettleModal] = useState(false);

  // Mock invoice data
  const invoice = {
    id: invoiceId,
    invoiceNumber: `#${invoiceId?.padStart(3, "0")}`,
    balance: 50.00,
    type: "Product",
  };

  const handleAddPayment = () => {
    console.log("Payment added:", { paymentAmount, paymentMethod, paymentDate });
    // Navigate back to invoice detail
    if (id) {
      navigate(`/clients/${id}/invoices/${invoiceId}`);
    } else {
      navigate(`/invoices/${invoiceId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => id ? navigate(`/clients/${id}/invoices/${invoiceId}`) : navigate(`/invoices/${invoiceId}`)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add Payment</h1>
          </div>
          <button
            onClick={() => id ? navigate(`/clients/${id}/invoices/${invoiceId}`) : navigate(`/invoices/${invoiceId}`)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Select invoices */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold mr-3">1</span>
                Select invoices and confirm payment amount
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 ml-10">
                You can make partial payments on new invoices
              </p>

              {/* Invoice Selection Table */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-750">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input type="checkbox" checked readOnly className="size-4 text-[#4169E1] rounded" />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Invoice</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Details</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <td className="px-4 py-3">
                        <input type="checkbox" checked readOnly className="size-4 text-[#4169E1] rounded" />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">INV #{invoiceId}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Initial client balance</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{invoice.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">${invoice.balance.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Due</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">${invoice.balance.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Payment amount</span>
                    <input
                      type="text"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-32 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-sm text-right font-medium dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Choose payment method */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold mr-3">2</span>
                Choose payment method
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 ml-10">
                A payment method is required
              </p>

              <div className="space-y-3 ml-10">
                {/* Online */}
                <div>
                  <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "online"
                      ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Online</p>
                    </div>
                  </label>

                  {/* Online Payment Type - shown when Online is selected */}
                  {paymentMethod === "online" && (
                    <div className="space-y-3 ml-8 mt-3">
                      <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        onlinePaymentType === "credit_card"
                          ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}>
                        <input
                          type="radio"
                          name="onlinePaymentType"
                          value="credit_card"
                          checked={onlinePaymentType === "credit_card"}
                          onChange={(e) => setOnlinePaymentType(e.target.value as any)}
                          className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]"
                        />
                        <CreditCard className="size-5 text-gray-700 dark:text-gray-300 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">Credit Card</p>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        onlinePaymentType === "debit_card"
                          ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}>
                        <input
                          type="radio"
                          name="onlinePaymentType"
                          value="debit_card"
                          checked={onlinePaymentType === "debit_card"}
                          onChange={(e) => setOnlinePaymentType(e.target.value as any)}
                          className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]"
                        />
                        <CreditCard className="size-5 text-gray-700 dark:text-gray-300 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">Debit Card</p>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        onlinePaymentType === "others"
                          ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}>
                        <input
                          type="radio"
                          name="onlinePaymentType"
                          value="others"
                          checked={onlinePaymentType === "others"}
                          onChange={(e) => setOnlinePaymentType(e.target.value as any)}
                          className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]"
                        />
                        <MoreHorizontal className="size-5 text-gray-700 dark:text-gray-300 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">Others</p>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                {/* Cash */}
                <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "cash"
                    ? "border-[#4169E1] bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mt-1 size-4 text-[#4169E1] focus:ring-[#4169E1]"
                  />
                  <Banknote className="size-5 text-gray-700 dark:text-gray-300 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Cash</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right side - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary</h4>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Due</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${invoice.balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Paid</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${paymentAmount}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Payment Amount</span>
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">${paymentAmount}</span>
                </div>
              </div>

              <button
                onClick={handleAddPayment}
                className="w-full bg-[#4169E1] hover:bg-[#3557c7] text-white py-3 rounded-lg transition-colors font-medium text-sm"
              >
                Add ${paymentAmount} payment
              </button>

              <button
                onClick={() => setShowSettleModal(true)}
                className="w-full mt-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 py-3 rounded-lg transition-colors font-medium text-sm"
              >
                Settle without payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settle Without Payment Confirmation Modal */}
      {showSettleModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSettleModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center size-14 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                <Banknote className="size-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Settle Without Full Payment?
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Are you sure you want to mark this invoice as paid without receiving the full settlement from the client?
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  console.log("Settled without payment");
                  setShowSettleModal(false);
                  if (id) {
                    navigate(`/clients/${id}/invoices/${invoiceId}`);
                  } else {
                    navigate(`/invoices/${invoiceId}`);
                  }
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl transition-colors font-medium text-sm md:text-base"
              >
                Yes, settle without payment
              </button>
              <button
                onClick={() => setShowSettleModal(false)}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-xl transition-colors font-medium text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}