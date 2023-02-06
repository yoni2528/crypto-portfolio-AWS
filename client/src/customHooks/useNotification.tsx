import React from 'react'
import { useDispatch } from 'react-redux'
import { notificationActions } from '../store/reducers/notificationsReducer'

const useNotification = () => {
  const dispatch = useDispatch()

  const handleNotification = (message: string) => {
    dispatch(notificationActions.setNotification(message))
    setTimeout(() => {
      dispatch(notificationActions.closeNotificaton())
    }, 2000)
  }

  return { handleNotification }
}

export default useNotification
