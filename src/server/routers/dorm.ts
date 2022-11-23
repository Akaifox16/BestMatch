import { publicProcedure, router } from "@server/trpc";

export const dormRouter = router({
  add: publicProcedure
    .input()
    .mutation( () => {
      return {
        message: 'need implementation'
      }
    }),
  addResidents: publicProcedure
    .input()
    .mutation( () => {
      return {
        message: 'need implementation'
      }
    })
})