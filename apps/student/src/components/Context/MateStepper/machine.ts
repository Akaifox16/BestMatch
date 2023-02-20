import { assign, createMachine } from 'xstate';

type Context = {
  formData: {
    selfProfile: Record<string, any>;
    roommatePreference: Record<string, any>;
    dormPreference: Record<string, any>;
  };
  currentStep: number;
};

type Events = { type: 'PREV' } | { type: 'NEXT' } | { type: 'SUBMIT' };

const mateStepperMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9WmAOeYATlmgMYAWAlgHZgB0sYANgGYAKRA9q1c2AGIAcgFEAGgBUA2gAYAuolB4usKuipcaikAA9EAFgCMAJnoBmQwA4ArNZlmz+68Zv6ANCACeiQ2YCc9IaGAGyG1gDsZuEywcH6xgC+CR5omDj4hCTk1HT03FzIqWCcYKzEYDRkguwASiIAarIKSCDKquqa2noI8eH0+vpmxg7G+pHBfuEe3ggAtIYyfZZW4X6j1n4ylmY2SSkY2LhgBMSkqJS0DPmFByVlRBVVwuLS8tptahpaLd2Wxn0ucKDUYyMLhQzTHyGPpBeL2RbWWLgxLJEBFdLHTJnC65CBcIjIO7lSrVOqNN4tD4db6gX6xejBZygpyWGTDUGQuZhGT0SyWcHOeJ+P7BYwo-ZpI4nLLnHIMPEEokPEkCADKAFUAEIAWQAkq9mkoVJ9Oj8fMYJvRrDtBpY-Iz4iZOb4eY67P9HC5Qns0QcMdLsXLGABXABGyDU6hoUDVWr1EgkIgAIk13sbqV0fENTBFhvptn5-HFOU59PQ-Po4oY1jYZDFfElUTQuBA4Np0VKsdlLmn2l9MwgVuWIr5raLGfyzJzZsNLOZYg4gXZbMEZNYfR2Mqdu7kmGxODw+GBeyaabpEMNrMPwWYxxbrJPOcErWZgtFBvpC2t7H4N37O9usqXHkXAFEUSqPMelLpv2ZoIA+hj0OExjWp+YqjoynIBPYb4yB+X7GHhf6SluMo4vK+KEg89yQSeGZwQsb5IaC34FuE4QPs6iFjsE-JxDEYzOJYxGHKRgbAbAYYRugUZQHRsG0ua9r0GyhZbLefjusYnIWIhfibHyvFBIWITBCJ-pdkBuKaFBRp9qaimDkMz5stYYw7BxvH2JythztW4QivEgz2uEjYJEAA */
  createMachine<Context, Events>(
    {
      id: 'mate_stepper_machine',
      initial: 'selfProfile',
      predictableActionArguments: true,
      context: {
        formData: {
          selfProfile: {},
          roommatePreference: {},
          dormPreference: {},
        },
        currentStep: 0,
      },
      states: {
        selfProfile: {
          on: {
            NEXT: {
              target: 'roommatePreference',
              actions: ['saveSelfProfileFormData', 'incrementStep'],
            },
          },

          entry: 'loadSelfProfile',
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

          entry: 'loadRoommatePreference',
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

          entry: 'loadDormPreference',
        },
        submitting: {
          entry: 'submitForm',
        },
      },
    },
    {
      actions: {
        saveSelfProfileFormData: assign({
          formData: (ctx, evt) => ({
            ...ctx.formData,
            // selfProfile: evt.formData,
          }),
        }),
        saveRoommatePreferenceFormData: assign({
          formData: (ctx, evt) => ({
            ...ctx.formData,
            // roommatePreference: evt.formData,
          }),
        }),
        saveDormPreferenceFormData: assign({
          formData: (ctx, evt) => ({
            ...ctx.formData,
            // dormPreference: evt.formData,
          }),
        }),
        incrementStep: assign({
          currentStep: (ctx) => ctx.currentStep + 1,
        }),
        decrementStep: assign({
          currentStep: (ctx) => ctx.currentStep - 1,
        }),
        submitForm: () => {
          console.log('TODO');
        },
      },
    }
  );

export default mateStepperMachine;

// const mateStepperMachine =
// createMachine( {
//  id: 'mate_app_machine',
//  initial: 'unknown',
//  context: {
//  initial: true,
//  profile: undefined,
//  },
//  predictableActionArguments: true,
//  states: {
//  unknown: {
//  always: [{ target: 'profile', cond: 'isInit' }, { target: 'tuner' }],
//         },
//         profile: {
//           on: {
//             NEXT: 'matePref',
//           },
//         },
//         matePref: {
//           on: {
//             NEXT: 'roomPref',
//             BACK: 'profile',
//           },
//         },

//         roomPref: {
//           on: {
//             NEXT: {
//               target: 'tuner',
//               actions: 'initialized',
//             },
//             BACK: 'matePref',
//           },
//         },
//         tuner: {
//           initial: 'genProfile',
//           states: {
//             showProfile: {
//               on: {
//                 ACCEPTED: {
//                   target: 'genProfile',
//                   actions: 'accepted_feedback',
//                 },

//                 REFUSED: {
//                   target: 'genProfile',
//                   actions: 'refused_feedback',
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     {
//       guards: {
//         isInit: ({ initial }, _evt) => {
//           return initial;
//         },
//       },
//       actions: {
//         initialized: (ctx, _evt) => {
//           ctx.initial = true;
//         },
//       },
//     }
//   );

// export default mateStepperMachine;
