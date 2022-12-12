import { ChevronRight } from '@mui/icons-material'
import {
	Button,
	FormControl,
	Grid,
	Paper,
	Typography,
} from '@mui/material'

import {
	AuthField,
	CreateAccountLink,
	ForgotPasswordLink,
} from './Login'
import {
	AuthInformationForm,
	PersonalInfomationForm,
} from './Register'

import { TitleCase } from '@utility/util'

type AuthCardVariant = 'login' | 'signup'
type AuthenicationCardProps = {
	variant: AuthCardVariant
}

const isLogin = (variant: AuthCardVariant) => variant === 'login'

const AuthenticationCard = ({ variant }: AuthenicationCardProps) => {
	return (
		<Grid
			container
			spacing={0}
			justifyContent='center'
			direction='row'
			sx={{ mt: 8 }}
		>
			<Grid item>
				<Grid
					container
					direction='column'
					justifyContent='center'
					spacing={2}
					sx={{ justifyContent: 'center', minHeight: '90vh' }}
				>
					<Paper
						variant='elevation'
						elevation={2}
						sx={{
							justifyContent: 'center',
							minHeight: '30vh',
							p: 12,
						}}
					>
						<Grid item sx={{ mb: 4 }}>
							<Typography variant='h3'>
								{TitleCase(variant)}
							</Typography>
						</Grid>
						<Grid item >
							<FormControl margin='normal'>
								{!isLogin(variant) ? (
									<Grid container direction='row' spacing={2}>
										<Grid item>
											<PersonalInfomationForm />
										</Grid>
										<Grid item>
											<AuthInformationForm />
										</Grid>
									</Grid>
								) : (
									<AuthField />
								)}
							</FormControl>
						</Grid>
						<Grid item sx={{ mb: 2 }}>
							{isLogin(variant) && <ForgotPasswordLink />}
						</Grid>
						<Grid
							item
							sx={{ justifyContent: 'center', display: 'flex', mb: 2 }}
						>
							<Button
								variant='contained'
								color='success'
								endIcon={<ChevronRight />}
							>
								{variant}
							</Button>
						</Grid>
						<Grid item>
							{isLogin(variant) && <CreateAccountLink />}
						</Grid>
					</Paper>
				</Grid>
			</Grid>
			<Grid container sx={{ p: 8 }}>
				<Grid item xs={12} sx={{ ml: 8, my: 4 }}></Grid>
			</Grid>
		</Grid>
	)
}

export default AuthenticationCard
