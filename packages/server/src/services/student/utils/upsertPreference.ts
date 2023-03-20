import { prisma } from '@acme/database';

import { InternalServerError } from '../../../utils/type';
import type { AddPrefDto } from '../student.dto';

export default async function upsertPreference(
  userId: string,
  input: AddPrefDto
) {
  const preference = await prisma.profile.upsert({
    where: {
      pref_owner_id: userId,
    },
    select: {
      messiness: true,
      loudness: true,
      do_not_disturb: true,
    },
    create: {
      ...input,
      pref_owner_id: userId,
      do_not_disturb: {
        createMany: {
          data: input.do_not_disturb.map((time) => {
            const start = Number(time);
            return {
              start: start,
              stop: start + 1,
            };
          }),
          skipDuplicates: true,
        },
      },
    },
    update: {
      ...input,
      do_not_disturb: {
        createMany: {
          data: input.do_not_disturb.map((time) => {
            const start = Number(time);
            return {
              start: start,
              stop: start + 1,
            };
          }),
          skipDuplicates: true,
        },
      },
    },
  });

  if (!preference) {
    throw InternalServerError(
      'Fail to create your roommate preference, please try again'
    );
  }

  return preference;
}
