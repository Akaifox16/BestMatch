import { RouterOutputs } from '@utility/trpc';
import { createMachine } from 'xstate';

const mateAppMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EANgCs1AIwB2eQA5NAZkWKAnDx4AWRWoA0IAJ6I1J6jx0AmNQZ09nOtYpMBfPys0TBx8QlRSShp6JjZOLhUBJBBhUXFJaTkEeQcTHRMtTTVnHk0S5wMrWwRFTWVdFRUTExVjNv9AkGDsPAJicipqADMo9HowACdqABtmVAhKKA4ISRpKADdmBhoJsBgqCYxsXAnmEemwXiShETEJKWSsuoNHFRK1Hz0K9SrEFT0HIoeCpFG9ampPAZNAEgkdQn0IgMaCMqGMDjM5gsKEtJqcprhphghswJshqLt9pM4SczmQLldpKk7hlHogdNpqN55G8ygYTAZ7IpfghGi1HN43vlmvJufIYV04b1wpFBiiwGjJhj5osOLiSdQCUSSWSKWADtTTudLolGbd0g9QFkTBVqBD5E5nM5FO8ocLWoZqM5NPIPrpmkGWvLuvDlUjhqNxlNYCQ2BwAAoASQAwgBpACiABEGckmfbMogDK1qAKyvIdAZDGoVJW-SCHLKtHkvbptFHFWF+lF46jEwayEQGAACPW7CAcGSwdBHaioIaYCYAChBxgAlBxo0rB6qE+jcOOpzPIMWbml7uWRfl5IG+b5tEZWs0-a4eNQ6zp1MC7jyFCcqdAeA6IkOaoavi56TjSVrLKs1AbFsNDgQiKrIiempnhO8GWnSYAIKhRAYPcVzXikdp3qyIqtE+JROI0zgFH+Jh+iYRTUJoPDcnovj5BooGwiEh6QceI6nnBCFEbqEx4gahLoMSpLUBhsZQThsH4bJFwkRQmxkfalH8Lat4so6fzODKqjyBUXgeCCWhCjYFZKNW6iuJWbx5CCfZiRBWHDuqo54VOelgPJimGipxrqf2mFxtBYUyYR+mkeRkiUTaJY0ZZsh-P+OjUECwIuF4HxqPWwraD+7JKPyXHuGYOgBT0QXJdp1CUocmDTgpJKQPOi7Lqu65bm0e4aUe2FSZqvVHANeJXmZeUWQ6hXZBCpU5MGLSaCoMryJxPDKECDGOQYwGKO1MazQlmAAMqYPgkxIYMo2YI9HVJUO3QvWAb0TFRpa0VZD7uDxighmd7KlIdOjCjKLz6OYQIw7xwHOHd4nBQDr24JqsBgNMQxpulUUAHJ5gAGgAKqD+WbVkvj1fydbVXUXo6EjbkIN2rpuNdXLGFoBi451-1HIDwPkswzDIN0FNgEMkxmkQUVpgASnmABqTMbfebOchz3jst6ii8369muuoHPei4eS9mBiWaYMBNA0TUynIryu7GruwUJrHA0wzhvMizFaepyvF1PoWheDkwo2SogbCx4wFnYnkt-R7MuE5qKykirgca1rusG2tN6R-eBgx-D8eY0nHH80dyjOOo9bVU09jNrn7voQXXtF8apfq8HUVPQAqgAQgAshmjPV9RRt0W8dbUFxGh8T4VUyinaiaFvNbslCThcm1ruBXnQ-PYXSa0AARsgYjiNiH1rIZaE-fdEl32AWW3tqCwGfq-dA78oAGSMllCgplrir1ruvZ2qgSiNE7JoZoKhhTmx4vyHgbhijmB8F6AeD1PZy1AS-N+OoZxKSNGpGa-8fpAOJmAmh2JoHMGMhRfgEcyzr3BJyaq7J7BGF5k4YUvhfyaAbB+XwrQihX1Er9QeLCH4gPYegZaJIRpLm+uNSYk1dz7jduQ4elCtE6JBivMGBUshNHUL+UEvMlBaEKK5aoR0SpHT4toFQDRzC8zIcwihwCqHgMgdFfUsVVJkiYfjCx4StGQK4Tw7KfDco1wERDEEsjHAlG9HxM+3JLD82cKVRoOgZQSgMA2XQPgQmJPviPKYM5JzTDIOA6cMhNbDQXPomghjNxehMQkuMYTNTtM6d0sAvSwCrQQXYqO2R8jVmuloUwmNDrCgALQlEDP4yE9Y-zqACJ0FgEA4DSHGVEcySDclPjyAUbQxRSjlEqPzfZnhOSNW5P6EwpgcbX1UQ9GILB2D3JyVtMonJJTAiPtUooycvmih4sGb4wE9A8iaV1eaEwoXgy2vkeqGgeQVH5IKYUbgKlGHsJ4WR7cTBqFxVpfFWosRQEJfYhQQZfxNjyRUWo3hNB+jKtWTumzJQhjeKyySoV0TJjYNylZRgnl1J4OI0E0pPleNYiVTBh1mxVKaPkOVc0FW4TgpeCAKr7z-HrK8QwSdjAFGqa2W2-4BQIodloc1IUYJjl0pTO1693nVkwZqz0JCvDOC-PoLe6CuL5Bspq-1KV0SLX6ja0NENmVPmKLIiopQGysTjW3Xmx8lD-CKAQ8wZQOgqL-sFDNUzBoTA6V0sQPS+lXNtetB5MLMHrN4kCTmoJQR+mzqVGyAJ9ANNISC5tEykmTFzcSgM9cPjulaA2HyfNqi7NaGoV0IYbJenpZqhs-rJlJlJuTENA7oVOgIRK7dwJNWGCqYfEqUJ81vm5M7G9q6fYKyVkcceQdNbrqyBCF4aqjBWxDI2XViBXBPMNU0TsWgXDAZaXLYuyBIPlxg38TVad3CHS8PoM6VHD7Hz-YdF5LzcNLrxiu-DyTqEQMWKRkUgK055F8EoUMsjSgpyto4BFEZZT2A0HhwBGiIlv0gHxpozQeLNm8MYAJBQ+LCmZcfYEsj7LFACddFlbGpb5042w7j1i1OAocN8Op+qLbNlqhUkEFmuLmZKM0BTrC2nts7bM+Zqmn1EocZ6NOXpuz0qw63aoP46nNEBRbLiBQtPnL8EAA */
  id: 'mate_app_machine',
  tsTypes: {} as import('./machine.typegen').Typegen0,
  context: {
    currentStep: 0,
    errorCount: 0,

    profile: {},
    matePref: {},
    dormPref: {},

    // Profile
    profileA: {} as RouterOutputs['match']['generator']['profile_a'],
    profileB: {} as RouterOutputs['match']['generator']['profile_b'],
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
            onDone: 'loading',
            onError: 'pick errored',
          },

          on: {
            PICKED: 'pick profile',
          },
        },

        'pick errored': {
          after: {
            '1500': 'pick profile',
          }
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
          type: "final"
        }
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
            src: "submitForm",
            onDone: {
              target: "submitted",
              actions: "clearErrorCount"
            },
            onError: [{
              target: "submit error",
              actions: "incrementErrorCount",
              cond: "notExceedErrorLimitCount"
            }, "error limit exceed"]
          }
        },

        submitted: {
          type: "final"
        },

        "submit error": {
          after: {
            "1000": "submitting"
          }
        },

        "error limit exceed": {
          after: {
            "2500": {
              target: "selfProfile",
              actions: "returnToSelfProfile"
            }
          }
        }
      },
      onDone: {
        target: 'finetuner',
      },
    }
  },
  schema: {
    events: {} as
      | { type: 'PICKED'; profilePick: {}; profileComp: {} }
      | { type: 'NEXT' }
      | { type: 'PREV' }
      | { type: 'SUBMIT' },
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});

export default mateAppMachine;
