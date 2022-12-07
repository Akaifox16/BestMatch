import { Sex, ThreeChoice, YesNo } from '@prisma/client'
import { z } from 'zod'
// Enum
const SexEnum = z.nativeEnum(Sex)
const YesNoEnum = z.nativeEnum(YesNo)
const ThreeChoiceEnum = z.nativeEnum(ThreeChoice)

export { SexEnum, YesNoEnum, ThreeChoiceEnum }
