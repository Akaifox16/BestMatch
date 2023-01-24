import { z } from 'zod'
import { SexEnum } from '../enum'

const timerange = z.number().max(23).min(0)
const cuid = z.string().cuid()

export const createUserDto = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email(),
	password: z.string(),
	personal_id: z.string().max(13).min(13),
	sex: SexEnum,
})

export const addPrefDto = z.object({
	messiness: z.number(),
	loudness: z.number(),
	do_not_disturb: z.array(
		z.object({
			start: timerange,
			stop: timerange,
		})
	),
})
export const addProfileDto = addPrefDto

export const editProfileDto = addProfileDto.deepPartial()
export const editPrefDto = addPrefDto.deepPartial()

export const bookRoomDto = z.object({
	roomId: cuid,
})

export const userResponse = createUserDto.omit({ password: true })
export const userIdResponse = z.object({
  id: cuid
})

export const findById = cuid