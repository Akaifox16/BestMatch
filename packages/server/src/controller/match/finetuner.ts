import { protectedProcedure } from '../../trpc';

// TODO: implement how to find student preference priority
const findPriority = protectedProcedure.mutation(() => {
  return {
    message: 'need implementation',
  };
});

export default findPriority;
