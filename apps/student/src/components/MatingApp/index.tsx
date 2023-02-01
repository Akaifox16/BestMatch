import {
  MateStepperProvider,
  useMateStepperMachine,
} from '@component/Context/MateStepper';
import { Stack, Step, StepLabel, Stepper } from '@mui/material';
import ContentSelector from './ContentSelector';

export const steps = ['ฉันเป็นใคร', 'ใครคือเมทของฉัน', 'ที่พักในฝัน'];

const MatingApp = () => {
  const { step } = useMateStepperMachine();

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
      <ContentSelector activeStep={step} />
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
