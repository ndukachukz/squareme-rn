import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { reduxStorage } from "../utils/storage";

interface AmountVisibilityState {
  isAmountVisible: boolean;
  toggleAmountVisibility: () => void;
  setAmountVisibility: (visible: boolean) => void;
}

export const useAmountVisibilityStore = create<AmountVisibilityState>()(
  persist(
    (set, get) => ({
      isAmountVisible: false,
      toggleAmountVisibility: () => {
        const currentVisibility = get().isAmountVisible;
        set({ isAmountVisible: !currentVisibility });
      },
      setAmountVisibility: (visible: boolean) =>
        set({ isAmountVisible: visible }),
    }),
    {
      name: "amount-visibility-storage",
      storage: createJSONStorage(() => reduxStorage),
    }
  )
);
