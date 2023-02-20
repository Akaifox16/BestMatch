import { useMachine } from '@xstate/react';
import { Stack, Step, StepLabel, Stepper, Button, Box } from '@mui/material';
// import ContentSelector from './ContentSelector';

import type { MatchVariant } from '@component/ProfileCard/index.type';

import {
  MateStepperProvider,
  // useMateStepperMachine,
} from '@component/Context/MateStepper';
import MatingCard from '@component/MatingCard';
import mateStepperMachine from '@component/Context/MateStepper/machine';

export const steps = ['ฉันเป็นใคร', 'ใครคือเมทของฉัน', 'ที่พักในฝัน'];

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

const MatingApp = () => {
  const [state, send] = useMachine(mateStepperMachine);

  function handleNext() {
    send('NEXT');
  }

  function handlePrev() {
    send('PREV');
  }

  return (
    <Stack spacing={2} sx={{ mt: 2, width: '100%' }}>
      <Stepper activeStep={state.context.currentStep}>
        {steps.map((step) => {
          return (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <MatingCard variant={MatchVariantMapper(state.context.currentStep)} />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color='inherit'
          disabled={state.context.currentStep === 0}
          onClick={handlePrev}
          sx={{ mr: 1 }}
        >
          กลับ
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {state.context.currentStep === steps.length - 1
            ? 'ไปจับคู่กัน'
            : 'ต่อไป'}
        </Button>
      </Box>
      {/* <ContentSelector activeStep={state.context.currentStep} /> */}
    </Stack>
  );
};

const MatingAppWrapper = () => {
  return (
    <MateStepperProvider>
      <MatingApp />
    </MateStepperProvider>
  );
};

export default MatingAppWrapper;
