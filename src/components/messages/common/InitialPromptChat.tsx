import { useEffect, useState } from 'react';
import { useLocalStorage } from '@components/hooks';

import RestrictedChatInfoDialog from './RestrictedChatInfoDialog';

export const InitialPromptChat = ({ chatId }: { chatId: number }) => {
  const [viewedChatIds, setViewedChatIds] = useLocalStorage('prompt_initial_chat_ids', []);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const chatIds: number[] = viewedChatIds || [];

    if (!openDialog && !chatIds.includes(chatId)) {
      setOpenDialog(true);
      setViewedChatIds([...chatIds, chatId]);
    }
  }, [viewedChatIds]);

  if (openDialog) {
    return <RestrictedChatInfoDialog onClose={() => setOpenDialog(false)} />;
  }

  return null;
};

export default InitialPromptChat;
