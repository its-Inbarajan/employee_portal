// app/api/auth/candidate/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { candidateAuthOptions } from "@/lib/auth/candidate.auth";

const handler = NextAuth(candidateAuthOptions);
export { handler as GET, handler as POST };
