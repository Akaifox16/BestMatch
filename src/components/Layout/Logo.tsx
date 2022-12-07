import type { ReactNode } from "react"
import Link from "next/link"

import { SystemStyleObject, Theme } from "@mui/system"
import { Typography } from "@mui/material"

import { display } from '@theme/lightTheme'

interface LogoProps {
	name: string
	children: ReactNode
}

const Logo = ({ name, children }: LogoProps) => {
	return (
		<>
			<LogoText display={display.web} name={name} />
			{children}
			<LogoText display={display.mobile.main} name={name} />
		</>
	)
}

interface LogoTextProps {
	name: string
	display: SystemStyleObject<Theme>
}
const LogoText = ({ display, name }: LogoTextProps) => {
	return (
		<Link href='/'>
			<Typography
				variant='h6'
				noWrap
				sx={{
					mr: 2,
					display,
					fontFamily: 'monospace',
					fontWeight: 700,
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				{name}
			</Typography>
		</Link>
	)
}

export default Logo