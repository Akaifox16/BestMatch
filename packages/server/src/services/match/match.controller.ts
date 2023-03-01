import { prisma } from '@acme/database';

import { protectedProcedure } from '../../trpc';
import { randomAttibute } from '../../utils/randomAttribute';
import { NotFoundError } from '../../utils/type';
import {
  finetuneInput,
  profileGeneratorInput,
  profileGeneratorOutput,
} from './match.dto';

// TODO: BM-10 | test profileGenerator
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

// TODO: BM-8 | implement how to find student preference priority
export const finetuner = protectedProcedure
  .input(finetuneInput)
  .mutation(({ input, ctx }) => {
    const;
    return {
      message: 'need implementation',
    };
  });

// TODO: BM-9 | notify other to which profile the student chooose
export const choose_A_or_B = protectedProcedure.mutation(() => {
  return {
    message: 'need implementation',
  };
});

export const generateProfile = protectedProcedure.query(
  async ({
    ctx: {
      session: { user },
    },
  }) => {
    const [attr_a, attr_b] = randomAttibute();

    // FIX: impl generate function base on generateProfile proc
    const [profile_a, profile_b] = await Promise.all([
      generate(user.id, attr_a),
      generate(user.id, attr_b),
    ]);

    return {
      profile_a,
      profile_b,
    };
  }
);

// TODO: impl pickedProfile
export const pickedProfile = protectedProcedure.mutation(
  async ({
    ctx: {
      session: { user },
    },
  }) => {
    return {
      msg: 'need implementation',
    };
  }
);
