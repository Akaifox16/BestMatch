import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@server/db'

export const authOptions: NextAuthOptions = {
	callbacks: {
		session({ session, user }) {
			if (session.user) session.user.id = user.id
			return session
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'bestmatch-auth',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@gmail.com, john.doe@outlook.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(_cred, _req) {
				return {
					name: 'mockup-user',
					email: 'mockup@mockmail.com',
					id: 'clda953nf0000qtah0fb2z9cp',
				}
			},
		}),
	],
}

export default NextAuth(authOptions)
