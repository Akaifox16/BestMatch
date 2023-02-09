import { publicProcedure } from '@src/trpc';

const addDorm = publicProcedure.mutation(() => {
  return {
    message: 'need implementation',
  };
});

export default addDorm;
