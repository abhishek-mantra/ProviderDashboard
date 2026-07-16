Here's the detailed Figma prompt:

---

**FIGMA PROMPT — MantraEHR Settings > Subscription — Full Redesign Pass**

---

## 1. Overview Tab — Current Plan Card

**Remove entirely from the plan card:**
- "Included credits this cycle" section with progress bar
- "Resets Jun 4" label
- "170 used · 830 remaining of 1,000 monthly credits" line
- "Free Trial" progress section
- "Day 8 of 14" label
- Trial end date text
- AI Transcriber · Session Notes · Prescription · CRM Calling pill row

**Keep only this in the top section of the plan card:**
```
Essential    [Active]  [Free Trial Active]
Monthly · $30/month
Renews on June 1, 2026            [Manage Plan]
```

Plain, clean. No progress bars, no pills, no usage data.

---

**Below the plan name row add a plan details breakdown — styled exactly like the last reference image (Apollo.io subscription breakdown) but simplified.**

Full-width table inside the card. Light `#F9FAFB` background. Rows separated by `#E5E7EB` 1px dividers. Each row: left label in 13px `#6B7280`, right value in 13px `#111827` semibold. No outer border on rows.

**Rows to include:**

Row 1 — **Plan**
- Left: "Plan"
- Right: "EHR Essential · $30/month"

Row 2 — **Credits included**
- Left: "Credits included"
- Right: "30,000 credits / month"
- Below the right value in 11px `#9CA3AF`: "at $0.010/credit (bundle rate)"

Row 3 — **EHR tools**
- Left: "EHR tools"
- Right: "AI Transcriber · Session Notes · Prescription · Appointments · Records"
- Render as comma-separated text in 13px `#111827`

Row 4 — **Cross-platform access**
- Left: "Cross-platform access"
- Right side: two lines stacked
  - Line 1: "AI Reminder Calling (CRM)" in 13px `#111827`
  - Line 2: "Requires 1,000 credits minimum · EHR tools are prioritised below this threshold" in 11px `#9CA3AF`

Row 5 — **Billing**
- Left: "Billing"
- Right: "Monthly · renews June 1, 2026 · cancel anytime"

No seats row. No add-ons row. No tax row.

---

## 2. Overview Tab — Section Order After Plan Card

```
1. Current Plan Card (redesigned above)
2. Available Plans (accordion — unchanged)
3. Credit Alerts (accordion — unchanged, renamed from Usage Alerts)
```

Remove nothing else from Overview. Just reorder so Available Plans comes before Credit Alerts.

---

## 3. Overview Tab — Available Plans Cards

Inside each plan card add one line directly below the price, above the user count:

**Free plan:**
```
Includes 10,000 credits / mo
```

**Essential $30:**
```
Includes 30,000 credits / mo  [at $0.010/credit]
```

**Plus $60:**
```
Includes 60,000 credits / mo  [at $0.010/credit]
```

**Pro $120:**
```
Includes 120,000 credits / mo  [at $0.010/credit]
```

Credits line: 12px `#6B7280`. Bracket text: 11px `#9CA3AF`.

Inside each plan's feature list, add a visual divider line `#E5E7EB` 1px with a micro-label "AI CREDITS INCLUDED" in 10px `#9CA3AF` uppercase letter-spacing-wide, separating platform features above from AI credit features below. No other change to feature list content.

---

## 4. Manage Credit Usage Tab — Remove Org Banner

Delete entirely:
- The Apollo Clinic / EHR Essential Plan / Org Wallet banner card
- "Shared across all staff" badge
- The explanatory paragraph beneath it

The Manage Credit Usage tab now starts directly with the two summary cards.

---

## 5. Manage Credit Usage Tab — Two Summary Cards Redesign

Render as **capsule-style cards** — not standard rectangle cards. Capsule means: border-radius 999px on a wide pill shape, OR a rounded-2xl card with a distinctly pill-like internal layout. Use rounded-2xl (24px border radius) with a tighter padding (16px vertical, 24px horizontal) to achieve the capsule feel.

Place both capsules side by side in a 2-column row, equal width, gap 16px.

---

**Capsule 1 — Org Credits Remaining**

Background: white. Border: `#E5E7EB` 1px. Rounded-2xl.

Internal layout — single row, horizontally distributed:

Left cluster:
- Label: "Org Credits Remaining" 11px `#6B7280` uppercase tracking-wide
- Number: total org credits minus ALL credits used across ALL platforms. E.g. **10,660** in 28px bold `#111827`

Right cluster (separated by a vertical divider `#E5E7EB` 1px):
- Two sub-lines stacked, 12px `#6B7280`:
  - "From EHR Essential plan: 30,000"
  - "Individually purchased: 830"
- One line below in 11px `#14B8A6` with Tag icon size 11px:
  - "Plan rate: $0.010/credit"
- One line below in 11px `#9CA3AF`:
  - "Purchased credits never expire"

No reset date on this card — org remaining credits don't reset, that's the point.

---

**Capsule 2 — Credits Used in EHR**

Background: white. Border: `#E5E7EB` 1px. Rounded-2xl. Same dimensions as Capsule 1.

Internal layout — single row, horizontally distributed:

Left cluster:
- Label: "Credits Used in EHR" 11px `#6B7280` uppercase tracking-wide
- Number: sum of credits used across all EHR tools this cycle. E.g. **170** in 28px bold `#111827`
- Below number: "this cycle" in 11px `#9CA3AF`

Right cluster (separated by vertical divider `#E5E7EB` 1px):
- Thin horizontal bar, full width of right cluster, teal fill `#14B8A6`, track `#E5E7EB`, 4px height
- Below bar: "170 of 30,830 total org credits" in 11px `#6B7280`

No platform minimum warning on this card. Remove it entirely. The 500 credit floor is a backend rule, not a user-facing concern.

---

## 6. Manage Credit Usage Tab — Credit Usage Breakdown Cards

**What each card shows — revised:**

Each tool card now communicates: "of your total EHR usage this cycle, this tool is responsible for X%."

Not "X of Y total" anymore. That was confusing. Now it's contribution percentage.

**Card layout for each tool:**

Top row: icon + tool name + info icon (unchanged)
Tag pill: "EHR Native" (unchanged)

**Primary metric — two numbers side by side:**
- Left: credits used by this tool. E.g. "72" in 24px bold `#111827`
- Right of it: "credits" in 13px `#6B7280`

**Bar — contribution bar, not consumption bar:**
- Label above bar left: "of EHR usage" in 11px `#6B7280`
- Label above bar right: percentage this tool represents of total EHR usage. E.g. if total EHR = 170, AI Transcriber = 72, show "42%" in 12px bold matching tool color
- Bar fill = tool's contribution percentage of total EHR credits used
- Bar color matches tool accent color (teal for AI Transcriber, blue for Session Notes, green for Prescription)
- Track: `#E5E7EB`, height 6px

**Credit rate note:** keep as is (1 credit per 100 words, etc.)

**Credit limit input — revised behavior:**

- Label: "Max credits from org wallet" in 12px `#374151`
- Placeholder: "No limit"
- Helper text below input when value entered: "(= X of 10,830 org credits)"
- Remove ALL minimum warnings. Remove "Platform minimum: 500 credits must remain available at all times" — delete entirely from every card
- The input now represents how much of the total org wallet this tool can consume — not a percentage of EHR credits, but raw org credit cap

**Tool rename:**
- "AI CRM" → rename to **"AI Reminder"** everywhere it appears in the breakdown, history, and filters

**Grid layout:**
- AI Transcriber | Session Notes (row 1)
- Prescription (row 2, left-aligned, half width matching card above it)

---

## 7. Manage Credit Usage Tab — Credit History Table

**Tool name update:** rename "AI CRM" to "AI Reminder" in all history rows and in the filter dropdown.

**Scrollable table — horizontal and vertical within the table container only:**

Wrap the table in a container div with:
- `overflow-x: auto`
- `overflow-y: auto`
- `max-height: 320px` (shows ~6 rows, then scrolls vertically)
- The container has `#E5E7EB` border, rounded-xl — the table scrolls inside it
- No page-level scroll triggered by table content
- Table itself: `min-width: 700px` to force horizontal scroll on narrow screens

The table container behaves like a fixed window. User scrolls left-right to see all columns, scrolls up-down to see more rows. Neither scroll direction propagates to the page.

**Table columns unchanged:** Tool | Platform | Activity | Credits | Date

**Filter dropdowns:** rename "AI CRM" to "AI Reminder" in the All Tools dropdown options.

---

## 8. Manage Credit Usage Tab — Buy More Credits

No change to this section. Keep exactly as implemented.

---

## 9. Visual Consistency — Capsule Cards Only in Summary Row

The capsule style (rounded-2xl, tighter padding, pill feel) applies **only** to the two summary cards at the top of Manage Credit Usage. All other cards (tool breakdown cards, buy more credits, credit history) keep standard rounded-xl styling. This visual distinction signals to the user: the capsules are summary/wallet level, the cards below are detail level.

---

## What Must Not Change

- Left navigation
- Settings parent tab row (Availability, Practice Details, etc.)
- Payments tab
- How it works tab
- All toggle/accordion interaction states
- Dark mode support throughout