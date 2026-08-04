import { useParams, Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Printer,
  Receipt,
  User,
  Stethoscope,
  Hash,
  Wallet,
  Upload,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { useGoBack } from "../utils/useGoBack";
import { formatDateOfService, formatDate, getCurrencySymbol } from "../types/claims";
import {
  WRITE_OFF_REASON_LABELS,
  getClientDue,
  getInsuranceDue,
  getTotalDue,
  WriteOffReason,
} from "../types/partnerDashboard";
import type { Bill } from "../types/partnerDashboard";

type PaymentType = "client" | "insurance" | "write_off";

const STATUS_STYLES: Record<string, string> = {
  unresolved: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
  draft: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
  paid_direct: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  written_off: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
};

const STATUS_LABELS: Record<string, string> = {
  unresolved: "Unresolved",
  draft: "Draft",
  paid_direct: "Settled",
  written_off: "Written Off",
};

export function BillDetail() {
  const { billId } = useParams();
  const {
    bills,
    clients,
    providers,
    currentProviderId,
    isCurrentUserSuperAdmin,
    isCurrentUserAdmin,
    recordBillPayment,
    writeOffBill,
  } = usePartnerDashboard();
  const handleBack = useGoBack("/billing/bills");
  const [searchParams] = useSearchParams();
  const { claims } = useClaims();

  // "Save Bill and Add Payment" deep-links here with ?pay=1 — focus the form.
  useEffect(() => {
    if (searchParams.get("pay") === "1") {
      const el = document.getElementById("add-payment");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [searchParams, billId]);

  // Add Payment form state
  const [payType, setPayType] = useState<PaymentType>("client");
  const [payAmount, setPayAmount] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [writeOffReason, setWriteOffReason] = useState<WriteOffReason>("bad_debt");
  const [writeOffNote, setWriteOffNote] = useState("");
  const [payError, setPayError] = useState("");
  const [saved, setSaved] = useState(false);

  const bill = billId ? bills.find((b) => b.id === billId || b.billNumber === billId) : undefined;

  if (!bill) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Bill Not Found</h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            This bill does not exist or has been removed.
          </p>
          <button onClick={handleBack} className="mt-4 px-4 py-2 bg-[#043570] text-white rounded-lg">
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  const client = clients.find((c) => c.id === bill.clientId);
  const provider = providers.find((p) => p.id === bill.providerId);

  const clientOwed = bill.clientOwed || 0;
  const clientPaid = bill.clientPaid || 0;
  const clientWriteOff = bill.clientWriteOff || 0;
  const insuranceOwed = bill.insuranceOwed || 0;
  const insurancePaid = bill.insurancePaid || 0;
  const insuranceWriteOff = bill.insuranceWriteOff || 0;

  const clientDue = getClientDue(bill);
  const insuranceDue = getInsuranceDue(bill);
  const totalDue = getTotalDue(bill);
  const received = clientPaid + insurancePaid;
  const sym = getCurrencySymbol(bill.currency ?? "USD");

  const canWriteOff =
    isCurrentUserSuperAdmin ||
    isCurrentUserAdmin ||
    (!!client && client.treatingProviderId === currentProviderId);

  const sideDue = payType === "insurance" ? insuranceDue : clientDue;
  const defaultAmount = () => String(Math.max(0, sideDue).toFixed(2));

  const handleSave = () => {
    setPayError("");
    const amount = parseFloat(payAmount) || 0;
    const cap = Math.max(0, sideDue);
    if (amount <= 0 || amount > cap) {
      setPayError(`Enter an amount between $0.01 and $${cap.toFixed(2)}.`);
      return;
    }
    if (payType === "write_off" && !canWriteOff) {
      setPayError("Only Admins or the treating clinician can write off this bill.");
      return;
    }
    if (payType === "write_off") {
      writeOffBill(bill.id, writeOffReason, writeOffNote, amount, "client");
    } else {
      recordBillPayment(bill.id, payType, amount);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const detailRows: { label: string; value: string }[] = [
    { label: "Bill Number", value: bill.billNumber },
    { label: "Type", value: bill.billType === "insurance" ? "Insurance" : "Self-pay" },
    { label: "Date of Service", value: formatDateOfService(bill.dateOfService) },
    { label: "Service", value: bill.cptCode },
    { label: "CPT Code", value: bill.cptCode },
    { label: "Diagnosis", value: bill.diagnosisCodes.join(", ") || "—" },
    {
      label: "Insurer",
      value: bill.billType === "insurance" ? bill.insurerName || bill.payerName || "—" : "Self-pay",
    },
    { label: "Due Date", value: bill.dueDate ? formatDate(bill.dueDate) : "—" },
    { label: "Created", value: formatDate(bill.createdAt) },
    { label: "Resolved", value: bill.resolvedAt ? formatDate(bill.resolvedAt) : "—" },
  ];

  const statusKey = bill.status === "paid_direct" || bill.status === "paid_via_claim" ? "paid_direct" : bill.status;

  return (
    <div className="space-y-6">
      {bill.claimId &&
        (() => {
          const linkedClaim = claims.find((c) => c.id === bill.claimId);
          return linkedClaim ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
              <div>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                  Insurance claim created — {linkedClaim.claimNumber}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                  Submit this claim to the clearinghouse to begin payer adjudication.
                </p>
              </div>
              <Link
                to={`/claims/${linkedClaim.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032a57] text-white rounded-lg text-sm font-medium transition-colors shrink-0"
              >
                <Send className="size-4" />
                View & Submit Claim
              </Link>
            </div>
          ) : null;
        })()}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Bill {bill.billNumber}</h1>
              <span
                className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  STATUS_STYLES[statusKey] || "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {STATUS_LABELS[statusKey] || bill.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {bill.clientName} · {bill.cptCode}
            </p>
          </div>
        </div>
        <Link
          to={`/billing/bills/${bill.id}/invoice`}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl transition-colors shadow-xs"
        >
          <Printer className="size-4" />
          View Invoice
        </Link>
      </div>

      {/* ── DUAL CLIENT / INSURANCE BALANCE (Step 4) ──────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Balance Breakdown</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              One bill can owe money to both the client and insurance simultaneously
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Bill</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{sym}{bill.amount.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
          {/* Client side */}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <User className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Client</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {bill.billType === "insurance" ? "Copay / patient responsibility" : "Self-pay"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 font-medium">Client owes</p>
                <p className="font-black text-gray-900 dark:text-white mt-0.5">{sym}{clientOwed.toFixed(2)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800">
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">Client paid</p>
                <p className="font-black text-emerald-700 dark:text-emerald-300 mt-0.5">{sym}{clientPaid.toFixed(2)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800">
                <p className="text-amber-600 dark:text-amber-400 font-medium">Client due</p>
                <p className="font-black text-amber-700 dark:text-amber-300 mt-0.5">{sym}{Math.max(0, clientDue).toFixed(2)}</p>
              </div>
            </div>
            {(clientWriteOff > 0 || clientPaid > 0) && (
              <p className="text-[11px] text-gray-400">
                {clientPaid > 0 && `${clientPaid > 0 ? sym + clientPaid.toFixed(2) + " collected" : ""}`}
                {clientWriteOff > 0 && `${clientPaid > 0 ? " · " : ""}${sym}${clientWriteOff.toFixed(2)} written off`}
              </p>
            )}
          </div>

          {/* Insurance side */}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Receipt className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Insurance</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {bill.billType === "insurance" ? bill.insurerName || "Insurance" : "Not applicable"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 font-medium">Insurance owes</p>
                <p className="font-black text-gray-900 dark:text-white mt-0.5">{sym}{insuranceOwed.toFixed(2)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800">
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">Insurance paid</p>
                <p className="font-black text-emerald-700 dark:text-emerald-300 mt-0.5">{sym}{insurancePaid.toFixed(2)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800">
                <p className="text-amber-600 dark:text-amber-400 font-medium">Insurance due</p>
                <p className="font-black text-amber-700 dark:text-amber-300 mt-0.5">{sym}{Math.max(0, insuranceDue).toFixed(2)}</p>
              </div>
            </div>
            {(insuranceWriteOff > 0 || insurancePaid > 0) && (
              <p className="text-[11px] text-gray-400">
                {insurancePaid > 0 && `${sym}${insurancePaid.toFixed(2)} remitted`}
                {insuranceWriteOff > 0 && `${insurancePaid > 0 ? " · " : ""}${sym}${insuranceWriteOff.toFixed(2)} adjusted`}
              </p>
            )}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900/40">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Received <span className="font-bold text-gray-900 dark:text-white">{sym}{received.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Due</p>
            <p
              className={`text-xl font-black ${
                totalDue > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {sym}{Math.max(0, totalDue).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* ── ADD PAYMENT (Step 4.3 — unified form) ─────────────────────────────── */}
      <div id="add-payment" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 scroll-mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="size-4 text-gray-500 dark:text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Add Payment</h2>
          {saved && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="size-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
              Payment Type
            </label>
            <select
              value={payType}
              onChange={(e) => {
                setPayType(e.target.value as PaymentType);
                const due = e.target.value === "insurance" ? insuranceDue : clientDue;
                setPayAmount(String(Math.max(0, due).toFixed(2)));
                setPayError("");
              }}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-semibold"
            >
              <option value="client">Client payment</option>
              <option value="insurance">Insurance payment</option>
              <option value="write_off">Write-off</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
              Amount ($) — {payType === "insurance" ? "insurance due" : payType === "write_off" ? "client due" : "client due"}
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={payAmount}
              onChange={(e) => {
                setPayAmount(e.target.value);
                setPayError("");
              }}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
              Receipt # (optional)
            </label>
            <input
              type="text"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
              Receipt Upload
            </label>
            <label className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer text-gray-500 dark:text-gray-400 hover:border-[#043570]">
              <Upload className="size-4" />
              <span className="truncate text-xs">{fileNames.length ? fileNames.join(", ") : "Attach file"}</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
              />
            </label>
          </div>
        </div>

        {payType === "write_off" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Reason Code
              </label>
              <select
                value={writeOffReason}
                onChange={(e) => setWriteOffReason(e.target.value as WriteOffReason)}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
              >
                {Object.entries(WRITE_OFF_REASON_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Note
              </label>
              <input
                type="text"
                value={writeOffNote}
                onChange={(e) => setWriteOffNote(e.target.value)}
                placeholder="Write-off note (optional)"
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {payError && (
          <div className="flex items-start gap-2 p-3 mt-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold">
            <AlertCircle className="size-4 shrink-0" />
            <span>{payError}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => {
              setPayType("client");
              setPayAmount(defaultAmount());
              setReceiptNumber("");
              setFileNames([]);
              setPayError("");
            }}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-xs transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {bill.serviceLines && bill.serviceLines.length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Receipt className="size-4 text-gray-500 dark:text-gray-400" />
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Service Lines</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {bill.serviceLines.length} sessions billed on this invoice
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                <th className="py-2 text-xs font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="py-2 text-xs font-medium text-gray-500 dark:text-gray-400">Service</th>
                <th className="py-2 text-xs font-medium text-gray-500 dark:text-gray-400">CPT</th>
                <th className="py-2 text-xs font-medium text-gray-500 dark:text-gray-400 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill.serviceLines.map((line, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-xs text-gray-900 dark:text-white">
                    {formatDateOfService(line.dateOfService)}
                  </td>
                  <td className="py-2 text-xs text-gray-600 dark:text-gray-300">{line.description}</td>
                  <td className="py-2 text-xs font-mono text-gray-900 dark:text-white">{line.cptCode}</td>
                  <td className="py-2 text-xs text-right font-mono text-gray-900 dark:text-white">
                    {sym}{line.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 text-xs font-bold text-gray-900 dark:text-white" colSpan={3}>
                  Total
                </td>
                <td className="py-2 text-xs text-right font-bold text-gray-900 dark:text-white">
                  {sym}{bill.amount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Bill Details</h2>
          <dl className="space-y-3">
            {detailRows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4">
                <dt className="text-xs text-gray-500 dark:text-gray-400">{row.label}</dt>
                <dd className="text-xs font-semibold text-gray-900 dark:text-white text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
          {(bill.writeOffAmount || 0) > 0 && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl">
              <p className="text-xs font-bold text-red-700 dark:text-red-300">
                Write-off: {WRITE_OFF_REASON_LABELS[bill.writeOffReason ?? "other"]}
              </p>
              {bill.writeOffNote && (
                <p className="text-xs text-red-600 dark:text-red-300 mt-1">{bill.writeOffNote}</p>
              )}
              {bill.writeOffBy && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">By {bill.writeOffBy}</p>
              )}
            </div>
          )}
        </div>

        {/* Related records */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Client</h2>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#043570]/10 dark:bg-[#043570]/30 flex items-center justify-center">
                <User className="size-4 text-[#043570] dark:text-blue-300" />
              </div>
              <div className="min-w-0">
                <Link
                  to={client ? `/clients/${client.id}` : "#"}
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:underline truncate block"
                >
                  {bill.clientName}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">{client?.email || "No email on file"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Provider</h2>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#043570]/10 dark:bg-[#043570]/30 flex items-center justify-center">
                <Stethoscope className="size-4 text-[#043570] dark:text-blue-300" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {provider?.name || "Unknown Provider"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {provider?.id === currentProviderId ? "You" : "Team member"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Documents</h2>
            <div className="space-y-2">
              <Link
                to={`/billing/bills/${bill.id}/invoice`}
                className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <Receipt className="size-4 text-gray-500 dark:text-gray-400" /> Invoice
                </span>
                <span className="text-xs font-semibold text-[#043570] dark:text-blue-300">Open →</span>
              </Link>
              <Link
                to={`/clients/${bill.clientId}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <Hash className="size-4 text-gray-500 dark:text-gray-400" /> Client File
                </span>
                <span className="text-xs font-semibold text-[#043570] dark:text-blue-300">Open →</span>
              </Link>
              <Link
                to={`/billing/bills`}
                className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <Calendar className="size-4 text-gray-500 dark:text-gray-400" /> Billing Hub
                </span>
                <span className="text-xs font-semibold text-[#043570] dark:text-blue-300">Open →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
