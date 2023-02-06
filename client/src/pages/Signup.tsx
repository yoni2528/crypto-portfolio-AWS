import React from 'react'
import AuthPageLayout from '../layouts/AuthPagesLayout/AuthPagesLayout'
import AuthUser from '../components/AuthUser/AuthUser'
import useAuthRequest from '../apiHooks/useAuthRequest'

export type User = {
  email: string
  password: string
  passwordConfirm?: string
}

const SignUp = () => {
  const { handleSignUp } = useAuthRequest()
  const handleFormSubmit = (userAuth: User) => {
    handleSignUp(userAuth)
  }
  return (
    <AuthPageLayout>
      <AuthUser
        onFormSubmit={handleFormSubmit}
        testUser={false}
        title={'Sign up'}
        subTitle={'Effortlessly track and manage your investments'}
        btnText={'Sign Up'}
        pageType={'signup'}
      />
    </AuthPageLayout>
  )
}

export default SignUp
