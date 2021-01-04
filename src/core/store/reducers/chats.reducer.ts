import { createReducer } from '@reduxjs/toolkit';
import { Chats } from '../../services/chatService';
import {
  createUserChat,
  loadChats,
  sendMessage,
} from '../actions/chats.actions';
import { UserPublicData } from '../interfaces';

export interface Participants {
  [email: string]: UserPublicData;
}

export interface ChatsState {
  chats: Chats | null;
  error: string | null;
}

const initialState: ChatsState = {
  chats: null,
  error: null,
};

export const chatsReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadChats.fulfilled, (state, action) => ({
    ...state,
    chats: { ...(action.payload as Chats) },
    error: null,
  }));

  builder.addCase(loadChats.rejected, (state, action) => ({
    ...state,
    chats: null,
    error: action.payload as string,
  }));

  builder.addCase(createUserChat.fulfilled, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      ...action.payload,
    },
  }));
});
