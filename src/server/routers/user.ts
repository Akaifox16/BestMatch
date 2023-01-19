import { bookRoom, upsertProfile } from '@server/controller/user'
import { addDormPreference, editDormPreference } from '@server/controller/user/dormPref'
import { createStudent, getProfile, getRole } from '@server/controller/user/manager'
import { addPreference, editPreference } from '@server/controller/user/matePref'
import { router } from '@server/trpc'


export const userRouter = router({
  // User
	getProfile,
	getRole,
	createStudent,
 
  // Profile
	upsertProfile,

  // Mate
	addPreference,
	editPreference,
 
  // Room & Dorm
	addDormPreference,
	editDormPreference,

  // Book room
	bookRoom,
})