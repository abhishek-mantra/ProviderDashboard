I'll write you a detailed, precise prompt that you can give directly to an AI coding assistant (like Claude in an agentic context, or Cursor/Copilot) to implement all three changes. This is written as a technical implementation brief.

---

## Implementation Brief: MantraCare Provider Portal — UX Changes

---

### CONTEXT

This is a React + TypeScript + Tailwind CSS application. The routing uses `react-router`. Plan modes are managed via `PlanModeContext` (`"full-ehr" | "transcriber-only" | "provider"`). The relevant files are:

- `GetStarted.tsx` — signup entry page
- `OTPVerify.tsx` — OTP verification page
- `Onboarding.tsx` — provider onboarding (5-step form, currently only for `provider` mode)
- `Layout.tsx` — sidebar with plan-aware navigation
- `Dashboard.tsx` — home page

---

### CHANGE 1 — GetStarted Page Redesign

**1A. Left Panel Icon Redesign**

Replace the current emoji icons in the benefits list with SVG icon components. Each icon should be a 20×20 white SVG rendered inside a container styled as:

```
background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)
border: 1px solid rgba(255,255,255,0.18)
border-radius: 10px
size: 36×36px
backdrop-filter: blur(8px)
box-shadow: 0 2px 8px rgba(0,0,0,0.12)
```

Map each benefit text to a matching lucide-react icon (white, `size-5`):

- "Get clients from 40+ countries" → `Globe`
- "Work as a freelancer" → `Briefcase`
- "Free EHR / Practice management tools" → `LayoutDashboard`
- "Work with 400+ global companies" → `Building2`
- "Easy onboarding & instant access" → `Zap`
- "Secure & HIPAA-compliant platform" → `ShieldCheck`
- "24/7 provider support" → `Headphones`
- "Complete client & session management" → `Users`
- "Integrated billing & invoicing" → `CreditCard`
- "SOAP / DAP / BIRP session notes" → `FileText`
- "Appointment scheduling & calendar sync" → `CalendarDays`
- "Prescription management" → `Pill`
- "Insurance & compliance ready" → `ClipboardCheck`
- "Real-time AI session transcription" → `Mic`
- "Auto-generate SOAP, DAP, BIRP notes" → `Bot`
- "Works with any therapy session" → `Brain`
- "Saves 2–3 hours per provider daily" → `Timer`
- "Fully HIPAA-compliant recordings" → `ShieldCheck`
- "One-click prescription generation" → `Pill`

**1B. Right Panel — Two-Step Flow**

Convert the single-form right panel into a two-step inline flow (no route change, state managed locally):

**Step 1 — Email capture:**
- Title: "Get started"
- Subtitle: "Enter your email address to continue to your account"
- Single input: Email Address (label: `EMAIL ADDRESS`, placeholder: `Email Address`)
- Primary CTA button: `Continue →` (full width, `#043570` background)
- Divider: `OR`
- Secondary CTA: `Continue with Google` (white bg, Google SVG icon, border)
- Trust signal: Shield icon + "Secure & Private" + "Your data is encrypted and HIPAA-compliant"
- Language toggle: `🌐 English`
- Footer link: "Already have an account? Sign in" → navigates to `"/"`

When `Continue →` is clicked: advance to Step 2 regardless of whether email is filled (skip validation for flow testing). If email is filled, carry it forward.

**Step 2 — Account details:**
- Back chevron link: `← Back` (returns to Step 1, clears nothing)
- Title: "Create your account"
- Subtitle: "Complete your details to get started"
- Show confirmed email as a read-only pill at the top: `✓ {email || "user@example.com"}` with a `Change` link that returns to Step 1
- Fields: Full Name, Phone Number (with country code picker), Create Password (with show/hide toggle)
- Primary CTA: `Create Account` (full width, `#043570`)
- Divider: `OR`
- Secondary CTA: `Continue with Google`
- Trust signal same as Step 1
- Language toggle

When `Create Account` is clicked: proceed to `/verify` route passing `{ signupMode, email }` in location state. **Do not require any field to be filled** — clicking the button always navigates forward (this is intentional for flow testing).

Remove the existing `<form onSubmit={handleSubmit}>` required validation. Replace with `onClick` handlers that always navigate forward.

**1C. OTP Page**

No structural changes needed. Ensure the back button returns to `/get-started` (already correct). The "Verify & Continue" button should navigate forward regardless of OTP being filled (already mostly correct, keep as is).

---

### CHANGE 2 — EHR & AI Scribe Onboarding Flow

**2A. Remove Welcome Popup**

In `Dashboard.tsx`: Remove the `WelcomePopup` component and all references to it:
- Remove import of `WelcomePopup`
- Remove `showWelcomePopup` state
- Remove `{showWelcomePopup && <WelcomePopup ... />}` JSX

**2B. Create New Route: `/onboarding-ehr-ai-scribe`**

Create a new file `OnboardingEHRAIScribe.tsx`. This page must:

- Use the **exact same two-panel layout** as `GetStarted.tsx` and `OTPVerify.tsx`:
  - Left panel: same dark blue gradient (`linear-gradient(160deg, #1a3a6e 0%, #043570 100%)`), same logo, same footer
  - Left panel content: show the same dynamic benefits list based on `signupMode` from `location.state` (reuse `modeContent` from `OTPVerify.tsx`)
  - Right panel: white/`#F8FAFC` background, centered, `max-w-[480px]`

- Right panel content:

```
Title: "Personalize your experience"  
Subtitle: "Tell us how you'll use the platform so we can set up the right tools for you."
```

**Service selector (only show for full-ehr mode, hide for transcriber-only):**

Label: "What is your primary profession?"

Show a 2-column grid of capsule buttons. Each capsule:
- Unselected: white bg, `border: 1.5px solid #e5e7eb`, `#0F172A` text, `rounded-full`, `px-4 py-2`, `text-sm font-medium`
- Selected: `bg-[#043570]` background, white text, same border-radius
- Single select (radio behavior)

Professions list:
`Therapist / Psychologist`, `Psychiatrist`, `Counselor`, `Life Coach`, `Nutritionist`, `Physical Therapist`, `General Physician`, `Other`

**Primary purpose selector:**

Label: "What are your primary goals?" (subtext: "Select all that apply")

Show a multi-select capsule grid (2-3 per row, wrapping). Same capsule styling as above but multi-select (toggle on/off).

Purpose options with associated sidebar feature keys:

| Capsule Label | Sidebar Feature Key |
|---|---|
| Patient Management | `clients` |
| Appointment Scheduling | `appointments` |
| Billing & Invoicing | `billing` |
| Secure Messaging | `messages` |
| AI Session Transcription | `ai-transcriber` |
| Session Notes (SOAP/DAP/BIRP) | `session-notes` |
| Prescription Management | `prescriptions` |
| Insurance & Claims | (no sidebar item, ignored) |
| Team Collaboration | (no sidebar item, ignored) |

**"Select everything" checkbox:**

Below the capsule grid, add:

```
[ ] Everything sounds useful — give me full access
```

Style: custom checkbox (`size-4`, border `#e5e7eb`, checked fills `#043570`), label text: `text-sm text-[#0F172A] font-medium`

When checked: select all purpose capsules programmatically. When unchecked: deselect all.

**CTA Button:**

```
"Get Started →"
```

Full width, `bg-[#043570]`, white text, `rounded-xl`, `h-[52px]`, `font-bold`

On click (no validation required — always proceeds):

1. Determine which sidebar features to show based on selected purposes. **Always keep visible:** `home`, `clients`, `refer-earn`, `settings`. Features not selected by the user → add to `hiddenItems` in localStorage (key: `sidebar_hidden_items`). Features selected → ensure they are NOT in `hiddenItems`.
2. Call `setPlanMode` with the correct mode from `location.state.signupMode`.
3. Set `localStorage.setItem("mantra_logged_in", "true")`.
4. Navigate to `"/"` (no `showWelcomePopup` state).

**2C. Update Routing**

In `OTPVerify.tsx`, update `handleVerify`:

```typescript
const handleVerify = (e: React.FormEvent) => {
  e.preventDefault();
  localStorage.setItem("mantra_logged_in", "true");
  localStorage.setItem("mantra_signup_mode", signupMode);
  if (signupMode === "provider") {
    navigate("/onboarding");
  } else {
    // EHR and AI Scribe go to new onboarding page
    navigate("/onboarding-ehr-ai-scribe", { state: { signupMode, email } });
  }
};
```

Remove the old `setPlanMode` calls from `OTPVerify.tsx` — plan mode will be set in the new onboarding page.

Add the new route in your router config:
```tsx
<Route path="/onboarding-ehr-ai-scribe" element={<OnboardingEHRAIScribe />} />
```

**2D. Sidebar Priority Logic**

The sidebar in `Layout.tsx` already reads `hiddenItems` from localStorage. The new onboarding page writes to `sidebar_hidden_items` before navigating to home. No changes needed in `Layout.tsx` for this — the existing `visibleItems()` and `hiddenFromOrder()` functions will handle it automatically.

However: ensure `clients`, `refer-earn`, and `settings` are **never** added to `hiddenItems` (guard this in the write logic in `OnboardingEHRAIScribe.tsx`).

---

### CHANGE 3 — Sidebar Configure Menu Fixes

**3A. Single "Show More" Dropdown**

Current behavior: when items are hidden via Configure Menu, a separate "Show More" section appears alongside the existing static "Show More" sections. This creates duplicates.

**Fix:**

In `Layout.tsx`, consolidate all "Show More" rendering into a single block. Remove the multiple conditional "Show More" sections (the ones checking `!isConfigureMenuMode && hiddenFromOrder(order).length === 0`). Keep only ONE "Show More" block that:

- Always renders when `!isConfigureMenuMode && !shouldShowCollapsed()`
- Shows ALL hidden items (from `hiddenFromOrder(order)`) AND the static extra items (`ai-transcriber`, `session-notes`, `prescriptions` for EHR/Provider; locked items for transcriber-only)
- Deduplicate: if an item is already in the main nav (not hidden), don't show it in "Show More"

Specifically, replace the four separate "Show More" conditional blocks with one unified block:

```tsx
{!isConfigureMenuMode && !shouldShowCollapsed() && (
  <div className="mt-2">
    <button
      onClick={() => setIsShowMoreExpanded(!isShowMoreExpanded)}
      className="w-full flex items-center justify-between px-4 py-2.5 transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
    >
      <span className="text-[13px] font-semibold">Show more</span>
      <ChevronDown className={`size-4 transition-transform duration-200 ${isShowMoreExpanded ? 'rotate-180' : ''}`} />
    </button>
    {isShowMoreExpanded && (
      <>
        <div className="border-t border-gray-100 dark:border-gray-700 mb-1" />
        
        {/* User-hidden items (from configure menu) */}
        {hiddenFromOrder(order).map(key => {
          const meta = navItemMeta[key];
          if (!meta) return null;
          return (
            <button
              key={key}
              onClick={() => toggleHideItem(key)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                {meta.icon}
                <span className="ml-3 text-sm">{meta.label}</span>
              </div>
              <span className="text-[10px] font-medium text-gray-400">tap to show</span>
            </button>
          );
        })}

        {/* Static extras for EHR and Provider mode */}
        {(isProviderPlan || (!isTranscriberOnly && !isProviderPlan)) && (
          [
            { to: '/ai-transcriber', icon: <Mic className="size-5 flex-shrink-0" />, label: 'AI Transcriber' },
            { to: '/session-notes', icon: <StickyNote className="size-5 flex-shrink-0" />, label: 'Session Notes' },
            { to: '/prescriptions', icon: <Pill className="size-5 flex-shrink-0" />, label: 'Prescriptions' },
          ]
          .filter(item => !visibleItems(order).includes(item.to.replace('/', '')))
          .map(({ to, icon, label }) => (
            <Link key={to} to={to} onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                isActive(to) ? "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {icon}
              <span className="ml-3 text-sm font-medium">{label}</span>
            </Link>
          ))
        )}

        {/* Locked items for Transcriber-only mode */}
        {isTranscriberOnly && (
          <>
            {[
              { icon: <MessageSquare className="size-5 flex-shrink-0 text-gray-500" />, label: 'Messages' },
              { icon: <Calendar className="size-5 flex-shrink-0 text-gray-500" />, label: 'Appointments' },
              { icon: <CreditCard className="size-5 flex-shrink-0 text-gray-500" />, label: 'Billing' },
            ].map(({ icon, label }) => (
              <button key={label} onClick={() => setShowPremiumUpgradePopup(true)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-40"
              >
                <div className="flex items-center">{icon}<span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{label}</span></div>
                <Lock className="size-3.5 flex-shrink-0" />
              </button>
            ))}
            <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2 rounded-lg transition-all ${isActive("/tools") ? "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
            >
              <Wrench className="size-5 flex-shrink-0 text-gray-500" />
              <span className="ml-3 text-sm font-medium">Other Tools</span>
            </Link>
          </>
        )}
      </>
    )}
  </div>
)}
```

**3B. Immediate Hide on × Click**

Current behavior: clicking × in configure mode stages the hide — it only takes effect when "Done" is clicked.

**Fix:**

The `toggleHideItem` function already modifies state immediately. The issue is that `itemsToRender` in the nav render uses `isConfigureMenuMode ? order : visibleItems(order)` — meaning in configure mode it always shows all items (including newly hidden ones, so the item stays visible while editing).

Update the render logic so that during configure mode, items that are freshly hidden (in `hiddenItems`) show a **visual dimmed/strikethrough state** rather than disappearing completely (so the user can undo), OR simply remove them immediately:

For immediate removal (simpler, matches the requirement):

```tsx
// Change this line:
const itemsToRender = isConfigureMenuMode ? order : visibleItems(order);

// To this:
const itemsToRender = visibleItems(order); // always use visible items
```

Then in configure mode, the × button hides the item instantly. The "Done" button just exits configure mode (no staging needed). Update the "Done" button label/behavior — it now only closes configure mode, not "applies" changes (since changes are already applied live).

Also ensure `settings` never gets an × button (already guarded by `key !== 'settings'` in the existing code — keep that guard).

---

### SUMMARY OF FILES TO MODIFY

| File | Changes |
|---|---|
| `GetStarted.tsx` | Two-step email-first flow, lucide icons replacing emojis, no required validation |
| `OTPVerify.tsx` | Update `handleVerify` to route EHR/AI Scribe to `/onboarding-ehr-ai-scribe` |
| `OnboardingEHRAIScribe.tsx` | **New file** — service + purpose selector, writes to `sidebar_hidden_items`, navigates to `/` |
| `Dashboard.tsx` | Remove `WelcomePopup` import and usage |
| `Layout.tsx` | Consolidate Show More into single block; change `itemsToRender` to always use `visibleItems()` |
| Router config | Add `<Route path="/onboarding-ehr-ai-scribe" element={<OnboardingEHRAIScribe />} />` |