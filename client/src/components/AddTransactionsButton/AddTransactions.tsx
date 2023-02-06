import React from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { tokenSelectedActions } from '../../store/reducers/tokenSelectedReducer'
import useThirdApiRequests from '../../apiHooks/useThirdApiRequests'
import { tokenSelectionModalActions } from '../../store/reducers/modalReducers'

const AddTransactions: React.FC<{ token: string }> = ({ token }) => {
  const { handleTokenSelectedRequest } = useThirdApiRequests()
  const dispatch = useDispatch()

  const handleAddTransactions = () => {
    dispatch(tokenSelectedActions.selectToken(token))
    dispatch(tokenSelectionModalActions.openModal())
    handleTokenSelectedRequest(token)
  }

  return (
    <IoAddOutline
      style={{ fontSize: '1.4rem', color: '#333', cursor: 'pointer' }}
      onClick={handleAddTransactions}
    >
      addTokenButton
    </IoAddOutline>
  )
}

export default AddTransactions
