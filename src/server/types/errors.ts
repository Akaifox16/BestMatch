import { TRPCError } from '@trpc/server'

const ExistingUserError = new TRPCError({
	code: 'CONFLICT',
	message: 'Try to create duplicate user',
})

export {
  ExistingUserError,
}