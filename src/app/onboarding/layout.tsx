import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface Prop {
  children: React.ReactNode;
}
export default async function CandidateOnboardingLayout({
  children,
}: Readonly<Prop>) {
  const session = await getServerSession();

  // Protect — redirect if not logged in
  if (!session) {
    redirect("/auth/sign-in");
  }
  return <div>{children}</div>;
}
