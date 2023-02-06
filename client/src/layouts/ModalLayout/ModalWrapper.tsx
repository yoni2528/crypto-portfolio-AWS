import React from 'react'
import styles from './ModalWrapper.module.css'
import clsx from 'clsx'
import DeleteTokenModal from '../../components/Modal/DeleteTokenModal'

import { useSelector, useDispatch } from 'react-redux'
import { errorModalActions, tokenDeleteModalActions } from '../../store/reducers/modalReducers'
import ErrorHandleModal from '../../components/Modal/HandleErrorModal'
import LoadingDataModal from '../../components/Modal/DataLoadingModal'

const ModalWrapper = () => {
  const isErrorModal = useSelector((state: any) => state.errorModal.isOpen)
  const dispatch = useDispatch()
  const isDeleteModal = useSelector((state: any) => state.tokenDeleteModal.isOpen)
  const isLoadingModal = useSelector((state: any) => state.loadingModal.isOpen)

  const handleModalBtnClick = (modalName: string) => {
    if (modalName === 'error') {
      dispatch(errorModalActions.closeModal())
    }
    if (modalName === 'delete') {
      dispatch(tokenDeleteModalActions.closeModal())
    }
  }

  const handleModalLayoutClose = (e: any) => {
    if (e.target.classList[2] === 'isOverlay') {
      dispatch(errorModalActions.closeModal())
      dispatch(tokenDeleteModalActions.closeModal())
    }
  }

  return (
    <div
      onClick={handleModalLayoutClose}
      className={clsx(
        styles.overlay,
        isErrorModal || isDeleteModal || isLoadingModal ? styles.open : styles.close,
        'isOverlay'
      )}
    >
      <div className={styles['modal-box']}>
        {isErrorModal && <ErrorHandleModal onBtnClick={handleModalBtnClick} />}
        {isDeleteModal && <DeleteTokenModal onBtnClick={handleModalBtnClick} />}
        {isLoadingModal && <LoadingDataModal />}
      </div>
    </div>
  )
}

export default ModalWrapper
