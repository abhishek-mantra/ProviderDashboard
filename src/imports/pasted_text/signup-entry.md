# MantraCare Provider Portal — Figma Design Prompt
## Adding Signup Flow + Onboarding to Existing Project

---

## CONTEXT & CURRENT STATE

You are working on the **MantraCare Provider Portal** (`provider.mantracare.com`). The existing Figma project already has:
- `/home` — Dashboard (Full EHR plan view with Action Center, Quick Access grid)
- `/onboarding` — 5-step onboarding form (Basic Info → Description → Profile Picture → Videos → Availability)
- Edit Profile flow (same 5-step layout as onboarding)

The app supports **two plan modes** controlled via context:
- `full-ehr` — Full EHR Plan (default)
- `transcriber-only` — AI Transcriber Only

The dashboard already has a DEV mode switcher bar at the top (`Full EHR Plan` | `AI Transcriber Only` toggle). **Remove this bar from the Dashboard frame entirely** — plan selection now happens at signup.

---

## WHAT TO BUILD: NEW SCREENS

You need to add the following new screens/flows **before** the existing `/home` and `/onboarding` screens. All new screens use the same global design system already in the project (colors: `#043570` navy, `#00c0ff` cyan, white backgrounds, `rounded-2xl` cards, Inter/system font stack).

---

## SCREEN 1: SIGNUP — ENTRY (Email Collection)
**Route:** `/get-started`
**Layout:** Two-column split, full viewport height

### LEFT PANEL (≈48% width, `#1a3a6e` → `#043570` gradient background)

**Top:**
- Mantra heart-logo + "Mantra" wordmark in white (top-left, same as existing login screen)

**Middle content:**
- Large white bold headline: `"Grow your practice with tools trusted by providers worldwide."`
- Below headline, a vertical list of 7 benefit items, each with a small frosted-glass icon chip on the left and white text:
  1. 🧑‍🤝‍🧑 Get clients from 40+ countries
  2. 💼 Work as a freelancer
  3. 📄 Free EHR / Practice management tools
  4. 🌐 Work with 400+ global companies
  5. ⚡ Easy onboarding & instant access
  6. 🛡️ Secure & HIPAA-compliant platform
  7. 🎧 24/7 provider support

> **NOTE:** The benefit list content **changes per mode** — see Mode Variants below. The layout/structure stays identical; only the text changes.

**Bottom of left panel — Mode Switcher Bar:**
A slim, pill-shaped segmented control sitting flush at the bottom of the panel content (NOT at the very bottom edge of the screen — leave some breathing room). It is **not** a big button; think of it as a compact tab switcher.

- Container: semi-transparent white/10 background, `border-radius: 999px`, padding `4px`
- Three segments side by side, each segment is a pill:
  - **Provider** (default selected)
  - **Full EHR**
  - **AI Scribe**
- Selected segment: white background, `#043570` text, subtle shadow
- Unselected segments: transparent background, white/60 text
- No icons, no descriptions — just the three labels
- Small font: `13px`, `font-weight: 600`

**Footer:**
- `© 2026 Mantra` in white/40, bottom-left

---

### RIGHT PANEL (≈52% width, white `#F8FAFC` background)

Vertically centered content block, max-width `420px`, centered horizontally.

**Header:**
- `"Create your account"` — `24px`, `font-weight: 700`, `#0F172A`
- `"Complete your details to get started"` — `14px`, `#64748B`

**Form fields (stacked, gap `16px`):**

1. **Email field** (or pre-filled email chip with "Change" link — same pattern as existing login screen showing `user5eyemantra@gmail.com` with green checkmark and "Change" link in blue)

2. **Full Name** — labeled `"Full Name"`, placeholder `"Enter your full name"`, standard rounded input same style as existing onboarding inputs (`bg-[#f8fbff]`, `border-[#e5e7eb]`, `rounded-2xl`, `py-3.5 px-4`)

3. **Phone Number** — labeled `"Phone Number"`, country code selector on left (flag + `+91` with chevron, same as onboarding Contact Number field), phone input on right

4. **Create Password** — labeled `"Create Password"`, placeholder `"Create a strong password"`, eye-toggle icon on right

**CTA Button:**
- Full width, `"Create Account"`, `bg-[#043570]`, white text, `rounded-xl`, `py-3.5`, `font-weight: 700`

**Divider:**
- `— OR —` in `#94A3B8`, `12px`

**Google SSO:**
- Full width outlined button: Google "G" logo + `"Continue with Google"`, white background, `border-[#e5e7eb]`, `rounded-xl`

**Trust signal:**
- Shield icon + `"Secure & Private"` bold `14px` + `"Your data is encrypted and HIPAA-compliant"` `12px #64748B`

**Footer link:**
- `🌐 English` — centered, `#00c0ff`, `14px` (language switcher, same as existing)

---

## SCREEN 1b: LEFT PANEL VARIANTS (Mode-specific content)

When the user switches the mode via the segmented control, the left panel content updates. The right panel (form) stays identical across all three modes.

### Provider Mode (default)
Headline: `"Grow your practice with tools trusted by providers worldwide."`
Benefits:
1. Get clients from 40+ countries
2. Work as a freelancer
3. Free EHR / Practice management tools
4. Work with 400+ global companies
5. Easy onboarding & instant access
6. Secure & HIPAA-compliant platform
7. 24/7 provider support

### Full EHR Mode
Headline: `"Run your entire practice from one powerful platform."`
Benefits:
1. Complete client & session management
2. Integrated billing & invoicing
3. SOAP / DAP / BIRP session notes
4. Appointment scheduling & calendar sync
5. Prescription management
6. Insurance & compliance ready
7. 24/7 provider support

### AI Scribe Mode
Headline: `"Let AI handle your notes so you can focus on your clients."`
Benefits:
1. Real-time AI session transcription
2. Auto-generate SOAP, DAP, BIRP notes
3. Works with any therapy session
4. Saves 2–3 hours per provider daily
5. Fully HIPAA-compliant recordings
6. One-click prescription generation
7. 24/7 provider support

---

## SCREEN 2: OTP VERIFICATION
**Route:** `/verify`
**Layout:** Same two-column split as Screen 1 (left panel content stays same as whatever mode was selected, right panel changes)

### RIGHT PANEL — OTP Screen:

**Header:**
- Back chevron `"< Back"` top-left in `#64748B`, `14px`
- `"Verify your email"` — `24px bold`
- `"Enter the 6-digit code sent to [email]"` — `14px #64748B`

**OTP Input:**
- 6 individual square input boxes in a row, each `52px × 56px`
- `border-radius: 12px`, `border: 1.5px solid #e5e7eb`
- Focused: `border-[#00c0ff]`, `box-shadow: 0 0 0 3px rgba(0,192,255,0.12)`
- Active/filled: `border-[#043570]`, `background: #f8fbff`
- Font: `24px`, `font-weight: 700`, `#043570`, centered

**Resend:**
- `"Didn't receive the code?"` `#64748B` + `"Resend"` link in `#00c0ff`, `font-weight: 600`
- Small countdown timer: `"Resend in 0:45"` replacing the link while timer runs

**CTA:**
- Full width `"Verify & Continue"` button, same style as Create Account button

**Trust signal:** Same shield + Secure & Private as Screen 1

---

## SCREEN 3A: PROVIDER ONBOARDING
**Route:** `/onboarding` (after OTP verification, when mode = Provider)

This is **exactly the existing 5-step onboarding/edit-profile form** — no visual changes whatsoever. Re-use the existing Figma frames for:
- Step 1: Basic Information
- Step 2: Description
- Step 3: Profile Picture
- Step 4: Videos (Optional)
- Step 5: Availability

The only thing to add: **prototype connections** so that after OTP verification with Provider mode selected, the flow routes here.

---

## SCREEN 3B: EHR & AI SCRIBE — HOME + WELCOME POPUP

**Route:** `/home` with overlay modal (after OTP verification for Full EHR or AI Scribe modes)

The user lands on the existing Dashboard `/home` page. **Immediately on arrival**, a centered modal overlay appears.

### Modal Overlay:

**Backdrop:** `bg-black/50` full screen overlay

**Modal Card:**
- White background, `border-radius: 24px`, `padding: 32px`, `max-width: 480px`, centered
- `box-shadow: 0 20px 60px rgba(0,0,0,0.15)`

**Modal Header:**
- Small Mantra logo + wordmark top-center (same as left panel, but in `#043570`)
- Heading: `"Welcome to MantraCare!"` — `22px`, `font-weight: 700`, `#0F172A`, centered
- Subtext: `"Let's personalize your experience"` — `14px`, `#64748B`, centered

**Divider line**

**Form Section — Two dropdowns, stacked with `16px` gap:**

**Dropdown 1 — "What is your profession?"**
- Label: `"What is your profession?"` — `14px`, `font-weight: 600`, `#0F172A`
- Dropdown styled same as existing profession selector in Edit Profile (rounded-xl, border, chevron)
- Options: Same full category list from the Edit Profile professions dropdown (Mental Health, Wellness, Physio/MSK, Doctors/Specialists, Coaching, Other — all expandable categories with all sub-options)

**Dropdown 2 — "How would you like to use MantraCare?"**
- Label: `"How would you like to use MantraCare?"` — `14px`, `font-weight: 600`, `#0F172A`
- Helper text below label: `"Select the option that best matches your primary workflow"` — `12px`, `#64748B`
- Dropdown options (flat list, no categories):
  - Provider — Manage clients, appointments & grow your practice
  - Full EHR — Complete practice management with billing & notes
  - AI Scribe — Focus on sessions, let AI handle your documentation

**CTA Button:**
- `"Get Started →"` — full width, `bg-[#043570]`, white, `rounded-xl`, `py-3.5`, `font-weight: 700`

**Footer note:**
- `"You can change these preferences anytime in Settings"` — `12px`, `#94A3B8`, centered, italic

---

## FLOW DIAGRAM — PROTOTYPE CONNECTIONS

```
/get-started (Screen 1)
  → [Create Account] → /verify (Screen 2)
  → [Continue with Google] → skip to OTP or directly to Screen 3

/verify (Screen 2)
  → [Verify & Continue]
      IF mode = Provider → /onboarding Step 1 (existing 5-step form)
      IF mode = Full EHR → /home + Welcome Popup (Screen 3B)
      IF mode = AI Scribe → /home + Welcome Popup (Screen 3B)

Welcome Popup (Screen 3B)
  → [Get Started] → dismiss popup, stay on /home

Left panel Mode Switcher (Screen 1 & 2)
  → Switching modes updates left panel content only (right panel unchanged)
```

---

## DASHBOARD CHANGE — REMOVE DEV MODE BAR

In the existing `/home` Dashboard frame:
- **Delete** the black top bar that shows `DEV | Plan Mode: [Full EHR Plan] [AI Transcriber Only]`
- The Dashboard frame should now start directly with the sidebar + main content area
- No other changes to the Dashboard

---

## DESIGN TOKENS (match existing project exactly)

| Token | Value |
|---|---|
| Primary Navy | `#043570` |
| Cyan Accent | `#00c0ff` |
| Background | `#F8FAFC` |
| Card White | `#FFFFFF` |
| Border | `#E5E7EB` |
| Text Primary | `#0F172A` |
| Text Secondary | `#64748B` |
| Text Muted | `#94A3B8` |
| Error Red | `#FB2C36` |
| Input BG | `#F8FBFF` |
| Border Radius — inputs | `16px` (rounded-2xl) |
| Border Radius — buttons | `12px` (rounded-xl) |
| Border Radius — modal | `24px` |
| Input padding | `14px 16px` |
| Button height | `52px` |
| Shadow — card | `0 4px 24px rgba(0,0,0,0.06)` |

---

## COMPONENT REUSE NOTES

- The **left panel gradient** is the same blue gradient used on the existing login screen in the project — reuse that component/style
- The **benefit list items** use the same frosted-glass icon chip style from the existing login screen
- The **input fields** are identical to those in the existing `/onboarding` Step 1 form
- The **"Change" email chip** (Screen 1 right panel top) is identical to the existing login screen's email display
- The **profession dropdown** inside the Welcome Popup is a simplified version of the multi-select profession dropdown from Edit Profile Step 2 — single select, same visual style
- The **modal overlay** follows the same pattern as the "Add Time Slot" modal in the Availability step

---

## FRAME NAMING CONVENTION

Name new frames as:
- `Signup / 1 - Email Entry - Provider`
- `Signup / 1 - Email Entry - Full EHR`
- `Signup / 1 - Email Entry - AI Scribe`
- `Signup / 2 - OTP Verification`
- `Onboarding / Provider / Step 1 - Basic Info` (existing, just reconnect)
- `Onboarding / EHR+Scribe / Home + Welcome Popup`

Group all new frames in a new page or section called **"Auth & Onboarding Flow"** in the Figma file.

---

## RESPONSIVE NOTES

All new screens are **desktop-first** (matching the existing login screen proportions shown in the screenshots — approximately 1440px wide). Mobile variants are not required in this pass.

---

*End of prompt. Reference the attached screenshots: Image 1 (existing login/password screen), Image 5 (existing get-started screen with signup form) for exact visual reference of the split-panel layout and form field styling.*