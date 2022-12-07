import { publicProcedure, router } from "@server/trpc";

export const matchRouter = router({
  // setup datetime of matching system
  setupDateTimeOfSystem: publicProcedure
    // .input()
    .mutation( () => {
      return {
        message: 'need implementation'
      }
    }),

	// mock up user profile for matching
	mockProfile: publicProcedure
		.query(async () => {
			return {
				message: 'need implementation'
			}
		}),

})