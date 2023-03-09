import { Stack } from '@mui/system';
import type { Control, useForm } from 'react-hook-form';

import { Slider } from '@component/Input';
import TimeRangeChoices from '@component/Input/TimeRangeChoices';

import { type RouterInputs } from '@utility/trpc';

type FormInput = RouterInputs['student']['upsertProfile'];
type StudentFormProps = {
  control: Control<FormInput>;
  handleSubmit: () => Promise<void>
  disable?: boolean;
};

export default function StudentForm({ disable, control, handleSubmit }: StudentFormProps) {
  return (
    <form id='student-form' onSubmit={handleSubmit}>
      <Stack direction='column' spacing={4} sx={{ m: 4, width: '50vw' }}>
        <Slider
          control={control}
          name='messiness'
          label={'messiness'}
          disabled={disable}
        />
        <Slider
          control={control}
          name='loudness'
          label={'loudness'}
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
