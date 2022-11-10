import { z } from 'zod'
import { publicProcedure, router } from "@server/trpc";

const createUserDto = z.object({
      fname: z.string(),
      lname: z.string(),
      email: z.string().email(),
      password: z.string(),
      // personal information
      dob: z.date(),
      pid: z.string().length(13, 'must have only  13 number characters')
    })

export const userRouter = router({
  create: publicProcedure
    .input(createUserDto)
    .mutation(({ input }) => {
      return {
        message: 'created successfully'
      }
    })
})