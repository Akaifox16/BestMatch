import { z } from 'zod'
import { publicProcedure, router } from "server/trpc";
import { userRouter } from './user';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({
      text: z.string().nullish(),
    }))
    .output(z.object({
      greeting: z.string()
    }))
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`
      }
    }),
  // merged router
  user: userRouter,
})

export type AppRouter = typeof appRouter