import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectIsLoggedIn = createSelector(
  (state: AppState) => state.auth,
  ({ user }) => !!user
);

export const selectUser = createSelector(
  (state: AppState) => state.auth,
  ({ user }) => user
);
