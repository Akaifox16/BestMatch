import {
  prisma,
  type CalculatedPreference,
  type DoNotDisturbTolerant,
} from '@acme/database';
import type { ProfileAttributes } from '../../../utils/type';

type Input = {
  penalty: number;
  attr: ProfileAttributes;
};
type RenewWeightProfile = Partial<
  Pick<
    CalculatedPreference,
    'do_not_disturb_weight' | 'loudness_weight' | 'messiness_weight'
  >
>;
type CalculatedPreferenceWithDoNotDisturb = CalculatedPreference & {
  do_not_disturb_tolerant: DoNotDisturbTolerant;
};

type Tolerant = {
  max: number;
  min: number;
};
type NormalizationInput = {
  weight: number;
  tolerant: Tolerant;
};

// TODO: BM-8 | implement how to find student preference priority
export async function finetuneWeight(
  select: Input,
  comparer: Input,
  profile: CalculatedPreferenceWithDoNotDisturb
) {
  const selected_tolerant = getTolerant(select.attr, profile);
  const comparer_tolerant = getTolerant(comparer.attr, profile);

  const normalizedNewWeight = weightNormalization(
    selected_tolerant,
    comparer_tolerant
  );
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

// TODO: impl weightNormalization
function weightNormalization(
  selected: NormalizationInput,
  comparer: NormalizationInput
) {
  // const
  return -1;
}

// TODO: impl renewWeight
function renewWeight(
  attr: ProfileAttributes,
  normalizedNewWeight: number
): RenewWeightProfile {
  switch (attr) {
    case 'messiness':
      return {
        messiness_weight: normalizedNewWeight,
      };
    case 'loudness':
      return {
        loudness_weight: normalizedNewWeight,
      };
    case 'do_not_disturb':
      return {
        do_not_disturb_weight: normalizedNewWeight,
      };
    default:
      throw new Error('receive unexpected attribute');
  }
}

function getTolerant(
  attr: ProfileAttributes,
  profile: CalculatedPreferenceWithDoNotDisturb
): NormalizationInput {
  return attr === 'messiness'
    ? {
        tolerant: {
          min: profile.messiness_tolerant_min,
          max: profile.messiness_tolerant_max,
        },
        weight: profile.messiness_weight,
      }
    : attr === 'loudness'
    ? {
        tolerant: {
          min: profile.loudness_tolerant_min,
          max: profile.loudness_tolerant_max,
        },
        weight: profile.loudness_weight,
      }
    : {
        tolerant: {
          min: profile.do_not_disturb_tolerant.start_min,
          max: profile.do_not_disturb_tolerant.stop_max,
        },
        weight: profile.do_not_disturb_weight,
      };
}
