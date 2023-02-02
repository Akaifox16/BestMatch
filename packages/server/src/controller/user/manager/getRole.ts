import { findByIdDto } from '@src/model/user';
import { publicProcedure } from '@src/trpc';

const getRole = publicProcedure.input(findByIdDto).query(async () => {
  return {
    message: 'need implementation',
  };
});

export default getRole;
