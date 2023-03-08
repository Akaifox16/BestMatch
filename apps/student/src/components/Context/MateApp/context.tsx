import { RouterOutputs, trpc } from "@utility/trpc"
import { ParentNode } from "@utility/type"
import { useMachine } from "@xstate/react"
import { createContext, useContext, useMemo, useState } from "react"
import mateAppMachine from "./machine"

type MatingAppMachineParams = ReturnType<typeof useMachine<typeof mateAppMachine>>
type GeneratorReturnValue = RouterOutputs['match']['generator']

const DEFAULT_ERROR_COUNT = 0 as const 

const MatingAppMachineContext = createContext({
  currentStep: 0,
  state: {} as MatingAppMachineParams[0],
  send: {} as MatingAppMachineParams[1],
})

export default function MatingAppContextProvider({ children }: ParentNode) {
  // check for authentication
  const { data, error } = trpc.student.getPreference.useQuery()
  if(error) return <div>Sorry please re-login</div>
  
  const [step, setStep] = useState(0)
  const [profileA, setProfA] = useState<GeneratorReturnValue['profile_a']>()
  const [profileB, setProfB] = useState<GeneratorReturnValue['profile_b']>()

  const [errorCount, setErrorCount] = useState<number>(DEFAULT_ERROR_COUNT)
    
  const memoizedMachine = useMemo(() => mateAppMachine, [])
  const [state, send] = useMachine<typeof mateAppMachine>( memoizedMachine, {
    actions: {
      submitForm: () => {},
      updateGeneratedProfile: (_ctx, evt) => {
        const {profile_a, profile_b} = evt.data as RouterOutputs['match']['generator']

        setProfA(profile_a)
        setProfB(profile_b)
      },
      
      // step
      decrementStep: () => setStep(step - 1),
      incrementStep: () => setStep(step + 1),
      
      // error
      clearErrorCount: () => {setErrorCount(DEFAULT_ERROR_COUNT)},
      incrementErrorCount: () => {setErrorCount(errorCount + 1)},
    },
    services: {
      pickProfile: async (ctx, evt) => {
        try {

        }catch(err) {
          console.log(err)
        }
      },
      regenerateProfile: async () => {
        const { data, error } = trpc.match.generator.useQuery(profileA, profileB)
        
        if (error)
          throw Error(error.message)
        
        return data satisfies RouterOutputs['match']['generator']
      },
    },
    guards: {
      isInitialize: () => !!data ,
      notExceedErrorLimitCount: () => true,
    }
  });
  
  return <MatingAppMachineContext.Provider value={{ currentStep: step, state, send}}>
    { children }
  </MatingAppMachineContext.Provider>
}

export const useMatingContext = () => useContext(MatingAppMachineContext)