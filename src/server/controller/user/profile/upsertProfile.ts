import { publicProcedure } from '@server/trpc'
import { addProfileDto } from '@server/types/user.dto'

import { prisma } from '@server/db'
import { InternalServerError } from '@server/types/errors'

const upsertProfile = publicProcedure
	.input(addProfileDto)
	.mutation(async ({ input }) => {
		const userId = 'cld1ns6f80000qt54q7jf81ej'

		const profile = await prisma.profile.upsert({
			where: {
				owner_id: userId,
			},
			select: {
				messiness: true,
				loudness: true,
			},
			create: {
				...input,
				do_not_disturb: {
					createMany: {
						data: input.do_not_disturb,
						skipDuplicates: true,
					},
				},
			},
			update: {
				...input,
				do_not_disturb: {
					createMany: {
						data: input.do_not_disturb,
						skipDuplicates: true,
					},
				},
			},
		})

		if (!profile) {
			throw InternalServerError(
				'Fail to create your profile. please try again'
			)
		}

		return {
			status: 'OK',
			msg: 'created successfully',
		}
	})

export default upsertProfile
