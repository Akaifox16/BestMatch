import { Fragment } from 'react';
import type { Control } from 'react-hook-form';
import { Button, Grid, Typography } from '@mui/material';

import CardTemplate from '@component/CardTemplate';
import type { MatchVariant } from '@component/ProfileCard/index.type';

import StudentCard from './Student';
import DormCard from './Dorm';

import type { RouterInputs } from '@utility/trpc';

// TODO: Use import ***Form from @utils/type
type ProfileForm = RouterInputs['student']['upsertProfile'];
type RoommateForm = RouterInputs['student']['upsertPreference'];
type DormForm = RouterInputs['student']['upsertDormPreference'];

type ProfileProps =
  | { control: Control<ProfileForm>; variant: 'profile' }
  | { control: Control<RoommateForm>; variant: 'matePref' }
  | { control: Control<DormForm>; variant: 'roomPref' };

const ProfileCard = ({ variant, control }: ProfileProps) => {
  return (
    <CardTemplate name={variant} control={<GamblerOption variant={variant} />}>
      {variant === 'profile' && <StudentCard control={control} />}
      {variant === 'matePref' && <StudentCard control={control} />}
      {variant === 'roomPref' && <DormCard control={control} />}
    </CardTemplate>
  );
};

const GamblerOption = ({ variant }: { variant: MatchVariant }) => {
  switch (variant) {
    case 'matePref':
    case 'roomPref':
      // TODO: BM-109 | add Gambler Option dictionary
      return (
        <Grid container spacing={1}>
          <Grid item>
            <Typography>Gambling man?</Typography>
          </Grid>
          <Grid item>
            <Button variant='text'>Click here</Button>
          </Grid>
        </Grid>
      );
    default:
      return <Fragment />;
  }
};
export default ProfileCard;
