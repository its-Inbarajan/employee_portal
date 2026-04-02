import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
    user: {
      _id: string;
      email: string;
      name: string;
      userRole: string;
      profileId: string | null;
      onboardingCompleted: boolean;
      accessToken: string;
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
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
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
              "x-client-type": "CANDIDATE_APP",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) return null;

          // ── Extract accessToken from Set-Cookie header ──
          // Your backend sets it as a cookie — grab it here in Node
          const rawCookies = res.headers.get("set-cookie") ?? "";

          const accessToken = extractCookieValue(rawCookies, "accessToken");
          const refreshToken = extractCookieValue(rawCookies, "refreshToken");

          if (!data.user) return null;

          return {
            id: data.user._id,
            _id: data.user._id,
            email: data.user.email,
            name: data.user.user_name,
            image: data.user.profile ?? null,
            userRole: data.userRole,
            profileId: data.user.profileId ?? null,
            onboardingCompleted: data.onboardingCompleted ?? false,
            accessToken, // now carried into jwt callback
            refreshToken, // store so we can rotate later
          };
        } catch (err) {
          console.error("[authorize] error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // JWT — runs on every request
    // 'user' is only present on first sign in
    async jwt({ token, user }): Promise<JWT> {
      // First sign in — populate token from authorize() return
      if (user) {
        token.userId = user._id;
        token.userRole = user.userRole;
        token.profileId = user.profileId;
        token.onboardingCompleted = user.onboardingCompleted;
        token.accessToken = user.accessToken; // ✅ set from cookie extract
        token.refreshToken = user.refreshToken;
      }

      return token;
    },

    // SESSION — populate session FROM token
    // Never read FROM session here
    // Always write TO session from token
    async session({ session, token }): Promise<typeof session> {
      session.user._id = token.userId as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.userRole = token.userRole as string;
      session.user.profileId = token.profileId as string | null;
      session.user.onboardingCompleted = token.onboardingCompleted as boolean;
      session.user.accessToken = token.accessToken as string;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // send errors to login not /api/auth/error
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// HELPER — parse a single cookie value from
// the raw Set-Cookie header string

function extractCookieValue(rawCookies: string, name: string): string {
  // Set-Cookie can contain multiple cookies separated by comma
  // but commas also appear in expires= values — split on name= patterns
  const match = rawCookies
    .split(/,(?=[^;]+=[^;]+)/) // split multiple Set-Cookie entries
    .find((c) => c.trim().startsWith(`${name}=`));

  if (!match) return "";

  return match
    .split(";")[0] // take only name=value part
    .replace(`${name}=`, "") // strip the name=
    .trim();
}
