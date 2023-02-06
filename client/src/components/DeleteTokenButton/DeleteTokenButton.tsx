import React from 'react'
import styles from './deleteTokenButton.module.css'
import { IoTrashOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { tokenDeleteModalActions } from '../../store/reducers/modalReducers'

const DeleteTokenButton: React.FC<{ tokenId: string }> = ({ tokenId }) => {
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(
      tokenDeleteModalActions.openModal({
        title: 'Are You Sure?',
        message: 'This action cannot be undone.',
        btnText: 'yes im sure!',
      })
    )
    dispatch(tokenDeleteModalActions.setToken(tokenId))
  }

  return (
    <>
      <IoTrashOutline className={styles.icon} onClick={handleOpenModal}>
        deleteTokenButton
      </IoTrashOutline>
    </>
  )
}

export default DeleteTokenButton
