import { publicProcedure } from '@server/trpc'

const mockProfile = publicProcedure.query(async () => {
	return {
		message: 'need implementation',
	}
})

export default mockProfile
