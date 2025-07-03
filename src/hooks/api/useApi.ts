import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { ApiClient } from "../../api/client";
import { ApiResponse, PaginatedResponse, QueryParams } from "../../api/types";
import { queryKeys } from "../../config/react-query";

// Generic GET hook
export function useApiGet<T>(
  endpoint: string,
  params?: QueryParams,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, "queryKey" | "queryFn">
): UseQueryResult<ApiResponse<T>, Error> {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: () => ApiClient.get<T>(endpoint, params),
    ...options,
  });
}

// Generic paginated GET hook
export function useApiGetPaginated<T>(
  endpoint: string,
  params?: QueryParams,
  options?: Omit<UseQueryOptions<PaginatedResponse<T>>, "queryKey" | "queryFn">
): UseQueryResult<PaginatedResponse<T>, Error> {
  return useQuery({
    queryKey: [endpoint, "paginated", params],
    queryFn: () => ApiClient.getPaginated<T>(endpoint, params),
    ...options,
  });
}

// Generic POST mutation hook
export function useApiPost<T, D = any>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, D>, "mutationFn">
): UseMutationResult<ApiResponse<T>, Error, D> {
  return useMutation({
    mutationFn: (data: D) => ApiClient.post<T, D>(endpoint, data),
    ...options,
  });
}

// Generic PUT mutation hook
export function useApiPut<T, D = any>(
  options?: Omit<
    UseMutationOptions<ApiResponse<T>, Error, { endpoint: string; data: D }>,
    "mutationFn"
  >
): UseMutationResult<ApiResponse<T>, Error, { endpoint: string; data: D }> {
  return useMutation({
    mutationFn: ({ endpoint, data }) => ApiClient.put<T, D>(endpoint, data),
    ...options,
  });
}

// Generic PATCH mutation hook
export function useApiPatch<T, D = any>(
  options?: Omit<
    UseMutationOptions<ApiResponse<T>, Error, { endpoint: string; data: D }>,
    "mutationFn"
  >
): UseMutationResult<ApiResponse<T>, Error, { endpoint: string; data: D }> {
  return useMutation({
    mutationFn: ({ endpoint, data }) => ApiClient.patch<T, D>(endpoint, data),
    ...options,
  });
}

// Generic DELETE mutation hook
export function useApiDelete<T>(
  options?: Omit<
    UseMutationOptions<ApiResponse<T>, Error, string>,
    "mutationFn"
  >
): UseMutationResult<ApiResponse<T>, Error, string> {
  return useMutation({
    mutationFn: (endpoint: string) => ApiClient.delete<T>(endpoint),
    ...options,
  });
}

// File upload hook
export function useFileUpload<T>(
  endpoint: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<T>, Error, FormData>,
    "mutationFn"
  >
): UseMutationResult<ApiResponse<T>, Error, FormData> {
  return useMutation({
    mutationFn: (file: FormData) => ApiClient.uploadFile<T>(endpoint, file),
    ...options,
  });
}

// Hook for invalidating queries
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  const invalidateByKey = (key: string | string[]) => {
    queryClient.invalidateQueries({
      queryKey: typeof key === "string" ? [key] : key,
    });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.all });
  };

  const invalidateAuth = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
  };

  const invalidateUsers = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.users() });
  };

  return {
    invalidateByKey,
    invalidateAll,
    invalidateAuth,
    invalidateUsers,
  };
}

// Hook for optimistic updates
export function useOptimisticUpdate() {
  const queryClient = useQueryClient();

  const updateData = <T>(queryKey: string[], updater: (old: T) => T) => {
    queryClient.setQueryData(queryKey, updater);
  };

  const rollbackData = <T>(queryKey: string[], previousData: T) => {
    queryClient.setQueryData(queryKey, previousData);
  };

  return {
    updateData,
    rollbackData,
  };
}
