import { AxiosResponse } from "axios";
import { apiClient } from "../config/axios";
import { ApiResponse, PaginatedResponse, QueryParams } from "./types";

// Generic API client class
export class ApiClient {
  /**
   * GET request
   */
  static async get<T>(
    endpoint: string,
    params?: QueryParams
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(
        endpoint,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET request for paginated data
   */
  static async getPaginated<T>(
    endpoint: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<T>> {
    try {
      const response: AxiosResponse<PaginatedResponse<T>> = await apiClient.get(
        endpoint,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST request
   */
  static async post<T, D = any>(
    endpoint: string,
    data?: D
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(
        endpoint,
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT request
   */
  static async put<T, D = any>(
    endpoint: string,
    data?: D
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(
        endpoint,
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH request
   */
  static async patch<T, D = any>(
    endpoint: string,
    data?: D
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(
        endpoint,
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(
        endpoint
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * File upload
   */
  static async uploadFile<T>(
    endpoint: string,
    file: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(
        endpoint,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress,
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Error handler
   */
  private static handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || "An error occurred";
      const customError = new Error(errorMessage);
      (customError as any).status = error.response.status;
      (customError as any).data = error.response.data;
      return customError;
    } else if (error.request) {
      // Network error
      return new Error("Network error - please check your connection");
    } else {
      // Something else happened
      return new Error(error.message || "An unexpected error occurred");
    }
  }
}

// Export convenience functions
export const {
  get,
  getPaginated,
  post,
  put,
  patch,
  delete: deleteRequest,
  uploadFile,
} = ApiClient;

// Export default
export default ApiClient;
