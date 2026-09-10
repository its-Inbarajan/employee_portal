"use client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { toast } from "sonner";
import { Loader, LogOut } from "lucide-react";
import { api } from "@/lib/api";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LogoutProps {
  className?: string;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
}

export default function LogoutButton({
  className,
  variant = "default",
  size = "default",
}: LogoutProps) {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const router = useRouter();
  async function handleLogout() {
    setIsPending(true);
    try {
      const res = await api.post<{ message: string }>("/users/logout");
      if (!res.success) {
        toast.error(res.message);
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }

    try {
      // ── Step 2: Clear NextAuth session ──
      // redirect: false — handle navigation manually
      await signOut({ redirect: false });

      toast.success("Logged out successfully");

      // ── Step 3: Navigate manually after signOut resolves ──
      // router.push instead of NextAuth redirect
      // avoids the NextAuth redirect chain entirely
      router.push("/");
      router.refresh(); // clears server component cache
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant={"default"}
      size={"sm"}
      disabled={isPending}
      onClick={handleLogout}
      className={cn(buttonVariants({ className, variant, size }))}
    >
      {isPending && <Loader className="animate-spin" />}
      <LogOut /> Log out
    </Button>
  );
}
