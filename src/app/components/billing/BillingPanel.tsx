import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Wallet,
  Receipt,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  Plus,
  ExternalLink,
  FileText,
  Send,
} from "lucide-react";
import { usePartnerDashboard } from "../../contexts/PartnerDashboardContext";
import { useClaims } from "../../contexts/ClaimContext";
import {
  getClientDue,
  getInsuranceDue,
  getTotalDue,
} from "../../types/partnerDashboard";
import { getCurrencySymbol } from "../../types/claims";
import {
  useBillingPanelTarget,
  closeBillingPanel,
} from "./billingPanelStore";
import { openPaymentModal } from "./paymentModalStore";

function statusPill(bill: {
  status: string;
  due: number;
  billType?: string;
  claimId?: string;
}): { label: string; cls: string } {
  if (bill.status === "draft")
    return {
      label: "Draft",
      cls: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    };
  if (bill.status === "written_off")
    return {
      label: "Written Off",
      cls: "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600",
    };
  if (bill.billType === "insurance" && bill.due > 0)
    return {
      label: "Claim Pending",
      cls: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 font-bold",
    };
  if (bill.due > 0)
    return {
      label: "Unpaid",
      cls: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    };
  return {
    label: "Paid",
    cls: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  };
}

function Collapsible({
  open,
  title,
  children,
}: {
  open: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => setIsOpen(open), [open]);
  return (
    <div className="border-b border-gray-100 dark:border-gray-700/60 last:border-b-0">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 text-left cursor-pointer"
      >
        <span className="text-sm font-bold text-gray-900 dark:text-white">{title}</span>
        <ChevronDown
          className={`size-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BillingPanel() {
  const target = useBillingPanelTarget();
  const navigate = useNavigate();
  const { clients, bills } = usePartnerDashboard();
  const { unbilledSessions, simulateClearinghouseSubmission } = useClaims();

  const [lastTarget, setLastTarget] = useState(target);
  useEffect(() => {
    if (target) setLastTarget(target);
  }, [target]);
  const effective = target ?? lastTarget;

  const client = useMemo(() => {
    if (!effective) return null;
    const id = effective.kind === "bill" ? effective.id : effective.id;
    const byBill = effective.kind === "bill"
      ? bills.find((b) => b.id === id || b.billNumber === id)?.clientId
      : id;
    return clients.find((c) => c.id === byBill) || null;
  }, [effective, clients, bills]);

  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBillingPanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target]);

  const clientBills = useMemo(
    () =>
      client
        ? bills
            .filter((b) => b.clientId === client.id)
            .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
        : [],
    [client, bills]
  );

  const [selectedBills, setSelectedBills] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!effective) return;
    const initialId = effective.id;
    const matchingBill = bills.find((b) => b.id === initialId || b.billNumber === initialId);
    if (matchingBill) {
      setSelectedBills({ [matchingBill.id]: true });
    } else if (clientBills.length > 0) {
      setSelectedBills({ [clientBills[0].id]: true });
    }
  }, [effective, bills, clientBills]);

  const toggleBillSelection = (id: string) => {
    setSelectedBills((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedBillIds = useMemo(
    () => Object.keys(selectedBills).filter((id) => selectedBills[id]),
    [selectedBills]
  );

  const selectedTotal = useMemo(() => {
    return clientBills
      .filter((b) => selectedBills[b.id])
      .reduce((sum, b) => sum + getTotalDue(b), 0);
  }, [clientBills, selectedBills]);

  const summary = useMemo(() => {
    const clientDueTotal = clientBills.reduce((s, b) => s + Math.max(0, getClientDue(b)), 0);
    const insuranceDueTotal = clientBills.reduce((s, b) => s + Math.max(0, getInsuranceDue(b)), 0);
    const totalOutstandingBalance = clientDueTotal + insuranceDueTotal;
    const unpaidBills = clientBills.filter((b) => getTotalDue(b) > 0);

    const unbilledFiltered = client
      ? unbilledSessions.filter((s) => s.clientId === client.id && s.notesStatus === "locked")
      : [];
    const uninvoiced = unbilledFiltered.reduce((sum, s) => sum + (s.amount || 0), 0);
    const unallocated = client?.unappliedPayment || 0;

    return {
      totalOutstandingBalance,
      clientDueTotal,
      insuranceDueTotal,
      clientBalance: clientDueTotal,
      insuranceBalance: insuranceDueTotal,
      unpaidCount: unpaidBills.length,
      uninvoiced,
      unbilledCount: unbilledFiltered.length,
      unallocated,
    };
  }, [clientBills, client, unbilledSessions]);

  const primaryInsurer = client?.insuranceCompany || null;
  const hasInsurance = Boolean(primaryInsurer);
  const goToBills = (path: string) => {
    closeBillingPanel();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {target && client && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeBillingPanel}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="fixed top-0 right-0 z-[60] h-full w-full lg:w-1/3 min-w-[360px] md:min-w-[440px] bg-white dark:bg-gray-800 shadow-2xl flex flex-col"
            role="dialog"
            aria-label={`Billing details for ${client.name}`}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 rounded-full bg-[#043570]/10 dark:bg-[#00c0ff]/10 flex items-center justify-center text-[#043570] dark:text-[#00c0ff] font-bold text-sm shrink-0">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{client.name}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Billing Overview</p>
                </div>
              </div>
              <button
                onClick={closeBillingPanel}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-5 bg-[#F8FAFC] dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700/60">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <Wallet className="size-3.5" /> Client Billing Summary
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Outstanding Balance</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">
                      ${summary.totalOutstandingBalance.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Unallocated:{" "}
                      <span className="font-bold text-gray-700 dark:text-gray-200">
                        ${summary.unallocated.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {/* Card 1: Client Due */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-bold">
                      Client Due
                    </p>
                    <p className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                      ${summary.clientDueTotal.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {summary.unpaidCount} unpaid bill{summary.unpaidCount === 1 ? "" : "s"}
                    </p>
                  </div>

                  {/* Card 2: Insurance Due */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-bold">
                      Insurance Due
                    </p>
                    <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      ${summary.insuranceDueTotal.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">pending claims</p>
                  </div>

                  {/* Card 3: Unbilled Sessions */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-bold">
                      Unbilled
                    </p>
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                      ${summary.uninvoiced.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {summary.unbilledCount} session{summary.unbilledCount === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: Add Payment & Superbill */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => {
                      openPaymentModal({
                        clientId: client.id,
                        billIds: selectedBillIds,
                      });
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#043570] hover:bg-[#032554] text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    <CreditCard className="size-3.5" />
                    Add Payment {selectedTotal > 0 ? `($${selectedTotal.toFixed(2)})` : ""}
                  </button>
                  <button
                    onClick={() => {
                      if (selectedBillIds.length > 0) {
                        goToBills(`/billing/bills/superbill?billIds=${selectedBillIds.join(",")}`);
                      } else if (clientBills.length > 0) {
                        goToBills(`/billing/bills/${clientBills[0].id}/superbill`);
                      } else {
                        goToBills(`/billing/bills/superbill`);
                      }
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                    title="Generate Superbill for client / selected invoices"
                  >
                    <FileText className="size-3.5" />
                    Superbill
                  </button>
                </div>
              </div>

              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" /> Insurance
                </p>
                {hasInsurance ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {primaryInsurer}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          Member ID · <span className="font-mono">{client?.memberId || "N/A"}</span>
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          Copay ${client?.copayAmount ?? "N/A"} · Coinsurance{" "}
                          {client?.coinsuranceRate != null ? `${client.coinsuranceRate}%` : "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">
                          Insurance balance
                        </p>
                        <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                          ${summary.insuranceBalance.toFixed(2)}
                        </p>
                      </div>
                    </div>


                    {clientBills.some((b) => b.billType === "insurance") && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                            <ShieldCheck className="size-3.5 text-blue-600 dark:text-blue-400" />
                            Claim Pending Submission
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-full">
                            Ready
                          </span>
                        </div>
                        <p className="text-[11px] text-blue-700 dark:text-blue-300">
                          Submit electronically via clearinghouse or generate a prefilled CMS-1500 form.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              const targetBill = clientBills.find((b) => b.billType === "insurance") || clientBills[0];
                              const claimId = targetBill?.claimId || "seed-ready-1";
                              simulateClearinghouseSubmission(claimId);
                              goToBills(`/claims/${claimId}`);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            <Send className="size-3" />
                            Submit Clearinghouse
                          </button>
                          <button
                            onClick={() => {
                              const targetBill = clientBills.find((b) => b.billType === "insurance") || clientBills[0];
                              const billId = targetBill?.id || "BILL-2026-001";
                              goToBills(`/billing/bills/${billId}/cms1500`);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white dark:bg-gray-800 text-[#043570] dark:text-[#00c0ff] border border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            <FileText className="size-3 text-blue-600 dark:text-blue-400" />
                            Submit Manually (CMS-1500)
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">No insurance on file</p>
                    <button
                      onClick={() => goToBills(`/billing?clientId=${client.id}`)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#043570] dark:text-[#00c0ff] hover:underline cursor-pointer"
                    >
                      <Plus className="size-3.5" /> Add New
                    </button>
                  </div>
                )}
              </div>

              <div className="px-5 py-3">
                <Collapsible
                  open
                  title={
                    <div className="flex items-center justify-between w-full pr-2">
                      <span>Invoices ({clientBills.length})</span>
                      {selectedBillIds.length > 0 && (
                        <span className="text-xs font-bold text-[#043570] dark:text-[#00c0ff]">
                          Selected ({selectedBillIds.length}): ${selectedTotal.toFixed(2)}
                        </span>
                      )}
                    </div>
                  }
                >
                  <div className="space-y-2 mt-1">
                    {clientBills.length === 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        No invoices on file yet.
                      </p>
                    )}
                    {clientBills.map((b) => {
                      const due = getTotalDue(b);
                      const pill = statusPill({ status: b.status, due });
                      const isChecked = !!selectedBills[b.id];
                      return (
                        <div
                          key={b.id}
                          onClick={() => toggleBillSelection(b.id)}
                          className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all cursor-pointer ${isChecked
                              ? "bg-blue-50/70 dark:bg-blue-950/30 border-[#043570]/40 dark:border-[#00c0ff]/40 shadow-xs"
                              : "bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleBillSelection(b.id);
                            }}
                            className="size-4 rounded text-[#043570] focus:ring-[#043570] border-gray-300 dark:border-gray-600 shrink-0 cursor-pointer"
                          />
                          <div className="min-w-0 flex-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                goToBills(`/billing/bills/${b.id}`);
                              }}
                              className="font-mono text-xs font-bold text-[#043570] dark:text-[#00c0ff] hover:underline"
                            >
                              {b.billNumber}
                            </button>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                              {b.cptCode || "Session"} ·{" "}
                              {b.billType === "insurance"
                                ? b.insurerName || "Insurance"
                                : "Self-pay"}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold whitespace-nowrap ${pill.cls}`}
                          >
                            {pill.label}
                          </span>
                          <div className="text-right shrink-0 min-w-[70px]">
                            <span className="font-mono text-xs font-bold text-gray-900 dark:text-white block">
                              {getCurrencySymbol(b.currency ?? "USD")}{b.amount.toFixed(2)}
                            </span>
                            {due > 0 && due < b.amount && (
                              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block font-mono">
                                Due: {getCurrencySymbol(b.currency ?? "USD")}{due.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Collapsible>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 shrink-0">
              <button
                onClick={() => goToBills(`/billing?clientId=${client.id}`)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-[#043570] dark:text-[#00c0ff] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer"
              >
                <ExternalLink className="size-3.5" /> Open {client.name}&apos;s bills
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
