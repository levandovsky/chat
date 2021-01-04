import React, { Fragment, useState } from 'react';
import { format, parse } from 'date-fns';
import { TIMESTAMP_FORMAT } from '../../core/constants';
import { UserPublicData } from '../../core/store/interfaces';
import './MessageComponent.scss';

export interface MessageComponentProps {
  author_email: string;
  receiverEmail: string;
  content: string;
  timestamp: string;
  getUsername: (email: string) => UserPublicData;
}

const MessageComponent = ({
  author_email,
  content,
  getUsername,
  receiverEmail,
  timestamp,
}: MessageComponentProps) => {
  const [timestampShown, setTimestampShown] = useState(false);
  const getDateTime = (_timestamp: string) => {
    const prettyFormat = 'EEE dd-MM-y HH:mm';
    const date = parse(_timestamp, TIMESTAMP_FORMAT, new Date());
    return format(date, prettyFormat);
  };
  return (
    <div
      className={
        author_email === receiverEmail
          ? 'message message--receiver'
          : 'message message--sender'
      }
      onClick={() => setTimestampShown(!timestampShown)}
    >
      <div className="message__inner">
        <div className="message__user">
          {getUsername(author_email).username[0].toUpperCase()}
        </div>
        <div className="message__content">{content}</div>
      </div>
      <div className={`message__timestamp ${!timestampShown ? 'hidden' : ''}`}>
        {getDateTime(timestamp)}
      </div>
    </div>
  );
};

export default MessageComponent;
