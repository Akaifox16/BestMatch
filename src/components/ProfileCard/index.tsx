import { Button, Grid, Paper, Typography } from '@mui/material'
import { titleCase } from '@utility/util'
import { Fragment } from 'react'
import DormCard from './Dorm'
import { ProfileCardProps, ProfileVariant } from './index.type'
import StudentCard from './Student'
import SummaryCard from './Summary'

const VariantSelector = ({variant}: {variant: ProfileVariant}) => {
	switch (variant) {
		case 'profile':
		case 'matePref':
			return <StudentCard variant={variant} />
		case 'roomPref':
			return <DormCard />
		case 'summary':
			return <SummaryCard />
		case 'tuner':
			return <Fragment />
	}
}

const ProfileCard = ({ variant }: ProfileCardProps) => {
	return (
		<Paper elevation={1} variant='outlined' sx={{ m: 8 }}>
			<Grid container spacing={2} sx={{ my: 2, p: 4 }}>
				<CardTitle name={variant} editable={variant === 'profile'} />
				<VariantSelector variant={variant} />
			</Grid>
		</Paper>
	)
}

const CardTitle = ({
	name,
	editable,
}: {
	name: ProfileVariant
	editable?: boolean
}) => {
	return (
		<Fragment>
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
				{editable && (
					<Button color='success' variant='contained'>
						แก้ไข
					</Button>
				)}
			</Grid>
		</Fragment>
	)
}

export default ProfileCard
