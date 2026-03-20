// lib/api/use-api-error.ts
import { ApiError } from "./fetcher";
import { signOut } from "next-auth/react";

export function handleApiError(err: unknown): string {
  if (err instanceof ApiError) {
    // Token expired — force logout
    if (err.statusCode === 401) {
      signOut({ callbackUrl: "/login" });
      return "Session expired. Please login again.";
    }

    // Onboarding not complete
    if (err.statusCode === 403) {
      return err.message;
    }

    return err.message;
  }

  if (err instanceof Error) return err.message;

  return "Something went wrong";
}
