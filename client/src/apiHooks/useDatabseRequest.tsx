/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { tokenData } from '../store/reducers/tokenSelectedReducer'
import useRequest from './useRequest'
import { BASE_URL } from '../config/static'
import { useDispatch } from 'react-redux'
import { tokenListActions } from '../store/reducers/tokenListReducer'
import { portfolioActions } from '../store/reducers/portfolioReducer'
import { loadingModalActions } from '../store/reducers/modalReducers'
import useNotification from '../customHooks/useNotification'

export type UserUpdate = {
  firstName: string | undefined
  lastName: string | undefined
}

const useDatabseRequest = () => {
  const { handlePostRequest, handleGetRequest, handleFileRequest } = useRequest()
  const { handleNotification } = useNotification()
  const dispatch = useDispatch()

  const handleNewTokenPost = async (tokenData: tokenData) => {
    const data = await handlePostRequest({
      method: 'POST',
      url: `${BASE_URL}app/v1/tokens`,
      body: tokenData,
    })
    if (!data) return
    handleGetAllTokens()
    handleNotification('Token Added Succesfully')
  }

  const handleGetAllTokens = async () => {
    const data = await handleGetRequest({
      method: 'GET',
      url: `${BASE_URL}app/v1/portfolio`,
    })
    if (!data) return

    dispatch(tokenListActions.tokenListChanged(data.data.tokens))
    dispatch(
      portfolioActions.addPortfolioData({
        totalBalance: data.data.totalBalance,
        totalProfit: data.data.totalProfit,
      })
    )
    return data
  }

  const handleRemoveToken = async (tokenId: string) => {
    const data = await handleGetRequest({
      method: 'DELETE',
      url: `${BASE_URL}app/v1/tokens/${tokenId}`,
    })
    if (!data) return
    handleGetAllTokens()
    handleNotification('Token Removed Succesfully')

    return data
  }

  const handleGetPortfolioData = async () => {
    const data = await handleGetRequest({
      method: 'GET',
      url: `${BASE_URL}app/v1/portfolio`,
    })
    if (data) {
      handleGetAllTokens()
    }
    return data
  }

  const handleRefreshTokenList = async () => {
    dispatch(loadingModalActions.openModal())

    const data = await handleGetRequest({
      method: 'GET',
      url: `${BASE_URL}app/v1/portfolio/refresh-list`,
    })
    if (data) {
      handleGetAllTokens()
      dispatch(loadingModalActions.closeModal())
      handleNotification('Token Prices Refreshed')
    }
    return data
  }

  const handleGetTransactions = async () => {
    const data = await handleGetRequest({
      method: 'GET',
      url: `${BASE_URL}app/v1/transactions`,
    })
    return data
  }

  const updateUserDetails = async (userUpdate: UserUpdate) => {
    dispatch(loadingModalActions.openModal())
    const data = await handlePostRequest({
      method: 'PATCH',
      url: `${BASE_URL}app/v1/users`,
      body: userUpdate,
    })
    if (!data) return
    handleNotification('User Details Change Successfully')
    dispatch(loadingModalActions.closeModal())
    return data
  }

  const handleGetUserDetails = async () => {
    const data = await handleGetRequest({
      method: 'GET',
      url: `${BASE_URL}app/v1/users`,
    })
    if (!data) return

    return data
  }

  const handleChangeUserImage = async (formData: any) => {
    const data = await handleFileRequest({
      method: 'POST',
      url: `${BASE_URL}app/v1/users/image`,
      body: formData,
    })
    if (!data) return
    handleNotification('Image Change Successfully')
    return data
  }

  const handlePasswordChange = async (passwordDetails: any) => {
    const data = await handlePostRequest({
      method: 'PATCH',
      url: `${BASE_URL}app/v1/users/changePassword`,
      body: passwordDetails,
    })
    if (!data) return
    handleNotification('Password Change Successfully')
    return data
  }

  return {
    handleNewTokenPost,
    handleGetAllTokens,
    handleRemoveToken,
    handleGetPortfolioData,
    handleRefreshTokenList,
    handleGetTransactions,
    updateUserDetails,
    handleGetUserDetails,
    handleChangeUserImage,
    handlePasswordChange,
  }
}
export default useDatabseRequest
