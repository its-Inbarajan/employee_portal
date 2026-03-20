// lib/api/index.ts
import request from "./request";
import { RequestConfig, ApiResponse } from "./fetcher";

// ─────────────────────────────────────────
// HTTP METHOD HELPERS
// ─────────────────────────────────────────
export const api = {
  get<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse>(endpoint, { ...config, method: "GET" });
  },

  post<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    config?: Omit<RequestConfig<TBody>, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse, TBody>(endpoint, {
      ...config,
      method: "POST",
      body,
    });
  },

  put<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    config?: Omit<RequestConfig<TBody>, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse, TBody>(endpoint, {
      ...config,
      method: "PUT",
      body,
    });
  },

  patch<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    config?: Omit<RequestConfig<TBody>, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse, TBody>(endpoint, {
      ...config,
      method: "PATCH",
      body,
    });
  },

  delete<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse>(endpoint, { ...config, method: "DELETE" });
  },

  // ── Multipart upload ──
  upload<TResponse>(
    endpoint: string,
    formData: FormData,
    config?: Omit<RequestConfig<FormData>, "method" | "body" | "isFormData">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse, FormData>(endpoint, {
      ...config,
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },
};
