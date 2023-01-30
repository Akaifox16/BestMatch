import { TRPCError } from '@trpc/server';

const ConflictError = (msg: string) =>
  new TRPCError({
    code: 'CONFLICT',
    message: msg,
  });

const InternalServerError = (msg: string) =>
  new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: msg,
  });

const NotFoundError = (msg: string) =>
  new TRPCError({
    code: 'NOT_FOUND',
    message: msg,
  });

const UnAutorizedError = (msg: string) =>
  new TRPCError({
    code: 'UNAUTHORIZED',
    message: msg,
  });

export { ConflictError, InternalServerError, NotFoundError, UnAutorizedError };
