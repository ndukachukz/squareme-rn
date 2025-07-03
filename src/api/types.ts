// Base API response structure
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

// Paginated response structure
export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  message?: string;
  success: boolean;
  status: number;
}

// Error response structure
export interface ApiError {
  message: string;
  error?: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  details?: Record<string, any>;
}

// Common query parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: any;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Example entity types (customize based on your needs)
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

// File upload types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

// Generic CRUD operations
export interface CrudOperations<T, CreateT = Partial<T>, UpdateT = Partial<T>> {
  getAll: (params?: QueryParams) => Promise<PaginatedResponse<T>>;
  getById: (id: string) => Promise<ApiResponse<T>>;
  create: (data: CreateT) => Promise<ApiResponse<T>>;
  update: (id: string, data: UpdateT) => Promise<ApiResponse<T>>;
  delete: (id: string) => Promise<ApiResponse<null>>;
}
