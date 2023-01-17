import { router } from '@server/trpc'
import mockProfile from './mockProfile'
import setupDateTimeOfSystem from './setupDateTimeOfSystem'

export const matchRouter = router({
	// setup datetime of matching system
	setupDateTimeOfSystem,
	// mock up user profile for matching
	mockProfile,
})
