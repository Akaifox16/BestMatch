import updateWeights from '../../student/utils/updateWeights';
import type { Attribute, Weights } from '../match.dto';

type Penalty = number;
type SelectedArgs = {
  diff: number;
  attr: Attribute;
};

export default async function finetune(
  userId: string,
  selectedPenalty: SelectedArgs,
  comparedPenalty: Penalty,
  weights: Weights
) {
  const newWeight = findWeightHelper(selectedPenalty.diff, comparedPenalty);

  const data = prepareAssignWeight(newWeight, selectedPenalty.attr);
  const normWeight = l2Norm({ ...weights, ...data });

  const updatedCalculatedProfile = await updateWeights(userId, normWeight);
  return updatedCalculatedProfile;
}

function findWeightHelper(
  selectedDiff: SelectedArgs['diff'],
  comparedPenalty: Penalty
): Penalty {
  const upper = comparedPenalty / selectedDiff;
  const lower = comparedPenalty / (selectedDiff - 1);

  return (upper - lower) / 2;
}

function l2Norm(weights: Weights): Weights {
  const square = (num: number) => Math.pow(num, 2);
  const sum = (acc: number, curr: number) => curr + acc;

  const weightSquareSum = Object.values(weights).map(square).reduce(sum, 0);
  const norm = Math.sqrt(weightSquareSum);
  const divideByNorm = (iter: number) => iter / norm;
  const newWeights = Object.values(weights).map(divideByNorm);

  return {
    messiness_weight: newWeights[0],
    loudness_weight: newWeights[1],
    do_not_disturb_weight: newWeights[2],
  };
}

function prepareAssignWeight(
  weight: number,
  attr: Attribute
): Partial<Weights> {
  switch (attr) {
    case 'messiness':
      return { messiness_weight: weight };
    case 'loudness':
      return { loudness_weight: weight };
    case 'do_not_disturb':
      return { do_not_disturb_weight: weight };
  }
}
