import { publicProcedure } from '../../../trpc';
import { findByIdDto } from '../../../model/user';

import { _prisma as prisma } from '@bm/database';

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
