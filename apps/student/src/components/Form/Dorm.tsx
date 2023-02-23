import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { type RouterInputs, trpc } from '@utility/trpc';
import { type SubmitHandler, type Control, useForm } from 'react-hook-form';

import { RadioGroup } from '@component/Input';

const IGNORE_NUMBER = 99;

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
  { id: IGNORE_NUMBER, label: 'ignore' },
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
  { id: IGNORE_NUMBER, label: 'ignore' },
] satisfies Array<{
  id: FormInput['room_pref']['floor_number'];
  label: string;
}>;

type FormInput = RouterInputs['student']['upsertDormPreference'];
type DormFormProps = {
  control: Control<FormInput>;
};

export default function DormForm({ control }: DormFormProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form>
      <Stack direction='column'>
        <Stack direction='row'>
          <Stack>
            <Typography variant='h5'>Dorm</Typography>
            <Stack>
              {/* FIX: Add radio group label */}
              <RadioGroup
                control={control}
                name='dorm_type'
                options={dorm_type_options}
              />
              <RadioGroup
                control={control}
                name='residents_limit'
                number
                options={resident_options}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction='row'>
          <Stack>
            <Typography variant='h5'>Room</Typography>
            <Stack>
              {/* FIX: Add radio group label */}
              <RadioGroup
                control={control}
                name='room_pref.zone'
                options={zone_options}
              />
              <RadioGroup
                control={control}
                name='room_pref.floor_number'
                number
                options={floor_number_options}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}
