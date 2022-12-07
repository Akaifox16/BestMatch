import Head from 'next/head'

type CustomHeaderProps = {
	pageName:
		| 'home'
		| 'login'
		| 'register'
		| 'matching'
		| 'profile'
		| 'summary'
		| 'tutorial'
}

const CustomHeader = ({ pageName }: CustomHeaderProps) => {
	return (
		<Head>
			<title>BestMatch | {pageName.toUpperCase()}</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
	)
}

export default CustomHeader
