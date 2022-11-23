import { z } from 'zod'
import { publicProcedure, router } from '@server/trpc'

import {
	addPrefDto,
	createUserDto,
	editPrefDto,
	editProfileDto,
} from '@server/types/user.dto'
import { prisma } from '../db'
import { userIdResponse, userResponse } from '@server/types/user'

export const userRouter = router({
	// get user profile
	getProfile: publicProcedure
	 	.output(userResponse.nullable())
		.query(async () => {
			const userId = 'this-is-user-cuid'

			const user = await prisma.user.findFirst({
				select: {
					first_name: true,
					last_name: true,
					email: true,
					date_of_birth: true,
					personal_id: true,
					sex: true
				},
				where: {
					id: userId
				}
			})

			return user
		}),

	// create user
	createUser: publicProcedure
		.input(createUserDto)
		.output(userIdResponse)
		.mutation(async ({ input }) => {
			const userId = await prisma.user.create({
				data: input,
				select: { id: true },
			})

			return userId
		}),

	// edit user profile
	editProfile: publicProcedure
		.input(editProfileDto)
		.mutation(({ input }) => {
			return {
				message: 'need implementation',
			}
		}),

	// add user's roommate preference
	addPreference: publicProcedure
		.input(addPrefDto)
		.mutation(({ input }) => {
			return {
				message: 'need implemetation',
			}
		}),
	
	// edit user's roommate preference
	editPreference: publicProcedure.input(editPrefDto).mutation(() => {
		return {
			message: 'need implementation',
		}
	}),
	
	// book room for user
	bookRoom: publicProcedure
		.input(
			z.object({
				room_id: z.string().cuid(),
			})
		)
		.mutation(async ({ input }) => {
			const userId = 'this-should-be-user-cuid'

			const room = await prisma.user.update({
				data: {
					roomId: input.room_id
				},
				where: {
					id: userId
				}
			}).lived_in()

			return {
				message: `user booked room ${room.room_number} successfully!!`,
				room_no: room.room_number
			}
		}),
})
