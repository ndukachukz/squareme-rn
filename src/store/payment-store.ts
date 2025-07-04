import { create } from "zustand";
import { PaymentAction, TransactionType } from "@/types/transactions.types";

interface PaymentState {
  paymentAction: PaymentAction | null;
  selectedTransactionType: TransactionType | null;
  amount: number;

  setPaymentAction: (action: PaymentAction) => void;
  setSelectedTransactionType: (type: TransactionType) => void;
  setAmount: (amount: number) => void;
  resetPaymentState: () => void;
  updatePaymentData: (data: Partial<PaymentState>) => void;
}

export const usePaymentStore = create<PaymentState>()((set, get) => ({
  paymentAction: null,
  selectedTransactionType: null,
  amount: 0,
  setPaymentAction: (action: PaymentAction) => set({ paymentAction: action }),
  setSelectedTransactionType: (type: TransactionType) =>
    set({ selectedTransactionType: type }),
  setAmount: (amount: number) => set({ amount }),
  resetPaymentState: () =>
    set({
      paymentAction: null,
      selectedTransactionType: null,
      amount: 0,
    }),
  updatePaymentData: (data: Partial<PaymentState>) => {
    const currentState = get();
    set({ ...currentState, ...data });
  },
}));
