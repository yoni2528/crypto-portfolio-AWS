import { createSlice } from '@reduxjs/toolkit/'

export type Notification = {
  isOpen: boolean
  message: string
}

const initialNotificationState: Notification = {
  isOpen: false,
  message: 'false',
}

export const notificationReducer = createSlice({
  initialState: initialNotificationState,
  name: 'Notification',
  reducers: {
    setNotification(state, action) {
      state.isOpen = true
      state.message = action.payload
      setTimeout(() => {
        state.isOpen = false
      }, 3000)
    },
    closeNotificaton(state) {
      state.isOpen = false
    },
  },
})

export const notificationActions = notificationReducer.actions
