import { useState } from "react";
import { useParams } from "react-router";
import { ArrowLeft, Printer, Send, CheckCircle } from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { useGoBack } from "../utils/useGoBack";
import { WRITE_OFF_REASON_LABELS, getClientDue, getInsuranceDue } from "../types/partnerDashboard";
import {
  getServiceDescription,
  formatDateOfService,
  formatDate,
  getCurrencySymbol,
} from "../types/claims";

export function BillDocument() {
  const { billId } = useParams();
  const { bills, providers, clients, currentProviderId } = usePartnerDashboard();
  const { claims } = useClaims();
  const [emailSent, setEmailSent] = useState(false);

  const bill = bills.find((b) => b.id === billId || b.billNumber === billId);
  const handleBack = useGoBack("/billing");

  const provider = providers.find((p) => p.id === bill?.providerId) || providers.find((p) => p.id === currentProviderId) || providers[0];
  const client = clients.find((c) => c.id === bill?.clientId);
  const clientEmail = client?.email || (bill ? `${bill.clientName.toLowerCase().replace(/\s+/g, ".")}@email.com` : "");
  const claim = bill?.claimId ? claims.find((c) => c.id === bill.claimId) : undefined;
  const currency = getCurrencySymbol(bill?.currency ?? "USD");

  if (!bill) {
    return (
      <div className="space-y-6">
        <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="size-6" />
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <p className="text-gray-500">Invoice not found.</p>
        </div>
      </div>
    );
  }

  const paid = bill.paidAmount || 0;
  const writtenOff = bill.writeOffAmount || 0;
  const balance = bill.amount - paid - writtenOff;
  const statusLabel: Record<string, string> = {
    unresolved: balance > 0 ? "Outstanding" : "Unresolved",
    paid_direct: "Paid",
    claim_pending: "Claim Submitted",
    paid_via_claim: "Paid via Claim",
    written_off: "Written Off",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 print:hidden">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Invoice</h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">#{bill.billNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            {emailSent ? (
              <span className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="size-4" />
                Sent to {clientEmail}
              </span>
            ) : (
              <button
                onClick={() => setEmailSent(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white rounded-xl text-sm font-medium transition-colors shadow-xs"
              >
                <Send className="size-4" />
                Email to Client
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Printer className="size-4" />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 print:p-0">
        <div className="max-w-[800px] mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Invoice</h2>
              <p className="text-sm text-gray-500">#{bill.billNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">{provider?.name || "Provider"}</p>
              <p className="text-sm text-gray-600">{provider?.profession || ""}</p>
              <p className="text-sm text-gray-600">{provider?.email || ""}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Billed To</h3>
              <p className="font-medium text-gray-900 dark:text-white">{bill.clientName}</p>
              <p className="text-sm text-gray-600">{clientEmail}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Status</h3>
              <p className="font-medium text-gray-900 dark:text-white">{statusLabel[bill.status] || bill.status}</p>
              <p className="text-sm text-gray-600">Issued {formatDate(bill.createdAt)}</p>
              {bill.resolvedAt && <p className="text-sm text-gray-600">Resolved {formatDate(bill.resolvedAt)}</p>}
            </div>
          </div>

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left py-2 font-medium text-gray-600">Date</th>
                <th className="text-left py-2 font-medium text-gray-600">Service</th>
                <th className="text-left py-2 font-medium text-gray-600">CPT</th>
                <th className="text-left py-2 font-medium text-gray-600">Diagnosis</th>
                <th className="text-right py-2 font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(bill.serviceLines && bill.serviceLines.length > 1
                ? bill.serviceLines
                : [
                  {
                    sessionId: bill.sessionId,
                    cptCode: bill.cptCode,
                    dateOfService: bill.dateOfService,
                    description: getServiceDescription(bill.cptCode),
                    amount: bill.amount,
                  },
                ]
              ).map((line, i) => (
                <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white">
                    {formatDateOfService(line.dateOfService)}
                  </td>
                  <td className="py-2 text-gray-600">{line.description}</td>
                  <td className="py-2 text-gray-900 dark:text-white">{line.cptCode}</td>
                  <td className="py-2 text-gray-900 dark:text-white">
                    {(bill.diagnosisCodes && bill.diagnosisCodes[0]) || (bill as any).diagnosisCode || "—"}
                  </td>
                  <td className="py-2 text-right text-gray-900 dark:text-white">
                    {currency}
                    {line.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              {bill.serviceLines && bill.serviceLines.length > 1 && (
                <tr className="font-bold">
                  <td className="py-2 text-right" colSpan={4}>
                    Total
                  </td>
                  <td className="py-2 text-right text-gray-900 dark:text-white">
                    {currency}
                    {bill.amount.toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-end mb-6">
            <div className="w-80 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Total Charge</span>
                <span className="text-gray-900 dark:text-white font-mono font-semibold">{currency}{bill.amount.toFixed(2)}</span>
              </div>

              {bill.billType === "insurance" && (bill.insuranceOwed || 0) > 0 && (
                <>
                  <div className="flex justify-between text-xs text-blue-700 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg">
                    <span>Insurance Billed ({bill.payerName || "Payer"})</span>
                    <span className="font-mono font-semibold">-{currency}{(bill.insuranceOwed || 0).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm pt-1 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Client Copay / Responsibility</span>
                    <span className="text-gray-900 dark:text-white font-mono font-bold">{currency}{(bill.clientOwed !== undefined ? bill.clientOwed : (bill.amount - (bill.insuranceOwed || 0))).toFixed(2)}</span>
                  </div>
                </>
              )}

              {(bill.clientPaid || 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Client Paid</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">-{currency}{(bill.clientPaid || 0).toFixed(2)}</span>
                </div>
              )}

              {writtenOff > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Written off ({bill.writeOffReason ? WRITE_OFF_REASON_LABELS[bill.writeOffReason] : "adjustment"})
                  </span>
                  <span className="text-gray-500 font-mono">-{currency}{writtenOff.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold border-t-2 border-gray-300 dark:border-gray-600 pt-2 text-gray-900 dark:text-white">
                <span>{bill.billType === "insurance" ? "Client Copay Due" : "Balance Due"}</span>
                <span className="font-mono text-base text-blue-600 dark:text-blue-400">{currency}{Math.max(0, bill.billType === "insurance" ? getClientDue(bill) : balance).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {bill.payerName && (
            <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl mb-4 text-xs space-y-1.5">
              <p className="text-blue-900 dark:text-blue-200 font-semibold">
                Insurance Payer: <span className="font-bold">{bill.payerName}</span>
                {claim ? ` · Claim #: ${claim.claimNumber}` : bill.claimId ? ` · Claim ID: ${bill.claimId}` : ""}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-gray-600 dark:text-gray-400">
                <span>Insurance Pending: <strong className="text-gray-900 dark:text-white font-mono">{currency}{(getInsuranceDue(bill)).toFixed(2)}</strong></span>
                <span>Client Copay Responsibility: <strong className="text-gray-900 dark:text-white font-mono">{currency}{(bill.clientOwed !== undefined ? bill.clientOwed : (bill.amount - (bill.insuranceOwed || 0))).toFixed(2)}</strong></span>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-xs text-gray-500">
            <p>Thank you for your business. Please remit the balance due above. Payment can be made by cash or online.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
