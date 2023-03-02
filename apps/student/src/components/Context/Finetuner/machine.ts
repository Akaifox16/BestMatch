import { createMachine} from 'xstate';

// type Context = {};
// type Events = {}

const finetunerMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QDMCWA7MAXArpgTgPoC2AhgMYAWGYAdADYD2pEGUAxBI5rRgG6MA1nXxgYBUljCEADvkZp6YANoAGALqJQMxrFRZU3LSAAeiALQBGABy0ATABYAbJct3rdgMwPrTz+4AaEABPCwB2O1owjwBWJzCATjDE1Ri7MIBfDKC0TFwCEgpqHlhKRgB3dgAFAEkAYQBpNU0kEB09AyNWswRzOwTbGLTVawSnBNcnO0sg0IQnB1p-d0TEtxikzKyg9EYIOGNc7DwwIjIqGmN2-UN0Yx7zBzDLWiHnazCY2YtLJ1VaBYxDyqFxheIxaLbEBHfKnQoXHhMFhsK66G5dUAPBxeV4xd6fb69MKeWi-JxOOIOBIOSwOEF2KEwk5nIo0WilCqojq3e6Ifr2Om+MG0sLOVTUwnWf5khZuTwxeWWOJZLJAA */
createMachine(
  {
    id: 'finetuner_machine',
    predictableActionArguments: true,
    context: {},
    initial: 'loading',
    states: {
      loading: {
        invoke: {
          id: 'regenerate_profile',
          src: 'regenerateProfile',
          onDone: {
            target: 'show',
          }
        }
      },

      show: {
        on: {
          PICK: {
            target: "loading",
            actions: ["pickProfile"]
          }
        }
      }
    }
  },
  {
    actions: {
      pickProfile: () => {}
    },
    services: {
      regenerateProfile: () => {
        return new Promise<void>((resolve, _reject) => {
          setTimeout(() => {
            console.log('Regenerating ...')
            resolve()
          }, 1000)
        })

      }
    }
  }
);

export default finetunerMachine;
