import { Grid, makeStyles, Typography } from '@material-ui/core';

import ConversationPreviewCard from '../common/ConversationPreviewCard';
import Conversation from '../common/Conversation';
import { ChatHistories } from '@types';

const useStyles = makeStyles(theme => ({
  headerContainer: {
    padding: theme.spacing(4, 2, 2, 2),
    borderBottom: '1px solid #E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '24px',
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface MessageListProps {
  chatList: ChatHistories;
  chatMessage: any;
  setChatMessage: (params: any) => void;
}

const MessagesList = ({ chatList, chatMessage, setChatMessage }: MessageListProps) => {
  const classes = useStyles();

  return (
    <Grid container className="center">
      {chatMessage ? (
        <Conversation
          messageData={chatMessage}
          setChatMessage={() => setChatMessage(null)}
          user={chatMessage.users.find(user => user.user_type === 'PROVIDER')}
          receiverId={chatMessage.users.find(user => user.user_type === 'PROVIDER').id}
          senderId={chatMessage.users.find(user => user.user_type === 'PATIENT').id}
        />
      ) : (
        <Grid className={classes.listContainer}>
          <Grid container alignItems="center" justifyContent="space-between" className={classes.headerContainer}>
            <Typography className={classes.title} color="primary">
              Mensajes
            </Typography>
          </Grid>
          {chatList.map((chat, index) => {
            const user = chat.users.find(user => user.user_type === 'PROVIDER');

            return (
              <ConversationPreviewCard
                user={user}
                chatData={chat}
                key={index}
                notificationAvailables={
                  chat.unread_messages[chat.users.find(user => user.user_type === 'PATIENT').id] > 0
                }
                setChatMessage={() => setChatMessage(chat)}
              />
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default MessagesList;
