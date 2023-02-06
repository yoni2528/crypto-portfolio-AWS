import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

import useAuthRequest from '../../apiHooks/useAuthRequest'

import logo from '../../assets/logo.png'
import { NavListItems } from '../../utils/Helper'
import Button from '../../components/Global/Button'

import styles from './SideBar.module.css'

const SideBar: React.FC<{ onMenuToggle: () => void }> = ({ onMenuToggle }) => {
  const { pathname } = useLocation()
  const { handleLogOut } = useAuthRequest()
  return (
    <div className={styles['navbar-layout']}>
      <div className={styles['navbar-items']}>
        <img className={styles.logo} src={logo} alt="site logo"></img>
        <nav>
          <ul className={styles['navbar-list']}>
            {NavListItems.map((navItem, index) => {
              return (
                <li className={styles['navbar-list-item']} key={index}>
                  <navItem.icon className={styles.icon} />
                  <Link
                    onClick={onMenuToggle}
                    className={clsx(pathname === `/${navItem.path}` && styles.active)}
                    to={`/${navItem.path}`}
                  >
                    {navItem.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={styles.logout}>
          <Button onClick={handleLogOut} type="btn-logout" btnText="Logout"></Button>
        </div>
      </div>
    </div>
  )
}

export default SideBar
