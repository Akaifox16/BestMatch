import Link from 'next/link';

import { AccountCircle, Logout } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { Stack } from '@mui/system';

const UserBtn = () => {
  const { status } = useSession();

  return (
    <Box sx={{ flexGrow: 0 }}>
      {status === 'authenticated' ? <LogoutBtn /> : <LoginBtn />}
    </Box>
  );
};

const LoginBtn = () => {
  return (
    <Link id='login-btn' href={'/auth/login'}>
      <Button color='success' variant='contained'>
        ล็อคอิน
      </Button>
    </Link>
  );
};

const LogoutBtn = () => {
  const { data: sessionData } = useSession();

  function handleClick() {
    signOut().catch(console.error);
  }

  return (
    <Grid gap={2} container direction='row'>
      <Grid item>
        <Stack direction='row'>
          <AccountCircle fontSize='large' />
          <Typography variant='body1'>{sessionData?.user?.name}</Typography>
        </Stack>
      </Grid>
      <Grid item>
        <Link href='/'>
          <Button color='error' variant='contained' onClick={handleClick}>
            <Logout /> ลงชื่อออก
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default UserBtn;
