import { Slider, TimeRangesChoices } from '@component/Input';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import type { RouterOutputs } from '@utility/trpc';
import { useEffect } from 'react';

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
  const { control, formState } = useForm<Profile>({
    defaultValues: profile,
  });

  return (
    <CardTemplate name={''} control={<></>}>
      <form>
        <Stack direction='column'>
          <Stack direction='column' spacing={4} sx={{ m: 4, width: '50vw' }}>
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
            <TimeRangesChoices
              control={control}
              name='do_not_disturb'
              disabled
            />
          </Stack>
          <Button type='button' onClick={handlePick}>
            Pick
          </Button>
        </Stack>
      </form>
    </CardTemplate>
  );
}
