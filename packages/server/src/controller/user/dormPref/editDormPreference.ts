import { publicProcedure } from '../../../trpc';

const editDormPreference = publicProcedure
  // .input()
  .mutation(async () => {
    return {
      message: 'need implementation',
    };
  });

export default editDormPreference;
