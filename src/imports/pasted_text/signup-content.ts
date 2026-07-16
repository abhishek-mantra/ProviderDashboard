import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Shield, Globe, ShieldCheck, Headphones, Users, CreditCard, FileText, CalendarDays, Pill, ClipboardCheck, Mic, Bot, Brain, Timer, Briefcase, LayoutDashboard, Building2, Zap, Globe as GlobeIcon, ChevronDown, ChevronRight, X, Megaphone, Check } from "lucide-react";
import { usePlanMode } from "../contexts/PlanModeContext";

type SignupMode = "provider" | "full-ehr" | "ai-scribe";

const iconMap: Record<string, React.ReactNode> = {
  "Get clients from 40+ countries": <GlobeIcon className="size-5 text-white" />,
  "Work as a freelancer": <Briefcase className="size-5 text-white" />,
  "Free EHR / Practice management tools": <LayoutDashboard className="size-5 text-white" />,
  "Work with 400+ global companies": <Building2 className="size-5 text-white" />,
  "Easy onboarding & instant access": <Zap className="size-5 text-white" />,
  "Secure & HIPAA-compliant platform": <ShieldCheck className="size-5 text-white" />,
  "24/7 provider support": <Headphones className="size-5 text-white" />,
  "Complete client & session management": <Users className="size-5 text-white" />,
  "Integrated billing & invoicing": <CreditCard className="size-5 text-white" />,
  "SOAP / DAP / BIRP session notes": <FileText className="size-5 text-white" />,
  "Appointment scheduling & calendar sync": <CalendarDays className="size-5 text-white" />,
  "Prescription management": <Pill className="size-5 text-white" />,
  "Insurance & compliance ready": <ClipboardCheck className="size-5 text-white" />,
  "Real-time AI session transcription": <Mic className="size-5 text-white" />,
  "Auto-generate SOAP, DAP, BIRP notes": <Bot className="size-5 text-white" />,
  "Works with any therapy session": <Brain className="size-5 text-white" />,
  "Saves 2–3 hours per provider daily": <Timer className="size-5 text-white" />,
  "Fully HIPAA-compliant recordings": <ShieldCheck className="size-5 text-white" />,
  "One-click prescription generation": <Pill className="size-5 text-white" />,
  "Client leads from the Mantra Care network": <GlobeIcon className="size-5 text-white" />,
  "Mantra Premium profile & directory listing": <Megaphone className="size-5 text-white" />,
  "Client records & health history": <Users className="size-5 text-white" />,
  "Billing & payment tracking": <CreditCard className="size-5 text-white" />,
  "HIPAA-compliant secure messaging": <ShieldCheck className="size-5 text-white" />,
  "AI Transcriber + Session Notes included": <Mic className="size-5 text-white" />,
  "AI Transcriber + Session Notes (SOAP · DAP · BIRP)": <Bot className="size-5 text-white" />,
  "Works with any online therapy session": <Brain className="size-5 text-white" />,
};

const modeContent: Record<SignupMode, {
  headline: string;
  planLabel: string;
  planPrice: string;
  benefits: string[];
}> = {
  provider: {
    headline: "Everything you need to grow your practice.",
    planLabel: "FREE FOREVER",
    planPrice: "$0 / month · no card required",
    benefits: [
      "Client leads from the Mantra Care network",
      "Mantra Premium profile & directory listing",
      "Client records & health history",
      "Appointment scheduling & calendar sync",
      "Billing & payment tracking",
      "HIPAA-compliant secure messaging",
      "AI Transcriber + Session Notes included",
    ],
  },
  "full-ehr": {
    headline: "Run your entire practice from one powerful platform.",
    planLabel: "50% OFF — LIMITED TIME",
    planPrice: "From $49 / month",
    benefits: [
      "Client records & health history",
      "Appointment scheduling & calendar sync",
      "Integrated billing & invoicing",
      "HIPAA-compliant secure messaging",
      "AI Transcriber + Session Notes (SOAP · DAP · BIRP)",
      "Prescription management",
      "Insurance & compliance ready",
    ],
  },
  "ai-scribe": {
    headline: "Let AI handle your notes so you can focus on your clients.",
    planLabel: "50% OFF — LIMITED TIME",
    planPrice: "From $15 / month · ~25 sessions",
    benefits: [
      "Real-time AI session transcription",
      "Auto-generate SOAP, DAP, BIRP notes",
      "One-click prescription generation",
      "Works with any online therapy session",
      "Saves 2–3 hours per provider daily",
      "Fully HIPAA-compliant recordings",
      "24/7 provider support",
    ],
  },
};

// Profession categories — Coaching and Advisory removed for EHR/AI Scribe
const professionCategories: Record<string, string[]> = {
  "Mental Health": ["Therapist / Psychologist", "Psychiatrist", "Counselor", "Clinical Assessment", "Meditation / Mindfulness"],
  "Wellness (Diet, Fitness, Yoga e.t.c,)": ["Yoga Instructor", "Dietician", "Fitness Instructor"],
  "Physio/MSK": ["Physio Practitioner"],
  "Doctors/Specialists": ["Addiction Specialist", "General Physician", "Endocrinologist", "Gynecologist", "Gastroenterologist", "Paediatrician", "ENT Specialist", "Orthopedician", "Cardiologist", "Sexologist", "Dermatologist", "Dentist", "Neurosurgeon", "Oncologist", "Ophthalmologist", "Urologist (Kidney & Urinary Tract)", "Nephrologist", "Pulmonologist (Lung)", "Rheumatologist", "Fertility/ IVF Specialist", "General Surgery"],
};

// All therapy-only professions — if the user picks ONLY these, prescriptions are hidden
const THERAPY_ONLY_PROFESSIONS = new Set([
  "Therapist / Psychologist",
  "Counselor",
  "Clinical Assessment",
  "Meditation / Mindfulness",
]);

/** Returns true when every selected profession is therapy-only (no prescribing role). */
function isTherapyOnly(selectedProfessions: string[]): boolean {
  if (selectedProfessions.length === 0) return false;
  return selectedProfessions.every(p => THERAPY_ONLY_PROFESSIONS.has(p));
}

const purposes: { label: string; sidebarKey: string | null }[] = [
  { label: "Patient Management", sidebarKey: "clients" },
  { label: "Appointment Scheduling", sidebarKey: "appointments" },
  { label: "Billing & Invoicing", sidebarKey: "billing" },
  { label: "Secure Messaging", sidebarKey: "messages" },
  { label: "AI Session Transcription", sidebarKey: "ai-transcriber" },
  { label: "Session Notes (SOAP/DAP/BIRP)", sidebarKey: "session-notes" },
  { label: "Prescription Management", sidebarKey: "prescriptions" },
  { label: "Insurance & Claims", sidebarKey: null },
];

const purposeToCardIds: Record<string, string[]> = {
  "Patient Management":              ["clients"],
  "Appointment Scheduling":          ["appointments"],
  "Billing & Invoicing":             ["billing"],
  "AI Session Transcription":        ["ai-transcriber"],
  "Session Notes (SOAP/DAP/BIRP)":   ["session-notes"],
  "Prescription Management":         ["prescriptions"],
};

const alwaysVisibleCards = new Set(["clients", "profile", "availability"]);

const allDashboardCardIds = [
  'clients', 'leads', 'appointments', 'profile', 'billing',
  'availability', 'ai-transcriber', 'session-notes', 'prescriptions',
  'marketing', 'premium', 'refer'
];

const alwaysVisible = new Set(["home", "clients", "refer-earn", "settings"]);

export function OnboardingEHRAIScribe() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPlanMode } = usePlanMode();

  const signupMode: SignupMode = (location.state as any)?.signupMode ?? "full-ehr";
  const email: string = (location.state as any)?.email ?? "";
  const isAiScribe = signupMode === "ai-scribe";

  const content = modeContent[signupMode];

  const [selectedPurposes, setSelectedPurposes] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [otherProfessionText, setOtherProfessionText] = useState("");

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleProfession = (p: string) => {
    setSelectedProfessions(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const togglePurpose = (label: string) => {
    setSelectedPurposes(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
    setSelectAll(false);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) setSelectedPurposes(new Set(purposes.map(p => p.label)));
    else setSelectedPurposes(new Set());
  };

  const handleGetStarted = () => {
    const finalProfessions = [
      ...selectedProfessions.filter(p => p !== "Other"),
      ...(selectedProfessions.includes("Other") && otherProfessionText.trim()
        ? [otherProfessionText.trim()]
        : []),
    ];

    // Determine if user is therapy-only (no prescribing professions selected)
    const therapyOnly = isTherapyOnly(finalProfessions);

    // Always clear stale sidebar order so mergeOrderWithDefaults runs fresh
    localStorage.removeItem("sidebar_ehr_order");
    localStorage.removeItem("sidebar_provider_order");
    localStorage.removeItem("sidebar_transcriber_order");

    // EHR-specific keys that are opt-in for both EHR and AI Scribe modes
    const ehrOptInKeys = ['ai-transcriber', 'session-notes', 'prescriptions'];

    // ── Sidebar personalisation (same logic for both EHR and AI Scribe) ──────
    if (selectAll) {
      // If therapy-only, still hide prescriptions even when "everything" is selected
      if (therapyOnly) {
        const current: string[] = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]");
        const updated = Array.from(new Set([...current, "prescriptions"]));
        localStorage.setItem("sidebar_hidden_items", JSON.stringify(updated));
      } else {
        // In EHR mode, opt-in keys go to Show More; in AI Scribe mode, show all
        if (!isAiScribe && ehrOptInKeys.length > 0) {
          localStorage.setItem("sidebar_hidden_items", JSON.stringify(ehrOptInKeys));
        } else {
          localStorage.removeItem("sidebar_hidden_items");
        }
      }
    } else if (selectedPurposes.size > 0) {
      const selectedSidebarKeys = new Set<string>();
      purposes.forEach(p => {
        if (p.sidebarKey && selectedPurposes.has(p.label)) {
          selectedSidebarKeys.add(p.sidebarKey);
        }
      });

      const allOptionalKeys = purposes.map(p => p.sidebarKey).filter(Boolean) as string[];

      let toHide = Array.from(new Set([
        ...allOptionalKeys.filter(k => !selectedSidebarKeys.has(k) && !alwaysVisible.has(k)),
        ...ehrOptInKeys.filter(k => !selectedSidebarKeys.has(k)),
      ]));

      // If therapy-only, always add prescriptions to hidden
      if (therapyOnly && !toHide.includes("prescriptions")) {
        toHide = [...toHide, "prescriptions"];
      }

      if (toHide.length > 0) {
        localStorage.setItem("sidebar_hidden_items", JSON.stringify(toHide));
      } else {
        localStorage.removeItem("sidebar_hidden_items");
      }
    } else {
      // User selected nothing — apply defaults
      let defaultHidden = isAiScribe ? [] : [...ehrOptInKeys];

      // If therapy-only, always hide prescriptions
      if (therapyOnly) {
        defaultHidden = Array.from(new Set([...defaultHidden, "prescriptions"]));
      }

      if (defaultHidden.length > 0) {
        localStorage.setItem("sidebar_hidden_items", JSON.stringify(defaultHidden));
      } else {
        localStorage.removeItem("sidebar_hidden_items");
      }
    }

    // ── Dashboard card personalisation ───────────────────────────────────────
    if (selectAll) {
      if (therapyOnly) {
        // Hide prescriptions card even on "everything"
        localStorage.setItem("dashboard_hidden_cards", JSON.stringify(["prescriptions"]));
      } else {
        localStorage.removeItem("dashboard_hidden_cards");
      }
    } else if (selectedPurposes.size > 0) {
      const selectedCardIds = new Set<string>();
      purposes.forEach(p => {
        if (selectedPurposes.has(p.label)) {
          const cards = purposeToCardIds[p.label];
          if (cards) cards.forEach(c => selectedCardIds.add(c));
        }
      });

      alwaysVisibleCards.forEach(id => selectedCardIds.add(id));

      let cardsToHide = allDashboardCardIds.filter(id => !selectedCardIds.has(id));

      // If therapy-only, always add prescriptions to hidden cards
      if (therapyOnly && !cardsToHide.includes("prescriptions")) {
        cardsToHide = [...cardsToHide, "prescriptions"];
      }

      if (cardsToHide.length > 0) {
        localStorage.setItem("dashboard_hidden_cards", JSON.stringify(cardsToHide));
      } else {
        localStorage.removeItem("dashboard_hidden_cards");
      }
    } else {
      if (therapyOnly) {
        localStorage.setItem("dashboard_hidden_cards", JSON.stringify(["prescriptions"]));
      } else {
        localStorage.removeItem("dashboard_hidden_cards");
      }
    }

    // Store prescription pref flag for Layout.tsx to read
    if (therapyOnly) {
      localStorage.setItem("ai_scribe_prescription_pref", "no");
    } else {
      localStorage.setItem("ai_scribe_prescription_pref", "yes");
    }

    if (signupMode === "ai-scribe") setPlanMode("transcriber-only");
    else setPlanMode("full-ehr");

    localStorage.setItem("mantra_logged_in", "true");
    navigate("/");
  };

  const capsuleBase = "px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer select-none";
  const capsuleSelected = "bg-[#043570] text-white border-[#043570]";
  const capsuleUnselected = "bg-white text-[#0F172A] border-[#e5e7eb] hover:border-[#043570]";

  // Derive the purposes to show — hide Prescription Management if therapy-only
  const therapyOnly = isTherapyOnly(selectedProfessions);
  const visiblePurposes = therapyOnly
    ? purposes.filter(p => p.label !== "Prescription Management")
    : purposes;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden md:flex flex-col w-[48%] relative"
        style={{ background: "linear-gradient(160deg, #1a3a6e 0%, #043570 100%)" }}
      >
        <div className="p-8 flex items-center gap-2">
          <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-white font-semibold text-lg">Mantra</span>
        </div>

        <div className="flex-1 flex flex-col justify-center px-12 pb-8">
          <h1 className="text-white text-3xl font-bold leading-tight mb-8">{content.headline}</h1>

          <div className="space-y-4">
            {content.benefits.map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  }}
                >
                  {iconMap[text] ?? <Shield className="size-5 text-white" />}
                </div>
                <span className="text-white text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 pb-6">
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>© 2026 Mantra</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-[#F8FAFC] flex items-start justify-center px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-[480px]">
          <div className="mb-8">
            <h2 className="text-[#0F172A] mb-1" style={{ fontSize: 24, fontWeight: 700 }}>Personalize your experience</h2>
            <p className="text-[#64748B]" style={{ fontSize: 14 }}>
              Tell us how you'll use the platform so we can set up the right tools for you.
            </p>
          </div>

          {/* Profession selector */}
          <div className="mb-8 relative">
            <label className="block text-[#0F172A] mb-3" style={{ fontSize: 14, fontWeight: 600 }}>
              What is your primary profession?
            </label>

            {/* Selected tags */}
            {selectedProfessions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedProfessions.map(p => (
                  <span key={p} className="px-3 py-1.5 bg-[#E3F2FD] text-[#043570] rounded-lg text-sm font-medium flex items-center gap-2">
                    {p}
                    <button onClick={() => toggleProfession(p)} className="hover:text-red-500">
                      <X className="size-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Dropdown trigger */}
            <button
              type="button"
              onClick={() => setShowProfessionDropdown(!showProfessionDropdown)}
              className="w-full px-4 py-3.5 bg-[#f8fbff] border border-[#e5e7eb] rounded-2xl text-left text-[#64748b] font-medium focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] shadow-sm flex items-center justify-between"
              style={{ fontSize: 14 }}
            >
              <span>Select professions</span>
              <ChevronDown className={`size-4 transition-transform ${showProfessionDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown menu */}
            {showProfessionDropdown && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-[#e5e7eb] rounded-2xl shadow-lg max-h-80 overflow-y-auto">
                {Object.entries(professionCategories).map(([category, options]) => (
                  <div key={category} className="border-b border-gray-100 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-[#64748b]">{category}</span>
                      {expandedCategories.includes(category)
                        ? <ChevronDown className="size-4 text-[#64748b]" />
                        : <ChevronRight className="size-4 text-[#64748b]" />
                      }
                    </button>
                    {expandedCategories.includes(category) && (
                      <div className="bg-gray-50">
                        {options.map(option => (
                          <label key={option} className="flex items-center gap-3 px-6 py-2.5 hover:bg-gray-100 cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedProfessions.includes(option)}
                              onChange={() => toggleProfession(option)}
                              className="w-4 h-4 text-[#00c0ff] rounded focus:ring-[#00c0ff]"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {/* Other — flat row, no sub-items */}
                <button
                  type="button"
                  onClick={() => toggleProfession("Other")}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${selectedProfessions.includes("Other") ? "bg-gray-50" : ""}`}
                >
                  <span className="text-sm font-semibold text-[#64748b]">Other</span>
                  {selectedProfessions.includes("Other") && (
                    <Check className="size-4 text-[#043570]" />
                  )}
                </button>
              </div>
            )}

            {/* Free-text input shown when "Other" is selected */}
            {selectedProfessions.includes("Other") && (
              <div className="mt-3">
                <input
                  id="other-profession"
                  type="text"
                  value={otherProfessionText}
                  onChange={e => setOtherProfessionText(e.target.value)}
                  placeholder="Describe your profession"
                  className="w-full px-4 py-3 bg-[#f8fbff] border border-[#e5e7eb] rounded-2xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/20 text-sm"
                />
              </div>
            )}

            {/* Therapy-only notice */}
            {therapyOnly && (
              <p className="mt-2 text-[12px] text-[#64748B]">
                Prescription management is not included for therapy-only practices.
              </p>
            )}
          </div>

          {/* Purpose / goals selector — same for both EHR and AI Scribe */}
          <div className="mb-6">
            <label className="block text-[#0F172A] mb-0.5" style={{ fontSize: 14, fontWeight: 600 }}>What are your primary goals?</label>
            <p className="text-[#64748B] mb-3" style={{ fontSize: 12 }}>Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {visiblePurposes.map(p => (
                <button
                  key={p.label}
                  onClick={() => togglePurpose(p.label)}
                  className={`${capsuleBase} ${selectedPurposes.has(p.label) ? capsuleSelected : capsuleUnselected}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Select all */}
            <label className="flex items-center gap-2 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={e => handleSelectAll(e.target.checked)}
                className="size-4 rounded border-[#e5e7eb] accent-[#043570]"
              />
              <span className="text-sm font-medium text-[#0F172A]">Everything sounds useful — give me full access</span>
            </label>
          </div>

          <button
            onClick={handleGetStarted}
            className="w-full bg-[#043570] text-white rounded-xl flex items-center justify-center transition-opacity hover:opacity-90"
            style={{ height: 52, fontSize: 15, fontWeight: 700 }}
          >
            Get Started →
          </button>

          {/* Trust signal */}
          <div className="flex items-center gap-2 mt-5 p-3 bg-white rounded-xl border border-[#e5e7eb]">
            <Shield className="size-4 text-[#043570] flex-shrink-0" />
            <div>
              <span className="text-[#0F172A] block" style={{ fontSize: 14, fontWeight: 700 }}>Secure & Private</span>
              <span className="text-[#64748B]" style={{ fontSize: 12 }}>Your data is encrypted and HIPAA-compliant</span>
            </div>
          </div>

          <div className="text-center mt-5">
            <button className="text-[#00c0ff] flex items-center gap-1.5 mx-auto" style={{ fontSize: 14 }}>
              <Globe className="size-4" />
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}