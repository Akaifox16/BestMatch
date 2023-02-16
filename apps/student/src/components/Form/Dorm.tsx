import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { RouterInputs, trpc } from '@utility/trpc';
import { SubmitHandler, useForm } from 'react-hook-form';

import { RadioGroup } from '@component/Input';

// type DormFormProps = {};
type FormInput = RouterInputs['student']['upsertDormPreference'];

const dorm_type_options = [
  { id: 'BUFFET', label: 'buffet' },
  { id: 'MONTHLY', label: 'monthly' },
  { id: 'RENOVATED', label: 'renovated' },
  { id: 'IGNORE', label: 'ignore' },
] satisfies Array<{ id: FormInput['dorm_type']; label: string }>;

const resident_options = [
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
  { id: 0, label: 'ignore' },
] satisfies Array<{ id: FormInput['residents_limit']; label: string }>;

const zone_options = [
  { id: 'DESERT', label: 'desert' },
  { id: 'JUNGLE', label: 'jungle' },
  { id: 'IGNORE', label: 'ignore' },
] satisfies Array<{
  id: FormInput['room_pref']['zone'] | 'IGNORE';
  label: string;
}>;

const floor_number_options = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
  { id: 5, label: '5' },
  { id: 0, label: 'ignore' },
] satisfies Array<{
  id: FormInput['room_pref']['floor_number'];
  label: string;
}>;

export default function DormForm() {
  const { control, handleSubmit } = useForm<FormInput>();
  const createDormPreference = trpc.student.upsertDormPreference.useMutation();

  const submit: SubmitHandler<FormInput> = (data) => {
    createDormPreference.mutateAsync(data).catch(console.error);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction='column'>
        <Stack direction='row'>
          <Typography variant='h5'>Dorm</Typography>
          <RadioGroup
            control={control}
            name='dorm_type'
            options={dorm_type_options}
          />
          <RadioGroup
            control={control}
            name='residents_limit'
            options={resident_options}
          />
        </Stack>
        <Stack direction='row'>
          <Typography variant='h5'>Room</Typography>
          <RadioGroup
            control={control}
            name='room_pref.zone'
            options={zone_options}
          />
          <RadioGroup
            control={control}
            name='room_pref.floor_number'
            options={floor_number_options}
          />
        </Stack>
      </Stack>
    </form>
  );
}
