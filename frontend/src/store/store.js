import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './api/chatApi';
import activeChannelReducer from './slices/activeChannelSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    activeChannel: activeChannelReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;
