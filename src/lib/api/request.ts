import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { ApiResponse, RequestConfig } from "./fetcher";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// BUILD QUERY STRING

function buildUrl(
  endPoint: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  const url = new URL(
    endPoint.startsWith("http") ? endPoint : `${BASE_URL}${endPoint}`,
  );

  if (params) {
    Object.entries(params).forEach(([keyof, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(keyof, String(value));
      }
    });
  }

  return url.toString();
}

// GET ACCESS TOKEN
// Works both client-side and server-side

async function getAccessToken(isServer = false): Promise<string | null> {
  if (isServer) {
    const server = await getServerSession(authOptions);
    return server?.user.accessToken ?? null;
  }

  const session = await getSession();
  return session?.user.accessToken ?? null;
}

// CORE REQUEST

async function request<TResponse, TBody = unknown>(
  endpoint: string,
  config: RequestConfig<TBody>,
): Promise<ApiResponse<TResponse>> {
  const {
    method = "GET",
    body,
    params,
    headers = {},
    cache,
    tags,
    isServer = false,
    isFormData = false,
  } = config;

  // build url
  const url = buildUrl(endpoint, params);

  const accessToken = await getAccessToken(isServer);

  // build header
  const baseHeaders: Record<string, string> = {
    "x-client-type": "CANDIDATE_APP",
    ...headers,
  };

  // Don't set Content-Type for FormData — browser sets it with boundary
  if (!isFormData) {
    baseHeaders["Content-Type"] = "application/json";
  }

  if (accessToken) {
    baseHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  //   build init
  const init: RequestInit = {
    method,
    headers: baseHeaders,
    credentials: "include",
    ...(cache && { cache }),
    ...(tags && { next: { tags } }),
  };

  if (body !== undefined) {
    init.body = isFormData ? (body as FormData) : JSON.stringify(body);
  }

  const res = await fetch(url, init);

  const text = await res.text();
  const json = text ? JSON?.parse(text) : {};

  if (accessToken) {
    baseHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  return {
    data: json?.data?.responses ?? json ?? null,
    message: json?.message ?? "Success",
    success: json?.success ?? true,
    statusCode: res.status,
  };
}
export default request;
