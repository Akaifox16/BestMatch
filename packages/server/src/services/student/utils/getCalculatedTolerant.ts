import { prisma } from '@acme/database';

export default async function getCalculatedTolerant(userId: string) {
  try {
    const calculatedTolerant = await prisma.calculatedPreference.findFirst({
      where: { owner_id: userId },
      select: {
        messiness_tolerant_max: true,
        messiness_tolerant_min: true,

        loudness_tolerant_max: true,
        loudness_tolerant_min: true,

        do_not_disturb_tolerant: {
          select: {
            start_max: true,
            start_min: true,

            stop_max: true,
            stop_min: true,
          },
        },
      },
    });

    return calculatedTolerant;
  } catch (error) {
    console.error(error);
  }
}
