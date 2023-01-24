import { publicProcedure } from "@server/trpc"
import { userResponse } from "@server/model/user"

import { prisma } from "@server/db"

const getProfile = publicProcedure
		.output(userResponse.nullable())
		.query(async () => {
			const userId = 'cld1ns6f80000qt54q7jf81ej'

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