import axios from 'axios';
import { AuthInfo, User } from '../store/interfaces';

interface Users {
  [email: string]: User;
}

const binUrl = 'https://api.jsonbin.io/b/5ff2560ca2070e409d6dc66a';
const binKey = '$2b$10$igbsWCczZV6ycsYWQr7PZuVF3bCqgjeY0/Nj3Y32BzKfEFe0y4rD2';
const headers = {
  'Content-Type': 'application/json',
  'secret-key': binKey,
  versioning: false,
};
export const getUsers = async () => {
  const res = await axios.get(binUrl, { headers: { 'secret-key': binKey } });
  return res.data as Users;
};
export const userLogin = async ({
  email,
  password,
  loggedIn,
}: AuthInfo): Promise<User> => {
  const users = await getUsers();
  const user = users[email];

  if (loggedIn) {
    return user;
  }

  if (!user) {
    const newUser = await registerUser({ email, password }, users);
    return newUser;
  }

  if (user && user.password !== password) {
    throw new Error('Invalid Password!');
  }

  return user;
};

export const registerUser = async (
  { email, password }: AuthInfo,
  users: Users
) => {
  const user: User = {
    email,
    password: password!,
    username: email,
  };

  const res = await axios.put(
    binUrl,
    {
      ...users,
      [email]: user,
    },
    {
      headers,
    }
  );

  return res.data.data[email];
};

export const getUser = async (email: string) => {
  const users = await getUsers();
  return users[email];
};

export const updateUser = async (update: User) => {
  const users = await getUsers();
  const user = users[update.email];
  const updatedUser = { ...user, ...update };
  const res = await axios.put(
    binUrl,
    { ...users, [update.email]: updatedUser },
    { headers }
  );
  return res.data.data[update.email] as User;
};
