// import { prisma } from '@acme/database';

import { addDormPrefDto } from '../../../model/user';
import { protectedProcedure } from '../../../trpc';

const upsertDormPreference = protectedProcedure
  .input(addDormPrefDto)
  .mutation(async () => {
    // const preference = await prisma.dormPreference.upsert({
    //   where: {
    //     owner_id: ctx.session.user.id,
    //   },
    //   select: {
    //     dorm_type: true,
    //     residents_limit: true,
    //     about_room_preference: {
    //       select: {
    //         zone: true,
    //         floor_number: true,
    //       },
    //     },
    //   },
    //   create: {},
    //   update: {},
    // });
    return {
      status: 'need implementation',
    };
  });

export default upsertDormPreference;
