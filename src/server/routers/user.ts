import { bookRoom, upsertPreference, upsertProfile } from '@server/controller/user'
import { addDormPreference, editDormPreference } from '@server/controller/user/dormPref'
import { createStudent, getProfile, getRole } from '@server/controller/user/manager'
import { createTRPCRouter } from '@server/trpc'


export const userRouter = createTRPCRouter({
  // User
	getProfile,
	getRole,
	createStudent,
 
  // Profile
	upsertProfile,

  // Mate
	upsertPreference,
 
  // Room & Dorm
	addDormPreference,
	editDormPreference,

  // Book room
	bookRoom,
})