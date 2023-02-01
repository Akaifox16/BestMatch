import { publicProcedure } from '@server/trpc';
import { findById, userResponse } from '@server/model/user';

import { prisma } from '@server/db';

const getProfile = publicProcedure
  .input(findById)
  .output(userResponse.nullable())
  .query(async ({ input }) => {
    const user = await prisma.user.findFirst({
      select: {
        first_name: true,
        last_name: true,
        email: true,
        personal_id: true,
        sex: true,
      },
      where: {
        id: input,
      },
    });

    return user;
  });

export default getProfile;
