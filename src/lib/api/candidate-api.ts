// lib/api/candidate-api.ts
import request from "./request";
import { RequestConfig, ApiResponse } from "./fetcher";

export const candidateApi = {
  get<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse>(
      endpoint,
      { ...config, method: "GET" },
      "CANDIDATE",
    );
  },

  post<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    config?: Omit<RequestConfig<TBody>, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse, TBody>(
      endpoint,
      { ...config, method: "POST", body },
      "CANDIDATE",
    );
  },

  patch<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    config?: Omit<RequestConfig<TBody>, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse, TBody>(
      endpoint,
      { ...config, method: "PATCH", body },
      "CANDIDATE",
    );
  },

  delete<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse>(
      endpoint,
      { ...config, method: "DELETE" },
      "CANDIDATE",
    );
  },

  upload<TResponse>(
    endpoint: string,
    formData: FormData,
    config?: Omit<RequestConfig<FormData>, "method" | "body" | "isFormData">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse, FormData>(
      endpoint,
      {
        ...config,
        method: "POST",
        body: formData,
        isFormData: true,
      },
      "CANDIDATE",
    );
  },
};
