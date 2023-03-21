import type { CalculatedPreference } from '@acme/database';
import { z } from 'zod';
import { addPrefDto } from '../student/student.dto';

const scale = z.number().max(9).min(1);
const timerange = z.array(z.string());

const attribute = z.union([
  z.literal('messiness'),
  z.literal('loudness'),
  z.literal('do_not_disturb'),
]);

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

const profile = addPrefDto.omit({ do_not_disturb: true }).merge(
  z.object({
    do_not_disturb: z.array(
      z.object({
        start: z.number(),
        stop: z.number(),
      })
    ),
    attribute,
  })
);

export const finetuneInput = z.object({
  selectedProfile: profile,
});

export const choicerInput = z.object({
  selectedProfile: profile,
  comparisonProfile: profile,
});

// WARN: change when update Profile entity
const profileSchema = z.object({
  messiness: z.number(),
  loudness: z.number(),
  do_not_disturb: z.array(z.string()),
  attribute,
});

export const generatorOutput = z.object({
  profile_a: profileSchema,
  profile_b: profileSchema,
});

export type Profile = z.TypeOf<typeof profile>;
export type ProfileForm = z.TypeOf<typeof addPrefDto>;
export type Weights = Pick<
  CalculatedPreference,
  'messiness_weight' | 'loudness_weight' | 'do_not_disturb_weight'
>;
export type Attribute = z.TypeOf<typeof attribute>;
