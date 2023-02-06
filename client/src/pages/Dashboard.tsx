import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import clsx from 'clsx'
import CardSmall from '../components/Cards/CardSmall'
import useDatabseRequest from '../apiHooks/useDatabseRequest'

import { IoCardOutline, IoCashOutline, IoCaretUpOutline, IoCaretDownOutline } from 'react-icons/io5'
import CardMedium from '../components/Cards/CardMedium'
import CardNews from '../components/Cards/CardNews'
import { useSelector } from 'react-redux'
import useThirdApiRequests from '../apiHooks/useThirdApiRequests'
import CardCharts from '../components/Cards/CardCharts'
import { RootState } from '../store'

const Dashboard = () => {
  const [topPerformanceList, setTopPerformanceList] = useState(undefined)
  const [hotTokensList, setHotTokensList] = useState(undefined)
  const [portfolioData, setPortfolioData] = useState<{
    totalProfit: number
    totalBalance: number
  } | null>(null)

  const data = useSelector((state: RootState) => state.tokenList.data)

  const { handleGetAllTokens, handleGetPortfolioData } = useDatabseRequest()
  const { handleTopPerfoemanceRequest, handleHotTokensList } = useThirdApiRequests()

  useEffect(() => {
    handleGetAllTokens()
    handleGetPortfolioData().then((data) => setPortfolioData(data.data))
    handleTopPerfoemanceRequest().then((data) => {
      setTopPerformanceList(data)
    })
    handleHotTokensList().then((data) => setHotTokensList(data))
  }, [])

  const isPorfitable = portfolioData && portfolioData.totalProfit > 0 ? 'profit' : 'loss'

  return (
    <div className={styles['dashboard-layout']}>
      <div className={clsx(styles['card'], styles['card-small'])}>
        <CardSmall
          cardBalance={portfolioData && portfolioData.totalBalance}
          cardTitle="My Balance"
          cardIcon={<IoCardOutline className={styles.icon} />}
        />
      </div>
      <div className={clsx(styles['card'], styles['card-small'])}>
        <CardSmall
          cardBalance={portfolioData && portfolioData.totalProfit}
          cardTitle="Today's Profit"
          cardIcon={<IoCashOutline className={styles.icon} />}
        />
      </div>
      <div className={clsx(styles['card'], styles['card-small'])}>
        <CardSmall
          cardBalance={(portfolioData && portfolioData.totalProfit) || 0}
          cardTitle="Overall Profit"
          cardCss={isPorfitable}
          cardIcon={
            isPorfitable === 'profit' ? (
              <IoCaretUpOutline className={clsx(styles.icon, styles.special)} />
            ) : (
              <IoCaretDownOutline className={clsx(styles.icon, styles.special)} />
            )
          }
        />
      </div>
      <div className={clsx(styles['card'], styles['card-medium'])}>
        <CardMedium data={data} cardTitle="Portfolio Overview" />
      </div>
      <div className={clsx(styles['card'], styles['card-big'])}>
        <CardCharts />
      </div>
      <div className={clsx(styles['card'], styles['card-medium'])}>
        <CardMedium data={topPerformanceList} cardTitle="Top Performance" />
      </div>
      <div className={clsx(styles['card'], styles['card-medium'])}>
        <CardMedium data={hotTokensList} cardTitle="Hot Coins" />
      </div>
      <div className={clsx(styles['card'], styles['card-medium'])}>
        <CardNews />
      </div>
    </div>
  )
}

export default Dashboard
