import { QueryClient, DefaultOptions } from "@tanstack/react-query";

// Default options for React Query
const queryConfig: DefaultOptions = {
  queries: {
    // Time in milliseconds before a query is considered stale
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Time in milliseconds before inactive queries are garbage collected
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    // Retry configuration
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors except 401 (unauthorized)
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return error?.response?.status === 401 && failureCount < 1;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    // Retry delay configuration
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Refetch configuration
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
  mutations: {
    // Retry configuration for mutations
    retry: (failureCount, error: any) => {
      // Don't retry mutations on client errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      // Retry up to 2 times for server errors
      return failureCount < 2;
    },
    // Retry delay for mutations
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  },
};

// Create and configure the QueryClient
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

// Query keys factory for better organization
export const queryKeys = {
  all: ["api"] as const,
  // Auth related queries
  auth: () => [...queryKeys.all, "auth"] as const,
  profile: () => [...queryKeys.auth(), "profile"] as const,

  // User related queries
  users: () => [...queryKeys.all, "users"] as const,
  user: (id: string) => [...queryKeys.users(), id] as const,

  // Add more query keys as needed
  // posts: () => [...queryKeys.all, 'posts'] as const,
  // post: (id: string) => [...queryKeys.posts(), id] as const,
} as const;

// Common query options
export const commonQueryOptions = {
  // For data that changes frequently
  realTime: {
    staleTime: 0,
    gcTime: 1000 * 60 * 2, // 2 minutes
  },
  // For data that rarely changes
  longTerm: {
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  },
  // For background refetch
  background: {
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  },
} as const;

export default queryClient;
