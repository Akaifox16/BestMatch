import { useForm } from 'react-hook-form';

import { MatingCard } from '@component/Card';
import { useMatingContext } from '@component/Context/MateApp';

import MatingAppWrapper from './Wrapper';

import type { RouterInputs } from '@utility/trpc';

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

export default function MateStepperForm() {
  const { state, send } = useMatingContext();
  const { control: profileForm } = useForm<StudentForm>(DEFAULT_VALUE);
  const { control: roommateForm } = useForm<RoommateForm>(DEFAULT_VALUE);
  const { control: dormForm } = useForm<DormForm>();

  function handleNext() {
    if (state.can({type: 'SUBMIT' data:  })) send({type: 'SUBMIT' , data: dormForm});
    else send('NEXT');
  }

  function handlePrev() {
    send('PREV');
  }

  return (
    <MatingAppWrapper
      step={state.context.currentStep}
      handlePrev={handlePrev}
      handleNext={handleNext}
    >
      {state.context.currentStep === 0 && (
        <MatingCard variant='profile' control={profileForm} />
      )}

      {state.context.currentStep === 1 && (
        <MatingCard variant='matePref' control={roommateForm} />
      )}

      {state.context.currentStep === 2 && (
        <MatingCard variant='roomPref' control={dormForm} />
      )}
    </MatingAppWrapper>
  );
}
