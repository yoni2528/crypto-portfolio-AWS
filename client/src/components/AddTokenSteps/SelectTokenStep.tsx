import React, { useState } from 'react'

import Input from '../Global/Input'
import AddTokenCard from './AddTokenCard'

import { TOKEN_DATA } from '../../config/tokens_list'
import styles from './SelectTokenStep.module.css'
import { IoChevronForwardOutline } from 'react-icons/io5'

import { useDispatch } from 'react-redux/es/exports'
import { tokenSelectedActions } from '../../store/reducers/tokenSelectedReducer'
import useThirdApiRequests from '../../apiHooks/useThirdApiRequests'

const SelectTokenStep = () => {
  const [searchListResults, setSearchListResults] = useState<string[]>(TOKEN_DATA.slice(0, 10))

  const dispatch = useDispatch()
  const { handleTokenSelectedRequest } = useThirdApiRequests()

  const handleInputChange = (value: string) => {
    const searchValue = value.toLocaleLowerCase()

    const resultsList = TOKEN_DATA.filter((token) => {
      return token.slice(0, searchValue.length).includes(searchValue)
    }).slice(0, 10)
    setSearchListResults(resultsList)
  }

  const handleTokenSelect = (token: string) => {
    dispatch(tokenSelectedActions.selectToken(token))
    handleTokenSelectedRequest(token)
  }

  return (
    <AddTokenCard>
      <div className={styles['select-token-overlay']}>
        <Input cssType="" placeholder="Search" type="text" onChange={handleInputChange}></Input>
        <ul className={styles['token-select-list']}>
          {searchListResults.map((token, index) => {
            return (
              <li
                onClick={() => {
                  handleTokenSelect(token)
                }}
                key={index}
                className={styles['token-list-item']}
              >
                <span>
                  <p>{token}</p>
                </span>
                <IoChevronForwardOutline className={styles.icon} />
              </li>
            )
          })}
        </ul>
      </div>
    </AddTokenCard>
  )
}

export default SelectTokenStep
