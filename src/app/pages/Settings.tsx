import { Outlet, Link, useLocation } from "react-router";
import {
  Calendar,
  Users,
  CreditCard,
  Bell,
  Building2,
  Settings as SettingsIcon
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function Settings() {
  const location = useLocation();
  const { isCurrentUserAdmin } = usePartnerDashboard();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const navItems = [
    { path: "/settings/availability", label: "Availability", icon: Calendar },
    { path: "/settings/practice-details", label: "Practice Details", icon: Building2 },
    { path: "/settings/notifications", label: "Notifications", icon: Bell },
    { path: "/settings/billing/plans", label: "Subscription", icon: CreditCard },
    ...(isCurrentUserAdmin ? [{ path: "/settings/team-management", label: "Manage Team", icon: Users }] : []),
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start gap-4">
          <div className="size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800 flex-shrink-0">
            <SettingsIcon className="size-5 text-[#1E293B] dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your account preferences and configurations
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Tabs - only show on mobile */}
      <div className="flex md:hidden overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
        <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1 rounded-xl w-fit border border-gray-200 dark:border-gray-700 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all text-xs whitespace-nowrap ${
                  active
                    ? "bg-[#043570] text-white shadow-sm"
                    : "bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {Icon && <Icon className="size-3.5" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop: Two-column layout */}
      <div className="hidden md:flex gap-6">
        {/* Left Sidebar */}
        <div style={{ width: "220px", flexShrink: 0 }} className="bg-white dark:bg-gray-800 rounded-xl border border-[#E5E7EB] dark:border-gray-700 shadow-sm p-2 h-fit">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.path === "/settings/billing/plans"
              ? isActive("/settings/billing")
              : isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-2 text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#EFF6FF] dark:bg-blue-900/20 text-[#1A73E8] dark:text-[#60A5FA] font-semibold border-l-[3px] border-[#1A73E8]"
                    : "text-gray-700 dark:text-gray-300 hover:bg-[#F1F5F9] dark:hover:bg-gray-700"
                }`}
              >
                {Icon && <Icon className="size-4" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-[#E5E7EB] dark:border-gray-700 shadow-sm p-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile: Full-width content */}
      <div className="md:hidden">
        <Outlet />
      </div>
    </div>
  );
}
