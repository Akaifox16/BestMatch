import { Stack, Step, StepLabel, Stepper, Button, Box } from '@mui/material';

import type { ParentNode } from '@utility/type';

type UseMateStepperMachine = {
  step: number;
  handlePrev: () => void;
  handleNext: () => void;
};

// TODO: BM-109 | move steps to th-TH dict object ˥
//                                                |
//                                                |
//                                                v
// export const steps = ['ฉันเป็นใคร', 'ใครคือเมทของฉัน', 'ที่พักในฝัน'];
const steps = ['who are you?', 'who is my roommate', 'where should i live?'];

export default function MatingAppWrapper({
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
        <SubmitBtn step={step} handleNext={handleNext} />
      </Box>
    </Stack>
  );
}

function SubmitBtn({
  step,
  handleNext,
}: {
  step: number;
  handleNext: () => void;
}) {
  return (
    <Button type='submit' form={step === 2 ? 'dorm-form' : 'student-form'} onClick={handleNext}>
      {step === steps.length - 1 ? "let's get started" : 'next'}
    </Button>
  );
}
