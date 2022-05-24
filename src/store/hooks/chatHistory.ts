import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@store/index';

export const useSortedChatList = () => {
  const chatList = useSelector((state: RootState) => state?.chatHistory?.chatHistory);

  return useMemo(
    () =>
      [...chatList]?.sort((a, b) => {
        const chatLastMsgTimeA = a.messages.length ? new Date(a.messages[a.messages.length - 1].date).getTime() : -1;
        const chatLastMsgTimeB = b.messages.length ? new Date(b.messages[b.messages.length - 1].date).getTime() : -1;

        return chatLastMsgTimeB - chatLastMsgTimeA;
      }),
    [chatList]
  );
};
