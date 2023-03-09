/* eslint-disable @typescript-eslint/consistent-type-imports */
import { RouterInputs, type RouterOutputs } from '@utility/trpc';
import { createMachine } from 'xstate';

type Profile = RouterOutputs['match']['generator']['profile_a'];
type ProfileForm = RouterInputs['student']['upsertProfile'];
type DormForm = RouterInputs['student']['upsertDormPreference'];

const mateAppMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EANgCs1AIwB2eQA5NAZkWKAnDx4AWRWoA0IAJ6I1J6jx0AmNQZ09nOtYpMBfPys0TBx8QlRSShp6JjZOLhUBJBBhUXFJaTkEeQcTHRMtTTVnHk0S5wMrWwRFTWVdFRUTExVjNv9AkGDsPAJicipqADMo9HowACdqABtmVAhKKA4ISRpKADdmBhoJsBgqCYxsXAnmEemwXiShETEJKWSsuoNHFRK1Hz0K9SrEFT0HIoeCpFG9ampPAZNAEgkdQn0IgMaCMqGMDjM5gsKEtJqcprhphghswJshqLt9pM4SczmQLldpKk7hlHogdNpqN55G8ygYTAZ7IpfghGi1HN43vlmvJufIYV04b1wpFBiiwGjJhj5osOLiSdQCUSSWSKWADtTTudLolGbd0g9QFkTBVqBD5E5nM5FO8ocLWoZqM5NPIPrpmkGWvLuvDlUjhqNxlNYCQ2BwAAoASQAwgBpACiABEGckmfbMogDK1qAKyvIdAZDGoVJW-SCHLKtHkvbptFHFWF+lF46jEwayEQGAACPW7CAcGSwdBHaioIaYCYAChBxgAlBxo0rB6qE+jcOOpzPIMWbml7uWRfl5IG+b5tEZWs0-a4eNQ6zp1MC7jyFCcqdAeA6IkOaoavi56TjSVrLKs1AbFsNDgQiKrIiempnhO8GWnSYAIKhRAYPcVzXikdp3qyIqtE+JROI0zgFH+Jh+iYRTUJoPDcnovj5BooGwiEh6QceI6nnBCFEbqEx4gahLoMSpLUBhsZQThsH4bJFwkRQmxkfalH8Lat4so6fzODKqjyN8IINm48h+sCgLMZoLQ6DKnZ9mJEFYcO6qjnhU56WA8mKYaKnGup-aYXG0EhTJhH6aR5GSJRNoljRlmyH8-46NQQLAi4XgfGo9bCtoP7sko-Jce4Zg6H5PQBYl2nUJShyYNOCkkpA86Lsuq7rlubR7hpR7YVJmrdUcfV4leZk5RZDr5dkELFTkwYtJoKg+ZxPDKECDFePWwGKK1MbTXFmAAMqYPgkxIYMw2YHdbUJUO3SPWAz0TFRpa0VZD7uDxighsd7KlPtOjCjKLz6OYQKQ7xwHONd4mBb9T24JqsBgNMQxpqlEUAHJ5gAGgAKkDuXrVkvi1fydaVXUXo6PDNiIN2rpuAYbPunxmgGFj7U-Ucf0A+SzDMMg3Sk2AQyTGaRARWmABKeYAGr02t97M5yrPeOy3qKFzfr2a66is96Lh5L2YHxZpgy4-9+NTKc8uK7sKu7BQ6scJTtP68yjMVnynJOftnlcxoHE8wgrjOI4RSuDVTTpy1zv+d9btS3jmorKSSv+2rGva3rK03uH94MT+-yGN5dai-k3PVAdqdNvYHxek3ZjQrnX2u+hhce8Xxpl6rgcRfdACqABCACyGZ0zX1EG3RjSC9QBQ8O49bOpWvpJ2bv5lG4-4GBUgkiQqeej590ue9QsC0AARsgYjiNir1rIZNCn0boSTHg9IuSZP7f3QL-KABkjIZQoKZa4m867b0vnvTw3JgTFBcD4YULRU55DRiUMM-41Di3zmAsAL8CZQJ-jqGcSkjRqSmqA5+EC370JgYseBzBjIUX4GHMs286xPm9M4A6IJRYWxUF+H8x9uTfBcN4LilCn7uxlu-L+DC-5MOiqpMkbCcbjy0dw2BfCBGZSEdlWuIjQYHV3hoVRnw+QCksEnVOoIm66E9FxDwpQKHDxASY8BE9IE6PQItEkQ0lwfVGpMcau59wu1upo1+2joHRMBhvYGeUshNHUL+UEXMlBaEKEKJOB0ioHRFrHf85gubqLSaY1+M5JzTDIFksAMh1aDQXHEmgCTNxemScYuM6TNTtM6d03pYBlooLyRHbI+RqyCy0KYNG+1hQAFoSiBm0K0CoF0ubqACJ0FgEA4DSHGVEcyaCHFPjyAUbQxRSjlEqEnPZnhOT1S0A2TwKhtBD1EiPW6MQWDsHufYjaZROSShwboLQCddmih4sGb4wE9A8maewpKBxoUgw2vkWqGgeQVH5IKYUbhU5GEqp2SqrEc6gpCR1WaUxZjamxIS-JCggy-ibNI2+ug1CaD9CVaskiNmShDG8XFgV8UExTKwHlyznjwrpYUowzyvxeghlzMMPAmybPlWy4K0l8KXggKq+uXMXjAkMF4YWBRvKtmttfCEttBZo1NVpdlY5dJkxtdvd51ZPIH09D4T0Lgvz6D3o0Ha+QbIH19ZJc1c0zRUl6la4NoMTAaFdEGG+RgZGsWcH6A1xT-hFCNeYMoHQWXYzNTBag0yuliGnHMyAkBc2ws8ms3iQI2aglBK5SGxUbIAn0CKr0qbqG0ImL2rIegXg3w+O6VoDZKz-FRUa10IYvTFAMJWEdIKH5gvYZMpMRMSZBtWg8jaJg91ro0MCA+hhGgd15pVMN+bCiCyaOyOdHDwmyx9kcaeAd1ZLrsCGX8Hgh3SKAmKzxBauL+N4t4YwZzglNslmEmWJdkCQYrjBkU5Vo6CvZGUbQZhhQBOrMdZoRhKzOkqsy89rL8M0M4Zk3RUAyO1KKqdfQRq3DAhcp4i2jgcERllPYMowGr1cMiZga196YUFJyMoMwdZTAglYvoDx1R81FUqiCeyZhj35DFrhiWBcCMZO4dkwTT6HDfGPUys2zZqqp0ciGLiQKb6mAbZxvDDmeOgbbbMvp6m7FEoKZ6FQgZzZFCfU0HIwofzHuaE+s26HuTuHOX4IAA */
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
              actions: ['incrementStep', "assignProfileFormToCtx"],
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
              actions: ['incrementStep', "assignMatePrefFormToCtx"],
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
              actions: "assignDormPrefFormToCtx"
            },
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
      | { type: 'NEXT'; data: ProfileForm}
      | { type: 'PREV' }
      | { type: 'SUBMIT'; data: DormForm },
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});

export default mateAppMachine;
