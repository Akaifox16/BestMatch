import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { Stack } from '@mui/system';
import { Grid, Typography } from '@mui/material';

import SendBtn from '../SendBtn';

import { trpc, type RouterInputs } from '@utility/trpc';

function LoginForm() {
  const { control, handleSubmit } = useForm<RouterInputs['auth']['login']>();
  const studentLogin = trpc.auth.login.useMutation();

  const submit: SubmitHandler<RouterInputs['auth']['login']> = (data) => {
    studentLogin
      .mutateAsync(data, {
        onSuccess: (data) => {
          if (data) signIn('credentials', data).catch(console.error);
        },
      })
      .catch(console.error);
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
        <TextFieldElement
          name='email'
          label='Email'
          control={control}
          fullWidth
        />
        <PasswordElement name='password' label='Password' control={control} />
        <CreateAccountLink />
        <SendBtn variant='login' />
      </Stack>
    </form>
  );
}

const ForgotPasswordLink = () => {
  return (
    <Link href='/forget-password'>
      <Typography>ลืมรหัสผ่าน?</Typography>
    </Link>
  );
};
const CreateAccountLink = () => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography variant='caption'>ยังไม่มีบัญชี bestmatch?</Typography>
      </Grid>
      <Grid item>
        <Link id='register-btn' href='/auth/register'>
          <Typography variant='caption'>สร้างบัญชีผู้ใช้ใหม่</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export { ForgotPasswordLink, CreateAccountLink, LoginForm };
