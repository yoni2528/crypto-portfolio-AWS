// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorModalActions, loadingModalActions } from '../store/reducers/modalReducers'
import { spinnerActions } from '../store/reducers/spinnerReducer'

export type postRequestObj = {
  method: string
  url: string
  body?: any
  params?: string
}

const useRequest = () => {
  const dispatch = useDispatch()
  const token = useSelector((state: any) => state.auth.token)

  const stopModalAndOpenError = (error: any) => {
    dispatch(
      errorModalActions.openModal({
        title: error.title || 'Server Error',
        message: error.message,
        btnText: 'Got It',
      })
    )
    dispatch(spinnerActions.stopLoading())
    dispatch(loadingModalActions.closeModal())
  }

  const handlePostRequest = async (reqObj: postRequestObj) => {
    try {
      dispatch(loadingModalActions.openModal())
      dispatch(spinnerActions.Loading())
      const res = await fetch(reqObj.url, {
        method: reqObj.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqObj.body),
      })
      const data = await res.json()
      if (res.status !== 200) throw { message: data.message, title: data.title }
      dispatch(loadingModalActions.closeModal())

      dispatch(spinnerActions.stopLoading())

      return data
    } catch (error: any) {
      stopModalAndOpenError(error)
    }
  }

  const handleGetRequest = async (reqObj: postRequestObj) => {
    try {
      dispatch(spinnerActions.Loading())
      const res = await fetch(reqObj.url, {
        method: reqObj.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (res.status !== 200) throw new Error(data.message)

      dispatch(spinnerActions.stopLoading())
      return data
    } catch (error: any) {
      stopModalAndOpenError(error)
    }
  }

  const handleThirdPartyApiRequest = async (reqObj: postRequestObj) => {
    try {
      dispatch(spinnerActions.Loading())
      const res = await fetch(reqObj.url, {
        method: reqObj.method,
      })
      const data = await res.json()
      if (res.status !== 200) throw new Error(data.message)

      dispatch(spinnerActions.stopLoading())
      return data
    } catch (error: any) {
      stopModalAndOpenError(error)
    }
  }

  const handleFileRequest = async (reqObj: postRequestObj) => {
    try {
      dispatch(loadingModalActions.openModal())
      const res = await fetch(reqObj.url, {
        method: reqObj.method,
        body: reqObj.body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (res.status !== 200) throw new Error(data.message)

      dispatch(loadingModalActions.closeModal())
      return data
    } catch (error: any) {
      stopModalAndOpenError(error)
    }
  }

  return {
    handleGetRequest,
    handlePostRequest,
    handleThirdPartyApiRequest,
    handleFileRequest,
  }
}

export default useRequest
