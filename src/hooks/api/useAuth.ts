import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../../api/client";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  ApiResponse,
} from "../../api/types";
import { queryKeys } from "../../config/react-query";

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      ApiClient.post<AuthResponse>("/auth/login", credentials),
    onSuccess: (data) => {
      // Cache user data
      queryClient.setQueryData(queryKeys.profile(), data.data.user);
      // Invalidate auth-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

// Register mutation
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      ApiClient.post<AuthResponse>("/auth/register", credentials),
    onSuccess: (data) => {
      // Cache user data
      queryClient.setQueryData(queryKeys.profile(), data.data.user);
      // Invalidate auth-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ApiClient.post("/auth/logout"),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Even if logout fails, clear local cache
      queryClient.clear();
    },
  });
}

// Get current user profile
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile(),
    queryFn: () => ApiClient.get<User>("/auth/profile"),
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Only run this query if user is likely authenticated
    enabled: true,
  });
}

// Refresh token mutation
export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ApiClient.post<AuthResponse>("/auth/refresh"),
    onSuccess: (data) => {
      // Update user data
      queryClient.setQueryData(queryKeys.profile(), data.data.user);
    },
    onError: (error) => {
      console.error("Token refresh failed:", error);
      // Clear auth data on refresh failure
      queryClient.removeQueries({ queryKey: queryKeys.auth() });
    },
  });
}

// Change password mutation
export function useChangePassword() {
  return useMutation({
    mutationFn: (passwords: { currentPassword: string; newPassword: string }) =>
      ApiClient.put<ApiResponse<null>>("/auth/change-password", passwords),
    onSuccess: () => {
      console.log("Password changed successfully");
    },
    onError: (error) => {
      console.error("Password change failed:", error);
    },
  });
}

// Forgot password mutation
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) =>
      ApiClient.post<ApiResponse<null>>("/auth/forgot-password", { email }),
    onSuccess: () => {
      console.log("Password reset email sent");
    },
    onError: (error) => {
      console.error("Forgot password failed:", error);
    },
  });
}

// Reset password mutation
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      ApiClient.post<ApiResponse<null>>("/auth/reset-password", data),
    onSuccess: () => {
      console.log("Password reset successfully");
    },
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });
}
