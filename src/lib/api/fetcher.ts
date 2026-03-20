// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  params?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  tags?: string[]; // Next.js revalidation tags
  isServer?: boolean; // true when called from server component / route handler
  isFormData?: boolean; // true for multipart uploads
}

export interface ApiResponse<T> {
  data: T | null;
  message: string;
  success: boolean;
  statusCode: number;
}

export class ApiError extends Error {
  statusCode: number;
  data: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}
