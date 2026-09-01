import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Shield,
  Bell,
  Mail,
  Phone,
  Calendar,
  Globe,
  Clock,
  Lock,
  Camera,
  Check,
  LogOut,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  Award,
  FileBadge,
  Smartphone,
  Laptop,
  ShieldAlert,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { SPECIALTIES, Specialty } from "../types/partnerDashboard";

export function Profile() {
  const navigate = useNavigate();
  const { currentProviderId, providers, updateProvider } = usePartnerDashboard();

  const activeProvider = providers.find((p) => p.id === currentProviderId) || providers[0] || {
    id: "prov-admin",
    name: "Abhishek Madaan",
    email: "abhishek.madaan@mantra.care",
    profession: "Therapy",
    credentialExpiresAt: "2027-12-31",
    rating: 4.9,
    verificationStatus: "verified",
    planMode: "full-ehr",
  };

  const [activeTab, setActiveTab] = useState<"personal" | "security" | "notifications">("personal");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: activeProvider.name || "Abhishek Madaan",
    email: activeProvider.email || "abhishek.madaan@mantra.care",
    countryCode: "+1",
    phoneNumber: activeProvider.phone || "555-019-2834",
    gender: activeProvider.gender || "Male",
    birthDate: activeProvider.birthDate || "1988-06-15",
    language: activeProvider.language || "English (English)",
    country: activeProvider.country || "United States",
    timezone: activeProvider.timezone || "Asia/Kolkata",
    profession: (activeProvider.profession || "Therapy") as Specialty,
    npiNumber: activeProvider.npiNumber || "1948204918",
    licenseNumber: activeProvider.licenseNumber || "LCSW-98412",
    licenseState: activeProvider.licenseState || "NY",
    bio: activeProvider.bio || "Licensed Clinical Psychologist specializing in Cognitive Behavioral Therapy and Mindfulness-based interventions.",
    avatarUrl: activeProvider.avatarUrl || "",
  });

  // Password & Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notification State
  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    emailReferrals: true,
    emailBilling: true,
    smsAppointments: true,
    smsUrgentAlerts: false,
    clinicalReminders: true,
  });

  // Sync if activeProvider changes
  useEffect(() => {
    if (activeProvider) {
      setFormData((prev) => ({
        ...prev,
        name: activeProvider.name || prev.name,
        email: activeProvider.email || prev.email,
        phoneNumber: activeProvider.phone || prev.phoneNumber,
        gender: activeProvider.gender || prev.gender,
        birthDate: activeProvider.birthDate || prev.birthDate,
        language: activeProvider.language || prev.language,
        country: activeProvider.country || prev.country,
        timezone: activeProvider.timezone || prev.timezone,
        profession: (activeProvider.profession || prev.profession) as Specialty,
        npiNumber: activeProvider.npiNumber || prev.npiNumber,
        licenseNumber: activeProvider.licenseNumber || prev.licenseNumber,
        licenseState: activeProvider.licenseState || prev.licenseState,
        bio: activeProvider.bio || prev.bio,
        avatarUrl: activeProvider.avatarUrl || prev.avatarUrl,
      }));
    }
  }, [activeProvider]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) || "AM";
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatarUrl: url }));
      triggerToast("Profile photo updated successfully!");
    }
  };

  const handleSavePersonal = () => {
    updateProvider(activeProvider.id, {
      name: formData.name,
      phone: formData.phoneNumber,
      gender: formData.gender,
      birthDate: formData.birthDate,
      language: formData.language,
      country: formData.country,
      timezone: formData.timezone,
      profession: formData.profession,
      npiNumber: formData.npiNumber,
      licenseNumber: formData.licenseNumber,
      licenseState: formData.licenseState,
      bio: formData.bio,
      avatarUrl: formData.avatarUrl,
    });
    triggerToast("Profile updated successfully!");
  };

  const handleDiscard = () => {
    setFormData({
      name: activeProvider.name || "Abhishek Madaan",
      email: activeProvider.email || "abhishek.madaan@mantra.care",
      countryCode: "+1",
      phoneNumber: activeProvider.phone || "555-019-2834",
      gender: activeProvider.gender || "Male",
      birthDate: activeProvider.birthDate || "1988-06-15",
      language: activeProvider.language || "English (English)",
      country: activeProvider.country || "United States",
      timezone: activeProvider.timezone || "Asia/Kolkata",
      profession: (activeProvider.profession || "Therapy") as Specialty,
      npiNumber: activeProvider.npiNumber || "1948204918",
      licenseNumber: activeProvider.licenseNumber || "LCSW-98412",
      licenseState: activeProvider.licenseState || "NY",
      bio: activeProvider.bio || "",
      avatarUrl: activeProvider.avatarUrl || "",
    });
    triggerToast("Changes discarded.");
  };

  const handlePasswordUpdate = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      triggerToast("Passwords do not match or are invalid.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    triggerToast("Password changed successfully!");
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSignOut = () => {
    localStorage.removeItem("mantra_logged_in");
    navigate("/get-started");
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-gray-950 min-h-screen p-4 sm:p-6 lg:p-8 text-slate-900 dark:text-slate-100">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#043570] text-white px-4 py-3 rounded-xl shadow-2xl border border-sky-400/30 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="size-5 text-[#00c0ff]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Manage your personal information and preferences
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-sm font-semibold transition-colors"
          >
            <LogOut className="size-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Main Grid: Left Account Card + Right Multi-Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (4 cols): User Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center relative">
              {/* Avatar & Upload */}
              <div className="flex justify-center mb-4 relative">
                <div className="relative group">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt={formData.name}
                      className="size-24 rounded-full object-cover shadow-lg border-2 border-white dark:border-gray-800"
                    />
                  ) : (
                    <div className="size-24 rounded-full bg-[#043570] text-white flex items-center justify-center text-2xl font-bold tracking-wider shadow-lg border-2 border-white dark:border-gray-800">
                      {getInitials(formData.name)}
                    </div>
                  )}
                  {/* Status Indicator */}
                  <div className="absolute bottom-1 right-1 size-4 bg-[#00c0ff] border-2 border-white dark:border-gray-900 rounded-full shadow-sm" />
                </div>
              </div>

              {/* Name & Title */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{formData.name}</h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 dark:bg-sky-950/60 text-[#043570] dark:text-sky-400 rounded-full text-xs font-semibold mt-1.5 mb-4">
                <Award className="size-3.5" />
                <span>{formData.profession}</span>
              </div>

              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#043570] hover:bg-[#032652] text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                >
                  <Camera className="size-3.5" />
                  <span>Upload</span>
                </button>
              </div>

              {/* Account Info Details List */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-left space-y-3.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Account Info
                </p>

                {/* Email */}
                <div className="flex items-start gap-3 text-xs">
                  <div className="size-7 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-500">
                    <Mail className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-gray-400 block">EMAIL</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 truncate block">
                      {formData.email}
                    </span>
                  </div>
                </div>

                {/* Country */}
                <div className="flex items-start gap-3 text-xs">
                  <div className="size-7 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-500">
                    <Globe className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">COUNTRY</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {formData.country}
                    </span>
                  </div>
                </div>

                {/* Timezone */}
                <div className="flex items-start gap-3 text-xs">
                  <div className="size-7 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-500">
                    <Clock className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">TIMEZONE</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {formData.timezone}
                    </span>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-start gap-3 text-xs">
                  <div className="size-7 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-500">
                    <FileBadge className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">LANGUAGE</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {formData.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (8 cols): Tabbed Settings Container */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Top Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab("personal")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "personal"
                    ? "bg-[#043570] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <User className="size-4" />
                <span>Personal Info</span>
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "security"
                    ? "bg-[#043570] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Shield className="size-4" />
                <span>Security</span>
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "notifications"
                    ? "bg-[#043570] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Bell className="size-4" />
                <span>Notifications</span>
              </button>
            </div>

            {/* Tab 1: Personal Info */}
            {activeTab === "personal" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Profile Information
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Update your account details, preferences and clinical credentials
                  </p>
                </div>

                {/* Section 1: Personal Information */}
                <div className="space-y-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Personal Information
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        NAME *
                      </label>
                      <div className="relative">
                        <User className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                          placeholder="Your Full Name"
                        />
                      </div>
                    </div>

                    {/* Email (Locked) */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        EMAIL
                      </label>
                      <div className="relative">
                        <Mail className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="w-full pl-10 pr-10 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm text-gray-500 cursor-not-allowed"
                        />
                        <Lock className="size-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        PHONE NUMBER
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="w-24 px-2 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                        </select>
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        GENDER
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    {/* Birth Date */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        BIRTH DATE
                      </label>
                      <div className="relative max-w-sm">
                        <Calendar className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Preferences */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Preferences
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Language */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        LANGUAGE
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                      >
                        <option value="English (English)">English (English)</option>
                        <option value="Spanish (Español)">Spanish (Español)</option>
                        <option value="French (Français)">French (Français)</option>
                        <option value="German (Deutsch)">German (Deutsch)</option>
                        <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                      </select>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        COUNTRY
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="India">India</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        TIMEZONE
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST - GMT+5:30)</option>
                        <option value="America/New_York">America/New_York (EST - GMT-5:00)</option>
                        <option value="America/Chicago">America/Chicago (CST - GMT-6:00)</option>
                        <option value="America/Denver">America/Denver (MST - GMT-7:00)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PST - GMT-8:00)</option>
                        <option value="Europe/London">Europe/London (GMT / BST)</option>
                        <option value="Europe/Paris">Europe/Paris (CET - GMT+1:00)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Clinical & Professional Credentials */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Clinical & Practice Credentials
                    </p>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded">
                      Syncs with Organization
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Profession / Specialty */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        PRIMARY SPECIALTY / PROFESSION
                      </label>
                      <select
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value as Specialty })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                      >
                        {SPECIALTIES.map((spec) => (
                          <option key={spec} value={spec}>
                            {spec}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* NPI Number */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        NPI NUMBER (10 DIGITS)
                      </label>
                      <input
                        type="text"
                        value={formData.npiNumber}
                        onChange={(e) => setFormData({ ...formData, npiNumber: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                        placeholder="e.g. 1948204918"
                      />
                    </div>

                    {/* License Number */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        LICENSE NUMBER
                      </label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                        placeholder="e.g. LCSW-98412"
                      />
                    </div>

                    {/* License State */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        LICENSE STATE
                      </label>
                      <input
                        type="text"
                        value={formData.licenseState}
                        onChange={(e) => setFormData({ ...formData, licenseState: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                        placeholder="e.g. NY, CA, TX"
                      />
                    </div>

                    {/* Bio */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        PROFESSIONAL BIO & PRACTICE SUMMARY
                      </label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white"
                        placeholder="Describe your clinical focus, treatment modalities, and background..."
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={handleSavePersonal}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#043570] hover:bg-[#032652] active:scale-[0.98] text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="size-4" />
                    <span>Save Changes</span>
                  </button>

                  <button
                    onClick={handleDiscard}
                    className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs sm:text-sm font-medium rounded-xl transition-colors"
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Security */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Security & Credentials
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Manage your password, login methods, and session security
                  </p>
                </div>

                {/* Password Change Form */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lock className="size-4 text-[#00c0ff]" />
                    <span>Change Password</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePasswordUpdate}
                    className="px-4 py-2 bg-[#043570] hover:bg-[#032652] text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                  >
                    Update Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                      <Shield className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        Two-Factor Authentication (2FA)
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Add an extra layer of HIPAA-compliant protection with SMS or Authenticator App.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      triggerToast(`Two-factor authentication ${!twoFactorEnabled ? "enabled" : "disabled"}.`);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      twoFactorEnabled
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {twoFactorEnabled ? "Enabled" : "Enable 2FA"}
                  </button>
                </div>

                {/* Active Sessions */}
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-3">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Active Devices & Sessions
                  </h4>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Laptop className="size-4 text-[#00c0ff]" />
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white block">
                            Chrome on macOS · Current Session
                          </span>
                          <span className="text-[11px] text-gray-400">New York, NY · IP: 198.51.100.42</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded">
                        Active Now
                      </span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="size-4 text-gray-400" />
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200 block">
                            Mantra Provider iOS App
                          </span>
                          <span className="text-[11px] text-gray-400">Austin, TX · 2 hours ago</span>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerToast("Session revoked.")}
                        className="text-red-500 hover:text-red-600 font-semibold"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Notification Preferences
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Customize alerts and updates regarding your clients, sessions, and billing
                  </p>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {/* Item 1 */}
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        Appointment & Schedule Reminders
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Receive email alerts 15 minutes before scheduled appointments.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.emailAppointments}
                      onChange={(e) =>
                        setNotifications({ ...notifications, emailAppointments: e.target.checked })
                      }
                      className="w-4 h-4 text-[#043570] rounded focus:ring-[#00c0ff] cursor-pointer"
                    />
                  </div>

                  {/* Item 2 */}
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        New Client Referrals & Requests
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Instant notifications when a new individual or corporate client books.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.emailReferrals}
                      onChange={(e) =>
                        setNotifications({ ...notifications, emailReferrals: e.target.checked })
                      }
                      className="w-4 h-4 text-[#043570] rounded focus:ring-[#00c0ff] cursor-pointer"
                    />
                  </div>

                  {/* Item 3 */}
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        Clinical Documentation & Note Signing
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Daily summaries of uncompleted or unsigned session notes.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.clinicalReminders}
                      onChange={(e) =>
                        setNotifications({ ...notifications, clinicalReminders: e.target.checked })
                      }
                      className="w-4 h-4 text-[#043570] rounded focus:ring-[#00c0ff] cursor-pointer"
                    />
                  </div>

                  {/* Item 4 */}
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        Billing & Direct Payout Notifications
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Monthly remittance advice and electronic claims status updates.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.emailBilling}
                      onChange={(e) =>
                        setNotifications({ ...notifications, emailBilling: e.target.checked })
                      }
                      className="w-4 h-4 text-[#043570] rounded focus:ring-[#00c0ff] cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  onClick={() => triggerToast("Notification settings saved!")}
                  className="px-6 py-2.5 bg-[#043570] hover:bg-[#032652] text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  Save Notification Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}