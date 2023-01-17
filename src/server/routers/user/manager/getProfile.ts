import { publicProcedure } from "@server/trpc"
import { userResponse } from "@server/types/user"

import { prisma } from "@server/db"

const getProfile = publicProcedure
		.output(userResponse.nullable())
		.query(async () => {
			const userId = 'this-is-user-cuid'

			const user = await prisma.user.findFirst({
				select: {
					first_name: true,
					last_name: true,
					email: true,
					personal_id: true,
					sex: true,
				},
				where: {
					id: userId,
				},
			})

			return user
		})

export default getProfile