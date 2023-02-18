import { protectedProcedure } from '../../trpc';

const findPriority = protectedProcedure.mutation(async () => {
  return {
    message: 'need implementation',
  };
});

export default findPriority;
