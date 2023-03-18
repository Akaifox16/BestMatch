import { prisma } from '@acme/database';

export default async function getCalculatedWeights(ownerId: string) {
  try {
    const calculatedProfile = await prisma.calculatedPreference.findFirst({
      where: { owner_id: ownerId },
      select: {
        messiness_weight: true,
        loudness_weight: true,
        do_not_disturb_weight: true,
      },
    });

    return calculatedProfile;
  } catch (error) {
    console.error(error);
  }
}
