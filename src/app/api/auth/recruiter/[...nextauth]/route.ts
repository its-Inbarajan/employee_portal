// app/api/auth/recruiter/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { recruiterAuthOptions } from "@/lib/auth/recruiter.auth";

const handler = NextAuth(recruiterAuthOptions);
export { handler as GET, handler as POST };
