import api from "@/services/api"
import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "@/features/auth"
import appReducer from "@/features/app"
import counterReducer from "@/features/counter/counterSlice"
import cartReducer from "@/features/cart"
import snackbarReducer from "@/features/snackbar"

export const rootReducer = combineReducers({
  counter: counterReducer,
  app: appReducer,
  auth: authReducer,
  snackbar: snackbarReducer,
  cart: cartReducer,
  [api.reducerPath]: api.reducer,
})
