import { z } from 'zod';
import { addPrefDto } from '../student/student.dto';

// WARN: change when ProfileAttributes
export const profileGeneratorInput = z.union([
  z.object({
    attribute: z.union([z.literal('messiness'), z.literal('loudness')]),
    value: z.number().max(9).min(1),
  }),
  z.object({
    attribute: z.literal('do_not_disturb'),
    value: z.array(z.string()),
  }),
]);

export const finetuneInput = z.object({
  selectedProfile: addPrefDto,
});

export const choicerInput = z.object({
  selectedProfile: addPrefDto,
  comparisonProfile: addPrefDto,
});

// WARN: change when update Profile entity
export const profileGeneratorOutput = z.object({
  messiness: z.number(),
  loudness: z.number(),
  do_not_disturb: z.array(z.string()),
});

export type ProfileGeneratorOutput = typeof profileGeneratorOutput;
