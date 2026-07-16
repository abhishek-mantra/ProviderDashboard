Here's the detailed, precise prompt:

---

**Prompt — Align left-panel content with actual plan data across GetStarted, OTPVerify & OnboardingEHRAIScribe**

**Context:** The left panel (blue gradient, `hidden md:flex`) on all three auth screens currently shows generic marketing copy that doesn't match the actual plans defined in `SettingsBilling.tsx`. Update every occurrence of the `modeContent` object and `iconMap` across `GetStarted.tsx`, `OTPVerify.tsx`, and `OnboardingEHRAIScribe.tsx` to reflect real plan features and pricing. All three files share the same shape — apply identical changes to all three.

---

**Change 1 — Replace `modeContent` with plan-accurate copy**

Replace the entire `modeContent` constant in all three files with the following:

```ts
const modeContent: Record<SignupMode, {
  headline: string;
  planLabel: string;
  planPrice: string;
  benefits: string[];
}> = {
  provider: {
    headline: "Everything you need to grow your practice — completely free.",
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
```

---

**Change 2 — Add `planLabel` and `planPrice` fields to `iconMap`**

Add these two entries to `iconMap` in all three files:

```ts
"Client leads from the Mantra Care network":     <GlobeIcon className="size-5 text-white" />,
"Mantra Premium profile & directory listing":    <Megaphone className="size-5 text-white" />,  // import Megaphone from lucide-react
"Client records & health history":               <Users className="size-5 text-white" />,
"Appointment scheduling & calendar sync":        <CalendarDays className="size-5 text-white" />,
"Billing & payment tracking":                    <CreditCard className="size-5 text-white" />,
"HIPAA-compliant secure messaging":              <ShieldCheck className="size-5 text-white" />,
"AI Transcriber + Session Notes included":       <Mic className="size-5 text-white" />,
"Integrated billing & invoicing":                <CreditCard className="size-5 text-white" />,
"AI Transcriber + Session Notes (SOAP · DAP · BIRP)": <Bot className="size-5 text-white" />,
"Insurance & compliance ready":                  <ClipboardCheck className="size-5 text-white" />,
```

---

**Change 3 — Render a plan badge in the left panel**

Inside the left panel `<div className="flex-1 flex flex-col justify-center px-12 pb-8">`, directly below the `<h1>` headline and before the benefits list, add this plan price callout block:

```tsx
{/* Plan price callout */}
<div
  className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full self-start"
  style={{
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.22)",
  }}
>
  <span
    className="text-white font-bold"
    style={{ fontSize: 11, letterSpacing: "0.06em" }}
  >
    {content.planLabel}
  </span>
  <span
    style={{
      width: 1,
      height: 12,
      background: "rgba(255,255,255,0.3)",
      flexShrink: 0,
    }}
  />
  <span
    className="text-white font-medium"
    style={{ fontSize: 12 }}
  >
    {content.planPrice}
  </span>
</div>
```

Also change the existing `<h1 className="... mb-8">` to `<h1 className="... mb-4">` so the badge visually connects to the headline rather than floating away from it.

---

**Change 4 — Mode switcher label update (GetStarted only)**

In `GetStarted.tsx` only, the mode switcher renders labels. Update the label map so the mode pill labels reflect plan positioning:

```tsx
{mode === "provider" ? "Free Provider" : mode === "full-ehr" ? "Full EHR" : "AI Scribe"}
```

This makes the toggle immediately legible — users see "Free Provider | Full EHR | AI Scribe" rather than "Provider | Full EHR | AI Scribe".

---

**Scope:** Apply Changes 1–3 to all three files. Apply Change 4 to `GetStarted.tsx` only. No other logic, routing, state, or functionality changes — this is a content and presentation update only.