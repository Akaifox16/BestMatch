import { type RouterOutputs, trpc, type RouterInputs } from '@utility/trpc';
import type { ParentNode } from '@utility/type';
import { useMachine } from '@xstate/react';
import { createContext, useContext, useMemo } from 'react';
import { assign } from 'xstate';
import mateAppMachine from './machine';

type MatingAppMachineParams = ReturnType<
  typeof useMachine<typeof mateAppMachine>
>;

const DEFAULT_ERROR_COUNT = 0 as const;

const MatingAppMachineContext = createContext({
  state: {} as MatingAppMachineParams[0],
  send: {} as MatingAppMachineParams[1],
});

export default function MatingAppContextProvider({ children }: ParentNode) {
  const { data } = trpc.student.getPreference.useQuery(undefined, {
    retryOnMount: false,
    retry: false,
  });

  const memoizedMachine = useMemo(() => mateAppMachine, []);
  const [state, send] = useMachine<typeof mateAppMachine>(memoizedMachine, {
    actions: {
      updateGeneratedProfile: assign((_ctx, evt) => {
        const { profile_a, profile_b } =
          evt.data as RouterOutputs['match']['generator'];

        return {
          profileA: profile_a,
          profileB: profile_b,
        };
      }),

      // step
      decrementStep: assign((ctx) => {
        return {
          currentStep: ctx.currentStep - 1,
        };
      }),
      incrementStep: assign((ctx) => {
        return {
          currentStep: ctx.currentStep + 1,
        };
      }),

      // error
      clearErrorCount: assign((_ctx) => {
        return {
          errorCount: DEFAULT_ERROR_COUNT,
        };
      }),
      incrementErrorCount: assign((ctx) => {
        return {
          errorCount: ctx.errorCount + 1,
        };
      }),
      // TODO: implement pickProfile
      pickProfile: (_ctx, evt) => {
        const changeRange = (str: string) => {
          const start = Number(str);
          return { start, stop: start + 1 };
        };

        if (evt.type === 'PICKED')
          trpc.match.pickedProfile
            .useMutation()
            .mutateAsync({
              selectedProfile: {
                ...evt.data.profilePick,
                do_not_disturb:
                  evt.data.profilePick.do_not_disturb.map(changeRange)[0],
              },
              comparisonProfile: {
                ...evt.data.profileComp,
                do_not_disturb:
                  evt.data.profileComp.do_not_disturb.map(changeRange)[0],
              },
            })
            .catch(console.error);
        else throw new Error('should not been here. something wrong');
      },
    },
    services: {
      // TODO: remove assume in generator query input
      regenerateProfile: async (): Promise<
        RouterOutputs['match']['generator']
      > => {
        const { data: findNewAttrData, error: findNewAttrErr } =
          trpc.match.findNewAttribute.useQuery();

        if (findNewAttrErr) throw Error(findNewAttrErr.message);
        if (!findNewAttrData) throw new Error('cannot generate new profile');

        const { data: generatorData, error } = trpc.match.generator.useQuery(
          findNewAttrData as RouterInputs['match']['generator']
        );

        if (error) throw Error(error.message);
        if (!generatorData)
          throw new Error(
            'can not generate new profile yet, please try again later'
          );

        return generatorData;
      },
    },
    guards: {
      isInitialize: () => !data,
      notExceedErrorLimitCount: () => true,
    },
  });

  return (
    <MatingAppMachineContext.Provider value={{ state, send }}>
      {children}
    </MatingAppMachineContext.Provider>
  );
}

export const useMatingContext = () => useContext(MatingAppMachineContext);
