import { createMachine } from 'xstate';

// type Context = {};
// type Events = {}

const finetunerMachine = createMachine(
  {
    id: 'finetuner_machine',
    predictableActionArguments: true,
    context: {},
    states: {},
  },
  {
    actions: {},
  }
);

export default finetunerMachine;
