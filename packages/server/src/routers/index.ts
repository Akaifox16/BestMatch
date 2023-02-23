import { createTRPCRouter } from '../trpc';
import authRouter from './auth';
import studentRouter from './student';

const appRouter = createTRPCRouter({
  auth: authRouter,
  student: studentRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
