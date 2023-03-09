import { publicProcedure } from '../../trpc';
import * as bcrypt from 'bcrypt';
import { prisma } from '@acme/database';
import { authResponseDto, loginDto } from './auth.dto';
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '../../utils/type';
import { createStudentDto } from '../student/student.dto';

export const login = publicProcedure
  .input(loginDto)
  .mutation(async ({ input }) => {
    const user = await prisma.user.findFirst({
      where: {
        email: input.email,
      },
    });

    if (!user || !bcrypt.compareSync(input.password, user.password))
      throw NotFoundError('incorrect username or password');

    return {
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      id: user.id,
    };
  });

export const register = publicProcedure
  .input(createStudentDto)
  .output(authResponseDto)
  .mutation(async ({ input }) => {
    try {
      const existedStudent = await prisma.user.findFirst({
        where: {
          OR: [{ email: input.email }, { personal_id: input.personal_id }],
        },
        select: { id: true },
      });

      if (existedStudent) throw ConflictError('this user is already existed');

      const { confirm_password, ...data } = input;

      const hashPassword = await bcrypt.hash(input.password, 10);
      const user = await prisma.user.create({
        data: { ...data, password: hashPassword },
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
    } catch (err) {
      console.error(err);
    }
  });
