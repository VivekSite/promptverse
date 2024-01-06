import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";

const config: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ]
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);