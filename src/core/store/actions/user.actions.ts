import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser as _updateUser } from '../../services/userService';
import { User } from '../interfaces';
export enum UserActions {
  UPDATE = 'UPDATE',
}
export const updateUser = createAsyncThunk(
  UserActions.UPDATE,
  async (update: User, { rejectWithValue }) => {
    try {
      const updated = await _updateUser(update);
      return updated;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
