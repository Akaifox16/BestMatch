import { router } from '@server/trpc'

import bookRoom from './bookRoom'
import { createUser, getProfile, getRole } from './manager'
import { addProfile, editProfile } from './profile'
import { addPreference, editPreference } from './matePreference'
import { addDormPreference, editDormPreference } from './dormPreference'

export const userRouter = router({
  // User
	getProfile,
	getRole,
	createUser,
 
  // Profile
	addProfile,
	editProfile,

  // Mate
	addPreference,
	editPreference,
 
  // Room & Dorm
	addDormPreference,
	editDormPreference,

  // Book room
	bookRoom,
})
