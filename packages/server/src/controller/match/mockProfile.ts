import { prisma } from '@acme/database';

import { protectedProcedure } from '../../trpc';
import { NotFoundError } from '../../model/errors';

const mockProfile = protectedProcedure.query(async ({ ctx }) => {
  const matePref = await prisma.profile.findFirst({
    where: {
      pref_owner_id: ctx.session.user.id,
    },
    select: {
      messiness: true,
      loudness: true,
      do_not_disturb: {
        select: {
          start: true,
          stop: true,
        },
      },
    },
  });

  if (!matePref) {
    throw NotFoundError("sorry, we did't found your roommate preference");
  }

  const generatedProfile: (typeof matePref)[] = [
    { ...matePref, messiness: matePref.messiness + 1 },
    { ...matePref, loudness: matePref.loudness + 1 },
    {
      ...matePref,
      do_not_disturb: matePref.do_not_disturb.map((range) => {
        return {
          start: range.start + 1,
          stop: range.stop - 1,
        };
      }),
    },
  ];

  return generatedProfile;
});

export default mockProfile;
