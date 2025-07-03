import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { EXPO_PUBLIC_API_URL, isDev } from "./env";

// Define base configuration
const BASE_URL = EXPO_PUBLIC_API_URL;
const TIMEOUT = 10000;

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (isDev) {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    if (isDev) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (isDev) {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    if (isDev) {
      console.error("❌ Response Error:", error);
    }

    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      handleUnauthorized();
    } else if (error.response?.status === 403) {
      // Handle forbidden access
      handleForbidden();
    } else if (error.response?.status >= 500) {
      // Handle server errors
      handleServerError();
    }

    return Promise.reject(error);
  }
);

// Helper functions
function getAuthToken(): string | null {
  // Implement your token retrieval logic here
  // This could be from AsyncStorage, MMKV, or your auth store
  return null;
}

function handleUnauthorized() {
  // Implement logout logic or redirect to login
  console.log("User unauthorized - redirecting to login");
}

function handleForbidden() {
  // Handle forbidden access
  console.log("Access forbidden");
}

function handleServerError() {
  // Handle server errors
  console.log("Server error occurred");
}

// Export default instance
export default apiClient;
