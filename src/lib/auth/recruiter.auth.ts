// lib/auth/recruiter.auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { extractCookieValue, refreshAccessToken } from "@/lib/utils";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id: string;
    userRole: string;
    profileId: string | null;
    onboardingCompleted: boolean;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    error?: string;
    user: {
      _id: string;
      email: string;
      name: string;
      userRole: string;
      profileId: string | null;
      onboardingCompleted: boolean;
      accessToken: string;
      accessTokenExpiry?: Date;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    userRole: string;
    profileId: string | null;
    onboardingCompleted: boolean;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry?: number;
    error?: string;
  }
}

export const recruiterAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "recruiter-credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const res = await fetch(`${process.env.API_URL}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // hardcoded for recruiter portal
              "x-client-type": "RECRUITER_APP",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          if (!res.ok || !data.user) return null;

          // Block if not a recruiter
          if (data.userRole !== "RECRUITER") return null;

          const rawCookies = res.headers.get("set-cookie") ?? "";
          const accessToken = extractCookieValue(rawCookies, "accessToken");
          const refreshToken = extractCookieValue(rawCookies, "refreshToken");

          return {
            id: data.user._id,
            _id: data.user._id,
            email: data.user.email,
            name: data.user.user_name,
            image: data.user.profile ?? null,
            userRole: data.userRole,
            profileId: data.user.profileId ?? null,
            onboardingCompleted: data.onboardingCompleted ?? false,
            accessToken,
            refreshToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.userId = user._id;
        token.userRole = user.userRole;
        token.profileId = user.profileId;
        token.onboardingCompleted = user.onboardingCompleted;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiry = Date.now() + 15 * 60 * 1000;
      }
      if (Date.now() < (token.accessTokenExpiry as number)) return token;
      return refreshAccessToken(token, "RECRUITER_APP");
    },
    async session({ session, token }) {
      session.user._id = token.userId as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.userRole = token.userRole as string;
      session.user.profileId = token.profileId as string | null;
      session.user.onboardingCompleted = token.onboardingCompleted as boolean;
      session.user.accessToken = token.accessToken as string;
      if (token.error) session.error = token.error as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in/recruiter",
    error: "/",
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  secret: process.env.NEXTAUTH_SECRET,
};
