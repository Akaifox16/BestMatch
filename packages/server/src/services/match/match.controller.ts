import { prisma } from '@acme/database';

import { protectedProcedure } from '../../trpc';
import { NotFoundError } from '../../utils/type';
import { profileGeneratorInput, profileGeneratorOutput } from './match.dto';

// TODO: BM-10 | implement how to mock up new profile
//               using calculated profile
export const profileGenerator = protectedProcedure
  .input(profileGeneratorInput)
  .output(profileGeneratorOutput)
  .query(async ({ input, ctx }) => {
    const profile = await prisma.profile.findFirst({
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

    if (profile === null)
      throw NotFoundError('sorry, missing information to generation profile');

    // TODO: change output type
    function newProfile(oldProfile: NonNullable<typeof profile>): {
      messiness: number;
      loudness: number;
      do_not_disturb: Array<string>;
    } {
      const dnd = oldProfile.do_not_disturb.map((t) => `${t.start}`);
      switch (input.attribute) {
        case 'messiness':
          return {
            ...oldProfile,
            messiness: input.value,
            do_not_disturb: dnd,
          };
        case 'loudness':
          return {
            ...oldProfile,
            loudness: input.value,
            do_not_disturb: dnd,
          };
        case 'do_not_disturb':
          return { ...oldProfile, do_not_disturb: input.value };
      }
    }

    const generateProfile = newProfile(profile);

    return generateProfile;
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
