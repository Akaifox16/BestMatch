import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ac58f5'
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