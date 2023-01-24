import { publicProcedure } from '@server/trpc'
import { createUserDto, userIdResponse } from '@server/model/user'

import { prisma } from '@server/db'
import { ConflictError } from '@server/model/errors'

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
			throw ConflictError('cannot create duplicate user')
		}

		const userId = await prisma.user.create({
			data: input,
			select: { id: true },
		})

		return userId
	})

export default createStudent
