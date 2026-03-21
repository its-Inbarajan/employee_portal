import AuthHeader from "@/components/auth-header";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full relative">
      <header className="md:fixed flex w-full inset-0 z-10 backdrop-blur-sm dark:bg-background bg-white h-12 top-0">
        <AuthHeader />
      </header>
      <main>{children}</main>
    </div>
  );
}
