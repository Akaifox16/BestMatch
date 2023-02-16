import { Stack } from '@mui/system';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Slider } from '@component/Input';
import { trpc, type RouterInputs } from '@utility/trpc';
import type { StudentVariant } from '@component/ProfileCard/index.type';
import { exhaustiveMatchingGuard } from '@utility/util';
import TimeRangeChoices from '@component/Input/TimeRangeChoices';

type StudentFormProps = {
  variant: StudentVariant;
  disable?: boolean;
};

type FormInput = RouterInputs['student']['upsertProfile'];

export default function StudentForm({ variant, disable }: StudentFormProps) {
  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      do_not_disturb: [],
    },
  });
  const addProfile = trpc.student.upsertProfile.useMutation();
  const addPreference = trpc.student.upsertPreference.useMutation();

  const submit: SubmitHandler<FormInput> = (data) => {
    switch (variant) {
      case 'profile':
        addProfile.mutateAsync(data).catch(console.error);
        break;
      case 'matePref':
        addPreference.mutateAsync(data).catch(console.error);
        break;
      default:
        exhaustiveMatchingGuard(variant);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction='row'>
        <Slider
          control={control}
          name='messiness'
          label={''}
          disabled={disable}
        />
        <Slider
          control={control}
          name='loudness'
          label={''}
          disabled={disable}
        />
        <TimeRangeChoices
          control={control}
          name='do_not_disturb'
          disabled={disable}
        />
      </Stack>
    </form>
  );
}
