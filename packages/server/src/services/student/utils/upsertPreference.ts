import { prisma } from '@acme/database';

import { InternalServerError } from '../../../utils/type';
import type { AddPrefDto } from '../student.dto';
import findRange from './findRange';

export default async function upsertPreference(
  userId: string,
  input: AddPrefDto
) {
  const data = {
    messiness_weight: 1,
    loudness_weight: 1,
    do_not_disturb_weight: 1,

    messiness_tolerant_max: input.messiness + 2,
    messiness_tolerant_min: input.messiness - 1,

    loudness_tolerant_max: input.loudness + 2,
    loudness_tolerant_min: input.loudness,

    do_not_disturb_tolerant: {
      createMany: {
        data: findRange(input.do_not_disturb).map((time) => {
          return {
            start_max: time.start + 1,
            start_min: time.start,

            stop_max: time.stop + 2,
            stop_min: time.stop - 1,
          };
        }),
        skipDuplicates: true,
      },
    },
  };

  try {
    const preference = await prisma.profile.upsert({
      where: {
        pref_owner_id: userId,
      },
      select: {
        messiness: true,
        loudness: true,
        do_not_disturb: true,
        has_calculated_preference: {
          select: {
            messiness_weight: true,
            loudness_weight: true,
            do_not_disturb_weight: true,

            messiness_tolerant_max: true,
            messiness_tolerant_min: true,

            loudness_tolerant_max: true,
            loudness_tolerant_min: true,

            do_not_disturb_tolerant: {
              select: {
                start_max: true,
                start_min: true,

                stop_max: true,
                stop_min: true,
              },
            },
          },
        },
      },
      create: {
        ...input,
        pref_owner_id: userId,
        do_not_disturb: {
          createMany: {
            data: findRange(input.do_not_disturb),
            skipDuplicates: true,
          },
        },
        has_calculated_preference: {
          create: data,
        },
      },
      update: {
        ...input,
        do_not_disturb: {
          createMany: {
            data: findRange(input.do_not_disturb),
            skipDuplicates: true,
          },
        },
        has_calculated_preference: {
          create: data,
        },
      },
    });

    if (!preference) {
      throw InternalServerError(
        'Fail to create your roommate preference, please try again'
      );
    }

    return preference;
  } catch (err) {
    throw InternalServerError(`${err}`);
  }
}
