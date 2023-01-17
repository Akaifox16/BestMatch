import { Sex } from '@prisma/client'
import { z } from 'zod'

// Enum
export const SexEnum = z.nativeEnum(Sex)
