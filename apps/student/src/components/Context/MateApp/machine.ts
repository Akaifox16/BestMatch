import { createMachine } from "xstate";
import { finetunerMachine } from "../Finetuner";
import mateStepperMachine from "../MateStepper/machine";

const mateAppMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAXMB9VAHXWaAxgBYCWAdmAHQCuFA1hQPYDuFAxAJIByXAKgG0ADAF1EoXM1hl0ZZhQkgAHogC0AJgDsAZmoAWAIwA2Yzp3HhAVgCcVrcJ0AaEAE9EOrRuo3Dh-cbaABw6QYY6VgC+kS5omDj4hKiklDT0TGycvAKChuJIIFIycgpKqgiaQcLUGsLC+kFWGho2+jbNLu4IVm3UDiH6PeG1QdGxGNh4BMTkVNRxYADKmPhgAE4cEAo0lABuzAw0C8tgq2uL67tkRGAi+ZLSsvKKBeVqJtQ6JhZhjsLaOn0+k6iCsVkMNUMzXBph0I2iMRALAgcCUCwS02SszASiKT1Kr3U+l0Bj8QKsxkMWmMWisQRBCA0QW8QX0nkpQP0wl8o0R6KmSRSc3SLHYuMeJReoDe+g0VlJ-kGlOptPpbg8XmoQRsrKMXwCNi8WjGIH5iRmqWoADNUuh6OtxcVnmVEH5qIZwcJAsI-FpDEFaQzjE0tc0gsZBnDicJjXyJhjBdj5hMTmdHfipSpXcYtf8oVyNIDPFYGZ5qnCWnKKdSNMY7AjIkA */
  id: 'mate_app_machine',
  context: { initialized: false},
  initial: 'unknown',
  states:{
    unknown: {
      on: {
        INIT: [{
          target: "mateStepper",
          cond: "isInitialize"
        }, "finetuner"]
      }
    },
    finetuner: {
      invoke: {
        id: 'finetunerService',
        src: finetunerMachine
      }
    },
    mateStepper: {
      invoke: {
        id: 'mateStepperService',
        src: mateStepperMachine,
        onDone: "finetuner"
      }
    }
  }
})

export default mateAppMachine