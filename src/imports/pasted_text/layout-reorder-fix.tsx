The issue is that the current drag-and-drop uses HTML5 native drag events but the nav items aren't actually being **rendered in order** from the state arrays — they're hardcoded in JSX sequence, so even when the order state updates, the DOM doesn't reorder. Here's the fix:

---

# Fix: Drag-to-Reorder Actually Reorders Items

## FILE: `src/components/Layout.tsx`

---

## ROOT CAUSE

The nav items are written as hardcoded sequential JSX blocks. Even though `transcriberItemOrder` and `ehrItemOrder` state update on drop, nothing reads that order to re-render items in the new sequence. The fix is to **render nav items by mapping over the order arrays**, looking up a render function for each key.

---

## STEP 1 — Create render function maps (add after `navItemMeta`, before `return`)

Replace the entire `isTranscriberOnly` and `!isTranscriberOnly` nav branch logic with a data-driven approach. First, define two render maps — one per mode — that return the JSX for each item key:

```tsx
// ─── Transcriber nav renderers ───────────────────────────────────────────────
const renderTranscriberItem = (key: string) => {
  switch (key) {
    case 'home':
      return (
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
            isActive("/") ? "bg-white/20 text-white shadow-md backdrop-blur-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
          title={shouldShowCollapsed() ? "Home" : undefined}
        >
          <div className="flex items-center flex-1">
            <Home className="size-5 flex-shrink-0" />
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Home</span>
          </div>
        </Link>
      );
    case 'clients':
      return (
        <Link
          to="/clients"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
            isActive("/clients") ? "bg-white/20 text-white shadow-md backdrop-blur-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
          title={shouldShowCollapsed() ? "Clients" : undefined}
        >
          <div className="flex items-center flex-1">
            <Users className="size-5 flex-shrink-0" />
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Clients</span>
          </div>
        </Link>
      );
    case 'ai-transcriber':
      return (
        <Link
          to="/ai-transcriber"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
            isActive("/ai-transcriber") ? "bg-white/20 text-white shadow-md backdrop-blur-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
          title={shouldShowCollapsed() ? "AI Transcriber" : undefined}
        >
          {!shouldShowCollapsed() && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c0ff] rounded-r-full" />}
          <div className="flex items-center flex-1">
            <Mic className={`size-5 flex-shrink-0 ${isActive("/ai-transcriber") ? "" : "text-[#00c0ff]"}`} />
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>AI Transcriber</span>
          </div>
        </Link>
      );
    case 'session-notes':
      return (
        <Link
          to="/session-notes"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
            isActive("/session-notes") ? "bg-white/20 text-white shadow-md backdrop-blur-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
          title={shouldShowCollapsed() ? "Session Notes" : undefined}
        >
          {!shouldShowCollapsed() && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c0ff]/60 rounded-r-full" />}
          <div className="flex items-center flex-1">
            <StickyNote className={`size-5 flex-shrink-0 ${isActive("/session-notes") ? "" : "text-[#00c0ff]"}`} />
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Session Notes</span>
          </div>
        </Link>
      );
    case 'prescriptions':
      return (
        <Link
          to="/prescriptions"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
            isActive("/prescriptions") ? "bg-white/20 text-white shadow-md backdrop-blur-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
          title={shouldShowCollapsed() ? "Prescriptions" : undefined}
        >
          {!shouldShowCollapsed() && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c0ff]/60 rounded-r-full" />}
          <div className="flex items-center flex-1">
            <Pill className={`size-5 flex-shrink-0 ${isActive("/prescriptions") ? "" : "text-[#00c0ff]"}`} />
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Prescriptions</span>
          </div>
        </Link>
      );
    case 'settings':
      return renderSettingsItem(true);
    default:
      return null;
  }
};

// ─── EHR nav renderers ────────────────────────────────────────────────────────
const renderEHRItem = (key: string) => {
  switch (key) {
    case 'home':
      return renderNavItem("/", <Home className="size-5 flex-shrink-0" />, "Home");
    case 'clients':
      return renderNavItem("/clients", <Users className="size-5 flex-shrink-0" />, "Clients");
    case 'billing':
      return renderNavItem("/billing", <CreditCard className="size-5 flex-shrink-0" />, "Billing");
    case 'messages':
      return renderNavItem("/chat", <MessageSquare className="size-5 flex-shrink-0" />, "Messages");
    case 'appointments':
      return renderNavItem("/sessions", <Calendar className="size-5 flex-shrink-0" />, "Appointments");
    case 'for-mantra-provider':
      return isProviderMode ? renderForMantraProvider() : null;
    case 'tools':
      return renderToolsSection();
    case 'settings':
      return renderSettingsItem(false);
    default:
      return null;
  }
};
```

---

## STEP 2 — Extract Settings, For Mantra Provider, and Tools into render functions

Add these three helper render functions in the same location (after `navItemMeta`, before `return`). They contain exactly the same JSX that exists today — just extracted so `renderEHRItem` and `renderTranscriberItem` can call them:

```tsx
const renderSettingsItem = (isTranscriber: boolean) => (
  <div className="relative" ref={settingsMenuRef}>
    <div className="flex items-center group">
      <Link
        to="/settings/availability"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex-1 flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : ''} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
          isActive("/settings")
            ? isTranscriber ? "bg-white/20 text-white shadow-md backdrop-blur-sm" : "bg-[#00c0ff] text-white shadow-md"
            : isTranscriber ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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
          } ${isTranscriber ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#64748b] dark:text-gray-400'}`}
          title="Menu options"
        >
          <span className="text-base font-bold leading-none tracking-tighter select-none">···</span>
        </button>
      )}
    </div>
    {showSettingsMenu && !shouldShowCollapsed() && (
      <div className={`absolute bottom-full left-0 right-0 mb-1 rounded-xl shadow-lg border overflow-hidden z-50 ${
        isTranscriber ? 'bg-[#2d2080] border-white/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <button
          onClick={() => { setIsConfigureMenuMode(true); setShowSettingsMenu(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
            isTranscriber ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <Menu className="size-4 flex-shrink-0" />
          Configure Menu
        </button>
      </div>
    )}
  </div>
);

const renderForMantraProvider = () => (
  <>
    <button
      onClick={() => { setIsGrowExpanded(!isGrowExpanded); if (!isGrowExpanded) setIsProfileMenuOpen(false); }}
      className={`w-full flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
        isActive("/grow") || isActive("/client-leads") || isActive("/premium") || isActive("/refer-earn")
          ? "bg-[#00c0ff] text-white shadow-md"
          : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
      title={shouldShowCollapsed() ? "For Mantra Provider" : undefined}
    >
      <div className="flex items-center">
        <Crown className="size-5 flex-shrink-0" />
        <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>For Mantra Provider</span>
      </div>
      <ChevronDown className={`size-4 transition-transform duration-200 ${isGrowExpanded ? 'rotate-180' : ''} ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`} />
    </button>
    {isGrowExpanded && !shouldShowCollapsed() && (
      <div className="mt-1 space-y-1">
        {[
          { to: "/client-leads", icon: <UserPlus className="size-5 flex-shrink-0" />, label: "Client Leads" },
          { to: "/premium",      icon: <Crown className="size-5 flex-shrink-0" />,    label: "Mantra Premium" },
          { to: "/grow",         icon: <Megaphone className="size-5 flex-shrink-0" />,label: "Marketing" },
          { to: "/refer-earn",   icon: <Gift className="size-5 flex-shrink-0" />,     label: "Refer & Earn" },
        ].map(({ to, icon, label }) => (
          <Link key={to} to={to} onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center py-[10px] px-3 rounded-lg transition-all pl-10 ${
              isActive(to) ? "bg-[#00c0ff]/10 text-[#00c0ff] dark:bg-[#00c0ff]/20" : "text-[#64748b] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {icon}
            <span className="ml-3 text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>
    )}
  </>
);

const renderToolsSection = () => (
  <>
    <button
      onClick={() => { setIsToolsExpanded(!isToolsExpanded); if (!isToolsExpanded) setIsProfileMenuOpen(false); }}
      className={`w-full flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
        isActive("/tools") || isActive("/session-notes") || isActive("/ai-transcriber") || isActive("/prescriptions") || isActive("/tasks") || isActive("/ai-crm")
          ? "bg-[#00c0ff] text-white shadow-md"
          : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
      title={shouldShowCollapsed() ? "Tools" : undefined}
    >
      <div className="flex items-center">
        <Wrench className="size-5 flex-shrink-0" />
        <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Tools</span>
      </div>
      <ChevronDown className={`size-4 transition-transform duration-200 ${isToolsExpanded ? 'rotate-180' : ''} ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`} />
    </button>
    {isToolsExpanded && !shouldShowCollapsed() && (
      <div className="mt-1 space-y-1">
        {[
          { to: "/session-notes",  icon: <FileText className="size-5 flex-shrink-0" />,    label: "Session Notes" },
          { to: "/ai-transcriber", icon: <Mic className="size-5 flex-shrink-0" />,         label: "AI Transcriber" },
          { to: "/prescriptions",  icon: <Pill className="size-5 flex-shrink-0" />,        label: "Prescriptions" },
          { to: "/tools",          icon: <Wrench className="size-5 flex-shrink-0" />,      label: "Resources" },
          { to: "/tasks",          icon: <CheckSquare className="size-5 flex-shrink-0" />, label: "Tasks" },
          { to: "/ai-crm",         icon: <Brain className="size-5 flex-shrink-0" />,       label: "AI CRM" },
        ].map(({ to, icon, label }) => (
          <Link key={to} to={to} onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center py-[10px] px-3 rounded-lg transition-all pl-10 ${
              isActive(to) ? "bg-[#00c0ff]/10 text-[#00c0ff] dark:bg-[#00c0ff]/20" : "text-[#64748b] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {icon}
            <span className="ml-3 text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>
    )}
  </>
);
```

---

## STEP 3 — Replace the entire `<nav>` contents with order-driven rendering

Delete everything inside `<nav className="flex-1 px-3 space-y-1 overflow-y-auto">` and replace with:

```tsx
<nav className="flex-1 px-3 space-y-1 overflow-y-auto">
  {(() => {
    const order = isTranscriberOnly ? transcriberItemOrder : ehrItemOrder;
    const isTranscriber = isTranscriberOnly;
    const ringClass = isTranscriber ? 'ring-white/30' : 'ring-[#00c0ff]/40';
    const hideButtonClass = isTranscriber
      ? 'bg-white/10 hover:bg-white/20 text-white/70'
      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#64748b]';

    // In configure mode show all; otherwise only visible items
    const itemsToRender = isConfigureMenuMode ? order : visibleItems(order);

    return (
      <>
        {itemsToRender.map((key) => {
          // For Mantra Provider only renders in provider mode
          if (key === 'for-mantra-provider' && !isProviderMode) return null;

          const content = isTranscriber ? renderTranscriberItem(key) : renderEHRItem(key);
          if (!content) return null;

          return (
            <div
              key={key}
              draggable={isConfigureMenuMode}
              onDragStart={() => handleDragStart(key)}
              onDragOver={(e) => handleDragOver(e, key)}
              onDrop={() => handleDrop(isTranscriber)}
              onDragEnd={() => { setDraggedItem(null); setDragOverItem(null); }}
              className={`relative group ${isConfigureMenuMode ? 'cursor-grab active:cursor-grabbing' : ''} ${
                dragOverItem === key && draggedItem !== key
                  ? `ring-1 ${ringClass} rounded-xl`
                  : ''
              } ${draggedItem === key ? 'opacity-50' : ''}`}
            >
              {content}

              {/* Hide button — configure mode only, never on settings */}
              {isConfigureMenuMode && key !== 'settings' && !shouldShowCollapsed() && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleHideItem(key); }}
                  className={`absolute right-2 top-[10px] size-5 flex items-center justify-center rounded-md z-10 transition-colors ${hideButtonClass}`}
                  title="Hide from sidebar"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Show More — hidden items bucket */}
        {!isConfigureMenuMode && hiddenFromOrder(order).length > 0 && !shouldShowCollapsed() && (
          <div className="mt-2">
            <button
              onClick={() => setIsShowMoreExpanded(!isShowMoreExpanded)}
              className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${
                isTranscriber
                  ? 'text-white/50 hover:text-white/80'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="text-[13px] font-semibold">Show more</span>
              <ChevronDown className={`size-4 transition-transform duration-200 ${isShowMoreExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isShowMoreExpanded && (
              <>
                <div className={`border-t mb-1 ${isTranscriber ? 'border-white/10' : 'border-gray-100 dark:border-gray-700'}`} />
                {hiddenFromOrder(order).map(key => {
                  const meta = navItemMeta[key];
                  if (!meta) return null;
                  return (
                    <button
                      key={key}
                      onClick={() => toggleHideItem(key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        isTranscriber
                          ? 'text-white/60 hover:bg-white/10 hover:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {meta.icon}
                        <span className="ml-3 text-sm">{meta.label}</span>
                      </div>
                      <span className={`text-[10px] font-medium ${isTranscriber ? 'text-white/40' : 'text-gray-400'}`}>
                        tap to show
                      </span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* AI Scribe Show More (locked items) — only in transcriber mode, only when not in configure mode */}
        {isTranscriber && !isConfigureMenuMode && !shouldShowCollapsed() && hiddenFromOrder(order).length === 0 && (
          <div className="mt-4">
            <button
              onClick={() => setIsShowMoreExpanded(!isShowMoreExpanded)}
              className="w-full flex items-center justify-between px-4 py-2.5 transition-colors text-white/50 hover:text-white/80"
            >
              <span className="text-[13px] font-semibold">Show more</span>
              <ChevronDown className={`size-4 transition-transform duration-200 ${isShowMoreExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isShowMoreExpanded && (
              <>
                <div className="border-t border-white/10 mb-1" />
                {[
                  { icon: <MessageSquare className="size-5 flex-shrink-0 text-white/60" />, label: 'Messages' },
                  { icon: <Calendar className="size-5 flex-shrink-0 text-white/60" />,      label: 'Appointments' },
                  { icon: <CreditCard className="size-5 flex-shrink-0 text-white/60" />,    label: 'Billing' },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setShowPremiumUpgradePopup(true)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      {icon}
                      <span className="ml-3 text-sm text-white/60">{label}</span>
                    </div>
                  </button>
                ))}
                <Link
                  to="/tools"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                    isActive("/tools") ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <Wrench className="size-5 flex-shrink-0 text-white/60" />
                    <span className="ml-3 text-sm font-medium">Other Tools</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </>
    );
  })()}
</nav>
```

---

## SUMMARY

| Problem | Fix |
|---|---|
| Items hardcoded in JSX — order state had no effect | Nav now renders by mapping over `transcriberItemOrder` / `ehrItemOrder` arrays |
| Each item needs its own JSX | Extracted into `renderTranscriberItem(key)` and `renderEHRItem(key)` switch functions |
| Shared sub-components (Settings, Tools, For Mantra Provider) | Extracted into `renderSettingsItem()`, `renderToolsSection()`, `renderForMantraProvider()` |
| `draggedItem` opacity flicker on drop | Added `onDragEnd` to clear both `draggedItem` and `dragOverItem` |
| AI Scribe locked items (Messages etc.) lost | Preserved as a separate Show More block when no items are hidden |