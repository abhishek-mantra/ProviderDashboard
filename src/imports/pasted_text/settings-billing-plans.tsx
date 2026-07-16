Here's the complete prompt:

---

**Prompt: Update SettingsBilling — Plan Mode Bar & Credit KPI Cards**

---

### 1. Available Plans — Add Plan Mode Selector Bar

In the `OverviewContent` component, inside the `Available Plans` accordion, add a plan mode selector **in the same row** as the Monthly/Annual toggle. The row should use `justify-between` so the mode bar sits on the left and the billing period toggle on the right.

**Plan mode bar UI:**
```jsx
// Three pill/tab buttons in a segmented control, same visual style as the billing period toggle
const planModes = ["Mantra Provider", "EHR", "AI Scribe"];
const [planMode, setPlanMode] = useState<"Mantra Provider" | "EHR" | "AI Scribe">("EHR"); 
// default read from localStorage key "signup_mode":
// "provider" → "Mantra Provider", "full-ehr" → "EHR", "ai-scribe" → "AI Scribe"
// If no value stored, default to "EHR"
```

On mount, read `localStorage.getItem("signup_mode")` and map it:
- `"provider"` → `"Mantra Provider"`
- `"full-ehr"` → `"EHR"`  
- `"ai-scribe"` → `"AI Scribe"`

The row layout:
```
[Mantra Provider | EHR | AI Scribe]        [Monthly | Annual]
```

---

### 2. Three Plan Sets — One Per Mode

Replace the single `plans` array with a `plansByMode` object. When `planMode` changes, swap the displayed cards:

```js
const plansByMode = {
  "Mantra Provider": [
    {
      name: "STARTER",
      price: "$0/mo", originalPrice: null,
      subtitle: "For independent providers just getting started",
      users: "1 provider",
      badge: "FREE FOREVER",
      cta: "Current Plan", ctaStyle: "current",
      includesCredits: false,
      platformFeatures: [
        "Provider profile on Mantra network",
        "Accept clients from 40+ countries",
        "Up to 10 active clients",
        "Basic appointment scheduling",
        "Secure messaging",
        "Community support"
      ],
      creditFeatures: []
    },
    {
      name: "GROWTH",
      price: "$19/mo", originalPrice: "$38",
      subtitle: "For growing practices that need more reach",
      users: "Up to 5 providers",
      badge: "50% OFF FOR 3 MONTHS",
      cta: "Get Started", ctaStyle: "outlined",
      isPopular: true,
      includesCredits: true, creditsPerMonth: "15,000",
      platformFeatures: [
        "Everything in Starter, plus:",
        "Unlimited active clients",
        "Calendar sync (Google & Outlook)",
        "Client portal access",
        "Analytics dashboard",
        "Priority support"
      ],
      creditFeatures: ["AI Scribe", "Session Notes"]
    },
    {
      name: "SCALE",
      price: "$49/mo", originalPrice: "$98",
      subtitle: "For established providers scaling their network",
      users: "Unlimited providers",
      badge: "50% OFF FOR 3 MONTHS",
      cta: "Get Started", ctaStyle: "outlined",
      includesCredits: true, creditsPerMonth: "40,000",
      platformFeatures: [
        "Everything in Growth, plus:",
        "Multi-location support",
        "White-label client portal",
        "Advanced analytics & reporting",
        "Dedicated account manager",
        "Custom integrations"
      ],
      creditFeatures: ["AI Scribe", "Session Notes", "AI Reminder Calling"]
    }
  ],

  "EHR": [
    // existing ESSENTIAL, PLUS, PRO plans — keep exactly as-is
  ],

  "AI Scribe": [
    {
      name: "BASIC",
      price: "$15/mo", originalPrice: "$30",
      subtitle: "AI transcription for solo practitioners",
      users: "1 provider",
      badge: "50% OFF FOR 3 MONTHS",
      cta: "Get Started", ctaStyle: "outlined",
      includesCredits: true, creditsPerMonth: "10,000",
      platformFeatures: [
        "Up to 20 transcriptions/mo",
        "SOAP / DAP note generation",
        "Session recording & playback",
        "Basic export (PDF, DOCX)",
        "Email support"
      ],
      creditFeatures: ["AI Scribe", "Session Notes"]
    },
    {
      name: "PROFESSIONAL",
      price: "$35/mo", originalPrice: "$70",
      subtitle: "For active clinicians who transcribe daily",
      users: "Up to 3 providers",
      badge: "50% OFF FOR 3 MONTHS",
      cta: "Get Started", ctaStyle: "outlined",
      isPopular: true,
      includesCredits: true, creditsPerMonth: "40,000",
      platformFeatures: [
        "Everything in Basic, plus:",
        "Unlimited transcriptions",
        "BIRP & custom templates",
        "One-click prescription generation",
        "Calendar & EHR integrations",
        "Priority support"
      ],
      creditFeatures: ["AI Scribe", "Session Notes", "Prescriptions"]
    },
    {
      name: "CLINIC",
      price: "$79/mo", originalPrice: "$158",
      subtitle: "Multi-provider AI scribe for clinics",
      users: "Unlimited providers",
      badge: "50% OFF FOR 3 MONTHS",
      cta: "Get Started", ctaStyle: "outlined",
      includesCredits: true, creditsPerMonth: "120,000",
      platformFeatures: [
        "Everything in Professional, plus:",
        "Multi-provider transcription dashboard",
        "Shared template library",
        "Admin controls & usage reports",
        "Dedicated account manager",
        "Custom AI note templates"
      ],
      creditFeatures: ["AI Scribe", "Session Notes", "Prescriptions", "AI Reminder Calling"]
    }
  ]
}
```

Render `plansByMode[planMode]` as the plan cards. All other card rendering logic (badges, features, CTA styles, popular border) stays identical.

---

### 3. Manage Credit Usage — Replace 2-Card KPI Row with 3 KPI Cards

In `ManageCreditUsageContent`, remove the entire existing two-card summary grid:
```
// DELETE this entire block:
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Card 1 — Org Credits */}
  ...
  {/* Card 2 — EHR Usage */}
  ...
</div>
```

Replace it with a **3-card KPI row** (`grid-cols-1 md:grid-cols-3`):

```jsx
// KPI data
const freeCreditsTotal = 30000;
const freeCreditsUsed = 20000;
const freeCreditsRemaining = freeCreditsTotal - freeCreditsUsed;
const freePercent = ((freeCreditsUsed / freeCreditsTotal) * 100).toFixed(0);

const purchasedCredits = 5000; // credits bought separately
const purchasedUsed = 1200;
const purchasedRemaining = purchasedCredits - purchasedUsed;

const totalCredits = freeCreditsTotal + purchasedCredits;
const totalUsed = freeCreditsUsed + purchasedUsed;
const totalRemaining = totalCredits - totalUsed;
const totalPercent = ((totalUsed / totalCredits) * 100).toFixed(0);
```

**Card 1 — Free Credits:**
```
Label (top, small uppercase gray): FREE CREDITS
Big number: {freeCreditsRemaining.toLocaleString()}  (bold, dark)
Sub-label below number: "remaining"
Progress bar (full width, teal fill, gray track, 8px height, rounded):
  filled = freeCreditsUsed / freeCreditsTotal * 100%
Footer text: "{freeCreditsUsed.toLocaleString()} of {freeCreditsTotal.toLocaleString()} used"
```

**Card 2 — Purchased Credits:**
```
Label: PURCHASED CREDITS
Big number: {purchasedRemaining.toLocaleString()}
Sub-label: "remaining"
Progress bar: purchasedUsed / purchasedCredits
Footer text: "{purchasedUsed.toLocaleString()} of {purchasedCredits.toLocaleString()} used"
Accent color for bar: #6366F1 (indigo)
```

**Card 3 — Total Credits:**
```
Label: TOTAL CREDITS
Big number: {totalRemaining.toLocaleString()}
Sub-label: "remaining"
Progress bar: totalUsed / totalCredits
Footer text: "{totalUsed.toLocaleString()} of {totalCredits.toLocaleString()} used"
Accent color for bar: #F59E0B (amber)
— Also show "{totalPercent}% used" as a small badge (bg amber-50, text amber-700) top-right of card
```

Each card: `bg-white dark:bg-gray-800 border border-[#E5E7EB] rounded-xl p-5`, same height, clean minimal layout — no vertical dividers inside, just the stacked label → number → bar → footer pattern.