import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, Clock, FileText, User } from "lucide-react";

export function ClaimDetail() {
  const navigate = useNavigate();
  const { id, claimId } = useParams();

  // Mock claim data - would come from API in real app
  const claim = {
    id: claimId,
    claimId: `CLM-2024-${claimId?.padStart(3, "0")}`,
    status: claimId === "001" ? "paid" : claimId === "002" ? "submitted" : "accepted",
    dateOfService: claimId === "001" ? "Feb 1, 2024" : claimId === "002" ? "Feb 8, 2024" : "Feb 15, 2024",
    dateSubmitted: claimId === "001" ? "Feb 2, 2024" : claimId === "002" ? "Feb 8, 2024" : "Feb 15, 2024",
    lastUpdated: claimId === "001" ? "Feb 15, 2024" : claimId === "002" ? "Feb 9, 2024" : "Feb 16, 2024",
    payer: "Blue Cross Blue Shield",
    memberId: "ABC123456789",
    planId: "PPO-1234",
    amountBilled: 150.0,
    amountPaid: claimId === "001" ? 120.0 : 0,
    clientResponsibility: 30.0,
    sessions: [
      {
        date: "Feb 1, 2024",
        time: "10:00 AM",
        duration: "60 min",
        type: "Therapy Session",
        cptCode: "90834",
        amount: 150.0,
      },
    ],
    notes: "Initial therapy session for anxiety management. Client responsive and engaged.",
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "submitted":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "accepted":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      case "denied":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/clients/${id}/insurance`)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Claim {claim.claimId}
          </h1>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusStyles(
            claim.status
          )}`}
        >
          {claim.status}
        </span>
      </div>

      {/* Claim Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <FileText className="size-5 text-[#4169E1]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Claim Details</h2>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date of Service</p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {claim.dateOfService}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date Submitted</p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {claim.dateSubmitted}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Updated</p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {claim.lastUpdated}
              </p>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Insurance Information
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payer</p>
                <p className="text-sm text-gray-900 dark:text-white">{claim.payer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Member ID</p>
                <p className="text-sm text-gray-900 dark:text-white">{claim.memberId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Plan ID</p>
                <p className="text-sm text-gray-900 dark:text-white">{claim.planId}</p>
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Sessions Included
            </h3>
            <div className="space-y-3">
              {claim.sessions.map((session, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {session.type}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-4" />
                          <span>
                            {session.time} • {session.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">CPT Code</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {session.cptCode}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${session.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Amount Billed</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${claim.amountBilled.toFixed(2)}
                  </span>
                </div>
                {claim.amountPaid > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Amount Paid</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      ${claim.amountPaid.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Client Responsibility
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${claim.clientResponsibility.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    ${claim.amountBilled.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {claim.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Claim Notes
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{claim.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
