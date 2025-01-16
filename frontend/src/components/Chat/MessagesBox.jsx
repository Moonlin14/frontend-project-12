import { useEffect, useRef } from 'react';

const MessagesBox = ({ channelMessages, filter }) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [channelMessages]);
  return (
    <div
      ref={messagesRef}
      id="messages-box"
      className="chat-messages overflow-auto px-5"
    >
      {channelMessages?.map(({ id, username, body }) => (
        <div className="ext-break mb-2" key={id}>
          <b>{ username}</b>
          {': '}
          <span>{filter.clean(body.body)}</span>
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
