/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ChatContainer from '../components/Chat/ChatContainer';
import routes from '../utils/routes';

const ChatPage = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate(routes.loginPagePath());
    }
  }, []);
  return (
    <ChatContainer />
  );
};
export default ChatPage;
