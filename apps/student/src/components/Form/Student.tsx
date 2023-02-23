import { Stack } from '@mui/system';
import { type SubmitHandler, useForm, Control } from 'react-hook-form';
// import type { MultiSelectElementProps, FieldValues } from 'react-hook-form-mui';
// import { MultiSelectElement } from 'react-hook-form-mui';

import { Slider } from '@component/Input';
import { trpc, type RouterInputs } from '@utility/trpc';
import type { StudentVariant } from '@component/ProfileCard/index.type';
import { exhaustiveMatchingGuard } from '@utility/util';
import TimeRangeChoices from '@component/Input/TimeRangeChoices';

type FormInput = RouterInputs['student']['upsertProfile'];
type StudentFormProps = {
  control: Control<FormInput>;
  // variant: StudentVariant;
  disable?: boolean;
};

export default function StudentForm({
  // variant,
  disable,
  control,
}: StudentFormProps) {
  // const addProfile = trpc.student.upsertProfile.useMutation();
  // const addPreference = trpc.student.upsertPreference.useMutation();

  // const submit: SubmitHandler<FormInput> = async (data) => {
  //   try {
  //     switch (variant) {
  //       case 'profile':
  //         await addProfile.mutateAsync(data);
  //         break;
  //       case 'matePref':
  //         await addPreference.mutateAsync(data);
  //         break;
  //       default:
  //         exhaustiveMatchingGuard(variant);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
