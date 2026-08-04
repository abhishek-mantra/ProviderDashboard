import { useSyncExternalStore } from "react";

export interface PaymentModalTarget {
  clientId?: string;
  billIds?: string[];
}

let currentPaymentModal: PaymentModalTarget | null = null;
let modalOpen = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function openPaymentModal(target?: PaymentModalTarget) {
  currentPaymentModal = target || {};
  modalOpen = true;
  emit();
}

export function closePaymentModal() {
  currentPaymentModal = null;
  modalOpen = false;
  emit();
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const getSnapshot = () => (modalOpen ? currentPaymentModal || {} : null);
const getServerSnapshot = () => null;

export function usePaymentModalTarget(): PaymentModalTarget | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
