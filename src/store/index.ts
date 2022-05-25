import { configureStore } from '@reduxjs/toolkit';

import chatReducer from './reducers/chat';
import chatHistoryReducer from './reducers/chatHistory';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    chatHistory: chatHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
