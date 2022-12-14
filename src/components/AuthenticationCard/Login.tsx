import FieldInput from '@component/Input/FieldInput'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'

const ForgotPasswordLink = () => {
	return (
		<Link href='/forget-password'>
			<Typography>ลืมรหัสผ่าน?</Typography>
		</Link>
	)
}
const CreateAccountLink = () => {
	return (
		<Grid container spacing={1}>
			<Grid item>
				<Typography variant='caption'>
					ยังไม่มีบัญชี bestmatch?
				</Typography>
			</Grid>
			<Grid item>
				<Link href='/register'>
					<Typography variant='caption'>สร้างบัญชีผู้ใช้ใหม่</Typography>
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
