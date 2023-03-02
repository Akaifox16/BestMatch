import { protectedProcedure } from '../../trpc';
import { choicerInput, generatorInput, generatorOutput } from './match.dto';
import { generate } from './utils/generate';

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

      const [profile_a, profile_b] = await Promise.all([
        generate(user.id, attribute_pair[0], values[0]),
        attribute_pair[1] === 'do_not_disturb'
          ? generate(user.id, attribute_pair[1], values[1] as Array<string>)
          : generate(user.id, attribute_pair[1], values[1] as number),
      ]);

      return {
        profile_a,
        profile_b,
      };
    }
  );

// TODO: BM-9 | impl pickedProfile
//            | notify other to which profile the student chooose
export const pickedProfile = protectedProcedure.input(choicerInput).mutation(
  async ({
    input,
    ctx: {
      session: { user },
    },
  }) => {
    return {
      msg: 'need implementation',
    };
  }
);
