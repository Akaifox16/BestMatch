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

import { titleCase } from 'utils/util'
import Link from 'next/link'
import { trpc } from 'utils/trpc'
import { useUserMachine } from '@component/Context/Auth'

type AuthCardVariant = 'ล็อคอิน' | 'ลงทะเบียน'
type AuthenicationCardProps = {
	variant: AuthCardVariant
}

const isLogin = (variant: AuthCardVariant) => variant === 'ล็อคอิน'

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
								{titleCase(variant)}
							</Typography>
						</Grid>
						<Grid item>
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
							{/* {isLogin(variant) && <ForgotPasswordLink />} */}
						</Grid>
						<Grid
							item
							sx={{
								justifyContent: 'center',
								display: 'flex',
								mb: 2,
							}}
						>
							<SendBtn variant={variant} />
						</Grid>
						<Grid item>
							{isLogin(variant) && <CreateAccountLink />}
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	)
}

const SendBtn = ({
	variant,
}: Pick<AuthenicationCardProps, 'variant'>) => {
	const { authService } = useUserMachine()
	const createStudent = trpc.student.createStudent.useMutation()

	const handleClick = () => {
		if (variant === 'ลงทะเบียน') {
			createStudent.mutateAsync({
				first_name: 'ทดสอบ',
				last_name: 'การสร้าง',
				sex: 'MALE',
				email: 'test@test.mail',
				password: '1234',
				personal_id: '1234567890ABC',
			})
		}
		authService.send('LOGGED_IN')
	}

	return (
		<Link href='/'>

				<Button
					variant='contained'
					color='success'
					endIcon={<ChevronRight />}
					onClick={handleClick}
				>
					{variant}
				</Button>
		</Link>
	)
}

export default AuthenticationCard
