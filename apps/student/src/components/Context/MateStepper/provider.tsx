import { type ParentNode } from 'utils/type';
import { useContext, useRef, useState } from 'react';

import { createContext } from 'react';
import { interpret, type InterpreterFrom } from 'xstate';
import mateStepperMachine from './machine';

export const MateStepperCtx = createContext({
  mateService: {} as InterpreterFrom<typeof mateStepperMachine>,
  step: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStep: (_x: number) => {},
});

export default function MateStepperProvider({ children }: ParentNode) {
  const [step, setStep] = useState<number>(0);
  const mateStepper = useRef(
    interpret(mateStepperMachine)
      .onSend((evt) => console.log(`MateStepper: send ${evt.type}`))
      .onTransition((state) =>
        console.log(`MateStepper: transition to ${state.value.toString()}`)
      )
  );

  return (
    <MateStepperCtx.Provider
      value={{ mateService: mateStepper.current, step, setStep }}
    >
      {children}
    </MateStepperCtx.Provider>
  );
}

export function useMateStepperMachine() {
  const { mateService, setStep, step } = useContext(MateStepperCtx);

  function nextStep() {
    return setStep(step + 1);
  }

  function prevStep() {
    return setStep(step - 1);
  }

  return {
    mateService,
    step,
    nextStep,
    prevStep,
  };
}
