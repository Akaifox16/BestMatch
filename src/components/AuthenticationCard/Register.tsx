import { Fragment } from 'react'

import FieldInput from '@component/Input/FieldInput'
import SexRadioGroup, { Sex } from '@component/Input/SexRadioGroup'
import { Grid } from '@mui/material'

type PersonalInfoForm = {
	fname: string
	lname: string
	personalId: string
	sex: Sex
}

const PersonalInfomationForm = () => {
	return (
		<Grid container direction='column'>
			<Grid item>
				<FieldInput label='ชื่อ' err errText=' '/>
			</Grid>
			<Grid item>
				<FieldInput label='สกุล' err errText=' '/>
			</Grid>
			<Grid item>
				<FieldInput
					label='รหัสประชาชน'
					err
					errText='รหัสบัตรประชาชนไม่ถูกต้อง'
				/>
			</Grid>
			<Grid item>
				<SexRadioGroup val='ชาย' />
			</Grid>
		</Grid>
	)
}

type AuthInfoForm = {
	email: string
	password: string
	confirmationPassword: string
}

const AuthInformationForm = () => {
	return (
		<Grid container direction='column'>
			<Grid item>
				<FieldInput
					label='อีเมล์'
					err
					errText='ไม่ใช่รูปแบบอีเมล์ที่ถูกต้อง'
				/>
			</Grid>
			<Grid item>
				<FieldInput
					label='รหัสผ่าน'
					password
					err
					errText='รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร'
				/>
			</Grid>
			<Grid item>
				<FieldInput
					label='ยืนยันรหัสผ่าน'
					password
					err
					errText='รหัสผ่านไม่ตรงกัน'
				/>
			</Grid>
		</Grid>
	)
}

export { PersonalInfomationForm, AuthInformationForm }
