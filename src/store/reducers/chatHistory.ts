import { createSlice } from '@reduxjs/toolkit';
import { ChatHistories } from '@types';

interface ChatHistorySliceState {
  chatHistory: ChatHistories;
}

const initialState: ChatHistorySliceState = {
  chatHistory: [],
};

const chatSlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    setInitialChatHistory: (state, action) => {
      state.chatHistory = action.payload.chat_histories;
    },
    setChatHistory: (state, action) => {
      // TODO: Separate new_chat_message and new_chat action
      const existingChatIndex = state.chatHistory.findIndex(chat => chat.chat_id === action.payload.chat.chat_id);

      // Append receiving chat, either new or exiting
      state.chatHistory.unshift(action.payload.chat);

      // If chat already existed, remove the duplicated but not updated chat.
      if (existingChatIndex >= 0) {
        state.chatHistory = state.chatHistory.filter((chat, idx) => {
          if (idx !== 0 && chat.chat_id === action.payload.chat.chat_id) {
            return false;
          }

          return true;
        });
      }

      return state;
    },
  },
});

export const { setInitialChatHistory, setChatHistory } = chatSlice.actions;

export default chatSlice.reducer;
