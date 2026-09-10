// app/providers/candidate-session-provider.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function CandidateSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider basePath="/api/auth/candidate">{children}</SessionProvider>
  );
}
