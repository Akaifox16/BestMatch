import { bookRoom } from '@server/controller/user'
import { addDormPreference, editDormPreference } from '@server/controller/user/dormPref'
import { createUser, getProfile, getRole } from '@server/controller/user/manager'
import { addPreference, editPreference } from '@server/controller/user/matePref'
import { addProfile, editProfile } from '@server/controller/user/profile'
import { router } from '@server/trpc'


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