import { createReducer } from '@reduxjs/toolkit';
import { login, logoutActionCreator } from '../actions/auth.actions';
import { updateUser } from '../actions/user.actions';
import { User } from '../interfaces';

export type AuthState = {
  user: User | null;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, action) => ({
    ...state,
    user: action.payload as User,
    error: null,
  }));

  builder.addCase(login.rejected, (state, action) => ({
    ...state,
    user: null,
    error: action.payload as string,
  }));

  builder.addCase(logoutActionCreator.fulfilled, (state) => ({
    ...state,
    user: null,
    error: null,
    participants: [],
  }));

  builder.addCase(updateUser.fulfilled, (state, action) => ({
    ...state,
    user: action.payload,
    error: null,
  }));

  builder.addCase(updateUser.rejected, (state, action) => ({
    ...state,
    error: action.payload as string,
  }));
});
