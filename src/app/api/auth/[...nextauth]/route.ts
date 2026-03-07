
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
    error?: string;
    user: {
      _id: string;
      user_name?: string | null;
      email?: string | null;
      profile?: string | null;
      role?: string
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
    _id: string;
    name: string;
    email: string;
    error?: string;         // ← add this
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

      if (token.accessToken) {
        try {
          const res = await fetch(`${process.env.API_URL}/users/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.accessToken}`, // ← validate token on backend
            },
          });

          const text = await res.text();
          const data = text ? JSON.parse(text) : {};

          if (!res.ok) {
            // Token invalid — force logout by returning empty token
            return { ...token, error: "InvalidToken" };
          }

          // Map /me response into token
          token.id = data.responses._id;
          token.name = data.responses.user_name;
          token.email = data.responses.email;
        } catch (error: unknown) {
          console.log(error);
          return { ...token, error: "FetchFailed" };
        }
      }

      return token;
    },


    // Typed Session callback
    async session({ session, token }): Promise<Session> {
      session.accessToken = token.accessToken;
      session.user._id = token._id;
      session.user.user_name = token.name;
      session.user.email = token.email;
      session.error = token.error; // ← expose error to client if needed
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
export { handler as GET, handler as POST, authOptions };