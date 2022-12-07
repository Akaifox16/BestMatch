import {
	AppBar,
	Toolbar,
	Container,
} from '@mui/material'

import UserBtn from './UserBtn'
import NavMenu from './NavMenu'
import Logo from './Logo'

const Header = () => {
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Logo name='BestMatch'>
						<NavMenu />
					</Logo>
					<UserBtn username='John Doe' />
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
