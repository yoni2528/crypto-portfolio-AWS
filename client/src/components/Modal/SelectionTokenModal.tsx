import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'

import { tokenState } from '../../store'
import { tokenSelectedActions } from '../../store/reducers/tokenSelectedReducer'
import { tokenSelectionModalActions } from '../../store/reducers/modalReducers'

import SelectTokenStep from '../AddTokenSteps/SelectTokenStep'
import DefineTokenStep from '../AddTokenSteps/DefineTokenStep'

import styles from './SelectionTokenModal.module.css'

const TokenSelectionModal = () => {
  const tokenSelected = useSelector((state: tokenState) => state.selectToken.name)
  const isModalOpen = useSelector((state: any) => state.tokenSelectionModal.isOpen)
  const dispatch = useDispatch()

  const handleCloseModal = (e: any) => {
    if (!(e.target.classList[1] === 'isOverlay')) return
    dispatch(tokenSelectedActions.selectToken(''))
    dispatch(tokenSelectionModalActions.closeModal())
  }
  return (
    <div
      onClick={handleCloseModal}
      className={clsx(styles.overlay, 'isOverlay', isModalOpen && styles.open)}
    >
      <div className={styles['modal-box']}>
        {tokenSelected ? <DefineTokenStep /> : <SelectTokenStep />}
      </div>
    </div>
  )
}

export default TokenSelectionModal
