Here's the detailed Figma prompt:

---

**FIGMA PROMPT — MantraEHR Settings > Subscription Screen Redesign**

---

## 1. Top Tab Bar — Match Width to Parent Tabs

The sub-tab row containing **Overview | Payments | Manage Credit Usage** currently renders as a compact pill group. Change it to match the full-width style of the parent tab row (Availability | Practice Details | Team/Providers | Notifications | Subscription).

- Remove the pill/capsule container background
- Make each tab a flat text button with a bottom border indicator on active state (2px solid `#043570`)
- Tabs are full width, evenly distributed, same height as parent tab row
- Active tab: `#043570` bottom border, `#111827` text, 14px semibold
- Inactive tab: `#6B7280` text, no border, hover state `#111827`
- Add **How it works** as a fourth tab directly in this row — **Overview | Payments | Manage Credit Usage | How it works**
- Remove the nested Overview/How it works tab bar that currently sits inside Manage Credit Usage — it no longer exists as a sub-tab. How it works content moves to the top-level tab.

---

## 2. Manage Credit Usage — Three Summary Cards (Replace Existing)

Remove the current three cards (Free Credits, Purchased Credits, Total Credits Available). Replace with exactly **two cards** side by side, full width split 50/50.

**Card 1 — Total Org Credits**
- Label: "Total Org Credits" in 12px `#6B7280`
- Primary number: sum of plan credits + individually purchased credits, e.g. **10,830** in 32px bold `#111827`
- Below number: two sub-lines stacked
  - "From EHR Essential plan: 10,000" in 12px `#6B7280`
  - "Individually purchased: 830" in 12px `#6B7280`
- Bottom line: "Resets on Jun 4, 2026 · purchased credits never expire" in 11px `#9CA3AF`
- No button on this card

**Card 2 — Credits Used in EHR**
- Label: "Used in EHR this cycle" in 12px `#6B7280`
- Primary number: e.g. **170** in 32px bold `#111827`
- Progress bar below: teal `#14B8A6` fill, `#E5E7EB` track, 6px height, full width
- Below bar: "170 of 10,830 credits used · 10,660 remaining" in 11px `#6B7280`
- Below that: a thin reserved credits note: "500 credits reserved as platform minimum · not spendable" in 11px `#F59E0B` amber text with a small `AlertTriangle` lucide icon size 11px

Both cards: white background, `#E5E7EB` border 1px, rounded-xl, padding 20px, same height forced by flex alignment.

---

## 3. Org Wallet Identity Banner — Keep, Minor Update

Keep the Apollo Clinic / EHR Essential Plan / Org Wallet banner exactly as implemented. Change one thing: move it to sit **above** the two summary cards, not below the tab bar. Ensure it reads:

"Credits in this wallet are shared across your entire organization. Usage by any team member deducts from the same balance. Purchased credits roll over forever — they never expire."

---

## 4. Credit Usage Breakdown — Redesigned Cards

Keep the accordion trigger row. When expanded, render the tool cards in a **2-column grid**. Apply the following to every card to make them visually compressed, symmetrical, and aligned:

**Universal card spec:**
- White background, `#E5E7EB` 1px border, rounded-xl, padding 16px
- Fixed minimum height so all cards in a row are equal height (use align-stretch)
- Internal layout top to bottom: icon + title row → tag pill → usage number + "of X total" → progress bar + % → credit rate note (if applicable) → divider → credit limit input row
- No wasted space between elements — spacing between each element is exactly 8px
- Progress bar: 6px height, rounded-full, full width
- Percentage label sits to the right of the bar inline, 12px `#6B7280`

**AI Transcriber card:**
- Icon: Zap teal, tag: "EHR Native" `#CCFBF1` bg `#0F766E` text
- Usage: 72 of 100 total, bar at 72% teal
- Credit rate note: "1 credit per 100 words" in 11px `#6B7280`
- Credit limit input: minimum enforced at 500 credits (platform minimum). Input placeholder shows "Min. 500 credits required". Below input: "Platform minimum: 500 credits must remain available at all times" in 11px `#F59E0B` with AlertTriangle icon

**AI CRM card:**
- Icon: TrendingUp purple, tags: "CRM Platform" `#EDE9FE`/`#6D28D9` + "Cross-licensed" `#FEF3C7`/`#92400E`
- Italic subtitle: "Included in EHR Essential · powered by MantraCRM"
- Usage: 0 of 50 total, bar at 0% purple
- Amber info box inside card: "Upgrade to CRM plan to unlock full CRM features. Credits merge into one org wallet."
- Credit limit input: no minimum enforcement note (cross-licensed feature, no platform minimum)

**Session Notes card:**
- Icon: FileText blue, tag: "EHR Native" `#DBEAFE`/`#1E40AF`
- Usage: 45 of 80 total, bar at 56% blue
- Credit rate note: "Without AI: 1 credit · With AI: 2 credits" in 11px `#6B7280`
- Credit limit input: standard, no minimum

**Prescription card:**
- Icon: Pill green, tag: "EHR Native" `#DCFCE7`/`#15803D`
- Usage: 18 of 40 total, bar at 45% green
- Credit rate note: "Without AI: 1 credit · With AI: 2 credits" in 11px `#6B7280`
- Credit limit input: standard, no minimum

**Remove entirely:**
- The Reminder Calling locked/upsell card — delete it completely

---

## 5. Credit History Table — New Section Below Breakdown Cards

Add a new full-width section below the Credit Usage Breakdown accordion. White background card, `#E5E7EB` border, rounded-xl, padding 20px.

**Header row of this section:**
- Left: "Credit History" in 16px semibold `#111827`
- Right: a dropdown filter selector. Default label: "All Tools". Options in dropdown: All Tools | AI Transcriber | AI CRM | Session Notes | Prescription. When a tool is selected, the dropdown label changes to that tool name and the table rows filter to show only that tool's history.

**Table structure — 4 columns:**
- Tool (with colored icon matching the tool card)
- Activity description
- Credits used (shown as negative, e.g. "−10" in `#DC2626` red)
- Date (most recent at top, format: "Jun 1, 2026 · 9:14 AM")

**Sample rows (most recent first):**
- AI Transcriber · Session transcription completed · −10 · Jun 1, 2026 · 9:14 AM
- Session Notes · AI-assisted note generated · −2 · May 31, 2026 · 4:45 PM
- Prescription · Manual prescription created · −1 · May 31, 2026 · 2:30 PM
- AI Transcriber · Session transcription completed · −10 · May 30, 2026 · 11:00 AM
- AI CRM · Reminder sent · −5 · May 29, 2026 · 3:00 PM
- Session Notes · Manual note created · −1 · May 28, 2026 · 10:20 AM

Table rows: alternating `#F9FAFB` and white background. Row height 44px. Column headers in 12px semibold `#6B7280`. Cell text 13px `#111827`. Bottom border between rows `#E5E7EB` 1px. No outer border on rows.

---

## 6. Buy More Credits — Redesigned Section Below History Table

Keep as an accordion. Title: "Buy More Credits" with a `ShoppingCart` lucide icon in `#14B8A6`.

**Pricing callout banner inside the accordion (above slider):**
Full-width banner, background `#FEF3C7`, border `#FDE68A`, rounded-lg, padding 12px 16px.

Left: `Info` lucide icon `#92400E` size 16px
Right of icon: two lines:
- Line 1: "Credits bought here are priced higher than bundle credits." 13px `#92400E` semibold
- Line 2: "Buy a plan bundle to get credits at a discounted rate." 12px `#92400E`
Button at far right of banner: "View Plans →" 12px `#92400E` underline style, no background.

**Slider section — keep existing slider mechanism. Update labels:**
- Above slider left: "Additional credits (standalone rate)"
- Above slider right: price label that shows elevated pricing vs bundle

**Pricing shown must reflect the premium:**
- Bundle rate (shown as reference): "$0.010 per credit"  
- Standalone rate (what they're buying here): "$0.012 per credit"
- Show both rates side by side in small 11px text below the slider: "Bundle rate: $0.010/credit · Standalone rate: $0.012/credit (20% premium)"

**Three-column summary box below slider — keep existing structure, update labels:**
- Col 1: "Plan credits" / "240K / yr" in `#043570`
- Col 2: "Buying now" / "{slider}K" in `#14B8A6`
- Col 3: "New total" / "{sum}K" in `#111827`

**Buy button: keep as is.**

---

## 7. Remove Entirely

Delete the following section and all its content:

**"Adding another platform? See how your wallet grows when you add CRM or RCM"**

Remove the accordion, the green breakdown card inside it, and the "Explore CRM Plans →" button. This entire section is gone.

---

## 8. Visual Consistency Rules Across All Changes

- Every card uses exactly the same border radius (rounded-xl = 12px), same border color `#E5E7EB`, same padding 16px or 20px (tool cards 16px, section cards 20px)
- All tag pills: 10px bold text, 4px vertical padding, 8px horizontal padding, rounded-full
- All progress bars: 6px height, rounded-full
- All section header text: 16px semibold `#111827`
- All secondary/helper text: 11–12px `#6B7280` or `#9CA3AF`
- Lucide icons used consistently: same size (16px in cards, 14px inline)
- Grid gap between tool cards: 16px
- Gap between full-width sections: 24px
- The platform minimum amber warning (`#F59E0B`) appears only on AI Transcriber credit limit input — it is the only EHR-native feature with a platform floor

---

## What Must Not Change

- Left navigation — untouched
- Settings page header and parent tab row (Availability, Practice Details, etc.) — untouched
- Overview tab content — untouched
- Payments tab content — untouched
- How it works content (video placeholder + FAQ) — moves to top-level tab, content unchanged