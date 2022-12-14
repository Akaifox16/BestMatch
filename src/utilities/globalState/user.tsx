import { createMachine} from "xstate";

type UserEvts = 
  | { type: 'LOGGED_IN', id: string }
  | { type: 'LOGGED_OUT', id: string }

type UserStates = 
  | { value: 'unauthenticated', context: {} }
  | { value: 'authenticated', context: {} }

  const userMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4H0C2BDAxgBYCWAdmAHTKma7IAuhYp9x+u9YAxADIDyAcQEBRACKYAkgDkA2gAYAuolAAHAPaxirNaWUgAHogC0AVgCMFAOyWAzABYblkwBoQAT0QmbAX2+vUGDgEJOQUdIzMrOycELyCIuJ8AKoAKvJKSCDqmtq6mYYIZgBslhQAHOYmRQBMLu6ePr6upGoQcHoBWHhEZGB62VrEOnoFRmbVchQAnGZ2cjV1HghjJlMUJk0gnUE9odS0DEwsbBx9mQO5I8aW1dOz87WuS0Y3m9vdIZThR1GnEP0aQbDfLGOx2J6ICZrDa+bxAA */
createMachine<unknown, UserEvts, UserStates>({
  id: 'user_machine',
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      on: {
        LOGGED_IN: 'authenticated'
      }
    },
    authenticated: {
      on: {
        LOGGED_OUT: "unauthenticated"
      }
    },
  },
})

export default userMachine