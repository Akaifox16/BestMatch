import { publicProcedure } from '@src/trpc';
import { findByIdDto } from '@src/model/user';

import { prisma } from '@acme/database';

const getProfile = publicProcedure
  .input(findByIdDto)
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
