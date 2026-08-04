import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search,
  Plus,
  Wallet,
  CreditCard,
  FileText,
  CheckCircle,
  Ban,
  Send,
  CheckSquare,
  X,
  AlertCircle,
  Clock,
  Receipt,
  Link2,
  Upload,
  Eye,
  History,
  ChevronDown,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import {
  Bill,
  WriteOffReason,
  WRITE_OFF_REASON_LABELS,
  getClientDue,
  getInsuranceDue,
  getTotalDue,
} from "../types/partnerDashboard";
import { getCurrencySymbol } from "../types/claims";
import { openBillingPanel } from "../components/billing/billingPanelStore";
import { usePaymentModalTarget } from "../components/billing/paymentModalStore";

type ListTab = "all" | "unpaid" | "sent" | "draft";
type PaymentType = "client" | "insurance" | "write_off";

interface BatchRow {
  billId: string;
  amount: string;
}

export function BillsHub() {
  const {
    bills,
    clients,
    currentProviderId,
    isCurrentUserSuperAdmin,
    isCurrentUserAdmin,
    recordBillPayment,
    writeOffBill,
  } = usePartnerDashboard();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Deep-link from Client Profile - preselect the client filter.
  const initialClientId = searchParams.get("clientId") || "";

  // -- List state ------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<ListTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState<string>(initialClientId || "all");

  // -- Toast -----------------------------------------------------------------
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // -- Derived ---------------------------------------------------------------
  const openBills = useMemo(
    () =>
      bills
        .filter((b) => b.status !== "draft")
        .filter((b) => getClientDue(b) > 0 || getInsuranceDue(b) > 0),
    [bills]
  );

  const filteredBills = useMemo(() => {
    return bills.filter((b) => {
      if (activeTab === "draft" && b.status !== "draft") return false;
      if (activeTab === "sent" && b.status === "draft") return false;
      if (activeTab === "unpaid" && getTotalDue(b) <= 0) return false;

      if (clientFilter !== "all" && b.clientId !== clientFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !b.clientName.toLowerCase().includes(q) &&
          !b.billNumber.toLowerCase().includes(q) &&
          !(b.cptCode || "").toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [bills, activeTab, clientFilter, searchQuery]);

  const tabCounts = useMemo(
    () => ({
      all: bills.length,
      unpaid: bills.filter((b) => getTotalDue(b) > 0).length,
      sent: bills.filter((b) => b.status !== "draft").length,
      draft: bills.filter((b) => b.status === "draft").length,
    }),
    [bills]
  );

  // -- Summary scoped to the selected client (Step 2) ------------------------
  const scopedBills = useMemo(
    () =>
      clientFilter === "all" ? bills : bills.filter((b) => b.clientId === clientFilter),
    [bills, clientFilter]
  );
  const scopedOpenBills = useMemo(
    () =>
      scopedBills.filter(
        (b) => b.status !== "draft" && (getClientDue(b) > 0 || getInsuranceDue(b) > 0)
      ),
    [scopedBills]
  );

  const summaryTotals = useMemo(
    () => ({
      billed: scopedBills.reduce((s, b) => s + b.amount, 0),
      received: scopedBills.reduce((s, b) => s + (b.clientPaid || 0) + (b.insurancePaid || 0), 0),
      outstanding: scopedOpenBills.reduce((s, b) => s + getTotalDue(b), 0),
    }),
    [scopedBills, scopedOpenBills]
  );

  const scopedClientName =
    clientFilter !== "all" ? clients.find((c) => c.id === clientFilter)?.name : "";

  const formatDate = (iso?: string) => {
    if (!iso) return "N/A";
    const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // -- Permission ------------------------------------------------------------
  const canWriteOff = (bill: Bill): boolean => {
    if (isCurrentUserSuperAdmin || isCurrentUserAdmin) return true;
    const client = clients.find((c) => c.id === bill.clientId);
    return !!client && client.treatingProviderId === currentProviderId;
  };

  // -- Batch payment modal (Step 6) ------------------------------------------
  const [batchOpen, setBatchOpen] = useState(false);
  const [batchSelected, setBatchSelected] = useState<Record<string, boolean>>({});
  const [batchRows, setBatchRows] = useState<Record<string, string>>({});
  const [payMethod, setPayMethod] = useState<"direct" | "link">("direct");
  const [payType, setPayType] = useState<PaymentType>("client");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [writeOffReason, setWriteOffReason] = useState<WriteOffReason>("bad_debt");
  const [writeOffNote, setWriteOffNote] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [batchError, setBatchError] = useState("");
  const [modalClientId, setModalClientId] = useState<string | null>(null);
  const [showPastPayments, setShowPastPayments] = useState(false);

  const modalTarget = usePaymentModalTarget();

  const openBatchModal = useCallback((targetClientId?: string, preSelectedBillIds?: string[]) => {
    const targetBills = targetClientId
      ? openBills.filter((b) => b.clientId === targetClientId)
      : openBills;
    const hasSelections = preSelectedBillIds && preSelectedBillIds.length > 0;
    const initial: Record<string, boolean> = {};
    const amounts: Record<string, string> = {};
    targetBills.forEach((b) => {
      initial[b.id] = hasSelections ? preSelectedBillIds.includes(b.id) : true;
      amounts[b.id] = getTotalDue(b).toFixed(2);
    });
    setBatchSelected(initial);
    setBatchRows(amounts);
    setPayMethod("direct");
    setPayType("client");
    setReceiptNumber("");
    setWriteOffReason("bad_debt");
    setWriteOffNote("");
    setFileNames([]);
    setBatchError("");
    setModalClientId(targetClientId || null);
    setShowPastPayments(false);
    setBatchOpen(true);
  }, [openBills]);

  useEffect(() => {
    if (modalTarget) {
      openBatchModal(modalTarget.clientId, modalTarget.billIds);
    }
  }, [modalTarget, openBatchModal]);

  const toggleBatchBill = (id: string) => {
    setBatchSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clientsWithOpenBills = useMemo(() => {
    const map = new Map<string, { id: string; name: string; openCount: number }>();
    openBills.forEach((b) => {
      const existing = map.get(b.clientId);
      if (existing) {
        existing.openCount += 1;
      } else {
        map.set(b.clientId, { id: b.clientId, name: b.clientName, openCount: 1 });
      }
    });
    return Array.from(map.values());
  }, [openBills]);

  const modalBills = useMemo(() => {
    return modalClientId
      ? openBills.filter((b) => b.clientId === modalClientId)
      : [];
  }, [modalClientId, openBills]);

  const pastPayments = useMemo(() => {
    if (!modalClientId) return [];
    return bills
      .filter(
        (b) =>
          b.clientId === modalClientId &&
          (b.status === "paid_direct" ||
            b.status === "paid_via_claim" ||
            (b.paidAmount && b.paidAmount > 0) ||
            b.clientPaid > 0 ||
            getTotalDue(b) === 0)
      )
      .map((b) => {
        const paidVal = b.paidAmount || b.clientPaid || b.amount;
        return {
          id: b.id,
          billNumber: b.billNumber,
          paidAmount: paidVal,
          date: formatDate(b.resolvedAt || b.createdAt || b.dateOfService),
          method:
            b.resolutionMethod === "insurance"
              ? "Insurance"
              : b.resolutionMethod === "cash"
              ? "Cash"
              : "Credit/Debit",
        };
      });
  }, [bills, modalClientId, formatDate]);

  const selectedBatchBills = modalBills.filter((b) => batchSelected[b.id]);

  const subtotal = useMemo(() => {
    return selectedBatchBills.reduce((sum, b) => {
      const v = parseFloat(batchRows[b.id] ?? "0");
      return sum + (isNaN(v) ? 0 : Math.max(0, v));
    }, 0);
  }, [selectedBatchBills, batchRows]);

  const applyBatchSave = () => {
    setBatchError("");
    const rows = selectedBatchBills.filter((b) => {
      const v = parseFloat(batchRows[b.id] ?? "0");
      return v > 0;
    });
    if (rows.length === 0) {
      setBatchError("Select at least one bill with an amount greater than $0.00.");
      return;
    }

    if (payMethod === "link") {
      setBatchOpen(false);
      showToast(
        `Payment link sent to ${rows.length} client${rows.length > 1 ? "s" : ""} - email/SMS confirmation mocked for the prototype.`
      );
      return;
    }

    if (payType === "write_off") {
      let blocked = false;
      rows.forEach((b) => {
        if (blocked) return;
        if (!canWriteOff(b)) {
          blocked = true;
          setBatchError(
            `You don't have permission to write off ${b.billNumber}. Only Admins or the treating clinician can write off balances.`
          );
          return;
        }
      });
      if (blocked) return;
    }

    rows.forEach((b) => {
      const amount = parseFloat(batchRows[b.id]) || 0;
      if (payType === "write_off") {
        writeOffBill(b.id, writeOffReason, writeOffNote, amount, "client");
      } else {
        recordBillPayment(b.id, payType, amount);
      }
    });

    setBatchOpen(false);
    const verb =
      payType === "write_off" ? "written off" : `payment of $${subtotal.toFixed(2)} recorded`;
    showToast(`${verb} across ${rows.length} bill${rows.length > 1 ? "s" : ""}.`);
  };

  // -- Single-bill Add Payment (Step 4) --------------------------------------
  const [payBill, setPayBill] = useState<Bill | null>(null);
  const [payTypeSingle, setPayTypeSingle] = useState<PaymentType>("client");
  const [payAmountSingle, setPayAmountSingle] = useState("");
  const [payError, setPayError] = useState("");

  const openSinglePay = (bill: Bill) => {
    setPayBill(bill);
    setPayTypeSingle("client");
    setPayAmountSingle(getTotalDue(bill).toFixed(2));
    setPayError("");
  };

  const confirmSinglePay = () => {
    if (!payBill) return;
    const sideDue = payTypeSingle === "insurance" ? getInsuranceDue(payBill) : getClientDue(payBill);
    const amount = parseFloat(payAmountSingle) || 0;
    if (amount <= 0 || amount > Math.max(0, sideDue)) {
      setPayError(`Enter an amount between $0.01 and $${Math.max(0, sideDue).toFixed(2)}.`);
      return;
    }
    if (payTypeSingle === "write_off" && !canWriteOff(payBill)) {
      setPayError("You don't have permission to write off this bill.");
      return;
    }
    if (payTypeSingle === "write_off") {
      writeOffBill(payBill.id, writeOffReason, writeOffNote, amount, "client");
    } else {
      recordBillPayment(payBill.id, payTypeSingle, amount);
    }
    setPayBill(null);
    showToast(`$${amount.toFixed(2)} applied to ${payBill.billNumber}.`);
  };

  const TABS: { id: ListTab; label: string; count: number }[] = [
    { id: "all", label: "All", count: tabCounts.all },
    { id: "unpaid", label: "Unpaid", count: tabCounts.unpaid },
    { id: "sent", label: "Sent", count: tabCounts.sent },
    { id: "draft", label: "Draft", count: tabCounts.draft },
  ];

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700 dark:border-gray-200 animate-slide-up">
          <CheckCircle className="size-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Toolbar row - Step 3.1 peers */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 px-3 py-2 rounded-xl flex-1 lg:max-w-[220px]">
          <Search className="size-4 text-gray-400 shrink-0" />
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="bg-transparent text-sm font-semibold text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer w-full"
          >
            <option value="all">All Clients</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 lg:ml-auto">
          <button
            onClick={() => navigate("/billing/bills/create")}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex-shrink-0"
          >
            <Plus className="size-4" />
            Create Bill
          </button>
          <button
            onClick={() => openBatchModal(clientFilter !== "all" ? clientFilter : undefined)}
            disabled={openBills.length === 0}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Wallet className="size-4" />
            Add Payment
          </button>
          <Link
            to="/billing/unbilled"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
          >
            <FileText className="size-4" />
            Unbilled Sessions
          </Link>
        </div>
      </div>

      {/* Summary strip - scoped to the "All Clients" filter */}
      {clientFilter !== "all" && scopedClientName && (
        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold -mb-2">
          Showing summary for <span className="text-[#043570] dark:text-[#00c0ff]">{scopedClientName}</span>
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Billed</p>
          <p className="text-lg md:text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
            ${summaryTotals.billed.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Received</p>
          <p className="text-lg md:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            ${summaryTotals.received.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Outstanding</p>
          <p className="text-lg md:text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            ${summaryTotals.outstanding.toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">
            {scopedOpenBills.length} open bill{scopedOpenBills.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* Filter tabs + search - Step 3.2/3.3 */}
      <div className="space-y-3 bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto max-w-full">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-[#043570] text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative ml-auto w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bills/invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
            />
          </div>
        </div>
      </div>

      {/* Bills list - Card style layout */}
      <div className="space-y-3">
        {filteredBills.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center shadow-sm">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center">
                <Receipt className="size-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-semibold">
                  No bills match your filters.
                </p>
                <p className="text-[12px] text-gray-400 mt-1">
                  Click{" "}
                  <span className="font-semibold text-[#043570] dark:text-[#00c0ff]">
                    Create Bill
                  </span>{" "}
                  to bill a signed session.
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredBills.map((b) => {
            const sym = getCurrencySymbol(b.currency ?? "USD");
            const received = (b.clientPaid || 0) + (b.insurancePaid || 0);
            const pending = getTotalDue(b);
            const overdue = pending > 0 && b.dueDate && new Date(`${b.dueDate}T00:00:00`) < new Date();
            return (
              <div
                key={b.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
              >
                {/* Left side: Bill info & client name (no profile picture) */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <button
                      onClick={() => openBillingPanel({ kind: "bill", id: b.id })}
                      className="font-mono font-bold text-sm text-[#043570] dark:text-[#00c0ff] hover:underline"
                    >
                      {b.billNumber}
                    </button>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <button
                      onClick={() => openBillingPanel({ kind: "client", id: b.clientId })}
                      className="font-bold text-sm text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] truncate max-w-[200px]"
                    >
                      {b.clientName}
                    </button>
                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border rounded-full text-[11px] font-bold whitespace-nowrap ml-1 ${
                        b.status === "draft"
                          ? "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                          : pending > 0
                            ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                            : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          b.status === "draft"
                            ? "bg-gray-400"
                            : pending > 0
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />
                      {b.status === "draft"
                        ? "Draft"
                        : b.status === "written_off"
                          ? "Written Off"
                          : pending > 0
                            ? "Unpaid"
                            : "Settled"}
                    </span>
                  </div>

                  {/* Issued & Due date + type */}
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      Issued: <strong className="font-semibold text-gray-700 dark:text-gray-300">{formatDate(b.createdAt || b.dateOfService)}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Due:{" "}
                      <strong
                        className={`font-semibold ${
                          overdue ? "text-red-600 dark:text-red-400 font-bold" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {formatDate(b.dueDate)}
                      </strong>
                      {overdue && <span className="ml-1.5 text-[10px] font-bold text-red-500 uppercase">Overdue</span>}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-[11px]">
                      <Link2 className="size-3" />
                      {b.billType === "insurance" ? `${b.insurerName || "Insurance"} · copay` : "Self-pay"}
                    </span>
                  </div>
                </div>

                {/* Right side: 3 Financial Figures (Total, Paid, Unpaid) + Action buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-700/60">
                  {/* Single Unified Segmented Financial Card */}
                  <div className="flex items-center divide-x divide-gray-200 dark:divide-gray-700/80 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/50 shadow-2xs overflow-hidden">
                    {/* Total */}
                    <div className="px-3 py-1 text-center min-w-[62px]">
                      <span className="block text-[9px] uppercase tracking-wider font-extrabold text-gray-400 dark:text-gray-500">
                        Total
                      </span>
                      <span className="font-mono font-bold text-xs text-gray-900 dark:text-white">
                        {sym}{b.amount.toFixed(2)}
                      </span>
                    </div>

                    {/* Paid */}
                    <div className="px-3 py-1 text-center min-w-[62px] bg-emerald-50/30 dark:bg-emerald-950/20">
                      <span className="block text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">
                        Paid
                      </span>
                      <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300">
                        {sym}{received.toFixed(2)}
                      </span>
                    </div>

                    {/* Unpaid */}
                    <div className={`px-3 py-1 text-center min-w-[62px] ${
                      pending > 0 ? "bg-amber-50/40 dark:bg-amber-950/20" : ""
                    }`}>
                      <span className={`block text-[9px] uppercase tracking-wider font-extrabold ${
                        pending > 0 ? "text-amber-600 dark:text-amber-400" : "text-gray-400 dark:text-gray-500"
                      }`}>
                        Unpaid
                      </span>
                      <span className={`font-mono font-bold text-xs ${
                        pending > 0 ? "text-amber-700 dark:text-amber-300" : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {sym}{Math.max(0, pending).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openBillingPanel({ kind: "bill", id: b.id })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors cursor-pointer"
                      title="View bill & payments"
                    >
                      <Eye className="size-3.5 text-gray-500 dark:text-gray-400" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() =>
                        showToast(`Invoice ${b.billNumber} sent to ${b.clientName} via email/SMS.`)
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#043570] hover:bg-[#032554] rounded-xl transition-colors shadow-xs cursor-pointer"
                      title="Send invoice / notification to client"
                    >
                      <Send className="size-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* -- SINGLE-BILL ADD PAYMENT (Step 4) ----------------------------------- */}
      {payBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Wallet className="size-5 text-emerald-500" />
                Add Payment
              </h3>
              <button onClick={() => setPayBill(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl space-y-1 text-xs">
              <p className="font-bold text-gray-900 dark:text-white">
                {payBill.billNumber} - {payBill.clientName}
              </p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Client due:{" "}
                  <strong className="text-gray-900 dark:text-white">
                    ${Math.max(0, getClientDue(payBill)).toFixed(2)}
                  </strong>
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Insurance due:{" "}
                  <strong className="text-gray-900 dark:text-white">
                    ${Math.max(0, getInsuranceDue(payBill)).toFixed(2)}
                  </strong>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Payment Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "client", label: "Client" },
                    { id: "insurance", label: "Insurance" },
                    { id: "write_off", label: "Write-off" },
                  ] as { id: PaymentType; label: string }[]
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setPayTypeSingle(t.id);
                      setPayAmountSingle(
                        (t.id === "insurance" ? getInsuranceDue(payBill) : getClientDue(payBill)).toFixed(2)
                      );
                      setPayError("");
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      payTypeSingle === t.id
                        ? "bg-[#043570] text-white border-[#043570] shadow-xs"
                        : "bg-white dark:bg-gray-750 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {payTypeSingle === "write_off" && (
              <div className="grid grid-cols-1 gap-2">
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400">
                  Reason Code
                </label>
                <select
                  value={writeOffReason}
                  onChange={(e) => setWriteOffReason(e.target.value as WriteOffReason)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                >
                  {Object.entries(WRITE_OFF_REASON_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <textarea
                  value={writeOffNote}
                  onChange={(e) => setWriteOffNote(e.target.value)}
                  rows={2}
                  placeholder="Note (optional)"
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={payAmountSingle}
                onChange={(e) => {
                  setPayAmountSingle(e.target.value);
                  setPayError("");
                }}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Receipt # (optional)
                </label>
                <input
                  type="text"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Receipt Upload
                </label>
                <label className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer text-gray-500 dark:text-gray-400 hover:border-[#043570]">
                  <Upload className="size-4" />
                  <span className="truncate text-xs">{fileNames.length ? fileNames.join(", ") : "Attach file"}</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
                  />
                </label>
              </div>
            </div>

            {payError && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold">
                <AlertCircle className="size-4 shrink-0" />
                <span>{payError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setPayBill(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmSinglePay}
                className="px-5 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-xs transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- BATCH PAYMENT MODAL (Step 6) --------------------------------------- */}
      {batchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4 max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#F1F5F9] dark:bg-gray-700 flex items-center justify-center text-[#043570] dark:text-[#00c0ff]">
                  <CheckSquare className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Payment</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Select open bills and how they're paid
                  </p>
                </div>
              </div>
              <button onClick={() => setBatchOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="size-5" />
              </button>
            </div>

            {/* Client selector inside modal */}
            <div className="flex items-center gap-2.5 bg-gray-50 dark:bg-gray-750 p-3 rounded-xl border border-gray-200 dark:border-gray-600">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 shrink-0">
                Select Client:
              </label>
              <select
                value={modalClientId || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  const newId = val === "" ? null : val;
                  setModalClientId(newId);
                  if (newId) {
                    const newBills = openBills.filter((b) => b.clientId === newId);
                    const initial: Record<string, boolean> = {};
                    const amounts: Record<string, string> = {};
                    newBills.forEach((b) => {
                      initial[b.id] = true;
                      amounts[b.id] = getTotalDue(b).toFixed(2);
                    });
                    setBatchSelected(initial);
                    setBatchRows(amounts);
                  } else {
                    setBatchSelected({});
                    setBatchRows({});
                  }
                }}
                className="bg-white dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none cursor-pointer w-full"
              >
                <option value="" disabled={!!modalClientId}>
                  -- Select Client --
                </option>
                {clientsWithOpenBills.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.openCount} open bill{c.openCount === 1 ? "" : "s"})
                  </option>
                ))}
              </select>
            </div>

            {!modalClientId ? (
              <p className="py-10 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                Please select a client from the dropdown above to view open bills and add payments.
              </p>
            ) : modalBills.length === 0 ? (
              <p className="py-10 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                No open bills with an outstanding balance for this client.
              </p>
            ) : (
              <>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {modalBills.map((b) => {
                    const due = getTotalDue(b);
                    const checked = !!batchSelected[b.id];
                    return (
                      <div
                        key={b.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                          checked
                            ? "bg-[#043570]/5 border-[#043570] dark:border-[#00c0ff]"
                            : "bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBatchBill(b.id)}
                          className="rounded border-gray-300 dark:border-gray-600 text-[#043570] focus:ring-0 cursor-pointer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-gray-900 dark:text-white">
                            {b.billNumber} - {b.clientName}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {b.billType === "insurance" ? "Insurance" : "Self-pay"} · Balance{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                              ${due.toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-500 dark:text-gray-400">$</span>
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={batchRows[b.id] ?? ""}
                            onChange={(e) =>
                              setBatchRows((prev) => ({ ...prev, [b.id]: e.target.value }))
                            }
                            className="w-28 px-2.5 py-1.5 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-end p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-mono font-extrabold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPayMethod("direct")}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${
                        payMethod === "direct"
                          ? "bg-[#043570]/5 border-[#043570] dark:border-[#00c0ff]"
                          : "bg-white dark:bg-gray-750 border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <CreditCard className="size-3.5" /> Add Payment
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Enter payment details directly
                      </p>
                    </button>
                    <button
                      onClick={() => setPayMethod("link")}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${
                        payMethod === "link"
                          ? "bg-[#043570]/5 border-[#043570] dark:border-[#00c0ff]"
                          : "bg-white dark:bg-gray-750 border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Send className="size-3.5" /> Send Payment Link
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Email/SMS a secure link (mocked)
                      </p>
                    </button>
                  </div>
                </div>

                {payMethod === "direct" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                        Payment Type
                      </label>
                      <select
                        value={payType}
                        onChange={(e) => setPayType(e.target.value as PaymentType)}
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-semibold"
                      >
                        <option value="client">Client payment</option>
                        <option value="insurance">Insurance payment</option>
                        <option value="write_off">Write-off</option>
                      </select>
                    </div>
                    {payType === "write_off" && (
                      <div className="grid grid-cols-1 gap-2">
                        <select
                          value={writeOffReason}
                          onChange={(e) => setWriteOffReason(e.target.value as WriteOffReason)}
                          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                        >
                          {Object.entries(WRITE_OFF_REASON_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          ))}
                        </select>
                        <textarea
                          value={writeOffNote}
                          onChange={(e) => setWriteOffNote(e.target.value)}
                          rows={2}
                          placeholder="Write-off note (optional)"
                          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                          Receipt # (optional)
                        </label>
                        <input
                          type="text"
                          value={receiptNumber}
                          onChange={(e) => setReceiptNumber(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                          Receipt Upload
                        </label>
                        <label className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer text-gray-500 dark:text-gray-400 hover:border-[#043570]">
                          <Upload className="size-4" />
                          <span className="truncate text-xs">
                            {fileNames.length ? fileNames.join(", ") : "Attach file"}
                          </span>
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) =>
                              setFileNames(Array.from(e.target.files || []).map((f) => f.name))
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {batchError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>{batchError}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 space-y-3">
                  {/* Footer Row: Past Payments accordion on Left, Cancel & Save on Right */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="border border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden bg-blue-50/40 dark:bg-blue-950/20">
                      <button
                        type="button"
                        onClick={() => setShowPastPayments((v) => !v)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#043570] dark:text-[#00c0ff] hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                      >
                        <History className="size-3.5 text-[#043570] dark:text-[#00c0ff]" />
                        <span>Past Payments</span>
                        {modalClientId && (
                          <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[10px] font-mono text-[#043570] dark:text-[#00c0ff]">
                            {pastPayments.length} settled
                          </span>
                        )}
                        <span className="text-[11px] font-normal text-gray-500 ml-1">
                          {showPastPayments ? "Hide" : "Show history"}
                        </span>
                        <ChevronDown
                          className={`size-3.5 text-[#043570] dark:text-[#00c0ff] transition-transform duration-200 ${
                            showPastPayments ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBatchOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={applyBatchSave}
                        className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        {payMethod === "link" ? (
                          <>
                            <Send className="size-3.5" /> Send Payment Link
                          </>
                        ) : (
                          <>
                            <CheckCircle className="size-3.5" /> Save Payment
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Past Payments History Panel */}
                  {showPastPayments && (
                    <div className="p-3 border border-blue-200/60 dark:border-blue-800/60 rounded-xl bg-blue-50/20 dark:bg-blue-950/20 space-y-2 max-h-48 overflow-y-auto animate-fade-in">
                      {!modalClientId ? (
                        <p className="text-xs text-gray-500 dark:text-gray-400 py-3 text-center">
                          Please select a client above to view past payment records.
                        </p>
                      ) : pastPayments.length === 0 ? (
                        <p className="text-xs text-gray-500 dark:text-gray-400 py-3 text-center">
                          No past settled payments found for this client.
                        </p>
                      ) : (
                        pastPayments.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 text-xs"
                          >
                            <div>
                              <p className="font-mono font-bold text-[#043570] dark:text-[#00c0ff]">
                                {p.billNumber}
                              </p>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                {p.date} · {p.method}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                                ${p.paidAmount.toFixed(2)}
                              </span>
                              <p className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">
                                Settled
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
