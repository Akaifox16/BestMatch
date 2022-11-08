import {
	Box,
	AppBar,
	Toolbar,
	Container,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Button,
} from '@mui/material'
import { MouseEvent, ReactNode } from 'react'
import { useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'

const pages = ['Result', 'Tutorials']
const settings = ['Profile', 'Logout']

const Header = () => {
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Logo name='LOGO'>
						<NavMenu />
					</Logo>
					<UserBtn username='John Doe'/>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

interface UserBtnProps {
	username?: string
}
const UserBtn = ({username}: UserBtnProps) => {
	const [anchorUser, setAnchorUser] = useState<HTMLElement | null>(
		null
	)
	const handleOpenUserMenu = (evt: MouseEvent<HTMLElement>) => {
		setAnchorUser(evt.currentTarget)
	}
	const handleCloseUserMenu = () => {
		setAnchorUser(null)
	}
	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title='Open settings'>
				<Button variant='outlined' color='inherit' onClick={handleOpenUserMenu}>{username}</Button>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id='menu-appbar'
				anchorEl={anchorUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorUser)}
				onClose={handleCloseUserMenu}
			>
				{
					settings.map(option => (
						<MenuItem key={option} onClick={handleCloseUserMenu}>
							<Typography textAlign='center'>{option}</Typography>
						</MenuItem>
					))
				}
			</Menu>
		</Box>
	)
}

const NavMenu = () => {
	const [anchorNav, setAnchorNav] = useState<HTMLElement | null>(null)
	const handleOpenNavMenu = (evt: MouseEvent<HTMLElement>) => {
		setAnchorNav(evt.currentTarget)
	}
	const handleCloseNavMenu = () => {
		setAnchorNav(null)
	}
	return (
		<>
			<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size='large'
					aria-label='accout of current user'
					aria-controls='menu-appbar'
					aria-haspopup='true'
					onClick={handleOpenNavMenu}
					color='inherit'
				>
					<MenuIcon />
				</IconButton>
				<Menu
					id='menu-appbar'
					anchorEl={anchorNav}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					open={Boolean(anchorNav)}
					onClose={handleCloseNavMenu}
					sx={{
						display: { xs: 'block', md: 'none' },
					}}
				>
					{pages.map((page) => (
						<MenuItem key={page} onClick={handleCloseNavMenu}>
							<Typography textAlign='center'>{page}</Typography>
						</MenuItem>
					))}
				</Menu>
			</Box>

			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{pages.map((page) => (
					<MenuItem key={page} onClick={handleCloseNavMenu}>
						<Typography textAlign='center'>{page}</Typography>
					</MenuItem>
				))}
			</Box>
		</>
	)
}

interface LogoProps {
	name: string
	children: ReactNode
}

const Logo = ({ name, children }: LogoProps) => {
	return (
		<>
			<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
			<Typography
				variant='h6'
				noWrap
				component='a'
				href='/'
				sx={{
					mr: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				{name}
			</Typography>
			{children}
			<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
			<Typography
				variant='h6'
				noWrap
				component='a'
				href='/'
				sx={{
					mr: 2,
					display: { xs: 'flex', md: 'none' },
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				{name}
			</Typography>
		</>
	)
}

export default Header
