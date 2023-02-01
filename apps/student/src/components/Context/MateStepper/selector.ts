import mateStepperMachine from './machine';
import { StateFrom } from 'xstate';

type MateStepperState = StateFrom<typeof mateStepperMachine>;

export function profileSelector(state: MateStepperState) {
  return state.context.profile;
}

export function currentStateSelector(state: MateStepperState) {
  return state.value;
}
