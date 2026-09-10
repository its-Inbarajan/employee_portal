import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import RecruiterAppSidebar from "./_components/recruiter-app-sidebar";
import RecruiterSessionProvider from "@/providers/recruiter-session-provider";
import { recruiterAuthOptions } from "@/lib/auth/recruiter.auth";

export default async function RecruiterLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const session = await getServerSession(recruiterAuthOptions);
  console.log(session);
  if (!session) redirect("/auth/sign-up/recruiter");
  return (
    <RecruiterSessionProvider>
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
    </RecruiterSessionProvider>
  );
}
