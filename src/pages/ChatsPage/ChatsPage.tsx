import { push } from 'connected-react-router';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdSend, RiMailAddLine } from 'react-icons/all';
import { connect, useSelector } from 'react-redux';
import { useAppDispatch } from '../../App';
import MessagesComponent from '../../components/MessagesComponent/MessagesComponent';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';
import { EMAIL_REGEX, TIMESTAMP_FORMAT } from '../../core/constants';
import { logoutActionCreator } from '../../core/store/actions/auth.actions';
import {
  createUserChat,
  loadChats,
  sendMessage,
} from '../../core/store/actions/chats.actions';
import { updateUser } from '../../core/store/actions/user.actions';
import { selectUser } from '../../core/store/selectors/auth.selectors';
import { selectUserChats } from '../../core/store/selectors/chats.selectors';
import './ChatsPage.scss';

const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [newChatEmail, setNewChatEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);
  const user = useSelector(selectUser);
  const chats = useSelector(selectUserChats);
  const testEmail = (email: string) =>
    EMAIL_REGEX.test(email) && email !== user!.email;
  const sendChatMessage = async () => {
    setMessage('');
    await dispatch(
      sendMessage({
        message: {
          author_email: user!.email,
          content: message,
          timestamp: format(new Date(), TIMESTAMP_FORMAT),
        },
        chatId: activeChatId!,
      })
    );
    await dispatch(loadChats(user!.email));
  };
  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  };
  const handleCreateChat = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      createChat();
    }
  };

  const handleSend = async () => await sendChatMessage();
  const handleSave = async (_username: string, _password: string) => {
    await dispatch(
      updateUser({
        email: user!.email,
        username: _username,
        password: _password,
      })
    );
    await dispatch(loadChats(user!.email));
  };

  const handleLogout = async () => {
    await dispatch(logoutActionCreator());
    dispatch(push('/sign-in'));
  };

  const createChat = async () => {
    if (!!newChatEmail) {
      await dispatch(
        createUserChat({
          currentUserEmail: user!.email,
          respondingEmail: newChatEmail,
        })
      );
    }
  };

  const chatList =
    !!user &&
    !!chats &&
    Object.keys(chats).map((key, id) => (
      <div
        key={id}
        className={`chat__conversation ${key === activeChatId ? 'active' : ''}`}
      >
        {chats[key].participants
          .filter(({ email }) => email !== user.email)
          .map(({ username }, id) => (
            <div
              key={id}
              onClick={() => setActiveChatId(key)}
              className="chat__sender"
            >
              {username}
            </div>
          ))}
      </div>
    ));

  const messages =
    !!user && !!chats && activeChatId !== null ? (
      <MessagesComponent
        chat={chats[activeChatId]}
        receiverEmail={user.email}
      />
    ) : (
      <div className="chat__not-selected">Select chat and start messaging!</div>
    );

  const profile = !!user ? (
    <ProfileComponent
      profile={user}
      onSave={handleSave}
      onLogout={handleLogout}
    />
  ) : null;

  const inputField = activeChatId ? (
    <div className="chat__field">
      <input
        onChange={handleMessageChange}
        onKeyUp={handleEnter}
        value={message}
      />
      <button className="chat__send" onClick={handleSend}>
        Send <MdSend stroke="#fff" />
      </button>
    </div>
  ) : null;

  useEffect(() => {
    if (user) {
      dispatch(loadChats(user.email));
    }
  }, [user, dispatch]);

  return (
    <div className="chat">
      <div className="chat__wrapper">
        <div className="chat__sidebar">
          <div className="chat__profile">{profile}</div>
          <div className="chat__create">
            <h2>Start New Chat</h2>
            <div className="chat__create-field">
              <input
                type="text"
                value={newChatEmail}
                onChange={(e) => setNewChatEmail(e.target.value)}
                placeholder="Enter email to chat with!"
              />
              <button
                disabled={!testEmail(newChatEmail)}
                type="button"
                onKeyUp={handleCreateChat}
                onClick={() => createChat()}
              >
                <RiMailAddLine />
              </button>
            </div>
          </div>
          <div className="chat__list">
            <h2>Active Chats</h2>
            <div className="chat_conversations">{chatList}</div>
          </div>
        </div>
        <div className="chat__box">
          {messages}
          {inputField}
        </div>
      </div>
    </div>
  );
};
export default connect()(ChatsPage);
