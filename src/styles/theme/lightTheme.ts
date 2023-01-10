import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#66007B'
    },
    secondary: {
      main: '#64748b'
    }
  },
})

const display = {
	mobile: {
		main: { xs: 'flex', md: 'none' },
		menu: { xs: 'block', md: 'none' },
	},
	web: { xs: 'none', md: 'flex' },
}

export default lightTheme;

export {
  display
}