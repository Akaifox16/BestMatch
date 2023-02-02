import { protectedProcedure } from '@src/trpc';
import { addPrefDto } from '@src/model/user';
import { InternalServerError } from '@src/model/errors';

import { prisma } from '@bm/database';

const addPreference = protectedProcedure
  .input(addPrefDto)
  .mutation(async ({ input, ctx }) => {
    const preference = await prisma.profile.upsert({
      where: {
        pref_owner_id: ctx.session.user.id,
      },
      select: {
        messiness: true,
        loudness: true,
        do_not_disturb: true,
      },
      create: {
        ...input,
        do_not_disturb: {
          createMany: {
            data: input.do_not_disturb,
            skipDuplicates: true,
          },
        },
      },
      update: {
        ...input,
        do_not_disturb: {
          createMany: {
            data: input.do_not_disturb,
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
  });

export default addPreference;
