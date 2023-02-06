import React from 'react'
import styles from './Notification.module.css'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const Notification = () => {
  const notification = useSelector((state: any) => state.notification)

  return (
    <div className={clsx(styles['notification-box'], notification.isOpen && styles.active)}>
      <h2>{notification.message}</h2>
    </div>
  )
}

export default Notification
