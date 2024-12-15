import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib-server/prisma';

import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id?: string;
    email?: string | null;
    userName: string;
  }
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    userName: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          email: profile.email,
          image: profile.avatar_url,
          name: profile.name,
          userName: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        if (account?.provider !== 'credentials') {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
          );
          const data = await response.json();

          token.id = data.user.id;
        }
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
