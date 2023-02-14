import { protectedProcedure } from '../../trpc';

const choose_A_or_B = protectedProcedure.mutation(async () => {
  return {
    message: 'need implementation',
  };
});

export default choose_A_or_B;
