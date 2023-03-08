import { createMachine } from 'xstate';

const mateAppMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxANoAMAuolC5msMujLMKgkAA9EAVgBs1eQGYAjD1UAmbTwAc+1fq0AaEAE9EAdgAs1LdusBOVT22rr82wF8f5tEwcfEJUUkoaeiY2Ti51ASQQYVFxSWk5BEV7W1VbRUNrPX09bWdzKwR5fXlqI3V1W1tNHhaeX38QQOw8AmJyKmoAMwj0ejAAJ2oAG2ZUCEooDghJGkoAN2YGGnGwGCpxjGxcceZhqbBeBKERMQkpRIzm1Wpbb2MjRUUeZ0V5csR6opnNRjNYvvp1IZvNo-AFDsFemF+jRhlRRvtprN5hRFhMTpNcFMMINmONkNQdnsJvDjqcyOdLtJkrc0g9EE0eA48s4eNZVM5tAV1P8EM55DUBRp1OKxaoNO04UEeqFwgNUWB0RNMXMFhw8aTqITiaTyZSwPsaSczhd4kybql7qAMtYXSoIUoxWKnLYRfo+W6eGo9OprLyeOpYZ14cq+hEhiMxpNYCQ2BwAAoASQAwgBpACiABFGYlmQ70gC5dZaoprJDPO48tpFCLmjVNNLjCHXLYfpGugiVcj42jE4ayEQGAACfU7CBLFbUdabGj9mNIuPqzUE8dTmeQBBLogYO6XYvXFJ3csIaU16iaazVGuQ+S8lty+x8gw6eshhp96MhLGaoJhiuA7tO4z4pAHAyLA6CHNQqCDJg4wABTSi0ACUHCroB67ASOoHgXuEBnkk9qXmy161lW0pNG4HhOOo2h-JYiDODkDi-PI6gcdotjVJC-5KnhqooiBWpgROk60ta84DEuWzULhiJicOGqjlJU6yfSYAHhQGxHg6p78HaF6sk6AJKLRvLVPybgPg0Lb8cCgrFCYfK2G0EYdCpg4bhJ27STp5x6pBBpGugJJkspAGqUOm6aeBIV6Yex6SCZVzkeZjqyACQL6NQ-H8uoqiKCx4buCKfLKJ8vLMc4PxAjwijCd0okJYFY7BVaulhfihpElFJqxSJ8UBYRknJb15z6YZ6UUKetolhRFl5deTjAi1cpNuGVTyGUbEIC62gqN8MptO4tltQOQHiZNkxUgcmAQVBc6wfBmCIchEzoa02F+Xd6lbtQT2HK9pKQGRpaUZZmQCkVqhKDkm3yA+1jOXoIJ+oGjQ8mVAk3WualdAAypg+ATPJNBwQhgP4Suhzk2AlPjNDq25Y8bjqNQij1HoLRIw03givIui1IYPavPoPYuDCvlxf5AxkxTuBarAYBTIMaYzWAHAAHJ5gAGgAKuzOVXt4nK5D8njGGLaiqCKLGFS6jWKJ4XwtfozhEx1cYqyzauTCczDIF0OtgIMEzmkQetpgASnmABq5sspzCheSCPYe3y1QsXKLbldQNE52LOg5IYfvjcrTOq1qofh4ckfRzsFBxwbxtm6ZK0W1RAqncYBjikoxQE87fNFS4rgtTyo-y4q7U14zmDM6z1DLGSLcx+38dJ6nPfnunV4D9jw-ivkHhZEXNTaCG-J8g0di8dXSsr2Aa-BxvJrb23HekwAVQAEIAFkMzdyyjDNajwmzPAEmCFqXgXRgmbEdJwhVZZGB9iYSsHs-AdBYBAOA0h6ZiTMsfKihU1CaB0EULB7gMZHQALQ+1qI-XkPFGifFeK-IGUQWDsHIWWKi-pPhZB4u2MWfJGEVCYYPVwCjSjwIfDWeQvCGbA0TEI2G60yqnTaM1PkAohQiiyMCSEdEaytD9AvKMY036aIxDMHUOJtHQMQF8Z4D5nC1m+A0FoPi3y-CKmoA6Yp3IFXUWpRKGJkxsDcRna8cpnjvEDAYQUPj+LOS0NQHxRivjODrNKKJnUHrdV3OFWcCSrx1k5DyUohRjAVVKr6BGgt7a2DctCEpE0NJER6nSc41SqLShDLkhqhQwR6CyE7I6WC7yuDvu4P0PFvg9IIn0rUYMXokWGXDHshV+Q+IMJCOwZV9Atg7CoO2csmyvF0Os+6mzJgzknFMMgyAxDThkHHSAkA9nrXqK8bOJVShoxMGjX0hQuJ6M+HKZwEJ9CPNGh-eu4wAUZCRsCAULoviaE9PUWZFQvCIyMN8LQL4ZZ4IVvYoGgd14ay1jrQZYAMXsl5LkpwCD8UHUJc7f0CLbBgkMD8BoxhkX0q-o3COOxW6x1Zb3ChcNQzYtnoGMqXgfGHQqE4ZQAkBINHyHkIwtjSFDklVqTeyBf7yrZdePxuTOweHFIGCE2h+WFUFRCY1xqdASrrkHdWtAABGnz0DiFcYq4RcNSoy15gdbwPE0ZuAuWg7wITijWTFL8P0SL8FAA */
  id: 'mate_app_machine',
  tsTypes: {} as import('./machine.typegen').Typegen0,
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
          invoke: {
            src: 'pickProfile',
            onDone: {
              target: 'loading',
              actions: 'clearErrorCount',
            },
          },

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

        'error limit exceeded': {},
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
          entry: 'submitForm',
          type: 'final',
        },
      },
      onDone: {
        target: 'finetuner',
      },
    },
  },
  schema: {
    context: {} as {
      initial: boolean;
    },
    events: {} as
      | { type: 'PICKED'; profileA: {}; profileB: {} }
      | { type: 'NEXT' }
      | { type: 'PREV' }
      | { type: 'SUBMIT' },
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});

export default mateAppMachine;
