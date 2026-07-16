Here's a detailed Figma implementation prompt:

---

**FIGMA PROMPT — Manage Credit Usage Screen Redesign**
**MantraEHR · Settings → Subscription → Manage Credit Usage**

---

## Context & Goal

Redesign the existing "Manage Credit Usage" screen inside MantraEHR's Settings > Subscription section. The current screen shows credits but lacks organizational context — users don't know credits are org-level, don't understand why CRM features appear inside EHR, and can't see how their plan connects to their credit balance. This redesign fixes all three gaps without changing the overall layout language.

Use the existing design system already visible in the screens: navy `#043570` primary, teal `#14B8A6` accent, clean white cards with `#E5E7EB` borders, `#111827` headings, `#6B7280` secondary text, `rounded-xl` cards, 14px Inter/system font body.

---

## Screen Structure

The screen has two tabs at the top — **Overview** and **How it works**. Redesign the **Overview tab only**. How it works tab stays unchanged.

---

## Section 1 — Org Wallet Identity Banner

**Add this as the very first element on the Overview tab, above the three credit cards.**

A full-width banner card. Light navy background `#EFF4FF`. Border `#C7D7F9`. Rounded-xl. Padding 16px horizontal, 14px vertical.

Left side — two lines of text stacked:
- Line 1: org name in bold `#111827` 14px — "Apollo Clinic" with a small building icon (lucide `Building2`) in `#043570` to the left
- Line 2: plan name in regular `#6B7280` 13px — "EHR Essential Plan · Org Wallet"

Right side — a subtle badge:
- Pill shape, background `#DBEAFE`, text `#1E40AF`, 11px font, text says "Shared across all staff"
- Next to it a small `Users` lucide icon in `#1E40AF` size 12px

Beneath the two text lines, add a single line in 12px `#6B7280`:
"Credits in this wallet are shared across your entire organization. Usage by any team member deducts from the same balance."

---

## Section 2 — Three Credit Cards (modified)

Keep the existing three-card row — Free Credits, Purchased Credits, Total Credits Available. Modify as follows:

**Free Credits card:**
- Keep "830" as the number
- Below the reset date line, add a new line in 11px `#6B7280`: "Included with EHR Essential plan"
- Add a small progress bar under that line showing monthly consumption. Label above bar: "This billing cycle" on left, "170 used of 1,000" on right in 11px. Bar fill teal `#14B8A6`, track `#E5E7EB`, height 4px, full width.

**Purchased Credits card:**
- Keep "0" and "Never expires"
- Below "Never expires" add a 11px `#6B7280` line: "Roll over month to month · never lost"

**Total Credits Available card:**
- Keep "830" and the Buy Credits button
- Add one line above the button in 11px `#6B7280` centered: "Org total · all tools draw from this"

---

## Section 3 — Credit Usage Breakdown (modified)

Keep the existing accordion. When expanded, keep the 2x2 grid of tool cards. Modify each card and add a new card.

**Header of the accordion row — modify:**
Add a secondary line under "Credit usage breakdown" in 12px `#6B7280`: "Each tool draws from the org wallet. Set a % cap to prevent any one tool from consuming the full balance."

**AI Transcriber card — keep as is, minor addition:**
Below the tool name, add a tag pill: background `#CCFBF1`, text `#0F766E`, 10px bold, text: "EHR Native". No other changes.

**AI CRM card — significant change:**
- Below "AI CRM" title, add two stacked tags side by side:
  - Tag 1: background `#EDE9FE`, text `#6D28D9`, 10px bold — "CRM Platform"
  - Tag 2: background `#FEF3C7`, text `#92400E`, 10px bold — "Cross-licensed"
- Below the tags, add a 12px `#6B7280` italics line: "Included in your EHR Essential plan · powered by MantraCRM"
- Keep usage bar and credit limit input unchanged
- Add a subtle info box at the bottom of the card (inside card, above credit limit): background `#FFFBEB`, border `#FDE68A`, border-radius 8px, padding 8px 10px. Text 11px `#92400E`: "If you upgrade to a CRM plan, this feature will move to your CRM dashboard and credits will merge into one org wallet."

**Session Notes card — keep as is, add tag:**
Below title add tag: background `#DBEAFE`, text `#1E40AF`, 10px bold — "EHR Native"

**Prescription card — keep as is, add tag:**
Below title add tag: background `#DCFCE7`, text `#15803D`, 10px bold — "EHR Native"

**Add a fifth card — Reminder Calling (locked/upsell):**
Same card dimensions as others. Slightly muted — card background `#F9FAFB` instead of white. Border `#E5E7EB` dashed instead of solid.

Top row: bell icon (lucide `Bell`) in a `#F3F4F6` background square size 32px. Icon color `#9CA3AF`. Next to it "Reminder Calling" in 14px `#9CA3AF` (muted, not bold). Lock icon (lucide `Lock`) size 14px `#9CA3AF` on the far right instead of info icon.

Below that, a locked state message — 13px `#6B7280`: "Available with CRM Basic plan or above"

Then a usage bar that is fully empty and grayed out. Track `#E5E7EB`. No fill. 0% label in `#9CA3AF`.

Then a teal CTA button full width: "Unlock with CRM Plan →" background `#14B8A6` text white 13px font-semibold rounded-lg height 36px.

Below the button in 11px `#6B7280` centered: "Credits will merge into your existing org wallet"

---

## Section 4 — Extra Credits (modified)

Keep the accordion and slider. Modify the header and add a clarification line.

**Accordion header row:**
- Keep "Extra Credits" title
- Add a badge next to the title: background `#F3F4F6`, text `#374151`, 11px — "Org-level · shared across all tools"

**Below the current plan + slider line:**
Add a 12px `#6B7280` line before the slider:
"Extra credits are available to all tools in your org wallet. They activate automatically when a tool's free allocation runs out."

**Below the slider, above the buy button:**
Add a 3-column breakdown in a light `#F9FAFB` rounded-lg box, padding 12px. Three columns separated by dividers:
- Col 1: "Current plan" / "240K / yr" in `#043570` bold
- Col 2: "Extra credits" / "{slider value}K / yr" in `#14B8A6` bold  
- Col 3: "Total org wallet" / "{sum}K / yr" in `#111827` bold

Labels 11px `#6B7280`, values 14px bold.

---

## Section 5 — New section at bottom: Multi-Plan Wallet Preview

**Add this as a new collapsed accordion below Extra Credits.**

Title: "Adding another platform?" with a `Plus` lucide icon in `#14B8A6` to the left.
Subtitle line in 12px `#6B7280`: "See how your wallet grows when you add CRM or RCM"

When expanded, show a single card in `#F0FDF4` background border `#BBF7D0`:

Header: "If you add CRM Basic Plan" in 14px bold `#111827`

Below that, a stacked wallet breakdown with three rows and a total:

```
EHR Essential plan      10,000 credits / mo
CRM Basic plan     +     8,000 credits / mo  [+ New]
Purchased credits  +       830 credits       [Yours now]
─────────────────────────────────────────────
Org wallet total        18,830 credits / mo
```

Each row: label on left in 13px `#374151`, value on right in 13px bold `#111827`. The CRM row has a small green badge "[+ New]" in `#DCFCE7` text `#15803D` 10px. Divider line `#D1FAE5` 1px. Total row has slightly larger 14px bold value.

Below the breakdown, a full-width button: "Explore CRM Plans →" border `2px solid #14B8A6` text `#14B8A6` background transparent hover fill teal. 36px height rounded-lg 13px font-semibold.

---

## Typography & Spacing Rules

- Section headers (accordion titles): 16px semibold `#111827`
- Card primary numbers: 30px bold `#111827`
- Card labels: 13px regular `#6B7280`
- Tag pills: 10–11px bold, 4px vertical padding, 8px horizontal padding, rounded-full
- All cards: padding 20px, border `1px solid #E5E7EB`, rounded-xl, white background unless noted
- Gap between cards in grid: 16px
- Gap between accordion sections: 24px
- All icons from Lucide React, size 16px in cards unless noted

---

## Interaction Notes for Figma Prototype

- Org wallet banner: static, no interaction
- AI CRM upsell info box: visible by default, not collapsible
- Locked Reminder Calling card: clicking "Unlock with CRM Plan →" navigates to Available Plans section (scroll to it)
- Multi-Plan Wallet Preview accordion: clicking anywhere on the header row expands/collapses
- Slider in Extra Credits: interactive, updates the three-column summary box in real time
- Credit limit inputs: editable text fields, on blur show the calculated credits count below in 11px gray

---

## What NOT to change

- The sub-tab bar (Overview / How it works) — keep exactly as is
- The How it works tab content — untouched
- The Payments tab — untouched
- The Overview tab (plan card, usage alerts, available plans) — untouched
- The overall left nav and settings header — untouched
- The top billing sub-tab bar (Overview / Payments / Manage Credit Usage) — untouched