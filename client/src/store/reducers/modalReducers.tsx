import { createSlice } from '@reduxjs/toolkit/'

const errrModalState = {
  isOpen: false,
  title: 'message',
  message: 'new message',
  btnText: 'btnText',
}

export const errorModalReducer = createSlice({
  name: 'error-modal',
  initialState: errrModalState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true
      state.message = action.payload.message
      state.title = action.payload.title
      state.btnText = action.payload.btnText
    },
    closeModal(state) {
      state.isOpen = false
    },
  },
})

export const errorModalActions = errorModalReducer.actions

const tokenSelectionModalState = {
  isOpen: false,
}

export const tokenSelectionModalReducer = createSlice({
  name: 'token-selection-modal',
  initialState: tokenSelectionModalState,
  reducers: {
    openModal(state) {
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
  },
})

export const tokenSelectionModalActions = tokenSelectionModalReducer.actions

const tokenDeleteModal = {
  isOpen: false,
  token: '',
  title: 'message',
  message: 'new message',
  btnText: 'btnText',
}

export const tokenDeleteModalModalReducer = createSlice({
  name: 'token-delete-modal',
  initialState: tokenDeleteModal,
  reducers: {
    openModal(state, action) {
      state.isOpen = true
      state.title = action.payload.title
      state.message = action.payload.message
      state.title = action.payload.title
      state.btnText = action.payload.btnText
    },
    closeModal(state) {
      state.isOpen = false
    },
    setToken(state, action) {
      state.token = action.payload
    },
  },
})

export const tokenDeleteModalActions = tokenDeleteModalModalReducer.actions

const loadingModal = {
  isOpen: false,
}

export const loadingModalReducer = createSlice({
  name: 'loading-modal',
  initialState: loadingModal,
  reducers: {
    openModal(state) {
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
  },
})

export const loadingModalActions = loadingModalReducer.actions
