/* eslint-disable @typescript-eslint/consistent-type-imports */
import { RouterInputs, type RouterOutputs } from '@utility/trpc';
import { Control } from 'react-hook-form-mui';
import { createMachine } from 'xstate';

type Profile = RouterOutputs['match']['generator']['profile_a'];
type ProfileForm = RouterInputs['student']['upsertProfile'];
type DormForm = RouterInputs['student']['upsertDormPreference'];

type Events =
      | { type: 'PICKED'; data: { profilePick: Profile; profileComp: Profile } }
      // | { type: 'NEXT'; data: Control<ProfileForm>}
      | { type: 'PREV' }
      | { type: 'SUBMIT'; data: Control<DormForm> }
      | { type: 'Form Input Changed'}

const mateAppMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EANgCs1AIwB2eQA5NAZkWKAnDx4AWRWoA0IAJ6I1J6jx0AmNQZ09nOtYpMBfPys0TBx8QlRSShp6JjZOLhUBJBBhUXFJaTkEeQcTHRMtTTVnHk0S5wMrWwRFTWVdFRUTExVjNv9AkGDsPAJicipqADMo9HowACdqABtmVAhKKA4ISRpKADdmBhoJsBgqCYxsXAnmEemwXiShETEJKWSszRMDagM8lQNtTz0vqsQVBVnG88qYNGpPHVFAEgkdQn0IgMaCMqGMDjM5gsKEtJqcprhphghswJshqLt9pM4SczmQLldpKk7hlHohvDpqBUDAYVDoDGo1Doij5-ghGs5lPINPIKrohfzNDCunDeuFIoMUWA0ZMMfNFhxcSTqASiSSyRSwAdqadzpdEozbukHqAsiYStR5N4VIo9J8mm5Rdy1NRig18q4fdyld14WqkcNRuMprASGwOAAFACSAGEANIAUQAIgzkkynZkATwvtRDJonKUCvItDpRU18iGIS0+e5Gjpoyqwv0ognUUnqJTDpgAASG3YQDgyWDoI7UVBDTATAAUrWMAEoODHVUONYn0ROjjOJnjICWbml7hXsvIVNQXrXfCYivkVK38hz3hK-JuhUig8Go-YhEeiLDt0ADKmD4DqsBgNMQzpjadJgBwABiZpTpmFC4LQ6BTtmJCoNiN78A694si6iB5MCoGtB+TglEKiiiiYYGOLyGgmD4RSaJ60KdIeg7QYMcEIbgSEoWhGEXNQKZsIsU7EqSHCwQAqgAQgAspmAAqt4pI6D6sggGgvuYPCfDkUoynyXHVh4WhfCo8hgXKEE9BJ6o0NJYCIcm8nobSSmwag6xqeFtrLKs1AbFsgUDgiAXUEFIXKWFik0FFMXYlOcWYQgyVEBg9xXKZZYWfRCAGIoL7go0ZRgh4ziit4PDUHyrjOJ69jON6fZiWlcYwUc8HBbJoWoSVkXRbFeUGleRomugGlkuJ6Xxlls05fNeXUAVy0RWAZUUJsFVOtV1GluZdGyHYnmvtxPrAZ+nyVDYbK8r1Tg6J5TlgfkHSwpB-l7VNMk6qczDIN06FgEMkyWkQWHpgASvmABqNWPc6z1WXWb3PIU8gKgY8itq4r68tyEo-HyvmxseqWYNN2Xw4jRzI6juwUBjOF4QRREkWRFEwBABO0UTWSNNT1DPDy4q1N6NO-Qg3HBnZ7KuM8zTqODyqQ7tk2c7DUw80juwC+jNAqawalbVpemGSZ913sy8sAooTaOK4LjuAJw2lC5mgA5Tnl1K0ui+KzUEZftcPMAjtso2jQv5UtRVY2nvPTvzWfCysgzJdsmXjezVeWzNqfp3zdslznhVQFO+eN0XzeCxjl3XZVkh3dcZly4+KjPMoAlCjKFRVi8lhazoAcGM43wDZ4TUCSbO0TVJMP19bBcZ-b2cnbn7ed4XYDFT3DurXixqEptZq1355v73X3PH03me963akr7dFvn-B2-dmA3SqvwWWPtx4+h6hPew7h3g8C8jwTiS9-oeGDm4FwAogaiQhu-PeHMwBcwOisUkxd-4ZhxvjL2o9YGWU8qvXq-t7BqGEhPIGLYtaAmDC0binkwLNEZs4ROUMLZkKttQShyBqH31wqSfChFiKkXIpRGWDDapPSyCUAUNYvj+35IoWUwkuI8T1j4CogIzD2EIabYhNcU5TDkQos+TsXZmjdgZYyMDyyWWcIxN4VY1BNF5J5AoEco48i0E1Uoegd7V0kqQ8hOo3F3zPqdIqhY8LuNLolCupC2YpLfmk1xZp8kAJyXkzJfdyqDwoMPGiTD6pBLcDWewiTKbOAqLw6oZQXwlDqMNECy87ISI-qkmRGTQFZIvlOXJyiqkP3Ws-Lab8SnJwPtlWZp8Mbnzbos2pcz6lXQgY05pD0x6BKFJHTQgI3K9O8LUTqmCer6FMd4SmLwtAdE6CwCAcBpC73Zi0gJ9VXp5AKNoYopRyg-WqAAWnKL1JQvzzDGJ9OIsaZsSF0EYCwdg4K6rEzKL1R5dlOHLyKDkUUSLGgOG0DKWJ7gmpr0mfizU2oJgkt0WyCUnJuQ8j5Pg4UGDqhGAEcy5eAkfAeAcaC0p3KxyzD1NiPlvtsifA9J4VwjUWXoMRQCPIrxl4uG9CUHp4FcVOOVaeJCqZWCasfEYHqOgPWAnUO8TQ7wJUAk+MCASphPU8N+ZymuKqzyWipNOWckAXWWQKMGJsxhQJ6CUKvCUtMDFViBMNQwTgygRvtaOdEs4pzTDIMgMQM4ZAY0gAm65rSyU+DeDYsJRgzC6DeZK94bwpTaGpi0GUugS3bK-rNRN9UPXyBrHZdBzQ2JFv9QgPkbx8icI0CUDWn4kl4ucTsg6yEjrnWncTIUDhmKLu4i4Fdopen1CCcIvVdZPQ4qIVs6Gk65KnttMpJ1XjSTnqyM+GyLF47oIhL00UpjlAGvcKg7Quh3Dju-dIw+h0FLnUOWdW0IG7CeE5F5Z41jjaCi6lKQOE9MWNCUB+xxX6pHlPJD-TAVSCNiiaPcl4jRATq39g+wVZRBG8hcKBLyo1P1J3Qyxm2v99mO0A0VLanHeTPl6s8IU-GPDcU1tUODbxjGAmpsDX1aHmMyPk+xup1TL5sZvhx5tELiYjWDBKGem6IQQh-EvKjngaM+Do6Yizn8MO7MqbZzjCLDF1EptYr45itbPMcBoUorR3g+ZcKF6ZmG9ktwA6pFTZposDRsr0looF0sUa1oZhDHrSjU0njlspMzIunLs8c5ZUXnOkr0UKDkn4cijIGo+1d3yQmPt9WvFwMp5ABACEAA */
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
            "Form Input Changed": {
              target: ".showing form",
              actions: "assignProfileFormInputToCtx"
            }
          },

          states: {
            "showing form": {
              on: {
                SUBMIT: "Saving Profile"
              }
            },

            "Saving Profile": {
              invoke: {
                src: "saveProfile",
                onDone: {
                  target: "#mate_app_machine.mateStepper.roommatePreference",
                  actions: "incrementStep"
                },
                onError: "showing form"
              }
            }
          },

          initial: "showing form"
        },

        roommatePreference: {
          on: {
            PREV: {
              target: 'selfProfile',
              actions: 'decrementStep',
            },

            "Form Input Changed": {
              target: ".showing form",
              actions: "assignMatePrefFormInputToCtx"
            }
          },

          states: {
            "showing form": {
              on: {
                SUBMIT: "Saving Roommate Preference"
              }
            },

            "Saving Roommate Preference": {
              invoke: {
                src: "saveMatePref",
                onDone: {
                  target: "#mate_app_machine.mateStepper.dormPreference",
                  actions: "incrementStep"
                },
                onError: "showing form"
              }
            }
          },

          initial: "showing form"
        },

        dormPreference: {
          on: {
            PREV: {
              target: 'roommatePreference',
              actions: 'decrementStep',
            },

            "Form Input Changed": {
              target: ".showing form",
              actions: "assignDormPrefFormInputToCtx"
            }
          },

          states: {
            "showing form": {
              on: {
                SUBMIT: "Saving Dorm Preference"
              }
            },

            "Saving Dorm Preference": {
              invoke: {
                src: "saveDormPref",
                onDone: "#mate_app_machine.finetuner",
                onError: "showing form"
              }
            }
          },

          initial: "showing form"
        }
      }
    },
  },
  schema: {
    events: {} as Events,
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});

export default mateAppMachine;
