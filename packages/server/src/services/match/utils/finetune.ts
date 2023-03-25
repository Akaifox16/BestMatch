import { BadRequestError } from '../../../utils/type';
import updateWeights from '../../student/utils/updateWeights';
import type { Attribute, Weights } from '../match.dto';

type Penalty = number;
type SelectedArgs = {
  diff: number;
  attr: Attribute;
};

export default async function finetune(
  prefId: string,
  selectedPenalty: SelectedArgs,
  comparedPenalty: Penalty,
  weights: Weights
) {
  // const newWeight = ;

  const data = prepareAssignWeight(
    findWeightHelper(selectedPenalty.diff, comparedPenalty),
    selectedPenalty.attr
  );
  const normWeight = l2Norm({ ...weights, ...data });

  try {
    const updatedCalculatedProfile = await updateWeights(prefId, normWeight);
    return updatedCalculatedProfile;
  } catch (err) {
    throw BadRequestError(
      `data: ${JSON.stringify(data)} | selectedPenalty: ${JSON.stringify(
        selectedPenalty
      )} | ${JSON.stringify(comparedPenalty)}`
    );
  }
}

function findWeightHelper(
  selectedDiff: SelectedArgs['diff'],
  comparedPenalty: Penalty
): Penalty {
  const upper = comparedPenalty / selectedDiff;
  const lower = comparedPenalty / Math.abs(selectedDiff + 1);

  return Math.abs(upper - lower) / 2;
}

function l2Norm(weights: Weights): Weights {
  const square = (num: number) => Math.pow(num, 2);
  const sum = (acc: number, curr: number) => curr + acc;

  const weightSquareSum = Object.values(weights).map(square).reduce(sum, 0);
  const norm = Math.sqrt(weightSquareSum);
  const divideByNorm = (iter: number) => iter / norm;
  const newWeights = Object.values(weights).map(divideByNorm);

  return {
    messiness_weight: newWeights.at(0) || weights.messiness_weight,
    loudness_weight: newWeights.at(1) || weights.loudness_weight,
    do_not_disturb_weight: newWeights.at(2) || weights.do_not_disturb_weight,
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
