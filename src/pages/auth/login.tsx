import AuthenticationCard from "@component/AuthenticationCard"
import CustomHeader from "@component/CustomHeader"

const LoginPage = () => {
  return (
    <div>
      <CustomHeader pageName="login" />

      <main>
        <AuthenticationCard variant='ล็อคอิน' />
      </main>
    </div>
  )
}

export default LoginPage