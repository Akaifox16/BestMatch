import ProfileCard from '@component/ProfileCard'
import { Button, Grid, Paper, Typography } from '@mui/material'
import Head from 'next/head'

const Profile = () => {
	return (
		<div>
			<Head>
				<title>BestMatch</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
        <ProfileCard />
			</main>
		</div>
	)
}

export default Profile
