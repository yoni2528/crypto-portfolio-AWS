// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { BASE_URL } from '../config/static'
import useRequest from './useRequest'
import { User } from '../pages/Signup'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/reducers/authReducer'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'

const useAuthRequest = () => {
  const { handlePostRequest } = useRequest()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (user: User) => {
    const data = await handlePostRequest({
      method: 'POST',
      url: `${BASE_URL}app/v1/users/login`,
      body: user,
    })
    if (!data) return
    if (data.status === 'succeed') {
      Cookie.set('token', data.token, { expires: 1 })

      dispatch(authActions.Login(data.token))
      navigate('/dashboard')
    }
  }
  const handleSignUp = async (user: User) => {
    const data = await handlePostRequest({
      method: 'POST',
      url: `${BASE_URL}app/v1/users/signup`,
      body: user,
    })
    if (!data) return
    if (data.status === 'succeed') {
      Cookie.set('token', data.token, { expires: 1 })

      dispatch(authActions.Login(data.token))
      navigate('/dashboard')
    }
  }

  const handleLogOut = () => {
    Cookie.remove('token')
    dispatch(authActions.logout())
    navigate('/login')
  }

  return { handleLogin, handleSignUp, handleLogOut }
}

export default useAuthRequest
