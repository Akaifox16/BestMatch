import { type CalculatedPreference, prisma } from '@acme/database';
import type { ProfileAttributes } from '../../../utils/type';

type Input = {
  penalty: number;
  attr: ProfileAttributes;
};

type RenewWeightProfile = Pick<
  CalculatedPreference,
  'do_not_disturb_weight' | 'loudness_weight' | 'messiness_weight'
>;

type Tolerant = {
  max: number;
  min: number;
};

// TODO: impl weightNormalization
function weightNormalization(weight: number, tolerant: Tolerant): number {
  return -1;
}

// TODO: impl renewWeight
function renewWeight(
  attr: ProfileAttributes,
  normalizedNewWeight: number
): RenewWeightProfile {
  return {} as RenewWeightProfile;
}

// TODO: BM-8 | implement how to find student preference priority
export async function finetuneWeight(
  select: Input,
  comparer: Input,
  profile: CalculatedPreference
) {
  const newWeight = calculateNewWeight();
  const normalizedNewWeight = weightNormalization(newWeight);

  const newProfile = renewWeight(select.attr, normalizedNewWeight);

  try {
    await prisma.calculatedPreference.update({
      where: {
        id: profile.id,
      },
      data: {
        ...newProfile,
      },
    });
  } catch (e) {
    console.error(`Error: cannot update your preference profile`);
  }
}
