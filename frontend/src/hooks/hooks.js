import { useContext } from 'react';
import { AuthContext, chatApiContext } from '../context/context.js';

const useAuth = () => useContext(AuthContext);
const useChatApi = () => useContext(chatApiContext);

export { useAuth, useChatApi};