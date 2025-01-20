import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { activeChannelSelector } from '../../store/slices/activeChannelSlice';
import useLiveData from '../../hooks/useLiveData';
import MessagesForm from './MessagesForm';
import {
  useGetMessagesQuery,
  useAddMessageMutation,
} from '../../store/api/chatApi';
import MessagesBox from './MessagesBox';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../utils/routes';

const MessageBoxWrapper = ({ children }) => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      {children}
    </div>
  </div>
);

const MessagesContainer = () => {
  const { t } = useTranslation();
  const activeChannel = useSelector(activeChannelSelector);
  const { activeChannelId, activeChannelName } = useLiveData(activeChannel);
  const { data: messages, isLoading, isError } = useGetMessagesQuery();
  const channelMessages = messages?.filter((message) => message.channelId === activeChannelId);
  const count = channelMessages?.length || 0;
  const [addMessage] = useAddMessageMutation();
  const username = localStorage.getItem('username');
  const auth = useAuth();
  const navigate = useNavigate();
  const token = auth.tokenState;

  useEffect(() => {
    if (token !== localStorage.getItem('token')) {
      navigate(routes.loginPagePath());
      auth.logOut();
    }
  }, [isError])

  return (
    <MessageBoxWrapper>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${filter.clean(activeChannelName)}`}</b>
        </p>
        <span className="text-muted">{t('chatBox.messages', { count })}</span>
      </div>
      <MessagesBox channelMessages={channelMessages} filter={filter} />
      <div className="mt-auto px-5 py-3">
        <MessagesForm
          channelId={activeChannelId}
          username={username}
          addMessage={addMessage}
          isLoading={isLoading}
          t={t}
        />
      </div>
    </MessageBoxWrapper>
  );
};

export default MessagesContainer;
