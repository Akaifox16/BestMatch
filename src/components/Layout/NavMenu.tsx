import { useState } from "react"
import type { MouseEvent } from "react"
import Link from "next/link"

import { Box, IconButton, Menu, Typography, MenuItem } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

import { display } from "@theme/lightTheme"

const pages = ['Tutorials', 'Profile', 'Summary']

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
			{/* mobile menu */}
			<Box sx={{ flexGrow: 1, display: display.mobile.main }}>
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
						display: display.mobile.menu,
					}}
				>
					{pages.map((page) => (
						<NavMenuItem page={page} handleClose={handleCloseNavMenu} />
					))}
				</Menu>
			</Box>

			{/* web menu */}
			<Box sx={{ flexGrow: 1, display: display.web }}>
				{pages.map((page) => (
					<NavMenuItem page={page} handleClose={handleCloseNavMenu} />
				))}
			</Box>
		</>
	)
}

interface NavMenuItemProps {
	// attributes
	page: string,
	// method
	handleClose: () => void,
}

const NavMenuItem = ({ page, handleClose }: NavMenuItemProps) => {
	return (
		<MenuItem key={page} onClick={handleClose}>
			<Link href={`/${page.toLowerCase()}`}>
				<Typography textAlign='center'>{page}</Typography>
			</Link>
		</MenuItem>
	)
}

export default NavMenu