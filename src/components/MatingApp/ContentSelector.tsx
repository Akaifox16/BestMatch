import { currentStateSelector, useMateStepperMachine } from "@component/Context/MateStepperContext"
import MatingCard from "@component/MatingCard"
import { MatchVariant } from "@component/ProfileCard/index.type"
import { Box, Button } from "@mui/material"
import { useSelector } from "@xstate/react"
import { Fragment } from "react"
import { steps } from "."

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
			<MatingCard variant={currentState as MatchVariant} />
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

export default ContentSelector