"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function LogoutButton() {
  const { data: session } = useSession();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  async function handleLogout() {
    setIsPending(true);
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        credentials: "include", // ✅ This forwards browser cookies to Next.js route
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsPending(false);
      await signOut({
        redirect: true,
        callbackUrl: "/auth/sign-in",
      });
    }
  }

  return (
    <Button
      type="button"
      variant={"default"}
      size={"sm"}
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? <Loader className="animate-spin" /> : "Logout"}
    </Button>
  );
}
