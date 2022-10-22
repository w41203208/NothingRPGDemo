import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import characterReducer from './reducers/character';
import shopReducer from './reducers/shop';

const reducer = {
  auth: authReducer,
  character: characterReducer,
  shop: shopReducer,
};

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
