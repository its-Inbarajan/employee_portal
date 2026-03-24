import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import OnboardingStepper from "./_components/onboarding-stepper";

interface Prop {
  children: React.ReactNode;
}
export default async function CandidateOnboardingLayout({
  children,
}: Readonly<Prop>) {
  const session = await getServerSession(authOptions);
  // Protect — redirect if not logged in
  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session.user.onboardingCompleted) {
    redirect("/candidate/dashboard");
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Minimal header */}
      <div className="bg-white px-6 py-2 flex dark:bg-background items-center justify-between">
        <span className="font-semibold text-sm">Complete your profile</span>
        <span className="text-sm text-muted-foreground">
          Welcome, {session.user.name} 👋
        </span>
      </div>

      {/* ✅ Stepper is client component — owns usePathname */}
      <OnboardingStepper>{children}</OnboardingStepper>
    </div>
  );
}
