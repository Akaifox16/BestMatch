import {
  MatingAppContextProvider,
  useMatingContext,
} from '@component/Context/MateApp';

import MateStepperForm from './MateStepper';
import Finetune from './Finetuner';

function MatingApp() {
  const { state } = useMatingContext();

  if (state.matches('mateStepper')) return <MateStepperForm />;

  if (state.matches('finetuner')) return <Finetune />;

  return <div>{JSON.stringify(state.value)}</div>;
}

export default function WrappedMatingApp() {
  return (
    <MatingAppContextProvider>
      <MatingApp />
    </MatingAppContextProvider>
  );
}
