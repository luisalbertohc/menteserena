import { useState } from 'react';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { Socket, Channel } from 'phoenix';

import config from '@config';
import { useCognito } from '@components/context/AuthContext';

const SocketContext = createContext(undefined);

const WEBSOCKET_URL = config.MENTE_SERENA_API_BASE_URL.replace(/http/, 'ws');

const initialState = {
  isIdle: true,
  isConnecting: false,
  isConnected: false,
  socket: undefined,
  channels: {},
};

//TODO: Move this to redux

const reducer = (state = {} as any, action) => {
  switch (action.type) {
    case 'CONNECTING':
      return {
        ...state,
        isConnecting: true,
        isIdle: false,
      };
    case 'CONNECTED':
      return {
        ...state,
        isConnecting: false,
        isConnected: Boolean(action.payload.socket?.isConnected()),
        socket: action.payload.socket,
      };
    case 'ERROR':
      return {
        ...state,
        isConnecting: false,
        isConnected: Boolean(action.payload.socket?.isConnected()),
      };
    case 'NEW_CHANNEL': {
      if (state.channels?.[action.payload.channelName]) {
        return state;
      }

      const { socket } = state;
      const channel = socket?.channel(action.payload.channelName);

      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.channelName]: channel,
        },
      };
    }
    case 'REMOVE_CHANNEL': {
      const { [action.payload.channelName]: channelRemove, ...channelsRest } = state.channels;

      return {
        ...state,
        channels: channelsRest,
      };
    }
    default:
      return state;
  }
};

let tryOut = 0;

const SocketContextProvider = props => {
  const { getAccessToken, refreshSession, isLoading, isRefreshingSession } = useCognito();

  const [socketPayload, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const token = getAccessToken();

      const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
        params: { userToken: `bearer ${token}` },
      });

      socket.onOpen(() => {
        dispatch({ type: 'CONNECTED', payload: { socket } });
      });

      socket.onError(async err => {
        if (err.type === 'error') {
          if (tryOut < 3) {
            // regenerate token
            await refreshSession();

            dispatch({ type: 'CONNECTING' });

            tryOut = tryOut + 1;
          } else {
            dispatch({ type: 'ERROR', payload: { socket } });
          }
        } else {
          dispatch({ type: 'ERROR', payload: { socket } });
        }
      });

      socket.connect();

      dispatch({ type: 'CONNECTING' });
    })();
  }, [isRefreshingSession]);

  if (isLoading) {
    return null;
  }

  return <SocketContext.Provider value={{ ...socketPayload, dispatch }} {...props} />;
};

export default SocketContextProvider;

export const useSocket = (): { socket: Socket; isConnected: boolean; isConnecting: boolean; isIdle: boolean } => {
  return useContext(SocketContext);
};

interface ChannelSocket extends Channel {
  state: string;
}

export const useChannel = (channelName): { channel: ChannelSocket; removeChannel?: () => void } => {
  const { dispatch, ...state } = useContext(SocketContext);

  useEffect(() => {
    if (state.isConnected) {
      dispatch({ type: 'NEW_CHANNEL', payload: { channelName } });
    }
  }, [state.isConnected]);

  const removeChannel = () => {
    dispatch({ type: 'REMOVE_CHANNEL', payload: { channelName } });
  };

  return state?.channels?.[channelName]
    ? {
        channel: state?.channels?.[channelName],
        removeChannel,
      }
    : { channel: undefined };
};
