# Plan Cards — Fix & Polish Prompt
Apply every change below exactly. No new features, no rewriting unrelated code.

---

## 1. EHR Data Layer — `ehrPlans[]`

### 1a. FREE plan
- Remove: `ctaStyle: "locked"` → change to `ctaStyle: "outlined"`
- Remove: `cta: "Current Plan"` → change to `cta: "Get Started"`
- Remove: the entire `notIncluded` array → set to `[]`
- Remove: any `mantraNote` field or set to `undefined`
- Set ALL featureGroups to `collapsible: false`, `defaultExpanded: true`
- Feature group ORDER must be:
  1. "MANTRA NETWORK ACCESS" (first, always)
  2. "PRACTICE MANAGEMENT"
  3. "AI TOOLS"

### 1b. BASIC plan
- Remove: the entire `notIncluded` array → set to `[]`
- Remove: `mantraNote`
- Set ALL featureGroups to `collapsible: false`, `defaultExpanded: true`
- Feature group ORDER:
  1. "PRACTICE MANAGEMENT"
  2. "AI TOOLS"

### 1c. PRO plan
- Remove: the entire `notIncluded` array → set to `[]`
- Set ALL featureGroups to `collapsible: false`, `defaultExpanded: true`
- Feature group ORDER — MOVE the "Everything in Basic, plus:" group to LAST position:
  1. "PRACTICE MANAGEMENT"
  2. "AI TOOLS"
  3. "WHAT'S EXTRA IN PRO" (rename from "Everything in Basic, plus:" — this section stays but moves to bottom)

---

## 2. AI Scribe Data Layer — `aiScribePlans[]`

### 2a. Credit amounts — replace all three:
```
BASIC:        creditsPerMonth: 1000
PROFESSIONAL: creditsPerMonth: 4000
CLINIC:       creditsPerMonth: 8000
```

### 2b. Remove from all three AI Scribe plan objects:
- `approxSessions` field (delete)
- `costPerSession` field (delete)
- `valueLine` field (delete or set to `null`)
- `creditBarPct` field (delete or leave — bar will be removed in render anyway)

---

## 3. EHR Card Render — `renderEHRCard()`

### 3a. Remove the lock icon block entirely:
Delete this entire JSX block:
```jsx
{isLocked && (
  <div className="group relative">
    <span className="text-[#9CA3AF] cursor-help select-none">🔒</span>
    ...tooltip...
  </div>
)}
```

### 3b. Remove the `isLocked` opacity and logic:
- Delete `const isLocked = ...` line
- Remove `isLocked ? "opacity-60" : ""` from card className
- The FREE card should render normally, no greying, no lock

### 3c. Remove the credit progress bar:
Delete this block from the credits section:
```jsx
<div className="w-full rounded-full" style={{ background: "#E5E7EB", height: "8px" }}>
  <div className="rounded-full h-full" style={{ background: "#14B8A6", width: `${plan.creditBarPct}%` }} />
</div>
```

### 3d. Remove the annual price hook line:
Delete this block entirely:
```jsx
{annualHook && (
  <p style={{ fontSize: "12px" }} className="text-[#14B8A6] mt-1">{annualHook}</p>
)}
```
Also delete `let annualHook: string | null = null` and the logic that sets it.

### 3e. Remove the entire "Not included" section:
Delete this whole JSX block from the feature groups render:
```jsx
{/* Not included */}
{plan.notIncluded.length > 0 && (
  <div>
    <ul ...>
      {plan.notIncluded.map(...)}
    </ul>
    {plan.notIncluded[0]?.nudge && (
      <p ...>Need these? → See {plan.notIncluded[0].nudge}</p>
    )}
  </div>
)}
```

### 3f. Remove the `mantraNote` line:
Delete:
```jsx
{plan.mantraNote && (
  <p style={{ fontSize: "11px" }} className="text-[#D1D5DB]">{plan.mantraNote}</p>
)}
```

### 3g. Remove all collapsible toggle logic:
- Delete `toggleGroup`, `isGroupOpen`, and `groupOpenState` state
- In the feature group render, remove the collapsible button entirely:
```jsx
// DELETE THIS BLOCK:
{group.collapsible && (
  <button onClick={...}>
    {open ? "Hide ↑" : `See all ${group.features.length} features ↓`}
  </button>
)}
```
- Remove the `{(!group.collapsible || open) && (` conditional wrapper — just always render the `<ul>`
- Remove the `{group.collapsible && !open && <p>X features included</p>}` fallback line

### 3h. FREE card CTA fix:
The FREE plan CTA logic should ONLY check `isActive`:
```jsx
// Simplified CTA logic for FREE card:
let ctaText = isActive ? "Current Plan" : plan.cta;
let ctaStyle: CtaStyle = isActive ? "current" : plan.ctaStyle;
// Remove all isLocked / isMantraListed branching
```

---

## 4. AI Scribe Card Render — `renderAIScribeCard()`

### 4a. Remove the credit progress bar:
Delete:
```jsx
<div className="w-full rounded-full" style={{ background: "#E5E7EB", height: "8px" }}>
  <div className="rounded-full h-full" style={{ background: "#14B8A6", width: `${plan.creditBarPct}%` }} />
</div>
```

### 4b. Remove the session math row:
Delete this entire row:
```jsx
<div className="flex items-center gap-3 mb-2">
  <span ...>≈ {plan.approxSessions} sessions/month</span>
  <span ...>${plan.costPerSession.toFixed(2)}/session</span>
</div>
```

### 4c. Remove the valueLine:
Delete:
```jsx
{plan.valueLine && (
  <p style={{ fontSize: "11px", fontWeight: "600" }} className="text-[#14B8A6] mt-2">{plan.valueLine}</p>
)}
```

### 4d. Simplify the credits block — after removing bar and session math, it should read:
```jsx
<div className="mb-4">
  <div className="flex items-center gap-2 mb-1">
    <Zap className="size-3.5 text-[#14B8A6] flex-shrink-0" />
    <span style={{ fontSize: "15px", fontWeight: "bold" }} className="text-[#14B8A6]">
      {plan.creditsPerMonth.toLocaleString()} credits / month
    </span>
  </div>
</div>
```
Nothing else in that block.

---

## 5. Typography & Spacing Polish

### 5a. Feature list items — increase line height and text size slightly:
Change `text-[12px]` on feature `<span>` to `text-[13px]` for all feature text in both card types.

### 5b. Feature group label — add more top breathing room:
Add `mt-2` to each group label's container `<div>` (the one wrapping the label + toggle button row).

### 5c. Credits label — update `creditsLabel` values in the EHR data for cleaner copy:
```
FREE:   creditsLabel: "Resets monthly"
BASIC:  creditsLabel: "Resets monthly"
PRO:    creditsLabel: "Resets monthly"
```
Remove the comparison copy ("3× more than the Free plan") — it's clutter without the bar.

### 5d. Section dividers between groups — increase spacing:
Change `space-y-4` on the feature groups container to `space-y-5`.

### 5e. Card bottom padding — give the CTA button more room:
Change `mb-5` on the `flex-1` feature container to `mb-6`.

---

## 6. What NOT to change
- Sub-tab structure (Overview / Payments / Manage Credit Usage / How it works)
- Current Plan summary card at the top of Overview
- Credit Alerts section
- `billingPeriod` toggle still works — it just won't show the annual hook line in the card anymore
- `planMode` toggle stays exactly as-is
- All of `PaymentsContent`, `ManageCreditUsageContent`, `HowItWorksContent` — untouched
- All color tokens, border styles, badge logic — untouched

---

## Summary Checklist

EHR cards:
- [ ] Lock icon removed from FREE
- [ ] FREE CTA renders as "Get Started" (outlined), not locked/greyed
- [ ] Credit bar removed (all 3 EHR cards)
- [ ] Annual hook line removed (all 3 EHR cards)
- [ ] ✗ not-included rows removed (all 3 EHR cards)
- [ ] "Need these?" nudge removed
- [ ] "Mantra network features not available" note removed
- [ ] No collapsible dropdowns — all features always visible
- [ ] Feature order: FREE = Network → Practice → AI; BASIC = Practice → AI; PRO = Practice → AI → Extras

AI Scribe cards:
- [ ] Credit bar removed
- [ ] Session math row removed (≈ X sessions, $X.XX/session)
- [ ] valueLine removed
- [ ] Credits updated to 1,000 / 4,000 / 8,000

Typography:
- [ ] Feature text at 13px
- [ ] Group spacing increased
- [ ] `creditsLabel` simplified to "Resets monthly"

---

*Fix version: 1.0 — June 2026*