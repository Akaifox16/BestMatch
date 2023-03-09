import { prisma } from '@acme/database';

import { protectedProcedure } from '../../trpc';
import { NotFoundError, type ProfileAttributes } from '../../utils/type';
import { choicerInput, generatorInput, generatorOutput } from './match.dto';
import {
  calculatePenaltyHelper,
  findNewValue,
  finetuneWeight,
  generate,
  randomAttibute,
} from './utils';

export const findNewAttribute = protectedProcedure
  // .input(generatorOutput)
  // .output(generatorInput)
  .query(async ({ ctx }) => {
    const calcProf = await prisma.calculatedPreference.findFirst({
      where: { id: ctx.session.user.id },
      include: {
        do_not_disturb_tolerant: {
          select: {
            stop_max: true,
            stop_min: true,
            start_max: true,
            start_min: true,
          },
        },
      },
    });

    if (!calcProf)
      throw NotFoundError("user doesn't provide any preference yet");

    const attribute_pair = randomAttibute();
    const isMin = Math.random() < 0.5;
    const findValueHelper = (variant: ProfileAttributes) => {
      switch (variant) {
        case 'messiness':
          return findNewValue(
            variant,
            isMin
              ? calcProf.messiness_tolerant_min
              : calcProf.messiness_tolerant_max
          );
        case 'loudness':
          return findNewValue(
            variant,
            isMin
              ? calcProf.loudness_tolerant_min
              : calcProf.loudness_tolerant_max
          );
        // case 'do_not_disturb':
        // return findNewValue(variant, )
      }
    };

    const val_a = findValueHelper(attribute_pair[0]);
    const val_b = findValueHelper(attribute_pair[1]);

    return {
      attribute_pair,
      values: [val_a, val_b],
    };
  });

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
