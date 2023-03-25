import { Slider, TimeRangesChoices } from '@component/Input';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import type { RouterOutputs } from '@utility/trpc';

import { useForm } from 'react-hook-form';
import CardTemplate from '../CardTemplate';

type Profile = Omit<
  RouterOutputs['match']['generator']['profile_a'],
  'attribute'
>;

type ChoicerCardProps = {
  profile: Profile;
  handlePick: () => void;
};

export default function ChoicerCard({ profile, handlePick }: ChoicerCardProps) {
  const { control } = useForm<Profile>({
    defaultValues: profile,
  });

  return (
    <CardTemplate name={''} control={<></>}>
      <Stack sx={{ mx: 4 }}>
        <Stack direction='column'>
          <Slider
            control={control}
            name='messiness'
            label={'messiness'}
            disabled
          />
          <Slider
            control={control}
            name='loudness'
            label={'loudness'}
            disabled
          />
          <TimeRangesChoices control={control} name='do_not_disturb' disabled />
          <Button type='button' onClick={handlePick}>
            Pick
          </Button>
        </Stack>
      </Stack>
    </CardTemplate>
  );
}
