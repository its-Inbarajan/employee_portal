// lib/api/recruiter-api.ts
import request from "./request";
import { RequestConfig, ApiResponse } from "./fetcher";

export const recruiterApi = {
  get<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse>(
      endpoint,
      { ...config, method: "GET" },
      "RECRUITER",
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
      "RECRUITER",
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
      "RECRUITER",
    );
  },

  delete<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">,
  ): Promise<ApiResponse<TResponse>> {
    return request<TResponse>(
      endpoint,
      { ...config, method: "DELETE" },
      "RECRUITER",
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
      "RECRUITER",
    );
  },
};
