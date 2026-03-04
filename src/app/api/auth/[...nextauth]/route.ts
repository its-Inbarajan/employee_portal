
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// ✅ Type for your backend API response
interface BackendResponse {
  responses: {
    userId: string;
    accessToken: string;
  };
  message?: string;
}

// ✅ Extend next-auth default types
declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    id: string;
  }
}

// ✅ Typed NextAuth options
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // ✅ Guard: ensure credentials exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${process.env.API_URL}/users/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data: BackendResponse = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          // ✅ Return typed user object
          return {
            id: data.responses.userId,
            accessToken: data.responses.accessToken,
          };

        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],

  callbacks: {
    // ✅ Typed JWT callback
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },

    // ✅ Typed Session callback
    async session({ session, token }): Promise<Session> {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };