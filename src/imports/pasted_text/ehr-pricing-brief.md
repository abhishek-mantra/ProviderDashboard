# Available Plans — Redesign Brief
## EHR & AI Scribe Pricing Card Templates

**Roles**: Product Manager · Pricing Strategist · Content Modeler · Product Designer  
**Scope**: `OverviewContent` → `Available Plans` accordion → EHR and AI Scribe plan card grids

---

## 1. The Problem

The current plan cards fail on three fronts:

1. **Overwhelm** — 12+ feature bullets per card with no grouping logic. Users cannot scan; they abandon.
2. **Missing differentiation story** — The FREE plan's unique advantage (being a Mantra network partner) is invisible. It looks like a stripped-down version of BASIC rather than a distinct value proposition for a distinct audience.
3. **Credits are buried** — Credits are the core pricing unit and the key variable between plans, yet they live in a small teal pill below the price. They should be the headline metric.

---

## 2. Redesign Goals

- A user should understand "is this plan for me?" within 3 seconds.
- Price + credit volume should be legible at a glance, without reading a single bullet.
- Feature lists should confirm the decision, not create it. Maximum 6 bullets visible by default; extras behind a "See all features" toggle.
- The two product types (EHR vs AI Scribe) should have distinct card templates because their value propositions are structurally different.

---

## 3. Content Architecture Rules

### Rule 1 — Every card leads with an audience line
A single sentence in subdued text immediately below the plan name. This is not a tagline. It is a filter: it tells the wrong user to skip this card and the right user to lean in.

### Rule 2 — Price block is the visual anchor
Large price → billing cadence → annual savings hook (if applicable). Nothing interrupts this block.

### Rule 3 — Credits are a first-class metric
Credits get their own dedicated row/section with a visual indicator (bar or pill). This is not a feature — it is a resource. Treat it like quota.

### Rule 4 — Features are organized in named groups, not a flat list
Each group has a heading. Groups are sorted by decision weight: the features most likely to trigger upgrade/downgrade come first.

### Rule 5 — The delta between adjacent plans is explicit
Use a "What you gain →" block when a plan unlocks a meaningful new capability tier. Do not repeat all shared features; only surface the additions.

### Rule 6 — CTA label matches plan state
- On the user's active plan: `"Current Plan"` (disabled, teal fill)
- On an upgrade target: `"Upgrade to Pro"` or `"Switch to Basic"` (outlined or outlined-danger)
- On a downgrade target: `"Downgrade"` (outlined, muted)
- On the free plan when it is not the user's plan: `"This plan requires Mantra listing"`

---

## 4. EHR Plan — Content Model

> The three EHR plans serve **two completely different user types**.  
> FREE → Mantra-listed providers (network partners)  
> BASIC + PRO → Independent providers not on the Mantra network  
>
> This is not a simple upgrade ladder. The card layout must reflect this split.

---

### EHR Plan 1 — FREE

```
Audience tag:   "For providers listed on the Mantra Care network"
Badge:          "FREE FOREVER"  (green-tinted)
Price:          $0
Billing note:   "No card required"
```

**Credit block:**
```
10,000 credits / month included
Reset monthly · buy more anytime
```

**Feature Group 1 — "Mantra Network Access"** ← THE unique differentiator; show first
```
✓  Client leads from the Mantra Care network
✓  Mantra Premium profile & directory listing
✓  Tasks, Marketing & Insurance tools
```
*Sub-label: "Available because you're a Mantra partner"*

**Feature Group 2 — "Practice Management"** (collapsed behind "See all 8 features ↓")
```
✓  Client records & health history
✓  Appointment scheduling & calendar sync
✓  Billing & payment tracking
✓  HIPAA-compliant secure messaging
✓  Analytics & practice insights
✓  Clinical tools & treatment planning
✓  Refer & earn rewards
✓  Workspace settings
```

**Feature Group 3 — "AI Tools"** (always visible, it is the credit-usage driver)
```
✓  AI Transcriber
✓  AI Session Notes  (SOAP · DAP · BIRP)
✓  AI Prescription generator
Note: "All AI tools draw from your monthly credit balance"
```

**Not included** (soft, muted — shown as a "what's not here" section):
```
✗  Invoicing & automated billing workflows
✗  Insurance claim submissions
✗  Multi-clinician team access
→  "Need these? See BASIC or PRO"
```

**CTA:**  `"Current Plan"` if active, else `"This plan requires a Mantra listing"`

---

### EHR Plan 2 — BASIC

```
Audience tag:   "For independent solo practitioners"
Badge:          "50% OFF — FIRST 3 MONTHS"  (teal-tinted)
Price:          $30 / month
Strikethrough:  $54
Annual hook:    "or $288/yr — save $72"
```

**Credit block:**
```
30,000 credits / month included
3× more than the Free plan
```

**Feature Group 1 — "Practice Management"** (collapsed behind "See all 8 features ↓")
```
✓  Client records & health history
✓  Appointment scheduling & calendar sync
✓  Billing & payment tracking
✓  HIPAA-compliant secure messaging
✓  Analytics & practice insights
✓  Clinical tools & treatment planning
✓  Refer & earn rewards
✓  Workspace settings
```

**Feature Group 2 — "AI Tools"** (always visible)
```
✓  AI Transcriber
✓  AI Session Notes  (SOAP · DAP · BIRP)
✓  AI Prescription generator
Note: "All AI tools draw from your monthly credit balance"
```

**Not included** (muted "not on this plan"):
```
✗  Invoicing & automated billing workflows
✗  Insurance claim submissions
✗  Multi-clinician team access
→  "Need these? See PRO →"
```

**Also not included** (one-line note, very subdued — do not make this prominent):
```
"Mantra network features not available on independent plans"
```

**CTA:** `"Get Started"` (outlined teal) or `"Upgrade to Basic"` / `"Current Plan"`

---

### EHR Plan 3 — PRO

```
Audience tag:   "For growing practices & multi-clinician teams"
Badge:          "50% OFF — FIRST 3 MONTHS"  (teal-tinted)
Price:          $60 / month
Strikethrough:  $109
Annual hook:    "or $576/yr — save $144"
```

**Credit block:**
```
60,000 credits / month included
6× more than the Free plan · 2× more than Basic
```

**Feature Group 1 — "Everything in Basic, plus:"** ← Delta-first framing
```
✓  Invoicing & automated billing workflows
✓  Insurance claim management & submissions
✓  Multi-clinician team access & role management
✓  Practice branding & multi-directory listings
```
*This group is always visible and is the upgrade trigger.*

**Feature Group 2 — "Practice Management"** (collapsed behind "See all 8 features ↓")
*(same list as BASIC)*

**Feature Group 3 — "AI Tools"** (always visible)
*(same list as BASIC)*

**CTA:** `"Get Started"` (solid teal fill — PRO is the recommended plan for independents)  
Add a subtle "Recommended" label in the card header for non-Mantra users.

---

## 5. AI Scribe Plan — Content Model

> All three AI Scribe plans include the **exact same three features**.  
> The only differentiator is credit volume and effective cost per session.  
> The card template must reflect this: feature lists are identical and minimal;  
> the pricing + credit math is the entire story.

**Three features, stated once, shared across all cards:**
```
✓  AI Transcriber — joins your online sessions via link
✓  AI Session Notes — SOAP, DAP, BIRP formats
✓  AI Prescription generator
```

---

### AI Scribe Plan 1 — BASIC

```
Audience tag:   "For practitioners seeing ~25 patients/month"
Badge:          "50% OFF — FIRST 3 MONTHS"
Price:          $15 / month
Strikethrough:  $30
```

**Credit block:**
```
10,000 credits / month
≈ 25 sessions/month
$0.60 per session
```

**Feature block:** *(same 3 features — see above)*

**CTA:** `"Get Started"` (outlined teal)

---

### AI Scribe Plan 2 — PROFESSIONAL

```
Audience tag:   "For practitioners seeing ~100 patients/month"
Badge:          "MOST POPULAR"  (amber/gold-tinted)
Price:          $35 / month
Strikethrough:  $70
isPopular:      true  (distinct border/shadow)
```

**Credit block:**
```
40,000 credits / month
≈ 100 sessions/month
$0.35 per session  ← highlight this; it's 42% cheaper per session than Basic
```

**"Value unlock" note:**  
`"42% lower cost per session vs Basic"`

**Feature block:** *(same 3 features)*

**CTA:** `"Get Started"` (solid teal — this is the recommended pick)

---

### AI Scribe Plan 3 — CLINIC

```
Audience tag:   "For clinics with multiple providers"
Badge:          "50% OFF — FIRST 3 MONTHS"
Price:          $79 / month
Strikethrough:  $158
```

**Credit block:**
```
120,000 credits / month  (shared pool across all providers)
≈ 300 sessions/month
$0.26 per session  ← highlight; the cheapest rate
```

**"Value unlock" note:**  
`"Shared pool — add providers without adding plans"`

**Feature block:** *(same 3 features + "Shared across all providers" sub-note)*

**CTA:** `"Get Started"` (outlined teal)

---

## 6. Visual Hierarchy Specification

### Card Anatomy (top to bottom, strict order)

```
┌─────────────────────────────────────────────┐
│  [BADGE]                    [e.g. 50% OFF]  │
│                                             │
│  PLAN NAME                  [Audience tag]  │
│  (20px bold)                (12px muted)    │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  $XX           /month                       │
│  (36px bold)   (13px muted)                 │
│  ~~$XX~~ strikethrough if discounted        │
│  "or $XXX/yr · save $XX" if annual toggle   │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  ⚡ XX,000 credits / month  [teal pill]      │
│  ≈ XX sessions · $X.XX/session (AI Scribe)  │
│  [8px progress bar, teal fill]              │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  FEATURE GROUP LABEL (10px, uppercase)      │
│  ✓ Feature one                              │
│  ✓ Feature two                              │
│  ✓ Feature three                            │
│  + [See all X features ↓] (collapsible)     │
│                                             │
│  FEATURE GROUP 2 LABEL                      │
│  ✓ ...                                      │
│                                             │
│  ✗ Not included  (muted, 11px)              │
│  ✗ Not included                             │
│  → "See PRO" link                           │
│                                             │
│  [  CTA BUTTON — full width  ]              │
└─────────────────────────────────────────────┘
```

### Type scale for cards
- Plan name: `text-[20px] font-bold`
- Audience tag: `text-[11px] text-[#9CA3AF]`
- Price numeral: `text-[36px] font-extrabold`
- Price unit: `text-[13px] text-[#9CA3AF]`
- Credit count: `text-[15px] font-bold text-[#14B8A6]`
- Group label: `text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF]`
- Feature text: `text-[12px] text-[#374151]`
- Not-included text: `text-[11px] text-[#D1D5DB]`

### Color semantics for badges
| Badge type | Background | Text |
|---|---|---|
| FREE FOREVER | `#ECFDF5` | `#065F46` |
| 50% OFF | `#CCFBF1` | `#0F766E` |
| MOST POPULAR | `#FEF3C7` | `#92400E` |

### Popular plan card treatment
- Border: `border-[#14B8A6] border-2`
- Box shadow: `shadow-[0_4px_20px_rgba(20,184,166,0.15)]`
- Background: `bg-[#F0FDFA]` (very light teal tint on card)

### Not-included rows
- Use `✗` in `text-[#D1D5DB]` — not a loud red cross, just softly de-emphasized
- End with a small linked nudge: `"Need this? → [Plan name]"` in `text-[#14B8A6] text-[11px]`

---

## 7. Plan Mode Selector UX

The `EHR | AI Scribe` toggle and `Monthly | Annual` toggle should stay exactly as they are structurally. The only copy change: relabel the toggle options more descriptively.

```
EHR  →  "EHR + Practice"
AI Scribe  →  "AI Scribe Only"
```

Add a 1-line explainer below the toggles:

> **EHR + Practice** — Full clinic management with AI tools included.  
> **AI Scribe Only** — Just AI transcription, notes & prescriptions. No EHR.

---

## 8. Annual Toggle Behaviour

When user switches to Annual:
- Show annual price as the main price (e.g., `$288 / year`)
- Strike through monthly total (`~~$360/year~~`)
- Badge changes to `"SAVE $72/YEAR"`
- Credit note stays the same (credits are monthly regardless)

---

## 9. EHR FREE Plan — Special UX Consideration

The FREE plan CTA must not be universally available. Apply this logic:

```
if user is a Mantra-listed provider:
  → CTA: "Current Plan"  (if active) or "Switch to Free"
else:
  → Hide the FREE plan card entirely from the grid,
    OR show it greyed-out with a lock icon and tooltip:
    "This plan is for providers listed on the Mantra Care network"
```

This prevents confusion where independent providers see a free plan they cannot actually access.

---

## 10. Implementation Notes for Developer

1. **Split `plansByMode` data** into two formats:  
   - EHR plans: `{ name, audienceTag, price, creditsPerMonth, featureGroups[], notIncluded[], plusFeatures[], ctaStyle, badge, isPopular }`  
   - AI Scribe plans: `{ name, audienceTag, price, creditsPerMonth, approxSessions, costPerSession, valueLine, badge, isPopular }`

2. **Feature groups** replace the flat `platformFeatures[]` array. Each group is `{ label: string, features: string[], collapsible: boolean, defaultExpanded: boolean }`.

3. **Not-included rows** are a new array `notIncluded[]` — rendered separately from features, always at the bottom, always in muted style with a → nudge link.

4. **`approxSessions`** and **`costPerSession`** are new fields, only used in AI Scribe cards. Pre-compute them in the data layer; do not derive in JSX.

5. The "See all X features ↓" toggle should be per-group, not per-card. Each collapsible group tracks its own open state.

6. Re-export `plansByMode` as a `const` outside the component to keep `OverviewContent` lean.

---

## 11. What This Brief Does NOT Change

- Sub-tab structure (Overview / Payments / Manage Credit Usage / How it works)
- Plan pricing numbers (fill in final agreed prices)
- Credit alert section
- The accordion expand/collapse behaviour of "Available Plans"
- Tailwind color tokens already in use (`#14B8A6`, `#1E3A8A`, `#111827`, etc.)

---

*Brief version: 1.0 — June 2026*