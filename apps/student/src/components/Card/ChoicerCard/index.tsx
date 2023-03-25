import StudentForm from '@component/Form/Student';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';

import type { ComponentProps } from 'react';
import CardTemplate from '../CardTemplate';

type ChoicerCardProps = Pick<
  ComponentProps<typeof StudentForm>,
  'handleSubmit' | 'control'
> & {
  handlePick: () => void;
};

// TODO: BM-112 | Implement A or B card
export default function ChoicerCard({ control, handlePick }: ChoicerCardProps) {
  return (
    <CardTemplate name={''} control={<></>}>
      <Stack direction='column'>
      <StudentForm control={control} disable />
      <Button type='button' onClick={handlePick}>
        Pick
      </Button>
      </Stack>
    </CardTemplate>
  );
}
