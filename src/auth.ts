import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import GitHubProvider from 'next-auth/providers/github';

import { prisma } from '@/lib/index';
import { User } from '@prisma/client';
import { Post } from '@prisma/client';

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("Missing github client id or secret key");
}

export const { handlers: { GET, POST }, auth,signIn,signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ user, session }) {
          if (user && session.user) {
            session.user.id = user.id;
          }
          return session;
        },
      }
});

