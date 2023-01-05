import ProfileCard from '@component/ProfileCard'
import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material'
import { Fragment, useState } from 'react'

export enum ActiveStep {
	profile,
	matePref,
	roomPref,
	tune,
}

const steps = [
	'ระบุลักษณะของคุณ',
	'ระบุลักษณะรูมเมทที่คุณอยากได้',
	'ระบุลักษณะห้องพักที่คุณอยากได้',
	'ไปตามหารูมเมทในฝันกัน',
]

const MatingApp = () => {
	const [activeStep, setStep] = useState<ActiveStep>(
		ActiveStep.profile
	)

	const handleNext = () => {
		setStep((currentStep) => currentStep + 1)
	}
	const handleBack = () => {
		setStep((currentStep) => currentStep - 1)
	}

	return (
		<Stack spacing={2} sx={{ mt:2,  width: '100%' }}>
      <Stepper activeStep={activeStep}>
				{steps.map((step) => {
					return (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
						</Step>
					)
				})}
			</Stepper>
				<ContentSelector activeStep={activeStep} />
		</Stack>
	)
}

const ContentSelector = ({
	activeStep,
}: {
	activeStep: ActiveStep
}) => {
	if (activeStep === steps.length) return <Fragment></Fragment>

	return (
		<Fragment>
			<ProfileCard variant='profile' />
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button
					color='inherit'
					disabled={activeStep === 0}
					sx={{ mr: 1 }}
				>
					กลับ
				</Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button>
          {activeStep === steps.length - 1 ? 'ไปจับคู่กัน' : 'ต่อไป'}
        </Button>
			</Box>
		</Fragment>
	)
}

export default MatingApp
