import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducer'

import { portfolioReducer } from './reducers/portfolioReducer'
import { spinnerReducer } from './reducers/spinnerReducer'
import { tokenListReducer } from './reducers/tokenListReducer'
import { tokenSelected, tokenSelectedReducer } from './reducers/tokenSelectedReducer'

import {
  errorModalReducer,
  loadingModalReducer,
  tokenDeleteModalModalReducer,
  tokenSelectionModalReducer,
} from './reducers/modalReducers'
import { notificationReducer } from './reducers/notificationsReducer'

export type tokenState = {
  selectToken: tokenSelected
}

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    selectToken: tokenSelectedReducer.reducer,
    spinner: spinnerReducer.reducer,
    auth: authReducer.reducer,
    tokenList: tokenListReducer.reducer,
    portfolio: portfolioReducer.reducer,
    errorModal: errorModalReducer.reducer,
    tokenSelectionModal: tokenSelectionModalReducer.reducer,
    tokenDeleteModal: tokenDeleteModalModalReducer.reducer,
    loadingModal: loadingModalReducer.reducer,
    notification: notificationReducer.reducer,
  },
})

export default store
