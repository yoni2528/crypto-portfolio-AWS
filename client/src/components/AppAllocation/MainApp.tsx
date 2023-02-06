import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import styles from '../../App.module.css'
import { onPageTitleChnage } from '../../utils/Helper'

import clsx from 'clsx'

import {
  SideBar,
  TokenSelectionModal,
  PageTopBar,
  Dashboard,
  Portfolio,
  Profile,
} from '../componentContainer'

const MainApp = () => {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState('Hello User')
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    onPageTitleChnage(location, setCurrentPage)
  }, [location])

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={styles['main-layout']}>
      <div className={clsx(styles.navbar, isMenuOpen && styles.active)}>
        <SideBar onMenuToggle={handleToggleMenu} />
      </div>
      <div className={styles['main-content']}>
        <PageTopBar pageTitle={currentPage} onMenuClick={handleToggleMenu} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<Dashboard />}></Route>
        </Routes>
      </div>
      <TokenSelectionModal />
    </div>
  )
}

export default MainApp
