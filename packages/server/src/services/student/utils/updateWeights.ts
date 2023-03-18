import type { Weights } from '../../match/match.dto';
import { prisma } from '@acme/database';

export default async function updateWeights(userId: string, weights: Weights) {
  try {
    const calc = await prisma.calculatedPreference.update({
      where: { owner_id: userId },
      data: weights,
    });

    return calc;
  } catch (err) {
    console.error(err);
  }
}
