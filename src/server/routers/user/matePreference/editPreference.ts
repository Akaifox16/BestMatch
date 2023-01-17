import { publicProcedure } from "@server/trpc"
import { editPrefDto } from "@server/types/user.dto"
import { prisma } from "@server/db"

const editPreference = publicProcedure
		.input(editPrefDto)
		.mutation(async ({ input }) => {
			const userId = 'this-should-be-user-cuid'

			const preference = await prisma.user
				.update({
					include: {
						has_mate_preference: true,
					},
					data: {
						has_mate_preference: {
							update: input,
						},
					},
					where: {
						id: userId,
					},
				})
				.has_mate_preference()

			return preference
		})
export default editPreference