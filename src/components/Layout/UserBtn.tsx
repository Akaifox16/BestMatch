import Link from 'next/link'

import { AccountCircle, Logout } from '@mui/icons-material'
import { Box, Button, Grid } from '@mui/material'
import { useSelector } from '@xstate/react'
import { loggedInSelector, useUserMachine } from '@component/Context/Auth'

const UserBtn = () => {
	const userMachine = useUserMachine()
	const isLoggedIn = useSelector(
		userMachine.authService,
		loggedInSelector
	)

	return (
		<Box sx={{ flexGrow: 0 }}>
			{isLoggedIn ? <LogoutBtn /> : <LoginBtn />}
		</Box>
	)
}

const LoginBtn = () => {
	return (
		<Link href='/login'>
			<Button color='success' variant='contained'>
				ล็อคอิน
			</Button>
		</Link>
	)
}

const LogoutBtn = () => {
	const userMachine = useUserMachine()

	return (
		<Grid gap={2} container direction='row'>
			<Grid item>
				<AccountCircle fontSize='large' />
			</Grid>
			<Grid item>
				<Link href='/'>
					<Button
						color='error'
						variant='contained'
						onClick={() => userMachine.authService.send('LOGGED_OUT')}
					>
						<Logout /> ลงชื่อออก
					</Button>
				</Link>
			</Grid>
		</Grid>
	)
}

export default UserBtn
