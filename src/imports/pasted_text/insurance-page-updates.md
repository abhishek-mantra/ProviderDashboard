Here's the precise prompt:

---

## Changes to `InsurancePage.tsx` only — two specific updates

---

### Change 1 — Add comments back

The first file provided is missing the `{/* Header */}`, `{/* Pill-Style Tabs */}`, `{/* Tab Content */}`, `{/* New Claim Button - Top Right */}` comments. Restore them exactly as they appear in the second (reference) file. The `<Claims>` component call should also use the multi-line format with each prop on its own line as shown in the reference. No logic or className changes — comments and formatting only.

---

### Change 2 — Add "How it works" section inside `CredentialStatus hideHeader` tab content, just before the "Our Capabilities" section

Inside `{activeTab === "credential" && <CredentialStatus hideHeader />}`, this currently renders the `CredentialStatus` component directly. Change this block to:

```tsx
{activeTab === "credential" && (
  <div className="space-y-6">

    {/* How it works */}
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1">How it works</h3>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-6">Follow these steps to get credentialed and start accepting insurance</p>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Left — Steps tracker */}
        <div className="flex-1 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[13px] top-7 bottom-7 w-px bg-gray-200 dark:bg-gray-700 z-0" />

          <div className="relative z-10 flex flex-col gap-0">
            {[
              {
                step: "1",
                color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                title: "You fill out the application",
                desc: "Provide your license info, NPI, malpractice insurance, and work history. Takes about 5–10 minutes.",
                badge: null,
              },
              {
                step: "2",
                color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
                title: "Mantra prepares and submits your credentials",
                desc: "We assemble your CAQH profile, verify your documents, and submit applications to your selected payers. No back-and-forth from you.",
                badge: null,
              },
              {
                step: "3",
                color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                title: "Payers review and approve",
                desc: "Insurance companies typically take 60–120 days to process. You can track your status in real time from your dashboard.",
                badge: "Live tracking available",
              },
              {
                step: "4",
                color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                title: "You're in-network — start seeing insured patients",
                desc: "Once approved, eligible patients can book with you using their insurance. Mantra also handles claims submission and follow-ups.",
                badge: null,
              },
            ].map(({ step, color, title, desc, badge }) => (
              <div key={step} className="flex gap-4 pb-6 last:pb-0">
                {/* Step circle */}
                <div className={`size-7 rounded-full ${color} text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10`}>
                  {step}
                </div>
                {/* Content */}
                <div className="pt-0.5">
                  <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">{title}</p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                  {badge && (
                    <span className="inline-block mt-1.5 text-[11px] px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Video placeholder */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750 aspect-video cursor-pointer hover:border-[#1E3A8A] dark:hover:border-blue-500 transition-colors">
            <div className="size-12 bg-[#1E3A8A] rounded-full flex items-center justify-center mb-3 shadow-md">
              <PlayCircle className="size-6 text-white" />
            </div>
            <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1">
              Watch: How credentialing works
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Placeholder for embedded video</p>
          </div>
        </div>

      </div>
    </div>

    {/* CredentialStatus component renders below — contains Our Capabilities and everything else */}
    <CredentialStatus hideHeader />

  </div>
)}
```

---

### Add to `InsurancePage.tsx` imports

Add `PlayCircle` to the lucide-react import line:

```tsx
import { Shield, FileText, Plus, PlayCircle } from "lucide-react";
```

---

### What must NOT change

- `CredentialStatus.tsx` — do not touch this file at all
- The claims tab — zero changes
- All state variables, handler functions, and className logic in `InsurancePage.tsx`
- The page header and tab bar — keep exactly as in the reference file