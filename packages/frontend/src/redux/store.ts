import { configureStore } from '@reduxjs/toolkit';

import { emptyApi } from './emptyApi';

export const store = configureStore({
  reducer: {
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
