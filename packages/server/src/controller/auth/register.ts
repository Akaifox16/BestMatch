import { authResponseDto, createStudentDto } from '@server/model/user';
import { publicProcedure } from '@server/trpc';
import { prisma } from '@server/db';
import { ConflictError, InternalServerError } from '@server/model/errors';

const register = publicProcedure
  .input(createStudentDto)
  .output(authResponseDto)
  .mutation(async ({ input }) => {
    const existedStudent = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.email }, { personal_id: input.personal_id }],
      },
      select: { id: true },
    });

    if (existedStudent) throw ConflictError('this user is already existed');

    const user = await prisma.user.create({
      data: input,
      select: { email: true, id: true, first_name: true, last_name: true },
    });

    if (!user)
      throw InternalServerError(
        'failed to create new user, please try again later'
      );

    return {
      email: user.email,
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    };
  });

export default register;
