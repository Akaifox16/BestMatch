import { publicProcedure } from '@server/trpc'

const getRole = publicProcedure.query(async () => {
	return {
		message: 'need implementation',
	}
})

export default getRole
