import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { chatsReducer, ChatsState } from './reducers/chats.reducer';

export type AppState = {
  auth: AuthState;
  chats: ChatsState;
};

export const getReducer = (history: History) => ({
  auth: authReducer,
  chats: chatsReducer,
  router: connectRouter(history),
});
