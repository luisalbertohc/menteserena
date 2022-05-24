import { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from 'agora-rtc-sdk-ng';

const useStyles = makeStyles(theme => ({
  root: {
    width: 450,
    height: 300,
    background: 'lightgray',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: theme.shadows[1],
  },
}));

export interface VideoCallPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  isLocalTrack?: boolean;
}

const VideoCallPlayer = ({ videoTrack, audioTrack, isLocalTrack }: VideoCallPlayerProps) => {
  const classes = useStyles();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    videoTrack?.play(container.current);

    return () => {
      videoTrack?.stop();
    };
  }, [container, videoTrack]);

  useEffect(() => {
    if (!isLocalTrack) {
      audioTrack?.play();
    }

    return () => {
      if (!isLocalTrack) {
        audioTrack?.stop();
      }
    };
  }, [audioTrack]);

  return <div ref={container} className={classes.root} />;
};

export default VideoCallPlayer;
