import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import RecruiterAppSidebar from "./_components/recruiter-app-sidebar";

export default async function RecruiterLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/sign-in/recruiter");
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 62)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <RecruiterAppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
