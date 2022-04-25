import { Dispatch, SetStateAction } from 'react';
import { ListItemText, Grid, makeStyles, Typography } from '@material-ui/core';
import { Videocam as VideocamIcon, Phone as PhoneIcon } from '@material-ui/icons';
import classnames from 'classnames';
import { differenceInMinutes } from 'date-fns';

import BubbleContent from './BubbleContent';
import IncomingVideoCallCard from '../IncomingVideoCallCard';

const useStyles = makeStyles(theme => ({
  timeText: {
    textAlign: 'center',
    color: theme.palette.grey[600],
    fontWeight: 400,
    fontSize: 12,
  },
  messageBubble: {
    maxWidth: 300,
    overflowWrap: 'break-word',
    padding: theme.spacing(1, 2),
    color: 'white',
    '&.senderBubble': {
      background: '#4DA2FF',
      borderRadius: '20px 20px 0px 20px',
    },
    '&.receiverBubble': {
      background: theme.palette.grey[500],
      borderRadius: '20px 20px 20px 0px;',
    },
  },
  imageBubble: {
    maxWidth: '100%',
  },
  callText: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '24px',
    color: theme.palette.grey[600],
    display: 'flex',
    justifyContent: 'center',
    '& > svg': {
      marginRight: theme.spacing(1),
      width: 15,
    },
  },
}));

interface MessageBoxContentProps {
  content: string;
  messageType: string;
  isProvider: Boolean;
  attachment: string;
  file_type: string;
  setSelectedImage: Dispatch<SetStateAction<string>>;
  messageId: number;
  video_call?: {
    initiated_at: Date;
    terminated_at: Date;
  };
  isVideoScreen?: boolean;
  joinVideoCall: (param1: string, param2: string, param3: string, param4: string) => void;
  chatId?: number;
}

const MessageBoxContent = ({
  content,
  messageType,
  isProvider,
  attachment,
  file_type,
  setSelectedImage,
  messageId,
  video_call,
  isVideoScreen,
  joinVideoCall,
  chatId,
}: MessageBoxContentProps) => {
  const classes = useStyles();

  const isVideoCall = messageType === 'video_call';

  if (isVideoCall) {
    if (video_call.terminated_at) {
      const distanceInWords = differenceInMinutes(
        new Date(video_call.terminated_at),
        new Date(video_call.initiated_at)
      );

      return (
        <Grid container item xs={12} style={{ textAlign: 'center' }}>
          <ListItemText
            className={classes.timeText}
            secondary={
              <Typography className={classes.callText}>
                {isVideoCall ? <VideocamIcon /> : <PhoneIcon />} Llamada por {distanceInWords} minutos
              </Typography>
            }
          />
        </Grid>
      );
    }

    return (
      <Grid container item xs={12} style={{ textAlign: 'center' }}>
        <IncomingVideoCallCard
          isVideoScreen={isVideoScreen}
          joinVideoCall={joinVideoCall}
          chatId={chatId}
          isProvider={isProvider}
        />
      </Grid>
    );
  }

  return (
    <Grid item>
      <ListItemText
        className={classnames(classes.messageBubble, {
          receiverBubble: !isProvider,
          senderBubble: isProvider,
          [classes.imageBubble]: ['jpeg', 'jpg', 'png'].includes(file_type),
        })}
        primary={
          <BubbleContent
            messageId={messageId}
            content={content}
            attachment={attachment}
            messageType={messageType}
            file_type={file_type}
            setSelectedImage={setSelectedImage}
          />
        }
      />
    </Grid>
  );
};

export default MessageBoxContent;
