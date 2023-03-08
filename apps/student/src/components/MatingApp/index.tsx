import { useForm } from 'react-hook-form';

import { MatingCard } from '@component/Card';
import MatingAppWrapper from './Wrapper';

import { RouterInputs } from '@utility/trpc';
import { useMatingContext } from '@component/Context/MateApp';

// TODO: Use import ***Form from @utils/type
type StudentForm = RouterInputs['student']['upsertProfile'];
type RoommateForm = RouterInputs['student']['upsertPreference'];
type DormForm = RouterInputs['student']['upsertDormPreference'];

const DEFAULT_VALUE = {
  defaultValues: {
    do_not_disturb: ['0', '1', '2', '3'],
    messiness: 3,
    loudness: 4,
  },
};

export default function MatingApp() {
  const { state } = useMatingContext();

  if (state.matches('mateStepper')) return <MateStepperForm />;

  if (state.matches('finetuner')) return <Finetune />;
}

function Finetune() {
  const { state } = useMatingContext()
  return <div>
    <div>this is fine tuner</div>
    <div>{JSON.stringify(state.value)}</div>
  </div>;
}

function MateStepperForm() {
  const { state, send, currentStep } = useMatingContext();
  const { control: profileForm } = useForm<StudentForm>(DEFAULT_VALUE);
  const { control: roommateForm } = useForm<RoommateForm>(DEFAULT_VALUE);
  const { control: dormForm } = useForm<DormForm>();

  function handleNext() {
    if (state.can('SUBMIT'))
      send('SUBMIT')
    else
      send('NEXT')
  }

  function handlePrev() {
    send('PREV');
  }
  return (
    <MatingAppWrapper
      step={currentStep}
      handlePrev={handlePrev}
      handleNext={handleNext}
    >
      {currentStep === 0 && (
        <MatingCard variant='profile' control={profileForm} />
      )}

      {currentStep === 1 && (
        <MatingCard variant='matePref' control={roommateForm} />
      )}

      {currentStep === 2 && (
        <MatingCard variant='roomPref' control={dormForm} />
      )}
    </MatingAppWrapper>
  );
}
