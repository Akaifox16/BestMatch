import { prisma } from '@acme/database';
import { InternalServerError, NotFoundError } from '../../utils/type';

import { protectedProcedure } from '../../trpc';
import {
  addDormPrefDto,
  addPrefDto,
  addProfileDto,
  bookRoomDto,
} from './student.dto';

// TODO: impl upsertDormPreference
export const upsertDormPreference = protectedProcedure
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

export const getProfile = protectedProcedure.query(async ({ ctx }) => {
  const user = await prisma.user.findFirst({
    select: {
      first_name: true,
      last_name: true,
      email: true,
      personal_id: true,
      sex: true,
    },
    where: {
      id: ctx.session.user.id,
    },
  });

  return user;
});

export const getPreference = protectedProcedure.query(async ({ ctx }) => {
  const pref = await prisma.profile.findFirst({
    where: {
      pref_owner_id: ctx.session.user.id,
    },
  });

  if (!pref) throw NotFoundError("user doesn't specify preference yet");

  return pref;
});

// TODO: implement get user role
export const getRole = protectedProcedure.query(async () => {
  return {
    message: 'need implementation',
  };
});

// TODO: impl upsertPreference
export const upsertPreference = protectedProcedure
  .input(addPrefDto)
  .mutation(async ({ input, ctx }) => {
    const preference = {};
    // const preference = await prisma.profile.upsert({
    //   where: {
    //     pref_owner_id: ctx.session.user.id,
    //   },
    //   select: {
    //     messiness: true,
    //     loudness: true,
    //     do_not_disturb: true,
    //   },
    //   create: {
    //     ...input,
    //     do_not_disturb: {
    //       createMany: {
    //         data: input.do_not_disturb,
    //         skipDuplicates: true,
    //       },
    //     },
    //   },
    //   update: {
    //     ...input,
    //     do_not_disturb: {
    //       createMany: {
    //         data: input.do_not_disturb,
    //         skipDuplicates: true,
    //       },
    //     },
    //   },
    // });

    if (!preference) {
      throw InternalServerError(
        'Fail to create your roommate preference, please try again'
      );
    }

    return preference;
  });

export const upsertProfile = protectedProcedure
  .input(addProfileDto)
  .mutation(async ({ input, ctx }) => {
    const profile = await prisma.profile.upsert({
      where: {
        owner_id: ctx.session.user.id,
      },
      select: {
        messiness: true,
        loudness: true,
      },
      create: {
        ...input,
        do_not_disturb: {
          createMany: {
            data: { start: 0, stop: 23 },
            skipDuplicates: true,
          },
        },
      },
      update: {
        ...input,
        do_not_disturb: {
          createMany: {
            data: { start: 0, stop: 23 },
            skipDuplicates: true,
          },
        },
      },
    });

    if (!profile) {
      throw InternalServerError(
        'Fail to create your profile. please try again'
      );
    }

    return {
      status: 'OK',
      msg: 'created successfully',
    };
  });

export const bookRoom = protectedProcedure
  .input(bookRoomDto)
  .mutation(async ({ input }) => {
    const userId = 'this-should-be-user-cuid';

    const room = await prisma.user
      .update({
        data: input,
        where: {
          id: userId,
        },
      })
      .lived_in();

    if (!room) throw NotFoundError("this user doesn't existed");

    return {
      message: `user booked room ${room.room_number} successfully!!`,
      room_no: room.room_number,
    };
  });
