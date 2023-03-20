import { prisma } from '@acme/database';
import { InternalServerError } from '../../../utils/type';

import type upsertPreference from './upsertPreference';

type Preference = Awaited<ReturnType<typeof upsertPreference>>;

export default async function upsertCalculatedProfile(
  ownerId: string,
  preference: Preference
) {
  const data = {
    messiness_weight: 1,
    loudness_weight: 1,
    do_not_disturb_weight: 1,

    messiness_tolerant_max: preference.messiness + 2,
    messiness_tolerant_min: preference.messiness - 1,

    loudness_tolerant_max: preference.loudness + 2,
    loudness_tolerant_min: preference.loudness,

    do_not_disturb_tolerant: {
      createMany: {
        data: preference.do_not_disturb.map((time) => {
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

  const calculatedProfile = await prisma.calculatedPreference.upsert({
    where: {
      owner_id: ownerId,
    },
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
    create: {
      ...data,
      owner_id: ownerId,
    },
    update: data,
  });
  if (!calculatedProfile) throw InternalServerError('missing componnent');

  return calculatedProfile;
}
