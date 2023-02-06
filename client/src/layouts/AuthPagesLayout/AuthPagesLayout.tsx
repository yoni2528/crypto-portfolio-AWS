import styles from './AuthPagesLayout.module.css'
import React from 'react'
type Props = {
  children?: React.ReactNode
}

const AuthPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles['auth-layout']}>
      <div className={styles['auth-inside-layout']}>
        <div
          className={styles['auth-left']}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage:
              "url('https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1246&q=80')",
          }}
        ></div>
        <div className={styles['auth-right']}>{children}</div>
      </div>
    </div>
  )
}

export default AuthPageLayout
