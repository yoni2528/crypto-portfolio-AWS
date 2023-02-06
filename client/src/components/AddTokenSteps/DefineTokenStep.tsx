import React, { useState } from 'react'

import Input from '../Global/Input'
import AddTokenCard from './AddTokenCard'

import styles from './DefineTokenStep.module.css'

import { useSelector, useDispatch } from 'react-redux/'
import { tokenState } from '../../store'
import Button from '../Global/Button'
import { tokenSelectedActions } from '../../store/reducers/tokenSelectedReducer'

import { useNavigate } from 'react-router-dom'
import useDatabseRequest from '../../apiHooks/useDatabseRequest'
import { tokenSelectionModalActions } from '../../store/reducers/modalReducers'

const DefineTokenStep: React.FC = () => {
  const [tokenQuantity, setTokenQuantity] = useState<number>(0)

  const isBuySide = useSelector<tokenState>((state) => state.selectToken.side)
  const selectedToken: any = useSelector<tokenState>((state) => state.selectToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleNewTokenPost } = useDatabseRequest()

  const handleChangeSideBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(tokenSelectedActions.changeSide('buy'))
  }
  const handleChangeSideSell = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(tokenSelectedActions.changeSide('sell'))
  }

  const handleChangeQuantity = (value: string) => {
    setTokenQuantity(+value)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tokenInserObj = { ...selectedToken, quantity: tokenQuantity }
    handleNewTokenPost(tokenInserObj)
    dispatch(tokenSelectedActions.selectToken(''))
    dispatch(tokenSelectionModalActions.closeModal())
    navigate('/portfolio')
  }

  return (
    <AddTokenCard>
      <div className={styles['token-selected-overlay']}>
        <div className={styles['transaction-type-select']}>
          <Button
            active={isBuySide === 'buy'}
            btnText="Buy"
            type="btn-select-type"
            onClick={handleChangeSideBuy}
          />
          <Button
            active={isBuySide === 'sell'}
            btnText="Sell"
            type="btn-select-type"
            onClick={handleChangeSideSell}
          />
        </div>
        <div className={styles['selected-token']}>
          <img src={selectedToken.data.img}></img>
          <p>{selectedToken.name}</p>
        </div>
        <form onSubmit={handleFormSubmit} className={styles['select-form']}>
          <div className={styles['select-quantity']}>
            <div className={styles['select-block']}>
              <label className={styles.label} htmlFor="quantity">
                Quantity
              </label>
              <Input
                id="quantity"
                cssType="input-select"
                onChange={handleChangeQuantity}
                placeholder="0.00"
                type="number"
              ></Input>
            </div>
            <div className={styles['select-block']}>
              <label className={styles.label} htmlFor="price">
                Price
              </label>
              <Input
                id="price"
                onChange={handleChangeQuantity}
                cssType="input-select"
                placeholder="0.00"
                type="number"
                deafultValue={selectedToken.data.price}
              ></Input>
            </div>
          </div>
          <div>
            <div className={styles['total-spent']}>
              <p className={styles['total-spent-title']}>Total Spent</p>
              <p className={styles['total-spent-balance']}>
                ${(tokenQuantity * selectedToken.data.price).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <Button type="btn-main" btnText="Add Transition"></Button>
          </div>
        </form>
      </div>
    </AddTokenCard>
  )
}

export default DefineTokenStep
