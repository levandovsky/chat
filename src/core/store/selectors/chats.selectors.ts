import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectUserChats = createSelector(
  (state: AppState) => state.chats,
  ({ chats }) => chats
);
