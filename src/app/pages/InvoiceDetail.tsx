import { useNavigate, useParams } from "react-router";
import { ArrowLeft, FileText, Send, Download, DollarSign, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export function InvoiceDetail() {
  const navigate = useNavigate();
  const { id, invoiceId } = useParams();
  const [showSendDropdown, setShowSendDropdown] = useState(false);

  // Mock invoice data - would come from API in real app
  const invoicePayments = invoiceId === "004" ? [
    {
      date: "Jan 20, 2026",
      method: "Cash",
      amount: 105.0,
    },
  ] : [];

  const invoice = {
    id: invoiceId,
    invoiceNumber: `#${invoiceId?.padStart(3, "0")}`,
    status: invoicePayments.length > 0 ? "paid" : "sent",
    issuedDate: "Jan 15, 2026",
    dueDate: "Jan 29, 2026",
    balance: 50.00,
    type: "Product",
    from: {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@mantracare.org",
      phone: "+1 234 567 8900",
    },
    billTo: {
      name: "Rachit Sharma",
      address: "123 Main Street",
      city: "New Delhi, DL 110001",
      country: "India",
      email: "rachit.sharma@email.com",
      phone: "+91 98765 43210",
    },
    lineItems: [
      {
        date: "Jan 15, 2026",
        description: "Therapy Session - Anxiety Management",
        amount: 75.0,
      },
      {
        date: "Jan 15, 2026",
        description: "Initial Consultation",
        amount: 30.0,
      },
    ],
    payments: invoicePayments,
    subtotal: 105.0,
    tax: 0,
    total: 105.0,
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "draft":
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
      case "paid":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "overdue":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const handleAddPayment = () => {
    // Navigate to add payment page
    if (id) {
      navigate(`/clients/${id}/invoices/${invoiceId}/add-payment`);
    } else {
      navigate(`/invoices/${invoiceId}/add-payment`);
    }
  };

  const handleBack = () => {
    if (id) {
      navigate(`/clients/${id}/invoices`);
    } else {
      navigate(`/invoices`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Invoice {invoice.invoiceNumber}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {invoice.status !== "paid" && (
            <button 
              onClick={handleAddPayment}
              className="flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg transition-colors font-medium"
            >
              <DollarSign className="size-4" />
              <span className="text-sm">Add Payment</span>
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition-colors">
            <Download className="size-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Download</span>
          </button>
          <div 
            className="relative"
            onMouseEnter={() => setShowSendDropdown(true)}
            onMouseLeave={() => setShowSendDropdown(false)}
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg transition-colors">
              <Send className="size-4" />
              <span className="text-sm font-medium">Send</span>
            </button>
            {showSendDropdown && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
                  <Mail className="size-4" />
                  Email
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
                  <MessageCircle className="size-4" />
                  Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Detail Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          {/* Invoice Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="size-5 text-[#4169E1]" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Invoice {invoice.invoiceNumber}
                </h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {invoice.from.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.from.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.from.phone}</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusStyles(
                  invoice.status
                )}`}
              >
                {invoice.status === "paid" ? "PAID" : invoice.status}
              </span>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Issued: <span className="text-gray-900 dark:text-white">{invoice.issuedDate}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due: <span className="text-gray-900 dark:text-white">{invoice.dueDate}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
              Bill To
            </p>
            <p className="font-medium text-gray-900 dark:text-white mb-1">{invoice.billTo.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.billTo.address}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.billTo.city}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{invoice.billTo.country}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.billTo.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.billTo.phone}</p>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-750 border-t border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lineItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {item.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-white">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${invoice.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax (0%)</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${invoice.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    ${invoice.total.toFixed(2)}
                  </span>
                </div>
                {invoice.payments && invoice.payments.length > 0 && (
                  <>
                    <div className="pt-3 space-y-2">
                      {invoice.payments.map((payment, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {payment.date} - {payment.method}
                          </span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            ${payment.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Amount Paid</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ${invoice.payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        Balance Due
                      </span>
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        ${(invoice.total - invoice.payments.reduce((sum, p) => sum + p.amount, 0)).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}