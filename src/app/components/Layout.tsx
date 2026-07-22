import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, Users, Calendar, FileText, CreditCard, User, Menu, MessageSquare, Gift, LogOut, CheckSquare, TrendingUp, Crown, ChevronDown, Megaphone, Plus, Settings, UserPlus, X, Lock, Brain, Mic, Pill, Sparkles, StickyNote, ChevronRight, Shield, Building2, Globe, BadgeCheck, ShieldCheck, LayoutDashboard, EyeOff, GripVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "./ui/sonner";
import { usePlanMode } from "../contexts/PlanModeContext";
import { DevRoleSwitcher } from "./DevRoleSwitcher";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

function MantraProviderUpgradePopup({ onClose, onGetListed }: {
  onClose: () => void;
  onGetListed: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700 overflow-hidden">

        {/* Hero Header */}
        <div
          className="relative px-6 pt-6 pb-5"
          style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 size-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-4 text-white" />
          </button>

          <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
            <Crown className="size-7 text-white" strokeWidth={1.5} />
          </div>

          <h2 className="text-xl font-bold text-white mb-1">
            Become a Mantra Provider
          </h2>
          <p className="text-sm text-blue-100 leading-relaxed">
            Get listed on MantraCare and grow your practice with access to 1M+ individuals and 20K+ corporate clients.
          </p>
        </div>

        {/* Benefits List */}
        <div className="px-6 py-4 space-y-3">
          {[
            {
              icon: Globe,
              color: "bg-[#EFF6FF] dark:bg-blue-900/20",
              iconColor: "text-[#2563EB] dark:text-blue-400",
              label: "Session Requests from Mantra's Network",
              desc: "Only premium providers receive session requests from Mantra's network of 1M+ individuals and 20K+ corporate clients.",
            },
            {
              icon: Building2,
              color: "bg-[#EEF2FF] dark:bg-indigo-900/20",
              iconColor: "text-[#4F46E5] dark:text-indigo-400",
              label: "Access 2,000+ Organizations",
              desc: "Partner with MantraCare and reach employees across leading organizations.",
            },
            {
              icon: BadgeCheck,
              color: "bg-[#FFFBEB] dark:bg-amber-900/20",
              iconColor: "text-[#D97706] dark:text-amber-400",
              label: "Premium Listing",
              desc: "Get featured as a verified premium provider above basic members.",
            },
            {
              icon: TrendingUp,
              color: "bg-[#FDF2F8] dark:bg-pink-900/20",
              iconColor: "text-[#DB2777] dark:text-pink-400",
              label: "Client Leads & Marketing",
              desc: "Increase visibility through client leads, marketing tools, and insurance credentialing.",
            },
            {
              icon: ShieldCheck,
              color: "bg-[#F0FDF4] dark:bg-emerald-900/20",
              iconColor: "text-[#16A34A] dark:text-emerald-400",
              label: "Insurance & Claims",
              desc: "Manage your Credential Status and Claims to expand your eligible client base.",
            },
          ].map(({ icon: Icon, color, iconColor, label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <div className={`size-9 ${color} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-white dark:border-transparent shadow-sm`}>
                <Icon className={`size-[18px] ${iconColor}`} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{label}</p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Work on Your Terms note */}
        <div className="mx-6 mb-4 px-3 py-2.5 bg-[#F0F9FF] dark:bg-[#043570]/20 rounded-xl border border-[#BAE6FD] dark:border-[#043570]/40">
          <p className="text-xs font-medium text-[#0369A1] dark:text-blue-300 text-center">
            💼 Work on Your Terms — offer services at listed rates, accept requests & get paid monthly
          </p>
        </div>

        {/* CTAs */}
        <div className="px-6 pb-6 space-y-2">
          <button
            onClick={onGetListed}
            className="w-full py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-blue-900/20"
          >
            Get Listed Now →
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-[#64748B] hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

function mergeOrderWithDefaults(
  saved: string[] | null,
  defaults: string[],
  showMoreKeys: string[] = []
): string[] {
  const showMoreSet = new Set(showMoreKeys);
  if (!saved) return defaults.filter(k => !showMoreSet.has(k));
  const missing = defaults.filter(k => !saved.includes(k) && !showMoreSet.has(k));
  if (missing.length === 0) return saved;
  // Insert missing keys before 'refer-earn' so they land in a sensible position
  const insertBefore = 'refer-earn';
  const idx = saved.indexOf(insertBefore);
  const result = [...saved];
  result.splice(idx === -1 ? result.length - 1 : idx, 0, ...missing);
  return result;
}

function UnlockEHRPopup({ onClose, onGetListed, onUpgradeEHR }: {
  onClose: () => void;
  onGetListed: () => void;
  onUpgradeEHR: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700 overflow-hidden">

        {/* Header */}
        <div
          className="relative px-6 pt-6 pb-5"
          style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 size-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-4 text-white" />
          </button>
          <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
            <Lock className="size-6 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Unlock This Feature</h2>
          <p className="text-sm text-blue-100 leading-relaxed">
            This feature is part of the Full EHR plan. Upgrade your plan or get listed as a Mantra Provider to access it.
          </p>
        </div>

        {/* Two paths */}
        <div className="px-6 py-5 space-y-3">

          {/* Path 1 — Full EHR */}
          <div className="rounded-2xl border-2 border-[#E2E8F0] dark:border-gray-700 p-4 hover:border-[#043570] dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="size-9 bg-[#EFF6FF] dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white shadow-sm">
                <LayoutDashboard className="size-[18px] text-[#2563EB]" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Full EHR Plan</p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">
                  Get complete access to Appointments, Billing, Secure Messaging, and all EHR tools for your independent practice.
                </p>
              </div>
            </div>
            <button
              onClick={onUpgradeEHR}
              className="w-full py-2.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-xl font-bold text-sm transition-colors border border-[#BFDBFE]"
            >
              Upgrade to Full EHR
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Path 2 — Mantra Provider */}
          <div className="rounded-2xl border-2 border-[#E2E8F0] dark:border-gray-700 p-4 hover:border-[#043570] dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="size-9 bg-[#FFFBEB] dark:bg-amber-900/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white shadow-sm">
                <Crown className="size-[18px] text-[#D97706]" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Get Listed as a Mantra Provider</p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">
                  Access the full EHR suite plus client leads, premium listing, marketing tools, insurance & claims — and connect with 1M+ individuals.
                </p>
              </div>
            </div>
            <button
              onClick={onGetListed}
              className="w-full py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
            >
              Get Listed Now →
            </button>
          </div>
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2 text-[#64748B] hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { planMode } = usePlanMode();
  const { isCurrentUserAdmin, isCurrentUserSupervisor, providers, currentProviderId } = usePartnerDashboard();
  const currentProvider = providers.find((p) => p.id === currentProviderId);
  const providerName = currentProvider?.name || "John Wilson";
  const providerInitials = providerName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isGrowExpanded, setIsGrowExpanded] = useState(false);
  const [isShowMoreExpanded, setIsShowMoreExpanded] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPremiumUpgradePopup, setShowPremiumUpgradePopup] = useState(false);
  const [showEHRUpgradePopup, setShowEHRUpgradePopup] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Configure menu
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isConfigureMenuMode, setIsConfigureMenuMode] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  // Nav item ordering — one per mode, persisted
  const defaultTranscriberOrder = ['home', 'clients', 'admin-dashboard', 'ai-transcriber', 'session-notes', 'settings'];
  const defaultEHROrder = ['home', 'clients', 'admin-dashboard', 'supervisor-dashboard', 'billing', 'messages', 'appointments', 'intake-forms', 'settings'];
  const defaultProviderOrder = ['home', 'clients', 'admin-dashboard', 'supervisor-dashboard', 'billing', 'messages', 'appointments', 'intake-forms', 'for-mantra-provider', 'settings'];

  const [transcriberItemOrder, setTranscriberItemOrder] = useState<string[]>(() => {
    const saved = JSON.parse(localStorage.getItem('sidebar_transcriber_order') || 'null');
    const showMore = JSON.parse(localStorage.getItem('sidebar_user_show_more_transcriber') || '[]');
    return mergeOrderWithDefaults(saved, defaultTranscriberOrder, showMore);
  });
  const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(() => {
    const saved = JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null');
    const showMore = JSON.parse(localStorage.getItem('sidebar_user_show_more_ehr') || '[]');
    return mergeOrderWithDefaults(saved, defaultEHROrder, showMore);
  });
  const [providerItemOrder, setProviderItemOrder] = useState<string[]>(() => {
    const saved = JSON.parse(localStorage.getItem('sidebar_provider_order') || 'null');
    const showMore = JSON.parse(localStorage.getItem('sidebar_user_show_more_provider') || '[]');
    return mergeOrderWithDefaults(saved, defaultProviderOrder, showMore);
  });
  const [hiddenItems, setHiddenItems] = useState<string[]>(
    () => JSON.parse(localStorage.getItem('sidebar_hidden_items') || '[]')
  );
  const [showMorePromoted, setShowMorePromoted] = useState<string[]>(
    () => JSON.parse(localStorage.getItem('sidebar_show_more_promoted') || '[]')
  );
  const [hiddenOrigins, setHiddenOrigins] = useState<Record<string, 'main' | 'showMore'>>(
    () => JSON.parse(localStorage.getItem('sidebar_hidden_origins') || '{}')
  );
  const [userShowMoreEhr, setUserShowMoreEhr] = useState<string[]>(
    () => JSON.parse(localStorage.getItem('sidebar_user_show_more_ehr') || '[]')
  );
  const [userShowMoreTranscriber, setUserShowMoreTranscriber] = useState<string[]>(
    () => JSON.parse(localStorage.getItem('sidebar_user_show_more_transcriber') || '[]')
  );
  const [userShowMoreProvider, setUserShowMoreProvider] = useState<string[]>(
    () => JSON.parse(localStorage.getItem('sidebar_user_show_more_provider') || '[]')
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<'main' | 'showMore' | 'hidden' | null>(null);

  const isTranscriberOnly = planMode === "transcriber-only";
  const isProviderPlan = planMode === "provider";
  const signupMode = localStorage.getItem("mantra_signup_mode") ?? "full-ehr";
  const isProviderSignup = signupMode === "provider";
  // Check if a specific path should be locked in transcriber-only mode
  const isPathLocked = (path: string) => {
    if (!isTranscriberOnly) return false;
    // AI Transcriber Plan includes: Home, AI Transcriber, Session Notes, Prescriptions, Clients, Settings, Other Tools
    // Locked features: Appointments, Billing, Messages, For Mantra Provider (Grow section), Tasks, AI CRM
    return path === "/sessions" || path === "/billing" || path === "/chat" || path === "/grow" || path === "/client-leads" || path === "/premium" || path === "/refer-earn" || path === "/tasks" || path === "/ai-crm";
  };

  const handleLockedNavClick = (e: React.MouseEvent, path: string) => {
    if (isPathLocked(path)) {
      e.preventDefault();
      toast("This feature requires the Full EHR Plan.", {
        action: {
          label: "Upgrade to Unlock",
          onClick: () => {
            navigate("/settings");
          },
        },
      });
    }
  };

// Auto-collapse sidebar for specific pages
  const isViewNotePage = location.pathname.includes('/notes/view/');
  const isAddNotePage = location.pathname.includes('/notes/add');
  const isViewTranscriptionNotePage = location.pathname.includes('/view-transcription/') && location.pathname.includes('/note/');
  const isCreatePrescriptionPage = location.pathname.includes('/prescriptions/create') || location.pathname === '/add-prescription';

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Persist sidebar order + hidden state
  useEffect(() => {
    localStorage.setItem('sidebar_transcriber_order', JSON.stringify(transcriberItemOrder));
  }, [transcriberItemOrder]);

  useEffect(() => {
    localStorage.setItem('sidebar_ehr_order', JSON.stringify(ehrItemOrder));
  }, [ehrItemOrder]);

  useEffect(() => {
    localStorage.setItem('sidebar_provider_order', JSON.stringify(providerItemOrder));
  }, [providerItemOrder]);

  useEffect(() => {
    localStorage.setItem('sidebar_hidden_items', JSON.stringify(hiddenItems));
  }, [hiddenItems]);

  useEffect(() => {
    localStorage.setItem('sidebar_show_more_promoted', JSON.stringify(showMorePromoted));
  }, [showMorePromoted]);

  useEffect(() => {
    localStorage.setItem('sidebar_hidden_origins', JSON.stringify(hiddenOrigins));
  }, [hiddenOrigins]);

  useEffect(() => {
    localStorage.setItem('sidebar_user_show_more_ehr', JSON.stringify(userShowMoreEhr));
  }, [userShowMoreEhr]);

  useEffect(() => {
    localStorage.setItem('sidebar_user_show_more_transcriber', JSON.stringify(userShowMoreTranscriber));
  }, [userShowMoreTranscriber]);

  useEffect(() => {
    localStorage.setItem('sidebar_user_show_more_provider', JSON.stringify(userShowMoreProvider));
  }, [userShowMoreProvider]);

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

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Drag and drop
  const handleDrop = (mode: 'transcriber' | 'ehr' | 'provider') => {
    if (!draggedItem || !dragOverItem || draggedItem === dragOverItem) return;
    const order = mode === 'transcriber' ? [...transcriberItemOrder] : mode === 'provider' ? [...providerItemOrder] : [...ehrItemOrder];
    const setter = mode === 'transcriber' ? setTranscriberItemOrder : mode === 'provider' ? setProviderItemOrder : setEHRItemOrder;

    // Dragging from Hidden → Main Nav: restore and reorder
    if (draggedSection === 'hidden') {
      const origin = hiddenOrigins[draggedItem] ?? 'main';
      setHiddenItems(prev => prev.filter(k => k !== draggedItem));
      setHiddenOrigins(prev => { const p = { ...prev }; delete p[draggedItem!]; return p; });
      if (origin === 'main') {
        const fromIdx = order.indexOf(draggedItem);
        const toIdx = order.indexOf(dragOverItem);
        if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
          order.splice(fromIdx, 1);
          order.splice(toIdx, 0, draggedItem);
          setter(order);
        }
      }
      setDraggedItem(null); setDragOverItem(null); setDraggedSection(null);
      return;
    }

    // Dragging from Show More → Main Nav: promote
    if (draggedSection === 'showMore') {
      const toIdx = order.indexOf(dragOverItem);
      if (toIdx !== -1 && !order.includes(draggedItem)) {
        order.splice(toIdx, 0, draggedItem);
        setter(order);
      }
      const userShowMore = mode === 'ehr' ? userShowMoreEhr : mode === 'transcriber' ? userShowMoreTranscriber : userShowMoreProvider;
      const userShowMoreSetter = mode === 'ehr' ? setUserShowMoreEhr : mode === 'transcriber' ? setUserShowMoreTranscriber : setUserShowMoreProvider;
      const wasUserMoved = userShowMore.includes(draggedItem!);
      // Always remove from both userShowMore and showMorePromoted
      userShowMoreSetter(prev => prev.filter(k => k !== draggedItem));
      setHiddenOrigins(prev => { const p = { ...prev }; delete p[draggedItem!]; return p; });
      setShowMorePromoted(prev => prev.filter(k => k !== draggedItem));
      if (!wasUserMoved) {
        // Default Show More resident: mark as promoted to main nav
        setShowMorePromoted(prev => [...prev, draggedItem!]);
      }
      setDraggedItem(null); setDragOverItem(null); setDraggedSection(null);
      return;
    }

    const fromIdx = order.indexOf(draggedItem);
    const toIdx = order.indexOf(dragOverItem);
    order.splice(fromIdx, 1);
    order.splice(toIdx, 0, draggedItem);
    setter(order);
    setDraggedItem(null); setDragOverItem(null); setDraggedSection(null);
  };

  // Show More residents per mode (items that naturally live in Show More)
  const allShowMoreResidents = new Set(['ai-transcriber', 'session-notes', 'prescriptions']);

  // Handle dropping a main nav item onto the Show More section
  const handleDropToShowMore = (mode: 'transcriber' | 'ehr' | 'provider', insertBefore: string | null) => {
    if (!draggedItem) return;
    const setter = mode === 'transcriber' ? setTranscriberItemOrder : mode === 'provider' ? setProviderItemOrder : setEHRItemOrder;
    setter(prev => prev.filter(k => k !== draggedItem));
    const userShowMoreSetter = mode === 'ehr' ? setUserShowMoreEhr : mode === 'transcriber' ? setUserShowMoreTranscriber : setUserShowMoreProvider;
    userShowMoreSetter(prev => {
      if (prev.includes(draggedItem!)) return prev;
      if (insertBefore) {
        const idx = prev.indexOf(insertBefore);
        if (idx !== -1) {
          const next = [...prev];
          next.splice(idx, 0, draggedItem!);
          return next;
        }
      }
      return [...prev, draggedItem!];
    });
    // If the item was previously promoted from Show More to main nav, un-promote it
    setShowMorePromoted(prev => prev.filter(k => k !== draggedItem));
    // Mark origin as 'showMore' so if later hidden and restored, it goes back to Show More
    setHiddenOrigins(prev => ({ ...prev, [draggedItem!]: 'showMore' }));
    setDraggedItem(null); setDragOverItem(null); setDraggedSection(null);
  };

  // Hide an item, recording its origin for restore
  const hideItem = (key: string, mode: 'transcriber' | 'ehr' | 'provider') => {
    const isShowMoreResident = allShowMoreResidents.has(key);
    const isUserShowMore = userShowMoreEhr.includes(key) || userShowMoreTranscriber.includes(key) || userShowMoreProvider.includes(key);
    const isPromoted = showMorePromoted.includes(key);
    // Origin is 'showMore' if it's a Show More resident (promoted or not — true home is Show More)
    const origin: 'main' | 'showMore' = (isShowMoreResident || isUserShowMore) ? 'showMore' : 'main';
    setHiddenOrigins(prev => ({ ...prev, [key]: origin }));
    if (isPromoted) {
      // Demote back to Show More: remove from order and showMorePromoted
      setShowMorePromoted(prev => prev.filter(k => k !== key));
      const setter = mode === 'transcriber' ? setTranscriberItemOrder : mode === 'provider' ? setProviderItemOrder : setEHRItemOrder;
      setter(prev => prev.filter(k => k !== key));
    }
    setHiddenItems(prev => [...prev, key]);
  };

  // Restore a hidden item to its origin destination
  const restoreItem = (key: string, mode: 'transcriber' | 'ehr' | 'provider') => {
    const origin = hiddenOrigins[key] ?? 'main';
    setHiddenItems(prev => prev.filter(k => k !== key));
    setHiddenOrigins(prev => { const p = { ...prev }; delete p[key]; return p; });
    if (origin === 'showMore') {
      // Ensure not in order or showMorePromoted so it reappears in Show More
      const setter = mode === 'transcriber' ? setTranscriberItemOrder : mode === 'provider' ? setProviderItemOrder : setEHRItemOrder;
      setter(prev => prev.filter(k => k !== key));
      setShowMorePromoted(prev => prev.filter(k => k !== key));
    }
    // If origin === 'main': item stays in order, will reappear in main nav
  };

  const visibleItems = (order: string[]) => order.filter(k => !hiddenItems.includes(k));
  const hiddenFromOrder = (order: string[]) => order.filter(k => hiddenItems.includes(k));
  const toggleHideItem = (key: string) => {
    // Legacy toggle — only used where mode context is unavailable; prefer hideItem/restoreItem
    setHiddenItems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  // Map item key → icon and label (used by Show More and configure mode)
  const navItemMeta: Record<string, { icon: React.ReactNode; label: string }> = {
    'home':               { icon: <Home className="size-5 flex-shrink-0" />,          label: 'Home' },
    'clients':            { icon: <Users className="size-5 flex-shrink-0" />,         label: 'Clients' },
    'billing':            { icon: <CreditCard className="size-5 flex-shrink-0" />,    label: 'Billing' },
    'messages':           { icon: <MessageSquare className="size-5 flex-shrink-0" />, label: 'Messages' },
    'appointments':       { icon: <Calendar className="size-5 flex-shrink-0" />,      label: 'Appointments' },
    'refer-earn':         { icon: <Gift className="size-5 flex-shrink-0" />,          label: 'Refer & Earn' },
    'for-mantra-provider':{ icon: <Crown className="size-5 flex-shrink-0" />,         label: 'For Mantra Provider' },
    'ai-transcriber':     { icon: <Mic className="size-5 flex-shrink-0" />,           label: 'AI Transcriber' },
    'session-notes':      { icon: <StickyNote className="size-5 flex-shrink-0" />,    label: 'Session Notes' },
    'prescriptions':      { icon: <Pill className="size-5 flex-shrink-0" />,          label: 'Prescriptions' },
    'settings':           { icon: <Settings className="size-5 flex-shrink-0" />,      label: 'Settings' },
    'resources':          { icon: <Globe className="size-5 flex-shrink-0" />,          label: 'Resources' },
    'ai-crm':             { icon: <Brain className="size-5 flex-shrink-0" />,          label: 'AI CRM' },
    'admin-dashboard':    { icon: <Shield className="size-5 flex-shrink-0" />,        label: 'Admin Dashboard' },
    'supervisor-dashboard': { icon: <Shield className="size-5 flex-shrink-0" />,        label: 'Supervisor Dashboard' },
    'intake-forms':       { icon: <FileText className="size-5 flex-shrink-0" />,        label: 'Forms' },
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Helper to check if sidebar should show collapsed state (only on desktop)
  const shouldShowCollapsed = () => {
    return (isCollapsed || isViewNotePage || isAddNotePage || isViewTranscriptionNotePage || isCreatePrescriptionPage);
  };

  const isChatPage = location.pathname.startsWith("/chat");
  const isEditProfilePage = location.pathname === "/edit-profile";
  const isSettingsPage = location.pathname.startsWith("/settings");

  // Helper to render nav item with optional cyan accent for AI Plan
  const renderNavItem = (path: string, icon: React.ReactNode, label: string, includeAccent = false) => {
    const locked = isPathLocked(path);
    const active = isActive(path);
    const collapsed = shouldShowCollapsed();

    return (
      <Link
        to={path}
        onClick={(e) => {
          handleLockedNavClick(e, path);
          setIsMobileMenuOpen(false);
        }}
        className={`flex items-center ${collapsed ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
          active
            ? "bg-[#00c0ff] text-white shadow-md"
            : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        } ${includeAccent && isTranscriberOnly ? 'border-l-2 border-[#00c0ff]' : ''}`}
        title={collapsed ? label : undefined}
      >
        <div className="flex items-center flex-1">
          {icon}
          <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>
            {label}
          </span>
          {includeAccent && isTranscriberOnly && !collapsed && (
            <span className="ml-2 text-[10px] font-medium text-[#00c0ff] tracking-wide">YOUR PLAN</span>
          )}
        </div>
      </Link>
    );
  };

  // ─── Transcriber nav renderers ───────────────────────────────────────────────
  const renderTranscriberItem = (key: string) => {
    switch (key) {
      case 'admin-dashboard':
        if (!isCurrentUserAdmin) return null;
        return (
          <Link
            to="/admin-dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
              isActive("/admin-dashboard") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            title={shouldShowCollapsed() ? "Admin Dashboard" : undefined}
          >
            <div className="flex items-center flex-1">
              <Shield className="size-5 flex-shrink-0" />
              <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Admin Dashboard</span>
            </div>
          </Link>
        );
      case 'home':
        return (
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
              isActive("/") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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
              isActive("/clients") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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
              isActive("/ai-transcriber") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            title={shouldShowCollapsed() ? "AI Transcriber" : undefined}
          >
            <div className="flex items-center flex-1">
              <Mic className="size-5 flex-shrink-0" />
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
              isActive("/session-notes") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            title={shouldShowCollapsed() ? "Session Notes" : undefined}
          >
            <div className="flex items-center flex-1">
              <StickyNote className="size-5 flex-shrink-0" />
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
              isActive("/prescriptions") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            title={shouldShowCollapsed() ? "Prescriptions" : undefined}
          >
            <div className="flex items-center flex-1">
              <Pill className="size-5 flex-shrink-0" />
              <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Prescriptions</span>
            </div>
          </Link>
        );
      case 'refer-earn':
        return (
          <Link
            to="/refer-earn"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
              isActive("/refer-earn") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            title={shouldShowCollapsed() ? "Refer & Earn" : undefined}
          >
            <div className="flex items-center flex-1">
              <Gift className="size-5 flex-shrink-0" />
              <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Refer & Earn</span>
            </div>
          </Link>
        );
      case 'intake-forms':
        return (
          <div className="relative">
            <Link
              to="/intake-forms"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
                isActive("/intake-forms") ? "bg-[#00c0ff] text-white shadow-md" : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
               title={shouldShowCollapsed() ? "Forms" : undefined}
             >
               <div className="flex items-center flex-1">
                 <FileText className="size-5 flex-shrink-0" />
                 <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'md:opacity-0 md:absolute' : 'opacity-100'}`}>Forms</span>
              </div>
            </Link>
            {!shouldShowCollapsed() && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate("/intake-forms/builder"); setIsMobileMenuOpen(false); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/20 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                title="Create new form"
              >
                <Plus className="size-4" />
              </button>
            )}
          </div>
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
      case 'admin-dashboard':
        if (!isCurrentUserAdmin) return null;
        return renderNavItem("/admin-dashboard", <Shield className="size-5 flex-shrink-0" />, "Admin Dashboard");
      case 'supervisor-dashboard':
        if (!isCurrentUserSupervisor) return null;
        return renderNavItem("/supervisor-dashboard", <Shield className="size-5 flex-shrink-0" />, "Supervisor Dashboard");
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
        return renderForMantraProviderSection();
      case 'ai-transcriber':
        return renderNavItem("/ai-transcriber", <Mic className="size-5 flex-shrink-0" />, "AI Transcriber");
      case 'session-notes':
        return renderNavItem("/session-notes", <StickyNote className="size-5 flex-shrink-0" />, "Session Notes");
      case 'prescriptions':
        return renderNavItem("/prescriptions", <Pill className="size-5 flex-shrink-0" />, "Prescriptions");
      case 'refer-earn':
        return renderNavItem("/refer-earn", <Gift className="size-5 flex-shrink-0" />, "Refer & Earn");
      case 'resources':
        return renderNavItem("/other-tools", <Globe className="size-5 flex-shrink-0" />, "Resources");
      case 'intake-forms':
        return (
          <div className="relative">
            {renderNavItem("/intake-forms", <FileText className="size-5 flex-shrink-0" />, "Forms")}
            {!shouldShowCollapsed() && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate("/intake-forms/builder"); setIsMobileMenuOpen(false); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/20 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                title="Create new form"
              >
                <Plus className="size-4" />
              </button>
            )}
          </div>
        );
      case 'ai-crm':
        return renderNavItem("/ai-crm", <Brain className="size-5 flex-shrink-0" />, "AI CRM");
      case 'settings':
        return renderSettingsItem(false);
      default:
        return null;
    }
  };

  const renderSettingsItem = (_isTranscriber: boolean) => (
    <div className="relative" ref={settingsMenuRef}>
      {shouldShowCollapsed() ? (
        <Link
          to="/settings/organization"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center md:justify-center py-[10px] px-3 rounded-xl transition-all ${
            isActive("/settings")
              ? "bg-[#00c0ff] text-white shadow-md"
              : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
          title="Settings"
        >
          <Settings className="size-5 flex-shrink-0" />
        </Link>
      ) : (
        <Link
          to="/settings/organization"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center py-[10px] px-3 rounded-xl transition-all ${
            isActive("/settings")
              ? "bg-[#00c0ff] text-white shadow-md"
              : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          <Settings className="size-5 flex-shrink-0" />
          <span className="ml-3 text-sm font-medium whitespace-nowrap">Settings</span>
        </Link>
      )}
    </div>
  );

  const renderForMantraProviderSection = () => (
    <>
      <button
        onClick={() => { setIsGrowExpanded(!isGrowExpanded); if (!isGrowExpanded) setIsProfileMenuOpen(false); }}
        className={`w-full flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
          isActive("/grow") || isActive("/client-leads") || isActive("/premium") || isActive("/tasks")
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
            { to: "/tasks",        icon: <CheckSquare className="size-5 flex-shrink-0" />, label: "Tasks" },
            { to: "/grow",         icon: <Megaphone className="size-5 flex-shrink-0" />,label: "Marketing" },
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


  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex">
      {/* Mobile-Only Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-30">
        {/* Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="size-9 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        >
          <Menu className="size-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-base">MantraCare</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Slides from left on mobile, normal position on desktop */}
      <aside className={`w-[280px] ${shouldShowCollapsed() ? 'md:w-[64px]' : 'md:w-[256px]'} border-r border-gray-200 dark:border-gray-700 flex flex-col fixed top-0 bottom-0 z-50 transition-all duration-300 ${
        isMobileMenuOpen ? 'left-0' : '-left-[280px]'
      } md:left-0 bg-white dark:bg-gray-800`}>
        {/* Logo */}
        <div className="h-[72px] flex items-center justify-center px-3 relative">
          {shouldShowCollapsed() ? (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:block rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Expand menu"
            >
              <Menu className="size-5 text-gray-600 dark:text-gray-300" />
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:block rounded-lg p-1 transition-colors absolute left-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="size-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="flex items-center gap-2">
                <div className="size-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="font-semibold whitespace-nowrap text-gray-900 dark:text-white">MantraCare</span>
              </div>
            </>
          )}
        </div>

        {/* Configure Menu mode banner */}
        {isConfigureMenuMode && (
          <div className="mx-3 mb-2 px-3 py-2 rounded-xl flex items-center justify-between bg-[#00c0ff]/10">
            <span className="text-xs font-semibold text-[#00c0ff]">
              Drag ⠿ to reorder · × to hide · 👁 to restore
            </span>
            <button
              onClick={() => setIsConfigureMenuMode(false)}
              className="text-xs font-bold px-2 py-1 rounded-lg transition-colors bg-[#00c0ff] text-white hover:bg-[#00a8e0]"
            >
              Done
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {(() => {
            const order = isTranscriberOnly ? transcriberItemOrder : isProviderPlan ? providerItemOrder : ehrItemOrder;
            const mode = isTranscriberOnly ? 'transcriber' : isProviderPlan ? 'provider' : 'ehr';
            const ringClass = 'ring-[#00c0ff]/40';

            const aiScribePrescriptionPref = localStorage.getItem("ai_scribe_prescription_pref");
            const transciberForcedVisible = new Set(
              aiScribePrescriptionPref === "no" || aiScribePrescriptionPref === "maybe"
                ? ['ai-transcriber', 'session-notes']
                : ['ai-transcriber', 'session-notes', 'prescriptions']
            );

            // Show More residents per mode (items that live in Show More, not main nav)
            const providerShowMoreResidents = new Set(['ai-transcriber', 'session-notes', 'prescriptions', 'resources', 'ai-crm', 'refer-earn']);
            const ehrShowMoreResidents = new Set(['ai-transcriber', 'session-notes', 'prescriptions', 'resources', 'ai-crm', 'refer-earn']);
            const transcriberShowMoreResidents = new Set(['ai-transcriber', 'session-notes', 'prescriptions', 'resources', 'ai-crm', 'refer-earn']);

            const normalItems = isTranscriberOnly
              ? order.filter(k => !hiddenItems.includes(k) || transciberForcedVisible.has(k))
                  .filter(k => k !== 'admin-dashboard' || isCurrentUserAdmin)
                  .filter(k => !transcriberShowMoreResidents.has(k))
              : visibleItems(order).filter(k => {
                  if (k === 'prescriptions' && aiScribePrescriptionPref === 'no') return false;
                  if (k === 'admin-dashboard' && !isCurrentUserAdmin) return false;
                  if (isProviderPlan && providerShowMoreResidents.has(k)) return false;
                  if (!isProviderPlan && ehrShowMoreResidents.has(k)) return false;
                  return true;
                });
            const itemsToRender = normalItems;
            const mainNavKeys = new Set(itemsToRender);

            // ── Configure menu mode — three-section layout ──────────────────────────
            if (isConfigureMenuMode) {
              const mainConfigKeys = itemsToRender.filter(k => k !== 'settings');

              // Section 2: fixed Show More residents (non-hideable)
              type ShowMoreItem = { key: string; type: 'opt-in' | 'locked' };
              const showMoreConfigItems: ShowMoreItem[] = [];

              // Section 3: explicitly hidden items
              const hiddenConfigKeys: string[] = [];

              if (isProviderPlan) {
                providerShowMoreResidents.forEach(k => {
                  if (k === 'prescriptions' && aiScribePrescriptionPref === 'no') return;
                  if (showMorePromoted.includes(k)) return;
                  if (mainConfigKeys.includes(k)) return;
                  if (showMoreConfigItems.some(item => item.key === k)) return;
                  if (!hiddenItems.includes(k)) showMoreConfigItems.push({ key: k, type: 'opt-in' });
                });
                userShowMoreProvider.forEach(k => {
                  if (mainConfigKeys.includes(k)) return;
                  if (showMoreConfigItems.some(item => item.key === k)) return;
                  if (!hiddenItems.includes(k) && !showMorePromoted.includes(k)) showMoreConfigItems.push({ key: k, type: 'opt-in' });
                });
                hiddenFromOrder(order).filter(k => k !== 'settings').forEach(k => hiddenConfigKeys.push(k));
                providerShowMoreResidents.forEach(k => {
                  if (k === 'prescriptions' && aiScribePrescriptionPref === 'no') return;
                  if (hiddenItems.includes(k)) hiddenConfigKeys.push(k);
                });
                userShowMoreProvider.forEach(k => {
                  if (hiddenItems.includes(k) && !hiddenConfigKeys.includes(k)) hiddenConfigKeys.push(k);
                });
              } else if (isTranscriberOnly) {
                showMoreConfigItems.push({ key: 'messages-locked', type: 'locked' });
                showMoreConfigItems.push({ key: 'appointments-locked', type: 'locked' });
                showMoreConfigItems.push({ key: 'billing-locked', type: 'locked' });
                transcriberShowMoreResidents.forEach(k => {
                  if (showMorePromoted.includes(k)) return;
                  if (mainConfigKeys.includes(k)) return;
                  if (showMoreConfigItems.some(item => item.key === k)) return;
                  if (!hiddenItems.includes(k)) showMoreConfigItems.push({ key: k, type: 'opt-in' });
                });
                userShowMoreTranscriber.forEach(k => {
                  if (mainConfigKeys.includes(k)) return;
                  if (showMoreConfigItems.some(item => item.key === k)) return;
                  if (!hiddenItems.includes(k) && !showMorePromoted.includes(k)) showMoreConfigItems.push({ key: k, type: 'opt-in' });
                });
                hiddenFromOrder(order).filter(k => !transciberForcedVisible.has(k) && k !== 'settings').forEach(k => hiddenConfigKeys.push(k));
                transcriberShowMoreResidents.forEach(k => {
                  if (hiddenItems.includes(k)) hiddenConfigKeys.push(k);
                });
                userShowMoreTranscriber.forEach(k => {
                  if (hiddenItems.includes(k) && !hiddenConfigKeys.includes(k)) hiddenConfigKeys.push(k);
                });
              } else {
                ehrShowMoreResidents.forEach(k => {
                  if (showMorePromoted.includes(k)) return;
                  if (mainConfigKeys.includes(k)) return;
                  if (showMoreConfigItems.some(item => item.key === k)) return;
                  if (!hiddenItems.includes(k)) showMoreConfigItems.push({ key: k, type: 'opt-in' });
                });
                userShowMoreEhr.forEach(k => {
                  if (mainConfigKeys.includes(k)) return;
                  if (showMoreConfigItems.some(item => item.key === k)) return;
                  if (!hiddenItems.includes(k) && !showMorePromoted.includes(k)) showMoreConfigItems.push({ key: k, type: 'opt-in' });
                });
                hiddenFromOrder(order).filter(k => k !== 'settings').forEach(k => hiddenConfigKeys.push(k));
                ehrShowMoreResidents.forEach(k => {
                  if (hiddenItems.includes(k)) hiddenConfigKeys.push(k);
                });
                userShowMoreEhr.forEach(k => {
                  if (hiddenItems.includes(k) && !hiddenConfigKeys.includes(k)) hiddenConfigKeys.push(k);
                });
              }

              const lockedMeta: Record<string, { icon: React.ReactNode; label: string }> = {
                'messages-locked':     { icon: <MessageSquare className="size-5 flex-shrink-0" />, label: 'Messages' },
                'appointments-locked': { icon: <Calendar className="size-5 flex-shrink-0" />,      label: 'Appointments' },
                'billing-locked':      { icon: <CreditCard className="size-5 flex-shrink-0" />,    label: 'Billing' },
              };

              const renderConfigMainItem = (key: string) => {
                const content = mode === 'transcriber' ? renderTranscriberItem(key) : renderEHRItem(key);
                if (!content) return null;
                const isDragging = draggedItem === key;
                const isDropTarget = dragOverItem === key && draggedItem !== key && (draggedSection === 'main' || draggedSection === 'hidden' || draggedSection === 'showMore');
                return (
                  <div
                    key={key}
                    draggable={true}
                    onDragStart={() => { setDraggedItem(key); setDraggedSection('main'); }}
                    onDragOver={(e) => { e.preventDefault(); if (draggedSection === 'main' || draggedSection === 'hidden' || draggedSection === 'showMore') setDragOverItem(key); }}
                    onDrop={() => handleDrop(mode)}
                    onDragEnd={() => { setDraggedItem(null); setDragOverItem(null); setDraggedSection(null); }}
                    className={`relative flex items-center cursor-grab active:cursor-grabbing ${isDropTarget ? `ring-1 ${ringClass} rounded-xl` : ''} ${isDragging ? 'opacity-50' : ''}`}
                  >
                    {!shouldShowCollapsed() && <GripVertical className="size-4 text-gray-400 flex-shrink-0 ml-1 mr-[-4px]" />}
                    <div className="flex-1 min-w-0">{content}</div>
                    {!shouldShowCollapsed() && (
                      <button
                        onClick={(e) => { e.stopPropagation(); hideItem(key, mode); }}
                        className="absolute right-2 top-[10px] size-5 flex items-center justify-center rounded-md z-10 transition-colors bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#64748b]"
                        title="Hide item"
                      >
                        <X className="size-3" />
                      </button>
                    )}
                  </div>
                );
              };

              const renderConfigShowMoreItem = ({ key, type }: ShowMoreItem) => {
                const isLocked = type === 'locked';
                const isOptIn = type === 'opt-in';
                const meta = navItemMeta[key] ?? lockedMeta[key];
                if (!meta) return null;

                if (isLocked) {
                  return (
                    <div key={key} className="flex items-center py-[10px] px-3 rounded-xl text-[#64748b] dark:text-gray-300 opacity-60">
                      <div className="w-5 flex-shrink-0 ml-1 mr-[-4px]" />
                      <div className="flex-1 flex items-center">
                        {meta.icon}
                        <span className="ml-3 text-sm font-medium whitespace-nowrap flex-1">{meta.label}</span>
                        <Lock className="size-3 text-gray-400 flex-shrink-0" />
                      </div>
                    </div>
                  );
                }

                if (isOptIn) {
                  const isDragging = draggedItem === key;
                  const isDropTarget = dragOverItem === key && draggedItem !== key && (draggedSection === 'showMore' || draggedSection === 'main');
                  return (
                    <div
                      key={key}
                      draggable={true}
                      onDragStart={() => { setDraggedItem(key); setDraggedSection('showMore'); }}
                      onDragOver={(e) => { e.preventDefault(); if (draggedSection === 'showMore' || draggedSection === 'main') setDragOverItem(key); }}
                      onDrop={() => {
                        if (draggedSection === 'showMore') handleDrop(mode);
                        else if (draggedSection === 'main') handleDropToShowMore(mode, key);
                      }}
                      onDragEnd={() => { setDraggedItem(null); setDragOverItem(null); setDraggedSection(null); }}
                      className={`relative flex items-center cursor-grab active:cursor-grabbing ${isDropTarget ? `ring-1 ${ringClass} rounded-xl` : ''} ${isDragging ? 'opacity-50' : ''}`}
                    >
                      {!shouldShowCollapsed() && <GripVertical className="size-4 text-gray-400 flex-shrink-0 ml-1 mr-[-4px]" />}
                      <div className="flex-1 min-w-0">{renderEHRItem(key)}</div>
                      {!shouldShowCollapsed() && (
                        <button
                          onClick={(e) => { e.stopPropagation(); hideItem(key, mode); }}
                          className="absolute right-2 top-[10px] size-5 flex items-center justify-center rounded-md z-10 transition-colors bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#64748b]"
                          title="Hide item"
                        >
                          <X className="size-3" />
                        </button>
                      )}
                    </div>
                  );
                }

                return null;
              };

              const renderConfigHiddenItem = (key: string) => {
                const meta = navItemMeta[key];
                if (!meta) return null;
                const isDragging = draggedItem === key;
                return (
                  <div
                    key={key}
                    draggable={true}
                    onDragStart={() => { setDraggedItem(key); setDraggedSection('hidden'); }}
                    onDragEnd={() => { setDraggedItem(null); setDragOverItem(null); setDraggedSection(null); }}
                    className={`relative flex items-center cursor-grab active:cursor-grabbing opacity-60 ${isDragging ? 'opacity-30' : ''}`}
                  >
                    {!shouldShowCollapsed() && <GripVertical className="size-4 text-gray-400 flex-shrink-0 ml-1 mr-[-4px]" />}
                    <div className="flex-1 flex items-center py-[10px] px-3 rounded-xl text-[#64748b] dark:text-gray-300">
                      {meta.icon}
                      <span className="ml-3 text-sm font-medium whitespace-nowrap flex-1">{meta.label}</span>
                    </div>
                    {!shouldShowCollapsed() && (
                      <button
                        onClick={(e) => { e.stopPropagation(); restoreItem(key, mode); }}
                        className="absolute right-2 top-[10px] size-5 flex items-center justify-center rounded-md z-10 transition-colors bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        title="Restore"
                      >
                        <EyeOff className="size-3 text-gray-400" />
                      </button>
                    )}
                  </div>
                );
              };

              return (
                <>
                  {mainConfigKeys.map(key => renderConfigMainItem(key))}

                  {!shouldShowCollapsed() && (
                    <>
                      <div
                        className={`mt-3 rounded-xl transition-all ${draggedSection === 'main' ? 'ring-1 ring-[#00c0ff]/40' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); if (draggedSection === 'main') setDragOverItem('__showmore_section__'); }}
                        onDragLeave={() => setDragOverItem(null)}
                        onDrop={(e) => { e.stopPropagation(); if (draggedSection === 'main' && draggedItem) handleDropToShowMore(mode, null); }}
                      >
                        <div className="flex items-center gap-2 px-2 py-1">
                          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Show More</span>
                          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                        </div>
                        <div className="space-y-1 mt-1">
                          {showMoreConfigItems.map(item => renderConfigShowMoreItem(item))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center gap-2 px-2 py-1">
                          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Hidden</span>
                          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                        </div>
                        <div className="space-y-1 mt-1">
                          {hiddenConfigKeys.length === 0 ? (
                            <p className="text-xs text-gray-400 text-center py-2">No hidden items</p>
                          ) : (
                            hiddenConfigKeys.map(key => renderConfigHiddenItem(key))
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="mt-1">
                    {mode === 'transcriber' ? renderSettingsItem(true) : renderSettingsItem(false)}
                  </div>
                </>
              );
            }

            // ── Normal mode ───────────────────────────────────────────────────────
            return (
              <>
                {itemsToRender.map((key) => {
                  const content = mode === 'transcriber' ? renderTranscriberItem(key) : renderEHRItem(key);
                  if (!content) return null;
                  return <div key={key}>{content}</div>;
                })}

                {/* Show More block */}
                {!shouldShowCollapsed() && (
                  <div className="mt-2">
                    <div className="flex justify-center py-1.5">
                      <button
                        onClick={() => setIsShowMoreExpanded(!isShowMoreExpanded)}
                        className="flex items-center justify-center p-1.5 rounded-full transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <ChevronDown className={`size-4 transition-transform duration-200 ${isShowMoreExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {isShowMoreExpanded && (
                      <>
                        <div className="border-t border-gray-100 dark:border-gray-700 mb-1" />

                        {/* Provider Show More: unified list of residents + user-moved items */}
                        {isProviderPlan && (() => {
                          const providerDefaultResidents = ['ai-transcriber', 'session-notes', 'prescriptions', 'resources', 'ai-crm', 'refer-earn'];
                          const providerShowMoreKeys = [...new Set([
                            ...providerDefaultResidents.filter(k => !hiddenItems.includes(k) && !showMorePromoted.includes(k) && !userShowMoreProvider.includes(k) && !mainNavKeys.has(k)),
                            ...userShowMoreProvider.filter(k => !hiddenItems.includes(k) && !showMorePromoted.includes(k) && !mainNavKeys.has(k)),
                          ])];
                          return providerShowMoreKeys.map(k => (
                            <div key={k}>{renderEHRItem(k)}</div>
                          ));
                        })()}

                        {/* Locked items + unified Show More for Transcriber-only */}
                        {isTranscriberOnly && (
                          <>
                            {[
                              { icon: <MessageSquare className="size-5 flex-shrink-0" />, label: 'Messages' },
                              { icon: <Calendar className="size-5 flex-shrink-0" />, label: 'Appointments' },
                              { icon: <CreditCard className="size-5 flex-shrink-0" />, label: 'Billing' },
                            ].map(({ icon, label }) => (
                              <button
                                key={label}
                                onClick={() => setShowEHRUpgradePopup(true)}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                              >
                                {icon}
                                <span className="ml-3 text-sm font-medium">{label}</span>
                              </button>
                            ))}
                            {/* Unified hideable residents + user-moved items */}
                            {(() => {
                              const transcriberDefaultResidents = ['ai-transcriber', 'session-notes', 'prescriptions', 'resources', 'ai-crm', 'refer-earn'];
                              const transcriberShowMoreKeys = [...new Set([
                                ...transcriberDefaultResidents.filter(k => !hiddenItems.includes(k) && !showMorePromoted.includes(k) && !userShowMoreTranscriber.includes(k) && !mainNavKeys.has(k)),
                                ...userShowMoreTranscriber.filter(k => !hiddenItems.includes(k) && !showMorePromoted.includes(k) && !mainNavKeys.has(k)),
                              ])];
                              return transcriberShowMoreKeys.map(k => (
                                <div key={k}>{renderTranscriberItem(k)}</div>
                              ));
                            })()}
                          </>
                        )}

                        {/* EHR: unified default residents + user-moved items */}
                        {!isTranscriberOnly && !isProviderPlan && (() => {
                          const ehrDefaultResidents = ['ai-transcriber', 'session-notes', 'prescriptions', 'resources', 'ai-crm', 'refer-earn']
                            .filter(k => !(k === 'prescriptions' && aiScribePrescriptionPref === 'no'));
                          const ehrShowMoreKeys = [...new Set([
                            ...ehrDefaultResidents.filter(k => !hiddenItems.includes(k) && !showMorePromoted.includes(k) && !userShowMoreEhr.includes(k) && !mainNavKeys.has(k)),
                            ...userShowMoreEhr.filter(k => !hiddenItems.includes(k) && !showMorePromoted.includes(k) && !mainNavKeys.has(k)),
                          ])];
                          return ehrShowMoreKeys.map(k => (
                            <div key={k}>{renderEHRItem(k)}</div>
                          ));
                        })()}
                      </>
                    )}
                  </div>
                )}
              </>
            );
          })()}
        </nav>


        {/* Elevate with Mantra Provider — positioned directly above provider name (Full EHR & AI Scribe only) */}
        {!isProviderPlan && (
          <div className="px-3 pb-1">
            {!shouldShowCollapsed() ? (
              <button
                onClick={() => navigate("/mantra-provider")}
                className="flex items-center gap-3 py-[10px] px-3 rounded-xl transition-all w-full text-left text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Crown className="size-5 flex-shrink-0" />
                <span className="text-sm font-medium">Become a Mantra Provider</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/mantra-provider")}
                className="flex items-center justify-center py-[10px] px-3 rounded-xl w-full text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                title="Become a Mantra Provider"
              >
                <Crown className="size-5" />
              </button>
            )}
          </div>
        )}

        {/* User Profile */}
        <div className="px-3 pb-3 space-y-1 relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`w-full flex items-center ${shouldShowCollapsed() ? 'justify-center' : ''} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700`}
            title={shouldShowCollapsed() ? providerName : undefined}
          >
            <div className="size-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {providerInitials}
            </div>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${shouldShowCollapsed() ? 'opacity-0 absolute' : 'opacity-100'}`}>
              {providerName}
            </span>
          </button>

          {/* Profile Menu Popup */}
          {isProfileMenuOpen && !shouldShowCollapsed() && (
            <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl shadow-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {/* User info header */}
              <div className="px-4 py-3 border-b flex items-center gap-3 border-gray-100 dark:border-gray-700">
                <div className="size-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {providerInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">{providerName}</p>
                  <p className="text-xs truncate text-[#64748B]">{currentProvider?.email || "john@mantracare.com"}</p>
                </div>
              </div>
              <button
                onClick={() => { setIsConfigureMenuMode(true); setIsProfileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors border-b hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
              >
                <Menu className="size-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Configure Menu</span>
              </button>
              <Link
                to="/profile"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 transition-colors border-b hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
              >
                <User className="size-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Profile</span>
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("mantra_logged_in");
                  setIsProfileMenuOpen(false);
                  navigate("/get-started");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <LogOut className="size-5 text-red-600 dark:text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-500">Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`fixed top-0 bottom-0 overflow-auto transition-all duration-300 left-0 right-0 pt-[57px] md:pt-0 ${
          shouldShowCollapsed()
            ? 'md:left-[64px]'
            : 'md:left-[256px]'
        }`}
      >
        {/* Page content */}
        <main className={`${
          isViewTranscriptionNotePage
            ? ''
            : isChatPage
              ? 'py-8 px-6'
              : isEditProfilePage
                ? ''
                : 'py-8'
        }`}>
          <div className={`${
            isViewTranscriptionNotePage
              ? ''
              : isChatPage
                ? ''
                : isEditProfilePage
                  ? ''
                  : isSettingsPage
                    ? 'w-full px-2'
                    : 'max-w-[1000px] mx-auto w-full px-6'
          }`}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster />

      {/* Premium Upgrade Popup */}
      {showPremiumUpgradePopup && (
        <MantraProviderUpgradePopup
          onClose={() => setShowPremiumUpgradePopup(false)}
          onGetListed={() => {
            setShowPremiumUpgradePopup(false);
            navigate("/onboarding");
          }}
        />
      )}

      {/* EHR Upgrade Popup — shown in transcriber mode when locked features are clicked */}
      {showEHRUpgradePopup && (
        <UnlockEHRPopup
          onClose={() => setShowEHRUpgradePopup(false)}
          onUpgradeEHR={() => {
            setShowEHRUpgradePopup(false);
            navigate("/settings/billing", { state: { openAvailablePlans: true } });
          }}
          onGetListed={() => {
            setShowEHRUpgradePopup(false);
            navigate("/onboarding");
          }}
        />
      )}

      {/* Dev Role Switcher */}
      <DevRoleSwitcher />
    </div>
  );
}
