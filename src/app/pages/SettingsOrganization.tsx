import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function SettingsOrganization() {
  const { getCurrentEstablishment, members: allMembers } = usePartnerDashboard();
  const est = getCurrentEstablishment();

  if (!est) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Organization</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">No organization selected.</p>
      </div>
    );
  }

  const activeMembers = allMembers.filter(
    (m) => m.establishmentId === est.id && m.memberStatus === "active"
  );

  const infoRows: { label: string; value: string }[] = [
    { label: "Organization Name", value: est.name },
    { label: "Type", value: est.type },
    { label: "Status", value: est.status === "live" ? "Live" : est.status === "draft" ? "Draft" : "Under Review" },
    { label: "Plan Tier", value: est.planTier === "growth" ? "Growth" : est.planTier === "pro" ? "Professional" : est.planTier === "starter" ? "Starter" : est.planTier === "enterprise" ? "Enterprise" : est.planTier },
    { label: "Active Team Members", value: String(activeMembers.length) },
    { label: "Address", value: `${est.streetAddress}, ${est.city}, ${est.state} ${est.pinCode}` },
    { label: "Accreditation", value: est.accreditation },
    { label: "Years in Operation", value: est.yearsInOperation },
    { label: "Last Confirmed", value: new Date(est.lastConfirmedAt).toLocaleDateString() },
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
