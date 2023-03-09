import { Fragment } from 'react';
import type { Control } from 'react-hook-form';
import { Button, Grid, Typography } from '@mui/material';

import CardTemplate from '../CardTemplate';
import type { MatchVariant } from '../ProfileCard/index.type';

import StudentCard from './Student';
import DormCard from './Dorm';

import type { RouterInputs } from '@utility/trpc';

// TODO: Use import ***Form from @utils/type
type ProfileForm = RouterInputs['student']['upsertProfile'];
type RoommateForm = RouterInputs['student']['upsertPreference'];
type DormForm = RouterInputs['student']['upsertDormPreference'];

type ProfileProps =
  | { control: Control<ProfileForm>; variant: 'profile'; handleSubmit: () => Promise<void> }
  | { control: Control<RoommateForm>; variant: 'matePref'; handleSubmit: () => Promise<void> }
  | { control: Control<DormForm>; variant: 'roomPref'; handleSubmit: () => Promise<void> };

const ProfileCard = ({ variant, control, handleSubmit }: ProfileProps) => {
  return (
    <CardTemplate name={variant} control={<GamblerOption variant={variant} />}>
      {variant === 'profile' && <StudentCard control={control} handleSubmit={handleSubmit} />}
      {variant === 'matePref' && <StudentCard control={control} handleSubmit={handleSubmit} />}
      {variant === 'roomPref' && <DormCard control={control} handleSubmit={handleSubmit} />}
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
