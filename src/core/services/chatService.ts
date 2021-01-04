import axios from 'axios';
import { v4 as createId } from 'uuid';
import { Chat, Message } from '../store/interfaces';
import { getUsers } from './userService';

export interface Chats {
  [id: string]: Chat;
}

const binKey = '$2b$10$igbsWCczZV6ycsYWQr7PZuVF3bCqgjeY0/Nj3Y32BzKfEFe0y4rD2';
const binUrl = 'https://api.jsonbin.io/b/5fee58e0fd076e704db07cf9';

export const getChats = async () => {
  const res = await axios.get(binUrl, { headers: { 'secret-key': binKey } });
  return res.data as Chats;
};

export const getChatById = async (chatId: string) => {
  const res = await axios.get(binUrl, { headers: { 'secret-key': binKey } });
  const chats = res.data as Chats;
  return chats[chatId];
};

export const getUserChats = async (email: string) => {
  const res = await axios.get(binUrl, { headers: { 'secret-key': binKey } });
  const users = await getUsers();
  const chats = res.data as { [id: string]: { participants: string[] } };

  const foundChats = Object.keys(chats)
    .filter((key) => chats[key].participants.includes(email))
    .reduce(
      (userChats, key) => ({
        ...userChats,
        [key]: {
          ...chats[key],
          participants: [
            ...chats[key].participants.map((email) => ({
              email: users[email] ? users[email].email : email,
              username: users[email] ? users[email].username : email,
            })),
          ],
        },
      }),
      {}
    );

  return foundChats as Chats;
};

export const sendChatMessage = async (chatId: string, message: Message) => {
  const chats = await getChats();
  const users = await getUsers();
  const chat = chats[chatId];
  await axios.put(
    binUrl,
    {
      ...chats,
      [chatId]: { ...chat, messages: [...chat.messages, message] },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'secret-key': binKey,
        versioning: false,
      },
    }
  );
};

export const createChat = async (
  currentUserEmail: string,
  respondgingUserEmail: string
) => {
  const chats = await getChats();
  const newId = createId();
  const update: { messages: any[]; participants: string[] } = {
    messages: [],
    participants: [currentUserEmail, respondgingUserEmail],
  };

  const res = await axios.put(
    binUrl,
    {
      ...chats,
      [newId]: update,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'secret-key': binKey,
        versioning: false,
      },
    }
  );

  return res.data[newId];
};
