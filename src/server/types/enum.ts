import { Sex, YesNo } from '@prisma/client'
import { z } from 'zod'
// Enum
const SexEnum = z.nativeEnum(Sex)
const YesNoEnum = z.nativeEnum(YesNo)

export { SexEnum, YesNoEnum }
