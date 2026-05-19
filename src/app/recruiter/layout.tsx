import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function RecruiterLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/sign-in");
  return <div>{children}</div>;
}
