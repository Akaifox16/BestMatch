import { publicProcedure } from '@server/trpc';

const setupDateTimeOfSystem = publicProcedure
  // .input()
  .mutation(() => {
    return {
      message: 'need implementation',
    };
  });

export default setupDateTimeOfSystem;
