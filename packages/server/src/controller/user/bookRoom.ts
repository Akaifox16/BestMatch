import { publicProcedure } from '@src/trpc';
import { prisma } from '@acme/database';
import { bookRoomDto } from '@src/model/user';
import { NotFoundError } from '@src/model/errors';

const bookRoom = publicProcedure
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

export default bookRoom;
