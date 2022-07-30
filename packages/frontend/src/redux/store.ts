import { configureStore } from '@reduxjs/toolkit';

import { emptyApi } from './emptyApi';
import { pageInfoSlice } from './reducers/pageInfoSlice';

export const store = configureStore({
  reducer: {
    [emptyApi.reducerPath]: emptyApi.reducer,
    pageInfo: pageInfoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
