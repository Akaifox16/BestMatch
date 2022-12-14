import { MouseEvent, useEffect } from 'react'
import Link from 'next/link'

import { AccountCircle, Logout } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	PopoverOrigin,
	Tooltip,
	Typography,
} from '@mui/material'
import { useSelector } from '@xstate/react'
import {
	loggedInSelector,
	useUserMachine,
} from '@component/Context/AuthContext'

const settings = ['Profile']

type UserBtnProps = {
	username?: string
}

const origin: PopoverOrigin = {
	vertical: 'top',
	horizontal: 'right',
}
const MenuSx = {
	elevation: 0,
	sx: {
		overflow: 'visible',
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		mt: 1.5,
		'& .MuiAvatar-root': {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1,
		},
		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 14,
			width: 10,
			height: 10,
			bgcolor: 'background.paper',
			transform: 'translateY(-50%) rotate(45deg)',
			zIndex: 0,
		},
	},
}

const UserBtn = () => {
	// const [anchor, setAnchor] = useState<HTMLElement | null>(null)
	const userMachine = useUserMachine()
	const isLoggedIn = useSelector(
		userMachine.authService,
		loggedInSelector
	)
	// const handleOpenUserMenu = (evt: MouseEvent<HTMLElement>) => {
	// 	setAnchor(evt.currentTarget)
	// }

	// const handleCloseUserMenu = () => {
	// 	setAnchor(null)
	// }
	// useEffect(() => {
	// 	userMachine.authService.send('LOGGED_IN')
	// }, [])

	return (
		<Box sx={{ flexGrow: 0 }}>
			{/* <Tooltip title='Open settings'>
			</Tooltip> */}
			{/* <IconButton onClick={handleOpenUserMenu}> */}
			{/* </IconButton> */}
			{/* <UserMenu
				anchor={anchor}
				handleCloseMenu={handleCloseUserMenu}
			/> */}
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

type UserMenuProps = {
	anchor: HTMLElement | null
	handleCloseMenu: () => void
}

const UserMenu = ({ anchor, handleCloseMenu }: UserMenuProps) => {
	return (
		<Menu
			id='menu-appbar'
			sx={{ mt: '45px' }}
			anchorEl={anchor}
			anchorOrigin={origin}
			transformOrigin={origin}
			open={Boolean(anchor)}
			onClose={handleCloseMenu}
			PaperProps={MenuSx}
			keepMounted
		>
			{settings.map((option) => (
				<Link key={option} href={`/${option.toLowerCase()}`}>
					<MenuItem key={option} onClick={handleCloseMenu}>
						<Typography>{option}</Typography>
					</MenuItem>
				</Link>
			))}
			<Divider />
			<MenuItem key='logout' onClick={handleCloseMenu}>
				<ListItemIcon>
					<Logout fontSize='small' color='warning' />
				</ListItemIcon>
				<Typography textAlign='center' color='red'>
					logout
				</Typography>
			</MenuItem>
		</Menu>
	)
}

export default UserBtn
