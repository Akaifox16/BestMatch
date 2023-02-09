import { SubmitHandler, useForm } from 'react-hook-form';

import { Slider, MultiChoices } from '@component/Input';
import type { StudentVariant } from '../ProfileCard/index.type';
import { RouterInputs, trpc } from '@utility/trpc';

const StudentCard = ({ variant }: { variant: StudentVariant }) => {
  const { control, handleSubmit } = useForm<RouterInputs['student'][]>();
  const upsertProfile = trpc.student.upsertProfile.useMutation();
  const upsertPreference = trpc.student.upsertPreference.useMutation();

  const submit: SubmitHandler<RouterInputs['student']['upsertProfile']> = (
    data
  ) => {
    if (variant === 'profile')
      upsertProfile.mutateAsync(data).catch(console.error);
    else upsertPreference.mutateAsync(data).catch(console.error);
  };

  return (
    <form /* onSubmit={handleSubmit(submit)} */>
      {/* <Slider control={control} name='messiness' label='messiness' /> */}
      {/* <Slider control={control} name='loudness' label='loudness' /> */}
      {/* <MultiChoices */}
      {/*   control={control} */}
      {/*   name='' */}
      {/*   label='do not disturb' */}
      {/*   options={[]} */}
      {/* /> */}
    </form>
  );
};

export default StudentCard;
