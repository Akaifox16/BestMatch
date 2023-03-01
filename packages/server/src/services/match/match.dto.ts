import { z } from 'zod';
import { addPrefDto } from '../student/student.dto';

const scale = z.number().max(9).min(1);
const timerange = z.array(z.string());

// WARN: change when ProfileAttributes
export const generatorInput = z.union([
  z.object({
    attribute_pair: z.tuple([z.literal('messiness'), z.literal('loudness')]),
    values: z.tuple([scale, scale]),
  }),
  z.object({
    attribute_pair: z.tuple([
      z.literal('messiness'),
      z.literal('do_not_disturb'),
    ]),
    values: z.tuple([scale, timerange]),
  }),
  z.object({
    attribute_pair: z.tuple([
      z.literal('loudness'),
      z.literal('do_not_disturb'),
    ]),
    values: z.tuple([scale, timerange]),
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
const profileSchema = z.object({
  messiness: z.number(),
  loudness: z.number(),
  do_not_disturb: z.array(z.string()),
});

export const generatorOutput = z.object({
  profile_a: profileSchema,
  profile_b: profileSchema,
});
