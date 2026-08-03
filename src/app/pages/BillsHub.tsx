import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Plus,
  Send,
  CheckSquare,
  X,
  UserCheck,
  AlertTriangle,
  FileCheck,
  Ban,
  Receipt,
  FileText,
  ExternalLink,
  MoreVertical,
  Wallet,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { formatDateOfService } from "../types/claims";
import { CreateInvoiceModal } from "../components/billing/CreateInvoiceModal";
import {
  Bill,
  WriteOffReason,
  WRITE_OFF_REASON_LABELS,
  PriorAuthorization,
} from "../types/partnerDashboard";

export function BillsHub() {
  const {
    bills,
    updateBill,
    writeOffBill,
    providers,
    clients,
    currentProviderId,
    isCurrentUserSuperAdmin,
    isCurrentUserAdmin,
    priorAuthorizations,
    addPriorAuthorization,
    addRemittanceRecord,
  } = usePartnerDashboard();

  const { getClaim, createNewClaim, updateClaimStatus, simulateClearinghouseSubmission } = useClaims();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialClientId = searchParams.get("clientId") || "";
  const resubmitClaimId = searchParams.get("resubmitClaimId") || "";
  const resubmitClaim = resubmitClaimId ? getClaim(resubmitClaimId) : undefined;
  const initialSessionIds = useMemo(
    () =>
      (searchParams.get("sessions") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [searchParams]
  );

  // Navigation / Tabs state — Part 3b restructure: distinct sub-views
  // (Unresolved / AR-Aging / Prior Authorizations / History) instead of one
  // flat mega-table.
  const [activeTab, setActiveTab] = useState<
    "unresolved" | "ar" | "prior_auth" | "history"
  >("unresolved");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayer, setSelectedPayer] = useState<string>("all");
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Deep-link from client context (?clientId=...) — pre-fill the search box
  // so the hub opens scoped to that client's charges.
  useEffect(() => {
    if (initialClientId) {
      const client = clients.find((c) => c.id === initialClientId);
      if (client) {
        setSearchQuery(client.name);
      }
    }
  }, [initialClientId, clients]);

  // Deep-link from the Unbilled Sessions "Create Bill" action
  // (?clientId=...&openBill=1) — auto-open the Create Invoice modal with that
  // client preselected.
  const openBillParam = searchParams.get("openBill") === "1";
  useEffect(() => {
    if (openBillParam && initialClientId && clients.some((c) => c.id === initialClientId)) {
      setCreateInvoiceOpen(true);
    }
  }, [openBillParam, initialClientId, clients]);

  // Batch selection state
  const [selectedBillIds, setSelectedBillIds] = useState<string[]>([]);

  // Create Invoice modal
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);

  // Record Payment modal state
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [targetBillForPay, setTargetBillForPay] = useState<Bill | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payValidationError, setPayValidationError] = useState("");

  // Write-off Modal state
  const [writeOffModalOpen, setWriteOffModalOpen] = useState(false);
  const [targetBillForWriteOff, setTargetBillForWriteOff] = useState<Bill | null>(null);
  const [writeOffAmountInput, setWriteOffAmountInput] = useState("");
  const [writeOffReason, setWriteOffReason] = useState<WriteOffReason>("bad_debt");
  const [writeOffNote, setWriteOffNote] = useState("");
  const [permissionError, setPermissionError] = useState("");

  // Prior Authorization Modal state
  const [priorAuthModalOpen, setPriorAuthModalOpen] = useState(false);
  const [authListOpen, setAuthListOpen] = useState(false);
  const [authClientId, setAuthClientId] = useState("");
  const [authPayerId, setAuthPayerId] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [authValidUntil, setAuthValidUntil] = useState("");
  const [authServiceType, setAuthServiceType] = useState("90791");

  // Remittance Posting Modal state (Stage 6)
  const [remitModalOpen, setRemitModalOpen] = useState(false);
  const [targetBillForRemit, setTargetBillForRemit] = useState<Bill | null>(null);
  const [remitAllowedAmount, setRemitAllowedAmount] = useState("");
  const [remitPaidAmount, setRemitPaidAmount] = useState("");
  const [remitPatientResp, setRemitPatientResp] = useState("");
  const [remitAdjustmentReason, setRemitAdjustmentReason] = useState("");
  const [remitDiscrepancy, setRemitDiscrepancy] = useState(false);

  // Part 4c — pre-submit SNIP edit-validation confirmation state
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [targetBillForSubmit, setTargetBillForSubmit] = useState<Bill | null>(null);

  // Row action dropdown state (declutters the actions column)
  const [openMenuBillId, setOpenMenuBillId] = useState<string | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper: outstanding balance (charge minus everything collected or written off)
  const getOutstanding = (bill: Bill): number => {
    return bill.amount - (bill.paidAmount || 0) - (bill.writeOffAmount || 0);
  };

  // 1. Calculate Summary Metrics
  const metrics = useMemo(() => {
    const unresolvedAmount = bills
      .filter((b) => b.status === "unresolved")
      .reduce((sum, b) => sum + getOutstanding(b), 0);

    const claimPendingAmount = bills
      .filter((b) => b.status === "claim_pending")
      .reduce((sum, b) => sum + getOutstanding(b), 0);

    const writtenOffAmount = bills.reduce((sum, b) => sum + (b.writeOffAmount || 0), 0);

    // Aging AR Buckets (days since dateOfService for unpaid bills)
    const now = new Date().getTime();
    let ar0to30 = 0;
    let ar31to60 = 0;
    let ar61to90 = 0;
    let ar90plus = 0;

    bills
      .filter((b) => b.status === "unresolved" || b.status === "claim_pending")
      .forEach((b) => {
        const dos = new Date(b.dateOfService).getTime();
        const diffDays = Math.floor((now - dos) / (1000 * 60 * 60 * 24));
        const outstanding = getOutstanding(b);
        if (diffDays <= 30) ar0to30 += outstanding;
        else if (diffDays <= 60) ar31to60 += outstanding;
        else if (diffDays <= 90) ar61to90 += outstanding;
        else ar90plus += outstanding;
      });

    return {
      unresolvedAmount,
      claimPendingAmount,
      writtenOffAmount,
      ar0to30,
      ar31to60,
      ar61to90,
      ar90plus,
      totalAging: ar0to30 + ar31to60 + ar61to90 + ar90plus,
    };
  }, [bills]);

  // 2. Filtered Bills
  const filteredBills = useMemo(() => {
    return bills.filter((b) => {
      // Tab filter — Unresolved = open work (needs action OR pending with payer);
      // History = resolved (paid direct / paid via claim / written off).
      if (activeTab === "unresolved" && b.status !== "unresolved" && b.status !== "claim_pending")
        return false;
      if (
        activeTab === "history" &&
        b.status !== "paid_direct" &&
        b.status !== "paid_via_claim" &&
        b.status !== "written_off"
      )
        return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesClient = b.clientName.toLowerCase().includes(q);
        const matchesBillNum = b.billNumber.toLowerCase().includes(q);
        const matchesCpt = b.cptCode.toLowerCase().includes(q);
        if (!matchesClient && !matchesBillNum && !matchesCpt) return false;
      }

      // Payer filter
      if (selectedPayer === "insurance" && !b.payerId) return false;
      if (selectedPayer === "self_pay" && b.payerId) return false;

      // Provider filter
      if (selectedProvider !== "all" && b.providerId !== selectedProvider) return false;

      // Status filter
      if (selectedStatus !== "all" && b.status !== selectedStatus) return false;

      return true;
    });
  }, [bills, activeTab, searchQuery, selectedPayer, selectedProvider, selectedStatus]);

  // Helper: days outstanding since date of service
  const getDaysOutstanding = (dateOfService: string): number => {
    const dos = new Date(dateOfService).getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((now - dos) / (1000 * 60 * 60 * 24)));
  };

  // Helper: resolve client name
  const getClientName = (clientId: string): string => {
    return clients.find((c) => c.id === clientId)?.name || "Unknown client";
  };

  // Helper: mock business rule (Stage 5 spec) — Psychiatric Diagnostic Evaluation
  // (90791) and higher-frequency therapy require prior authorization; routine
  // therapy (90834) does not. This is a mock rule, not real payer logic.
  const requiresPriorAuth = (cptCode: string): boolean => {
    return cptCode === "90791";
  };

  // Helper: get linked Prior Authorization for a bill (matched by client + payer + service)
  const getLinkedAuth = (bill: Bill): PriorAuthorization | undefined => {
    return priorAuthorizations.find(
      (a) =>
        a.clientId === bill.clientId &&
        a.serviceType.includes(bill.cptCode) &&
        a.status === "approved" &&
        (!bill.payerId || a.payerId === bill.payerId) &&
        (!a.validUntil || new Date(a.validUntil) >= new Date(bill.dateOfService))
    );
  };

  // Helper: unique payers derived from existing bills (for the Prior Auth modal)
  const payerOptions = useMemo(() => {
    const map = new Map<string, string>();
    bills.forEach((b) => {
      if (b.payerId && b.payerName) map.set(b.payerId, b.payerName);
    });
    clients.forEach((c) => {
      if (c.insuranceCompany && !Array.from(map.values()).includes(c.insuranceCompany)) {
        map.set(`payer-${c.insuranceCompany.replace(/\s+/g, "-").toLowerCase()}`, c.insuranceCompany);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [bills, clients]);

  // Permission check for Write-off (Stage 4 requirement: Admin or Treating Clinician only)
  const canWriteOffBill = (bill: Bill): boolean => {
    if (isCurrentUserSuperAdmin || isCurrentUserAdmin) return true;
    const client = clients.find((c) => c.id === bill.clientId);
    return !!client && client.treatingProviderId === currentProviderId;
  };

  // Helper: bills sorted into aging buckets for the AR report (Stage 8)
  const agingBills = useMemo(() => {
    return bills
      .filter((b) => b.status === "unresolved" || b.status === "claim_pending")
      .filter((b) => {
        if (selectedProvider !== "all" && b.providerId !== selectedProvider) return false;
        if (selectedPayer === "insurance" && !b.payerId) return false;
        if (selectedPayer === "self_pay" && b.payerId) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          if (
            !b.clientName.toLowerCase().includes(q) &&
            !b.billNumber.toLowerCase().includes(q) &&
            !b.cptCode.toLowerCase().includes(q)
          ) {
            return false;
          }
        }
        return true;
      })
      .map((bill) => ({ bill, days: getDaysOutstanding(bill.dateOfService) }))
      .sort((a, b) => b.days - a.days);
  }, [bills, selectedProvider, selectedPayer, searchQuery]);

  // Handle Bill actions
  // Creates a REAL claim record (matching the Claim status machine) so that
  // "Submit Claim" in the hub produces a claim the Claims list / ClaimDetail
  // can actually resolve. The claim is submitted for the FULL charge — a
  // copay collected at checkout is the client's share and does not reduce
  // the amount billed to the payer.
  const submitBillAsClaim = (bill: Bill) => {
    const lines = bill.serviceLines?.length
      ? bill.serviceLines.map((l) => ({
          id: `sl-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
          sessionId: l.sessionId,
          dateOfService: l.dateOfService,
          serviceCode: l.cptCode,
          units: 1,
          chargeAmount: l.amount,
        }))
      : [
          {
            id: `sl-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
            sessionId: bill.sessionId,
            dateOfService: bill.dateOfService,
            serviceCode: bill.cptCode,
            units: 1,
            chargeAmount: bill.amount,
          },
        ];
    const claim = createNewClaim({
      flowType: "mantra",
      clientId: bill.clientId,
      clientName: bill.clientName,
      providerId: bill.providerId,
      payerId: bill.payerId,
      payerName: bill.payerName,
      sessionIds: bill.sessionIds?.length
        ? bill.sessionIds
        : bill.serviceLines?.map((l) => l.sessionId) || [bill.sessionId],
      diagnosisCodes: bill.diagnosisCodes || [],
      serviceLines: lines,
    });
    // Part 4a — run the real clearinghouse machine (submitted → awaiting_ack
    // → Stedi validation → sent_to_payer → in_adjudication with PCCN).
    simulateClearinghouseSubmission(claim.id);
    updateBill(bill.id, {
      status: "claim_pending",
      resolutionMethod: "insurance",
      claimId: claim.id,
    });
    return claim;
  };

  const handleMarkAsClaimPending = (bill: Bill) => {
    const claim = submitBillAsClaim(bill);
    showToast(
      `Claim ${claim.claimNumber} submitted for ${bill.clientName} ($${bill.amount.toFixed(2)}).`
    );
  };

  // Part 4c — real SNIP edit-validation categories. A claim that fails any of
  // these is not submittable (matches clearinghouse behavior: a failed edit is
  // rejected before the payer ever sees it).
  const runSnipValidation = (bill: Bill) => {
    const provider = providers.find((p) => p.id === bill.providerId);
    const serviceLineTotal = bill.amount;
    return {
      balance:
        Math.abs(serviceLineTotal - bill.amount) < 0.01
          ? { label: "Balance check (Level 3) — charges equal claim total", pass: true, detail: `Service total $${bill.amount.toFixed(2)}` }
          : { label: "Balance check (Level 3) — charges must equal total", pass: false, detail: "Unbalanced totals" },
      codes:
        /^\d{5}$/.test(bill.cptCode) && (bill.diagnosisCodes || []).some((d) => /^[A-Z]\d{2}(\.\d{1,2})?$/.test(d))
          ? { label: "Code validity (Level 5) — CPT & ICD-10 formatted", pass: true, detail: `${bill.cptCode} / ${(bill.diagnosisCodes || [])[0]}` }
          : { label: "Code validity (Level 5) — CPT & ICD-10 formatted", pass: false, detail: "CPT must be 5 digits, ICD-10 must be valid" },
      required:
        !!bill.payerId && !!provider?.id && (bill.diagnosisCodes || []).length > 0
          ? { label: "Required fields — payer, NPI, diagnosis present", pass: true, detail: provider?.name || "NPI on file" }
          : { label: "Required fields — payer, NPI, diagnosis present", pass: false, detail: !bill.payerId ? "Missing payer ID" : "Missing NPI or diagnosis" },
    };
  };

  const openSubmitConfirmation = (bill: Bill) => {
    setTargetBillForSubmit(bill);
    setConfirmSubmitOpen(true);
  };

  const handleOpenPayModal = (bill: Bill) => {
    setTargetBillForPay(bill);
    setPayAmount(getOutstanding(bill).toFixed(2));
    setPayValidationError("");
    setPayModalOpen(true);
  };

  const handleConfirmPay = () => {
    if (!targetBillForPay) return;
    const outstanding = getOutstanding(targetBillForPay);
    const paid = parseFloat(payAmount) || 0;
    if (paid <= 0 || paid > outstanding) {
      setPayValidationError(`Enter an amount between $0.01 and $${outstanding.toFixed(2)}.`);
      return;
    }
    const newPaidAmount = (targetBillForPay.paidAmount || 0) + paid;
    const fullyPaid = newPaidAmount >= targetBillForPay.amount;
    updateBill(targetBillForPay.id, {
      paidAmount: newPaidAmount,
      status: fullyPaid ? "paid_direct" : "unresolved",
      resolutionMethod: targetBillForPay.resolutionMethod || "cash",
      resolvedAt: fullyPaid ? new Date().toISOString() : null,
    });
    setPayModalOpen(false);
    showToast(
      fullyPaid
        ? `Payment of $${paid.toFixed(2)} recorded — ${targetBillForPay.clientName} balance settled.`
        : `Partial payment of $${paid.toFixed(2)} recorded. $${(outstanding - paid).toFixed(2)} still owed.`
    );
  };

  const handleOpenWriteOffModal = (bill: Bill) => {
    setTargetBillForWriteOff(bill);
    setWriteOffAmountInput(getOutstanding(bill).toFixed(2));
    setWriteOffReason("bad_debt");
    setWriteOffNote("");
    setPermissionError(
      canWriteOffBill(bill)
        ? ""
        : "You don't have permission to write off this bill. Only Admins or the treating clinician of this client can perform write-offs."
    );
    setWriteOffModalOpen(true);
  };

  const handleConfirmWriteOff = () => {
    if (!targetBillForWriteOff) return;
    if (!canWriteOffBill(targetBillForWriteOff)) {
      setPermissionError(
        "You don't have permission to write off this bill. Only Admins or the treating clinician of this client can perform write-offs."
      );
      return;
    }
    const outstanding = getOutstanding(targetBillForWriteOff);
    const amount = parseFloat(writeOffAmountInput) || 0;
    if (amount <= 0 || amount > outstanding) {
      setPermissionError(`Enter an amount between $0.01 and $${outstanding.toFixed(2)}.`);
      return;
    }
    writeOffBill(targetBillForWriteOff.id, writeOffReason, writeOffNote, amount);
    setWriteOffModalOpen(false);
    showToast(
      `$${amount.toFixed(2)} written off on ${targetBillForWriteOff.billNumber} (${WRITE_OFF_REASON_LABELS[writeOffReason]}).`
    );
  };

  const handleOpenRemitModal = (bill: Bill) => {
    setTargetBillForRemit(bill);
    setRemitAllowedAmount((bill.amount * 0.85).toFixed(2));
    setRemitPaidAmount((bill.amount * 0.85).toFixed(2));
    setRemitPatientResp("0.00");
    setRemitAdjustmentReason("Contractual adjustment");
    setRemitDiscrepancy(false);
    setRemitModalOpen(true);
  };

  const handleConfirmRemit = () => {
    if (!targetBillForRemit) return;
    const paid = parseFloat(remitPaidAmount) || 0;
    const allowed = parseFloat(remitAllowedAmount) || 0;
    const patResp = parseFloat(remitPatientResp) || 0;

    addRemittanceRecord({
      claimId: targetBillForRemit.claimId || targetBillForRemit.billNumber,
      billedAmount: targetBillForRemit.amount,
      allowedAmount: allowed,
      paidAmount: paid,
      patientResponsibility: patResp,
      adjustmentReason: remitAdjustmentReason,
      discrepancyFlag: remitDiscrepancy || allowed + patResp < targetBillForRemit.amount * 0.7,
    });

    updateBill(targetBillForRemit.id, {
      status: "paid_via_claim",
      resolutionMethod: "insurance",
      resolvedAt: new Date().toISOString().split("T")[0],
    });

    setRemitModalOpen(false);
    showToast(`Remittance posted for ${targetBillForRemit.clientName}. Bill resolved.`);
  };

  const handleSavePriorAuth = () => {
    if (!authClientId || !authPayerId || !authNumber || !authValidUntil || !authServiceType) {
      showToast("Please fill in all required authorization fields.");
      return;
    }
    addPriorAuthorization({
      clientId: authClientId,
      payerId: authPayerId,
      authorizationNumber: authNumber,
      validUntil: authValidUntil,
      serviceType: authServiceType,
      status: "approved",
      decidedAt: new Date().toISOString(),
      linkedBillIds: [],
    });
    setPriorAuthModalOpen(false);
    setAuthClientId("");
    setAuthPayerId("");
    setAuthNumber("");
    setAuthValidUntil("");
    showToast(`Prior authorization #${authNumber} saved successfully.`);
  };

  // Handle batch selection
  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBillIds(filteredBills.map((b) => b.id));
    } else {
      setSelectedBillIds([]);
    }
  };

  const handleToggleSelectBill = (id: string) => {
    if (selectedBillIds.includes(id)) {
      setSelectedBillIds(selectedBillIds.filter((item) => item !== id));
    } else {
      setSelectedBillIds([...selectedBillIds, id]);
    }
  };

  const handleBatchSubmitClaims = () => {
    const selected = bills.filter(
      (b) => selectedBillIds.includes(b.id) && b.status === "unresolved"
    );
    if (selected.length === 0) {
      showToast("No unresolved bills selected to submit.");
      setSelectedBillIds([]);
      return;
    }
    if (selected.some((b) => !b.payerId)) {
      showToast("Self-pay bills cannot be submitted as insurance claims. Remove them from your selection.");
      return;
    }
    // Part 4c — a batch is blocked if any bill fails SNIP edit validation.
    const failing = selected.find((b) => Object.values(runSnipValidation(b)).some((r) => !r.pass));
    if (failing) {
      const result = runSnipValidation(failing);
      const failedItem = Object.values(result).find((r) => !r.pass);
      showToast(`${failing.billNumber} failed edit validation: ${failedItem?.detail || "invalid"} — not submitted.`);
      return;
    }
    const payerSet = new Set(selected.map((b) => b.payerId));
    if (payerSet.size > 1) {
      showToast("Insurance claims must be batched by a single payer. Please filter your selection.");
      return;
    }
    let submitted = 0;
    selected.forEach((bill) => {
      submitBillAsClaim(bill);
      submitted++;
    });
    showToast(`Submitted ${submitted} bill(s) as insurance claims.`);
    setSelectedBillIds([]);
  };

  const handleBatchGenerateSuperbill = () => {
    const selected = bills.filter((b) => selectedBillIds.includes(b.id));
    if (selected.length === 0) {
      showToast("No bills selected to generate a superbill.");
      setSelectedBillIds([]);
      return;
    }
    const clientSet = new Set(selected.map((b) => b.clientName));
    if (clientSet.size > 1) {
      showToast("Superbills can only be generated for one client at a time. Please filter your selection.");
      return;
    }
    const ids = selected.map((b) => b.id).join(",");
    setSelectedBillIds([]);
    navigate(`/billing/bills/superbill?billIds=${encodeURIComponent(ids)}`);
  };

  const handleSendPaymentReminder = () => {
    showToast("Payment reminders & patient statements sent for overdue accounts.");
  };

  const handleResubmitClaim = () => {
    if (!resubmitClaim) return;
    updateClaimStatus(resubmitClaim.id, "submitted", "[MOCK] Resubmitting corrected claim to the clearinghouse...");
    showToast(`Claim ${resubmitClaim.claimNumber} resubmitted.`);
    navigate(`/claims/${resubmitClaim.id}`);
  };

  const unresolvedCount = bills.filter((b) => b.status === "unresolved").length;
  const claimPendingCount = bills.filter((b) => b.status === "claim_pending").length;
  const resolvedCount = bills.filter(
    (b) => b.status === "paid_via_claim" || b.status === "paid_direct" || b.status === "written_off"
  ).length;

  const statusChip: Record<
    Bill["status"],
    { label: string; cls: string; dot: string; pulse?: boolean }
  > = {
    unresolved: {
      label: "Needs Resolution",
      cls: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
      dot: "bg-amber-500",
      pulse: true,
    },
    claim_pending: {
      label: "Claim Submitted",
      cls: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
      dot: "bg-blue-500",
    },
    paid_via_claim: {
      label: "Paid / Remitted",
      cls: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
      dot: "bg-emerald-500",
    },
    paid_direct: {
      label: "Paid / Remitted",
      cls: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
      dot: "bg-emerald-500",
    },
    written_off: {
      label: "Written Off",
      cls: "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300",
      dot: "bg-gray-500",
    },
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700 dark:border-gray-200 animate-slide-up">
          <CheckCircle className="size-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0 pb-4">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
            Billing &amp; Revenue Hub
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
            Every signed session and manual bill lands here. Submit insurance claims, record
            cash/online payments, post remittances, and write off balances.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
          <button
            onClick={() => setCreateInvoiceOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex-shrink-0"
          >
            <Plus className="size-4" />
            Create Bill
          </button>
          <Link
            to="/billing/unbilled"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
          >
            <FileText className="size-4" />
            Unbilled Sessions
          </Link>
        </div>
      </div>

      {/* Resubmission banner (Correct & Resubmit lands here now) */}
      {resubmitClaim && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Claim {resubmitClaim.claimNumber} returned to draft for correction &amp; resubmission
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                Its service lines were restored as unbilled appointments — create a corrected bill if
                needed, then resubmit when ready.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResubmitClaim}
              className="px-4 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl transition-colors shadow-xs"
            >
              Resubmit Claim
            </button>
            <Link
              to={`/claims/${resubmitClaim.id}`}
              className="px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              View Claim
            </Link>
          </div>
        </div>
      )}

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Wallet className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Outstanding</p>
          </div>
          <p className="text-lg md:text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
            ${metrics.unresolvedAmount.toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">
            amount still owed ({unresolvedCount} bills)
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Send className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Claims Pending</p>
          </div>
          <p className="text-lg md:text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
            ${metrics.claimPendingAmount.toFixed(2)}
          </p>
          <p className="text-[11px] text-[#2563EB] font-semibold mt-1">
            {claimPendingCount} submitted to payer
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
              <Clock className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Overdue 61+ Days</p>
          </div>
          <p className="text-lg md:text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-3">
            ${(metrics.ar61to90 + metrics.ar90plus).toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">needs patient follow-up</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              <Receipt className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Written Off YTD</p>
          </div>
          <p className="text-lg md:text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
            ${metrics.writtenOffAmount.toFixed(2)}
          </p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">this year</p>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="space-y-3 bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-xs">
        {/* Navigation Tabs — Part 3b sub-views */}
        <div className="flex items-center gap-1 overflow-x-auto md:overflow-x-visible md:flex-wrap md:gap-1.5">
          {[
            { id: "unresolved", label: "Unresolved", count: unresolvedCount + claimPendingCount },
            { id: "ar", label: "A/R Aging", count: undefined },
            { id: "prior_auth", label: "Prior Authorizations", count: priorAuthorizations.length },
            { id: "history", label: "History", count: resolvedCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-[#043570] text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search & Filters (hidden on the Prior Authorizations view) */}
        {activeTab !== "prior_auth" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search client, CPT, Bill #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#043570]"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 px-3 py-2 rounded-xl">
              <Filter className="size-3.5 text-gray-400 shrink-0" />
              <select
                value={selectedPayer}
                onChange={(e) => setSelectedPayer(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer w-full"
              >
                <option value="all">All Payers</option>
                <option value="insurance">Insurance Only</option>
                <option value="self_pay">Self-Pay Only</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 px-3 py-2 rounded-xl">
              <UserCheck className="size-3.5 text-gray-400 shrink-0" />
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer w-full"
              >
                <option value="all">All Clinicians</option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 px-3 py-2 rounded-xl">
              <Clock className="size-3.5 text-gray-400 shrink-0" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer w-full"
              >
                <option value="all">All Statuses</option>
                <option value="unresolved">Needs Resolution</option>
                <option value="claim_pending">Claim Submitted</option>
                <option value="paid_direct">Paid Direct</option>
                <option value="paid_via_claim">Paid via Claim</option>
                <option value="written_off">Written Off</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Batch Action Bar (hidden on History — reference/audit only) */}
      {selectedBillIds.length > 0 && activeTab !== "history" && (
        <div className="p-3 bg-white dark:bg-gray-800 border border-[#043570]/30 dark:border-[#00c0ff]/30 text-gray-900 dark:text-white rounded-xl flex items-center justify-between gap-4 shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckSquare className="size-4 text-[#043570] dark:text-[#00c0ff]" />
            <span className="text-xs font-bold">
              {selectedBillIds.length} bill(s) selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBatchSubmitClaims}
              className="px-3 py-1.5 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-lg transition-colors"
            >
              Batch Submit Claims
            </button>
            <button
              onClick={handleBatchGenerateSuperbill}
              className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
            >
              Generate Superbill
            </button>
            <button
              onClick={() => setSelectedBillIds([])}
              className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Content View */}
      {activeTab === "ar" ? (
        /* ── AGING A/R FINANCIAL REPORT CARD (STAGE 8) ── */
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Patient &amp; Payer Aging Accounts Receivable
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Outstanding balance by time elapsed since the date of service.
              </p>
            </div>
            <button
              onClick={handleSendPaymentReminder}
              className="px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2"
            >
              <Send className="size-3.5" />
              <span>Send Patient Statements &amp; Reminders</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-500 uppercase">0–30 Days (Current)</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                ${metrics.ar0to30.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-500 uppercase">31–60 Days</p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                ${metrics.ar31to60.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-500 uppercase">61–90 Days</p>
              <p className="text-2xl font-black text-orange-600 dark:text-orange-400 mt-1">
                ${metrics.ar61to90.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-red-50/70 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/40">
              <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase">
                90+ Days (Critical)
              </p>
              <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">
                ${metrics.ar90plus.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Aging bucket detail list */}
          <div className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
            {(
              [
                { key: "0to30", label: "0–30 Days (Current)", range: (d: number) => d <= 30 },
                { key: "31to60", label: "31–60 Days", range: (d: number) => d > 30 && d <= 60 },
                { key: "61to90", label: "61–90 Days", range: (d: number) => d > 60 && d <= 90 },
                { key: "90plus", label: "90+ Days (Critical)", range: (d: number) => d > 90 },
              ] as const
            ).map((bucket) => {
              const items = agingBills.filter(({ days }) => bucket.range(days));
              if (items.length === 0) return null;
              return (
                <div key={bucket.key}>
                  <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {bucket.label}
                    </span>
                    <span className="text-xs font-black text-gray-900 dark:text-white">
                      ${items.reduce((sum, { bill }) => sum + getOutstanding(bill), 0).toFixed(2)}
                    </span>
                  </div>
                  <ul className="divide-y divide-gray-100 dark:divide-gray-700/60">
                    {items.map(({ bill, days }) => (
                      <li
                        key={bill.id}
                        className="px-4 py-3 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Link
                            to={`/clients/${bill.clientId}`}
                            className="font-bold text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] truncate"
                          >
                            {getClientName(bill.clientId)}
                          </Link>
                          <span className="text-gray-400 font-mono">{bill.billNumber}</span>
                          <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[10px] text-gray-600 dark:text-gray-300">
                            {bill.cptCode}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-gray-500 dark:text-gray-400">{bill.dateOfService}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              days > 90
                                ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                                : days > 60
                                  ? "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300"
                                  : days > 30
                                    ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {days}d
                          </span>
                          <span className="font-mono font-extrabold text-gray-900 dark:text-white w-20 text-right">
                            ${getOutstanding(bill).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {agingBills.length === 0 && (
              <div className="py-12 text-center text-xs text-gray-400 font-medium">
                No outstanding bills in this aging report. You're all caught up.
              </div>
            )}
          </div>
        </div>
      ) : activeTab === "prior_auth" ? (
        /* ── PRIOR AUTHORIZATIONS SUB-VIEW (Part 3b / Bug 8) ── */
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Prior Authorizations
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {priorAuthorizations.length} authorization
                {priorAuthorizations.length === 1 ? "" : "s"} on file · tracked per client, payer &amp; service
              </p>
            </div>
            <button
              onClick={() => setPriorAuthModalOpen(true)}
              className="px-4 py-2 bg-[#043570] hover:bg-[#032554] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2"
            >
              <FileCheck className="size-3.5" />
              <span>Record Prior Authorization</span>
            </button>
          </div>

          {priorAuthorizations.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No prior authorizations recorded yet.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Insurance services that require pre-approval should be recorded here before claims are submitted.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {priorAuthorizations.map((pa) => {
                const authClient = clients.find((c) => c.id === pa.clientId);
                const authPayer = payerOptions.find((p) => p.id === pa.payerId);
                const expired =
                  pa.status === "approved" &&
                  !!pa.validUntil &&
                  new Date(pa.validUntil) < new Date();
                const effectiveStatus = expired
                  ? "expired"
                  : pa.status;
                return (
                  <div
                    key={pa.id}
                    className="rounded-2xl border border-gray-200 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-750/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {authClient?.name || "Unknown client"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {authPayer?.name || "Unknown payer"} · {pa.serviceType}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full shrink-0 ${
                          effectiveStatus === "denied"
                            ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                            : effectiveStatus === "approved"
                              ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                              : effectiveStatus === "pending"
                                ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                                : effectiveStatus === "expired"
                                  ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {effectiveStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <p className="text-gray-500 dark:text-gray-400">
                          {pa.authorizationNumber ? `Auth #${pa.authorizationNumber}` : "No auth #"}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {pa.validUntil
                            ? `Valid until ${new Date(pa.validUntil).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                            : "No expiry set"}
                        </p>
                      </div>
                      <span className="font-mono text-gray-400 text-[10px]">
                        {pa.linkedBillIds.length} linked bill{pa.linkedBillIds.length === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* ── BILLS TABLE (Unresolved & History) ── */
        <div className="bg-white dark:bg-gray-800 rounded-2xl">
          <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {activeTab !== "history" && (
                    <th className="py-4 px-4 w-10 text-center bg-gray-50 dark:bg-gray-900">
                      <input
                        type="checkbox"
                        checked={
                          filteredBills.length > 0 &&
                          selectedBillIds.length === filteredBills.length
                        }
                        onChange={(e) => handleToggleSelectAll(e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-600 text-[#043570] focus:ring-0 cursor-pointer"
                      />
                    </th>
                  )}
                  <th className="py-4 px-5 w-[14%] bg-gray-50 dark:bg-gray-900">Bill &amp; Date</th>
                  <th className="py-4 px-5 w-[22%] bg-gray-50 dark:bg-gray-900">Client &amp; ICD-10</th>
                  <th className="py-4 px-5 w-[16%] bg-gray-50 dark:bg-gray-900">Payer / Prior Auth</th>
                  <th className="py-4 px-5 w-[14%] bg-gray-50 dark:bg-gray-900">Status</th>
                  <th className="py-4 px-5 w-[12%] text-right bg-gray-50 dark:bg-gray-900">Balance</th>
                  <th className="py-4 px-5 w-[20%] text-right bg-gray-50 dark:bg-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-[13px]">
                {filteredBills.length === 0 ? (
                  <tr>
                    <td colSpan={activeTab === "history" ? 6 : 7} className="py-20 text-center">
                      <div className="inline-flex flex-col items-center gap-3">
                        <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center">
                          <Receipt className="size-6 text-gray-400 dark:text-gray-500" />
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 font-semibold">No billing records found matching your filters.</p>
                          <p className="text-[12px] text-gray-400 mt-1">
                            Tip: sign &amp; lock a session note to auto-generate a bill, or click{" "}
                            <span className="font-semibold text-[#043570] dark:text-[#00c0ff]">Create Bill</span> to bill an appointment manually.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBills.map((b) => {
                    const isSelected = selectedBillIds.includes(b.id);
                    const auth = getLinkedAuth(b);
                    const outstanding = getOutstanding(b);
                    const isRisk =
                      !!b.payerId &&
                      (b.status === "unresolved" || b.status === "claim_pending") &&
                      ((requiresPriorAuth(b.cptCode) && !auth) ||
                        getDaysOutstanding(b.dateOfService) > 45);
                    const menuOpen = openMenuBillId === b.id;
                    const linkedClaim = b.claimId ? getClaim(b.claimId) : undefined;

                    return (
                      <tr
                        key={b.id}
                        className={`transition-colors ${
                          isSelected
                            ? "bg-blue-50/50 dark:bg-blue-900/10"
                            : "hover:bg-gray-50/70 dark:hover:bg-gray-750/40"
                        }`}
                      >
                        {/* Checkbox */}
                        {activeTab !== "history" && (
                          <td className="py-4 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectBill(b.id)}
                              className="rounded border-gray-300 dark:border-gray-600 text-[#043570] focus:ring-0 cursor-pointer"
                            />
                          </td>
                        )}

                        {/* Invoice & Date */}
                        <td className="py-4 px-5">
                          <Link
                            to={`/billing/bills/${b.id}`}
                            className="font-bold text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff]"
                          >
                            {b.billNumber}
                          </Link>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1.5 whitespace-nowrap">
                            <Clock className="size-3 text-gray-400 shrink-0" />
                            <span>{formatDateOfService(b.dateOfService)}</span>
                          </div>
                        </td>

                        {/* Client & Diagnosis */}
                        <td className="py-4 px-5">
                          <Link
                            to={`/clients/${b.clientId}`}
                            className="font-semibold text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] block truncate max-w-[180px]"
                            title={getClientName(b.clientId)}
                          >
                            {getClientName(b.clientId)}
                          </Link>
                          <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded text-[10px] font-bold border border-indigo-100 dark:border-indigo-800 whitespace-nowrap">
                            <span>ICD-10:</span>
                            <span>{b.diagnosisCodes?.[0] || "—"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[10px] text-gray-600 dark:text-gray-300 whitespace-nowrap">
                              {b.cptCode}
                            </span>
                            {b.serviceLines && b.serviceLines.length > 1 && (
                              <span
                                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#00c0ff]/10 text-[#043570] dark:text-[#00c0ff] border border-[#00c0ff]/30 whitespace-nowrap"
                                title={`${b.serviceLines.length} sessions billed on this invoice`}
                              >
                                +{b.serviceLines.length - 1} session
                                {b.serviceLines.length - 1 > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Payer & Auth */}
                        <td className="py-4 px-5">
                          <div
                            className="font-medium text-gray-900 dark:text-white truncate max-w-[160px]"
                            title={b.payerName || "Self-Pay"}
                          >
                            {b.payerName || "Self-Pay"}
                          </div>
                          {b.payerId ? (
                            auth ? (
                              <div className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1.5 whitespace-nowrap">
                                <FileCheck className="size-3" />
                                <span>Auth #{auth.authorizationNumber}</span>
                              </div>
                            ) : requiresPriorAuth(b.cptCode) ? (
                              <div className="inline-flex items-center gap-1 text-[10px] text-red-600 dark:text-red-400 font-bold mt-1.5 whitespace-nowrap">
                                <AlertTriangle className="size-3" />
                                <span>Prior auth required</span>
                              </div>
                            ) : (
                              <div className="text-[10px] text-gray-400 mt-1.5 whitespace-nowrap">
                                Auth not required
                              </div>
                            )
                          ) : (
                            <div className="text-[10px] text-gray-400 mt-1.5 whitespace-nowrap">
                              No insurance on file
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-5">
                          <div className="flex flex-col items-start gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-xs font-bold whitespace-nowrap ${statusChip[b.status].cls}`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${statusChip[b.status].dot} ${
                                  statusChip[b.status].pulse ? "animate-pulse" : ""
                                }`}
                              />
                              {statusChip[b.status].label}
                            </span>

                            {(b.paidAmount || 0) > 0 && b.status === "unresolved" && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">
                                <CheckCircle className="size-3" />
                                Partially paid ${(b.paidAmount || 0).toFixed(2)}
                              </span>
                            )}
                            {(b.writeOffAmount || 0) > 0 && b.status === "unresolved" && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-600 whitespace-nowrap">
                                <Ban className="size-3" />
                                Partially written off ${(b.writeOffAmount || 0).toFixed(2)}
                              </span>
                            )}

                            {isRisk && (
                              <span
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded border border-red-200 dark:border-red-800 whitespace-nowrap"
                                title={
                                  requiresPriorAuth(b.cptCode) && !auth
                                    ? "Missing prior authorization"
                                    : "Over 45 days outstanding"
                                }
                              >
                                <AlertTriangle className="size-3" />
                                <span>At Risk</span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Balance */}
                        <td className="py-4 px-5 text-right">
                          <div className="font-mono font-extrabold text-sm text-gray-900 dark:text-white whitespace-nowrap">
                            ${outstanding.toFixed(2)}
                          </div>
                          {b.status !== "written_off" && outstanding < b.amount && (
                            <div className="text-[11px] text-gray-400 mt-1 whitespace-nowrap">
                              of ${b.amount.toFixed(2)}
                            </div>
                          )}
                          {b.status === "written_off" && (
                            <div className="text-[11px] text-gray-400 mt-1 whitespace-nowrap">
                              ${b.amount.toFixed(2)} charged
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {b.status === "unresolved" && (
                              <>
                                {b.payerId ? (
                                  <button
                                    onClick={() => openSubmitConfirmation(b)}
                                    className="px-3.5 py-1.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg text-[11px] font-bold transition-all shadow-xs whitespace-nowrap"
                                  >
                                    Submit Claim
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleOpenPayModal(b)}
                                    className="px-3.5 py-1.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg text-[11px] font-bold transition-all shadow-xs whitespace-nowrap"
                                  >
                                    Record Payment
                                  </button>
                                )}
                              </>
                            )}

                            {b.status === "claim_pending" && (
                              <>
                                {linkedClaim && (
                                  <Link
                                    to={`/claims/${b.claimId}`}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg text-[11px] font-bold transition-all shadow-xs whitespace-nowrap"
                                  >
                                    <ExternalLink className="size-3" />
                                    <span>View Claim</span>
                                  </Link>
                                )}
                              </>
                            )}

                            {(b.status === "paid_via_claim" || b.status === "paid_direct") && (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-end gap-1 text-xs whitespace-nowrap">
                                {linkedClaim ? (
                                  <Link
                                    to={`/claims/${b.claimId}`}
                                    className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 hover:underline"
                                  >
                                    <ExternalLink className="size-3.5" />
                                    View Claim
                                  </Link>
                                ) : (
                                  <CheckCircle className="size-4" />
                                )}
                                <span>Resolved</span>
                              </span>
                            )}

                            {b.status === "written_off" && (
                              <span className="text-gray-400 font-semibold italic text-xs whitespace-nowrap">
                                {WRITE_OFF_REASON_LABELS[b.writeOffReason || "bad_debt"]}
                              </span>
                            )}

                            {/* Kebab menu — secondary actions */}
                            <div className="relative">
                              <button
                                onClick={() => setOpenMenuBillId(menuOpen ? null : b.id)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                                title="More actions"
                              >
                                <MoreVertical className="size-4" />
                              </button>
                              {menuOpen && (
                                <>
                                  <div
                                    className="fixed inset-0 z-20"
                                    onClick={() => setOpenMenuBillId(null)}
                                  />
                                  <div className="absolute right-0 top-full mt-1 z-30 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl overflow-hidden py-1.5">
                                    {b.status === "unresolved" && (
                                      <button
                                        onClick={() => {
                                          setOpenMenuBillId(null);
                                          handleOpenWriteOffModal(b);
                                        }}
                                        className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                      >
                                        <Ban className="size-3.5 text-gray-400" />
                                        Write-Off Balance
                                      </button>
                                    )}
                                    {b.status === "claim_pending" && (
                                      <>
                                        <button
                                          onClick={() => {
                                            setOpenMenuBillId(null);
                                            handleOpenRemitModal(b);
                                          }}
                                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                        >
                                          <Send className="size-3.5 text-gray-400" />
                                          Post Remittance
                                        </button>
                                        <button
                                          onClick={() => {
                                            setOpenMenuBillId(null);
                                            handleOpenWriteOffModal(b);
                                          }}
                                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                        >
                                          <Ban className="size-3.5 text-gray-400" />
                                          Write-Off Balance
                                        </button>
                                      </>
                                    )}
                                    <Link
                                      to={`/billing/bills/${b.id}/invoice`}
                                      onClick={() => setOpenMenuBillId(null)}
                                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                    >
                                      <Receipt className="size-3.5 text-gray-400" />
                                      Invoice
                                    </Link>
                                    <Link
                                      to={`/billing/bills/${b.id}/superbill`}
                                      onClick={() => setOpenMenuBillId(null)}
                                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                    >
                                      <FileText className="size-3.5 text-gray-400" />
                                      Superbill
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
        </div>
      )}

      {/* ── SUBMIT CLAIM CONFIRMATION (Part 4c SNIP edit validation) ─────────── */}
      {confirmSubmitOpen && targetBillForSubmit && (() => {
        const checks = runSnipValidation(targetBillForSubmit);
        const allPass = Object.values(checks).every((c) => c.pass);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-5 animate-scale-up">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-[#043570]/10 dark:bg-[#043570]/40 flex items-center justify-center text-[#043570] dark:text-blue-300">
                    <Send className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Review &amp; Submit Claim
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {targetBillForSubmit.billNumber} · {targetBillForSubmit.clientName} · ${targetBillForSubmit.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setConfirmSubmitOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Edit Validation (SNIP framework)
                </p>
                {Object.values(checks).map((c) => (
                  <div
                    key={c.label}
                    className={`flex items-start justify-between gap-3 p-3 rounded-xl border ${
                      c.pass
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      {c.pass ? (
                        <CheckCircle className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="size-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <p className={`text-xs font-bold ${c.pass ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
                          {c.label}
                        </p>
                        <p className={`text-[11px] ${c.pass ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"} mt-0.5`}>
                          {c.detail}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-black shrink-0 ${c.pass ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {c.pass ? "PASS" : "FAIL"}
                    </span>
                  </div>
                ))}
                {!allPass && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
                    This claim fails edit validation and cannot be submitted to the payer. Fix the flagged fields first.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setConfirmSubmitOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  disabled={!allPass}
                  onClick={() => {
                    const bill = targetBillForSubmit;
                    setConfirmSubmitOpen(false);
                    handleMarkAsClaimPending(bill);
                  }}
                  className="px-5 py-2.5 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit to Clearinghouse
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── CREATE INVOICE MODAL ─────────────────────────────────────────────── */}
      <CreateInvoiceModal
        open={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        initialClientId={initialClientId}
        initialSessionIds={initialSessionIds}
        onCreated={(bill) => {
          showToast(`Bill ${bill.billNumber} created for ${bill.clientName} ($${bill.amount.toFixed(2)}).`);
          navigate(`/billing/bills/${bill.id}`);
        }}
      />

      {/* ── RECORD PAYMENT MODAL ─────────────────────────────────────────────── */}
      {payModalOpen && targetBillForPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="size-5 text-emerald-500" />
                Record Payment
              </h3>
              <button
                onClick={() => setPayModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl space-y-1 text-xs">
              <p className="font-bold text-gray-900 dark:text-white">
                {targetBillForPay.billNumber} — {targetBillForPay.clientName}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Charge: <strong>${targetBillForPay.amount.toFixed(2)}</strong>
                {(targetBillForPay.paidAmount || 0) > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {" "}
                    · Already paid ${(targetBillForPay.paidAmount || 0).toFixed(2)}
                  </span>
                )}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Balance due:{" "}
                <strong className="text-gray-900 dark:text-white">
                  ${getOutstanding(targetBillForPay).toFixed(2)}
                </strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Amount Received ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={payAmount}
                onChange={(e) => {
                  setPayAmount(e.target.value);
                  setPayValidationError("");
                }}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
              />
            </div>

            {payValidationError && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold">
                <AlertCircle className="size-4 shrink-0" />
                <span>{payValidationError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setPayModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPay}
                className="px-5 py-2 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-xs transition-colors"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── WRITE-OFF MODAL (Stage 4) ─────────────────────────────────────────────── */}
      {writeOffModalOpen && targetBillForWriteOff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Ban className="size-5 text-red-500" />
                Write Off Balance
              </h3>
              <button
                onClick={() => setWriteOffModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 rounded-xl">
              <p className="text-xs font-semibold text-red-800 dark:text-red-300">
                Writing off {targetBillForWriteOff.billNumber} for{" "}
                <strong>{targetBillForWriteOff.clientName}</strong>.
              </p>
              <p className="text-[11px] text-red-700 dark:text-red-300 mt-1">
                Charge ${targetBillForWriteOff.amount.toFixed(2)}
                {(targetBillForWriteOff.paidAmount || 0) > 0 && (
                  <span> · Collected ${(targetBillForWriteOff.paidAmount || 0).toFixed(2)}</span>
                )}
                <span className="font-bold">
                  {" "}
                  · Balance ${getOutstanding(targetBillForWriteOff).toFixed(2)}
                </span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Write Off Amount ($) *
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={writeOffAmountInput}
                onChange={(e) => setWriteOffAmountInput(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
              />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Writing off less than the balance keeps the remainder in A/R.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Write-Off Reason Code *
              </label>
              <select
                value={writeOffReason}
                onChange={(e) => setWriteOffReason(e.target.value as WriteOffReason)}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
              >
                <option value="bad_debt">{WRITE_OFF_REASON_LABELS.bad_debt}</option>
                <option value="financial_hardship">
                  {WRITE_OFF_REASON_LABELS.financial_hardship}
                </option>
                <option value="goodwill_adjustment">
                  {WRITE_OFF_REASON_LABELS.goodwill_adjustment}
                </option>
                <option value="timely_filing_expired">
                  {WRITE_OFF_REASON_LABELS.timely_filing_expired}
                </option>
                <option value="client_deceased">{WRITE_OFF_REASON_LABELS.client_deceased}</option>
                <option value="other">{WRITE_OFF_REASON_LABELS.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Write-Off Note (Optional)
              </label>
              <textarea
                value={writeOffNote}
                onChange={(e) => setWriteOffNote(e.target.value)}
                placeholder="Explain rationale for adjustment..."
                rows={3}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff]"
              />
            </div>

            {permissionError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{permissionError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setWriteOffModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWriteOff}
                disabled={!canWriteOffBill(targetBillForWriteOff)}
                className="px-5 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm Write-Off
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: PRIOR AUTHORIZATION (STAGE 5) ── */}
      {priorAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <FileCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Record Prior Authorization
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Link payer authorization to client CPT charges
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPriorAuthModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Client
                </label>
                <select
                  value={authClientId}
                  onChange={(e) => setAuthClientId(e.target.value)}
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
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Payer
                </label>
                <select
                  value={authPayerId}
                  onChange={(e) => setAuthPayerId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-semibold text-gray-900 dark:text-white"
                >
                  <option value="">Select payer...</option>
                  {payerOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Service Type / CPT
                </label>
                <select
                  value={authServiceType}
                  onChange={(e) => setAuthServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-semibold text-gray-900 dark:text-white"
                >
                  <option value="90791">90791 — Psychiatric Diagnostic Evaluation</option>
                  <option value="90834">90834 — Psychotherapy (45 min)</option>
                  <option value="90837">90837 — Psychotherapy (60 min)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Authorization Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. AUTH-98442"
                  value={authNumber}
                  onChange={(e) => setAuthNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-mono font-bold text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                  Valid Until Date
                </label>
                <input
                  type="date"
                  value={authValidUntil}
                  onChange={(e) => setAuthValidUntil(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-semibold text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setPriorAuthModalOpen(false)}
                className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePriorAuth}
                className="px-5 py-2.5 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-md transition-all"
              >
                Save Authorization
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRIOR AUTHORIZATIONS LIST ─────────────────────────────────────────── */}
      {authListOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-5 animate-scale-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <FileCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Prior Authorizations
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {priorAuthorizations.length} authorization{priorAuthorizations.length === 1 ? "" : "s"} on file
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAuthListOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>

            {priorAuthorizations.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No prior authorizations recorded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {priorAuthorizations.map((pa) => {
                  const authClient = clients.find((c) => c.id === pa.clientId);
                  const authPayer = payerOptions.find((p) => p.id === pa.payerId);
                  const expired =
                    pa.status === "approved" &&
                    !!pa.validUntil &&
                    new Date(pa.validUntil) < new Date();
                  return (
                    <div
                      key={pa.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-gray-200 dark:border-gray-600 p-3.5 bg-gray-50 dark:bg-gray-750/60"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {authClient?.name || "Unknown client"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {authPayer?.name || "Unknown payer"} · {pa.serviceType}
                          {pa.authorizationNumber ? ` · Auth #${pa.authorizationNumber}` : ""}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          {pa.validUntil
                            ? `Valid until ${new Date(pa.validUntil).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                            : "No expiry set"}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-full w-fit shrink-0 ${
                          expired || pa.status === "denied"
                            ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                            : pa.status === "approved"
                              ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                              : pa.status === "pending"
                                ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                                : pa.status === "expired"
                                  ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {expired && pa.status === "approved"
                          ? "EXPIRED"
                          : pa.status.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setAuthListOpen(false)}
                className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAuthListOpen(false);
                  setPriorAuthModalOpen(true);
                }}
                className="px-5 py-2.5 text-xs font-bold bg-[#043570] hover:bg-[#032554] text-white rounded-xl shadow-md transition-all"
              >
                + Record New
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── REMITTANCE POSTING MODAL (Stage 6) ───────────────────────────────────── */}
      {remitModalOpen && targetBillForRemit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileCheck className="size-5 text-emerald-500" />
                Post Remittance / ERA
              </h3>
              <button
                onClick={() => setRemitModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs space-y-1">
              <p className="font-bold text-gray-900 dark:text-white">
                Claim {targetBillForRemit.claimId || targetBillForRemit.billNumber} —{" "}
                {targetBillForRemit.clientName}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Billed Amount: <strong>${targetBillForRemit.amount.toFixed(2)}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Allowed Amount ($)
                </label>
                <input
                  type="number"
                  value={remitAllowedAmount}
                  onChange={(e) => setRemitAllowedAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Paid Amount ($)
                </label>
                <input
                  type="number"
                  value={remitPaidAmount}
                  onChange={(e) => setRemitPaidAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Patient Resp ($)
                </label>
                <input
                  type="number"
                  value={remitPatientResp}
                  onChange={(e) => setRemitPatientResp(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                  Adjustment Reason
                </label>
                <input
                  type="text"
                  value={remitAdjustmentReason}
                  onChange={(e) => setRemitAdjustmentReason(e.target.value)}
                  placeholder="e.g. Contractual discount"
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="discrepancy-chk"
                checked={remitDiscrepancy}
                onChange={(e) => setRemitDiscrepancy(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="discrepancy-chk" className="text-xs font-semibold text-red-600 dark:text-red-400 cursor-pointer">
                Flag as Payment Discrepancy / Underpayment
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setRemitModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemit}
                className="px-5 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md"
              >
                Post & Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
