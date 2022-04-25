import { useState, useEffect } from 'react';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
} from 'agora-rtc-sdk-ng';

const useAgora = (
  client: IAgoraRTCClient | undefined
): {
  client: IAgoraRTCClient | undefined;
  localAudioTrack: ILocalAudioTrack | undefined;
  localVideoTrack: ILocalVideoTrack | undefined;
  isJoined: boolean;
  isJoining: boolean;
  leave: () => void;
  join: (param1: string, param2: string, param3: string, param4: string) => void;
  remoteUsers: IAgoraRTCRemoteUser[];
} => {
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | undefined>(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | undefined>(undefined);

  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  const createLocalAudioAndVideoTracks = async (
    audioConfig?: MicrophoneAudioTrackInitConfig,
    videoConfig?: CameraVideoTrackInitConfig
  ): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> => {
    const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);

    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);

    return [microphoneTrack, cameraTrack];
  };

  // TODO: to be tested
  const createLocalAudioTrack = async (
    audioConfig?: MicrophoneAudioTrackInitConfig
  ): Promise<IMicrophoneAudioTrack> => {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(audioConfig);

    setLocalAudioTrack(microphoneTrack);

    return microphoneTrack;
  };

  const leave = async () => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }

    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }

    (window as any).client = null;
    (window as any).videoTrack = null;

    await client?.leave();

    setRemoteUsers([]);
    setIsJoined(false);
  };

  const join = async (appid: string, channel: string, token: string, uid: string) => {
    try {
      setIsJoining(true);
      if (!client) {
        setIsJoining(false);
        return;
      }

      const [microphoneTrack, cameraTrack] = await createLocalAudioAndVideoTracks();

      await client.join(appid, channel, token, uid);
      await client.publish([microphoneTrack, cameraTrack]);

      (window as any).client = client;
      (window as any).videoTrack = cameraTrack;

      setIsJoined(true);
      setIsJoining(false);
    } catch (e) {
      setIsJoining(false);
      throw e;
    }
  };

  useEffect(() => {
    // Check for posible mismatch into state vs client object
    if (!isJoining && client.connectionState === 'CONNECTED' && !isJoined) {
      (async () => {
        await leave();
      })();
    }
  }, [client.connectionState]);

  useEffect(() => {
    if (!client) {
      return;
    }

    setRemoteUsers(client.remoteUsers);

    const updateRemoteUserswithClient = () => {
      setRemoteUsers(Array.from(client.remoteUsers));
    };

    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      updateRemoteUserswithClient();
    };

    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', updateRemoteUserswithClient);
    client.on('user-joined', updateRemoteUserswithClient);
    client.on('user-left', updateRemoteUserswithClient);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', updateRemoteUserswithClient);
      client.off('user-joined', updateRemoteUserswithClient);
      client.off('user-left', updateRemoteUserswithClient);
    };
  }, [client]);

  return {
    client,
    localAudioTrack,
    localVideoTrack,
    isJoined,
    isJoining,
    leave,
    join,
    remoteUsers,
  };
};

export default useAgora;
