import { publicProcedure } from '@server/trpc'
import { prisma } from '@server/db'
import { addPrefDto } from '@server/model/user'
import { InternalServerError } from '@server/model/errors'

const addPreference = publicProcedure
	.input(addPrefDto)
	.mutation(async ({ input }) => {
		const ownerId = 'cld1ns6f80000qt54q7jf81ej'

		const preference = await prisma.profile.upsert({
			where: {
				pref_owner_id: ownerId,
			},
			select: {
				messiness: true,
				loudness: true,
				do_not_disturb: true,
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

		if (!preference) {
			throw InternalServerError(
				'Fail to create your roommate preference, please try again'
			)
		}

		return preference
	})

export default addPreference
