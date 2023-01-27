import { signIn } from 'next-auth/react'
import { ChevronRight } from '@mui/icons-material'
import { Button } from '@mui/material'

import { trpc } from '@utility/trpc'

import type { AuthenicationCardProps } from './index'

export default function SendBtn({
	variant,
}: Pick<AuthenicationCardProps, 'variant'>) {
	const createStudent = trpc.student.createStudent.useMutation()

	function handleClick() {
		if (variant === 'ลงทะเบียน') {
			createStudent.mutateAsync({
				first_name: 'test',
				last_name: 'user',
				sex: 'MALE',
				email: 'test@test.mail',
				password: '1234',
				personal_id: '1234567890000',
			})
		}

		signIn('credentials', {
			email: 'test@mock.mail',
			password: '1234',
			callbackUrl: 'localhost:3000',
		})
	}

	return (
		<Button
			variant='contained'
			color='success'
			type='submit'
      endIcon={<ChevronRight />}
			onClick={handleClick}
		>
			{variant}
		</Button>
	)
}
