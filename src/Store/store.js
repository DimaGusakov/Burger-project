import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {databaseApi} from '../Service/databaseApi'

export const store = configureStore({
  reducer: {
    [databaseApi.reducerPath] : databaseApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(databaseApi.middleware)
})
setupListeners(store.dispatch)