import { protectedProcedure } from '../../trpc';

// TODO: notify other to which profile the student chooose
const choose_A_or_B = protectedProcedure.mutation(() => {
  return {
    message: 'need implementation',
  };
});

export default choose_A_or_B;
