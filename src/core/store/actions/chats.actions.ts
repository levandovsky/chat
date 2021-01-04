import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createChat,
  getUserChats,
  sendChatMessage,
} from '../../services/chatService';
import { Message, UserPublicData } from '../interfaces';
import { Participants } from '../reducers/chats.reducer';

export enum ChatsActionTypes {
  LOAD = 'LOAD',
  LOADED = 'LOADED',
  SEND_MESSAGE = 'SEND_MESSAGE',
  LOAD_PARTICIPANTS = 'LOAD_PARTICIPANTS',
  CREATE_CHAT = 'CREATE_CHAT',
}

export const loadChats = createAsyncThunk(
  ChatsActionTypes.LOAD,
  async (email: string, { rejectWithValue }) => {
    try {
      const chats = await getUserChats(email);
      return chats;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  ChatsActionTypes.SEND_MESSAGE,
  async (
    payload: { message: Message; chatId: string },
    { rejectWithValue }
  ) => {
    try {
      await sendChatMessage(payload.chatId, payload.message);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createUserChat = createAsyncThunk(
  ChatsActionTypes.CREATE_CHAT,
  async (
    {
      currentUserEmail,
      respondingEmail,
    }: { currentUserEmail: string; respondingEmail: string },
    { rejectWithValue }
  ) => {
    try {
      const chat = await createChat(currentUserEmail, respondingEmail);
      return chat;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
