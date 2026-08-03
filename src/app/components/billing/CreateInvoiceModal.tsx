import { useMemo, useState, useEffect } from "react";
import { Receipt, X, AlertTriangle, FileCheck, Check, CalendarPlus, Calendar, FileText } from "lucide-react";
import { Link } from "react-router";
import { usePartnerDashboard } from "../../contexts/PartnerDashboardContext";
import { useClaims } from "../../contexts/ClaimContext";
import { getFeeForService, MOCK_PAYERS } from "../../types/claims";
import type { Bill } from "../../types/partnerDashboard";
import { AddAppointmentModal } from "../AddAppointmentModal";
import { RecordPastSessionModal } from "../RecordPastSessionModal";

type PaymentMode = "cash" | "online" | "insurance";

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (bill: Bill) => void;
  initialClientId?: string;
  initialSessionIds?: string[];
}

const REQUIRES_PRIOR_AUTH_CPTS = ["90791"];

export function CreateInvoiceModal({
  open,
  onClose,
  onCreated,
  initialClientId,
  initialSessionIds,
}: CreateInvoiceModalProps) {
  const {
    clients,
    bills,
    addBill,
    currentProviderId,
    providers,
    priorAuthorizations,
  } = usePartnerDashboard();
  const { unbilledSessions, markSessionsBilled, feeSchedule, addUnbilledSession } = useClaims();

  const [clientId, setClientId] = useState(initialClientId || "");
  const [selectedSessionIds, setSelectedSessionIds] = useState<string[]>(
    initialSessionIds || []
  );
  const [mode, setMode] = useState<PaymentMode>("cash");
  const [chargeAmount, setChargeAmount] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [copayCollected, setCopayCollected] = useState("");
  const [selectedPayerName, setSelectedPayerName] = useState("");
  const [addAppointmentOpen, setAddAppointmentOpen] = useState(false);
  const [addSessionActionOpen, setAddSessionActionOpen] = useState(false);
  const [recordPastSessionOpen, setRecordPastSessionOpen] = useState(false);
  const [appointmentJustAdded, setAppointmentJustAdded] = useState(false);
  const [error, setError] = useState("");

  // When opened via a deep-link from the Unbilled Sessions page, prefill the
  // client and pre-select the requested sessions (and prefill the charge).
  const initialSelectionKey = `${initialClientId || ""}|${(initialSessionIds || []).join(",")}`;
  useEffect(() => {
    if (!open) return;
    if (initialClientId) {
      setClientId(initialClientId);
      setSelectedPayerName(clients.find((c) => c.id === initialClientId)?.insuranceCompany || "");
    }
    if (initialSessionIds?.length) {
      const preselect = unbilledSessions.filter(
        (s) => initialSessionIds.includes(s.id) && s.clientId === initialClientId
      );
      setSelectedSessionIds(preselect.map((s) => s.id));
      setChargeAmount(
        preselect.reduce((sum, s) => sum + getFeeForService(s.cptCode), 0).toFixed(2)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialSelectionKey, clients]);

  const client = clients.find((c) => c.id === clientId);

  // All insurance plans a client can bill to — primary first, then alternatives.
  const clientPlans = useMemo(() => {
    if (!client) return [] as string[];
    return [client.insuranceCompany, ...(client.insurances || [])].filter(
      (p): p is string => Boolean(p)
    );
  }, [client]);

  // Sessions that already generated a Bill (or a prior manual invoice) are excluded
  // so the same appointment can't be billed twice — including sessions grouped under
  // a multi-line bill.
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
  const session = selectedSessions[0]; // primary line drives the payer / auth / charge summary

  const feeDescription = session
    ? feeSchedule.find((f) => f.cptCode === session.cptCode)?.description ||
      session.serviceType
    : "";

  // Charge is editable in every mode; prefill from the session fee on selection.
  const charge = parseFloat(chargeAmount) || 0;
  const received =
    mode === "insurance"
      ? parseFloat(copayCollected) || 0
      : parseFloat(amountReceived) || 0;

  // Resolve the payer for an insurance bill. Defaults to the session's payer,
  // but a client with multiple plans can pick which plan to bill against.
  const selectedPayer = selectedPayerName
    ? MOCK_PAYERS.find((p) => p.name === selectedPayerName)
    : undefined;
  const effectivePayerId = selectedPayer?.id || session?.payerId || null;
  const effectivePayerName = selectedPayerName || session?.payerName || "";

  const requiresAuth = selectedSessions.some((s) => REQUIRES_PRIOR_AUTH_CPTS.includes(s.cptCode));
  const hasApprovedAuth = selectedSessions.every((s) => {
    if (!REQUIRES_PRIOR_AUTH_CPTS.includes(s.cptCode)) return true;
    return priorAuthorizations.some(
      (a) =>
        a.clientId === s.clientId &&
        a.serviceType.includes(s.cptCode) &&
        a.status === "approved" &&
        (!a.validUntil || new Date(a.validUntil) >= new Date(s.dateOfService))
    );
  });

  const currentProvider =
    providers.find((p) => p.id === currentProviderId) || providers[0];

  const handleClientChange = (value: string) => {
    setClientId(value);
    setSelectedSessionIds([]);
    setSelectedPayerName("");
    setAppointmentJustAdded(false);
    const c = clients.find((x) => x.id === value);
    setSelectedPayerName(c?.insuranceCompany || "");
  };

  const handleToggleSession = (id: string) => {
    const next = selectedSessionIds.includes(id)
      ? selectedSessionIds.filter((x) => x !== id)
      : [...selectedSessionIds, id];
    setSelectedSessionIds(next);
    const sels = clientSessions.filter((s) => next.includes(s.id));
    setChargeAmount(
      sels.reduce((sum, s) => sum + getFeeForService(s.cptCode), 0).toFixed(2)
    );
  };

  const handleModeChange = (next: PaymentMode) => {
    setMode(next);
    setCopayCollected("");
    if (next === "insurance" && session && !chargeAmount) {
      setChargeAmount(String(getFeeForService(session.cptCode)));
    }
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

  const handleInlineRecordPastSession = (session: {
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
      clientId: session.clientId,
      clientName: session.clientName,
      dateOfService: session.date,
      payerId: selectedPayer?.id || client?.insuranceCompany ? "us-1" : "self-pay",
      payerName: selectedPayerName || client?.insuranceCompany || "Self-Pay",
      serviceType: session.service,
      duration: "60 min",
      notesStatus: "draft",
      notesId: null,
      cptCode: session.cptCode || "",
      diagnosisCode: "",
      amount: session.fee || 0,
      daysSinceService: 0,
      selected: false,
    });
    setRecordPastSessionOpen(false);
    setAppointmentJustAdded(true);
  };

  const handleSubmit = () => {
    setError("");
    if (!clientId) {
      setError("Please select a client.");
      return;
    }
    if (!selectedSessions.length) {
      setError("Select at least one appointment to invoice.");
      return;
    }
    if (charge <= 0) {
      setError("Please enter a valid charge amount.");
      return;
    }
    if (received < 0 || received > charge) {
      setError("Amount received cannot exceed the charge.");
      return;
    }
    if (mode === "insurance" && !effectivePayerId) {
      setError("No insurance payer selected for this appointment.");
      return;
    }

    // Build the line items. When the user overrides the total charge, scale each
    // line proportionally (rounding to cents, last line absorbs the remainder) so
    // the service-line total always reconciles to the charge.
    const lineTotal = selectedSessions.reduce(
      (sum, s) => sum + getFeeForService(s.cptCode),
      0
    );
    const factor = lineTotal > 0 ? charge / lineTotal : 0;
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
      const remainder = Math.round((charge - lineSum) * 100) / 100;
      lines[lines.length - 1].amount =
        Math.round((lines[lines.length - 1].amount + remainder) * 100) / 100;
    }

    const isFullyPaid = received >= charge && mode !== "insurance";
    const bill = addBill({
      clientId: session.clientId,
      clientName: session.clientName,
      providerId: currentProvider?.id || providers[0]?.id || "",
      sessionId: session.id,
      sessionIds: selectedSessions.map((s) => s.id),
      serviceLines: selectedSessions.length > 1 ? lines : undefined,
      dateOfService: session.dateOfService,
      cptCode: session.cptCode,
      diagnosisCodes: session.diagnosisCode ? [session.diagnosisCode] : [],
      amount: charge,
      paidAmount: received,
      writeOffAmount: 0,
      payerId:
        mode === "insurance"
          ? effectivePayerId
          : null,
      payerName:
        mode === "insurance"
          ? effectivePayerName
          : null,
      resolutionMethod:
        mode === "insurance" ? "insurance" : mode === "cash" ? "cash" : "online",
      status: isFullyPaid ? "paid_direct" : "unresolved",
      claimId: null,
      resolvedAt: isFullyPaid
        ? new Date().toISOString()
        : null,
    });

    markSessionsBilled(selectedSessions.map((s) => s.id));
    onCreated?.(bill);
    onClose();
    setClientId(initialClientId || "");
    setSelectedSessionIds([]);
    setChargeAmount("");
    setAmountReceived("");
    setCopayCollected("");
    setSelectedPayerName("");
    setAppointmentJustAdded(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#F1F5F9] dark:bg-gray-700 flex items-center justify-center text-[#043570] dark:text-[#00c0ff]">
              <Receipt className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create Invoice</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Invoice an appointment and record how it's paid
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="size-5" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Client
          </label>
          <select
            value={clientId}
            onChange={(e) => handleClientChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-semibold text-gray-900 dark:text-white"
          >
            <option value="">Select client...</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Appointments / Sessions
            </label>
            {client && (
              <button
                onClick={() => setAddSessionActionOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#043570] dark:text-[#00c0ff] hover:underline"
              >
                <CalendarPlus className="size-3.5" />
                + Add appointment
              </button>
            )}
          </div>

          {!client ? (
            <p className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
              Select a client above to see their signed appointments available to bill.
            </p>
          ) : clientSessions.length === 0 ? (
            <div className="space-y-3">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-500 dark:text-gray-400">
                No signed appointments found for <span className="font-bold text-gray-900 dark:text-white">{client.name}</span>.
                {appointmentJustAdded
                  ? " The appointment you just scheduled will appear here once its session note is signed & locked."
                  : " Use + Add appointment to schedule one, then sign & lock its note."}
              </div>

              {appointmentJustAdded && (
                <Link
                  to={`/clients/${client.id}/notes`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#00c0ff]/10 text-[#043570] dark:text-[#00c0ff] border border-[#00c0ff]/30 hover:bg-[#00c0ff]/20 transition-colors"
                >
                  <FileCheck className="size-3.5" />
                  Sign &amp; Lock Session Note
                </Link>
              )}
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
                          ? "bg-[#043570]/5 border-[#043570] dark:border-[#00c0ff]"
                          : "bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <span
                        className={`size-4 shrink-0 rounded flex items-center justify-center border ${
                          checked
                            ? "bg-[#043570] border-[#043570] dark:bg-[#00c0ff] dark:border-[#00c0ff]"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                      >
                        {checked && <Check className="size-3 text-white dark:text-gray-900" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-gray-900 dark:text-white truncate">
                          {s.dateOfService} · {s.serviceType}
                        </span>
                        <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                          {s.cptCode} —{" "}
                          {feeSchedule.find((f) => f.cptCode === s.cptCode)?.description ||
                            s.serviceType}
                        </span>
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                        ${getFeeForService(s.cptCode).toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedSessions.length > 1 && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {selectedSessions.length} appointments will be grouped on one invoice
                  (one multi-line bill).
                </p>
              )}
            </div>
          )}

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
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Payment Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "cash", label: "Cash" },
                { id: "online", label: "Online" },
                { id: "insurance", label: "Insurance" },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  mode === m.id
                    ? "bg-[#043570] text-white border-[#043570] shadow-xs"
                    : "bg-white dark:bg-gray-750 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {mode === "insurance" ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Insurance / Payer
              </label>
              <select
                value={selectedPayerName}
                onChange={(e) => setSelectedPayerName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-semibold"
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
              {clientPlans.length > 1 && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  Client has multiple plans — choose which one to bill against.
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Charge ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Copay Collected at Checkout ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={copayCollected}
                  onChange={(e) => setCopayCollected(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
                />
              </div>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Copay is the client's share and does not reduce the insurance claim — the claim is
              submitted for the full charge.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Charge ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Amount Received ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amountReceived}
                onChange={(e) => setAmountReceived(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        )}

        {selectedSessions.length > 0 && (
          <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl space-y-1.5 text-xs">
            {selectedSessions.length > 1 && (
              <div className="font-semibold text-gray-900 dark:text-white pb-1 border-b border-gray-200 dark:border-gray-700">
                {selectedSessions.length} services on this bill
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Service</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {session.cptCode} — {feeDescription || session.serviceType}
                {selectedSessions.length > 1 && ` +${selectedSessions.length - 1} more`}
              </span>
            </div>
            {selectedSessions.length === 1 && (
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date of service</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {session.dateOfService}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Diagnosis (ICD-10)</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {session.diagnosisCode || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Payer</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {mode === "insurance"
                  ? effectivePayerName || "No insurance on file"
                  : "Self-Pay"}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-gray-900 dark:text-white">Charge</span>
              <span className="font-bold text-gray-900 dark:text-white">
                ${charge.toFixed(2)}
              </span>
            </div>
            {received > 0 && (
              <div className="flex justify-between">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {mode === "insurance" ? "Copay collected" : "Received today"}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ${received.toFixed(2)}
                </span>
              </div>
            )}
            {received > 0 && mode !== "insurance" && charge - received > 0 && (
              <div className="flex justify-between">
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  Balance due
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  ${(charge - received).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}

        {mode === "insurance" && requiresAuth && !hasApprovedAuth && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 rounded-xl text-xs font-semibold text-red-700 dark:text-red-300">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <span>
              {selectedSessions
                .filter((s) => REQUIRES_PRIOR_AUTH_CPTS.includes(s.cptCode))
                .map((s) => s.cptCode)
                .join(", ")}{" "}
              typically requires prior authorization. No approved authorization
              is on file — the bill will be flagged in the hub. (Warning only; submission is not
              blocked.)
            </span>
          </div>
        )}

        {mode === "insurance" && requiresAuth && hasApprovedAuth && (
          <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <FileCheck className="size-4 shrink-0 mt-0.5" />
            <span>Approved prior authorization on file for {session?.cptCode}.</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold">
            <AlertTriangle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-xs transition-colors"
          >
            <Check className="size-3.5" />
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
