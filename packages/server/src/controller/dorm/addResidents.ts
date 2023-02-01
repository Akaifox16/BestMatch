import { publicProcedure } from '@server/trpc'

const addResidents = publicProcedure.input().mutation(() => {
	return {
		message: 'need implementation',
	}
})
export default addResidents
