import { useParams, useSearchParams } from "react-router";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useGoBack } from "../utils/useGoBack";

export function SuperbillDocument() {
  const { claimId, billId } = useParams();
  const [searchParams] = useSearchParams();
  const { claims, unbilledSessions } = useClaims();
  const { bills, clients, currentProviderId, providers } = usePartnerDashboard();

  const claim = claimId ? claims.find((c) => c.id === claimId || c.claimNumber === claimId) : undefined;

  const clientId = searchParams.get("clientId");
  const sessionIdsParam = searchParams.get("sessionIds") || "";
  const sessionIds = sessionIdsParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Batch superbill: one or more bill IDs passed via ?billIds=a,b,c
  // (single-bill links keep the legacy :billId route).
  const batchBillIds = (searchParams.get("billIds") || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const batchBills = batchBillIds
    .map((id) => bills.find((b) => b.id === id || b.billNumber === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const singleBill = billId
    ? bills.find((b) => b.id === billId || b.billNumber === billId)
    : undefined;

  // Selected client object
  const clientObj = clientId
    ? clients.find((c) => c.id === clientId)
    : singleBill
    ? clients.find((c) => c.id === singleBill.clientId || c.name === singleBill.clientName)
    : batchBills.length > 0
    ? clients.find((c) => c.id === batchBills[0].clientId || c.name === batchBills[0].clientName)
    : claim
    ? clients.find((c) => c.name === claim.clientName)
    : undefined;

  // A bill-based superbill (from the Bill hub) is rendered from a synthetic claim
  // so the printable layout is shared with claim superbills.
  let sourceClaim = claim;

  // If clientId and sessionIds/billIds provided
  if (!sourceClaim && clientId && (sessionIds.length > 0 || batchBills.length > 0)) {
    const matchingSessions = sessionIds.map((sId) => {
      const unbilled = unbilledSessions.find((s) => s.id === sId);
      if (unbilled) {
        return {
          id: unbilled.id,
          dateOfService: unbilled.dateOfService,
          cptCode: unbilled.cptCode || "90834",
          serviceDescription: unbilled.serviceDescription || "Psychotherapy, 45 min",
          diagnosisCode: unbilled.diagnosisCode || clientObj?.diagnosisCode || "F41.1",
          chargeAmount: unbilled.amount || 150,
        };
      }
      const b = bills.find((bill) => bill.id === sId || bill.sessionId === sId);
      if (b) {
        return {
          id: b.id,
          dateOfService: b.dateOfService || "2026-08-20",
          cptCode: b.cptCode || "90834",
          serviceDescription: b.serviceType || "Psychotherapy, 45 min",
          diagnosisCode: b.diagnosisCodes?.[0] || clientObj?.diagnosisCode || "F41.1",
          chargeAmount: b.amount || 150,
        };
      }
      return {
        id: sId,
        dateOfService: "2026-08-20",
        cptCode: "90834",
        serviceDescription: "Individual Psychotherapy, 45 min",
        diagnosisCode: clientObj?.diagnosisCode || "F41.1",
        chargeAmount: 150,
      };
    });

    const matchingBillsLines = batchBills.map((b) => ({
      id: `sl-${b.id}`,
      dateOfService: b.dateOfService || "2026-08-20",
      cptCode: b.cptCode || "90834",
      serviceDescription: b.serviceType || "Psychotherapy, 45 min",
      diagnosisCode: b.diagnosisCodes?.[0] || clientObj?.diagnosisCode || "F41.1",
      chargeAmount: b.amount,
    }));

    const allLines = [...matchingSessions, ...matchingBillsLines];

    if (allLines.length > 0) {
      sourceClaim = {
        id: `superbill-${clientId}-${Date.now()}`,
        claimNumber: `SB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName: clientObj?.name || "Client",
        providerId: currentProviderId || "prov-1",
        diagnosisCodes: allLines.map((l) => l.diagnosisCode),
        totalAmount: allLines.reduce((acc, l) => acc + l.chargeAmount, 0),
        serviceLines: allLines.map((l) => ({
          id: `sl-${l.id}`,
          sessionId: l.id,
          dateOfService: l.dateOfService,
          serviceCode: l.cptCode,
          units: 1,
          chargeAmount: l.chargeAmount,
        })),
      };
    }
  }

  if (!sourceClaim && batchBills.length > 0) {
    sourceClaim = {
      id: batchBills.map((b) => b.id).join(","),
      claimNumber: batchBills.length === 1 ? batchBills[0].billNumber : `BATCH-${batchBills.length}`,
      clientName: batchBills[0].clientName,
      providerId: batchBills[0].providerId,
      diagnosisCodes: batchBills[0].diagnosisCodes,
      totalAmount: batchBills.reduce((acc, b) => acc + b.amount, 0),
      serviceLines: batchBills.map((b) => ({
        id: `sl-${b.id}`,
        sessionId: b.sessionId,
        dateOfService: b.dateOfService,
        serviceCode: b.cptCode,
        units: 1,
        chargeAmount: b.amount,
      })),
    };
  }
  if (!sourceClaim && singleBill) {
    sourceClaim = {
      id: singleBill.id,
      claimNumber: singleBill.billNumber,
      clientName: singleBill.clientName,
      providerId: singleBill.providerId,
      diagnosisCodes: singleBill.diagnosisCodes,
      totalAmount: singleBill.amount,
      serviceLines: [{
        id: `sl-${singleBill.id}`,
        sessionId: singleBill.sessionId,
        dateOfService: singleBill.dateOfService,
        serviceCode: singleBill.cptCode,
        units: 1,
        chargeAmount: singleBill.amount,
      }],
    };
  }

  const provider = providers.find((p) => p.id === (sourceClaim?.providerId || currentProviderId)) || providers[0];

  const handleBack = useGoBack(
    claim ? `/claims/${claim.id}` : billId ? `/billing/bills/${billId}` : "/billing"
  );

  if (!sourceClaim) {
    return (
      <div className="space-y-6">
        <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-lg"><ArrowLeft className="size-6" /></button>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <p className="text-gray-500">Superbill source not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Superbill</h1>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Printer className="size-4" />
            Print
          </button>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="max-w-[800px] mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Superbill</h2>
            <p className="text-sm text-gray-500">For Insurance Reimbursement</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Provider</h3>
              <p className="font-medium text-gray-900 dark:text-white">{provider?.name || "Provider Name"}</p>
              <p className="text-sm text-gray-600">NPI: 1982736405</p>
              <p className="text-sm text-gray-600">100 Healthcare Plaza, Suite 400</p>
              <p className="text-sm text-gray-600">San Francisco, CA 94103</p>
              <p className="text-sm text-gray-600">+1 (800) 555-0199</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Patient</h3>
              <p className="font-medium text-gray-900 dark:text-white">{sourceClaim.clientName}</p>
              {clientObj?.insuranceCompany && (
                <p className="text-sm text-gray-600">Insurance: {clientObj.insuranceCompany}</p>
              )}
              {clientObj?.memberId && (
                <p className="text-sm text-gray-600">Member ID: {clientObj.memberId}</p>
              )}
              {clientObj?.address && (
                <p className="text-sm text-gray-600">{clientObj.address}</p>
              )}
              {clientObj?.phone && (
                <p className="text-sm text-gray-600">{clientObj.phone}</p>
              )}
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
              {sourceClaim.serviceLines.map((sl, i) => (
                <tr key={sl.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white">{sl.dateOfService}</td>
                  <td className="py-2 text-gray-600">Individual Therapy</td>
                  <td className="py-2 text-gray-900 dark:text-white">{sl.serviceCode}</td>
                  <td className="py-2 text-gray-900 dark:text-white">{sourceClaim.diagnosisCodes[i] || sourceClaim.diagnosisCodes[0] || ""}</td>
                  <td className="py-2 text-right text-gray-900 dark:text-white">${sl.chargeAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-right py-3 font-semibold text-gray-900 dark:text-white">Total Charged:</td>
                <td className="text-right py-3 font-semibold text-gray-900 dark:text-white">${sourceClaim.totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-xs text-gray-500">
            <p>This is not a bill. This document is for informational purposes only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
