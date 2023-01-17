import { publicProcedure } from "@server/trpc"
import { addProfileDto } from "@server/types/user.dto"

const addProfile = publicProcedure
		.input(addProfileDto)
		.mutation(async ({ input }) => {

		})

export default addProfile