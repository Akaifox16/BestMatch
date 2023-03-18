import { prisma } from '@acme/database';

export default async function getPreference(ownerId: string) {
  try {
    const preference = await prisma.profile.findFirst({
      where: { pref_owner_id: ownerId },
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

    return preference;
  } catch (err) {
    console.error(err);
  }
}
