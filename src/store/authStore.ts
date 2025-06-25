import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { reduxStorage } from "../utils/storage";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  loginStart: () => void;
  loginSuccess: (user: User, token: string) => void;
  loginFailure: () => void;
  logout: () => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
      loginStart: () => set({ isLoading: true }),
      loginSuccess: (user: User, token: string) =>
        set({
          isLoading: false,
          isAuthenticated: true,
          user,
          token,
        }),
      loginFailure: () =>
        set({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          token: null,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
        }),
      setUser: (user: User) => set({ user }),
      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          isLoading: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => reduxStorage),
    }
  )
);
