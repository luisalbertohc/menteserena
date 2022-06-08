import { useState } from 'react';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import {
  CallEnd as CallEndIcon,
  MicOff as MicOffIcon,
  Mic as MicOnIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  Chat as ChatIcon,
} from '@material-ui/icons';
import { ILocalVideoTrack, ILocalAudioTrack } from 'agora-rtc-sdk-ng';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[700],
    boxShadow: theme.shadows[5],
    maxWidth: 300,
    margin: '0 auto',
    padding: theme.spacing(0.5, 2),
    borderRadius: 6,
    '& > div,button': {
      width: 50,
    },
  },
  endCallBtn: {
    '& > button': {
      background: theme.palette.error.main,
      '&:hover': {
        background: theme.palette.error.dark,
        transition: '300ms background ease-out',
      },
    },
  },
  icon: {
    fill: theme.palette.common.white,
  },
}));

interface ActionController {
  localAudioTrack: ILocalAudioTrack;
  localVideoTrack: ILocalVideoTrack;
  isOpenChat: boolean;
  toggleChat: () => void;
  leave: () => void;
}

const ActionController = ({ localAudioTrack, localVideoTrack, leave, isOpenChat, toggleChat }: ActionController) => {
  const classes = useStyles();
  const [isMuteAudio, setIsMuteAudio] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const toggleAudio = () => {
    if (isMuteAudio) {
      localAudioTrack.setMuted(false);
      setIsMuteAudio(false);
    } else {
      localAudioTrack.setMuted(true);
      setIsMuteAudio(true);
    }
  };

  const toggleVideo = () => {
    if (isCameraOn) {
      localVideoTrack.setEnabled(false);
      setIsCameraOn(false);
    } else {
      localVideoTrack.setEnabled(true);
      setIsCameraOn(true);
    }
  };

  return (
    <Grid className={classes.root} container justifyContent="space-around">
      <div className={classes.endCallBtn}>
        <IconButton onClick={leave} size="medium">
          <CallEndIcon className={classes.icon} />
        </IconButton>
      </div>
      <IconButton onClick={toggleAudio} size="small">
        {localAudioTrack.muted ? <MicOffIcon className={classes.icon} /> : <MicOnIcon className={classes.icon} />}
      </IconButton>
      <IconButton onClick={toggleVideo} size="small">
        {isCameraOn ? <VideocamIcon className={classes.icon} /> : <VideocamOffIcon className={classes.icon} />}
      </IconButton>
      <IconButton onClick={toggleChat} size="small">
        <ChatIcon className={classes.icon} />
      </IconButton>
    </Grid>
  );
};

export default ActionController;
