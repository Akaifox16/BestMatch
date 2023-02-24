import { prisma } from '@acme/database';

import { protectedProcedure } from '../../trpc';
import { NotFoundError } from '../../model/errors';

const RANGE_MIN = 1 as const;
const RANGE_MAX = 9 as const;

// TODO: BM-92 | implement findNewValue when given the old one
function findNewValue(
  val: number,
  picked: boolean,
  variant: 'messiness' | 'loudness' | 'do_not_disturb'
): number {
  switch (variant) {
    case 'messiness':
    case 'loudness':
      if (picked) {
        return Math.floor((RANGE_MAX - val) / 2);
      } else {
        return Math.floor((val - RANGE_MIN) / 2);
      }
    // TODO: BM-92 | find new value for do_not_disturb
    case 'do_not_disturb':
      return 0;
    default:
      return -1;
  }
}

// TODO: BM-10 | implement how to mock up new profile
//               using calculated profile
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
