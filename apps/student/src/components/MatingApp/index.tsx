import { useMatingContext } from '@component/Context/MateApp';

import MateStepperForm from './MateStepper';
import Finetune from './Finetuner';

export default function MatingApp() {
  const { state } = useMatingContext();

  if (state.matches('mateStepper')) return <MateStepperForm />;

  if (state.matches('finetuner')) return <Finetune />;
}
