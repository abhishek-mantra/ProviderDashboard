import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function SettingsOrganization() {
  const { getCurrentEstablishment, getCurrentPractice, practiceMembers } = usePartnerDashboard();
  const est = getCurrentEstablishment();
  const practice = getCurrentPractice();

  if (!est) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Organization</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">No organization selected.</p>
      </div>
    );
  }

  const activeMembers = practiceMembers.filter(
    (m) => m.establishmentId === est.id && m.memberStatus === "active"
  );

  const infoRows: { label: string; value: string }[] = [
    { label: "Organization Name", value: est.name },
    { label: "Type", value: est.type },
    { label: "Plan Tier", value: est.planTier },
    { label: "Active Team Members", value: String(activeMembers.length) },
    { label: "Accreditation", value: est.accreditation },
    { label: "Years in Operation", value: est.yearsInOperation },
    { label: "Last Confirmed", value: new Date(est.lastConfirmedAt).toLocaleDateString() },
    ...(practice
      ? [
          { label: "Practice", value: practice.name },
          { label: "Address", value: `${practice.streetAddress}, ${practice.city}, ${practice.state} ${practice.pinCode}` },
          { label: "Practice Status", value: practice.status === "live" ? "Live" : practice.status === "draft" ? "Draft" : "Under Review" },
        ]
      : []),
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Organization</h2>

      <div className="space-y-3">
        {infoRows.map((row) => (
          <div
            key={row.label}
            className="flex items-start gap-4 pb-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
          >
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-44 shrink-0">
              {row.label}
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
