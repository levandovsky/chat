import { createReducer } from '@reduxjs/toolkit';
import { loginActionCreator } from '../actions/auth.actions';

export type AuthState = {
  email: string | null;
  loggedIn: boolean;
  error?: Error;
};

const initialState: AuthState = {
  email: null,
  loggedIn: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(loginActionCreator, (state, action) => {
    const { email } = action.payload;
    return {
      ...state,
      email,
      loggedIn: true,
    };
  });
});
