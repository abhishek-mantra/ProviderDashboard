import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Shield, Globe, ShieldCheck, Headphones, Users, CreditCard, FileText, CalendarDays, Pill, ClipboardCheck, Mic, Bot, Brain, Timer, Briefcase, LayoutDashboard, Building2, Zap, Globe as GlobeIcon, ChevronDown, Megaphone } from "lucide-react";
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
  "AI Transcriber, Automated Session Notes & Prescription Management": <Bot className="size-5 text-white" />,
  "EHR with client records, treatment plans & health history": <Users className="size-5 text-white" />,
  "Appointment scheduling, telehealth & calendar synchronization": <CalendarDays className="size-5 text-white" />,
  "Billing, invoicing, claims processing & payment tracking": <CreditCard className="size-5 text-white" />,
  "Insurance credentialing, enrollment & claims management": <ClipboardCheck className="size-5 text-white" />,
  "Premium provider profile & directory listing": <Megaphone className="size-5 text-white" />,
  "Client referrals from individuals, employers, EAPs & insurance networks": <GlobeIcon className="size-5 text-white" />,
  "Secure, HIPAA-compliant platform with built-in compliance tools": <ShieldCheck className="size-5 text-white" />,
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

// Flat profession list
const professionOptions: string[] = [
  "Therapist / Psychologist", "Psychiatrist", "Dietician", "Fitness Instructor",
  "Physio Practitioner", "Addiction Specialist", "General Physician", "Endocrinologist",
  "Gynecologist", "Gastroenterologist", "Paediatrician", "ENT Specialist", "Orthopedician",
  "Cardiologist", "Sexologist", "Dermatologist", "Dentist", "Neurosurgeon", "Oncologist",
  "Ophthalmologist", "Urologist (Kidney & Urinary Tract)", "Nephrologist", "Pulmonologist (Lung)",
  "Rheumatologist", "Fertility/ IVF Specialist", "General Surgery", "Other",
];

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
  { label: "EHR", sidebarKey: "clients" },
  { label: "Appointment Scheduling", sidebarKey: "appointments" },
  { label: "Billing & Invoicing", sidebarKey: "billing" },
  { label: "Messaging", sidebarKey: "messages" },
  { label: "AI Scribe", sidebarKey: "ai-transcriber" },
  { label: "Session Notes", sidebarKey: "session-notes" },
  { label: "Prescription", sidebarKey: "prescriptions" },
  { label: "Insurance", sidebarKey: null },
];

const purposeToCardIds: Record<string, string[]> = {
  "EHR":                             ["clients"],
  "Appointment Scheduling":          ["appointments"],
  "Billing & Invoicing":             ["billing"],
  "AI Scribe":                       ["ai-transcriber"],
  "Session Notes":                   ["session-notes"],
  "Prescription":                    ["prescriptions"],
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
  const [selectedProfession, setSelectedProfession] = useState<string>("");
  const [professionSearch, setProfessionSearch] = useState("");
  const [practiceType, setPracticeType] = useState("");
  const [providerCount, setProviderCount] = useState("");

  const selectProfession = (p: string) => {
    setSelectedProfession(p);
    setShowProfessionDropdown(false);
    setProfessionSearch("");
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
    const finalProfessions = selectedProfession ? [selectedProfession] : [];

    // Determine if user is therapy-only (no prescribing professions selected)
    const therapyOnly = isTherapyOnly(finalProfessions);

    // Clear all stale sidebar customization state on fresh signup
    localStorage.removeItem("sidebar_provider_order");
    localStorage.removeItem("sidebar_show_more_promoted");
    localStorage.removeItem("sidebar_hidden_origins");
    localStorage.removeItem("sidebar_user_show_more_ehr");
    localStorage.removeItem("sidebar_user_show_more_transcriber");

    // ── Explicit selectAll branch: short-circuit before purpose-based logic ──
    if (selectAll) {
      if (isAiScribe) {
        localStorage.setItem("sidebar_transcriber_order",
          JSON.stringify(['home', 'clients', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings'])
        );
        localStorage.setItem("sidebar_user_show_more_transcriber",
          JSON.stringify(['billing', 'messages', 'appointments', 'resources', 'ai-crm'])
        );
      } else {
        // EHR full access = same order as provider mode (all items in main nav)
        localStorage.setItem("sidebar_ehr_order",
          JSON.stringify(['home', 'clients', 'billing', 'messages', 'appointments', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings'])
        );
        localStorage.removeItem("sidebar_user_show_more_ehr");
      }
      if (therapyOnly) {
        localStorage.setItem("dashboard_hidden_cards", JSON.stringify(["prescriptions"]));
        localStorage.setItem("ai_scribe_prescription_pref", "no");
        localStorage.setItem("sidebar_hidden_items", JSON.stringify(["prescriptions"]));
      } else {
        localStorage.removeItem("dashboard_hidden_cards");
        localStorage.setItem("ai_scribe_prescription_pref", "yes");
        localStorage.removeItem("sidebar_hidden_items");
      }
      if (isAiScribe) setPlanMode("transcriber-only"); else setPlanMode("full-ehr");
      localStorage.setItem("mantra_logged_in", "true");
      navigate("/");
      return;
    }

    // All optional sidebar keys from purposes (non-null sidebarKey)
    const allOptionalKeys = purposes.map(p => p.sidebarKey).filter(Boolean) as string[];

    // ── Sidebar personalisation — unselected items go to Show More, not Hidden ──
    // Collect the keys the user selected
    const selectedSidebarKeys = new Set<string>();
    if (selectAll) {
      allOptionalKeys.forEach(k => selectedSidebarKeys.add(k));
    } else {
      purposes.forEach(p => {
        if (p.sidebarKey && selectedPurposes.has(p.label)) {
          selectedSidebarKeys.add(p.sidebarKey);
        }
      });
    }

    // toShowMore = optional keys not selected and not always-visible
    let toShowMore = allOptionalKeys.filter(k => !selectedSidebarKeys.has(k) && !alwaysVisible.has(k));

    // Therapy-only: prescriptions get a hard hide, not Show More
    if (therapyOnly) {
      toShowMore = toShowMore.filter(k => k !== 'prescriptions');
    }

    // Write filtered sidebar order so main nav only shows selected + always-visible items
    const defaultEHROrderKeys = ['home', 'clients', 'billing', 'messages', 'appointments', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings'];
    const defaultTranscriberOrderKeys = ['home', 'clients', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings'];
    const allowedInOrder = new Set([...alwaysVisible, ...selectedSidebarKeys]);
    if (isAiScribe) {
      const filteredOrder = defaultTranscriberOrderKeys.filter(k => allowedInOrder.has(k));
      localStorage.setItem("sidebar_transcriber_order", JSON.stringify(filteredOrder));
    } else {
      const filteredOrder = defaultEHROrderKeys.filter(k => allowedInOrder.has(k));
      localStorage.setItem("sidebar_ehr_order", JSON.stringify(filteredOrder));
    }

    // Write to per-mode Show More key
    const showMoreKey = isAiScribe ? 'sidebar_user_show_more_transcriber' : 'sidebar_user_show_more_ehr';
    if (toShowMore.length > 0) {
      localStorage.setItem(showMoreKey, JSON.stringify(toShowMore));
    } else {
      localStorage.removeItem(showMoreKey);
    }

    // Clear hidden items — prescriptions are the only hard-hide exception
    if (therapyOnly) {
      localStorage.setItem("sidebar_hidden_items", JSON.stringify(["prescriptions"]));
    } else {
      localStorage.removeItem("sidebar_hidden_items");
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
  const therapyOnly = isTherapyOnly(selectedProfession ? [selectedProfession] : []);
  const visiblePurposes = therapyOnly
    ? purposes.filter(p => p.label !== "Prescription")
    : purposes;

  const leftBenefits = [
    "AI Transcriber, Automated Session Notes & Prescription Management",
    "EHR with client records, treatment plans & health history",
    "Appointment scheduling, telehealth & calendar synchronization",
    "Billing, invoicing, claims processing & payment tracking",
    "Insurance credentialing, enrollment & claims management",
    "Premium provider profile & directory listing",
    "Client referrals from individuals, employers, EAPs & insurance networks",
    "Secure, HIPAA-compliant platform with built-in compliance tools",
  ];

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
          <span className="text-white font-semibold text-lg">Mantra Practice</span>
        </div>

        <div className="flex-1 flex flex-col justify-center px-12 pb-8">
          <h1 className="text-white text-3xl font-bold leading-tight" style={{ fontWeight: 700 }}>
            Your Complete Practice OS — Powered by AI
          </h1>
          <p className="text-white mb-8" style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.6 }}>
            Everything you need to attract clients, manage care, streamline operations, and grow your practice—all from a single platform.
          </p>

          <div className="space-y-4">
            {leftBenefits.map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
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
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>© 2026 Mantra Practice</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-[#F8FAFC] flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[520px]">

        {/* 2. Headline block */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", margin: 0 }}>
            Personalize your experience
          </h2>
          <p style={{ fontSize: 13, color: "#64748B", marginTop: 4, marginBottom: 0 }}>
            Tell us how you'll use the platform so we can set up the right tools for you.
          </p>
        </div>

        {/* 3. Profession selector */}
        <div style={{ marginTop: 28 }} className="relative">
          <label
            className="block"
            style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 10 }}
          >
            What is your primary profession?
          </label>

          {/* Dropdown trigger */}
          <button
            type="button"
            onClick={() => { setShowProfessionDropdown(!showProfessionDropdown); setProfessionSearch(""); }}
            className="w-full flex items-center justify-between focus:outline-none"
            style={{
              background: "#F8FBFF",
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: "14px 16px",
              fontSize: 13,
              color: selectedProfession ? "#0F172A" : "#64748B",
            }}
          >
            <span>{selectedProfession || "Select profession"}</span>
            <ChevronDown
              className={`size-4 transition-transform flex-shrink-0 ${showProfessionDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown menu */}
          {showProfessionDropdown && (
            <div
              className="absolute z-20 w-full flex flex-col"
              style={{
                marginTop: 6,
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                maxHeight: 280,
                overflow: "hidden",
              }}
            >
              {/* Pinned search input */}
              <div style={{ borderBottom: "1px solid #E5E7EB", flexShrink: 0 }}>
                <input
                  type="text"
                  autoFocus
                  value={professionSearch}
                  onChange={e => setProfessionSearch(e.target.value)}
                  placeholder="Search profession..."
                  className="w-full focus:outline-none"
                  style={{ padding: "10px 16px", fontSize: 13, color: "#0F172A", background: "transparent" }}
                />
              </div>
              {/* Scrollable list */}
              <div className="overflow-y-auto flex-1">
                {(() => {
                  const query = professionSearch.toLowerCase();
                  const filtered = professionOptions.filter(o =>
                    o.toLowerCase().includes(query)
                  );
                  return (
                    <>
                      {filtered.map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectProfession(option)}
                          className="w-full text-left hover:bg-gray-50 transition-colors"
                          style={{ padding: "10px 16px", fontSize: 13, color: selectedProfession === option ? "#043570" : "#374151", fontWeight: selectedProfession === option ? 600 : 400 }}
                        >
                          {option}
                        </button>
                      ))}
                      {filtered.length === 0 && professionSearch.trim() && (
                        <button
                          onClick={() => selectProfession(professionSearch.trim())}
                          style={{ padding: "10px 16px", fontSize: 13, width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                          className="hover:bg-gray-50"
                        >
                          <span style={{ color: "#043570", fontWeight: 600 }}>+</span>{" "}Add "{professionSearch}"
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Therapy-only notice */}
          {therapyOnly && (
            <p style={{ fontSize: 11, color: "#64748B", marginTop: 8, marginBottom: 0 }}>
              Prescription management is not included for therapy-only practices.
            </p>
          )}
        </div>

        {/* 4a. Practice type */}
        <div style={{ marginTop: 20 }}>
          <label
            className="block"
            style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 10 }}
          >
            What is the type of your practice?
          </label>
          <div className="relative">
            <select
              value={practiceType}
              onChange={e => setPracticeType(e.target.value)}
              className="w-full appearance-none focus:outline-none"
              style={{
                background: "#F8FBFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "14px 40px 14px 16px",
                fontSize: 13,
                color: practiceType ? "#0F172A" : "#64748B",
              }}
            >
              <option value="" disabled>Select type</option>
              <option value="Individual Provider">Individual Provider</option>
              <option value="Group Practice">Group Practice</option>
              <option value="Clinic">Clinic</option>
              <option value="Hospital">Hospital</option>
            </select>
            <ChevronDown className="size-4 text-[#64748B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4b. Provider count */}
        <div style={{ marginTop: 20 }}>
          <label
            className="block"
            style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 10 }}
          >No. of providers / clinicians</label>
          <div className="relative">
            <select
              value={providerCount}
              onChange={e => setProviderCount(e.target.value)}
              className="w-full appearance-none focus:outline-none"
              style={{
                background: "#F8FBFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "14px 40px 14px 16px",
                fontSize: 13,
                color: providerCount ? "#0F172A" : "#64748B",
              }}
            >
              <option value="" disabled>Select range</option>
              <option value="1">1</option>
              <option value="2–10">2–10</option>
              <option value="10–50">10–50</option>
              <option value="50–100">50–100</option>
              <option value="100–500">100–500</option>
              <option value="500+">500+</option>
            </select>
            <ChevronDown className="size-4 text-[#64748B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 5. Goals selector */}
        <div style={{ marginTop: 28 }}>
          <label
            className="block"
            style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 4 }}
          >What would you like to use Mantra for?</label>
          <p style={{ fontSize: 11, color: "#64748B", marginBottom: 12 }}>Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {visiblePurposes.map(p => (
              <button
                key={p.label}
                onClick={() => togglePurpose(p.label)}
                className="transition-all"
                style={{
                  borderRadius: 999,
                  padding: "8px 16px",
                  fontSize: 13,
                  border: `1px solid ${selectedPurposes.has(p.label) ? "#043570" : "#E5E7EB"}`,
                  background: selectedPurposes.has(p.label) ? "#043570" : "#FFFFFF",
                  color: selectedPurposes.has(p.label) ? "#FFFFFF" : "#0F172A",
                  cursor: "pointer",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Everything checkbox */}
          <label
            className="flex items-center gap-2 cursor-pointer"
            style={{ marginTop: 16 }}
          >
            <input
              type="checkbox"
              checked={selectAll}
              onChange={e => handleSelectAll(e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: "#043570" }}
            />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>
              Everything sounds useful — give me full access
            </span>
          </label>
        </div>

        {/* 6. CTA button */}
        <button
          onClick={handleGetStarted}
          className="w-full flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{
            marginTop: 28,
            height: 52,
            background: "#043570",
            color: "#FFFFFF",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
          }}
        >
          Get Started →
        </button>

        {/* 6. Trust badge */}
        <div
          className="flex items-center gap-3"
          style={{
            marginTop: 16,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Shield style={{ width: 16, height: 16, color: "#043570", flexShrink: 0 }} />
          <div>
            <span
              className="block"
              style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}
            >
              Secure & Private
            </span>
            <span style={{ fontSize: 11, color: "#64748B" }}>
              Your data is encrypted and HIPAA-compliant
            </span>
          </div>
        </div>

        {/* 7. Language toggle */}
        <div className="flex justify-center" style={{ marginTop: 16 }}>
          <button
            className="flex items-center gap-1.5"
            style={{ color: "#00C0FF", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}
          >
            <Globe className="size-4" />
            English
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}