import { router } from "server/trpc";
import { userRouter } from './user';

export const appRouter = router({
  student: userRouter,
})

export type AppRouter = typeof appRouter