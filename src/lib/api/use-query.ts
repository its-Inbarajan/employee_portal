// lib/api/use-query.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiError, ApiResponse } from "@/lib/api/fetcher";

// ── GET hook ──
export function useApiQuery<TResponse>(
  key: unknown[],
  endpoint: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<TResponse>, ApiError>,
    "queryKey" | "queryFn"
  > & {
    params?: Record<string, string | number | boolean | undefined | null>;
  },
) {
  const { params, ...queryOptions } = options ?? {};

  return useQuery<ApiResponse<TResponse>, ApiError>({
    queryKey: key,
    queryFn: () => api.get<TResponse>(endpoint, { params }),
    ...queryOptions,
  });
}

// ── MUTATION hook ──
export function useApiMutation<TResponse, TBody = unknown>(
  endpoint: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  options?: UseMutationOptions<ApiResponse<TResponse>, ApiError, TBody>,
) {
  return useMutation<ApiResponse<TResponse>, ApiError, TBody>({
    mutationFn: (body: TBody) => {
      if (method === "DELETE") return api.delete<TResponse>(endpoint);
      if (method === "PATCH")
        return api.patch<TResponse, TBody>(endpoint, body);
      if (method === "PUT") return api.put<TResponse, TBody>(endpoint, body);
      return api.post<TResponse, TBody>(endpoint, body);
    },
    ...options,
  });
}

// ── UPLOAD hook ──
export function useApiUpload<TResponse>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<TResponse>, ApiError, FormData>,
) {
  return useMutation<ApiResponse<TResponse>, ApiError, FormData>({
    mutationFn: (formData: FormData) =>
      api.upload<TResponse>(endpoint, formData),
    ...options,
  });
}
