import { publicProcedure } from "@server/trpc"
import { editProfileDto } from "@server/types/user.dto"
import { prisma } from "@server/db"
const editProfile =publicProcedure
		.input(editProfileDto)
		.mutation(async ({ input }) => {
			const userId = 'this-should-be-user-cuid'

			const profile = await prisma.user.update({
				data: input,
				where: { id: userId },
			})

			return profile
		})

export default editProfile