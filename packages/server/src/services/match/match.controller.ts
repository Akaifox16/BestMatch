import { protectedProcedure } from '../../trpc';
import { finetuneInput, generatorInput, generatorOutput } from './match.dto';
import { generate } from '../../utils/generate';

// TODO: BM-8 | implement how to find student preference priority
export const finetuner = protectedProcedure
  .input(finetuneInput)
  .mutation(({ input, ctx }) => {
    return {
      message: 'need implementation',
    };
  });

// TODO: BM-9 | notify other to which profile the student chooose
export const choose_A_or_B = protectedProcedure.mutation(() => {
  return {
    message: 'need implementation',
  };
});

export const generateProfile = protectedProcedure
  .input(generatorInput)
  .output(generatorOutput)
  .query(
    async ({
      input,
      ctx: {
        session: { user },
      },
    }) => {
      const { attribute_pair, values } = input;
      // FIX: impl generate function base on profileGenerator proc
      const [profile_a, profile_b] = await Promise.all([
        generate(user.id, attribute_pair[0], values[0]),
        generate(user.id, attribute_pair[1], values[1]),
      ]);

      return {
        profile_a,
        profile_b,
      };
    }
  );

// TODO: impl pickedProfile
export const pickedProfile = protectedProcedure.mutation(
  async ({
    ctx: {
      session: { user },
    },
  }) => {
    return {
      msg: 'need implementation',
    };
  }
);
