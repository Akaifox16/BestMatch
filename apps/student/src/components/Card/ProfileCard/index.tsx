import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import CardTemplate from '../CardTemplate';
import StudentForm from '@component/Form/Student';

import { type ProfileCardProps } from './index.type';

import type { RouterInputs } from '@utility/trpc';

type Props = ProfileCardProps & {
  profile: RouterInputs['student']['upsertProfile'];
};

// TODO: BM-114 | Add Summary Card that will rearrage field by the value
const ProfileCard = ({ variant, profile }: Props) => {
  const { control } = useForm({ defaultValues: profile });

  return (
    <CardTemplate name={variant} control={<Fragment />}>
      <StudentForm control={control} disable />
    </CardTemplate>
  );
};

export default ProfileCard;
