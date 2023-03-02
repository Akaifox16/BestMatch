import { prisma } from '@acme/database';

import { protectedProcedure } from '../../trpc';
import { NotFoundError } from '../../utils/type';
import { choicerInput, generatorInput, generatorOutput } from './match.dto';
import { calculatePenaltyHelper, finetuneWeight, generate } from './utils';

export const generateProfile = protectedProcedure
  .input(generatorInput)
  .output(generatorOutput)
  .query(
    async ({
      input,
      ctx: {
        session: { user },
      },
    }) => {
      const { attribute_pair, values } = input;

      const [profile_a, profile_b] = await Promise.all([
        generate(user.id, attribute_pair[0], values[0]),
        attribute_pair[1] === 'do_not_disturb'
          ? generate(user.id, attribute_pair[1], values[1] as Array<string>)
          : generate(user.id, attribute_pair[1], values[1] as number),
      ]);

      return {
        profile_a,
        profile_b,
      };
    }
  );

// TODO: BM-9 | test pickedProfile
export const pickedProfile = protectedProcedure.input(choicerInput).mutation(
  async ({
    input,
    ctx: {
      session: { user },
    },
  }) => {
    const getProfile = prisma.profile.findFirst({
      where: { pref_owner_id: user.id },
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

    const getCalcProfile = prisma.calculatedPreference.findFirst({
      where: { owner_id: user.id },
      include: { do_not_disturb_tolerant: true },
    });

    const [preference, calcProfile] = await Promise.all([
      getProfile,
      getCalcProfile,
    ]);

    if (!preference)
      throw NotFoundError('you have not provide roommate preference yet');
    if (!calcProfile) throw NotFoundError('missing component to finetuning');

    const pref = {
      ...preference,
      do_not_disturb: preference.do_not_disturb[0],
    };

    // FIX: use the real attribute
    const pickedProfile = {
      attr: 'do_not_disturb',
      penalty: calculatePenaltyHelper(calcProfile, pref, input.selectedProfile),
    } satisfies Parameters<typeof finetuneWeight>[0];

    const compareProfile = {
      attr: 'messiness',
      penalty: calculatePenaltyHelper(
        calcProfile,
        pref,
        input.comparisonProfile
      ),
    } satisfies Parameters<typeof finetuneWeight>[1];

    finetuneWeight(pickedProfile, compareProfile, {
      ...calcProfile,
      do_not_disturb_tolerant: calcProfile.do_not_disturb_tolerant[0],
    });

    return {
      code: 200,
      msg: 'finetuning successfully',
    };
  }
);
