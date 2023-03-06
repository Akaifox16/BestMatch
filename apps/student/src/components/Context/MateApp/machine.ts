import { assign, createMachine } from 'xstate';
// import { finetunerMachine } from '../Finetuner';
// import mateStepperMachine from '../MateStepper/machine';

type Context = {
  initial: boolean;
};
type Events =
  | { type: 'PICK' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SUBMIT' };

const mateAppMachine = createMachine({
  id: 'mate_app_machine',
  schema: {
    context: {} as Context,
    events: {} as Events,
  },
  context: { initial: false },
  predictableActionArguments: true,
  preserveActionOrder: true,

  initial: 'unknown',
  states: {
    unknown: {
      always: [
        {
          target: 'mateStepper',
          cond: 'isInitialize',
        },
        {
          target: 'finetuner',
        },
      ],
    },

    mateStepper: {
      initial: 'selfProfile',
      states: {
        selfProfile: {
          on: {
            NEXT: {
              target: 'roommatePreference',
              actions: ['saveSelfProfileFormData', 'incrementStep'],
            },
          },
        },

        roommatePreference: {
          on: {
            PREV: {
              target: 'selfProfile',
              actions: 'decrementStep',
            },
            NEXT: {
              target: 'dormPreference',
              actions: ['saveRoommatePreferenceFormData', 'incrementStep'],
            },
          },
        },

        dormPreference: {
          on: {
            PREV: {
              target: 'roommatePreference',
              actions: 'decrementStep',
            },
            SUBMIT: {
              target: 'submitting',
              actions: 'saveDormPreferenceFormData',
            },
          },
        },

        submitting: {
          entry: 'submitForm',
          type: 'final',
        },
      },
      onDone: {
        target: 'finetuner',
      },
    },

    finetuner: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'regenerateProfile',
            id: 'regenerate_profile',
            onDone: [
              {
                target: 'show',
              },
            ],
          },
        },

        show: {
          on: {
            PICK: {
              target: 'loading',
              actions: 'pickProfile',
            },
          },
        },
      },
    },
  },
});

export default mateAppMachine;
