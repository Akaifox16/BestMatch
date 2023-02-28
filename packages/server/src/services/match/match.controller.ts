import { prisma } from '@acme/database';

import { protectedProcedure } from '../../trpc';
import { NotFoundError } from '../../model/errors';

// TODO: BM-10 | implement how to mock up new profile
//               using calculated profile
export const profileGenerator = protectedProcedure.query(async ({ ctx }) => {
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

// TODO: implement how to find student preference priority
export const finetuner = protectedProcedure.mutation(() => {
  return {
    message: 'need implementation',
  };
});

// TODO: notify other to which profile the student chooose
export const choose_A_or_B = protectedProcedure.mutation(() => {
  return {
    message: 'need implementation',
  };
});