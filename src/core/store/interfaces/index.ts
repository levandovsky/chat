import { AuthActionTypes } from '../actions/auth.actions';

export interface AuthInfo {
  email: string;
  password?: string;
  loggedIn?: boolean;
}

export interface AuthAction {
  type: AuthActionTypes;
  payload: AuthInfo;
}

export interface User {
  email: string;
  username: string;
  password: string;
}

export interface UserPublicData {
  email: string;
  username: string;
}

export interface Message {
  author_email: string;
  timestamp: string;
  content: string;
}

export interface Chat {
  participants: UserPublicData[];
  messages: Message[];
}
