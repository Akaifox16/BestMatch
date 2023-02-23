import { Stack } from '@mui/system';
import { type SubmitHandler, useForm } from 'react-hook-form';
// import type { MultiSelectElementProps, FieldValues } from 'react-hook-form-mui';
// import { MultiSelectElement } from 'react-hook-form-mui';

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
      messiness: 4,
      loudness: 3,
      do_not_disturb: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '22', '23'],
    },
  });
  const addProfile = trpc.student.upsertProfile.useMutation();
  const addPreference = trpc.student.upsertPreference.useMutation();

  const submit: SubmitHandler<FormInput> = async (data) => {
    try {
      switch (variant) {
        case 'profile':
          await addProfile.mutateAsync(data);
          break;
        case 'matePref':
          await addPreference.mutateAsync(data);
          break;
        default:
          exhaustiveMatchingGuard(variant);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={() => handleSubmit(submit)}>
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
        {/* <MultiSelectElement */}
        {/*   control={control} */}
        {/*   name='do_not_disturb' */}
        {/*   label='do not disturb' */}
        {/*   options={timeOptions} */}
        {/*   disabled={disable} */}
        {/*   required */}
        {/*   showChips */}
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
