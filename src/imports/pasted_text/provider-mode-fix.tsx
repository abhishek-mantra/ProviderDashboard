FIX 2 — Provider mode: Restore "Mantra Premium" as a proper expandable dropdown
In the Full EHR (!isTranscriberOnly) sidebar, restore Mantra Premium as a fully functional expandable nav section. This must be positioned immediately above the provider name / user profile section at the bottom of the sidebar.
Find the bottom profile/provider name block and insert the following expandable dropdown directly above it:
tsx{/* Mantra Premium Section — Full EHR / Provider mode */}
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

{/* ↑ Provider name / user profile section follows immediately below ↑ */}

FIX 3 — Add signupMode to localStorage in OTPVerify.tsx
In OTPVerify.tsx, inside handleVerify, add this line before the navigate call:
tsxlocalStorage.setItem("mantra_logged_in", "true");
localStorage.setItem("mantra_signup_mode", signupMode); // "provider" | "full-ehr" | "ai-scribe"

FIX 4 — Read signupMode in Layout.tsx
At the top of the Layout component where other constants are derived, add:
tsxconst signupMode = localStorage.getItem("mantra_signup_mode") ?? "full-ehr";
const isProviderMode = signupMode === "provider";

FIX 5 — EHR and AI Scribe: Mantra Premium = plain text nav button, positioned above provider name
For non-provider modes (!isProviderMode), place the following plain text button directly above the provider name / user profile section at the bottom of the sidebar — in the same position as the expandable dropdown in Fix 2:
tsx{/* Mantra Premium — plain text nav button for EHR / AI Scribe, above provider name */}
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

{/* ↑ Provider name / user profile section follows immediately below ↑ */}
No card background, no border, no gradient. Same height and padding as every other nav item. Clicking opens the upgrade popup.

SUMMARY OF ALL CHANGES
LocationWhat changesAI Scribe sidebarDelete the entire bg-[#043570] "Unlock Full EHR" upgrade cardProvider sidebarMantra Premium expandable dropdown (4 links) placed directly above provider name at bottomEHR sidebarPlain Crown icon + "Mantra Premium" text button placed directly above provider name at bottomAI Scribe sidebarSame plain text button as EHR, directly above provider name at bottomOTPVerify.tsxAdd localStorage.setItem("mantra_signup_mode", signupMode) before navigateLayout.tsxAdd signupMode + isProviderMode constants derived from localStorageSonnet 4.6 LowClaude is AI and can make mistakes.