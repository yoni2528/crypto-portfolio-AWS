import React from 'react'
import styles from './AddTokenCard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { IoChevronBackOutline } from 'react-icons/io5'

import { tokenState } from '../../store'
import { tokenSelectedActions } from '../../store/reducers/tokenSelectedReducer'
import Spinner from '../Spinner/Spinner'

type Props = {
  children?: React.ReactNode
}

const AddTokenCard: React.FC<Props> = ({ children }) => {
  const tokenSelected = useSelector((state: tokenState) => state.selectToken.name)

  const isSpinnerLoading = useSelector((state: any) => state.spinner.isLoading)

  const dispatch = useDispatch()

  const handleRemoveTokenSelection = () => {
    dispatch(tokenSelectedActions.selectToken(''))
  }

  return (
    <div className={styles['add-token-overlay']}>
      <div className={styles['add-token-header']}>
        {tokenSelected && (
          <IoChevronBackOutline onClick={handleRemoveTokenSelection} className={styles.icon} />
        )}
        <h2 className={styles['add-token-title']}>
          {tokenSelected ? 'Add Transition' : 'Select Token'}
        </h2>
      </div>
      {isSpinnerLoading ? <Spinner></Spinner> : <div>{children}</div>}
    </div>
  )
}

export default AddTokenCard
