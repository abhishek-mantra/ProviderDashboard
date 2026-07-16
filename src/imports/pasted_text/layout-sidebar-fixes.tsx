# Fix: Sidebar Issues Across Plan Modes

## FILE: `src/components/Layout.tsx`

---

## FIX 1 — Remove "Unlock Full EHR" upgrade CTA card from AI Scribe sidebar

In the AI Scribe (`isTranscriberOnly`) sidebar section, find and **delete** this entire block:

```tsx
{/* Upgrade CTA Card (AI Transcriber Plan only) */}
{isTranscriberOnly && !shouldShowCollapsed() && (
  <div className="px-3 pb-3">
    <div className="bg-[#043570] rounded-2xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="size-9 bg-[#00c0ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="size-5 text-[#00c0ff]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-[13px] font-bold">Unlock Full EHR</h3>
          <p className="text-[#93C5FD] text-[11px] mt-0.5 font-normal">Appointments, Billing & more</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/settings")}
        className="w-full py-2 px-3 bg-transparent border border-[#00c0ff] text-[#00c0ff] rounded-xl text-[12px] font-bold hover:bg-[#00c0ff]/10 transition-colors"
      >
        Upgrade
      </button>
    </div>
  </div>
)}
```

**Delete this entire block.** Nothing replaces it.

---

## FIX 2 — Provider mode: Restore "Mantra Premium" as a proper expandable dropdown (not a CTA card)

In the Full EHR (`!isTranscriberOnly`) sidebar, the previous prompt replaced the Grow dropdown with a CTA card. **Revert that change** — Provider mode should have Mantra Premium as a fully functional expandable nav section, identical to how the old "Grow" dropdown worked, just with the renamed label.

Replace whatever is currently in the Grow/Mantra Premium section of the Full EHR nav with this restored expandable dropdown:

```tsx
{/* Mantra Premium Section — Full EHR / Provider mode */}
<div>
  <button
    onClick={() => {
      setIsGrowExpanded(!isGrowExpanded);
      if (!isGrowExpanded) setIsProfileMenuOpen(false);
    }}
    className={`w-full flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
      isActive("/grow") || isActive("/client-leads") || isActive("/premium") || isActive("/refer-earn")
        ? "bg-[#00c0ff] text-white shadow-md"
        : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
    }`}
    title={shouldShowCollapsed() ? "Mantra Premium" : undefined}
  >
    <div className="flex items-center">
      <Crown className="size-5 flex-shrink-0" />
      <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>
        Mantra Premium
      </span>
    </div>
    <ChevronDown
      className={`size-4 transition-transform duration-200 ${isGrowExpanded ? 'rotate-180' : ''} ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}
    />
  </button>

  {isGrowExpanded && !shouldShowCollapsed() && (
    <div className="mt-1 space-y-1">
      <Link
        to="/client-leads"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center py-[10px] px-3 rounded-lg transition-all pl-10 ${
          isActive("/client-leads")
            ? "bg-[#00c0ff]/10 text-[#00c0ff] dark:bg-[#00c0ff]/20"
            : "text-[#64748b] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <UserPlus className="size-5 flex-shrink-0" />
        <span className="ml-3 text-sm font-medium">Client Leads</span>
      </Link>
      <Link
        to="/premium"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center py-[10px] px-3 rounded-lg transition-all pl-10 ${
          isActive("/premium")
            ? "bg-[#00c0ff]/10 text-[#00c0ff] dark:bg-[#00c0ff]/20"
            : "text-[#64748b] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <Crown className="size-5 flex-shrink-0" />
        <span className="ml-3 text-sm font-medium">Mantra Premium</span>
      </Link>
      <Link
        to="/grow"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center py-[10px] px-3 rounded-lg transition-all pl-10 ${
          isActive("/grow")
            ? "bg-[#00c0ff]/10 text-[#00c0ff] dark:bg-[#00c0ff]/20"
            : "text-[#64748b] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <Megaphone className="size-5 flex-shrink-0" />
        <span className="ml-3 text-sm font-medium">Marketing</span>
      </Link>
      <Link
        to="/refer-earn"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center py-[10px] px-3 rounded-lg transition-all pl-10 ${
          isActive("/refer-earn")
            ? "bg-[#00c0ff]/10 text-[#00c0ff] dark:bg-[#00c0ff]/20"
            : "text-[#64748b] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <Gift className="size-5 flex-shrink-0" />
        <span className="ml-3 text-sm font-medium">Refer & Earn</span>
      </Link>
    </div>
  )}
</div>
```

This is a normal nav item — no popup, no CTA, no upgrade prompt. It navigates directly to the sub-pages.

---

## FIX 3 — EHR mode: Replace Mantra Premium CTA card/button with a plain text button

In the Full EHR sidebar, the Mantra Premium section is now the expandable dropdown above (Fix 2 applies to Full EHR too since `!isTranscriberOnly` covers both Provider and EHR).

**Wait** — Provider and EHR currently share the same `!isTranscriberOnly` branch. To differentiate:

Add a third plan mode value. In `src/contexts/PlanModeContext.tsx`, the current type is:
```ts
type PlanMode = "full-ehr" | "transcriber-only";
```

Change to:
```ts
type PlanMode = "full-ehr" | "transcriber-only" | "provider";
```

Then in `Layout.tsx`, derive two booleans:
```tsx
const isTranscriberOnly = planMode === "transcriber-only";
const isProviderMode = planMode === "provider" || planMode === "full-ehr"; // treat full-ehr same as provider for sidebar for now
```

**Simpler approach** (no context change needed): Since `GetStarted.tsx` already sets `setPlanMode("full-ehr")` for both Provider and Full EHR modes, use `location` state or a separate localStorage flag to tell the sidebar which sub-mode the user is in. But for now, the simplest fix that satisfies the requirements:

**Both Full EHR and Provider use the same `!isTranscriberOnly` sidebar** → both get the full Mantra Premium expandable dropdown (Fix 2). This is correct because the screenshot shows it working for Full EHR mode too — the user just sees a functional dropdown.

For EHR and AI Scribe, if you want to differentiate later, add a `signupMode` to localStorage alongside `mantra_logged_in` in `OTPVerify.tsx`:

```tsx
// In OTPVerify.tsx handleVerify, before navigate:
localStorage.setItem("mantra_logged_in", "true");
localStorage.setItem("mantra_signup_mode", signupMode); // "provider" | "full-ehr" | "ai-scribe"
```

Then in `Layout.tsx`:
```tsx
const signupMode = localStorage.getItem("mantra_signup_mode") ?? "full-ehr";
const isProviderMode = signupMode === "provider";
```

And use `isProviderMode` to control whether the Mantra Premium dropdown is the full expandable nav (provider) or the plain text button (EHR/AI Scribe).

---

## FIX 4 — EHR and AI Scribe: Mantra Premium = plain text link, not a banner card

For non-provider modes, replace the Mantra Premium CTA card with a minimal plain text button in the nav:

```tsx
{/* Mantra Premium — text link only for EHR / AI Scribe */}
{!isProviderMode && !shouldShowCollapsed() && (
  <button
    onClick={() => setShowPremiumUpgradePopup(true)}
    className="flex items-center gap-3 py-[10px] px-3 rounded-xl text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all w-full text-left"
  >
    <Crown className="size-5 flex-shrink-0" />
    <span className="text-sm font-medium">Mantra Premium</span>
  </button>
)}

{/* Collapsed state */}
{!isProviderMode && shouldShowCollapsed() && (
  <button
    onClick={() => setShowPremiumUpgradePopup(true)}
    className="flex items-center justify-center py-[10px] px-3 rounded-xl text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full"
    title="Mantra Premium"
  >
    <Crown className="size-5" />
  </button>
)}
```

This is a plain nav-style item — same height and padding as every other nav item, just text + icon, no card background, no border, no gradient, no arrow. Clicking opens the upgrade popup.

---

## SUMMARY OF ALL CHANGES

| Location | What changes |
|---|---|
| AI Scribe sidebar | Delete the entire dark `bg-[#043570]` "Unlock Full EHR" upgrade card with Upgrade button |
| Provider sidebar | Restore Mantra Premium as a full expandable dropdown with 4 links (Client Leads, Mantra Premium, Marketing, Refer & Earn) — same as old Grow section, just renamed |
| EHR sidebar | Mantra Premium is a plain text nav button (Crown icon + label) that opens the upgrade popup — no card, no banner, no border |
| AI Scribe sidebar | Mantra Premium is the same plain text nav button as EHR |
| `OTPVerify.tsx` | Add `localStorage.setItem("mantra_signup_mode", signupMode)` before navigate |
| `Layout.tsx` | Add `const signupMode = localStorage.getItem("mantra_signup_mode") ?? "full-ehr"` and `const isProviderMode = signupMode === "provider"` |