# Fix: Sidebar Label & Position Changes

## FILE: `src/components/Layout.tsx`

---

## FIX 1 — Provider Mode: Rename + Move above Tools

In the `!isTranscriberOnly` nav section (the Full EHR/Provider nav), the Mantra Premium expandable dropdown currently sits **outside** the `<nav>` block, in the bottom `px-3 pb-1` div. For **Provider mode only**, move it **inside the `<nav>` block, directly above the Tools section**.

### Step 1 — Remove the Provider branch from the bottom `px-3 pb-1` block

Find this wrapper at the bottom of the sidebar (outside `<nav>`):

```tsx
{/* Mantra Premium — positioned directly above provider name */}
<div className="px-3 pb-1">
  {isProviderMode && !isTranscriberOnly ? (
    /* Provider Mode — expandable dropdown */
    <div>
      ...
    </div>
  ) : (
    /* EHR / AI Scribe Mode — plain text nav button */
    <>
      ...
    </>
  )}
</div>
```

**Replace the entire block** with only the EHR/AI Scribe branch (Provider is now handled inside `<nav>`):

```tsx
{/* Elevate with Mantra Provider — positioned directly above provider name (EHR & AI Scribe only) */}
{!isProviderMode && (
  <div className="px-3 pb-1">
    {!shouldShowCollapsed() ? (
      <button
        onClick={() => setShowPremiumUpgradePopup(true)}
        className="flex items-center gap-3 py-[10px] px-3 rounded-xl text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all w-full text-left"
      >
        <Crown className="size-5 flex-shrink-0" />
        <span className="text-sm font-medium">Elevate with Mantra Provider</span>
      </button>
    ) : (
      <button
        onClick={() => setShowPremiumUpgradePopup(true)}
        className="flex items-center justify-center py-[10px] px-3 rounded-xl text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full"
        title="Elevate with Mantra Provider"
      >
        <Crown className="size-5" />
      </button>
    )}
  </div>
)}
```

### Step 2 — Inside `<nav>`, in the `!isTranscriberOnly` branch, insert "For Mantra Provider" dropdown directly above the Tools section

Find this comment and block inside the Full EHR nav:

```tsx
{/* Tools Section */}
<div>
  <button
    onClick={() => {
      setIsToolsExpanded(!isToolsExpanded);
```

**Insert the following block immediately above it:**

```tsx
{/* For Mantra Provider — expandable dropdown (Provider mode only, above Tools) */}
{isProviderMode && (
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
      title={shouldShowCollapsed() ? "For Mantra Provider" : undefined}
    >
      <div className="flex items-center">
        <Crown className="size-5 flex-shrink-0" />
        <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>
          For Mantra Provider
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
)}
```

---

## FIX 2 — AI Scribe popup: Add "EHR included" messaging

Find the `MantraPremiumUpgradePopup` component. Update the subtitle paragraph and add an EHR callout banner inside the popup.

### Step 1 — Update subtitle copy

Find:
```tsx
<p className="text-sm text-[#64748B] dark:text-gray-400 mb-5">
  Switch to the Provider plan to access premium growth features for your practice.
</p>
```

Replace with:
```tsx
<p className="text-sm text-[#64748B] dark:text-gray-400 mb-3">
  Switch to the Provider plan to access premium growth features for your practice.
</p>

{/* EHR Included Banner — shown in AI Scribe mode */}
{isTranscriberOnly && (
  <div className="flex items-start gap-2 bg-[#E3F2FD] dark:bg-[#043570]/30 rounded-xl px-3 py-2.5 mb-5">
    <CheckSquare className="size-4 text-[#043570] dark:text-[#00c0ff] flex-shrink-0 mt-0.5" />
    <p className="text-xs font-medium text-[#043570] dark:text-[#93C5FD]">
      Full EHR access is included — Appointments, Billing, Messages and more come with the Provider plan.
    </p>
  </div>
)}
{!isTranscriberOnly && <div className="mb-5" />}
```

### Step 2 — Pass `isTranscriberOnly` into the popup

The `MantraPremiumUpgradePopup` component needs to know the current plan mode. Update its props interface and call site:

**Props interface** — change:
```tsx
function MantraPremiumUpgradePopup({ onClose, onManagePlans }: {
  onClose: () => void;
  onManagePlans: () => void;
})
```
to:
```tsx
function MantraPremiumUpgradePopup({ onClose, onManagePlans, isTranscriberOnly }: {
  onClose: () => void;
  onManagePlans: () => void;
  isTranscriberOnly: boolean;
})
```

**Call site** — find:
```tsx
<MantraPremiumUpgradePopup
  onClose={() => setShowPremiumUpgradePopup(false)}
  onManagePlans={handleManagePlans}
/>
```
Replace with:
```tsx
<MantraPremiumUpgradePopup
  onClose={() => setShowPremiumUpgradePopup(false)}
  onManagePlans={handleManagePlans}
  isTranscriberOnly={isTranscriberOnly}
/>
```

Also add `CheckSquare` to the icon imports inside the popup's feature list map if not already destructured at the top level — it is already imported in the file so no new import needed.

---

## SUMMARY

| Mode | Label | Position | On Click |
|---|---|---|---|
| Provider | **For Mantra Provider** | Inside nav, **above Tools** | Expandable dropdown (4 sub-links) |
| Full EHR | **Elevate with Mantra Provider** | Above provider name (bottom) | Opens upgrade popup |
| AI Scribe | **Elevate with Mantra Provider** | Above provider name (bottom) | Opens upgrade popup **with EHR-included banner** |