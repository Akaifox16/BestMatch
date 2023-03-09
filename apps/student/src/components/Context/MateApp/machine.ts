/* eslint-disable @typescript-eslint/consistent-type-imports */
import { RouterInputs, type RouterOutputs } from '@utility/trpc';
import { Control } from 'react-hook-form-mui';
import { createMachine } from 'xstate';

type Profile = RouterOutputs['match']['generator']['profile_a'];
type ProfileForm = RouterInputs['student']['upsertProfile'];
type DormForm = RouterInputs['student']['upsertDormPreference'];

type Events =
      | { type: 'PICKED'; data: { profilePick: Profile; profileComp: Profile } }
      | { type: 'NEXT' }
      | { type: 'PREV' }
      // | { type: 'SUBMIT'; data: Control<DormForm> }
      // | { type: 'Form Input Changed'}

const mateAppMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EANgCs1AIwB2eQA5NAZkWKAnDx4AWRWoA0IAJ6I1J6jx0AmNQZ09nOtYpMBfPys0TBx8QlRSShp6JjZOLhUBJBBhUXFJaTkEeQcTHRMtTTVnHk0S5wMrWwRFTWVdFRUTExVjNv9AkGDsPAJicipqADMo9HowACdqABtmVAhKKA4ISRpKADdmBhoJsBgqCYxsXAnmEemwXiShETEJKWSszWbqMvtnFUUtJTVLG0QDF9qDoVF4fM5DMVNPIAkEjqE+hEBjQRlQxgcZnMFhQlpNTlNcNMMENmBNkNRdvtJvCTmcyBcrtJUncMo9EDotKpnioOfYOXV5FU7JoDI4zID3jp8qVYV14b1wpFBqiwOjJpj5osOHjSdRCcTSeTKWADjTTudLokmbd0g9QFkWspFB9vPJnHVmuYTELsvIVI4DBoWjwVPIDLpZd0EYrkcNRuMprASGwOAAFACSAGEANIAUQAIozkszbZlEK13NQTGUIRzQQZ5H6fRXNKodIHHWV9IZI-Kwv0onG0QnqFTDpgAAQ63YQDgyWDoI7UVBDTATAAUrWMAEoOFGFQPlfGMWOjlOJvjIEWbml7mXskCdJpPKUPoonM5m8Y1MDGgYISGXjuJovYhAeSKDt0ADKmD4OqpzMMg3SprsQyTCaRBgGmABKuYAGrXikNp3myNTVtQfp+r4eheMYKjNtCYrFB8JhvkoeigT0-YQYM0Gwbg6orGSKFgGhuwUJhOH4YRJYkfa5ags4VZ5NWWgQv+OQMfITHOCxbGKBxnT7txSo0HxYBwYmYDTEMKF0hcHAAHK5gAGgAKjJxGsvJNTvq8oZhryahNComg+vkrY+MFnggmGmitIonHRoeZlHDBFkCVMCFIUcIliRhWHOe5nm3t5sgKc4Dg5CYpgGA2zRqDwijheRUWlHkeihk+SXgaZ1DmZZ1BCcgeXoRJhWuR5-DWqVdrlQgnytNQ7p5KFvgaI2Og+hU-ryE+tQNoo6jPh0cJgSZsYDZlyyrNQC5LsZiJ9VdkwlSyc1ZJ8NXUBouhOM+XguJU-zZE11ANiCajPM0YY5AEnQsBAcDSI9MZRDN733qGVb5IUxSvp4wPVAAtOUwJKM0pTFO+rhqD1F2DjELDsBjpakWUv60cd-JBj6xONA42hugYobuEd7r009sYqmqEys3J80uDwXItLyeRaF8PrmMrdRlE4dVfCKOiS2jR7Dhisyaji8tlVkfq5NCNNAyU3jNq0SlqC4viuBDjUqCbKVDqqI5JmwNsfYgIrKB8nuen6Kj-t6IN1PU7YaDw+NuK4Ac8Six7qqek7TpA4f3gUSm+KxnuKSKIY+gY33l5VHbPPFzg531MsjtOE7TGQyBiFOMiYZAJfFl5EcIEUOs8u2BSNdo9Eg0orZSsU6heK0wXG0ZfZS5BaX8ZMpekR4SkhvkLT-mvpiCiD4bUIbTV6LoYaNIlu-nfvvGHxl6qwNZWy5p6RgBPj5PQysL7NAToDRqBRtr-nJn6EMzot7PBhJ-Li39UqYHSoNbKyFUJjUwmA+az5-S6Chq0PIIYPQIKUhyZBnwPgZ3QR3S6v9BrDVGuJEh49ZpYylA4WOzwQQ1QaGFEG7pRQiiMDFViBRGynTlF-U2OCwB4MyndWgAAjAe6BMAQFIZ9EwItgRQ1KPIHw8dfg+hqj+Kx8hSjhhKNzHeAQgA */
  id: 'mate_app_machine',
  tsTypes: {} as import('./machine.typegen').Typegen0,
  context: {
    currentStep: 0,
    errorCount: 0,

    profile: {} as Control<ProfileForm>,
    matePref: {} as Control<ProfileForm>,
    dormPref: {} as Control<DormForm>,
    // Profile
    profileA: {} as Profile,
    profileB: {} as Profile,
  },
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
                actions: ['updateGeneratedProfile', 'clearErrorCount'],
              },
            ],

            onError: [{
              target: 'generate errored',
              actions: 'incrementErrorCount',
              cond: 'notExceedErrorLimitCount',
            }, 'error limit exceeded'],
          },
        },

        show: {
          on: {
            PICKED: {
              target: "loading",
              actions: "pickProfile"
            },
          }
        },

        'generate errored': {
          after: {
            '1000': 'loading',
          },
        },

        'error limit exceeded': {
          type: 'final',
        }
      },
    },

    mateStepper: {
      initial: 'selfProfile',

      states: {
        selfProfile: {
          on: {
            NEXT: {
              target: "roommatePreference",
              actions: "incrementStep"
            }
          }
        },

        roommatePreference: {
          on: {
            PREV: {
              target: 'selfProfile',
              actions: 'decrementStep',
            },

            NEXT: {
              target: "dormPreference",
              actions: "incrementStep"
            }
          }
        },

        dormPreference: {
          on: {
            PREV: {
              target: 'roommatePreference',
              actions: 'decrementStep',
            },

            NEXT: "submitted"
          }
        },

        submitted: {
          type: "final"
        }
      },

      onDone: "finetuner"
    }
  },
  schema: {
    events: {} as Events,
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});

export default mateAppMachine;
