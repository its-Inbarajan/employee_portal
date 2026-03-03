import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          // Call YOUR Node.js backend API
          const res = await fetch(`${process.env.API_URL}/users/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            // Return user object — this gets stored in the JWT token
            return {
              id: user?.responses.userId,
              accessToken: user?.responses.accessToken, // store backend JWT
            };
          }
          return null; // login failed
        } catch (error) {
          console.log(error);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    // Attach accessToken to the JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },

    // Expose accessToken in the session
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/login", // your custom login page
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
