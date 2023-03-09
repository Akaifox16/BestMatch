/* eslint-disable @typescript-eslint/consistent-type-imports */
import { RouterInputs, type RouterOutputs } from '@utility/trpc';
import { createMachine } from 'xstate';

type Profile = RouterOutputs['match']['generator']['profile_a'];
type ProfileForm = RouterInputs['student']['upsertProfile'];
type DormForm = RouterInputs['student']['upsertDormPreference'];

const mateAppMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EANgCs1AIwB2eQA5NAZkWKAnDx4AWRWoA0IAJ6I1J6jx0AmNQZ09nOtYpMBfPys0TBx8QlRSShp6JjZOLhUBJBBhUXFJaTkEeQcTHRMtTTVnHk0S5wMrWwRFTWVdFRUTExVjNv9AkGDsPAJicipqADMo9HowACdqABtmVAhKKA4ISRpKADdmBhoJsBgqCYxsXAnmEemwXiShETEJKWSsuoNHFRK1Hz0K9SrEFT0HIoeCpFG9ampPAZNAEgkdQn0IgMaCMqGMDjM5gsKEtJqcprhphghswJshqLt9pM4SczmQLldpKk7hlHogdNpqN55G8ygYTAZ7IpfghGi1HN43vlmvJufIYV04b1wpFBiiwGjJhj5osOLiSdQCUSSWSKWADtTTudLolGbd0g9QFkTBVqBD5E5nM5FO8ocLWoZqM5NPIPrpmkGWvLuvDlUjhqNxlNYCQ2BwAAoASQAwgBpACiABEGckmfbMogDK1qAKyvIdAZDGoVJW-SCHLKtHkvbptFHFWF+lF46jEwayEQGAACPW7CAcGSwdBHaioIaYCYAChBxgAlBxo0rB6qE+jcOOpzPIMWbml7uWRfl5IG+b5tEZWs0-a4eNQ6zp1MC7jyFCcqdAeA6IkOaoavi56TjSVrLKs1AbFsNDgQiKrIiempnhO8GWnSYAIKhRAYPcVzXikdp3qyIqtE+JROI0zgFH+Jh+iYRTUJoPDcnovj5BooGwiEh6QceI6nnBCFEbqEx4gahLoMSpLUBhsZQThsH4bJFwkRQmxkfalH8Lat4so6fzODKqjyN8IINm48h+sCgLMZoLQ6DKnZ9mJEFYcO6qjnhU56WA8mKYaKnGup-aYXG0EhTJhH6aR5GSJRNoljRlmyH8-46NQQLAi4XgfGo9bCtoP7sko-Jce4Zg6H5PQBYl2nUJShyYNOCkkpA86Lsuq7rlubR7hpR7YVJmrdUcfV4leZk5RZDr5dkELFTkwYtJoKg+ZxPDKECDFePWwGKK1MbTXFmAAMqYPgkxIYMw2YHdbUJUO3SPWAz0TFRpa0VZD7uDxighsd7KlPtOjCjKLz6OYQKQ7xwHONd4mBb9T24JqsBgNMQxpqlEUAHJ5gAGgAKkDuXrVkvi1fydaVXUXo6PDNiIN2rpuAYbPunxmgGFj7U-Ucf0A+SzDMMg3Sk2AQyTGaRARWmABKeYAGr02t97M5yrPeOy3qKFzfr2a66is96Lh5L2YHxZpgy4-9+NTKc8uK7sKu7BQ6scJTtP68yjMVp6nK8XU+haF4OTCjZKiBgLHjAcd8fi99btS3jmorKSSv+2rGva3rK03uH94GFHMOx2jCccTzIpKIG6j1pVTT2M22eu+hecewXxrF6rgcRfdACqABCACyGZ05X1EG3Rbx1tQXEaHxPgVTKSdqJoG81uyUJOFyLXO-5OcDw9+dJrQABGyBiOI2KvWshloZ9N0STfYDS57agsBH7P3QK-KABkjIZQoKZa4y9q6r0dqoEojROyeRaMKU2PF+Q8DcMUcwPgvR91uu7GWwCn4vx1DOJSRo1JTV-p9ABBMQGUOxJA5gxkKL8DDmWVe4JOSVXZPYIwXMnDCl8L+UWoJTC+FaEUC+okvr90YXfIBLCwFUP6viZSqkyT0JxoPMh6jwHsM4Zlbh2Uq68NBiCUWjgSjej4ifbklgW7OGKo0bybNmwNl0D4YhDDSGAPIaAxaJIhpLg+qNSY41dz7hdiQwxwT1FhMBkvYGeUshNHUL+UEXMlBaEKEKFuB0ioHRFvtBo5guYBIMbfIeUwZyTmmGQUJYAZDq0GguSJNBombi9HE-RcYgmaiaS0tpHSwDLTgRkiO2R8jVkFloGRhQVDCgALQlEDNoVoFQLpc3UAEToLAIBwGkEMqI5kEE2KfHkAo2hiilHKJUFumzPCcnqhbViOQvSY0vko26MQWDsCudYjaZROSSmBAfbyRRE6vNFDxYM3xgJ6B5LUjqs0JigpBhtfItUNA8gqPyQUwo3DuKMPYb4XhnBNDFv8n+gUkrolmNqbEOLMkKCDL+JstiKi1G8JoP0JVqy0uWZKEMbwMVaSxUAlMrAOVzOeJCyl2SjB3K-F6CGXMwy4I-FdBl2NMXBWkvhS8EBFX3n+PWV4hgE7GAKN5Vs1t-wCmhXbLQ0rJImtwilWkFxLWryedWTyPBa6uG9DSr8+gN6oK4vkGyYavUzR9VMeavVzWBtBiYDQrogy1yMFI1izg-Q6tyf8IouDzBlA6IoxlxqYLUDGa0sQ05JmQEgFm8FnlFm8SBGzUEoJXKQ2KjZAE+g-FEMNRLXO9SAZdqyHoF4tcPjulaA2Ss-wNmtDUK6EMNlmi118HHZNKiGlAKJiTMmC7EAmFwaK1dwIw2GE8fvIqUIc2FEFk0dkp6RlezlgrI4o8A7qxvQgCEy6+JGAtiGRsLzqiuFuZ5fa9z7kuD-Uk4eRc-ZjzA6ta5G110p3cPtLw+hjpkf3ofD9qHOxaAw9O6+Z6jEUI0eygjYKsl3pTnkXwShQyi1KEnC2jhoURllPYDQmG53JLY5gC1nHcXceaDxZs3hjAqE8u6FyLcc2H2BKLeyxQtOCzUDJ-+qiQmtpnOBpophnw+NYjq0ECHEAQsciGLipmSjNAs0wxpWjmktvQG2zpimrHKesrSwM5sig8YKM3aoP4DB8maE4OoXECjqaOX4IAA */
  id: 'mate_app_machine',
  tsTypes: {} as import('./machine.typegen').Typegen0,
  context: {
    currentStep: 0,
    errorCount: 0,

    profile: {} as ProfileForm,
    matePref: {} as ProfileForm,
    dormPref: {} as DormForm,
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

            onError: [
              {
                target: 'generate errored',
                actions: 'incrementErrorCount',
                cond: 'notExceedErrorLimitCount',
              },
              'error limit exceeded',
            ],
          },
        },

        show: {
          invoke: {
            src: 'pickProfile',
          },

          on: {
            PICKED: 'pick profile',
          },
        },

        'pick errored': {
          after: {
            '1500': 'pick profile',
          },
        },

        'pick profile': {
          invoke: {
            src: 'pickProfile',
            onDone: {
              target: 'loading',
              actions: 'clearErrorCount',
            },
            onError: [
              {
                target: 'pick errored',
                actions: 'incrementErrorCount',
                cond: 'notExceedErrorLimitCount',
              },
              'error limit exceeded',
            ],
          },
        },

        'generate errored': {
          after: {
            '1000': 'loading',
          },
        },

        'error limit exceeded': {
          type: 'final',
        },
      },
    },

    mateStepper: {
      initial: 'selfProfile',
      states: {
        selfProfile: {
          on: {
            NEXT: {
              target: 'roommatePreference',
              actions: 'incrementStep',
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
              actions: 'incrementStep',
            },
          },
        },

        dormPreference: {
          on: {
            PREV: {
              target: 'roommatePreference',
              actions: 'decrementStep',
            },
            SUBMIT: 'submitting',
          },
        },

        submitting: {
          invoke: {
            src: 'submitForm',
            onDone: {
              target: 'submitted',
              actions: 'clearErrorCount',
            },
            onError: [
              {
                target: 'submit error',
                actions: 'incrementErrorCount',
                cond: 'notExceedErrorLimitCount',
              },
              'error limit exceed',
            ],
          },
        },

        submitted: {
          type: 'final',
        },

        'submit error': {
          after: {
            '1000': 'submitting',
          },
        },

        'error limit exceed': {
          after: {
            '2500': {
              target: 'selfProfile',
              actions: 'returnToSelfProfile',
            },
          },
        },
      },
      onDone: {
        target: 'finetuner',
      },
    },
  },
  schema: {
    events: {} as
      | { type: 'PICKED'; data: { profilePick: Profile; profileComp: Profile } }
      | { type: 'NEXT' }
      | { type: 'PREV' }
      | { type: 'SUBMIT' },
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});

export default mateAppMachine;
