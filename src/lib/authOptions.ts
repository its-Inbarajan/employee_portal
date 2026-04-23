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

const ACCESS_TOKEN_EXPIRY = 60 * 60 * 24; // 1 day in seconds — match your backend

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
        token.accessTokenExpiry = Date.now() + ACCESS_TOKEN_EXPIRY * 1000;
      }
      // ── Token still valid — return as-is ──
      if (Date.now() < (token.accessTokenExpiry as number)) {
        return token;
      }
      return await refreshAccessToken(token);
    },

    // SESSION — populate session FROM token
    // Never read FROM session here
    // Always write TO session from token
    async session({ session, token }): Promise<typeof session> {
      if (token.error) {
        session.error = token.error as string;
      }

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
    signIn: "/",
    error: "/", // send errors to login not /api/auth/error
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

// ─────────────────────────────────────────
// REFRESH ACCESS TOKEN
// Calls your backend /refresh endpoint
// ─────────────────────────────────────────
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("[NextAuth] Refreshing access token...");

    const res = await fetch(`${process.env.API_URL}/users/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-type": "CANDIDATE_APP",
        // Send refresh token in cookie format
        Cookie: `refreshToken=${token.refreshToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Refresh failed: ${res.status}`);
    }

    // ── Extract new accessToken from Set-Cookie ──
    const rawCookies = res.headers.get("set-cookie") ?? "";
    const newAccessToken = extractCookieValue(rawCookies, "accessToken");
    const newRefreshToken = extractCookieValue(rawCookies, "refreshToken");

    if (!newAccessToken) {
      throw new Error("No access token in refresh response");
    }

    console.log("[NextAuth] Token refreshed successfully");

    return {
      ...token,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken || (token.refreshToken as string),
      accessTokenExpiry: Date.now() + ACCESS_TOKEN_EXPIRY * 1000,
      error: undefined, // clear any previous error
    };
  } catch (err) {
    console.error("[NextAuth] Token refresh failed:", err);

    // ✅ Return token with error — session callback exposes this
    // Client can detect error and force logout
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}
