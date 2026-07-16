import { useState } from "react";
import { ArrowLeft, Check, Eye, MapPin, Calendar, Phone, Briefcase, Users2, FileText, Video, Clock, User, Upload, Plus, Trash2, X, Globe, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { usePlanMode } from "../contexts/PlanModeContext";
import { SPECIALTIES } from "../types/partnerDashboard";

type Step = 1 | 2 | 3 | 4 | 5;

const THERAPY_ONLY_PROFESSIONS = new Set([
  "Therapist / Psychologist",
  "Counselor",
  "Clinical Assessment",
  "Meditation / Mindfulness",
]);

function isTherapyOnly(professions: string[]): boolean {
  if (professions.length === 0) return false;
  return professions.every(p => THERAPY_ONLY_PROFESSIONS.has(p));
}

export function Onboarding() {
  const navigate = useNavigate();
  const { setPlanMode } = usePlanMode();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [availabilityTab, setAvailabilityTab] = useState<"timeslot" | "dayoff">("timeslot");
  const [showAddTimeSlotModal, setShowAddTimeSlotModal] = useState(false);
  const [showAddDayOffModal, setShowAddDayOffModal] = useState(false);
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: "John Wilson",
    practiceAddress: "",
    practiceAddressVisible: true,
    locationLandmark: "250 Broadway, New York, NY 10007, USA",
    dateOfBirth: "",
    contactNumber: "9985698569",
    countryCode: "+91",
    languages: [] as string[],
    gender: "",
    linkedinUrl: "https://www.linkedin.com/in/username",

    // Step 2: Description
    profession: "",
    experience: "",
    profileDescription: "",
    specializations: "",
    practiceType: "",
    profileTitle: "",
    languagesSpoken: "",
    licensing: "",
    idealClient: "",
    licenseDetails: "",
    practiceInsuranceDetails: "",
    pricing: ""
  });

  const steps = [
    { number: 1, title: "Basic Information", icon: Users2 },
    { number: 2, title: "Description", icon: FileText },
    { number: 3, title: "Profile Picture", icon: Users2 },
    { number: 4, title: "Videos (Optional)", icon: Video },
    { number: 5, title: "Availability", icon: Clock }
  ];

  const legacyProfessionCategories = {
    "Mental Health": [
      "Therapist / Psychologist",
      "Psychiatrist",
      "Counselor",
      "Clinical Assessment",
      "Meditation / Mindfulness",
    ],
    "Wellness (Diet, Fitness, Yoga e.t.c,)": [
      "Yoga Instructor",
      "Dietician",
      "Fitness Instructor"
    ],
    "Physio/MSK": [
      "Physio Practitioner",
    ],
    "Doctors/Specialists": [
      "Addiction Specialist",
      "General Physician",
      "Endocrinologist",
      "Gynecologist",
      "Gastroenterologist",
      "Paediatrician",
      "ENT Specialist",
      "Orthopedician",
      "Cardiologist",
      "Sexologist",
      "Dermatologist",
      "Dentist",
      "Neurosurgeon",
      "Oncologist",
      "Ophthalmologist",
      "Urologist (Kidney & Urinary Tract)",
      "Nephrologist",
      "Pulmonologist (Lung)",
      "Rheumatologist",
      "Fertility/ IVF Specialist",
      "General Surgery"
    ],
    "Coaching (Executive, Career e.t.c,)": [
      "Coach",
      "Seminar / Workshop / Training"
    ],
    "Advisory / Counselling": [
      "Financial Wellbeing Advisor",
      "Legal Counsellor"
    ]
  };

  const professionCategories = { "Specialties": [...SPECIALTIES] };

  const experienceOptions = [
    "Therapist/Psychologist",
    "Psychiatrist",
    "Counselor",
    "Life Coach",
    "Nutritionist",
    "Physical Therapist"
  ];

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const selectProfession = (profession: string) => {
    setFormData({ ...formData, profession });
    setShowProfessionDropdown(false);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSaveAndContinue = () => {
    console.log("Form data:", formData);
    handleNext();
  };

  // Show acknowledgement screen
  if (showAcknowledgement) {
    return (
      <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen flex items-center justify-center p-4 md:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-xl w-full p-10 md:p-16 text-center border border-gray-100 dark:border-gray-700">
          {/* Success Icon */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="relative">
              {/* Decorative dots with cyan color */}
              <div className="absolute -top-3 left-6 size-3 bg-[#5DADE2] rounded-full animate-pulse"></div>
              <div className="absolute -top-4 left-14 size-2.5 bg-[#85C1E2] rounded-full animate-pulse delay-100"></div>
              <div className="absolute top-4 -right-4 size-3 bg-[#5DADE2] rounded-full animate-pulse delay-200"></div>
              <div className="absolute -bottom-3 left-2 size-2 bg-[#85C1E2] rounded-full animate-pulse delay-300"></div>

              {/* Main checkmark circle */}
              <div className="size-28 md:size-32 bg-[#043570] rounded-full flex items-center justify-center shadow-2xl">
                <Check className="size-14 md:size-16 text-white" strokeWidth={3.5} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            You're all set,<br />Welcome aboard!
          </h2>

          {/* Description */}
          <div className="space-y-4 mb-10 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            <p>
              Your provider profile is being reviewed by our team.
            </p>
            <p>
              Approval usually takes <span className="font-bold text-gray-900 dark:text-white">24-48 hours</span>.
            </p>
            <p>
              Once approved, you'll receive a confirmation email and get full access.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              const therapyOnly = isTherapyOnly(formData.profession ? [formData.profession] : []);
              if (therapyOnly) {
                localStorage.setItem("ai_scribe_prescription_pref", "no");
                const existingCards: string[] = JSON.parse(localStorage.getItem("dashboard_hidden_cards") || "[]");
                localStorage.setItem("dashboard_hidden_cards", JSON.stringify(Array.from(new Set([...existingCards, "prescriptions"]))));
              } else {
                localStorage.setItem("ai_scribe_prescription_pref", "yes");
              }
              // Do NOT write to sidebar_hidden_items — Layout.tsx reads ai_scribe_prescription_pref directly
              setPlanMode("provider");
              navigate("/");
            }}
            className="px-12 py-4 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold transition-all text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:ml-4">
        {/* Mobile Segmented Progress Bar */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          {/* Step Indicator */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Step {currentStep} of 5: <span className="font-semibold text-gray-900 dark:text-white">{steps.find(s => s.number === currentStep)?.title}</span>
            </p>
          </div>

          {/* Segmented Bar */}
          <div className="flex items-start justify-between gap-1.5">
            {steps.map((step) => {
              const isCompleted = completedSteps.includes(step.number);
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex flex-col items-center flex-1 min-w-0">
                  {/* Circle */}
                  <button
                    onClick={() => setCurrentStep(step.number as Step)}
                    className={`size-9 rounded-full flex items-center justify-center font-semibold text-sm mb-1.5 transition-all flex-shrink-0 ${
                      isCurrent
                        ? "bg-[#043570] text-white ring-2 ring-[#043570] ring-offset-2"
                        : isCompleted
                        ? "bg-[#043570] text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {isCompleted ? <Check className="size-4" /> : step.number}
                  </button>

                  {/* Label */}
                  <span className={`text-[10px] text-center leading-tight whitespace-pre-line ${
                    isCurrent ? "text-[#043570] font-semibold" : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {step.number === 1 && "Basic\nInfo"}
                    {step.number === 2 && "Description"}
                    {step.number === 3 && "Profile\nPicture"}
                    {step.number === 4 && "Videos"}
                    {step.number === 5 && "Availability"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Left Sidebar */}
        <div className="hidden md:block md:w-80 bg-white dark:bg-gray-800 md:min-h-screen border border-gray-200 dark:border-gray-700 md:rounded-2xl shadow-sm px-4 md:px-6 py-6 md:py-8">
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Step {currentStep}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {currentStep === 1 && "Enter your personal information to get closer to clients."}
              {currentStep === 2 && "Describe your experience and professional background."}
              {currentStep === 3 && "Upload your profile picture here."}
              {currentStep === 4 && "Add links to videos or projects to showcase your work."}
              {currentStep === 5 && "Mark your availability here to schedule your appointment"}
            </p>
          </div>

          <div className="space-y-2 md:space-y-3">
            {steps.map((step) => {
              const isCompleted = completedSteps.includes(step.number);
              const isCurrent = currentStep === step.number;

              return (
                <button
                  key={step.number}
                  onClick={() => setCurrentStep(step.number as Step)}
                  className={`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl md:rounded-2xl transition-all text-left border ${
                    isCurrent
                      ? "bg-gradient-to-r from-[#f3faff] to-[rgba(243,250,255,0.5)] border-[#00c0ff]/30 shadow-sm"
                      : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`size-7 md:size-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs md:text-sm ${
                      isCurrent
                        ? "bg-[#043570] text-white"
                        : isCompleted
                        ? "bg-[#043570] text-white"
                        : "bg-[#e5e7eb] dark:bg-gray-600 text-[#6a7282] dark:text-gray-400"
                    }`}
                  >
                    {isCompleted ? <Check className="size-3.5 md:size-4" /> : step.number}
                  </div>
                  <span className={`font-semibold text-sm md:text-base ${isCurrent ? "text-[#043570]" : "text-gray-900 dark:text-gray-300"}`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <div>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8">
                <div className="flex items-start gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className="size-10 md:size-12 rounded-lg md:rounded-xl bg-[#E3F2FD] dark:bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
                    <Users2 className="size-5 md:size-6 text-[#043570]" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                      Basic Information
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Enter your personal information to get closer to clients.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                      <Users2 className="size-4 text-[#043570]" />
                      Name <span className="text-[#fb2c36]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                    />
                  </div>

                  {/* Practice Address */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                      <MapPin className="size-4 text-[#043570]" />
                      Practice Address <span className="text-[#fb2c36]">*</span>
                    </label>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        value={formData.practiceAddress}
                        onChange={(e) => setFormData({ ...formData, practiceAddress: e.target.value })}
                        placeholder="Enter practice address"
                        className="flex-1 px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                      />
                      <div className="flex items-center gap-3 px-5 py-2 bg-[#f3faff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl shadow-sm">
                        <MapPin className="size-4 text-[#00c0ff]" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Visible</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, practiceAddressVisible: !formData.practiceAddressVisible })}
                          className={`relative w-8 h-4.5 rounded-full transition-colors ${
                            formData.practiceAddressVisible ? "bg-[#d1d5db]" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 left-0.5 size-3.5 bg-white rounded-full transition-transform ${
                              formData.practiceAddressVisible ? "" : "translate-x-3.5"
                            }`}
                          />
                        </button>
                        <Globe className="size-4 text-[#64748b]" />
                      </div>
                    </div>
                  </div>

                  {/* Location/Landmark */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                      <MapPin className="size-4 text-[#043570]" />
                      Location/Landmark <span className="text-[#fb2c36]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.locationLandmark}
                        onChange={(e) => setFormData({ ...formData, locationLandmark: e.target.value })}
                        className="w-full px-4 py-3.5 md:pr-48 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                      />
                      <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-3">
                        <button
                          type="button"
                          className="text-sm font-semibold text-[#043570] hover:text-[#00c0ff] transition-colors flex items-center gap-1.5"
                        >
                          <MapPin className="size-4" />
                          Current Location
                        </button>
                        <div className="w-px h-6 bg-[#e5e7eb]" />
                        <MapPin className="size-4.5 text-[#043570]" />
                      </div>
                    </div>
                    {/* Mobile Current Location Button */}
                    <button
                      type="button"
                      className="md:hidden mt-2 text-sm font-semibold text-[#043570] hover:text-[#00c0ff] transition-colors flex items-center gap-1.5"
                    >
                      <MapPin className="size-4" />
                      Current Location
                    </button>
                  </div>

                  {/* Date of Birth and Contact Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                        <Calendar className="size-4 text-[#043570]" />
                        Date of Birth <span className="text-[#fb2c36]">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                        <Phone className="size-4 text-[#043570]" />
                        Contact Number <span className="text-[#fb2c36]">*</span>
                        <Globe className="size-4 text-[#64748b]" />
                      </label>
                      <div className="flex gap-3">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="w-32 px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-sm font-medium text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                        <input
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          className="flex-1 px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Languages and Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                        <Globe className="size-4 text-[#043570]" />
                        Languages <span className="text-[#fb2c36]">*</span>
                      </label>
                      <select
                        value=""
                        onChange={(e) => setFormData({ ...formData, languages: [...formData.languages, e.target.value] })}
                        className="w-full px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-[#64748b] font-medium focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                      >
                        <option value="">Select languages</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                        <Users2 className="size-4 text-[#043570]" />
                        Gender <span className="text-[#fb2c36]">*</span>
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-[#64748b] font-medium focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* LinkedIn Profile URL */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                      <svg className="size-4 text-[#0077B5]" viewBox="0 0 17 17" fill="none">
                        <path d="M14.875 1.41667H2.125C1.73288 1.41667 1.41667 1.73288 1.41667 2.125V14.875C1.41667 15.2671 1.73288 15.5833 2.125 15.5833H14.875C15.2671 15.5833 15.5833 15.2671 15.5833 14.875V2.125C15.5833 1.73288 15.2671 1.41667 14.875 1.41667Z" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.3333 7.79167V12.0417" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.5 7.79167V12.0417" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      LinkedIn Profile URL
                      <span className="ml-auto px-3 py-1 bg-[#f8fbff] border border-[#e5e7eb] rounded-xl text-xs font-semibold text-[#64748b] tracking-wide">Optional</span>
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://www.linkedin.com/in/username"
                      className="w-full px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-[#64748b] font-medium placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6 md:mt-8 pt-6 md:pt-8 border-t border-[#f3f4f6]">
                  <button
                    onClick={handleSaveAndContinue}
                    className="w-full md:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl md:rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Save & Continue
                    <ArrowLeft className="size-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Description */}
            {currentStep === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8">
                <div className="flex items-start gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className="size-10 md:size-12 rounded-lg md:rounded-xl bg-[#E3F2FD] dark:bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="size-5 md:size-6 text-[#043570]" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                      Description
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Enter your description here to let the clients know about you.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Professions */}
                  <div className="relative">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white mb-2.5">
                      <Briefcase className="size-4 text-[#043570]" />
                      Profession <span className="text-[#fb2c36]">*</span>
                    </label>

                    {/* Dropdown trigger */}
                    <button
                      type="button"
                      onClick={() => setShowProfessionDropdown(!showProfessionDropdown)}
                      className="w-full px-4 py-3.5 bg-[#f8fbff] dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-2xl text-left font-medium focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm flex items-center justify-between"
                      style={{ color: formData.profession ? "#0F172A" : "#64748b" }}
                    >
                      <span>{formData.profession || "Select profession"}</span>
                      <ChevronDown className={`size-4 transition-transform ${showProfessionDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown menu */}
                    {showProfessionDropdown && (
                      <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 rounded-2xl shadow-lg max-h-96 overflow-y-auto">
                        {Object.entries(professionCategories).map(([category, options]) => (
                          <div key={category} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                            {/* Category header */}
                            <button
                              type="button"
                              onClick={() => toggleCategory(category)}
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <span className="text-sm font-semibold text-[#64748b] dark:text-gray-400">
                                {category}
                              </span>
                              {expandedCategories.includes(category) ? (
                                <ChevronDown className="size-4 text-[#64748b]" />
                              ) : (
                                <ChevronRight className="size-4 text-[#64748b]" />
                              )}
                            </button>

                            {/* Category options */}
                            {expandedCategories.includes(category) && (
                              <div className="bg-gray-50 dark:bg-gray-900/50">
                                {options.map((option) => (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => selectProfession(option)}
                                    className="w-full text-left px-6 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    style={{ color: formData.profession === option ? "#043570" : undefined, fontWeight: formData.profession === option ? 600 : undefined }}
                                  >
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {option}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Show role-specific section if profession is selected */}
                  {formData.profession && (
                    <div className="rounded-2xl border border-[rgba(0,192,255,0.3)] p-6 space-y-6" style={{ background: "linear-gradient(126.87deg, rgb(243, 250, 255) 0%, rgba(243, 250, 255, 0.3) 100%)" }}>
                      {/* Role Title */}
                      <div className="pb-4 border-b border-[rgba(0,192,255,0.2)]">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {formData.profession}
                        </h3>
                        <p className="text-sm text-[#64748b] mt-1">
                          Provide details specific to your role as {formData.profession.toLowerCase()}
                        </p>
                      </div>

                      {/* Profile Description */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white">
                          Profile Description
                        </label>
                        <textarea
                          value={formData.profileDescription}
                          onChange={(e) => setFormData({ ...formData, profileDescription: e.target.value })}
                          placeholder="Describe your experience and approach..."
                          rows={4}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                        />
                        <div className="flex justify-end">
                          <button className="px-4 py-2 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg text-sm font-medium shadow-md transition-colors flex items-center gap-2">
                            <svg className="size-4" viewBox="0 0 16 16" fill="none">
                              <path d="M8 2C8 2 8 8 14 8M14 8C8 8 8 14 8 14M14 8L2 8" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Rewrite with AI
                          </button>
                        </div>
                      </div>

                      {/* 3-Column Grid - Row 1 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Specializations
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>Select specializations</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Practicing Since
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>2025</option>
                            <option>2024</option>
                            <option>2023</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Profile Title
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>Select titles</option>
                          </select>
                        </div>
                      </div>

                      {/* 3-Column Grid - Row 2 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Approach
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>All</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Ethnicity
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>Hindu</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Qualifications
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>All</option>
                          </select>
                        </div>
                      </div>

                      {/* 2-Column Grid - Row 3 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pr-[calc(33.333%+1rem)]">
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Client Focus
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>All</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                            Session Mode
                          </label>
                          <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>All</option>
                          </select>
                        </div>
                      </div>

                      {/* License/Certification Details */}
                      <div className="space-y-4 pt-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          License/ Certification Details
                        </h4>
                        <input
                          type="text"
                          placeholder="SAMPLE-RCI-2025-00001"
                          className="w-full px-3 py-3 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                        />
                      </div>

                      {/* Practice/Insurance Details */}
                      <div className="space-y-4 pt-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Practice / Insurance Details
                        </h4>
                        <div className="bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl p-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Are you in-network with any health insurance?
                          </span>
                          <button className="relative w-8 h-4.5 rounded-full bg-[#d1d5db]">
                            <div className="absolute top-0.5 left-0.5 size-3.5 bg-white rounded-full" />
                          </button>
                        </div>
                        <div className="bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl p-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Interested in seeing insured clients via MantraCare?
                          </span>
                          <button className="relative w-8 h-4.5 rounded-full bg-[#d1d5db]">
                            <div className="absolute top-0.5 left-0.5 size-3.5 bg-white rounded-full" />
                          </button>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-4 pt-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Pricing
                        </h4>
                        <p className="text-sm text-[#64748b]">
                          Choose at-least one plan relevant to your practice. We also support subscription or monthly auto-payments
                        </p>
                        <div className="flex flex-col md:flex-row gap-3">
                          <select className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-[#e5e7eb] dark:border-gray-600 rounded-xl text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                            <option>Choose Plan</option>
                          </select>
                          <button className="w-full md:w-auto px-6 py-3 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg font-medium shadow-md transition-colors flex items-center justify-center gap-2 opacity-50">
                            <Plus className="size-4" />
                            Add Pricing
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row justify-between gap-3 mt-6 md:mt-8">
                  <button
                    onClick={handlePrevious}
                    className="w-full md:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-medium transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSaveAndContinue}
                    className="w-full md:w-auto px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Save & Continue
                    <ArrowLeft className="size-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Profile Picture */}
            {currentStep === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8">
                <div className="flex items-start gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className="size-10 md:size-12 rounded-lg md:rounded-xl bg-[#E3F2FD] dark:bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
                    <User className="size-5 md:size-6 text-[#043570]" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                      Profile Picture
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Upload your profile picture here.
                    </p>
                  </div>
                </div>

                <div className="text-center py-8 md:py-12">
                  <div className="size-32 md:size-48 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <div className="text-center">
                      <div className="size-16 mx-auto mb-3 text-gray-400">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 15v-3m0 0v-3m0 3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please add profile<br />picture
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    <button className="w-full md:w-auto px-6 py-2.5 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Plus className="size-4" />
                      Upload
                    </button>
                    <button className="w-full md:w-auto px-6 py-2.5 bg-white hover:bg-gray-50 text-[#00c0ff] border border-[#00c0ff] rounded-lg font-medium transition-colors">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-3 mt-6 md:mt-8">
                  <button
                    onClick={handlePrevious}
                    className="w-full md:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-medium transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSaveAndContinue}
                    className="w-full md:w-auto px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Save & Continue
                    <ArrowLeft className="size-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Videos (Optional) */}
            {currentStep === 4 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8">
                <div className="flex items-start gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className="size-10 md:size-12 rounded-lg md:rounded-xl bg-[#E3F2FD] dark:bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
                    <Video className="size-5 md:size-6 text-[#043570]" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                      Videos (Optional)
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Add links to videos or projects to showcase your work.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Why upload videos card */}
                  <div className="bg-[#E3F2FD] dark:bg-blue-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-[#043570] dark:text-blue-400 mb-4">
                      Why upload videos?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Check className="size-5 text-[#00c0ff] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Personal touch for clients</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-5 text-[#00c0ff] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">80% more visibility</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-5 text-[#00c0ff] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">150% conversion boost</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-5 text-[#00c0ff] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Build trust & clarity</span>
                      </div>
                    </div>
                  </div>

                  {/* Sample video card */}
                  <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center">
                    <div className="text-white mb-3 text-right w-full text-sm">Mantra</div>
                    <div className="size-16 rounded-full bg-[#00c0ff] flex items-center justify-center mb-4">
                      <Video className="size-8 text-white" />
                    </div>
                    <div className="text-white font-semibold mb-8">MantraCare</div>
                    <div className="text-white text-sm">Sample Introduction Video <span className="text-gray-400">00:00</span></div>
                  </div>
                </div>

                <div className="text-center mb-6 md:mb-8">
                  <button className="w-full md:w-auto px-6 py-3 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 md:mx-auto">
                    <Plus className="size-4" />
                    Add Video
                  </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-3">
                  <button
                    onClick={handlePrevious}
                    className="w-full md:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-medium transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSaveAndContinue}
                    className="w-full md:w-auto px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Save & Continue
                    <ArrowLeft className="size-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Availability */}
            {currentStep === 5 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 md:mb-8">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-[#f3faff] rounded-xl md:rounded-2xl border-2 border-[#d9eeff] size-12 md:size-14 flex items-center justify-center flex-shrink-0">
                      <Clock className="size-6 md:size-7 text-[#043570]" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-2xl font-bold text-[#020817] dark:text-white mb-1 md:mb-1.5 tracking-tight">
                        Availability
                      </h2>
                      <p className="text-sm md:text-[15px] text-[#64748b] dark:text-gray-400">
                        Mark your availability here to schedule your appointment
                      </p>
                    </div>
                  </div>
                  <button className="bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 flex items-center justify-between gap-3 shadow-sm hover:bg-gray-50 transition-colors">
                    <Globe className="size-4 text-[#00c0ff]" />
                    <span className="text-sm font-medium text-[#043570]">Asia/Calcutta</span>
                    <ChevronDown className="size-4 text-[#64748b] opacity-50" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-8 md:gap-12 mb-6">
                  <button
                    onClick={() => setAvailabilityTab("timeslot")}
                    className={`pb-3 md:pb-4 font-bold text-base md:text-lg relative ${
                      availabilityTab === "timeslot"
                        ? "text-[#00c0ff]"
                        : "text-[#94a3b8] hover:text-[#64748b]"
                    }`}
                  >
                    Time Slot
                    {availabilityTab === "timeslot" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]" />
                    )}
                  </button>
                  <button
                    onClick={() => setAvailabilityTab("dayoff")}
                    className={`pb-3 md:pb-4 font-bold text-base md:text-lg relative ${
                      availabilityTab === "dayoff"
                        ? "text-[#00c0ff]"
                        : "text-[#94a3b8] hover:text-[#64748b]"
                    }`}
                  >
                    Day Off
                    {availabilityTab === "dayoff" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]" />
                    )}
                  </button>
                </div>

                {/* Time Slot Tab Content */}
                {availabilityTab === "timeslot" && (
                  <>
                    <div className="space-y-5 mb-12">
                      {/* Sunday */}
                      <div className="pb-5 border-b-2 border-[#00c0ff]">
                        <h3 className="text-[19px] font-bold text-[#043570] dark:text-white mb-5 tracking-tight">Sunday</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div
                              className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                              style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                            >
                              <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                              <span className="text-[15px] font-semibold text-[#043570]">8:00 AM - 6:00 PM</span>
                            </div>
                            <button className="opacity-70 hover:opacity-100 transition-opacity">
                              <Trash2 className="size-5 text-[#ef4444]" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div
                              className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                              style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                            >
                              <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                              <span className="text-[15px] font-semibold text-[#043570]">7:00 PM - 10:00 PM</span>
                            </div>
                            <button className="opacity-70 hover:opacity-100 transition-opacity">
                              <Trash2 className="size-5 text-[#ef4444]" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Monday */}
                      <div className="pb-5 border-b-2 border-[#00c0ff]">
                        <h3 className="text-[19px] font-bold text-[#043570] dark:text-white mb-5 tracking-tight">Monday</h3>
                        <div className="flex items-center justify-between">
                          <div
                            className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                            style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                          >
                            <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                            <span className="text-[15px] font-semibold text-[#043570]">7:00 PM - 10:00 PM</span>
                          </div>
                          <button className="opacity-70 hover:opacity-100 transition-opacity">
                            <Trash2 className="size-5 text-[#ef4444]" />
                          </button>
                        </div>
                      </div>

                      {/* Tuesday */}
                      <div className="pb-5 border-b-2 border-[#00c0ff]">
                        <h3 className="text-[19px] font-bold text-[#043570] dark:text-white mb-5 tracking-tight">Tuesday</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div
                              className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                              style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                            >
                              <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                              <span className="text-[15px] font-semibold text-[#043570]">8:00 AM - 6:00 PM</span>
                            </div>
                            <button className="opacity-70 hover:opacity-100 transition-opacity">
                              <Trash2 className="size-5 text-[#ef4444]" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div
                              className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                              style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                            >
                              <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                              <span className="text-[15px] font-semibold text-[#043570]">7:00 PM - 10:00 PM</span>
                            </div>
                            <button className="opacity-70 hover:opacity-100 transition-opacity">
                              <Trash2 className="size-5 text-[#ef4444]" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Wednesday */}
                      <div className="pb-5 border-b-2 border-[#00c0ff]">
                        <h3 className="text-[19px] font-bold text-[#043570] dark:text-white mb-5 tracking-tight">Wednesday</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div
                              className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                              style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                            >
                              <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                              <span className="text-[15px] font-semibold text-[#043570]">8:00 AM - 6:00 PM</span>
                            </div>
                            <button className="opacity-70 hover:opacity-100 transition-opacity">
                              <Trash2 className="size-5 text-[#ef4444]" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div
                              className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                              style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                            >
                              <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                              <span className="text-[15px] font-semibold text-[#043570]">7:00 PM - 10:00 PM</span>
                            </div>
                            <button className="opacity-70 hover:opacity-100 transition-opacity">
                              <Trash2 className="size-5 text-[#ef4444]" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div
                              className="rounded-full border border-[rgba(0,192,255,0.2)] px-6 py-3.5 flex items-center gap-3.5 shadow-sm"
                              style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }}
                            >
                              <Clock className="size-4.5 text-[#00c0ff] flex-shrink-0" />
                              <span className="text-[15px] font-semibold text-[#043570]">7:00 PM - 10:00 PM</span>
                            </div>
                            <button className="opacity-70 hover:opacity-100 transition-opacity">
                              <Trash2 className="size-5 text-[#ef4444]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Time Slots Button */}
                    <div className="text-center mb-6 md:mb-8 pt-6">
                      <button
                        onClick={() => setShowAddTimeSlotModal(true)}
                        className="w-full md:w-auto px-6 md:px-8 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-[15px] transition-colors inline-flex items-center justify-center gap-2.5"
                      >
                        <Plus className="size-5" />
                        Add Time Slots
                      </button>
                    </div>
                  </>
                )}

                {/* Day Off Tab Content */}
                {availabilityTab === "dayoff" && (
                  <>
                    <div className="mb-8">
                      {/* Table Header */}
                      <div className="grid grid-cols-[2fr_2fr_1fr_auto] gap-4 pb-3 mb-4">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date</div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Duration</div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Repeat</div>
                        <div className="w-8"></div>
                      </div>

                      {/* Table Rows */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-[2fr_2fr_1fr_auto] gap-4 items-center pb-4 border-b border-[#00c0ff]">
                          <div className="text-sm text-gray-700 dark:text-gray-300">Oct 25, 2023</div>
                          <div>
                            <span className="px-3 py-1.5 bg-[#E3F2FD] dark:bg-blue-900/20 text-[#043570] dark:text-blue-400 rounded-lg text-sm font-medium">
                              Full Day
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300"></div>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-[2fr_2fr_1fr_auto] gap-4 items-center pb-4 border-b border-[#00c0ff]">
                          <div className="text-sm text-gray-700 dark:text-gray-300">Sep 25, 2023</div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-700 dark:text-gray-300">02:00 - 04:00</div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">15:00 - 04:00</div>
                          </div>
                          <div>
                            <div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="size-3 text-white" />
                            </div>
                          </div>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-[2fr_2fr_1fr_auto] gap-4 items-center pb-4 border-b border-[#00c0ff]">
                          <div className="text-sm text-gray-700 dark:text-gray-300">Feb 25, 2023</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">06:00 - 07:30</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300"></div>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Repeat Every Year Checkbox */}
                    <div className="flex items-center justify-end gap-2 mb-8">
                      <div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="size-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Repeat Every Year</span>
                    </div>

                    {/* Add Day Off Button */}
                    <div className="text-center mb-6 md:mb-8">
                      <button
                        onClick={() => setShowAddDayOffModal(true)}
                        className="w-full md:w-auto px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <Plus className="size-4" />
                        Add Day Off
                      </button>
                    </div>
                  </>
                )}


                {/* Add Time Slot Modal */}
                {showAddTimeSlotModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
                      {/* Modal Header */}
                      <div className="bg-[#043570] text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="size-5" />
                          <h3 className="font-semibold">Add Time Slot</h3>
                        </div>
                        <button
                          onClick={() => setShowAddTimeSlotModal(false)}
                          className="text-white hover:text-gray-200"
                        >
                          <X className="size-5" />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-6 space-y-4">
                        {/* Timezone */}
                        <div className="flex items-center justify-end">
                          <button className="text-sm text-[#00c0ff] hover:text-[#043570] font-medium flex items-center gap-1.5">
                            <Globe className="size-4" />
                            Asia/Calcutta
                          </button>
                        </div>

                        {/* From and To Time */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              From
                            </label>
                            <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>8:00 AM</option>
                              <option>9:00 AM</option>
                              <option>10:00 AM</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              To
                            </label>
                            <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>6:00 PM</option>
                              <option>7:00 PM</option>
                              <option>8:00 PM</option>
                            </select>
                          </div>
                        </div>

                        {/* Days */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Days
                            </label>
                            <button className="text-sm text-[#00c0ff] hover:text-[#043570] font-medium">
                              Select All
                            </button>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button className="px-2.5 md:px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600">
                              Sun
                            </button>
                            <button className="px-2.5 md:px-3 py-2 bg-[#043570] text-white rounded-lg text-sm font-medium">
                              Mon
                            </button>
                            <button className="px-2.5 md:px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600">
                              Tue
                            </button>
                            <button className="px-2.5 md:px-3 py-2 bg-[#043570] text-white rounded-lg text-sm font-medium">
                              Wed
                            </button>
                            <button className="px-2.5 md:px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600">
                              Thu
                            </button>
                            <button className="px-2.5 md:px-3 py-2 bg-[#043570] text-white rounded-lg text-sm font-medium">
                              Fri
                            </button>
                            <button className="px-2.5 md:px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600">
                              Sat
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 space-y-2">
                          <button
                            onClick={() => setShowAddTimeSlotModal(false)}
                            className="w-full px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors"
                          >
                            Save & Apply
                          </button>
                          <button
                            onClick={() => setShowAddTimeSlotModal(false)}
                            className="w-full px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
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
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
                      {/* Modal Header */}
                      <div className="bg-[#043570] text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="size-5" />
                          <h3 className="font-semibold">Add Day Off</h3>
                        </div>
                        <button
                          onClick={() => setShowAddDayOffModal(false)}
                          className="text-white hover:text-gray-200"
                        >
                          <X className="size-5" />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-6 space-y-4">
                        {/* Timezone */}
                        <div className="flex items-center justify-end">
                          <button className="text-sm text-[#00c0ff] hover:text-[#043570] font-medium flex items-center gap-1.5">
                            <Globe className="size-4" />
                            Asia/Calcutta
                          </button>
                        </div>

                        {/* From Time */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            From
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>08</option>
                              <option>09</option>
                              <option>10</option>
                            </select>
                            <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>00</option>
                              <option>15</option>
                              <option>30</option>
                              <option>45</option>
                            </select>
                            <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>AM</option>
                              <option>PM</option>
                            </select>
                          </div>
                        </div>

                        {/* To Time */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            To
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>06</option>
                              <option>07</option>
                              <option>08</option>
                            </select>
                            <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>00</option>
                              <option>15</option>
                              <option>30</option>
                              <option>45</option>
                            </select>
                            <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]">
                              <option>PM</option>
                              <option>AM</option>
                            </select>
                          </div>
                        </div>

                        {/* Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date
                          </label>
                          <input
                            type="text"
                            placeholder="dd-mm-yyyy"
                            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>

                        {/* Repeat Every Year */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="repeatYear"
                            className="w-4 h-4 text-[#00c0ff] rounded focus:ring-[#00c0ff]"
                          />
                          <label htmlFor="repeatYear" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Repeat Every Year
                          </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 space-y-2">
                          <button
                            onClick={() => setShowAddDayOffModal(false)}
                            className="w-full px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors"
                          >
                            Save & Apply
                          </button>
                          <button
                            onClick={() => setShowAddDayOffModal(false)}
                            className="w-full px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col md:flex-row justify-between gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handlePrevious}
                    className="w-full md:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-medium transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setShowAcknowledgement(true)}
                    className="w-full md:w-auto px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
