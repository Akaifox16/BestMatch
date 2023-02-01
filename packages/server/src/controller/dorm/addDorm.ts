import { publicProcedure } from '@server/trpc'

const addDorm = publicProcedure.input().mutation(() => {
	return {
		message: 'need implementation',
	}
})

export default addDorm
