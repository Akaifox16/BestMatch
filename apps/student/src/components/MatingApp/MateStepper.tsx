import { SubmitHandler, useForm } from 'react-hook-form';

import { MatingCard } from '@component/Card';
import { useMatingContext } from '@component/Context/MateApp';

import MatingAppWrapper from './Wrapper';

import { RouterInputs, trpc } from '@utility/trpc';

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
  const { control: profileForm, handleSubmit: handleProfile } =
    useForm<StudentForm>(DEFAULT_VALUE);
  const { control: roommateForm, handleSubmit: handleMate } =
    useForm<RoommateForm>(DEFAULT_VALUE);
  const { control: dormForm, handleSubmit: handleDorm } = useForm<DormForm>();
  
  const upsertProfile = trpc.student.upsertProfile.useMutation()
  const upsertMate = trpc.student.upsertPreference.useMutation()
  const upsertDorm = trpc.student.upsertDormPreference.useMutation()

  const submitProfile: SubmitHandler<RouterInputs['student']['upsertProfile']> = (data) => {
    upsertProfile.mutateAsync(data).catch(console.error)
  }
  const submitRoommate: SubmitHandler<RouterInputs['student']['upsertPreference']> = (data) => {
    upsertMate.mutateAsync(data).catch(console.error)
  }
  const submitDorm: SubmitHandler<RouterInputs['student']['upsertDormPreference']> = (data) => {
    upsertDorm.mutateAsync(data).catch(console.error)
  }

  return (
    <MatingAppWrapper
      step={state.context.currentStep}
      handlePrev={() => send('PREV')}
      handleNext={() => send('NEXT')}
    >
      {state.context.currentStep === 0 && (
        <MatingCard variant='profile' control={profileForm} handleSubmit={handleProfile(submitProfile)} />
      )}

      {state.context.currentStep === 1 && (
        <MatingCard variant='matePref' control={roommateForm} handleSubmit={handleMate(submitRoommate)} />
      )}

      {state.context.currentStep === 2 && (
        <MatingCard variant='roomPref' control={dormForm} handleSubmit={handleDorm(submitDorm)} />
      )}
    </MatingAppWrapper>
  );
}
