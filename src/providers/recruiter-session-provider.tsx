// app/providers/recruiter-session-provider.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function RecruiterSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider basePath="/api/auth/recruiter">{children}</SessionProvider>
  );
}
