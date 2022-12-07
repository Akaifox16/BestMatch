import {
	Button,
	Grid,
	Paper,
	Slider,
	TextField,
	Typography,
} from '@mui/material'
import { display } from '@theme/lightTheme'
import DotSlider from './Input/DotSlider'

const ProfileCard = () => {
	return (
		<Paper elevation={1} variant='outlined' sx={{ m: 8 }}>
			<Grid container spacing={2} sx={{ my: 2, p: 4 }}>
				{/* 1st row */}
				<Grid
					item
					xs={8}
					sx={{ justifyContent: 'left', display: 'flex' }}
				>
					<Typography variant='h4'>Profile</Typography>
				</Grid>
				<Grid
					item
					xs={4}
					sx={{ justifyContent: 'right', display: 'flex' }}
				>
					{/* configuration icon here */}
					<Button color='success' variant='contained'>
						แก้ไข
					</Button>
				</Grid>

				{/* 2nd row */}
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
				<Grid item xs={12} md={6}>
					<TextField
						label='สกุล'
						variant='outlined'
						sx={{ display: display.mobile.main }}
					/>
				</Grid>

				{/* scale group */}
				<Grid item xs={12} md={8}>
					<DotSlider
						fieldName='การรักษาความสะอาด'
						defaultValue={4}
						step={1}
						min={1}
						max={9}
					/>
				</Grid>
				<Grid item xs={0} md={4}></Grid>
				<Grid item xs={12} md={8}>
					<DotSlider
						fieldName='ทนทานต่อเสียงรบกวน'
						defaultValue={4}
						step={1}
						min={1}
						max={9}
					/>
				</Grid>
				<Grid item xs={0} md={4}></Grid>
			</Grid>
		</Paper>
	)
}

export default ProfileCard
