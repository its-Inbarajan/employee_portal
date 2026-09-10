// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import { ApiResponse, RequestConfig } from "./fetcher";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// // BUILD QUERY STRING

// function buildUrl(
//   endPoint: string,
//   params?: Record<string, string | number | boolean | undefined | null>,
// ): string {
//   const url = new URL(
//     endPoint.startsWith("http") ? endPoint : `${BASE_URL}${endPoint}`,
//   );

//   if (params) {
//     Object.entries(params).forEach(([keyof, value]) => {
//       if (value !== undefined && value !== null && value !== "") {
//         url.searchParams.set(keyof, String(value));
//       }
//     });
//   }

//   return url.toString();
// }

// // GET ACCESS TOKEN
// // Works both client-side and server-side

// async function getAccessToken(isServer = false): Promise<string | null> {
//   if (isServer) {
//     const server = await getServerSession(authOptions);
//     return server?.user.accessToken ?? null;
//   }

//   const session = await getSession();
//   return session?.user.accessToken ?? null;
// }

// // CORE REQUEST

// async function request<TResponse, TBody = unknown>(
//   endpoint: string,
//   config: RequestConfig<TBody>,
// ): Promise<ApiResponse<TResponse>> {
//   const {
//     method = "GET",
//     body,
//     params,
//     headers = {},
//     cache,
//     tags,
//     isServer = false,
//     isFormData = false,
//   } = config;

//   // build url
//   const url = buildUrl(endpoint, params);

//   const accessToken = await getAccessToken(isServer);

//   // build header
//   const baseHeaders: Record<string, string> = {
//     "x-client-type": "CANDIDATE_APP",
//     ...headers,
//   };

//   // Don't set Content-Type for FormData — browser sets it with boundary
//   if (!isFormData) {
//     baseHeaders["Content-Type"] = "application/json";
//   }

//   if (accessToken) {
//     baseHeaders["Authorization"] = `Bearer ${accessToken}`;
//   }

//   //   build init
//   const init: RequestInit = {
//     method,
//     headers: baseHeaders,
//     credentials: "include",
//     ...(cache && { cache }),
//     ...(tags && { next: { tags } }),
//   };

//   if (body !== undefined) {
//     init.body = isFormData ? (body as FormData) : JSON.stringify(body);
//   }

//   const res = await fetch(url, init);

//   const text = await res.text();
//   const json = text ? JSON?.parse(text) : {};

//   if (accessToken) {
//     baseHeaders["Authorization"] = `Bearer ${accessToken}`;
//   }

//   return {
//     data: json?.data?.responses ?? json ?? null,
//     message: json?.message ?? "Success",
//     success: json?.success ?? true,
//     statusCode: res.status,
//   };
// }
// export default request;

// lib/api/request.ts
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { candidateAuthOptions } from "@/lib/auth/candidate.auth";
import { recruiterAuthOptions } from "@/lib/auth/recruiter.auth";
import { ApiError, ApiResponse, RequestConfig } from "./fetcher";

type Portal = "CANDIDATE" | "RECRUITER";

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "";
  }
  return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
}

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  const base = getBaseUrl();

  if (!base && !endpoint.startsWith("http")) {
    throw new Error(
      `[API] NEXT_PUBLIC_API_URL is not defined. Endpoint: ${endpoint}`,
    );
  }

  const fullUrl = endpoint.startsWith("http")
    ? endpoint
    : `${base}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const url = new URL(fullUrl);

  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.set(key, String(val));
      }
    });
  }

  return url.toString();
}

// Get token based on which portal is calling
async function getAccessToken(
  isServer: boolean,
  portal: Portal,
): Promise<string | null> {
  if (isServer) {
    const authOptions =
      portal === "CANDIDATE" ? candidateAuthOptions : recruiterAuthOptions;
    const session = await getServerSession(authOptions);
    return session?.user?.accessToken ?? null;
  }

  // Client side — getSession reads from whichever
  // SessionProvider is wrapping the component
  const session = await getSession();
  return session?.user?.accessToken ?? null;
}

async function request<TResponse, TBody = unknown>(
  endpoint: string,
  config: RequestConfig<TBody> = {},
  portal: Portal = "CANDIDATE", // new param with default
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

  const url = buildUrl(endpoint, params);
  const accessToken = await getAccessToken(isServer, portal);

  const baseHeaders: Record<string, string> = {
    // x-client-type set based on portal
    "x-client-type": portal === "CANDIDATE" ? "CANDIDATE_APP" : "RECRUITER_APP",
    ...headers,
  };

  if (!isFormData) {
    baseHeaders["Content-Type"] = "application/json";
  }

  if (accessToken) {
    baseHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

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
  const json = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new ApiError(json?.message ?? "Request failed", res.status, json);
  }

  return {
    data: json?.data ?? json ?? null,
    message: json?.message ?? "Success",
    success: json?.success ?? true,
    statusCode: res.status,
  };
}

export default request;
