import { Profile, User } from '@prisma/client'
import { ModelId, ZodObject } from '@utility/type'
import { z } from 'zod'

import { SexEnum } from './enum'

// dto
export const createUserDto: ZodObject<
	Omit<User, ModelId | 'roomId' | 'isAdmin'>
> = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email(),
	password: z.string(),
	// personal information
	date_of_birth: z.date(),
	personal_id: z.string().max(13).min(13),
	sex: SexEnum,
})
export const addPrefDto: ZodObject<
Omit<Profile, ModelId | 'owner_id' | 'pref_owner_id'>
> = z.object({
	messiness: z.number(),
	loudness: z.number(),
	do_not_disturb: z.array(
		z.object({
			start: z.date(),
			stop: z.date(),
		})
	),
})
export const addProfileDto = addPrefDto

export const editProfileDto = addProfileDto.deepPartial()
export const editPrefDto = addPrefDto.deepPartial()

export const bookRoomDto: ZodObject<Pick<User, 'roomId'>> = z.object({
	roomId: z.string().cuid(),
})
