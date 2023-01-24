import type { StateFrom } from 'xstate'

import userMachine from './machine'

export const loggedInSelector = (
	state: StateFrom<typeof userMachine>
) => state.matches('authenticated')
