import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { type Control } from 'react-hook-form';

import { RadioGroup } from '@component/Input';

import { type RouterInputs } from '@utility/trpc';

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

// TODO: Use import ***Form from @utils/type
type FormInput = RouterInputs['student']['upsertDormPreference'];
type DormFormProps = {
  control: Control<FormInput>;
};

export default function DormForm({ control }: DormFormProps) {
  return (
    <form>
      <Stack direction='column'>
        <Stack direction='row'>
          <Stack>
            <Typography variant='h5'>Dorm</Typography>
            <Stack>
              <RadioGroup
                control={control}
                name='dorm_type'
                label='dorm type'
                options={dorm_type_options}
              />
              <RadioGroup
                control={control}
                name='residents_limit'
                label='number of residents'
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
              <RadioGroup
                control={control}
                name='room_pref.zone'
                label='room zone'
                options={zone_options}
              />
              <RadioGroup
                control={control}
                name='room_pref.floor_number'
                label='floor number'
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
