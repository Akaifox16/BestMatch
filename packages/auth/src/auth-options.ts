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
        password: { label: 'Password', type: 'password' },
      },
      async authorize(cred, _req) {
        if (!cred) {
          return null;
        }

        // const { data: user } = await fetch(
        //   `${env.NEXTAUTH_URL}/api/auth.login`,
        //   {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(cred),
        //   }
        // ).catch(console.error);

        // console.log(user);

        const user = {
          email: cred?.email,
          image: null,
          name: 'test user',
          id: 'clda953nf0000qtah0fb2z9cp',
        } satisfies Session['user'];

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
};
