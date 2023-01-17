import { z } from 'zod'
import { SexEnum, YesNoEnum } from './enum'

// validate function
function isValidPersonalId(pid: number) {
	if (pid.toString().length != 13) return false

	const digit = pid.toString().split('').map(Number)
	const checkDigit = digit.pop()
	const sop =
		11 -
		(digit.reduce((sum, num, idx) => sum + num * (13 - idx), 0) % 11)
	return checkDigit === sop
}

// dto
export const createUserDto = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email(),
	password: z.string(),
	// personal information
	date_of_birth: z.date(),
	personal_id: z
		.number()
		.refine(
			(val) => isValidPersonalId(val),
			'personal_id must be 13 digit number'
		),
	sex: SexEnum,
})

export const addPrefDto = z.object({
	loud_player: ThreeChoiceEnum,
	bed_time_lo: z.date(),
	bed_time_hi: z.date(),
	keep_clean: z
		.number()
		.int()
		.min(0, 'must not less than 0')
		.max(100, 'must not more than 100'),
})
export const editPrefDto = addPrefDto.deepPartial()

export const addProfileDto = addPrefDto
	.omit({ loud_player: true })
	.merge(z.object({ loud_player: YesNoEnum }))
export const editProfileDto = createUserDto
	.pick({
		date_of_birth: true,
		personal_id: true,
		sex: true,
	})
	.merge(addProfileDto)
	.deepPartial()

export const bookRoomDto = z.object({
	room_id: z.string().cuid(),
})
