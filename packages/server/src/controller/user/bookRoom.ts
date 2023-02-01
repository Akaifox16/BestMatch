import { publicProcedure } from '@server/trpc';
import { prisma } from '@server/db';
import { bookRoomDto } from '@server/model/user';

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

    return {
      message: `user booked room ${room.room_number} successfully!!`,
      room_no: room.room_number,
    };
  });

export default bookRoom;
