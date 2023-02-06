import React, { useEffect, useState } from 'react'
import styles from './Input.module.css'
import clsx from 'clsx'

type Props = React.PropsWithChildren<{
  placeholder: string
  type: string
  onChange?: (value: string) => void
  cssType?: string // added cssType prop here
  id?: string
  deafultValue?: string
  ref?: React.Ref<HTMLInputElement>
  validationRule?: (email: string) => boolean
  invalidText?: string
}>

const Input: React.FC<Props> = React.forwardRef((Props, ref) => {
  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [isInvalid, setIsInvalid] = useState<boolean | undefined | string>('_')

  const onInputBlur = (e: any) => {
    if (!Props.validationRule) return
    const validation = Props.validationRule(e.target.value)
    setIsInvalid(validation)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Props.onChange) return
    const { value } = e.target
    Props.onChange(value)

    if (!Props.validationRule) return
    if (isInvalid) return
    const validation = Props.validationRule(value)
    setIsInvalid(validation)
  }

  useEffect(() => {
    setInputValue(Props.deafultValue)
  }, [Props.deafultValue])
  return (
    <>
      <input
        ref={ref}
        className={clsx(
          styles.input,
          Props.cssType && styles[Props.cssType],
          !isInvalid && styles['invalid']
        )}
        placeholder={Props.placeholder}
        type={Props.type}
        id={Props.id}
        onChange={onInputChange}
        defaultValue={inputValue}
        onBlur={onInputBlur}
      ></input>
      {!isInvalid ? <p className={styles['invalid-message']}>{Props.invalidText}</p> : null}
    </>
  )
})
Input.displayName = 'Input'

export default Input
