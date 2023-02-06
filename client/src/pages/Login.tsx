import React from 'react'

import AuthPageLayout from '../layouts/AuthPagesLayout/AuthPagesLayout'
import AuthUser from '../components/AuthUser/AuthUser'

import { User } from './Signup'
import useAuthRequest from '../apiHooks/useAuthRequest'

const Login = () => {
  const { handleLogin } = useAuthRequest()
  const handleFormSubmit = (authUser: User) => {
    handleLogin(authUser)
  }

  return (
    <>
      <AuthPageLayout>
        <AuthUser
          onFormSubmit={handleFormSubmit}
          title={'Welcome To CryptoFolio'}
          testUser={true}
          subTitle={'Manage your digital assets with ease and confidence'}
          btnText={'Sign in'}
          pageType={'login'}
        />
      </AuthPageLayout>
    </>
  )
}

export default Login
