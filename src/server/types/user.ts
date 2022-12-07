import { z } from 'zod'
import { createUserDto } from './user.dto'

const userResponse = createUserDto.omit({ password: true })
const userIdResponse = z.object({
  id: z.string().cuid()
})
export {
  userResponse,
  userIdResponse
}

type UserResponse = typeof userResponse
type UserIdResponse = typeof userIdResponse

export type {
  UserResponse,
  UserIdResponse
}