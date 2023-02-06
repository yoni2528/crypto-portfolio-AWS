import React, { useState, useRef } from 'react'
import styles from './ProfileCard.module.css'
import {
  IoPersonCircleOutline,
  IoRefreshOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from 'react-icons/io5'
import Button from '../Global/Button'
import Input from '../Global/Input'
import useDatabseRequest from '../../apiHooks/useDatabseRequest'
import { CardDetails } from './Types'

import clsx from 'clsx'

const ProfileCard: React.FC<{
  cardDetails: CardDetails
}> = ({ cardDetails }) => {
  const { updateUserDetails, handlePasswordChange } = useDatabseRequest()
  const [firstValue, setFirstValue] = useState<string>()
  const [secondValue, setSecondValue] = useState<string>()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const firstValueRef = useRef<HTMLInputElement>(null)
  const secondValueRef = useRef<HTMLInputElement>(null)

  const handleTruncateFieldsHelper = () => {
    if (firstValueRef.current && secondValueRef.current) {
      firstValueRef.current.value = ''
      secondValueRef.current.value = ''
    }
  }

  const handleFirstInputValue = (value: string) => {
    setFirstValue(value)
  }

  const handleSecondInputChange = (value: string) => {
    setSecondValue(value)
  }

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!firstValue && !secondValue) return

    handlePasswordChange({ password: firstValue, newPassowrd: secondValue })
    handleTruncateFieldsHelper()
  }

  const handleDetailsChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!firstValue && !secondValue) return

    updateUserDetails({
      firstName: firstValue,
      lastName: secondValue,
    }).then((data: any) => {
      userUpdated &&
        userUpdated({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          id: data.data._id,
        })
    })

    handleTruncateFieldsHelper()
  }

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  const { title, subTitle, form1, form2, btnText, btnCss, userUpdated } = cardDetails
  return (
    <div className={styles['block-user-details']}>
      <div className={styles['block-reset-header']}>
        <div className={styles['header-title-icon']}>
          {title === 'Change Password' ? (
            <IoRefreshOutline className={styles.icon} />
          ) : (
            <IoPersonCircleOutline className={styles['icon-details']} />
          )}
          <div>
            <h2 className={styles['section-title']}>{title}</h2>
            <h3 className={styles['form-title']}>{subTitle}</h3>
          </div>
        </div>
        <div>
          {isFormOpen ? (
            <IoChevronUpOutline
              onClick={handleToggleForm}
              className={clsx(styles.icon, styles.dropdown)}
            />
          ) : (
            <IoChevronDownOutline
              onClick={handleToggleForm}
              className={clsx(styles.icon, styles.dropdown)}
            />
          )}
        </div>
      </div>
      <form
        onSubmit={title === 'Change Password' ? handlePasswordReset : handleDetailsChange}
        className={clsx(styles['form-details'], isFormOpen ? styles.active : styles.close)}
      >
        <Input
          ref={firstValueRef}
          id={form1.id}
          placeholder={form1.placeholder}
          type={form1.tpye}
          cssType={form1.cssType}
          onChange={handleFirstInputValue}
        ></Input>
        <Input
          ref={secondValueRef}
          id={form2.id}
          placeholder={form2.placeholder}
          type={form2.tpye}
          cssType={form2.cssType}
          onChange={handleSecondInputChange}
        ></Input>
        <Button btnText={btnText} type={btnCss}></Button>
      </form>
    </div>
  )
}

export default ProfileCard
