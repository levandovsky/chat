import { configureStore } from '@reduxjs/toolkit';
import { authReducer, AuthState } from './reducers/auth.reducer';
export type AppState = {
  auth: AuthState;
};

const reducer = {
  auth: authReducer,
};

export const store = configureStore<AppState>({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
