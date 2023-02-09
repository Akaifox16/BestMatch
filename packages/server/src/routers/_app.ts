import { createTRPCRouter } from '@src/trpc';
import { authRouter } from './auth';
import { studentRouter } from './user';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  student: studentRouter,
});

export type AppRouter = typeof appRouter;
