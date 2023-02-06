import React from 'react'
import { tokenData } from '../../store/reducers/tokenSelectedReducer'
import styles from './CardMedium.module.css'

const CardMedium: React.FC<{
  cardTitle: string
  data?: [tokenData]
}> = (props) => {
  return (
    <div className={styles['card-medium']}>
      <h3 className={styles['card-medium-title']}>{props.cardTitle}</h3>
      <ul className={styles['token-list']}>
        {props.data?.map((token: tokenData, index: number) => {
          return (
            <li key={index} className={styles['list-item']}>
              <div className={styles['token-details']}>
                <h4>{token.name}</h4>
                <p>{token.symbol}</p>
              </div>
              <div className={styles['token-price']}>
                <p>{token.price?.toLocaleString()}</p>
                <p className={'token-percent'}>
                  {token.lastDayProfit && `${(+token.lastDayProfit).toFixed(2)}%`}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CardMedium
