import { publicProcedure } from '@server/trpc'
import { bookRoomDto } from '@server/types/user.dto'
import { prisma } from '@server/db'

const bookRoom = publicProcedure
	.input(bookRoomDto)
	.mutation(async ({ input }) => {
		const userId = 'this-should-be-user-cuid'

		const room = await prisma.user
			.update({
				data: {
					roomId: input.room_id,
				},
				where: {
					id: userId,
				},
			})
			.lived_in()

		return {
			message: `user booked room ${room.room_number} successfully!!`,
			room_no: room.room_number,
		}
	})

export default bookRoom
