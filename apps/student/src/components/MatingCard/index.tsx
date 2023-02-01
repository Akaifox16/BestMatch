import CardTemplate from '@component/CardTemplate';
import {
  MatchCardProps,
  MatchVariant,
} from '@component/ProfileCard/index.type';
import { Button, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import DormCard from './Dorm';
import StudentCard from './Student';

const VariantSelector = ({ variant }: { variant: MatchVariant }) => {
  switch (variant) {
    case 'profile':
    case 'matePref':
      return <StudentCard variant={variant} />;
    case 'roomPref':
      return <DormCard />;
  }
};

const ProfileCard = ({ variant }: MatchCardProps) => {
  return (
    <CardTemplate name={variant} control={<GamblerOption variant={variant} />}>
      <VariantSelector variant={variant} />
    </CardTemplate>
  );
};

const GamblerOption = ({ variant }: { variant: MatchVariant }) => {
  switch (variant) {
    case 'matePref':
    case 'roomPref':
      return (
        <Grid container spacing={1}>
          <Grid item>
            <Typography>เชื่อในเรื่องดวง?</Typography>
          </Grid>
          <Grid item>
            <Button variant='text'>คลิกเลย</Button>
          </Grid>
        </Grid>
      );
    default:
      return <Fragment />;
  }
};
export default ProfileCard;
