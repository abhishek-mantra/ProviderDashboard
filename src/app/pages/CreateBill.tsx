import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  ArrowLeft,
  FileText,
  Plus,
  X,
  Check,
  Receipt,
  CalendarPlus,
  Calendar,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { getFeeForService, getCurrencySymbol, MOCK_PAYERS } from "../types/claims";
import type { BillCurrency } from "../types/partnerDashboard";
import type { ServiceLine } from "../types/claims";
import { generateId } from "../utils/id";
import { AddAppointmentModal } from "../components/AddAppointmentModal";
import { RecordPastSessionModal } from "../components/RecordPastSessionModal";

type BillTypeMode = "self_pay" | "insurance";

const CURRENCIES: { id: BillCurrency; label: string }[] = [
  { id: "USD", label: "USD - USD ($)" },
  { id: "CAD", label: "CAD - C$" },
  { id: "GBP", label: "GBP - GBP (£)" },
  { id: "EUR", label: "EUR - EUR (€)" },
];

interface LineItem {
  key: string;
  sessionId: string | null;
  description: string;
  quantity: string;
  amount: string;
  discount: string;
}

export function CreateBill() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deepClientId = searchParams.get("clientId") || "";
  const deepSessionIds = useMemo(
    () =>
      (searchParams.get("sessions") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [searchParams]
  );

  const {
    clients,
    setClients,
    bills,
    addBill,
    updateBill,
    currentProviderId,
    providers,
  } = usePartnerDashboard();
  const { unbilledSessions, markSessionsBilled, feeSchedule, addUnbilledSession, createNewClaim } = useClaims();

  // -- Core state -------------------------------------------------------------
  const [clientId, setClientId] = useState(deepClientId);
  const [selectedSessionIds, setSelectedSessionIds] = useState<string[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [mode, setMode] = useState<BillTypeMode>("self_pay");
  const [issuedDate, setIssuedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(
    () => new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)
  );
  const [amountReceived, setAmountReceived] = useState("");
  const [copayCollected, setCopayCollected] = useState("");
  const [clientOwedVal, setClientOwedVal] = useState("");
  const [selectedPayerName, setSelectedPayerName] = useState("");
  const [currency, setCurrency] = useState<BillCurrency>("USD");
  const [discountStr, setDiscountStr] = useState("0");
  const [taxPctStr, setTaxPctStr] = useState("0");
  const [error, setError] = useState("");

  // Inline add-appointment / add-session
  const [addSessionActionOpen, setAddSessionActionOpen] = useState(false);
  const [addAppointmentOpen, setAddAppointmentOpen] = useState(false);
  const [recordPastSessionOpen, setRecordPastSessionOpen] = useState(false);
  const [appointmentJustAdded, setAppointmentJustAdded] = useState(false);

  // Add-insurance inline
  const [addingInsurance, setAddingInsurance] = useState(false);
  const [newInsurerName, setNewInsurerName] = useState("");

  const client = clients.find((c) => c.id === clientId);

  const billNumber = useMemo(
    () => `BILL-2026-${String(bills.length + 1).padStart(4, "0")}`,
    [bills.length]
  );

  // Sessions already linked to a bill can't be re-billed.
  const billedSessionIds = useMemo(() => {
    const ids = new Set<string>();
    bills.forEach((b) => {
      ids.add(b.sessionId);
      b.serviceLines?.forEach((l) => ids.add(l.sessionId));
    });
    return ids;
  }, [bills]);

  const clientSessions = useMemo(
    () =>
      unbilledSessions.filter(
        (s) => s.clientId === clientId && s.notesStatus === "locked" && !billedSessionIds.has(s.id)
      ),
    [unbilledSessions, clientId, billedSessionIds]
  );

  const selectedSessions = clientSessions.filter((s) => selectedSessionIds.includes(s.id));
  const session = selectedSessions[0];

  const clientPlans = useMemo(() => {
    if (!client) return [] as string[];
    return [client.insuranceCompany, ...(client.insurances || [])].filter(
      (p): p is string => Boolean(p)
    );
  }, [client]);

  const selectedPayer = selectedPayerName
    ? MOCK_PAYERS.find((p) => p.name === selectedPayerName)
    : undefined;
  // Non-US / non-curated plans aren't in MOCK_PAYERS — synthesize a stable id
  // so insurance billing still works for Bupa, Sun Life, NextCare, etc.
  const synthPayerId = selectedPayerName
    ? `payer-${selectedPayerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    : null;
  const effectivePayerId = selectedPayer?.id || synthPayerId || session?.payerId || null;
  const effectivePayerName = selectedPayerName || session?.payerName || "";

  const currentProvider =
    providers.find((p) => p.id === currentProviderId) || providers[0];

  // Prefill from deep-link (Sessions "+ Bill" / Unbilled Sessions "Create Bill")
  const deepKey = `${deepClientId}|${deepSessionIds.join(",")}`;
  useEffect(() => {
    if (!deepClientId || !clientId) return;
    const deepClient = clients.find((c) => c.id === deepClientId);
    setClientId(deepClientId);
    const plan = deepClient?.insuranceCompany || "";
    setSelectedPayerName(plan);
    // Predict payer from the client's coverage on file — insurance if they have a plan.
    setMode(plan ? "insurance" : "self_pay");
    if (deepSessionIds.length) {
      const preselect = unbilledSessions.filter(
        (s) => deepSessionIds.includes(s.id) && s.clientId === deepClientId
      );
      const ids = preselect.map((s) => s.id);
      setSelectedSessionIds(ids);
      setLineItems(
        preselect.map((s) => ({
          key: `s-${s.id}`,
          sessionId: s.id,
          description:
            feeSchedule.find((f) => f.cptCode === s.cptCode)?.description || s.serviceType,
          quantity: "1",
          amount: getFeeForService(s.cptCode).toFixed(2),
          discount: "0.00",
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepKey]);

  const buildLinesForSessions = (nextIds: string[], current: LineItem[]): LineItem[] => {
    const byKey = new Map(current.map((l) => [l.key, l]));
    const sessionLines: LineItem[] = nextIds
      .map((id) => {
        const s = clientSessions.find((x) => x.id === id);
        if (!s) return null;
        const existing = byKey.get(`s-${id}`);
        if (existing) return existing;
        return {
          key: `s-${id}`,
          sessionId: id,
          description:
            feeSchedule.find((f) => f.cptCode === s.cptCode)?.description || s.serviceType,
          quantity: "1",
          amount: getFeeForService(s.cptCode).toFixed(2),
          discount: "0.00",
        };
      })
      .filter((l): l is LineItem => l !== null);
    const manual = current.filter((l) => !l.sessionId);
    return [...sessionLines, ...manual];
  };

  const handleToggleSession = (id: string) => {
    const next = selectedSessionIds.includes(id)
      ? selectedSessionIds.filter((x) => x !== id)
      : [...selectedSessionIds, id];
    setSelectedSessionIds(next);
    setLineItems((cur) => buildLinesForSessions(next, cur));
    setAppointmentJustAdded(false);
  };

  const handleClientChange = (value: string) => {
    setClientId(value);
    setSelectedSessionIds([]);
    setLineItems([]);
    setSelectedPayerName(clients.find((c) => c.id === value)?.insuranceCompany || "");
    setAppointmentJustAdded(false);
  };

  const handleModeChange = (next: BillTypeMode) => {
    setMode(next);
    setCopayCollected("");
    if (next === "insurance" && !clientOwedVal) {
      const total = calculateTotal();
      setClientOwedVal(String(Math.min(total || 30, client?.copayAmount ?? 30)));
    }
    if (next !== "insurance") setClientOwedVal("");
  };

  const handleAddInsurance = () => {
    if (!client || !newInsurerName.trim()) return;
    const existing = client.insuranceCompany
      ? [client.insuranceCompany, ...(client.insurances || [])]
      : client.insurances || [];
    const next = existing.includes(newInsurerName.trim())
      ? existing
      : [...existing, newInsurerName.trim()];
    setClients((prev) =>
      prev.map((c) =>
        c.id === client.id
          ? { ...c, insuranceCompany: c.insuranceCompany || newInsurerName.trim(), insurances: next }
          : c
      )
    );
    setSelectedPayerName(newInsurerName.trim());
    setNewInsurerName("");
    setAddingInsurance(false);
  };

  const handleAddManualLine = () => {
    setLineItems([
      ...lineItems,
      { key: `m-${Date.now()}`, sessionId: null, description: "", quantity: "1", amount: "0.00", discount: "0.00" },
    ]);
  };

  const handleRemoveLine = (key: string) => {
    const line = lineItems.find((l) => l.key === key);
    setLineItems(lineItems.filter((l) => l.key !== key));
    if (line?.sessionId) {
      setSelectedSessionIds((prev) => prev.filter((id) => id !== line.sessionId));
    }
  };

  const handleLineChange = (key: string, field: keyof LineItem, value: string) => {
    setLineItems(lineItems.map((l) => (l.key === key ? { ...l, [field]: value } : l)));
  };

  const handleInlineAddAppointment = (appointment: {
    clientId: string;
    clientName: string;
    service: string;
    date: string;
    time: string;
    sessionType: "video" | "chat" | "in-person";
    location: string;
    cptCode?: string;
    fee?: number;
  }) => {
    addUnbilledSession({
      id: `new-${Date.now()}`,
      clientId: appointment.clientId,
      clientName: appointment.clientName,
      dateOfService: appointment.date,
      payerId: selectedPayer?.id || client?.insuranceCompany ? "us-1" : "self-pay",
      payerName: selectedPayerName || client?.insuranceCompany || "Self-Pay",
      serviceType: appointment.service,
      duration: "45 min",
      notesStatus: "draft",
      notesId: null,
      cptCode: appointment.cptCode || "",
      diagnosisCode: "",
      amount: appointment.fee || 0,
      daysSinceService: 0,
      selected: false,
    });
    setAddAppointmentOpen(false);
    setAppointmentJustAdded(true);
  };

  const handleInlineRecordPastSession = (sessionData: {
    clientId: string;
    clientName: string;
    service: string;
    date: string;
    startTime: string;
    endTime: string;
    sessionType: "video" | "chat" | "in-person";
    location: string;
    cptCode?: string;
    fee?: number;
  }) => {
    addUnbilledSession({
      id: `past-${Date.now()}`,
      clientId: sessionData.clientId,
      clientName: sessionData.clientName,
      dateOfService: sessionData.date,
      payerId: selectedPayer?.id || client?.insuranceCompany ? "us-1" : "self-pay",
      payerName: selectedPayerName || client?.insuranceCompany || "Self-Pay",
      serviceType: sessionData.service,
      duration: "60 min",
      notesStatus: "draft",
      notesId: null,
      cptCode: sessionData.cptCode || "",
      diagnosisCode: "",
      amount: sessionData.fee || 0,
      daysSinceService: 0,
      selected: false,
    });
    setRecordPastSessionOpen(false);
    setAppointmentJustAdded(true);
  };

  // -- Totals -----------------------------------------------------------------
  const calculateSubtotal = () =>
    lineItems.reduce((sum, l) => {
      const qty = parseFloat(l.quantity || "0");
      const amt = parseFloat(l.amount || "0");
      return sum + Math.max(0, qty) * Math.max(0, amt);
    }, 0);

  const discount = parseFloat(discountStr || "0") || 0;
  const taxPct = parseFloat(taxPctStr || "0") || 0;

  const calculateTotal = () => {
    const base = Math.max(0, calculateSubtotal() - discount);
    return Math.round(base * (1 + taxPct / 100) * 100) / 100;
  };

  const total = calculateTotal();
  const sym = getCurrencySymbol(currency);
  const received =
    mode === "insurance" ? parseFloat(copayCollected) || 0 : parseFloat(amountReceived) || 0;

  const clientOwedForInsurance = isNaN(parseFloat(clientOwedVal))
    ? 0
    : Math.max(0, Math.min(parseFloat(clientOwedVal), total));
  const insuranceOwed = Math.max(0, Math.round((total - clientOwedForInsurance) * 100) / 100);

  // -- Submit -----------------------------------------------------------------
  const saveBill = (andAddPayment: boolean) => {
    setError("");
    if (!clientId) return setError("Please select a client.");
    if (!selectedSessions.length) return setError("Attach at least one appointment/session.");
    if (total <= 0) return setError("Please add at least one line item with an amount.");
    if (received < 0 || received > total)
      return setError("Amount received cannot exceed the bill total.");
    if (mode === "insurance" && !effectivePayerId)
      return setError("No insurance payer selected for this bill.");

    const lineTotal = selectedSessions.reduce(
      (sum, s) => sum + getFeeForService(s.cptCode),
      0
    );
    const factor = lineTotal > 0 ? total / lineTotal : 0;
    const lines = selectedSessions.map((s) => ({
      sessionId: s.id,
      cptCode: s.cptCode,
      dateOfService: s.dateOfService,
      description:
        feeSchedule.find((f) => f.cptCode === s.cptCode)?.description || s.serviceType,
      amount: Math.round(getFeeForService(s.cptCode) * factor * 100) / 100,
    }));
    if (lines.length > 1) {
      const lineSum = lines.reduce((sum, l) => sum + l.amount, 0);
      const remainder = Math.round((total - lineSum) * 100) / 100;
      lines[lines.length - 1].amount = Math.round((lines[lines.length - 1].amount + remainder) * 100) / 100;
    }

    const isInsurance = mode === "insurance";
    const clientOwedAmt = isInsurance ? clientOwedForInsurance : total;
    const insuranceOwedAmt = isInsurance ? insuranceOwed : 0;
    const clientPaidAmt = isInsurance ? received : received;
    const isFullyPaid = !isInsurance && total > 0 && received >= total;

    const bill = addBill({
      clientId: session.clientId,
      clientName: session.clientName,
      providerId: currentProvider?.id || providers[0]?.id || "",
      billNumber,
      billType: isInsurance ? "insurance" : "self_pay",
      insurerName: isInsurance ? effectivePayerName : null,
      dueDate,
      clientOwed: clientOwedAmt,
      clientPaid: clientPaidAmt,
      insuranceOwed: insuranceOwedAmt,
      insurancePaid: 0,
      sessionId: session.id,
      sessionIds: selectedSessions.map((s) => s.id),
      serviceLines: selectedSessions.length > 1 ? lines : undefined,
      dateOfService: session.dateOfService,
      cptCode: session.cptCode,
      diagnosisCodes: session.diagnosisCode ? [session.diagnosisCode] : [],
      amount: total,
      paidAmount: received,
      writeOffAmount: 0,
      currency,
      payerId: isInsurance ? effectivePayerId : null,
      payerName: isInsurance ? effectivePayerName : null,
      resolutionMethod: isInsurance ? "insurance" : "cash",
      status: isFullyPaid ? "paid_direct" : "unresolved",
      claimId: null,
      resolvedAt: isFullyPaid ? new Date().toISOString() : null,
    });

    if (isInsurance) {
      const serviceLines: ServiceLine[] = lines.map((l) => ({
        id: generateId("sl"),
        sessionId: l.sessionId,
        dateOfService: l.dateOfService,
        serviceCode: l.cptCode,
        units: 1,
        chargeAmount: l.amount,
      }));
      const claim = createNewClaim({
        flowType: "mantra",
        clientId: bill.clientId,
        clientName: bill.clientName,
        providerId: bill.providerId,
        sessionIds: bill.sessionIds || [bill.sessionId],
        serviceLines,
        diagnosisCodes: bill.diagnosisCodes,
        payerId: bill.payerId,
        payerName: bill.payerName,
      });
      updateBill(bill.id, { claimId: claim.id, status: "claim_pending" });
    }

    markSessionsBilled(selectedSessions.map((s) => s.id));
    navigate(`/billing/bills/${bill.id}${andAddPayment ? "?pay=1" : ""}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <button
          onClick={() => navigate("/billing/bills")}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Bill</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bill a signed session and record how it&apos;s paid
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          {/* From */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">From</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {currentProvider?.name || "Provider"}
            </p>
            <p className="text-xs text-gray-400">{currentProvider?.email || "provider@mantra.care"}</p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Bill</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Bill To / Session mapping */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Bill To</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Client</label>
                  <select
                    value={clientId}
                    onChange={(e) => handleClientChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                  >
                    <option value="">Select client...</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bill type */}
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Bill Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        { id: "self_pay", label: "Self-pay" },
                        { id: "insurance", label: "Insurance" },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleModeChange(m.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          mode === m.id
                            ? "bg-[#4169E1] text-white border-[#4169E1] shadow-xs"
                            : "bg-white dark:bg-gray-750 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {mode === "insurance" && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs text-gray-500 dark:text-gray-400">
                          Insurance / Payer
                        </label>
                        {!addingInsurance && (
                          <button
                            type="button"
                            onClick={() => setAddingInsurance(true)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#4169E1] hover:underline"
                          >
                            <Plus className="size-3.5" /> + Add insurance
                          </button>
                        )}
                      </div>
                      {addingInsurance ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newInsurerName}
                            onChange={(e) => setNewInsurerName(e.target.value)}
                            placeholder="Insurer name"
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                          />
                          <button
                            type="button"
                            onClick={handleAddInsurance}
                            className="px-3 py-2 text-xs font-bold bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg shrink-0"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAddingInsurance(false);
                              setNewInsurerName("");
                            }}
                            className="px-2 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <select
                          value={selectedPayerName}
                          onChange={(e) => setSelectedPayerName(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                        >
                          {clientPlans.length === 0 ? (
                            <option value="">No insurance on file</option>
                          ) : (
                            clientPlans.map((plan) => (
                              <option key={plan} value={plan}>
                                {plan}
                              </option>
                            ))
                          )}
                        </select>
                      )}
                    </div>

                    {/* Copay split */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        Copay Split
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">
                            Client owes ({sym})
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={clientOwedVal}
                            onChange={(e) => setClientOwedVal(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">
                            Insurance owes ({sym})
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={total > 0 ? insuranceOwed.toFixed(2) : ""}
                            onChange={(e) => {
                              const iv = parseFloat(e.target.value);
                              const cv = isNaN(iv) ? 0 : Math.max(0, total - iv);
                              setClientOwedVal(cv.toFixed(2));
                            }}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Client owes + insurance owes must equal the bill total.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bill details */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Bill Details</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bill #</label>
                  <input
                    type="text"
                    value={billNumber}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-600 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as BillCurrency)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Issued</label>
                    <input
                      type="date"
                      value={issuedDate}
                      onChange={(e) => setIssuedDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                </div>
                {mode === "insurance" ? (
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Copay Collected ({sym})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={copayCollected}
                      onChange={(e) => setCopayCollected(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Amount Received ({sym})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amountReceived}
                      onChange={(e) => setAmountReceived(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Discount ({sym})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={discountStr}
                      onChange={(e) => setDiscountStr(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tax (%)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={taxPctStr}
                      onChange={(e) => setTaxPctStr(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments / Sessions */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="size-4 text-[#4169E1]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Attached Appointments / Sessions
              </h3>
              {client && (
                <button
                  onClick={() => setAddSessionActionOpen(true)}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#4169E1] hover:underline"
                >
                  <CalendarPlus className="size-3.5" /> + Add appointment
                </button>
              )}
            </div>

            {!client ? (
              <p className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400">
                Select a client above to see their signed sessions available to bill.
              </p>
            ) : clientSessions.length === 0 ? (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-500 dark:text-gray-400">
                No signed sessions found for{" "}
                <span className="font-bold text-gray-900 dark:text-white">{client.name}</span>.{" "}
                {appointmentJustAdded
                  ? "The appointment you just scheduled will appear here once its session note is signed & locked."
                  : "Use + Add appointment to schedule one, then sign & lock its note."}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                  {clientSessions.map((s) => {
                    const checked = selectedSessionIds.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleToggleSession(s.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-colors ${
                          checked
                            ? "bg-[#4169E1]/5 border-[#4169E1] dark:border-[#4169E1]"
                            : "bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                        }`}
                      >
                        <span
                          className={`size-4 shrink-0 rounded flex items-center justify-center border ${
                            checked
                              ? "bg-[#4169E1] border-[#4169E1] dark:bg-[#4169E1]"
                              : "border-gray-300 dark:border-gray-500"
                          }`}
                        >
                          {checked && <Check className="size-3 text-white" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-semibold text-gray-900 dark:text-white truncate">
                            {s.dateOfService} · {s.serviceType}
                          </span>
                          <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                            {s.cptCode} -{" "}
                            {feeSchedule.find((f) => f.cptCode === s.cptCode)?.description ||
                              s.serviceType}
                          </span>
                        </span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                          {sym}{getFeeForService(s.cptCode).toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selectedSessions.length > 1 && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {selectedSessions.length} appointments will be grouped on one bill.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="size-4 text-[#4169E1]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Line Items</h3>
            </div>

            <div className="overflow-visible mb-4">
              <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-750">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 w-20">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 w-28">
                      Discount (%)
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 w-28">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        No line items yet - attach a session above or add one manually.
                      </td>
                    </tr>
                  )}
                  {lineItems.map((item) => (
                    <tr key={item.key} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleLineChange(item.key, "description", e.target.value)}
                          placeholder="Service description..."
                          className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-3 w-20">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => handleLineChange(item.key, "quantity", e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-3 w-28">
                        <input
                          type="number"
                          min="0"
                          value={item.discount}
                          onChange={(e) => handleLineChange(item.key, "discount", e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-3 w-28">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.amount}
                          onChange={(e) => handleLineChange(item.key, "amount", e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#4169E1] dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-3 text-center w-16">
                        <button
                          type="button"
                          onClick={() => handleRemoveLine(item.key)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                        >
                          <X className="size-4 text-red-600 dark:text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleAddManualLine}
              className="flex items-center gap-2 text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
            >
              <Plus className="size-4" /> Add Line Item
            </button>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {sym}{calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Discount</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    -{sym}{discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {sym}{Math.round(Math.max(0, calculateSubtotal() - discount) * (taxPct / 100) * 100) / 100}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    {sym}{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold mb-6">
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => saveBill(false)}
              className="flex-1 py-3 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors"
            >
              Save Bill
            </button>
            <button
              onClick={() => saveBill(true)}
              className="flex-1 py-3 bg-white dark:bg-gray-750 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#4169E1] dark:text-[#5b8cff] border-2 border-[#4169E1] dark:border-[#5b8cff] rounded-xl font-medium transition-colors"
            >
              Save Bill and Add Payment
            </button>
          </div>
        </div>
      </div>

      {/* Inline add-appointment action chooser */}
      {client && addSessionActionOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                What do you want to do?
              </h2>
              <button
                onClick={() => setAddSessionActionOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-3 p-6">
              <button
                onClick={() => {
                  setAddSessionActionOpen(false);
                  setAddAppointmentOpen(true);
                }}
                className="group w-full rounded-xl border-2 border-gray-200 bg-white p-5 text-left transition-all hover:border-[#4169E1] dark:border-gray-600 dark:bg-gray-750 dark:hover:border-[#4169E1]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#4169E1]">
                    <Calendar className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#4169E1] dark:text-white">
                      Appointment
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Book a future session with a client.
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  setAddSessionActionOpen(false);
                  setRecordPastSessionOpen(true);
                }}
                className="group w-full rounded-xl border-2 border-gray-200 bg-white p-5 text-left transition-all hover:border-[#4169E1] dark:border-gray-600 dark:bg-gray-750 dark:hover:border-[#4169E1]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#4169E1]">
                    <FileText className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#4169E1] dark:text-white">
                      Session
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Log a session that already happened.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {client && (
        <AddAppointmentModal
          isOpen={addAppointmentOpen}
          onClose={() => setAddAppointmentOpen(false)}
          onAddAppointment={handleInlineAddAppointment}
          preselectedClient={{
            id: client.id,
            name: client.name,
            avatar: client.name
              .split(" ")
              .map((n) => n[0])
              .join(""),
            service: "Therapy",
          }}
        />
      )}

      {client && (
        <RecordPastSessionModal
          isOpen={recordPastSessionOpen}
          onClose={() => setRecordPastSessionOpen(false)}
          onRecordPastSession={handleInlineRecordPastSession}
        />
      )}

      {/* Type hint */}
      <div className="flex items-start gap-2 text-[11px] text-gray-400">
        <ShieldCheck className="size-4 shrink-0 mt-0.5" />
        <span>
          Bills attach to signed &amp; locked session notes. Once saved, the appointment moves out of
          Unbilled Sessions and a Bill # link appears on the session card.
        </span>
      </div>
    </div>
  );
}
