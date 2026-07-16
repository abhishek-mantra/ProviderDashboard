Figma Update Prompt

Overview of Changes
Update the MantraCare provider dashboard with three distinct sidebar navigation modes and billing page restructuring. The three modes are: Provider Mode (full EHR + Mantra Provider features), Full EHR Mode (standard EHR without Mantra Provider section), and AI Scribe Mode (transcriber-only plan).

CHANGE 1 — Billing Page: Remove Insurance Tab
In the Billing page (/billing), remove the "Insurance" tab from the top pill-style tab bar. The tab bar should now contain only three tabs: Earnings · Invoices · Bank & Tax. This applies to all three modes.

CHANGE 2 — "For Mantra Provider" Dropdown: Add Insurance
In the sidebar's "For Mantra Provider" collapsible dropdown section (visible in Provider Mode and at the bottom in Full EHR + AI Scribe modes), add Insurance as a new sub-item. The dropdown now contains: Client Leads · Mantra Premium · Tasks · Marketing · Insurance · Refer & Earn.

CHANGE 3 — Sidebar Navigation: Provider Mode
Redesign the sidebar for Provider Mode (planMode = "provider" / signupMode = "provider"). The nav items in exact top-to-bottom order:

Home — Home icon
Clients — Users icon
Billing — CreditCard icon
Messages — MessageSquare icon
Appointments — Calendar icon
Tools — Wrench icon (collapsible chevron ▾)

Resources
Tasks
AI CRM


Refer & Earn — Gift icon (new top-level item)
Settings — Settings icon (with ··· configure menu trigger on hover)

Show More ▾ (collapsed by default, shown below Settings):

AI Transcriber
Session Notes
Prescriptions

Bottom of sidebar (pinned, always visible):

"For Mantra Provider" — Crown icon (collapsible ▾)

Client Leads
Mantra Premium
Tasks
Marketing
Insurance
Refer & Earn (also accessible from here)




Note: "Elevate with Mantra Provider" upgrade prompt button is hidden in Provider Mode since the user already has that plan.


CHANGE 4 — Sidebar Navigation: Full EHR Mode
Redesign the sidebar for Full EHR Mode (planMode = "full-ehr", signupMode ≠ "provider"). The nav items in exact top-to-bottom order:

Home — Home icon
Clients — Users icon
Billing — CreditCard icon
Messages — MessageSquare icon
Appointments — Calendar icon
Tools — Wrench icon (collapsible chevron ▾)

Resources
Tasks
AI CRM


Refer & Earn — Gift icon
Settings — Settings icon (with ··· configure menu on hover)

Show More ▾ (collapsed by default):

AI Transcriber
Session Notes
Prescriptions

Bottom of sidebar (pinned):

"Elevate with Mantra Provider" — Crown icon (opens upgrade popup)


The "For Mantra Provider" dropdown is not shown in the main nav for Full EHR mode — it only appears at the bottom as the upgrade CTA.


CHANGE 5 — Sidebar Navigation: AI Scribe Mode
Redesign the sidebar for AI Scribe / Transcriber-Only Mode (planMode = "transcriber-only"). The nav items in exact top-to-bottom order:

Home — Home icon
Clients — Users icon
AI Transcriber — Mic icon (with "YOUR PLAN" cyan label)
Session Notes — StickyNote icon
Prescriptions — Pill icon
Refer & Earn — Gift icon
Settings — Settings icon

Show More ▾ (collapsed by default, locked items shown with upgrade prompt):

Messages — 🔒 locked, tap → upgrade toast
Appointments — 🔒 locked, tap → upgrade toast
Billing — 🔒 locked, tap → upgrade toast
Other Tools — unlocked, links to /tools

Bottom of sidebar (pinned):

"Elevate with Mantra Provider" — Crown icon (opens MantraPremiumUpgradePopup)


CHANGE 6 — PlanMode Context: Add "provider" as Third Mode
Update the PlanModeContext type to support three modes:
type PlanMode = "full-ehr" | "transcriber-only" | "provider";
The signupMode (localStorage.getItem("mantra_signup_mode")) value "provider" continues to gate the "For Mantra Provider" nav section in the main sidebar. In Provider Mode, this section moves to the bottom pinned area instead of being inline in the nav.

Visual / Style Notes for Figma

Active nav item: bg-[#00c0ff] fill, white icon + label, subtle shadow
Inactive nav item: text-[#64748b], hover bg-gray-50
Locked items (AI Scribe Show More): 40% opacity, Lock icon on right, tap triggers toast
Show More chevron: rotates 180° when expanded
"For Mantra Provider" pinned block: sits directly above the user profile row at the very bottom of the sidebar, same style as current implementation
Drag-to-reorder (configure mode): applies to all three modes' respective item orders
Collapsed sidebar (icon-only, 64px width): all items collapse to centered icons; "Show More", labels, and lock icons hide; tooltips appear on hover
Mobile: sidebar slides in from left as a drawer; same item order as desktop


Frame / Component Checklist for Figma
Create or update the following frames:

 Sidebar / Provider Mode — full expanded + collapsed variants
 Sidebar / Full EHR Mode — full expanded + collapsed variants
 Sidebar / AI Scribe Mode — full expanded + collapsed + Show More open variants
 Sidebar / Configure Mode — drag handles + × hide buttons overlay
 Billing Page — 3-tab version (Earnings · Invoices · Bank & Tax) — all modes
 For Mantra Provider Dropdown — updated sub-item list including Insurance
 MantraPremiumUpgradePopup — unchanged, reference existing component
 Show More Dropdown — locked state (AI Scribe) + unlocked state (Provider/EHR)
Sonnet 4.6 LowClaude is AI and can make mistake