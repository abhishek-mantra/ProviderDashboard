import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, Shield, Globe, ShieldCheck, Headphones, Users, CreditCard, FileText, CalendarDays, Pill, ClipboardCheck, Mic, Bot, Brain, Timer, Briefcase, LayoutDashboard, Building2, Zap, Globe as GlobeIcon, Megaphone } from "lucide-react";

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
};

const modeContent: Record<SignupMode, {
  headline: string;
  subheadline: string;
  planLabel: string;
  planPrice: string;
  benefits: string[];
}> = {
  provider: {
    headline: "Grow Your Practice with Mantra",
    subheadline: "Join the Mantra Provider Network and access client referrals, insurance and EAP opportunities, AI-powered practice tools, and everything you need to grow a successful practice.",
    planLabel: "FREE FOREVER",
    planPrice: "$0 / month · no card required",
    benefits: [
      "Client referrals from individuals, employers, insurance networks, and EAP programs",
      "Flexible freelance work on your own schedule",
      "Premium provider profile & directory listing",
      "Free EHR, telehealth, scheduling & practice management tools",
      "Billing, invoicing, claims processing & payment tracking",
      "AI Transcriber, Automated Session Notes & clinical documentation tools",
      "Insurance credentialing, enrollment & claims management",
    ],
  },
  "full-ehr": {
    headline: "Your Complete Practice OS — Powered by AI",
    subheadline: "Everything you need to attract clients, manage care, streamline operations, and grow your practice—all from a single platform.",
    planLabel: "50% OFF — LIMITED TIME",
    planPrice: "From $49 / month",
    benefits: [
      "AI Transcriber, Automated Session Notes & Prescription Management",
      "EHR with client records, treatment plans & health history",
      "Appointment scheduling, telehealth & calendar synchronization",
      "Billing, invoicing, claims processing & payment tracking",
      "Insurance credentialing, enrollment & claims management",
      "Premium provider profile & directory listing",
      "Client referrals from individuals, employers, EAPs & insurance networks",
      "Secure, HIPAA-compliant platform with built-in compliance tools",
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

export function OTPVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const signupMode: SignupMode = (location.state as any)?.signupMode ?? "provider";
  const email: string = (location.state as any)?.email ?? "user@example.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const content = modeContent[signupMode];

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(45);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mantra_logged_in", "true");
    localStorage.setItem("mantra_signup_mode", signupMode);
    if (signupMode === "provider") {
      navigate("/onboarding");
    } else {
      navigate("/onboarding-ehr-ai-scribe", { state: { signupMode, email } });
    }
  };

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
          <h1 className="text-white text-3xl font-bold leading-tight">{content.headline}</h1>
          <p className="text-white mb-8" style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.6 }}>
            {content.subheadline}
          </p>

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
      <div className="flex-1 bg-[#F8FAFC] flex items-start justify-center px-8 py-12 overflow-y-auto min-h-screen">
        <div className="w-full max-w-[420px]">
          {/* Back */}
          <button
            onClick={() => navigate("/get-started")}
            className="flex items-center gap-1 text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors"
            style={{ fontSize: 14 }}
          >
            <ChevronLeft className="size-4" />
            Back
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[#0F172A] mb-1" style={{ fontSize: 24, fontWeight: 700 }}>Verify your email</h2>
            <p className="text-[#64748B]" style={{ fontSize: 14 }}>
              Enter the 6-digit code sent to{" "}
              <span className="text-[#0F172A] font-semibold">{email || "your email"}</span>
            </p>
          </div>

          <form onSubmit={handleVerify}>
            {/* OTP Boxes */}
            <div className="flex gap-3 mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="text-center bg-white border outline-none transition-all"
                  style={{
                    width: 52,
                    height: 56,
                    flexShrink: 0,
                    borderRadius: 12,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#043570",
                    borderWidth: 1.5,
                    borderColor: digit ? "#043570" : "#e5e7eb",
                    background: digit ? "#f8fbff" : "white",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#00c0ff"; e.target.style.boxShadow = "0 0 0 3px rgba(0,192,255,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = digit ? "#043570" : "#e5e7eb"; e.target.style.boxShadow = "none"; }}
                />
              ))}
            </div>

            {/* Resend */}
            <div className="text-center mb-6">
              <span className="text-[#64748B]" style={{ fontSize: 14 }}>Didn't receive the code? </span>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#00c0ff] font-semibold"
                  style={{ fontSize: 14 }}
                >
                  Resend
                </button>
              ) : (
                <span className="text-[#94A3B8]" style={{ fontSize: 14 }}>
                  Resend in 0:{String(countdown).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full bg-[#043570] text-white rounded-xl flex items-center justify-center transition-opacity hover:opacity-90 mb-5"
              style={{ height: 52, fontSize: 15, fontWeight: 700 }}
            >
              Verify & Continue
            </button>
          </form>

          {/* Trust signal */}
          <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#e5e7eb]">
            <Shield className="size-4 text-[#043570] flex-shrink-0" />
            <div>
              <span className="text-[#0F172A] block" style={{ fontSize: 14, fontWeight: 700 }}>Secure & Private</span>
              <span className="text-[#64748B]" style={{ fontSize: 12 }}>Your data is encrypted and HIPAA-compliant</span>
            </div>
          </div>

          {/* Language */}
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
