import { useState } from "react";
import {
  Bell,
  Save,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  Moon,
  Check,
  AlertCircle,
} from "lucide-react";


interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  inApp: boolean;
  email: boolean;
  push: boolean;
}

interface NotificationCategory {
  id: string;
  name: string;
  icon: typeof Bell;
  iconColor: string;
  bgColor: string;
  preferences: NotificationPreference[];
}

export function Notifications() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietHoursStart, setQuietHoursStart] = useState("22:00");
  const [quietHoursEnd, setQuietHoursEnd] = useState("08:00");

  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: "clients",
      name: "Client Activity",
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      preferences: [
        {
          id: "new-lead",
          label: "New Client Lead",
          description: "When a new client submits a request or inquiry",
          inApp: true,
          email: true,
          push: true,
        },
        {
          id: "client-message",
          label: "Client Messages",
          description: "When a client sends you a message",
          inApp: true,
          email: true,
          push: true,
        },
      ],
    },
    {
      id: "sessions",
      name: "Sessions & Appointments",
      icon: Calendar,
      iconColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      preferences: [
        {
          id: "session-reminder-1hr",
          label: "Session Reminder (1 hour before)",
          description: "Reminder for upcoming session in 1 hour",
          inApp: true,
          email: true,
          push: true,
        },
        {
          id: "session-cancelled",
          label: "Session Cancelled",
          description: "When a client cancels or reschedules a session",
          inApp: true,
          email: true,
          push: true,
        },
        {
          id: "session-notes-due",
          label: "Session Notes Due",
          description: "Reminder to complete session notes",
          inApp: true,
          email: true,
          push: true,
        },
      ],
    },
    {
      id: "billing",
      name: "Billing & Payments",
      icon: CreditCard,
      iconColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      preferences: [
        {
          id: "payment-received",
          label: "Payment Received",
          description: "When you receive a payment from a client",
          inApp: true,
          email: true,
          push: true,
        },
        {
          id: "invoice-overdue",
          label: "Invoice Overdue",
          description: "When an invoice is past due",
          inApp: true,
          email: true,
          push: true,
        },
      ],
    },
    {
      id: "system",
      name: "System & Updates",
      icon: Settings,
      iconColor: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-700/20",
      preferences: [
        {
          id: "platform-updates",
          label: "Platform Updates",
          description: "New features and important platform announcements",
          inApp: true,
          email: true,
          push: true,
        },
      ],
    },
  ]);

  const handleToggle = (categoryId: string, prefId: string, type: "inApp" | "email" | "push") => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              preferences: category.preferences.map((pref) =>
                pref.id === prefId
                  ? {
                      ...pref,
                      [type]: !pref[type],
                    }
                  : pref
              ),
            }
          : category
      )
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    }, 1000);
  };

  return (
    <div>
      {/* Success Message */}
      {showSavedMessage && (
        <div className="mb-4 md:mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3 mx-3 md:mx-0">
          <div className="size-7 md:size-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="size-4 md:size-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-green-900 dark:text-green-100 text-sm md:text-base">
              Preferences saved successfully!
            </p>
          </div>
        </div>
      )}

      {/* Quiet Hours */}
      <div className="bg-white dark:bg-gray-800 md:rounded-xl border-0 md:border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
              <Moon className="size-4 md:size-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Quiet Hours</h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Pause non-urgent notifications during specific hours
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={quietHoursEnabled}
              onChange={(e) => setQuietHoursEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 md:w-11 h-5 md:h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 md:after:h-5 after:w-4 md:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00c0ff]"></div>
          </label>
        </div>
        {quietHoursEnabled && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
              <label className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
                From
              </label>
              <input
                type="time"
                value={quietHoursStart}
                onChange={(e) => setQuietHoursStart(e.target.value)}
                className="flex-1 sm:flex-none px-2.5 md:px-3 py-1.5 md:py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-xs md:text-sm"
              />
            </div>
            <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
              <label className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
                To
              </label>
              <input
                type="time"
                value={quietHoursEnd}
                onChange={(e) => setQuietHoursEnd(e.target.value)}
                className="flex-1 sm:flex-none px-2.5 md:px-3 py-1.5 md:py-2 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-xs md:text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Notification Categories */}
      <div className="space-y-3 md:space-y-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 md:rounded-xl border-0 md:border border-gray-200 dark:border-gray-700 p-4 md:p-6"
            >
              {/* Category Header */}
              <div className="flex items-start md:items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className={`size-8 md:size-10 ${category.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`size-4 md:size-5 ${category.iconColor}`} />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white flex-1">
                  {category.name}
                </h3>
                {/* Checkbox Labels - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-11 text-center">In-app</span>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-11 text-center">Email</span>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-11 text-center">Push</span>
                </div>
              </div>

              {/* Category Preferences */}
              <div className="space-y-2 md:space-y-3">
                {category.preferences.map((pref) => (
                  <div key={pref.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors gap-3 md:gap-0">
                    <div className="flex-1 md:pr-4">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm md:text-sm">
                        {pref.label}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {pref.description}
                      </p>
                    </div>
                    {/* Mobile: Labels with toggles */}
                    <div className="flex md:hidden flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">In-app notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pref.inApp}
                            onChange={() => handleToggle(category.id, pref.id, "inApp")}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#00c0ff]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Email notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pref.email}
                            onChange={() => handleToggle(category.id, pref.id, "email")}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#00c0ff]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Push notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pref.push}
                            onChange={() => handleToggle(category.id, pref.id, "push")}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#00c0ff]"></div>
                        </label>
                      </div>
                    </div>
                    {/* Desktop: Toggle switches only */}
                    <div className="hidden md:flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pref.inApp}
                          onChange={() => handleToggle(category.id, pref.id, "inApp")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00c0ff]"></div>
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pref.email}
                          onChange={() => handleToggle(category.id, pref.id, "email")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00c0ff]"></div>
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pref.push}
                          onChange={() => handleToggle(category.id, pref.id, "push")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00c0ff]"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Save Button */}
      <div className="mt-4 md:mt-6 flex justify-end px-3 md:px-0">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto bg-[#00c0ff] hover:bg-[#00a8e0] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm text-sm md:text-base"
        >
          {isSaving ? (
            <>
              <div className="size-3.5 md:size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="size-3.5 md:size-4" />
              Save Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
}