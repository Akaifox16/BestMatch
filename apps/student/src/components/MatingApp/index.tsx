import { useForm } from 'react-hook-form';
import { useMachine } from '@xstate/react';

import mateStepperMachine from '@component/Context/MateStepper/machine';
import MatingCard from '@component/MatingCard';
import MatingAppWrapper from './Wrapper';

import type { RouterInputs } from '@utility/trpc';
import { useMemo } from 'react';

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
  const memoizedMachine = useMemo(() => mateStepperMachine, []);
  const [state, send] = useMachine(memoizedMachine);

  const { control: profileForm } = useForm<StudentForm>(DEFAULT_VALUE);
  const { control: roommateForm } = useForm<RoommateForm>(DEFAULT_VALUE);
  const { control: dormForm } = useForm<DormForm>();

  function handleNext() {
    switch (state.context.currentStep) {
      // TODO: BM-89 | add form selector to save by state.context.currentStep
      case 0:
        send('NEXT', profileForm);
        break;
      case 1:
        send('NEXT', roommateForm);
        break;
      case 2:
        send('SUBMIT', dormForm);
    }
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
