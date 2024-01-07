import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/db";

const config: NextAuthConfig = {
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, token, user}) {

      return session;
    },
    async jwt({ token, user, account, profile }) {
      if(account?.provider !== "credentials") {
        
      }
      return token;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
