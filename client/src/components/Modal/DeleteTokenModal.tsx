import React from 'react'
import styles from './globalModal.module.css'
import { useSelector } from 'react-redux'
import Button from '../Global/Button'
import useDatabseRequest from '../../apiHooks/useDatabseRequest'

const DeleteTokenModal: React.FC<{
  onBtnClick: (modalName: string) => void
}> = ({ onBtnClick }) => {
  const { title, message, token } = useSelector((state: any) => state.tokenDeleteModal)
  const { handleGetAllTokens, handleRemoveToken } = useDatabseRequest()

  const handleButtonClick = () => {
    onBtnClick('delete')
    handleRemoveTokenButton()
  }

  const handleButtonClose = () => {
    onBtnClick('delete')
  }

  const handleRemoveTokenButton = () => {
    handleRemoveToken(token)
    handleGetAllTokens()
  }
  return (
    <div className={styles['modal-box']}>
      <h2 className={styles['modal-title']}>{title}</h2>
      <p className={styles['modal-message']}>{message}</p>
      <div className={styles['buttons']}>
        <Button onClick={handleButtonClose} type="btn-main" btnText={'No'}></Button>
        <Button onClick={handleButtonClick} type="btn-red" btnText={'yes'}></Button>
      </div>
    </div>
  )
}

export default DeleteTokenModal
