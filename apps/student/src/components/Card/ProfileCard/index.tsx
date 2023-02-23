import { Fragment } from 'react';
import type { Control } from 'react-hook-form';

import CardTemplate from '../CardTemplate';
import StudentForm from '@component/Form/Student';

import { type ProfileCardProps } from './index.type';

import type { RouterInputs } from '@utility/trpc';

type Props = ProfileCardProps & {
  control: Control<RouterInputs['student']['upsertProfile']>;
};

// TODO: BM-114 | Add Summary Card that will rearrage field by the value
const ProfileCard = ({ variant, control }: Props) => {
  return (
    <CardTemplate name={variant} control={<Fragment />}>
      {/* <VariantSelector variant={variant} /> */}
      <StudentForm control={control} disable />
    </CardTemplate>
  );
};

export default ProfileCard;