import { DormTypePrefer, Sex, Zone } from '@prisma/client'
import { z } from 'zod'

// Enum
export const SexEnum = z.nativeEnum(Sex)

export const DormTypePreferEnum = z.nativeEnum(DormTypePrefer)

export const ZoneEnum = z.nativeEnum(Zone)
