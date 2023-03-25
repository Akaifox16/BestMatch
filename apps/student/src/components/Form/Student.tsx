import { Stack } from '@mui/system';
import type { Control } from 'react-hook-form';
import { SliderElement } from 'react-hook-form-mui';

import { Slider } from '@component/Input';
import TimeRangeChoices from '@component/Input/TimeRangeChoices';

import { type RouterInputs } from '@utility/trpc';

type FormInput = RouterInputs['student']['upsertProfile'];
type StudentFormProps = {
  control: Control<FormInput>;
  handleSubmit?: () => Promise<void>;
  disable?: boolean;
};

export default function StudentForm({
  disable,
  control,
  handleSubmit,
}: StudentFormProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form id='student-form' onSubmit={handleSubmit}>
      <Stack direction='column' spacing={4} sx={{ m: 4, width: '50vw' }}>
        <SliderElement
          control={control}
          name='messiness'
          label='messiness'
          max={9}
          min={1}
          disabled={disable}
          marks
          required={disable ? false : true}
        />
        <SliderElement
          control={control}
          name='loudness'
          label='loudness'
          max={9}
          min={1}
          disabled={disable}
          required={disable ? false : true}
        />
        {/* <Slider */}
        {/*   control={control} */}
        {/*   name='messiness' */}
        {/*   label={'messiness'} */}
        {/*   disabled={disable} */}
        {/* /> */}
        {/* <Slider */}
        {/*   control={control} */}
        {/*   name='loudness' */}
        {/*   label={'loudness'} */}
        {/*   disabled={disable} */}
        {/* /> */}
        <TimeRangeChoices
          control={control}
          name='do_not_disturb'
          disabled={disable}
        />
      </Stack>
    </form>
  );
}
