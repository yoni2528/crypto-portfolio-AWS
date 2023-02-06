import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from './store/reducers/authReducer'

import Cookie from 'js-cookie'

import { ModalWrapper } from './components/componentContainer'
import AuthApp from './components/AppAllocation/AuthApp'
import MainApp from './components/AppAllocation/MainApp'
import Notification from './components/Notifications/Notification'

const App = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookie.get('token')
    if (!token) return
    dispatch(authActions.Login(token))
  }, [])

  return (
    <>
      <ModalWrapper />
      <Notification />
      {isLoggedIn ? <MainApp /> : <AuthApp />}
    </>
  )
}

export default App
