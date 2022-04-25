import { useState, useEffect } from 'react';
import { Grid, Dialog, IconButton, makeStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { IAgoraRTCRemoteUser, ILocalVideoTrack, ILocalAudioTrack } from 'agora-rtc-sdk-ng';

import { VideoCallPlayer, ActionController } from '@components/video';
import { MessageInput, MessageBox } from '@components/messages/common';
import { useChannel } from '@components/context/SocketContext';
import { useIdleTimer } from '@components/context/IdleTimerContext';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: '1500 !important' as unknown as number,
  },
  paper: {
    height: '100vh',
  },
  container: {
    position: 'relative',
    height: '100%',
    '& > .MuiGrid-item': {
      flex: 1,
    },
  },
  videoContainer: {
    background: '#202124',
    padding: theme.spacing(4),
  },
  userVideo: {
    width: 300,
    height: 200,
    margin: '0 auto',
  },
  controlGrid: {
    alignSelf: 'flex-end',
    paddingBottom: 30,
    paddingTop: 15,
  },
  chatGrid: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      zIndex: 2000,
      background: theme.palette.common.white,
      top: 0,
      left: 0,
      height: '100vh',
    },
  },
  chatIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButton: {
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      top: 50,
      zIndex: 9999,
    },
  },
}));

interface FullScreenVideo {
  localAudioTrack: ILocalAudioTrack | undefined;
  localVideoTrack: ILocalVideoTrack | undefined;
  remoteUsers: IAgoraRTCRemoteUser[];
  chatId: number;
  senderId: number;
  receiverId: number;
  isProvider: boolean;
  leave: () => void;
  setIsVideoCallInProcess: (params: boolean) => void;
}

const FullScreenVideo = ({
  localAudioTrack,
  localVideoTrack,
  leave,
  remoteUsers,
  chatId,
  senderId,
  receiverId,
  isProvider,
  setIsVideoCallInProcess,
}: FullScreenVideo) => {
  const classes = useStyles();
  const [isOpenChat, setIsOpenChat] = useState(false);
  const { channel } = useChannel(`chat:${chatId}`);
  const { resumeAndResetIdle } = useIdleTimer();

  useEffect(() => {
    return () => {
      leave();
    };
  }, []);

  const handleTerminateCall = async () => {
    if (isProvider) {
      try {
        await new Promise((resolve, reject) => {
          channel
            ?.push('terminated_call', null)
            .receive('ok', resp => {
              // wait first for handle push
              leave();
              resolve(resp);
            })
            .receive('error', err => {
              leave();
              reject(reject);
            });
        });
        setIsVideoCallInProcess(false);
      } catch (error) {
        leave();
        setIsVideoCallInProcess(false);
      }
    } else {
      leave();
    }

    resumeAndResetIdle();
  };

  return (
    <Dialog classes={{ root: classes.root, paper: classes.paper }} fullScreen open>
      <Grid className={classes.container} container>
        <Grid
          className={classes.videoContainer}
          container
          item
          lg={!isOpenChat ? 12 : 8}
          xs={12}
          alignItems="center"
          justify="center"
        >
          <Grid item container xs={12} justify="center">
            <VideoCallPlayer audioTrack={localAudioTrack} videoTrack={localVideoTrack} isLocalTrack />
          </Grid>
          {remoteUsers.map(({ uid, audioTrack, videoTrack }) => (
            // For MVP: UI is built for 2 users only for now
            <Grid key={uid} item container xs={12} justify="center">
              <VideoCallPlayer audioTrack={audioTrack} videoTrack={videoTrack} />
            </Grid>
          ))}
          <Grid className={classes.controlGrid} item xs={12}>
            <ActionController
              leave={handleTerminateCall}
              localAudioTrack={localAudioTrack}
              localVideoTrack={localVideoTrack}
              toggleChat={() => setIsOpenChat(prevState => !prevState)}
              isOpenChat={isOpenChat}
            />
          </Grid>
        </Grid>

        {isOpenChat && (
          <Grid className={classes.chatGrid} container direction="column" item lg={4} xs={12}>
            <Grid item>
              <IconButton
                className={classes.closeButton}
                onClick={() => setIsOpenChat(prevState => !prevState)}
                color="primary"
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <MessageBox chatId={chatId} providerId={senderId} isVideoScreen />
            <MessageInput chatId={chatId} senderId={senderId} receiverId={receiverId} isVideoCallChat />
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default FullScreenVideo;
