import AuthenticationCard from "@component/AuthenticationCard"
import CustomHeader from "@component/CustomHeader"

const RegisterPage = () => {
  return (
    <div>
      <CustomHeader pageName='register' />

      <main>
        <AuthenticationCard variant='ลงทะเบียน' />
      </main>
    </div>
  )
}

export default RegisterPage