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
import { useUserMode } from "../contexts/UserModeContext";
import { useFirstTimeUser } from "../contexts/FirstTimeUserContext";
import { ContextualSpotlight } from "../components/onboarding/SpotlightTour";
import { DemoClientModal } from "../components/onboarding/DemoClientModal";
import {
  Bill,
  WriteOffReason,
  WRITE_OFF_REASON_LABELS,
  getClientDue,
  getInsuranceDue,
  getTotalDue,
} from "../types/partnerDashboard";
import { getCurrencySymbol } from "../types/claims";
import { usePaymentModalTarget, openPaymentModal } from "../components/billing/paymentModalStore";

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
    getClientCredit,
    addClientCredit,
    useClientCredit,
  } = usePartnerDashboard();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openDemoModal } = useFirstTimeUser();

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

  // Filter bills for main Bills hub — include self-pay bills AND insurance bills that have client copay / responsibility
  const selfPayBills = useMemo(
    () => bills.filter((b) => b.billType !== "insurance" || (b.clientOwed && b.clientOwed > 0) || getClientDue(b) > 0),
    [bills]
  );

  const openBills = useMemo(
    () =>
      selfPayBills
        .filter((b) => b.status !== "draft")
        .filter((b) => getClientDue(b) > 0),
    [selfPayBills]
  );

  const filteredBills = useMemo(() => {
    return selfPayBills.filter((b) => {
      if (activeTab === "draft" && b.status !== "draft") return false;
      if (activeTab === "sent" && b.status === "draft") return false;
      if (activeTab === "unpaid" && getClientDue(b) <= 0) return false;

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
  }, [selfPayBills, activeTab, clientFilter, searchQuery]);

  const tabCounts = useMemo(
    () => ({
      all: selfPayBills.length,
      unpaid: selfPayBills.filter((b) => getClientDue(b) > 0).length,
      sent: selfPayBills.filter((b) => b.status !== "draft").length,
      draft: selfPayBills.filter((b) => b.status === "draft").length,
    }),
    [selfPayBills]
  );

  // -- Summary scoped to the selected client (Step 2) ------------------------
  const scopedBills = useMemo(
    () =>
      clientFilter === "all" ? selfPayBills : selfPayBills.filter((b) => b.clientId === clientFilter),
    [selfPayBills, clientFilter]
  );
  const scopedOpenBills = useMemo(
    () =>
      scopedBills.filter(
        (b) => b.status !== "draft" && getClientDue(b) > 0
      ),
    [scopedBills]
  );

  const summaryTotals = useMemo(
    () => ({
      billed: scopedBills.reduce((s, b) => s + b.amount, 0),
      received: scopedBills.reduce((s, b) => s + (b.clientPaid || 0), 0),
      outstanding: scopedOpenBills.reduce((s, b) => s + getClientDue(b), 0),
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

  const clientsWithOpenBills = useMemo(() => {
    const map = new Map<string, { id: string; name: string; openCount: number }>();
    bills
      .filter((b) => b.status !== "draft" && getTotalDue(b) > 0)
      .forEach((b) => {
        const existing = map.get(b.clientId);
        if (existing) {
          existing.openCount += 1;
        } else {
          map.set(b.clientId, { id: b.clientId, name: b.clientName, openCount: 1 });
        }
      });
    return Array.from(map.values());
  }, [bills]);

  const openBatchModal = useCallback((targetClientId?: string, preSelectedBillIds?: string[]) => {
    const firstClientWithBills = clientsWithOpenBills[0]?.id || clients[0]?.id || null;
    const activeClientId = targetClientId || firstClientWithBills;
    setModalClientId(activeClientId);

    const clientBills = activeClientId
      ? bills.filter((b) => b.clientId === activeClientId && b.status !== "draft" && getTotalDue(b) > 0)
      : [];

    const hasSelections = preSelectedBillIds && preSelectedBillIds.length > 0;
    const initialSelected: Record<string, boolean> = {};
    const initialAmounts: Record<string, string> = {};

    clientBills.forEach((b) => {
      initialSelected[b.id] = hasSelections ? preSelectedBillIds.includes(b.id) : true;
      initialAmounts[b.id] = getTotalDue(b).toFixed(2);
    });

    setBatchSelected(initialSelected);
    setBatchRows(initialAmounts);
    setPayMethod("direct");
    setPayType("client");
    setPaymentOption("cash");
    setReceiptNumber("");
    setWriteOffReason("bad_debt");
    setWriteOffNote("");
    setFileNames([]);
    setBatchError("");
    setTotalPaymentInput("");
    setIsManualPaymentInput(false);
    setApplyCredit(true);
    setShowPastPayments(false);
    setBatchOpen(true);
  }, [bills, clients, clientsWithOpenBills]);

  useEffect(() => {
    if (modalTarget) {
      openBatchModal(modalTarget.clientId, modalTarget.billIds);
    }
  }, [modalTarget, openBatchModal]);

  const toggleBatchBill = (id: string) => {
    setBatchSelected((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        const b = bills.find((item) => item.id === id);
        if (b && (!batchRows[id] || parseFloat(batchRows[id]) === 0)) {
          setBatchRows((rPrev) => ({ ...rPrev, [id]: getTotalDue(b).toFixed(2) }));
        }
      }
      return { ...prev, [id]: nextState };
    });
    setIsManualPaymentInput(false);
  };

  const modalBills = useMemo(() => {
    return modalClientId
      ? bills.filter((b) => b.clientId === modalClientId && b.status !== "draft" && getTotalDue(b) > 0)
      : [];
  }, [modalClientId, bills]);

  const modalClient = useMemo(() => {
    return clients.find((c) => c.id === modalClientId);
  }, [clients, modalClientId]);

  const modalClientHasInsurance = useMemo(() => {
    if (!modalClient) return false;
    const hasCompany = Boolean(
      modalClient.insuranceCompany &&
      modalClient.insuranceCompany.trim() !== "" &&
      modalClient.insuranceCompany.toLowerCase() !== "self-pay" &&
      modalClient.insuranceCompany.toLowerCase() !== "self pay" &&
      modalClient.insuranceCompany.toLowerCase() !== "none"
    );
    const hasInsurances = Boolean(
      modalClient.insurances &&
      modalClient.insurances.length > 0 &&
      modalClient.insurances.some(
        (ins) =>
          ins.toLowerCase() !== "self-pay" &&
          ins.toLowerCase() !== "self pay" &&
          ins.toLowerCase() !== "none"
      )
    );
    const hasInsuranceDetails = Boolean(modalClient.insuranceDetails?.subscriberId);
    const hasInsuranceBill = modalBills.some((b) => b.billType === "insurance");

    return hasCompany || hasInsurances || hasInsuranceDetails || hasInsuranceBill;
  }, [modalClient, modalBills]);

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
      const rawVal = batchRows[b.id];
      const val = rawVal !== undefined && rawVal !== "" ? parseFloat(rawVal) : getTotalDue(b);
      return sum + (isNaN(val) ? 0 : Math.max(0, val));
    }, 0);
  }, [selectedBatchBills, batchRows]);

  // -- Unified Payment & Credit Calculations ---------------------------------
  const [applyCredit, setApplyCredit] = useState(true);
  const [paymentOption, setPaymentOption] = useState<"card_on_file" | "cash" | "check" | "external_card">("cash");
  const [cashDate, setCashDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [checkNumber, setCheckNumber] = useState("");
  const [totalPaymentInput, setTotalPaymentInput] = useState("");
  const [isManualPaymentInput, setIsManualPaymentInput] = useState(false);

  const clientName = modalClientId ? (clients.find((c) => c.id === modalClientId)?.name || "Client") : "Client";
  const [customLinkMessage, setCustomLinkMessage] = useState("");

  useEffect(() => {
    setCustomLinkMessage(
      `Hi ${clientName},\n\nHimanshu Jain has requested a payment for your balance.\n\nPlease visit the link to make a secure payment from your client portal:\n[Payment link will appear here]`
    );
  }, [clientName]);

  const availableCredit = modalClientId ? getClientCredit(modalClientId) : 0;
  const appliedCredit =
    applyCredit && availableCredit > 0 && selectedBatchBills.length > 0
      ? Math.min(availableCredit, subtotal)
      : 0;
  const basePaymentNeeded = Math.max(0, subtotal - appliedCredit);

  // Sync default input value when selections change if not manually edited
  const effectivePaymentAmount = isManualPaymentInput
    ? parseFloat(totalPaymentInput || "0")
    : basePaymentNeeded;
  const newCreditAmount = Math.max(0, effectivePaymentAmount - basePaymentNeeded);

  const applyBatchSave = () => {
    setBatchError("");

    if (effectivePaymentAmount <= 0) {
      setBatchError("Please enter a payment amount greater than $0.00.");
      return;
    }

    const rows = selectedBatchBills.filter((b) => {
      const v = parseFloat(batchRows[b.id] ?? "0");
      return v > 0;
    });

    if (payMethod === "link") {
      setBatchOpen(false);
      showToast(
        `Payment link sent for $${effectivePaymentAmount.toFixed(2)} - email/SMS confirmation mocked.`
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

    if (appliedCredit > 0 && modalClientId) {
      useClientCredit(modalClientId, appliedCredit);
    }

    rows.forEach((b) => {
      const amount = parseFloat(batchRows[b.id]) || 0;
      if (payType === "write_off") {
        writeOffBill(b.id, writeOffReason, writeOffNote, amount, "client");
      } else {
        recordBillPayment(b.id, payType, amount);
      }
    });

    if (newCreditAmount > 0 && modalClientId) {
      addClientCredit(modalClientId, newCreditAmount);
    }

    setBatchOpen(false);
    const clientName = clients.find((c) => c.id === modalClientId)?.name || "client";
    const msg =
      newCreditAmount > 0
        ? `Payment of $${effectivePaymentAmount.toFixed(2)} recorded ($${subtotal.toFixed(2)} applied, +$${newCreditAmount.toFixed(2)} added as credit for ${clientName}).`
        : `Payment of $${effectivePaymentAmount.toFixed(2)} recorded across ${rows.length} bill${rows.length > 1 ? "s" : ""}.`;
    showToast(msg);
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

        <div className="relative flex items-center gap-2 lg:ml-auto">
          {/* Scoped Spotlight Nudge on Bills Hub */}
          <ContextualSpotlight
            spotlightId="bills-hub"
            title="Create & Track Patient Bills"
            description="Generate itemized self-pay bills, charge copays, and record patient payments from this central action bar."
            tag="Bills Hub"
            arrowPosition="top"
            className="absolute top-12 right-0 w-80 shadow-2xl"
          />
          <button
            onClick={() => openBatchModal(clientFilter !== "all" ? clientFilter : undefined)}
            disabled={openBills.length === 0}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Wallet className="size-4" />
            Add Payment
          </button>
          <button
            onClick={() => navigate("/billing/bills/create")}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex-shrink-0 cursor-pointer active:scale-95"
          >
            <Plus className="size-4" />
            Create Bill
          </button>
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Search filter and Unbilled Sessions */}
          <div className="flex items-center gap-2 flex-1 max-w-full lg:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bills/invoice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
              />
            </div>
            <Link
              to="/billing/unbilled"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-semibold transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              <FileText className="size-3.5" />
              <span>Unbilled Sessions</span>
            </Link>
          </div>

          {/* Right: All filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
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
        </div>
      </div>

      {/* Bills list - Card style layout */}
      <div className="space-y-3">
        {filteredBills.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center shadow-sm">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center">
                {searchQuery ? (
                  <Search className="size-6 text-gray-400 dark:text-gray-500" />
                ) : activeTab === "unpaid" ? (
                  <CheckCircle className="size-6 text-emerald-500" />
                ) : (
                  <Receipt className="size-6 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold text-base">
                  {selfPayBills.length === 0
                    ? "No bills generated yet"
                    : searchQuery
                    ? "No matching bills found"
                    : activeTab === "draft"
                    ? "No draft bills"
                    : activeTab === "unpaid"
                    ? "No unpaid bills"
                    : activeTab === "sent"
                    ? "No sent bills"
                    : "No bills found"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                  {selfPayBills.length === 0
                    ? "Create a self-pay invoice, record a copay, or sign and lock a clinical note to automatically generate billing charges."
                    : searchQuery
                    ? `No bills found matching "${searchQuery}". Try searching by another client name or invoice number.`
                    : activeTab === "draft"
                    ? "You don't have any bills saved in draft status."
                    : activeTab === "unpaid"
                    ? "All client invoices are fully paid and settled."
                    : activeTab === "sent"
                    ? "No sent invoices found for the current selection."
                    : "No bills match the selected client filter."}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Clear Search
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/billing/bills/create")}
                    className="px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Plus className="size-3.5" />
                    <span>{selfPayBills.length === 0 ? "Create First Bill" : "Create Bill"}</span>
                  </button>
                )}
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
                      onClick={() => navigate(`/billing/bills/${b.id}/invoice`)}
                      className="font-mono font-bold text-sm text-[#043570] dark:text-[#00c0ff] hover:underline"
                    >
                      {b.billNumber}
                    </button>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <button
                      onClick={() => navigate(`/clients/${b.clientId}`)}
                      className="font-bold text-sm text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] truncate max-w-[200px]"
                    >
                      {b.clientName}
                    </button>
                    {/* Status Pill */}
                    {(() => {
                      const isInsurancePending = b.billType === "insurance" && (getInsuranceDue(b) > 0 || b.claimId);
                      return (
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border rounded-full text-[11px] font-bold whitespace-nowrap ml-1 ${
                            b.status === "draft"
                              ? "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                              : isInsurancePending
                                ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold"
                                : pending > 0
                                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                                  : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              b.status === "draft"
                                ? "bg-gray-400"
                                : isInsurancePending
                                  ? "bg-blue-500 animate-pulse"
                                  : pending > 0
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                            }`}
                          />
                          {b.status === "draft"
                            ? "Draft"
                            : b.status === "written_off"
                              ? "Written Off"
                              : isInsurancePending
                                ? "Claim Pending"
                                : pending > 0
                                  ? "Unpaid"
                                  : "Settled"}
                        </span>
                      );
                    })()}
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
                      {b.billType === "insurance" ? "Insurance" : "Self-pay"}
                    </span>
                  </div>
                </div>

                {/* Right side: 3 Financial Figures (Total, Paid, Unpaid) + Action buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-700/60">
                  {/* Single Unified Segmented Financial Card */}
                  <div className="flex items-center divide-x divide-gray-200 dark:divide-gray-700/80 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/50 shadow-2xs overflow-hidden">
                    {/* Total */}
                    <div className="px-3 py-1 text-center min-w-[66px]">
                      <span className="block text-[9px] uppercase tracking-wider font-extrabold text-gray-400 dark:text-gray-500">
                        Total
                      </span>
                      <span className="font-mono font-bold text-xs text-gray-900 dark:text-white">
                        {sym}{b.amount.toFixed(2)}
                      </span>
                    </div>

                    {/* Unpaid */}
                    <div className={`px-3 py-1 text-center min-w-[66px] ${
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
                        {sym}{Math.max(0, b.billType === "insurance" ? getClientDue(b) : pending).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Sleek Compact 3-Icon Action Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => navigate(`/billing/bills/${b.id}/invoice`)}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                      title="View Invoice Document"
                    >
                      <Eye className="size-4" />
                    </button>
                    <button
                      onClick={() => openPaymentModal({ clientId: b.clientId, billIds: [b.id] })}
                      className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 transition-colors cursor-pointer"
                      title="Add Payment for this client"
                    >
                      <Wallet className="size-4" />
                    </button>
                    <button
                      onClick={() =>
                        showToast(`Invoice ${b.billNumber} sent to ${b.clientName} via email/SMS.`)
                      }
                      className="p-2 rounded-xl bg-[#043570] hover:bg-[#032554] text-white shadow-xs transition-colors cursor-pointer"
                      title="Send Invoice to client"
                    >
                      <Send className="size-4" />
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
              {(() => {
                const singleBillClient = clients.find((c) => c.id === payBill.clientId);
                const singleBillHasInsurance = Boolean(
                  payBill.billType === "insurance" ||
                  (singleBillClient?.insuranceCompany &&
                    singleBillClient.insuranceCompany.toLowerCase() !== "self-pay" &&
                    singleBillClient.insuranceCompany.toLowerCase() !== "none") ||
                  (singleBillClient?.insurances && singleBillClient.insurances.length > 0)
                );
                const singlePaymentTypes = [
                  { id: "client", label: "Self-pay" },
                  ...(singleBillHasInsurance ? [{ id: "insurance", label: "Insurance" }] : []),
                  { id: "write_off", label: "Write-off" },
                ] as { id: PaymentType; label: string }[];

                return (
                  <div className={`grid ${singleBillHasInsurance ? "grid-cols-3" : "grid-cols-2"} gap-2`}>
                    {singlePaymentTypes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setPayTypeSingle(t.id);
                          setPayAmountSingle(
                            (t.id === "insurance" ? getInsuranceDue(payBill) : getClientDue(payBill)).toFixed(2)
                          );
                          setPayError("");
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          payTypeSingle === t.id
                            ? "bg-[#043570] text-white border-[#043570] shadow-xs"
                            : "bg-white dark:bg-gray-750 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                );
              })()}
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

      {batchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col my-auto max-h-[90vh]">
            
            {/* Top Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Payment for {modalClientId ? (clients.find((c) => c.id === modalClientId)?.name || "Client") : "Client"}
                </h2>
                {availableCredit > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                    ${availableCredit.toFixed(2)} credit on account
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={modalClientId || ""}
                  onChange={(e) => {
                    const newId = e.target.value || null;
                    setModalClientId(newId);
                    setPayType("client");
                    setIsManualPaymentInput(false);
                    setTotalPaymentInput("");
                    if (newId) {
                      const newBills = bills.filter((b) => b.clientId === newId && b.status !== "draft" && getTotalDue(b) > 0);
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
                  className="bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-white px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="" disabled={!!modalClientId}>
                    Select Client
                  </option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setBatchOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {!modalClientId ? (
                <div className="py-12 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  Please select a client from the top dropdown to manage payments.
                </div>
              ) : (
                <>
                  {/* STEP 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="size-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">
                        Select invoices and confirm payment amount
                      </h3>
                    </div>

                    {/* Invoices Table Container */}
                    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                      {modalBills.length === 0 ? (
                        <div className="p-4 text-xs text-gray-500 dark:text-gray-400 text-center italic">
                          No open invoices found for this client. You can enter an unlinked payment below.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400 font-semibold">
                                <th className="py-2.5 px-3 w-10 text-center">
                                  <input
                                    type="checkbox"
                                    checked={modalBills.length > 0 && selectedBatchBills.length === modalBills.length}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const updated: Record<string, boolean> = {};
                                      const amounts: Record<string, string> = { ...batchRows };
                                      modalBills.forEach((b) => {
                                        updated[b.id] = checked;
                                        if (checked && (!amounts[b.id] || parseFloat(amounts[b.id]) === 0)) {
                                          amounts[b.id] = getTotalDue(b).toFixed(2);
                                        }
                                      });
                                      setBatchSelected(updated);
                                      setBatchRows(amounts);
                                      setIsManualPaymentInput(false);
                                    }}
                                    className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-0 cursor-pointer"
                                  />
                                </th>
                                <th className="py-2.5 px-3">Invoice</th>
                                <th className="py-2.5 px-3">Details</th>
                                <th className="py-2.5 px-3">Type</th>
                                <th className="py-2.5 px-3 text-right">Balance</th>
                                <th className="py-2.5 px-3 text-right w-32">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                              {modalBills.map((b) => {
                                const due = getTotalDue(b);
                                const checked = !!batchSelected[b.id];
                                const rowValStr = batchRows[b.id] !== undefined && batchRows[b.id] !== ""
                                  ? batchRows[b.id]
                                  : checked
                                  ? due.toFixed(2)
                                  : "";
                                return (
                                  <tr
                                    key={b.id}
                                    className={`transition-colors ${
                                      checked
                                        ? "bg-blue-50/20 dark:bg-blue-950/10"
                                        : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                                    }`}
                                  >
                                    <td className="py-3 px-3 text-center">
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleBatchBill(b.id)}
                                        className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-0 cursor-pointer"
                                      />
                                    </td>
                                    <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">
                                      {b.billNumber}
                                    </td>
                                    <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                                      {formatDate(b.dateOfService || b.createdAt)} Professional Services
                                    </td>
                                    <td className="py-3 px-3">
                                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        {b.billType === "insurance" && modalClientHasInsurance ? "Insurance" : "Self-pay"}
                                        <span className="text-red-500 font-normal">(Unpaid)</span>
                                      </span>
                                    </td>
                                    <td className="py-3 px-3 text-right font-mono font-medium text-gray-900 dark:text-white">
                                      ${due.toFixed(2)}
                                    </td>
                                    <td className="py-3 px-3 text-right">
                                      <div className="flex items-center justify-end gap-1">
                                        <span className="text-gray-400 font-mono">$</span>
                                        <input
                                          type="number"
                                          min="0.01"
                                          step="0.01"
                                          value={rowValStr}
                                          onChange={(e) => {
                                            setBatchRows((prev) => ({ ...prev, [b.id]: e.target.value }));
                                            setIsManualPaymentInput(false);
                                          }}
                                          className="w-24 px-2 py-1 text-xs text-right font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Subtotal & Payment amount footer section */}
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-800/40 border-t border-gray-200 dark:border-gray-800 space-y-3">
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <span>Subtotal</span>
                          <span className="font-mono text-sm text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                        </div>

                        {availableCredit > 0 && (
                          <div className="flex justify-between items-center text-xs text-emerald-700 dark:text-emerald-400 pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
                            <label className="flex items-center gap-2 cursor-pointer font-medium">
                              <input
                                type="checkbox"
                                checked={applyCredit}
                                onChange={(e) => setApplyCredit(e.target.checked)}
                                className="rounded border-emerald-400 text-emerald-600 focus:ring-0 cursor-pointer"
                              />
                              <span>Apply available credit (${availableCredit.toFixed(2)})</span>
                            </label>
                            <span className="font-mono font-bold">-${appliedCredit.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-gray-200/80 dark:border-gray-700">
                          <label className="font-bold text-gray-900 dark:text-white text-xs">
                            Payment amount ($)
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400 font-mono text-xs">$</span>
                              <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={isManualPaymentInput ? totalPaymentInput : basePaymentNeeded ? basePaymentNeeded.toFixed(2) : ""}
                                onChange={(e) => {
                                  setIsManualPaymentInput(true);
                                  setTotalPaymentInput(e.target.value);
                                }}
                                placeholder="0.00"
                                className="w-32 px-3 py-1.5 text-sm font-mono font-bold bg-white dark:bg-gray-900 border border-blue-400 dark:border-blue-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                            </div>
                          </div>
                        </div>

                        {newCreditAmount > 0 && (
                          <div className="mt-2 p-2.5 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 rounded-lg flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                            <span>Payment will result in a new credit on account</span>
                            <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                              +${newCreditAmount.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* STEP 2: Select payment type */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="size-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center shrink-0">
                        2
                      </span>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">
                        What is this payment for?
                      </h3>
                    </div>

                    {/* Payment Type Options */}
                    <div className={`grid ${modalClientHasInsurance ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                      <button
                        type="button"
                        onClick={() => setPayType("client")}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          payType === "client"
                            ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <Wallet className={`size-5 ${payType === "client" ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}`} />
                        <span className="font-bold text-xs text-gray-900 dark:text-white">
                          Self-pay
                        </span>
                      </button>

                      {modalClientHasInsurance && (
                        <button
                          type="button"
                          onClick={() => setPayType("insurance")}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                            payType === "insurance"
                              ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <FileText className={`size-5 ${payType === "insurance" ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}`} />
                          <span className="font-bold text-xs text-gray-900 dark:text-white">
                            Insurance
                          </span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setPayType("write_off")}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          payType === "write_off"
                            ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <Ban className={`size-5 ${payType === "write_off" ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}`} />
                        <span className="font-bold text-xs text-gray-900 dark:text-white">
                          Write-off
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* STEP 3: Details based on selected payment type */}
                  {payType === "client" && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="size-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center shrink-0">
                          3
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base">
                          Choose payment method
                        </h3>
                      </div>

                      {/* Payment Method Container Box */}
                      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 space-y-4">
                        
                        {/* Selector Tabs (Add payment vs Send payment link) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPayMethod("direct")}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              payMethod === "direct"
                                ? "bg-blue-50/40 dark:bg-blue-950/30 border-blue-500 shadow-xs"
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-bold text-xs text-gray-900 dark:text-white">
                              Add payment
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPayMethod("link")}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              payMethod === "link"
                                ? "bg-blue-50/40 dark:bg-blue-950/30 border-blue-500 shadow-xs"
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-bold text-xs text-gray-900 dark:text-white">
                              Send payment link
                            </span>
                          </button>
                        </div>

                        {/* Direct Payment Radio List */}
                        {payMethod === "direct" && (
                          <div className="space-y-2 pt-2">
                            {/* Card on file option */}
                            <label
                              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                                paymentOption === "card_on_file"
                                  ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/20"
                                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="paymentOption"
                                  value="card_on_file"
                                  checked={paymentOption === "card_on_file"}
                                  onChange={() => setPaymentOption("card_on_file")}
                                  className="text-blue-600 focus:ring-0 size-4"
                                />
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                  Online card on file
                                </span>
                              </div>
                              <div className="flex items-center gap-1 opacity-70">
                                <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">VISA</span>
                                <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">MC</span>
                                <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">AMEX</span>
                              </div>
                            </label>

                            {/* Cash Option */}
                            <div
                              className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                                paymentOption === "cash"
                                  ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/20"
                                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50/50"
                              }`}
                            >
                              <label className="flex items-center gap-3 cursor-pointer flex-1">
                                <input
                                  type="radio"
                                  name="paymentOption"
                                  value="cash"
                                  checked={paymentOption === "cash"}
                                  onChange={() => setPaymentOption("cash")}
                                  className="text-blue-600 focus:ring-0 size-4"
                                />
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                  Cash
                                </span>
                              </label>
                              {paymentOption === "cash" && (
                                <div className="flex items-center gap-2">
                                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                                    Payment Date
                                  </label>
                                  <input
                                    type="date"
                                    value={cashDate}
                                    onChange={(e) => setCashDate(e.target.value)}
                                    className="px-2.5 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Check Option */}
                            <div
                              className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                                paymentOption === "check"
                                  ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/20"
                                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50/50"
                              }`}
                            >
                              <label className="flex items-center gap-3 cursor-pointer flex-1">
                                <input
                                  type="radio"
                                  name="paymentOption"
                                  value="check"
                                  checked={paymentOption === "check"}
                                  onChange={() => setPaymentOption("check")}
                                  className="text-blue-600 focus:ring-0 size-4"
                                />
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                  Check
                                </span>
                              </label>
                              {paymentOption === "check" && (
                                <div className="flex items-center gap-2">
                                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                                    Check #
                                  </label>
                                  <input
                                    type="text"
                                    value={checkNumber}
                                    onChange={(e) => setCheckNumber(e.target.value)}
                                    placeholder="Enter check #"
                                    className="w-36 px-2.5 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                                  />
                                </div>
                              )}
                            </div>

                            {/* External Card Option */}
                            <label
                              className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-colors ${
                                paymentOption === "external_card"
                                  ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/20"
                                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="paymentOption"
                                  value="external_card"
                                  checked={paymentOption === "external_card"}
                                  onChange={() => setPaymentOption("external_card")}
                                  className="text-blue-600 focus:ring-0 size-4"
                                />
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                  External terminal
                                </span>
                              </div>
                              <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-7 mt-0.5">
                                Record a payment collected using an external payment processor
                              </span>
                            </label>
                          </div>
                        )}

                        {payMethod === "link" && (
                          <div className="pt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Message preview (Editable):
                              </span>
                              <span className="text-[11px] text-gray-400">
                                You can customize this message before sending
                              </span>
                            </div>
                            <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/60 dark:bg-gray-800/40 p-3">
                              <textarea
                                value={customLinkMessage}
                                onChange={(e) => setCustomLinkMessage(e.target.value)}
                                rows={5}
                                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans leading-relaxed resize-y"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Insurance Details */}
                  {payType === "insurance" && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="size-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center shrink-0">
                          3
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base">
                          Insurance payment details
                        </h3>
                      </div>

                      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                              Insurance Payer / Carrier
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. BlueCross BlueShield, Aetna"
                              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                              Check / EFT Reference #
                            </label>
                            <input
                              type="text"
                              value={checkNumber}
                              onChange={(e) => setCheckNumber(e.target.value)}
                              placeholder="e.g. EFT-9840281"
                              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                              EOB Date
                            </label>
                            <input
                              type="date"
                              value={cashDate}
                              onChange={(e) => setCashDate(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                              Attach EOB / Remittance (Optional)
                            </label>
                            <label className="flex items-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer text-gray-500 dark:text-gray-400 hover:border-blue-500">
                              <Upload className="size-4 text-gray-400" />
                              <span className="truncate">{fileNames.length ? fileNames.join(", ") : "Upload file"}</span>
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Write-off Details */}
                  {payType === "write_off" && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="size-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center shrink-0">
                          3
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base">
                          Write-off details
                        </h3>
                      </div>

                      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            Reason Code
                          </label>
                          <select
                            value={writeOffReason}
                            onChange={(e) => setWriteOffReason(e.target.value as WriteOffReason)}
                            className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                          >
                            {Object.entries(WRITE_OFF_REASON_LABELS).map(([key, label]) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            Note / Justification (optional)
                          </label>
                          <textarea
                            value={writeOffNote}
                            onChange={(e) => setWriteOffNote(e.target.value)}
                            rows={3}
                            placeholder="Reason for write off..."
                            className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            Attach Supporting Document (optional)
                          </label>
                          <label className="flex items-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer text-gray-500 dark:text-gray-400 hover:border-blue-500">
                            <Upload className="size-4 text-gray-400" />
                            <span className="truncate">{fileNames.length ? fileNames.join(", ") : "Upload document"}</span>
                            <input
                              type="file"
                              multiple
                              className="hidden"
                              onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Past Payments History Trigger */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPastPayments((v) => !v)}
                      className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <History className="size-4" />
                      <span>Past Payments ({pastPayments.length} settled)</span>
                      <ChevronDown className={`size-3.5 transition-transform ${showPastPayments ? "rotate-180" : ""}`} />
                    </button>

                    {showPastPayments && (
                      <div className="mt-3 p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/40 space-y-2 max-h-40 overflow-y-auto animate-fade-in">
                        {pastPayments.length === 0 ? (
                          <p className="text-xs text-gray-500 text-center py-2">No past settled payments.</p>
                        ) : (
                          pastPayments.map((p) => (
                            <div key={p.id} className="flex justify-between items-center text-xs p-2 bg-white dark:bg-gray-800 rounded border border-gray-200/60 dark:border-gray-700">
                              <div>
                                <span className="font-semibold text-gray-900 dark:text-white">{p.billNumber}</span>
                                <span className="text-gray-500 ml-2">{p.date} · {p.method}</span>
                              </div>
                              <span className="font-mono font-bold text-emerald-600">${p.paidAmount.toFixed(2)}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Modal Bottom Footer (Replaces Right Sidebar) */}
            <div className="p-4 px-6 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
              <div>
                {batchError ? (
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="size-4 shrink-0" />
                    {batchError}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {effectivePaymentAmount > 0 ? (
                      <>
                        Total to charge: <strong className="text-gray-900 dark:text-white font-mono">${effectivePaymentAmount.toFixed(2)}</strong>
                      </>
                    ) : (
                      "No payment amount specified"
                    )}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBatchOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={applyBatchSave}
                  disabled={!modalClientId}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1868db] hover:bg-[#1255b8] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {payType === "write_off" ? (
                    <>
                      <Ban className="size-4" /> Save ${effectivePaymentAmount.toFixed(2)} Write-off
                    </>
                  ) : payType === "insurance" ? (
                    <>
                      <CheckCircle className="size-4" /> Save ${effectivePaymentAmount.toFixed(2)} Insurance Payment
                    </>
                  ) : payMethod === "link" ? (
                    <>
                      <Send className="size-4" /> Send Payment Link for ${effectivePaymentAmount.toFixed(2)}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-4" /> Save ${effectivePaymentAmount.toFixed(2)} Payment
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Carl Rogers Demo Sandbox Modal */}
      <DemoClientModal />
    </div>
  );
}
