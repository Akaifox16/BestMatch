import { findById } from '@server/model/user'
import { publicProcedure } from '@server/trpc'

const getRole = publicProcedure.input(findById).query(async () => {
	return {
		message: 'need implementation',
	}
})

export default getRole
