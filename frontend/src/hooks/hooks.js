import { useContext } from 'react';
import { AuthContext, chatApiContext } from '../context/context.js';

export const useAuth = () => useContext(AuthContext);
export const useChatApi = () => useContext(chatApiContext);