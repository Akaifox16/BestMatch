import { prisma } from '@acme/database';

import type { AddProfileDto } from '../student.dto';
import { InternalServerError } from '../../../utils/type';
import findRange from './findRange';

export default async function upsertProfile(
  userId: string,
  input: AddProfileDto
) {
  const profile = await prisma.profile.upsert({
    where: {
      owner_id: userId,
    },
    select: {
      messiness: true,
      loudness: true,
    },
    create: {
      ...input,
      owner_id: userId,
      do_not_disturb: {
        createMany: {
          data: findRange(input.do_not_disturb),
          skipDuplicates: true,
        },
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
    },
  });

  if (!profile) {
    throw InternalServerError('Fail to create your profile. please try again');
  }

  return {
    status: 'OK',
    msg: 'created successfully',
  };
}
