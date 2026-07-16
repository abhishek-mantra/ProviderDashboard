Looking at the images, I can see a dark purple/gradient sidebar with icon+text nav items, a "Show all" expandable section, and a gear/settings icon. Let me write a comprehensive prompt for these changes.

---

# Fix: Sidebar Styling + Configurable Menu System

## FILE: `src/components/Layout.tsx`

---

## PART 1 — AI Scribe Sidebar: Match Purple Gradient Visual Style

In the `isTranscriberOnly` branch of `<nav>`, apply the following visual changes to match the dark purple gradient sidebar aesthetic shown in the reference images. **No functionality changes — only styling.**

### Step 1 — Sidebar background and border

Find the `<aside>` element:
```tsx
<aside className={`w-[280px] ${shouldShowCollapsed() ? 'md:w-[64px]' : 'md:w-[256px]'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed top-0 bottom-0 z-50 transition-all duration-300 ${
  isMobileMenuOpen ? 'left-0' : '-left-[280px]'
} md:left-0`}>
```

Replace with:
```tsx
<aside className={`w-[280px] ${shouldShowCollapsed() ? 'md:w-[64px]' : 'md:w-[256px]'} border-r border-gray-200 dark:border-gray-700 flex flex-col fixed top-0 bottom-0 z-50 transition-all duration-300 ${
  isMobileMenuOpen ? 'left-0' : '-left-[280px]'
} md:left-0 ${isTranscriberOnly ? 'bg-gradient-to-b from-[#2d2080] via-[#3b2a9e] to-[#1e1560]' : 'bg-white dark:bg-gray-800'}`}>
```

### Step 2 — AI Scribe nav item base style

In the `isTranscriberOnly` nav section, for every `<Link>` and `<button>` nav item, replace the inactive class:
```
"text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
```
with:
```
"text-white/70 hover:bg-white/10 hover:text-white"
```

And replace the active class:
```
"bg-[#00c0ff] text-white shadow-md"
```
with:
```
"bg-white/20 text-white shadow-md backdrop-blur-sm"
```

### Step 3 — AI Scribe logo area text color

Inside the Logo block, when `isTranscriberOnly`, update text:
```
"font-semibold text-gray-900 dark:text-white whitespace-nowrap"
```
to:
```
"font-semibold text-white whitespace-nowrap"
```

And the hamburger Menu icon color from `text-gray-600 dark:text-gray-300` → `text-white/70`.

### Step 4 — AI Scribe cyan accent bar items (AI Transcriber, Session Notes, Prescriptions)

The left accent bar `bg-[#00c0ff]` and `bg-[#00c0ff]/60` stays the same — cyan pops nicely against the purple.

For these items' inactive icon color `text-[#00c0ff]` stays unchanged.

### Step 5 — Show More section in AI Scribe

The "Show more" button text and chevron:
```tsx
className="w-full flex items-center justify-between px-4 py-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
```
Replace with:
```tsx
className="w-full flex items-center justify-between px-4 py-2.5 text-white/50 hover:text-white/80 transition-colors"
```

The horizontal divider:
```tsx
className="border-t border-gray-100 dark:border-gray-700 mb-1"
```
Replace with:
```tsx
className={`border-t mb-1 ${isTranscriberOnly ? 'border-white/10' : 'border-gray-100 dark:border-gray-700'}`}
```

The Show More sub-items (Messages, Appointments, Billing, Other Tools) — replace their text color classes `text-gray-600 dark:text-gray-400` with `text-white/60` when `isTranscriberOnly`.

### Step 6 — "Elevate with Mantra Provider" button in AI Scribe

The bottom Crown button:
```
"text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
```
Replace with:
```tsx
isTranscriberOnly
  ? "text-white/70 hover:bg-white/10 hover:text-white"
  : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
```

### Step 7 — User Profile section in AI Scribe

The profile button:
```
"text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
```
Replace with:
```tsx
isTranscriberOnly
  ? "text-white/70 hover:bg-white/10 hover:text-white"
  : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
```

The profile popup card when `isTranscriberOnly`:
```
"bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
```
Replace with:
```tsx
isTranscriberOnly
  ? "bg-[#2d2080] border border-white/20 rounded-xl shadow-lg"
  : "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
```

---

## PART 2 — Settings Gear: Three-Dot Menu with "Configure Menu"

### Step 1 — Add state variables

Inside `Layout()`, add:
```tsx
const [showSettingsMenu, setShowSettingsMenu] = useState(false);
const [isConfigureMenuMode, setIsConfigureMenuMode] = useState(false);
const settingsMenuRef = useRef<HTMLDivElement>(null);
```

### Step 2 — Add click-outside handler for settings menu

Add inside the existing `useEffect` block (or create a new one):
```tsx
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
      setShowSettingsMenu(false);
    }
  };
  if (showSettingsMenu) {
    document.addEventListener("mousedown", handleClickOutside);
  }
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showSettingsMenu]);
```

### Step 3 — Replace the Settings nav item with a Settings + three-dot row

In **both** the `isTranscriberOnly` branch AND the `!isTranscriberOnly` branch, find the Settings nav item. Wrap it in a relative container and add the three-dot trigger:

**In AI Scribe (`isTranscriberOnly`) branch**, find:
```tsx
{/* Settings */}
<Link
  to="/settings/availability"
  ...
>
```

Replace the entire Settings `<Link>` with:
```tsx
{/* Settings row with three-dot menu */}
<div className="relative" ref={settingsMenuRef}>
  <div className="flex items-center group">
    <Link
      to="/settings/availability"
      onClick={() => setIsMobileMenuOpen(false)}
      className={`flex-1 flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
        isActive("/settings")
          ? isTranscriberOnly ? "bg-white/20 text-white shadow-md" : "bg-[#00c0ff] text-white shadow-md"
          : isTranscriberOnly ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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

    {/* Three-dot trigger — only visible on hover or when menu is open, hidden in collapsed state */}
    {!shouldShowCollapsed() && (
      <button
        onClick={(e) => { e.stopPropagation(); setShowSettingsMenu(!showSettingsMenu); }}
        className={`absolute right-2 size-6 flex items-center justify-center rounded-md transition-all ${
          showSettingsMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        } ${isTranscriberOnly ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#64748b] dark:text-gray-400'}`}
      >
        <span className="text-lg leading-none tracking-tighter">···</span>
      </button>
    )}
  </div>

  {/* Three-dot dropdown */}
  {showSettingsMenu && !shouldShowCollapsed() && (
    <div className={`absolute bottom-full left-0 right-0 mb-1 rounded-xl shadow-lg border overflow-hidden z-50 ${
      isTranscriberOnly
        ? 'bg-[#2d2080] border-white/20'
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <button
        onClick={() => {
          setIsConfigureMenuMode(true);
          setShowSettingsMenu(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
          isTranscriberOnly
            ? 'text-white/80 hover:bg-white/10'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        <Menu className="size-4 flex-shrink-0" />
        Configure Menu
      </button>
    </div>
  )}
</div>
```

Do the same replacement in the `!isTranscriberOnly` branch where `renderNavItem("/settings/availability", ...)` is called — replace that `renderNavItem` call with the same Settings+three-dot block above (reusing the same JSX, it already handles both modes via `isTranscriberOnly` ternaries).

---

## PART 3 — Configure Menu Mode: Drag-to-Reorder + Per-Item Hide/Show

### Step 1 — Add hidden items state and nav item order state

```tsx
// All nav item keys per mode
const allTranscriberItems = ['home', 'clients', 'ai-transcriber', 'session-notes', 'prescriptions', 'settings'];
const allEHRItems = ['home', 'clients', 'billing', 'messages', 'appointments', 'for-mantra-provider', 'tools', 'settings'];

const [transcriberItemOrder, setTranscriberItemOrder] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_transcriber_order') || 'null') ?? allTranscriberItems
);
const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null') ?? allEHRItems
);
const [hiddenItems, setHiddenItems] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_hidden_items') || '[]')
);
const [draggedItem, setDraggedItem] = useState<string | null>(null);
const [dragOverItem, setDragOverItem] = useState<string | null>(null);
```

### Step 2 — Persist changes to localStorage

```tsx
useEffect(() => {
  localStorage.setItem('sidebar_transcriber_order', JSON.stringify(transcriberItemOrder));
}, [transcriberItemOrder]);

useEffect(() => {
  localStorage.setItem('sidebar_ehr_order', JSON.stringify(ehrItemOrder));
}, [ehrItemOrder]);

useEffect(() => {
  localStorage.setItem('sidebar_hidden_items', JSON.stringify(hiddenItems));
}, [hiddenItems]);
```

### Step 3 — Configure Menu mode banner + Done button

Directly inside `<aside>`, after the Logo block, add:

```tsx
{/* Configure Menu mode banner */}
{isConfigureMenuMode && (
  <div className={`mx-3 mb-2 px-3 py-2 rounded-xl flex items-center justify-between ${
    isTranscriberOnly ? 'bg-white/10' : 'bg-[#00c0ff]/10'
  }`}>
    <span className={`text-xs font-semibold ${isTranscriberOnly ? 'text-white/80' : 'text-[#00c0ff]'}`}>
      Drag to reorder · ··· to hide
    </span>
    <button
      onClick={() => setIsConfigureMenuMode(false)}
      className={`text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
        isTranscriberOnly
          ? 'bg-white/20 text-white hover:bg-white/30'
          : 'bg-[#00c0ff] text-white hover:bg-[#00a8e0]'
      }`}
    >
      Done
    </button>
  </div>
)}
```

### Step 4 — Helper functions for drag-and-drop and hide/show

```tsx
const handleDragStart = (key: string) => setDraggedItem(key);
const handleDragOver = (e: React.DragEvent, key: string) => {
  e.preventDefault();
  setDragOverItem(key);
};
const handleDrop = (isTranscriber: boolean) => {
  if (!draggedItem || !dragOverItem || draggedItem === dragOverItem) return;
  const setter = isTranscriber ? setTranscriberItemOrder : setEHRItemOrder;
  const order = isTranscriber ? [...transcriberItemOrder] : [...ehrItemOrder];
  const fromIdx = order.indexOf(draggedItem);
  const toIdx = order.indexOf(dragOverItem);
  order.splice(fromIdx, 1);
  order.splice(toIdx, 0, draggedItem);
  setter(order);
  setDraggedItem(null);
  setDragOverItem(null);
};

const toggleHideItem = (key: string) => {
  setHiddenItems(prev =>
    prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
  );
};

const visibleItems = (order: string[]) => order.filter(k => !hiddenItems.includes(k));
const hiddenInOrder = (order: string[]) => order.filter(k => hiddenItems.includes(k));
```

### Step 5 — Wrap each nav item with drag handles and three-dot hide button

For every nav item in **both** branches, wrap with a `<div>` that handles drag when in Configure Menu mode:

```tsx
{/* Example wrapper — apply to every nav item */}
<div
  key={itemKey}
  draggable={isConfigureMenuMode}
  onDragStart={() => handleDragStart(itemKey)}
  onDragOver={(e) => handleDragOver(e, itemKey)}
  onDrop={() => handleDrop(isTranscriberOnly)}
  className={`relative group ${isConfigureMenuMode ? 'cursor-grab active:cursor-grabbing' : ''} ${
    dragOverItem === itemKey && draggedItem !== itemKey ? 'opacity-50' : ''
  }`}
>
  {/* The existing nav item Link/button goes here, unchanged */}
  { /* existing JSX */ }

  {/* Three-dot hide button — only in configure mode */}
  {isConfigureMenuMode && itemKey !== 'settings' && (
    <button
      onClick={() => toggleHideItem(itemKey)}
      className={`absolute right-2 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center rounded-md z-10 ${
        isTranscriberOnly
          ? 'bg-white/10 hover:bg-white/20 text-white/70'
          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#64748b]'
      }`}
      title="Hide item"
    >
      <X className="size-3.5" />
    </button>
  )}
</div>
```

Only render items that are in `visibleItems(order)` when **not** in configure mode. In configure mode, show all items (so user can un-hide them).

### Step 6 — "Show More" section for hidden items (all modes)

At the bottom of the `<nav>` block, after all nav items and before `</nav>`, add:

```tsx
{/* Show More — hidden items appear here */}
{hiddenInOrder(isTranscriberOnly ? transcriberItemOrder : ehrItemOrder).length > 0 && (
  <div className="mt-2">
    <button
      onClick={() => setIsShowMoreExpanded(!isShowMoreExpanded)}
      className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${
        isTranscriberOnly
          ? 'text-white/50 hover:text-white/80'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      }`}
    >
      <span className="text-[13px] font-semibold">Show more</span>
      <ChevronDown className={`size-4 transition-transform duration-200 ${isShowMoreExpanded ? 'rotate-180' : ''}`} />
    </button>

    {isShowMoreExpanded && (
      <div className={`border-t mb-1 ${isTranscriberOnly ? 'border-white/10' : 'border-gray-100 dark:border-gray-700'}`}>
        {hiddenInOrder(isTranscriberOnly ? transcriberItemOrder : ehrItemOrder).map(key => (
          <div key={key} className="flex items-center group">
            {/* Render the nav item for this key in a minimal style */}
            <button
              onClick={() => toggleHideItem(key)}
              className={`flex-1 flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                isTranscriberOnly
                  ? 'text-white/60 hover:bg-white/10 hover:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {/* Map key to icon and label */}
              {key === 'home' && <><Home className="size-5 flex-shrink-0" /><span className="ml-3">Home</span></>}
              {key === 'clients' && <><Users className="size-5 flex-shrink-0" /><span className="ml-3">Clients</span></>}
              {key === 'billing' && <><CreditCard className="size-5 flex-shrink-0" /><span className="ml-3">Billing</span></>}
              {key === 'messages' && <><MessageSquare className="size-5 flex-shrink-0" /><span className="ml-3">Messages</span></>}
              {key === 'appointments' && <><Calendar className="size-5 flex-shrink-0" /><span className="ml-3">Appointments</span></>}
              {key === 'tools' && <><Wrench className="size-5 flex-shrink-0" /><span className="ml-3">Tools</span></>}
              {key === 'ai-transcriber' && <><Mic className="size-5 flex-shrink-0" /><span className="ml-3">AI Transcriber</span></>}
              {key === 'session-notes' && <><StickyNote className="size-5 flex-shrink-0" /><span className="ml-3">Session Notes</span></>}
              {key === 'prescriptions' && <><Pill className="size-5 flex-shrink-0" /><span className="ml-3">Prescriptions</span></>}
              {key === 'for-mantra-provider' && <><Crown className="size-5 flex-shrink-0" /><span className="ml-3">For Mantra Provider</span></>}
              <span className="ml-auto text-xs opacity-60">Tap to show</span>
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}
```

---

## SUMMARY

| Change | Scope | Details |
|---|---|---|
| Purple gradient sidebar | AI Scribe only | `bg-gradient-to-b from-[#2d2080] via-[#3b2a9e] to-[#1e1560]`, white/70 text, white/20 active bg |
| Three-dot on Settings | All modes | Hover-reveal `···` button → dropdown with "Configure Menu" option |
| Configure Menu mode | All modes | Banner appears, drag-to-reorder enabled, `×` button on each item to hide |
| Hidden items → Show More | All modes | Items hidden via `×` accumulate under a "Show more" collapsible at nav bottom |
| Drag-to-reorder | All modes | HTML5 drag-and-drop, order persisted in `localStorage` |
| Hide/Show persisted | All modes | Hidden list persisted in `localStorage.sidebar_hidden_items` |