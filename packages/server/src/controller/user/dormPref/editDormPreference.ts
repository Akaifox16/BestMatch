import { publicProcedure } from '@server/trpc';

const editDormPreference = publicProcedure
  // .input()
  .mutation(async () => {
    return {
      message: 'need implementation',
    };
  });

export default editDormPreference;
