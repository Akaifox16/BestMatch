import { Button, Grid, Paper, Typography } from '@mui/material'

const ProfileCard = () => {
	return (
		<Paper elevation={1} variant='outlined' sx={{ m: 8 }}>
			<Grid container spacing={2} sx={{ my: 2 }}>
				{/* 1st row */}
				<Grid
					item
					xs={8}
					sx={{ justifyContent: 'left', display: 'flex' }}
				>
					<Typography variant='h4' sx={{ ml: 4 }}>
						Profile
					</Typography>
				</Grid>
				<Grid
					item
					xs={4}
					sx={{ justifyContent: 'right', display: 'flex' }}
				>
					{/* configuration icon here */}
					<Button color='success' variant='contained' sx={{ mr: 8 }}>
						edit
					</Button>
				</Grid>

				{/* 2nd row */}
				<Grid item xs={12} md={6}></Grid>
				<Grid item xs={12} md={6}></Grid>

				{/* scale group */}
				<Grid item xs={12} md={8}></Grid>
				<Grid item xs={0} md={4}></Grid>
				<Grid item xs={12} md={8}></Grid>
				<Grid item xs={0} md={4}></Grid>
			</Grid>
		</Paper>
	)
}

export default ProfileCard
