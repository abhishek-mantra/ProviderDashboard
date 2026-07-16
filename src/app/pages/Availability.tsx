import { useState } from "react";
import { Clock, Trash2, X, ChevronDown, Check, Calendar, Lock, Globe } from "lucide-react";

type Tab = "timeSlot" | "dayOff" | "calendar";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface DayOff {
  id: string;
  date: string;
  startTime?: string;
  endTime?: string;
  startTime2?: string;
  endTime2?: string;
  fullDay?: boolean;
  repeat: boolean;
}

interface AvailabilityForm {
  fromHour: string;
  fromMinute: string;
  fromPeriod: "AM" | "PM";
  toHour: string;
  toMinute: string;
  toPeriod: "AM" | "PM";
  days: string[];
}

interface DayOffForm {
  fromHour: string;
  fromMinute: string;
  fromPeriod: "AM" | "PM";
  toHour: string;
  toMinute: string;
  toPeriod: "AM" | "PM";
  date: string;
  repeatEveryYear: boolean;
  fullDay: boolean;
}

export function Availability() {
  const [activeTab, setActiveTab] = useState<Tab>("timeSlot");
  const [showAddAvailabilityModal, setShowAddAvailabilityModal] = useState(false);
  const [showAddDayOffModal, setShowAddDayOffModal] = useState(false);
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("(GMT-05:00) Eastern Time (US & Canada)");

  const timezones = [
    "(GMT-10:00) Hawaii",
    "(GMT-09:00) Alaska",
    "(GMT-08:00) Pacific Time (US & Canada)",
    "(GMT-07:00) Mountain Time (US & Canada)",
    "(GMT-06:00) Central Time (US & Canada)",
    "(GMT-05:00) Eastern Time (US & Canada)",
    "(GMT-04:00) Atlantic Time (Canada)",
    "(GMT-03:00) Buenos Aires, Georgetown",
    "(GMT-02:00) Mid-Atlantic",
    "(GMT-01:00) Azores, Cape Verde Islands",
    "(GMT+00:00) London, Dublin, Lisbon",
    "(GMT+01:00) Paris, Berlin, Rome",
    "(GMT+02:00) Athens, Cairo, Jerusalem",
    "(GMT+03:00) Moscow, Kuwait, Riyadh",
    "(GMT+04:00) Abu Dhabi, Muscat, Baku",
    "(GMT+05:00) Islamabad, Karachi",
    "(GMT+05:30) Mumbai, Kolkata, Chennai, New Delhi",
    "(GMT+06:00) Almaty, Dhaka",
    "(GMT+07:00) Bangkok, Hanoi, Jakarta",
    "(GMT+08:00) Beijing, Singapore, Hong Kong",
    "(GMT+09:00) Tokyo, Seoul, Osaka",
    "(GMT+10:00) Sydney, Melbourne, Brisbane",
    "(GMT+11:00) Magadan, Solomon Islands",
    "(GMT+12:00) Auckland, Wellington, Fiji"
  ];

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", day: "Monday", startTime: "9:00 AM", endTime: "5:00 PM" },
    { id: "2", day: "Tuesday", startTime: "9:00 AM", endTime: "5:00 PM" },
    { id: "3", day: "Wednesday", startTime: "3:00 PM", endTime: "4:00 PM" },
    { id: "4", day: "Wednesday", startTime: "9:00 AM", endTime: "10:00 AM" },
    { id: "5", day: "Thursday", startTime: "9:00 AM", endTime: "8:00 PM" },
    { id: "6", day: "Friday", startTime: "10:15 AM", endTime: "11:15 AM" },
    { id: "7", day: "Friday", startTime: "12:00 PM", endTime: "1:00 PM" },
    { id: "8", day: "Friday", startTime: "9:00 AM", endTime: "10:00 AM" },
    { id: "9", day: "Friday", startTime: "8:15 AM", endTime: "9:15 AM" },
    { id: "10", day: "Saturday", startTime: "9:00 AM", endTime: "5:00 PM" },
  ]);

  const [daysOff, setDaysOff] = useState<DayOff[]>([
    { id: "1", date: "Oct 25, 2023", fullDay: true, repeat: false },
    { id: "2", date: "Sep 25, 2023", startTime: "02:00", endTime: "04:00", startTime2: "15:00", endTime2: "04:00", repeat: true },
    { id: "3", date: "Feb 25, 2023", startTime: "06:00", endTime: "07:30", repeat: false },
  ]);

  const [availabilityForm, setAvailabilityForm] = useState<AvailabilityForm>({
    fromHour: "09",
    fromMinute: "00",
    fromPeriod: "AM",
    toHour: "05",
    toMinute: "00",
    toPeriod: "PM",
    days: [],
  });

  const [dayOffForm, setDayOffForm] = useState<DayOffForm>({
    fromHour: "09",
    fromMinute: "00",
    fromPeriod: "AM",
    toHour: "05",
    toMinute: "00",
    toPeriod: "PM",
    date: "",
    repeatEveryYear: false,
    fullDay: false,
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDay = (day: string) => {
    setAvailabilityForm((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const selectAllDays = () => {
    setAvailabilityForm((prev) => ({
      ...prev,
      days: weekDays,
    }));
  };

  const deleteTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const deleteDayOff = (id: string) => {
    setDaysOff(daysOff.filter((day) => day.id !== id));
  };

  const groupedTimeSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = [];
    }
    acc[slot.day].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 md:rounded-2xl md:shadow-sm md:border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Tabs */}
        <div className="bg-[#4169e1] px-3 md:px-6 py-3 md:py-4">
          {/* Mobile: Stack tabs and timezone vertically */}
          <div className="md:hidden space-y-3">
            {/* Tabs Row */}
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-3 px-3">
              <div className="flex gap-1.5 min-w-max">
                <button
                  onClick={() => setActiveTab("timeSlot")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === "timeSlot"
                      ? "bg-white text-[#4169e1] shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Time Slot
                </button>
                <button
                  onClick={() => setActiveTab("dayOff")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === "dayOff"
                      ? "bg-white text-[#4169e1] shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Days Off
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === "calendar"
                      ? "bg-white text-[#4169e1] shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Calendar Integration
                </button>
              </div>
            </div>

            {/* Timezone Row */}
            <div className="relative">
              <button
                onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all border border-white/20"
              >
                <div className="flex items-center gap-2">
                  <Globe className="size-3.5" />
                  <span className="truncate">{selectedTimezone}</span>
                </div>
                <ChevronDown className="size-3.5 flex-shrink-0" />
              </button>

              {showTimezoneDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowTimezoneDropdown(false)}
                  />
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 max-h-[300px] overflow-y-auto">
                    {timezones.map((timezone) => (
                      <button
                        key={timezone}
                        onClick={() => {
                          setSelectedTimezone(timezone);
                          setShowTimezoneDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          selectedTimezone === timezone
                            ? "bg-blue-50 dark:bg-blue-900/20 text-[#4169e1] font-medium"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {timezone}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop: Keep tabs and timezone on same row */}
          <div className="hidden md:flex items-center justify-between gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setActiveTab("timeSlot")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === "timeSlot"
                    ? "bg-white text-[#4169e1] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Time Slot
              </button>
              <button
                onClick={() => setActiveTab("dayOff")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === "dayOff"
                    ? "bg-white text-[#4169e1] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Days Off
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === "calendar"
                    ? "bg-white text-[#4169e1] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Calendar Integration
              </button>
            </div>

            {/* Timezone Filter */}
            <div className="relative">
              <button
                onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all whitespace-nowrap border border-white/20"
              >
                <Globe className="size-4" />
                <span>{selectedTimezone}</span>
                <ChevronDown className="size-4" />
              </button>

              {showTimezoneDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowTimezoneDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-[320px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 max-h-[300px] overflow-y-auto">
                    {timezones.map((timezone) => (
                      <button
                        key={timezone}
                        onClick={() => {
                          setSelectedTimezone(timezone);
                          setShowTimezoneDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          selectedTimezone === timezone
                            ? "bg-blue-50 dark:bg-blue-900/20 text-[#4169e1] font-medium"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {timezone}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-3 md:p-8">
          {/* Time Slot Tab */}
          {activeTab === "timeSlot" && (
            <div>
              <div className="space-y-0">
                {dayOrder.map((day, dayIndex) => {
                  const slots = groupedTimeSlots[day];
                  if (!slots) return null;

                  return (
                    <div key={day}>
                      {dayIndex > 0 && <div className="border-t border-[#00c0ff] my-6"></div>}
                      <h3 className="text-base font-semibold text-[#043570] dark:text-white mb-4">
                        {day}
                      </h3>
                      <div className="space-y-2.5">
                        {slots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#f3faff] dark:bg-cyan-900/20 rounded-full">
                              <Clock className="size-4 text-[#00c0ff]" />
                              <span className="text-sm font-medium text-[#043570] dark:text-gray-300">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            <button
                              onClick={() => deleteTimeSlot(slot.id)}
                              className="text-[#FF6B6B] hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setShowAddAvailabilityModal(true)}
                className="mt-8 w-full bg-[#00c0ff] hover:bg-[#00a8e8] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Add Time Slots
              </button>
            </div>
          )}

          {/* Day Off Tab */}
          {activeTab === "dayOff" && (
            <div>
              <div>
                {/* Table Header - Hidden on Mobile */}
                <div className="hidden md:grid grid-cols-[2fr_3fr_1.5fr_auto] gap-4 pb-2 mb-2">
                  <div className="text-base font-semibold text-[#043570] dark:text-gray-300">
                    Date
                  </div>
                  <div className="text-base font-semibold text-[#043570] dark:text-gray-300">
                    Duration
                  </div>
                  <div className="text-base font-semibold text-[#043570] dark:text-gray-300">
                    Repeat
                  </div>
                  <div></div>
                </div>

                {/* Table Body */}
                <div className="space-y-0">
                  {daysOff.map((dayOff, index) => (
                    <div key={dayOff.id}>
                      {/* Desktop Layout */}
                      <div className="hidden md:grid grid-cols-[2fr_3fr_1.5fr_auto] gap-4 items-center py-5">
                        <div className="text-sm text-[#043570] dark:text-white font-medium">
                          {dayOff.date}
                        </div>
                        <div className="text-sm text-[#043570] dark:text-gray-400">
                          {dayOff.fullDay ? (
                            <span className="inline-block px-4 py-1.5 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-sm font-medium">
                              Full Day
                            </span>
                          ) : (
                            <div className="space-y-1">
                              <div>{dayOff.startTime} - {dayOff.endTime}</div>
                              {dayOff.startTime2 && dayOff.endTime2 && (
                                <div>{dayOff.startTime2} - {dayOff.endTime2}</div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {dayOff.repeat && (
                            <div className="size-6 bg-[#4CAF50] rounded-full flex items-center justify-center">
                              <Check className="size-4 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => deleteDayOff(dayOff.id)}
                            className="text-[#FF6B6B] hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>

                      {/* Mobile Card Layout */}
                      <div className="md:hidden bg-white border border-gray-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-[10px] font-medium text-gray-500 uppercase mb-0.5">Date</div>
                            <div className="text-sm text-[#043570] dark:text-white font-semibold">
                              {dayOff.date}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteDayOff(dayOff.id)}
                            className="text-[#FF6B6B] hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        
                        <div className="mb-2">
                          <div className="text-[10px] font-medium text-gray-500 uppercase mb-1">Duration</div>
                          {dayOff.fullDay ? (
                            <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-medium">
                              Full Day
                            </span>
                          ) : (
                            <div className="space-y-0.5 text-xs text-[#043570] dark:text-gray-400">
                              <div>{dayOff.startTime} - {dayOff.endTime}</div>
                              {dayOff.startTime2 && dayOff.endTime2 && (
                                <div>{dayOff.startTime2} - {dayOff.endTime2}</div>
                              )}
                            </div>
                          )}
                        </div>

                        {dayOff.repeat && (
                          <div className="flex items-center gap-2">
                            <div className="size-5 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="size-3 text-white" strokeWidth={3} />
                            </div>
                            <span className="text-xs text-gray-600">Repeat Every Year</span>
                          </div>
                        )}
                      </div>

                      {/* Desktop Divider */}
                      {index < daysOff.length - 1 && (
                        <div className="hidden md:block border-t border-[#00c0ff]"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowAddDayOffModal(true)}
                className="mt-4 md:mt-8 w-full bg-[#00c0ff] hover:bg-[#00a8e8] text-white py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium transition-colors"
              >
                Add Day Off
              </button>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === "calendar" && (
            <div className="max-w-xl mx-auto">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start mb-6 md:mb-10">
                {/* Calendar Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl border border-gray-100 flex flex-col overflow-hidden">
                    {/* Calendar Top Bar */}
                    <div className="h-7 md:h-10 bg-[#0052A3] relative flex items-center justify-center">
                      <div className="absolute left-4 md:left-6 w-2 md:w-3 h-4 md:h-6 bg-[#4FC3F7] rounded-full"></div>
                      <div className="absolute right-4 md:right-6 w-2 md:w-3 h-4 md:h-6 bg-[#4FC3F7] rounded-full"></div>
                    </div>
                    {/* Calendar Body */}
                    <div className="flex-1 bg-white p-3 md:p-4 relative flex items-center justify-center">
                      {/* Calendar Dots - Top Row */}
                      <div className="absolute top-3 md:top-5 left-4 md:left-6 right-4 md:right-6 flex justify-between">
                        <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#81D4FA]"></div>
                        <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#81D4FA]"></div>
                        <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#81D4FA]"></div>
                      </div>
                      {/* Large Day Number and Small Dot */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-3xl md:text-5xl font-bold text-[#0052A3] mb-1 md:mb-2">11</div>
                        <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#0052A3]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 pt-0 md:pt-3 text-center md:text-left">
                  <h2 className="text-lg md:text-2xl font-semibold text-[#043570] mb-2 md:mb-3">
                    Sync with your Calendar
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Connect your calendar accounts to automatically sync appointments and prevent double bookings across all your platforms.
                  </p>
                </div>
              </div>

              {/* Connected Accounts Section */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-sm md:text-base font-semibold text-[#043570] mb-3 md:mb-4">
                  Connected Accounts
                </h3>
                
                {/* Google Account */}
                <div className="bg-white border border-gray-200 rounded-lg md:rounded-xl px-3 md:px-5 py-3 md:py-4 mb-2 md:mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 md:gap-4">
                    <div className="w-9 h-9 md:w-11 md:h-11 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base md:text-lg font-semibold">G</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-semibold text-[#043570]">Google</p>
                      <p className="text-[10px] md:text-xs text-gray-500 truncate">rachitdubey@mantra.care</p>
                    </div>
                  </div>
                  <button className="text-xs md:text-sm font-medium text-[#FF6B6B] hover:text-red-600 transition-colors whitespace-nowrap ml-2">
                    Disconnect
                  </button>
                </div>

                {/* Outlook Account */}
                <div className="bg-white border border-gray-200 rounded-lg md:rounded-xl px-3 md:px-5 py-3 md:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 md:gap-4">
                    <div className="w-9 h-9 md:w-11 md:h-11 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base md:text-lg font-semibold">O</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-semibold text-[#043570]">Outlook</p>
                      <p className="text-[10px] md:text-xs text-gray-500 truncate">rachitdubey@outlook.com</p>
                    </div>
                  </div>
                  <button className="text-xs md:text-sm font-medium text-[#FF6B6B] hover:text-red-600 transition-colors whitespace-nowrap ml-2">
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Connect New Account Section */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-xs md:text-sm font-medium text-[#6B7280] text-center mb-3 md:mb-5">
                  Connect New Account
                </h3>
                
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {/* Microsoft Button */}
                  <button className="bg-white border border-gray-300 rounded-lg md:rounded-xl px-2 md:px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" viewBox="0 0 21 21">
                      <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                      <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                      <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                      <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                    </svg>
                    <span className="text-xs md:text-sm font-medium text-[#043570]">Microsoft</span>
                  </button>

                  {/* Apple iCloud Button */}
                  <button className="bg-white border border-gray-300 rounded-lg md:rounded-xl px-2 md:px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#000000">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="text-xs md:text-sm font-medium text-[#043570]">Apple iCloud</span>
                  </button>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg md:rounded-xl px-3 md:px-5 py-3 md:py-4">
                <div className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-[#0066CC] rounded-lg flex items-center justify-center">
                      <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#0066CC]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-[#043570] mb-1 md:mb-1.5">
                      Your Privacy is Protected
                    </h4>
                    <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
                      We only sync appointment availability. Your personal calendar events and data remain completely private and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Availability Modal */}
      {showAddAvailabilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#00c0ff] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between rounded-t-xl md:rounded-t-2xl flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <Clock className="size-5 md:size-6 text-white" />
                <h2 className="text-base md:text-xl font-semibold text-white">Add Availability</h2>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden md:flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <span className="text-sm text-white">Asia/Calcutta</span>
                  <ChevronDown className="size-4 text-white" />
                </div>
                <button
                  onClick={() => setShowAddAvailabilityModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              {/* Mobile Timezone Display */}
              <div className="md:hidden mb-4 flex items-center justify-end">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                  <Globe className="size-3.5 text-[#00c0ff]" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Asia/Calcutta</span>
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-4 md:mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From
                    </label>
                    <div className="flex gap-1.5 md:gap-2">
                      <input
                        type="text"
                        value={availabilityForm.fromHour}
                        onChange={(e) =>
                          setAvailabilityForm({ ...availabilityForm, fromHour: e.target.value })
                        }
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white text-sm"
                        maxLength={2}
                      />
                      <span className="flex items-center text-gray-500">:</span>
                      <input
                        type="text"
                        value={availabilityForm.fromMinute}
                        onChange={(e) =>
                          setAvailabilityForm({ ...availabilityForm, fromMinute: e.target.value })
                        }
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white text-sm"
                        maxLength={2}
                      />
                      <select
                        value={availabilityForm.fromPeriod}
                        onChange={(e) =>
                          setAvailabilityForm({
                            ...availabilityForm,
                            fromPeriod: e.target.value as "AM" | "PM",
                          })
                        }
                        className="px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white text-sm"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To
                    </label>
                    <div className="flex gap-1.5 md:gap-2">
                      <input
                        type="text"
                        value={availabilityForm.toHour}
                        onChange={(e) =>
                          setAvailabilityForm({ ...availabilityForm, toHour: e.target.value })
                        }
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white text-sm"
                        maxLength={2}
                      />
                      <span className="flex items-center text-gray-500">:</span>
                      <input
                        type="text"
                        value={availabilityForm.toMinute}
                        onChange={(e) =>
                          setAvailabilityForm({ ...availabilityForm, toMinute: e.target.value })
                        }
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white text-sm"
                        maxLength={2}
                      />
                      <select
                        value={availabilityForm.toPeriod}
                        onChange={(e) =>
                          setAvailabilityForm({
                            ...availabilityForm,
                            toPeriod: e.target.value as "AM" | "PM",
                          })
                        }
                        className="px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white text-sm"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Days Selection */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Days</label>
                  <button
                    onClick={selectAllDays}
                    className="text-xs md:text-sm text-[#00c0ff] hover:text-[#00a8e8] font-medium"
                  >
                    Select All
                  </button>
                </div>
                <div className="flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2">
                  {weekDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`flex-1 min-w-[calc(14.28%-0.375rem)] py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                        availabilityForm.days.includes(day)
                          ? "bg-[#00c0ff] text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 md:gap-3">
                <button
                  onClick={() => setShowAddAvailabilityModal(false)}
                  className="w-full bg-[#00c0ff] hover:bg-[#00a8e8] text-white py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
                >
                  Save & Apply
                </button>
                <button
                  onClick={() => setShowAddAvailabilityModal(false)}
                  className="w-full text-[#00c0ff] hover:text-[#00a8e8] py-2 font-medium transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Day Off Modal */}
      {showAddDayOffModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#00c0ff] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between rounded-t-xl md:rounded-t-2xl flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <Clock className="size-5 md:size-6 text-white" />
                <h2 className="text-base md:text-xl font-semibold text-white">Add Day Off</h2>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden md:flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <span className="text-sm text-white">Asia/Calcutta</span>
                  <ChevronDown className="size-4 text-white" />
                </div>
                <button
                  onClick={() => setShowAddDayOffModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              {/* Mobile Timezone Display */}
              <div className="md:hidden mb-4 flex items-center justify-end">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                  <Globe className="size-3.5 text-[#00c0ff]" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Asia/Calcutta</span>
                </div>
              </div>

              {/* Time Section */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={dayOffForm.fullDay}
                      onChange={(e) =>
                        setDayOffForm({ ...dayOffForm, fullDay: e.target.checked })
                      }
                      className="rounded text-[#00c0ff] focus:ring-[#00c0ff]"
                    />
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Full Day</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From
                    </label>
                    <div className="flex gap-1.5 md:gap-2">
                      <input
                        type="text"
                        value={dayOffForm.fromHour}
                        onChange={(e) =>
                          setDayOffForm({ ...dayOffForm, fromHour: e.target.value })
                        }
                        disabled={dayOffForm.fullDay}
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white disabled:opacity-50 text-sm"
                        maxLength={2}
                      />
                      <span className="flex items-center text-gray-500">:</span>
                      <input
                        type="text"
                        value={dayOffForm.fromMinute}
                        onChange={(e) =>
                          setDayOffForm({ ...dayOffForm, fromMinute: e.target.value })
                        }
                        disabled={dayOffForm.fullDay}
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white disabled:opacity-50 text-sm"
                        maxLength={2}
                      />
                      <select
                        value={dayOffForm.fromPeriod}
                        onChange={(e) =>
                          setDayOffForm({
                            ...dayOffForm,
                            fromPeriod: e.target.value as "AM" | "PM",
                          })
                        }
                        disabled={dayOffForm.fullDay}
                        className="px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white disabled:opacity-50 text-sm"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To
                    </label>
                    <div className="flex gap-1.5 md:gap-2">
                      <input
                        type="text"
                        value={dayOffForm.toHour}
                        onChange={(e) =>
                          setDayOffForm({ ...dayOffForm, toHour: e.target.value })
                        }
                        disabled={dayOffForm.fullDay}
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white disabled:opacity-50 text-sm"
                        maxLength={2}
                      />
                      <span className="flex items-center text-gray-500">:</span>
                      <input
                        type="text"
                        value={dayOffForm.toMinute}
                        onChange={(e) =>
                          setDayOffForm({ ...dayOffForm, toMinute: e.target.value })
                        }
                        disabled={dayOffForm.fullDay}
                        className="w-12 md:w-16 px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white disabled:opacity-50 text-sm"
                        maxLength={2}
                      />
                      <select
                        value={dayOffForm.toPeriod}
                        onChange={(e) =>
                          setDayOffForm({
                            ...dayOffForm,
                            toPeriod: e.target.value as "AM" | "PM",
                          })
                        }
                        disabled={dayOffForm.fullDay}
                        className="px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white disabled:opacity-50 text-sm"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Section */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={dayOffForm.repeatEveryYear}
                      onChange={(e) =>
                        setDayOffForm({ ...dayOffForm, repeatEveryYear: e.target.checked })
                      }
                      className="rounded text-[#00c0ff] focus:ring-[#00c0ff]"
                    />
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Repeat Every Year</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    value={dayOffForm.date}
                    onChange={(e) => setDayOffForm({ ...dayOffForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00c0ff] dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 md:gap-3">
                <button
                  onClick={() => setShowAddDayOffModal(false)}
                  className="w-full bg-[#00c0ff] hover:bg-[#00a8e8] text-white py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
                >
                  Save & Apply
                </button>
                <button
                  onClick={() => setShowAddDayOffModal(false)}
                  className="w-full text-[#00c0ff] hover:text-[#00a8e8] py-2 font-medium transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}