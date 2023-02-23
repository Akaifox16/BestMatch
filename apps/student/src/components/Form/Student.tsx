import { Stack } from '@mui/system';
import type { Control } from 'react-hook-form';

import { Slider } from '@component/Input';
import TimeRangeChoices from '@component/Input/TimeRangeChoices';

import { type RouterInputs } from '@utility/trpc';

type FormInput = RouterInputs['student']['upsertProfile'];
type StudentFormProps = {
  control: Control<FormInput>;
  disable?: boolean;
};

export default function StudentForm({ disable, control }: StudentFormProps) {
  return (
    <form>
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
