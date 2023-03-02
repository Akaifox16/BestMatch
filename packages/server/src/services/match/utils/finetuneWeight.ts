import {
  prisma,
  type CalculatedPreference,
  type DoNotDisturbTolerant,
} from '@acme/database';
import { type ProfileAttributes } from '../../../utils/type';

type Penalty = number;
type Input = {
  penalty: Penalty;
  attr: ProfileAttributes;
};
type RenewWeightProfile = Pick<
  CalculatedPreference,
  'do_not_disturb_weight' | 'loudness_weight' | 'messiness_weight'
>;
type CalculatedPreferenceWithDoNotDisturb = CalculatedPreference & {
  do_not_disturb_tolerant: DoNotDisturbTolerant;
};

type Tolerant = {
  max: number;
  min: number;
};
type NormalizationInput = {
  attr: ProfileAttributes;
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

  const old_diff = select.penalty / selected_tolerant.weight;
  const new_diff = old_diff + newBound(selected_tolerant);
  const newWeight = findNewWeight(old_diff, new_diff, comparer.penalty);

  const normalizedNewWeight = weightNormalization(
    selected_tolerant,
    newWeight,
    profile
  );

  try {
    await prisma.calculatedPreference.update({
      where: {
        id: profile.id,
      },
      data: {
        ...normalizedNewWeight,
      },
    });
  } catch (e) {
    console.error(`Error: cannot update your preference profile`);
  }
}

function newBound(selected: NormalizationInput): number {
  const SLIDER_MAX = 9 as const;
  const RANGE_MAX = 23 as const;

  switch (selected.attr) {
    case 'messiness':
    case 'loudness':
      return Math.abs(SLIDER_MAX - selected.tolerant.max) / 2;

    case 'do_not_disturb':
      return Math.abs(RANGE_MAX - selected.tolerant.max) / 2;

    default:
      throw new Error('exceed case for switching');
  }
}

type Weight = number;
type WeightVector = [Weight, Weight, Weight];

function l2Norm(vector: WeightVector): WeightVector {
  const [w1, w2, w3] = vector;

  const square = (x: Weight) => Math.pow(x, 2);
  const divider = Math.sqrt(square(w1) + square(w2) + square(w3));

  return [w1 / divider, w2 / divider, w3 / divider];
}

type L2NormArgs = Parameters<typeof l2Norm>[0];

function weightNormalization(
  selected: NormalizationInput,
  newWeight: Weight,
  profile: CalculatedPreference
): RenewWeightProfile {
  const { messiness_weight, loudness_weight, do_not_disturb_weight } = profile;
  const weight_to_normalize = renewWeight(selected.attr, newWeight, [
    messiness_weight,
    loudness_weight,
    do_not_disturb_weight,
  ]);
  const normWeight = l2Norm(weight_to_normalize);

  return {
    messiness_weight: normWeight[0],
    loudness_weight: normWeight[1],
    do_not_disturb_weight: normWeight[2],
  } satisfies RenewWeightProfile;
}

// TODO: impl findNewWeight
function findNewWeight(
  selected_diff: number,
  new_selected_diff: number,
  comparer_penalty: Penalty
): Weight {
  const newWeight =
    (comparer_penalty / selected_diff - comparer_penalty / new_selected_diff) /
    2;
  if (newWeight * new_selected_diff > comparer_penalty) return newWeight;
  else return -1;
}

function renewWeight(
  attr: ProfileAttributes,
  newWeight: Weight,
  weightVector: WeightVector
): L2NormArgs {
  switch (attr) {
    case 'messiness':
      return [newWeight, weightVector[1], weightVector[2]];
    case 'loudness':
      return [weightVector[0], newWeight, weightVector[2]];
    case 'do_not_disturb':
      return [weightVector[0], weightVector[1], newWeight];
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
        attr: 'messiness',
        tolerant: {
          min: profile.messiness_tolerant_min,
          max: profile.messiness_tolerant_max,
        },
        weight: profile.messiness_weight,
      }
    : attr === 'loudness'
    ? {
        attr: 'loudness',
        tolerant: {
          min: profile.loudness_tolerant_min,
          max: profile.loudness_tolerant_max,
        },
        weight: profile.loudness_weight,
      }
    : {
        attr: 'do_not_disturb',
        tolerant: {
          min: profile.do_not_disturb_tolerant.start_min,
          max: profile.do_not_disturb_tolerant.stop_max,
        },
        weight: profile.do_not_disturb_weight,
      };
}
