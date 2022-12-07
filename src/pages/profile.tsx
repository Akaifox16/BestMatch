import ProfileCard from '@component/ProfileCard'
import CustomHeader from '@component/CustomHeader'

const Profile = () => {
	return (
		<div>
			<CustomHeader pageName='profile' />	

			<main>
        <ProfileCard />
			</main>
		</div>
	)
}

export default Profile
