import { publicProcedure } from '../../../trpc';

const addDormPreference = publicProcedure
  // .input()
  .mutation(async () => {
    return {
      message: 'need implementation',
    };
  });
export default addDormPreference;
