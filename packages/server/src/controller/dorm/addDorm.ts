import { publicProcedure } from '@src/trpc';

const addDorm = publicProcedure.input().mutation(() => {
  return {
    message: 'need implementation',
  };
});

export default addDorm;
