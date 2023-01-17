import CustomHeader from '@component/CustomHeader'
import MatingApp from '@component/MatingApp'

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