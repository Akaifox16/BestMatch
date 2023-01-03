import CustomHeader from '@component/CustomHeader'
import ProfileCard from '@component/ProfileCard'

const Profile = () => {
	return (
		<div>
			<CustomHeader pageName='profile' />	

			<main>
        <ProfileCard variant='profile'/>
			</main>
		</div>
	)
}

export default Profile
