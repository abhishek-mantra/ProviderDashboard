Here's the complete developer prompt:

---

**Prompt: Update `aiScribePlans` and `ehrPlans` data + fix card display copy in `SettingsBilling.tsx`**

Make only the changes listed below. Do not touch any layout, className, rendering logic, or feature lists.

---

### 1. Replace the full `aiScribePlans` array

```ts
const aiScribePlans: AIScribePlan[] = [
  {
    name: "BASIC",
    audienceTag: "For solo practitioners doing up to 20 sessions/month",
    badge: "STARTER",
    badgeType: "free",
    monthlyPrice: 29,
    originalMonthlyPrice: null,
    annualPrice: 278,
    annualSavings: 70,
    annualOriginal: 348,
    creditsPerMonth: 300,
    approxSessions: 20,
    costPerSession: 1.45,
    valueLine: null,
    cta: "Get Started",
    ctaStyle: "outlined",
    creditBarPct: 8,
    teamLabel: "1 provider",
  },
  {
    name: "PROFESSIONAL",
    audienceTag: "For full-time practitioners doing up to 40 sessions/month",
    badge: "MOST POPULAR",
    badgeType: "popular",
    monthlyPrice: 49,
    originalMonthlyPrice: null,
    annualPrice: 470,
    annualSavings: 118,
    annualOriginal: 588,
    creditsPerMonth: 500,
    approxSessions: 38,
    costPerSession: 1.29,
    valueLine: null,
    cta: "Get Started",
    ctaStyle: "solid",
    isPopular: true,
    creditBarPct: 33,
    teamLabel: "Up to 3 providers",
  },
  {
    name: "CLINIC",
    audienceTag: "For small clinics sharing up to 75 sessions/month",
    badge: "FOR TEAMS",
    badgeType: "free",
    monthlyPrice: 99,
    originalMonthlyPrice: null,
    annualPrice: 950,
    annualSavings: 238,
    annualOriginal: 1188,
    creditsPerMonth: 1000,
    approxSessions: 75,
    costPerSession: 1.32,
    valueLine: null,
    cta: "Get Started",
    ctaStyle: "outlined",
    creditBarPct: 100,
    teamLabel: "Up to 8 providers",
  },
];
```

---

### 2. Replace the full `ehrPlans` array

```ts
const ehrPlans: EHRPlan[] = [
  {
    name: "BASIC",
    audienceTag: "For independent solo practitioners",
    badge: "BASIC",
    badgeType: "free",
    monthlyPrice: 49,
    originalMonthlyPrice: null,
    annualPrice: 470,
    annualSavings: 118,
    annualOriginal: 588,
    creditsPerMonth: 1000,
    annualCreditsPerMonth: 1000,
    creditsLabel: "Resets monthly",
    creditBarPct: 25,
    teamLabel: "Up to 1 provider",
    featureGroups: [
      {
        label: "OUR CORE FEATURES, AND",
        features: [],
        collapsible: false,
        defaultExpanded: true,
      },
      {
        label: "",
        features: [
          "AI Transcriber",
          "AI Session Notes",
          "AI Prescription generator",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
      {
        label: "",
        features: [
          "Credentialing & Enrollment Access",
          "5 free insurance claims/mo",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
    ],
    notIncluded: [],
    cta: "Get Started",
    ctaStyle: "solid",
  },
  {
    name: "GROWTH",
    audienceTag: "For growing practices & small teams",
    badge: "GROWTH",
    badgeType: "free",
    monthlyPrice: 79,
    originalMonthlyPrice: null,
    annualPrice: 758,
    annualSavings: 190,
    annualOriginal: 948,
    creditsPerMonth: 3000,
    annualCreditsPerMonth: 3000,
    creditsLabel: "Resets monthly",
    creditBarPct: 65,
    teamLabel: "Up to 5 providers",
    teamSublabel: "Add providers from $19/clinician",
    featureGroups: [
      {
        label: "EVERYTHING IN BASIC, AND",
        features: [
          "Automated appointment reminders",
          "Calendar sync (Google & Outlook)",
          "Automatic insurance status checks",
          "10 free insurance claims/mo",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
    ],
    notIncluded: [],
    cta: "Get Started",
    ctaStyle: "solid",
    isRecommended: true,
  },
  {
    name: "SCALER",
    audienceTag: "For large clinics & multi-location practices",
    badge: "SCALER",
    badgeType: "free",
    monthlyPrice: 99,
    originalMonthlyPrice: null,
    annualPrice: 950,
    annualSavings: 238,
    annualOriginal: 1188,
    creditsPerMonth: 5000,
    annualCreditsPerMonth: 5000,
    creditsLabel: "Resets monthly",
    creditBarPct: 100,
    teamLabel: "Up to 15 providers",
    teamSublabel: "Add providers from $15/clinician",
    featureGroups: [
      {
        label: "EVERYTHING IN GROWTH, AND",
        features: [
          "Premium support phone line",
          "Insurance claim management & submissions",
          "Group appointments & telehealth",
          "35 free insurance claims/mo",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
    ],
    notIncluded: [],
    cta: "Get Started",
    ctaStyle: "outlined",
  },
];
```

---

### 3. Fix the strikethrough bug in `renderAIScribeCard`

Find this block inside `renderAIScribeCard`:

```tsx
const strikePrice = (billingPeriod === "annual" && plan.annualOriginal)
  ? `$${plan.annualOriginal}/yr`
  : `$${plan.originalMonthlyPrice}`;
```

Replace with:

```tsx
const strikePrice = (billingPeriod === "annual" && plan.annualOriginal)
  ? `$${plan.annualOriginal}/yr`
  : null;
```

Then find the strike price JSX line inside `renderAIScribeCard`:

```tsx
<span style={{ fontSize: "13px" }} className="text-[#9CA3AF] line-through">{strikePrice}</span>
```

Replace with:

```tsx
{strikePrice && (
  <span style={{ fontSize: "13px" }} className="text-[#9CA3AF] line-through">{strikePrice}</span>
)}
```

This removes the `$null` text currently showing on all three AI Scribe cards in monthly view.

---

### 4. Do NOT change

- Any feature list strings inside `featureGroups` or `sharedScribeFeatures`
- Any className, layout, or rendering logic
- `HowItWorksContent`, `PaymentsContent`, or `ManageCreditUsageContent`
- The FAQ answer text (note: FAQ answer for "How are credits counted" currently says "2 credits" for session notes — leave that as-is, it will be updated separately)
- The toggle label `"EHR + AI Scribe"` — it is already correct in the current code