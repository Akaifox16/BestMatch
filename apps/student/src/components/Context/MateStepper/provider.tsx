import { type ParentNode } from 'utils/type';
import { useContext, useRef } from 'react';

import { createContext } from 'react';
import { interpret, type InterpreterFrom } from 'xstate';
import mateStepperMachine from './machine';

export const MateStepperCtx = createContext({
  mateService: {} as InterpreterFrom<typeof mateStepperMachine>,
});

export default function MateStepperProvider({ children }: ParentNode) {
  const mateStepper = useRef(
    interpret(mateStepperMachine)
      .onSend((evt) => console.log(`MateStepper: send ${evt.type}`))
      .onTransition((state) =>
        console.log(`MateStepper: transition to ${state.value.toString()}`)
      )
  );

  return (
    <MateStepperCtx.Provider value={{ mateService: mateStepper.current }}>
      {children}
    </MateStepperCtx.Provider>
  );
}

export function useMateStepperMachine() {
  const { mateService } = useContext(MateStepperCtx);

  return {
    mateService,
  };
}
