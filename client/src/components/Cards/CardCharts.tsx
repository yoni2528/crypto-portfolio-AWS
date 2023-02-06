import React, { useEffect, useState } from 'react'
import styles from './CardCharts.module.css'
import ChartBar from '../ChartBar/ChartBar'
import useDatabseRequest from '../../apiHooks/useDatabseRequest'
import { MONTHS } from '../../config/static'

const CardCharts = () => {
  const { handleGetTransactions } = useDatabseRequest()
  const [buyTransactions, setBuyTransactions] = useState<[]>()
  const [sellTransactions, setSellTransactions] = useState<[]>()

  const handleListExtractor = (list: any, side: string) => {
    const extractedList = list
      .map((transactions: any) => {
        return {
          month: transactions._id.month,
          value: transactions[`total${side}`],
        }
      })
      .sort((a: any, b: any) => {
        if (a.value > b.value) return -1
        if (a.value < b.value) return 1
      })
      .map((val: any, index: number) => {
        return {
          month: val.month,
          value: 100 - index * 10,
          actualValue: val.value,
        }
      })
      .filter((val: any) => val.actualValue !== 0)
    return extractedList
  }

  useEffect(() => {
    handleGetTransactions().then((data) => {
      const buyList = handleListExtractor(data.data, 'Buy')
      const sellList = handleListExtractor(data.data, 'Sell')
      if (!buyList) return
      if (!sellList) return
      setSellTransactions(sellList)
      setBuyTransactions(buyList)
    })
  }, [])

  const findMonthByValue = (month: number, valueList: any) => {
    if (!valueList) return
    const val: { month: number; value: number; actualValue: number } | undefined = valueList?.find(
      (val: any) => val.month === month
    )
    if (!val) return

    return { height: val.value, value: val.actualValue }
  }

  return (
    <div className={styles['big-card']}>
      <h2 className={styles['card-title']}>Portfolio Overview</h2>
      <div className={styles['cards-wrapper']}>
        {MONTHS.map((month, index) => {
          return (
            <ChartBar
              buyValues={findMonthByValue(index + 1, buyTransactions)}
              sellValues={findMonthByValue(index + 1, sellTransactions)}
              month={month}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CardCharts
