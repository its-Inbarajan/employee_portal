"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

export default function SessionGuard({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const { data: session } = useSession();

  React.useEffect(() => {
    // ✅ If refresh failed — force logout
    // This happens when refresh token itself is expired (after 7 days)
    if (session?.error === "RefreshTokenError") {
      toast.error("Refresh token expired — forcing logout");
      signOut({ callbackUrl: "/auth/sign-in" });
    }
  }, [session]);
  return <>{children}</>;
}
