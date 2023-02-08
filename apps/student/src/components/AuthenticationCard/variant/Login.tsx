import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import { Stack } from '@mui/system';
import { Grid, Typography } from '@mui/material';

import FieldInput from '@component/Input/FieldInput';
import SendBtn from '../SendBtn';

import { RouterInputs } from '@utility/trpc';

function LoginForm() {
  const { control, handleSubmit } = useForm<RouterInputs['auth']['login']>();

  const submit: SubmitHandler<RouterInputs['auth']['login']> = (data) => {
    signIn('credentials', data);
  };

  return (
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
        <SendBtn variant='ล็อคอิน' />
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

const AuthField = () => {
  return (
    <>
      <FieldInput label='อีเมล์' />
      <FieldInput label='รหัสผ่าน' password />
    </>
  );
};

export { ForgotPasswordLink, CreateAccountLink, AuthField, LoginForm };
