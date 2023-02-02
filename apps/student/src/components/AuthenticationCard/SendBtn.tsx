import { ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';

import type { AuthenicationCardProps } from './index';

export default function SendBtn({
  variant,
}: Pick<AuthenicationCardProps, 'variant'>) {
  return (
    <Button
      variant='contained'
      color='success'
      type='submit'
      endIcon={<ChevronRight />}
    >
      {variant}
    </Button>
  );
}
