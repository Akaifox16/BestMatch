import {
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { display } from '@theme/lightTheme'
import { titleCase } from '@utility/util'
import { Fragment } from 'react'
import DotSlider from './Input/DotSlider'
import TimeRangeCheckBoxGroup from './Input/TimeRangeCheckboxGroup'
type ProfileCardProps = {
	variant: 'profile' | 'matePref' | 'roomPref' | 'summary' | 'tuner'
}

const attributeName = {
	messiness: {
		self: 'การรักษาความสะอาดของคุณ',
		mate: 'การรักษาความสะอาดของรูมเมท',
	},
	noise: {
		self: 'เสียงรบกวนที่คุณสร้าง',
		mate: 'เสืยงรบกวนที่คุณทนไหว',
	},
	time: {
		self: 'ช่วงเวลาที่ไม่ใช้เสียง',
		mate: 'ช่วงเวลาที่ไม่อยากให้ใช้เสียง',
	},
}
type AttributeGroup = keyof (typeof attributeName)
type AttributeName = typeof attributeName.messiness

const ProfileCard = ({ variant }: ProfileCardProps) => {
	return (
		<Paper elevation={1} variant='outlined' sx={{ m: 8 }}>
			<Grid container spacing={2} sx={{ my: 2, p: 4 }}>
				<CardTitle name={variant} editable={variant === 'profile'}/>
				{/* 2nd row */}
				<NameInput />
				<NormalInput />
			</Grid>
		</Paper>
	)
}

const CardTitle = ({name, editable}: {name: string, editable?: boolean}) => {
	return <Fragment>
				{/* 1st row */}
				<Grid
					item
					xs={10}
					sx={{ justifyContent: 'left', display: 'flex' }}
				>
					<Typography variant='h4'>{titleCase(name)}</Typography>
				</Grid>
				<Grid
					item
					xs={2}
					sx={{ justifyContent: 'right', display: 'flex' }}
				>
					{/* configuration icon here */}
					<Button color='success' variant='contained'>
						แก้ไข
					</Button>
				</Grid>
	</Fragment> 
}
const NameInput = () => {
	return <Fragment>
				<Grid item xs={12} md={8}>
					<TextField
						label='ชื่อ'
						variant='outlined'
						sx={{ display: { xs: 'none', md: 'inline-flex' }, mr: 4 }}
					/>
					<TextField
						label='สกุล'
						variant='outlined'
						sx={{ display: { xs: 'none', md: 'inline-flex' }, ml: 4 }}
					/>
					<TextField
						label='ชื่อ'
						variant='outlined'
						sx={{ display: display.mobile.main }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label='สกุล'
						variant='outlined'
						sx={{ display: display.mobile.main }}
					/>
				</Grid>
	</Fragment>
}

const NormalInput = () => {
	return <Fragment>
				{/* Slider group */}
				<Grid item xs={12}>
					<DotSlider
						fieldName={attributeName.messiness.self}
						defaultValue={0}
						step={1}
						min={1}
						max={9}
					/>
					<DotSlider
						fieldName={attributeName.noise.self}
						defaultValue={0}
						step={1}
						min={1}
						max={9}
					/>
				</Grid>
				{/* Time Range Checkbox  */}
				<Grid item xs={12}>
					<TimeRangeCheckBoxGroup
						fieldName={attributeName.time.self}
						helper='เช่น เวลานอน เวลาอ่านหนังสือ'
					/>
				</Grid>
	</Fragment>
}

export default ProfileCard
