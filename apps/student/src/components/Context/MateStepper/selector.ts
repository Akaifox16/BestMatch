import type mateStepperMachine from './machine';
import type { StateFrom } from 'xstate';

type MateStepperState = StateFrom<typeof mateStepperMachine>;

export function profileSelector(state: MateStepperState) {
  return state.context.formData.selfProfile;
}

export function currentStateSelector(state: MateStepperState) {
  return state.value;
}
