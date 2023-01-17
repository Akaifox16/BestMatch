import { publicProcedure } from "@server/trpc"
import { userIdResponse } from "@server/types/user"
import { createUserDto } from "@server/types/user.dto"

import { prisma } from "@server/db"

const createUser = publicProcedure
		.input(createUserDto)
		.output(userIdResponse)
		.mutation(async ({ input }) => {
			const userId = await prisma.user.create({
				data: input,
				select: { id: true },
			})

			return userId
		})
export default createUser