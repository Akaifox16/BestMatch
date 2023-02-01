import { Fragment } from 'react';
import { Grid, TextField } from '@mui/material';

import TimeRangeCheckBoxGroup from '@component/Input/TimeRangeCheckboxGroup';
import DotSlider from '@component/Input/DotSlider';

import { display } from '@theme/lightTheme';

import {
  AttrName,
  ProfileOwner,
  StudentVariant,
} from '../ProfileCard/index.type';

const attrName: Record<ProfileOwner, AttrName> = {
  self: {
    messiness: 'การรักษาความสะอาดของคุณ',
    noise: 'เสียงรบกวนที่คุณสร้าง',
    time: 'ช่วงเวลาที่ไม่ใช้เสียง',
  },
  mate: {
    messiness: 'การรักษาความสะอาดของรูมเมท',
    noise: 'เสืยงรบกวนที่คุณทนไหว',
    time: 'ช่วงเวลาที่ไม่อยากให้ใช้เสียง',
  },
} as const;

const StudentCard = ({ variant }: { variant: StudentVariant }) => {
  return (
    <Fragment>
      <NameInput />
      <NormalInput
        attrName={variant === 'profile' ? attrName.self : attrName.mate}
      />
    </Fragment>
  );
};

export default StudentCard;
const NameInput = () => {
  return (
    <Fragment>
      <Grid item xs={12} md={8}>
        <TextField
          label='ชื่อ'
          variant='outlined'
          sx={{ display: { xs: 'none', md: 'inline-flex' }, mr: 4 }}
        />
        <TextField
          label='สกุล'
          variant='outlined'
          sx={{ display: { xs: 'none', md: 'inline-flex' }, ml: 4 }}
        />
        <TextField
          label='ชื่อ'
          variant='outlined'
          sx={{ display: display.mobile.main }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='สกุล'
          variant='outlined'
          sx={{ display: display.mobile.main }}
        />
      </Grid>
    </Fragment>
  );
};

const NormalInput = ({ attrName }: { attrName: AttrName }) => {
  return (
    <Fragment>
      {/* Slider group */}
      <Grid item xs={12}>
        <DotSlider
          fieldName={attrName.messiness}
          defaultValue={0}
          step={1}
          min={1}
          max={9}
        />
        <DotSlider
          fieldName={attrName.noise}
          defaultValue={0}
          step={1}
          min={1}
          max={9}
        />
      </Grid>
      {/* Time Range Checkbox  */}
      <Grid item xs={12}>
        <TimeRangeCheckBoxGroup
          fieldName={attrName.time}
          helper='เช่น เวลานอน เวลาอ่านหนังสือ'
        />
      </Grid>
    </Fragment>
  );
};
