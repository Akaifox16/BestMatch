import { publicProcedure } from '@src/trpc';

const setupDateTimeOfSystem = publicProcedure
  // .input()
  .mutation(() => {
    return {
      message: 'need implementation',
    };
  });

export default setupDateTimeOfSystem;
