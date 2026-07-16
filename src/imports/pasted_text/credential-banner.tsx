Here's the prompt:

---

**File:** `CredentialStatus.tsx`
**Scope:** The "Get Insurance Credentialed" empty-state banner section only. No changes to tabs, claims, or other sections.

---

### Changes

**1. Add a `useState` for form visibility** at the top of the component:

```typescript
const [showApplicationForm, setShowApplicationForm] = useState(false);
const [formSubmitted, setFormSubmitted] = useState(false);
const [formData, setFormData] = useState({
  fullName: "",
  npiNumber: "",
  licenseNumber: "",
  licenseState: "",
  specialty: "",
  practiceType: "",
  taxId: "",
  phone: "",
  email: "",
  insuranceNetworks: [] as string[],
  acceptedTerms: false,
});
```

---

**2. Replace the existing "Get Insurance Credentialed" banner block** with the following structure:

```tsx
{/* ── Get Insurance Credentialed section ───────────────────────── */}
<div className="space-y-5">

  {/* Top card: title + 3 feature icons */}
  <div className="bg-[#F0F6FF] dark:bg-[#1E3A5F]/30 border border-[#BFDBFE] dark:border-[#1E3A8A]/40 rounded-2xl p-6">
    <div className="flex items-start gap-4 mb-6">
      <div className="size-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center flex-shrink-0">
        <Shield className="size-5 text-white" />
      </div>
      <div>
        <h2 className="text-[18px] font-bold text-[#111827] dark:text-white mb-1">
          Get Insurance Credentialed
        </h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400">
          Expand your practice by accepting insurance. Get credentialed with major payers through MantraCare's streamlined process.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { icon: <Zap className="size-5 text-[#2563EB]" />, bg: "bg-[#DBEAFE]", label: "Fast Processing", sub: "We handle all paperwork" },
        { icon: <Shield className="size-5 text-[#0D9488]" />, bg: "bg-[#CCFBF1]", label: "50+ Networks", sub: "Top insurance payers" },
        { icon: <Eye className="size-5 text-[#7C3AED]" />, bg: "bg-[#EDE9FE]", label: "Live Tracking", sub: "Monitor your status" },
      ].map(({ icon, bg, label, sub }) => (
        <div key={label} className="flex flex-col items-center text-center gap-2">
          <div className={`size-12 ${bg} rounded-xl flex items-center justify-center`}>
            {icon}
          </div>
          <p className="text-[13px] font-semibold text-[#111827] dark:text-white">{label}</p>
          <p className="text-[11px] text-[#6B7280] dark:text-gray-400">{sub}</p>
        </div>
      ))}
    </div>
  </div>

  {/* How it works + Video placeholder */}
  <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-6">
    <h3 className="text-[15px] font-bold text-[#111827] dark:text-white mb-4">How it works</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

      {/* Steps */}
      <div className="space-y-4">
        {[
          { step: "1", title: "Submit your application", desc: "Fill in your NPI, license, specialty, and preferred insurance networks. Takes 5–10 minutes." },
          { step: "2", title: "We handle the paperwork", desc: "Our credentialing team submits applications to all selected payers on your behalf." },
          { step: "3", title: "Track your status live", desc: "Monitor approval progress for each network directly from your dashboard." },
          { step: "4", title: "Start accepting insurance", desc: "Once approved, you're live on the network and can begin accepting insured clients." },
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex items-start gap-3">
            <div className="size-7 rounded-full bg-[#1E3A8A] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[11px] font-bold text-white">{step}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#111827] dark:text-white">{title}</p>
              <p className="text-[12px] text-[#6B7280] dark:text-gray-400 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video placeholder */}
      <div
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E5E7EB] dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-750 cursor-pointer hover:border-[#1E3A8A] transition-colors"
        style={{ minHeight: "220px" }}
      >
        <div className="size-12 bg-[#1E3A8A] rounded-full flex items-center justify-center mb-3 shadow-md">
          <PlayCircle className="size-7 text-white" />
        </div>
        <p className="text-[13px] font-semibold text-[#111827] dark:text-white mb-1">
          Credentialing walkthrough
        </p>
        <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
          Placeholder for embedded video
        </p>
      </div>
    </div>
  </div>

  {/* CTA button */}
  {!showApplicationForm && !formSubmitted && (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setShowApplicationForm(true)}
        className="flex items-center gap-2 px-8 py-3.5 bg-[#1E3A8A] hover:bg-[#1e40af] text-white rounded-xl font-bold text-[14px] transition-colors shadow-md"
      >
        <Shield className="size-4" />
        Get Insurance · Set Up a Call with Our Team
      </button>
      <p className="text-[11px] text-[#9CA3AF]">Takes 5–10 minutes · 95% approval rate</p>
    </div>
  )}

  {/* ── Application Form (inline, expands below CTA) ───────────────── */}
  {showApplicationForm && !formSubmitted && (
    <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-[16px] font-bold text-[#111827] dark:text-white mb-1">
          Credentialing Application
        </h3>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400">
          Fill in your details below. Our team will review your application and schedule a call to complete verification.
        </p>
      </div>

      {/* Personal & License Info */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">
          Personal & License Info
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", key: "fullName", placeholder: "Dr. Jane Smith", type: "text" },
            { label: "Email Address", key: "email", placeholder: "jane@clinic.com", type: "email" },
            { label: "Phone Number", key: "phone", placeholder: "+1 (555) 000-0000", type: "tel" },
            { label: "NPI Number", key: "npiNumber", placeholder: "10-digit NPI", type: "text" },
            { label: "License Number", key: "licenseNumber", placeholder: "State license number", type: "text" },
            { label: "License State", key: "licenseState", placeholder: "e.g. CA", type: "text" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label className="block text-[12px] font-medium text-[#374151] dark:text-gray-300 mb-1.5">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={(formData as any)[key]}
                onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Practice Info */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">
          Practice Info
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-[#374151] dark:text-gray-300 mb-1.5">Specialty</label>
            <select
              value={formData.specialty}
              onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
              className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            >
              <option value="">Select specialty</option>
              {["Psychiatry", "Psychology", "Licensed Clinical Social Work", "Licensed Professional Counseling", "Marriage & Family Therapy", "Addiction Counseling", "Other"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#374151] dark:text-gray-300 mb-1.5">Practice Type</label>
            <select
              value={formData.practiceType}
              onChange={(e) => setFormData(prev => ({ ...prev, practiceType: e.target.value }))}
              className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            >
              <option value="">Select practice type</option>
              {["Solo Practice", "Group Practice", "Clinic", "Hospital / Health System", "Telehealth Only"].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-[12px] font-medium text-[#374151] dark:text-gray-300 mb-1.5">Tax ID (EIN or SSN)</label>
            <input
              type="text"
              placeholder="Used for insurance billing purposes"
              value={formData.taxId}
              onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
              className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-[13px] bg-white dark:bg-gray-750 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Insurance Networks */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">
          Preferred Insurance Networks
        </p>
        <p className="text-[12px] text-[#6B7280] dark:text-gray-400 mb-3">Select all networks you'd like to credential with.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Aetna", "BlueCross BlueShield", "Cigna", "UnitedHealthcare", "Humana", "Magellan Health", "Optum", "Anthem", "Molina Healthcare"].map(network => {
            const selected = formData.insuranceNetworks.includes(network);
            return (
              <button
                key={network}
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  insuranceNetworks: selected
                    ? prev.insuranceNetworks.filter(n => n !== network)
                    : [...prev.insuranceNetworks, network]
                }))}
                className={`px-3 py-2 rounded-lg text-[12px] font-medium border-2 transition-all text-left ${
                  selected
                    ? "border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]"
                    : "border-[#E5E7EB] text-[#6B7280] hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                }`}
              >
                {network}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="credTerms"
          checked={formData.acceptedTerms}
          onChange={(e) => setFormData(prev => ({ ...prev, acceptedTerms: e.target.checked }))}
          className="mt-0.5 size-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
        />
        <label htmlFor="credTerms" className="text-[12px] text-[#6B7280] dark:text-gray-400">
          I confirm that the information provided is accurate. I authorise MantraCare to submit credentialing applications to the selected insurance networks on my behalf.
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => setShowApplicationForm(false)}
          className="px-5 py-2.5 border border-[#D1D5DB] dark:border-gray-600 text-[#374151] dark:text-gray-300 text-[13px] font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={!formData.acceptedTerms || !formData.fullName || !formData.email || !formData.npiNumber || formData.insuranceNetworks.length === 0}
          onClick={() => {
            // TODO: wire to API
            setShowApplicationForm(false);
            setFormSubmitted(true);
          }}
          className="flex-1 px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1e40af] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-bold rounded-lg transition-colors"
        >
          Submit Application
        </button>
      </div>
    </div>
  )}

  {/* ── Success state ──────────────────────────────────────────────────── */}
  {formSubmitted && (
    <div className="bg-[#F0FDF4] dark:bg-emerald-900/20 border border-[#BBF7D0] dark:border-emerald-700 rounded-2xl p-8 flex flex-col items-center text-center">
      <div className="size-14 bg-[#16A34A] rounded-full flex items-center justify-center mb-4 shadow-md">
        <CheckCircle className="size-8 text-white" />
      </div>
      <h3 className="text-[17px] font-bold text-[#111827] dark:text-white mb-2">
        Application Submitted — Profile Under Review
      </h3>
      <p className="text-[13px] text-[#6B7280] dark:text-gray-400 max-w-[440px] leading-relaxed">
        Our credentialing team has received your application. We'll review your information and reach out within <strong>3–5 business days</strong> to schedule a verification call and confirm next steps.
      </p>
      <div className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-[#D1FAE5] dark:border-emerald-700 rounded-xl">
        <Clock className="size-4 text-[#16A34A] flex-shrink-0" />
        <span className="text-[12px] font-medium text-[#374151] dark:text-gray-300">
          Typical review time: 3–5 business days
        </span>
      </div>
    </div>
  )}

</div>
```

---

**Additional imports needed** at the top of `CredentialStatus.tsx` — add any not already present:

```typescript
import { Shield, Zap, Eye, PlayCircle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
```

---

**Submit button disabled logic:** Button stays disabled until `fullName`, `email`, `npiNumber` are non-empty, at least one `insuranceNetworks` item is selected, and `acceptedTerms` is `true`. No other validation needed.