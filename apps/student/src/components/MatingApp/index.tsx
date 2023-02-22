import { useMachine } from '@xstate/react';
import { Stack, Step, StepLabel, Stepper, Button, Box } from '@mui/material';

import type { MatchVariant } from '@component/ProfileCard/index.type';
import MatingCard from '@component/MatingCard';
import mateStepperMachine from '@component/Context/MateStepper/machine';

import type { ParentNode } from '@utility/type';

// export const steps = ['ฉันเป็นใคร', 'ใครคือเมทของฉัน', 'ที่พักในฝัน'];
const steps = ['who are you?', 'who is my roommate', 'where should i live?'];

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

export default function MatingApp() {
  const [state, send] = useMachine(mateStepperMachine);

  function handleNext() {
    switch (state.context.currentStep) {
      case 0:
      case 1:
        send('NEXT');
        break;
      case 2:
        send('SUBMIT');
    }
  }

  function handlePrev() {
    send('PREV');
  }

  return (
    <MatingAppWrapper
      state={state}
      handlePrev={handlePrev}
      handleNext={handleNext}
    >
      <MatingCard variant={MatchVariantMapper(state.context.currentStep)} />
    </MatingAppWrapper>
  );
}

type UseMateStepperMachine = {
  state: ReturnType<typeof useMachine<typeof mateStepperMachine>>[0];
  handlePrev: () => void;
  handleNext: () => void;
};

function MatingAppWrapper({
  children,
  state,
  handlePrev,
  handleNext,
}: ParentNode & UseMateStepperMachine) {
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
      {children}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color='inherit'
          disabled={state.context.currentStep === 0}
          onClick={handlePrev}
          sx={{ mr: 1 }}
        >
          back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {state.context.currentStep === steps.length - 1
            ? "let's get started"
            : 'next'}
        </Button>
      </Box>
    </Stack>
  );
}
