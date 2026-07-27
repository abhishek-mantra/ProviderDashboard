import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Building2, Plus, Check } from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

export function PracticeSwitcher({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const {
    practices,
    practiceMembers,
    currentPracticeId,
    setCurrentPracticeId,
    currentProviderId,
    isCurrentUserAdmin,
    isCurrentUserSuperAdmin,
    getCurrentEstablishment,
  } = usePartnerDashboard();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentPractice = practices.find((p) => p.id === currentPracticeId);
  const establishment = getCurrentEstablishment();

  // Get practices where the current user has active membership
  const myPracticeIds = useMemo(
    () =>
      new Set(
        practiceMembers
          .filter(
            (m) =>
              m.providerId === currentProviderId &&
              m.memberStatus === "active"
          )
          .map((m) => m.practiceId)
      ),
    [practiceMembers, currentProviderId]
  );

  const canAccessAll = isCurrentUserAdmin || isCurrentUserSuperAdmin;

  // Practices under this establishment
  const establishmentPractices = useMemo(
    () => practices.filter((p) => p.establishmentId === establishment?.id),
    [practices, establishment?.id]
  );

  const myPractices = establishmentPractices.filter((p) => myPracticeIds.has(p.id));
  const otherPractices = establishmentPractices.filter((p) => !myPracticeIds.has(p.id));

  // Switcher is enabled for admins OR multi-practice clinicians
  const showDropdown = canAccessAll || myPractices.length > 1;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (practiceId: string) => {
    setCurrentPracticeId(practiceId);
    setIsOpen(false);
  };

  const handleAddPractice = () => {
    setIsOpen(false);
    navigate("/settings/practice-details");
  };

  if (!showDropdown && !canAccessAll) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
        <div className="size-6 bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-white font-bold text-[10px]">
            {currentPractice?.name?.charAt(0) || "P"}
          </span>
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
              {currentPractice?.name || "Practice"}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative px-3" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 py-2 px-2.5 rounded-xl transition-all border border-gray-200/80 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#00c0ff]/60 dark:hover:border-[#00c0ff]/60 shadow-sm ${
          collapsed ? "justify-center" : ""
        }`}
        title={collapsed ? `${establishment?.name} — ${currentPractice?.name}` : undefined}
      >
        <div className="size-6.5 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-white font-bold text-[11px]">
            {currentPractice?.name?.charAt(0) || "P"}
          </span>
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 text-left min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block truncate">
                {establishment?.name || "Establishment"}
              </span>
              <span className="text-xs font-bold text-gray-900 dark:text-white truncate block">
                {currentPractice?.name || "Select Practice"}
              </span>
            </div>
            <ChevronDown className={`size-4 text-gray-400 transition-transform ${isOpen ? "rotate-180 text-[#00c0ff]" : ""}`} />
          </>
        )}
      </button>

      {isOpen && !collapsed && (
        <div className="absolute left-3 right-3 mt-1.5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2.5 bg-gray-50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Establishment</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5 mt-0.5">
              <Building2 className="size-3.5 text-[#00c0ff]" />
              {establishment?.name || "Main Establishment"}
            </p>
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {canAccessAll ? "Establishment Practices" : "Your Practices"}
            </div>

            {establishmentPractices.map((p) => {
              const isSelected = p.id === currentPracticeId;
              const isMine = myPracticeIds.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-blue-50/50 dark:hover:bg-gray-700 ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-900/20 text-[#00c0ff] font-bold"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`size-5 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${
                      isSelected ? "bg-[#00c0ff] text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}>
                      {p.name.charAt(0)}
                    </div>
                    <div className="truncate">
                      <span className="truncate block font-medium">{p.name}</span>
                      <span className="text-[10px] text-gray-400 block">{p.city || "Virtual"}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="size-3.5 text-[#00c0ff] flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {canAccessAll && (
            <div className="p-1.5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-750">
              <button
                onClick={handleAddPractice}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#00c0ff]/10 hover:bg-[#00c0ff]/20 text-[#00c0ff] rounded-xl text-xs font-bold transition-colors"
              >
                <Plus className="size-3.5" />
                Add Practice Location
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
