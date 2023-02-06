import React, { useEffect, useState } from 'react'
import styles from './CardSmall.module.css'
import clsx from 'clsx'

const CardSmall: React.FC<{
  cardTitle: string
  cardBalance: number | undefined | null
  cardIcon: React.ReactNode
  cardCss?: string
}> = (props) => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (!props.cardBalance) return
    const speed = +props.cardBalance / 20

    if (props.cardBalance > 0 && balance < props.cardBalance) {
      setTimeout(() => {
        setBalance(balance + speed)
      }, 12)
    } else if (props.cardBalance < 0 && balance > props.cardBalance) {
      setTimeout(() => {
        setBalance(balance + speed)
      }, 12)
    } else {
      return
    }
  }, [balance, props.cardBalance])

  return (
    <div className={clsx(styles['card-small'], styles[props.cardCss || ''])}>
      {props.cardIcon}
      <h3 className={styles['card-small-title']}>{props.cardTitle}</h3>
      <span className={styles['balance']}>
        <p className={styles['card-balance']}>{balance.toLocaleString()}</p>
        <p className={styles['card-currency']}>USD</p>
      </span>
    </div>
  )
}

export default CardSmall
