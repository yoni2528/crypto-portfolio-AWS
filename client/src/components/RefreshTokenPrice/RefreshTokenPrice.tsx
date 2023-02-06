import React from 'react'
import useDatabseRequest from '../../apiHooks/useDatabseRequest'
import Button from '../Global/Button'

const RefreshTokenPrice = () => {
  const { handleRefreshTokenList } = useDatabseRequest()

  const handleRefreshButton = () => {
    handleRefreshTokenList()
  }

  return <Button type="btn-text" onClick={handleRefreshButton} btnText="Refresh Prices"></Button>
}

export default RefreshTokenPrice
