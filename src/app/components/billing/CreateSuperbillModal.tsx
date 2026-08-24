import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Search,
  Check,
  ChevronRight,
  ArrowLeft,
  Calendar,
  FileText,
  CheckCircle2,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import { usePartnerDashboard } from "../../contexts/PartnerDashboardContext";
import { useClaims } from "../../contexts/ClaimContext";
import { MockClient } from "../../types/partnerDashboard";

interface CreateSuperbillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SuperbillSelectableItem {
  id: string;
  type: "session" | "bill";
  dateOfService: string;
  cptCode: string;
  serviceDescription: string;
  diagnosisCode: string;
  amount: number;
  noteStatus: "locked" | "draft" | "signed";
  statusLabel: string;
}

export function CreateSuperbillModal({ isOpen, onClose }: CreateSuperbillModalProps) {
  const navigate = useNavigate();
  const { clients, bills } = usePartnerDashboard();
  const { unbilledSessions } = useClaims();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedClient, setSelectedClient] = useState<MockClient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  // Filter clients for Step 1
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const q = searchQuery.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.insuranceCompany && c.insuranceCompany.toLowerCase().includes(q)) ||
        (c.diagnosisCode && c.diagnosisCode.toLowerCase().includes(q))
    );
  }, [clients, searchQuery]);

  // Derive appointments / billable sessions for selected client in Step 2
  const clientItems = useMemo<SuperbillSelectableItem[]>(() => {
    if (!selectedClient) return [];

    const items: SuperbillSelectableItem[] = [];
    const seenIds = new Set<string>();

    // 1. Unbilled sessions for this client
    const matchingUnbilled = unbilledSessions.filter(
      (s) => s.clientId === selectedClient.id || s.clientName === selectedClient.name
    );
    matchingUnbilled.forEach((s) => {
      seenIds.add(s.id);
      items.push({
        id: s.id,
        type: "session",
        dateOfService: s.dateOfService,
        cptCode: s.cptCode || "90834",
        serviceDescription: s.serviceDescription || "Psychotherapy, 45 min",
        diagnosisCode: s.diagnosisCode || selectedClient.diagnosisCode || "F41.1",
        amount: s.amount || 150,
        noteStatus: s.notesStatus === "locked" ? "locked" : "draft",
        statusLabel: s.notesStatus === "locked" ? "Signed & Locked" : "Note Draft",
      });
    });

    // 2. Existing bills for this client
    const matchingBills = bills.filter(
      (b) => b.clientId === selectedClient.id || b.clientName === selectedClient.name
    );
    matchingBills.forEach((b) => {
      if (!seenIds.has(b.id) && !seenIds.has(b.sessionId || "")) {
        seenIds.add(b.id);
        items.push({
          id: b.id,
          type: "bill",
          dateOfService: b.dateOfService || b.dueDate || "2026-08-20",
          cptCode: b.cptCode || "90837",
          serviceDescription: b.serviceType || "Psychotherapy, 60 min",
          diagnosisCode: b.diagnosisCodes?.[0] || selectedClient.diagnosisCode || "F41.1",
          amount: b.amount || 175,
          noteStatus: "locked",
          statusLabel: "Billed / Invoiced",
        });
      }
    });

    // If client has no recorded sessions in mock data, synthesize standard sessions for smooth demo flow
    if (items.length === 0) {
      const dates = ["2026-08-20", "2026-08-13", "2026-08-06"];
      dates.forEach((d, idx) => {
        items.push({
          id: `synth-${selectedClient.id}-${idx}`,
          type: "session",
          dateOfService: d,
          cptCode: idx === 0 ? "90834" : idx === 1 ? "90837" : "90791",
          serviceDescription:
            idx === 0
              ? "Individual Psychotherapy, 45 min"
              : idx === 1
              ? "Individual Psychotherapy, 60 min"
              : "Psychiatric Diagnostic Evaluation",
          diagnosisCode: selectedClient.diagnosisCode || "F41.1",
          amount: idx === 2 ? 220 : idx === 1 ? 175 : 150,
          noteStatus: "locked",
          statusLabel: "Signed & Locked",
        });
      });
    }

    return items;
  }, [selectedClient, unbilledSessions, bills]);

  // When client is selected, proceed to Step 2 with clean selection
  const handleClientSelectedWithItems = (client: MockClient) => {
    setSelectedClient(client);
    setSelectedItemIds([]);
    setStep(2);
  };

  const handleToggleItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedItemIds.length === clientItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(clientItems.map((i) => i.id));
    }
  };

  const selectedTotal = useMemo(() => {
    return clientItems
      .filter((i) => selectedItemIds.includes(i.id))
      .reduce((sum, i) => sum + i.amount, 0);
  }, [clientItems, selectedItemIds]);

  const handleGenerateSuperbill = () => {
    if (!selectedClient || selectedItemIds.length === 0) return;

    const sessionIds = clientItems
      .filter((i) => selectedItemIds.includes(i.id) && i.type === "session")
      .map((i) => i.id);

    const billIds = clientItems
      .filter((i) => selectedItemIds.includes(i.id) && i.type === "bill")
      .map((i) => i.id);

    onClose();
    resetModal();

    // Navigate to Superbill Document with full query parameters
    const params = new URLSearchParams();
    params.set("clientId", selectedClient.id);
    if (sessionIds.length > 0) params.set("sessionIds", sessionIds.join(","));
    if (billIds.length > 0) params.set("billIds", billIds.join(","));

    navigate(`/billing/bills/superbill?${params.toString()}`);
  };

  const resetModal = () => {
    setStep(1);
    setSelectedClient(null);
    setSearchQuery("");
    setSelectedItemIds([]);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[85vh] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/80">
            <div className="flex items-center gap-3">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors cursor-pointer"
                  title="Back to patient list"
                >
                  <ArrowLeft className="size-4" />
                </button>
              )}
              <div className="size-9 rounded-xl bg-gradient-to-br from-[#043570] to-[#00c0ff] flex items-center justify-center text-white shadow-xs">
                <FileText className="size-4.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {step === 1 ? "Generate Superbill" : "Select Appointments"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {step === 1
                    ? "Step 1 of 2: Select a client"
                    : `Step 2 of 2: Select dates of service for ${selectedClient?.name}`}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Step 1: Select Client */}
          {step === 1 && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patient by name, insurance, or ICD-10 code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
                    autoFocus
                  />
                </div>
              </div>

              {/* Client List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y-0">
                {filteredClients.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No clients match your search.</p>
                  </div>
                ) : (
                  filteredClients.map((client) => {
                    const initials = client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2);

                    const unbilledCount = unbilledSessions.filter(
                      (s) => s.clientId === client.id || s.clientName === client.name
                    ).length;

                    return (
                      <button
                        key={client.id}
                        onClick={() => handleClientSelectedWithItems(client)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-10 rounded-full bg-[#043570]/10 dark:bg-[#00c0ff]/20 text-[#043570] dark:text-[#00c0ff] font-bold text-xs flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-[#043570] dark:group-hover:text-[#00c0ff] transition-colors truncate">
                              {client.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                              <span className="inline-flex items-center gap-1">
                                <Shield className="size-3 text-emerald-500" />
                                {client.insuranceCompany || "Self-pay"}
                              </span>
                              {client.diagnosisCode && (
                                <>
                                  <span>•</span>
                                  <span>ICD-10: {client.diagnosisCode}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {unbilledCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                              {unbilledCount} unbilled
                            </span>
                          )}
                          <ChevronRight className="size-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Step 2: Select Appointments / Sessions */}
          {step === 2 && selectedClient && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Selected Patient Banner */}
              <div className="p-4 bg-gray-50 dark:bg-gray-750/70 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-[#043570] text-white font-bold text-xs flex items-center justify-center">
                    {selectedClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-gray-900 dark:text-white">{selectedClient.name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {selectedClient.insuranceCompany || "Self-Pay"} • Diagnosis: {selectedClient.diagnosisCode || "F41.1"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#043570] dark:text-[#00c0ff] font-semibold hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Select All Toggle */}
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">
                  {clientItems.length} appointment{clientItems.length === 1 ? "" : "s"} available
                </span>
                <button
                  onClick={handleToggleAll}
                  className="font-semibold text-[#043570] dark:text-[#00c0ff] hover:underline cursor-pointer"
                >
                  {selectedItemIds.length === clientItems.length ? "Deselect All" : "Select All"}
                </button>
              </div>

              {/* Appointments Checklist */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {clientItems.map((item) => {
                  const isChecked = selectedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleItem(item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? "bg-blue-50/50 dark:bg-blue-950/20 border-[#043570]/30 dark:border-[#00c0ff]/40 shadow-2xs"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`size-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-[#043570] border-[#043570] text-white"
                              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                          }`}
                        >
                          {isChecked && <Check className="size-3 stroke-[3]" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-gray-900 dark:text-white">
                              {item.dateOfService}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                              CPT {item.cptCode}
                            </span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              ICD: {item.diagnosisCode}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 truncate">
                            {item.serviceDescription}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono font-bold text-sm text-gray-900 dark:text-white">
                          ${item.amount.toFixed(2)}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="size-3" />
                          {item.statusLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Summary & Generate Button */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/80 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {selectedItemIds.length} item{selectedItemIds.length === 1 ? "" : "s"} selected
                  </p>
                  <p className="text-base font-extrabold text-gray-900 dark:text-white">
                    ${selectedTotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateSuperbill}
                    disabled={selectedItemIds.length === 0}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#043570] hover:bg-[#032554] text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                  >
                    <FileText className="size-3.5" />
                    <span>Generate Superbill</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
