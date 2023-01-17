import { mockProfile, setupDateTimeOfSystem } from '@server/controller/match'
import { router } from '@server/trpc'

export const matchRouter = router({
	// setup datetime of matching system
	setupDateTimeOfSystem,
	// mock up user profile for matching
	mockProfile,
})