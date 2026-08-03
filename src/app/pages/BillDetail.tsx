import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Printer,
  Receipt,
  User,
  Building2,
  ShieldCheck,
  HandCoins,
  Stethoscope,
  Hash,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { useGoBack } from "../utils/useGoBack";
import { getCurrencySymbol, formatDateOfService, formatDate, getServiceDescription } from "../types/claims";
import { WRITE_OFF_REASON_LABELS } from "../types/partnerDashboard";
import type { Bill } from "../types/partnerDashboard";

const STATUS_STYLES: Record<Bill["status"], string> = {
  unresolved: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
  paid_direct: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  claim_pending: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300",
  paid_via_claim: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  written_off: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
};

const STATUS_LABELS: Record<Bill["status"], string> = {
  unresolved: "Unresolved",
  paid_direct: "Paid (Direct)",
  claim_pending: "Claim Pending",
  paid_via_claim: "Paid via Claim",
  written_off: "Written Off",
};

export function BillDetail() {
  const { billId } = useParams();
  const {
    bills,
    clients,
    providers,
    priorAuthorizations,
    remittanceRecords,
    currentProviderId,
  } = usePartnerDashboard();
  const { claims } = useClaims();
  const handleBack = useGoBack("/billing/bills");

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
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-[#043570] text-white rounded-lg"
          >
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  const client = clients.find((c) => c.id === bill.clientId);
  const provider = providers.find((p) => p.id === bill.providerId);
  const claim = bill.claimId ? claims.find((c) => c.id === bill.claimId) : undefined;
  const remittance = bill.claimId
    ? remittanceRecords.filter((r) => r.claimId === bill.claimId)
    : [];
  const priorAuth = priorAuthorizations.find((pa) => pa.linkedBillIds.includes(bill.id));

  const outstanding = (bill.amount ?? 0) - (bill.paidAmount ?? 0) - (bill.writeOffAmount ?? 0);
  const currency = getCurrencySymbol(bill.payerId ?? undefined);

  const detailRows: { label: string; value: string }[] = [
    { label: "Bill Number", value: bill.billNumber },
    { label: "Date of Service", value: formatDateOfService(bill.dateOfService) },
    { label: "Service", value: getServiceDescription(bill.cptCode) },
    { label: "CPT Code", value: bill.cptCode },
    { label: "Diagnosis", value: bill.diagnosisCodes.join(", ") || "—" },
    { label: "Payer", value: bill.payerName || "Self-pay / Direct" },
    { label: "Resolution Method", value: bill.resolutionMethod ? bill.resolutionMethod.replace(/_/g, " ").toUpperCase() : "—" },
    { label: "Created", value: formatDate(bill.createdAt) },
    { label: "Resolved", value: bill.resolvedAt ? formatDate(bill.resolvedAt) : "—" },
  ];

  return (
    <div className="space-y-6">
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
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${STATUS_STYLES[bill.status]}`}>
                {STATUS_LABELS[bill.status]}
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

      {/* Amounts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Bill Amount</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {currency}
            {bill.amount.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Paid</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {currency}
            {(bill.paidAmount ?? 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Written Off</p>
          <p className="text-2xl font-bold text-red-500 dark:text-red-400 mt-1">
            {currency}
            {(bill.writeOffAmount ?? 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Outstanding</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {currency}
            {outstanding.toFixed(2)}
          </p>
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
                    {currency}
                    {line.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 text-xs font-bold text-gray-900 dark:text-white" colSpan={3}>
                  Total
                </td>
                <td className="py-2 text-xs text-right font-bold text-gray-900 dark:text-white">
                  {currency}
                  {bill.amount.toFixed(2)}
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
          {bill.writeOffAmount ? (
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
          ) : null}
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
                <Link to={client ? `/clients/${client.id}` : "#"} className="text-sm font-semibold text-gray-900 dark:text-white hover:underline truncate block">
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

          {claim && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="size-4 text-gray-500 dark:text-gray-400" />
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Linked Claim</h2>
              </div>
              <Link
                to={`/claims/${claim.id}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{claim.claimNumber}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status: {claim.status.replace(/_/g, " ")}</p>
                </div>
                <span className="text-xs font-semibold text-[#043570] dark:text-blue-300">View →</span>
              </Link>
              {remittance.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <HandCoins className="size-3.5" /> Remittance / ERA
                  </p>
                  {remittance.map((r) => (
                    <div key={r.id} className="flex items-center justify-between text-xs rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2.5">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Paid {currency}{r.paidAmount.toFixed(2)}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {formatDate(r.postedAt)}
                          {r.discrepancyFlag ? " · ⚠ mismatch" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 dark:text-white font-semibold">Allowed {currency}{r.allowedAmount.toFixed(2)}</p>
                        <p className="text-gray-500 dark:text-gray-400">Pt. resp. {currency}{r.patientResponsibility.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {priorAuth && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="size-4 text-gray-500 dark:text-gray-400" />
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Prior Authorization</h2>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                <span className={`font-bold ${priorAuth.status === "approved" ? "text-green-600 dark:text-green-400" : priorAuth.status === "denied" ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}`}>
                  {priorAuth.status.replace(/_/g, " ").toUpperCase()}
                </span>
                {priorAuth.authorizationNumber ? ` · Auth #${priorAuth.authorizationNumber}` : ""}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {priorAuth.serviceType} · {priorAuth.validUntil ? `Valid until ${formatDate(priorAuth.validUntil)}` : "No expiry set"}
              </p>
            </div>
          )}

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
              {claim && (
                <Link
                  to={`/claims/${claim.id}/superbill`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <FileText className="size-4 text-gray-500 dark:text-gray-400" /> Superbill
                  </span>
                  <span className="text-xs font-semibold text-[#043570] dark:text-blue-300">Open →</span>
                </Link>
              )}
              {claim && (
                <Link
                  to={`/claims/${claim.id}/cms1500`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <FileText className="size-4 text-gray-500 dark:text-gray-400" /> CMS-1500 Form
                  </span>
                  <span className="text-xs font-semibold text-[#043570] dark:text-blue-300">Open →</span>
                </Link>
              )}
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
