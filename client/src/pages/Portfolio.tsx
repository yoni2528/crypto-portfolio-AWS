import React, { useEffect, useState } from 'react'

import styles from './portfolio.module.css'
import useDatabseRequest from '../apiHooks/useDatabseRequest'
import { useSelector } from 'react-redux'
import DeleteTokenButton from '../components/DeleteTokenButton/DeleteTokenButton'
import AddTransactions from '../components/AddTransactionsButton/AddTransactions'
import clsx from 'clsx'

export type tokenFromDatabase = {
  averegaeBuyPrice: number
  img: string
  initialPrice: number
  lastDayProfit: string
  name: 'bitcoin'
  price: number
  quantity: number
  _id: string
  symbol: string
  profitOrLoss: number
}

const Portfolio = () => {
  const { handleGetAllTokens } = useDatabseRequest()
  const data = useSelector((state: any) => state.tokenList.data)
  const [listCounter, setListCounter] = useState(0)
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  useEffect(() => {
    handleGetAllTokens().then((data: any) => {
      setIsDataLoaded(data)
    })
  }, [])

  useEffect(() => {
    setListCounter(data.length)
  }, [data])

  return (
    <div className={styles['portfolio-layout']}>
      <table>
        <thead>
          <tr>
            <th> Token</th>
            <th>Price</th>
            <th>24H</th>
            <th>Hodlings</th>
            <th>Avg.Buy Price</th>
            <th>Profit/Loss</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isDataLoaded &&
            data.map((token: tokenFromDatabase, index: number) => {
              return (
                <tr key={index} className={clsx(index + 1 === listCounter ? styles['new'] : null)}>
                  <td>
                    <div className={styles['token-image']}>
                      <img src={token.img}></img>
                      <p className={styles['token-title']}>{token.name}</p>
                    </div>
                  </td>
                  <td>${token.price ? token.price?.toLocaleString() : null}</td>
                  <td>{token.lastDayProfit ? (+token.lastDayProfit)?.toFixed(2) : null}%</td>
                  <td>
                    <div className={styles['token-total-quantity']}>
                      <p className={styles['token-total']}>
                        ${token.quantity ? (token.quantity * token.price).toLocaleString() : null}
                      </p>
                      <p className={styles['token-quantity']}>
                        <span>{token.quantity ? token.quantity.toLocaleString() : null}</span>
                        <span>{token.symbol && token.symbol.toUpperCase()}</span>
                      </p>
                    </div>
                  </td>
                  <td>${token.averegaeBuyPrice && token.averegaeBuyPrice.toLocaleString()}</td>
                  <td>{token.profitOrLoss ? `${token.profitOrLoss.toLocaleString()}$` : null}</td>
                  <td>
                    <div className={styles.actions}>
                      <AddTransactions token={token.name}></AddTransactions>
                      <DeleteTokenButton tokenId={token._id} />
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Portfolio
