import FieldInput from '@component/Input/FieldInput';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { LoginDto } from '@server/model/auth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';
import SendBtn from '../SendBtn';

function LoginForm() {
  const { control, handleSubmit } = useForm<LoginDto>();

  function submit() {}

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack
        direction='column'
        justifyContent='center'
        spacing={2}
        sx={{ minHeight: '30vh' }}
      >
        <TextFieldElement
          name='shape.email'
          label='Email'
          control={control}
          fullWidth
        />
        <PasswordElement
          name='shape.password'
          label='Password'
          control={control}
        />
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
        <Link href='/auth/register'>
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
