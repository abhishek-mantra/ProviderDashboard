import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function SuperbillDocument() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { claims } = useClaims();
  const { currentProviderId, providers } = usePartnerDashboard();

  const claim = claims.find((c) => c.id === claimId || c.claimNumber === claimId);
  const provider = providers.find((p) => p.id === (claim?.providerId || currentProviderId)) || providers[0];

  if (!claim) {
    return (
      <div className="space-y-6">
        <button onClick={() => navigate("/insurance?tab=claims")} className="p-1 hover:bg-gray-100 rounded-lg"><ArrowLeft className="size-6" /></button>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <p className="text-gray-500">Claim not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(`/claims/${claim.id}`)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
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
              <p className="font-medium text-gray-900 dark:text-white">{claim.clientName}</p>
              <p className="text-sm text-gray-600">DOB: —</p>
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
              {claim.serviceLines.map((sl, i) => (
                <tr key={sl.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white">{sl.dateOfService}</td>
                  <td className="py-2 text-gray-600">Individual Therapy</td>
                  <td className="py-2 text-gray-900 dark:text-white">{sl.serviceCode}</td>
                  <td className="py-2 text-gray-900 dark:text-white">{claim.diagnosisCodes[i] || claim.diagnosisCodes[0] || ""}</td>
                  <td className="py-2 text-right text-gray-900 dark:text-white">${sl.chargeAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-right py-3 font-semibold text-gray-900 dark:text-white">Total Charged:</td>
                <td className="text-right py-3 font-semibold text-gray-900 dark:text-white">${claim.totalAmount.toFixed(2)}</td>
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
