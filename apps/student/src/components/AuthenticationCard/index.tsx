import {
	Typography,
} from '@mui/material'


import { titleCase } from 'utils/util'
import AuthCard from './AuthCard'
import { LoginForm } from './variant/Login'

type AuthCardVariant = 'ล็อคอิน' | 'ลงทะเบียน'
export type AuthenicationCardProps = {
	variant: AuthCardVariant
}

function VariantSelector({variant}: Pick<AuthenicationCardProps, 'variant'>) {
	switch(variant) {
		case 'ล็อคอิน':
			return <LoginForm />
		case 'ลงทะเบียน':
			return <></>
	}
}

const AuthenticationCard = ({ variant }: AuthenicationCardProps) => {
	return (
		<AuthCard>
			<Typography variant='h3'>
				{titleCase(variant)}
			</Typography>
			<VariantSelector variant={variant} />
		</AuthCard>
	)
}

export default AuthenticationCard
