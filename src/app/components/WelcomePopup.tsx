import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { usePlanMode } from "../contexts/PlanModeContext";
import { SPECIALTIES } from "../types/partnerDashboard";

const PROFESSIONS = SPECIALTIES;

const USE_CASES = [
  { value: "provider", label: "Provider", desc: "Manage clients, appointments & grow your practice" },
  { value: "full-ehr", label: "Full EHR", desc: "Complete practice management with billing & notes" },
  { value: "ai-scribe", label: "AI Scribe", desc: "Focus on sessions, let AI handle your documentation" },
];

interface WelcomePopupProps {
  onClose: () => void;
}

export function WelcomePopup({ onClose }: WelcomePopupProps) {
  const { setPlanMode } = usePlanMode();
  const [profession, setProfession] = useState("");
  const [useCase, setUseCase] = useState("");
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false);
  const [showUseCaseDropdown, setShowUseCaseDropdown] = useState(false);

  const selectedUseCase = USE_CASES.find((u) => u.value === useCase);

  const handleGetStarted = () => {
    const signupMode = localStorage.getItem("mantra_signup_mode");
    if (useCase === "ai-scribe") setPlanMode("transcriber-only");
    else if (signupMode === "provider") setPlanMode("provider");
    else setPlanMode("full-ehr");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div
        className="bg-white relative mx-4"
        style={{ borderRadius: 24, padding: 32, maxWidth: 480, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-8 rounded-full flex items-center justify-center hover:bg-[#f1f5f9] transition-colors"
        >
          <X className="size-4 text-[#94A3B8]" />
        </button>

        {/* Logo + Header */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="size-8 bg-[#043570] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-[#043570]" style={{ fontSize: 16 }}>Mantra</span>
          </div>
          <h2 className="text-[#0F172A]" style={{ fontSize: 22, fontWeight: 700 }}>Welcome to MantraCare!</h2>
          <p className="text-[#64748B] mt-1" style={{ fontSize: 14 }}>Let's personalize your experience</p>
        </div>

        <div className="h-px bg-[#e5e7eb] mb-5" />

        <div className="space-y-4">
          {/* Profession Dropdown */}
          <div>
            <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: 14, fontWeight: 600 }}>
              What is your profession?
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => { setShowProfessionDropdown(!showProfessionDropdown); setShowUseCaseDropdown(false); }}
                className="w-full flex items-center justify-between bg-[#f8fbff] border border-[#e5e7eb] rounded-xl px-4 py-3 text-left hover:border-[#00c0ff] transition-colors"
                style={{ fontSize: 14 }}
              >
                <span className={profession ? "text-[#0F172A]" : "text-[#94A3B8]"}>
                  {profession || "Select your profession"}
                </span>
                <ChevronDown className="size-4 text-[#94A3B8]" />
              </button>
              {showProfessionDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e5e7eb] rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                  {PROFESSIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => { setProfession(p); setShowProfessionDropdown(false); }}
                      className="w-full px-4 py-2.5 text-left hover:bg-[#f8fbff] transition-colors text-[#0F172A]"
                      style={{ fontSize: 14 }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Use Case Dropdown */}
          <div>
            <label className="block text-[#0F172A] mb-1" style={{ fontSize: 14, fontWeight: 600 }}>
              How would you like to use MantraCare?
            </label>
            <p className="text-[#64748B] mb-1.5" style={{ fontSize: 12 }}>
              Select the option that best matches your primary workflow
            </p>
            <div className="relative">
              <button
                type="button"
                onClick={() => { setShowUseCaseDropdown(!showUseCaseDropdown); setShowProfessionDropdown(false); }}
                className="w-full flex items-center justify-between bg-[#f8fbff] border border-[#e5e7eb] rounded-xl px-4 py-3 text-left hover:border-[#00c0ff] transition-colors"
                style={{ fontSize: 14 }}
              >
                <div>
                  {selectedUseCase ? (
                    <>
                      <span className="text-[#0F172A] font-medium">{selectedUseCase.label}</span>
                      <span className="text-[#64748B] ml-2" style={{ fontSize: 12 }}>— {selectedUseCase.desc}</span>
                    </>
                  ) : (
                    <span className="text-[#94A3B8]">Select your workflow</span>
                  )}
                </div>
                <ChevronDown className="size-4 text-[#94A3B8] flex-shrink-0" />
              </button>
              {showUseCaseDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e5e7eb] rounded-xl shadow-lg z-10 overflow-hidden">
                  {USE_CASES.map((u) => (
                    <button
                      key={u.value}
                      type="button"
                      onClick={() => { setUseCase(u.value); setShowUseCaseDropdown(false); }}
                      className="w-full px-4 py-3 text-left hover:bg-[#f8fbff] transition-colors"
                    >
                      <span className="text-[#0F172A] font-medium" style={{ fontSize: 14 }}>{u.label}</span>
                      <span className="text-[#64748B] ml-2" style={{ fontSize: 12 }}>— {u.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleGetStarted}
          className="w-full bg-[#043570] text-white rounded-xl flex items-center justify-center mt-6 transition-opacity hover:opacity-90"
          style={{ height: 52, fontSize: 15, fontWeight: 700 }}
        >
          Get Started →
        </button>

        <p className="text-center mt-3 italic text-[#94A3B8]" style={{ fontSize: 12 }}>
          You can change these preferences anytime in Settings
        </p>
      </div>
    </div>
  );
}
