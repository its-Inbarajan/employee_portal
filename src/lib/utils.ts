import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCookieValue(rawCookies: string, name: string): string {
  const match = rawCookies
    .split(/,(?=[^;]+=)/)
    .find((c) => c.trim().startsWith(`${name}=`));
  if (!match) return "";
  return match.split(";")[0].replace(`${name}=`, "").trim();
}

export async function refreshAccessToken(
  token: import("next-auth/jwt").JWT,
  clientType: "CANDIDATE_APP" | "RECRUITER_APP",
): Promise<import("next-auth/jwt").JWT> {
  try {
    const res = await fetch(`${process.env.API_URL}/users/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-type": clientType,
        Cookie: `refreshToken=${token.refreshToken}`,
      },
    });

    if (!res.ok) throw new Error("Refresh failed");

    const rawCookies = res.headers.get("set-cookie") ?? "";
    const newAccessToken = extractCookieValue(rawCookies, "accessToken");
    const newRefreshToken = extractCookieValue(rawCookies, "refreshToken");

    if (!newAccessToken) throw new Error("No token in response");

    return {
      ...token,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken || (token.refreshToken as string),
      accessTokenExpiry: Date.now() + 15 * 60 * 1000,
      error: undefined,
    };
  } catch {
    return { ...token, error: "RefreshTokenError" };
  }
}
