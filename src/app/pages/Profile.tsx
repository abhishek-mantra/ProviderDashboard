import { useState } from "react";
import { Edit, Share2, CheckCircle2, DollarSign, Trash2, Facebook, Twitter, Linkedin, Mail, Info, Star, User, Globe, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router";

export function Profile() {
  const navigate = useNavigate();
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [mantraVisibility, setMantraVisibility] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const profileUrl = "therapists.therapymantra.co/list/therapist/130405/john-wilson?pay=true?pay=yes";

  const experienceCards = [
    {
      icon: User,
      label: "GENDER",
      value: "Male",
      color: "blue",
    },
    {
      icon: Globe,
      label: "ETHNICITY",
      value: "Caucasian",
      color: "purple",
    },
    {
      icon: GraduationCap,
      label: "EXPERIENCE",
      value: "Practicing since 2020",
      color: "teal",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-3 md:p-6">
      <div className="max-w-[1000px]">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-4 md:mb-6">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="relative group mb-3">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjB0aGVyYXBpc3QlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQyNDI5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="John Wilson"
                  className="size-24 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-700 shadow-md"
                />
                <div className="absolute bottom-2 right-2 size-5 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-sm"></div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">John Wilson</h1>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit className="size-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Therapist</span>
                <div className="h-3 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-sm text-amber-700 dark:text-amber-400">5.0</span>
                </div>
              </div>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm">
                <option>Therapy</option>
                <option>Diet</option>
                <option>Physiotherapy</option>
              </select>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-start gap-6">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjB0aGVyYXBpc3QlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQyNDI5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="John Wilson"
                className="size-24 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-700 shadow-md transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 size-5 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-sm"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">John Wilson</h1>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Edit className="size-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm">
                  <option>Therapy</option>
                  <option>Diet</option>
                  <option>Physiotherapy</option>
                </select>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Therapist</span>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-amber-700 dark:text-amber-400">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card - Redesigned */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-4 md:mb-6">
          {/* Profile Heading with Toggle */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>

            {/* Profile Visibility Toggle with Tooltip */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Profile Visibility</span>
                <div className="group relative">
                  <Info className="size-4 text-gray-400 cursor-help hover:text-gray-600 transition-colors" />
                  <div className="absolute right-0 md:right-auto md:left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
                    Make your profile visible to everyone on the platform
                    <div className="absolute -top-1 right-4 md:left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setProfileVisibility(!profileVisibility)}
                className={`relative w-14 h-7 rounded-full transition-all shadow-inner ${
                  profileVisibility ? "bg-gradient-to-r from-[#00c0ff] to-[#0099cc]" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 size-6 bg-white rounded-full transition-transform shadow-md ${
                    profileVisibility ? "translate-x-7" : ""
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Profile URL with Edit Profile Button */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 md:p-5 rounded-xl mb-6 flex flex-col md:flex-row md:items-center gap-3 border border-blue-100 dark:border-blue-800">
            <input
              type="text"
              value={profileUrl}
              readOnly
              className="flex-1 bg-transparent text-blue-700 dark:text-blue-300 text-xs md:text-sm outline-none font-medium overflow-x-auto"
            />
            <button
              onClick={() => navigate("/edit-profile")}
              className="w-full md:w-auto px-4 md:px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <Edit className="size-4" />
              Edit Profile
            </button>
          </div>

          {/* Social Share and Quick Actions */}
          <div className="space-y-4">
            {/* Social Share Buttons */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <button className="p-2.5 md:p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:scale-110" title="Share">
                <Share2 className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2.5 md:p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:scale-110" title="Facebook">
                <Facebook className="size-4 md:size-5 text-blue-600" />
              </button>
              <button className="p-2.5 md:p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:scale-110" title="Twitter">
                <Twitter className="size-4 md:size-5 text-blue-400" />
              </button>
              <button className="p-2.5 md:p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:scale-110" title="LinkedIn">
                <Linkedin className="size-4 md:size-5 text-blue-700" />
              </button>
              <button className="p-2.5 md:p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:scale-110" title="Email">
                <Mail className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
              {/* Verified Button */}
              <button onClick={() => navigate("/verification")} className="px-4 md:px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 rounded-xl transition-all flex items-center justify-center gap-2 border border-green-200 dark:border-green-700 shadow-sm hover:shadow-md" title="Verified">
                <CheckCircle2 className="size-4 md:size-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">Verified</span>
              </button>

              {/* Bank & Tax Button */}
              <button onClick={() => navigate("/billing", { state: { tab: "banktax" } })} className="px-4 md:px-5 py-2.5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/30 dark:hover:to-blue-900/30 rounded-xl transition-all flex items-center justify-center gap-2 border border-cyan-200 dark:border-cyan-700 shadow-sm hover:shadow-md" title="Bank & Tax">
                <DollarSign className="size-4 md:size-5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">Bank & Tax</span>
              </button>

              {/* Delete Account Button */}
              <button onClick={() => setShowDeleteModal(true)} className="px-4 md:px-5 py-2.5 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/30 dark:hover:to-rose-900/30 rounded-xl transition-all flex items-center justify-center gap-2 border border-red-200 dark:border-red-700 shadow-sm hover:shadow-md" title="Delete Account">
                <Trash2 className="size-4 md:size-5 text-red-600 dark:text-red-400" />
                <span className="text-sm font-semibold text-red-700 dark:text-red-400">Delete Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-4 md:mb-6">
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <div className="size-9 md:size-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl flex items-center justify-center shadow-sm">
              <User className="size-4 md:size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">About</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            I'm a self-proclaimed emotional wizard who can totally read your feelings... sometimes.
            Specialties include unsolicited life advice, judging your coping mechanisms, and making you
            question why you came here in the first place. I charge in Monopoly money and guarantee 0%
            improvement—but 100% awkward laughs.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {experienceCards.map((card, index) => {
            const Icon = card.icon;
            const colors = {
              blue: {
                bg: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
                iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
                border: "border-blue-200 dark:border-blue-700",
              },
              purple: {
                bg: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30",
                iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
                border: "border-purple-200 dark:border-purple-700",
              },
              teal: {
                bg: "from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30",
                iconBg: "bg-gradient-to-br from-teal-500 to-teal-600",
                border: "border-teal-200 dark:border-teal-700",
              },
            };
            const colorScheme = colors[card.color as keyof typeof colors];

            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${colorScheme.bg} rounded-2xl p-5 md:p-6 shadow-lg border ${colorScheme.border} hover:shadow-xl transition-all md:hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className={`size-10 md:size-12 ${colorScheme.iconBg} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="size-5 md:size-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400 tracking-wider">{card.label}</span>
                </div>
                <div className="text-gray-900 dark:text-white font-semibold text-base md:text-lg">{card.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Wait! Are you sure you want to delete your account?
            </h2>

            <div className="space-y-3 mb-6">
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                Once deleted, you won't be able to create a provider account with us again.
              </p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                If you just need a break, you can hide your profile instead and come back anytime!
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  // Handle delete account logic here
                  setShowDeleteModal(false);
                }}
                className="w-full py-3.5 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-xl font-semibold transition-colors"
              >
                Yes, delete my account
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-semibold transition-colors"
              >
                No, hide my profile instead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}