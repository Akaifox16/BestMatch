import { protectedProcedure } from '../../../trpc';

import { _prisma as prisma } from '@bm/database';
import { InternalServerError } from '../../../model/errors';
import { addProfileDto } from '../../../model/user';

const upsertProfile = protectedProcedure
  .input(addProfileDto)
  .mutation(async ({ input, ctx }) => {
    const profile = await prisma.profile.upsert({
      where: {
        owner_id: ctx.session.user.id,
      },
      select: {
        messiness: true,
        loudness: true,
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

    if (!profile) {
      throw InternalServerError(
        'Fail to create your profile. please try again'
      );
    }

    return {
      status: 'OK',
      msg: 'created successfully',
    };
  });

export default upsertProfile;
