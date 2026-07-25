import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Download, CheckCircle2, Building, User, Calendar, Receipt } from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { FIELD_CONFIGS } from "../components/claims/ClaimDetailsForm";
import { getCurrencySymbol } from "../types/claims";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function SuperbillDocument() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { claims } = useClaims();
  const { clients, providers, currentProviderId } = usePartnerDashboard();

  const claim = claimId ? claims.find((c) => c.id === claimId || c.claimNumber === claimId) : undefined;
  const currentProvider = providers.find((p) => p.id === currentProviderId) || providers[0];

  const handleBack = () => {
    if (claim) {
      navigate(`/claims/${claim.id}`);
    } else {
      navigate("/claims");
    }
  };

  if (!claim) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Claim Not Found</h1>
          <button onClick={() => navigate("/claims")} className="text-[#10b981] hover:underline">Back to Claims</button>
        </div>
      </div>
    );
  }

  const config = FIELD_CONFIGS[claim.region];
  const symbol = getCurrencySymbol(claim.currency);
  const clientObj = clients.find((c) => c.id === claim.clientId);
  const isUS = claim.region === "US";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 print:hidden">
        <div className="max-w-[960px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Superbill & Receipt Statement</h1>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-sm font-medium transition-colors shadow-md">
            <Download className="size-4" />
            Print / Download Receipt
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 py-8">
        <div className="max-w-[960px] mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative">
            {/* Watermark / Paid Stamp */}
            <div className="absolute top-6 right-8 rotate-[-12deg] pointer-events-none opacity-90 hidden md:block">
              <div className="border-4 border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="size-4" />
                PAID IN FULL — RECEIPT
              </div>
            </div>

            {/* Letterhead Header */}
            <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700 bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    <Receipt className="size-4" />
                    Out-Of-Network Superbill & Payment Receipt
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{currentProvider?.name || "Mantra Health Services"}</h2>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">{currentProvider?.role || "Licensed Behavioral Health Provider"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Practice Address: 100 Healthcare Plaza, Suite 400</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Phone: +1 (800) 555-0199 | Email: billing@mantrahealth.com</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-left min-w-[220px]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Statement Summary</p>
                  <p className="text-xs text-gray-500">Statement #: <span className="font-mono font-bold text-gray-900 dark:text-white">{claim.claimNumber}</span></p>
                  <p className="text-xs text-gray-500 mt-1">Date Issued: <span className="font-medium text-gray-900 dark:text-white">{new Date(claim.createdAt).toLocaleDateString()}</span></p>
                  <p className="text-xs text-gray-500 mt-1">Region: <span className="font-bold text-gray-900 dark:text-white">{claim.region}</span></p>
                  {isUS && (
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                      NPI: 1982736405 | Tax ID: XX-XXX4920
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Patient Details */}
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
                  <User className="size-4 text-emerald-600" />
                  Patient & Client Statement Info
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Patient Name</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{claim.clientName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Account / Client ID</p>
                    <p className="text-sm font-mono font-medium text-gray-800 dark:text-gray-200">{claim.clientId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Payment Status</p>
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      PAID IN FULL
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Patient Balance</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{symbol}0.00</p>
                  </div>
                </div>
              </div>

              {/* Diagnosis Codes */}
              {claim.diagnosisCodes.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{config.diagnosisLabel}</h3>
                  <div className="flex flex-wrap gap-2">
                    {claim.diagnosisCodes.map((code, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 rounded-lg text-xs font-medium">
                        <span className="size-4 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Itemized Services Rendered & Charges */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Itemized Services & Charges Paid</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-emerald-100/50 dark:bg-emerald-950/30 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase">Date of Service</th>
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase">{config.serviceCodeLabel}</th>
                        <th className="text-center py-3 px-4 text-xs font-bold uppercase">Units</th>
                        <th className="text-right py-3 px-4 text-xs font-bold uppercase">Fee Charged</th>
                        <th className="text-right py-3 px-4 text-xs font-bold uppercase">Amount Paid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {claim.serviceLines.map((sl) => (
                        <tr key={sl.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                          <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{sl.dateOfService}</td>
                          <td className="py-3 px-4 text-gray-900 dark:text-white">
                            <span className="font-mono font-semibold">{sl.serviceCode}</span>
                            {sl.modifiers && sl.modifiers.length > 0 && (
                              <span className="text-xs text-gray-500 ml-1">({sl.modifiers.join(", ")})</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900 dark:text-white font-medium">{sl.units}</td>
                          <td className="py-3 px-4 text-right text-gray-900 dark:text-white">{symbol}{sl.chargeAmount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-emerald-700 dark:text-emerald-400 font-bold">{symbol}{sl.chargeAmount.toFixed(2)}</td>
                        </tr>
                      ))}
                      {claim.serviceLines.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-sm text-gray-400 dark:text-gray-500 italic">
                            No service lines recorded.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 dark:bg-gray-750 font-bold border-t-2 border-gray-300 dark:border-gray-600">
                        <td colSpan={4} className="py-4 px-4 text-right text-sm text-gray-900 dark:text-white uppercase">Total Amount Paid by Patient</td>
                        <td className="py-4 px-4 text-right text-base text-emerald-600 dark:text-emerald-400">{symbol}{claim.totalAmount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Patient Instructions Box */}
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl">
                <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed font-medium">
                  <span className="font-bold">INSTRUCTIONS FOR PATIENT REIMBURSEMENT:</span> This Superbill serves as your official payment receipt and itemized statement of services rendered. Attach this statement to your insurance plan's out-of-network reimbursement claim form and submit it directly to your insurance company.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 print:hidden">
              <button onClick={handleBack} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Back to Claim Details
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl font-medium transition-colors shadow-md">
                <Download className="size-4" />
                Print / Download Superbill Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}