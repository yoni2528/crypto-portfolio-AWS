import React from 'react'
import styles from './globalModal.module.css'
import Spinner from '../Spinner/Spinner'

const LoadingDataModal = () => {
  return (
    <div className={styles['modal-box']}>
      <Spinner />
    </div>
  )
}

export default LoadingDataModal
