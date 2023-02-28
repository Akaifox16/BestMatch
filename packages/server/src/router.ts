import { authRouter, studentRouter } from './services';
import { createTRPCRouter } from './trpc';

const appRouter = createTRPCRouter({
  auth: authRouter,
  student: studentRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
