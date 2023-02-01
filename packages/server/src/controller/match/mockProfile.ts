import { publicProcedure } from "@server/trpc";
import { prisma } from "@server/db";
import { NotFoundError } from "@server/model/errors";

const mockProfile = publicProcedure.query(async () => {
  const userId = "cld1ns6f80000qt54q7jf81ej";

  const matePref = await prisma.profile.findFirst({
    where: {
      pref_owner_id: userId,
    },
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

  if (!matePref) {
    throw NotFoundError("sorry, we did't found your roommate preference");
  }

  const generatedProfile: (typeof matePref)[] = [
    { ...matePref, messiness: matePref.messiness + 1 },
    { ...matePref, loudness: matePref.loudness + 1 },
    {
      ...matePref,
      do_not_disturb: matePref.do_not_disturb.map((range) => {
        return {
          start: range.start + 1,
          stop: range.stop - 1,
        };
      }),
    },
  ];

  return generatedProfile;
});

export default mockProfile;
