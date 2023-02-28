import { DormTypePrefer, Sex, Zone } from '@acme/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

// Common Types
// TODO: pick from Profile @acme/database
// WARN: change profileAttributes when this changed
export type ProfileAttributes = 'messiness' | 'loudness' | 'do_not_disturb';

// Enum
export const SexEnum = z.nativeEnum(Sex);

export const DormTypePreferEnum = z.nativeEnum(DormTypePrefer);

export const ZoneEnum = z.nativeEnum(Zone);

// Error
export const ConflictError = (msg: string) =>
  new TRPCError({
    code: 'CONFLICT',
    message: msg,
  });

export const InternalServerError = (msg: string) =>
  new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: msg,
  });

export const NotFoundError = (msg: string) =>
  new TRPCError({
    code: 'NOT_FOUND',
    message: msg,
  });

export const UnAutorizedError = (msg: string) =>
  new TRPCError({
    code: 'UNAUTHORIZED',
    message: msg,
  });
