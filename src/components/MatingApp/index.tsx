import {
	currentStateSelector,
	MateStepperProvider,
	useMateStepperMachine,
} from '@component/Context/MateStepperContext'
import ProfileCard from '@component/ProfileCard'
import { MatchVariant } from '@component/ProfileCard/index.type'
import {
	Box,
	Button,
	Stack,
	Step,
	StepLabel,
	Stepper,
} from '@mui/material'
import { useSelector } from '@xstate/react'
import { Fragment } from 'react'

const steps = [
	'ระบุลักษณะของคุณ',
	'ระบุลักษณะรูมเมทที่คุณอยากได้',
	'ระบุลักษณะห้องพักที่คุณอยากได้',
]

const MatingApp = () => {
	const { step } = useMateStepperMachine()

	return (
		<Stack spacing={2} sx={{ mt: 2, width: '100%' }}>
			<Stepper activeStep={step}>
				{steps.map((step) => {
					return (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
						</Step>
					)
				})}
			</Stepper>
			<ContentSelector activeStep={step} />
		</Stack>
	)
}

const ContentSelector = ({
	activeStep,
}: {
	activeStep: number
}) => {

	const { mateService, plusOne, subOne } = useMateStepperMachine()
	const currentState = useSelector(
		mateService,
		currentStateSelector,
	)
	const next = () => {
		mateService.send({type: 'NEXT'})
		plusOne()
	}
	const back = () => {
		mateService.send({type: 'BACK'})
		subOne()
	}

	return (
		<Fragment>
			<ProfileCard variant={currentState as MatchVariant} />
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button
					color='inherit'
					disabled={activeStep === 0}
					onClick={back}
					sx={{ mr: 1 }}
				>
					กลับ
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />
				<Button onClick={next}>
					{activeStep === steps.length - 1 ? 'ไปจับคู่กัน' : 'ต่อไป'}
				</Button>
			</Box>
		</Fragment>
	)
}

const MatingAppWrap = () => {
	return (
		<MateStepperProvider>
			<MatingApp />
		</MateStepperProvider>
	)
}

export default MatingAppWrap
