import {
  currentStateSelector,
  useMateStepperMachine,
} from '@component/Context/MateStepper';
import MatingCard from '@component/MatingCard';
import { MatchVariant } from '@component/ProfileCard/index.type';
import { Box, Button } from '@mui/material';
import { useSelector } from '@xstate/react';
import { Fragment } from 'react';
import { steps } from '.';

function MatchVariantMapper(state: number): MatchVariant {
  switch (state) {
    case 0:
      return 'profile';
    case 1:
      return 'matePref';
    case 2:
      return 'roomPref';
    default:
      return 'profile';
  }
}

const ContentSelector = ({ activeStep }: { activeStep: number }) => {
  const { mateService, step, nextStep, prevStep } = useMateStepperMachine();
  const next = () => {
    mateService.send({ type: 'NEXT' });
    nextStep();
  };
  const back = () => {
    mateService.send({ type: 'BACK' });
    prevStep();
  };

  return (
    <Fragment>
      <MatingCard variant={MatchVariantMapper(step)} />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color='inherit'
          disabled={activeStep === 0}
          onClick={back}
          sx={{ mr: 1 }}
        >
          กลับ
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={next}>
          {activeStep === steps.length - 1 ? 'ไปจับคู่กัน' : 'ต่อไป'}
        </Button>
      </Box>
    </Fragment>
  );
};

export default ContentSelector;
