import { type NextAuthOptions, DefaultSession, Session } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@acme/env';
import { prisma } from '@acme/database';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id: string;
    } & DefaultSession['user'];
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
  secret: env.NEXTAUTH_SECRET,
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
        name: {},
        id: {},
      },
      async authorize(cred, _req) {
        if (!cred) {
          return null;
        }

        console.log('signing in');

        const user = {
          email: cred.email,
          image: null,
          name: cred.name,
          id: cred.id,
        } satisfies Session['user'];

        return user;
      },
    }),
  ],
};
