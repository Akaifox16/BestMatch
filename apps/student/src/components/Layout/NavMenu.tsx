import { useState } from 'react';
import type { MouseEvent } from 'react';
import Link from 'next/link';

import { Box, IconButton, Menu, Typography, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { display } from '@acme/theme';
import { useSelector } from '@xstate/react';
import { useSession } from 'next-auth/react';
// import { loggedInSelector, useUserMachine } from "@component/Context/Auth"

const pages = ['Tutorials', 'Profile', 'Summary'];

const NavMenu = () => {
  const [anchorNav, setAnchorNav] = useState<HTMLElement | null>(null);
  const handleOpenNavMenu = (evt: MouseEvent<HTMLElement>) => {
    setAnchorNav(evt.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };

  // const userMachine = useUserMachine()
  // const isLoggedIn = useSelector(userMachine.authService, loggedInSelector)

  const { data: sessionData } = useSession();

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
            <NavMenuItem
              key={page}
              page={page}
              handleClose={handleCloseNavMenu}
            />
          ))}
        </Menu>
      </Box>

      {/* web menu */}
      <Box sx={{ flexGrow: 1, display: display.web }}>
        {sessionData &&
          pages.map((page) => (
            <NavMenuItem
              key={page}
              page={page}
              handleClose={handleCloseNavMenu}
            />
          ))}
      </Box>
    </>
  );
};

interface NavMenuItemProps {
  // attributes
  page: string;
  // method
  handleClose: () => void;
}

const NavMenuItem = ({ page, handleClose }: NavMenuItemProps) => {
  return (
    <MenuItem key={page} onClick={handleClose}>
      <Link href={`/${page.toLowerCase()}`}>
        <Typography textAlign='center'>{page}</Typography>
      </Link>
    </MenuItem>
  );
};

export default NavMenu;
