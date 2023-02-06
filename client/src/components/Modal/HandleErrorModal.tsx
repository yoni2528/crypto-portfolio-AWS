import React from 'react'
import styles from './globalModal.module.css'
import { useSelector } from 'react-redux'
import Button from '../Global/Button'

const ErrorHandleModal: React.FC<{
  onBtnClick: (modalName: string) => void
}> = ({ onBtnClick }) => {
  const { title, message, btnText } = useSelector((state: any) => state.errorModal)

  const handleButtonClick = () => {
    onBtnClick('error')
  }

  return (
    <div className={styles['modal-box']}>
      <h2 className={styles['modal-title']}>{title}</h2>
      <p className={styles['modal-message']}>{message}</p>
      <Button onClick={handleButtonClick} type="btn-main" btnText={btnText}></Button>
    </div>
  )
}

export default ErrorHandleModal
