import { authRouter, matchRouter, studentRouter } from './services';
import { createTRPCRouter } from './trpc';

const appRouter = createTRPCRouter({
  auth: authRouter,
  student: studentRouter,
  match: matchRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
