import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Download, ShieldCheck, Building2, FileCheck } from "lucide-react";
import { useClaims } from "../contexts/ClaimContext";
import { FIELD_CONFIGS } from "../components/claims/ClaimDetailsForm";
import { getCurrencySymbol } from "../types/claims";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function ItemizedClaimSummary() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { clients, providers, currentProviderId, currentPracticeId, isCurrentUserSuperAdmin } = usePartnerDashboard();
  const { claims } = useClaims();

  const rawClaim = claimId ? claims.find((c) => c.id === claimId || c.claimNumber === claimId) : undefined;
  const claim =
    rawClaim && (isCurrentUserSuperAdmin || !rawClaim.practiceId || rawClaim.practiceId === currentPracticeId)
      ? rawClaim
      : undefined;
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
          <button onClick={() => navigate("/claims")} className="text-[#4169E1] hover:underline">Back to Claims</button>
        </div>
      </div>
    );
  }

  const config = FIELD_CONFIGS[claim.region];
  const symbol = getCurrencySymbol(claim.currency);
  const clientObj = clients.find((c) => c.id === claim.clientId);

  const regionalTitles: Record<string, { title: string; badge: string; color: string }> = {
    UK: {
      title: "United Kingdom Private Medical Insurance (PMI) Claim Statement",
      badge: "UK PMI Intermediary Direct Filing",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    },
    CA: {
      title: "TELUS Health eClaims Statement & Claim Submission Form",
      badge: "TELUS eClaims Verified",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
    AE: {
      title: "United Arab Emirates eClaimLink (DHA) Insurer Filing Summary",
      badge: "eClaimLink / DHA Compliant",
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    },
    US: {
      title: "Itemized Claim Summary Statement",
      badge: "Itemized Claim Filing",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    },
  };

  const regInfo = regionalTitles[claim.region] || regionalTitles.US;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 print:hidden">
        <div className="max-w-[960px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Insurance Claim Summary Document</h1>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl text-sm font-medium transition-colors">
            <Download className="size-4" />
            Print / Download
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 py-8">
        <div className="max-w-[960px] mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header Banner */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-[#043570] to-[#0a5ca8] text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold mb-2 text-cyan-200">
                    <FileCheck className="size-3.5" />
                    {regInfo.badge}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{regInfo.title}</h2>
                  <p className="text-xs text-blue-100 mt-1">Official Itemized Document for Insurer Reimbursement</p>
                </div>
                <div className="text-left md:text-right bg-white/10 p-3 rounded-xl backdrop-blur-md">
                  <p className="text-xs text-blue-200">Claim Number</p>
                  <p className="text-lg font-mono font-bold">{claim.claimNumber}</p>
                  <p className="text-xs text-blue-200 mt-1">Region: <span className="font-semibold text-white">{claim.region}</span></p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Practice & Provider Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-750 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                    <Building2 className="size-4 text-[#4169E1]" />
                    Practice & Provider Details
                  </h3>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{currentProvider?.name || "Mantra Health Clinic"}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{currentProvider?.role || "Licensed Mental Health Provider"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Provider ID: <span className="font-mono font-medium text-gray-800 dark:text-gray-200">{claim.providerId}</span></p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-[#4169E1]" />
                    Insurer & Payer Information
                  </h3>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{claim.payerName || "Direct Insurer Submission"}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Filing Intermediary: {claim.payerId || regInfo.badge}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Filing Date: <span className="font-medium text-gray-800 dark:text-gray-200">{new Date(claim.createdAt).toLocaleDateString()}</span></p>
                </div>
              </div>

              {/* Client & Coverage Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Client & Coverage Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-750 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Client Name</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{claim.clientName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Contact Email</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{clientObj?.email || "On File"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Insurance Region</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{claim.region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Claim Status</p>
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {claim.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnosis Codes */}
              {claim.diagnosisCodes.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{config.diagnosisLabel}</h3>
                  <div className="flex flex-wrap gap-2">
                    {claim.diagnosisCodes.map((code, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 rounded-lg text-xs font-medium">
                        <span className="size-4 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Lines Table */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Itemized Services Rendered</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase">Date of Service</th>
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase">{config.serviceCodeLabel}</th>
                        <th className="text-center py-3 px-4 text-xs font-bold uppercase">Units</th>
                        <th className="text-right py-3 px-4 text-xs font-bold uppercase">Charge Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {claim.serviceLines.map((sl) => (
                        <tr key={sl.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                          <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{sl.dateOfService}</td>
                          <td className="py-3 px-4 text-gray-900 dark:text-white">
                            <span className="font-mono font-semibold">{sl.serviceCode}</span>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900 dark:text-white font-medium">{sl.units}</td>
                          <td className="py-3 px-4 text-right text-gray-900 dark:text-white font-bold">{symbol}{sl.chargeAmount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 dark:bg-gray-750 font-bold border-t-2 border-gray-300 dark:border-gray-600">
                        <td colSpan={3} className="py-4 px-4 text-right text-sm text-gray-900 dark:text-white uppercase">Total Claim Value</td>
                        <td className="py-4 px-4 text-right text-base text-[#4169E1] dark:text-blue-400">{symbol}{claim.totalAmount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Official Disclaimer */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 bg-gray-50 dark:bg-gray-750 p-4 rounded-xl">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span className="font-bold text-gray-800 dark:text-gray-200">OFFICIAL FILING STATEMENT:</span> This is an itemized claim statement prepared for insurance filing. Submit this document directly to your insurer or health plan intermediary for reimbursement processing.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 print:hidden">
              <button onClick={handleBack} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Back to Claim Details
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors shadow-md">
                <Download className="size-4" />
                Print / Download Claim Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}