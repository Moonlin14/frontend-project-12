import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import MessagesForm from './MessagesForm.jsx';
import MessagesHeader from './MessageHeader.jsx';
import Message from './Message.jsx';

export default () => {
  const messagesView = useRef(null);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const messages = useSelector((state) => state.messagesInfo.messages);
  const currentChannelid = useSelector((state) => state.channelsInfo.currentChannelid);
  const [activeChannel] = channels.filter(({id}) => id === currentChannelid);
  const activeChannelMessages = messages.filter((message) => message.channelId === currentChannelid);

  useEffect(() => {
    messagesView.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChannelMessages])

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader 
          activeChannel={activeChannel}
          messagesCount={activeChannelMessages.length}
        />
        <div ref={messagesView} id='messages-box' className='chat-messages overflow-auto px-5'>
          {activeChannelMessages.map((message) => (
            <Message message={message} key={message.id}/>
          ))}
        </div>
        <MessagesForm activeChannel={activeChannel}/>
      </div>
    </div>
  );
};