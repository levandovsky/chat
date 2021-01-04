import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '../../services/userService';
import { AuthInfo, User } from '../interfaces';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const login = createAsyncThunk(
  AuthActionTypes.LOGIN,
  async ({ email, password, loggedIn }: AuthInfo, { rejectWithValue }) => {
    try {
      let user: User;
      if (loggedIn) {
        user = await userLogin({ email, loggedIn });
      } else {
        user = await userLogin({ email, password });
        window.localStorage.setItem('user', email);
      }
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutActionCreator = createAsyncThunk(
  AuthActionTypes.LOGOUT,
  () => {
    localStorage.removeItem('user');
  }
);
