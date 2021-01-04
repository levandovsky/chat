import React, { useEffect } from 'react';
import { Chat, Message } from '../../core/store/interfaces';
import MessageComponent from '../MessageComponent/MessageComponent';
import './MessagesComponent.scss';
export interface MessagesComponentProps {
  chat: Chat;
  receiverEmail: string;
}

const MessagesComponent = ({
  chat: { participants, messages },
  receiverEmail,
}: MessagesComponentProps) => {
  const getUsername = (email: string) => {
    const user = participants.filter(
      ({ email: userEmail }) => userEmail === email
    )[0];
    return user;
  };
  const mapMessage = (props: Message, id: number) => (
    <MessageComponent
      key={id}
      {...props}
      getUsername={getUsername}
      receiverEmail={receiverEmail}
    />
  );

  useEffect(() => {
    const messages = document.querySelectorAll('.message');
    if (messages.length) {
      const lastMessage = messages[messages.length - 1];
      lastMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return <div className="messages">{messages.map(mapMessage)}</div>;
};

export default MessagesComponent;
