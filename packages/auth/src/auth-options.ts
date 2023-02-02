import { type NextAuthOptions, DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '@bm/database'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
    id: string} & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 3600,
    updateAge: 600,
  },
  callbacks: {
    redirect: async ({ baseUrl }) => {
      return baseUrl;
    },
    session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;

      return session;
    },
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // name: '',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@gmail.com, john.doe@outlook.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(cred, _req) {
        const user = {
          email: cred?.email,
          id: 'clda953nf0000qtah0fb2z9cp',
        };

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
}
