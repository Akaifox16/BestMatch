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
  const [profile, roommate, dorm] = trpc.useQueries(({ student }) => [
    student.getProfile(undefined, {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
    }),
    student.getPreference(undefined, {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
    }),
    student.getDormPreference(undefined, {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
    }),
  ]);

  const {
    data: profileData,
    error,
    refetch,
  } = trpc.match.generator.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
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
      setMatePrefState: assign(() => {
        return {
          currentStep: 1,
        };
      }),
      setDormPrefState: assign(() => {
        return {
          currentStep: 2,
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
                  evt.data.profilePick.do_not_disturb.map(changeRange),
              },
              comparisonProfile: {
                ...evt.data.profileComp,
                do_not_disturb:
                  evt.data.profileComp.do_not_disturb.map(changeRange),
              },
            })
            .catch(console.error);
        else throw new Error('should not been here. something wrong');
      },
    },
    services: {
      regenerateProfile: async (): Promise<
        RouterOutputs['match']['generator']
      > => {
        await refetch();

        if (!profileData) {
          console.error(JSON.stringify(error));
          throw new Error('cannot generate profile');
        }

        return profileData;
      },
    },
    guards: {
      isInitialize: () => !profile.data,
      noRoommatePref: () => !roommate.data,
      noDormPref: () => !dorm.data,
      notExceedErrorLimitCount: (ctx) => ctx.errorCount < 10,
    },
  });

  return (
    <MatingAppMachineContext.Provider value={{ state, send }}>
      {children}
    </MatingAppMachineContext.Provider>
  );
}

export const useMatingContext = () => useContext(MatingAppMachineContext);
