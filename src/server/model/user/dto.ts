import { z } from 'zod'
import { DormTypePreferEnum, SexEnum, ZoneEnum } from '../enum'

const timerange = z.number().max(23).min(0)
const cuid = z.string().cuid()
const email = z.string().email()
const password = z.string().max(18).min(8)
const personal_id = z.string().max(13).min(13)

export const loginDto = z.object({
	email,
	password,
})

export const authResponseDto = z.object({
  email,
  id: cuid,
  name: z.string().refine(val => val.split(' ').length === 2, {
    message: 'name shoud contains both `first name` and `last name`'
  })
})

export const createStudentDto = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email,
	password,
	personal_id,
	sex: SexEnum,
})

export const createDormPrefDto = z.object({
	residents_limit: z.number().int().min(2).max(4),
	dorm_type: DormTypePreferEnum,
	room_pref: z.object({
		zone: ZoneEnum,
		floor_number: z.number().int().min(1),
	}),
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

export const bookRoomDto = z.object({
	roomId: cuid,
})

export const findByIdDto = cuid
