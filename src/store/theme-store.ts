import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { reduxStorage } from "../utils/storage";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        set({ theme: currentTheme === "light" ? "dark" : "light" });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => reduxStorage),
    }
  )
);
