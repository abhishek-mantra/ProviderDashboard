import { useSyncExternalStore, useCallback } from "react";

/**
 * Lightweight module-scoped store for the reusable billing panel.
 * Because it lives outside React, any page can open the panel without
 * an explicit prop-drilled provider — Layout mounts the single <BillingPanel />.
 */

export type BillingPanelTarget =
  | { kind: "bill"; id: string }
  | { kind: "client"; id: string };

let current: BillingPanelTarget | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function openBillingPanel(target: BillingPanelTarget) {
  current = target;
  emit();
}

export function closeBillingPanel() {
  current = null;
  emit();
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const getSnapshot = () => current;
const getServerSnapshot = () => null;

export function useBillingPanelTarget(): BillingPanelTarget | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useBillingPanel() {
  const openBill = useCallback((billId: string) => {
    openBillingPanel({ kind: "bill", id: billId });
  }, []);
  const openClient = useCallback((clientId: string) => {
    openBillingPanel({ kind: "client", id: clientId });
  }, []);
  const close = useCallback(() => closeBillingPanel(), []);
  return { openBill, openClient, close };
}