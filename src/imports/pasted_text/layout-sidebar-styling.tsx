You're right — everything should stay in `Layout.tsx`. Here's the corrected, self-contained prompt:

---

# Fix: Sidebar Styling + Configurable Menu System

## FILE: `src/components/Layout.tsx` only — no new files

---

## PART 1 — AI Scribe Sidebar: Purple Gradient Style

### Step 1 — Sidebar background

Find the `<aside>` opening tag and change the `bg-white dark:bg-gray-800` class to be conditional:

```tsx
<aside className={`w-[280px] ${shouldShowCollapsed() ? 'md:w-[64px]' : 'md:w-[256px]'} border-r border-gray-200 dark:border-gray-700 flex flex-col fixed top-0 bottom-0 z-50 transition-all duration-300 ${
  isMobileMenuOpen ? 'left-0' : '-left-[280px]'
} md:left-0 ${isTranscriberOnly
  ? 'bg-gradient-to-b from-[#2d2080] via-[#3b2a9e] to-[#1e1560] border-white/10'
  : 'bg-white dark:bg-gray-800'
}`}>
```

### Step 2 — Logo area colors in AI Scribe

Find the logo `<div className="h-[72px] ...">` block. The hamburger Menu icon and brand text already use `dark:` variants — add a conditional for `isTranscriberOnly`:

```tsx
<Menu className={`size-5 ${isTranscriberOnly ? 'text-white/70' : 'text-gray-600 dark:text-gray-300'}`} />
```

```tsx
<span className={`font-semibold whitespace-nowrap ${isTranscriberOnly ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
  MantraCare
</span>
```

### Step 3 — Nav item colors in AI Scribe

Everywhere inside the `isTranscriberOnly` nav branch, make the following class substitutions:

| Find | Replace with |
|---|---|
| `"text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"` | `"text-white/70 hover:bg-white/10 hover:text-white"` |
| `"bg-[#00c0ff] text-white shadow-md"` | `"bg-white/20 text-white shadow-md backdrop-blur-sm"` |
| `"text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"` | `"text-white/70 hover:bg-white/10 hover:text-white"` |

These substitutions apply to every `<Link>` and `<button>` nav item inside the `isTranscriberOnly` block only.

### Step 4 — Show More section in AI Scribe

```tsx
{/* Show More trigger button */}
className="w-full flex items-center justify-between px-4 py-2.5 text-white/50 hover:text-white/80 transition-colors"

{/* Divider */}
className="border-t border-white/10 mb-1"

{/* Sub-items (Messages, Appointments, Billing, Other Tools) */}
// Replace text-gray-600 dark:text-gray-400 with text-white/60
// Replace hover:bg-gray-50 dark:hover:bg-gray-700 with hover:bg-white/10
// Replace hover:text-gray-900 dark:hover:text-white with hover:text-white
```

### Step 5 — "Elevate with Mantra Provider" + User Profile bottom section in AI Scribe

```tsx
// Crown button and profile button — replace inactive classes:
isTranscriberOnly
  ? "text-white/70 hover:bg-white/10 hover:text-white"
  : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"

// Profile popup card:
isTranscriberOnly
  ? "bg-[#2d2080] border border-white/20 rounded-xl shadow-lg"
  : "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"

// Text inside popup card:
// Replace text-gray-900 dark:text-white → text-white
// Replace text-[#64748B] → text-white/60
// Replace hover:bg-gray-50 dark:hover:bg-gray-700 → hover:bg-white/10
// Replace border-gray-100 dark:border-gray-700 → border-white/10
// Replace border-gray-200 dark:border-gray-700 → border-white/10
```

---

## PART 2 — New State Variables (add inside `Layout()`)

Add all of these alongside the existing `useState` declarations:

```tsx
// Configure menu
const [showSettingsMenu, setShowSettingsMenu] = useState(false);
const [isConfigureMenuMode, setIsConfigureMenuMode] = useState(false);
const settingsMenuRef = useRef<HTMLDivElement>(null);

// Nav item ordering — one per mode, persisted
const defaultTranscriberOrder = ['home', 'clients', 'ai-transcriber', 'session-notes', 'prescriptions', 'settings'];
const defaultEHROrder = ['home', 'clients', 'billing', 'messages', 'appointments', 'for-mantra-provider', 'tools', 'settings'];

const [transcriberItemOrder, setTranscriberItemOrder] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_transcriber_order') || 'null') ?? defaultTranscriberOrder
);
const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null') ?? defaultEHROrder
);
const [hiddenItems, setHiddenItems] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_hidden_items') || '[]')
);
const [draggedItem, setDraggedItem] = useState<string | null>(null);
const [dragOverItem, setDragOverItem] = useState<string | null>(null);
```

---

## PART 3 — New useEffect Hooks (add alongside existing useEffects)

```tsx
// Persist sidebar order + hidden state
useEffect(() => {
  localStorage.setItem('sidebar_transcriber_order', JSON.stringify(transcriberItemOrder));
}, [transcriberItemOrder]);

useEffect(() => {
  localStorage.setItem('sidebar_ehr_order', JSON.stringify(ehrItemOrder));
}, [ehrItemOrder]);

useEffect(() => {
  localStorage.setItem('sidebar_hidden_items', JSON.stringify(hiddenItems));
}, [hiddenItems]);

// Close settings three-dot menu on outside click
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
      setShowSettingsMenu(false);
    }
  };
  if (showSettingsMenu) {
    document.addEventListener('mousedown', handleClickOutside);
  }
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [showSettingsMenu]);
```

---

## PART 4 — New Helper Functions (add alongside existing helpers like `isActive`, `shouldShowCollapsed`)

```tsx
// Drag and drop
const handleDragStart = (key: string) => setDraggedItem(key);

const handleDragOver = (e: React.DragEvent, key: string) => {
  e.preventDefault();
  setDragOverItem(key);
};

const handleDrop = (isTranscriber: boolean) => {
  if (!draggedItem || !dragOverItem || draggedItem === dragOverItem) return;
  const order = isTranscriber ? [...transcriberItemOrder] : [...ehrItemOrder];
  const setter = isTranscriber ? setTranscriberItemOrder : setEHRItemOrder;
  const fromIdx = order.indexOf(draggedItem);
  const toIdx = order.indexOf(dragOverItem);
  order.splice(fromIdx, 1);
  order.splice(toIdx, 0, draggedItem);
  setter(order);
  setDraggedItem(null);
  setDragOverItem(null);
};

// Hide/show
const toggleHideItem = (key: string) => {
  setHiddenItems(prev =>
    prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
  );
};

const visibleItems = (order: string[]) => order.filter(k => !hiddenItems.includes(k));
const hiddenFromOrder = (order: string[]) => order.filter(k => hiddenItems.includes(k));

// Map item key → icon and label (used by Show More and configure mode)
const navItemMeta: Record<string, { icon: React.ReactNode; label: string }> = {
  'home':               { icon: <Home className="size-5 flex-shrink-0" />,          label: 'Home' },
  'clients':            { icon: <Users className="size-5 flex-shrink-0" />,         label: 'Clients' },
  'billing':            { icon: <CreditCard className="size-5 flex-shrink-0" />,    label: 'Billing' },
  'messages':           { icon: <MessageSquare className="size-5 flex-shrink-0" />, label: 'Messages' },
  'appointments':       { icon: <Calendar className="size-5 flex-shrink-0" />,      label: 'Appointments' },
  'tools':              { icon: <Wrench className="size-5 flex-shrink-0" />,        label: 'Tools' },
  'for-mantra-provider':{ icon: <Crown className="size-5 flex-shrink-0" />,         label: 'For Mantra Provider' },
  'ai-transcriber':     { icon: <Mic className="size-5 flex-shrink-0" />,           label: 'AI Transcriber' },
  'session-notes':      { icon: <StickyNote className="size-5 flex-shrink-0" />,    label: 'Session Notes' },
  'prescriptions':      { icon: <Pill className="size-5 flex-shrink-0" />,          label: 'Prescriptions' },
  'settings':           { icon: <Settings className="size-5 flex-shrink-0" />,      label: 'Settings' },
};
```

---

## PART 5 — Configure Menu Banner (add inside `<aside>`, directly after the Logo block)

```tsx
{/* Configure Menu mode banner */}
{isConfigureMenuMode && (
  <div className={`mx-3 mb-2 px-3 py-2 rounded-xl flex items-center justify-between ${
    isTranscriberOnly ? 'bg-white/10' : 'bg-[#00c0ff]/10'
  }`}>
    <span className={`text-xs font-semibold ${
      isTranscriberOnly ? 'text-white/80' : 'text-[#00c0ff]'
    }`}>
      Drag to reorder · × to hide
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

---

## PART 6 — Wrap Every Nav Item with Drag + Hide Controls

For **every nav item** in both the `isTranscriberOnly` and `!isTranscriberOnly` branches, wrap the existing JSX like this. Use the correct `itemKey` string matching `navItemMeta` keys above (e.g. `'home'`, `'clients'`, etc.). Settings item is wrapped the same way but **never gets the hide `×` button**.

```tsx
{/* Template — repeat for each nav item with its own itemKey */}
{(isConfigureMenuMode || !hiddenItems.includes('home')) && (
  <div
    draggable={isConfigureMenuMode}
    onDragStart={() => handleDragStart('home')}
    onDragOver={(e) => handleDragOver(e, 'home')}
    onDrop={() => handleDrop(isTranscriberOnly)}
    className={`relative group ${isConfigureMenuMode ? 'cursor-grab active:cursor-grabbing' : ''} ${
      dragOverItem === 'home' && draggedItem !== 'home'
        ? isTranscriberOnly ? 'ring-1 ring-white/30 rounded-xl' : 'ring-1 ring-[#00c0ff]/40 rounded-xl'
        : ''
    }`}
  >
    {/* —— existing nav item Link/button JSX here, completely unchanged —— */}

    {/* Hide button — configure mode only, not on settings */}
    {isConfigureMenuMode && !shouldShowCollapsed() && (
      <button
        onClick={(e) => { e.stopPropagation(); toggleHideItem('home'); }}
        className={`absolute right-2 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center rounded-md z-10 transition-colors ${
          isTranscriberOnly
            ? 'bg-white/10 hover:bg-white/20 text-white/70'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#64748b]'
        }`}
        title="Hide from sidebar"
      >
        <X className="size-3" />
      </button>
    )}
  </div>
)}
```

Apply this wrapper to all items: `home`, `clients`, `billing`, `messages`, `appointments`, `for-mantra-provider`, `tools`, `ai-transcriber`, `session-notes`, `prescriptions`. For `settings`, wrap with drag but omit the hide button.

---

## PART 7 — Settings Item: Replace with Three-Dot Version

In **both** nav branches, remove the existing Settings `renderNavItem(...)` call (EHR) or Settings `<Link>` (AI Scribe) and replace with this single block that works for all modes. Place it inside the same drag wrapper from Part 6 (with key `'settings'`, no hide button):

```tsx
<div className="relative" ref={settingsMenuRef}>
  <div className="flex items-center group">
    {/* Settings link */}
    <Link
      to="/settings/availability"
      onClick={() => setIsMobileMenuOpen(false)}
      className={`flex-1 flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : ''} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
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

    {/* Three-dot button — hover-reveal, hidden in collapsed state */}
    {!shouldShowCollapsed() && (
      <button
        onClick={(e) => { e.stopPropagation(); setShowSettingsMenu(prev => !prev); }}
        className={`absolute right-2 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center rounded-md transition-all ${
          showSettingsMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        } ${
          isTranscriberOnly
            ? 'hover:bg-white/10 text-white/70'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#64748b] dark:text-gray-400'
        }`}
        title="Menu options"
      >
        <span className="text-base font-bold leading-none tracking-tighter select-none">···</span>
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
        onClick={() => { setIsConfigureMenuMode(true); setShowSettingsMenu(false); }}
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

---

## PART 8 — "Show More" for Hidden Items (add at bottom of `<nav>`, before `</nav>`)

```tsx
{/* Show More — hidden items (all modes) */}
{!isConfigureMenuMode && hiddenFromOrder(isTranscriberOnly ? transcriberItemOrder : ehrItemOrder).length > 0 && !shouldShowCollapsed() && (
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
      <>
        <div className={`border-t mb-1 ${isTranscriberOnly ? 'border-white/10' : 'border-gray-100 dark:border-gray-700'}`} />
        <div className="space-y-0">
          {hiddenFromOrder(isTranscriberOnly ? transcriberItemOrder : ehrItemOrder).map(key => {
            const meta = navItemMeta[key];
            if (!meta) return null;
            return (
              <button
                key={key}
                onClick={() => toggleHideItem(key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  isTranscriberOnly
                    ? 'text-white/60 hover:bg-white/10 hover:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  {meta.icon}
                  <span className="ml-3 text-sm">{meta.label}</span>
                </div>
                <span className={`text-[10px] font-medium ${isTranscriberOnly ? 'text-white/40' : 'text-gray-400'}`}>
                  tap to show
                </span>
              </button>
            );
          })}
        </div>
      </>
    )}
  </div>
)}
```

---

## SUMMARY

| Change | File | Notes |
|---|---|---|
| Purple gradient sidebar | `Layout.tsx` | AI Scribe only, white/70 text, white/20 active |
| `···` on Settings | `Layout.tsx` | Hover-reveal in all modes, opens dropdown |
| "Configure Menu" option | `Layout.tsx` | Sets `isConfigureMenuMode = true`, shows banner |
| Drag-to-reorder | `Layout.tsx` | HTML5 drag, per-mode order in localStorage |
| `×` hide per item | `Layout.tsx` | Configure mode only, not on Settings |
| "Show more" for hidden | `Layout.tsx` | Appears at nav bottom, tap item to restore |
| All persisted | `Layout.tsx` | `localStorage` keys: `sidebar_transcriber_order`, `sidebar_ehr_order`, `sidebar_hidden_items` |