import { publicProcedure } from '@server/trpc'
import { userIdResponse } from '@server/types/user'
import { createUserDto } from '@server/types/user.dto'

import { prisma } from '@server/db'
import { ExistingUserError } from '@server/types/errors'

const createStudent = publicProcedure
	.input(createUserDto)
	.output(userIdResponse)
	.mutation(async ({ input }) => {
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						email: input.email,
					},
					{
						personal_id: input.personal_id,
					},
				],
			},
			select: { id: true },
		})

		if (user) {
			throw ExistingUserError
		}

		const userId = await prisma.user.create({
			data: input,
			select: { id: true },
		})

		return userId
	})

export default createStudent
