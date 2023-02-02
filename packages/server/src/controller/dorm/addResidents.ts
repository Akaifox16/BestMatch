import { publicProcedure } from '@src/trpc';

const addResidents = publicProcedure.input().mutation(() => {
  return {
    message: 'need implementation',
  };
});
export default addResidents;
