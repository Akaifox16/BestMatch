import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { interpret, InterpreterFrom, send, StateFrom } from 'xstate'

import { ParentNode } from '@utility/type'
import mateStepperMachine from '@utility/globalState/mateStepper'

const MateStepperCtx = createContext({
	mateService: {} as InterpreterFrom<typeof mateStepperMachine>,
	step: 0,
	setStep: (x: number) => {},
})

export const MateStepperProvider = ({ children }: ParentNode) => {
	const [step, setStep] = useState(0)
	const mateStepper = useRef(
		interpret(mateStepperMachine)
			.onSend((evt) => console.log(`MateStepper: ${evt.type}`))
			.onTransition((state) =>
				console.log(`MateStepper: state => ${state.value}`)
			)
	)

	useEffect(() => {
		mateStepper.current.start()
	}, [])

	return (
		<MateStepperCtx.Provider
			value={{ mateService: mateStepper.current, step, setStep }}
			// value={{ mateService: mateStepper.current }}
		>
			{children}
		</MateStepperCtx.Provider>
	)
}

export const profileSelector = (
	state: StateFrom<typeof mateStepperMachine>
) => state.context.profile

export const currentStateSelector = (
	state: StateFrom<typeof mateStepperMachine>
) => state.value

export const useMateStepperMachine = () => {
	const { mateService, setStep, step } = useContext(MateStepperCtx)

	const plusOne = () => setStep(step + 1)
	const subOne = () => setStep(step - 1)
	return {
		mateService,
		step,
		plusOne,
		subOne,
	}
}
