import { prisma } from '@acme/database';
import { InternalServerError, NotFoundError } from '../../utils/type';

import { protectedProcedure } from '../../trpc';
import {
  addDormPrefDto,
  addPrefDto,
  addProfileDto,
  bookRoomDto,
} from './student.dto';
import {
  getDormPreference,
  getPreference,
  upsertCalculatedProfile,
  upsertDormPreference,
  upsertPreference,
  upsertProfile,
} from './utils';
import { TRPCError } from '@trpc/server';

export const upsertDormPreferenceController = protectedProcedure
  .input(addDormPrefDto)
  .mutation(
    async ({
      ctx: {
        session: { user },
      },
      input,
    }) => {
      try {
        const dormPref = await upsertDormPreference(user.id, input);

        return dormPref;
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        throw InternalServerError(
          'something wrong with create/update dorm preference'
        );
      }
    }
  );

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

export const getPreferenceController = protectedProcedure.query(
  async ({ ctx }) => {
    const pref = await getPreference(ctx.session.user.id);

    if (!pref) throw NotFoundError("user doesn't specify preference yet");

    return pref;
  }
);

export const getDormPreferenceController = protectedProcedure.query(
  async ({ ctx }) => {
    try{
      return await getDormPreference(ctx.session.user.id)
    } catch(err) {
      if (err instanceof TRPCError) throw err

      throw InternalServerError('something wrong when fetching dorm preference')
    }
  }
)

// TODO: implement get user role
export const getRole = protectedProcedure.query(async () => {
  return {
    message: 'need implementation',
  };
});

export const upsertPreferenceController = protectedProcedure
  .input(addPrefDto)
  .mutation(async ({ input, ctx }) => {
    try {
      const preference = await upsertPreference(ctx.session.user.id, input);
      await upsertCalculatedProfile(ctx.session.user.id, preference);

      return preference;
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      throw InternalServerError('Something wrong with preference');
    }
  });

export const upsertProfileController = protectedProcedure
  .input(addProfileDto)
  .mutation(async ({ input, ctx }) => {
    try {
      const status = await upsertProfile(ctx.session.user.id, input);

      return status;
    } catch (err) {
      if (err instanceof TRPCError) throw err;
    }
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
