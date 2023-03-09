import { type RouterOutputs, trpc, RouterInputs } from '@utility/trpc';
import type { ParentNode } from '@utility/type';
import { useMachine } from '@xstate/react';
import { createContext, useContext, useMemo, useState } from 'react';
import { assign } from 'xstate';
import mateAppMachine from './machine';

type MatingAppMachineParams = ReturnType<
  typeof useMachine<typeof mateAppMachine>
>;
type GeneratorReturnValue = RouterOutputs['match']['generator'];

const DEFAULT_ERROR_COUNT = 0 as const;
const PROFILE_PAGE = 0 as const;

const MatingAppMachineContext = createContext({
  // currentStep: 0,
  state: {} as MatingAppMachineParams[0],
  send: {} as MatingAppMachineParams[1],

  // profileA: {} as GeneratorReturnValue['profile_a'],
  // profileB: {} as GeneratorReturnValue['profile_a'],
});

export default function MatingAppContextProvider({ children }: ParentNode) {
  // check for authentication
  const { data, error: getPrefErr } = trpc.student.getPreference.useQuery();
  // const [step, setStep] = useState(0);
  // const [profileA, setProfA] = useState<GeneratorReturnValue['profile_a']>(
  //   {} as GeneratorReturnValue['profile_a']
  // );
  // const [profileB, setProfB] = useState<GeneratorReturnValue['profile_b']>(
  //   {} as GeneratorReturnValue['profile_a']
  // );

  // const [errorCount, setErrorCount] = useState<number>(DEFAULT_ERROR_COUNT);

  const memoizedMachine = useMemo(() => mateAppMachine, []);
  const [state, send] = useMachine<typeof mateAppMachine>(memoizedMachine, {
    actions: {
      updateGeneratedProfile: assign((_ctx, evt) => {
        const { profile_a, profile_b } = evt.data as RouterOutputs['match']['generator']

        return {
          profileA: profile_a,
          profileB: profile_b,
        }
      }),

      // step
      decrementStep: assign((ctx ) => {
        return {
          currentStep: ctx.currentStep - 1
        }
      }),
      incrementStep: assign((ctx) => {
        return {
          currentStep: ctx.currentStep + 1
        }
      }),
      returnToSelfProfile: assign((_ctx) => {
        return {
          currentStep: PROFILE_PAGE
        }
      }),

      // error
      clearErrorCount: assign((_ctx) => {
        return {
          errorCount: DEFAULT_ERROR_COUNT
        }
      }),
      incrementErrorCount: assign((ctx) => {
        return { 
          errorCount: ctx.errorCount + 1
        }
      }),
    },
    services: {
      submitForm: async (ctx, _evt) => {
        const { error: upsertProfileErr } = trpc.student.upsertProfile.useMutation(ctx.profile)
        if (upsertProfileErr) throw Error('cannot submit your profile')

        const { error: upsertPrefErr } = trpc.student.upsertPreference.useMutation(ctx.matePref)
        if (upsertPrefErr) throw Error('cannot submit your roommate preference')

        const { error: upsertDormErr } = trpc.student.upsertDormPreference.useMutation(ctx.dormPref)
        if (upsertDormErr) throw Error('cannot submit your dorm preference')
      },
      pickProfile: async (ctx, evt) => {
        
      },
      regenerateProfile: async (): Promise<RouterOutputs['match']['generator']> => {
        const { data: findNewAttrData, error: findNewAttrErr } =
          trpc.match.findNewAttribute.useQuery();

        if (findNewAttrErr) throw Error(findNewAttrErr.message);
        if (!findNewAttrData) throw new Error('cannot generate new profile');

        const { data: generatorData, error } =
          trpc.match.generator.useQuery(findNewAttrData as RouterInputs['match']['generator']);

        if (error) throw Error(error.message);
        if (!generatorData)
          throw new Error(
            'can not generate new profile yet, please try again later'
          );

        return generatorData;
      },
    },
    guards: {
      isInitialize: () => !!data,
      notExceedErrorLimitCount: () => true,
    },
  });

  if (getPrefErr) return <div>Sorry please re-login</div>;

  return (
    <MatingAppMachineContext.Provider
      value={{ state, send }}
    >
      {children}
    </MatingAppMachineContext.Provider>
  );
}

export const useMatingContext = () => useContext(MatingAppMachineContext);
