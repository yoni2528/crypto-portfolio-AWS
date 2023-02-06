import React from 'react'
import Button from '../Global/Button'
import styles from './PageTopBar.module.css'

import { tokenSelectionModalActions } from '../../store/reducers/modalReducers'

import { useDispatch } from 'react-redux'
import RefreshTokenPrice from '../RefreshTokenPrice/RefreshTokenPrice'

import { AiOutlineMenu } from 'react-icons/ai'

const PageTopBar: React.FC<{ pageTitle: string; onMenuClick: () => void }> = (props) => {
  const dispatch = useDispatch()
  const handleOpenModalToken = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(tokenSelectionModalActions.openModal())
  }

  return (
    <div className={styles['page-top-bar']}>
      <div className={styles['page-title']}>
        <h2>{props.pageTitle}</h2>
      </div>
      <div className={styles['side-top-bar']}>
        <RefreshTokenPrice />
        <Button onClick={handleOpenModalToken} btnText="Add Token" type="btn-main"></Button>
        <button className={styles['menu-btn']} onClick={props.onMenuClick}>
          <AiOutlineMenu />
        </button>
      </div>
    </div>
  )
}

export default PageTopBar
