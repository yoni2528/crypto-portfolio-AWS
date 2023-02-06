import React, { useState } from 'react'
import Button from '../Global/Button'
import Input from '../Global/Input'
import styles from './AuthUser.module.css'
import { User } from '../../pages/Signup'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const AuthUser: React.FC<{
  title: string
  subTitle: string
  onFormSubmit: (userAuth: User) => void
  pageType: string
  btnText: string
  testUser: boolean
}> = ({ title, subTitle, onFormSubmit, btnText, pageType, testUser }) => {
  const [validationFields, setValidationFields] = useState<any>({
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [formIsInvalid, setFormIsInalid] = useState<boolean>(true)

  const emailValidator = (email: string) => {
    if (!email.includes('@') && email.length !== 0) {
      setValidationFields((prevState: any) => {
        return { ...prevState, email: undefined }
      })
      return false
    }
    return true
  }

  const passwordValidator = (password: string) => {
    if (password.length < 6 && password.length !== 0) {
      setValidationFields((prevState: any) => {
        return { ...prevState, password: undefined }
      })
      return false
    }
    return true
  }

  const passwordConfirmValidation = (passwordConfirm: string) => {
    if (validationFields.password !== passwordConfirm) {
      setValidationFields((prevState: any) => {
        return { ...prevState, passwordConfirm: undefined }
      })
      return false
    }
    return true
  }

  const onEmailChange = (value: string) => {
    setValidationFields((prevState: any) => {
      return { ...prevState, email: value }
    })
  }

  const onPsswordChange = (value: string) => {
    setValidationFields((prevState: any) => {
      return { ...prevState, password: value }
    })
  }
  const onPsswordConfirmChange = (value: string) => {
    setValidationFields((prevState: any) => {
      return { ...prevState, passwordConfirm: value }
    })
  }
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(validationFields).includes(undefined)) {
      setFormIsInalid(false)
      setTimeout(() => {
        setFormIsInalid(true)
      }, 500)
      return
    }
    setFormIsInalid(true)

    const authUserDetails: User = {
      email: validationFields.email,
      password: validationFields.password,
      passwordConfirm: validationFields.passwordConfirm,
    }

    onFormSubmit(authUserDetails)
  }

  return (
    <div className={styles.layout}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles['sub-title']}>{subTitle}</h3>
      {testUser && (
        <div className={styles['user-demo']}>
          <div>
            <h2>Test User</h2>
          </div>
          <div className={styles['user-demo-details']}>
            <p>
              <strong>email</strong> : demo@demo.com
            </p>
            <p>
              <strong>password</strong> : 1234567
            </p>
          </div>
        </div>
      )}
      <form
        onSubmit={handleFormSubmit}
        className={clsx(styles.form, !formIsInvalid && styles['invalid'])}
      >
        <Input
          onChange={onEmailChange}
          validationRule={emailValidator}
          placeholder="Email"
          type="text"
          invalidText="Invalid email format, please try again"
        ></Input>
        <Input
          validationRule={passwordValidator}
          onChange={onPsswordChange}
          placeholder="Passowrd"
          type="password"
          cssType=""
          invalidText="Invalid password, please try again"
        ></Input>
        {pageType === 'signup' ? (
          <Input
            onChange={onPsswordConfirmChange}
            validationRule={passwordConfirmValidation}
            invalidText="passwords don't match "
            placeholder="Passowrd Confirm"
            type="password"
            cssType=""
          ></Input>
        ) : null}
        <Button type="btn-main" btnText={btnText}></Button>
      </form>
      {pageType === 'signup' ? (
        <p className={styles['login-redirect']}>
          Already have a user? <Link to={'/login'}>Sign In</Link>
        </p>
      ) : (
        <p className={styles['login-redirect']}>
          Don&apos;t have a user yet? <Link to={'/signup'}>Sign up</Link>
        </p>
      )}
    </div>
  )
}

export default AuthUser
