import { useState, useMemo } from "react";
import { Search, FileText, Plus, Copy, Eye, Pencil, X, Archive, RotateCcw, Share2, ExternalLink, Calendar, User, Filter, ChevronDown } from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import type { IntakeForm, FormField, FieldType } from "../types/partnerDashboard";
import { mockClients } from "../data/mockPartnerData";
import { toast } from "sonner";

const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  short_answer: "Short Answer",
  long_answer: "Long Answer",
  multiple_choice: "Multiple Choice",
  dropdown: "Dropdown",
  checkbox_multiselect: "Checkbox (Multi-Select)",
  yes_no: "Yes / No",
  date: "Date",
  agreement_text: "Agreement Text",
  e_signature: "E-Signature",
  file_upload: "File Upload",
  screening_instrument: "Screening Instrument",
};

const APPLICABLE_SERVICES_OPTIONS = ["Therapy", "Diet", "Physio", "Yoga"];

type TabType = "forms" | "entries" | "archived";

export function IntakeForms() {
  const {
    intakeForms, setIntakeForms,
    formEntries, setFormEntries,
    currentEstablishmentId,
    isCurrentUserAdmin,
    providers,
  } = usePartnerDashboard();

  const [activeTab, setActiveTab] = useState<TabType>("forms");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "template" | "custom">("all");
  const [entriesSearch, setEntriesSearch] = useState("");
  const [entriesFormFilter, setEntriesFormFilter] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewForm, setShowPreviewForm] = useState<IntakeForm | null>(null);
  const [showShareModal, setShowShareModal] = useState<IntakeForm | null>(null);
  const [editingForm, setEditingForm] = useState<IntakeForm | null>(null);

  const establishmentForms = useMemo(
    () => intakeForms.filter((f) => f.establishmentId === currentEstablishmentId),
    [intakeForms, currentEstablishmentId]
  );

  const activeForms = useMemo(
    () => establishmentForms.filter((f) => !f.isArchived),
    [establishmentForms]
  );

  const archivedForms = useMemo(
    () => establishmentForms.filter((f) => f.isArchived),
    [establishmentForms]
  );

  const establishmentEntries = useMemo(
    () => formEntries.filter((fe) => {
      const form = intakeForms.find((f) => f.id === fe.formId);
      return form?.establishmentId === currentEstablishmentId;
    }),
    [formEntries, intakeForms, currentEstablishmentId]
  );

  const filteredActiveForms = useMemo(() => {
    let list = activeForms;
    if (typeFilter === "template") list = list.filter((f) => f.isTemplate);
    if (typeFilter === "custom") list = list.filter((f) => !f.isTemplate);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q));
    }
    return list;
  }, [activeForms, typeFilter, searchQuery]);

  const filteredArchivedForms = useMemo(() => {
    let list = archivedForms;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q));
    }
    return list;
  }, [archivedForms, searchQuery]);

  const filteredEntries = useMemo(() => {
    let list = establishmentEntries;
    if (entriesFormFilter !== "all") {
      list = list.filter((fe) => fe.formId === entriesFormFilter);
    }
    if (entriesSearch) {
      const q = entriesSearch.toLowerCase();
      list = list.filter((fe) => {
        const form = intakeForms.find((f) => f.id === fe.formId);
        const client = mockClients.find((c) => c.id === fe.clientId);
        return fe.id.toLowerCase().includes(q) ||
          (form?.name || "").toLowerCase().includes(q) ||
          (client?.name || "").toLowerCase().includes(q);
      });
    }
    return [...list].sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }, [establishmentEntries, entriesFormFilter, entriesSearch, intakeForms]);

  function getEntryCount(formId: string) {
    return establishmentEntries.filter((fe) => fe.formId === formId).length;
  }

  function getFormName(formId: string) {
    return intakeForms.find((f) => f.id === formId)?.name ?? "Unknown";
  }

  function getClientName(clientId: string) {
    return mockClients.find((c) => c.id === clientId)?.name ?? "Unknown";
  }

  function getProviderName(providerId: string) {
    return providers.find((p) => p.id === providerId)?.name ?? "Unknown";
  }

  function handleArchive(formId: string) {
    setIntakeForms((prev) =>
      prev.map((f) => (f.id === formId ? { ...f, isArchived: true } : f))
    );
  }

  function handleRestore(formId: string) {
    setIntakeForms((prev) =>
      prev.map((f) => (f.id === formId ? { ...f, isArchived: false } : f))
    );
  }

  function handleDelete(formId: string) {
    setIntakeForms((prev) => prev.filter((f) => f.id !== formId));
  }

  const statusDisplay: Record<string, string> = {
    requested: "Requested (Assigned)",
    draft: "Draft",
    submitted: "Submitted",
  };

  const statusColors: Record<string, string> = {
    requested: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    draft: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    submitted: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  };

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: "forms", label: "Form", count: activeForms.length },
    { key: "entries", label: "Entries", count: establishmentEntries.length },
    { key: "archived", label: "Archived", count: archivedForms.length },
  ];

  return (
    <div className="max-w-[1200px] space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Intake Forms</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage intake form templates, entries, and archived forms
          </p>
        </div>
        {activeTab !== "archived" && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus className="size-4" />
            <span className="hidden md:inline">Create a New Form</span>
            <span className="md:hidden">New Form</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "border-[#043570] text-[#043570] dark:text-[#00c0ff] dark:border-[#00c0ff]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key
                  ? "bg-[#043570]/10 dark:bg-[#00c0ff]/10 text-[#043570] dark:text-[#00c0ff]"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Forms Tab ── */}
      {activeTab === "forms" && (
        <div className="space-y-4">
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or ID..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="size-4 text-gray-400 flex-shrink-0" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as "all" | "template" | "custom")}
                className="px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
              >
                <option value="all">All Types</option>
                <option value="template">Templates</option>
                <option value="custom">Created by you</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Entries</th>
                    {isCurrentUserAdmin && (
                      <>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created by</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicable Services</th>
                      </>
                    )}
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {filteredActiveForms.map((form) => (
                    <tr key={form.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-gray-400">{form.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`size-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            form.category === "clinical"
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                              : "bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                          }`}>
                            <FileText className="size-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{form.name}</span>
                            <span className={`text-[10px] font-medium ml-2 px-1.5 py-0.5 rounded ${
                              form.category === "clinical"
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                                : "bg-amber-50 dark:bg-amber-900/20 text-amber-500"
                            }`}>
                              {form.category === "clinical" ? "Clinical" : "Admin"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {form.isTemplate ? (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                            Template
                          </span>
                        ) : (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                            Created by you
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{getEntryCount(form.id)}</span>
                      </td>
                      {isCurrentUserAdmin && (
                        <>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {form.createdBy ? getProviderName(form.createdBy) : "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {form.applicableServices.length > 0
                                ? form.applicableServices.map((s) => (
                                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                      {s}
                                    </span>
                                  ))
                                : <span className="text-xs text-gray-400">—</span>
                              }
                            </div>
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <ActionBtn icon={<Eye className="size-3.5" />} label="View" onClick={() => setShowPreviewForm(form)} />
                          {!form.isTemplate && (
                            <>
                              <ActionBtn icon={<Pencil className="size-3.5" />} label="Edit" onClick={() => setEditingForm(form)} />
                              <ActionBtn icon={<Archive className="size-3.5" />} label="Archive" onClick={() => handleArchive(form.id)} />
                              <ActionBtn icon={<X className="size-3.5" />} label="Delete" onClick={() => handleDelete(form.id)} />
                            </>
                          )}
                          {form.isTemplate && (
                            <ActionBtn icon={<Copy className="size-3.5" />} label="Duplicate" onClick={() => handleDuplicate(form)} />
                          )}
                          <ActionBtn icon={<Share2 className="size-3.5" />} label="Share" onClick={() => setShowShareModal(form)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredActiveForms.length === 0 && (
                    <tr>
                      <td colSpan={isCurrentUserAdmin ? 7 : 5} className="px-4 py-8 text-center text-sm text-gray-400">
                        {searchQuery || typeFilter !== "all"
                          ? "No forms match your search."
                          : "No forms yet. Create one to get started."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Entries Tab ── */}
      {activeTab === "entries" && (
        <div className="space-y-4">
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={entriesSearch}
                onChange={(e) => setEntriesSearch(e.target.value)}
                placeholder="Search by Entry ID, form name, or client name..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="size-4 text-gray-400 flex-shrink-0" />
              <select
                value={entriesFormFilter}
                onChange={(e) => setEntriesFormFilter(e.target.value)}
                className="px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
              >
                <option value="all">All Forms</option>
                {activeForms.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Entry ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Form Name</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    {isCurrentUserAdmin && (
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Provider</th>
                    )}
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(entry.requestedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-gray-400">{entry.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{getClientName(entry.clientId)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{getFormName(entry.formId)}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusColors[entry.status] || statusColors.requested}`}>
                          {statusDisplay[entry.status] || entry.status}
                        </span>
                      </td>
                      {isCurrentUserAdmin && (
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{getProviderName(entry.providerId)}</span>
                        </td>
                      )}
                      <td className="px-4 py-3 text-right">
                        <ActionBtn icon={<Eye className="size-3.5" />} label="View" onClick={() => {}} />
                      </td>
                    </tr>
                  ))}
                  {filteredEntries.length === 0 && (
                    <tr>
                      <td colSpan={isCurrentUserAdmin ? 7 : 6} className="px-4 py-8 text-center text-sm text-gray-400">
                        {entriesSearch || entriesFormFilter !== "all"
                          ? "No entries match your search."
                          : "No form entries yet."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Archived Tab ── */}
      {activeTab === "archived" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archived forms..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Entries</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {filteredArchivedForms.map((form) => (
                    <tr key={form.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-gray-400">{form.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`size-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            form.category === "clinical"
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                              : "bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                          }`}>
                            <FileText className="size-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{form.name}</span>
                            <span className={`text-[10px] font-medium ml-2 px-1.5 py-0.5 rounded ${
                              form.category === "clinical"
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                                : "bg-amber-50 dark:bg-amber-900/20 text-amber-500"
                            }`}>
                              {form.category === "clinical" ? "Clinical" : "Admin"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                          {form.isTemplate ? "Template" : "Created by you"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{getEntryCount(form.id)}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <ActionBtn icon={<RotateCcw className="size-3.5" />} label="Restore" onClick={() => handleRestore(form.id)} />
                          <ActionBtn icon={<Eye className="size-3.5" />} label="View Preview" onClick={() => setShowPreviewForm(form)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredArchivedForms.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">
                        {searchQuery ? "No archived forms match your search." : "No archived forms."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewForm && (
        <PreviewFormModal form={showPreviewForm} onClose={() => setShowPreviewForm(null)} />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareFormModal
          form={showShareModal}
          intakeForms={intakeForms}
          formEntries={formEntries}
          setFormEntries={setFormEntries}
          onClose={() => setShowShareModal(null)}
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateFormModal
          intakeForms={intakeForms}
          setIntakeForms={setIntakeForms}
          currentEstablishmentId={currentEstablishmentId}
          isCurrentUserAdmin={isCurrentUserAdmin}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Edit Modal */}
      {editingForm && (
        <EditFormModal
          form={editingForm}
          intakeForms={intakeForms}
          setIntakeForms={setIntakeForms}
          onClose={() => setEditingForm(null)}
        />
      )}
    </div>
  );

  function handleDuplicate(sourceForm: IntakeForm) {
    const newForm: IntakeForm = {
      id: `form-custom-${Date.now()}`,
      establishmentId: currentEstablishmentId ?? "est-1",
      name: `${sourceForm.name} (Copy)`,
      category: sourceForm.category,
      isTemplate: false,
      templateSourceId: sourceForm.id,
      applicableServices: [],
      createdBy: null as unknown as undefined,
      fields: sourceForm.fields.map((f) => ({ ...f, id: `${f.id}-${Date.now()}` })),
    };
    setIntakeForms((prev) => [...prev, newForm]);
  }
}

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group relative"
      title={label}
    >
      {icon}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {label}
      </span>
    </button>
  );
}

// ── Preview Form Modal ──────────────────────────────────────────────────────

function PreviewFormModal({ form, onClose }: { form: IntakeForm; onClose: () => void }) {
  const sortedFields = [...form.fields].sort((a, b) => a.order - b.order);
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="size-4 text-indigo-500" />
              {form.name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {sortedFields.length} field{sortedFields.length !== 1 ? "s" : ""}
              {" · "}{form.category === "clinical" ? "Clinical" : "Administrative"}
              {form.isTemplate ? " · Template" : ""}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 md:p-5 overflow-y-auto space-y-2">
          {sortedFields.map((field, idx) => (
            <div key={field.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <span className="text-xs font-mono text-gray-400 w-5 text-right">{idx + 1}.</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1">{field.label}</span>
              <span className="text-[10px] text-gray-400 w-20 text-right">{FIELD_TYPE_LABELS[field.type]}</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                field.required ? "bg-red-50 dark:bg-red-900/20 text-red-500" : "bg-gray-100 dark:bg-gray-600 text-gray-400"
              }`}>
                {field.required ? "Req" : "Opt"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Share (Send to Client) Modal ─────────────────────────────────────────────

function ShareFormModal({
  form,
  intakeForms,
  formEntries,
  setFormEntries,
  onClose,
}: {
  form: IntakeForm;
  intakeForms: IntakeForm[];
  formEntries: { clientId: string; formId: string }[];
  setFormEntries: React.Dispatch<React.SetStateAction<{ id: string; clientId: string; formId: string; providerId: string; status: "requested" | "draft" | "submitted"; requestedAt: string; submittedAt?: string; sentViaFlowId?: string }[]>>;
  onClose: () => void;
}) {
  const { currentProviderId } = usePartnerDashboard();
  const [selectedClientId, setSelectedClientId] = useState("");

  function handleSend() {
    if (!selectedClientId) return;
    const newEntry = {
      id: `fe-share-${Date.now()}`,
      clientId: selectedClientId,
      formId: form.id,
      providerId: currentProviderId,
      status: "requested" as const,
      requestedAt: new Date().toISOString(),
    };
    setFormEntries((prev) => [...prev, newEntry]);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Share2 className="size-4 text-blue-500" />
            Send Form to Client
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Send <strong>{form.name}</strong> to a client. They will receive a link to fill it out.
          </p>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Select Client</label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
            >
              <option value="">Choose a client...</option>
              {mockClients.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleSend}
              disabled={!selectedClientId}
              className="flex-1 px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors"
            >
              Send
            </button>
            <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Create Form Modal ────────────────────────────────────────────────────────

function CreateFormModal({
  intakeForms,
  setIntakeForms,
  currentEstablishmentId,
  isCurrentUserAdmin,
  onClose,
}: {
  intakeForms: IntakeForm[];
  setIntakeForms: React.Dispatch<React.SetStateAction<IntakeForm[]>>;
  currentEstablishmentId: string | null;
  isCurrentUserAdmin: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"select" | "blank" | "duplicate">("select");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"administrative" | "clinical">("clinical");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceOptions, setServiceOptions] = useState<string[]>(APPLICABLE_SERVICES_OPTIONS);
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [showAddCustomService, setShowAddCustomService] = useState(false);
  const [sourceFormId, setSourceFormId] = useState("");

  const establishmentForms = intakeForms.filter((f) => f.establishmentId === currentEstablishmentId && !f.isArchived);

  function handleCreate() {
    if (!title.trim()) return;

    let fields: FormField[] = [];
    if (mode === "duplicate" && sourceFormId) {
      const source = establishmentForms.find((f) => f.id === sourceFormId);
      if (source) {
        fields = source.fields.map((f) => ({ ...f, id: `${f.id}-${Date.now()}` }));
      }
    }

    const newForm: IntakeForm = {
      id: `form-custom-${Date.now()}`,
      establishmentId: currentEstablishmentId ?? "est-1",
      name: title.trim(),
      description: description.trim() || undefined,
      category,
      isTemplate: isCurrentUserAdmin && selectedServices.length > 0,
      templateSourceId: mode === "duplicate" ? sourceFormId : undefined,
      applicableServices: selectedServices,
      createdBy: null as unknown as undefined,
      fields,
    };
    setIntakeForms((prev) => [...prev, newForm]);
    onClose();
  }

  function handleAddCustomService() {
    const val = customServiceInput.trim();
    if (!val) return;
    if (serviceOptions.some((s) => s.toLowerCase() === val.toLowerCase())) {
      toast.error("Service option already exists");
      return;
    }
    setServiceOptions((prev) => [...prev, val]);
    setCustomServiceInput("");
    setShowAddCustomService(false);
  }

  function toggleService(svc: string) {
    setSelectedServices((prev) => {
      if (prev.includes(svc)) {
        return prev.filter((s) => s !== svc);
      } else {
        if (prev.length >= 4) {
          toast.error("Only 4 services can be selected");
          return prev;
        }
        return [...prev, svc];
      }
    });
  }

  if (mode === "select") {
    return (
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Create New Form</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
              <X className="size-4" />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Start from scratch or duplicate an existing form as a starting point.
            </p>
            <button
              onClick={() => { setMode("blank"); setTitle(""); setDescription(""); }}
              className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left"
            >
              <div className="size-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Plus className="size-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Start from Blank</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Create a form with no pre-filled fields</p>
              </div>
            </button>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-center">— or duplicate an existing form —</p>
            {establishmentForms.map((f) => (
              <button
                key={f.id}
                onClick={() => { setMode("duplicate"); setSourceFormId(f.id); setTitle(`${f.name} (Copy)`); setCategory(f.category); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left"
              >
                <div className={`size-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  f.category === "clinical" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                }`}>
                  <FileText className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{f.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {f.fields.length} fields · {f.category}
                    {f.isTemplate ? " · Template" : " · Custom"}
                  </p>
                </div>
                <Copy className="size-4 text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>
          <div className="p-4 md:p-5 border-t border-gray-100 dark:border-gray-700">
            <button onClick={onClose} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            {mode === "blank" ? "Create Blank Form" : "Duplicate Form"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Form Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Client Feedback Form"
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description for this form..."
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "administrative" | "clinical")}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 focus:border-[#00c0ff]"
            >
              <option value="clinical">Clinical</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>

          {/* Admin-only: Assign as template to services */}
          {isCurrentUserAdmin && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
                <span>Assign as template to services (Max 4 selected)</span>
                <span className="text-[10px] text-gray-400 font-mono">{selectedServices.length}/4 selected</span>
              </label>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                Select which service lines this template applies to. Leaving all unchecked creates a custom form.
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                {serviceOptions.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleService(svc)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      selectedServices.includes(svc)
                        ? "bg-[#043570] text-white border-[#043570]"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-[#043570]"
                    }`}
                  >
                    {svc}
                  </button>
                ))}

                {showAddCustomService ? (
                  <div className="flex items-center gap-1 border border-gray-250 dark:border-gray-600 rounded-lg p-1 bg-gray-50 dark:bg-gray-800">
                    <input
                      type="text"
                      value={customServiceInput}
                      onChange={(e) => setCustomServiceInput(e.target.value)}
                      placeholder="Service name..."
                      className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-650 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomService}
                      className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowAddCustomService(false); setCustomServiceInput(""); }}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 text-xs"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddCustomService(true)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-dashed border-gray-300 dark:border-gray-650 text-gray-555 dark:text-gray-450 hover:border-blue-500 hover:text-blue-500 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="size-3" />
                    Add Service
                  </button>
                )}
              </div>
            </div>
          )}

          {mode === "duplicate" && sourceFormId && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
              All fields and questions from the source form will be pre-populated. You can edit them later.
            </div>
          )}
        </div>
        <div className="p-4 md:p-5 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreate}
              disabled={!title.trim()}
              className="flex-1 px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors"
            >
              {mode === "blank" ? "Create Form" : "Duplicate Form"}
            </button>
            <button
              onClick={() => setMode("select")}
              className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Edit Form Modal ──────────────────────────────────────────────────────────

interface EditFormModalProps {
  form: IntakeForm;
  intakeForms: IntakeForm[];
  setIntakeForms: React.Dispatch<React.SetStateAction<IntakeForm[]>>;
  onClose: () => void;
}

function EditFormModal({
  form,
  intakeForms,
  setIntakeForms,
  onClose,
}: EditFormModalProps) {
  const [title, setTitle] = useState(form.name);
  const [description, setDescription] = useState(form.description || "");
  const [fields, setFields] = useState<FormField[]>(form.fields || []);

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldType>("short_answer");
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  function handleAddField() {
    if (!newFieldLabel.trim()) return;
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: newFieldType,
      label: newFieldLabel.trim(),
      required: newFieldRequired,
      order: fields.length + 1,
    };
    setFields((prev) => [...prev, newField]);
    setNewFieldLabel("");
    setNewFieldRequired(false);
  }

  function handleRemoveField(fieldId: string) {
    setFields((prev) => prev.filter((f) => f.id !== fieldId));
  }

  function handleSave() {
    if (!title.trim()) return;
    setIntakeForms((prev) =>
      prev.map((f) =>
        f.id === form.id
          ? {
              ...f,
              name: title.trim(),
              description: description.trim() || undefined,
              fields: fields,
            }
          : f
      )
    );
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Pencil className="size-4 text-indigo-500" />
            Edit Custom Form
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-4 md:p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 font-mono">Form Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 font-mono">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 resize-none"
            />
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 font-mono uppercase tracking-wider">Form Fields</p>

            <div className="space-y-2 mb-4">
              {fields.map((f, index) => (
                <div key={f.id} className="flex items-center justify-between gap-2.5 p-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {index + 1}. {f.label}
                      {f.required && <span className="text-red-500 ml-0.5">*</span>}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{FIELD_TYPE_LABELS[f.type]}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveField(f.id)}
                    className="p-1 rounded-lg hover:bg-red-50 hover:text-red-650 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove Field"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-xs text-gray-400 dark:text-gray-500 italic text-center py-2">No fields added yet. Add at least one field below.</p>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/30 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 space-y-3">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-400 font-mono">Add New Field</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">Field Type</label>
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as FieldType)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {Object.entries(FIELD_TYPE_LABELS).map(([val, lbl]) => (
                      <option key={val} value={val}>{lbl}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end pb-1.5 pl-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newFieldRequired}
                      onChange={(e) => setNewFieldRequired(e.target.checked)}
                      className="rounded text-[#00c0ff] focus:ring-[#00c0ff]"
                    />
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">Required Field</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">Field Label / Question</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    placeholder="e.g. Please describe your symptoms..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleAddField}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5 border-t border-gray-100 dark:border-gray-700 flex gap-2">
          <button
            onClick={handleSave}
            disabled={!title.trim() || fields.length === 0}
            className="flex-1 px-4 py-2.5 bg-[#043570] hover:bg-[#032a57] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}