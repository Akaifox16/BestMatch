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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EAZgAsi6gHYeAVlUA2bYp4BGA4o0AaEAE9EAWiMAmatvna7ADg0H5zux4MBfP3M0TBx8QlRSShp6JjZOLgMBJBBhUXFJaTkEVXVqA1V5dQBOZTtFbQ07cysEWwMHJxdVIpKjZtdXAKCMbDwCYnIqOkYWdm47JKERMQkpZKzPOyLqRSNtHiK7VUr5V2qbe0dvIp5nDV1NxS6QYN6wgajh2LGueUmU6fS50Cy9FaVtB1VHYeK4QUt9ggNO5qK55EZlAYeMjkVdAjceqF+hFBjQAGZRdD0MAAJ2oABtmKgIJQoBwIJIaJQAG7MBg0ElgGBUEmY3Ak5gE8lgXjvVIzDLzRCuZSwraKOwGc6uCo5SFFc7UeF2QqVDRFYEq663LHhSJDAlUIk8ilUmkUOmkgVk3DkjB45gk5DUTnc0l8gVCkX8aTir6ZBSAvIyzzaVSKZzubSQ1SuZY8Ewa+M6pSg42Yvpm3HUS1ga2k23U2kcJ2e6iu92e72+sA8gOCsjChJiz6zCMIVYaaiVTw6NwaZRaRSQ3QGagbHSrQzaIpw-MhQsPC2E4lk2AkNgcAAKAEkAMIAaQAogARUWh3uSn6IJFFeQrME+Zz1IqzyGv1w8nkA1BzBDRwKKdc7mxc18R3G0-V5TAAAJa05CAOBkWB0B6ahUDxTASQACiRZEAEoOBNTccUeUtyzJRCelQklnUge9kjDPspQQCptC1VweBBMElVOKpLBfZFVC1IxNg0QwdTfTp0So+4aKGW4AGVMHwUl6UZahsNwlSYOLTTtNwUl2KmNIuOfBAlX0NRAXkU4BJzCFxJ4zRqF-eFU2UcpfzRboN1U2DqDMsAdL3MByTxI9A07MAOAAOSvAANAAVKyPhsp9ZEQCCfJcYxdUTeFIQU4cDANVwauhJYdSg00txoSLop9ZhmGQW4ErAPFSVbIhkqPAAlK8ADUcs4-KsnAqSdAMdZSg6QcUz4gSWkMHgXFcHR9Wa6jwvaiyyQFbres5AbOQoYbUoy7KQw4x9vgK+zPHfVMNRRJc2kq4DqoNJwgcUbY82UgswtMnotKi07qAZL0+uuoaRvGqanusiVXoWTw52hNNnBOMo42TTydFhDYTiRXb9sgiHQpMx4TorRHkGRwbbuStKsuml7+yVGqViWHQVTKEEdH-MEVnklclhcooltUAJ0RYCA4GkYyiyiB88pxl8+ITcogSE8EikhaxwX4lw3y2HRDGCjFGe1oYYlGV6Zv1hBpe1Fz8jhQFFwthFYTFxWV3kDw3EOqHaPg0ldex-t5BBaNVmceNE3OSEtB4WFCnBU58i8emQugl24KtXdK3tKBE-DbjtGMD8KkElPNlOVR-yRBwCh8BVmicdR-AZ8vWpLeO9wPVh69st60yHRUCknJuarKSF3CHOEgZ4YFd82ZXR5atTK7LavGJQtDIFn2bEHKBwJwH7U3Gp9VHPvsoQJlOq7BjpntyrjaNCyFyRkGQGIVCMhhqQGvs9PW-Y9p5zqiXco6gOgGBnNCLUBd8g6iRKoTwf8K4RRhuZBOcCk7cXhHOJUHRFYtBaEYPYnlbB5xXIYYwsZyjgzLsfY6pC4YVlgLFeKiVhQ3y9pHZYtC0w1QYUwqW756h7TqktHUaZD68KOtDTAsMOrnR6j0DmN1hoSIQUiHycI7DrDknGaxzCagGDhHkNwqY1jqINEQ8eLMyRs2MajMx3FPAJlDoJW2xcChSzYU3QENU4Q5GaF4k+JDdFkL3LQAARuA9AmAICBLsiJPOOwNDlWsfqSqq5-h7RXOUYwaZtAqz8EAA */
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
      always: [{
        target: 'mateStepper',
        cond: 'isInitialize',
      }, {
        target: "mateStepper.roommatePreference",
        cond: "noRoommatePref",
        actions: "setMatePrefState"
      }, {
        target: "mateStepper.dormPreference",
        cond: "noDormPref",
        actions: "setDormPrefState"
      }, {
        target: 'finetuner',
      }],
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
