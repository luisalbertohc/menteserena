import { createSlice } from '@reduxjs/toolkit';

interface Message {
  id: number;
}

interface ChatSliceState {
  messages: Message[];
  chatId: string;
  receiver_id: string;
  sender_id: string;
  users: string[];
  status: string;
  remaining_messages_for_patient: number;
}

const initialState: ChatSliceState = {
  messages: [],
  chatId: null,
  receiver_id: '',
  sender_id: '',
  users: [],
  status: '',
  remaining_messages_for_patient: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInitialChat: (state, action) => {
      state.messages = action.payload.messages;
      state.chatId = action.payload.chatId;
      state.receiver_id = action.payload.receiver_id;
      state.sender_id = action.payload.sender_id;
      state.users = action.payload.users;
      state.status = action.payload.status;
      state.remaining_messages_for_patient = action.payload.remaining_messages_for_patient;
    },
    setConversationState: (state, action) => {
      if (action.payload.action === 'NEW_MESSAGE_VIDEO') {
        state.messages.push(action.payload.message);
      } else if (action.payload.action === 'END_MESSAGE_VIDEO') {
        state.messages = state.messages.map(message => {
          if (message.id === action.payload.message.id) {
            return action.payload.message;
          }

          return message;
        });
      } else {
        state.messages.push(action.payload.message);
        state.remaining_messages_for_patient = action.payload.remaining_messages_for_patient;

        // TODO: Check later
        state.chatId = action.payload.chatId;
        state.receiver_id = action.payload.message.receiver_id;
        state.sender_id = action.payload.message.sender_id;
        state.users.push(action.payload.message.users);
      }
    },
    setChatStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setClearReducer: (state, _) => {
      Object.entries(initialState).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

export const { setConversationState, setInitialChat, setChatStatus, setClearReducer } = chatSlice.actions;

export default chatSlice.reducer;
