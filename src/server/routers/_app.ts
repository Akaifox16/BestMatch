import { createTRPCRouter } from 'server/trpc'
import { userRouter } from './user'

export const appRouter = createTRPCRouter({
	student: userRouter,
})

export type AppRouter = typeof appRouter
