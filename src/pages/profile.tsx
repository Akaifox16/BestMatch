import Head from 'next/head'

import ProfileCard from '@component/ProfileCard'

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
