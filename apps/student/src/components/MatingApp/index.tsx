import { useMachine } from '@xstate/react';
import { Stack, Step, StepLabel, Stepper, Button, Box } from '@mui/material';

import type { MatchVariant } from '@component/ProfileCard/index.type';
import MatingCard from '@component/MatingCard';
import mateStepperMachine from '@component/Context/MateStepper/machine';

import type { ParentNode } from '@utility/type';

// TODO: BM-109 | move steps to th-TH dict object ˥
//                                                |
//                                                |
//                                                v
// export const steps = ['ฉันเป็นใคร', 'ใครคือเมทของฉัน', 'ที่พักในฝัน'];
const steps = ['who are you?', 'who is my roommate', 'where should i live?'];

// TODO: strict switch case
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
  // TODO: BM-89 | move form control to this stage

  function handleNext() {
    switch (state.context.currentStep) {
      case 0:
      case 1:
        // TODO: BM-89 | add form selector to save by state.context.currentStep
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
      step={state.context.currentStep}
      handlePrev={handlePrev}
      handleNext={handleNext}
    >
      {/* TODO: add form control to each form */}
      <MatingCard variant={MatchVariantMapper(state.context.currentStep)} />
    </MatingAppWrapper>
  );
}

type UseMateStepperMachine = {
  step: number;
  handlePrev: () => void;
  handleNext: () => void;
};

function MatingAppWrapper({
  children,
  step,
  handlePrev,
  handleNext,
}: ParentNode & UseMateStepperMachine) {
  return (
    <Stack spacing={2} sx={{ mt: 2, width: '100%' }}>
      <Stepper activeStep={step}>
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
          disabled={step === 0}
          onClick={handlePrev}
          sx={{ mr: 1 }}
        >
          back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {step === steps.length - 1 ? "let's get started" : 'next'}
        </Button>
      </Box>
    </Stack>
  );
}
