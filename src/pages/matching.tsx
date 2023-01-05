import CustomHeader from '@component/CustomHeader'
import MatingApp from '@component/MatingApp'
import ProfileCard from '@component/ProfileCard'

const MatchingPage = () => {
  return (
    <div>
      <CustomHeader pageName='matching' />

      <main>
        <MatingApp />
      </main>
    </div>
  )
}

export default MatchingPage