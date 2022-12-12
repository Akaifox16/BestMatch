import {
	FormControlLabel,
	FormGroup,
	Grid,
	Typography,
	Checkbox,
} from '@mui/material'

const timeRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

type TimeRangeCheckBoxGroupProps = {
	fieldName: string
	helper: string
}

const TimeRangeCheckBoxGroup = ({
	fieldName,
	helper,
}: TimeRangeCheckBoxGroupProps) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='body1'>{fieldName}</Typography>
				<Typography
					variant='subtitle1'
					fontSize={14}
					color={'red'}
					sx={{ ml: 1 }}
				>{`* ${helper}`}</Typography>
			</Grid>
			<Grid item xs={12}>
				<FormGroup row sx={{ ml: 2 }}>
					{timeRange.map((time) => {
						return (
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label={`${time.toString().padStart(2, '0')}:00`}
								sx={{ my: 1 }}
							/>
						)
					})}
				</FormGroup>
			</Grid>
			<Grid item xs={12}>
				<FormGroup row sx={{ ml: 2 }}>
					{timeRange
						.map((item) => item + 12)
						.map((time) => {
							return (
								<FormControlLabel
									control={<Checkbox />}
									label={`${time}:00`}
									sx={{ my: 1 }}
								/>
							)
						})}
				</FormGroup>
			</Grid>
		</Grid>
	)
}

export default TimeRangeCheckBoxGroup
