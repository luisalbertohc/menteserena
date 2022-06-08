import { useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemText, Grid, makeStyles, Dialog, DialogContent } from '@material-ui/core';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useSelector } from 'react-redux';
import { Close as CloseIcon } from '@material-ui/icons';

import MessageBoxContent from './MessageBoxContent';
import { useCognito } from '@components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  messageArea: {
    flex: '1 1 100px',
    height: '50%',
    overflow: 'auto',
  },
  timeText: {
    textAlign: 'center',
    color: theme.palette.grey[600],
    fontWeight: 400,
    fontSize: 12,
  },
  imagePreview: {
    objectFit: 'cover',
    maxWidth: 600,
    maxHeight: 600,
    [theme.breakpoints.down('sm')]: {
      width: 250,
      height: 250,
    },
  },
}));

interface MessageBoxProps {
  chatId: number;
  providerId: number;
  isVideoScreen?: boolean;
  joinVideoCall?: (param1: string, param2: string, param3: string, param4: string) => void;
}

interface MessageProps {
  chat: {
    messages: {
      id: number;
      content: string;
      date: Date;
      sender_id: number;
      type: string;
      file_type: string;
      attachment: string;
    }[];
  };
}

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const MessageBox = ({ chatId, providerId, isVideoScreen, joinVideoCall }: MessageBoxProps) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const messages = useSelector((state: MessageProps) => state?.chat?.messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <List className={classes.messageArea}>
      {messages.map(({ content, date, sender_id, type, file_type, attachment, id, ...restMessage }, idx) => {
        const isProvider = sender_id === providerId;
        const utcDate = utcToZonedTime(date, localTimeZone || 'America/Puerto_Rico');

        return (
          <ListItem key={idx}>
            <Grid container justifyContent={isProvider ? 'flex-end' : 'flex-start'}>
              <Grid item xs={12}>
                <ListItemText className={classes.timeText} secondary={format(new Date(utcDate), 'h:mm aaa')} />
              </Grid>
              <MessageBoxContent
                messageId={id}
                content={content}
                messageType={type}
                isProvider={isProvider}
                attachment={attachment}
                file_type={file_type}
                setSelectedImage={setSelectedImage}
                isVideoScreen={isVideoScreen}
                joinVideoCall={joinVideoCall}
                chatId={chatId}
                {...restMessage}
              />
            </Grid>
          </ListItem>
        );
      })}
      <div ref={messagesEndRef}></div>
      {Boolean(selectedImage) && (
        <Dialog open onClose={() => setSelectedImage(null)} maxWidth="md">
          <DialogContent>
            <Grid container justifyContent="flex-end">
              <CloseIcon onClick={() => setSelectedImage(null)} />
            </Grid>
            <img className={classes.imagePreview} src={selectedImage} alt="Mente-Serena" />
          </DialogContent>
        </Dialog>
      )}
    </List>
  );
};

export default MessageBox;
