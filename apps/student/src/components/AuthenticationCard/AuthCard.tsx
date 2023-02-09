import { Grid, Paper, Stack } from '@mui/material';
import { type ParentNode } from '@utility/type';

export default function AuthCard({ children }: ParentNode) {
  return (
    <Grid
      container
      spacing={0}
      justifyContent='center'
      direction='row'
      sx={{ mt: 8 }}
    >
      <Grid item>
        <Stack
          direction='column'
          justifyContent='center'
          spacing={2}
          sx={{ minHeight: '90vh' }}
        >
          <Paper
            variant='elevation'
            elevation={2}
            sx={{
              justifyContent: 'center',
              minHeight: '30vh',
              p: 12,
            }}
          >
            {children}
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
}
