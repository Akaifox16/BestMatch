import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  PasswordElement,
  RadioButtonGroup,
  TextFieldElement,
} from 'react-hook-form-mui';
import { Stack } from '@mui/system';

import { type RouterInputs, trpc } from '@utility/trpc';
import SendBtn from '../SendBtn';
import { signIn } from 'next-auth/react';

function RegisterForm() {
  const { control, handleSubmit } = useForm<RouterInputs['auth']['register']>();
  const createStudent = trpc.auth.register.useMutation();

  const submit: SubmitHandler<RouterInputs['auth']['register']> = (data) => {
    createStudent.mutateAsync(data).catch(console.error);
    signIn('credentials', {
      email: data.email,
      password: data.password,
    }).catch(console.error);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(submit)}>
      <Stack
        direction='column'
        justifyContent='center'
        spacing={2}
        sx={{ minHeight: '30vh' }}
      >
        <Stack direction='row' spacing={2}>
          <TextFieldElement
            name='first_name'
            label='first name'
            control={control}
            fullWidth
          />
          <TextFieldElement
            name='last_name'
            label='last name'
            control={control}
            fullWidth
          />
        </Stack>
        <RadioButtonGroup
          name='sex'
          label='sex'
          options={[
            { id: 'MALE', label: 'ชาย' },
            { id: 'FEMALE', label: 'หญิง' },
          ]}
          control={control}
        />
        <TextFieldElement
          name='personal_id'
          label='personal id'
          control={control}
        />
        <TextFieldElement
          name='email'
          label='email'
          control={control}
          fullWidth
        />
        <PasswordElement
          name='password'
          label='password'
          control={control}
          fullWidth
        />
        <PasswordElement
          name='confirm_password'
          label='confirm password'
          control={control}
          fullWidth
        />
        <SendBtn variant='register' />
      </Stack>
    </form>
  );
}

export { RegisterForm };
