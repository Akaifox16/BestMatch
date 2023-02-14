import { findByIdDto } from '../../../model/user';
import { publicProcedure } from '../../../trpc';

const getRole = publicProcedure.input(findByIdDto).query(async () => {
  return {
    message: 'need implementation',
  };
});

export default getRole;
