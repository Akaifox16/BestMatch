import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@server/db';

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
    session({ session, user, token }) {
      console.log('begin session');

      if (session.user && token.id) session.user.id = token.id as string;

      return session;
    },
    jwt({ token, user, account }) {
      console.log(`signing jwt for ${token.email}`);

      if (user?.id) token.id = user.id;
      if (account?.access_token) console.log(account.access_token);

      console.log(`signed token: ${token.email}`);

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
        console.log('begin authorization...');
        console.log(`incoming user: ${cred?.email}`);

        const user = {
          email: cred?.email,
          id: 'clda953nf0000qtah0fb2z9cp',
        };

        if (!user) {
          return null;
        }

        console.log(`authorized`);
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
