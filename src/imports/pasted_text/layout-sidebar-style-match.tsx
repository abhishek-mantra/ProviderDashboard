Looking at the two images, here are the differences:

1. **Background** — AI Scribe has dark purple gradient, EHR has white
2. **Active item** — AI Scribe uses `bg-white/20` (subtle white tint), EHR uses bright `#00c0ff` cyan pill
3. **Inactive text** — AI Scribe is `text-white/70`, EHR is `text-[#64748b]` gray
4. **Icons** — AI Scribe has cyan accent icons + left bars on some items, EHR has plain gray icons
5. **Hover** — AI Scribe `hover:bg-white/10`, EHR `hover:bg-gray-50`

---

# Fix: Make AI Scribe Sidebar Identical to EHR Sidebar

## FILE: `src/components/Layout.tsx`

---

## STEP 1 — Remove the purple gradient from `<aside>`

Find:
```tsx
} md:left-0 ${isTranscriberOnly
  ? 'bg-gradient-to-b from-[#2d2080] via-[#3b2a9e] to-[#1e1560]'
  : 'bg-white dark:bg-gray-800'
}`}>
```

Replace with:
```tsx
} md:left-0 bg-white dark:bg-gray-800`}>
```

---

## STEP 2 — Remove the border color conditional

Find:
```tsx
<aside className={`w-[280px] ${shouldShowCollapsed() ? 'md:w-[64px]' : 'md:w-[256px]'} border-r ${isTranscriberOnly ? 'border-white/10' : 'border-gray-200 dark:border-gray-700'} flex flex-col fixed
```

Replace with:
```tsx
<aside className={`w-[280px] ${shouldShowCollapsed() ? 'md:w-[64px]' : 'md:w-[256px]'} border-r border-gray-200 dark:border-gray-700 flex flex-col fixed
```

---

## STEP 3 — Logo area: remove `isTranscriberOnly` color conditionals

Find:
```tsx
<Menu className={`size-5 ${isTranscriberOnly ? 'text-white/70' : 'text-gray-600 dark:text-gray-300'}`} />
```
Replace with:
```tsx
<Menu className="size-5 text-gray-600 dark:text-gray-300" />
```

Both occurrences of the Menu icon (collapsed and expanded states). Then find:
```tsx
<span className={`font-semibold whitespace-nowrap ${isTranscriberOnly ? 'text-white' : 'text-gray-900 dark:text-white'}`}>MantraCare</span>
```
Replace with:
```tsx
<span className="font-semibold whitespace-nowrap text-gray-900 dark:text-white">MantraCare</span>
```

Also update both hamburger button hover classes:
```tsx
className={`hidden md:block rounded-lg p-1 transition-colors ${isTranscriberOnly ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
```
Replace both with:
```tsx
className="hidden md:block rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
```

---

## STEP 4 — Configure Menu banner: remove `isTranscriberOnly` conditional

Find:
```tsx
{isConfigureMenuMode && (
  <div className={`mx-3 mb-2 px-3 py-2 rounded-xl flex items-center justify-between ${
    isTranscriberOnly ? 'bg-white/10' : 'bg-[#00c0ff]/10'
  }`}>
    <span className={`text-xs font-semibold ${
      isTranscriberOnly ? 'text-white/80' : 'text-[#00c0ff]'
    }`}>
```
Replace with:
```tsx
{isConfigureMenuMode && (
  <div className="mx-3 mb-2 px-3 py-2 rounded-xl flex items-center justify-between bg-[#00c0ff]/10">
    <span className="text-xs font-semibold text-[#00c0ff]">
```

And the Done button inside it:
```tsx
className={`text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
  isTranscriberOnly
    ? 'bg-white/20 text-white hover:bg-white/30'
    : 'bg-[#00c0ff] text-white hover:bg-[#00a8e0]'
}`}
```
Replace with:
```tsx
className="text-xs font-bold px-2 py-1 rounded-lg transition-colors bg-[#00c0ff] text-white hover:bg-[#00a8e0]"
```

---

## STEP 5 — Update `renderTranscriberItem` to use EHR styling

In the `renderTranscriberItem` switch function, every nav item currently uses white/purple classes. Replace all active/inactive class strings to match EHR exactly:

**For every `case` in `renderTranscriberItem`**, change:

```tsx
// Active class — change FROM:
"bg-white/20 text-white shadow-md backdrop-blur-sm"
// TO:
"bg-[#00c0ff] text-white shadow-md"

// Inactive class — change FROM:
"text-white/70 hover:bg-white/10 hover:text-white"
// TO:
"text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
```

Also in the `case 'ai-transcriber'` and `case 'session-notes'` and `case 'prescriptions'`, **remove the cyan left accent bar and cyan icon color** — those were AI-Scribe-only indicators. Delete these lines from each:

```tsx
// DELETE from ai-transcriber case:
{!shouldShowCollapsed() && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c0ff] rounded-r-full" />}
// and remove: className={`size-5 flex-shrink-0 ${isActive("/ai-transcriber") ? "" : "text-[#00c0ff]"}`}
// replace icon className with just: className="size-5 flex-shrink-0"

// DELETE from session-notes case:
{!shouldShowCollapsed() && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c0ff]/60 rounded-r-full" />}
// replace icon className with just: className="size-5 flex-shrink-0"

// DELETE from prescriptions case:
{!shouldShowCollapsed() && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c0ff]/60 rounded-r-full" />}
// replace icon className with just: className="size-5 flex-shrink-0"
```

---

## STEP 6 — Update `renderSettingsItem` to remove `isTranscriber` branching

Since both modes now look identical, simplify `renderSettingsItem`. It currently takes `isTranscriber: boolean` and forks styling. Remove all forks:

```tsx
const renderSettingsItem = (_isTranscriber: boolean) => (
  <div className="relative" ref={settingsMenuRef}>
    <div className="flex items-center group">
      <Link
        to="/settings/availability"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex-1 flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : ''} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
          isActive("/settings")
            ? "bg-[#00c0ff] text-white shadow-md"
            : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
        title={shouldShowCollapsed() ? "Settings" : undefined}
      >
        <div className="flex items-center flex-1">
          <Settings className="size-5 flex-shrink-0" />
          <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>
            Settings
          </span>
        </div>
      </Link>
      {!shouldShowCollapsed() && (
        <button
          onClick={(e) => { e.stopPropagation(); setShowSettingsMenu(prev => !prev); }}
          className={`absolute right-2 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center rounded-md transition-all ${
            showSettingsMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } hover:bg-gray-100 dark:hover:bg-gray-700 text-[#64748b] dark:text-gray-400`}
          title="Menu options"
        >
          <span className="text-base font-bold leading-none tracking-tighter select-none">···</span>
        </button>
      )}
    </div>
    {showSettingsMenu && !shouldShowCollapsed() && (
      <div className="absolute bottom-full left-0 right-0 mb-1 rounded-xl shadow-lg border overflow-hidden z-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <button
          onClick={() => { setIsConfigureMenuMode(true); setShowSettingsMenu(false); }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Menu className="size-4 flex-shrink-0" />
          Configure Menu
        </button>
      </div>
    )}
  </div>
);
```

---

## STEP 7 — Bottom section: remove `isTranscriberOnly` styling forks

**"Elevate with Mantra Provider" button:**
```tsx
// Find:
className={`flex items-center gap-3 py-[10px] px-3 rounded-xl transition-all w-full text-left ${
  isTranscriberOnly
    ? 'text-white/70 hover:bg-white/10 hover:text-white'
    : 'text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
}`}
// Replace with:
className="flex items-center gap-3 py-[10px] px-3 rounded-xl transition-all w-full text-left text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"

// Same for collapsed state button:
className="flex items-center justify-center py-[10px] px-3 rounded-xl w-full text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
```

**User Profile button:**
```tsx
// Find:
className={`w-full flex items-center ${shouldShowCollapsed() ? 'justify-center' : ''} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
  isTranscriberOnly
    ? 'text-white/70 hover:bg-white/10 hover:text-white'
    : 'text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
}`}
// Replace with:
className={`w-full flex items-center ${shouldShowCollapsed() ? 'justify-center' : ''} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700`}
```

**Profile popup card:**
```tsx
// Find:
className={`absolute bottom-full left-3 right-3 mb-2 rounded-xl shadow-lg border overflow-hidden ${
  isTranscriberOnly
    ? 'bg-[#2d2080] border-white/20'
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
}`}
// Replace with:
className="absolute bottom-full left-3 right-3 mb-2 rounded-xl shadow-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
```

**All text/border inside the popup card** — remove every `isTranscriberOnly` ternary and use the EHR (non-transcriber) value from each:

```tsx
// Header border: border-white/10 → border-gray-100 dark:border-gray-700
// Name text: text-white → text-gray-900 dark:text-white  
// Email text: text-white/60 → text-[#64748B]
// Profile link hover: hover:bg-white/10 → hover:bg-gray-50 dark:hover:bg-gray-700
// Profile link border: border-white/10 → border-gray-200 dark:border-gray-700
// User icon: text-white/60 → text-gray-600 dark:text-gray-400
// User text: text-white → text-gray-700 dark:text-gray-300
// Logout hover: hover:bg-white/10 → hover:bg-gray-50 dark:hover:bg-gray-700
```

---

## STEP 8 — Nav `<nav>` render loop: remove `isTranscriber` ring color fork

Find:
```tsx
const ringClass = isTranscriber ? 'ring-white/30' : 'ring-[#00c0ff]/40';
const hideButtonClass = isTranscriber
  ? 'bg-white/10 hover:bg-white/20 text-white/70'
  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#64748b]';
```
Replace with:
```tsx
const ringClass = 'ring-[#00c0ff]/40';
const hideButtonClass = 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#64748b]';
```

And the Show More section inside the nav loop — remove the `isTranscriber` fork, use EHR styling throughout:
```tsx
// trigger button: use gray classes only
className="w-full flex items-center justify-between px-4 py-2.5 transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"

// divider:
className="border-t border-gray-100 dark:border-gray-700 mb-1"

// hidden item buttons:
className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"

// "tap to show" label:
className="text-[10px] font-medium text-gray-400"
```

Also remove the entire **AI Scribe-only "Show more" block** (the one that shows the locked Messages/Appointments/Billing items with `setShowPremiumUpgradePopup`) — this was the purple-era version. In EHR-style AI Scribe, these locked items should use the existing **Show More dropdown** that was already in the original AI Scribe code, rendered via buttons that call `setShowPremiumUpgradePopup(true)` with the same gray styling as EHR Show More items.

Replace that entire special block with:
```tsx
{/* AI Scribe locked items — shown in Show More when no user-hidden items exist */}
{isTranscriberOnly && !isConfigureMenuMode && hiddenFromOrder(order).length === 0 && !shouldShowCollapsed() && (
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
        {[
          { icon: <MessageSquare className="size-5 flex-shrink-0 text-gray-500" />, label: 'Messages' },
          { icon: <Calendar className="size-5 flex-shrink-0 text-gray-500" />,      label: 'Appointments' },
          { icon: <CreditCard className="size-5 flex-shrink-0 text-gray-500" />,    label: 'Billing' },
        ].map(({ icon, label }) => (
          <button key={label} onClick={() => setShowPremiumUpgradePopup(true)}
            className="w-full flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {icon}
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{label}</span>
          </button>
        ))}
        <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center px-3 py-2 rounded-lg transition-all ${
            isActive("/tools") ? "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          <Wrench className="size-5 flex-shrink-0 text-gray-500" />
          <span className="ml-3 text-sm font-medium">Other Tools</span>
        </Link>
      </>
    )}
  </div>
)}
```

---

## SUMMARY

| Element | Before (AI Scribe) | After (matches EHR) |
|---|---|---|
| Sidebar bg | Purple gradient | `bg-white dark:bg-gray-800` |
| Active item | `bg-white/20 backdrop-blur-sm` | `bg-[#00c0ff] text-white shadow-md` |
| Inactive text | `text-white/70` | `text-[#64748b] dark:text-gray-300` |
| Hover | `hover:bg-white/10` | `hover:bg-gray-50 dark:hover:bg-gray-700` |
| Cyan left bars | Present | Removed |
| Cyan icon colors | Present | Removed (plain gray icons) |
| Profile popup | Dark purple bg | White bg |
| Settings `···` dropdown | Dark purple bg | White bg |
| Show More (locked items) | White text on purple | Gray text on white |