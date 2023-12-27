import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rootReducer } from "./reducer"
import api from "@/services/api"
import { rtkQueryErrorLogger } from "@/services/api/middlewares/rtkQueryErrorLogger"
import { authSliceName } from "@/features/auth"

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    whitelist: [authSliceName],
    storage,
  },
  rootReducer,
)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(rtkQueryErrorLogger),
})
export default store

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
