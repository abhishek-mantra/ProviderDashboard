Here's the copy-paste prompt:

---

**File:** `SettingsBilling.tsx`
**Scope:** `EHRPlan` interface, `AIScribePlan` interface, `ehrPlans` array, `aiScribePlans` array, `renderEHRCard`, `renderAIScribeCard`

---

### 1. Add fields to `EHRPlan` interface

Insert after `creditBarPct: number;`:

```typescript
annualCreditsPerMonth?: number;
teamLabel: string;
teamSublabel?: string;
```

---

### 2. Add field to `AIScribePlan` interface

Insert after `creditBarPct: number;`:

```typescript
teamLabel: string;
```

---

### 3. Replace entire `ehrPlans` array

Remove existing FREE, BASIC, PRO entries. Replace with:

```typescript
const ehrPlans: EHRPlan[] = [
  {
    name: "BASIC",
    audienceTag: "For independent solo practitioners",
    badge: "50% OFF",
    badgeType: "discount",
    monthlyPrice: 49,
    originalMonthlyPrice: 99,
    annualPrice: 399,
    annualSavings: 189,
    annualOriginal: 588,
    creditsPerMonth: 2000,
    annualCreditsPerMonth: 2500,
    creditsLabel: "Resets monthly",
    creditBarPct: 25,
    teamLabel: "Up to 1 provider",
    featureGroups: [
      {
        label: "PRACTICE MANAGEMENT",
        features: [
          "Client records & health history",
          "Appointment scheduling & calendar sync",
          "Billing & payment tracking",
          "HIPAA-compliant secure messaging",
          "Workspace settings",
          "Analytics & practice insights",
          "Refer & earn rewards",
        ],
        collapsible: false,
        defaultExpanded: true,
      },
      {
        label: "AI TOOLS",
        features: [
          "AI Transcriber",
          "AI Session Notes (SOAP · DAP · BIRP)",
          "AI Prescription generator",
        ],
        sublabel: "All AI tools draw from your monthly credit balance",
        collapsible: false,
        defaultExpanded: true,
      },
      {
        label: "CLAIMS & COMPLIANCE",
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
    badge: "50% OFF",
    badgeType: "discount",
    monthlyPrice: 89,
    originalMonthlyPrice: 179,
    annualPrice: 719,
    annualSavings: 349,
    annualOriginal: 1068,
    creditsPerMonth: 5000,
    annualCreditsPerMonth: 6000,
    creditsLabel: "Resets monthly",
    creditBarPct: 65,
    teamLabel: "Up to 5 providers",
    teamSublabel: "Add providers from $74/clinician",
    featureGroups: [
      {
        label: "EVERYTHING IN BASIC, AND",
        features: [
          "Automated appointment reminders",
          "Calendar sync (Google & Outlook)",
          "Automatic insurance status checks",
          "Insurance claim management & submissions",
          "10 free insurance claims/mo",
          "Group appointments & telehealth",
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
    badge: "50% OFF",
    badgeType: "discount",
    monthlyPrice: 175,
    originalMonthlyPrice: 349,
    annualPrice: 1399,
    annualSavings: 701,
    annualOriginal: 2100,
    creditsPerMonth: 8000,
    annualCreditsPerMonth: 10000,
    creditsLabel: "Resets monthly",
    creditBarPct: 100,
    teamLabel: "Up to 15 providers",
    teamSublabel: "Add providers from $59/clinician",
    featureGroups: [
      {
        label: "EVERYTHING IN GROWTH, AND",
        features: [
          "Premium support phone line",
          "35 free insurance claims/mo",
          "Add additional clinicians",
          "Advanced practice analytics",
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

### 4. Add `teamLabel` to each entry in `aiScribePlans`

```typescript
// BASIC entry — add:
teamLabel: "1 provider",

// PROFESSIONAL entry — add:
teamLabel: "Up to 5 providers",

// CLINIC entry — add:
teamLabel: "Up to 8 providers",
```

---

### 5. Update `renderEHRCard`

**a) Compute display credits** — add this variable at the top of the function body, before the JSX return:

```typescript
const displayCredits =
  billingPeriod === "annual" && plan.annualCreditsPerMonth
    ? plan.annualCreditsPerMonth
    : plan.creditsPerMonth;
```

**b) Credits block** — replace both `plan.creditsPerMonth` references with `displayCredits`:

```tsx
{/* Credits block */}
<div className="mb-4">
  <div className="flex items-center gap-2 mb-1">
    <Zap className="size-3.5 text-[#14B8A6] flex-shrink-0" />
    <span style={{ fontSize: "15px", fontWeight: "bold" }} className="text-[#14B8A6]">
      {displayCredits.toLocaleString()} credits / month
    </span>
  </div>
  <p style={{ fontSize: "11px" }} className="text-[#9CA3AF] mb-1">
    {billingPeriod === "annual"
      ? `${(displayCredits * 12).toLocaleString()} credits for the year · resets monthly`
      : plan.creditsLabel}
  </p>
</div>
<hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />
```

**c) Team block** — insert immediately after the credits `<hr>`, before the feature groups block:

```tsx
{/* Team block */}
<div className="mb-4">
  <div className="flex items-center gap-2 mb-0.5">
    <Users className="size-3.5 text-[#6B7280] flex-shrink-0" />
    <span style={{ fontSize: "13px", fontWeight: "600" }} className="text-[#374151] dark:text-gray-300">
      {plan.teamLabel}
    </span>
  </div>
  {plan.teamSublabel && (
    <p style={{ fontSize: "11px" }} className="text-[#9CA3AF] italic pl-5">
      {plan.teamSublabel}
    </p>
  )}
</div>
<hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />
```

**d) Recommended chip** — update chip text to include star:

```tsx
{plan.isRecommended && (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#043570] text-white text-[10px] font-bold rounded-full whitespace-nowrap">
    ★ Recommended
  </div>
)}
```

---

### 6. Update `renderAIScribeCard`

Insert a team block immediately after the credits `<hr>`, before the features section:

```tsx
{/* Team block */}
<div className="mb-4">
  <div className="flex items-center gap-2">
    <Users className="size-3.5 text-[#6B7280] flex-shrink-0" />
    <span style={{ fontSize: "13px", fontWeight: "600" }} className="text-[#374151] dark:text-gray-300">
      {plan.teamLabel}
    </span>
  </div>
</div>
<hr className="border-[#E5E7EB] dark:border-gray-700 mb-4" />
```

---

**No other changes needed.** The `activePlanName = "BASIC"` / `activePlanMode = "EHR"` check in `renderEHRCard` will continue to correctly override BASIC's CTA to "Current Plan". The `grid-cols-1 md:grid-cols-3` card grid stays unchanged. `Users` is already imported from `lucide-react`.