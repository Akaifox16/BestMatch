import AuthenticationCard from "@component/AuthenticationCard"
import CustomHeader from "@component/CustomHeader"

const LoginPage = () => {
  return (
    <div>
      <CustomHeader pageName="login" />

      <main>
        <AuthenticationCard variant='login'/>
      </main>
    </div>
  )
}

export default LoginPage