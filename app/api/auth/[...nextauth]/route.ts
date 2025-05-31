// src/pages/api/auth/[...nextauth].ts

import { loginUser } from "@/src/services/auth.service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const userData = await loginUser(credentials.email, credentials.password);

        if (userData && userData.access_token && userData.user) {
          return {
            id: userData.user.id,
            name: userData.user.displayName,
            email: userData.user.email,
            accessToken: userData.access_token,
            refreshToken: userData.refresh_token,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string ?? "";
        session.accessToken = token.accessToken as string | undefined;
        session.refreshToken = token.refreshToken  as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
