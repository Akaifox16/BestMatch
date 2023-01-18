import { z } from 'zod'
import { createUserDto } from './user.dto'

export const userResponse = createUserDto.omit({ password: true })
export const userIdResponse = z.object({
  id: z.string().cuid()
})

export type UserResponse = typeof userResponse
export type UserIdResponse = typeof userIdResponse