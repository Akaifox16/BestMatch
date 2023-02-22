import type { RouterInputs } from '@utility/trpc';
import { assign, createMachine } from 'xstate';

type StudentRouteInput = RouterInputs['student'];
type Context = {
  formData: {
    selfProfile: StudentRouteInput['upsertProfile'];
    roommatePreference: StudentRouteInput['upsertPreference'];
    dormPreference: StudentRouteInput['upsertDormPreference'];
  };
  currentStep: number;
};

type ProfileForm = Context['formData']['selfProfile'];
type RoommateForm = Context['formData']['roommatePreference'];
type DormForm = Context['formData']['dormPreference'];

type Events =
  | { type: 'PREV' }
  | {
      type: 'NEXT';
      formData: ProfileForm | RoommateForm | DormForm;
    }
  | { type: 'SUBMIT' };

function isProfileForm(obj: unknown): obj is ProfileForm {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj !== null &&
    'messiness' in obj &&
    'loudness' in obj &&
    'do_not_disturb' in obj
  );
}

function isRoommateForm(obj: unknown): obj is RoommateForm {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj !== null &&
    'messiness' in obj &&
    'loudness' in obj &&
    'do_not_disturb' in obj
  );
}

function isDormForm(obj: unknown): obj is DormForm {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj !== null &&
    'dorm_type' in obj &&
    'residents_limit' in obj &&
    'room_pref' in obj
  );
}

const profile_template = {
  messiness: 3,
  loudness: 4,
  do_not_disturb: ['0', '1', '2', '3', '4', '5', '6', '7', '22', '23'],
};

const mateStepperMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9WmAOeYATlmgMYAWAlgHZgB0sYANgGYAKRA9q1c2AGIAcgFEAGgBUA2gAYAuolB4usKuipcaikAA9EAFgCMAJnoBmQwA4ArNZlmz+68Zv6ANCACeiQ2YCc9IaGAGyG1gDsZuEywcH6xgC+CR5omDj4hCTk1HT03FzIqWCcYKzEYDRkguwASiIAarIKSCDKquqa2noI8eH0+vpmxg7G+pHBfuEe3ggAtIYyfZZW4X6j1n4ylmY2SSkY2LhgBMSkqJS0DPmFByVlRBVVwuLS8tptahpaLd2Wxn0ucKDUYyMLhQzTHyGPpBeL2RbWWLgxLJEBFdLHTJnC65CBcIjIO7lSrVOqNN4tD4db6gX6xejBZygpyWGTDUGQuZhGT0SyWcHOeJ+P7BYwo-ZpI4nLLnHIMPEEokPEkCADKAFUAEIAWQAkq9mkoVJ9Oj8fMYJvRrDtBpY-Iz4iZOb4eY67P9HC5Qns0QcMdLsXLGABXABGyDU6hoUDVWr1EgkIgAIk13sbqV0fENTBFhvptn5-HFOU59PQ-Po4oY1jYZDFfElUTQuBA4Np0VKsdlLmn2l9MwgVuWIr5raLGfyzJzZsNLOZYg4gXZbMEZNYfR2Mqdu7kmGxODw+GBeyaabpEMNrMPwWYxxbrJPOcErWZgtFBvpC2t7H4N37O9usqXHkXAFEUSqPMelLpv2ZoIA+hj0OExjWp+YqjoynIBPYb4yB+X7GHhf6SluMo4vK+KEg89yQSeGZwQsb5IaC34FuE4QPs6iFjsE-JxDEYzOJYxGHKRgbAbAYYRugUZQHRsG0ua9r0GyhZbLefjusYnIWIhfibHyvFBIWITBCJ-pdkBuKaFBRp9qaimDkMz5stYYw7BxvH2JythztW4QivEgz2uEjYJEAA */
  createMachine<Context, Events>(
    {
      id: 'mate_stepper_machine',
      initial: 'selfProfile',
      predictableActionArguments: true,
      context: {
        formData: {
          selfProfile: profile_template,
          roommatePreference: profile_template,
          dormPreference: {
            dorm_type: 'IGNORE',
            residents_limit: 2,
            room_pref: { zone: 'DESERT', floor_number: 2 },
          },
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
          formData: (ctx, evt) => {
            if (evt.type === 'NEXT' && isProfileForm(evt.formData)) {
              return {
                ...ctx.formData,
                selfProfile: evt.formData,
              };
            }

            return { ...ctx.formData };
          },
        }),
        saveRoommatePreferenceFormData: assign({
          formData: (ctx, evt) => {
            if (evt.type === 'NEXT' && isRoommateForm(evt.formData))
              return {
                ...ctx.formData,
                roommatePreference: evt.formData,
              };

            return { ...ctx.formData };
          },
        }),
        saveDormPreferenceFormData: assign({
          formData: (ctx, evt) => {
            if (evt.type === 'NEXT' && isDormForm(evt.formData))
              return {
                ...ctx.formData,
                dormPreference: evt.formData,
              };

            return { ...ctx.formData };
          },
        }),
        incrementStep: assign({
          currentStep: (ctx) => ctx.currentStep + 1,
        }),
        decrementStep: assign({
          currentStep: (ctx) => ctx.currentStep - 1,
        }),
        submitForm: () => {
          // TODO
          console.log('TODO');
        },
      },
    }
  );

export default mateStepperMachine;
