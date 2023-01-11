import RadioGroup from '@component/Input/RadioGroup'
import { Grid, Typography } from '@mui/material'
import { Fragment } from 'react'

const DormCard = () => {
	return (
		<Fragment>
			<RoomPref />
			<DormPref />
		</Fragment>
	)
}

export default DormCard

const DormPref = () => {
	return (
		<Fragment>
			<Typography variant='h5'>Dorm</Typography>
			<Grid item xs={12}>
				<RadioGroup
					label='ค่าหอ'
					values={['2000', '8000', '5000/เดือน']}
				/>
				<RadioGroup label='จำนวนรูมเมท' values={['2', '3', '4']} />
			</Grid>
		</Fragment>
	)
}

const RoomPref = () => {
	return (
		<Fragment>
			<Typography variant='h5'>Room</Typography>
			<Grid item xs={12}>
				<RadioGroup
					label='โซนห้องพัก'
					values={['ทะเลทราย', 'ป่าดงดิบ', 'อะไรก็เอา']}
				/>
				<RadioGroup
					label='ชั้นของห้องพัก'
					values={['1', '2', '3', '4', '5', 'อะไรก็เอา']}
				/>
			</Grid>
		</Fragment>
	)
}
