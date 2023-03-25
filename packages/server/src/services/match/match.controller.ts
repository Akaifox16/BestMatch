import { protectedProcedure } from '../../trpc';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../../utils/type';

import {
  getCalculatedWeights,
  getCalculatedTolerant,
  getPreference,
} from '../student/utils';

import {
  penaltyCalculator,
  finetuningNewWeight,
  diffCalculator,
  randomAttributePair,
  newValue,
  mockProfileHelper,
} from './utils';
import { choicerInput, generatorOutput } from './match.dto';

export const generateProfile = protectedProcedure.output(generatorOutput).query(
  async ({
    ctx: {
      session: { user },
    },
  }) => {
    const [attrA, attrB] = randomAttributePair();
    const preference = await getPreference(user.id);
    if (!preference)
      throw InternalServerError(
        `error when trying to get information to generate new profile`
      );

    const tolerants = await getCalculatedTolerant(preference.id);
    if (!tolerants)
      throw InternalServerError(
        `error when trying to get information to generate new profile`
      );

    const fixedTolerant = {
      ...tolerants,
      do_not_disturb: tolerants.do_not_disturb_tolerant[0],
    };

    const isMin = Math.floor(Math.random() * 100) < 50;
    const [newAttributeA, newAttributeB] = await Promise.all([
      newValue(attrA, isMin, fixedTolerant, preference),
      newValue(attrB, isMin, fixedTolerant, preference),
    ]);

    const [profileA, profileB] = await Promise.all([
      mockProfileHelper(user.id, newAttributeA, attrA),
      mockProfileHelper(user.id, newAttributeB, attrB),
    ]);
    if (!profileA || !profileB)
      throw InternalServerError('error when mocking new profile');

    return {
      profile_a: { ...profileA, attribute: attrA },
      profile_b: { ...profileB, attribute: attrB },
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
    const preference = await getPreference(user.id);
    if (!preference)
      throw NotFoundError(
        `can't calculated preference due to missing calculation component`
      );
    const weights = await getCalculatedWeights(preference.id);
    if (!weights)
      throw NotFoundError(
        `can't calculated preference due to missing calculation component`
      );

    const selectedDiff = diffCalculator(input.selectedProfile, preference);
    // throw NotFoundError(`selectedDiff: ${selectedDiff}`);
    if (selectedDiff === 0)
      return {
        message: 'you selected your preference profile',
        status: 200,
      };
    const comparedPenalty = penaltyCalculator(
      input.comparisonProfile,
      preference,
      weights
    );
    if (comparedPenalty === 0)
      throw BadRequestError(
        `you didn't picked your preference profile: ${comparedPenalty} ${selectedDiff}`
      );

    try {
      const updatedCalculatedProfile = await finetuningNewWeight(
        preference.id,
        { diff: selectedDiff, attr: input.selectedProfile.attribute },
        comparedPenalty,
        weights
      );
      if (!updatedCalculatedProfile)
        throw InternalServerError(`something wrong when finetuning`);

      return {
        message: 'profile picked and has been finetuned weights',
        status: 200,
      };
    } catch (err) {
      throw InternalServerError(`cannot finetuning new weight: ${err}`);
    }
  }
);
