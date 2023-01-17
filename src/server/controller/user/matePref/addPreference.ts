import { publicProcedure } from '@server/trpc'
import { addPrefDto } from '@server/types/user.dto'
import { prisma } from '@server/db'

const addPreference = publicProcedure
	.input(addPrefDto)
	.mutation(async ({ input }) => {
		const ownerId = 'this-should-be-user-cuid'

		const preference = await prisma.user
			.update({
				include: {
					has_mate_preference: true,
				},
				data: {
					has_mate_preference: {
						create: input,
					},
				},
				where: {
					id: ownerId,
				},
			})
			.has_mate_preference()

		return preference
	})

export default addPreference
