# AI Transcriber Plan — Figma Design Optimization Prompt

Here's a comprehensive Figma prompt written from the perspective of a senior product designer, PM, and storyteller:

---

## FIGMA PROMPT

**Context:** This is a healthcare EHR platform (MantraCare) for individual providers. There are two plan tiers:
- **Full EHR Plan** — Complete access to all features
- **AI Transcriber Plan** — Limited access: Clients, AI Transcriber, Session Notes, Prescriptions only

**Goal:** Without touching the Full EHR plan layout, redesign the AI Transcriber plan experience so users immediately understand what they have, what's locked, and feel the value of their plan — not the absence of features.

---

### SIDEBAR CHANGES

**Current sidebar (Full EHR order):** Home, Clients, Billing, Messages, Appointments, Tools ↓, Grow ↓, Settings

**Redesigned sidebar for AI Transcriber Plan:**

1. Remove "Home" label — rename to **"Dashboard"**
2. Reorder navigation items in this exact sequence:
   - **Dashboard** (home icon, active state)
   - **AI Transcriber** ⭐ — add a cyan `#00c0ff` accent left-border glow and a small **"YOUR PLAN"** pill badge in `#00c0ff` text at `10px` font next to the label
   - **Session Notes** — same cyan left-border treatment
   - **Prescriptions** — same cyan left-border treatment
   - **Clients** — normal active style
   - Divider line with label: `"— — UPGRADE TO UNLOCK — —"` in `#94A3B8` at `9px` uppercase tracking-widest
   - **Appointments** — grayed out `#94A3B8`, lock icon `🔒` replacing the chevron, cursor: not-allowed on hover
   - **Billing** — same locked treatment
   - **Messages** — same locked treatment
   - **Grow** — same locked treatment
   - **Tools** (sub-items: Resources visible, others locked)
   - **Settings** — always accessible
3. At the bottom of the sidebar above the user profile, add a compact **upgrade CTA card**:
   - Background: `#043570` dark blue
   - Icon: `Sparkles` in `#00c0ff`
   - Headline: `"Unlock Full EHR"` in white, `13px` bold
   - Subtext: `"Appointments, Billing & more"` in `#94A3B8`, `11px`
   - Button: `"Upgrade"` in `#00c0ff`, outlined, full-width, `10px` rounded

---

### DASHBOARD — QUICK ACCESS GRID CHANGES

**Current:** 3×3 grid showing all 9 cards equally

**Redesigned for AI Transcriber Plan:**

**Step 1 — Replace the section header**
- Change `"Quick Access"` label to: `"Your AI Plan Tools"` in `#020817`, `18px` bold
- Add a cyan dot `●` before the label (same as Summary section style in client profile)
- Remove the pencil/customize icon (customization is not relevant in limited plan)
- Keep the `"How it Works"` link

**Step 2 — Primary cards row (Featured, full-width treatment)**

Render these 3 cards in a visually elevated row — slightly taller cards (`min-h-[140px]`), with a `2px` cyan border `border-[#00c0ff]/40`, and a `"YOUR PLAN"` ribbon/badge at top-right corner of each card in `#00c0ff` background, white text `9px`:

- **AI Transcriber** — icon: `Mic` from lucide, gradient `from-[#00c0ff] to-[#0099cc]`
- **Session Notes** — icon: `StickyNote`, gradient `from-[#8B5CF6] to-[#7C3AED]`
- **Prescriptions** — icon: `Pill`, gradient `from-[#EC4899] to-[#DB2777]`

**Step 3 — Secondary card (smaller, same row or below)**

- **Clients** — normal card style, no badge, icon: `Users`, gradient `from-[#06B6D4] to-[#0891B2]`

**Step 4 — Locked features section**

Below a thin divider with label: `"Available in Full EHR Plan"` — `12px`, `#94A3B8`, centered, with `—` on both sides

Render remaining cards (Appointments, Billing, Availability, Marketing, Premium, Refer & Earn) in a `3×2` grid with:
- Grayscale filter: `filter: grayscale(100%) opacity(50%)`
- Overlay: a `🔒` lock icon centered on top of each card icon
- Hover state: instead of normal hover, show a tooltip `"Upgrade to Full EHR to unlock"` in a dark tooltip
- Cursor: `not-allowed`
- Card background: `#F8FAFC` (no white glow, flat)

**Step 5 — Upgrade banner (between primary tools and locked section)**

Insert a full-width banner between the active and locked sections:
- Background gradient: `from-[#043570] to-[#065ba8]`
- Left: `Sparkles` icon in cyan + text `"You're on the AI Transcriber Plan"` white bold + subtext `"Upgrade to access Appointments, Billing, Messaging and 6 more features"` in `#93C5FD`
- Right: `"Upgrade Plan →"` button, white background, `#043570` text, `rounded-xl`, `font-bold`
- Rounded corners `rounded-2xl`, subtle `shadow-lg`

---

### CLIENT PROFILE PAGE — ACTIONS SECTION

**Current:** Grid of 11 action buttons shown equally

**For AI Transcriber Plan, redesigned Actions grid:**

**Active actions (shown normally, colored icons):**
- Appointments → **Session Notes** (reorder to first)
- **AI Transcriber** (add as second — new action button)
- **Prescriptions** (third)
- Appointments (fourth, but show with lock + `"Full EHR"` micro-badge)

**Locked actions (render in grid but grayed):**
- Appointments, Invoicing, Insurance, Pathway, Insights, Orders, Request Feedback, Earnings, Resources
- Apply: `grayscale`, `opacity-40`, lock icon overlay, `cursor-not-allowed`
- On click: open a modal/toast: `"This feature requires the Full EHR Plan. Upgrade to unlock."` with a CTA button

---

### ACTION CENTER (DASHBOARD TOP SECTION)

**For AI Transcriber Plan:**
- Hide: `"Pending Appointment Requests"` section (locked feature)
- Hide: `"Upcoming Appointments"` section (locked feature)
- Keep: `"Pending Messages"` section → but overlay with lock + upgrade prompt since Messages is locked
- Add a new section: **`"Recent Transcriptions"`** — show last 3 transcription sessions with client name, date, duration chip — same card style as appointments but with `Mic` icon in cyan

---

### PLAN MODE INDICATOR (TOP BAR / DEV BADGE AREA)

Replace the current dev-mode toggle with a **permanent plan badge** visible to real users:

- Position: top of sidebar, below the MantraCare logo
- Design: pill shape, background `#EFF6FF`, border `1px solid #BFDBFE`
- Text: `"AI Transcriber Plan"` in `#1D4ED8`, `11px`, `font-semibold`
- Next to it: `"Upgrade"` in `#00c0ff` as a clickable text link, `11px`

---

### VISUAL LANGUAGE RULES TO MAINTAIN CONSISTENCY

| Element | Full EHR Plan | AI Transcriber Plan |
|---|---|---|
| Active feature cards | White bg, colored border on hover | White bg + cyan border + "YOUR PLAN" badge |
| Locked feature cards | N/A | Grayscale + lock icon + flat bg |
| Sidebar items | Normal weight | Active = cyan accent bar; Locked = gray + lock |
| Section dividers | None | Dotted divider with upgrade label |
| Upgrade CTAs | None | Sidebar card + banner + modal on locked click |

---

### STORYTELLING PRINCIPLE FOR THIS REDESIGN

> "The AI Transcriber user should feel like they have a powerful, focused tool — not a crippled version of something bigger. Lead with what they own. Make it feel premium and purposeful. Only when they naturally reach for something beyond their plan do they encounter the upgrade moment — never as a blocker, always as an invitation."