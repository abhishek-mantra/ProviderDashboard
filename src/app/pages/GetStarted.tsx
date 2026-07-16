import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Eye, EyeOff, Shield, Globe, ChevronDown, ChevronLeft,
  Globe as GlobeIcon, Briefcase, LayoutDashboard, Building2, Zap, ShieldCheck,
  Headphones, Users, CreditCard, FileText, CalendarDays, Pill, ClipboardCheck,
  Mic, Bot, Brain, Timer, Megaphone,
} from "lucide-react";

type SignupMode = "provider" | "full-ehr";

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
  "Client referrals from individuals, employers, insurance networks, and EAP programs": <GlobeIcon className="size-5 text-white" />,
  "Flexible freelance work on your own schedule": <Briefcase className="size-5 text-white" />,
  "Free EHR, telehealth, scheduling & practice management tools": <LayoutDashboard className="size-5 text-white" />,
  "Billing, invoicing, claims processing & payment tracking": <CreditCard className="size-5 text-white" />,
  "AI Transcriber, Automated Session Notes & clinical documentation tools": <Mic className="size-5 text-white" />,
  "Insurance credentialing, enrollment & claims management": <ClipboardCheck className="size-5 text-white" />,
  "AI Transcriber, Automated Session Notes & Prescription Management": <Bot className="size-5 text-white" />,
  "EHR with client records, treatment plans & health history": <Users className="size-5 text-white" />,
  "Appointment scheduling, telehealth & calendar synchronization": <CalendarDays className="size-5 text-white" />,
  "Client referrals from individuals, employers, EAPs & insurance networks": <GlobeIcon className="size-5 text-white" />,
  "Secure, HIPAA-compliant platform with built-in compliance tools": <ShieldCheck className="size-5 text-white" />,
  "Premium provider profile & directory listing": <Megaphone className="size-5 text-white" />,
  "Client referrals from individuals, employers & insurance networks": <GlobeIcon className="size-5 text-white" />,
  "Free EHR, telehealth & scheduling tools": <LayoutDashboard className="size-5 text-white" />,
  "AI Transcriber & automated session notes": <Mic className="size-5 text-white" />,
  "Billing, invoicing & payment tracking": <CreditCard className="size-5 text-white" />,
  "Insurance credentialing & claims management": <ClipboardCheck className="size-5 text-white" />,
  "AI Transcriber, session notes & prescription management": <Bot className="size-5 text-white" />,
  "EHR with client records & treatment plans": <Users className="size-5 text-white" />,
  "Scheduling, telehealth & calendar sync": <CalendarDays className="size-5 text-white" />,
  "Billing, claims & insurance credentialing": <CreditCard className="size-5 text-white" />,
  "HIPAA-compliant with client referrals & directory listing": <ShieldCheck className="size-5 text-white" />,
};

const modeContent: Record<SignupMode, {
  headline: string;
  planLabel: string;
  planPrice: string;
  benefits: string[];
}> = {
  provider: {
    headline: "Grow Your Practice with Mantra",
    planLabel: "FREE FOREVER",
    planPrice: "$0 / month · no card required",
    benefits: [
      "Client referrals from individuals, employers & insurance networks",
      "Free EHR, telehealth & scheduling tools",
      "AI Transcriber & automated session notes",
      "Billing, invoicing & payment tracking",
      "Insurance credentialing & claims management",
    ],
  },
  "full-ehr": {
    headline: "Your Complete Practice OS — Powered by AI",
    planLabel: "50% OFF — LIMITED TIME",
    planPrice: "From $49 / month",
    benefits: [
      "AI Transcriber, session notes & prescription management",
      "EHR with client records & treatment plans",
      "Scheduling, telehealth & calendar sync",
      "Billing, claims & insurance credentialing",
      "HIPAA-compliant with client referrals & directory listing",
    ],
  },
};

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", country: "US" },
  { code: "+91", flag: "🇮🇳", country: "IN" },
  { code: "+44", flag: "🇬🇧", country: "GB" },
  { code: "+61", flag: "🇦🇺", country: "AU" },
  { code: "+49", flag: "🇩🇪", country: "DE" },
  { code: "+33", flag: "🇫🇷", country: "FR" },
];

const googleSvg = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

function TrustSignal() {
  return (
    <div className="flex items-center gap-2 mt-5 p-3 bg-white rounded-xl border border-[#e5e7eb]">
      <Shield className="size-4 text-[#043570] flex-shrink-0" />
      <div>
        <span className="text-[#0F172A] block" style={{ fontSize: 14, fontWeight: 700 }}>Secure & Private</span>
        <span className="text-[#64748B]" style={{ fontSize: 12 }}>Your data is encrypted and HIPAA-compliant</span>
      </div>
    </div>
  );
}

function LanguageToggle() {
  return (
    <div className="text-center mt-5">
      <button className="text-[#00c0ff] flex items-center gap-1.5 mx-auto" style={{ fontSize: 14 }}>
        <Globe className="size-4" />
        English
      </button>
    </div>
  );
}

export function GetStarted() {
  const navigate = useNavigate();
  const [signupMode, setSignupMode] = useState<SignupMode>("provider");
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[1]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", password: "" });

  const content = modeContent[signupMode];

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
          <h1 className="text-white text-3xl font-bold leading-tight mb-8" style={{ fontWeight: 700 }}>
            {content.headline}
          </h1>

          <div className="space-y-4">
            {content.benefits.map((text, i) => (
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

          {/* Mode Switcher — DEV ONLY */}
          <div className="mt-12">
            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
              ⚠ Dev only — toggle route preview
            </p>
            <div className="inline-flex rounded-full p-1" style={{ background: "rgba(255,255,255,0.1)" }}>
              {(["provider", "full-ehr"] as SignupMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSignupMode(mode)}
                  className="rounded-full px-4 py-1.5 transition-all"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    background: signupMode === mode ? "white" : "transparent",
                    color: signupMode === mode ? "#043570" : "rgba(255,255,255,0.6)",
                    boxShadow: signupMode === mode ? "0 1px 4px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  {mode === "provider" ? "Free Provider" : "EHR + AI Scribe"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 pb-6">
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>© 2026 Mantra Practice</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-[#F8FAFC] flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[420px]">
          {step === 1 ? (
            <>
              <div className="mb-6">
                <h2 className="text-[#0F172A] mb-1" style={{ fontSize: 24, fontWeight: 700 }}>Get started</h2>
                <p className="text-[#64748B]" style={{ fontSize: 14 }}>Enter your email address to continue to your account</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8fbff] border border-[#e5e7eb] rounded-2xl outline-none text-[#0F172A] placeholder-[#94A3B8] focus:border-[#00c0ff]"
                    style={{ padding: "14px 16px", fontSize: 14, transition: "border-color 0.2s" }}
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-[#043570] text-white rounded-xl flex items-center justify-center transition-opacity hover:opacity-90"
                  style={{ height: 52, fontSize: 15, fontWeight: 700 }}
                >
                  Continue →
                </button>
              </div>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[#e5e7eb]" />
                <span className="text-[#94A3B8]" style={{ fontSize: 12 }}>OR</span>
                <div className="flex-1 h-px bg-[#e5e7eb]" />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-white border border-[#e5e7eb] rounded-xl flex items-center justify-center gap-3 hover:bg-[#f8fbff] transition-colors"
                style={{ height: 52, fontSize: 14, fontWeight: 600, color: "#0F172A" }}
              >
                {googleSvg}
                Continue with Google
              </button>

              <TrustSignal />
              <LanguageToggle />

              <p className="text-center mt-4 text-[#64748B]" style={{ fontSize: 14 }}>
                Already have an account?{" "}
                <button onClick={() => navigate("/")} className="text-[#043570] font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors"
                style={{ fontSize: 14 }}
              >
                <ChevronLeft className="size-4" />
                Back
              </button>

              <div className="mb-6">
                <h2 className="text-[#0F172A] mb-1" style={{ fontSize: 24, fontWeight: 700 }}>Create your account</h2>
                <p className="text-[#64748B]" style={{ fontSize: 14 }}>Complete your details to get started</p>
              </div>

              {/* Confirmed email pill */}
              <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-white border border-[#e5e7eb] rounded-xl">
                <span className="text-[#043570] text-sm font-semibold">✓</span>
                <span className="text-[#0F172A] text-sm flex-1">{email || "user@example.com"}</span>
                <button onClick={() => setStep(1)} className="text-[#00c0ff] text-xs font-semibold hover:underline">Change</button>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: 14, fontWeight: 600 }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#f8fbff] border border-[#e5e7eb] rounded-2xl outline-none text-[#0F172A] placeholder-[#94A3B8] focus:border-[#00c0ff]"
                    style={{ padding: "14px 16px", fontSize: 14 }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: 14, fontWeight: 600 }}>Phone Number</label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryPicker(!showCountryPicker)}
                        className="flex items-center gap-1.5 bg-[#f8fbff] border border-[#e5e7eb] rounded-2xl h-full px-3 text-[#0F172A] whitespace-nowrap"
                        style={{ fontSize: 14, minWidth: 88 }}
                      >
                        <span>{countryCode.flag}</span>
                        <span>{countryCode.code}</span>
                        <ChevronDown className="size-3.5 text-[#94A3B8]" />
                      </button>
                      {showCountryPicker && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e5e7eb] rounded-xl shadow-lg z-10 overflow-hidden">
                          {COUNTRY_CODES.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountryCode(c); setShowCountryPicker(false); }}
                              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-[#f8fbff] text-left"
                              style={{ fontSize: 13 }}
                            >
                              <span>{c.flag}</span>
                              <span className="text-[#64748B]">{c.country}</span>
                              <span className="text-[#0F172A] font-medium">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 bg-[#f8fbff] border border-[#e5e7eb] rounded-2xl outline-none text-[#0F172A] placeholder-[#94A3B8] focus:border-[#00c0ff]"
                      style={{ padding: "14px 16px", fontSize: 14 }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: 14, fontWeight: 600 }}>Create Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full bg-[#f8fbff] border border-[#e5e7eb] rounded-2xl outline-none text-[#0F172A] placeholder-[#94A3B8] focus:border-[#00c0ff] pr-12"
                      style={{ padding: "14px 16px", fontSize: 14 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/verify", { state: { signupMode, email } })}
                  className="w-full bg-[#043570] text-white rounded-xl flex items-center justify-center transition-opacity hover:opacity-90"
                  style={{ height: 52, fontSize: 15, fontWeight: 700 }}
                >
                  Create Account
                </button>
              </div>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[#e5e7eb]" />
                <span className="text-[#94A3B8]" style={{ fontSize: 12 }}>OR</span>
                <div className="flex-1 h-px bg-[#e5e7eb]" />
              </div>

              <button
                type="button"
                onClick={() => navigate("/verify", { state: { signupMode, email } })}
                className="w-full bg-white border border-[#e5e7eb] rounded-xl flex items-center justify-center gap-3 hover:bg-[#f8fbff] transition-colors"
                style={{ height: 52, fontSize: 14, fontWeight: 600, color: "#0F172A" }}
              >
                {googleSvg}
                Continue with Google
              </button>

              <TrustSignal />
              <LanguageToggle />

              <p className="text-center mt-4 text-[#64748B]" style={{ fontSize: 14 }}>
                Already have an account?{" "}
                <button onClick={() => navigate("/")} className="text-[#043570] font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
