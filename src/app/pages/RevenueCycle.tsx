import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Ban,
  CheckCircle2,
  CircleDollarSign,
  FileCheck,
  RotateCcw,
  Send,
  ShieldX,
  Timer,
  Wallet,
} from "lucide-react";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";
import { useClaims } from "../contexts/ClaimContext";
import { useGoBack } from "../utils/useGoBack";
import { MOCK_DENIAL_REASONS } from "../types/claims";

const REQUIRES_PRIOR_AUTH_CPTS = ["90791"];

export function RevenueCycle() {
  const navigate = useNavigate();
  const handleBack = useGoBack("/billing");
  const { bills, clients, providers, priorAuthorizations } = usePartnerDashboard();
  const { claims, updateClaimStatus } = useClaims();

  const [providerFilter, setProviderFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [noticedIds, setNoticedIds] = useState<string[]>([]);

  const filteredBills =
    providerFilter === "all" ? bills : bills.filter((b) => b.providerId === providerFilter);
  const filteredClaims =
    providerFilter === "all" ? claims : claims.filter((c) => c.providerId === providerFilter);

  const getClientName = (id: string) => clients.find((c) => c.id === id)?.name || "Unknown client";

  // ── Net Collection Rate ──
  const totalBilled = filteredBills.reduce((acc, b) => acc + b.amount, 0);
  const totalCollected = filteredBills
    .filter((b) => b.status === "paid_direct" || b.status === "paid_via_claim")
    .reduce((acc, b) => acc + b.amount, 0);
  const totalWrittenOff = filteredBills
    .filter((b) => b.status === "written_off")
    .reduce((acc, b) => acc + b.amount, 0);
  const totalOutstanding = filteredBills
    .filter((b) => b.status === "unresolved" || b.status === "claim_pending")
    .reduce((acc, b) => acc + b.amount, 0);

  const contractualAdjustments = filteredClaims.reduce((acc, c) => {
    if (c.payment && c.payment.billedAmount > 0) {
      return acc + Math.max(0, c.payment.billedAmount - c.payment.allowedAmount);
    }
    return acc;
  }, 0);

  const netCollectionRate = (() => {
    const denominator = totalBilled - contractualAdjustments;
    if (denominator <= 0) return 0;
    return Math.round((totalCollected / denominator) * 1000) / 10;
  })();

  const submittedClaims = filteredClaims.filter((c) => c.submittedDate != null);
  const resolvedBills = filteredBills.filter((b) => b.resolvedAt && b.dateOfService);

  const cleanClaimRate = (() => {
    if (submittedClaims.length === 0) return 0;
    const clean = submittedClaims.filter(
      (c) =>
        ["paid", "in_adjudication", "approved"].includes(c.status) &&
        !c.statusHistory.some((e) =>
          ["stedi_rejected", "payer_rejected", "rejected"].includes(e.status)
        )
    );
    return Math.round((clean.length / submittedClaims.length) * 1000) / 10;
  })();

  const denialRate = (() => {
    if (submittedClaims.length === 0) return 0;
    const denied = submittedClaims.filter((c) =>
      c.statusHistory.some((e) =>
        ["denied", "payer_rejected", "stedi_rejected", "rejected"].includes(e.status)
      )
    );
    return Math.round((denied.length / submittedClaims.length) * 1000) / 10;
  })();

  const avgDaysInAr = (() => {
    if (resolvedBills.length === 0) return 0;
    const totalDays = resolvedBills.reduce((sum, b) => {
      const res = new Date(b.resolvedAt!).getTime();
      const dos = new Date(b.dateOfService).getTime();
      return sum + Math.max(0, Math.round((res - dos) / 86400000));
    }, 0);
    return Math.round((totalDays / resolvedBills.length) * 10) / 10;
  })();

  // ── Payer performance cut ──
  const payerPerformance = useMemo(() => {
    const byPayer = new Map<
      string,
      { name: string; volume: number; denied: number; daysToPay: number[] }
    >();
    for (const c of filteredClaims) {
      const name = c.payerName || "Self-Pay";
      const e = byPayer.get(name) || { name, volume: 0, denied: 0, daysToPay: [] as number[] };
      e.volume++;
      if (["denied", "rejected", "stedi_rejected", "payer_rejected"].includes(c.status)) {
        e.denied++;
      }
      if (c.payment && c.payment.paidAmount > 0) {
        if (c.submittedDate && c.payment.remittanceDate) {
          const days = Math.max(
            1,
            Math.round(
              (new Date(c.payment.remittanceDate).getTime() -
                new Date(c.submittedDate).getTime()) /
                86400000
            )
          );
          e.daysToPay.push(days);
        }
      }
      byPayer.set(name, e);
    }
    return Array.from(byPayer.values())
      .map((e) => ({
        ...e,
        denyRate: e.volume ? Math.round((e.denied / e.volume) * 1000) / 10 : 0,
        avgDaysToPay: e.daysToPay.length
          ? Math.round((e.daysToPay.reduce((a, b) => a + b, 0) / e.daysToPay.length) * 10) / 10
          : null,
      }))
      .sort((a, b) => b.volume - a.volume);
  }, [filteredClaims]);

  // ── Denial Management ──
  const hasApprovedAuth = (clientId: string, cptCode: string, dateOfService: string) =>
    priorAuthorizations.some(
      (a) =>
        a.clientId === clientId &&
        a.serviceType.includes(cptCode) &&
        a.status === "approved" &&
        (!a.validUntil || new Date(a.validUntil) >= new Date(dateOfService))
    );

  const deniedItems = useMemo(() => {
    const list: { claim: (typeof filteredClaims)[number]; reason: string }[] = [];
    for (const c of filteredClaims) {
      const isDenied =
        c.status === "denied" ||
        c.statusHistory.some((e) =>
          ["denied", "payer_rejected", "stedi_rejected", "rejected"].includes(e.status)
        );
      if (!isDenied) continue;
      const reason =
        c.serviceLines.some((sl) => REQUIRES_PRIOR_AUTH_CPTS.includes(sl.serviceCode)) &&
        !hasApprovedAuth(
          c.clientId,
          c.serviceLines[0]?.serviceCode || "",
          c.serviceLines[0]?.dateOfService || ""
        )
          ? "Missing prior authorization"
          : MOCK_DENIAL_REASONS[c.id.length % MOCK_DENIAL_REASONS.length];
      list.push({ claim: c, reason });
    }
    return list;
  }, [filteredClaims]);

  const missingAuthBills = useMemo(
    () =>
      filteredBills.filter(
        (b) =>
          b.payerId &&
          REQUIRES_PRIOR_AUTH_CPTS.includes(b.cptCode) &&
          !hasApprovedAuth(b.clientId, b.cptCode, b.dateOfService)
      ),
    [filteredBills]
  );

  const overdueBills = useMemo(
    () =>
      filteredBills
        .filter(
          (b) =>
            (b.status === "unresolved" || b.status === "claim_pending") &&
            new Date(b.dateOfService) > new Date("2020-01-01")
        )
        .map((b) => ({
          bill: b,
          days: Math.max(0, Math.round((Date.now() - new Date(b.dateOfService).getTime()) / 86400000)),
        }))
        .filter((x) => x.days > 45)
        .sort((a, b) => b.days - a.days),
    [filteredBills]
  );

  const denialQueueCount = deniedItems.length + missingAuthBills.length + overdueBills.length;

  const handleReopen = (claimId: string) => {
    updateClaimStatus(
      claimId,
      "draft",
      "[MOCK] Returning denied claim to draft for correction and resubmission."
    );
    setToastMessage("Claim opened for correction — resubmit from the claim record.");
    navigate(`/claims/${claimId}`);
  };

  const markNoticed = (key: string) =>
    setNoticedIds((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700 dark:border-gray-200 animate-slide-up">
          <CheckCircle2 className="size-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 pb-2">
        <div className="flex items-start gap-3">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Cycle</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              How collection health looks across payers — and what's blocking it.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
          >
            <option value="all">All Providers</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <Link
            to="/billing"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-semibold transition-colors"
          >
            <Send className="size-3.5" />
            Billing Hub
          </Link>
        </div>
      </div>

      {/* Net Collection Rate hero + KPI cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div
          className="rounded-3xl p-6 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
        >
          <div className="flex items-center gap-2 text-white/80">
            <CircleDollarSign className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Net Collection Rate
            </span>
          </div>
          <p className="text-4xl font-black mt-3">{netCollectionRate.toFixed(1)}%</p>
          <p className="text-xs text-white/70 mt-1">
            of collectible $ collected · {submittedClaims.length} claims in scope
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <FileCheck className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Clean Claim Rate</p>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
            {cleanClaimRate.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
              <ShieldX className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Denial Rate</p>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
            {denialRate.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
              <Timer className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Avg Days in AR</p>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-3">
            {avgDaysInAr.toFixed(1)}
          </p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">days billed → resolved</p>
        </div>
      </div>

      {/* Secondary financial strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Wallet className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Billed</p>
          </div>
          <p className="text-xl font-extrabold text-gray-900 dark:text-white mt-2">
            ${totalBilled.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <RotateCcw className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Collected</p>
          </div>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            ${totalCollected.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
              <AlertTriangle className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Outstanding</p>
          </div>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            ${totalOutstanding.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              <Ban className="size-4" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Written Off</p>
          </div>
          <p className="text-xl font-extrabold text-gray-900 dark:text-white mt-2">
            ${totalWrittenOff.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Denial Management */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                <ShieldX className="size-4.5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                  Denial Management
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Denied claims, missing authorizations &amp; overdue AR
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800">
              <ShieldX className="size-3.5" />
              {denialQueueCount}
            </span>
          </div>

          {denialQueueCount === 0 ? (
            <div className="px-6 py-10 text-center">
              <CheckCircle2 className="size-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
                Nothing in the queue
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                No denied claims, missing authorizations, or overdue accounts right now.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700/60 max-h-[460px] overflow-y-auto">
              {deniedItems.map(({ claim, reason }) => (
                <li key={claim.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-[10px] font-bold border border-rose-200 dark:border-rose-800">
                          Denied
                        </span>
                        <Link
                          to={`/claims/${claim.id}`}
                          className="text-sm font-bold text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] truncate"
                        >
                          {claim.claimNumber}
                        </Link>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {getClientName(claim.clientId)} · {claim.payerName || "Self-Pay"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        Reason: <span className="font-semibold">{reason}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleReopen(claim.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg text-[11px] font-bold transition-colors"
                      >
                        <RotateCcw className="size-3" />
                        Reopen
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              {missingAuthBills.map((b) => {
                const key = `auth-${b.id}`;
                const done = noticedIds.includes(key);
                return (
                  <li key={key} className="px-5 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[10px] font-bold border border-amber-200 dark:border-amber-800">
                            Missing prior auth
                          </span>
                          <Link
                            to={`/billing/bills/${b.id}`}
                            className="text-sm font-bold text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] truncate"
                          >
                            {b.billNumber}
                          </Link>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {getClientName(b.clientId)} · {b.cptCode} · {b.payerName}
                        </p>
                      </div>
                      <button
                        onClick={() => markNoticed(key)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                          done
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-white border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {done ? <CheckCircle2 className="size-3.5" /> : "Mark Reviewed"}
                      </button>
                    </div>
                  </li>
                );
              })}

              {overdueBills.map(({ bill, days }) => {
                const key = `ovd-${bill.id}`;
                const done = noticedIds.includes(key);
                return (
                  <li key={key} className="px-5 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              days > 90
                                ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                                : "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                            }`}
                          >
                            {days}d overdue
                          </span>
                          <Link
                            to={`/billing/bills/${bill.id}`}
                            className="text-sm font-bold text-gray-900 dark:text-white hover:text-[#043570] dark:hover:text-[#00c0ff] truncate"
                          >
                            {bill.billNumber}
                          </Link>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {getClientName(bill.clientId)} · ${bill.amount.toFixed(2)} outstanding
                        </p>
                      </div>
                      <button
                        onClick={() => markNoticed(key)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                          done
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-white border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {done ? <CheckCircle2 className="size-3.5" /> : "Mark Reviewed"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Payer performance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <Activity className="size-4.5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Payer Performance</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Volume, denial rate &amp; speed to payment
                </p>
              </div>
            </div>
          </div>
          {payerPerformance.length === 0 ? (
            <div className="px-6 py-10 text-center text-xs text-gray-400">
              No payer data yet — submit a claim to see performance.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-left">
                  <th className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Payer
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                    Volume
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                    Denial %
                  </th>
                  <th className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                    Avg Days to Pay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {payerPerformance.map((p) => (
                  <tr
                    key={p.name}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-750/40 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span className="font-semibold text-gray-900 dark:text-white">{p.name}</span>
                    </td>
                    <td className="px-3 py-3 text-right text-gray-900 dark:text-white font-mono">
                      {p.volume}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span
                        className={`font-mono font-bold ${
                          p.denyRate > 20
                            ? "text-rose-600 dark:text-rose-400"
                            : p.denyRate > 0
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {p.denyRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-gray-900 dark:text-white font-mono">
                      {p.avgDaysToPay === null ? "—" : `${p.avgDaysToPay}d`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
