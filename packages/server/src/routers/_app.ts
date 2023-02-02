import { createTRPCRouter } from '@src/trpc';
import { authRouter } from './auth';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  student: userRouter,
});

export type AppRouter = typeof appRouter;
