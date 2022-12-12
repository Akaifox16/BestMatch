import FieldInput from '@component/Input/FieldInput'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'

const ForgotPasswordLink = () => {
	return (
		<Link href='/forget-password'>
			<Typography>Forgot your password?</Typography>
		</Link>
	)
}
const CreateAccountLink = () => {
	return (
		<Grid container spacing={1}>
			<Grid item>
				<Typography variant='caption'>
					Don't have account yet?
				</Typography>
			</Grid>
			<Grid item>
				<Link href='/register'>
					<Typography variant='caption'>Create an account</Typography>
				</Link>
			</Grid>
		</Grid>
	)
}

const AuthField = () => {
	return (
		<>
			<FieldInput label='อีเมล์' />
			<FieldInput label='รหัสผ่าน' password />
		</>
	)
}

export { ForgotPasswordLink, CreateAccountLink, AuthField }
