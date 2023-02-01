import RadioGroup from '@component/Input/RadioGroup'
import { Grid, Typography } from '@mui/material'

const DormCard = () => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<RoomPref />
			</Grid>
			<Grid item xs={6}>
				<DormPref />
			</Grid>
		</Grid>
	)
}

export default DormCard

const DormPref = () => {
	return (
		<Grid container>
			<Typography variant='h5'>Dorm</Typography>
			<Grid item xs={12}>
				<RadioGroup
					label='ค่าหอ (บาท/เทอม)'
					values={['2,400', '6,000', '8,750']}
				/>
			</Grid>
			<Grid item>
				<RadioGroup label='จำนวนรูมเมท' values={['2', '3', '4']} />
			</Grid>
		</Grid>
	)
}

const RoomPref = () => {
	return (
		<Grid container>
			<Typography variant='h5'>Room</Typography>
			<Grid item xs={12}>
				<RadioGroup
					label='โซนห้องพัก'
					values={['ทะเลทราย (ร้อน)', 'ป่าดงดิบ (เย็น)', 'อะไรก็เอา']}
				/>
			</Grid>
			<Grid item>
				<RadioGroup
					label='ชั้นของห้องพัก'
					values={['1', '2', '3', '4', '5', 'อะไรก็เอา']}
				/>
			</Grid>
		</Grid>
	)
}
